---
layout  : wiki
title   : Volcano - Intro & Deep Dive
date    : 2022-08-30 23:20:47 +0900
lastmod : 2022-08-31 00:24:46 +0900
tags    : [kubecon, volcano, k8s, kubernetes]
draft   : false
parent  : kubecon
---

- [원본링크](https://youtu.be/a76CajRhsX0)

# Intro & Deep dive - Volcano: A Cloud Native Batch System

## Cloud Native for Intelligent Workload
- More and more organization are leveraging cloud native technology to avoid fragmental ecosystem, isolated stack, low resource utilization

## Batch on K8s: Challenges
- Job meanagement:
  - Pod level scheduling, no awareness of upper-level applications.
  - Lack of fine-grained lifecycle management.
  - Lack of task dependencies, Job dependencies.
- Scheduling:
  - Lack of job based scheduling, e.g. job ordering, job priority, job preemption, job fair-share, job reservation.
  - Not enough advanced scheduling algortihms, E.g. CPU topology, task-topology, IO-Awareness, backfill.
- Multi-framework support:
  - Insufficient suport for mainstream computing frameowrks like MPI, Tensorflow, Mxnet, Pytorch.
  - Complex deployment and O&M because each frameowrk corresponding to a different operator.
- Resource planning, sharing, heterogeneous computing:
  - Lack of support to resource sharing mechanism between jobs, queues, namespaces.
  - Lack of Deeper support on heterogenous resources.
- Performance:
  - Not enough throughput, roundtrip for batch workload.

## Volcano Overview
- Created at March 2019; Sandbox at April 2020; Incubator at April 2022
- 2.3k star, 360+ contributors, latest version v1.5.1
- 50+ enterprises adopt Volcano in production environments.

### Key Concept
- Job:
  - Multiple Pod Template
  - Lifecycle management/Erro handling
- User/namespace/resource quota:
  - namespace is regarded as user
  - resource quota is regarded as the upper limit resource that users in the namespace are able to use at most. Like the QPS in Kube-apiserver.
- Resource share:
  - Use Queue for resource sharing
  - Share resources between different "tenants" or resource pools.
  - Support different scheduling policies or algorithms for different "tenants" or resource pools.

### Job mangement
- Volcano Job:
  - Unified Job interface for most of batch job like mpi, pytorch, tensorflow, mxnet, etc.
  - Fine-grained Job Lifecycle mangement
  - Extendable job plugin:
    - env, svc, ssh, tensorflow
  - Coordinate with Scheduler
  - Job dependency

### Resource mangement- Queue
- Queue is cluster scoped, decoupled with user/namespace
- Queue is used to share resources between "multi-tenants" or resource pool.
- Configure policy for each queue, e.g. FIFO, fair share, priority, SLA.

### Dynamic resource sharing between queues
- Queue Guarantee/Capacity
- Share resource between Queues proportionally by weight

#### 개인 생각
- ?? 왜 Queue 들끼리 균등하게 분할할 생각이 아니라 Queue 끼리 자원을 서로 대여하는 구조인거지??
- Queue 끼리 우선순위를 조정하는 Policy 도 있겠지?? 일단 Queue 내부 Policy 는 있는거 같은데 Queue 간 제어하는 로직이 확실치 않네

### Fair share within Queue
- Sharing resource between jobs
- Sharing resource between namespaces
- Per-Queue policy (FIFO, Priority, Fair share, ...)

#### Case : hierarchical queue
- How to share resource in a multi-level org more easily?
- Problem: flat queue cannot meet complex resource share and isolation easily for big org.
- Solution:
  - Multiple level queue constructs a tree which is mapped to the org.
  - Each level queue has min, max, weight. Use max to isolate resource, use queue weight to balance resource betweeen queues.
  - Share resources between queues and reclaim by weight
- Benefit:
  - Flexible resource mangement, easy to map the organization
  - fine-grained control resource share and isolation for a big multi-tenants organization
  - The queue min capacity ensures guaranteed resource, the proportion by weight offers flexible sharing

#### Scenario: Elastic scheduling
- What is elastic job

  ```yaml
  apiVersion: batch.volcano.sh/v1alpha1
  kind: Job
  metadata:
    name: test-job
  spec:
    minAvailable: 5 #min
    tasks:
    - replicas: 10 #max
      template:
        spec:
          containers:
          - image: train_script
            resources:
              nvidia.com/gpu: 1
  ```

#### Scenario: SLA scheduling
- Big job get starving while co-existing with small job.
- SLA scheduling allow to configure the job so that it is completed on time and reduce the risk on missed deadlines.
- SLA support argument `sla-waiting-time` to realize job resource reservation: `sla-wating-time` is the maximum time that one job should stay in pending. When `sla-waiting-time` reached, SLA plugin move the pending job to next state. And start to reserve resources for this job until the job's request is satisfied.

#### 개인 생각
- 아 역시 걱정하는 시나리오는 설명해주네. 일단 잘 동작한다라고 설명은 하는데, 솔직히 아직은 잘 모르겠다. 뭔가 깨끗하지가 않다.
- 시간적인 관점에서 일종의 threshold 로 제어하는 건데 이런 접근이 최선인가 싶다. utilization 에 초점이 지나치게 맞춰지지 않았나 싶다.

#### Scenario: CPU Topology awareness
- NumaAware:
  - volcano watch CPU topology and schedule pods to the nodes wich NUMA topology.
- Senario:
  - Scientific calcuation, video decoding ... etc. big data offline processing and other specific scenes which are computation-intensive jobs that are sensitive to CPU parameters, scheduling delays.

#### Scenario: batch scheduler for Spark
#### 개인 생각
- Apache YuniKorn 도 있고 Spark 를 지원하는 도구들은 지금 꽤 나오고 있는데.. 잘 모르겠다.
- 일괄적인 일종의 표준으로서 동작하는 거에는 의미가 있긴 하지만, 먼가 너무 뭐든지 우리로 해.. 같은 느낌이 좀 있다.
- 결국 이런 프로젝트는 사용자들이 실제로 편하게 사용하거나 성능상의 엄청난 이득이 있어  de-facto standard 처럼 동작해야지 유의미하지 않나 싶다.
- 전체적으로 많은 Scenario 들을 나열하면서 설명하지만, 전부 "~ 한 상황에서 ~을 지원하기 때문에 ~하게 사용할수 있다." 이런 느낌으로 설명하고 있는데, 왜 volcano 만이 가능한지, 왜 써야하는지, 도입하는데에 대한 노력과 같은 부분을 잘 모르겠다. 사실 k8s 가 도입된지가 어느 정도 지났기 때문에 대부분은 batch 에 대한 노하우가 있고, 당장 kubeflow 만 봐도 batch 에 대한 이야기가 넘처난다. 전체적으로 왜 써야만 하는지에 대해서는 이 강연에서는 잘 캐치하지 못했다.
- 오히려 이런 내용은 [CNCF: three-reasons-why-you-need-volcano](https://www.cncf.io/blog/2021/02/10/three-reasons-why-you-need-volcano/) 가 더 설명을 잘하고 있다고 생각한다. 하지만 아직까진 scheduling 에 대해서 확 와닿지는 않긴한다.:
  - Group Scheduling
  - Automatic Optimization of Resource Allocation
  - Support for a Range of Advanced Scheduling Scenarios
- 뭔가 kubeflow나 kube-batch 가 안되는 부분을 비교해서 설명해주거나 performance 그래프를 비교하며 따라서 이걸 써야한다는 식으로 강연이 전개되면 좋았을텐데 싶다. 자원 관리 측면에서 장점이 있는거 같긴한데... 압도적인 성능을 보여주는게 아니라면 Production level 에서 이걸 도입하자고 목소리를 낼수 있나?
- Community 가 중국 쪽에 크게 형성되어 있는 거 같은데, 아... 잘 모르겠다. 뭔가 의문만 남는 강연이다. Deep Dive 라는 제목을 달고서 구체적인 알고리즘이나 수치 없이 이게 맞나? 많은 case 를 들고오기보다는 그냥 1~2 개의 케이스에서 성능과 알고리즘 분석을 해주는게 훨씬 좋았을텐데
- 그냥 전체적으로 시간 날린거 같은 기분이다. [kube-batch](https://github.com/kubernetes-sigs/kube-batch) 에 리스트에 있는거 봐서는 그래도 어느정도 쓰는 프레임워크 같은데 강연 듣고 남은게 없다.
- 뭔가 자료를 찾아보려고 해도 공식 사이트에서 중국어 자료가 나와버리면, 뭐하라는걸까? 일단 대충 batch 작업을 기존에는 scheduling 하는데에 어려움이 있었는데 이를 위한 도구이다 정도만 기억하고 넘겨야겠다. CNCF incubating project 니까 나중에 mainstream 이 되면 알게되겠지
