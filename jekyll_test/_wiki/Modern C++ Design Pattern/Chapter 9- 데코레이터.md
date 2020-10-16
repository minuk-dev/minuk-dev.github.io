---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 9. 데코레이터
summary :
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-09-26 23:21:20 +0900
tags    : [decorator, cpp]
parent  : Modern C++ Design Pattern
---

## Decorator

- Dynamic Composition
- Static Composition

### Dynamic Decorator
```cpp
  struct ColoredShape : Shape
  {
    Shape& shape;
    string color;

    ColoredShape(Shape& shape, const string& color)
      : shape{shape}, color{color} {}

    stinrg str() const override
    {
      ostringstream oss;
      oss << shape.str() <, " Has the color " << color;
      return oss.str();
    }
  };

  // Example Code
  Circle circle{0.5f};
  ColoredShape redCircle{circle, "red"};
  cout << redCircle.str();

  struct TransparentShape : Shape
  {
    Shape& shape;
    uint8_t transparency;

    TransparentShape(Shape& shape, const uint8_t transparency)
      : shape{shape}, transparency{transparency} {}

    string str() const override
    {
      ostringstream oss;
      oss << shape.str() << " has "
          << static_cast<float>(transparency) / 255.f * 100.f
          << "% transparency";
      return oss.str();
    }
  };

  // Exmaple Code
  Squre square{3};
  TransparentShape demiSquare{square, 85};
  cout << demiSqure.str();

  // Composition Exmaple
  TransparentShape myCircle {
    ColoredShape {
      Circle{23}, "green",
    }, 64
  };

  cout << myCircle.str();
```

### Static Decorator
```cpp
  template <typename T> struct ColoredShape : T
  {
    static_assert(is_base_of<Shape, T>::value,
      "Tempalte argument must be a Shape");

    string color;

    string str() const override
    {
      ostringstream oss;
      oss << T::str() << " has the color " << color;
      return oss.str();
    }

    template<typename...Args>
    ColoredShape(const string& color, Args ...args)
      : T(std::forward<Args>(args)...), color{ color } {}
  };
```

### Funtional Decorator
```cpp
  template <typename> class Logger;
  template <typename R, typename... Args>
  struct Logger<R(Args...)>
  {
    Logger(function<R(Args...)> func, const string& name)
      : func{func}, name{name} {}

    R operator() (Args ...args)
    {
      cout << "Enter " << name << endl;
      R result = func(args...);
      cout << "Exiting " << name << endl;
      return result;
    }

    function<R(Args ...)> func;
    string name;
  };

  template <typename R, typename... Args>
  auto make_logger(R (*func)(Args...), const string& name)
  {
    return Logger<R(Args...)>(
      function<R(Args...)>(func),
      name);
  }

  auto logged_add = make_logger(add, "add");
  auto result = logged_add(2, 3);
```

### Summary

- Dynamic Decorator
    - Store decoreated object, compose dynamically in runtime. However, original object member cannot access member variable.
- Static Decorator
    - Using mixin inheritance, compose in compile time. So, this method cannot compose again in runtime. However, it can access member variable. And using constructor forwarding, completely initialize object.
- Functional Decorator
    - Can overwrap a code block or other specific function to compose.


