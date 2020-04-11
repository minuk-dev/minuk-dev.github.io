---
layout  : wiki
title   : Modern C++ Design Pattern
summary : 
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-04-11 23:27:22 +0900
tags    : 
---

## Summary
 * [[Modern C++ Design Pattern/Chapter 1. 개요]]
 * 제 1부 생성 패턴
   * [[Modern C++ Design Pattern/Chapter 2. 빌더]]
   * [[Modern C++ Design Pattern/Chapter 3. 팩토리]]
   * [[Modern C++ Design Pattern/Chapter 4. 프로토타입]]
   * [[Modern C++ Design Pattern/Chapter 5. 싱글턴]]
 * 제 2부 구조 패턴
    - In design step, we use well-known three ways.
      - Inheritance
      - Composition
      - Aggregation : One object can be independant nevertheless the  object refer to another object. For example, `T*` or `shared_ptr<T>`
   * [[Modern C++ Design Pattern/Chapter 6. 어댑터]]
   * [[Modern C++ Design Pattern/Chapter 7. 브릿지]]
   * [[Modern C++ Design Pattern/Chapter 8. 컴포지트]]
   * [[Modern C++ Design Pattern/Chapter 9. 데코레이터]]
   * [[Modern C++ Design Pattern/Chapter 10. 퍼사드]]
   * [[Modern C++ Design Pattern/Chapter 11. 플라이웨이트]]

---

    ---
    ## Facade Pattern

    - Facade pattern is needed in situation, when use complicated subsystems.
    - It provides a simple interface that control this subsystems.

    ## Flywieight
