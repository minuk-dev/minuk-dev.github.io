---
layout  : wiki
title   : seccomp
summary : 
date    : 2020-09-13 19:37:24 +0900
lastmod : 2020-09-13 19:41:58 +0900
tags    : [linux, seccomp]
draft   : false
parent  : linux
---

## seccomp (secure computing mode)
 * 참고 : https://ko.wikipedia.org/wiki/Seccomp, https://ssup2.github.io/theory_analysis/Linux_seccomp/

 * system call filtering 기법
 * strict 와 filter 모드가 존재
 * strict 모드에서는 일부 시스템 콜만 허용(read, write, exit, sigreturn), 이외에 호출하면 SIGKILL 이 발생해서 죽음.
 * filter 모드에서는 각 system call 별로 수행 동작을 설정 가능.
