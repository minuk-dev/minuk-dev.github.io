---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 8. 컴포지트
summary : 
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-04-09 23:43:15 +0900
tags    : 
---

## Composite Pattern

- How to announce the object has multiple composite attributes? It is not easy.

### Properties based on array.
```cpp
  class Creature
  {
    int strength, agility, intelligence;
  public:
    int get_stringth() const
    {
      return strength;
    }
    
    void set_strength(int strength)
    {
      Creture::strength = strength;
    }
    // Other getter/setter....
    int sum() const {
      return strength + agility + intelligence;
    }
  
    double average() const {
      return sum() / 3.0;
    }
  
    int max() const {
      return ::max(::max(strength, agility), intelligence);
    }
  };
```

- It is not pretty.

```cpp
  class Creature
  {
    enum Abilitis { str, agl, intl, count };
    array<int, count> abilities;
    int get_strength() const { return abilities[str]; }
    void set_strength(int value) { abilities[str] = value; }
    // Other getter/setter ...
  
    int sum() const {
      return accumulate(abilities.begin(), abilities.end(), 0);
    }
  
    double average() const {
      return sum() / (double) count;
    }
  
    int max() const {
      return *max_element(abilities.begin(), abilities.end());
    }
  };
```

### Grouping

  ```cpp
    struct GraphicObject
    {
      virtual void draw() = 0;
    };
    
    struct Circle : GraphicObject
    {
      void draw() override
      {
        cout << "Circle" << endl;
      }
    };
    
    struct Group : GraphicObject
    {
      string name;
    
      explicit Group(const string& name)
        : name{name} {}
    
      void draw() override
      {
        cout << "Group " << name.c_str() << " containes:" << endl;
        for (auto&& o : objects)
          o->draw();
      }
    
      vector<GraphicObject*> objects;
    };
    
    Group root("root");
    Circle c1, c2;
    root.objects.push_back(&c1);
    
    Group subgroup("sub");
    subgroup.objects.push_back(&c2);
    
    root.objects.push_back(&subgroup);
    
    root.draw();

  ```
