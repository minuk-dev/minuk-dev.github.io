---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 4. 프로토타입
summary : 
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-04-11 00:12:01 +0900
tags    : 
---

## 객체 생성
*  같은 값으로 중복되게 초기화 되는 작업이 발생
## 중복처리
```cpp
struct Address
{
  string street, city;
  int suite;
}
struct Contact
{
  string name;
  Address address;
}

struct Contact
{
  string name;
  Address* address;
}
```
* 복제 생성자를 통한 중복 초기화
* 복제 생성자를 배제하고 별도의 인터페이스
```cpp
template <typename T> struct Clonable
{
  virtual T clone() const = 0;
}
```
## 직렬화(Serialization)
```
struct Contact
{
  string name;
  Address* address = nullptr;
  private:
  friend class boost:serialization::access;
  template<class Ar> void serialize(Ar& ar, const unsigned int version)
  {
    ar & name;
    ar & address; // *가 없다는 것에 주의
  }
};


auto clone = [](const Contact& c)
{
  ostringstream oss;
  boost::achive::text_oarchive oa(oss);
  oa << c;
  string s = oss.str();

  istringstream iss(oss.str());
  boost::arhive::text_iarchive ia(iss);
  Contact result;
  ia >> result;
  return result;
}
```
## 프로토타입 팩터리
```cpp
struct EmployeeFactory
{
  static Contact main;
  static Contact aux;

  static unique_ptr<Contact> NewMainOfficeEmployee(string name, int suite)
  {
    return NewEmployee(name, suite, main);
  }

  static unique_ptr<Contact> NewAuxOfficeEmployee(string name, int suite)
  {
    return NewEmployee(name, suite, aux);
  }

  private:
  static unique_ptr<Contact> NewEmployee(string name, int suite, Contact& proto)
  {
    auto result = make_unique<Contact>(proto);
    result->name = name;
    result->address->suite = suite;
    return result;
  }
};
```
## 요약
* 객체의 깊은 복제를 올바르게 수행하는 코드를 작성한다. 복제 생성자나 복제 대입 연산자를 구현할 수 도 있고 별도의 맴버 함수를 만들 수도 있다.
* 직렬화/역직렬화 기능을 구현하여, 직렬화 직후 역직렬화를 하는 방법으로 복제를 한다. 이 방법은 부가적인 연산 비용이 발생한다.
