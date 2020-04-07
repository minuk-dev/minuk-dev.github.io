---
layout  : wiki
title   : 
summary : 
date    : 2020-04-07 20:16:46 +0900
lastmod : 2020-04-07 20:16:47 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# # 주제 후보

- 메모리 누수란 왜 일어나는가? - garbage collector의 동작방식, javascript 에서 메모리 누수 없이 코딩하는 습관 가지기
- 비동기처리하기 - javascript callback, promise, async-await
- 웹사이트에서 원하는 정보 추출하기 - 웹사이트 크롤링, 파싱하기
- 나무위키 유의어, 반의어 - Word2Vec를 통한 나무위키 데이터 학습

→ 익명의 대학 동기에게 재밋는 주제를 고르라고 해서 진행되었습니다.

## 메모리 누수란 왜 일어나는가?

### 결론부터 말하자면 프로그래머의 실수. 코딩 습관을 잘 들이자.

- Garbage Collection 의 필요성
    - C언어에서 메모리를 직접 할당하고 해제하는 malloc, free 라는 방식을 사용하였다.

        #include <stdio.h>
        #include <stdlib.h>
        
        int main(int argc, char** argv) {
        	int n;
        	scanf("%d",&n);
        	int* arr = (int*)malloc(sizeof(int) * n);
          // do something
        	free(arr);
        	return 0;
        }

    - → 소프트웨어의 규모가 커지고 협업이 증가하면서 메모리를 책임지지 못하게 되었다.
    - →Garbage Collection의 필요성 (cf. rust 의 memory ownership)
        - 단, 최초의 GC는 LISP 이라는 언어에서부터 있었다고 알려져있음.(1958년)

## Garbage Collection

### 초기 아이디어 - 참조 카운트(Reference Counting)

    A a = new A();
    a.b = new B();
    a.b.c = new C();
    
    
    a.b.c = null;

    f();
    
    
    void f() {
      A a = new A();
     // do something
    }

이 때 f 메서드 바깥에서는 a가 사용되지 않는다.

a가 가르키던 메모리 공간에 대해서 f가 끝나면 reference count가 감소하여 reference count가 0이 되었다고 판단하고 gc가 할당을 해제한다.

- 문제점 - 순환 참조 (Circular Referencing)

    A a = new A();
    B b = new B();
    a.refB = b;
    b.refA = a;
    a = null;
    b = null;

a와 b의 공간에 더이상 접근가능한 객체가 없음에도 불구하고 a와 b의 reference count 는 각각 1이기 때문에 gc가 메모리 해제를 하지 않는다.

- cf. c++ shared_ptr 이 이러한 방식을 사용한다.

### 도달 가능한 (reachable) 객체만 남기자 - Mark and Sweep

  

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aa41f1a8-0115-4e9f-9995-a0b1f1dc210a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aa41f1a8-0115-4e9f-9995-a0b1f1dc210a/Untitled.png)

출처 : [https://en.wikipedia.org/wiki/Tracing_garbage_collection#Naïve_mark-and-sweep](https://en.wikipedia.org/wiki/Tracing_garbage_collection#Na%C3%AFve_mark-and-sweep)

- Root Set - 항상 유요한 최초의 참조
- 만약 RootSet 에서부터 참조 가능한 모든 객체를 Mark 했는데 Mark가 안된 Object가 있다면 그 객체는 도달 불가능한 객체(unreachable)이므로 삭제(Sweep)한다.
- cf. Copying Algorithm → Fragementation 문제 해결하는 방법 (Compaction)

단점

- 그러면 gc가 돌때마다 모든 Object 를 전부 찾아봐야한다.

### Generational Algorithm

- Weak generational hypothesis
    - 대부분의 객체는 금방 Garbage가 된다.
    - 오래된 객체들이 최근에 생성된 객체로의 참조는 거의 없다.
- 젊은 세대 (young generation)과 오래된 세대(old generation)으로 객체를 구분하고 각 세대별로 처리 작업을 다르게 하자
    - 젊은 세대들은 훨씬 더 collection 이 자주 일어난다. (minor collection) - 대부분의 객체들은 금방 Garbage 가 된다.
    - 오래된 세대들은 상대적으로 적게 일어난다 (major collection)
    - 살아남은 젊은 세대들은 오래된 세대가 된다.(물론 오래된 세대가 되는데에 대한 규칙은 다들 약간씩 다를수 있다.)

- 참고글

[데블스캠프2017/Internal Of Java Script Core's Garbage Collector](https://wiki.zeropage.org/wiki.php/%EB%8D%B0%EB%B8%94%EC%8A%A4%EC%BA%A0%ED%94%842017/InternalOfJavaScriptCore%27sGarbageCollector)

[자바스크립트에서 메모리 누수의 4가지 형태](https://itstory.tk/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98%EC%9D%98-4%EA%B0%80%EC%A7%80-%ED%98%95%ED%83%9C)

[NAVER D2](https://d2.naver.com/helloworld/1329)

[[Rust] 러스트의 꽃, Ownership 파헤치기](https://medium.com/@skc7401/rust-%EB%9F%AC%EC%8A%A4%ED%8A%B8%EC%9D%98-%EA%BD%83-ownership-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0-2f9c6b744c38)

[Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)

[https://www.ps.uni-saarland.de/courses/gc-ws01/slides/generational_gc.pd](https://www.ps.uni-saarland.de/courses/gc-ws01/slides/generational_gc.pdf)[https://www.ibm.com/developerworks/web/library/wa-memleak/wa-memleak-pdf.pdf](https://www.ibm.com/developerworks/web/library/wa-memleak/wa-memleak-pdf.pdf)

    function foo(arg) {
      bar = "global variable";
    }
    
    
    function foo(arg) {
      window.bar = "global variable";
    }

    var someResource =getData();
    setInterval(function() {
      var node = document.getElementById('Node');
      if (node) {
        // something
        node.innerHTML = JSON.stringify(someResource);
      }
    }, 1000);
    

[Garbage collection](https://javascript.info/garbage-collection)

[mbbill/JSC.js](https://github.com/mbbill/JSC.js)

[https://www.ibm.com/developerworks/web/library/wa-memleak/wa-memleak-pdf.pdf](https://www.ibm.com/developerworks/web/library/wa-memleak/wa-memleak-pdf.pdf)
