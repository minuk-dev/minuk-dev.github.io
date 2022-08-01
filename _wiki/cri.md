---
layout  : wiki
title   : CRI(Container Runtime Interface)
summary : CRI 관련 자료 모음
date    : 2022-08-01 17:08:45 +0900
lastmod : 2022-08-01 18:24:42 +0900
tags    : [devops]
draft   : false
parent  : devops
---

## 정의
- Container Runtime Interface

## 내가 이해한거 간단 정리
- k8s 가 다양한 container rumtime 을 지원하려고 하면서 공통된 interface 를 정의함.
- OCI 는 왜 또 정의되어있는가?:
  - CRI 는 go 언어 레벨의 interface 이므로, command level 표준 규격이 아님.
  - 이는 각각의 container runtime 마다 command 를 어떻게 실행할지에 대한 규약이 아님
  - 따라서 Command level, 동작 방식의 interface를 만들 필요가 있었고 이게 OCI 이다.
  - 물론, 더 많은 내용이 정의 되어있긴 한데, 이건 https://github.com/opencontainers 에 있는 프로젝트들을 참고.
- CRI-O 를 통해서 OCI를 따르는 컨테이너 라이브러리는 동작가능하다.:
  - 즉, CRI를 따로 구성하지 않아도 된다.
  - 더 자세한 설명은 아래 kubecon 영상 참조:
    - [Introduction to CRI-O](https://www.youtube.com/watch?v=V53nSS2mnsM)
    - [What's New in CRI-O](https://www.youtube.com/watch?v=ip7hupdSZS4)
