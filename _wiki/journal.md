---
layout  : wiki
title   : journal(journaling)
summary : 
date    : 2020-04-30 20:21:25 +0900
lastmod : 2020-04-30 20:27:02 +0900
tags    : [linux, filesystem, ext3, ext4]
draft   : true
parent  : 
---

## 설명
* 파일을 기록하기 전, 안정성을 위해 복사본을 기록한 뒤 기록하는 방법

## ext3의 journaling의 3가지 단계
* Journal : 가장 낮은 위험모드로 파일 시스템에 commit 하기 전에 데이터와 메타데이터를 저널에 모두 기록한다. 이렇게 하면 그 파일 시스템 뿐만 아니라 모든 쓰여지는 파일의 일관성이 보장되지만 성능이 크게 저하될수 있다
* Ordered : 대부분의 Linux 배포판에서 기본 설정으로써, journal에 metadata를 쓰지만, 파일시스템에는 데이터를 직접 commit한다.
  1. metadata가 journal에 commit 된다
  2. data가 FS에 기록된 다음에야 journal에 있는 연결된 metadata가 file에 쓰여지게 된다.
  * 이로인해 가능한 연산 : 불안전한 쓰기를 삭제가능 : 충돌이 날때 쓰여지는 파일은 손상될 수 있지만, 이외의 파일과 파일 시스템은 안전하다
* Writeback : ordered에서 순서보장 내용이 빠진것. : 파일 시스템 자체는 안전하지만 기록 중 또는 장애 전후로 기록된 파일은 불안정할 수 있다.
