---
layout  : wiki
title   : 쿠버네티스 패턴
date    : 2022-08-16 10:56:05 +0900
lastmod : 2022-08-18 15:21:03 +0900
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

# 1부 기본 패턴
## 2장 예측 범위 내의 요구사항
- 애플리케이션의 요구사항에 따라서 필요한 자원량은 달라지며, 이를 예측하는 것은 어려운 일이다.
- 쿠버네티스를 사용하면서 런타임 요구사항을 알아야하는 이유:
  - 효율적인 하드웨어 사용을 위한 배치
  - 전체 클러스터 설계 및 관리

### 런타임 의존성
- PersistentVolume
- hostPort
- configMap, secret

### 자원 프로파일
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

### 파드 우선순위
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

### 프로젝트 자원
- 추가 참고자료 : [메모리 상승과 오버커밋](https://hakkyoonjung31.github.io/linux/memory-overcommit/)
- 메모리 오버커밋 : 요구된 메모리를 그대로 할당하는 것이 아닌 실제 사용되는 시점에서 필요한 만큼의 메모리를 할당하는 방식에 의해 요구되는 메모리의 총량이 100%를 넘기는 경우
- 오버 커밋 상태에서 실제 메모리 사용 총량이 메모리 총량을 넘기게 될 수도 있는데, 이때 OOM-Killer에 의해 프로세스들을 죽여서 용량을 확보하게 된다.
- 개인 해석:
  - 오버커밋에 의해 요청된 메모리와 사용하는 메모리는 차이가 날 수 있다.
  - 즉 requests는 250M를 하는데, pod에서 오버커밋을 이용해 500M를 할당하고, 사용은 200M를 하고 있는 상황같은게 발생 할 수 있다는 것이다.
  - kubernetes 는 기본적으로 requests 를 기준으로 스케줄링한다.

## 3장 선언적 배포
- 선언적 업데이트를 작동시키기 위한 옵션:
  - `kubectl replace`로 새로운 버전의 deployment로 전체 deployment를 교체한다.
  - deployment를 `kubectl patch` 나 `kubectl edit`으로 새로운 버전을 넣는다.
  - `kubectl set image` 을 통해서 deployment에 새로운 이미지를 넣는다.
- deployment 의 장점:
  - deployment는 상태가 내부적으로 관리되는 객체이므로 클라이언트와 상호작용 없이, 서버측에서 실행된다.
  - deployment 의 선언적 특성은 배포에 필요한 단계보다는 배포된 상태가 어떻게 보여야하는지를 알 수 있다.
  - deployment의 정의는 운영 환경에 배포되기 전에 다양한 환경에서 테스트된 실행 가능한 객체이다.
  - 업데이트 프로세스는 모두 기록되며, 일시 중지 및 계속을 위한 옵션, 이전 버전으로 롤백을 위한 옵션으로 버전이 지정된다.

### 고정 배포
- Recreate 전략:
  - 우선적으로 현재 버전의 모든 컨테이너를 죽이고, 이전 버전의 컨테이너가 축출될때 모든 신규 컨테이너를 동시에 시작한다.

### 블루-그린
- 블루(이전 버전), 그린(현재 버전)
- 블루와 그린을 모두 띄운뒤 신규 트래픽을 그린으로 보낸뒤, 기존 트래픽을 다 처리하면 블루를 삭제한다.
- 블루와 그린이 순간적으로 동시에 뜨게 된다.
- 즉, 자원이 2배로 필요하다.

### 카나리아
- 소수의 인스턴스를 교체하면서 동작한다.

## 4장 정상상태 점검
- 프로세스 상태는 애플리케이션의 정상상태를 결정하기에는 충분하지 않다.

### Liveness probe
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

### Readiness probe
- liveness와는 다르게 readiness probe 이 실패할 경우, service의 endpoint가 제거되어 새로운 트래픽을 수신할 수 없게 된다.

### Others
- spring actuator, wide-fly swarm, karaf, microprofile spec 등 애플리케이션 프레임워크는 정상상태 점검을 위한 인터페이스를 제공한다.
- 로그는 표준스트림 이외에도 `/dev/termination-log` 에 남기는 것이 좋다.
- OpenTracing이나 Prometheus 같은 트레이싱, 메트릭 수집 라이브러리와 통합하여 어플리케이션 상태를 관찰할 수 있도록 해야한다.

## 5장 수명주기 관리
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

## 6장 자동 배치
- 가용한 노드 자원:
  - Allocatable = Node Capacity - Kube-Reserved - System-Reserved
  - Kube-Reserved : 쿠버네티스 데몬에 의해 사용되는 자원
  - System-Reserved : sshd, udev 와 같은 시스템 데몬에 사용되는 자원
  - OS와 Kubernetes가 사용하는 자원을 따로 예약해두지 않으면 자원 부족 문제가 생길 수 있다.

### Node Affinity
- `.spec.affinity.nodeAffinity` 를 통해서 선호 조건, 필수 조건을 걸 수 있다.

### Pod Affinity
- 다른 파드와 상대적인 위치

### Taint 와 Toleration
- taint 종류:
  - `effect=NoSchedule` : 스케줄링을 피하는
  - `effect=PreferNoSchdule` : 가급적 스케줄링을 피하는
  - `effect=NoExecute` : 이미 실행중인것을 빼도록

### Descheduler
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

# 2부 행동 패턴
## 7장 배치 잡
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

## 8장 주기적 잡
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

## 9장 데몬 서비스
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

## 10장 싱글톤 서비스

### 애플리케이션 외부 잠금
- 어플리케이션 외부에서 별도의 관리 프로세스를 통해서 싱글톤을 구현하는 방법
- replica set으로 구현할 경우 replicas 숫자를 1로 유지한다는 보장이 없으므로 별도의 주의가 필요하다.
- 일시적으로 node가 비정상 상태일 경우, 새롭게 Pod 가 생성되는데, 이때 비정상이였던 node가 살아나면 싱글톤 보장이 깨진다.
- StatefulSet 을 사용해 구현할 경우, 강력하게 싱글톤 제약을 걸 수 있지만 복잡성 또한 증가한다.
- 이렇게 StatefulSet 을 사용해 Singleton 서비스를 구성하면, Headless Service 를 사용해 묶어야한다.:
  - 책의 이 부분이 이해하기 어려운데, [참고자료 - 조대협의 블로그](https://bcho.tistory.com/1310) 를 읽어보면 이해가 쉽다.
  - 간략하게 요약하면, statfuleset 으로 만들어진 pod 같은 경우, 굳이 service를 통해서 접근할 필요가 없다. 하지만 service 가 없다면, pod 는 domain name을 가질수 없어 접근이 어렵다. 따라서 headless service 를 통해 pod를 묶기만 하고 접근은 pod로 한다.

### 애플리케이션 내부 잠금
- distributed lock 을 활용하여 pod 가 여러개 뜨더라도 하나의 pod 만 active 상태로 만든다.
- distributed lock 을 위하여 zookeeper, redis, etcd 등 이러한 내용이 구현되어 있는 프로그램 또는 프레임 워크가 필요하다.
- k8s 에서는 master node 의 etcd 를 kubernetes api 를 통해서 노출하고 사용하는 편이 좋은 선택이다.:
  - 또한 이렇게 하는 것이 아닌 configmap 이 동시에 하나의 pod만 수정 가능하다는 것을 이용하여 분산락을 대체해서 사용하는 방법도 있다.

### PodDisruptionBudget
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

## 11장 스테이트풀 서비스
- [[Twelve-Factor-App]]