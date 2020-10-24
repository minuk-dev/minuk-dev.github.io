---
layout  : wiki
title   : others
summary : 어디에 넣어야할지 모르겠는 잡스러운 지식글들
date    : 2020-10-01 23:55:41 +0900
lastmod : 2020-10-24 16:48:27 +0900
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

## ceph
 * 참고 : https://blurblah.net/1298
 * 분산 object store이자 file system, 분산 클러스터 위에서 storage 인터페이스를 제공
 * 찾아보게 된 계기 : linux kernel mail(linux-fsdevel)로부터 처음 보는 파일 시스템이 있길레

## do{} while(0)
 * 참고 : https://woodz.tistory.com/68
 * if 문 뒤 괄호없이 쓸수 있기 때문에, #define으로 선언할때 do-while(0)로 묶어둔다.

## asmlinkage
 * 참고 : http://egloos.zum.com/studyfoss/v/4951809
 * 어셈블리 코드에서 직접 호출할 수 있다는 의미
 * 정의 (include/linux/linkage.h)
   ```c
   #include <linux/config.h>
   #include <asm/linkage.h>

   #ifdef __cplusplus
   #define CPP_ASMLINKAGE exter "C"
   #else
   #define CPP_ASMLINKAGE
   #endif

   #ifndef asmlinkage
   #define asmlinkage CPP_ASMLINKAGE
   #endif
   ```
 * 함수부 앞에 붙이게 된다면 함수 인자 전달을 모두 스택을 통해서 전달하게된다.
