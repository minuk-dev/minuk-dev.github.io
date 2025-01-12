---
layout  : wiki
title   : delayed work
summary : 
date    : 2020-06-21 19:42:23 +0900
lastmod : 2020-06-21 19:47:46 +0900
tags    : [linux, delayed_work]
draft   : false
parent  : 
---

## 참조 사이트
 * http://egloos.zum.com/rousalome/v/9990982
## delayed work
 * 일정 시간 뒤에 지연시켜서 워크를 실행하는 방법

## 사용방법
 * 출처 : http://egloos.zum.com/rousalome/v/9982311
 * `INIT_DELAYED_WORKWORK()`
 
```c
INIT_DELAYED_WORK(&work, handler);

queue_delayed_work(workqueue, &work, delayed_time);
```

## 같이보기 좋은 자료
 * [[workqueue]]
