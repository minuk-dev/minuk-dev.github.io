---
layout  : wiki
title   : Deep Dive into Minikube
date    : 2022-09-21 01:59:49 +0900
lastmod : 2022-09-21 02:58:44 +0900
tags    : [kubecon, k8s, kubernetes, minikube]
draft   : false
parent  : kubecon
---

- [원본](https://youtu.be/Iyq_MlSku-I)

## It all started in 2016
- Minkube was created 6 years ago by Google to alleviate the difficulties that developers had when setting up a Kubernetes environment for local development

### OK Google ... Assist the developers please!
- Google has continued to evolve the Minikube project to grow the Kubernetes ecosystem by making Kubernetes development more attractive and frictionless

## Primary Goal
- make it simple to run Kubernetes locally for learning and day-to-day development, testing & debugging workflows:
  1. inclusive
  2. Community-driven
  3. User-friendly
  4. Support all Kubernetes features
  5. Cross-platform
  6. Reliable
  7. High Performance
  8. Developer Focused

### Our first Integration tests ran in the office.
- Minikube's VM drivers needed Baremetal servers with virtualization enabled.
- Nested Virtualization only available for certain Linux Distros

### It takes a village to test Minikube
- Minikube is the most tested local Kubernetes tool.:
  - 46 Self-hosted CI VMs in 5 different clouds (GCP, AWS, Equinix Metal, Azure, Macstadium) + Prow and Github Action
  - 296 end to end tests in integration testing suite
  - 100 unit tests

## Flake Rate System
- Problem:
  - Running hundreds of test cases on dozen platforms, there are always some flaky test that fail 10-15% of the time on Master.
  - Reviewer had to have a lot of context to approve a PR with failed test.
- Solution:
  - Run tests on master regularly, generate failed rate on master.
  - On each PR comments how many of the Failed tests are a known Flake
  - Automatically create Github issue for frequently failing test.
  - Generate Visualized
- Minikube's Flake Rate System is built on top of Gopogh

### What is Gopogh? - Reducing Squinting for go developers
- Problem: Failed minikube test logs come with thousands of lines of post mortem logs low-level system logs. (sometimes 10K lines) that makes it very hard to see what log is for what!:
  - Created in a hackathon with a funny name

## Minikube speaks your language

## Checkout Minikube's Side Project!
- Slow jam
- Triage Party
- Gopogh
- Time To k8s
- Minikube-CI
- Pull Sheet

## The story of Kbuernetes 1.24...
- Kubernetes removed the code for supporting docker runtime
- CNI...
- Cgroup V2...

### Minikube continues to support docker-env
- Users love "min8ikube docker-env"(building images directly on the cluster) and we can't blame them, it is 36X time faster than Image load.

## Minikube CPU usage overtime
- Save energy by using these Minikube features Features that can save energy:
  - try "minikube pause"
  - Auto-Pause Addon

## Benchmarking
- Measure Weekly/Daily and per release
- Measure agsinst similar tools

## Minikube's Base Image
### Did you know minikube maintains its own linux?
- Hand Crafted - Just enough Linux for Kubernetes
- Small ISO - 280MB
- Based on CoreOS BUildroot
- Might Graduate out of Minikube to is own repo
- Advantages:
  - Granular control of enabled kernel modules and packages
  - Tailored for Kubernetes

### Types of Minikube users
- Learn Kubernetes
- Develop on Kubernetes
- Test/CI

### New category of minikube users!
- Tens of Blog posts, tweets and survey comments shows that a lot of new users are using minikube merely as a Docker Desktop Replacement.

### minikube start -no-kubernetes?
- IMO : ?? what?

### Top differentiators Minikube vs similar tools
- Multiple container runtimes for Kubernetes
- Direct access to container runtime for faster image build
- Integration tests (most comprehensive)

## Advantages of VM Drivers
- No need to have Docker Desktop License
- Less CPU usage
- You can hit the port directly (for example if you have a hotspot service running on port 80 you can curl $(minikube ip):80 on your machine vs Docker Drive that by design needs to be assigned a random port.)

## Tens of Survey Requests for VM driver on M1/Arm64
### 1. Try Qemu Driver on Apple M1
- Qemu driver is finally available for Arm64 and M1
- This means on Arm-based machines like Apple M1 you could have a Kbuernetes experience without having to have Docker Desktop.

### Challenges of adding ARM64 ISO
- Slow iteration of testing
- BIOS/EFI
- AppArmor
- Lack of team familiarity with Buildroot

### 2. Try Early prototype of Minikube-GUI
- Go to minikube website
- Search for Minikube GUI
- Things to try:
  - Simplified View (one cluster)
  - Advanced View (multi cluster)
  - Right click tray icon

## 개인 생각
- 개인적으로 퀄리티가 굉장히 좋은 강연이였다.
- 일단:
  - minikube에 대한 간략한 설명(k8s 에 고통을 덜기위해)
  - 왜 써야하는지 (안정성)
  - 겪고 있는 문제(flake, k8s 1.24)
  - 화제거리(docker 를 사용하기 위해 k8s 없이 minikube 를 돌릴수 있게 해달라)
  - 새로운 소식(M1 에 대한 지원, GUI 지원)
- 위 사항들을 모두 요약한 좋은 강연이였다고 생각된다.
- 다만 아쉬운 점은 최근 이야기가 많이 나오고 있는 k3s라던가 minikube 가 내부적으로 어떻게 동작하는지에 대한 설명이 있었으면 좋았을 거 같은데, 사실 이건 시간 관계상 하기 어렵기도 하고 minikube 를 사용하는 사람이 아닌 개발하는 사람에게 필요한 내용이므로 적합하지 않다고 생각해서 뺀것 같다. (혹은 예전에 이미 했어서 중복되서 안하거나?)
- 이 강연을 통해서 얻게된 내용:
  - minikube 내부구조를 살짝 공부하고, kind(kubernetes in docker) 와 k3s 와 비교해봐야겠다. (목적성이나 구조적인 문제 둘다)
  - 중간에 소개해줬던 내부 툴 repo를 살펴봤는데, 현재 사용하고 있지만 툴 자체가 발전하지는 않는 상황인것 같다. 살펴봐야겠다.
