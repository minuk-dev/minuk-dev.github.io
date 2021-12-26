---
layout  : wiki
title   : Effective Java
summary : Effective Java 책 정리
date    : 2021-12-26 17:48:34 +0900
lastmod : 2021-12-26 17:49:16 +0900
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
