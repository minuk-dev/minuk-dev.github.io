---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 7. 브릿지
summary : 
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-04-09 23:40:18 +0900
tags    : 
---


## Bridge Pattern

### Pimpl (Pointer to Implmentation)
```cpp
    struct Person
    {
      string name;
      void greet();
    
      Person();
      ~Person();
    
      class PersonImpl;
      PersonImpl *impl; // refer to gsl::owner<T>
    };
    
    struct Person:PersonImpl
    {
      void greet(Person* p);
    }
    
    Person::Person()
      : impl(new PersonImpl) {}
    
    Person::~Person() { delete imple; }
    
    void Person::greet()
    {
      impl->greet(this);
    }
    
    void Person::PersonImpl::greet(Person* p)
    {
      printf("hello %s", p->name.c_str());
    }
```

- Props
    - Hide implementation. If `Person` class has many private/protected member variable, it is exposed though the header file to client.
    - Ensure binary compatiblity.
    - Include some header file needed.

## Bridge Pattern

```cpp
    struct Renderer
    {
      virtual void render_circle(float x, float y, float radius) = 0;
    };
    
    struct VectorRenderer : Renderer
    {
      void render_circle(float x, float y, float radius) override
      {
        cout << "Rasterizing circle of radius " << radius << endl;
      }
    };
    
    struct RasterRenderer : Renderer
    {
      void render_circle(float x, float y, float radius) override
      {
        cout << "Drawing a vector circle of radius " << radius << endl;
      }
    };
    
    struct Shape
    {
    protected:
      Renderer& renderer;
      Shape(Renderer& renderer) : renderer{ renderer } {}
    public:
      virtual void draw() = 0;
      virtual void resize(float factor) = 0;
    };
    
    struct Circle : Shape
    {
      float x, y, radius;
    
      void draw() override
      {
        renderer.render_circle(x, y, radius);
      }
    
      void resize(float factor) override
      {
        radius += factor;
      }
    
      Circle(Renderer& renderer, float x, float y, float radius)
        : Shape{renderer}, x{x}, y{y}, radius{radius} {}
    };
```

### Summary

- The bridge pattern must to know each other class except implmentation. It is compared with Mediator Pattern.

