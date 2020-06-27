---
layout  : wiki
title   : rm (Linux Command)
summary : 
date    : 2020-04-12 20:22:32 +0900
lastmod : 2020-06-27 15:13:51 +0900
tags    : [linux, rm, cli, command, glob]
draft   : false
parent  : linux command
---

## 자주 사용하는 거 모음

### 특정 파일 제외하고 지우기
* 단일
```bash
$ rm -v !("filename")
```
* 다중
```bash
$ rm -v !("filename1" | "filename2")
```
* 만약 zsh을 쓰고 있다면
```zsh
$ setopt extendedglob
$ rm ^("filename1" | "filename2")
```

## Delete Files Using Extended Pattern Matching Operators

* `*(pattern-list)` : matches zero or more occurrences of the specified patterns
* `?(pattern-list)` : matches zero or one occurence of the specified patterns
* `+(pattern-list)` : matches one or more occurrences of the spcified patterns
* `@(pattern-list)` : matches one of the spcified patterns
* `!(pattern-list)` : matches anytthing except one of the given patterns
* 자세한건 [[glob]] 참고
