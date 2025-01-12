---
layout  : wiki
title   : Making Your Apps and Infrastructure Services Failure-Resilient with Dapr
date    : 2022-09-07 00:57:53 +0900
lastmod : 2022-09-09 21:18:09 +0900
tags    : [kubecon, kubernetes, k8s]
parent  : kubecon
---

- [원본 링크](https://youtu.be/Jw05zFpsPms)

## What is Dapr?
- [Dapr : Distributed Application Runtime](https://dapr.io/)

### Sidecar
- Dapr API (HTTP/gRPC)

### Dapr Components
- State Stores
- Pubsub Brokers
- Bindings & Triggers
- Secret Stores
- Observability
- Configuration

## Resiliency
- State Management
- Application Configuration
- Input Binding
- Service Invocation
- Secret Management
- Publish & Subscribe
- Output Binding

## Resiliency Configuration YAML
### Resiliency as CRD
- In kubernetes Resiliency is defined as a CRD
- Allows for multiple policies to be defined
- Dapr merges all found policies into singl configuration

### Resiliency Policies
- Timeouts:
  - Allows for the cancellation of requets after a given duration
- Regries:
  - Allows for the generic retrying of a request or operation
  - Two supported retry types. constant and exponential
  - Can specify erros which are retryable and permanent
- Circuit Breakers:
  - Allows for broken/breaking systems to be cut-off from requests
  - Helps reduce traffic and requests to allow for recovery time

#### Resiliency Policies - Retries
- Constant Policieis:
  - maxRetries - The maximum number of attempts to make for a request
  - duration - The time in-between retries
- Exponential Policies:
  - maxRetries - The maximum number of attempts to make for a request
  - initialinterval - The starting time between retries
  - randomizationFactor - Jitter used to offset requests
  - multiplier - Growth rate of the retry interval
  - maxInterval - The maximum duration between retries
  - maxElapsedTime - The maximum time spent over all retries

#### Resiliency Policies - Circuit Breakers
- maxRequets - The maximum number of requets allowed while the breakers is in the half-open state
- interval - The cyclical period that errors are evaluated in, if not specified the evaluation period is continuous
- timeout - the Time in which the circuit breaker will remain open after breaking
- trip - The criteria that errors are evaluated against to trigger state changes

### Resiliency Targets
- Can be defined as Applications, Actors, and Components
- A target maps the policies to be used when calling into a system

## 개인 생각
- 전반적으로 kubecon 이 자기가 만들거나 사용하고 있는 프로그램을 소개할수 밖에 없는 구조 이긴한데, 이건 좀 그냥 그랬다.
- 그냥 아.. 있나보다 싶은 생각?
- 굳이 공부한 거라고는 Policy 마다 저런 요소들을 고민해야한다 정도?
- 실제로 내가 Dapr 을 쓸께아니라면, 그닥 매력적인 강연은 아닌것 같다.
