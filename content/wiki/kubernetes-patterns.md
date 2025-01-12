---
layout  : wiki
title   : 쿠버네티스 패턴
date    : 2022-08-16 10:56:05 +0900
lastmod : 2022-08-26 16:08:59 +0900
tags    : [kubernetes, k8s, book]
draft   : false
parent  : kubernetes
---

- 책 내용 정리 및 공식 문서와 비교하며 버전 확인

### 1장 개요
#### 클라우드 네이티브로 가는길
- 클린코드
- 도메인 주도 설계
- 마이크로서비스 아키텍처 방식
- 컨테이너

#### 분산 기본 요소

| 개념                 | 로컬 기본 요소                   | 분산 기본 요소             |
|----------------------|----------------------------------|----------------------------|
| 캡슐화 동작          | 클래스                           | 컨테이너 이미지            |
| 인스턴스화 동작      | 객체                             | 컨테이너                   |
| 재사용 단위          | Jar 파일                         | 컨테이너 이미지            |
| 컴포지션             | 포함 관계                        | 사이드카 패턴              |
| 상속                 | 확장 관계                        | FROM 으로 부모 이미지 상속 |
| 배포 단위            | .jar/.war/.ear                   | pod                        |
| 빌드타임/런타임 격리 | 모듈, 패키지, 클래스             | namespace, pod, container  |
| 초기화 필요조건      | Constructor                      | 초기화 컨테이너            |
| 초기화 직 후 트리거  | Init method                      | postStart                  |
| 삭제 직전 트리거     | Destroy method                   | preStop                    |
| 정리 절차            | finalize(), shutdown hook        | Defer 컨테이너             |
| 비동기 & 병렬 칫행   | ThreadPoolExecutor, ForkJoinPool | Job                        |
| 주기적 작업          | Timer, ScheduleExecutorService   | CronJob                    |
| 백그라운드 작업      | Deamon Thread                    | DeamonSets                 |
| 설정관리             | System.getenv(), Properties      | ConfigMap, Secret          |

#### 컨테이너
- 컨테이너 이미지는 하나의 문제를 해결하는 기능 단위다.
- 컨테이너 이미지는 하나의 팀에 의해 소유되며, 릴리즈 주기가 있다.
- 컨테이너 이미지는 자기 완비적이며, 런타임 의존 성을 정의하고 수행한다.
- 컨테이너 이미지는 불변적이며, 한번 만들어지면 변경되지 않는다. 즉 이미 설정 값이 정해져 있다.
- 컨테이너 이미지는 런타임 의존성과 자원 요구사항이 정의되어 있다.
- 컨테이너 이미지는 기능을 노출시키기 위해 잘 정의된 API가 있다.
- 컨테이너는 일반적으로 하나의 유닉스 프로세스로 실행된다.
- 컨테이너는 일회용이며 언제든지 스케일 업과 스케일 다운을 안전하게 수행할 수 있다.

#### 파드
- 파드는 스케줄링의 최소 단위이다.
- 파드는 파드에 속한 컨테이너들의 동일 장소 배치를 보장한다.
- 한 파드는 파드 안의 모든 컨테이너가 공유하는 하나의 IP 주소와 이름, 포트 범위를 갖는다.

#### 서비스
- 서비스는 애플리케이션에 접근하기 위한 이름으로 된 진입점이다.

#### 레이블
- 레이블은 실행 중인 특정 파드의 인스턴스들을 가리키기 위해 사용된다.
- 레이블은 스케줄러에서 많이 사용된다.
- 레이블은 파드를 논리적 그룹으로 묶어 가리킬 수 있다.
- 미리 앞서서 레이블을 추가하지 않아야한다. 레이블 삭제가 어떤 영향을 일으키는지 알아낼 방법이 없다.

#### 어노테이션
- 레이블과 유사한 기능을 하지만, 사람보다는 봇을 위한 용도로 사용된다.
- 검색 불가능한 메타데이터를 지정하는데 사용한다.

#### 네임스페이스
- 네임스페이스는 쿠버네티스 자원으로서 관리된다.
- 네임스페이스는 컨테이너, 파드, 서비스, 레플리카세트 등의 자원에 대한 영역을 제공한다.
- 네임스페이스 내에서 자원명은 고유해야한다.
- 네임스페이스는 격리시키는 것이 아니므로 자원간 접근을 막을수는 없다.
- 노드, PersistentVolume 등은 네임스페이스 내에 속하지 않는다.
- 서비스는 `<service-name>.<namespace-name>.svc.cluster.local` 형식의 dns address 를 갖는다.
- ResourceQuota는 네임스페이스 별로 제약조건을 걸 수 있다.

## 1부 기본 패턴
### 2장 예측 범위 내의 요구사항
- 애플리케이션의 요구사항에 따라서 필요한 자원량은 달라지며, 이를 예측하는 것은 어려운 일이다.
- 쿠버네티스를 사용하면서 런타임 요구사항을 알아야하는 이유:
  - 효율적인 하드웨어 사용을 위한 배치
  - 전체 클러스터 설계 및 관리

#### 런타임 의존성
- PersistentVolume
- hostPort
- configMap, secret

#### 자원 프로파일
- compressible resource : cpu, network
- incompressible resource : memory
- incompressible resource를 너무 많이 사용할 경우 컨테이너가 죽게 된다.
- requests, limits 에 따른 서비스 구분:
  - Best-Effort:
    - requests, limits 를 갖고 있지 않다.
    - incompressible resource가 모자랄때, 가장 먼저 죽는다.
  - Burstable:
    - requests와 limits 가 다르다. (일반적으로 limits 가 requests 보다 크다.)
  - Guaranteed:
    - requests와 limts가 같다.
    - 가장 나중에 죽는다.

#### 파드 우선순위
- 책의 내용과 살짝 다르다. k8s v1.24 문서를 기준으로 작성되었다.

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PrioirtyClass
metadata:
  name: high-priority
value: 1000
globalDefault: flase
description: "This is a very high priority Pod class"
---
apiVersion: v1
kind: Pod
metadata:
  name: random-generator
  labels:
    env: random-generator
spec:
  containers:
  - image: k8spatterns/random-generator:1.0
    name: random-generator
  priorityClassName: high-prioirty
```

#### 프로젝트 자원
- 추가 참고자료 : [메모리 상승과 오버커밋](https://hakkyoonjung31.github.io/linux/memory-overcommit/)
- 메모리 오버커밋 : 요구된 메모리를 그대로 할당하는 것이 아닌 실제 사용되는 시점에서 필요한 만큼의 메모리를 할당하는 방식에 의해 요구되는 메모리의 총량이 100%를 넘기는 경우
- 오버 커밋 상태에서 실제 메모리 사용 총량이 메모리 총량을 넘기게 될 수도 있는데, 이때 OOM-Killer에 의해 프로세스들을 죽여서 용량을 확보하게 된다.
- 개인 해석:
  - 오버커밋에 의해 요청된 메모리와 사용하는 메모리는 차이가 날 수 있다.
  - 즉 requests는 250M를 하는데, pod에서 오버커밋을 이용해 500M를 할당하고, 사용은 200M를 하고 있는 상황같은게 발생 할 수 있다는 것이다.
  - kubernetes 는 기본적으로 requests 를 기준으로 스케줄링한다.

### 3장 선언적 배포
- 선언적 업데이트를 작동시키기 위한 옵션:
  - `kubectl replace`로 새로운 버전의 deployment로 전체 deployment를 교체한다.
  - deployment를 `kubectl patch` 나 `kubectl edit`으로 새로운 버전을 넣는다.
  - `kubectl set image` 을 통해서 deployment에 새로운 이미지를 넣는다.
- deployment 의 장점:
  - deployment는 상태가 내부적으로 관리되는 객체이므로 클라이언트와 상호작용 없이, 서버측에서 실행된다.
  - deployment 의 선언적 특성은 배포에 필요한 단계보다는 배포된 상태가 어떻게 보여야하는지를 알 수 있다.
  - deployment의 정의는 운영 환경에 배포되기 전에 다양한 환경에서 테스트된 실행 가능한 객체이다.
  - 업데이트 프로세스는 모두 기록되며, 일시 중지 및 계속을 위한 옵션, 이전 버전으로 롤백을 위한 옵션으로 버전이 지정된다.

#### 고정 배포
- Recreate 전략:
  - 우선적으로 현재 버전의 모든 컨테이너를 죽이고, 이전 버전의 컨테이너가 축출될때 모든 신규 컨테이너를 동시에 시작한다.

#### 블루-그린
- 블루(이전 버전), 그린(현재 버전)
- 블루와 그린을 모두 띄운뒤 신규 트래픽을 그린으로 보낸뒤, 기존 트래픽을 다 처리하면 블루를 삭제한다.
- 블루와 그린이 순간적으로 동시에 뜨게 된다.
- 즉, 자원이 2배로 필요하다.

#### 카나리아
- 소수의 인스턴스를 교체하면서 동작한다.

### 4장 정상상태 점검
- 프로세스 상태는 애플리케이션의 정상상태를 결정하기에는 충분하지 않다.

#### Liveness probe
- HTTP : 200~399 사이 응답코드
- TCP : 성공적인 TCP connection
- Exec : 성공적인 종료코드(0)

- 한번쯤은 yaml을 써보는게 도움이 될거 같아서 써본다. 실제로는 문서를 참고해서 작성할것

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-liveness-check
spec:
  containers:
  - image: k8spatterns/random-generator:1.0
    name: random-generator
    env:
    - name: DELAY_STARTUP
      value: "20"
    ports:
    - containerPort: 8080
    protocol: TCP
    livenessProbe:
      httpGet:
        path: /actuator/health
        port: 8080
      initialDelaySeconds: 30
```

#### Readiness probe
- liveness와는 다르게 readiness probe 이 실패할 경우, service의 endpoint가 제거되어 새로운 트래픽을 수신할 수 없게 된다.

#### Others
- spring actuator, wide-fly swarm, karaf, microprofile spec 등 애플리케이션 프레임워크는 정상상태 점검을 위한 인터페이스를 제공한다.
- 로그는 표준스트림 이외에도 `/dev/termination-log` 에 남기는 것이 좋다.
- OpenTracing이나 Prometheus 같은 트레이싱, 메트릭 수집 라이브러리와 통합하여 어플리케이션 상태를 관찰할 수 있도록 해야한다.

### 5장 수명주기 관리
- k8s는 컨테이너를 종료시킬때, SIGTERM을 먼저, 그 다음 `.spec.terminationGracePeriodSeconds` 의 유예시간 이후 SIGKILL을 발생시킨다.
- postStart, preStop 훅

```yaml
apiVersion: v1
kind: Pod
metatdata:
  name: hooks
spec:
  containers:
  - image: k8spatterns/random-generator:1.0
  name: random-generator
  lifecycle:
    postStart:
      exec:
        command:
        - sh
        - -c
        - sleep 30 && echo "Wake up!" > /tmp/postStart_done
    preStop:
      httpGet:
        port: 8080
        path: /shutdown
```

- 수명주기 훅과 초기화 컨테이너

| 측면                | 수명주기 훅                                               | 초기화 컨테이너                                                                                 |
|---------------------|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| 활성화 단계         | 컨테이너 수명주기 단계                                    | 파드 수명주기 단계                                                                              |
| 시작 단계 동작      | postStart 명령어                                          | 실행될 초기화 컨테이너 목록                                                                     |
| 종료 단계 동작      | preStop 명령어                                            | X                                                                                               |
| 타이밍(Timing) 보장 | postStart 명령은 컨테이너의 ENTRYPOINT 와 동시에 실행     | 애플리케이션 컨테이너가 시작되기 전에 모든 초기화 컨테이너는 성공적으로 종료가 완료되어야 한다. |
| 사용 사례           | 컨테이너별로 트고하된 중요하지 않은 시작/정리 종료를 실행 | 컨테이너를 사용해 워크플로우 같은 순차적 작업을 수행. 작업 실행을 위해 컨테이너를 재사용        |

### 6장 자동 배치
- 가용한 노드 자원:
  - Allocatable = Node Capacity - Kube-Reserved - System-Reserved
  - Kube-Reserved : 쿠버네티스 데몬에 의해 사용되는 자원
  - System-Reserved : sshd, udev 와 같은 시스템 데몬에 사용되는 자원
  - OS와 Kubernetes가 사용하는 자원을 따로 예약해두지 않으면 자원 부족 문제가 생길 수 있다.

#### Node Affinity
- `.spec.affinity.nodeAffinity` 를 통해서 선호 조건, 필수 조건을 걸 수 있다.

#### Pod Affinity
- 다른 파드와 상대적인 위치

#### Taint 와 Toleration
- taint 종류:
  - `effect=NoSchedule` : 스케줄링을 피하는
  - `effect=PreferNoSchdule` : 가급적 스케줄링을 피하는
  - `effect=NoExecute` : 이미 실행중인것을 빼도록

#### Descheduler
- 처음 들어본 개념이라 좀 찾아봤는데, 기본적으로 지원하는 건 아니고 추가적으로 deployment 형태로 설치해야하는 것 같다.
- [공식사이트](https://github.com/kubernetes-sigs/descheduler) 에서는 helm 이나 다른 방법으로 설치하는 것도 안내해주고 있다.
- Scheduler 만으로는 앞으로 Balance 하는것을 만드는 거지, 이미 배포된 것들에 대해서 처리하지 못하기 때문에 사용한다.
- 전략 종류:
  - RemoveDuplicates, LowNodeUtilization, RemovePodsViolatingInterPodAntiAffinity, RemovePodsViolatingNodeAffinity
- Descheduler가 건들이지 않는 Pod:
  - Replicaset, Deployment, Job, DeamonSet에 의해서 관리되지 않는 파드
  - local storage을 갖는 pod
  - PodDisruptionBudget 규칙에 위배되는 Pod
  - Deschdeduler 파드

## 2부 행동 패턴
### 7장 배치 잡
- 잡의 특징:
  - 잡은 일시적인 인메모리 작업이 아니라, 클러스터 재시작에도 살아남는 지속된 작업이다.
  - 잡은 완료되고 나면, 삭제되지 않고 추적 목적으로 유지된다. 잡의 일부분으로 생성된 파드도 삭제되지 않으며 검사가 가능하다.
  - 잡은 여러번 실행되어야 할 수 있다. (`.spec.completions` 항목 참조)
  - 잡이 여러번 실행되어야하는 경우 동시에 실행할 수도 있다. (`.spec.parallelism` 항목 참조)
  - Pod 가 실행 중인 동안 노드에 장애가 되거나 어떠한 이유로 Pod가 extract 되었을 때, Scheduler 는 Pod를 재배치 후 실행한다.

- 잡의 종류:
  - 단일 파드 잡(Single Pod Job):
    - `.spec.comletions` 와 `.spec.parallelism` 값을 생략 또는 모두 1로 세팅
  - 고정 완료 횟수 잡(Fixed completion count Job):
    - `.spec.completions` 은 1보다 크게, `.spec.parallelism` 은 1로 세팅
  - 작업 큐 잡(Work queue Job):
    - `.spec.completions` 은 생략, `.spec.parllelism` 은 1보다 크게 세팅

- 복잡한 작업은 batch application framework(e.g. Spring Batch, JBeret) 으로 실행

### 8장 주기적 잡
- 책에 있는 내용은 v1beta1 이지만, 현재(v1.24) 에서는 v1 이다.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: random-generator
spec:
  schedule: "*/3 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: random-generator
            image: k8spatterns/random-generator:1.0
            command:
            - "java"
            - "-cp"
            - "/"
            - "RandomRunner"
            - "/numbers.txt"
            - "10000"
          restartPolicy: OnFailure
```

- 주의사항:
  - CronJob은 특정 상황에서 여러 잡을 생성할 수 있다. 따라서 Job은 멱등성(idempotent)을 지니도록 구성해야한다.
  - v1 CronJob API 는 타임존 설정을 공식적으로 지원하지 않는다. 이는 내부 라이브러리가 어떻게 구현되었는 가에 따라서 다르게 동작할 수 있다. 즉, 프로덕션 레벨에서는 사용이 권장되지 않는다.
  - CronJob 은 kube-controller-manager 의 시간대를 기준으로 한다.

- 개인 생각:
  - 시간대별로 필요한거면, 복잡한 Job에 해당한다고 생각한다. Spring Batch를 사용하는게 옳지 않나 싶다.

### 9장 데몬 서비스
- DeamonSet 의 특징:
  - nodeSelector를 통해 제한하지 않는한, 모든 노드에 하나의 Pod가 배치된다.
  - DeamonSet 에 의해 생성된 Pod은 생성된 시점에 nodeName을 가진다. 따라서 Scheduler에 의해 배치 되지 않는다. 이는 Scheduler와 상관 없이 실행되며, Scheduler에 의해 Pod들이 배치 되기 전에 실행할 수 있다는 것을 의미한다.
  - 대부분의 컨트롤러는 DeamonSet에 의해 생성된 Pod를 더 높은 우선순위로 별개 취급한다.

- DeamonSet 에 의해 생성되는 대표적인 오브젝트들:
  - Service
  - DNS
  - NodeIP with hostPort
  - Push

- Static Pod 와 비교:
  - Static Pod 는 Kubelet에 의해서만 관리되며, controller는 없고 health check 를 실행하지 않는다. 이 모든 것이 kubelet에 의해서만 관리된다.

### 10장 싱글톤 서비스

#### 애플리케이션 외부 잠금
- 어플리케이션 외부에서 별도의 관리 프로세스를 통해서 싱글톤을 구현하는 방법
- replica set으로 구현할 경우 replicas 숫자를 1로 유지한다는 보장이 없으므로 별도의 주의가 필요하다.
- 일시적으로 node가 비정상 상태일 경우, 새롭게 Pod 가 생성되는데, 이때 비정상이였던 node가 살아나면 싱글톤 보장이 깨진다.
- StatefulSet 을 사용해 구현할 경우, 강력하게 싱글톤 제약을 걸 수 있지만 복잡성 또한 증가한다.
- 이렇게 StatefulSet 을 사용해 Singleton 서비스를 구성하면, Headless Service 를 사용해 묶어야한다.:
  - 책의 이 부분이 이해하기 어려운데, [참고자료 - 조대협의 블로그](https://bcho.tistory.com/1310) 를 읽어보면 이해가 쉽다.
  - 간략하게 요약하면, statfuleset 으로 만들어진 pod 같은 경우, 굳이 service를 통해서 접근할 필요가 없다. 하지만 service 가 없다면, pod 는 domain name을 가질수 없어 접근이 어렵다. 따라서 headless service 를 통해 pod를 묶기만 하고 접근은 pod로 한다.

#### 애플리케이션 내부 잠금
- distributed lock 을 활용하여 pod 가 여러개 뜨더라도 하나의 pod 만 active 상태로 만든다.
- distributed lock 을 위하여 zookeeper, redis, etcd 등 이러한 내용이 구현되어 있는 프로그램 또는 프레임 워크가 필요하다.
- k8s 에서는 master node 의 etcd 를 kubernetes api 를 통해서 노출하고 사용하는 편이 좋은 선택이다.:
  - 또한 이렇게 하는 것이 아닌 configmap 이 동시에 하나의 pod만 수정 가능하다는 것을 이용하여 분산락을 대체해서 사용하는 방법도 있다.

#### PodDisruptionBudget
- 일정 비율의 파드가 임의의 한 시점에 노드에서 자발적으로 축출되지 않게 보장한다.
- 관련해서 책에서는 v1beta1 이지만 kubernetes v1.24 기준, v1 버전을 지원한다.

```yaml
apiVersion: policy/v1
kind: PodDistruptionBudget
metadata:
  name: random-generator-pdb
spec:
  selector:
    matchLabels:
      app: random-generator
  minAvailable: 2
```

- `.spec.minAvailable`, `spec.maxUnavilable` 중에 하나만 사용가능하다.

### 11장 스테이트풀 서비스
- [[Twelve-Factor-App]]

- Stateful 한 자원 : Storage, Networking, Identifier

- 기본 예제에 꽤나 직관적으로 특징을 알아볼수 있어서 기재

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: rg
spec:
  serviceName: random-generator
  replicas: 2
  selector:
    matchLabels:
      app: random-generator
  template:
    metadata:
      labels:
        app: random-generator
    spec:
      containers:
      - image: k8spatterns/random-generator:1.0
        name: random-generator
        ports:
        - containerPort: 8080
          name: http
        volumeMounts:
        - name: logs
          mountPath: /logs
  volumeClaimTemplates:
  - metadata:
      name: logs
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Mi
```

- Scale 이 증가할 때는 pvc 가 자동생성, Scale이 감소할 때는 pvc 가 삭제되지 않는다. (데이터 보존을 위해)
  - 만약 PV 재사용을 원한다면 직접 pvc 삭제

#### 네트워크
- Headless Service 로 관리:
  - DNS 생성을 위해서
  - 단순히 묶기위한 객체

#### 순서성
- Pod 생성 순서가 Scale에 의해서 생긴 순서를 보장한다.
- 내려갈때도 그 순서가 보장된다.

#### 개인적인 궁금점
- StatefulSet 에서 Durability는 어떻게 보장되지? Node가 죽으면 어떻게 동작하는지 잘 모르겠다.:
  - [Kubernetes Tip: How Statefulsets Behave Differently Than Deployments When Node Fails?](https://medium.com/tailwinds-navigator/kubernetes-tip-how-statefulsets-behave-differently-than-deployments-when-node-fails-d29e36bca7d5)
  - 위 글에서 꽤나 상세한 설명을 하고 있다. 하지만 그렇게 와닿지는 않아서 나중에 시간될때 kind로 cluster 간략하게 구성해서 테스트 해봐야할것 같다.

#### 기타 기능
- 분할 업데이트
- 병렬 배포
- at-most-one 보장

### 12장 서비스 디스커버리
- proxy 레이어를 둬서 application이 간접적으로 service registry 를 참조하는 구조

#### 내부 디스커버리
- Service 객체를 사용하는 방법:
  - 환경 변수를 통한 방법:
    - 환경변수를 참조하도록 어플리케이션 개발, 환경변수 주입
  - DNS 참조를 통한 디스커버리
  - 다중 포트
  - 세션 어피니티
  - 레디니스 점검
  - 가상 IP:
  - ClusterIP 선택:
    - `.spec.clusterIP`를 사용

#### 수동 서비스 디스커버리
- Endpoint를 직접 만든다.
- ExternalName을 사용하는 Service

#### 클러스터 외부의 서비스 디스커버리
- 외부에 서비스를 노출하는 방법:
  - nodePort 등으로 외부에 서비스를 노출, 이를 외부 서비스 디스커버리로 참조
  - LoadBalancer를 사용
  - Headless service 이용

#### 어플리케이션 계층 서비스 디스커버리
- ingress를 활용하여 만든다.

#### 개인생각
- 이 책을 쓰는 시점에는 Istio가 서비스디스커버리의 메타가 아니라서 이런 여러 방법을 소개함에도 소개가 되지 않은 것 같다.
- 물론 어떤 관점에서 본다면 ingress의 일종이라고 여길수 있겠지만, istio 는 envoy를 활용하여 더 많은 메커니즘이 있다.
- 서비스 디스커버리에 대해서는 istio를 추가로 공부하자.

### 13장 자기 인식
- [Downward API 공식문서](https://kubernetes.io/ko/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/)
- Downward API 는 자신에 대한 정보를 환경변수, 볼륨의 형태로 제공할 수 있다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kubernetes-downwardapi-volume-example
  labels:
    zone: us-est-coast
    cluster: test-cluster1
    rack: rack-22
  annotations:
    build: two
    builder: john-doe
spec:
  containers:
    - name: client-container
      image: k8s.gcr.io/busybox
      command: ["sh", "-c"]
      args:
      - while true; do
          if [[ -e /etc/podinfo/labels ]]; then
            echo -en '\n\n'; cat /etc/podinfo/labels; fi;
          if [[ -e /etc/podinfo/annotations ]]; then
            echo -en '\n\n'; cat /etc/podinfo/annotations; fi;
          sleep 5;
        done;
      volumeMounts:
        - name: podinfo
          mountPath: /etc/podinfo
  volumes:
    - name: podinfo
      downwardAPI:
        items:
          - path: "labels"
            fieldRef:
              fieldPath: metadata.labels
          - path: "annotations"
            fieldRef:
              fieldPath: metadata.annotations
```

## 3부 구조 패턴
### 14장 초기화 컨테이너
- 초기화 컨테이너가 실패하면, 전체 파드는 다시 시작되고, 모든 초기화 컨테이너도 다시 실행된다
- 초기화 컨테이너 이외의 초기화 기법:
  - admission controller
  - admission webhook
  - initializer
  - PodPreset

### 15장 사이드카
- 일반적으로 서비스의 네트워킹, 모니터링, 트레이싱에 쓰인다.
- 관점지향 프로그래밍과 유사

### 16장 어댑터
- application 이 쓰는 log의 형태가 모니터링할때 원하는 형태와 다를때 사용할 수 있다.
- 일종의 사이드카

### 17장 앰배서더(Ambassador)
- application 에서 외부에 접근할때, 외부 복잡성을 숨기고 간단하게 접근하도록 할수 있다.
- cache, circuit-breaker 등에 활용 될 수 있다.
- 일종의 사이드카

## 4부 설정 패턴
### 18장 EnvVar 설정
- 한눈에 여러개 설정을 볼수 있어서 yaml을 기재

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: random-generator
spec:
  containers:
  - image: k8spatterns/random-generator:1.0
    name: random-generator
    env:
    - name: LOG_FILE
      value: /tmp/random.log
    - name: PATTERN
      valueFrom:
        configMapKeyRef:
          name: random-generator-config
          key: pattern
    - name: SEED
      valueFrom:
        secretKeyRef:
          name: random-generator-secret
          key: seed
```

- 시작하고나서는 변수를 변경할수 없어, 변경을 원할경우 재시작을 해야한다.:
  - port, db connection configuration 등에 적합

### 19장 설정 자원
- volume 으로 mount 하면 변경이 반영된다.
- Secret 의 특징:
  - 자신에게 접근하는 파드가 실행 중인 노드에만 배포된다.
  - 노드에서 시크릿은 tmpfs의 메모리에 저장되며, 실제 스토리지에는 기록되지 않고 파드가 제거될 때 함께 제거된다.
  - etcd에 암호화된 형태로 저장된다.
- configmap 과 secret 에는 자원 제약이 있으므로 무분별하게 사용해서는 안된다.

### 20장 불변 설정
- 불변 설정 패턴에 데이터 컨테이너를 사용하는 것은 다소 복잡하지만 아래 장점이 있다.:
  - 환경별 설정은 컨테이너 안에 있으므로, 여타 컨테이너 이미지처럼 버전을 지정할 수 있다.
  - 이런 방식으로 생성된 설정은 컨테이너 레지스트리를 통해 배포될 수 있고, 클러스터에 접근하지 않아도 설정을 확인할 수 있다.
  - 컨테이너 이미지 안에 이쓴 설정을 직접 변경할 수는 없다. 설정을 변경하려면 버전을 업데이트한 새로운 컨테이너 이미지가 필요하다.
  - 설정 데이터 이미지는 설정 데이터가 너무 복잡해 환경 변수나 컨피그맵에 넣을 수 없을 때 유용하다. 임의의 대규모 설정 데이터를 수용할 수 있기 때문이다.
- 단점:
  - 레지시트리를 통해 추가 컨테이너 이미지를 빌드하고 배포해야 하므로, 복잡성이 더 높다.
  - 민감한 설정 데이터를 처리하는 보안 문제에는 아무런 대책이 없다.
  - 쿠버네티스의 경우 별도의 초기화 컨테이너 처리가 필요하므로, 환경에 따라 다른 디플로이먼트 객체를 관리해야 한다.

### 21장 설정 템플릿
- 어플리케이션이 시작되기 전에 설정 파일을 세팅하는 방법:
  - 템플릿 처리기를 ENTRYPOINT의 일부로 Dockerfile에 추가해서, 탬플릿 처리를 컨테이너 이미지에 포함시킬 수 있다.
  - 쿠버네티스의 경우 템플릿 처리기가 실행되고 파드의 어플리케이션 컨테이너에 대한 설정을 만드는 초기화 컨테이너를 사용할수 있다.
- 모든 내용을 다 볼 필요는 없고, 아래 yaml 만 읽어도 대충은 어떻게 설정할지 보여서 yaml만 기재

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    example: cm-template
  name: widfly-cm-template
spec:
  replicas: 1
  template:
    metadata:
      labels:
        example: cm-template
    spec:
      initContainers:
      - image: k8spatterns/example-config-cm-template-init
        name: init
        volumeMounts:
        - mountPath: "/params"
          name: wildfly-parameters
        - mountPath: "/out"
          name: widfly-config
      containers:
      - image: jboss/wildfly:10.1.0.Final
        name: server
        command:
        - "/opt/jboss/wildfly/bin/standalone.sh"
        - "-Djboss.server.config.dir=/config"
        ports:
        - containerPort: 8080
          name: http
          protocol: TCP
        volumeMounts:
        - mountPath: "/config"
          name: wildfly-config
        volumes:
        - name: wildfly-parameters
          configMap:
            name: wildfly-parameters
        - name: wildfly-config
          emptyDir: {}
```

## 5부 고급 패턴
### 22장 컨트롤러
- reconciliation 과정:
  - observe : 관측하고 있는 자원이 변경될 때 쿠버네티스가 배포하는 이벤트를 watch 하여 actual state를 찾는다.
  - analyze : 실제 상태와 요청한 상태의 차이를 알아낸다.
  - act : 실제 상태가 요청한 상태로 구동되도록 작업을 수행한다.

- reconciliation components:
  - controller : 표준 쿠버네티스 자원을 모니터링하고 작동하는 간단한 reconciliation process.
  - operator: CRD와 연동.

- 컨트롤러는 Singletone Service 로 동작하여 동시성 문제를 방지한다.
- controller 데이터를 저장할수 있는 위치:
  - label:
    - 자원 메타데이터의 일부인 label은 모든 컨트롤러에서 watch할 수 있으며, backend database 에서 indexing 되어 효율적인 쿼리검색이 가능하다.
    - selector 를 사용하기 위해서는 반드시 label을 사용해야한다.
    - label은 허용된 구문과 문자 집합이 따로 있다.
  - annotation:
    - label을 대체할 자원
    - 색인되지 않는다.
  - configmap:
    - configmap 보다는 CRD가 더 권장되지만, CRD는 클러스터 권한이 더 높게 요구된다.

- 책에는 추가적인 다른 내용도 있긴하지만, deprecated 된 내용도 있어서 이정도만 알면 될것 같다.

### 23장 오퍼레이터
- CRD 에는 특별한 두가지 자원이 존재한다.:
  - scale: 이 속성을 사용하면 CRD 에서 replica 수를 관리하는 방법을 지정할 수 있다. HorizontalPodAutoscaler를 사용한다면 필수로 지정되어야한다.
  - status: 외부에서 상태를 업데이트 할 수 있다.

- 컨트롤러와 오퍼레이터 분류:
  - 설치 CRD:
    - 쿠버네티스 플랫폼에서 애플리케이션을 설치하고 운영하는 데 사용된다. 일반적인 예로 프로메테우스 자체를 설치하고 관리하는 프로메테우스 CRD가 있다.
  - 어플리케이션 CRD:
    - 어플리케이션별 도메인 컨셉을 나타낼때 사용한다.

- 오퍼레이터 개발과 배포에 도움되는 프로젝트들:
  - CoreOS Operator Framework
  - Kubebuilder
  - Metacontroller

### 24장 탄력적스케일

- HPA 관련

```bash
kubectl autoscale deployment <deployment name> --cpu-percent=50 --min=1 --max=5
```

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: random-generator
  spec:
    minReplicas: 1
    maxReplicas: 5
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: random-generator
    metrics:
    - resource:
        name: cpu
        target:
          averageUtilization: 50
          type: Utilization
      type: Resource
```

- metric types:
  - standard metrics:
    - `.spec.metrics.resource[:].type` 으로 선언되며 CPU, Memory 등 자원 사용량 메트릭을 나타낸다.
  - user defined metrics:
    - `.spec.metrics.resource[:].type` 으로 선언되며 클러스터별로 각기 다른 클러스터링 모니터링 설정이 필요하다.
    - prometheus, datadog, azure 등등 에서 널리 사용되고 있다.
  - 외부 메트릭:
    - 메시지 큐와 같이 외부 서비스에 존재하는 지표를 사용하고 싶을때 사용

- HPA 가 해주는 것들:
  - 메트릭 선택
  - 쓰래싱(thrashing) 방지
  - 지연된 반응

#### 수직 Pod Autoscaling
- Veritcal Pod Autoscaler (VPA)
- 좀 찾아보니까 기본으로 제공되는 건 아닌것 같다. [공식 사이트](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme):
  - 이것저것 민감한 이슈들이 많아서 아직까지 beta 상태이다. 글을 쓰는 이 시점에도 19시간 전에 커밋된게 있는 걸로 보아 아직까지 개발중인 것 같다.
- 책이랑 좀 다르니 공식 사이트를 따르자.

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-app-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind:       Deployment
    name:       my-app
  updatePolicy:
    updateMode: "Auto"
```


### 25장 이미지 빌더
- 읽어보니까, 예전에 봤던 면접이 이걸 하라고 했던 것 같다.
- 대충 yaml 만 적어둔다. 자세한건 공식 문서를 참고하자.

```yaml
apiVersion: v1
kind: BuildConfig
metadata:
  name: runtime
spec:
  source:
    images:
    - from:
        kind: ImageStreamTag
        name: random-generator-build:latest
      paths:
      - sourcePath: /deployments/.
        destinationDir: "."
    dockerfile: |-
      FROM openjdk:8-alpine
      COPY *.jar /
      CMD java -jar /*.jar
  strategy:
    type: Docker
  output:
    to:
      kind: ImageStreamTag
      name: random-generator:latest
  triggers:
  - imageChange:
      automatic: true
      from:
        kind: ImageStreamTag
        name: random-gnerator-build:latest
    type: ImageChange
```

- KNative 도 이를 지원한다고 한다. KNative는 조금더 공부해봐야지 알 것 같다.:
  - 옮긴이의 말로는 중단되고, Tekton Pipelines 으로 대체되었다고 한다. 이것도 한번 찾아봐야지 알것 같다.

--
## 다읽은 후기
- 책을 정리하면서 읽고, 최대한 모르는 건 찾아보면서 읽었으나 아직 잘 모르겠는게 많다.
- 실습을 해보면서 익히는게 좋을 것 같다. 책이 좀 되서, 잘 안되는 예제를 몇개 만나고 나니 예제를 안하고 책 읽고, 공식문서 보고 넘어가는 식으로 공부하니 손에 익지 않았다.
- 손으로 직접 해보고 싶은건 Builder, Autoscaler, Service Discovery 이다. 이렇게 3개는 다른 공부를 하면서도 접해본적이 없어서 책을 읽으면서도 꼭 나중에 손으로 해봐야겠다고 생각했다.
- 전체적으로 훑기에 좋았던 것 같다. CKA 자격증 동영상만 볼때는 잘 몰랐던 내용들이 나와서 계속 찾아보면서 읽었고 전체적인 이해도에 도움을 주었다.:
  - 특히 StatefulSet 을 읽었을때, 아 이런식으로 돌리는구나 싶었다.
- 단점은 책이 좀 나온지 돼서, version issue나 deprecated 된 프로젝트가 있었다는 것 정도이다.
