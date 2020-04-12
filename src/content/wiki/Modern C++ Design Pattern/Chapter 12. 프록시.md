---
layout  : wiki
title   : Modern C++ Design Pattern/Chapter 12. 프록시
summary : 
date    : 2020-04-12 23:10:03 +0900
lastmod : 2020-04-12 23:34:39 +0900
tags    : [cpp, design pattern, proxy]
draft   : true
parent  : 
---

## 스마트 포인터
* 가장 단순하면서도 직접적인 프록시 패턴의 예

## 속성 프록시
* 다른 프로그래밍 언어에서는 `get/set` 메서드를 지원하는 경우도 있음.
```cpp
template <typename T> struct Property
{
  T value;
  Property(const T initial_value)
  {
    *this = initial_value;
  }
  operate T()
  {
    return value;
  }
  T operator=(T new_value)
  {
  return value = new_value;
  }
}


struct Creature
{
  Property<int> strength{ 10 };
  Property<int> agility{ 5 };
}

Creature creature;
creature.agility = 20;
auto x = creature.strength;
```

## 가상 프록시
* `nullptr`나 초기화되지 않은 포인터를 역참조하면 크래시가 발생함.
* `lazy instantiation`을 하여 불필요하게 일찍 자원이 할당되지 않게 할수 있다.
```cpp
struct Image
{
  virtual void draw() = 0;
};

struct Bitmap : Image
{
  Bitmap(const string& filename)
  {
    cout << "Loading image from " << filename << endl;
  }
  
  void draw() override
  {
    cout << "Drawing Image " << filename << endl;
  }
};

struct LazyBitmap : Image
{
  LazyBitmap(const string& filename)
    : filename(filename) {}
  ~LazyBitmap() { delete bmp; }
  void draw() override
  {
    if (!bmp)
      bmp = new Bitmap(filename);
    bmp->draw();
  }
  
private:
  Bitmap *bmp(nullptr);
  string filename;
};
```

## 커뮤니케이션 프록시
## 요약
* [[Modern C++ Design Pattern/Chapter 9. 데코레이터]]{데코레이터 패턴}과는 다르게 프록시는 어떤 객체에 새로운 맴버를 추가하여 기능을 확장하지 않는다.
* 프록시에는 다양한 종류가 있다.
  * 속성 프록시는 필드를 대신하여 클래스에 내장되는 객체로 접근/대입 연사자가 구동될 때 추가적인 작업을 수행할 수 있게 한다.
  * 버츄얼 프록시는 감싸고 있는 객체에 가상으로 접근할 수 있게 한다. 이를 통해 느긋한 객체의 로딩을 구현할 수 있다.
  * 커뮤니케이션 프록시는 객체의 물리적 위치를 바꾸면서도 API를 기존과 거의 동일하게 유지할 수 있게 해준다.
  * 로깅 프록시는 감싸진 함수가 호출될 때 로깅과 같은 추가적인 작업을 수행할 수 있게 해준다.
