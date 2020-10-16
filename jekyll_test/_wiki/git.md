---
layout  : wiki
title   : git
summary : 
date    : 2020-07-31 20:48:29 +0900
lastmod : 2020-08-08 00:45:16 +0900
tags    : [git]
draft   : false
parent  : tool
---

## git 파일 한글명 깨짐 설정
```bash
git config --global core.quotepath false
```

## 특정 커밋만 없에거나, 여러개의 커밋 합칠때 쓰기 유용한 명령어
```bash
git rebase -i HEAD~5
```
