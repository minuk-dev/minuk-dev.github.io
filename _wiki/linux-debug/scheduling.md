---
layout  : wiki
title   : linux-debug/scheduling
date    : 2020-12-09 13:30:45 +0900
lastmod : 2020-12-17 13:59:47 +0900
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

### TASK_RUNNING(CPU 실행)로 바뀔 때 호출하는 함수
 * schedule()
  ```c
  static void __sched notrace __schedule(bool preempt)
  {
    struct rq *rq;
    int cput;

    cpu = smp_processor_id();
    rq = cpu_rq(cpu);

    if (likely(prev != next)) {
      rq->nr_switches ++;
      rq->curr = next;

      /* Also unlocks the rq: */
      rq = context_switch(rq, prev, next, &rf);
    } else {
    /* skip */
  }
  ```

### TASK_INTERRUPTIBLE 상태로 바뀔 때 호출하는 함수
 * wait_event_interruptible()
  ```c
  #define wait_event_interruptible(wq_head, condition)            \
  ({                                                              \
    int __ret = 0;                                                \
    might_sleep();                                                \
    if (!(condition))                                             \
      __retval = __wait_event_interruptible(wq_head, condition);  \
    __ret;                                                        \
  })

  #define __wait_event_interruptible(wq_head, condition)          \
    ___wait_event(wq_head, condition, TASK_INTERRUPTIBLE, 0, 0,   \
      schedule())
  ```

   * ___wait_event()
   ```c
   #define ___wait_event(wq_head, condition, state, exclusive, ret, cmd)  \
   ({                                                                     \
     __label__ __out;                                                     \
     struct wait_queue_entry __wq_entry;                                  \
     long __ret = ret; /* explicit shadow */                              \
                                                                          \
     init_wait_entry(&__wq_entry, exclusive ? WQ_FLAG_EXCLUSIVE : 0);     \
     for (;;) {                                                           \
       long __int = prepare_to_wait_event(&wq_head, &__wq_entry, state);  \
       /* skip */                                                         \
     }                                                                    \
     finish_wait(&wq_head, &__wq_entry);                                  \
   __out: __ret;                                                          \
   })
   ```
   * prepare_to_wait_event()
   ```c
   long prepare_to_wait_event(struct wait_queue_head *wq_head, struct wait_queue_entry *wq_entry.
     int saste)
   {
     unsigned long flags;
     long ret = 0;

     spin_lock_irqsave(&wq_head->lock, flags);
     if (unlikely(signal_pending_state(state, current))) {
       /* skip */
     } else {
       if (list_empty(&wq_entry->entry)) {
         if (wq_entry->flags & WQ_FLAGS_EXCLUSIVE)
           __add_wait_queue_entry_tail(wq_head, wq_entry);
         else
           __add_wait_queue(wq_head, wq_entry);
       }
       set_current_state(state);
     }
     /* skip */
   }
   ```
 * do_sigtimedwait()
 * sys_pause()
   ```c
   SYSCALL_DEFINE0(pause)
   {
     while (!signal_pending(current)) {
       __set_current_state(TASK_INTERRUPTIBLE);
       schedule();
     }
     return -ERESTARTNOHAND;
   }
   ```
   * 펜딩된 시그널(자신에게 전달된 시그널)이 없는지 점검
   * 자신을 TASK_INTERRUPTIBLE(휴면 상태)로 변경
   * schedule() 함수를 호출해 휴면상태로 진입
 * do_nanosleep()

### TASK_UNINTERRUPTIBLE 상태로 바뀔 때 호출하는 함수
 * io_wait_event()
   ```c
   #define io_wait_event(wq_head, condition)        \
   do {                                             \
     might_sleep();                                 \
     if (condition)                                 \
       break;                                       \
     __io_wait_event(wq_head, condition);           \
   } while (0)

   #define __io_wait_event(wq_head, condition)                        \
   (void)__wait_event(wq_head, condition, TASK_UNINTERRUPTIBLE, 0, 0, \
     io_schedule())
   ```
 * mutex_lock()
   ```c
   static int __sched
   __mutex_lock(struct mutex *lock, long state, unsgined int subclass,
     struct lockdep_map *nest_lock, unsigned long ip)
   {
     return __mutex_lock_common(lock, state, subclass, nest_lock, ip, NULL, false);
   }
   ```

   ```c
   static __always_inline int __sched
   __mutex_lock_common(struct mutex *lock, long state, unsigned int subclass,
     struct lockdep_map *nest_lock, unsigned long ip,
     struct ww_acquire_ctx *ww_ctx, const bool use_ww_ctx)
   {
     /* skip */
     set_current_state(state);
     for (;;) {
       /* skip */
       schedule_preempt_disabled();
       /* skip */
     }
     /* skip */
   }
   ```
 * usleep_range()
   ```c
   void __sched usleep_range(unsigned long min, unsigned long max)
   {
     ktime_t exp = ktime_add_us(ktime_get(), min);
     u64 delta = (u64)(max - min) * NSEC_PER_USEC;

     for (;;) {
       __set_current_state(TASK_UNINTERRUPTIBLE);
       /* Do not return before teh requested sleep time has elapsed */
       if (!schedule_hrtimeout_range(& exp, delta, HRTIMER_MODE_ABS))
         break;
     }
   }
   ```
 * msleep()
   ```c
   void msleep(unsigned int msec)
   {
     unsigned long timeout = msecs_to_jiffies(msecs) + 1;

     while (timeout)
       timeout = schedule_timeout_uninterruptible(timeout);
   }

   signed long __sched schedule_timeout_uninterruptible(signed long timeout)
   {
     __set_current_state(TASK_UNINTERRUPTIBLE);
     return schedule_timeout(timeout);
   }
   ```
 * wait_for_completion()
   ```c
   void __sched wait_for_completion(struct completion *x)
   {
     wait_for_common(x, MAX_SCHEDULE_TIMEOUT, TASK_UNINTERRUPTIBLE);
   }
   ```

## 스케줄러 클래스
 * 프로세스가 스케줄러 클래스르 ㄹ통해 유연하게 스케줄러를 바꾸게 지원하기 위해서

### sched_class 구조체
 ```c
 struct sched_class {
   const struct sched_class *next;

   void (*enqueue_task) (struct rq *rq, struct task_struct *p, int flags);
   void (*dequeue_task) (struct rq *rq, struct task_struct *p, int flags);
   void (*yield_task) (struct rq *rq);
   bool (*yeild_to_task) (struct rq *rq, struct task_struct *p, bool preempt);

   void (*check_preempt_curr) (struct rq *rq, struct task_struct *p, int flags);

   struct task_struct * (*pick_next_task) (struct rq *rq,
                                        struct task_struct *prev,
                                        struct rq_flags *rf);
   void (*put_prev_task) (struct rq *rq, struct task_struct *p);
   int (*select_task_rq) (struct task_struct *p, int task_cpu, int sd_flag, int flags);
   void (*migrate_task_rq) (struct task_struct *p);
   void (*task_woken) (struct rq *this_rq, struct task_struct *task);
   void (*set_cpus_allowed)(struct task_struct *p,
                        const struct cpumask *newmask);
   /* skip */
 }
 ```
   * enqueue_task : 프로세스가 실행 가능한 상태로 진입
   * dequeue_task : 프로세스가 더 이상 실행 가능한 상태가 아닐 때
   * yeild_task : 프로세스가 스스로 yield() 시스템 콜을 실행했을 때
   * check_preempt_curr : 현재 실행 중인 프로세스를 선점할 수 있는지 검사
   * pick_next_task : 실행할 다음 프로세스를 선택
   * put_prev_task : 실행 중인 프로세스를 다시 내부 자료구조(런큐)에 삽입
   * load_balance : 코어 스케줄러가 태스크 부하를 분산하고자 할 때
     * [참고-문C블로그](http://jake.dothome.co.kr/load-balance-1/)
     * Passive Balancing : Fork Balancing, Exec Balancing, Wake Balancing, Idle Balancing
     * Periodic Balancing
   * set_current_task : 프로세스의 스케줄러 클래스나 태스크 그룹을 바꿀 때
   * task_tick : 타이머 틱 함수를 호출

### 5가지 스케줄러 클래스
 ```c
 extern const struct sched_class stop_sched_class;
 extern const struct sched_class dl_sched_class;
 extern const struct sched_class rt_sched_class;
 extern const struct sched_class fair_sched_class;
 extern const struct sched_class idle_sched_class;
 ```
 * 리눅스 시스템에서 전체 프로세스 가운데 RT 클래스 프로세스와 CFS 클래스 프로세스의 비율 : 99% 는 CFS, 1%정도가 나머지 그마저도 대부분 RT

#### 스케줄러 클래스의 우선 순위
 * stop -> dl -> rt -> fair -> idle
 * struct 내부 변수 next를 사용해서 다음 우선 순위의 스케줄러를 가르킨다.

### 프로세스를 스케줄러에 등록
 * 1. 스케줄러 클래스 설정
   * sched_fork()
    ```c
    int sched_fork(unsigned long clone_flags, struct task_struct *p)
    {
      unsigned long flags;
      /* skip */
      if (dl_prio(p->prio))
        return -EAGAIN;
      else if (rt_prio(p->prio))
        p->sched_class = &rt_sched_class;
      else
        p->sched_class = &fair_sched_class;
    }
    ```
 * 2. 스케줄러 클래스 변경
   * __setscheduler()
     ```c
     static void __setscheduler(struct rq *rq, struct task_struct *p,
                    const struct sched_attr *attr, bool keep_boost)
     {
       __setscheduler_params(p, attr);

       p->prio = normal_prio(p);
       if (keep_boost)
         p->prio = rt_effective_prio(p, p->prio);

       if (dl_prio(p->prio))
         p->sched_class = &dl_sched_class;
       else if (rt_prio(p->prio))
         p->sched_class = &rt_sched_class;
       else
         p->sched_class = &fair_sched_class;
     }
     ```

### 세부 함수 호출
 * enqueue_task()
   ```c
   static inline void enqueue_task(struct rq *rq, struct task_struct *p, int flags)
   {
     if (!(flags & ENQUEUE_NOCLOCK))
       update_rq_clock(rq);
     if (!(flags & ENQUEUE_RESTOR))
       sched_info_queued(rq, p);

     p->sched_class->enqueue_task(rq, p, flags);
   }
   ```
* dequeue_task()
   ```c
   static inline void dequeue_task(struct rq *rq, struct task_struct *p, int flags)
   {
     if (!flags & DEQUEUE_NOCLOCK)
       update_rq_clock(rq);
     if (!(flags & DEQUEUE_SAVE))
       sched_info_dequeued(rq, p);

     p->shced_class->dequeue_task(rq, p, flags);
   }
   ```

## 런큐
 * percpu 타입의 전역변수
 * RT, CFS, Deadline 서브 런큐를 관리
 * 실행 요청을 한 프로세스가 런큐에 삽입됨
 * CPU를 점유하면서 실행 중인 current 프로세스를 관리

 ```c
 struct rq {
   raw_spinlock_t lock;

   unsigned int nr_running;
   /* skip */
   struct load_wait load;
   unsigned long nr_load_updates;
   u64 nr_switches;

   struct cfs_rq cfs;
   struct rt_rq rt;
   struct dl_rq dl;
   /* skip */
   unsigned long nr_uninterruptible;

   struct task_struct *curr, *dle, *stop;
   /* skip */
 };
 ```

 * lock : 런큐 자료구조를 변경할 때 경쟁 조건을 피하기 위한 락
 * nr_running : 런큐에 삽입된 모든 프로세스 개수
 * nr_switches : 컨텍스트 스위칭을 수행한 개수
 * cfs, rt : cfs, rt 런큐
 * nr_uninterruptible : 런큐에 있는 태스크 중 TASK_UNINTERRUPTIBLE 상태의 프로세스 개수
 * curr : 해당 런큐에서 CPU를 점유하면서 실행 중인 프로세스의 태스크 디스크립터
 * idle : idle 프로세스의 태스크 디스크립터
 * cfs_task : cfs 런큐에 삽입된 모든 일반 프로세스의 연결 리스트

### runqueues 변수
 ```c
 DECLARE_PER_CPU_SHARED_ALIGNED(struct rq, runqueues);
 #define cpu_rq(cpu) (&per_cpu(runqueues, (cpu)))
 #define this_rq() this_cpu_ptr(&runqueues)
 ```

## CFS 스케줄러
 * CFS(Completely Fair Scheduler)
 * 2.6.23 버전 이후로 적용된 리눅스 기본 스케줄러
 * 특징
   * 타임 슬라이스 : 스케줄러가 프로세스에게 부여한 실행 시간
   * 우선순위
     * 우선순위가 높은 프로세스에 대해 가장 먼저 CPU 에서 실행 시키고, 더 많은 타임 슬라이스를 할당해준다.
   * 가상 실행 시간(vruntime)
     * 프로세스가 그동안 실행 시간을 정규화한 시간 정보

### CFS 스케줄러 알고리즘
 * load weight : 프로세스의 우선순위에 주는 가중치
   ```c
   static void set_load_weight(struct task_struct *p)
   {
     int prio = p->static_prio - MAX_RT_PRIO;
     struct load_weight *load = &p->se.load;
     /* skip */
     if (update_load && p->sched_class == &fiar_sched_class) {
       reweight_task(p, prio);
     } else {
       load->weight = scale_load(sched_prio_to_weight[prio]);
       load->inv_weight = sched_prio_to_wmult[prio];
     }
   }
   ```
 * 타임 슬라이스
   * $$(time slice) = \frac{(load weight of process)}{(sum of load weight in CFS runqueue)} \time (scheduling latency)$$

 * vruntime : 프로세스가 그동안 실행한 시간을 정규화한 시간 정보
 * CFS 스케줄러는 런큐에 등록된 프로세스 중 vruntime이 가장 작은 프로세스를 다음에 실행할 프로세스로 선택
 * update_curr()
   ```c
   static void update_curr(struct cfs_rq *cfs_rq)
   {
     /* skip */
     u64 delta_exec;
     /* skip */
     curr->vruntime += calc_delta_fair(delta_exec, curr);
     /* skip */
   }
   static inline u64 calc_delta_fair(u64 delta, struct sched_entity *se)
   {
     if (unlikely(se->load.weight != NICE_0_LOAD))
       delta = __cal_delta(delta, NICE_0_Load, &se->load);
     return delta;
   }
   ```
   * $$vruntime += delta_exc * \frac{1024}{load weight}$$

 * 위의 공식대로라면, 휴면상태였던 프로세스 또는 새롭게 생성된 프로세스는 CPU를 더 많이 할당받게 된다. 따라서 주기적으로 vruntime의 최소값을 설정해준다.
 * update_min_vruntime()
   ```c
   static void update_min_vruntime(struct cfs_rq *cfs_rq)
   {
     struct sched_entity *curr = cfs_rq->curr;
     struct rb_node *leftmost = rb_first_cached(&cfs_rq->tasks_timeline);

     u64 vruntime = cfs_rq->min_vruntime;
     /* skip */
     /* ensure we never gain time by being placed backwards. */
     cfs_rq->min_vruntime = max_vruntime(cfs_rq->min_vruntime, vruntime);
     /* skip */
   }
   ```

### CFS 관련 세부 함수
#### 타임 슬라이스 관리
 * 프로세스가 타임 슬라이스를 소진했는지 점검, 프로세스의 타임 슬라이스를 업데이트, 타임 슬라이스를 모두 소진한 프로세스를 선점될 조건임을 마킹
 * scheduler_tick()
   ```c
   void scheduler_tick(void)
   {
     int cpu = smp_processor_id();
     struct rq *rq = cpu_rq(cpu);
     struct task_struct *curr = rq->curr;
     struct rq_flags rf;

     sched_clock_tick();

     rq_lock(rq, &rf);

     update_rq_clock(rq);
     curr->sched_class->task_tick(rq, curr, 0);
     /* skip */
   }
   ```
 * task_tick_fair()
   ```c
   static void task_tick_fair(struct rq *rq, struct task_struct *curr, int queued)
   {
     struct cfs_rq *cfs_rq;
     struct shced_entity *se = &curr->se;

     for_each_sched_entity(se) {
       cfs_rq = cfs_rq_of(se);
       entity_tick(cfs_rq, se, queued);
     }
     /* skip */
   }
   ```
   * eneity_tick()
     ```c
     static void
     entity_tick(struct cfs_rq *cfs_rq, struct sched_entity *curr, int queued)
     {
       update_curr(cfs_rq);

       update_load_avg(curr, UPDATE_TG);
       update_cfs_shares(curr);
       /* skip */
       if (cfs_rq->nr_running > 1)
         check_preempt_tick(cfs_rq, curr);
     }
     ```
 * check_preempt_tick()
   ```c
   static void
   check_preempt_tick(struct cfs_rq *cfs_rq, struct sched_entity *curr)
   {
     unsigned long ideal_runtime, delta_exec;
     struct sched_entity *se;
     s64 delta;

     ideal_runtime = sched_slice(cfs_rq, curr);
     delta_exec = curr->sum_exec_runtime - curr->prev_sum_exec_runtime;
     if (delta_exec > ideal_runtime) {
       resched_curr(rq_of(cfs_rq));
       /* skip */
     }

     if (delta_exec < sysctl_sched_min_granularity)
       return;

     se = __pick_first_entity(cfs_rq);
     delta = curr->vruntime - se->vruntime;

     if (delta < e)
       return;

     if (delta > ideal_runtime)
       resched_curr(rq_off(cfs_rq));
   }
   ```
   * 1. 프로세스가 소진한 타임 슬라이스 읽기
   * 2. 프로세스 선점 요청 : 프로세스가 타임 슬라이스를 모두 소진했으면 선점 요청을 한다.
   * 프로세스가 선점 요청을 하면, 인터럽트를 핸들링한 후 또는 시스템 콜을 핸들링한 후 유저 공간으로 복귀하기 전에 프로세스가 선점된다.
#### vruntime 관리와 관련된 세부 함수
 * 프로세스를 vruntime 기준으로 CFS 런큐의 레드 블랙 트리에 등록
 * CFS가 다음 프로세스를 레드 블랙 트리에서 선택(pick)하는 과정
 * enqueue_entity()
   ```c
   static void
   enqueue_entity(struct cfs_rq *cfs_rq, struct sched_entity *se, int flags)
   {
     bool renorm = !(flags & ENQUEUE_WAKEUP) || (flags & ENQUEUE_MIGRATED);
     bool curr = cfs_rq->curr == se;
     /* skip */
     update_curr(cfs_rq);
     /* skip */
     account_tntity_enqueue(cfs_rq, se);
     /* skip */
     if (!curr)
       __enqueue_entity(cfs_rq, se);
     se->on_rq = 1;
     /* skip */
   }
   ```
 * __enqueue_entity()
   ```c
   static void __enqueue_entity(struct cfs_rq *cfs_rq, struct sched_entity *se)
   {
     struct rb_node **link = &cfs_rq->tasks_timeline.rb_root.rb_node;
     struct rb_node *parent = NULL;
     struct shced_entity *entry;
     bool leftmost = true;

     while (*link) {
       parent = *link;
       entry = rb_entry(parent, struct sched_entity, run_node);

       if (entity_before(se, entry)) {
         link = &parent->rb_left;
       } else {
         link = &parent->rb_right;
         leftmost = false;
       }
     }

     rb_link_node(&se->run_node, parent, link);
     rb_insert_color_cached(&se->run_node,
                       &cfs_rq->tasks_timeline, leftmost);
   }
   ```
