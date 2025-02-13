---
layout: wiki
title: Effective kotlin
date: 2025-02-12 02:26:26 +0900
lastmod: 2025-02-12 02:28:46 +0900
tags: 
draft: true
parent: 
---
## 1부 좋은 코드
### 1장 안정성

#### Item 1. 가변성을 제한하라

- 코틀린에서 가변성 제한하기:
	- 일기 전용 프로퍼티(val)
	- 가변 컬렉션과 읽기 전용 컬렉션 구분하기
	- 데이터 클래스의 copy