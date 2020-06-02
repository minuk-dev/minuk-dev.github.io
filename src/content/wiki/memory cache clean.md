---
layout  : wiki
title   : memory cache 비우기 (linux command)
summary : 
date    : 2020-06-02 20:39:40 +0900
lastmod : 2020-06-02 20:42:58 +0900
tags    : [linux, memory, cache]
draft   : false
parent  : 
---

## pagecache 해제
```bash
echo 1 > /proc/sys/vm/drop_caches
```
## dentries, inodes 해제
```bash
echo 2 > /proc/sys/vm/drop_caches
```
## pagecache, dentries, inodes 모두 해제
```bash
echo 3 > /proc/sys/vm/drop_caches
```

## 플러싱하기
```bash
sync
```

# 출처
* https://zetawiki.com/wiki/%EB%A6%AC%EB%88%85%EC%8A%A4_%EC%BA%90%EC%8B%9C_%EB%A9%94%EB%AA%A8%EB%A6%AC_%EB%B9%84%EC%9A%B0%EA%B8%B0
