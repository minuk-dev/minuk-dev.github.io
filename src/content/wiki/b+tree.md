---
layout  : wiki
title   : B+ Tree
summary : 
date    : 2020-06-05 19:24:15 +0900
lastmod : 2020-06-27 15:10:23 +0900
tags    : 
draft   : false
parent  : database
---

## 유틸
 * 일단 B+-Tree 를 In Memory가 아니라, File로 만들꺼니, 기본적인 Util 부분을 짜자.

### 1. 기본적인 아키텍쳐 레벨의 함수들 정리 및 사용하기 편하게 만들기
 * 일단 `[[mmap]]` 으로 Page 단위로 memory에 올릴 꺼니, `mmap` 부터 공부
