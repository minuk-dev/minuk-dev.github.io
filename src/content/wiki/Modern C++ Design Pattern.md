---
layout  : wiki
title   : Modern C++ Design Pattern
summary : 
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-04-08 13:09:31 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
## CRTP(Curiously Recurring Template Pattern)

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

## Property

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

# Factory

## Factory Method

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

## SOLID Design Principle

- SRP(Single Responsibility Principle)
    - If you need to edit a few classes(or little more?) in some very small retouching, there is an omen of something problem. It is named `code smell`
- OCP(Open-Closed Principle)
- LSP(Liskove Substitution Principle)
- ISP(Interface Segregation Principle)
- DIP(Dependency Inversion Principle)

---

# Generator Pattern

## Builder Pattern

### Simple Builder

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

### Fluent Builder

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

- Fluence Builder Method can return whatever in reference(&) or pointer (*). Just do what you want.

### Force to use Builder Class

- delete public constructor

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

### `Groovy` - style builder

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

### Composite Builder

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

### Summary

- The purpose of `Builder Pattern` is to create a complicate object, which needs a combination of many items.
- Properties of Builder Pattern
    - If you use the influence interface builder, just need only one call chain. Of course, the builder methods are constructed to return `this`(pointer) or `*this`(reference).
    - Hide public outter constructor of target object to force using builder class or method. Also can define good operators to achieve this.
    - Awesome `groovy`-style builder can be constructed with uniform initialiing syntax.
    - A Builder interface can expose other sub builders. (refer to composite builder)

---

## Factory Class

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

## Inner Factory

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

## Abstract Factory

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

## Functional Factory

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
    	}
    };
    inline unique_ptr<HotDrink>
    DrinkWithVolumeFactory:: make_drink(const string& name)
    {
    	return factories[name]();
    }

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

---

# Singleton

    static Database database{}; /* not recommended */
    
    /**
     * This method is only secured about MT(Multi Thread)-Safe on C++11 or Higher.
     */
    Database& get_database()
    {
    	static Database databse;
      return database;
    }

## Traditional Implementation

    struct Database
    {
    protected:
      Database() { /* Do something */ }
    public:
      static Database& get()
      {
        // MT-Safe on C++11 or Higher
        static Database database;
        return database;
      }
      Database(Database const&) = delete;
      Database(Database &&) = delete;
      Database& operator=(Database const&) = delete;
      Database& operator=(Database &&) = delete;
    };

- You can think over inheritance of `boost::noncopyable` class if you don't perfer to this by your hands. This way can hide all constructors except `move constructor` and `move operator`.
- You can also like this

        static Database& get() {
          static Database* database = new Database();
          return *database;
        }
        /* No Memory Leak, because static variable only once initializes in runtime */

## Multi-Thread Safety

- Skip this content. C++11 already secure it.

## Well-Known Issue of Singleton

- It is a situation which is A singleton object refer to another singleton object.

        class Database
        {
        public:
          virtual int get_population(const std::string& name) = 0;
        };
        
        class SingletonDatabase : public Database
        {
        protected:
          SingletonDatabase() { /* Read Data from db */ }
          std::map<std::string, int> capitals;
        public:
          SingletonDatabase(SingletonDatabase const&) = delete;
          void operator=(SingletonDatabase const&) = delete;
        
          static SingletonDatabase& get()
          {
            static SingletonDatabase db;
            return db;
          }
        
          int get_population(const std::string& name) override
          {
            return capitals[name];
          }
        };
        
        struct SingletonRecordFinder
        {
          int total_population(std::vector<std::string> names)
          {
            int result = 0;
            for (auto& name : names)
              result += SingletonDatabase::get().get_population(name);
            return result;
          }
        };
        

    - This code can create issue, data can be changed in unit test. A solution is to make configuraion class like this.

            struct ConfigurableRecordFinder
            {
              explicit ConfigurableRecordFinder(Database& db)
                : db{db} {}
              
              int total_population(std::vector<std::string> names)
              {
                int result = 0;
                for (auto& name : names)
                  result += db.get_population(name);
                return result;
              }
            
              Database& db;
            };
            
            class DummyDatabase : public Database
            {
              std::map<std::string, int> capitals;
            public:
              DummyDatabase()
              {
                capitals["alpha"] = 1;
                capitals["beta"] = 2;
                capitals["gamma"] = 3;
              }
            
              int get_population(const std::string& name) override {
                return capitals[name];
              }
            };
            
            TEST(RecordFinderTests, DummyTotalPopulationTest)
            {
              DummyDatabase db{};
              ConfigurableRecordFinder rf{ db};
              EXPECT_EQ(4, rf.total_population(
                std::vector<std::string>{"alpha", "gamma"}));
            }

## Inversion of Control

- Actually, I haven't use `Boost.DI`. But for someday which I learn about this, note it.

    auto injector = di::make_injector(
      di::bind<IFoo>.to<Foo>.in(di::singleton),
      // Other configuration
    };

## Monostate

    class Printer
    {
      static int id;
    public:
      int get_id() const { return id; }
      void set_id(int value) { id = value; }
    };

- I think Monostate Pattern is different from Singleton.

## Summary

- Avoid directly usage. (SomeComponenet.getInstance().foo())

---

# Structure Pattern

- In design step, we use well-known three ways.
    - Inheritance
    - Composition
    - Aggregation : One object can be independant nevertheless the  object refer to another object. For example, `T*` or `shared_ptr<T>`

## Adapter Pattern

- We use a example case, drawiing geometric shape.

    struct Point
    {
      int x, y;
    };
    
    struct Line{
      Point start, end;
    };
    
    struct VectorObject
    {
      virtual std::vector<Line>::iterator begin() = 0;
      virtual std::vector<Line>::iterator end() = 0;
    };
    
    struct VectorRectangle : VectorObject
    {
      VectorRectangle(int x, int y, int width, int height)
      {
        lines.emplace_back(Line{ Point{x, y}, Point{x + width, y} });
        lines.emplace_back(Line{ Point{x + width, y}, Point {x + width, y + height} });
        lines.emplace_back(Line{ Point{x,y}, Point{x, y + height} });
        lines.emplace_back(Line{ Point{ x, y + height }, Point {x + width, y + height} });
      }
     
      std::vecotr<Line>::iterator begin() override {
        return lines.begin();
      }
      std::vector<Line>::iterator end() override {
        return lines.end();
      }
    
    private:
      std::vector<Line> lines;
    };
    
    void DrawPoints(CPaintDC& dc,
      std::vector<Point>::iterator start,
      std::vector<Point>::iterator end)
    {
      for (auto i = start; i != end; ++i)
        dc.SetPixel(i->x, i->y , 0);
    }

## Adapter

- Let's draw a few rectangles.

    vector<shared_ptr<VectorObject>> vectorObjects{
      make_shared<VectorRectangle>(10, 10, 100, 100),
      make_shared<VectorRectangle>(30, 30, 60, 60)
    }
    
    struct LineToPointAdapter
    {
      typedef vector<Point> Points;
    
      LineToPointAdapter(Line& line);
      
      virtual Points::iterator begin() { return points.begin(); }
      virtual Points::iterator end() { return points.end(); }
    private:
      Points points;
    };
    
    LineToPointAdapter::LineToPointAdapter(Line& line)
    {
      int left = min(line.start.x, line.end.x);
      int right = max(line.start.x, line.end.x);
      int top = min(line.start.y, line.end.y);
      int bottom = max(line.start.y, line.end.y);
      int dx = right - left;
      int dy = line.end.y - line.start.y;
    
      if (dx == 0)
      {
        for (int y = top; y <= bottom; ++y)
        {
          points.emplace_back(Point{ left, y });
        }
      }
      else if (dy == 0)
      {
        for (int x = left; x <= right; ++x)
        {
          points.emplace_back(Point{ x, top });
        }
      }
    }
    
    
    for (auto& obj : vectorObjects)
    {
      for (auto& line : *obj)
      {
        LineToPointAdapter lpo{ line };
        DrawPoints(dc, lpo.begin(), lpo.end());
      }
    }

## Temporary Adapter

- How about above method is called in every display update despite no change?
    - One of the solutions is to use cache.

        vector<Point> points;
        for (auto& o : vectorObjects)
        {
          for (auto& l : *o)
          {
            LineToPointAdapter lpo{ l };
            for (auto& p : lp)
              points.push_back(p);
          }
        }

    - Of course, this solution cause another problem. That is original vectorOjbects is changed.

        struct Point
        {
          int x, y;
          friend std:: size_t hash_value(const POint& obj)
          {
            std::size_t send = 0x825C696F;
            boost::hash_combine(seed, obj.x);
            boost::hash_combine(seed, obj.y);
            return seed;
          }
        };
        
        struct Line
        {
          Point start, end;
          friend std::size_t hash_value(const Line& obj)
          {
            std::size_t seed = 0x719E6B16;
            boost::hash_combine(seed, obj.start);
            boost::hash_combine(seed, obj.end);
            return seed;
          }
        };
        
        static map<size_t, Points> cache;
        
        virtual Points::iterator begin() { return cache[line_hash].begin(); }
        virtual Points::iterator end() { return cache[line_hash].end(); }
        
        LineToPointCachingAdapter(Line& line){
          static boost::hash<Line> hash;
          line_hash = hash(line);
          if (cache.find(line_hash) != cache.end())
            return;
        
          Points points;
        
          /* before code */
          /* remove before cached point */
          cache[line_hash] = points;
        }

    ---

    ## Bridge Pattern

    ### Pimpl (Pointer to Implmentation)

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

    - Props
        - Hide implementation. If `Person` class has many private/protected member variable, it is exposed though the header file to client.
        - Ensure binary compatiblity.
        - Include some header file needed.

    ## Bridge Pattern

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

    ### Summary

    - The bridge pattern must to know each other class except implmentation. It is compared with Mediator Pattern.

    ## Composite Pattern

    - How to announce the object has multiple composite attributes? It is not easy.

    ### Properties based on array.

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

    - It is not pretty.

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

    ### Grouping

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

    ## Decorator

    - Dynamic Composition
    - Static Composition

    ### Dynamic Decorator

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

    ### Static Decorator

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

    ### Funtional Decorator

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

    ### Summary

    - Dynamic Decorator
        - Store decoreated object, compose dynamically in runtime. However, original object member cannot access member variable.
    - Static Decorator
        - Using mixin inheritance, compose in compile time. So, this method cannot compose again in runtime. However, it can access member variable. And using constructor forwarding, completely initialize object.
    - Functional Decorator
        - Can overwrap a code block or other specific function to compose.

    ## Facade Pattern

    - Facade pattern is needed in situation, when use complicated subsystems.
    - It provides a simple interface that control this subsystems.

    ## Flywieight
