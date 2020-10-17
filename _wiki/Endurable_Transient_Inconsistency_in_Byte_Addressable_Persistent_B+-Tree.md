---
layout  : wiki
title   : Endurable Transient Inconsistency in Byte Addressable Persistent B+-Tree
summary : 
date    : 2020-04-07 20:15:43 +0900
lastmod : 2020-06-10 19:22:07 +0900
tags    : 
parent  : "database"
---
- 논문을 고른 이유 : 2018, 2019, 2020 년도 FAST 학회의 모든 논문을 읽고 전역을 하는 게 목표인데 2018, 2019년도 FAST에 동일한 한국인이 실려서 관심이 가서 읽어보게 됨.

# Abstract

- Persistent Memory(이하 PM)의 byte 주소 기반 접근의 등장으로 데이터 전송 단위가 page→cache line이 됨.
- 쓰기 실패 원자성(Failure-Atomic Write Operation)는 8Bytes 씩 보장되지 cache line단위로는 보장되지 않는다.
- B+-Tree는 Block 기반 데이터 구조이고, 재 디자인이 부상하게 된다.

    →흠.. 갑자기 8Bytes 씩 쓰기와 cache line 이야기하다가 block 기반 이야기를 하는 이유는 block 기반에서는 dirty page를 통해서 내렸고, cache line 단위로 동기화를 해야하는 일이 없었다고 생각한다.

- In-Memory 에서 B+-Tree 만한 성능이 나오는 DS가 없기 때문에 이 논문에서는 Failure_Atomic Shift(FAST)와 Failure-Atomic In-place Rebalance(FAIR)을 제시한다.
- 위와 같이 제시한 방법으로 할 경우 copy-on-write, loggin, read-latch 를 없애는 등의 성능 향상이 생겼다고 한다.

# 1.Introduction

- Block device에 맞춰진 legacy interface를 버리면서 성능향상을 노린다.
- block 기반 B+-Tree에선 cache를 잘 활용하기 위해서 다양한 변형들이 제시되었지만 byte addressable operation에 대해서 고려하지 않았고
- 현대의 processor는 memory reordering을 하기 때문에 최악의 경우 cache가 달라진다.
- 이를 방지하기 위해서 flush 연산으로 캐시 mismatch를 방지하는 알고리즘도 존재한다.
- 이런 알고리즘의 경우 2가지 문제점이 있는데,
    1. key들이 정렬된 상태를 유지하기 위해 a large number of fencing(memory barrier, 메모리 접근 순서가 달라지지 않기 위해서 사용하는 것)과 cache flush operation
    2. Tree의 Rebalancing 연산을 위해 logging하는데 이는 너무 비싼 연산이다. (시간이 많이 듬)
- 이에 대한 해결책으로
    1. Append-Only Manner와 Additional meta data를 도입했다.(이렇게 되면 update되는 memory 영역의 크기를 최소화되지만, 추가적으로 metadata에 접근하는 cache line의 수를 늘려 성능에 영향을 미치게 된다. 하지만 그럼에도 불구하고 추가하는게 이득이기 때문에 추가한다.)
    2. FAST(Failure-Atomic Shift)와 FAIR(Failure-Atomic In place re-balancing)을 통해서 해결한다. (다른 논문에서는 선택적으로 leaf node를 영구적으로 유지하거나, internal node를 dram에 유지하는 경우도 있지만. 어짜피 tree re-balancing이 system failure날 경우 복원 불가능하다. 물론 복원 가능하도록 구현할 경우 backup copy나 logging 하는 방법도 있지만 여기서는 성능상의 이유로 채택하지 않는다.)

# 2.B+-Tree for Persistent Memory

## 2.1 Challenge : `clflush` and `mfence`

- 기존의 transaction consistency와 data integrity보장을 위해 copy-on-write를 사용했다.
- In place update로 작동하는 알고리즘도 있었지만, key를 정렬된 상태로 유지하기 위해서 많은 cache line flush와 memory fence을 주장했다.
- 우린 이런 문제를 회피하기 위해 append only방식을 채택하였다. 물론 이 방식에는 읽기 과정에 key가 정렬되지 않는 상태로 있기 때문에 부하가 생길 수 있다.

## 2.2 Reordering Memory Access

- Processor가 발전하면서 병렬처리나 재순서로 Memory를 가져온다.
- Failure-atomic data structure을 만들려면 volatile memory순서를 고려하고 order를 유지해야한다.
- ARM같은 대부분의 architecture는 reorder이 일어나고 x86정도는 stores-after-stores는 보장해준다.
- 하지만 인과성이 없는 대부분의 연산의 경우 보장을 안해준다.
- 그래서 Memory persistency라는 framework를 사용했다.

# 3. Failure-Atomic ShifT (FAST)

## 3.1 Shift and Memory Ordering

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3a435b42-72a0-4ced-998b-354e3d8ecbe4/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3a435b42-72a0-4ced-998b-354e3d8ecbe4/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d6d0d094-46ad-4fa4-bc30-870818e0b22f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d6d0d094-46ad-4fa4-bc30-870818e0b22f/Untitled.png)

- TSO(Total Store Order)를 지원하는 것과 아닌 것을 대조해서 알고리즘을 설명한다.
- 만약 array size가 여러 cache line에 걸쳐 있다면 FAST 연산이 끝나면 걸쳐져 있는 인접한 cacheline에 대해서  clflush 를 명시적으로 호출한다.
- 뭐 굳이 걸쳐져 있지 않다면 어짜피 clflush를 호출하지 않더라도 dirty cache line이니 evict 될때 flush 된다.

## 3.2. Endurable Inconsistency during Shift

- 이 연산은 이 자체로는 failure-atomic 하지 않는데, 한 줄에 2개가 생길수 있기 때문이다.
- 그러므로 B+-Tree의 성질을 이용할것인데, 한 node에 2개의 중복된 pointer가 존재할수 없다는 것이다.

## 3.3 Insertion with FAST for TSO

- x86같이 TSO를 보장해주는 경우에 사용.
- 위의 그림을 참조한다.
- 읽는 과정에 있어서 동일한 pointer가 **연속으로** 나오면 하나는 에러라고 생각해서 복원 과정을 거치고, 스킵시킨다.

## 3.4. FAST for Non-TSO Architectures

- ARM같이 TSO를 보장해주지 않는 경우에 사용
- key들이 더이상 8bytes가 아닐때를 고려해줘야 하는데,
    - 8bytes 보다 작을 경우 키와 pointer가 독립적으로 이동할수 있기 때문에 i와 i+1의 key가 동일할 경우, j와 j+1의 pointer가 동일한 것을 찾아서 고쳐준다.
    - 8bytes 보다 클 경우, memory fence를 걸어준다.

## 3.5 Deletion with FAST

- 삭제 과정은 Insertion 과정의 역 연산을 해주면 된다.

# 4. Failure-Atomic In-place Rebalacing(FAIR)

## 4.1. FAIR: Node Split

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/895e8fde-7e98-4940-abaa-f41ae5d3838a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/895e8fde-7e98-4940-abaa-f41ae5d3838a/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2e0c7d61-db4c-40c7-926f-38606545e297/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2e0c7d61-db4c-40c7-926f-38606545e297/Untitled.png)

jj위 그림처럼 잘 쪼개준다.

## 4.2 FAIR: Node Merge

- 삭제연산에 따라 Node가 붙여져야할수 있는데
- 두가지 경우로 나눠서 생각할 수 있다.
- 삭제 연산이 일어난 Node의 부모의 관점에서 봤을 때,
    - 왼쪽 자식이 오른쪽 자식과 흡수되어야 할때,
        - 부모 Node의 key값이 갱신되어야 하므로 FAST연산에서 Deletion이 일어나야 한다. 그리고 데이터들도 FAST연산으로 Atomic하게 옮겨져야 한다.
    - 오른쪽 자식이 왼쪽 자식에 흡수되어야 할때
        - 부모 Node의 key만 갱신하고 Virtual Node가 있다고 생각한다.

# 5. Lock-Free Search

- Lock 없이 하는 것은 병렬처리가 극대화 되고 있는 지금 굉장히 중요하다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e181f887-b237-4b91-9fb7-55f1c21f2c4e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e181f887-b237-4b91-9fb7-55f1c21f2c4e/Untitled.png)

## 5.1 Lock-Free Search Consistency Model

- 위에서 제시한 알고리즘은 두 transaction이 서로 쓰고 읽을 때 발생하는 문제인 phantom reads와 dirty reads 문제에 대해서 취약하다.
- database community 에서 isolation 단계가 연구되고 있는데 이또한 연구되어야 한다.
- Internal nodes는 phantom reads와 dirty reads 문제와는 관련이 없으므로 read lock은 필요 없다.

## 5.2 Lazy Recovery for Lock-Free Search

- recovery 과정을 lazy하게 하는 과정...
- 문단이 굉장히 짧기 때문에 직접 본문을 읽어보는게 더 나을듯.

# 6. Experiments

- wB+-Tree, FP-Tree, WORT, SkipList와 비교

## 6.1 Experimental Environment

- DRAM-based PM

6.2 Linear Search vs. Binary Search

6.3 Range Query

6.4 PM Latency Effect

6.5 Performance on Non-TSO

6.6 TPC-C Benchmark

6.7 Concurrency and Recoverability

# 7 Related Work

Lock-free index:

Memory persistency

Hardware transactional memory

# 8 Conclusion

# 생각하는 점과 배운점, 느낀점.

## 생각하는 점

이 논문의 

- 장점
    - B+-Tree 갱신에 대해 새로운 방식의 접근이였다고 생각한다. 대부분 logging이 문제였기 때문에
    - Legacy Interface를 버리는 과감한 결정
    - Open Source
    - 다양한 Reference
- 단점
    - 이건 내가 이해 못한걸수도, 지식이 모자라서 일수도 있는데 flush하는 과정에서 터지면 아예 file의 특정 cache line이 깨져버릴수 있는거 아닌가? 싶다. 물론 파일 시스템에서 journaling 과정이 이를 복구해 줄거라고 생각은 하지만 언급된 부분을 따로 못찾았다.
    - 그리 높지 않은 성능- 물론 이건 관점에 따라 다른데 구조를 크게 바꿧기 때문에 기존 구조에 연구가 많이 되어 성능 향상된걸 고려한다면 괜찮은 수치인것 같긴 하다. 하지만 DB는 안정성 문제가 제시되는데 이게 과연 모든 측면에서 안전한건지 검증이 안됬고, 성능상 기존것보다 압도적인 장점이 없다면 채택할 근거가 모자란다고 생각한다. 이건 2019년도 논문에서 추가적으로 제시한 내용을 읽어봐야 할것 같다.

## 배운점

- In-place algorithm 과 Out-place algorithm의 차이
- Phase Change Memory의 개념
- Memory Reordering과 clflush, mfence 의 개념
- [https://github.com/HewlettPackard/quartz](https://github.com/HewlettPackard/quartz) 라는 benchmark emulator의 존재

## 느낀점

- TPCC를 정말로 쓰는 구나
- 최근에 본 책인 데이터 중심 어플리케이션 설계에서 배운 내용인 Phantom Reads와 Dirty Reads가 중요하게 생각하는 측면이다와 안정성을 보장하기 매우 어렵다.
- 아래쪽을 공부할수록 전자쪽 지식이 필요한것 같다ㅠ 왜 더 좋은 성능이 나오는지 바로 이해되지 않는다.

# 추가 설명 위한 스크린샷 자료

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/716c0065-16eb-4194-9e82-33cbd8f2f37a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/716c0065-16eb-4194-9e82-33cbd8f2f37a/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84038cb3-9c99-4278-91c8-fe29f4ab21ae/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84038cb3-9c99-4278-91c8-fe29f4ab21ae/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e2b0f408-5d36-4247-ad98-0a378138703e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e2b0f408-5d36-4247-ad98-0a378138703e/Untitled.png)
