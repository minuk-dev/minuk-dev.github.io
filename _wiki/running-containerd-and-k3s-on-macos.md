---
layout  : wiki
title   : Running Containerd and k3s on MacOS
date    : 2022-08-19 01:01:46 +0900
lastmod : 2022-08-19 01:48:53 +0900
tags    : [kubecon, containerd]
draft   : false
parent  : kubecon
---

- [원본](https://youtu.be/g5GCsbjkzRM), Kubecon EU 2022
- [Slide](https://static.sched.com/hosted_files/kccnceu2022/5f/lima.pdf)
- [Slide 출처](https://events.linuxfoundation.org/archive/2022/kubecon-cloudnativecon-europe/program/schedule/)

## Why run containers on macOS?
- 2022 is The Year of the Linux Desktop
- But ordinary developers still need macOS (or Windows)
- Almost solely for the dev & test environment
- Not the best fit for running a production server

## Existing methods
- Docker Desktop for Mac has been the popular solution

- Supports automatic host filesystem sharing
- Supports automatic port forwarding
- But proprietary

- Just install Docker and Kubernetes inside a Linux VM? Maybe via minikube?:
  - VMWare Fusion and Parallels are proprietary
  - VirtualBox is FLOSS but won't support M1
  - QEMU is FLOSS and supports M1, but still:
    - Not easy to access the host FS from the containers
    - Not easy to access the container ports from the host

## Our solution: Lima
- Similar to WSL2 but for macOS hosts

- Automatic host filesystem sharing
- Automatic port forwarding
- Built-in integration for containerd

## Lima = LInux MAchine
- Originally designed as "containerd machine" to mimic Docker Machine
- The scope was extended immediately to cover other use cases too
- Still focuses on containerd and k3s

## continaerd with Lima
- continared: the de facto standard container runtime:
  - CNCF Graudated project
  - Not just made for Kubernetes
  - Provides the docker-compatible CLI too: nerdctl
  - With a lot of cutting-edge features:
    - Lazy-pulling, IPFS, OCIcryupt, Faster rootless...

- Lima provides built-in support for containerd
- Even supports running Intel(AMD64) containers on M1(ARM64) and vice versa, using [tonistiigi/binfmt](https://github.com/tonistiigi/binfmt)

## k3s with Lima
- k3s: Lightweight Kubernetes:
  - CNCF Sandbox project
  - Adopts containerd as the CRI runtime
  - Works with Lima too

## Extra: Docker with Lima
- The original design was only to support containerd, but the scope is now expanded to support Docker Engine too

## Extra: Podman with Lima

## How it works: Hypervisor
- Vanilla QEMU
- Supports both Intel and ARM
- Even supports Intel-on-ARM and ARM-on-Intel (slow though)
- FAQ: why not use Apple's Virtualization.framework?:
  - Proprietary
  - Limited functionalities

## How it works: Filesystem sharing
- Lima < 1.0 : reverse SSHFS:
  - macOS works as an SSH client but as an SFTP server
  - Linux works an SSH server but as an SFTP client
- Lima >= 1.0 : virtio-9p-pci, aka virtfs( not virtio-fs):
  - Less weirdness
  - Lima 1.0 is probably available by the time of KubeCon

- FAQ: why not use virtio-fs (faster than virtfs) ?:
  - QEMU still doesn't implement virtio-fs for macOS hosts
  - Apple's Virtualization.framework implements virtio-fs, but it is proprietary and lacks other functionalities

## How its works: Port forwarding
- THe guest is accessible as localhost from the host
- Watch guest events, and run `ssh -L` to let SSH forward TCP ports
- Event sources:
  - `/proc/net/{tcp,tcp6}`: For non-CNI ports
  - `iptables`, `AUDIT_NETFILTER_CFG` : For CNI ports

## Enterprise DNS Requirements
- Use nameservers from VPN connections
- Support for split-DNS
- Other QEMU DNS limitations:
  - Picks single random nameserver from `/etc/resolv.conf`
  - Cannot support mDNS
  - Doesn't load `/etc/hosts` from the host

## How it works: Host Resolver
- 여긴 그림이 있는데, 그림은 글 상단의 Slide Page 19 를 참고하면 된다.
- 대충 이해한대로 설명을 써보자면,:
  - Lima VM 은 QEMU 내부에서 실행되며, QEMU Internal Network 에 Virtual Network 로 붙어있다.
  - QEMU 내부에 존재하며, Host 와 연결을 해주는 HostGateWay로 Resolver를 요청한다.
  - HostGateway는 Host 위에서 동작하는 Lima Host Agent에 있는 Host Resolver와 DNS over UDP&TCP 로 통신한다.
  - 즉, 기존에 QEMU 내에 구현되어있던 DNS가 `/etc/resolv.conf` 에서 무작위로 선택하는 방식에서, macOS resolver를 최종적으로 호출하는 구조를 형성하여 `/etc/resolv.conf`, `/etc/hosts`, mdnsResponder, VPN 등에서 Domain Name을 가져오는게 가능해졌다.
- 영상에서 굉장히 설명을 깔끔하게 잘하고 있으니 영상을 설명을 들으면 좋다.

## How it works: Proxy Settings
1. Network settings
2. lima.yaml
3. Environment variable

- 이것만 적어두면 조금 이해가 어려운데, Host Netowrk를 설정하고, lima.yaml 에 환경변수로 `https_proxy`,`http_proxy`를 127.0.0.1 에서 192.168.5.2 로 교체, 나머지 환경변수들을 설정해둔뒤 lima를 시작하면 된다.
- 궁금점 : 192.168.5.2 는 고정인건가?

## Port Forwarding Limitations
- Port forwarding is delayed up to 3s due to polling
- Port may already be in use on the host
- Guest IP != Host IP breaks external IP for k8s services
- UDP is not supported by ssh port forwarding

## How it works: vde_vmnet
- 이거 글로만 적으려니 어렵다. Slide 22 쪽을 참고하자. 그림은 그렇게 어렵지 않다.

## Lima community after one year
- 45 contributors
- 400 merged pull requests
- 26 releases
- 8k stars on Github

## Third party FOSS projects
- Lima-GUI
- Colima
- Rancher Desktop


---
## 개인생각
- UDP 가 안된다는건 이거 안들었으면 몰랐을것 같다. Network를 이런식으로 구성해놨는지 몰랐다.
- lima 를 굉장히 자주 사용하고 있는데, 쓰면서 큰 장애를 못느꼇는데 생각보다 안되는게 좀 있었다는게 신기하다.
- hosts 파일이라던가 몇몇 기능을 지원하기 위해서 lima agent 를 띄우는 방식은 참신하다. 하지만 근본적인 해결책이라고 보이지는 않는다. QEMU 는 보안상, 또는 기능상의 이유로 막아두었을텐데 왜 그런지 좀 알았으면 이해가 더 좋았을 것같다.
- filesystem layer에 대해서 고민을 많이한게 보인다.
