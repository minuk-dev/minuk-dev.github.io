---
layout  : wiki
title   : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리
date    : 2020-09-08 22:14:21 +0900
lastmod : 2020-10-15 20:25:17 +0900
tags    : [linux]
draft   : false
parent  : Book reviews
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
