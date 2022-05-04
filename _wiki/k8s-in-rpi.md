---
layout  : wiki
title   : k8s-in-rpi
summary : 라즈베리파이에서 k8s 자습하기
date    : 2022-05-03 02:11:00 +0900
lastmod : 2022-05-05 07:47:30 +0900
tags    : [k8s]
draft   : false
parent  : kubernetes
---

## 배경
- 쿠버네티스 이론 공부를 적당히 하고([[kubernetes-in-action]]), 이제 실습을 좀 해보려고 하는데 주어진 장비가 [rpi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) 밖에 없다.
- 어쩔수 없이, 있는걸로 공부해보면서 시행착오와 어떤 것들을 적용시켰는지를 적는 메모장이다.

## 사양
- 생각 외로 적어놔야 하는 것들을 적어두자.
- HW:
  - Raspberry Pi 4
- SW:
  - kernel
    ```
    # uname -a
    Linux <computer name> 5.4.0-1055-raspi #62-Ubuntu SMP PREEMPT Wed Mar 2 14:43:34 UTC 2022 aarch64 aarch64 aarch64 GNU/Linux
    ```
  - zsh

## Kubernetes 설치 -> Kind 설치
- 좀 찾아봤는데, kind 가 그나마 쓸만할 것 같다. 인턴때 잠깐 써봐서 다행이다.
- [공식 사이트 설치방법](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)을 따라 가려고 했는데 공식 사이트는 amd64이다.
- 주소를 보니 대충 [github release](https://github.com/kubernetes-sigs/kind/releases/)에 arm64이 있을것 같아서 주소를 거기로 바꿨다.

  ```bash
  wget https://github.com/kubernetes-sigs/kind/releases/download/v0.12.0/kind-linux-arm64
  chmod +x ./kind-linux-arm64
  sudo ln -s $(pwd)/kind-linux-arm64 /usr/local/sbin/kind
  ```

- cluster 만들기

  ```bash
  kind create cluster --name k8s-in-action
  ```
  - 처음부터 심상치 않다. kubeadm이 정상실행되지 않는 것처럼 보인다.

    ```
    Error: failed to create cluster: failed to init node with kubeadm: command "docker exec --privileged <cluster name>-control-plane kubeadm init --skip-phases=pre flight --config=/kind/kubeadm.conf --skip-token-print --v=6
    ```

  - 커널 설정이 잘못되어있어인가 싶어서 https://lance.tistory.com/5 내용을 일부(2-4) 적용해본다.
    - 3번 과정에서 `/boot/firmware/cmdline.txt` 로 바꾸었다.
    - 바로 안되길레 실망했지만, reboot 하니까 kind가 정상 작동한다.
    - 아마도 추정은 iptables 문제이지 않을까? 싶다. 에러메시지들을 읽어보니 정상 실행은 됬는데 kubelet에서 api point를 못찾는 메시지가 출력됬었던걸로 기억

- kubectl 설치
  - 완벽히 정상작동하는지 테스트 해볼려고 kubectl을 실행시키니 명령어를 안깔았었다. 깔아주자

    ```bash
    sudo apt install kubectl
    ```

- kubectl 실행
  - kind 에서는 context-name 을 주도록 권장하지만 실제로 설정에는 기본으로 current-context로 들어있다. context를 여러개 쓰는게 아니라면 그냥 쳐도 된다.
  - kubeconfig 정보

    ```bash
    kubectl config view
    #apiVersion: v1
    #clusters:
    #- cluster:
    #    certificate-authority-data: DATA+OMITTED
    #    server: https://127.0.0.1:36987
    #  name: kind-k8s-in-action
    #contexts:
    #- context:
    #    cluster: kind-k8s-in-action
    #    user: kind-k8s-in-action
    #  name: kind-k8s-in-action
    #current-context: kind-k8s-in-action
    #kind: Config
    #preferences: {}
    #users:
    #- name: kind-k8s-in-action
    #  user:
    #    client-certificate-data: REDACTED
    #    client-key-data: REDACTED
    ```

  - 잘 실행되는것 같다.

## 실습하기
### 간단한 Hello World 프로그램 작성하기
- Kubernetes를 사용하기에 앞서 당연하게도 안에 들어갈 프로그램과 docker image가 필요하다.
- 필요할때 만들어본 경험은 있지만 메모해본적은 없다. 한번 처음부터 해보자.
- 기왕이면 go 공부하는 겸사겸사 go로 작성했다. ~~인턴때가 생각난다.~~
  ```go
  package main

  import (
    "fmt"
    "net/http"

    "github.com/spf13/cobra"
  )

  func main() {
    cmd := NewDefaultCommand()
    err := cmd.Execute()
    if err != nil {
      fmt.Errorf("command failed %v\n", err)
    }
  }

  func NewDefaultCommand() *cobra.Command {
    return &cobra.Command{
      Use: "helloword",
      Run: func(cmd *cobra.Command, args []string) {
        http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
          w.Write([]byte("Hello World"))
        })

        fmt.Printf("listen ::5000")
        http.ListenAndServe(":5000", nil)
      },
    }
  }
  ```
- 이렇게 `helloworld` 바이너리를 만들었다.
- 이제 dockerimage를 만들어보자.
  ```dockerfile
  FROM alpine:3.15.4
  COPY bin/helloword /
  ENTRYPOINT ["/helloword"]
  ```

  ```bash
  docker build -t localhost:5000/hello:0.0.1 .
  ```

- 매번 위 과정을 하긴 귀찮으니, Makefile로 만들자.
  ```makefile
  all: helloworld docker

  docker: helloworld
    docker build -t localhost:5000/hello:0.0.1 .

  helloworld:
    CGO_ENABLED=0 go build -o bin/helloworld cmd/helloworld.go

  clean:
    rm -f bin/**
  ```

- 위 과정을 github에 업로드해두자
  - [repo](https://github.com/makerdark98/k8s-in-action-practice)
  - [지금까지 한거 commit](https://github.com/makerdark98/k8s-in-action-practice/tree/40da96f70e0f6dff362dd832bbaa55b2722bbd0e)

## docker 이미지로 pod 만들기
- 일단 node부터 확인하자

  ```bash
  kubectl get nodes
  # NAME                          STATUS   ROLES                  AGE   VERSION
  # k8s-in-action-control-plane   Ready    control-plane,master   22h   v1.23.4
  ```

- pod를 만들어보자

  ```bash
  kubectl run helloworld --image=hello/alpine --port=5000
  kubectl get pods
  # NAME         READY   STATUS         RESTARTS   AGE
  # helloworld   0/1     ErrImagePull   0          8s
  ```
  - 이미지를 가져오는데 에러가 난다.
  - 확인해보니 registry에 올려둬야한다고 한다. dockerhub에는 올리기 싫어서, 지난번에 해봤던 docker registry를 먼저 띄워보기로 했다.

## docker registry 서비스를 로컬에 띄우고 모니터링하기
- pod를 만들어보자
  ```bash
  kubectl run registry --image=registry --port=5000
  kubectl get pods
  # NAME       READY   STATUS              RESTARTS   AGE
  # registry   0/1     ContainerCreating   0          7s
  ```
- pod로는 아무것도 할 수 없다. 서비스나 만들자

  ```yaml
  # registry.yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: registry-svc
    labels:
      app: registry-app
  spec:
    type: NodePort
    ports:
    - port: 5000
      protocol: TCP
      name: http
    selector:
      app: registry-app
  ---
  apiVersion: v1
  kind: ReplicationController
  metadata:
    name: registry-app
  spec:
    replicas: 1
    template:
      metadata:
        labels:
          app: registry-app
      spec:
        containers:
        - name: registry-app
          image: registry
          ports:
          - containerPort: 5000
  ```

- 적용하자 (밑에는 확인 내용)

  ```bash
  kubectl apply -f registry.yaml
  kubectl get pods
  # NAME                 READY   STATUS    RESTARTS   AGE
  # registry-app-pbsgj   1/1     Running   0          2m38s

  kubectl get rc # replicationcontroller
  # NAME           DESIRED   CURRENT   READY   AGE
  # registry-app   1         1         1       3m29s

  kubectl get service
  # NAME           TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
  # kubernetes     ClusterIP   10.96.0.1      <none>        443/TCP          23h
  # registry-svc   NodePort    10.96.19.170   <none>        5000:31758/TCP   3m50s
  ```

- Forwarding 해보자
  - port-forward, lb, ingress를 사용해야한다.
  - 일단 테스트용으로 port-foward로 하자, 어짜피 지금 registry에 storage 설정도 해줘야하니.. 다른거 설정 먼저 하고, ingress로 해보자.

  ```bash
  kubectl port-forward service/registry-svc 5000:5000
  # Forwarding from 127.0.0.1:5000 -> 5000
  # Forwarding from [::1]:5000 -> 5000
  ```

- docker image를 올려보자

  ```bash
  docker push localhost:5000/hello:0.0.1
  # The push refers to repository [localhost:5000/hello]
  # a22eeeafaac3: Layer already exists
  # 4f4ce317c6bb: Layer already exists
  # 0.0.1: digest: sha256:024c6fc4f5e35d336f9c7409454b5adbae9604e75f94d8b240319309a2e9224d size: 739
  ```

- 찾아보니 docker-registry-web 이라는게 있어서, 이걸로 gui를 사용할수 있다고 한다. 이것도 설정해보자.
  - 에러 찍어보니 image 자체가 실행이 안되는것 같다. 아키텍쳐 문제일수도 있으니 kube에 올리기전에 단독으로 실행해보자.

  ```bash
  docker run -it -p 8080:8080 --name registry-web \
  -e REGISTRY_URL=http://localhost:5000/v2 \
  -e REGISTRY_NAME=localhost:5000 \
  # WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
  # standard_init_linux.go:228: exec user process caused: exec format error
  ```

- 다른게 더 좋은듯? 빌드를 직접하려고 [repo](https://github.com/mkuchin/docker-registry-web/tree/v0.1.2) 가보니 6년전 commit 이다. [docker-registry-ui](https://github.com/Joxit/docker-registry-ui) 가 더 자주 쓰이는것 같아서 이걸 띄워보려고 시도하는 중이다.
- [k8s에 private registry 띄우는 블로그글](https://faun.pub/install-a-private-docker-container-registry-in-kubernetes-7fb25820fc61) 을 찾았다. 여기서는 helm 으로 뚝딱뚝딱하는데 좀 읽어봐야겠다.

---

- 뭔가 걍 감으로 때려맞추니까 안된다. 아래는 지금 registry.yaml 이다.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: registry-svc
  labels:
    app: registry-app
spec:
  type: NodePort
  ports:
  - name: http
    port: 5000
    protocol: TCP
  selector:
    app: registry-app
---
apiVersion: v1
kind: ReplicationController
metadata:
  name: registry-app
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: registry-app
    spec:
      containers:
      - name: registry-app
        image: registry
        ports:
        - containerPort: 5000
---
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
  labels:
    app: registry-web
    tier: frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
      - name: registry-web
        image: hyper/docker-registry-web
        ports:
        - containerPort: 4000
        env:
        - name: REGISTRY_NAME
          value: localhost:5000
        - name: REGISTRY_URL
          value: http://localhost:5000/v2
```

- 일단 해야할것 기억나는대로 아래 적어두기:
  - [ ] replicationcontroller 에서 replicaset으로 바꾸기
  - [ ] service 로 hyper/docker-registry-web 이랑 registry 랑 엮기
  - [ ] persistent volume
  - [ ] ingress
