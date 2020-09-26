---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 13. 책임사슬(Chain of Responsibility)
summary :
date    : 2020-04-18 22:14:11 +0900
lastmod : 2020-09-26 23:22:30 +0900
tags    : [cpp, design pattern, chain of responsibility]
draft   : false
parent  : Modern C++ Design Pattern
---

## 시나리오
```cpp
struct Creature
{
  string name;
  int attack, defense;
  // Constructor, operator...
};
```
## 포인터 사슬
```cpp
class CreatureModifier
{
  CreatureModifier* next{nullptr};
protected:
  Creature& creture; // reference, pointer or shared_ptr
public:
  explicit CreatureModifier(Creature& creature)
    : creature(creture) {}

  void add(CreatureModifier* cm)
  {
    if (next) next->add(cm);
    else next =cm;
  }

  virtual void handle()
  {
    if (next) next->handle();
  }
};
```
* 참조를 넘겨받아 저장하고 변경할 준비
* 추상 클래스가 아님
* `next`는 다음 변경 작업을 가리킴
* `add()`를 통해서 작업 사슬에 연결하여 추가
* `handle()` 맴버 함수는 단순히 다음 항목을 처리한다. 원한다면 오버라이딩해서
  처리한다.
```cpp
class DoubleAttackModifier : public CreatureModifier
{
public:
  explicit DoubleAttackModifier(Creature& creature)
    : CreatureModifier(creature) {}

  void handle() override
  {
    creature.attack *= 2;
    CreatureModifier::handle();
  }
};
```
```cpp
class NoBonusesModifier : public CreatureModifier
{
public:
  explicit NoBonusesModifer(Creature& creature)
    : CreatureModifier(creature) {}

  void handle() override
  {
    // Do Nothing
  }
};
```
## 브로커 사슬
```cpp
struct Game
{
  signal<void(Query&)> queries; // Boost.Signals2
};

struct Query
{
  string creature_name;
  enum Argumnet { attack, defense } argument;
  int result;
};

class Creature
{
  Game& game;
  int attack, defense;
public:
  string name;
  Creature(Game& game, ...) : game{game}, ... { ... }
  // Other Members
};

int Creature::get_attack() const
{
  Query q{ name, Query::Argument::attack, attack };
  game.queries(q);
  return q.result;
}

class CreatureModifier
{
  Game& game;
  Creature& creature;
public:
  CreatureModifier(Game& game, Creature& creature)
    : game(game), creature(creature) {}
};

class DoubleAttackModifier : public CreatureModifier
{
  connection conn;
public:
  DoubleAttackModifier(Game& game, Creature& creature)
    : CreatureModifier(game, creature)
  {
    conn = game.queries.connect([&](Query& q) {
      if (q.creature_name == creature.name &&
        q.argument == Query::Argument::attack)
        q.result *= 2;
    })
  }

  ~DoubleAttackModifier() { conn.disconnect(); }
}
```

## 요약
* 컴포넌트들이 어떤 명령이나 조회 작업을 차례로 처리할 수 있게 하는 매우 단순한
  디자인 패턴이다.
* 이론적으로 포인터 사슬은 보통 `vector`나 `list`로 대체될 수 있다.
* 좀 더 복잡한 브로커 사슬의 구현에서는 매개자 패턴과 관찰자 패턴을 활용한다.
