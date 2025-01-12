---
layout  : wiki
title   : Make Cloud Native Chaos Engineering Easier Deep Dive into Chaos Mesh
date    : 2022-09-04 02:42:20 +0900
lastmod : 2022-09-04 03:17:07 +0900
tags    : [chaos-mesh, chaos-engineering, kubecon, k8s, kubernetes]
draft   : false
parent  : kubecon
---

- [원본](https://youtu.be/bZnI5omUKe4)

## Testing a distributed system is difficult
- Distributed systems are more and more complex nowadays:
  - Faults can happen anytime, anywhere, in any ways
- Writing tests and debugging is hard:
  - Deterministic test is very hard and impossible to cover all faults
- But, No crash, No data loss, No wrong results

## Chaos Engieering to the rescue
- Chaos engineering is about breaking things in a controlled environment and through well-planned experiments in order to build confidence in your application to withstand turbulent conditions.
- Chaos engineering is NOT about breaking things randomly without a perpose.
- Program Cycle:
  - Improve -> Steady State -> Hypothesis -> Run Experiment -> Verify -> Improve...

## Why Chaos Mesh
- On Kubernetes:
  - More application clusters (40+)
  - More nodes on each cluster
  - More target objects may fail, e.g. Container / Pod / Network / Disk / System Clock / Kernel / etc.
- We need more Chaos experiments. However, managing and scheduling many chaos experiments is a hug pain!

- In Docker:
  - The environment is different from the physical nodes
  - Tools like tc / iptables / fuse / bcc can't be used directly
  - Containers on the same node cannot affect each other
- Chaos scope must be customizable and manageable for containers.


## What is Chaos Mesh
- A Cloud-Native Chaos Engineering platform on Kubernetes environments
- Started out as the internal platform to test TiDB
- Provides fault injection methods into the container, Pod, network, system I/O, kernel, etc.
- Chaos Mesh's Mission:
  - Make Chaos Engineering easy

## Deep into Chaos Mesh
### Architecture
- Chaos Dashboard:
  - Manage and monitor chaos experiment
- Chaos Controller Manager:
  - Schedule and controle component
  - Workflow engine
- Chaos Daemon:
  - Executive component on kubernetes node
- Chaosd:
  - Executive component on non-kubernetes node

### CustomResourceDeifnitions
- PodChaos, NetworkChaos, ...
- Examples

```yaml
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: pod-kill-example
spec:
  action: pod-kill
  mode: one
  selector:
    labelSelectors:
      "app.kubernetes.io/component": "tikv"
```

```yaml
apiVersion: chaos-mesh.org/v1alph1
kind: Schedule
metadata:
  name: schedule-pod-kill-example
spec:
  schedule: "@every 5m"
  type: "PodChaos"
  historyLimit: 5
  concurrencyPolicy: Forbid
  podChaos:
    action: "pod-kill"
    mode: one
    selector:
      labelSelectors:
        "app.kubernetes.io/component": "tikv"
```

### Workflow Engine
- Three parts of the a workflow:
  - Workflow Name
  - Entry, the entry of the whole workflow
  - Template array
- Five different types of templates:
  - Serial
  - Parallel
  - Chaos
  - Suspend
  - Task
- Serial, Parallel, Task allow other nodes to be referenced as child nodes

### Selectors
- Namespace, Label, Expression, Annotation, Field, PodPhase, Node Selector
- Node, Pod list

### Authorization
- Authorization mechanism based on Kubernetes RBAC permission policies

---
## 개인 의견
- 강연 자체가 깔끔했다. 어떻게 동작하는지 아키텍쳐 그림만 봐도 이해가 가능할정도로 설명하고 있다.
- 기능 자체가 kubernetes 틱 하다. 그러면서도 web ui를 잘 제공한다고 생각한다. 개인적으로는 argo cd 같은 느낌이 들었다. dashboard 가 좋아서 시각화가 잘되고, 시각화가 잘되니까 머리속으로 어떻게 해야하는 구나가 잘 떠오르는 것 같다.
- demo가 엄청 좋다. 공식 홈페이지에서 직접 해볼수 있도록 제공하는데, 어떻게 설치하는 지, 어떻게 설정하는지를 잘 보여준다.
- 아직 documentation 을 읽어보지는 않았지만, 이 정도만 해도 어떻게 사용하는지 감을 잡고 자잘한것 정도만 찾아보는 수준일것 같다.
- 생각한게 거의 다 있어서 좋았다. 강연 흐름이 들으면 궁금해할만한 순서로 잘 구성되어 있다.
- 예전에 Litmus를 찍먹 해본적이 있었는데 튜토리얼 경험은 이게 더 좋은것 같다. 물론 litmus chaos 가 지금은 더 널리쓰여서 써야한다면 litmus를 쓰겠지만 말이다. 개인적으로 기대가 되는 프로젝트다 2022 2월에서야 인큐베이팅 됬으니까 아직은 발전을 더 지켜봐야할듯 하다.
