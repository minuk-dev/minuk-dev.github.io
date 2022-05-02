---
layout  : wiki
title   : k8s-in-rpi
summary : 라즈베리파이에서 k8s 자습하기
date    : 2022-05-03 02:11:00 +0900
lastmod : 2022-05-03 04:02:05 +0900
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
