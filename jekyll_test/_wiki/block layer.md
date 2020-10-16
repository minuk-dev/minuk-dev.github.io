---
layout  : wiki
title   : block layer
summary : 
date    : 2020-06-16 19:14:58 +0900
lastmod : 2020-06-16 19:34:20 +0900
tags    : 
draft   : false
parent  : 
---

## Block Layer
 * Linux 에서 device에 입출력 할때 request를 처리하는 layer
 * https://lwn.net/Articles/736534/
 * `/dev` 에 있는 block device 에 접근할때 사용

## 함수 호출 순서
 * 출처 : http://egloos.zum.com/moonkh/v/4841748
 * `read()`, `write()` -> bio 구조체를 생성하고 필요한 정보를 할당 -> `submit_bio()` 호출 -> `generic_make_request()` 호출 - bio 구조체를 I/O 스케줄러에 등록 -> `_make_request()` 호출, bio 를 request 로 만들고 request_queue 에 넣는다.  

### `submit_bio()` 구현부
 * `block/blk-core.c`
 * bootlin 링크 : https://elixir.bootlin.com/linux/latest/source/block/blk-core.c#L1139

### `generic_make_request()`
 * `blcok/blk-core.c`
 * bootlin 링크 : https://elixir.bootlin.com/linux/latest/source/block/blk-core.c#L990
 * 
