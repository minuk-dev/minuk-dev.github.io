---
layout  : wiki
title   : git
summary : git 쓰다가 종종 찾아보게 되는 내용들
date    : 2020-07-31 20:48:29 +0900
lastmod : 2020-11-01 01:57:36 +0900
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

## git 이 있는 디렉토리가 용량이 너무 크다고 판단할때 고려해볼꺼
 * commit 이 압축 안되고 cache 되어 있을 수 있다. garbage collection 을 돌려보자
 * 옵션은 공식 메뉴얼에 아주 잘 나와있으니 [참고](https://git-scm.com/docs/git-gc/2.24.0)
 * 용량이 너무 크다고 생각해서 이 문서를 봤다면, 아마도 최대한 용량 비우기를 원할태니 아래를 실행하자.
 ```bash
 git gc --aggressive
 ```
## git editor 변경
```bash
git config --global core.editor vim
```
