---
layout  : wiki
title   : others
summary : 어디에 넣어야할지 모르겠는 잡스러운 지식글들
date    : 2020-10-01 23:55:41 +0900
lastmod : 2020-10-05 20:23:25 +0900
tags    :
draft   : false
parent  :
---

## coarse-grained vs fine-grained
 * 참고 : http://egloos.zum.com/kwon37xi/v/1419790
 * coarse-grained 는 프로세스를 굵게 쪼개서 뭉뚱그려놓은 것,
 * fine-grained 는 프로세스를 아주 잘게 쪼개서 작업하느냐
 * 찾아보게 된 계기 : fine-grained lock 이라는 단어가 먼지 잘 모르겠어서.

## write-ahead logging(로그 선행 기록)
 * transaction 의 내용을 한번 다 적고(commit), 다 적힌 트랜잭션을 데이터 원본 영역에 넣는 방법
 * 오개념 잡기 쉬운부분 : 항상 모든 내용(데이터)를 다 적을 필요는 없음. 메타데이터만 적고, 데이터를 적을 수도 있음. 자세한건 journaling 참고
 * 참고 : https://ko.wikipedia.org/wiki/%EB%A1%9C%EA%B7%B8_%EC%84%A0%ED%96%89_%EA%B8%B0%EC%9E%85
 * 찾아보게 된 계기 : 논문 보다 나왔는데, 추상적으로만 이해하는게 아니라, 정확히 개념을 정립하기 위해서

## ACL(access control list)
 * 참고 : https://ko.wikipedia.org/wiki/%EC%A0%91%EA%B7%BC_%EC%A0%9C%EC%96%B4_%EB%AA%A9%EB%A1%9D
 * 개체나 개체 속성에 적용되어 있는 허가 목록
 * 찾아보게 된 계기 : f2fs github issue에 있길레

## __read_mostly 매크로 (kernel)
 * 참고 : https://poplinux.tistory.com/160
 * 자주 읽을 꺼니, 캐시에 올려놓는게 유리하다고 전달해주는 매크로

## likely && unlikely 매크로 (kernel)
 * 참조 : http://jake.dothome.co.kr/likely/
  ```c
  #define likely(x)    __builtin_expect((x), 1)
  #define unlikely(x)   __builtin_expect((x), 0)
  ```
 * likely()는 true가 될 확률이 높은 조건문에서 성능을 높이고자 사용한다.
