---
layout  : wiki
title   : k8s-in-rpi
summary : 라즈베리파이에서 k8s 자습하기
date    : 2022-05-03 02:11:00 +0900
lastmod : 2022-05-13 04:32:08 +0900
tags    : [k8s]
draft   : false
parent  : kubernetes
---

## TODO (우선순위 순으로)
- nginx ingress 설정:
  - nginx ingress 생성
  - ssl 인증서 등록 (docker.makerdark98.dev)
  - docker registry 연결
- docker registry 띄우기:
  - ui dashboard 띄우기
  - k8s 에서 image pull 하는 주소 추가

- Jupyter notebook 위에 latex 관련 파일 설정한 이미지 만들어 service 재구성

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
  - 사용하다 보니, PersistentVolume 을 사용할때 hostPath를 사용할 일이 있었다. 아래와 같이 설정해주자.

  ```yaml
  # kind.yaml
  kind: Cluster
  apiVersion: kind.x-k8s.io/v1alpha4
  nodes:
  - role: control-plane
    extraMounts:
    - hostPath: /home/lmu/tools/kind/data
      containerPath: /tmp/data
  ```

  ```bash
  kind create cluster --name k8s-in-action --config kind.yaml
  ```

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

### Troubleshooting
  ```
  Error: failed to create cluster: failed to init node with kubeadm: command "docker exec --privileged <cluster name>-control-plane kubeadm init --skip-phases=pre flight --config=/kind/kubeadm.conf --skip-token-print --v=6
  ```

  - 커널 설정이 잘못되어있어인가 싶어서 https://lance.tistory.com/5 내용을 일부(2-4) 적용해본다.
    - 3번 과정에서 `/boot/firmware/cmdline.txt` 로 바꾸었다.
    - 바로 안되길레 실망했지만, reboot 하니까 kind가 정상 작동한다.
    - 아마도 추정은 iptables 문제이지 않을까? 싶다. 에러메시지들을 읽어보니 정상 실행은 됬는데 kubelet에서 api point를 못찾는 메시지가 출력됬었던걸로 기억

## Node monitoring tool 설치
- 참고자료
  - [helm을 통한 prometheus, grafana 설치](https://k21academy.com/docker-kubernetes/prometheus-grafana-monitoring/)
  - [grafana dashboard](https://hkjeon2.tistory.com/83)

- helm 을 통해서 monitoring 툴(prometheus, grafana) 설치
```bash
kubectl create namespace monitoring
helm install --namespace monitoring prometheus prometheus-community/kube-prometheus-stack
```

- 외부접속 가능하도록 ConfigMap 수정
```bash
kubectl edit configmap prometheus-grafana
```

```yaml
# 생략
apiVersion: v1
data:
  grafana.ini: |
    [analytics]
    check_for_updates = true
    [grafana_net]
    url = https://grafana.net
    [log]
    mode = console
    [paths]
    data = /var/lib/grafana/
    logs = /var/log/grafana
    plugins = /var/lib/grafana/plugins
    provisioning = /etc/grafana/provisioning
    [server]
    domain = lmu.makerdark98.dev
    root_url = %(protocol)s://%(domain)s:%(http_port)s/grafana/
    serve_from_sub_path = true
# 생략
```

- 지금 나는 이미 kube 바깥에 nginx 가 있는 상황이다. 여기서 9000 번으로 reverse proxy 해준뒤 port-forward 한다.
```
server {
        charset        utf-8;
        server_name lmu.makerdark98.dev;

        location /grafana/ {
          proxy_set_header Host $http_host;
          proxy_pass http://localhost:9000/;
        }

        # Proxy Grafana Live WebSocket connections.
        location /grafana/api/live {
          rewrite  ^/grafana/(.*)  /$1 break;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection $connection_upgrade;
          proxy_set_header Host $http_host;
          proxy_pass http://localhost:9000/;
        }
        # 후략
}
```

```
kubectl port-forward deployment/prometheus-grafana 9000:3000
```

- Dashboard 구성
  - [Create]-[Import] 한뒤 아래 주소를 넣어주자.
    - https://grafana.com/grafana/dashboards/11074
  - 직접 만들어도 되긴 하지만, 지금 중요한 건 아니다.

### Troubleshooting
- 위와 같이 설치했을 때, grafana password 를 모르겠을 때
  - 아래 명령어를 실행해서 grafana password를 알아내자.

  ```
  kubectl get secrets prometheus-grafana -o jsonpath="{.data.admin-password}" -n monitoring | base64 --decode
  ```

- ConfigMap 설정해도 접속 안될때
  - pod를 재시작 시켜줘야하는 거 같은데 나같은 경우에는 그냥 rpi를 껏다 켰다.

## Docker registry, Web UI 띄우기
- 참고 :
  - [k8s에 private registry 띄우는 블로그글](https://faun.pub/install-a-private-docker-container-registry-in-kubernetes-7fb25820fc61) 을 찾았다.

- 먼저 namespace 를 만들어준다.

  ```bash
  kubectl create namespace registry
  ```

- PV와 PVC를 만들어 준다.
  ```yaml
  # registry.yaml
  apiVersion: v1
  kind: PersistentVolume
  metadata:
    name: docker-registry-pv
  spec:
    capacity:
      storage: 20Gi
    volumeMode: Filesystem
    accessModes:
    - ReadWriteOnce
    persistentVolumeReclaimPolicy: Delete
    storageClassName: docker-registry-local-storage
    local:
      path: /tmp/data/registry
    nodeAffinity:
      required:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/hostname
            operator: In
            values:
            - k8s-in-action-control-plane
  ---
  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: docker-registry-pv-claim
  spec:
    accessModes:
      - ReadWriteOnce
    volumeMode: Filesystem
    resources:
      requests:
        storage: 20Gi
    storageClassName: docker-registry-local-storage
  ```

  ```bash
  kubectl apply -f registry.yaml -n registry
  ```

- registry를 설치한다.
    ```bash
    helm upgrade --install docker-registry \
    --namespace registry \
    --set replicaCount=1 \
    --set persistence.enabled=true \
    --set persistence.size=20Gi \
    --set persistence.deleteEnabled=true \
    --set persistence.storageClass=docker-registry-local-storage \
    --set persistence.existingClaim=docker-registry-pv-claim \
    --set secrets.htpasswd=$(cat $HOME/temp/registry-creds/htpasswd) \
    --set nodeSelector.node-type=master \
    twuni/docker-registry \
    --version 1.10.1
    ```


### Troubleshooting

## Jupyter Notebook 설치
- jupyter notebook server도 k8s 안으로 넣으려고 한다.
- 지금 PV 관련 삽질중이라서, 삽질 다 끝내면 정리를 추가로 해야겠다.
- 이것만 넣으면, nginx도 안쪽으로 넣어야겠다.

---

## TODO: 실습하기
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
