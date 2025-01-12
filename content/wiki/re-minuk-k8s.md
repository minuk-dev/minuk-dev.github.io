---
layout  : wiki
title   : 다시 시작하는 쿠버네티스 세팅
summary : 처음부터 세팅 다시하기
date    : 2022-11-17 02:33:21 +0900
lastmod : 2022-11-29 00:31:26 +0900
tags    : [k8s]
draft   : false
parent  : devops
---

## 개요
- 뭔가 너무 막썻다. 처음부터 다시 천천히 기록하면서 클러스터를 세팅하자

### 목표
#### 인프라적 목표
- kubespray 를 통한 설치
- argocd 만 helm 으로 관리, 나머지는 모두 argocd 를 통한 gitops
- monitoring 을 위한 loki 와 grafana dashboard
- vault 와 harbor 설치

#### 사용 관점의 목표
- jupyter notebook 를 띄워서 언제나 접속해서 간단한 스크립팅을 할수 있는 환경
- 임시 pod 과 이를 위한 계정 발급을 통한 리눅스 샌드박스 서버 찍어내기
- github action runner 를 통한 다중 architecture 빌드 및 테스트 지원


### 1. kubespray 설정
- [참고자료](https://developer-ankiwoong.tistory.com/1673) :
  - 한국어로 되어있는 것중에서는 제일 괜찮은 듯

- **모든 노드에서** swap off

```bash
swapoff -a
```

- **모든 노드에서** ip_forward 설정을 한다.

```bash
echo 1 > /proc/sys/net/ipv4/ip_forward
# check configuration
# cat /proc/sys/net/ipv4/ip_forward
```

- **모든 노드에서** password 없이 root 를 사용할 수 있도록 설정한다.

```bash
groupadd wheel
usermod -G wheel <username>
# edit /etc/pam.d/su
# uncomment auth sufficient pam_wheel.so trust use_uid
# edit /etc/sudoers
# Add <username> ALL=(ALL) NOPASSWD: ALL
```


- 실행은 mac 에서 할것이므로 `/etc/hosts` 에 다음과 같이 내용을 추가한다.

```
192.168.0.8 master
192.168.0.9 worker1
```

- working directory 를 만들고 그곳에 asdf 를 통해 환경 버전관리를 한다.

```bash
mkdir -p ~/workspace/minuk-cluster
```

- kubespray repo clone

```bash
git clone https://github.com/kubernetes-sigs/kubespray
```

- install libraries

```bash
# on kubespray/
pip3 install -r requirements.txt
```

- configure inventory

```bash
cp -rfp inventory/sample inventory/minuk-cluster
```

```ini
[all]
master  ansible_user=<username> ansible_host=192.168.0.8 ip=192.168.0.8
worker1 ansible_user=<username> ansible_host=192.168.0.9 ip=192.168.0.9

[kube-master]
master

[etcd]
master

[kube-node]
worker1


[calico_rr]

[k8s_cluster:children]
kube_control_plane
kube_node
calico_rr
```

- provisioning cluster

```bash
ansible-playbook -i ./inventory/minuk-cluster/inventory.ini cluster.yml --become --become-user=root
```

  - 실제로 실행시켜보면, github 에서 파일 다운 받는데, 중간중간 실패한다. 단순히 다시 실행해주면 해결된다.
  - 다시 실행해도 안되면 reset 하고 다시 하면 된다.

    ```bash
    ansible-playbook -i ./inventory/minuk-cluster/inventory.ini reset.yml --become --become-user=root
    ```

- 중간에 이것저것 하다보니 calico 가 설치가 이상하게 되었다는 것을 알았다.:
  - `/opt/cni/calico` 와 관련되어 파일이 없다고 나올 때 : [다음 링크](https://projectcalico.docs.tigera.io/getting-started/kubernetes/hardway/install-cni-plugin) 를 참고하여 파일을 노드 위에 설치해주자

### 2. argocd 설정
- 앞으로 cluster 위의 모든 자원을 argocd 로 gitops 할 계획이므로, argocd 를 설치한다.
- 따라서, helm 으로 argocd 를 설치한다.

- [해당 디렉토리 확인](https://github.com/minuk-dev/minuk-cluster/tree/master/helm/argocd)

- argocd 초기 admin password 얻기

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

- argocd 에 접속하기(현재는 ingress 가 전혀 없으므로, 그냥 port-forward 로 접속한다.)

```bash
kubectl port-forward service/argocd-server -n argocd 8080:443
```

### 3. ingress 설정

- 일단은 익숙한 nginx 로 설정하자:
  - 나중에 istio 를 고민하자.

- [해당 디렉토리 확인](https://github.com/minuk-dev/minuk-cluster/tree/master/argocd/nginx-ingress-controller)

### 4. cert-manager, cluster issuer 설정

- 앞으로도 argocd 를 이렇게 접속할 수는 없다. nginx 로 설정해주기 전에 cluster issuer 를 등록해준다.
- [해당 디렉토리 확인](https://github.com/minuk-dev/minuk-cluster/tree/master/argocd/cert-manager)


- 드는 고민: 순서상으로 argocd 를 먼저 설치, nginx 를 그 다음에 설치했는데, 이제 nginx 에 argocd ingress 옵션을 켜주면 되긴 하는데, 이러면 순서대로 실행했을때 동일한 상태가 안나온다.:
  - argocd 를 깔때 nginx 에 대한 dependency 가 생기기 때문에
  - 결론 : values 를 두가지를 유지하자. 하나는 nginx 를 설치하기 전, 하나는 nginx 를 설치한 이후로 분리해서 보관하자. 일단은 시간이 늦었으니 고민만 해두고 오늘은 여기까지
