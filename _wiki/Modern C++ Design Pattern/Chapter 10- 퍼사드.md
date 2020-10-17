---
layout  : wiki
title   : Modern C++ Design Pattern/Chapter 10. 퍼사드
summary :
date    : 2020-04-09 23:56:51 +0900
lastmod : 2020-09-26 23:21:33 +0900
tags    : [cpp, design pattern, facade]
draft   : false
parent  : Modern C++ Design Pattern
---

## 퍼사드는 어디에 있는가?
```cpp
struct Console
{
  vector<Viewport*> viewports;
  Size charSize, gridSize;
};

Console::Console(bool fullscreen, int char_width, int char_height,
  int width, int height, optional<Size> client_size)
{
  // Implement
}

Console::Console(const ConsoleCreateionParamters* ccp) { ... }

struct ConsoleCreationParameters
{
  optional<Size> client_size;
  int character_width{10};
  int character_height{14};
  int width{20};
  int height{30};
  bool fullscreen{false};
  bool create_default_view_and_buffer{true};
};

```

## 요약
* 하나 이상의 복잡한 서브 시스템 앞에 단순한 인터페이스를 두기 위한 방법
