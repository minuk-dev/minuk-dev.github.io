---
layout  : wiki
title   : mmap
summary : 
date    : 2020-06-05 19:52:18 +0900
lastmod : 2020-06-05 19:59:59 +0900
tags    : [memory, mmap]
draft   : false
parent  : 
---

## `MAP_SHARED` vs `MAP_PRIVATE`
 * 이에 관한 내용을 검색해보니 많은 내용들이 나온다.
 * 그런데 대부분 공유하는 내용이랑 메뉴얼을 참조하라고만 하지 직접적 성능비교는 못찾았다.
 * 그래서 결국 생각이 미친게 innodb는 빠른 방법 혹은 느리더라도 사용해야할 이유가 있는 방법을 사용할 거다.
 * innodb storage engine 코드에서 Fgrep으로 찾아보니,

 ```cpp
 /* os/os0proc.cc */
  ptr = mmap(nullptr, size, PROT_READ | PROT_WRITE, MAP_PRIVATE | OS_MAP_ANON,
             -1, 0);
 ```
 
 이 내용을 찾았고, 그래서 `MAP_PRIVATE`를 b+-Tree를 만들때 사용하기로 했다.
 추가적으로 `addr` 를 `null`을 줄 경우 자동으로 PAGE 단위에 맞게 준다는 걸 알았다.
 
