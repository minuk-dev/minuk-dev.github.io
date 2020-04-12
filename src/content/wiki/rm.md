---
layout  : wiki
title   : rm (Linux Command)
summary : 
date    : 2020-04-12 20:22:32 +0900
lastmod : 2020-04-12 23:04:28 +0900
tags    : [linux, rm, cli, command]
draft   : false
parent  : 
---

## 자주 사용하는 거 모음

### 특정 파일 제외하고 지우기
#### bash
* 단일
```bash
$ rm -v !("filename")
```
* 다중
```bash
$ rm -v !("filename1" | "filename2")
```
#### zsh

## Delete Files Using Extended Pattern Matching Operators

* `*(pattern-list)` : matches zero or more occurrences of the specified patterns
* `?(pattern-list)` : matches zero or one occurence of the specified patterns
* `+(pattern-list)` : matches one or more occurrences of the spcified patterns
* `@(pattern-list)` : matches one of the spcified patterns
* `!(pattern-list)` : matches anytthing except one of the given patterns
