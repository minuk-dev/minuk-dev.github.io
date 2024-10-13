---
layout  : wiki
title   : Kubernetes Community Day 2024
summary : 
date    : 2024-09-24 13:36:50 +0900
lastmod : 2024-09-24 13:36:50 +0900
tags    : 
draft   : false
parent  : 
resource: 63902bc6-5eb3-4358-8665-ca30d121309d
---

## Kubernetes Kafka
- 신한카드 사례
- Strimizi & Kafka:
  - 왜 Kafka 를 kubernetes 에 올리냐?:
    - kubernetes 의 선언형 API
    - Kafka 의 설치와 운영 난이도
  - Strimzi: Kafka on Kuberntes in a few minutes
  - Kubernetes Operator 패턴으로 설치:
    - Helm 차트에서 Operator 로 넘어가는 중
  - KafkaConnect 로 배포하면 build 를 사용해서 원하는 Connect 와 조합해서 올리는 편함이 있다.
  - Kafka 주변도구:
    - Kafka UI
    - Apicurio Registry
  - 새롭게 배운거: ODD(Open Data Discovery) Platform, Kafka Exporter 가 선호된다, 
- Kafka 주변 도구
- Kafka 모니터링

## HA Kafka
- LoxiLB (CNCF Sandbox)
- NetLOX:
  - eBPF 재단 5G 에지
- 당했다. 나는 HA 와 Multi-AZ 와 Multi-Region 을 들으러 왔는데, LoxiLB 이야기가 너무 많이 나온다....
