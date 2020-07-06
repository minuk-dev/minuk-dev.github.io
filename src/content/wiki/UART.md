---
layout  : wiki
title   : UART (Universal asynchronous receiver/transmitter)
summary : 
date    : 2020-07-06 20:15:52 +0900
lastmod : 2020-07-06 20:20:26 +0900
tags    : 
draft   : false
parent  : 
---

## 요약
 * 범용 비동기화 송수신기 : 병렬 데이터의 형태를 직렬 방식으로 전환하여 데이터를 전송하는 컴퓨터 하드웨어의 일종

 
## 데이터 송수신 형태

| 비트수 | 1                     | 2               | 3      | 4      | 5      | 6      | 7      | 8      | 9      | 10                     | 11                      |
|--------|-----------------------|-----------------|--------|--------|--------|--------|--------|--------|--------|------------------------|-------------------------|
|        | 시작 비트 (start bit) | 5-8 데이터 비트 |        |        |        |        |        |        |        | 패리티비트(parity bit) | 종료 비트 (Stop bit(s)) |
|        | Start                 | Data 0          | Data 1 | Data 3 | Data 3 | Data 4 | Data 5 | Data 6 | Data 7 | Parity                 | Stop                    |

