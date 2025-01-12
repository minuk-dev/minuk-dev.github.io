---
layout  : wiki
title   : This is The Way- A Crash Course on the Intricacies of Managing CPUs in K8s
date    : 2022-08-05 02:07:46 +0900
lastmod : 2022-08-05 02:09:13 +0900
tags    : [kubecon, numa, devops]
draft   : false
parent  : kubecon
---


- [원본 링크](https://youtu.be/IFEJD1YOpXo)
- Scope : We will cover CPU Management requirements Only, but also reference other projects.

## Simple Systems

- Nodes
  - Single NIC
  - Single Socket CPU
  - Memory
- Kubelet was designed for simple at first
- Early Kubelet

```yaml
# < Kubernetes v1.8 - before 2017
apiVersion: v1
kind: Pod
metadata:
  name: frontend
spec:
  containers:
  - name: app
    image: my-company.example/myapp
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```

- Resources supported:
  - CPU
  - Memory
- Reuqests: Ask for resources for your container
- Limits: limit the amount of resources consumed by the container
- Resource Mangement in Kubelet
  - Kubernetes v1.8-v.11 (2017-2018)
  - Pre-allocated hugepage support as native resources (Alpha support v1.8, graduated to Beta in v.11)
  - CPU Manager support to enable container level CPU affinity support (Alpha support v1.8, graduated to Beta in v.11)
  - Device Plugin Support to enable a consistent and portable solution for users to consume hardware devices across k8s clusters(Alpha support in v1.8, graduated to Beta in v.10)

## High Performance Uses Cases

- Performance Sensitive Workloads
- High Performance, AI/ML Clusters
  - Multiple CPU Socket
  - Multiple NIC
  - Multiple Numa

### CPU Manager - Pinned Cores

- Cpu Manager with static policy allocates CPUs exclusively for a container if
  - pod QoS is Guaranteed
  - has a positive integer CPU request
  - does not change CPU assignments for exclusively pinned guaranteed containers after the main container process start

### CPU Manager Policies

- `--cpu-manager-policy` kubelet flag used to specify the policy
- None:
  - Default
  - Provides no affinity beyond what the OS scheduler does automatically
  - Can handle partial CPUs
- Static:
  - allows containers access to exclusive CPUs on the node
  - does not change CPU assignments for exclusively pinned guaranteed containers after the main container process starts
  - Only uses whole CPUs, so increases perceived CPU utilization
  - Only by container, not by pod

### CPU Manager Policy Options

- Introduced in v1.22, Beta in v1.23
- `--cpu-manager-policy-options` : kubelet flag used to specify the policy option
- full-pcpus-only:
  - Beta option, visible by default
  - the static policy will always allocate full physical cores, so guarantee same NUMA zone.
  - Fails with SMTAlignmentError for partial core allocation
- distribute-cpus-acorss-numa:
  - alpha, hidden by default
  - the static policy will evenly distribute CPUs across NUMA nodes
  - Still per container

## NUMA Zones: Not for the weak of heart

- If CPU and Memory are located in different NUMA zones, …

### Along Comes Topology Management

- Kubernetes v1.8 (2019 onwards)
- Topology Manger to coordinate resource assignment to avoid cross NUMA assignments (alpha support v1.16, graduated to beta in v1.18)
- Memory Manager for guarnteed memory (and hugepages) allocation to pods (alpha support v1.21, graduated to beta in v1.22))
- Known Issue: Scheduler is not NUMA aware and pod can fail with TopologyAffinityError if kubelet is unable to align all the resources based on the Topology Manager policy.

### Going with the Topology Flow

kubelet - Admit()

— Topology Manager - Get Topology Hints()

—— HintProvides (CPU Manager, Device Manager, Memory Manager) 

— Topology Manager - Allocate()

kubelet - AddContainer

## Current Gaps for High Performance Compute

- Cores cannot be pinned by pod
- Affinity node-level only, CANNOT choose affinity of resources.
- Can’t mix pinned with shared cores
- Limits with larger numbers of NUMA zones
- Cannot schedule one pod or container per NUMA zone
- Cannot choose what type of CPUs
- Cannot ask for more cpus on the fly

### Heterogeneous Clusters

- Fun for the whole family

---

### Out of Tree solutions for CPU management

- All rely on turning off all resource management by the Kublet - specifically cpu manager features
- CRI Resource Manager (CRI-RM):
  - a pluggable add-on for controlling resource assignment to containers
  - plugs in between the Kubelet and the container runtime
  - keeps track of the states of all containers on a node
  - intercepts CRI protocol requests from the kubelet
- CPU Pooler:
  - A solution for Kubernetes to manage predefined, distinct CPU pools of Kubernetes Nodes
  - physically separate the CPU resources of the containers connecting to the various pools
  - A Device Plugin that exposes the CPU cores as consumable devices to Kubernetes.
- CMK (deprecated now):
  - accomplished core isolation by controlling the logical CPUs each container may use for execution
  - wrapped target application commands with the CMK command-line program for managing CPU pools and constraining workloads to specific CPUs

## How Can YOU Get Involved?

---

## 개인 생각

- Kubernetes 는 Pod 로 추상화 하기 때문에 결국 매우 고성능이 요구되는 환경에서는 문제가 발생한다.
- 예를 들어 특히 NUMA(Non-Uniform Memory Access) 환경을 들수 있는데, AI/ML 환경에서는 (뿐만 아니라 다중 소켓이 들어간 어떤 서버라도) CPU가 메모리에 접근할때 메모리 영역에 따라서 성능이 달라진다.
- 또한, 다른 컨테이너와 함께 CPU를 쓰게 되면, 고성능 처리가 필요해서 스케쥴링을 안하고 그 프로세스만을 돌리고 싶다고 해도 그렇게 동작하는게 불가능하다. 이를 위해서 독점적으로 CPU를 사용하고, 모든 자원이 같은 NUMA 영역 안에 들어오는 것을 보장하는 옵션들을 제공한다.
- 하지만 이와 같은 해결책은 결국 미봉책이 될수 있다. 왜냐하면 이와같은 요구사항들은 계속해서 증가하는데, Kubelet은 이를 위해서 계속 확장하기에는 부담이 가기 때문이다. 따라서 CRI-RM 과 같은 규격을 만들어서 plugin 형태로 이를 해결하려는 시도가 생기고 있다.
