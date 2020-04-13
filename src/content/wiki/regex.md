---
layout  : wiki
title   : Regular Expression (regex)
summary : 
date    : 2020-04-13 23:48:20 +0900
lastmod : 2020-04-13 23:59:55 +0900
tags    : [regex]
draft   : true
parent  : 
---
## 정규 표현식 문법
 * `^x` : x문자로 시작됨
 * `x$` : x문자로 종료됨
 * `.x` : 임의의 문자ㅓ

## 자주 쓰는 정규표현식
### 이메일 : `^[a-z0-9_+.-]+@([a-z0-9]+\.)+[a-z0-9]{2,4}$`
### URL : `^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$`
### HTML : `\<(/?[^\>]+)\>/`
### 전화번호 : `(\d{3}).*(\d{3, 4}).*(\d{4})`
### 특정 확장자를 가진 파일명 : `([^\s]+(?=\.(jpg|png|mp3))\.\2)`

