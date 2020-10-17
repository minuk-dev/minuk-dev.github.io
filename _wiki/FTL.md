---
layout  : wiki
title   : Flash Translation Layer
summary : 
date    : 2020-07-14 19:32:21 +0900
lastmod : 2020-07-14 20:11:56 +0900
tags    : [ssd, ftl]
draft   : false
parent  : ssd
---

## FTL ?
 * Flash Translation Layer의 약자.
 * SSD를 Disk 처럼 사용할 수 있게 변환하는 Layer

## 구성요소
 * STL (Sector Translation Layer)
   * Address Mapping : Logical Address 를 Physical Address 로 변환
   * Garbage Collection : 안 쓰는 NAND Memory를 초기화하여 쓰기 가능한 상태로 바꾸는 것.
  * Wear Leveling : 특정한 NAND Memory에 쓰기가 몰리지 않게 하여, 전체적인 수명을 관리하는 것.
 * BML (Bad-Block Management Layer)
   * BBM(Bad Block Management) : NAND 특성상, 새 NAND 조차 불량 블록이 있을수 있으며, 이런 블록을 관리.
 * LLD (Low Level Driver)
   * NAND Flash를 위한 Driver

## Address Mapping in FTL
### Page-level Maping
 * Page 단위 모든 Maping을 Mapping Table에 두는것
 * Mapping Table 안에는 [[LPN]]과 [[PPN]]이 들어있다.
 * 장점
   * 새로운 쓰기 요청을 사용중이 아닌 페이지라면 어디에든 쓸수 있다. 이는 랜덤 쓰기에서 높은 성능을 보여준다.
 * 단점
   * NAND Flash Memory 특성상, 쓰기는 페이지 단위로 할 수 있어도, 지우기는 Block 단위로 밖에 안되기 때문에, Free Space가 부족하게 될 경우, 공간을 확보하기 위해서 Copy를 통해 데이터를 모으게 되고, 이 과정에서 쓰기 성능이 매우 떨어지게 된다. 
   * Mapping Table의 크기가 상대적으로 커서 RAM영역을 많이 차지하게 된다.
### Block-level Mapping
 * Erase 의 단위인 Block단위로 관리하는 방법
 * Maping Table에는 LBN(Logical Block Number)와 PBN(Physical Block Number)가 존재하며, 접근할때 PBN으로 Block을 찾은뒤, Page Offset을 통해서 접근한다.
 * 장점
   * Mapping Table의 크기가 작으며 순차쓰기에서 성능이 좋다.
 * 단점
   * 랜덤 쓰기에서 Block Copy로 인해 성능이 떨어진다.
   * (이건 개인적 생각) 수명 관리 측면에서도 좋지는 않을 듯

### Hybrid Mapping
 * 위 방법 둘을 혼합한 것으로. 쓰기에 대해서 Log Block을 사용한다.
