---
layout  : wiki
title   : workqueue
summary : 
date    : 2020-06-15 20:14:50 +0900
lastmod : 2020-06-21 19:52:40 +0900
tags    : [linux, workqueue]
draft   : false
parent  : 
---

## 참조 사이트
 * https://m.blog.naver.com/PostView.nhn?blogId=leojesus&logNo=80172478497&proxyReferer=https:%2F%2Fwww.google.com%2F
 * workqueue 사용법 : https://selfish-developer.com/entry/workqueue-%EC%82%AC%EC%9A%A9%EB%B2%95
## workqueue
 * 지연처리를 하기 위해서 사용하는 자료구조 (다른 걸로는 SOFTIRQ, TASKLET 이 있음)

## 사용방법
 * 출처 1: http://egloos.zum.com/rousalome/v/9982311
 * 출처 2: http://egloos.zum.com/rousalome/v/9982570
 * `INIT_WORK()` 나 `DECLARE_WORK()`를 사용해서 초기화
   * `INIT_WORK()` : 커널이 실제로 `INIT_WORK()` 함수를 실행할때 워크를 초기화
   * `DELCARE_WORK()` : 커널이 컴파일 될때 세부정보가 포함된 전역 변수 생성
```c
INIT_WORK(&work, handler);

schedule_work(&work); /* enqueue work into system queue */
queue_work(&workqueue, &work) /* enqueue work */
queue_work_on(cpu, &workqueue, &work) /* enqueue work with exception handling */
```

## 같이보기 좋은 자료
 * [[delayed_work]]
