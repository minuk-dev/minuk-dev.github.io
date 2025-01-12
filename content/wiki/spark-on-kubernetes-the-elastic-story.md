---
layout  : wiki
title   : Spark on Kubernetes - The Elastic Story
date    : 2022-08-23 02:46:35 +0900
lastmod : 2022-08-23 03:39:03 +0900
tags    : [spark, kubernetes, k8s, kubecon]
draft   : false
parent  : kubecon
---

- [원본링크](https://youtu.be/n7WeoTJq-40)

## Benefits of Cloud
- Agile : Resources are on-dmand, pay as you go
- Elastic & Scalable : Almost infinite scale of compute and storage
- Strong Resource Isolation : Container-native on K8S
- Privacy-First : Leverage cloud security techniques to enforce security
- Operation Friendly : Our developers can focus on building and improving services to achieve higher ROI

## Design Principles
- Leverage Cloud Infra
- Full Containerizng - Elastic, Agile, Lightweight
- Decouple Compute/Storage, Scale Independently
- Developer-Friendly, API Centric
- Security & Privacy as First Class Citizen
- Use Apple Internal Spark distribution

## Architecture of Cloud-Native Spark Service
- 원본 링크 PPT 참고
- Spark K8s Operator 가 Resource Queues 를 가르키고 있고 Resource Queue 는 Node 를 관리한다.
- 이를 Skate(Spark service gateway) 로 호출하면서 관리하며, 이는 API, CLI, Airflow 등 다양한 Batch Processing 으로 처리한다.
- 또한 Jupyter Notebook 을 Interactive Spark Gateway랑 연결해서 달아둘수도 있다.
- 이러한 환경에서 Observability Infra, Security & Privacy Infra 가 당연하게도 깔려있어야한다.

## Cost saving and Elasticity Needs
- Varing workload pattern: fluctuating within a day and/or a week
- Different use cases: daily/weekly scheduled jobs, ad hoc jobs, scheduled + adhoc, backfill
- Fixed amount of resources must account for max usage, which causes resource waste

## Design of Reactive AUtoscaling
### Reactive AutoScaling Cluster NodeGroups Layout
- 자세한건 원본 링크 PPT 참고
- Physical isolation : Minimize potential impact
- Minimum capacity: Guaranteed at any time
- maximum capacity: Jobs will be queued if executed
- Multi-tenant Autoscaling K8S Cluster
  - spark-system(node group) : static size; shared by all queues
  - spark-drive(node group): scale-out; shared by all queues
  - spark-executor(node group): scale in/out

### Reactive AutoScaling Workflow
- 자세한건 원본 링크 참조
- CLI/SDK/Airflow Operator of Skate clients - 1. Submitting Spark job to Spark Platform
- Skate(Spark service gateway) - 2. Creating SparkAPP CRD on cluster
- Spark K8S Operator - 3. Creating driver and executor pods in YK resources queue
- YuniKorn - 4. Creating Spark Driver pod in driver node group
- YuniKorn - 5. Creating Spark executor pods in executor node group
- 6.1 Sned pending pods signal in each node groups for scale-out
- 6.2 Send idel node in each node groups for scale in
- 7. Send scale in/out request to cloud provider per node group

### Reactive AutoScaling Scale in/out Controls
- Scale in Controls:
  - Only when no running executor pods on the node
  - Enabled Apache YuniKorn bin-packing in resource scheduling
- Scale out Controls:
  - Spark-driver node group scale out only
  - Speed up executor pods allocation size config of Spark

## Production Status
- In production for 3+ months
- Cost saving report: Cost saving percentage per queue is located in 20% - 70%

### Migration findings 1
- Scale in/out events are stable:
  - Tens of thousands of job per week running successfully
  - All scale-in events works as expected
  - Scale out latency is consistent(<= 5 mins from 2 to 200)

### Migration findings 2
- Compared to massive over-provisioning approach before, runtime of workloads with autoscaling enbaled may increase:
  - Most negligible, a couple jobs increased ~20%
  - Users need to take this into consideration and optimize jobs if there's strict data delivery time SLO

### Challenges, Solutions, Learnings
- Physical Isolation and min/max capacity setting
- How to guarantee no impact to existing Spark jobs when scale-in
- How to speed up scale-out latency and always allow Spark driver getting start
- Monitoring autoscaling performance

### Top Community Feature Requests
- Mixed instance type support
- Dynamic Allocation support
- Spot instance support with Remote Shuffle Service
- Predictive Autoscaling leveraging the platform

---
### 개인 생각
- Apple 에서 k8s에 spark 를 돌리는 것에 대해서 나와있다.
- Apache YuniKorn 에 대해서 처음 알게 되었다. 좀더 정확히는 Spark 가 Kbuernetes 위에서 동작하는 구조 자체를 처음 공부했다.
- 단순히 Spark Pod 이 많이 띄워져 있다. 이런 식으로 끝나는 것이 아니라 Layer 를 나눠서 설명해준 점이 좋았다.
- 뭐 당연하게도 CRD 로 관리하고 있었다.
- 대충 요약하자면, Spark 를 그냥 동작시키게 되면 skew 현상이 너무 심하고 이는 리소스가 남는 상황에서도 이를 잘 활용하지 못하는 것을 의미한다.
- 따라서 중간에 Queue Layer를 두고 API/CLI/Airflow/Jupyter Notebook 등등은 Skate 에 요청한다.:
  - skate 는 처음 나오는 단어이고 특별한 프레임워크를 의미하는게 아니라 Spark service gateway를 줄여서 저렇게 부르는것 같다.
- 여기서 YuniKorn Resource Queue 로 작업을 분배하게 된다. 이때 설정에 따라서 여러 cluster를 사용할 수 있는 것으로 보인다.
- 특히나 인상 깊은건 Scale in/out Control에 따른 Memory, CPU Utilization Graph 인데 봐보면 너무나도 이상적으로 나왔다. 특정 노드가 엄청나게 뛰는게 아니라 전체적으로 스케줄링이 잘되는 것을 볼 수 있다. 물론 이 그래프만 가지고 판단하기에는 대조군도 없고, 그래프가 너무 컬러풀해서 잘 식별되지는 않지만 충분히 유의미한 그래프이며 이 구조가 어느정도의 안정성을 보임을 확인할수 있다.
