---
layout  : wiki
title   : assembly
summary : 어셈블리 문법 및 배경지식
date    : 2020-11-03 20:28:40 +0900
lastmod : 2020-11-03 20:44:40 +0900
tags    : [assembly]
draft   : false
parent  :
---

## 인라인 어셈블리 문법
 * (출처)[https://wiki.kldp.org/KoreanDoc/html/EmbeddedKernel-KLDP/app3.basic.html]
 * `__asm__` : inline assembly 임을 명시
 * `__volatile__` : c언어의 volatile 과 동일, 컴파일러의 최적화를 조심해야할때 고려
 * 기본구조 : `__asm__ __volatile__ (asms : output : input : clobber)`
   * asms : 어셈블리 코드
   * output : 변수들을 적어 주고, 각각은 쉼표로 구분
   * input : output과 같은 방식으로 사용
   * clobber : output, input에는 명시하지 않지만, asms로 값이 변하는 것들을 적어야 한다.
 * 예제 코드
   ```c
   static __inline int test_and_set_bit(int nr, volatile void * addr)
   {
     int oldbit;

     __asm__ __volatile__( LOCKPREFIX
       "btsl %2, %1\n\tssbl %0,%0"
       :"=r" (oldbit), "=m" (ADDR)
       :"Ir" (nr) : "memory");
     return oldbit;
   }
   ```
   * 위를 해석하면 `LOCKPREFIX` 는 매크로로 lock; 명령어가 있다고 생각하고, 아래와 동일
   ```assembly
   lock
   btsl nr, *addr
   sbbl oldbit
   ```
