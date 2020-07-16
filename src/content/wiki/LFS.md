---
layout  : wiki
title   : LFS Paper
summary : 
date    : 2020-07-16 20:35:14 +0900
lastmod : 2020-07-16 20:56:49 +0900
tags    : [filesystem, lfs]
draft   : false
parent  : ssd
---

## The Design and Implementation of a Log-Structured File system

### 읽은 계기
 * ~~주변에서 읽어보라 해서~~
 * F2FS 에서 관련 논문으로 조회되서
 * 우연히 김박사넷에 관심 분야에 뭐뭐 있나 찾아보다가 보여서

### 잡담
 * 겸사겸사 영어 공부할겸 영어로 paraphase 하면서 작문하는 연습을 하기로 했다.
 * 영어로 먼적 작문 하고 한글로 다시 번역하는 식으로 진행
 
### Abstract
 * This paper introduces `log-structured file system`. (이 논문에서는 `log-structured file system` 을 소개한다.)
 * This FS has a log-like structure and it contains all modifications sequentially. (이 파일 시스템에서는 log 같은 구조체가 있으며, 이건 모든 변경사항을 순차적으로 가지고 있다.)
 * This method boosts file writing and crash recovery. (이러한 방법은 파일 쓰기와 장애 복구를 향상 시킨다.)
 * The Log is a structure on disk to index information . (로그는 정보를 색인하기 위한 디스크 상의 자료구조이다.)
