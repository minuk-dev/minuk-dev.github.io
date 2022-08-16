---
layout  : wiki
title   : Horizontal Pod AutoScaler
date    : 2022-08-11 13:36:02 +0900
lastmod : 2022-08-11 15:27:19 +0900
tags    : [devops, kubernetes]
draft   : false
parent  : devops
---

## 공부하게된 이유
- 면접때 autoscaling 에 대한 질문이 나왔는데 한번도 k8s 에서 auto scaling 을 해본적이 없었다.
- 모든 auto scaling 에 대한 답이 horizontal pod autoscaling 인 건 아니긴 하지만, 면접에서 요구한 건 이 지식이였다.
- [공식 문서](https://kubernetes.io/ko/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)를 따라하면서 한번 공부해보자.

## 개념
- 메트릭을 관찰해서 Deployment 의 scale을 변화시켜주는 구조.
- 명령을 실행하는 시점에서 최대, 최소의 scale 을 입력해준다.
- 추가적으로 메트릭을 임의로 정의해서 조절시킬수 있다.
- 공식 문서에 나와있는 기본 예제는 CPU 사용량을 기준으로 하고 있으며, 다양한 resource 에 대해서 기본적으로 지원한다.
