---
layout  : wiki
title   : Cache
summary : 
date    : 2020-07-06 20:38:22 +0900
lastmod : 2020-07-06 20:57:36 +0900
tags    : [memory, cache]
draft   : false
parent  : 
---

## 요약
 * Pinciple of Locality 에 따라 최근 접근한 데이터 또는 인접한 데이터를 빠르게 접근할수 있는 곳에 두고 접근하는 것.

 
## Cache 의 종류
 * 출처 : https://parksb.github.io/article/29.html
 * L1 Cache : 프로세서와 가장 가까운 캐시. 속도를 위해 `I$` 와 `D$` 로 나뉜다.
   * Instruction Cache (I$) : 메모리의 TEXT 영역 데이터를 다루는 캐시
   * Data Cache (D$) : TEXT 영역을 제외한 모든 데이터를 다루는 캐시.
 * L2 Cache : 용량이 큰 캐시, 크기를 위해 L1캐시처럼 나누지 않는다.
 * L3 Cache : 멀티 코어 시스템에서 여러 코어가 공유하는 캐시
 
### 궁금해서 찾아본 내 컴퓨터의 캐시 사이즈
```bash
# lshw -C memory
```
 * linux에서 명령어로 확인해볼수 있다.
 * 아래 내용을 보면 확인 할수 있듯이 L1 은 32KiB, L2 는 256KiB, L3 는 3MiB 이다.
 * 지금 작업하는 곳이 대학교 입학할때 사용한 i3 4세대? 5세대? 쯤이니까 감안해서 보면 될듯.
```
  *-firmware
       description: BIOS
       vendor: American Megatrends Inc.
       physical id: 0
       version: P02RDQ.029.160707.JJ
       date: 07/07/2016
       size: 64KiB
       capacity: 6080KiB
       capabilities: pci upgrade shadowing cdboot bootselect socketedrom edd int13floppy1200 int13floppy720 int13floppy2880 int5printscreen int14serial int17printer acpi usb biosbootspecification uefi
  *-cache:0
       description: L1 cache
       physical id: 38
       slot: L1 Cache
       size: 32KiB
       capacity: 32KiB
       capabilities: synchronous internal write-back data
       configuration: level=1
  *-cache:1
       description: L1 cache
       physical id: 39
       slot: L1 Cache
       size: 32KiB
       capacity: 32KiB
       capabilities: synchronous internal write-back instruction
       configuration: level=1
  *-cache:2
       description: L2 cache
       physical id: 3a
       slot: L2 Cache
       size: 256KiB
       capacity: 256KiB
       capabilities: synchronous internal write-back unified
       configuration: level=2
  *-cache:3
       description: L3 cache
       physical id: 3b
       slot: L3 Cache
       size: 3MiB
       capacity: 3MiB
       capabilities: synchronous internal write-back unified
       configuration: level=3
  *-memory
       description: System Memory
       physical id: 3e
       slot: System board or motherboard
       size: 4GiB
     *-bank:0
          description: SODIMM DDR3 Synchronous 1600 MHz (0.6 ns)
          product: 8KTF51264HZ-1G9P1
          vendor: Micron
          physical id: 0
          serial: 12CACA3A
          slot: ChannelA-DIMM0
          size: 4GiB
          width: 64 bits
          clock: 1600MHz (0.6ns)
     *-bank:1
          description: DIMM [empty]
          physical id: 1
          slot: ChannelB-DIMM0

```
## Cache Metrics
 * 캐스의 성능을 측정할 때는 Hit latency 와 Miss Latency 가 중요 요인으로 꼽힌다.
 * $$\text{Miss rate} = \frac{\text{Cache misses}}{\text{Cache accesses}}$$

## Cache Organization
### Indexing
 * 주소값 전체를 키로 사용하지 않고, 그 일부만을 사용한다.
### Tag Matching
 * 주소값의 일부를 Tag 로 사용하여 인덱스의 충돌을 줄인다.
### Associative Cache
 * 서로 다른 두 주소가 같은 인덱스를 가지고 계속해서 둘다 접근된다면 캐시미스가 지속적으로 발생한다. 이를 Ping-pong problem이라한다. (이건 처음 듣는다. 위의 참조 에서 처음 들음)
 * 이를 태그 배열과 데이터 배열을 여러 개 만드는 식으로 개선한다.
   * Direct mapped : 인덱스당 가르키는 공간이 단 1개 (위에서 설명한 방식)
   * Full associative : 인덱스가 어떤 공간이던지 가리킬수 있음 (충돌이 적지만 모든 블록을 탐색해야함. 속도가 느림)
   * Set associative : 인덱스가 가리키는 공간이 두개 이상인 경우 n-way set associative 캐시라고 부른다.

   
 * TODO : 아직 덜 정리함. 시간이 모자라네
