---
layout  : wiki
title   : linux-debug/scheduling
date    : 2020-12-09 13:30:45 +0900
lastmod : 2020-12-11 15:53:17 +0900
tags    : [linux]
parent  : linux-debug
---

## 주요 키워드
 * scheduling : 실행 대기 중인 프로세스 중에서 우선순위가 가장 높은 프로세스를 선택해 CPU에서 실행시킴
   * Preemptive Scheduling : 강제로 CPU에서 실행 중인 프로세스를 비우고 새로운 프로세스 실행
   * Non-Preemptive Scheduling : 프로세스가 자발적으로 스케줄링 요청
 * context-switching : cpu에서 실행 중인 프로세스의 레지스터 세트를 비우고 새로운 프로세스 레지스터 세트를 채우는 동작, 아키텍쳐마다 구현 방식이 다름
 * scheduling policy : 스케쥴링 시 어떤 방식과 규칙으로 다음에 실행할 프로세스를 선택할지 결정
 * scheduler class : 5가지 커널 스케쥴러 세부동작을 모듈화한 자료구조 이자 인터페이스, 프로세스는 스케쥴러 클레스를 우선순위에 따라 선택할 수 있음
 * run queue : 실행 대기 중인 프로세스를 관리하는 자료구조, percpu 타입 변수
 * proirity : 유저 공간에서 설정한 nice와 커널 우선순위가 존재

### 선점 스케쥴링과 비선점 스케쥴링 비교
 * Preemptive Scheduling
   * 실행 중인 프로세스를 강제로 CPU에서 실행 중지
   * 새로운 프로세스가 CPU에서 실행
   * 선점 스케쥴링 시작점
     * 인터럽트 핸들러를 처리하고 난 후 인터럽트가 발생하기 전에 코드로 되돌아가기 직전
     * 시스템 콜의 핸들러 함수를 처리하고 난 후 유저 공간으로 복귀하기 직전
 * 비선점 스케쥴링
   * 프로세스가 자발적으로 스케줄링 요청
   * 비선점 스케줄링 시작점
     * 입출력(I/O) 동작을 시작할 때
     * 뮤텍스를 획득하지 못하고 휴먼 상태에 진입할 때

## 스케줄링 정책
 ```c
 #define SCHED_NORMAL    0
 #define SCHED_FIFO      1
 #define SCHED_RR        2
 #define SCHED_BATCH     3
 #define SCHED_IDLE      5
 #define SCHED_DEADLINE  6
 ```

### 스케줄러 클래스
 * stop 스케줄러
   * [참고- 문C 블로그](http://jake.dothome.co.kr/stop-sched/)
   * 어떠한 스케줄러보다 우선 순위가 더 높아 preemption 되지 않으며, 다른 cpu로 migration도 허용되지 않다. 모든 요청에 대해 대부분 거절하거나 아무런 일도 하지 않는다.
 * deadline 스케줄러
   * [참고- 문C 블로그](http://jake.dothome.co.kr/dl-scheduler/)
   * 2013년 3월 Kernel v3.14에서 소개
   * EDF + CBS 알고리즘 기반
     * EDF(Earliest Deadline First)
       * 작업이 N 개일때 복잡도는 O(n^2) 로 알려져 있으며, 수학적으로 최적이라는 것이 증명되어 있지만, 현실적으로 프로세스의 마감시간을 예측하는 것이 어렵다.
       * 예시 : P1이 수행시간이 1, 주기가 8, P2가 수행시간이 2, 주기가 5, P3가 수행시간이 4, 주기가 10이고, 1단위 시간이 10ms 일때 CPU 사용량은 1/8 + 2/5 + 4/10 = 0.925이기에 스케줄링이 가능하다고 판단하며 스케줄링한다.
     * CBS(Constatn Bandwidth Server)
       * 자료가 안나오길래 아래 적어둔 논문 기반으로 정보를 적는다.
       * 논문 : Intergrating multimedia applications in hard real-time systems
       * 1998년도에 소개된 예약기반(reservation-based) 스케줄링 알고리즘
       * $$\text{ a budget } c_s \text{ and by a ordered pair } (Q_s, T_s), \text{ where } Q_s \text{ is the maximum budget and } T_s \text{ is the period of the server }$$
       * $$\text{ server bandwidth } U_s = Q_s / T_s$$
       * $$\text{ At each instant, a fixed deadline } d_{s, k}$$
       * $$\text{ Initially, } d_{s, 0} = 0$$
       * 각 작업들은 동적인 마감시간(deadline)을 가지고 있고 이는 초기에는 현제 서버의 마감시간과 동일하게 된다.
       * 작업들이 실행되면 그와 같은 양이 예산에서 빠지며, 예산이 0이 됬을 때 서버의 최대 예산인 Q_s를 다시 채우고, 새로운 서버 마감시간이 생기게된다. 이 때 새로운 마감시간은 T_s만큼 더한것이다. \\(d_{s, k + 1} = d_{s, k} + T_s \\)
       * 흐으으음... 이 이상 자세히 적을 필요는 없을 듯, 그냥 대충 예산 개념이 존재해서 스케줄링 한다? 정도까지만 정리함. 사실상 정리하면 그냥 논문 번역이 될듯
   * 처음에는 UP 시스템용으로 구현되었다가 SMP 시스템에서도 채용함. 각 cpu의 earliest deadline을 관리하고 다른 CPU로 전달하여 효과적으로 스케줄링한다.
   * 상당히 최신에 추가된 내용이며, 2017년에도 새 버전의 deadline 스케줄러가 소개됬다고 한다.
   * Stop 스케줄러 바로 다음의 우선순위를 가짐

 * RT 스케줄러
   * stop - deadline 다음 순서의 우선순위를 가지고 있다.
   * rt 런큐는 CPU 수만큼 생성된다.

 * CFS 스케줄러
   * [참고](https://goodgid.github.io/Scheduler-CFS/)
   * rb 데이터 구조를 사용하며 O(logN) 성능을 가지는 스케줄러
   * 특징
     * 공평한 CPU 시간
     * 가상 런타임
     * 대기자 공평성
     * RB-트리
 * Idle 스케줄러
   * [참고- 문C 블로그](http://jake.dothome.co.kr/idle-sched/)
   * 어떠한 스케줄러보다 우선순위가 낮다.
   * core 마다 1개씩 지정되어 있어 다른 cpu로의 migration이 필요 없다.

### 런큐
 * 실행 대기상태 프로세스와 CPU에서 실행 중인 프로세스를 관리하는 자료구조

### 우선순위(nice)
 * -20 ~ 19의 값을 가지며 커널공간에서 100 ~ 139 범위 값으로 변환되어 관리된다.(0 ~ 99 는 RT)
 * RT(Real-Time) 프로세스의 우선순위 범위
   * 0 ~ 99 사이의 우선순위를 가짐
   * SCHED_FIFO 이며, 우선순위가 더 높은 RT 프로세스가 없으면 계속 CPU를 점유해 사용한다.

## 프로세스 상태 관리
```c
#define TASK_RUNNING          0x0000
#define TASK_INTERRUPTIBLE    0x0001
#define TASK_UNINTERRUPTIBLE  0x0002
#define __TASK_STOPPED        0x0004
#define __TASK_TRACED         0x0008
```

### 프로세스 상태
 * TASK_RUNNING : 실행대기
   * 프로세스가 런큐에 삽입된 후 실행을 기다리는 상태
   * 스케줄러는 TASK_RUNNING(실행 대기)상태에 있는 프로세스 중에서 CPU에서 실행할 프로세스를 선택
 * TASK_RUNNING : CPU 실행
   * 프로세스가 CPU에서 실행 중인 상태
   * CPU 레지스터 세트에는 현재 실행 중인 프로세스의 상태 정보로 채워짐
 * TASK_INTERRUPTIBLE
   * 프로세스가 휴면 상태에 진입한 상태
   * 프로세스를 깨우면 다시 TASK_RUNNING(실행 대기) 상태로 변경됨
 * TASK_UNINTERRUPTIBLE
   * 프로세스가 특정 조건으로 깨워나고 싶을 때 설정하는 상태
   * 보통 스스로 깨어날 조건을 설정한 다음에 TASK_UNINTERRUPTIBLE 상태로 변경
   * 뮤텍스를 얻지 못하거나 입출력(I/O) 동작 중에 TASK_UNINTERRUPTIBLE 상태로 변경

#### TASK_INTERRUPTIBLE과 TASK_UNINTERRUPTIBLE 상태의 차이점
 * I/O 나 mutex 같이 깨어나봤자 의미가 없을때, 자신을 깨울수 있는 방법과 시기(I/O가 종료되거나, mutex를 획득할수 있어질때)를 설정하고 TASK_UNINTERRUPTIBLE 로 둔다.
 * TASK_UNINTERRUPTIBLE 상태의 프로세스가 비정상으로 많은 경우
   * 다수의 프로세스들이 뮤텍스를 획득하지 못해 자신을 TASK_UNINTERRUPTIBLE 상태로 바꾸고 휴면 상태에 진입
   * I/O 동작 중에 외부 장치와 인터페이싱에 문제가 있음
 * TASK_RUNNING 상태의 프로세스가 비정상으로 많은 경우
   * 특정 프로세스가 CPU를 계속 점유하고 실행중
   * 인터럽트가 비정상적으로 많이 발생해서 프로세스 선점 스케줄링이 제대로 수행되지 못함.

### 프로세스 상태 변화
```uml
@startuml
[*] --> TASK_RUNNING_실행대기
TASK_RUNNING_실행대기 --> TASK_RUNNING_CPU실행 : 1
TASK_RUNNING_CPU실행 --> TASK_INTERRUPTIBLE : 2
TASK_RUNNING_CPU실행 --> TASK_UNINTERRUPTIBLE : 3
TASK_INTERRUPTIBLE --> TASK_RUNNING_실행대기 : 4
TASK_RUNNING_CPU실행 --> TASK_DEAD : 5
TASK_UNINTERRUPTIBLE --> TASK_RUNNING_실행대기
TASK_DEAD --> [*]
@enduml
```
 * 1. 실행대기(TASK_RUNNING) -> CPU 실행중(TASK_RUNNING)
   * context switching 이라 부르며, CPU register sets을 저장하고, 다음 실행될 THREAD의 CPU register sets을 불러온다.
 * 2. CPU 실행(TASK_RUNNING) -> 휴면(TASK_INTERRUPTIBLE)
 * 3. CPU 실행(TASK_RUNNING) -> 휴면(TASK_UNINTERRUPTIBLE)
   * 특정 조건에서만 깨어날수 있게 됨
   * 자신이 깨어날 조건 설정 -> TASK_UNINTERRUPTIBLE 상태로 변경 -> `schedule()` 함수를 호출해 휴면상태에 진입
   * I/O를 실행할때, 뮤텍스를 획득하지 못했을 때
 * 4. 휴면(TASK_INTERRUPTIBLE) -> 실행 대기(TASK_RUNNING)
   * `wake_up_process()` 함수를 호출해서 프로세스를 깨울때의 상황
 * 5. 휴면(TASK_UNINTERRUPTIBLE) -> 실행 대기(TASK_RUNNING)
   * I/O 실행 완료 또는 뮤텍스를 해제한 프로세스가 뮤텍스를 기다리고 있는 프로세스를 깨울때

### 프로세스 상태 변화 함수 목록
 * TASK_RUNNING(실행 대기)
   * wake_up_interruptible()
   * wake_up_new_task()
   * wake_up_process()
   * yeild()
   * do_nanosleep()
 * TASK_RUNNING(CPU 실행)
   * schedule()
 * TASK_INTERRUPTIBLE
   * wait_event_interruptible()
   * do_sigtimedwiat()
   * sys_pause()
   * do_nano_sleep()
 * TASK_UNINTERRUPTIBLE
   * io_wait_event()
   * mutex_lock()
   * usleep_range()
   * msleep()
   * wait_for_completion()

### TASK_RUNNING(실행 대기)으로 바뀔 때 호출되는 함수
 * 프로세스를 깨울때
 * 프로세스를 처음 생성하고 실행 요청을 할 때
 * 프로세스 관련 정보를 업데이트 할때
 * wake_up_new_task()
   ```c
   void wake_up_new_task(struct task_struct *p)
   {
     struct rq_flags rf;
     struct rq *rq;

     raw_spin_lock_irqsave(&p->pi_lock, rf.flags);
     p->state = TASK_RUNNING;
     /* skip */
   }
   ```
   * _do_fork 에서 호출됨

 * wake_up_process()
   * wake_up_process() -> try_to_wake_up() -> ttwu_do_activate() -> ttwu_do_wakeup()
   * ttwu : try to wake up 의 약어
   ```c
   static void ttwu_do_wakeup(struct rq *rq, struct task_struct *p, int wake_flags,
     struct rq_flags *rf)
   {
     check_preempt_curr(rq, p, wake_flags);/
     p->state = TASK_RUNNING;
     trace_sched_wakeup(p);
     /* skip */
   }
   ```

 * yield()
   ```c
   void __sched yield(void)
   {
     set_current_state(TASK_RUNNING);
     do_sched_yield();
   }
   ```

 * do_nanosleep()
   ```c
   static int __sched do_nanosleep(struct hrttimer_sleepr *t, enum hrtimer_mode mode)
   {
     struct restart_block *restart;
     /* skip */
     __set_current_state(TASK_RUNNING);
     /* skip */
   }
   ```
