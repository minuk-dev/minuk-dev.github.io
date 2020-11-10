---
layout  : wiki
title   : linux-debug/synchronization
summary : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리/동기화
date    : 2020-11-11 00:07:13 +0900
lastmod : 2020-11-11 00:07:58 +0900
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
