---
layout  : wiki
title   : PRP (Physical Region Page)
summary : 
date    : 2020-06-18 20:15:03 +0900
lastmod : 2020-06-18 20:18:51 +0900
tags    : [nvme, linux]
draft   : false
parent  : 
---

## PRP
 * 출처 : https://m.blog.naver.com/PostView.nhn?blogId=eldkrpdla121&logNo=220536014853&proxyReferer=https:%2F%2Fwww.google.com%2F
 * 흠.. Pysical Region Page 말 그대로다.
 * 혹시 모르니 위의 출처에 있는 말 그대로를 옮겨적자면, 
   * PRP contains the 64-bit physical memory page address. The lower bits (n:2) of this field indicate the offset within the memory page. N is defined by the memory page size.
   * PRP List contains a list of PRPs with generally no offsets.
