---
layout  : wiki
title   : Intro to Kubernetes, GitOps, and Observability Hands-On Tutorial
date    : 2022-08-25 00:06:14 +0900
lastmod : 2022-08-26 04:23:12 +0900
tags    : [kubecon, kubernetes, k8s]
draft   : false
parent  : kubecon
---

- [원본](https://www.youtube.com/watch?v=WKvogzTg2iM)

- 기본적으로 따라서 하는 Hands On Tutorial 강의이다.

## Intro to Kubernetes
- Oss CNCF graduated project for container orchestration
- Declarative configuration to manage containerized workloads and services
- Cloud Native, provides:
  - Automation and observability
  - Self-healing and horizontal scaling
  - Service discovery and load balancing
- Scalable, runs on-premises, in public cloud, and hybrid environments

### Kubernetes Cluster Overview
- API server
- Cloud controller manager(optional)
- Controller manager
- etcd(persistence store)
- kubelet
- kube-proxy
- Scheduler
- Control plane
- Node

### Kubernetes Resources Review
- Kubernetes REST API and declarative resources manage operations and communications between components
- Kubernetes API Groups (resources grouped based on their primary functions):
  - RBAC, scheduling, admission registration, autoscaling, events, apps, core
- Core API group objects (core/v1 + apps/v1 API Groups):
  - Namespaces, Deployments, Services, Secrets
  - CRUD operations
- API extensions via Custom Resource Definitions + Controllers
- Declaraitve (YAML)

### Kubernetes Resources At A Galance
- Container : Runs an image (immutable copy of your application code and all code dependencies in an isolated environment
- Pod : A set of containers, co-scheduled on one machien. Mortal. Has pod IP. Has labels.
- Deployment : Ensures a certain number of replicas of a pod are running across the cluster
- Service : Gets virtual IP, mapped to endpoints via labels, Named in DNS
- Namespace : Resource names are scoped to a Namespace. Logical boundary

## Intro to GitOps
### GitOps Principles
- Declarative: A system managed by GitOPs must have its desired state expressed declaratively
- Versioned and Immutable: Desired state is stored in a way that enforces immutatibility, versioning and retains a complete version history.
- Pulled Automatically: Software agents automatically pull the desired state declarations from the source
- Continuously Reconciled: Software agents continuously observe actual system state and attempt to apply the desired state.

### GitOps: A Cloud Native Operating Model
- Unifying Deployment, Monitoring and Management:
  - Git as the single source of truth of a system's desired state
  - ALL intended operations are committed by pull request
  - ALL diffs between intended and observed state with automatic convergence
  - ALL changes are observable, verifiable, and auditable.

### Intro to GitOps
- GitOps is the practice of using Git to store declaratively defined desired state and Continuous Delivery agents (e.g. Flux) to automate the reconcilation of current state to desired state. With GitOps, CI and CD are effectively decoupled.

### Intro to Flux
- OSS CNCF Project
- Created at Weaveworks
- Runtime composed of Kubernetes Controllers + CRDs
- Flux keeps kubernetes clusters in sync with sources of configuration and automatically + continuously reconciles running state to desired state.

## Intro to Observability
- Monitoring vs. Observability:
  - Monitoring: Metrics, alerts, actionable, dashboards, canned quieries
  - Observabiilty: Inspect, observe, explore, trace, custom queries

### Observability Instrumentation
- Metrics:
  - Prometheus:
    - OSS CNCF monitoring and alerting toolkit
    - Time series database for metrics collection created by SoundCloud
- DataVisualization:
  - Grafana:
    - OSS metrics visualization dashboards
    - Created by Grafana Labs, CNCF Platinum Partner
- Logging:
  - Fluent Bit:
    - OSS CNCF project for lightweight logs and metrics processing + forwarding
    - Sub-project under Fluentd umbrella created by Treasure Data

---

## 개인생각
- 강연이 좀 혼란했다. 개념적인걸 설명하고, Flux 를 활용한 gitops 실습이 목표였던 것 같은데 codespace가 잘 동작하지 않거나, port binding 이 잘 동작하지 않아서 영상 중 상당 시간이 지연되었다.
- 실습 자료가 나쁜편은 아닌데, 어짜피 대부분은 경험해본적이 있어서 굳이 실습을 하진 않았다.
- 영상만을 보고 실습을 하기에는 조금 무릭 ㅏ있다. 기본적으로 로그인도 안되고, 실습 환경도 직접 구축해야하니까...
- 얻어간건 위에 요약된 정보들과 k9s 정도 이다.
