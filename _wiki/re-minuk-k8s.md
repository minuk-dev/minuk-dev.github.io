---
layout  : wiki
title   : 다시 시작하는 쿠버네티스 세팅
summary : 처음부터 세팅 다시하기
date    : 2022-11-17 02:33:21 +0900
lastmod : 2022-11-28 00:39:30 +0900
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

## 할일 목록
- [ ] kubespray 스크립팅


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
