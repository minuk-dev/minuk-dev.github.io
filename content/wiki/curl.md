---
layout  : wiki
title   : curl
date    : 2022-09-02 21:47:51 +0900
lastmod : 2022-09-02 21:59:14 +0900
tags    : [curl, tool]
draft   : false
parent  : tool
---

## 참고자료
- https://www.lesstif.com/software-architect/curl-http-get-post-rest-api-14745703.html
- 간단한것만 기술, 더 자세한건 참고자료에서 확인

## 파일 다운

```bash
curl -o <filename> <url>
```

```bash
curl -O <url>
```

## For REST API
- `-L` : follow redirect, `-v` : verbose, `-H` : Header

### Basic
```bash
curl -L <url> | jq .
```

### With Auth

```bash
curl -v -L -H 'Authorization: Bearer <token>' <url>
```

### Change method

```bash
curl -v -L -X POST <url>
```

### File

```bash
curl -T <filename> <url> # method 랑 조합해서 사용할것
```

### Form

```bash
curl -d "foo=bar&x=y" <url> # 자동으로 POST 로 처리
```

