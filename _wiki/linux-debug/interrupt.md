---
layout  : wiki
title   : linux-debug/interrupt
summary : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리/인터럽트
date    : 2020-11-10 23:55:41 +0900
lastmod : 2020-11-10 23:56:25 +0900
tags    : [linux-debug, interrupt]
draft   : false
parent  : linux-debug
---

#### 인터럽트
 * 인터럽트 벡터와 인터럽트 핸들러
 * IRQ(Interrupt ReQuest)

 ```c
 int (*request_irq)(struct dispc_device *dispc, irq_handler_t handler, void *dev_id);
 ```
##### 인터럽트 컨텍스트 활성화 시기
 * 프로세스 실행 중
 * 인터럽트 벡터 실행
 * 커널 인터럽트 내부 함수 호출
 * 인터럽트 종류별로 인터럽트 핸들러 호출
   * 인터럽트 컨텍스트 시작
 * 인터럽트 핸들러의 서브루틴 실행 시작
 * 인터럽트 핸들러의 서브루틴 실행 마무리
   * 인터럽트 컨텍스트 마무리

##### 인터럽트 디스크립터
 * 인터럽트 핸들러
 * 인터럽트 핸들러 매개변수
 * 논리적인 인터럽트 번호
 * 인터럽트 실행 횟수

##### 인터럽트 처리 흐름
 1. 인터럽트 발생 : 인터럽트가 발생하면 프로세스는 실행 도중 인터럽트 벡터로 이동, 인터럽트 벡터에서 인터럽트 처리를 마리한 후 다시 프로세스를 실행하기 위해 실행 중인 프로세스의 레지스터 세트를 스택에 저장, IRQ 서 브시스템을 구성하는 함수들이 호출
 1. 인터럽트 핸들러 호출 : 발생한 인터럽트에 대앙하는 인터럽트 디스크립터를 읽어서 인터럽트 핸들러를 호출
 1. 인터럽트 핸들러 실행 : 인터럽트 핸들러에서 하드웨어를 직접 제어하고 유저 공간에 전달

##### 인터럽트 서술자 테이블 (Interrupt Descriptor Table - IDT)
 * 인터럽트 벡터 테이블을 구현하기 위해 x86 아키텍처에서 사용되는 데이터 구조체이다.
 * IDT의 사용은 다음 3 종류의 이벹느들에 의해 발생된다.
   * 하드웨어 인터럽트
   * 소프트웨어 인터럽트
   * 프로세서 예외

##### IRQ Chip
 * 참고 : http://jake.dothome.co.kr/interrupts-2/
 * 인터럽트 컨트롤러 드라이버를 위해 hw 제어를 담당하는 구현 부분을 가짐.

##### 리눅스 커널
 * `arch/x86/entry/entry_64.S` line number 655 common_interrupt: -> call `do_IRQ`
 * `arch/x86/kernel/irq.c`

  ```c
  /*
   * do_IRQ handles all normal device IRQ's (the special
   * SMP cross-CPU interrupts have their own specific
   * handlers).
   */
  __visible unsigned int __irq_entry do_IRQ(struct pt_regs *regs)
  {
    struct pt_regs *old_regs = set_irq_regs(regs);
    struct irq_desc * desc;
    /* high bit used in ret_from_ code  */
    unsigned vector = ~regs->orig_ax;

    entering_irq();

    /* entering_irq() tells RCU that we're not quiescent.  Check it. */
    RCU_LOCKDEP_WARN(!rcu_is_watching(), "IRQ failed to wake up RCU");

    desc = __this_cpu_read(vector_irq[vector]);

    if (!handle_irq(desc, regs)) {
      ack_APIC_irq();

      if (desc != VECTOR_RETRIGGERED && desc != VECTOR_SHUTDOWN) {
        pr_emerg_ratelimited("%s: %d.%d No irq handler for vector\n",
                 __func__, smp_processor_id(),
                 vector);
      } else {
        __this_cpu_write(vector_irq[vector], VECTOR_UNUSED);
      }
    }

    exiting_irq();

    set_irq_regs(old_regs);
    return 1;
  }
  ```

 * check handler at `if (!handle_irq(desc, regs))`. handler_irq is defined by an irq chip driver.
 * gic_handle_irq -> __handler_domain_irq -> generic_handle_irq -> handle_fasteoi_irq -> handle_irq_event -> handle_irq_event_percpu


##### Interrupt Context

 ```asm
common_interrupt:
  addq	$-0x80, (%rsp)			/* Adjust vector to [-256, -1] range */
  call	interrupt_entry
  UNWIND_HINT_REGS indirect=1
  call	do_IRQ	/* rdi points to pt_regs */
  /* 0(%rsp): old RSP */
 ```

 ```asm
ENTRY(interrupt_entry)
  UNWIND_HINT_IRET_REGS offset=16
  ASM_CLAC
  cld

  testb	$3, CS-ORIG_RAX+8(%rsp)
  jz	1f
  SWAPGS
  FENCE_SWAPGS_USER_ENTRY
  /*
   * Switch to the thread stack. The IRET frame and orig_ax are
   * on the stack, as well as the return address. RDI..R12 are
   * not (yet) on the stack and space has not (yet) been
   * allocated for them.
   */
  pushq	%rdi

  /* Need to switch before accessing the thread stack. */
  SWITCH_TO_KERNEL_CR3 scratch_reg=%rdi
  movq	%rsp, %rdi
  movq	PER_CPU_VAR(cpu_current_top_of_stack), %rsp

   /*
    * We have RDI, return address, and orig_ax on the stack on
    * top of the IRET frame. That means offset=24
    */
  UNWIND_HINT_IRET_REGS base=%rdi offset=24

  pushq	7*8(%rdi)		/* regs->ss */
  pushq	6*8(%rdi)		/* regs->rsp */
  pushq	5*8(%rdi)		/* regs->eflags */
  pushq	4*8(%rdi)		/* regs->cs */
  pushq	3*8(%rdi)		/* regs->ip */
  UNWIND_HINT_IRET_REGS
  pushq	2*8(%rdi)		/* regs->orig_ax */
  pushq	8(%rdi)			/* return address */

  movq	(%rdi), %rdi
  jmp	2f
1:
  FENCE_SWAPGS_KERNEL_ENTRY
2:
  PUSH_AND_CLEAR_REGS save_ret=1
  ENCODE_FRAME_POINTER 8

  testb	$3, CS+8(%rsp)
  jz	1f

  /*
   * IRQ from user mode.
   *
   * We need to tell lockdep that IRQs are off.  We can't do this until
   * we fix gsbase, and we should do it before enter_from_user_mode
   * (which can take locks).  Since TRACE_IRQS_OFF is idempotent,
   * the simplest way to handle it is to just call it twice if
   * we enter from user mode.  There's no reason to optimize this since
   * TRACE_IRQS_OFF is a no-op if lockdep is off.
   */
  TRACE_IRQS_OFF

  CALL_enter_from_user_mode

1:
  ENTER_IRQ_STACK old_rsp=%rdi save_ret=1
  /* We entered an interrupt context - irqs are off: */
  TRACE_IRQS_OFF

  ret
END(interrupt_entry)
 ```
 * 여기서 이전에 있던 걸 저장하는 asm은 PUSH_AND_CLEAR_REGS 이다.

##### in_interrupt
  * `include/linux/preempt.h`

  ```c
  #define in_interrupt()		(irq_count())
  ```

  ```c
  #define irq_count()	(preempt_count() & (HARDIRQ_MASK | SOFTIRQ_MASK \
     | NMI_MASK))
  ```

  ```c
  DECLARE_PER_CPU(int, __preempt_count);
  /*
   * We mask the PREEMPT_NEED_RESCHED bit so as not to confuse all current users
   * that think a non-zero value indicates we cannot preempt.
   */
  static __always_inline int preempt_count(void)
  {
    return raw_cpu_read_4(__preempt_count) & ~PREEMPT_NEED_RESCHED;
  }
  ```

  * cpu 마다 `__preempt_count` 라는 변수를 만들고, 여기에 비트 연산해서 가져온다.
  * 동작 순서
    1. irqchip driver에서 handle_domain_irq 를 호출해한다.
    1. handle_domain_irq -> __handle_domain_irq -> irq_enter -> __irq_enter -> preempt_count_add 순으로 호출하면서 cpu가 인터럽트를 처리중이라는걸 명시해준다.
    1. __handle_domain_irq -> generic_handle_irq -> handle_fasteoi_irq -> handle_irq_event -> handle_irq_event_percpu 순으로 호출되면서, interrupt handler 가 처리하도록 한다.
  * 인터럽트 컨텍스트에서 스케줄링하면 커널 패닉이 발생한다.
    * 인터럽트 컨텍스트에서 mutext 를 획득하면 mutex 내부에서 스캐줄링이 있기 때문에, 터진다.


##### 인터럽트 핸들러 등록
 * request_irq

 ```c
 static inline int __must_check
 request_irq(unsigned int irq, irq_handler_t handler, unsigned long flags,
   const char *name, void *dev)
 ```
   * irq : 인터럽트 번호
   * handler : 인터럽트 발생 시 호출될 인터럽트 핸들러 주소
   * flags : 인터럽트의 속성 플래그
   * naem : 인터럽트 이름
   * dev : 인터럽트 핸들러에 전달하는 매개변수

 * request_threaded_irq
   * request_irq 가 내부적으로 호출하는 함수
   * 동작
     * 인터럽트 번호로 인터럽트 디스크립터 가져오기
     * irqaction 구조체로 독적 메모리 할당
     * irqaction 구조체 필드에 인터럽트 초기화 인자(인터럽트 핸들러, 인터럽트 속성, 인터럽트 핸들러 매개변수)를 설정

 * IRQ Storm : 인터럽트 신호가 엄청 자주 발생해서 시스템 오동작 유발
   * IRQF_TRIGGER_HIGH
   * IRQF_TRIGGER_LOW
   * IRQF_TRIGGER_RISING
   * IRQF_TRIGGER_FALLING

##### 인터럽트 디스크립터
 * 커널이 특정 드라이버나 메모리 같은 중요한 객체를 관리하려고 쓰는 자료구조
   * 주로 `task_struct`, `page`, `files_struct`

 ```c
 struct irq_desc {
   struct irq_common_data irq_common_data;
   struct irq_data        irq_data;
   unsigned int __purcpu  *kstat_irqs;
   irq_flow_handler_t     handler_irq;
 #ifdef CONFIG_IRQ_PREFLOW_FASTEOI
   irq_preflow_handler_t  preflow_handler;
 #endif
  struct irqaction        *action;
  unsigned int            status_use_accessors;
 }
 ```
 * irq_common_data : 커널에서 처리하는 irq_chip 관련 함수에 대한 정보
 * irq_data : 인터럽트 번호와 해당 하드웨어 핀 번호
 * kstat_irq : 인터럽트가 발생한 횟수가 저장
 * action : 인터럽트 주요 정보

 ```c
 struct irqaction {
   irq_handler_t         handler;
   void                  *dev_id;
   void __percpu         *percpu_dev_id;
   struct irqaction      *next;
   irq_handler_t         thread_fn;
   struct task_struct    *thread;
   struct irqaction      *second;
   unsigned int          irq;
   unsigned int          flags;
   unsigned long         thread_flags;
   unsigned long         thread_mask;
   const char            *name;
   struct proc_dir_entry *dir;
 } ____cacheline_internodealigned_in_smp;
 ```

 * handler : 인터럽트 핸들러의 함수 주소
 * dev_id : 인터럽트 핸들러에 전달되는 매개변수
 * thread_fn : 인터럽트를 threaded IRQ 방식으로 처리할때 IRQ 스레드 처리 함수의 주소를 저장하는 필드, 지정하지 않으면 NULL
 * irq : 인터럽트 번후
 * flags : 인터럽트 플레그 설정 필드

##### 인터럽트가 비활성화되어야 할 때
 * SoC에서 정의한 하드웨어 블록에 정확한 시퀀스를 줘야할 경우
 * 시스템이 유휴 상태에 진입하기 직전의 *시스템의 상태 정보* 값을 저장하는 동작
 * 각 디바이스 드라이버가 서스펜드 모드로 진입할 때 디바이스 드라이버에 데이ㅌ 시트에서 명시한 대로 정확히 특정 시퀀스를 줘야 할 경우
 * 예외가 발생해서 시스템 리셋을 시키기 전

 * local_irq_disable : 해당 cpu 라인에서 인터럽트의 발생을 비활성화 하는 함수
 * local_irq_enable : 해당 CPU 인터럽트 라인을 활성화

 ```c
#define raw_local_irq_enable()		arch_local_irq_enable()
static inline notrace void arch_local_irq_enable(void)
{
  native_irq_enable();
}

static inline void native_irq_enable(void)
{
  asm volatile("sti": : :"memory");
}
 ```


##### 인터럽트 디버깅

```bash
#!/bin/bash

echo 0 > /sys/kernel/debug/tracing/tracing_on
sleep 1
echo "tracing_off"
echo nop > /sys/kernel/debug/tracing/current_tracer
echo 0 > /sys/kernel/debug/tracing/events/enable
sleep 1

echo 1 > /sys/kernel/debug/tracing/events/sched/sched_switch/enable
sleep 1

echo 1 > /sys/kernel/debug/tracing/events/irq/irq_handler_entry/enable
echo 1 > /sys/kernel/debug/tracing/events/irq/irq_handler_exit/enable

echo 1 > /sys/kernel/debug/tracing/tracing_on
echo "tracing_on"
```

#### 인터럽트 후반부 처리
* 인터럽트 후반부의 필요성
 * 인터럽트가 발생하면 커널은 실행 중인 프로세스를 멈추가 인터럽트 벡터를 실행해서 인터럽트 핸들러를 실행하게 된다. 이는 프로세스 입장에서는 실행 도중 멈추는 것이니 최대한 빨리 실행되지 않는다면, 프로세스가 동작하다가 멈춘 것처럼 보인다.
 * 이는 다음 4가지 기법들을 이끌어 낸다.
   * IRQ 스레드
   * Soft IRQ
   * 테스크릿
   * 워크큐
* 인터럽트 컨텍스트에서 시간을 오래 소모하면 커널 패닉이 일어난다.

##### Top Half/Bottom Half
 * Top Half : 인터럽트가 발생한 후 빨리 처리해야 하는 일
 * Bottom Half : 조금 있다가 처리해도 되는일
 * 인터럽트 핸들러는 Top Half를, 프로세스 레벨에선 Bottom Half 를 처리한다.

##### 인터럽트 후반부 처리 기법 정리
 * IRQ 쓰레드(threaded IRQ) : 인터럽트를 처리하는 전용 IRQ 스레드에서 인터럽트 후속 처리를 수행한다.
 * Soft IRQ : 인터럽트 핸들러 실행이 끝나면 바로 시작되며, Soft IRQ 컨텍스트에서 실행되며, 시간이 오래 걸릴 경우 ksoftirqd 프로세스를 깨우고 서비스를 종료한다. 이후 ksoftirqd 라는 프로세스에서 나머지 내용들을 처리한다.
 * 테스크릿 : Soft IRQ 서비스를 동적으로 쓸 수 있는 인터페이스이자 자료구조
 * 워크큐 : 인터럽트 핸들러가 실행될 때 워크를 워크큐에 큐잉하고 프로세스 레벨의 워커 스레드에서 인터럽트 후반부를 처리한다.

##### 어떤 처리기법을 적용해야 하는가
 * 인터럽트가 자주 발생할 경우 : Soft IRQ나 테스크릿
   * IRQ 스레드는 실시간 프로세스로 구동되며, 이는 선점 스케줄링을 유발하여 다른 프로세스들이 대기하게 된다. 이는 시스템 반응 속도가 느려지는 결과가 생긴다.
   * 워크큐는 실행 시간 측면에서, 큐잉 뒤 워크를 깨우는 시간이 오래 걸리고, 워커 스레드는 일반 프로세스로 우선순위가 높지 않다.
 * 인터럽트 개수가 많을 경우 : IRQ 스레드를 생성할 때, 메모리 주의
   * 인터럽트 개수만큼 IRQ 스레드가 생성되기 때문에 메모리를 더 사용하게 된다.

##### IRQ 스레드 (threaded IRQ)
 * IRQ : Interrupt Request으 약자로 하드웨어에서 발생한 인터럽트를 처리한다.
 * Threaed IRQ : 인터럽트 핸들러에서 바로 처리하지 않아도 되는 일을 수행하는 프로세스를 두고 처리하는 방식

 * `irq/인터럽트 번호 - 인터럽트 이름` 의 순서로 IRQ 스레드의 이름이 지어진다. (예시 : irq/86-mmc1 는 mmc1이라는 이름의 86번 인터럽트를 처리하는 IRQ 스레드)

##### IRQ 생성 방법
 * request_threaded_irq -> __setup_irq -> setup_irq_thread -> kthread_create 과정을 통해서 커널 스레드를 생성
 * request_threaded_irq

   ```c
   int request_threaded_irq(unsigned int irq, irq_handler_t handler,
    irq_handler_t thread_fn, unsigned long irqflags,
    const char *devname, void *dev_id);
   ```

   * irq : 인터럽트 번호
   * handler : 인터럽트 핸들러 주소
   * thread_fn : IRQ 스레드 처리 함수의 주소
   * irqflags : 인터럽트 핸들링 플래그
   * devname : 인터럽트 핸들러 이름
   * dev_id : 인터럽드 디바이스 정보

   * 하는일
     1. 인터럽트 디스크립터 설정 : 이나를 인터럽트 디스크립터 필드에 할당
     2. IRQ 스레드 생성 : thread_fn 인자에 IRQ 스레드 처리 함수 주소를 지정하면 IRQ 스레드 생성

 * __setup_irq

   ```c
    static int
    __setup_irq(unsigned int irq, struct irq_desc *desc, struct irqaction *new)
   ```

   * irq : 인터럽트 번호
   * desc : 인터럽트 디스크립터
   * new : 인터럽트 디스크립터의 action 필드

   * 하는일
     * IRQ 스레드 처리 함수가 등록됐는지 점검
     * 만약 IRQ 스레드가 등록됐으면 setup_irq_thread 함수를 호출해 IRQ 스레드를 생성
 * setup_irq_thread

   ```c
    static int
    setup_irq_thread(struct irqaction *new, unsigned int irq, bool secondary)
   ```

 * IRQ 스레드 처리 함수 : 인터럽트별로 지정한 IRQ 스레드별로 후반부를 처리하는 함수
 * IRQ 스레드 핸들러 함수 : irq_thread() 함수를 뜻하며, 인터럽트별로 지정된 IRQ 스레드 처리함수를 호출하는 역할

##### IRQ 스레드의 실행과정
 1. 인터럽트 핸들러에서 IRQ_WAKE_THREAD를 반환
 1. IRQ 스레드를 꺠움
 1. IRQ 스레드 핸들러인 irq_thread() 함수를 실행
 1. irq_thread() 함수에서 IRQ 스레드 처리 함수 호출
---
 * handle_irq_event -> handle_irq_event_percpu -> __handle_irq_event_percpu -> __irq_wake_thread -> wake_up_process
 * 만약 IRQ 스레드를 깨우고 싶으면 IRQ_WAKE_THREAD를 반환하고,아니라면 IRQ_HANDLED를 반환하면 된다.

#### Soft IRQ
 * 리눅스 커널에서 지원하는 10가지 Soft IRQ 서비스
   * HI, TIMER, NET_TX, NET_RX, BLOCK, IRQ_POLL, TASKLET, SCHED, HRTIMER, RCU

##### Soft IRQ 서비스의 라이프 사이클
 1. 부팅 과정
   * Soft IRQ 서비스 등록
   * open_softirq()
 1. 인터럽트 처리
   * Soft IRQ 서비스 요청
   * raise_softirq()
 1. Soft IRQ 컨텍스트
   * Soft IRQ 서비스 실행
   * __do_softirq()

##### 발생 흐름
 1. 인터럽트가 발생하면 해당 인터럽트 핸들러에서 Soft IRQ 서비스를 요청한다. 이를 위해 raise_softirq_irqoff() 함수를 호출해야 한다. 이는 인터럽트 핸들러에서 IRQ_WAKE_THREAD를 반환하는 동작과 유사하다.
 1. 인터럽트 서비스 루틴 동작이 끝나면 irq_exit() 함수를 호출한다. 여기서 Soft IRQ 서비스 요청 여부를 점검한다. 요청한 Soft IRQ 서비스가 있으면 __do_softirq() 함수를 호출해서 해당 Soft IRQ 서비스 핸들러를 실행한다. 만약 Soft IRQ 서비스 요청이 없으면 riq_exit() 함수는 바로 종료하게 된다.
 1. __do_softirq() 함수에서 Soft IRQ 서비스 핸들러 호출을 끝내면 Soft IRQ 서비스 요청이 있었는지 다시 체크한다. 이미 Soft IRQ 서비 스핸들러 처리 시간이 2ms 이상이거나 10번 이상 Soft IRQ 서비스 핸들러를 처리했다면 다음 동작을 수행한다.
   * wakeup_softirqd() 함수를 호출해서 ksoftirqd 프로세스를 깨움
   * __do_softirq() 함수 종료
 1. ksoftirqd 프로세스 가깨어나 3단계에서 마무리하지 못한 Soft IRQ 서비스 핸들러를 실행한다.

##### 후반부 기법으로 Soft IRQ를 사용하는 상황
 * 인터럽트 발생 빈도가 높거나 인터럽트 후반부를 빨리 처리해야 할 때 사용한다.
 * 커널에서는 Soft IRQ를 디바이스 드라이버 레벨에서 쓸 수 있는 태스크릿이라는 인터페이스 환경을 제공한다.

##### Soft IRQ 서비스 설명

| 우선순위   | Soft IRQ 서비스    | 설명                                             | Soft IRQ 서비스 핸들러   |
| ---------- | ------------------ | ------------------------------------------------ | ------------------------ |
| 0          | HI_SOFTIRQ         | 가장 우선순위가 높으며 TASKLET_HI로 적용         | tasklet_hi_action()      |
| 1          | TIMER_SOFTIRQ      | 동적 타이버로 사용                               | run_timer_softirq()      |
| 2          | NET_TX_SOFTIRQ     | 네트워크 패킷 송신용으로 사용                    | net_tx_action()          |
| 3          | NET_RX_SOFTIRQ     | 네트워크 패킷 수신용 사용                        | net_rx_action()          |
| 4          | BLOCK_SOFTIRQ      | 블록 디바이스에서 사용                           | blk_done_softirq()       |
| 5          | IRQ_POLL_SOFTIRQ   | IRQ_POLL 연관 동작                               | blk_iopoll_softirq()     |
| 6          | TASKLET_SOFTIRQ    | 일반 태스크릿으로 사용                           | tasklet_action()         |
| 7          | SCHED_SOFTIRQ      | 스케쥴러에서 사용                                | run_reblanace_domains()  |
| 8          | HRTIMER_SOFTIRQ    | 현재 사용하지 않지만 하위 호환성을 위해 남겨둠   | run_timer_softirq()      |
| 9          | RCU_SOFTIRQ        | RCU 처리용으로 사용                              | rcu_process_callbacks()  |

##### raise_softirq() 함수
 * raise_softirq -> raise_softirq_irqoff -> or_softirq_pending
 * irq_exit -> invoke_softirq -> __do_softirq
 * run_ksoftirqd -> __do_softirq

##### __do_softirq 함수
 * 실제로 Soft IRQ 서비스 핸들러를 실행시켜주는 곳
 * 시간이 오래걸리거나, 특정 횟수 이상 서비스를 실행했으면ksoftirqd 스레드를 깨움.

##### ksoftirqd 스레드
 * wakeup_softirqd -> wake_up_process
 * run_ksoftirqd -> __do_softirq

##### 정리
 * Soft IRQ 서비스 요청 시기 : 인터럽트가 발생하면 인터럽트 핸들러에서 Soft IRQ 서비스를 요청
 * Soft IRQ 서비스 실행의 출발점 : 인터럽트 핸들러 수행이 끝나면 요청한 Soft IRQ 서비스가 있엇는지 체크, irq_exit() -> invoke_softirq() -> __do_softirq()
 * Soft IRQ 전용 스레드인 ksoftirqd 스레드의 기상 시점 : __do_softirqd() 함수 실행시간이 2ms 이상이거나, Soft IRQ 서비스 핸들러를 10번 이상 호출했다면 ksoftirqd 스레드가 일어난다.

#### ksoftirqd 스레드
 * Soft IRQ 서비스를 인터럽트를 처리 한 후의 시점이 아닌 프로세스 레벨에서 실행할 수 있게 생성된 프로세스
 * percpu 타입의 프로세스이며, cpu 코어의 개수 만큼 생성되어 정해진 cpu 내에서만 실행된다.

##### ksoftirqd 스레드 기상 시점
 * __do_softirq() 함수에서 Soft IRQ 서비스를 실행한 후
 * 인터럽트 컨텍스트가 아닌 상황에서 Soft IRQ 서비스를 요청할 때

 * __do_softirq() 함수에서 Soft IRQ 서비스의 실행 시간이 MAX_SOFTIRQ_TIME 을 초과 했을 때

 ```c
 asmlinkage __visible void __softirq_entry __do_softirq(void)
 {
   unsigned long end = jiffies + MAX_SOFTIRQ_TIME;
   /* skip */
   restart :
   /* skip */
   while ((softirq_bit = ffs(pending))) {
   /* skip */
     trace_softirq_entry(vec_nr);
     h->action(h);
     trace_softirq_exit(vec_nr);
     /* skip */
     h ++;
     pending >>= softirq_bit;
   }
   pending = local_softirq_pending();
   if (pending) {
     if (time_before(jiffies, end) && !need_resched() &&
       --max_restart)
       goto restart;

     wake_softirqd();
   }
 }

 * Soft IRQ 서비스를 요청할 때 (raise_softirq_irqoff)

   ```c
   inline void raise_softirq_irqoff(unsigned int nr)
   {
     __raise_softirq_irqoff(nr);

     if (!in_interrupt())
       wakeup_softirqd();
   }
   ```

##### ksoftirqd 핸들러 run_ksoftirqd

```c
static void run_ksoftirqd(unsigned int cpu)
{
  local_irq_disable();
  if (local_softirq_pending()) {
    __do_softirq();
    local_irq_enable();
    cond_resched_cru_qs();
    return;
  }
  local_irq_enable();
}
```

##### Soft IRQ 컨텍스트
 * Soft IRQ 컨텍스트의 시작점
   * __do_softirq() 에서 __local_bh_disable_ip(_RET_IP_, SOFTIRQ_OFFSET) 을 호출하면서 시작
 * Soft IRQ 컨텍스트 확인 : in_softirq()

#### 태스크릿
 * 동적으로 Soft IRQ 서비스를 쓸 수 있게 만든 인터페이스
##### 태스크릿 실행 순서
 1. Soft IRQ 서비스 요청
 1. Soft IRQ 서비스 실행
 1. ksoftirqd 스레드를 깨움
 1. ksfotirqd 스레드 실행

##### 태스크릿의 실행 주체
 * tasklet_action()

##### 태스크릿 자료 구조

```c
struct tasklet_struct
{
  struct tasklet_struct *next;
  unsigned long state;
  atomic_t count;
  void (*func)(unsigned long);
  unsigned long data;
}
```
 * next : 다음 태스크릿을 가리키는 용도의 포인터
 * state : 캐스크릿의 세부 상태 정보를 저장하는 필드, 아래 나오는 플레그 중 하나를 저장한다.

  ```c
  enum
  {
    TASKLET_STATE_SCHED,  /* Tasklet is scheduled for execution. */
    TASKLET_STATE_RUN     /* Tasklet is running (SMP only) */
  }
  ```
   * TASKLET_STATE_SCHED : 태스크릿 서비스를 요청한 후 아직 태스크릿 핸들러를 처리하지 않는 상태
   * TASKLET_STATE_RUN : 태스크릿 핸들러를 실행 중인 상태
 * count : 태스크릿의 레퍼런스 카운터, 초기화할때(tasklet_init)에서 0으로 설정. 반드시 0이여야지만 태스크릿을 실행
 * func : 테스크릿 핸들러 함수 주소, tasklet_init 함수를 호출할 때 2번째 인자로 등록
 * data : 태스크릿 핸들러 함수에 전달되는 매개변수

##### 태스크릿 등록 방법
 * 태스크릿 전역변수 선언 : DECLARE_TASKLET() 또는 DECLARE_TASKLET_DISABLED() 함수 호출

   ```c
   #define DECLARE_TASKLET(name, func, data) \
   struct tasklet_struct name = { NULL, 0, ATOMIC_INIT(0), func, data }

   #define DECLARE_TASKLET_DISABLED(name, func, data) \
   struct tasklet_struct name = { NULL, 0, ATOMIC_INIT(1), func, data }

   /* example */
   DECLARE_TASKLET_DISABLED(keyboard_tasklet, kbd_bh, 0);

   int __init kdb_init(void)
   {
     /* skip */
     tasklet_enable(&keyboard_tasklet);
     tasklet_schedule(&keyboard_tasklet);
     /* skip */
     return 0;
   }
   ```
   * 기본적으로는 태스크릿을 비활성화해 초기화 한 후 tasklet_enable() 함수를 호출하면 태스크릿을 활성화 할수 있다.
 * 테스크릿 초기화 함수 호출 : tasklet_init() 함수

   ```c
   extern void tasklet_init(struct tasklet_struct *t,
     void (*func)(unsigned long), unsigned long data);
   ```
   * t : 태스크릿을 식별하는 구조체
   * func : 태스크릿 핸들러 함수
   * data : 태스크릿 콜백 함수로 전달하는 매개변수

##### 태스크릿 실행 요청 방법
 * tasklet_schedule()
   * tasklet_schedule -> __tasklet_schedule -> __tasklet_schedule_common
     * tasklet_schedule : state를 TASKLET_STATE_SCHED로 바꿈
     * __stasklet_schedule : __tasklet_schedule_commone 함수 호출
     * __tasklet_schedule_common : tasklet_vec 에 태스크릿 핸들러 등록

##### Soft IRQ 디버깅 해보기
 * ftrace 코드

  ```bash
  #!/bin/bash

  echo 0 > /sys/kernel/debug/tracing/tracing_on
  sleep 1
  echo "tracing_off"

  echo 0 > /sys/kernel/debug/tracing/events/enable
  sleep 1
  echo "events disabled"

  echo 1 > /sys/kernel/debug/tracing/events/irq/softirq_raise/enable
  echo 1 > /sys/kernel/debug/tracing/events/irq/softirq_entry/enable
  echo 1 > /sys/kernel/debug/tracing/events/irq/softirq_exit/enable

  sleep 1
  echo "set_ftrace_filter enabled"

  echo 1 > /sys/kernel/debug/tracing/tracing_on
  echo "tracing_on"
  ```
 * ftrace log 확인하기

   ```log
    soft_irq_ftrace-2255  [000] d.h. 19085.301866: softirq_raise: vec=7 [action=SCHED]
    soft_irq_ftrace-2255  [000] ..s. 19085.301920: softirq_entry: vec=1 [action=TIMER]
    soft_irq_ftrace-2255  [000] ..s. 19085.301940: softirq_exit: vec=1 [action=TIMER]
    soft_irq_ftrace-2255  [000] ..s. 19085.301944: softirq_entry: vec=7 [action=SCHED]
   ```
   * softirq_entry : 시작, softirq_exit : 실행 마무리, softirq_raise : 서비스 요청
 * Soft IRQ 서비스 실행 횟수 확인

   ```bash
   cat /proc/softirqs
   ```

---
#### 인터럽트 정리
 * 인터럽트가 발생했을 때 빨리 실행해야 하는 코드는 인터럽트 핸들러에서 처리, 나머지는 후반부 처리
 * IRQ 스레드는 후반부 처리를 위핸 전용 커널 스레드, request_threaded_irq 함수가 실행될 때 생성, 인터럽트 핸들러에서 IRQ_THREAD_WAKE를 반환하면 깨어남.
 * Soft IRQ : 빠른 시간 내에 인터럽트 후반부 처리를 하기 위한 기법, 네트워크 고속 패킷이나 스토리지 디바이스에 서사용
 * Soft IRQ 는 서비스 요청과 서비스 실행 단계로 나눌수 있으며, 실행할 때 softirq_vec 이라는 Soft IRQ 벡터에 등록된 함수를 호출
 * Soft IRQ 컨텍스트는 Soft IRQ 서비스를 실행 중인 상태이며, 프로세스를 관리하는 thread_info 구조체의 preempt_count 필드에 SOFTIRQ_OFFSET을 나타내는 0x100을 저장.
 * 태스크릿은 동적으로 Soft IRQ 서비스를 사용하기 위한 인터페이스

