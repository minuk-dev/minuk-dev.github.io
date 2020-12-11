---
layout  : wiki
title   : others
summary : 어디에 넣어야할지 모르겠는 잡스러운 지식글들
date    : 2020-10-01 23:55:41 +0900
lastmod : 2020-12-11 15:52:28 +0900
tags    :
draft   : false
parent  :
---

## 잡다한거
 * [[5 articles per week]]

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

## asmlinkage 매크로
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

## latent_entropy 매크로
 * 참고 : https://lwn.net/Articles/689145/
 * 참고 내용 대충 번역
   ```
   latent_entropy 라는 gcc plugin 을 소개한다.
   이 플러그인을 사용하면 부팅 과정 중과 부팅 이후, 암호화 키를 생성하는 과정에서 너무 entropy 가 낮아지는 문제를 완화한다. => 부팅할 때 무작위성과 관련하여 문제가 있어서 이를 해결하는 plugin 이라는 뜻인듯?

   이 플러그인은 함수 앞에 __latent_entropy 라는 속성을 적어주면 랜덤한 값을 전역 변수에 섞어준다. (~~~) 한국어로 번역하기 힘든데, 이렇게 전역변수를 건들여주면 전체적으로 무작위성이 증가해서 커널의 엔트로피가 커진다.(무작위성을 저격해서 취약점을 공격하기 어려워진다.) 라는 뜻인듯
   ```
 * 보안 패치와 관련된 플러그인을 사용하겠다는 것이고, 커널의 무작위성을 높여주는 속성이다. 무작위성과 관련된 취약점이 많다고 생각해서 추가한듯.

## __sched 키워드
 * 참고 : https://teamcrak.tistory.com/130, https://www.unix.com/programming/162267-linux-kernel-code-syntax-doubt.html
```c
asmlinkage void __sched schedule(void);
#define __sched __attribute__((__section__(".sched.text")))
```
 * `__attribute__` 는 컴파일러에게 옵션을 주기 위함으로 cl 컴파일러의 `#pragma` 와 유사하다
 * 정의의 내용은 메모리 공간의 어디 부분에 이 함수를 넣으라고 명시하는 것이며, schedule 함수들을 한곳에 모아 `in_sched_functions()` 같은 함수를 만들기 위함이다. (wchan 은 프로세스가 실행하고 있는 커널 루틴)
 * 현재 프로세스가 실행하는 메모리 공간을 확인하는 함수가 스케쥴링 중일 때에도 올바른 주소를 반환하는 건, 이 함수를 사용해서이며, 이 함수에서 스케쥴링 상태인지를 확인하는 건 실행 주소가 sched 섹션인지를 확인하는 것이다.
 * 이렇게 하면 스케쥴링 함수들을 모두 한 메모리 영역에 몰아넣고 PC가 그 안에 있는지 체크하면 된다.
 * __sched 키워드만 이런식으로 메모리 공간을 활용하는 것이 아닌데, 이는 여기에 있는 참고 1을 확인하면 된다.
