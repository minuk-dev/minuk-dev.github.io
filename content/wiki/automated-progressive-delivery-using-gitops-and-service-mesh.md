---
layout  : wiki
title   : Automated Progressive Delivery Using GitOps and Service Mesh
date    : 2022-08-04 01:56:34 +0900
lastmod : 2022-08-04 01:59:01 +0900
tags    : [kubecon]
draft   : false
parent  : kubecon
---

- [원본링크](https://youtu.be/5Ko-CnP2qhA)

## Service Mesh
### K8s at scale at Intuit
### Why service mesh at Intuit?

- Provides > 30% network latency imporvement per API call by reducing hops
- East-West Communication Solution
  - Keep traffic in private network
    - Reduces cost
    - Removes redundant hops
    - Reduces Latency
  - Automates certificate management
    - No need for last-mile check
    - increases developer productivity
  - Provides Transactional visibility

### Istio architecture at Intuit
### Cross-cluster service discovery - With Service Mesh
- Admiral
- Called

---

### 개인 생각

- Intuit 회사에서 계속해서 K8s 의 수요가 증가하고 있으며, 단순한 API Gateway 구조로는 더이상 감당하기 힘든 단계가 다가오고 있다. 서비스 끼리 서로를 호출하는 구조라던가, 보안적인 관점에서 한계를 보인다.
- 궁금점 : mTLS 라는 단어가 지속적으로 등작하고 있는데 왜 m 이 붙었을까? mTLS 규격이 어떻게 될까?
- Istio architecture at Intuit 부분에서 L7 Proxy (Envoy) 를 통해서 Service 끼리 통신하고 있다는 것을 알 수 있다. 이는 layer 화를 하다보니 생기는 일인 것 같다.
- cluster 내부 를 넘어서 cluster 간에서도 serviceMesh 를 통해서 통신할 수 있다고 말하는게 인상 깊었다. [Admiral](https://github.com/istio-ecosystem/admiral) 이라는 라이브러리

---

## Progressive Delivery

### Progressive Delivery at Intuit

- Increase Operational Excellence
  - Minimize impact from change incidents
  - Reduce MTTR if and incident occur
  - Increase automation & reliability of deployment process
- Use Argo Rollouts
- Day 0 experience for new services
- Opt-in migration for existing services
- All configuration and templates stored in git
- Rollouts deployed and managed by Argo Team in “waves”

## Mesh + Progressive Delivery Challenges & Learnings

### Issues uncovered

- Using multiple traffic providers
- Incompatible mesh end point generation

### Onboarding 2000 services x 2

- Make migration easy and fun
- Stop the bleed

### Configuring analysis templates

- Low Service Commonality
  - Wide variety of services types
  - Strong seasonality
  - Different Traffic Patterns

    → Challenging to find the right metrics and thresholds


## What’s Next?

### Feature investment and research

- Traffic mirroring
- Header based routing
- Anomaly detection & observability

## Demo
