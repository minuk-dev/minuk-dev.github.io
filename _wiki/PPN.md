---
layout  : wiki
title   : PPN(Physical Page Number)
summary : 
date    : 2020-07-14 19:29:54 +0900
lastmod : 2020-07-14 19:56:41 +0900
tags    : [ssd]
draft   : false
parent  : ssd
---

## 같이 볼거리
 * [[FTL]]
 * [[LPN]]

## 요약
 * FTL에 의해 변환된 주소를 Page 단위에 따라서 나누고 여기에 번호를 붙인것.
 * PBN(Page Block Number)의 변화와 상관없이 연속적으로 붙여진다.
   * 예시 : Page Block에 4개의 Page가 들어갈 경우 0번 Page Block 은 PPN이 0~3, 1번 Page Block은 4~7을 가지고 있다.
