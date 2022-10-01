---
layout  : wiki
title   : cs 기본
date    : 2022-09-28 17:27:10 +0900
lastmod : 2022-09-30 19:46:40 +0900
tags    : [cs]
draft   : false
parent  : study-note
---

## 정리 동기
- 적으면서 공부하려고
- [출처](https://github.com/WooVictory/Ready-For-Tech-Interview)


## Algorithm
### Selection Sort
- Unstable sort
- O(N^2)
- 단순한 알고리즘
- 적은 교환 횟수
- 추가 메모리 공간 필요 없음

```java
private static void sort(int[] arr) {
  for (int i = 0; i < arr.length; i ++) {
    int standard = i;
    for (int j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[standard])
        standard = j;
    }

    int temp = arr[standard];
    arr[standard] = arr[i];
    arr[i] = temp;
  }
}
```

### Bubble Sort

- 구현이 단순
- 이미 정렬된 데이터를 정렬할때, 가장 빠르다.
- 배열 안에서 정렬하는 방식으로 다른 메모리 공간 필요 없음.
- stable sort
- O(n^2)
- 교환 횟수가 많다.
- 역순 정렬시 가장 느림.

```java
private static void sort(int[] arr) {
  for (int i = 0; i < arr.length; i ++) {
    for (int j = 0; j < arr.length - i - 1; j ++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}
```

### Merge Sort
- Stable stort
- 추가 메모리가 필요하다.
- 데이터 분포에 영향을 덜 받는다.
- LinkedList 에서 효율적이다.
- O(nlgn)

```java
private static void mergeSort(int[] a, int left, int right) {
  if (left < right) {
    int mid = (left + right) / 2;
    mergeSort(a, left, mid);
    mergeSort(a, mid + 1, right);
    merge(a, left, mid, right);
  }
}

private static void merge(int[] a, int left, int mid, int right) {
  int i, j, k;
  i = left;
  j = (mid + 1);
  k = 0;
  int[] sorted = new(int[], right - left + 1);
  while (i <= mid && j <= right) {
    if (a[i] < a[j]) sorted[k++] = a[i++];
    else sorted[k++] = a[j++];
  }
  while (i <= mid) {
    sorted[k++] = a[i++];
  }
  while (j <= right) {
    sorted[k++] = a[j++];
  }
  for (k = 0; i < right - left + 1; i ++) {
    a[left + k] = sorted[k];
  }
}
```

### Insertion Sort
- O(n^2) (평균, 최악), O(n) (최선)
- 추가 공간 필요 없음.
- 단순한 알고리즘
- 이미 정렬되어있는 경우 효율적

```java
private static void sort(int[] arr) {
  for (int i = 1; i < arr.length; i ++) {
    int standard = arr[i];
    int idx = i - 1;
    while (0 <= idx && standard < arr[idx]) {
      arr[idx + 1] = arr[idx];
      idx --;
    }
    arr[idx + 1] = standard;
  }
}
```

### Quick Sort
- Unstable sort
- 평균적으로 가장 빠른 구현
- 피벗 선정하는게 중요

```java
private static void quickSort(int[] arr, int left, int right) {
  int L = left;
  int R = right;
  int pivot = arr[(left + right) / 2];
  while (L <= R) {
    while (arr[L] < pivot) L ++;
    while (pivot < arr[R]) R --;
    if (L <= R) {
      if (L != R) {
        swap(arr, L, R);
      }
      L ++;
      R --;
    }
    if (left < R) quickSort(arr, left, R);
    if (L < right) quickSort(arr, L, right);
  }
}
```

### Heap Sort

```java
private static void heapSort(int[] arr) {
  int n = arr.length;
  for (int i = (n / 2) - 1; i >= 0; i --) {
    heapify(arr, n, i);
  }
  for (int i = n - 1; i > 0; i --) {
    swap(arr, 0, i);
    heapify(arr, i, 0);
  }
}

private static void heapify(int[] arr, int n, int i) {
  int p = i;
  int l = i * 2 + 1;
  int r = i * 2 + 2;
  if (l < n && arr[p] < arr[l]) p = l;
  if (r < n && arr[p] < arr[r]) p = r;
  if (i != p) {
    swap(arr, p, i);
    heapify(arr, n, p);
  }
}
```

### LRU Cache (Least Recently Used)
- 가장 오랫동안 사용하지 않은 페이지를 교체하는 알고리즘
- 자세한건 Demand Paging (페이지 요청 기법) 참고


## Operating System
### 프로세스, 쓰레드
- Process:
  - 실행 중인 프로그램, CPU 할당을 받는 작업의 단위
  - 운영체제로부터 시스템 자원을 할당받는다.
  - 할당받는 시스템 자원:
    - CPU Time, Memory Address Space, (Code, Data, Stack, Heap)
  - 기본적으로 프로세스당 최소 1개의 쓰레드 존재
  - 프로세스 간 통신을 위해서는 IPC 통신이 필요하다.:
    - Pipe, Socket, File, Shared Memory
- PCB (Process Control Block):
  - 특정 프로세스에 대한 중요한 정보를 저장하고 있는 커널 내의 자료구조
  - 프로세스의 생성과 동시에 고유한 PCB 생성
  - 프로세스는 CPU를 할당 받아 작업을 처리하다가 Context Switch 시에 PCB에 진행 사항을 저장하고, 다시 실행될때 불러온다.
  - PCB 내부에 저장되는 정보:
    - PID, Status (New, Ready, Running, Waiting, Terminated), PC (Program Counter), Registers, Scheduling Info, IO info, Accounting info (recent cpu time etc)

- Thread:
  - 프로세스의 실행 단위
  - 프로세스 내부의 쓰레드끼리는 서로 주소 공간과 자원을 공유할 수 있다.
  - Thread 는 Stack 영역을 별도로 가진다.
  - 쓰레드는 별도의 레지스터와 스택을 가지고 있다.

### Multi Process vs Multi Thread
- Multi Process:
  - 안정성 (하나가 죽어도 다 죽지는 않음)
  - Context Switching Overhead:
    - 이건 참고 사이트랑 살짝 의견이 다르긴 한데, 사실상 표준인 Linux Kernel 같은 경우 Process 와 Thread가 크게 차이가 없는 걸로 안다. 물론 당연히 Heap 영역이 Cache Hit rate 에 영향이 있을테니 Process 가 약간 느리긴 하다.
  - IPC: 코딩이 난해함. (`/dev/shm`, `/dev/mqueue`, ipc 에 대한 이해가 필요하다.):
    - IPC 종류:
      - Pipe, Named Pipe, Message Queue, Shared Memory, Memory Map, Socket
    - 좀 공부해봤는데 IPC namespace 를 공유하면 `/proc/sys/fs/mqueue` (POSIX message queue), `/proc/sys/kernel` 내의 System V IPC interface, `/proc/sysvipc` 를 공유해준다. (이건 지금 코딩하고 있는 거 때문에 좀 더 상세히 봄)
- Multi Thread:
  - 메모리 공간 및 자원 소모가 상대적으로 적다.
  - Context switching 시 cache memory 에서 이득을 보게 된다.
  - Concurrency Issue에 관련되어 주의가 필요하며 동기화 이슈가 있다.

- ~~쓰레드 생성은 프로세스 생성에 비해 시스템 콜이 줄어들어 자원을 효율적으로 관리할수 있다.~~ 라고 나와있긴 한데, 이건 항상 맞는 소리는 아니다.:
  - [참고자료](https://stackoverflow.com/questions/9477753/linux-system-call-for-creating-process-and-thread)
  - 일단 시스템 콜 자체는 생성 시점에서는 똑같다. 심지어 생성 속도도 비슷한다. lazy 하게 memory 공간이 copy 되기 때문인데 자세한건 mmu 레벨까지 가야해서 여기에다가 적기는 좀 그렇고 대충 쓰기 protect 걸고, 쓰기 요청때 copy 하는 copy-on-write 를 사용한다고만 이해하면 된다.
  - 물론 실제로 copy-on-write 하면 첫 쓰기 요청때 느리긴 하다.
  - 자원은 Thread 가 더 효율적으로 관리할 가능성이 큰데, Process 가 할당 받은 Page 내부에 사용 안하는 공간이 있을 가능성이 있기 때문이다.
  - 뭐 이것도, Thread가 메모리 사용을 할때 Process Memory Pool 에서 가져다가 한다는 게 있어야 하긴 하는데, 조금만 신경써서 코딩하면 (혹은 라이브러리를 사용하면) 그리 어려운 일은 아니다. 반면 프로세스에서 이건 지옥이다. 공유 메모리에서 이짓거리를 해야하니

- 참고자료에서 이것저것 옛날 내용이 많고, 조금 과거 이론이 많아서 대충 좀 버린다.
- Reentrant:
  - 재진입성 : 여러 쓰레드가 동시에 접근해도 언제나 같은 실행 결과를 보장한다
  - 일반적으로 재진입성을 만족시키기 위해서는 호출된 매개변수만으로 동작해야한다.:
    - 뭐 조금만 생각해보면, 공유자원이 있더라도 공유자원을 초기 상태로 만들고 함수를 종료한다. 라는게 보장되도 가능하다.

### 동기화 문제
- 실행 순서의 동기화:
  - 여러개의 쓰레드들이 순서가 있는 경우
  - 예시 : IO intensive 한 작업과 CPU intensive 한 작업이 있고, CPU intensive 한게 먼저 반환 되어야할때, Thread 로 분리하여 동시 작업하고 동기화 해준다.:
    - 생각보다 유사한 상황이 많이 나올수 있다.
    - 오래걸리는 암호화와 파일 읽기가 예시로 있을 수 있다.
    - timing attack 과 같은 보안적 요소를 고려하는 것, 어짜피 동일한 request 가 많다면, 각 요청이 서로 다른 step 단계에 있어서 단일 쓰레드로 하는게 이득일수 있긴하지만 고려해볼만 요소이다.

- 유저 모드 동기화:
  - 커널의 도움 없이 하는 방법
  - ?? 이게 있어?
  - violate 로 busy wait 하는 방법 ?? 이게 효율적일까? IoT 할때나 좀 써보고 그 이외에서는 안써봤는데 걍 커널 도움 받는게 맞지 않나? 그냥 busy wait 안하고 sleep 호출하는 구조로 해도 system call 이득도 없어져서 손해인데
- 커널모드 동기화:
  - Semaphore, Mutex, Lock

### Context Switching
- Context Switching 의 비용:
  - Cache 초기화
  - Memory mapping 초기화
  - user mode 와 kernel 모드 전환

### Interrupt
- Hardware Interrupt
- Software Intterupt:
  - Exception
  - System call
- Interrupt Handling Process:
  - Interrupt Vector : 여러가지 인터럽트에 대해 해당 인터럽트 발생시 처리해야 할 루틴의 주소를 보관하고 있는 테이블

### Deadlock
- Deadlock 발생 조건:
  - Mutual Exclusion
  - Hold and Wait
  - No Preemption
  - Circular Wait
- Deadlock 처리 방법:
  - Prevention
  - Avoidance
  - Recovery
  - Detection

### CPU Scheduling
- Preemptive vs Non-Preemptive:
  - Preemptive (선점) : 중간에 뻇기 가능
  - Non-Preemptive (비선점) : 아무도 못뺏음

- Preemptive Scheduling Algorithm:
  - SRT(Shortest Remaining Time) Scheduling:
    - 이론적인 방법, 어떠한 작업이 얼마나 뒤에 끝날지 계산이 어려움
  - Roud Robin Scheduling:
    - 공평한 것 같지만, 실효성이 없음. 늦어도 되는 작업을 뒤로 미루지 못함.
  - Multi-level Queue:
    - 합리적인 것 같지만 동적으로 할당이 어려움. 특정 큐에 Starvation이 날수 있음
  - Multi-level feedback Queue:
    - 현재 가장 널리 채택되는 방법

- Non-Preemptive Scheduling Algorithm:
  - FCFS(First Come First Server)
  - SJF(Shortest-Job-First)

### Scheduler
- Long-term Scheduler
- Short-term Scheduler : Dispatcher
- Medium-term Scheduler

- 찾아보면 각자 다 달라서 굳이 설명은 안 적어둔다.

### Paging vs Segmentation
- 가상 메모리를 관리하는 기법
- 페이징(Paging):
  - 프로세스의 주소 공간을 동일한(공정된) 사이즈의 페이지 단위로 나누어 물리적 메모리에 불연속적으로 저장하는 방식
  - 외부 단편화와 압축 작업을 해소하기 위함이다.
  - 메모리는 Frame 이라는 고정 크기로 분할되고, 프로세스는 Page라 불리는 고정 크기로 분할된다.
  - MMU 를 통해서 Logical Address 를 Physical Address 로 바꾼다.
- 세그멘테이션(Segmentation):
  - 프로세스를 서로 크기가 다른 논리적인 블록 단위인 세그먼트로 분할하고 메모리에 배치하는 것을 말하며, 각 세그먼트의 크기는 일정하지 않다.

### 페이지 교체 알고리즘
- 가상 메모리는 요구 페이징 기법을 통해 필요한 페이지만 메모리에 적재하고 사용하지 않는 부분은 그대로 둔다.
- 메모리가 가득차면, 추가로 페이지를 가져오기 위해서 안쓰는 페이지는 outgㅏ고 해당 공간에 현재 필요한 페이지를 in 시켜야한다.


## Compiler
### Lexical Analyzer
- Token
- Lexeme : Token 의 Pattern을 만족하는 문자열
- Pattern : Token 을 정의하는 rule
### Syntax Analyzer
- Chomsky hierarchy:
  - recursively enumerable > context-sensitive > context-free > regular
### Semantic Analyzer
### Immediate Code Generator
### Code Optimizer
### Code Generator


## Design Pattern
### 디자인 패턴 구조
- Context: 문제가 발생하는 상황을 기술한다.
- Problem: 패턴이 적용해어 해결될 필요가 있는 여러 디자인 이슈 기술
- Solution : 관계, 책임, 협력 관계를 기술한다.

### 디자인 패턴 종류
- Creational Pattern:
  - Abstract Factory : 구체적인 클래스에 의존하지 않고 서로 여관되거나 의존적인 객체들의 조합을 만드는 인터페이스를 제공
  - Builder
  - Factory Method
  - Prototype
  - Singleton
- Structural Pattern:
  - Adapter
  - Bridge
  - Composite
  - Decorator
  - Facade
  - Flyweight
  - Proxy
- Behavioral Pattern:
  - Chain of Reponsibility
  - Command
  - Interpreter
  - Iterator
  - Mediator
  - Memonto
  - Observer
  - State
  - Strategy
  - Template Method
  - Visitor
