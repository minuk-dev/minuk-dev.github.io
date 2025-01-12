---
layout  : wiki
title   : group descriptor table
date    : 2020-04-30 20:17:00 +0900
lastmod : 2022-03-26 03:40:03 +0900
tags    : [linux, filesystem]
draft   : false
parent  : ext4
---

## 설명
* 슈퍼블록 바로 다음에 위치하며, 파일 시스템의 블록 그룹들에 대한 정보를 가지고 있다.
* Group Descriptor의 크기는 32bytes로, 블록 크기가 1KB이라면 하나의 블록에 총 32개의 Group Descriptor가 기록될수 있다.
## 포함하는 주요 정보
* Block Bitmap의 블록 번호, Inode Bitmap의 블록 번호, 첫번째 Inode Table Block의 블록번호, 그룹안에 있는 빈블록 수, 그룹 안에 있는 inode 수, 그룹 안에 있는 빈 디렉토리 수 등이다.
