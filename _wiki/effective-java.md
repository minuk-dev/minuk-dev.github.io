---
layout  : wiki
title   : Effective Java
summary : Effective Java 책 정리
date    : 2021-12-26 17:48:34 +0900
lastmod : 2021-12-28 01:43:47 +0900
tags    : [book, java]
draft   : false
parent  : Book reviews
---

# 2. 객체 생성과 파티
## Item 1. 생성자 대신 정적 팩터리 메서드를 고려하라
```java
public static Boolean valueOf(boolean b) {
  return b ? Boolean.TRUE : Boolean.FALSE;
}
```
- 정적 팩터리 메서드의 장점
  1. 이름을 가질 수 있다.
  2. 호출될 때마다 인스턴스를 새로 생성하지는 않아도 된다.
  3. 반환 타입의 하위 타입 객체를 반환할 수 있는 능력이 있다.
  4. 입력  매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.
  5. 정적 팩터리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다.
- 정적 팩터리 메서드의 단점
  1. 생성자 없이 정적 팩터리 메서드만 제공할 시, 상속되는 클래스를 만들 수 없게 된다.
  2. 프로그래머에게 불친절하다. (일반적인 규칙으로 만들면 덜하긴 하지만, 찾는데 수고가 든다.)
    - `from` : 매개변수를 하나 받아서 해당 타입의 인스턴스를 반환하는 형변환 메서드
      ```java
      Date d = Date.from(instant);
      ```
    - `of` : 여러 매개변수를 받아 적합한 타입의 인스턴스를 반환하는 집계 메서드
      ```java
      Set<Rank> faceCards = EnumSet.of(JACK, QUEEN, KING);
      ```
    - `valueOf` : from과 of의 더 자세한 버전
      ```java
      BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);
      ```
    - `instance` 혹은 `getInstance` : (매개변수를 받는다면) 매개변수로 명시한 인스턴스를 반환하지만, 같은 인스턴스임을 보장하지는 않는다.
      ```java
      StackWalker luke = StackWalker.getInstance(options);
      ```
    - `create` 혹은 `newInstance` : instance 혹은 ㅎetInstance와 같지만, 매번 새로운 인스턴스를 생성해 반환함을 보장한다.
      ```java
      Object newArray = Array.newInstance(classObject, arrayLen);
      ```
    - `getType` : getInstance와 같으나, 생성할 클래스가 아닌 다른 클래스에 팩터리 메서드를 정의할 때 쓴다. "Type" 은 팩터리 메서드가 반환할 객체의 타입이다.
      ```java
      FileStore fs = Files.getFileStore(path);
      ```
    - `newType` : newInstance와 같으나, 생성할 클래스가 아닌 다른 클래스에 팩터리 메서드를 정의할 때 쓴다. "Type" 은 팩터리 메서드가 반환할 객체의 타입이다.
      ```java
      BufferedReader br = Files.newBufferedReader(path);
      ```
    - `type` : getType과 newType의 간결한 버전
      ```java
      List<Complaint> litany = Collections.list(legacyLitany);
      ```
## Item 2. 생성자에 매개변수가 많다면 빌더를 고려하라
- 점층적 생성자 패턴도 쓸 수는 있지만, 매개변수 개수가 많아지면 클라이언트 코드를 작성하거나 읽기 어렵다.
- 빌더는 점층적인 생성자보다 클라이언트 코드를 읽고 쓰기가 훨씬 간결하고, 자바빈즈보다 훨씬 안전하다.

## Item 3. private 생성자나 열거 타입으로 싱글턴임을 보증하라.
## Item 4. 인스턴스화를 막으려면 private 생성자를 사용하라
## Item 5. 자원을 직접 명시하지말고 의존 객체 주입을 사용하라
- 클래스가 내부적으로 하나 이상의 자원에 의존하고, 그 자원이 클래스 동작에 영향을 준다면 싱글턴과 정적 유틸리티 클래스는 사용하지 않는 것이 좋다. 이 자원들을 클래스가 직접 만들게 해서도 안된다. 대신 필요한 자원을 (혹은 그 자원을 만들어주는 팩터리를) 생성자에 (혹은 정적 팩터리나 빌더에) 넘겨주자. 의존 객체 주입이라 하는 이 기법은 클래스의 유연성, 재사용성, 테스트 용이성을 개선해준다.

## Item 6. 불필요한 객체 생성을 피하라
- 박싱된 기본 타입보다는 기본 타입을 사용하고, 의도치 않은 오토박싱이 숨어들지 않게 주의하자

## Item 7. 다 쓴 객체 참조를 해제하라
- 최소한의 scope를 선언하여, 자연스럽게 scope를 통한 참조 해제가 가장 좋다.
- 객체를 null로 처리하는 일은 예외적인 경우이여야한다.
- HashMap을 사용하여 캐시하여 속도를 개선하는 경우에, WeakHashMap 등을 고려해봐야한다. 그렇지 않을 경우 다 쓴 객체일지라도 메모리가 해지되지 않아 남아있을 수 있다.
- 메모리 누수는 겉으로 잘 드러나지 않아 시스템에 수년간 잠복하는 사례도 있는 만큼 꼼꼼한 코드 리뷰, 힙 프로파일러 같은 디버깅 도구를 동원해야만 발견되는 경우가 많다. 이런 종류의 문제를 일으키지 않기 위해서 코딩 습관을 들이고 예방하는 것이 중요하다.

## Item 8. finalizer와 cleaner 사용을 피해라.
- finalizer는 예측할 수 없고, 상황에 따라 위험할 수 있다.
- cleaner 또한 예측할 수 없고, 느리다.
- finalizer와 cleaner 둘다 실행되야 하는 시기에 맞추어 실행해야하는 작업은 절대 할 수 없다.
- 상태를 영구적으로 수정하는 작업에서는 절대 finalizer나 cleaner에 의존해서는 안된다.
- 대신 `AutoCleseable`을 구현해서 처리한다.
- cleaner(JAVA 8 이하에서는 finalizer)는 안전망 역할이나 중요하지 않은 네이티브 자원 회수용으로만 사용하자. 또한 불확실성과 성능저하에 주의하자.

## Item 9. try-finally보다는 try-with-resources를 사용하라

```java
static void copy(String src, String dst) throws IOException {
  try (InputStream in = new FileInputStream(src);
     OutputStream out = newFileOutputStream(dst)) {
    byte[] buf = new byte[BUFFER_SIZE];
    int n;
    while ((n = in.read(buf)) >= 0)
      out.write(buf, 0, n);
  }
}
```

```java
static String firstLineOfFile(String path, String defaultVal) {
  try (BufferedReader br = new BufferedReader(
    new FileReader(path))) {
    return br.readLine();
  } catch (IOException e) {
    return defaultVal;
  }
}
```

- 꼭 회수해야 하는 자원을 다룰 때는 try-finally 말고, try-with-resources를 사용하자. 예외는 없다. 코드는 더 짧고 분명해지고, 만들어지는 예외 정보도 훨씬 유용하다. try-finally로 작성하면 실용적이지 못할 만큼 코드가 지저분해지는 경우라도, try-with-resources로는 정확하고 쉽게 자원을 회수할 수 있다.

# 3. 모든 객체의 공통 메서드
## Item 10. equals는 일반 규약을 지켜 재정의하라
- 재정의하지 않아야 되는 상황
  - 각 인스턴스가 본질적으로 고유하다.
  - 인스턴스의 "논리적 동치성(logical equality)"을 검사할 일이 없다.
  - 상위 클래스에서 재정의한 equals가 하위 클래스에도 딱 들어맞는다.
  - 클래스가 private이거나 package-private이고 equals 매서드를 호출할 일이 없다.
- 재정의 해야하는 상황
  - 객체 식별성이 아닌 논리적 동치성을 확인해야할 때
- equals 가 만족해야 하는 성질
  - 반사성(reflexivity) : null이 아닌 모든 참조 값 x에 대해, `x.equals(x)`는 true이다.
  - 대칭성(symmetry) : null이 아닌 모든 참조 값 x,y에 대해, `x.equals(y)`가 true이면 `y.equals(x)`도 true이다.
  - 추이성(transitivity) : null이 아닌 모든 참조 값 x,y,z에 대해, `x.equals(y)`가 true이고 `y.equals(z)` 도 true이면, `x.equals(z)`도 true 이여야한다.
  - 일관성(consistency) : null이 아닌 모든 참조 값 x,y에 대해, `xequals(y)`를 반복해서 호출하면 항상 true를 반환하거나 항상 false를 반환한다.
  - null-아님 : null이 아닌 모든 참조 값 x에 대해, x.equals(null)은 false이다.
- equals의 구현 순서
  1. `==` 연산자를 사용해 입력이 자기 자신의 참조인지 확인한다.
  2. `instanceof` 연산자로 입력이 올바른 타입인지 확인한다.
  3. 입력을 올바른 타입으로 형변환 한다.
  4. 입력 객체와 자기 자신의 대응되는 핵심 필드들이 모두 일치하는지 하나씩 검사한다.
- equals 구현의 주의사항
  - equals를 재정의 할 땐 hashCode도 반드시 재정의하자
  - 너무 복잡하게 해결하지 말자
  - Object 외의 타입을 매개변수로 받는 equals 메서드는 선언하지 말자

## Item 11. equals를 재정의하려거든 hashCode도 재정의하라
- equals를 재정의한 클래스 모두에서 hashCode도 재정의해야한다.
- hashCode 일반규약
  - equals 비교에 사용되는 정보가 변경되지 않았다면, 애플리케이션이 실행되는 동안 그 객체의 hashCode 메서드는 몇 번을 호출해도 일관되게 항상 같은 값을 반환해야한다. 단, 애플리케이션을 다시 실행한다면 이 값이 달라져도 상관없다.
  - equals(Object)가 두 객체를 같다고 판단했다면, 두 객체의 hashCode는 똑같은 값을 반환해야한다.
  - equals(Object)가 두 객체를 다르게 판단했더라도, 두 객체의 hashCode가 서로 다른 값을 반환할 필요는 없다. 단, 다른 객체에 대해서는 다른 값을 반환해야 해시테이블의 성능이 좋아진다.
- AutoValue 프레임워크 등을 이용하면 equals와 hashCode를 자동으로 만들어주기도 한다.

## Item 12. toString을 항상 재정의하라
- toString을 잘 구현한 클래스는 디버깅하기 쉽다.
- to String은 그 객체가 가진 주요 정보를 모두 반환하는 게 좋다.
- 포맷을 명시하든 아니든 의도가 명확해야 한다.
- toString이 반환 값에 포함된 정보를 얻어올 수 있는 API를 제공해야한다.

## Item 13. clone 재정의는 주의해서 진행하라
- Cloneable을 구현한 클래스는 clone 메서드를 public으로 제공하며, 사용자는 당연히 복제가 제대로 이뤄질거라 기대한다.
- final 클래스라면 Coneable을 구현해도 위험이 크지 않지만, 성능을 고려해서는 자주 사용해서는 안된다.
- 복제 기능은 clone을 통하는 것이 아닌, 생성자와 팩터리를 이용하는 것이 좋다.
- 단, 예외로 배열만은 clone 메서드 방식이 가장 깔끔한 예외이다.

## Item 14. Comparable을 구현할지 고려하라
- compareTo 메서드의 일반 규약
  - 이 객체와 주어진 객체의 순서를 비교한다. 이 객체가 주어진 객체보다 작으면 음의 정수를, 같으면 0을, 크면 양의 정수를 반환한다. 이 객체와 비교할 수 없는 타입의 객체가 주어지면 ClassCastException을 던진다.
  - Comparable을 구현한 클래스는 모든 x,y에 대해 `sgn(x.compareTo(y)) == -sgn(y.compareTo(x))` 이여야한다. (이는 `x.compareTo(y)`가 예외를 발생시킨다면, `y.compareTo(x)` 또한 예외를 발생시켜야한다. 여기서 `sgn`은 부호를 추출하는 임의의 표기일뿐 실제 함수는 아니다.)
  - Comparable을 구현한 클래스는 추이성을 보장해야한다. 즉, `(x.compareTo(y) > 0 && y.compareTo(z) > 0)`이면, `x.compareTo(z) > 0` 이다.
  - Comparable을 구현한 클래스는 모든 z에 대해 `x.compareTo(y) == 0` 이면 `sgn(x.compareTo(z)) == sgn(y.compareTo(z))`이다.
  - 다음 권고는 필수는 아니지만 지키는 것이 좋다. `(x.compareTo(y) == 0) == (x.equals(y))`여야한다. 만약 이를 지키지 않는 클래스라면 아래와 같은 명시를 해야한다.
    - 주의: 이 클래스의 순서는 equals 메서드와 일관되지 않다.

```java
static Comparator<Object> hashCodeOrder = new Comparator<>() {
  public int compare(Object o1, Object o2) {
    return Integer.compare(o1.hashCode(), o2.hashCode());
  }
}
```

```java
static Comparator<Object> hashCodeOrder =
  Comparator.comparingInt(o -> o.hashCode());
```
