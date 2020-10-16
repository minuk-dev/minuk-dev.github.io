# ---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 3. 팩토리
summary :
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-09-26 23:15:49 +0900
tags    :
parent  : Modern C++ Design Pattern
---
## Factory Class
```cpp
    struct Point
    {
      float x, y;
      friend class PointFacotry;
    private:
      Point(float x, float y)
        : x(x), y(y)
      {}
    };

    struct PointFactory
    {
      static Point NewCartesian(float x, float y)
      {
        return Point{x, y};
      }
      static Point NewPolar(float r, flaot theta)
      {
        return Point{r * cos(theta), r * sin (theta)};
      }
    };
```

## Inner Factory
```cpp
    struct Point
    {
    private:
      Point(float x, float y)
      : x(x), y(y)
      {}
      struct PointFactory
      {
      private:
        PointFactory() {}
      public :
        static Point NewCartesian (float x, float y)
        {
          return {x, y};
        }
        static Point NewPolar (float r, float theta)
        {
          return {r * cos(theta), r * sin (theta)};
        }
      };

    public:
      float x, y;
      static pointFactory Factory;
    };
```

## Abstract Factory

```cpp
    struct HotDrink
    {
      virtual void prepare (int volume) = 0;
    };
    struct Tea: HotDrink
    {
      void prepare (int volume) override
      {
        cout << "Take tea bag, boil water, pour" << volume
        << "ml, add some lemon" << endl;
      }
    };

    class DrinkFactory
    {
      map<string, unique_ptr<HotDrinkFactory>> hot_factories;
    public:
      DrinkFactory()
      {
        hot_factories["coffee"] = make_unique<CoffeeFactory>();
        hot_factories["tea"] = make_unique<TeaFactory>();
      }
        unique_ptr<HotDrink> make_drink(const string& name)
      {
        auto drink = hot_factories[name] -> make();
        drink->prepare(200);  // 200 must be changed other constant variable
        return drink;
      }
    };
```

## Functional Factory

```cpp
    class DrinkWithVolumeFactory
    {
      map<string, function<unique_ptr<HotDrink>()>> factories;
    public:
      DrinkWithVolumeFactory()
      {
        factories["tea"]= [] [
        auto tea = make_unique<Tea>();
        tea->prepare(200);
        return tea;
      };
    };
    inline unique_ptr<HotDrink>
    DrinkWithVolumeFactory:: make_drink(const string& name)
    {
      return factories[name]();
    }
```

## Summary

- "Factory Method", which is member function of creation type, create object and return it.
- Factory, which is a separate class, must know the way how to create object. So if a function that know it is called factory.
- Abstract Factory is abstract class which is super class that inherit implementation class. It is used in the situation that Factory must create multiple type Family, not only one type.
- Props
    - Factory can deny creation call. It is naturally failed to return `nullptr`.
    - It can be named with high readability. Constructor must be same name with class, but it can be allocate a name that present usage well.
    - Only One Factory, Multiple type Object.
    - Factory Pattern also supports polymorphism.
    - Factory can be implemented with memory optimization like "caching". It provide very atural code that can be applied "pooling" or "Singleton Pattern".
- Factory and Builder is different : Factory create object at once. But Builder create with passing multiple stage that need stage information.


