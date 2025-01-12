---
layout  : wiki
title   : What If… Kube-Apiserver Could be Extended Via WebAssembly?
date    : 2022-08-11 01:58:52 +0900
lastmod : 2022-08-11 02:00:01 +0900
tags    : [kubecon, devops]
draft   : false
parent  : kubecon
---

[출처](https://www.youtube.com/watch?v=4CKcMZySUbc&list=PLj6h78yzYM2MCEgkd8zH0vJWF7jdQ-GRR&index=2)

## What is Web Assembly?

- Polyglot
  - Many langugages can be compiled to Wasm(Web assembly)
- Small
  - Like Container
- Portable
  - Can run on any architecture and any OS
- Secure
  - In sandbox
  - Memory safety
  - Control-flow integrity
  - Runtime isolation

## WebAssembly Outside of the Browser

- A new way to build and distribute applications
- Implement plugin systems

## Kubernetes Control Plan Extensibility

- Authentication and Autorization
- Scheduler
- Dynamic Admission Controllers

### Dynamic Admission Controller

- Authentication, Authorization
- Mutating admission
- Schema Validation
- Validating admission

## Introducting Kubewarden

- A policy engine for Kubernetes
- Its mission is to simplify the adoption of Policy As Code.

### Kubewarden Policies

- Written using:
  - Rust, Go, AssemblyScript, Swift
  - Rego
- Compiled to WebAssembly
- Distributed using container registries
- Signed and verified using Sigstore

### The Idea

- Define admission rules using WebAssembly modules
- Extend the API server to make use of WebAssembly-based rules

## What do we gain?

### Remove Uncertainty

- Webhooks rely on the network
- The network introduces many types of failures
- The network increase attack surface

### Limit Resource Usage

- A set of Kubernetes Cusom Resource Definitions
- ~~The Webhook server~~
- ~~The Controller that reconciles the Custom Resources~~

→ Great for Edge environments!

## The POC

- Leverage Kubewarden policies
- Introduce a new Kubernetes Feature Gate capable of running them

### The Biggest Challenge

- Major WebAssembly runtimes are not written in pure Go
- Initial approach: patch Kubernetes build system
- Iteration: custom build of wasmtime-go with musl libc
- Final solution, rely on the wazero runtime : pure Go, no usage of CGO

### POC: the Missing Details

- No support for Mutating policies
- Not implemented Kubewarden features offered to policy authors:
  - Policy tracing
  - Context aware information
  - Interactions with ocntainer registries
  - Sigstore primitives
  - Execute Rego policies built as WebAssembly modules
- Verify pulled policies using Sigstore
- Performance testing

## What’s Next?

---

### 개인 생각

- Kubewarden이 Kubernetes 에서 Policy를 관리하기 위한 프로젝트라는 것을 알게 되었다. (CRD 활용)
- 그리고 공식 홈페이지에서부터 Kubewarden 은 Kubernetes Dynamic Admission Controller 이고 WebAssembly 로 쓰여진 정책들로 요청을 검증한다고 나와있다.
- 와 이거 좀.. 어지럽다. 이게 맞나? 그러니까 다양한 언어로 policy를 구성하는걸 지원하기 위해서 wasm을 선택했고 kwctl 로 wasm 으로 compile 된 policy 를 제어하는거야?
- 강연만 들었을때는 잘 안 와닿았는데 문서를 읽어보니까 쉽지 않다. 이게 맞는 방향인지도 잘 모르겠다.
- 아.. 그래서 제목이 kube-apiserver 가 wasm으로 확장된다면이구나.. 아니 이거 런타임 구조가 어떻게 되는거지? wasm이 browser 가 아니라 standalone 으로 동작하는건가? standalone program 이 있어?
- 일단 다시 강연을 요약하자면, wasm을 선택한건 단순히 언어 확장성, 아키텍트에 영향을 덜받는것 뿐만 아니라 sandbox 가 된다는것도 중요한 요소라고 설명하고 있다. policy 를 관리하는 거니말이다.
- 뿐만 아니라 Webhook 으로 동작하는 것은 Network 를 사용하기에 불확정적인 성질이 있었는데 이런 점들이 제거되었다고 한다. 아직까진 많은 해결해야할 문제들이 남아있다곤 한다.
