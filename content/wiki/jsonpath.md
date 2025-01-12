---
layout  : wiki
title   : jsonpath
summary : jsonpath 에서 자주 쓰는거
date    : 2022-08-01 16:12:23 +0900
lastmod : 2022-08-01 16:17:18 +0900
tags    : [jsonpath, devops]
draft   : false
parent  : devops
---

### 하위 속성

```jsonpath
{.kind}
```

### 현재 오브젝트 (입력과 동일)

```jsonpath
{@}
```

### 자식

```jsonpath
{.kind}
```

### 와일드카드

```jsonpath
.items[*].metadata.name
```

### 범위
- 단일로 뽑으려면 `[0]` 같이, 리스트 형태로 뽑으려면, `[0:1]`

```jsonpath
[start:end:step]
```

### 조합 오퍼레이터

```jsonpath
{.items[*]['metadata.name', 'status.capacity']}
```

### 필터
{.users[?(@.name=="e2e")].user.password}
```
