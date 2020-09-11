---
layout  : wiki
title   : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리
summary : 
date    : 2020-09-08 22:14:21 +0900
lastmod : 2020-09-11 23:49:36 +0900
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
