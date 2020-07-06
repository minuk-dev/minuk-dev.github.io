---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 14. 커맨드
summary : 
date    : 2020-04-19 21:40:23 +0900
lastmod : 2020-04-19 22:22:20 +0900
tags    : [cpp, design pattern, command pattern]
draft   : false
parent  : 
---

## 필요성
* 어떤 객체를 활용할 때 직접 그 객체의 API를 호출하여 조작하는 대신, 작업을 어떻게 하라고 명령을 보내는 방식을 제안한다.

## 시나리오
```cpp
struct BankAccount
{
  int balance = 0;
  int overdraft_limit = -500;
  
  void deposit(int amount)
  {
    balance += amount;
    cout << "deposited " << amount << ", balance is now " << balance << "\n";
  }
  
  void withdraw(int amount)
  {
    if (balance - amount >= overdraft_limit)
    {
      balance -= amount;
      cout << "withdrew " << amount << ", balance is now " << balance << "\n";
    }
  }
};
```

## 커맨드 패턴의 구현
```cpp
struct Command
{
  virtual void call() const = 0;
};

struct BankAccountCommand : Command
{
  BankAccount& account;
  enum Action { deposit, withdraw } action;
  int amount;
  
  BankAccountCommand(BankAccount& account, const Action action, const int amount)
    : account(account), action(action), amount(amount) {}
    
  void call() const override
  {
    switch (action)
    {
    case deposit:
      account.deposit(amount);
      break;
    case withdraw:
      account.withdraw(amount);
      break;
    }
  }
};

/*
BankAccount ba;
BankAccountCommand cmd{ba, BankAccountCommand::deposit, 100};
cmd.call();
*/
```

## 되돌리기(Undo) 작업
```cpp
struct BankAccount
{
  bool widthdraw(int amount)
  {
    if (balance - amount >= overdraft_limit)
    {
      balance -= amount;
      cout << "widthdrew " << amount << ", balance now " << balance << "\n";
      return true;
    }
    return flase;
  }
};
struct Command
{
  virtual void call() const = 0;
  virtual void undo() const = 0;
};

struct BankAccountCommand : Command
{
  BankAccount& account;
  enum Action { deposit, withdraw } action;
  int amount;
  bool widthdrawal_succeeded;
  
  BankAccountCommand(BankAccount& account, const Action action, const int amount)
    : account(account), action(action), amount(amount), widthdrawal_succeeded{false} {}
    
  void call() const override
  {
    switch (action)
    {
    case deposit:
      account.deposit(amount);
      break;
    case withdraw:
      widthdrawal_succeeded = account.withdraw(amount);
      break;
    }
  }
  
  void undo() const override
  {
    switch (action)
    {
    case widthdraw:
      if (widthdrawal_succeeded)
        account.deposit(amount);
      break;
    case deposit:
      account.widthdraw(amount);
      break;
    }
  }
};

/*
BankAccount ba;
BankAccountCommand cmd{ba, BankAccountCommand::deposit, 100};
cmd.call();
*/
```

## 컴포지트 커맨드
```cpp
struct CompositeBankAccountCommand : vector<BankAccountCommand>, Command
{
  CompositeBankAccountCommand(const initializer_list<value_type>& items)
    : vector<BankAccountCommand>(items) {}
    
  void call() override
  {
    for (auto& cmd : *this)
      cmd.call();
  }
  
  void undo() override
  {
    for (auto it = rbegin(); it != rend(); ++it)
      it->undo();
  }
}

struct Command {
  bool succeeded;
}
```

## 명령과 조회의 분리
* Command Query Separation (CQS)

## 요약
* 작업 지시 내용을 감싸는 특별한 객체를 두어 객체와 커뮤니케이션 하게 한다.
