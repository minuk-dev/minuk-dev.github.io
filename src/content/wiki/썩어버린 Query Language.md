---
layout  : wiki
title   : 썩어버린 Query Language
summary : 
date    : 2020-04-07 20:18:38 +0900
lastmod : 2020-04-08 12:44:29 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---

#  # 1. SQL (Structured Query Language)?

- 관계형 데이터베이스들에서 원하는 데이터를 가져오기 위한 언어
- 우리는 왜 이걸 사용하고 있을까?

## 데이터베이스의 역사

- 관계형 데이터베이스가 데이터베이스 전쟁의 승자이기 때문이다.
- 계층형 데이터베이스를 비롯한 수많은 종류들의 데이터베이스가 있었으나 문제들이 많아 점점 관계형 데이터베이스들만이 살아남았다. (대부분 성능상의 문제)
- 관계형이 살아남은 이유는 질의 최적화기 (query optimizer)이다.

## Query Optimizer

- 쿼리를 최적화해주는 무언가
- 이걸 발전시키기 위해 수많은 연구가 진행되어 현재의 성능을 가지게 된다.
- 그럴려면 구조화된 query 언어가 필요하고 이게 현재 사용하는 SQL이다.

![https://www.researchgate.net/profile/Martin_Boissier/publication/332803446/figure/fig2/AS:754092716593152@1556801122020/The-different-steps-of-the-SQL-Pipeline-leading-from-an-SQL-string-to-executable.png](https://www.researchgate.net/profile/Martin_Boissier/publication/332803446/figure/fig2/AS:754092716593152@1556801122020/The-different-steps-of-the-SQL-Pipeline-leading-from-an-SQL-string-to-executable.png)

# 2. 썩어버린 query language

## 썩었다?

- 흔히 고인물들을 보고 고이다못해 썩어버렸다는 말을 쓴다.
- 지금 SQL이 그러하다. 썩어버리지 않는다면 DB의 최고성능을 끌어올리기 힘들다.

## 우리도 한번 고이는 것 정도는 해보자

- Index만 알아도 사실 고이는건 쌉가능이다.
- 기왕이면 partitioning, sharding 정도는 알고 있자

# 3. Index

## Index란?

- 데이터를 나타낼수 있는 key (Search Key)
- 일반적으로는 Tree (대부분의 경우 B-Tree), 간혹 Hash Table을 사용한다.
- B-Tree

![https://www.lucidchart.com/publicSegments/view/08895b1f-2111-4790-a99e-e5d9b101f7a3/image.png](https://www.lucidchart.com/publicSegments/view/08895b1f-2111-4790-a99e-e5d9b101f7a3/image.png)

## 이런 쿼리는 가급적 쓰지 말자

- 물론 기능상 필요하고, 정말 가끔 도는 쿼리면 큰 문제 없다.
- like 가 덕지덕지 붙은 query
- index를 타지 않고 Full Scan 하는 query

## 쿼리 최적화의 좋은 예시

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9371e4ab-2f42-4c84-b00c-d55cb91399c4/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9371e4ab-2f42-4c84-b00c-d55cb91399c4/Untitled.png)

## Pagination 이야기 (Row lookup)

- 다들 게시판 또는 일부 데이터만을 구현할 떄 뒷 페이지로 갈수록 느려지는 느낌을 못받으시나요?

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/07984ce2-565f-42a0-ac02-77bda9c5ab00/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/07984ce2-565f-42a0-ac02-77bda9c5ab00/Untitled.png)

    SELECT id, xValue, yValue, zValue, createdAt
    FROM Position
    LIMIT 2000000, 1000

    SELECT id, xValue, yValue, zValue, createdAt
    FROM (
        SELECT id
        FROM Position
        LIMIT 2000000, 1000
    ) q
    JOIN Position p
    ON p.id = q.id

# 4. SQL이 항상 DB에서 무언가를 조회할 최선은 아니다. (NoSQL - Not only SQL)

- 임피던스 불일치(Impedance Mismatch)에 지친 개발자들...

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/632fa9df-3893-4a59-92e4-068f80f6d0a9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/632fa9df-3893-4a59-92e4-068f80f6d0a9/Untitled.png)

- 위와 같이 다른것들도 고려는 해보자(?)

# 5. 잡설

- 주변에서 워낙 Spring을 사용하니 종종 부딪히는 문제들이 눈에 보인다.
- 다음을 검색해서 해결하길 바란다.
    - PreparedStatement 와 Statement의 차이
    - FetchSize, Cursor의 개념
    - Rule Hint
- 발표자들은 보통 항상 발표시간이 아쉽다. 오랜시간 공부한걸 발표시간 내에 모두 전달할수 없다. 각자 찾아보자

## 막간을 이용한 책팔이

오늘 발표 내용의 대부분은 아래 책의 12개의 챕터 중 1/2 챕터 분량밖에 안된다. 강추

[데이터 중심 애플리케이션 설계](http://www.yes24.com/Product/Goods/59566585)

# References

- 역사 및 대부분의 개념 출처
    - 데이터 중심 어플리케이션 설계 (Designing Data-Intensive Applications)
- 인덱스 개념 및 그림 출처

[NAVER D2](https://d2.naver.com/helloworld/1155)

[[DB개념] :: Index Structures (인덱스 구조)](https://chartworld.tistory.com/18)

[파티셔닝(Partitioning)](https://velog.io/@litien/%ED%8C%8C%ED%8B%B0%EC%85%94%EB%8B%9DPartitioning)

- Row lookup

[Pagination을 위한 최적화 SQL (LIMIT vs JOIN)](https://blog.lulab.net/database/optimize-pagination-sql-by-join-instead-of-limit/#fn:2)

- NoSQL

[NoSQL](https://en.wikipedia.org/wiki/NoSQL)
