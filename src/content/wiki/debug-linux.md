---
layout  : wiki
title   : 디버깅을 통해 배우는 리눅스 커널의 구조와 원리
summary : 
date    : 2020-09-08 22:14:21 +0900
lastmod : 2020-09-08 22:52:14 +0900
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

### 이미지 다운로드 및 소스코드 다운로드
#### 리눅스 커널 소스코드 다운로드 (책 참고)
```bash
git clone https://github.com/raspberrypi/linux --depth=1
```
#### ~~라즈베리파이 이미지 다운로드~~
```bash
wget https://downloads.raspberrypi.org/raspios_liute_armhf_latest
```
* 이렇게 다운로드 하면 다운로드 파일 이름이 조금 다른데, 그건 알아서 .img를 붙여서 바꿔주자, 위에 명령어를 처음부터 잘써서 파일명을 다운해도 된다.
* 하고 나서 알았는데, 어짜피 이미지를 우리가 만들꺼라, 다운 안해도 된다. 그냥 책따라하보니 그런듯, 책에서 이미지를 다운한 이유는 라즈베리파이를 굽기 위해서고, 우리는 qemu이니 버리자.
 
#### qemu 설치(뇌피셜)
```bash
sudo apt install qemu qemu-system-x86
```
* 아마도 이렇게 하면 될것이다, 사실 qemu는 pintos 공부하면서 이미 설치를 다 해놔서...

#### kernel build(1, 2, 3, 4번 참고)
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
여기서부터 해야함. 빌드되는데 한참이라 그냥 여기까지만 해놓고 끔
#### 이미지 굽기
```
wget https://github.com/google/syzkaller/blob/master/tools/create-image.sh 
```
해서 create-image.sh 실행해주자
