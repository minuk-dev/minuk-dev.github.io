---
layout  : wiki
title   : SSD(Solid-State Drive)
summary : 
date    : 2020-04-07 20:21:10 +0900
lastmod : 2020-06-27 15:10:53 +0900
tags    : [ssd]
parent  : ssd
---

# 1. SSD의 구조

## 1.1. SSD(Solid-State Drive)

- Flash Memory를 기반으로 한 저장 매체
- 비트들은 Floating-Gate Transistor로 구성된 Cell에 저장됨.
- 모든 컴포넌트가 전기 장치
- 대부분 NAND사용 (cf. NOR VS NAND)

### 1.1.1. NAND Flash Memory Property

- Lifecycle is wearing-off(수명이 제한적이다.)
    - 이유 : P/E(Program & Erase) 사이클마다 일부 전자가 오류로 인해 쌓이게 되어 트랜지스터에 갇힘. 이로 인해 갇힌 전자가 일정 수준을 넘어가면 사용 불가해짐.

### 1.1.2. Cell의 종류

- SLC(Single Level Cell) : 하나의 비트만 저장 가능, 긴 수명
- MLC(Multiple Level Cell) : 2비트, 레이턴시가 높고 짧은 수명
- TLC(Triple Level Cell) : 3비트, 레이턴시가 매우 높고 더 짧은 수명
- 쓰기가 많을 수록 SLC가 좋고, 읽기가 많을 수록 TLC가 좋음.

## 1.2 SSD의 구성

..

# 벤치마킹과 성능 메트릭

## 기본 벤치마킹

- SATA 3.0
- PCI Express 3.0 (NVMe)

## 프리컨디셔닝(Pre-Conditioning)

- 보통 10분 테스트한 벤치마크를 사용하는데 이는 대부분의 SSD에서 30분~3시간 사용한 SSD 에서 성능 저하가 발생하기 때문에 미리 일정량을 써놓는 Pre-Conditioning이 필요하다
- 이럼에도 불구하고 SSD Benchmark는 단순하지 않다.

## 워크로드와 메트릭
