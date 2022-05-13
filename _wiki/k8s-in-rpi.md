---
layout  : wiki
title   : k8s-in-rpi
summary : 라즈베리파이에서 k8s 자습하기
date    : 2022-05-03 02:11:00 +0900
lastmod : 2022-05-14 07:42:56 +0900
tags    : [k8s]
draft   : false
parent  : kubernetes
---

## TODO (우선순위 순으로)
- docker registry 띄우기:
  - ui dashboard 띄우기
  - k8s 에서 image pull 하는 주소 추가
- grafana 관련:
  - alert용 email 설정하기
  - grafana dashboard를 통해 jupyter notebook 관련하여 모니터링할 수 있는지 확인하기
- jupyter notebook docker image custom build하기:
  - latex 관련 라이브러리 설치, git, tig 설치
  - pip, matplotlib 설치
- wiki 서비스 설치
- rstudio docker image 빌드후 업로드
- github 로 ci/cd pipeline 만들수 있는지 공부
- gitlab 올려서 private repo service 만들기

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

## 기본 설명
- 아래 서술하는 모든 내용은 [github repo](https://github.com/makerdark98/k8s-in-action-practice) 에 기록하고 있다.
- 언제나 repo가 더 최신이며, 이 이유는 하루 작업, 삽질한 내용을 이 문서에 다시 정리하는 식으로 공부하고 있기 때문이다.
- 따라서 repo 내용을 바로 읽을 수 있는 수준이라면 repo를 먼저 흝고 내용을 보는것이 더 효율적이다.
- 아래 내용은 시간 순서가 아니며, 여러 내용이 동시에 진행되고 있다. 하지만 나중에 작업한다면 반드시 선행되어야 하는 순서로 배치하고 있으니 참고하면 된다.

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
    kubeadmConfigPatches:
    - |
      kind: InitConfiguration
      nodeRegistration:
        kubeletExtraArgs:
          node-labels: "ingress-ready=true"
    extraPortMappings:
    - containerPort: 80
      hostPort: 80
      protocol: TCP
    - containerPort: 443
      hostPort: 443
      protocol: TCP
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

## Nginx Ingress 설정
- 참고자료:
  - [kind - nginx ingress 공식 문서](https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx)
  - [cert-manager 설치 공식문서](https://cert-manager.io/docs/installation/#default-static-install)

- nginx ingress 설치

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

- cert-manager 설치

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.8.0/cert-manager.yaml
```

- letsencrypt 관련된 clusterissuer 설정

```bash
# cluster-issuer.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    # The ACME server URL
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: makerdark98@gmail.com
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: letsencrypt-staging
    # Enable the HTTP-01 challenge provider
    solvers:
    # An empty 'selector' means that this solver matches all domains
    - selector: {}
      http01:
        ingress:
          class: nginx
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    # The ACME server URL
    server: https://acme-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: <mail address>
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: letsencrypt-prod
    # Enable the HTTP-01 challenge provider
    solvers:
    - http01:
        ingress:
          class: nginx
```

```bash
kubectl apply -f cluster-issuer.yaml
```

- ingress 설정
  - ingress namespace 생성

    ```bash
    kubectl create namespace ingress
    ```

  - ingress 설정 (참고로 이 문서 하단의 jupyter notebook과 grafana 가 포함되어 있다.)

    ```bash
    # ingress.yaml
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
    name: root-ingress
    namespace: ingress
    annotations:
      ingress.kubernetes.io/ssl-redirect: "true"
      kubernetes.io/ingress.class: nginx
      cert-manager.io/cluster-issuer: "letsencrypt-prod"
      kubernetes.io/tls-acme: "true"
    spec:
    tls:
    - hosts:
      - kube.makerdark98.dev
      secretName: letsencrypt-prod
    rules:
    - host: kube.makerdark98.dev
      http:
        paths:
        - path: /jupyter
          pathType: Prefix
          backend:
            service:
              name: headless-svc-base-notebook
              port:
                number: 80
        - path: /grafana
          pathType: Prefix
          backend:
            service:
              name: headless-svc-grafana
              port:
                number: 80
    ```

    ```bash
    kubectl apply -f ingress.yaml
    ```

### Troubleshooting
- 블로그 글마다 사용하고 있는 apiVersion이 제각각이다. 위 내용은 생각보다 엄청난 삽질을 통해서 얻어진 내용이고, 현재 기준(2022/05/14)으로 공식문서를 따른다.
- `networking.k8s.io/v1` 을 사용해야한다. 많은 블로그들이 `extensions/v1` 이런 류를 사용하고 있는데 점차 바꾸고 있는것 같다.
- certificate 또한 마찬가지이다. 블로그마다 내용이 다른데, 반드시 공식 문서를 읽어보자. 블로그는 대부분 과거 표준을 사용하고 있다.
- ingress 라는 이름의 namespace를 생성하여 사용하고 있는데, 이는 나중에 ExternalName 을 사용하는 서비스를 통해서 보내줘야한다.
- nginx ingress는 잘 동작하는 것같은데 내부 서비스로 연결이 안되는 거 같다면 다음 방법을 사용해보자:
  - k8s 내부에서 curl 을 사용하는 방법:

    ```bash
    kubectl run mycurlpod --image=curlimages/curl -i --tty -- sh
    ```

    - 위 명령어를 사용하면 k8s 내부에서 domain들이 잘 동작하고 있는지 확인할 수 있다 curl 명령어를 직접 날려보자.
    - 주의 : 반드시 다 사용했다면 pod 를 지워주자.

  - nginx ingress log 보는 방법:

    ```bash
    # kubectl get pod -n ingress-nginx 를 하였을 때 controller 이름을 확인한다.
    kubectl logs -n ingress-nginx ingress-nginx-controller-55c69f5f55-txnhj
    ```


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
kubectl edit configmap prometheus-grafana -n monitoring
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
    domain = kube.makerdark98.dev
    root_url = %(protocol)s://%(domain)s:%(http_port)s/grafana/
    serve_from_sub_path = true
# 생략
```

- 외부 namespace ingress 에서 사용 가능하도록 하자.

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: headless-svc-grafana
    namespace: ingress
  spec:
    type: ExternalName
    externalName: prometheus-grafana.monitoring.svc.cluster.local
  ```

  - 이 서비스를 ingress가 바라보도록 하면 된다:
    - 사실 효율적인지에 대한 고찰은 아직 끝내지 못했다. 그리고 비효율적일 것이라고 추정한다.
    - 하지만, 이 문서가 kind 위에서 rpi를 kube로 세팅하면서 devops를 공부하는데에 목표가 있으므로 아직 효율성은 논하지 않기로 하자.
    - 또한, 지금은 전부 하나의 local cluster 이므로 network를 실제로 타지 않고 memory에서만 동작하고 있으므로 이정도 비효율은 잠시 덮어두자.

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
  - Deployment를 건들여주면 될거 같긴 하다.

## Jupyter Notebook 설치
- 아래 설정을 읽어보자, 전부다 해놨다. k8s 에 대한 지식이 있다면 이해 가능

```yaml
# jupyter.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: jupyter-fileshare-pv
spec:
  storageClassName: manual
  volumeMode: Filesystem
  capacity:
    storage: 50Gi
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /tmp/data/jupyter
    type: Directory
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: fileshare-pvc
  labels:
    component: jupyter
spec:
  volumeMode: Filesystem
  storageClassName: manual
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 50Gi
  volumeName: jupyter-fileshare-pv
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: base-notebook
  labels:
    app: base-notebook
spec:
  replicas: 1
  selector:
    matchLabels:
      app: base-notebook
  template:
    metadata:
      labels:
        app: base-notebook
    spec:
      containers:
      - name: base-notebook
        image: jupyter/base-notebook:notebook-6.4.11
        # TODO: 이미지에 latex 관련된 파일 깔 수 있도록 custom docker image 사용하도록 변경하기
        ports:
        - containerPort: 8888
        command: ["start-notebook.sh"]
        args: ["--NotebookApp.password='<secret>'", "--NotebookApp.
ip='*'", "--NotebookApp.base_url='/jupyter'"]
        env:
          - name: DOCKER_STACKS_JUPYTER_CMD
            value: nbclassic
          - name: GRANT_SUDO
            value: "yes"
        volumeMounts:
        - name: storage
          mountPath: "/home/jovyan/work"
        securityContext:
          runAsUser: 0
      volumes:
      - name: storage
        persistentVolumeClaim:
          claimName: fileshare-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: base-notebook-svc
spec:
  type: LoadBalancer
  selector:
    app: base-notebook
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8888
```

```bash
kubectl apply -f jupyter.yaml
```

- monitoring tool 과 마찬가지로 ingress namespace 에서도 접근가능하도록 service를 만들어주자.

```yaml
# headless-svc.yaml
apiVersion: v1
kind: Service
metadata:
  name: headless-svc-base-notebook
  namespace: ingress
spec:
  type: ExternalName
  externalName: base-notebook-svc.jupyter.svc.cluster.local
```

```bash
kubectl apply -f headless-svc.yaml
```

### Troubleshooting
- 위와 같이 persistentvolume을 사용하면, 처음에 마운트된 폴더에 쓰기 권한이 없다는 것을 알 수 있다.
  - 이를 해결하기 위해서 SUDO 권한 옵션을 넣어서 Docker를 실행하고 있다.

    ```bash
    sudo chown -R jovyan:users work
    ```

- arm64용 jupyter notebook docker image는 아직 base 밖에 없는것 같다. 실제로 니즈가 없는 이미지이기도 하니 직접 빌드해서 사용한다고 생각하자.


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

