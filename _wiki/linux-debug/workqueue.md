---
layout  : wiki
title   : linux-debug/workqueue
summary : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리
date    : 2020-11-10 23:56:55 +0900
lastmod : 2020-11-10 23:57:26 +0900
tags    : [linux-debug, workqueue]
draft   : false
parent  : linux-debug
---

### 워크큐
 * 주요 키워드 : 워크, 워커스레드, 워커 풀, 풀워크큐
 * 워크 : 워크큐를 실행하는 단위
   * 실행 처리 흐름
     1. 워크 큐잉(schedule_work), insert_work)
     2. 워크 스레드 깨움(wake_up_worker)
     3. 워크 스레드 실행(process_one_work)

   * 커널 후반부를 처리하는 단위, 워 크핸들러 실행 도중 휴면 상태에 진입할 숫 있다.
   * 워크는 워커 스레드가 실행한다.
 * 워크 스레드
   * 워커 스레드의 이름은 "kworker/" 로 시작하며, 워크큐의 종류에 다라 "kworker/" 다음에 번호를 부여한다.
   * 워커 스레드 핸들러 함수는 worker_thread() 함수다.
 * 워커 풀
   * 큐잉한 워크 리스트를 관리
   * 워커 스레드를 생성하면서 관리
   ```c
   struct worker_pool {
     spinlock_t lock;
     int cpu;
     /* skip */
     struct list_head worklist;
     int nr_workers;
     /* skip */
     struct list_head workers;
   }
   ```
 * 풀워크큐
   * 워커 풀을 통해 워크와 워커 스레드를 관리한다.

#### 워크큐의 특징
 * 워커 스레드가 워커를 실행할 때는 언제든 휴면이 가능한다. 따라서 스케쥴링을 지원하는 모든 커널 함수를 쓸 수 있다.
 * 실행 시각에 민감한 후반부를 처리하는 용도로 워크큐의 워크를 사용하는 것은 적합하지 않다. 시스템 부하에 따라 워크 핸들러의 실행 시각 시간이 달라질 수 있다.
 * 드라이브 레벨에 서워크는 쓰기 쉽다. 워크는 work_struct 구조체 변수만 설정, 워크를 실행할 코드에 queue_work() 혹은 schedule_work() 함수만 추가하면 된다.
 * 워크큐를 쓰면 드라이버를 조금 더 유연하게 설계 가능하다. 또한 딜레이 워크(struct delayed_work)를 제공하며, 이를 사용해 jiffies(1/HZ) 단위로 워크를 특정 시각 이후로 지연시킨 후 실행 가능

#### 워크큐와 다른 인터럽트 후반부 기법과의 비교
 * vs IRQ 스레드 방식
   * 스레드의 우선순위 : IRQ 스레드는 우선순위를 높여서 처리 가능
 * vs Soft IRQ 방식과의 비교
   * Soft IRQ는 인터럽트 발생 빈도가 높고 후반부를 빨리 처리해야하는 상황에서 사용
   * 워크큐는 Soft IRQ에 비해 처리 속도가 느리다.

#### 워크큐 설계
 * 인터럽트 핸들러로 빨리 처리해야 할 코드를 수행한 후 워크를 워크큐에 큐잉한다.
 * 인터럽트 후반부로 처리해야 할 코드를 워크 핸들러에서 처리한다.

#### 워크큐의 종류
##### alloc_workqueue()

```c
#define alloc_workqueue(fmt, flags, max_active, args...) \
  __alloc_workqueue_key((fmt), (flags), (max_active), \
    NULL, NULL, ##args)
```
 * fmt : 워크큐의 이름을 지정하며, workqueue_struct 구조체의 name 필드에 저장된다.
 * flags : 워크큐의 속성 정보 저장, workqueue_struct 구조체의 flags 필드에 저장.

   ```c
   enum {
     WQ_UNBOUND = 1 << 1,
     WQ_FREEZABLE = 1 << 2,
     WQ_MEM_RECLAIM = 1 << 3,
     WQ_HIGHPRI = 1 << 4,
     WQ_CPU_INTENSIVE = 1 << 5,
     WQ_SYSFS = 1 << 6,
     WQ_POWER_EFFICIENT = 1 << 7,
     /* skip */
   }
   ```
 * max_active : workqueue_struct 구조체의 saved_max_active에 저장
 * workqueue_init_early 함수에서 호출됨.

##### 7가지 워크큐

```c
int __init workqueue_init_early(void)
{
  int std_nice[NR_STD_WORKER_POOLS] = { 0, HIGHPRI_NICE_LEVEL };
  int i, cpu;
  /* skip */
  system_wq = alloc_workqueue("events", 0, 0);
  system_highpri_wq = alloc_workqueue("events_highpri", WQ_HIGHPRI, 0);
  system_long_wq = alloc_workqueue("events_long", 0, 0);
  system_unbound_wq = alloc_workqueue("evnets_unbound", WQ_UNBOUND,
                        WQ_UNBOUND_MAX_ACTIVE);
  system_freezable_wq = alloc_workqueue("events_power_efficient",
                        WQ_FREEZABLE, 0);
  system_power_efficient_wq = alloc_workqueue("events_power_efficient",
                        WQ_POWER_EFFICIENT, 0);
  system_freezable_power_efficient_wq =
    alloc_workqueue("events_freezable_power_efficient",
                        WQ_FREEZABLE | WQ_POWER_EFFICIENT,
                        0);

  BUG_ON(!system_wq || !system_highpri_wq || !system_long_wq ||
        !system_unbound_wq || !system_freezable_sq ||
        !system_power_efficient_wq ||
        !system_freezable_power_efficient_wq);
}
```
 * 7가지 워크큐 생성
 * 워크큐가 제대로 생성됐는지 점검
 * system_wq : 시스템 워크큐
 * system_highpri_wq : 시스템 워크큐에서 쓰는 워커 스레드 보다 우선순위가 높은 워커 스레드를 처리하는 큐
 * system_long_wq : 오래걸리는 작업 때 사용
 * system_unbound_wq : percpu 타입의 워커를 쓰지 않고 wq->numa_pwq_tbl[node]에 지정된 워커 풀을 쓴다. 시스템 워크큐보다 빨리 실행된다.
 * system_freezable_wq : freezable 유저 프로세스나 커널 쓰레드를 처리할때 사용. (freeze_wokques_begin() 함수에서 실행)
   * 프로세스를 얼릴때는 __frefrigerator 함수를 호출
 * system_power_efficient_wq, system_freezable_power_efficient_wq : 절전 목적으로 사용하는 워크큐

##### 워크
 * 워크큐를 실행하는 기본 단위

 ```c
 struct work_struct {
   atomic_long_t data;
   struct list_head entry;
   work_func_t func;
   #ifdef CONFIG_LOCKDEP
   struct lockdep_map lockdep_map;
   #endif
 };
 ```
   * data : 워크 실행상태를 나타낸다.
     * 워크 초기화 : 0xFFFFFFE0
     * 워크를 워크큐에 큐잉 : WORK_STRUCT_PENDING_BIT(0x1)
   * entry : 연결 리스트, worker_pool 구조체 중 연결 리스트 worklist에 등록된다.
   * func : 워크 핸들러 함수의 주소를 저장

 * 초기화 방법 : INIT_WORK, DECLARE_WORK
   * INIT_WORK : 커널이 INIT_WORK 함수를 실행할 때 워크를 초기화

      ```c
      INIT_WORK(&work, callback);
      ```

      ```c
      #define INIT_WORK(_work, _func)                              \
            __INIT_WORK((_work), (_func), 0)

      #define __INIT_WORK(_work, _func, _onstack)                  \
        do {                                                    \
              __init_work((_work), _onstack);                   \
              (_work)->data = (atomic_long_t) WORK_DATA_INIT(); \
              INIT_LIST_HEAD(&(_work)->entry);                  \
              (_work)->func = (_func);                          \
        } while(0)

      #define WORK_DATA_INIT() ATOMIC_LONG_INIT(WORKSTRUCT_NO_POOL)
      ```
      * 6번째 줄의 __init_work 함수는 CONFIG_DEBUG_OBJECTS 커널 컨피그가 활성화돼 있어야 실행, 대부분 비활성
   * DECLARE_WORK : 커널이 컴파일될 때 워크 세부 정보가 포함된 전역 변수 생성

      ```c
      static DECLARE_WORK(work, callback);
      ```

      ```c
      #define DECLARE_WORK(n, f)                                    \
            struct work_struct n = __WORK_INITIALIZER(n, f)

      #define __WORK_INITIALIZER(n, f) {                            \
        .data = WORK_DATA_STATIC_INIT(),                            \
        .entry = { &(n).entry, &(n).entry },                        \
        .func = (f),                                                \
        __WORK_INIT_LOCKDEP_MAP(#n, &(n))                           \
      }

      #define WORK_DATA_STATIC_INIT()                               \
            ATOMIC_LONG_INIT((unsigned long)(WORK_STRUCT_NO_POOL | WORK_STRUCT_STATIC))
      ```

##### 워크 큐잉
 * schedule_work(), queue_work_on(), __queue_work(), insert_work(), wake_up_worker()
 * interface
   * schedule_work()
     * 시스템 워크큐에 큐잉
     * 호출 구조 : schedule_work() -> queue_work() -> queue_work_on() -> __queue_work()
     ```c
     schedule_work(&work);
     ```

     ```c
     static inline bool schedule_work(struct work_struct *work)
     {
        return queue_work(system_wq, work);
     }
     ```

     ```c
     struct workqueue_struct *system_wq __read_mostly;
     EXPORT_SYMBOL(system_wq);
     ```

     * queue_work()

     ```c
     static inline bool queue_work(struct workqueue_struct *wq,
                  struct work_struct *work)
     {
       return queue_work_on(WORK_CPU_UNBOUND, wq, work);
     }
     ```

     * queue_work_on()

     ```c
     bool queue_work_on(int cpu, struct workqueue_struct *wq,
        struct work_struct *work)
     {
       bool ret = false;
       unsigned long flags;

       local_irq_save(flags);

       if (!test_and_set_bit(WORK_STRUCT_PENDING_BIT, work_data_bits(work))) {
         __queue_work(cpu, wq, work);
         ret = true;
       }

       local_irq_restore(flags);
       return ret;
     }
     ```

     * __queue_work()

     ```c
     static void __queue_work(int cpu, struct workqueue_struct *wq,
                struct work_struct *work);
     ```
     * queue_work_on 이 호출할 때, 인자
       * cpu : WORK_CPU_UNBOUND
       * wq : system_wq
       * work : work_struct 구조체의 주소

     ```c
     static void __queue_work(int cpu, struct workqueue_struct *wq,
                struct work_struct *work)
     {
       struct pool_workqueue *pwq;
       struct worker_pool *last_pool;
       struct list_head *worklist;
       unsigned int work_flags;
       unsigned int req_cpu = cpu;
       /* skip */
     retry:
       if (req_cpu == WORK_CPU_UNBOUND)
         cpu = wq_select_unbound_cpu(raw_smp_processor_id());
       /* pwq which will be used unless @work is executing elsewhere */
       if (!(wq->flags & WQ_UNBOUND))
         pwd = per_cpu_ptr(wq->cpu_pwqs, cpu);
       else
         pwd = unbound_pwq_by_node(wq, cpu_to_node(cpu));

       last_pool = get_work_pool(work);
       if (last_pool && last_pool != pwq->pool) {
         struct worker *worker;

         spin_lock(&last_pool->lock);

         worker = find_worker_executing_work(last_pool, work);

         if (worker && worker->current_pwq->wq == wq) {
           pwd = worker->current_pwq;
         } else {
           /* meh... not running there, queue her */
           spin_unlock(&last_pool->lock);
           spin_lock(&pwd->pool->lock);
         }
       } else {
         spin_lock(&pwq->pool->lock);
       }
       /* skip */
       /* pwq determined, queue */
       trace_workqueue_queue_work(req_cpu, pwq, work);
       /* skip */
       if (likely(pwq->nr_active < pwq->max_active)) {
         trace_workqueue_activate_work(work);
         pwq->nr_active++;
         worklist = &pwq->pool->worklist;
         if (list_empty(worklist))
           pwq->pool->watchdog_ts = jiffies;
       } else {
         work_flags |= WORK_STRUCT_DELAYED;
         worklist = &pwq->delayed_works;
       }

       insert_work(pwq, work, worklist, work_flags);
       /* skip */
     }
     ```
       * 풀워크큐 가져오기
       * 워커 구조체 가져오기
       * ftrace 로그 출력
       * 워커 풀에 워크의 연결리스트를 등록하고 워커 스레드 깨우기
   * get_work_pool()

     ```c
     static struct worker_pool *get_work_pool(struct work_struct *work)
     {
       unsigned long data = atomic_long_read(&work->data);
       int pool_id;

       assert_rcu_or_pool_mutex();

       if (data & WORK_STRUCT_PWQ)
         return ((struct pool_workqueue *)
           (data & WORK_STRUCT_WQ_DATA_MASK))->pool;

       pool_id = data >> WORK_OFFQ_POOL_SHIFT;
       if (pool_id == WORK_OFFQ_POOL_NONE)
         return NULL;

       return idr_find(&worker_pool_idr, pool_id);
     }
     ```
   * insert_work()

     ```c
     static void insert_work(struct pool_workqueue *pwq, struct work_struct *work,
                          struct list_head *head, unsigned int extra_flags)
     {
       struct worker_pool *pool = pwq->pool;

       set_work_pwq(work, pwq, extra_flags);
       list_add_tail(&work->entry, head);
       get_pwq(pwq);

       smp_mb();

       if (__need_more_worker(pool))
         wake_up_worker(pool);
     }
     ```
   * wake_up_worker()

     ```c
     static void wake_up_worker(struct worker_pool *pool)
     {
       struct worker *worker = first_idle_worker(pool);

       if (likely(worker))
         wake_up_process(worker->task);
     }
     ```
   * find_worker_executing_work()

    ```c
    static struct worker *find_worker_executing_work(struct worker_pool *pool,
                                                    struct work_struct *work)
    {
      struct worker *worker;

      hash_for_each_possible(pool->busy_hash, worker, hentry,
                          (unsigned long)work)
        if (worker->current_work == work &&
              worker->current_func == work->func)
          return worker;

      return NULL;
    }
    ```

##### 워크의 실행 주체
 * 워커 스레드, 워크를 워크큐에 큐잉하면 워커 스레드를 깨운다.
 * worker_thread()

   ```c
   static int worker_thread(void *__worker)
   {
     struct worker *worker = __worker;
     struct worker_pool *pool = worker->pool;

     /* skip */
     do {
       struct work_struct *work =
         list_first_entry(&pool->worklist,
           struct work_struct, entry);

       pool->watchdog_ts = jiffies;

       if (likely(!(*work_data_bits(work) & WORK_STRUCT_LINKED))) {
         /* optimization path, not strictly necessary */
         process_one_work(worker, work);
         if (unlikely(!list_empty(&worker->scheduled)))
           process_scheduled_works(worker);
       } else {
         move_linked_works(work, &worker->scheduled, NULL);
         process_scheduled_works(worker);
       }
     } while (keep_working(pool));
   }
   ```
   * keep_working() : 이미 큐잉된 워크가 있으면 true를 반환하는 역할

     ```c
     static bool keep_working(struct worker_pool *pool)
     {
       return !list_empty(&pool->worklist) &&
         atomic_read(&pool->nr_running) <= 1;
     }
     ```
   * 워커 풀에 워크가 큐잉됐는지 체크한다.
   * 워커 풀에 큐잉된 워크의 연결 리스트를 가져와 워크 구조체를 알아낸다.
   * process_one_work() 함수를 호출해 워크를 실행한다.
 * process_one_work()

   ```c
   static void process_one_work(struct worker *worker. struct work_struct *work)
   __releases(&pool->lock)
   __acquires(&pool->lock)
   {
     struct pool_workqueue *pwq = get_work_pwq(work);
     struct worker_pool *pool = worker->pool;
     bool cpu_intensive = pwq->wq->flags & WQ_CPU_INTENSIVE;
     int work_color;
     struct worker *collision;
     /* skip */
     collision = find_worker_executing_work(pool, work);
     if (unlikely(collision)) {
       move_linked_works(work, &collision->scheduled, NULL);
       return;
     }

     /* claim and dequeue */
     debug_work_deactivate(work);
     hash_add(pool->busy_hash, &worker->hentry, (unsgined long)work);
     worker->current_work = work;
     worker->current_func = work->func;
     worker->current_pwq = pwq;
     work_color = get_work_color(work);
     /* skip */

     list_del_init(&work->entry);
     /* skip */

     set_work_pool_and_clear_pending(work, pool->id);
     /* skip */

     trace_workqueue_execute_start(work);
     worker->current_func(work);
     trace_workqueue_execute_end(work);
     /* skip */
     if (unlikely(in_atomic() || lockdep_depth(current) > 0) {
       pr_err("BUG: workqueue leaked lock or atomic: %s/0x%08x/%d\n"
         "last function: %pf\n",
         current->comm, prempt_count(), task_pid_nr(current),
         worker->current_func);
         debug_show_held_locks(current);
         dump_stack();
     }
   }
   ```
     * 워크 전처리 : 하나의 워크를 여러 워커에서 실행하지 않도록 관리
     * 워크 핸들러 실행

---
##### 워커 스레드
 * 워커 스레드의 흐름
   1. 워커 스레드 생성 : create_worker() 함수를 호출하면 워커 스레드를 생성.
   1. 휴면 상태 : 휴면 상태에서 다른 드라이버가 자신을 깨워주기를 기다림.
   1. 실행 : 워크를 워크큐에 큐잉한 후 워커 스레드가 깨어나면 스레드 핸들러인 worker_thread() 함수가 실행
   1. 소멸 : 워커 스레드가 필요 없으면 소멸.

 * worker 구조체

   ```c
   struct worker {
     union {
       struct list_head      entry;
       struct hlist_node     hentry;
     };
     struct work_struct      *current;
     work_func_t             current_func;
     struct pool_workqueue   *current_pwq;
     bool                    desc_valid;
     struct list_head        scheduled;

     struct task_struct      *task;
     struct worker_pool      *pool;

     struct list_head        node;
     unsigned long           last_active;
     unsigned int            flags;
     int                     id;

     char                    desc[WORKER_DESC_LEN];

     struct workqueue_struct *rescue_wq;
   }
   ```
   * current_work : work_struct 구조체로, 현재 실행하려는 워크를 저장하는 필드
   * current_func : 실행하려는 워크 핸들러의 주소를 저장하는 필드

 * 워커는 워커 스레드를 표현하는 자료구조이며, worker 구조체

##### 워커 스레드의 생성 시기
 * 기본적으로 부팅과정에서 워크큐 자료구조를 초기화할 때 워커 스레드를 생성.
 * 만약 워크큐에 많이 큐잉될 상황이 예측될 때, create_worker() 함수를 호출해 워커 스레드를 생성 가능
 * 부팅 과정에서 워커 스레드 생성되는 로직

   ```c
   int __init workqueue_init(void)
   {
     struct workqueue_struct *wq;
     struct worker_pool *pool;
     int cpu, bkt;

     wq_numa_init();

     mutex_lock(&wq_pool_mutex);

     /* skip */
     /* create the initial workers */
     for_each_online_cpu(cpu) {
       for_each_cpu_worker_pool(pool, cpu) {
         pool->flags &= ~POOL_DISASSOCIATED;
         BUG_ON(!create_worker(pool));
       }
     }
   }
   ```
 * create_worker()
   * 워커 풀의 아이디 읽어오기
   * 워커 스레드의 이름을 지정해 워커 스레드 생성 요청
   * 워커 풀에 워커 스레드를 등록
   * 워커 정보를 갱신하고 생성된 워커 스레드를 깨우기

   ```c
   static struct owrker *create_worker(struct worker_pool *pool)
   {
     struct worker *worker = NULL;
     int id = -1;
     char id_buf[16];

     id = ida_simple_get(&pool->worker_da, 0, 0, GFP_KERNEL);
     if (id < 0)
       goto fail;

     if (!worker)
       goto fail;

     worker->pool = pool;
     worker->id = id;

     if (pool->cpu >= 0)
       snprintf(id_buf, sizeof(id_buf), "%d:%d%s", pool->cpu, id,
         pool->attrs->nice < 0 ? "H" : "");
     else
       snprintf(id_buf, sizeof(id_buf), "u%d:%d", pool->id, id);

     worker->task = kthread_create_on_node(worker_thread, worker, pool->node,
                                       "kworker/%s", id_buf);
     if (IS_ERR(worker->task))
       goto fail;

     set_user_nice(worker->task, pool->attrs->nice);
     kthread_bind_mask(worker->task, pool->attrs->cpumask);

     /* successful, attach the worker to the pool */
     worker_attach_to_pool(worker, pool);

     /* start the newly created worker */
     spin_lock_irq(&pool->lock);
     worker->pool->nr_workers++;
     worker_enter_idle(worker);
     wake_up_process(worker->task);
     spin_unlock_irq(&pool->lock);

     return worker;

   fail:
     if (id >= 0)
       ida_simple_remove(&pool->worker_ida, id);
     kfree(worker);
     return NULL;
   }
   ```
   * worker_attach_to_pool()

     ```c
     static void worker_attach_to_pool(struct worker *worker,
                                    struct worker_pool *pool)
     {
       mutex_lock(&pool->attach_mutex);

       set_cpus_allowed_ptr(worker->task, pool->attrs->cpumask);
       if (pool->flags & POOL_DISASSOCIATED)
         worker->flags |= WORKER_UNBOUND;

       list_add_tail(&worker->node, &pool->workers);

       mutex_unlock(&pool->attach_mutex);
     }
     ```
   * worker_enter_idle()

     ```c
     static void worker_enter_idle(struct worker *worker)
     {
       struct worker_pool *pool = worker->pool;

       if (WARN_ON_ONCE(worker->flags & WORKER_IDLE) ||
         WARN_ON_ONCE(!list_empty(&worker->entry) &&
                     (worker->hentry.next || worker->hentry.pprev)))
         return;
       worker->flags |= WORKER_IDLE;
       pool->nr_idle++;
       worker->last_active = jiffies;

       list_add(&worker->entry, &pool->idle_list);

       if (too_many_workers(pool) && !timer_pending(&pool->idle_time))
         mod_timer(&pool->idle_timer, jiffies + IDLE_WORKER_TIMEOUT);

       WARN_ON_ONCE(!(pool->flags * POOL_DISASSOCIATED) &&
                      pool->nr_workers == pool->nr_idle &&
                      atomic_read(&pool->nr_running));
     }
     ```
   * 정리
     * kthread_create_on_node() : "kworker/" 이름으로 워커 스레드를 만듦.
     * worker_attach_to_pool() : 워커 풀에 워커를 등록.
     * worker_enter_idle() : 워커 상태를 WORKER_IDLE로 바꿈.
     * wake_up_process() : 워커 스레드를 깨움.
 * woker_thread()
   * create_worker()

     ```c
     static struct worker *create_worker(struct worker_pool *pool)
     {
       struct worker *worker = NULL;
       /* skip */
       worker->task = kthread_create_on_node(worker_thread, worker, pool->node,
                                            "kworker/%s", id_buf);
     }
     ```
   * 전체 동작 과정
     * 1단계 깨어남 : 워크를 워크큐에 큐잉하면 wake_up_worker() 함수를 호출.
     * 2단계 전처리 : need_more_worker() 함수를 호출해 워커 스레드를 실행할 조건인지 점검.
     * 3단계 워크 실행 : process_one_work() 함수 호출해 워크 실행
     * 4단계 슬립 : 워커 상태를 아이들로 설정하고 슬립 상태로 진입.

   ```c
   static int worker_thread(void *__worker)
   {
     struct worker *worker = __worker;
     struct worker_pool *pool = worker->pool;

     set_pf_worker(true); // worker->task->flags |= PF_WQ_WORKER;
   woke_up:
     spin_lock_irq(&pool->lock);

     /* am I supposed to die? */
     if (unlikely(worker->flags & WORKER_DIE)) {
       spin_unlock_irq(&pool->lock);
       WARN_ON_ONCE(!list_mepty(&worker->entry));
       set_pf_worker(false); // worker->task->flags &= ~PF_WQ_WORKER;

       set_task_comm(worker->task, "kworker/dying");
       ida_simple_remove(&pool->worker_ida, worker->id);
       worker_detach_from_pool(worker, pool);
       kfree(worker);
       return 0;
     }

     worker_leave_idle(worker);
   recheck:
     /* no more worker necessary? */
     if (!need_more_worker(pool))
       goto sleep;

     /* do we need to manage? */
     if (unlikely(!may_start_working(pool)) && manage_workers(worker))
       goto recheck;

     WARN_ON_ONCE(!list_emtpry(&worker->scheduled));

     worker_clr_flags(worker, WORKER_PREP | WORKER_REBOUND);

     do {
       struct work_struct *work =
         list_first_entry(&pool->worklist,
                         struct work_struct, entry);

       pool->watchdog_ts = jiffies;

       if (likely(!(*work_data_bits(work) & WORK_STRUCT_LINKED))) {
         /* optimization path, not strictly necessary */
         process_one_work(worker, work);
         if (unlikely(!list_empty(&worker->scheduled)))
           process_scheduled_works(worker);
       } else {
         move_linked_works(work, &worker->scheduled, NULL);
         process_scheduled_works(worker);
       }
     } while (keep_working(pool));

     worker_set_flags(worker, WORKER_PREP);
   sleep:
     worker_enter_idle(worker);
     __set_current_state(TASK_IDLE);
     spin_unlock_irq(&pool->lock);
     schedule();
     goto woke_up;
   }
   ```

   * set_pf_worker()

     ```c
     static void set_pf_worker(bool val)
     {
       mutex_lock(&wq_pool_attach_mutex);
       if (val)
         current->flags |= PF_WQ_WORKER;
       else
         current->flags &= ~PF_WQ_WORKER;
       mutex_unlock(&wq_pool_attach_mutex);
     }
     ```

#### 딜레이워크
 * 딜레이 워크 : 워크를 일정시간 후에 지연시켜 실행하는 기법.

 ```c
 struct delayed_work {
   struct work_struct work;
   struct timer_list timer;

   struct workqueue_struct *wq;
   int cpu;
 };
 ```
   * work : 어떤 일을 할지
   * timer : 워크를 지정된 시간만큰 지연할 수 있는 시간 정보를 저장
   * wq : 딜레이 워크를 관리하는 워크큐 주소
   * cpu : 딜레이 워크를 실행한 cpu 번호

##### 딜레이 워크의 전체 흐름
 * 딜레이 워크 초기화 : INIT_DELAYED_WORK()
 * 딜레이 워크 타이머 등록 : schedule_delayed_work(), queue_delayed_work(), queue_delayed_work_on(), __queue_delayed_work()
 * 딜레이 워크 큐잉 : delayed_work_timer_fn(), __queue_wokr()
 * 딜레이 워크 실행 : process_one_work()

##### INIT_DELAYED_WORK()
 * 사용법

  ```c
  struct delayed_work d_work;
  static int sample()
  {
    INIT_DELAYED_WORK(&d_work, callback_fn);
  }
  ```

 * INIT_DELAYED_WORK()

  ```c
  #define INIT_DELAYED_WORK(_work, _func)       \
    __INIT_DELAYED_WORK(_work, _func, 0)
  ```

 * __INIT_DELAYED_WORK()

  ```c
  #define __INIT_DELAYED_WORK(_work, _func, _tflags)  \
    do {                                              \
      INIT_WORK(&(_work)->work, (_func));             \
      __init_timer(&(_work)->timer,                   \
        delayed_work_timer_fn,                        \
        (_tflags) | TIMER_IRQSAFE);                   \
    } while(0);
  ```

 * __init_timer()

  ```c
  #define __init_timer(_timer, _fn, _flags)                       \
    do {                                                          \
      static struct lock_class_key __key;                         \
      init_timer_key((_timer), (_fn), (_flags), #_timer, &__key); \
    } while (0)
  ```

 * init_timer_key()

  ```c
  void init_timer_key(struct timer_list *timer,
    void (*func)(truct timer_list *), unsigned int flags,
    const char *name, struct lock_class_key *key)
  {
    debug_init(timer);
    do_init_timer(timer, func, flags, name, key);
  }
  ```

##### schedule_delayed_work()
 * 사용법

  ```c
  schedule_delayed_work(&d_work, timeout);
  ```

 * schedule_delayed_work()

  ```c
  static inline bool schedule_delayed_work(struct delayed_work *dwork,
                                 unsigned long delay)
  {
    return queue_dleayed_work(system_wq, dwork, delay);
  }
  ```

 * queue_delayed_work()

  ```c
  static inline bool queue_delayed_work(struct workqueue_struct *wq,
                                struct delayed_work *dwork,
                                unsigned long delayed)
  {
    return queue_delayed_work_on(WORK_CPU_UNBOUND, wq, dwork, delay);
  }
  ```
 * queue_delayed_work_on()
  ```c
  bool queue_delayed_work_on(int cpu, struct workqueue_struct *wq,
            struct delayed_work *dwork, unsigned long delay)
  {
    struct work-struct *work = &dwork->work;
    bool ret = false;
    unsigned long flags;

    /* read the comment in __queue_work() */
    local_irq_save(flags);

    if (!test_and_set_bit(WORK_STRUCT_PENDING_BIT, work_data_bits(work))) {
      __queue_delayed_work(cpu, wq, dwork, delay);
      ret = true;
    }

    local_irq_restore(flags);
    return ret;
  }
  ```

 * __queue_delayed_work()
  ```c
  static void __queue_delayed_work(int cpu, struct workqueue_struct *wq,
                            struct dealyed_work *dwork, unsigned long delay)
  {
    struct timer_list *timer = &dwork->timer;
    struct work_struct *work = &dwork->work;

    WARN_ON_ONCE(!wq);
    WARN_ON_ONCE(timer->function != delayed_work_timer_fn ||
                timer->data != (unsigned long)dwork);
    WARN_ON_ONCE(timer_pending(timer));
    WARN_ON_ONCE(!list_empty(&work->entry));

    if (!delay) {
      __queue_work(cpu, wq, &dwork->work);
      return;
    }

    dwork->wq = wq;
    dwork->cpu = cpu;
    timer->expires = jiffies + delay;

    if (unlikely(cpu != WORK_CPU_UNBOUND))
      add_timer_on(timer, cpu);
    else
      add_tiemr(timer);
  }
  ```

##### delayed_work_timer_fn()
 ```c
 void delayed_work_timer_fn(unsigned long __data)
 {
   struct delayed_work *dwork = (struct dleayed_work *)__data;

   /* should have been called from irqsafe timer with irq already off */
   __queue_work(dwork->cpu, dwork->wq, &dwork->work);
 }
 ```

