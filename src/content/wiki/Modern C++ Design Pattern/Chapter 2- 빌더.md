---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 2. 빌더
summary : 
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-04-09 23:25:05 +0900
tags    : 
---
## Builder Pattern

### Simple Builder
```cpp
    struct HtmlBuilder
    {
      HtmlElement root;
    
      HtmlBuilder(string root_name) { root.name = root_name; }
    
      void add_child(string child_name string child_text)
      {
        HtmlElement e{ child_name, child_text };
        root.elements.emplace_back(e);
      }
      string str() { return root.str(); }
    };
```

### Fluent Builder
```cpp
    struct HtmlBuilder
    {
      HtmlElement root;
      HtmlBuilder(string root_name) { root.name = root_name; }
      HtmlBuilder& add_child(string child_name string child_text)
      {
        HtmlElement e{ child_name child_text };
        root.elements.emplace_back(e);
        return *this;
      }
      /* skip */
    };
    
    HtmlBuilder builder{ "ul" };
    builder.add_child("li", "Hello").add_child("li", "world");
    cout << builder.str() << endl;
```

- Fluence Builder Method can return whatever in reference(&) or pointer (*). Just do what you want.

### Force to use Builder Class

- delete public constructor
```cpp
    struct HtmlElement
    {
      string name;
      string text;
      vector<HtmlElement> elements;
      const size_t indent_size = 2;
      
      static unique_ptr<HtmlBuilder> build(const string& root_name)
      {
        return make_unique<HtmlBuilder>(root_name);
      }
    
    protected:
      HtmlElement() {}
      HtmlElement(const string& name, const string &text)
        : name{name}, text{text} {}
    };
    
    struct HtmlBuilder
    {
      operator HtmlElement() const { return root; }
      HtmlElement root;
      /* skip */
    };
    
    /* Can use move semantic */
    HtmlElement HtmlBuilder::build() const
    {
      return root;
    }
```

### `Groovy` - style builder

```cpp
    struct Tag
    {
      string name;
      string text;
      vector<Tag> children;
      vector<pair<string, string> > sttributes;
    
      friend ostream& operator << (std::ostream& os, const Tag& tag)
      {
      /* skip implementation */
      }
    
    protected:
      Tag(const string& name, const string& text)
        : name {name}, text{text} {}
    
      Tag(const string &name, const vector<Tag>& children)
        : name{name}, children{children} {}
    };
    
    struct P : Tag
    {
      explicit P(const string& text)
        : Tag{"p", text} {}
    
      P(initializer_list<Tag> children)
        : Tag{"p", children} {}
    };
    
    struct IMG : Tag
    {
      explicit IMG(const string& url
        : Tag{"img", ""}
      {
    		attributes.emplace_back({"src", url});
      }
    };
    
    std::cout <<
      P {
        IMG { "http://pokemon.com/pikachu.png" }
      }
    << std::endl;
```

### Composite Builder

```cpp
    class PersonBuilderBase
    {
    protected:
      Person& person;
      explicit PersonBuilderBase(Person& person)
        : person{ person } {}
    public:
      operator Person()
      {
        return std::move(person);
      }
    
      PersonAddressBuilder lives() const;
      PersonJobBuilder works() const;
    };
    
    class PersonBiulder : public PersonBuilderBase
    {
      Person p;
    public:
      PersonBuilder() : PersonBuilderBase{p} {}
    };
    
    
    class PersonAddressBuilder : public PersonBuilderBase
    {
      typedef PersonAddressBuilder self;
    public:
      explicit PersonAddressBuilder(Person& person)
        : PersonBuilderBase { person } {}
      
      self& at(std::string street_address)
      {
        person.street_address = street_address;
        return *this;
      }
    
      self& with_postcode(std::string post_code) { /* skip */ }
      
      self& in(std::string city) { /* skip */ }
    };
    
    Person p = Person::create()
      .lives().at("123 London Road")
              .with_postcode("SW1 1GB")
              .in("London")
      .works().at("PragmaSoft")
              .as_a("Consultant")
              .earning(10e6);
```

### Summary

- The purpose of `Builder Pattern` is to create a complicate object, which needs a combination of many items.
- Properties of Builder Pattern
    - If you use the influence interface builder, just need only one call chain. Of course, the builder methods are constructed to return `this`(pointer) or `*this`(reference).
    - Hide public outter constructor of target object to force using builder class or method. Also can define good operators to achieve this.
    - Awesome `groovy`-style builder can be constructed with uniform initialiing syntax.
    - A Builder interface can expose other sub builders. (refer to composite builder)

