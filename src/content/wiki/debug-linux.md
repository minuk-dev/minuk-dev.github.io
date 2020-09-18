---
layout  : wiki
title   : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리
date    : 2020-09-08 22:14:21 +0900
lastmod : 2020-09-18 20:44:38 +0900
tags    : [linux]
draft   : false
parent  : linux
---

## 간략 소개
* 디버깅을 통해 배우는 리눅스 커널의 구조와 원리를 읽으면서 공부하는 내용 정리

## 설치
* 작업하고 있는 곳의 환경상, 라즈베리파이를 직접적으로 사용하기 어려워 qemu로 가상화하기로 했다.
* 오로지 ssh로 붙어서 서버에서만 작업가능해야 한다.

### 참고한 곳
* https://woodz.tistory.com/72
* https://mystrlight.tistory.com/90
* https://procdiaru.tistory.com/78
* https://nautiluslee.blogspot.com/2019/01/debootstrap.html
* https://tistory.0wn.kr/368

### 이미지 다운로드 및 소스코드 다운로드
#### qemu 설치(뇌피셜)
```bash
sudo apt install qemu qemu-system-x86
```
* 아마도 이렇게 하면 될것이다, 사실 qemu는 pintos 공부하면서 이미 설치를 다 해놔서...

#### 리눅스 커널 소스코드 다운로드
```bash
wget https://cdn.kernel.org/pub/linux/kernel/v4.x/linux-4.19.143.tar.xz
```

#### kernel build
```bash
make defconfig
make menuconfig
```
* 맨 마지막에 menuconfig 할때는 최하단 kernel hacking 에서 KGDB 체크한다. 나머진 참고한곳에 있는 3번째 칭크를 보고 했는데 정확히는 모르겠다.
* 이렇게 하고 나서, deboostrap 을 설치해야한다는데, 4번을 참고했다.
```bash
sudo apt install debootstrap
```

---
#### 이미지 굽기
* 5번 참고해서 create image 실행해주자.
해서 create-image.sh 실행해주자


#### 고생한 부분
 * KASLR 을 해제했다고 생각해서 한참동안을 왜 에러가 나오지? 하고 있었다. 주의하자 무조건 해제해줘야한다. 안그러면 디버그 포인트를 지나간다.
 * 아 근데 왜 안되냐 ㅠ 안되서 다시 처음부터 해보고 있다.
 * 아 드디어 찾았다. kvm 옵션 끄니까 되네
 * 감격스러워서 스크린샷도 찍었다.
 * ![debug-linux](/wiki/images/debug_kernel-1.png)

#### qemu 실행 스크립트
```bash
qemu-system-x86_64 \
 -kernel ./linux-4.19.143/arch/x86_64/boot/bzImage \
 -append "console=ttyS0 root=/dev/sda rw debug nokaslr" \
 -hda buster.img \
 -net user,hostfwd=tcp::10021-:22 \
 -net nic \
 -nographic \
 -m 2G \
 -smp 2 \
 -s
```
* rw 옵션을 줘야지 안에서 실행 가능하다.

### vim 설정
*

## 책 따라하기
### 커널 디버깅과 코드 학습
* 처음에 ftrace를 소개하는데, 잘 작동이 안된다. 이것도 config를 잘못한거였다. menuconfig -> kernel hacking -> tracer 에서 설정해주고 다시 빌드하자.

### 프로세스
* x64 용으로 컴파일 해서 작업하고 있어서, 다른부분이 있다.
* 책 151쪽에서 여러 함수들에 filter를 거는데, 당연히도 안걸린다. 그런데 function 을 걸면 당연히 문제가 된다. 스크립트채로 따라쳐서 실행하지 말고, 한줄한줄 실행하고 동작하는지 확인하면서 작업했다.

#### 유저 레벨 프로세스 실행 실습
```bash
cat /sys/kernel/debug/tracing/available_filter_functions | grep sys_clone
```

* 이렇게 하면 `__x64_sys_clone` 이 나오는데 이걸 `sys_clone` 대신 넣어주자.
* 그렇게 해서 나온 스크립트는 아래와 같다.

```bash
#!/bin/bash

echo 0 > /sys/kernel/debug/tracing/tracing_on
sleep 1
echo "tracing_off"

echo 0 > /sys/kernel/debug/tracing/events/enable
sleep 1
echo "events disabled"

echo __x64_sys_clone do_exit > /sys/kernel/debug/tracing/set_ftrace_filter
sleep 1
echo "set_ftrace_filter init"

echo function > /sys/kernel/debug/tracing/current_tracer
sleep 1
echo "function tracer enabled"

echo __x64_sys_clone do_exit > /sys/kernel/debug/tracing/set_ftrace_filter
echo _do_fork copy_process* >> /sys/kernel/debug/tracing/set_ftrace_filter
sleep 1
echo "set_ftrace_filter enabled"

echo 1 > /sys/kernel/debug/tracing/events/sched/sched_switch/enable
echo 1 > /sys/kernel/debug/tracing/events/sched/sched_wakeup/enable
echo 1 > /sys/kernel/debug/tracing/events/sched/sched_process_fork/enable
echo 1 > /sys/kernel/debug/tracing/events/sched/sched_process_exit/enable

echo 1 > /sys/kernel/debug/tracing/events/signal/enable

sleep 1
echo "event enabled"

echo 1 > /sys/kernel/debug/tracing/options/func_stack_trace
echo 1 > /sys/kernel/debug/tracing/options/sym-offset
echo "function stack trace enabled"

echo 1 > /sys/kernel/debug/tracing/tracing_on
echo "tracing_on"
```
* 프로세스 생성 단계의 함수 흐름 : 책이랑 살짝 다른데 이건 cpu마다 다를듯?
```
copy_process.part.53+0x5/0x1d40
_do_fork+0xcf/0x3a0
__x64_sys_clone+0x27/0x30
do_syscall_64+0x55/0x110
```
* 프로세스 종료 단계의 함수 흐름
```
do_exit+0x5/0xbd0
do_group_exit+0x47/0xb0
get_signal+0xfe/0x7e0
do_signal+0x37/0x650
exit_to_usermode_loop+0x9b/0xb0
do_syscall_64+0x101/0x110
```

##### 프로세스 실행 흐름
1. 프로세스 생성
1. raspbian_proc 프로세스 실행
1. 프로세스 종료
1. 부모 프로세스에게 시그널 전달

##### 배운 내용
* 프로세스가 스스로 exit POSIX 시스템 콜을 호출하면 스스로 소멸할 수 있다.
* exit POSIX 시스템 콜에 대한 시스템 콜 핸들러는 sys_exit_group() 함수이다.
* 프로세스는 소멸되는 과정에서 부모 프로세스에게 SIGCHLD 시그널을 전달해 자신이 종료될 것이라고 통지한다.

#### 커널 스레드
* 커널 스레드는 커널 공간에서만 실행되며, 유저 공간과 상호작용하지 않습니다.
* 커널 스레드는 실행, 휴면 등 모든 동작을 커널에서 직접 제어 관리합니다.
* 대부분의 커널 스레드는 시스템이 부팅할 때 생성되고 시스템이 종료할 때까지 백그라운드로 실행됩니다.

##### 커널 스레드 생성 과정
1. kthreadd 프로세스에서 커널 스레드 생성을 요청
  * kthread_create()
  * kthread_create_on_node()
1. kthreadd 프로세스가 커널 스레드를 생성
  * kthreadd()
  * create_kthread()

##### 커널 내부 프로세스의 생성 과정 (_do_fork() 함수)
* 위에서 말한 대로 실제로 생성하는 곳은 kthreadd가 호출하는 create_kthread 인데, 이건 결국 _do_fork 를 호출한다.
* _do_fork 의 호출 과정
  1. 프로세스 생성 : copy_process() 함수를 호출해서 프로세스를 생성
  1. 생성한 프로세스의 실행 요청 : copy_process 함수를 호출해 프로세스를 만든 후, wake_up_new_task 함수를 호출

* copy_process() 함수를 호출해 프로세스를 생성
* wake_up_new_task() 함수를 호출해 생성한 프로세스를 깨움
* 생성한 프로세스 PID를 반환

##### copy_process 함수 분석
* dup_task_struct : task_struct 구조체와 프로세스가 실행될 스택 공간을 할당, 이후 새로운 구조체 주소를 반환
  * 책에서는 여기만 나와 있는데, memory 동적할당이 어떻게 되는지 궁금해서 확인해봤다.
  * 쭉쭉 따라가보면, alloc_task_struct_node -> kmem_cache_alloc_node -> kmem_cache_alloc ->slab_alloc 가 호출되는데, slab이 뭔지 몰라서 찾아봤다.
    * 참고 : https://lascrea.tistory.com/66
    * slab allocator라고 하며, 일종의 자원 할당자 중 하나로 4KB의 크기를 가진 Page로 데이터를 저장하고 관리할 경우 발생하는 단편화를 최소화 하기 위해 만들어졌다.
    * 리눅스 커널은 slab을 사용하고 있으며 /proc/meminfo에서 리눅스 커널이 사용하는 cache 크기를 의미한다.
    * 리눅스 커널에서 커널과 디바이스 드라이버, 파일시스템 등은 영구적이지 않은 데이터(inode, task 구조체, 장치 구조체 등)들을 저장하기 위한 공간이 필요한데 이것이 slab에 관리된다.
* 그리고 기본적인 자원들(메모리, 파일 등)을 복사한다.
```c
 /* copy all the process information */
 shm_init_task(p);
 retval = security_task_alloc(p, clone_flags);
 if (retval)
   goto bad_fork_cleanup_audit;
 retval = copy_semundo(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_security;
 retval = copy_files(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_semundo;
 retval = copy_fs(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_files;
 retval = copy_sighand(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_fs;
 retval = copy_signal(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_sighand;
 retval = copy_mm(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_signal;
 retval = copy_namespaces(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_mm;
 retval = copy_io(clone_flags, p);
 if (retval)
   goto bad_fork_cleanup_namespaces;
 retval = copy_thread_tls(clone_flags, stack_start, stack_size, p, tls);
```
##### wake_up_new_task()
* 프로세스 상태를 TASK_RUNNING으로 변경
* 현재 실행 중인 CPU 번호를 thread_info 구조체의 cpu 필드에 저장 (CONFIG_SMP 값이 켜져 있을때)
* 런큐에 프로세스를 큐잉

#### 프로세스의 종료 과정 분석
* 프로세스가 죽는 두가지 흐름
  * 유저 애플리케이션에서 exit() 함수를 호출할 때
  * 종료 시그널을 전달받을 때
* 이번에는 책 보기 전에 ftrace 결과에 나오는 함수들 다 찾아보자.
  * `kernel/exit.c`
    ```c
    SYSCALL_DEFINE1(exit_group, int, error_code)
    {
      do_group_exit((error_code & 0xff) << 8);
      /* NOTREACHED */
      return 0;
    }
    ```
  * `kernel/signal.c`
    ```c
    bool get_signal(struct ksignal *ksig)
    {
    /* skip */
        /*
         * Death signals, no core dump.
         */
        do_group_exit(ksig->info.si_signo);
        /* NOTREACHED */
      }
      spin_unlock_irq(&sighand->siglock);

      ksig->sig = signr;
      return ksig->sig > 0;
    }
   ```
  * 이거 이외에도 `fpu.c`, `seccomp.c` 에 있는데, 이건 찾아보니까 fpu 에서 에러가 나서 죽일때랑, [[seccomp]]에서 강제로 죽일때 호출. 일반적으로 죽는 경우는 아니니, 위에 2가지만이 do_group_exit를 호출한다라고 알수 있다.

* do_exit() 함수의 동작 방식 확인
  1. init 프로세스가 종료하면 강제 커널 패닉 유발 : 보통 부팅 과정에서 발생함
  2. 이미 프로세스가 do_exit() 함수의 실행으로 프로세스가 종료되는 도중 다시 do_exit() 함수가 호출됐는지 점검
  3. 프로세스 리소스(파일 디스크립터, 가상 메모리, 시그널) 등을 해제
  4. 부모 프로세스에게 자신이 종료되고 있다고 알림
  5. 프로세스의 실행 상태를 task_struct 구조체의 state 필드에 TASK_DEAD로 설정
  6. do_task_dead() 함수에 호출해 스케줄링을 실행, do_task_dead() 함수에서 __schedule() 함수가 호출되어 프로세스 자료구조인 태스크 디스크립터와 스택 메모리를 해제

* do_task_daed() 함수를 호출하고 난 후의 동작
  * __schedule() 함수
  * context_switch() 함수
  * finish_task_switch() 함수

##### 태스크 디스크립터(task_struct 구조체)
* 프로세스를 식별하는 필드
  * comm : 프로세스 이름
  * pid : 프로세스 id
  * tgid : task_group id, 만약 thread가 leader 인 경우, tgid == pid
* 프로세스 상태 저장
  * state: 프로세스 실행 상태
    * TASK_RUNNING : CPU에서 실행 중이거나 런큐에서 대기 상태에 있음
    * TASK_INTERRUPTIBLE : 휴면 상태
    * TASK_UNINTERRUPTIBLE : 특정 조건에서 깨어나기 위해 휴면 상태로 진입한 상태
  * flags: 프로세스 세부 동작 상태와 속성 정보
    * PF_IDLE : 자신이 IDLE thread 임을 나타내는 flag
    * PF_EXITING : 종료되는 중
    * PF_EXITPIDONE : 종료 됨
    * PF_WQ_WORKER : 워커 쓰레드
    * PF_KTHREAD : 커널 스레드
* 프로세스 간의 관계
 * real_parent : 자신을 생성한 부모 프로세스의 태스크 디스크립터 주소를 저장
 * parent : 부모 프로세스의 태스크 디스크립터 주소를 담고 있음.
 * children : 자식 프로세스 리스트
 * sibiling : 형제 프로세스 리스트
* 프로세스 실행 시각 정보
 * utime : 유저 모드에서 프로세스가 실행한 시각 (account_user_time)
 * stime : 커널 모드에서 프로세스가 실행한 시각 (account_system_index_time)
 * sched_info.last_arrival :  프로세스가 CPU에서 실행된 시각 (context_switch -> prepare_task_switch -> sched_info_switch -> __sched_info_switch -> sched_info_arrive)

##### 스레드 정보 : thread_info 구조체
* 선점 스케줄링 실행 여부
* 시그널 전달 여부
* 인터럽트 컨텍스트와 Soft IRQ 컨텍스트 상태
* 휴면 상태로 진입하기 직전 레지스터 세트를 로딩 및 백업
```c
struct thread_info {
  struct task_struct	*task;		/* main task structure */
  unsigned long		flags;		/* low level flags */
  __u32			cpu;		/* current CPU */
  __s32			preempt_count; /* 0 => preemptable, <0 => BUG */

  mm_segment_t		addr_limit; /* thread address space:
                                 0-0x7FFFFFFF for user-thead
                                 0-0xFFFFFFFF for kernel-thread
                               */
  __u8			supervisor_stack[0];

/* saved context data */
unsigned long           ksp;
};
#endif
```

* preempt_count 가 바뀌는 조건
  * 인터럽트 컨텍스트 실행 시작 및 종료 설정
  * Soft IRQ 컨텍스트 실행 시작 및 종료 설정
  * 프로세스 선점 스케줄링 가능 여부

##### cpu 필드에 대한 상세 분석
 * sm_processor_id()
 * set_task_cpu()

##### thread_info 구조체 초기화 코드 분석
 * dup_task_struct()
 * setup_thread_stack(tsk, orig);
 * alloc_task_struct_node()
 * alloc_thread_stack_node()

##### 프로세스의 태스크 디스크립터에 접근하는 매크로 함수
 * current : 현재 구동 중인 프로세스의 태스크 디스크립터 주소
 * arch/x86/include/asm/current.h
 ```c
  DECLARE_PER_CPU(struct task_struct *, current_task);
  static __always_inline struct task_struct *get_current(void)
  {
    return this_cpu_read_stable(current_task);
  }

  #define current get_current()
 ```
 * 보면은, cpu 마다 task_struct를 선언하는데, 이 변수 명은 current_task 인데, arch/x86/kernel/process_64.c 에 있는 `__switch_to()`에서
 ```c
  this_cpu_write(current_task, next_p);
  this_cpu_write(cpu_current_top_of_stack, task_top_of_stack(next_p));

  /* Reload sp0. */
  update_task_stack(next_p);

  switch_to_extra(prev_p, next_p);
 ```
 * 이렇게 매번 task가 전환 될때 cpu 별로 따로 넣어준다. 이때마다, update_task_stack를 호출해주면서 stack을 설정한다.

##### 프로세스 디버깅
 * 사용하는 명령어 : layout asm
 * 내용 정리
   * 리눅스 유틸리티 프로그램을 실행할 때 프로세스는 fork()와 execve() 시스템 콜 함수를 호출한다.
   * ftrce의 sched_process_exec 이벤트로 리눅스 유틸리티 프로그램의 파일 위치를 알 수 있다.
   * 리눅스 유틸리티 프로그램을 종료할 때의 프로세스는 exit() 시스템 콜 함수를 호출한다.

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
