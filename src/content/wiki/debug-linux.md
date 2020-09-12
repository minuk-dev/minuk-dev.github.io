---
layout  : wiki
title   : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리
summary : 
date    : 2020-09-08 22:14:21 +0900
lastmod : 2020-09-12 20:56:25 +0900
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
