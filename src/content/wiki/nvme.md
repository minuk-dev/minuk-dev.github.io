---
layout  : wiki
title   : nvme
summary : 
date    : 2020-06-15 20:13:59 +0900
lastmod : 2020-06-16 19:18:41 +0900
tags    : [linux, nvme, ssd]
draft   : false
parent  : 
---

## Linux NVMe 공부
 * [[workqueue]]
 * [[block layer]]

 
## 의문점
 * linux/drivers/nvme/host 에 있는 nvme 함수들은 어떻게 호출되는가? -> scsi interface 를 사용해서
 * -> 그러면 어디에 있지? source code를 찾아보고 싶다. -> 일단 request 는 찾았다. block device 에 접근 하려면 (실제로 block device는 아닐수도 있지만 SSD를 일단 Block 으로 사용하고 FTL 로 처리?할테니까)
 * -> 흠? 그런데 찾아보니까 /include/nvme.h 라는 파일이 있는데? 이건 만약 nvme 가 단순히 scsi 로만 처리된다면 굳이 맨 바깥쪽 include 에 있을 필요는 없는거 아닌가? 이건 마친 nvme 가 단독으로 interface를 가지고 있는거 같은데?
 * 
