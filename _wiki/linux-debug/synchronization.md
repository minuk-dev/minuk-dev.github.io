---
layout  : wiki
title   : linux-debug/synchronization
summary : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리/동기화
date    : 2020-11-11 00:07:13 +0900
lastmod : 2020-12-06 20:46:50 +0900
tags    : [linux-debug, synchronization]
draft   : false
parent  : linux-debug
---

### 커널 동기화
 * 주요 개념 : critical section, race condition
 * SMP : symmetric multiprocessing

#### 커널 동기화 기법
 * 스핀락과 뮤텍스

##### 스핀락
 * 구현부가 상대적으로 간단하다
 * 아키텍쳐에 의존적인 코드로 구현
 * 휴면상태로 가지 않고 계속 기다림 (Busy-Wait)
 * spin_lock_irq(), spin_lock_irq_save()
 * spin_lock data structure
   ```c
   typedef struct spinlock {
     union {
       struct raw_spinlock rlock;
     };
   } spinlock_t;
   ```

   ```c
   typedef struct raw_spinlock {
     arch_spinlock_t raw_lock;
   #ifdef CONFIG_DEBUG_SPINLOCK
     unsigned int magic, owner_cpu;
     void *owner;
   #endif
   #ifdef CONFIG_DEBUG_LOCK_ALLOC
     struct lockdep_map dep_map;
   #endif
   } raw_spinlock_t;
   ```

   * 아키텍쳐마다 다른데, x86은 asm-generic의 qspinlock 을 사용한다.
   ```c
   typedef struct qspinlock {
     union {
       atomic_t val;

     /*
   * By using the whole 2nd least significant byte for the
   * pending bit, we can allow better optimization of the lock
   * acquisition for the pending bit holder.
   */
   #ifdef __LITTLE_ENDIAN
       struct {
         u8	locked;
         u8	pending;
       };
       struct {
         u16	locked_pending;
         u16	tail;
       };
   #else
       struct {
         u16	tail;
         u16	locked_pending;
       };
       struct {
         u8	reserved[2];
         u8	pending;
         u8	locked;
       };
   #endif
     };
   } arch_spinlock_t;
   ```

 * 스핀락 사용 예제
   ```c
   static __always_inline void spin_lock(spinlock_t *lock);
   ```
 * 스핀락 획득 과정
   1. 스핀락을 이미 획득했는지 판단 : lock instance의 next와 owner 필드를 확인한다.
   1. 스핀락을 획득한 후 바뀌는 자료구조 : next 값을 1증가 시킨다.
   1. 획득한 스핀락을 해제한 후 바뀌는 자료구조 : owner를 1만큼 증가시킨다.

 * 스핀락 구현부
   * spin_lock()
     ```c
     static __alwyas_inline void spin_lock(spinlock_t *lock)
     {
       raw_spin_lock(&lock->rlock);
     }
     ```
   * raw_spin_lock()
     ```c
     #define raw_spin_lock(lock) _raw_spin_lock(lock)
     ```
   * _raw_spin_lock()
     ```c
     void __lock_func _raw_spin_lock(raw_spinlock_t *lock)
     {
       __raw_spin_lock(lock);
     }
     ```
   * __raw_spin_lock()
     ```c
     static inline void __raw_spin_lock(raw_spinlock_t *lock)
     {
       preempt_disable();
       spin_acquire(&lock->dep_map, 0, 0, _RET_IP_);
       LOCK_CONTENDED(lock< do_raw_spin_trylock, do_raw_spin_lock);
     }
     ```
     * 스핀락을 획득 한 후 preempt_disable() 함수를 호출할 필요가 없다. 내부적으로 호출해준다.

   * do_raw_spin_lock()
     ```c
     static inline void do_raw_spin_lock(raw_spinlock_t *lock) __acquires(lock)
     {
       __acquire(lock);
       arch_spin_lock(&lock->raw_lock);
     }
     ```

   * arch_spin_lock()
     ```c
     #define arch_spin_lock(l)		queued_spin_lock(l)
     /**
      * queued_spin_lock - acquire a queued spinlock
      * @lock: Pointer to queued spinlock structure
      */
     static __always_inline void queued_spin_lock(struct qspinlock *lock)
     {
       u32 val;

       val = atomic_cmpxchg_acquire(&lock->val, 0, _Q_LOCKED_VAL);
       if (likely(val == 0))
         return;
       queued_spin_lock_slowpath(lock, val);
     }
     ```

     ```c
     struct pv_lock_ops pv_lock_ops = {
     #ifdef CONFIG_SMP
       .queued_spin_lock_slowpath = native_queued_spin_lock_slowpath,
       .queued_spin_unlock = PV_CALLEE_SAVE(__native_queued_spin_unlock),
       .wait = paravirt_nop,
       .kick = paravirt_nop,
       .vcpu_is_preempted = PV_CALLEE_SAVE(__native_vcpu_is_preempted),
     #endif /* SMP */
     };
     ```

   * 이후부터는 링크를 참고했다. [LWN.net](https://lwn.net/Articles/561775/)
     * 간단하게 하면 0-1 비트는 4개의 entries로 per-cpu array 안에 들어있는 queue node의 index, 2-16은 cpu number + 1 로 (최대 cpu 개수는 16383)
     * ticket spinlock 보다 빠르며, [[NUMA]] 를 사용하는 여러개의 코어가 존재하는 곳에서 더욱더 적합하다.
     * 추가적인 링크는 [큐 스핀락](https://m.blog.naver.com/PostView.nhn?blogId=jjoommnn&logNo=130141126016&proxyReferer=https:%2F%2Fwww.google.com%2F) 여기를 참고하자.

  * [[assembly]]
  * 흐으으음... 책은 대부분 arm 아키텍쳐와 관련된 내용이 많네 스킵

##### 스핀락 플러그인 함수
 * spin_lock_irq()
 * spin_unlock_irq()
   * 임계 영역에서 스핀락을 걸 때 인터럽트가 발생하지 않으면 좋겠다.
   스핀락을 획득해 다른 모듈이 접근하지 못하는건 좋지만, 임계 영역에서 인터럽트 발생이 문제다.
 * 임계 영역의 코드 구간에서 인터럽트를 비활성화

 * spin_lock_irq()
   ```c
   static __always_inline void spin_lock_irq(spinlock_t *lock)
   {
     raw_spin_lock_irq(&lock->rlock);
   }
   ```
 * raw_spin_lock_irq()
   ```c
   static inline void __raw_spin_lock_irq(raw_spinlock_t *lock)
   {
     local_irq_disable();
     preempt_disable();
     spin_acquire(&lock->dep_map, 0, 0, _RET_IP_);
     LOCK_CONTENDED(lock, do_raw_spin_trylock, do_raw_spin_lock);
   }
   ```
 * __raw_spin_lock()
   ```c
   static inline void __raw_spin_lock(raw_spinlock_t *lock)
   {
     preempt_disable();
     spin_acquire(&lock->dep_map, 0, 0, _RET_IP_);
     LOCK_CONTENDED(lock, do_raw_spin_trylock, do_raw_spin_lock);
   }
   ```
 * local_irq_disable()
   ```c
   #define local_irq_disable() \
     do { raw_local_irq_disable(); trace_hardirqs_off(); } while (0)
   ```
 * raw_local_irq_disable()
   ```c
   #define raw_local_irq_disable() arch_local_irq_disable()
   ```
 * arch_local_irq_disable()
   ```c
   static inline notrace void arch_local_irq_disable(void)
   {
     PVOP_VCALLEE0(pv_irq_ops.irq_disable);
   }
   ```
   * irq_disable is driver specific.
     ```c
     struct irq_chip i8259A_chip = {
       .name		= "XT-PIC",
       .irq_mask	= disable_8259A_irq,
       .irq_disable	= disable_8259A_irq,
       .irq_unmask	= enable_8259A_irq,
       .irq_mask_ack	= mask_and_ack_8259A,
     };
     ```

 * spin_unlock_irq()
   ```c
   static inline void __raw_spin_unlock_irq(raw_spinlock_t *lock)
   {
     spin_release(&lock->dep_map, 1, _RET_IP_);
     do_raw_spin_unlock(lock);
     local_irq_enable();
     preempt_enable();
   }
   ```
 * local_irq_enable()
   ```c
   #define local_irq_enable() \
     do { trace_hardirqs_on(); raw_local_irq_enable(); } while (0)

   #define raw_local_irq_enable() arch_local_irq_enable()
   ```

 * spin_lock_irqsave()/spin_unlock_irqrestore()
   * acquire spinlock, disable interrupt line, return interrupt state.

 * spin_lock_irq_save()
   ```c
   #define spin_lock_irqsave(lock, flags)                  \
     do {                                                  \
       raw_spin_lock_irqsave(spinlock_check(lock), flags); \
     } while (0)
   ```

 * __raw_spin_lock_irqsave()
   ```c
   static inline unsigned long __raw_spin_lock_irqsave(raw_spinlock_t *lock)
   {
     unsigned long lfags;

     local_irq_save(flags);
     preempt_disable();
     spin_acquire(&lock->dep_map, 0, 0, _RET_IP_);

   #ifdef CONFIG_LOCKDEP
     LOCK_CONTENDED(lock, do_raw_spin_trylock, do_raw_spin_lock);
   #else
     do_raw_spin_lock_falgs(lock, &flags);
   #endif
     return flags;
   }
   ```

##### Mutex?
 * mutex data structure
   ```c
   struct mutex {
     atomic_long_t      owner;
     spinlock_t         wait_lock;
   #ifdef CONFIG_MUTEX_SPIN_ON_ONWER
     struct optimistic_spin_queue osq; /* Spinner MCS lock */
   #endif
     struct list_head   wait_list;
   #ifdef CONFIG_DEBUG_MUTEXES
     void               *magic;
   #endif
   #ifdef CONFIG_DEBUG_LOCK_ALLOC
     struct lockdep_map dep_map;
   #endif
   };
   ```
   * owner : 뮤텍스를 획득한 프로세스의 태스크 디스크립터 주소, 이 필드를 보고 잠겼는지 확인
   * wait_list : 뮤텍스를 기다리는 프로세스의 정보

   ```c
   struct mutex_waiter {
     struct list_head      list;
     struct task_struct    *task;
     struct ww_acquire_ctx *ww_ctx;
   #ifdef CONFIG_DEBUG_MUTEXES
     void                  *magic;
   #endif
   }
   ```
   * list : 뮤텍스를 기다리는 잠든 프로세스 리스트
   * task : 뮤텍스를 기다리는 프로세스의 테스크 디스크립터 주소(???)
   * ww_ctx : wait/wound deadlock proof mutex 로 deadlock을 회피하여 뮤텍스 락을 처리하는 알고리즘에 사용

 * fastpath : 뮤텍스를 다른 프로세스가 이미 획득하지 않은 상태때 동작 방식
   * mutex 구조체의 owner 필드 점검
   * owner 가 0x0이니 뮤텍스를 다른 프로세스가 획득하지 않은 상태로 판단
   * 뮤텍스 자료구조인 mutex 구조체의 onwer 필드에 획득한 프로세스의 테스크 디스크립터 저장

   * mutex_lock()
   ```c
   void __sched mutex_lock(struct mutex *lock)
   {
     might_sleep();

     if (!__mutex_trylock_fast(lock))
       __mutex_lock_slowpath(lock);
   }
   EXPORT_SYMBOL(mutex_lock);
   ```

   * __mutex_trylock_fast()
   ```c
   static __always_inline bool __mutex_trylock_fast(struct mutex *lock)
   {
     unsigned long curr = (unsigned long)current;

     if (!atomic_long_cmpxchg_acquire(&lock->owner, 0UL, curr))
       return true;

     return false;
   }
   ```
   * __mutx_unlock_fast()
   ```c
   static __always_inline bool_mutex_unlock_fast(struct mutex *lock)
   {
     unsigned long curr = (unsigned long)current;

     if (atomic_long_cmpxchg_release(&lock->owner, curr, 0UL) == curr)
       return true;

     return false;
   }
   ```
 * slowpath : 뮤텍스를 이미 획득해 휴면 상태에 진입한 후 깨어남
   * __mutex_lock_slowpath()

   ```c
   static noinline void __sched
   __mutex_lock_slowpath(struct mutex *lock)
   {
     __mutex_lock(lock, TASK_UNINTERRUPTIBLE, 0, NULL, _RET_IP_);
   }
   ```

   * __mutex_lock()

   ```c
   static int __sched
   __mutex_lock(struct mutex *lock, long state, unsgiend int subclass,
     struct lockdep_map *nest_lock, unsigned long ip)
   {
     return __mutex_lock_common(lock, state, subclass, nest_lock, ip, NULL, false);
   }
   ```

   * __mutex_lock_common()

   ```c

   static __always_inline int __sched
   __mutex_lock_common(struct mutex *lock, long state, unsgiend int subclass,
     struct lockdep_map *nest_lock, unsigned long ip,
     struct ww_acquire_ctx *ww_ctx, const bool use_ww_ctx)
   {
     struct mutex_waiter waiter;
     bool first = false;
     struct ww_mutex *ww;
     int ret;
     /* skip */
     waiter.task = current;

     set_current_state(state);
     for (;;) {
       /* skip */
       spin_unlock(&lock->wait_lock);
       schedule_preempt_disabled();
       /* skip */
       set_current_state(state);
     }
     spin_lock(&lock->wait_lock);
   acquired:
     __set_current_state(TASK_RUNNING);
     /* skip */
     mutex_remove_waiter(lock, &waiter, current);
     if (likely(list_empty(&lock->wait_list)))
       __mutex_clear_flag(lock, MUTEX_FLAGS);

     debug_mutex_free_waiter(&waiter);
     /* skip */
   }
   ```

   * mutex_unlock()
   ```c
   void __sched mutex_unlock(struct mutex *lock)
   {
   #ifndef CONFIG_DEBUG_LOCK_ALLOC
     if (__mutex_unlock_fast(lock))
       return;
   #endif
     __mutex_unlock_slowpath(lock, _RET_IP_);
   }
   ```

   * __mutex_unlock_slowpath(struct mutex *lock, unsigned long ip)
   ```c
   struct noinline void __sched __mutex_unlock_slowpath(struct mutex *lock, unsgiend long ip)
   {
     struct task_struct *next = NULL;
     DEFINE_WAKE_Q(wake_q);
     unsigned long owner;
     /* skip */
     if (!list_empty(&lock->wait_list)) {
       /* get the first entry from the wait-list */
       struct mutex_waiter *waiter =
         list_first_entry(&lock->wait_list,
           struct mutex_waiter, list);
       next = waiter->task;

       debug_mutex_wake_waiter(lock, waiter);
       wake_q_add(&wake_q, next);
     }
     /* skip */
     wake_up_q(&wake_q);
   }
   ```

---

## 정리
 * 커널 동기화란 1개의 프로세스만 특정 코드 구간을 실행할 때 접근하거나 정해진 순서로 코드 구간을 실행하도록 설계하는 기업
 * 임계 영역은 2개 이상의 프로세스가 동시에 실행하면 동시 접근 문제를 일으킬 수 있는 코드 블록
 * 레이스 컨디션은 임계 영역에 두 개의 프로세스가 동시에 접근하는 상황
 * 레이스 컨디션이 발생하는 요인은 선점 스케줄링, 인터럽트 발생, SMP 시스템에서 2개 이상의 프로세스가 같은 코드를 싱행하는 상황 등
 * 레이스 컨디션 방지를 위해 선점 스케줄링이나 인터럽트 발생을 비활성화하거나 임계 영역에 락을 걸어야한다.
 * 리눅스 커널에서 가장 많이 쓰이는 커널 동기화 기법은 스핀락과 뮤텍스
 * 스핀락 획득을 시도할 때 __raw_tickets 구조체의 next 필드와 owner를 체크. next 와 owner가 동일하다면 스핀락을 획득한 적이 없으니 바로 획득 가능, next 필드가 owner 필드보다 크면 스핀락을 획득하기 전까지 계속 기다린다.
 * 뮤텍스 획득을 시도할 때 mutex 구조체의 owner 필드를 체크한다. owner 필드가 0이면 프로세스는 바로 뮤텍스를 획득. 뮤텍스 획득에 성공했다면 mutex 구조체의 owner에 테스크 디스크립터 주소를 저장한다.
 * 뮤텍스를 해제하는 프로세스는 뮤텍스 대기열을 체크하고 뮤텍스를 기다리며 잠든 프로세스를 깨운다. 이후 깨어난 프로세스는 뮤텍스를 획득한다.
