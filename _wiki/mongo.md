---
layout  : wiki
title   : mongodb 관련 명령어, 툴 모음
summary : 검색하기 귀찮아서 만든 mongo 관련 명령어
date    : 2021-09-03 19:56:55 +0900
lastmod : 2021-09-03 20:00:57 +0900
tags    : [mongo]
draft   : true
parent  : tool
---

## 몽고 GUI 툴
 * https://www.mongodb.com/ko-kr/products/compass

## json 파일 업로드

```bash
mongoexport -u <user> -p '<password>' -d <databaseName> -c <collectionName> --out <jsonfilename> --port 27017
```

 * json array
```bash
mongoexport -u <user> -p '<password>' -d <databaseName> -c <collectionName> --out <jsonfilename> --port 27017 --jsonArray
``
