---
layout: wiki
title: Real Mongo DB
date: 2025-02-18 00:23:41 +0900
lastmod: 2025-02-18 00:29:44 +0900
tags: 
draft: true
parent: 
---
## 1. MongoDB
- 2010년대 초반에 유행을 주도했던 NoSQL DBMS 중 자기만의 틈새를 찾은건 HBase 정도인걸로 보인다.
- 카산드라나 Couchbase 는 일년에 한두번 적용사례가 들릴정도로 뜸하게 들린다.
- MongoDB 와 Spanner 의 공통적인 특징
	- 트랜잭션 지원
	- 분산 처리
	- 재해 복구(Disaster Recovery)
	- Sharding & Re-Balancing
	- 데이터 복제 & 자동 복구

## 2. 스토리지 엔진
### 2.1. 플러그인 스토리지 엔진

#### 2.1.1. MongoDB 스토리지 엔진
- MMAPv1
- WiredTiger
- In-Memory
- RocksDB
- TokuDB

#### 2.1.2. 스토리지 엔진 혼합 사용


### 2.2. MMAPv1 스토리지 엔진
### 2.3. WiredTiger 스토리지 엔진
- WiredTiger 스토리지의 저장방식:
	- 레코드(Row, Record) 스토어
	- 컬럼 스토어
	- LSM(Log Structured Merge Tree) 스토어
