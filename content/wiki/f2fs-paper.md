---
layout  : wiki
title   : F2FS- A New File System for Flash Storage
summary : 
date    : 2020-07-02 22:31:19 +0900
lastmod : 2020-07-02 22:35:15 +0900
tags    : [f2fs, paper]
draft   : false
parent  : f2fs
---

- Changman Lee, Dongho Sim, Joo-Young Hwang, and Sangyeun Cho, Samsung Electronics Co., Ltd.
- USENIX Conference on File and Stoarage Technologies (FAST 15)

---

# 1. Introduction

## a. Flash Memory의 한계점

- 쓰기 작업 전 지우기 (erase-before-write requirement)
- 순차적으로 지워진 Blocks에 쓰기 (need to write on erased blocks sequentially)
- 제한된 쓰고 지우기 cycles (limited write cycles per erase block)

## b. Flash Memory 사용의 증가

- 이때까지는 HDD를 계속해서 저장 매체로 썻으나 점점 더 많은 저장 매체가 필요하고 빠른걸 원하게 되었다.
- 저장 매체의 필요성 증가에 의해 다수의 Flash chips를 controller에 연결해서 사용하는 해결책이 일반적이 되었다. (Flash Chip의 가격 하락으로)

## c. Flash Memory에 대한 이해 부족으로 인한 단점

- 위의 a의 문제점에 의해 HDD처럼 계속해서 I/O를 하면 Flash Memory의 특징을 잘 못살리게 된다.
- 오히려 I/O latency 가 증가하고 수명을 빠르게 깍게 된다.

## d. 기존의 연구

- 위와 같은 점들을 고려하여 선행연구에서 LFS(Log-Structured File System)의 접근 방법과 Copy-On-Write 전략으로 위의 한계점을 극복할수 있다.
- 예시로 BTRFS(B+-Tree File System)과 NILFS2(이건 먼지 모르겠네요 ㅠ)가 NAND Flash SSD에서 잘 동작한다. (cf. NAND 기반과 NOR 기반으로 크게 나뉜다.)
- 하지만 기존 선행 연구는 Flash Memory 의 특징을 전부 고려하지 못했고 성능과 수명 측면에서 좋지 않았다.
- 따라서 새로운 F2FS를 제시한다.

## e. F2FS의 특징

- Flash-friendly on-disk layout : Segment, section and zone
    - Segment, section 그리고 zone이라는 개념을 통해 Flash에 친화적인 layout을 사용한다.
- Cost-effective index structure : NAT (Node address table)
    - 비용 측면(시간과 공간 둘다)에서 효율적인 index 구조를 필요로 한다.
    - SSD나 Flash Memory는 LBA(Logical Base Address)가 존재하지 않지만, 이를 호환성 측면에서 제공해야하고 (FTL-Flash Translation Layer) 이를 효과적으로 제시한다.
- Multi-head Logging
    - 기존 연구의 LFS에서 착안하여 Logging Strucutre를 사용하지만 Multi-head를 사용하여 병렬처리를 하고, Hot/Cold 를 분류한다.
- Adaptive Logging
    - dirty segment를 Cleaning 하지 않고 새로운 데이터를 기록한다.
- `fsync` acceleration with roll-forward recovery
    - 예시 상황 : sqlite3

---

# 2. Design and Implementation of F2FS

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/001cab83-197f-42b8-892b-0541b17acb77/layout.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/001cab83-197f-42b8-892b-0541b17acb77/layout.jpg)

## 2.1 On-Disk Layout

### Superblock(SB)

- 파티션 정보, F2FS의 default parameter가 들어있으며 format time에 주어지며 바뀌지 않는 값

### Checkpoint(CP)

- file system의 상태, 유요한 NAT/SIT set들의 bitmap, orphan inode list들 그리고 활성화된 segment들의 요약 entries

### Segment Information Table(SIT)

- valid blocks의 개수 같은 segment information, `Main Area`의 모든 block의 validity bitmap
- Cleaning process 동안 victim segment를 고르기 위해, valid block을 식별하기 위해 사용된다.

### Node Address Table(NAT)

- Main Area에 저장된 모든 node block의 위치 Table

### Segment Summary Area(SSA)

- Summary entries prepresnting the owner information of all blocks in the Main Area
- Cleaning 과정 동안 valid block 이동하기전 parent node blocks을 구별하게 된다.

### Main Area

- 4KB 크기의 blocks로 채워져 있다.
- 각 block은 node이거나 data이다.
- node block은 inode를 포함하거나 data blocks을 가리킨다.
- data block은 directory이거나 user file data를 가진다.
- block은 동시에 node 이거나 data일수 없다.

## 2.2. File Structure

### Node Structure

- inode의 확장
- indexing block을 더 두기 위해서 사용
- 고유한 nodeID가 존재하고 NAT(Node Address Table)에서 nodeID를 키, Physical Address를 value로 들고 있는다.
- 3가지 종류 (inode, direct, indirect)
    - inode : file의 metadata(filename, inode number, atime, dtime)
    - direct : data block의 주소
    - indirect : 다른 node block들의 nodeID
    - 데이터가 변경될 때 direct node만 변경하고 NAT entry를 수정해주면 변경을 손쉽게 처리할수 있다.
- inlinde data와 inline extended attributes를 지원한다. (inline data란 metadata에서 비어있는, 예약되어 있는 영역의 크기보다 데이터가 더 작을 경우 그곳에 데이터를 넣는 것을 지칭한다.)
- F2FS에서는 200bytes를 extended attributes로 지원하고 있다.

## 2.3. Directory Structure

- 4KB 크기의 directory entry(앞으로 dentry라고 지칭) block 은 bitmap과 2개의 array of slots를 가지고 있다.
    - bitmap 은 각각의 slot들이 valid한지를 들고 있고, 각 slot은 hash value, inode number, length of filename and filetype을 들고있다.
- F2FS에서 directory 내 주어진 filename 찾기 예시
    - filename의 hash value를 계산해서 hash table을 level 0부터서 inode 상 최대 할당된 level까지 돌아다닌다. 각 level에서 2개나 4개의 dentry block들 중 하나를 scan한다.
    - 위의 과정은 `O(log(# of dentries))`의 복잡도를 가진다. dentry를 더 빨리 찾기 위해 bitmap, hash value, filename 순으로 접근하여 비교한다.

## 2.4. Multi-Head Logging

- F2FS는 hot/cold data의 분리의 효과를 최대화 하기 위해서 6개의 major log area를 가진다. 또한 F2FS는 다음과 같이 node와 data block의 온도를 나눈다.

[Block의 종류](https://www.notion.so/49352a1bed3c4b429d32f750bf16a391)

- Log 파일을 총 6개(각각의 Type과 Temp마다), 4개(Hot Node, Hot Data, Other Nodes, Other Data), 2개(Node, Data)

### FTL(Flash Translation Layer) Algorithm

- 일반적으로 FTL algorithm은 data와 log flash blocks 사이 연관성에 따라 3가지(block-associative, set-associative, full-associative)로 구별짓는다.
- 초기 파일 시스템을 포멧할 때 log flash blocks이 설정된다. 이때 설정된 log flash blocks은 data flash blocks이 할당될 때 생성된다.
- 현대 FTL algorithms은 random-write를 다루기 위해서 full-associative나 set-associative를 채택한다.
- F2FS에서 주목할만한것은 multi-head logging을 사용했기 때문에 병렬적으로 로깅이 가능하다는 것이고, 이런 로그들을 분리하기 위해서 FTL에서 서로 다른 zone을 가지고 있다는 것이다.

## 2.5 Cleaning

- 흩뿌려져있는 유요하지 않은 Blocks을 재사용 가능하게 하고 Logging을 위해 free segments를 보장해주는 작업
- F2FS는 Foreground, Background로 구별되게 존재한다.

### Foreground

- 충분히 빈 공간이 없을 때 시작한다

### Cleaning 단계

1. Victim selection
    - 비어 있지 않은 sections 중 victim을 고른다.
    - greedy 방법과 cost-benefit 방법 2가지가 존재한다.
    - greedy 방법 : valid blocks 수가 가장 적은 section을 고른다. (Foreground)
    - cost-benefit 방법 : SIT(Segement Information Table)로 부터 last modification time을 가져와 section 안 segments의 평균을 매겨 section의 age를 매긴다 (cost = # valid blocks)

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d5cbabec-e5a7-422b-b522-5176649478b8/age.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d5cbabec-e5a7-422b-b522-5176649478b8/age.jpg)

2. Valid block identification and migration
    - SIT 로부터 segment 당 valid bitmap을 가져와서 valid blocks을 알아낸다.
    - SSA 로부터 parent node blocks을 알아낸다
    - Foreground로 돌아가고 있다면 free logs 에 옮긴다.
    - Background라면 page cache로 blocks을 옮기고 dirty로 표기한다.
3. Post-Cleaning Process
    - victim section을 pre-free 라고 체크한 뒤 checkpoint를 만들어 저장한다.

# 논문을 읽으면서 궁금했던 점.

- LFS가 왜 좋은지, 왜 채택한건지, 어떤 단점이 있고 이 논문에서는 어떻게 극복한건지

    ```
    2.1 Log-Structured File System (LFS)
     LFS는 저장장치를 세그먼트 단위로 분할하고, 각 세그
    먼트를 다시 블록으로 분할한다. 그리고 쓰기 요청을 처
    리할 때 이 블록들을 순차적으로 할당하여 임의 쓰기 요
    청들을 순차 쓰기로 변환시킨다. 최근, 이러한 LFS의 순
    차 쓰기 방식은 임의 쓰기에 취약한 플래시 메모리에 적
    합하기 때문에 플래시 메모리를 위한 파일시스템으로써
    널리 연구되고 있다.
     하지만 이 순차 쓰기 방식 때문에 LFS는 invalid 처리
    된 블록을 회수하는 Garbage Collection (GC)이라는 작업
    이 필요하다. 기존의 많은 연구들은 LFS에서 GC 오버헤
    드를 줄이기 위해 In-Place Update (IPU) 정책을 같이 사
    용하는 등 다양한 노력을 해왔지만, 여전히 LFS에서 GC
    는 파일시스템 성능에 큰 영향을 미치는 요소이다

    [출처] F2FS 파일시스템의 버전별 변화 및 성능 영향 분석
    이준호O
    , 곽현호, 신동군
    성균관대학교 반도체시스템공학과
    crow6316@skku.edu, gusghrhkr@skku.edu, dongkun@skku.edu
    ```

- 왜 Hot과 Cold는 서로 분리되어야 하는가?
    - Hot과 Cold가 서로 같이 존재하면 Hot이 지워지거나 갱신될때마다 Cold도 같이 Copy-On-Write가 일어나서 동시에 쓸수있는 Hot 데이터(위에서 말하는 Data가 아닌, 기록되어야할 모든 정보 의미)의 양이 감소하고, Cold Data는 갱신이 되지 않음에도 불구하고 NAT를 계속해서 갱신해주어야하기 때문에

# 같이 보면 좋은 자료

[http://csl.snu.ac.kr/courses/4190.568/2019-1/25-F2FS.pdf](http://csl.snu.ac.kr/courses/4190.568/2019-1/25-F2FS.pdf)
