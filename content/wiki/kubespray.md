---
layout  : wiki
title   : kubespray
date    : 2022-08-24 17:20:22 +0900
lastmod : 2022-08-24 18:56:18 +0900
tags    : [k8s, kubernetes, kubespray]
draft   : false
parent  : kubernetes
---

### 문서 목적
- kubespray 를 하면서 삽질한 내용 기록

### 참고자료
- [kubespray 이용하여 kubenetes 설치하기](https://www.whatwant.com/entry/Kubespray)
- [공식사이트](https://github.com/kubernetes-sigs/kubespray)

## 내가 한 일
- swap off:
  - 각 노드에서 아래 명령어를 실행해준다.

  ```bash
  sudo swapoff -a
  ```

- kubespray 를 clone 해준다.:

  ```bash
  git clone https://github.com/kubernetes-sigs/kubespray.git
  ```

- controlplane 이 될 곳에서 ansible 설정을 해준다.:
  - 그냥 linux 이기만 하면 된다. controlplane이 아니여도 된다.
  - mac 에서 실행하려고 하니 공식문서에 나와있는 ansible version 이 잘 설치가 안되서, 그냥 controlplane 에서 작업했다.

  ```bash
  VENVDIR=kubespray-venv
  KUBESPRAYDIR=kubespray
  ANSIBLE_VERSION=2.12
  virtualenv  --python=$(which python3) $VENVDIR
  source $VENVDIR/bin/activate
  cd $KUBESPRAYDIR
  pip install -U -r requirements-$ANSIBLE_VERSION.txt
  test -f requirements-$ANSIBLE_VERSION.yml && \
    ansible-galaxy role install -r requirements-$ANSIBLE_VERSION.yml && \
    ansible-galaxy collection -r requirements-$ANSIBLE_VERSION.yml
  ```


