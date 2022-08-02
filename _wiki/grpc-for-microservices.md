---
layout  : wiki
title   : gRPC For Microservices: Service-mesh and Observability
summary : kubecon north america 2022 발표 중 자료 정리
date    : 2022-08-02 23:00:08 +0900
lastmod : 2022-08-02 23:08:35 +0900
tags    : [kubecon, devops, grpc]
draft   : false
parent  : kubecon
---

- [원본 영상](https://www.youtube.com/watch?v=y2lKORewzJA)
- kubecon north america 2022 자료

## Intro to gRPC
### What is gRPC?
- Language & platform independent glue for microservices
- Created by Google, as next version of Stubby
    - Stubby connected large number of microservices at Google scale : O(10^10) RPCs per second
- Uses http2 and benefits from binary framing, multiplexing, streaming and HPACK compression
- Generally used with Protocbuf for payload serialization

- Use Protobuf IDL in .proto
- Generate sever & client subs using protoc compiler
- Extend server stub to add server logic
- Use client stub to invoke methods
- Note : protobuf is not mandatory to use gPRC
    - There are other integrations like google/flatbuffers and Microsoft/bond

---
### 개인 정리
- gRPC는 http2 위에서, binary, streaming 등의 특성을 가지고 있고 일반적으로는 Protobuf 로 직렬화한다.
- 궁금점 : http2 위인데 어떻게 양방향이 보장되지? 브라우저에서 동작하는 gRPC-web 은 단방향이라고 명시되어 있는데?:
  - 찾아본 결과 : http2 자체가 bidirectional flow 이다. [출처 : RFC 7540](https://datatracker.ietf.org/doc/html/rfc7540)
  - 결론 : http2 에 대해서 제대로 모르는 것 같다. 이번주 중으로 http2 를 추가로 공부하자.

- 공부하면서 추가적으로 알게 된 것 : gRPC는 http2 에서 동작하고 단일 http2 연결에서 stream이 너무 많으면 스트림 간의 쓰레드 경합이 발생하고 연결 패킷 손실로 인해서 결국에는 호출이 차단된다. [출처- msdn](https://docs.microsoft.com/ko-kr/aspnet/core/grpc/performance?view=aspnetcore-6.0)
- protobuf 가 필수는 아니지만, 이미 많은 지원이 되어있다. 물론 flatbuffers, bond 와 같은 대체 프로젝트들도 있다.

---

## Protobuf

What’s Protobuf aka Protocol Buffers?

- Google’s Lingua Franca for serializing data : on the network and in storage
- Strongly typed
- Binary format
- Extensibility and backward compatibility
- Code generators for Java, C++, Go and many other languages

## Why gRPC?

- Multi-language
- On every platform
- Strict Service contracts
- Performant & Efficient on wire
- Extensible, Customizable
- Easy to use
- Streaming, BiDiStreaming APIs
- Open & Standard compliant
- Production Ready

---

## gRPC in Microservice & Service Mesh

- New paradigm: convert a monolithic application into a mesh of microservices
- In-process calls become gRPC calls between microservices over the network
- Scaling involves new VMs/clusters/networks and RPCs crossing the boundaries
- Need to manage traffic and security now!
- Servie Mesh to the Rescue!
---

### 개인 정리
monolithic 에서 microservice 로, microservice의 복잡성을 해결하기 위해 mesh 로 패러다임이 변화하고 있고 이런 상황에서 gRPC는 아주 좋은 선택이다. 이제 트래픽과 보안을 관리하는 방법을 알아보자.

---

## So What’s a Service Mesh?

- Policies for Traffic Management and Security
- Control Plane (e.g. Istio) stores and manges policies
- In the proxy mode transparent proxies enforce/implement politices
- gRPC sends requests to the virtual IP of the service
- Proxy interrupts requests, applies policies and forwards to local service instance
- But with gRPC, there is proxyless mode!

---
### 개인 정리
- 원본 영상에서는 performance 비교를 한다.
- gRPC는 proxyless mode를 지원하고 이를 사용하게 되면 그렇지 않았을때(대조군 envoy)에 비해 자원 사용량과 성능 측면에서 장점을 보인다.

- 궁금점 : proxyless mode? 그게 어떻게 가능하지? 이렇게 되면 기껏 msa 복잡성을 낮추기 위해 mesh를 도입하고 endpoint를 추상화한게 다 무효 아닌가?:
  - 해결 : 찾아보니 Istio (일반적으로 kubernetes 에서 service mesh로 쓰는 프레임워크) 에서 지원해주는 것이였다. [출처 - istio 공식 문서]([https://istio.io/v1.12/blog/2021/proxyless-grpc/](https://istio.io/v1.12/blog/2021/proxyless-grpc/))
  - 구체적인 동작 방식은 [Proxyless gRPC]([https://www.youtube.com/watch?v=zOEtoHTEZWQ](https://www.youtube.com/watch?v=zOEtoHTEZWQ)) 의 10분 20초 경 architecture 그림을 보면 빨리 다가온다.

---
## Service Mesh With xDS

- xDS Data Plane APIs from Envoy: Open & Extensible
- Right choice for gRPC Service Mesh!

## Security In the Service Mesh

Why is Security SO Important?

- Remember the paradigm shift of breaking a monolith into microservices?
- In-process calls are now gRPC calls between microservices over the network
- This is network traffic needs to be authenticated, encrypted and authority.

## Service Mesh with Security

- Security Infrastructure provides certificates and keys
- Control plane configures mTCS in CDS(client side) or LDS(servce side)
- gRPC uses provided certs and transport_socket configuration to create mTLS connections
- mTLS gives you encryption + authentication + server authorization
- Server uses “authorization policy” aka RBAC to autorize RPCs based on client identities

## Using gRPC in Proxyless Service Mesh.

## gRPC Microservices & Observability

- Using gRPC, a monolith now split into microservices spread over diverse infrastructure
- Behavior of the “system” now dependent on individual microservices, network, compute & other infrastructure
- If an issue aries, how can we debug and fix it? needed to incrase reliability and efficiency of this new paradigm
- We need an “observable’ system where internal state is visible or can be inferred
- Can gRPC provide this “observability” into your microservices?

## gRPC Observability

- 3 traditional pillars of observability: logs, metrics and traces
- Use gRPC’s “interceptor” framework to collect the raw data for the 3 pillars
- Integrate with exporters and anlytics backends to provide end-to-end observability

## gRPC Observability aka O11y

---

### 개인 생각
- grpc 를 사용하려면 결국에는 잘 확인할수 있어야한다. logs나 metrics 이나 어떻게 흘러갔는지 trace 같은 걸 말이다.
- 단적인 사례로 [뱅크샐러드 기술블로그 - 프로덕션 환경에서 사용하는 golang과 gRPC](https://blog.banksalad.com/tech/production-ready-grpc-in-golang/) 를 읽어보면 얼마나 이를 위해서 노력하는지 알수 있다.
- 개인 생각 : HTTP는 아주 오랜기간 사용되었고, 정말 넓은 분야에서 사용되었기에 충분한 시각화, 질의 도구들이 있다. 하지만 gRPC가 이것들이 부족함을 지적하는 파트라고 생각한다.

---

## gRPC Observability in GCP

- gRPC library enhanced with necessary plugins for logging, metrics & traces
- Raw data exported via Stackdriver exporters to Google CloudOps backend
- Admin console to enable/administer feature
- Consumer dashboard to visualize

### gRPC Observability with Java

- grpc-gcp-observability artifact to be added to your application build
- grpc-gcp-observability pulls in other required dependencies e.g. Stackdriver exporter
- Call observability init() from the app
- You get observability when application run in Google Cloud and with appropriate config

### gRPC Observability: Metrics & Trace

- Private Preview of Metrics & Traces coming soon- before end of Q2’22 for Java and Go
- Integrated with Google Cloud Monitoring and Google Cloud Trace
- Incorporate metrics views into Minotoring dashboards and charts
- Trace Overview shows recent traces: select individual trace to see breakdown of traffic

---

### 개인 생각
- gcp 에서 사용하면 기본적으로 이런 도구들을 제공한다는 일종의 홍보라고 해석했다.
- 근데 proxyless 사용하면 이 기능 제한된다고 홈페이지에 나와있던데 … [출처 - gcp Traffic Director 문서]([https://cloud.google.com/traffic-director/docs/limitations-proxyless?hl=ko](https://cloud.google.com/traffic-director/docs/limitations-proxyless?hl=ko))


---
# 정리
## 새롭게 알게된 것
- http2 가 양방향을 지원하고 이를 grpc가 적극 사용하고 있다.
  - http2 에 대한 공부가 더 필요하다.
- istio 의 내부 동작 구조
  - 기존에는 proxy를 써서 어떻게 동작했는지, proxyless를 사용하려면 어떻게 동작해야하는지에 대해서 대략적으로 알게되었다.
- observability의 3가지: logs, metrics, traces
  - 대략 감만 있었는데 명확히 써놓으니까 더 잘 다가온다.
- 뱅크샐러드가 프로덕션에서 grpc를 사용하기 위해서 노력한 것들:
  - 관련 자료 찾아보면서 글을 발견해서 찾아보게 되었다.
