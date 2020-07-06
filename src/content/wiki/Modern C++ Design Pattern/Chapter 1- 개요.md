---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 1. 개요
summary : 
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-04-09 23:18:06 +0900
tags    : 
---
## CRTP(Curiously Recurring Template Pattern)
```cpp
struct Foo : SomeBase<Foo>
{
 ... 
}

template <typename Derived>
struct SomeBase
{
  void foo()
  {
    for (auto& item : *static_cast<Derived*>(this))
    {
    ...
    }
  }
}
```

### Property
```cpp
  class Person
  {
  private:
    int age_;
  public:
    int get_age() const {return age_; }
    void set_age(int value) {age_ = value; }
    __declspec(property(get=get_age, put=set_age)) int age;
  }
  
  Person p;
  p.age = 20; // calls p.set_age(20)
```

## Factory

### Factory Method
```cpp
  struct Point 
  {
  protected:
    Point(const float x, const float y)
      : x {x}, y {y}
    {}
  
  public:
    static Point NewCartesian(float x, float y) 
    {
      return {x, y};
    }
    static Point NewPolar(float r, float theta)
    {
      return {r * cos(theta), r * sin(theta)};
    }
    // skip
  };
```

### SOLID Design Principle

- SRP(Single Responsibility Principle)
    - If you need to edit a few classes(or little more?) in some very small retouching, there is an omen of something problem. It is named `code smell`
```cpp
struct Journal
{
  string title;
  vector<string> entries;
  
  explicit Journal (const string& title) : title{title} {}
};
```
```cpp
void Journal::add(const string& entry)
{
  static int count = 1;
  entries.push_back(boost::lexical_cast<string>(count++) + ": " + entry);
}

/*
Journal j{"Dear Diary"};
j.add("I cried today");
j.add("I ate a bug");
*/
```
```cpp
struct PersistenceManager
{
  static void save(const Journal& j, const string& filename)
  {
    ofstream ofs(filename);
    for (auto& s : j.entries)
      ofs << s << endl;
  }
};
```
- OCP(Open-Closed Principle)
```cpp
template <typename T> struct Specification
{
  virtual bool is_satisfied(T* item) = 0;
};

template <typename T> struct Filter
{
  virtual vector<T*> filter(
    vector<T*> items,
    Specification<T>& spec) = 0;
};

struct BetterFilter : Filter<Product>
{
  vector<Product*> filter(
    vector<Product*> items,
    Specifiaction<Product>& spec) override
  {
    vector<Product*> result;
    for (auto& p : items)
      if (spec.is_satisfied(p))
        result.push_back(p);
    return result;
  }
};

struct ColorSpecification : Specification<Product>
{
  Color color;
  
  explicit ColorSpecification(cosnt Color color) : color{color} {}
  
  bool is_stisfied(Product* item) override {
    return item->color == color;
  }
};

/*
Product apple{ "Apple", Color::Green, Size::Small };
Product tree{ "Tree", Color::Green, Size::Large };
Product house{ "House", Color:Blue, Size::Large };

vector<Product*> all{ &apple, &tree, &house };

BetterFilter bf;
ColorSpecification green(Color::Green);

auto green_things = bf.filter(all, green);
for (auto& x : green_things)
  cout << x->name << " is green" << endl;
*/
```
- LSP(Liskove Substitution Principle)
```cpp
class RectangleFactory
{
  static Rectangle create_rectangle(int w, int h);
  static Rectangle create_square(int size);
};

bool Rectangle:is_square() const
{
  return width == height;
}
```
- ISP(Interface Segregation Principle)
```cpp
struct IPrinter
{
  virtual void print(vector<Document*> docs) = 0;
};

struct IScanner
{
  virtual void scan(vector<Document*> docs) = 0;
}


struct Printer : IPrinter
{
  void print(vector<Document*> docs) override;
}

struct Scanner : IScanner
{
  void scan(vector<Document*> docs) override;
}

struct IMachine: IPrinter, IScanner
{
};


struct Machine : IMachine
{
  IPrinter& printer;
  IScanner& scanner;
  
  Machine(IPrinter& printer, IScanner& scanner)
    : printer{printer},
      scanner{scanner}
  {
  }
  
  
  void print(vector<Document*> docs) override {
    printer.print(docs);
  }
  void scan(vector<Document*> docs) override {
    scanner.scan(docs);
  }
}
```
- DIP(Dependency Inversion Principle)
```cpp
struct ILogger
{
  virtual ~ILogger() {}
  virtual void Log(const string& s) = 0;
};

struct ConsoleLogger : ILogger
{
  ConsoleLogger() {}
  
  void Log(const string& s) override
  {
    cout << "LOG: " << s.c_str() << endl;
  }
};

struct Car
{
  unique_ptr<Engine> engine;
  shared_ptr<ILogger> logger;
  
  Car(unique_ptr<Engine> engine,
      const shared_ptr<ILogger>& logger)
    : engine{move(engine)},
      logger{logger}
  {
    logger->Log("making a car");
  }
  
  friend ostream& operator<<(ostream& os, const Car& obj)
  {
    return os << "car with engine: " << *obj.engine;
  }
}

auto injector = di::maker_injector(
  di::bind<ILogger>().to<ConsoleLogger>()
);

auto car =injector.create<shared_ptr<Car>>();
```
