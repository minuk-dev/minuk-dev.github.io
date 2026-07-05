---
layout: wiki
title: hash
tags:
draft: false
parent: study-note
lastmod: 2026-07-05 20:35:10 +0900
date: 2026-07-05 20:21:10 +0900
---


## xxhash
- victoriametrics 에서 fastcache에서 사용하고 있는 hash 알고리즘.
	- golang으로 코딩하다보면 fnv64, sha1, md5 로 hash 할일이 많은데, 확실히 성능이 좋다.
	- 지금 팀에서는 murmur3 도 널리 쓰이고 있는데, 사실 장단점에 대해서 공부해본적이 없다.
- https://xxhash.com/
- golang 구현체: https://pkg.go.dev/github.com/cespare/xxhash/v2#section-readme
- xxhash 는 DoS에 대해서 취약점이 있다.
	- 찾아보니 이거에 의해서 LSQUIC (QUIC 의 구현체중 하나인듯)에서도 취약점이 있다.: https://nvd.nist.gov/vuln/detail/CVE-2025-24947

## murmur3
- murmur3와 xxhash 를 비교하는 글: https://openkmj.tistory.com/20
	- murmur3의 hash와 xxhash64 에 대해서 기본적으로는 출력공간이 넓다.
	- murmur3 는 distribution 에 집중했다고 한다 분포도가 더 좋은듯하다.
	- 분포에 의해서 DoS 공격에 조금더 내결함성이 있는것 같다.