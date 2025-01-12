---
layout  : wiki
title   : ssh 관련 명령어 모음
summary : 내가 검색하기 귀찮아서 모아둔 스크립트
date    : 2021-09-03 19:52:27 +0900
lastmod : 2022-05-23 00:10:49 +0900
tags    : [tag]
draft   : false
parent  : tool
---

## ssh 키 생성

```bash
ssh-keygen -t rsa -b 4096 -C "<email>"
```

## 원격 명령어 실행

```bash
ssh user@host "<command>"
```

## ssh tunneling

```bash
ssh -R <listen port>:<host>:<send port> <server>
```
