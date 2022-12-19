---
layout  : wiki
title   : spring boot cli
summary : 내가 써먹으려고 적어두는 cli snippet
date    : 2022-12-19 14:03:25 +0900
updated : 2022-12-19 14:03:25 +0900
tags    : [spring, kotlin]
draft   : false
parent  : tool
resource: 023482B3-8819-467D-A572-4DD97E63C84A
---

## 목적
- intellij 에 의존적으로 프로젝트를 생성해야만 하는게 별로라 도구를 찾다가 도달하였다.
- 내부적으로는 똑같이 동작하는 것 같다.
- 약간 cli를 고집하는 것처럼 느껴져서 애매하긴 하다. intellij + ideavim 이 진짜 해결책인가 생각이 좀 든다.

## installation

```bash
sdk install springboot
```

## spring + web + kotlin

```bash
spring init -d=web --build=gradle -t=gradle-project-kotlin -l=kotlin -n=<project 명>
```
