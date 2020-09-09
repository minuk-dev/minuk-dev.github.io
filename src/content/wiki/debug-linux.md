---
layout  : wiki
title   : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리
summary : 
date    : 2020-09-08 22:14:21 +0900
lastmod : 2020-09-09 23:55:49 +0900
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
make kvmconfig
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
