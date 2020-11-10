---
layout  : wiki
title   : linux-debug/timer
summary : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리
date    : 2020-11-10 23:57:38 +0900
lastmod : 2020-11-10 23:58:24 +0900
tags    : [linux-debug, timer]
draft   : false
parent  : linux-debug
---

### 커널 타이머 관리
 * 주요 개념
   * HZ와 jiffies
   * Soft IRQ 서비스
   * 커널 타이버를 이루는 자료구조
   * 동적 타이머
 * HZ : 1초에 jiffies가 업데이트되는 횟수
 * Soft IRQ의 타이머 서비스
   1. 타이머 인터럽트가 발생하면 TIMER_SOFTIRQ라는 Soft IRQ 서비스를 요청합니다.
   2. Soft IRQ 서비스 루틴에서 TIMER_SOFTIRQ 서비스의 아이디 핸들러인 run_timer_softirq() 함수를 호출한다.
   3. run_timer_softirq() 함수에서는 time_bases라는 전역변수에 등록된 동적 타이머를 처리합니다.
 * 이외의 시간을 처리하는 기법
   * SoC(Sytem on chip)에서 제공하는 틱 디바이스, timekeeping, 고해상도 타이머(High Resolution Timer)

#### jiffies
 * HZ가 너무 크면 시스템에 오버헤드, 너무 작으면 동적 타이머의 오차가 커짐.
 * `out/.config` 에서 `CONFIG_HZ=100` 같은 구문에서 확인 가능하다.
 * jiffies로 시간 흐름을 제어하는 코드 분석
   * mod_timer()
    ```c
    static timer_list dynamic_timer
    int timeout = 0;
    timeout = jiffies;
    timeout += 2 * HZ;

    mod_timer(&dynamic_timer, timeout);
    ```
    ```c
    extern int mod_timer(struct timer_list *timer, unsigned long expires);
    ```
 * jffieis 와 jiffies_64 변수
   * System.map 파일
     ```
     80c03d00 D jiffies
     80c03d00 D jiffies_64
     ```
 * do_timer
   ```c
   void do_timer(unsigned long ticks)
   {
     jiffies_64 += ticks;
     calc_global_load(ticks);
   }
   ```

   ```c
   static void tick_do_update_jiffies64(ktime_t now)
   {
   /* skip */
     if (delta >= tick_period) {
       delta = ktime_sub(delta, tick_period);
       last_jiffies_update = ktime_add(last_jiffies_update,
       /* skip */
       do_timer(++ticks);
   /* skip */
   ```
 * msecs_to_jiffies()
   * 밀리초를 입력으로 받아 jiffies 단위 시각 정보를 반환
     ```c
     static __always_inline unsigned long msecs_to_jiffies(const unsigned int m);
     ```
   * 사용 예제
     ```c
     msecs_to_jiffies(ms);
     ```
   * 구현부
     ```c
     static __always_inline unsigned long msecs_to_jiffies(cosnt unsigned int m)
     {
       if (__builtin_constant_p(m)) {
         if ((int)m < 0)
           return MAX_JIFFY_OFFSET;
         return _msecs_to_jiffies(m);
       } else {
         return __msecs_to_jiffies(m);
       }
     }
     ```

     ```c
     #define MAX_JIFFY_OFFSET ((LONG_MAX >> 1)-1)
     #define LONG_MAX ((long)(~0UL>>1))
     ```

     ```c
     static inline unsigned long _msecs_to_jiffies(const unsigned int m)
     {
       return (m + (MSEC_PER_SEC / HZ) - 1) / (MSEC_PER_SEC / HZ);
     }
     ```
 * time_after(), time_before()
   ```c
   #define time_after(a,b)    \
     (typecheck(unsigned long, a) && \
     typecheck(unsigned long, b) && \
     ((long)((b) - (a)) < 0))
   #define time_before(a,b) time_after(b,a)
   ```

#### 동적 타이머 초기화
 * 기본 흐름
   1. 동적 타이머 초기화 : 동적 타이머 초기화는 보통 드라이 버레벨에서 수행한다. 동적 타이머를 나타내는 timer_list 구조체의 필드 중에서 flags와 function만 바뀐다.
   1. 동적 타이머 등록 : 동적 타이머도 마찬가지로 드라이버 레벨에서 등록된다. 각 드라이버의 시나리오에 따라 동적 타이머의 만료 시간을 1/HZ 단위로 지정한 다음 add_timer() 함수를 호출한다.
   1. 동적 타이머 실행 : 동적 타이머가 지정한 만료 시각이 되면 Soft IRQ 타이머 서비스가 동적 타이머를 실행한다.
 * 동적 타이머 자료구조
   ```c
   struct timer_list {
     struct hlist_node    entry;
     unsigned long        expries;
     void                 (*function)(struct timer_list *);
     u32                  flags;

   #ifdef CONFIG_LOCKDEP
     struct lockdep_map   lockdep_map;
   #endif
   };
   ```
   * entry : 해시 연결리스트, timer_bases 전역변수 에동적 타이머를 등록할 때 쓰인다.
   * expires : 동적 타이머 만료시각을 나타낸다. 이 시각에 커널 타이머가 동적 타이머의 핸들러 함수를 호출한다. 이때 단위는 1/HZ
   * function : 동적 타이머 핸들러 함수의 주소를 저장하는 필드. call_tiemr_fn() 함수에 서이 필드에 접근해 동적 타이머 핸들러를 호출한다.
   * flags : 동적 타이머의 설정 필드이며  다음 값 중 하나로 설정된다.
     ```c
     #define TIMER_CPUMASK      0x0003FFFF
     #define TIMER_MIGRATING    0x00040000
     #define TIMER_BASEMASK     (TIMER_CPUMASK | TIMER_MIGRATING)
     #define TIMER_DEFERRABLE   0x00080000
     #define TIMER_PINNED       0x00100000
     #define TIMER_IRQSAFE      0x00200000
     #define TIMER_ARRAYSHIFT   22
     #define TIMER_ARRAYMASK    0xFFC00000
     ```

 * 동적 타이머 초기화 함수
   * timer_setup()
     ```c
     void timer_setup(struct timer_list *timer, void *func, unsigned int flags);
     ```
     * timer : 동적 타이머를 나타내는 정보
     * func : 동적 타이머 핸들러 함수
     * flags : 동적 타이머 플레그
     * 커널 4.14 버전까지 동적 타이머를 초기화하려면 setup_timer() 함수나 init_timer() 함수를 써야됬다.

     ```c
     #define timer_setup(timer, callback, flags)       \
         __init_timer((timer), (callback), (flags))

     #define __init_timer(_timer, _fn, _flags) \
       init_timer_key((_timer), (_fn), (_flags), NULL, NULL)
     ```

     ```c
     void init_timer_key(struct timer_list *timer,
                   void (*func)(struct timer_list *), unsigned int flags,
                   const char *name, struct lock_class_key *key)
     {
       debug_init(timer);
       do_init_timer(timer, func, flags, name, key);
     }
     ```

     ```c
     static inline void debug_init(struct timer_list *timer)
     {
       debug_timer_init(timer);
       trace_timer_init(timer);
     }
     ```

     ```c
     static void do_init_timer(struct timer_list *timer,
                     void (*func)(struct timer_list *),
                     unsigned int flags,
                     const char *name, struct lock_class_key *key)
     {
       timer->entry.pprev = NULL;
       timer->function = func;
       timer->flags = flags | raw_smp_processor_id();
       lockdep_init_map(&timer->lockdep_map, name, key, 0);
     }
     ```
#### 동적타이머 등록
 * 동적 타이머 등록 함수
   * add_timer : 동적타이머를 등록하기 위한 인터페이스
     ```c
     void add_timer(struct timer_list *timer)
     {
       BUG_ON(timer_pending(timer));
       mod_timer(timer, timer->expires);
     }
     ```

   * mod_timer
     ```c
     int mod_timer(struct timer_list *timer, unsigned long expires)
     {
       return __mod_timer(timer, expires, false);
     }
     ```

   * __mod_timer : 실제로 동적타이머를 등록하는 함수
     ```c
     static inline int
     __mod_timer(struct timer_list *timer, unsigned long expires, unsigned int options)
     {
       struct timer_base *base, *new_base;
       unsigned int idx = UINT_MAX;
       unsigned long clk = 0, flags;
       int ret = 0;

       BUG_ON(!timer->function);

       if (timer_pending(timer)) {
         long diff = timer->expires - expires;

         if (!diff)
           return 1;
         if (options & MOD_TIMER_REDUCE && diff <= 0)
           return 1;
         base = lock_timer_base(timer, &flgas);
         forward_timer_base(base);

         if (timer_pending(timer) && (options & MOD_TIMER_REDUCE) &&
           time_before_eq(timer->expires, expires)) {
           return = 1;
           goto out_unlock;
         }

         clk = base->clk;
         idx = calc_wheel_index(expires, clk);
         /* skip */
       } else {
         base = lock_timer_base(timer, &flags);
         forward_timer_base(base);
       }

       ret = detach_if_pending(timer, base, false);
       /* skip */
       debug_active(timer, expires);

       timer->expires = expires;

       if (idx != UINT_MAX && clk == base->clk) {
         enqueue_timer(base, timer, idx);
         trigger_dyntick_cpu(base, timer);
       } else {
         internal_add_timer(base, timer);
       }

     out_unlock:
       raw_spin_unlock_irqrestore(&base->lock, flags);

       return ret;
     }
     ```
     * 반복해서 동적 타이머를 등록하면 1을 반환하며 실행을 종료
     * 동적 타이머는 timer_base 타이머 해시 벡터에 등록함

  * timer_pending() : 동적 타이머가 등록됬는지 확인하는 함수
    ```c
    static inline int timer_pending(const struct timer_list * timer)
    {
      return timer->entry.pprev != NULL;
    }
    ```
    * 이미 동적 타이머를 등록했을 때 1을 반환
    * timer->entry.pprev 포인터는 percpu 타입의 timer_base 변수의 벡터 해시 테이블의 주소를 가리킨다.

  * lock_timer_base()
    ```c
    static struct timer_base *lock_timer_base(struct timer_list *timer,
                                          unsigned long *flags)
        __acquires(timer->base->lock)
    {
      for (;;) {
        /* skip */
        if (!(tf & TIMER_MIGRATING)) {
          base = get_timer_base(tf);
          /* skip */
    ```

  * get_timer_base() : 타이머가 기준으로 하는 timer_bases 전역변수를 읽는다.
    ```c
    static inline struct timer_base *get_timer_base(u32 tflags)
    {
      return get_timer_cpu_base(tflags, tflags & TIMER_CPUMASK);
    }
    ```
  * get_timer_cpu_base()
    ```c
    static inline struct timer_base *get_timer_cpu_base(u32 flags, u32 cpu)
    {
      struct timer_base *base = per_cpu_ptr(&timer_bases[BASE_STD], cpu);
      /* skip */
      return base;
    }
    ```

  * forward_timer_base() : timer_base의 clk 필드를 현재 시각으로 바꾼다.
    ```c
    static inline void forward_timer_base(struct timer_base *base)
    {
    #ifdef CONFIG_NO_HZ_COMMON
      unsigned long jnow;
      /* skip */
      jnow = READ_ONCE(jiffies);
      /* skip */
      if (time_after(base->next_expiry, jnow))
        back->clk = jnow;
      else
        base->clk = base->next_expiry;
    #endif
    }
    ```

   * enqueue_timer()
     ```c
     static void enqueue_timer(struct timer_bae *base, struct timer_list *timer,
                         unsigned int idx)
     {
       hlist_add_head(&timer->entry, base->vectors + idx);
       __set_bit(idx, base->pending_map);
       timer_set_idx(timer, idx);
     }
     ```
     * base : percpu 타입의 timer_bases 전역변수에서 현재 구동중인 CPU에 해당하는 오프셋을 적용한 주소
     * timer : 등록하려는 동적 타이머의 속성 정보

#### 동적타이머 실행
 1. TIMER_SOFTIRQ 아이디로 Soft IRQ 서비스 요청
 1. Soft IRQ 컨텍스트 시작
 1. Soft IRQ 서비스 요청 점검
 1. 등록된 동적 타이머 실행

 * update_process_times()
   ```c
   void update_process_times(int user_tick)
   {
     struct task_struct *p = current;

     account_process_tick(p, user_tick);
     run_local_timers();
     /* skip */
   }
   ```
 * run_local_timers()
   ```c
   void run_local_timers(void)
   {
     struct timer_base *base = this_cpu_ptr(&timer_bases[BASE_STD]);

     hrtimer_run_queues();

     if (time_before(jiffies, base->clk)) {
       if (!IS_ENABLED(CONFIG_NO_HZ_COMMON))
         return;
       /* CPU is awake, so check the deferrable base. */
       base++;
       if (timer_before(jiffies, base->clk))
         return;
     }
     raise_softirq(TIMER_SOFTIRQ);
   }
   ```
   * 지연 타이머는 deferrable 전용 타이머 베이스를 사용한다.
   * 타이머 인터럽트가 발생 -> 만료될 동적 타이머가 있는지 점검 -> 있다면 TIMER_SOFTIRQ라는 서비스로 Soft IRQ 서비스 요청

 * __do_softirq()
   ```c
   asmlinkage __visible void __softirq_entry(void)
   {
     unsigned long end = jiffies + MAX_SOFTIRQ_TIME;
     unsigned long old_flags = current->flags;
     struct softirq_action *h;
     /* skip */
   restart:
     set_softirq_pending(0);

     local_irq_enable();

     h = softirq_vec;
     while ((softirq_bit = ffs(pending))) {
       unsigned int vec_nr;
       int prev_count;

       h += softirq_bit - 1;

       vec_nr = h - softirq_vec;
       prev_count = preempt_count();

       kstat_incr_softirqs_this_cpu(vec_nr);

       trace_softirq_entry(vec_nr);
       h->action(h);
     /* skip */
     }
   }
   ```

 * run_timer_softirq()
   * TIMER_SOFTIRQ 의 handler 는 run_timer_softirq 임
   ```c
   static __latent_entropy void run_timer_softirq(struct softirq_action *h)
   {
     struct timer_base *base = this_cpu_ptr(&timer_bases[BASE_STD]);
     base->must_forward_clk = false;

     __run_timers9base);
     if (IS_ENABLED(CONFIG_NO_HZ_COMMON))
       __run_timers(this_cpu_ptr(&timer_bases[BASE_DEF]));
   }
   ```
 * __run_timers()
   ```c
   static inline void __run_timers(struct timer_base *base)
   {
     struct hlist_head heads[LVLDEPTH];
     int levels;

     if (!timer_after_eq(jiffies, base->clk))
       return;

     raw_spin_lock_irq(&base->lock);

     while (time_after_eq(jiffies, base->clk)) {

       levels = collect_expired_timers(base, heads);
       base->clk++;

       while (levels--)
         expire_timers(base, heads + levels);
     }
     base->running_timer = NULL;
     raw_spin_unlock_irq(&base->lock);
   }
   ```

 * __collect_expired_timers()
   ```c
   static int collect_expired_timers(struct timer_base *base,
                                  struct hlist_head *heads)
   {
   /* skip */
     return __collect_expired_timers(base, heads);
   }
   ```

   ```c
   static int __colect_expired_timers(struct timer_base *base,
                                  struct hlist_head *heads)
   {
     unsigned long clk = base->clk;
     struct hlist_head *vec;
     int i, levels = 0;
     unsigned int idx;

     for (i = 0; i < LVL_DEPTH; i ++) {
       idx = (clk & LVL_MASK) + i * LVL_SIZE;

       if (__test_and_clear_bit(idx, base->pending_map)) {
         vec = base->vectors + idx;
         hlist_move_list(vec, heads++);
         levels++;
       }
     }
     /* skip */
     return levels;
   }
   ```

 * expire_timers()
   ```c
   static void expire_timers(struct timer_base *base, struct hlist_head *head)
   {
     while (!hlist_empty(head)) {
       struct timer_list *timer;
       void (*fn)(struct tiemr_list *);

       timer = hlist_entry(head->first, struct timer_list, entry);

       base->running_timer = timer;
       detach_timer(timer, true);

       fn = timer->function;

       if (timer->flags & TIMER_IRQSAFE) {
         raw_spin_unlock(&base->lock);
         call_timer_fn(timer, fn);
         raw_spin_lock(&base->lock);
       } else {
         raw_spin_unlock_irq(&base->lock);
         call_timer_fn(timer, fn);
         raw_spin_lock_irq(&base->lock);
       }
     }
   }
   ```
   * list에서 timer를 꺼낸후, running_timer 로 만들어 놓고, list 에서 detach 시킨다.
   * 그 뒤 fn 에다가 timer callback 을 넣어주고, TIMER_IRQSAFE(TIMER 가 irq disabled 이고 irq handler 가 실행 중인걸 기다려야되는지)인지 확인하고, 그에 따라 lock 걸고 timer를 실행한다.

 * call_timer_fn()
   ```c
   static void call_timer_fn(struct timer_list *timer, void (*fn)(unsigned long),
                        unsigned long data)
   {
     int count = preempt_count();
     /* skip */
     trace_timer_expire_entry(timer);
     fn(data);
     trace_timer_expire_exit(timer);
     /* skip */
   }
   ```
##### 커널 타이머 정리
 1. 동적 타이머 등록 : mod_timer
 1. TIMER_SOFTIRQ 서비스 요청
 1. Soft IRQ 서비스 실행
 1. 동적 타이머 만료 후 타이머 핸들러 실행

---
 * HZ : 진동수, 1초에 jiffies 가 업데이트 되는 횟수
 * TIMER_SOFTIRQ 로 Soft IRQ 서비스를 요청
 * msecs_to_jiffies 를 통해서 밀리초 입력을 jiffies 로 시각 정보를 반환
 * 내부 시간 비교는 time_after() 와 time_before() 를 사용
 * 동적타이머 등록 함수 : add_timer(), mod_timer()
 * Soft IRQ 컨텍스트에서 처리되므로 실행 시간이 빨라야한다.
 * ftrace 에서 동적 타이머 추적 가능 이벤트
   * timer_init, timer_start, timer_expire_entry, timer_expire_exit, timer_cancel

