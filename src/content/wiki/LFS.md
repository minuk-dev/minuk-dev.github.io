---
layout  : wiki
title   : LFS Paper
summary : 
date    : 2020-07-16 20:35:14 +0900
lastmod : 2020-07-22 23:06:29 +0900
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
 * We introduce new concepts, which disk spaces are divided by a specific size, to maintain large free areas on disk for fast writing. (빠른 쓰기를 위해 디스크에 큰 여유공간을 확보하는 게 문제가 되었고, 이를 디스크를 특정한 크기로 나눔으로써 해결하는 새로운 방법을 제시했다.)
 * There is a prototype log-structured file system called Sprite LFS.  It can use 70% of the disk bandwidth for writing.  (Sprite LFS 라는 프로토 타입을 제시하였고, 이 는쓰기할때 디스크의 70%의 성능을 사용하게 해준다.)
 
### 1. Intorduction
#### Background
 * CPU speeds have increased but disk doesn't. => Application performances are limited. (CPU의 성능은 향상되는데 디스크는 그렇지 않고 이로 인해서 제약이 생긴다.)
#### Idea
 * Many read requests loaded from main memory. => Write requests are a bottleneck on disk performances. (많은 읽기 요청이 메인 메모리에서 가져와지기 때문에 병목은 쓰기 요청에 있다는 것을 알수 있다.)
 * Many of writing times account for seeking time. => We use a sequential structure called log to remove it. (쓰기 시간은 대부분이 쓸 위치를 찾는 시간이고, 이를 순차적 쓰기 구조를 통해서 해결한다.)
 * Because of the nature of the log, crash recovery can be also faster. (Log 의 특성에 따라 자연스럽게 장애 복구 또한 빨라졌다.)
#### Related works
 * Many other papers suggest this notion. But, it is only for temporary storage. (다른 논문들도 이런 개념을 제시하였으나 일시적 저장에 그쳤다.)
#### Well-known issues
 * Log structured File system has a problem to free up disk space for new data. We solve it by introduce segments and segment cleaner. (알려진 문제로, Log structured File system은 새로운 데이터를 위해 디스크 공간을 확보하는 게 있으며, 이는 segments와 segment cleaner를 통해서 해결한다.)

### 2. Design for file systems of the 1990's
#### 2.1 Technology
 * File system design has three significant components(Processors, Disks, and Main Memory).
 * Disk performance depends on two components (Transfer bandwidth and access time).
 * Disk is not better than before compared with CPU.
 * Main Memory improvement is so remarkable that modern file systems cache recently-used file data in it. Therefore, a system can absorb a greater fraction of the read requests and more write requests can be buffered before write to disk.

