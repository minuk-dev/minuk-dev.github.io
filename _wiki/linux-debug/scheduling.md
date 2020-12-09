---
layout  : wiki
title   : linux-debug/scheduling
date    : 2020-12-09 13:30:45 +0900
lastmod : 2020-12-09 14:47:12 +0900
tags    : [linux]
parent  : linux-debug
---

## 주요 키워드
 * scheduling : 실행 대기 중인 프로세스 중에서 우선순위가 가장 높은 프로세스를 선택해 CPU에서 실행시킴
   * Preemptive Scheduling : 강제로 CPU에서 실행 중인 프로세스를 비우고 새로운 프로세스 실행
   * Non-Preemptive Scheduling : 프로세스가 자발적으로 스케줄링 요청
 * context-switching : cpu에서 실행 중인 프로세스의 레지스터 세트를 비우고 새로운 프로세스 레지스터 세트를 채우는 동작, 아키텍쳐마다 구현 방식이 다름
 * scheduling policy : 스케쥴링 시 어떤 방식과 규칙으로 다음에 실행할 프로세스를 선택할지 결정
 * scheduler class : 5가지 커널 스케쥴러 세부동작을 모듈화한 자료구조 이자 인터페이스, 프로세스는 스케쥴러 클레스를 우선순위에 따라 선택할 수 있음
 * run queue : 실행 대기 중인 프로세스를 관리하는 자료구조, percpu 타입 변수
 * proirity : 유저 공간에서 설정한 nice와 커널 우선순위가 존재

### 선점 스케쥴링과 비선점 스케쥴링 비교
 * Preemptive Scheduling
   * 실행 중인 프로세스를 강제로 CPU에서 실행 중지
   * 새로운 프로세스가 CPU에서 실행
   * 선점 스케쥴링 시작점
     * 인터럽트 핸들러를 처리하고 난 후 인터럽트가 발생하기 전에 코드로 되돌아가기 직전
     * 시스템 콜의 핸들러 함수를 처리하고 난 후 유저 공간으로 복귀하기 직전
 * 비선점 스케쥴링
   * 프로세스가 자발적으로 스케줄링 요청
   * 비선점 스케줄링 시작점
     * 입출력(I/O) 동작을 시작할 때
     * 뮤텍스를 획득하지 못하고 휴먼 상태에 진입할 때

## 스케줄링 정책
 ```c
 #define SCHED_NORMAL    0
 #define SCHED_FIFO      1
 #define SCHED_RR        2
 #define SCHED_BATCH     3
 #define SCHED_IDLE      5
 #define SCHED_DEADLINE  6
 ```

### 스케줄러 클래스
 * stop 스케줄러
   * [참고- 문C 블로그](http://jake.dothome.co.kr/stop-sched/)
   * 어떠한 스케줄러보다 우선 순위가 더 높아 preemption 되지 않으며, 다른 cpu로 migration도 허용되지 않다. 모든 요청에 대해 대부분 거절하거나 아무런 일도 하지 않는다.
 * deadline 스케줄러
   * [참고- 문C 블로그](http://jake.dothome.co.kr/dl-scheduler/)
   * 2013년 3월 Kernel v3.14에서 소개
   * EDF + CBS 알고리즘 기반
     * EDF(Earliest Deadline First)
       * 작업이 N 개일때 복잡도는 O(n^2) 로 알려져 있으며, 수학적으로 최적이라는 것이 증명되어 있지만, 현실적으로 프로세스의 마감시간을 예측하는 것이 어렵다.
       * 예시 : P1이 수행시간이 1, 주기가 8, P2가 수행시간이 2, 주기가 5, P3가 수행시간이 4, 주기가 10이고, 1단위 시간이 10ms 일때 CPU 사용량은 1/8 + 2/5 + 4/10 = 0.925이기에 스케줄링이 가능하다고 판단하며 스케줄링한다.
     * CBS(Constatn Bandwidth Server)
       * 자료가 안나오길래 아래 적어둔 논문 기반으로 정보를 적는다.
       * 논문 : Intergrating multimedia applications in hard real-time systems
       * 1998년도에 소개된 예약기반(reservation-based) 스케줄링 알고리즘
       * $$\text{ a budget } c_s \text{ and by a ordered pair } (Q_s, T_s), \text{ where } Q_s \text{ is the maximum budget and } T_s \text{ is the period of the server }$$
       * $$\text{ server bandwidth } U_s = Q_s / T_s$$
       * $$\text{ At each instant, a fixed deadline } d_{s, k}$$
       * $$\text{ Initially, } d_{s, 0} = 0$$
       * 각 작업들은 동적인 마감시간(deadline)을 가지고 있고 이는 초기에는 현제 서버의 마감시간과 동일하게 된다.
       * 작업들이 실행되면 그와 같은 양이 예산에서 빠지며, 예산이 0이 됬을 때 서버의 최대 예산인 Q_s를 다시 채우고, 새로운 서버 마감시간이 생기게된다. 이 때 새로운 마감시간은 T_s만큼 더한것이다. \\(d_{s, k + 1} = d_{s, k} + T_s \\)
       * 흐으으음... 이 이상 자세히 적을 필요는 없을 듯, 그냥 대충 예산 개념이 존재해서 스케줄링 한다? 정도까지만 정리함. 사실상 정리하면 그냥 논문 번역이 될듯
   * 처음에는 UP 시스템용으로 구현되었다가 SMP 시스템에서도 채용함. 각 cpu의 earliest deadline을 관리하고 다른 CPU로 전달하여 효과적으로 스케줄링한다.
   * 상당히 최신에 추가된 내용이며, 2017년에도 새 버전의 deadline 스케줄러가 소개됬다고 한다.
   * Stop 스케줄러 바로 다음의 우선순위를 가짐

 * RT 스케줄러
   * stop - deadline 다음 순서의 우선순위를 가지고 있다.
   * rt 런큐는 CPU 수만큼 생성된다.

 * CFS 스케줄러
   * [참고](https://goodgid.github.io/Scheduler-CFS/)
   * rb 데이터 구조를 사용하며 O(logN) 성능을 가지는 스케줄러
   * 특징
     * 공평한 CPU 시간
     * 가상 런타임
     * 대기자 공평성
     * RB-트리
 * Idle 스케줄러
   * [참고- 문C 블로그](http://jake.dothome.co.kr/idle-sched/)
   * 어떠한 스케줄러보다 우선순위가 낮다.
   * core 마다 1개씩 지정되어 있어 다른 cpu로의 migration이 필요 없다.

### 런큐
 * 실행 대기상태 프로세스와 CPU에서 실행 중인 프로세스를 관리하는 자료구조

### 우선순위(nice)
 * -20 ~ 19의 값을 가지며 커널공간에서 100 ~ 139 범위 값으로 변환되어 관리된다.(0 ~ 99 는 RT)
 * RT(Real-Time) 프로세스의 우선순위 범위
   * 0 ~ 99 사이의 우선순위를 가짐
   * SCHED_FIFO 이며, 우선순위가 더 높은 RT 프로세스가 없으면 계속 CPU를 점유해 사용한다.

## 프로세스 상태 관리
```c
#define TASK_RUNNING          0x0000
#define TASK_INTERRUPTIBLE    0x0001
#define TASK_UNINTERRUPTIBLE  0x0002
#define __TASK_STOPPED        0x0004
#define __TASK_TRACED         0x0008
```

### 프로세스 상태
 * TASK_RUNNING : 실행대기
   * 프로세스가 런큐에 삽입된 후 실행을 기다리는 상태
   * 스케줄러는 TASK_RUNNING(실행 대기)상태에 있는 프로세스 중에서 CPU에서 실행할 프로세스를 선택
 * TASK_RUNNING : CPU 실행
   * 프로세스가 CPU에서 실행 중인 상태
   * CPU 레지스터 세트에는 현재 실행 중인 프로세스의 상태 정보로 채워짐
 * TASK_INTERRUPTIBLE
   * 프로세스가 휴면 상태에 진입한 상태
   * 프로세스를 깨우면 다시 TASK_RUNNING(실행 대기) 상태로 변경됨
 * TASK_UNINTERRUPTIBLE
   * 프로세스가 특정 조건으로 깨워나고 싶을 때 설정하는 상태
   * 보통 스스로 깨어날 조건을 설정한 다음에 TASK_UNINTERRUPTIBLE 상태로 변경
   * 뮤텍스를 얻지 못하거나 입출력(I/O) 동작 중에 TASK_UNINTERRUPTIBLE 상태로 변경
