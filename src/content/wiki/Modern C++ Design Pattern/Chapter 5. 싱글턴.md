---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 5. 싱글턴
summary : 
date    : 2020-04-07 20:44:17 +0900
lastmod : 2020-04-09 23:29:09 +0900
tags    : 
---
# Singleton
```cpp
    static Database database{}; /* not recommended */
    
    /**
     * This method is only secured about MT(Multi Thread)-Safe on C++11 or Higher.
     */
    Database& get_database()
    {
    	static Database databse;
      return database;
    }
```

## Traditional Implementation

```cpp
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
```

- You can think over inheritance of `boost::noncopyable` class if you don't perfer to this by your hands. This way can hide all constructors except `move constructor` and `move operator`.
- You can also like this

```cpp
        static Database& get() {
          static Database* database = new Database();
          return *database;
        }
        /* No Memory Leak, because static variable only once initializes in runtime */
```

## Multi-Thread Safety

- Skip this content. C++11 already secure it.

## Well-Known Issue of Singleton

- It is a situation which is A singleton object refer to another singleton object.

```cpp
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
```
        

    - This code can create issue, data can be changed in unit test. A solution is to make configuraion class like this.

```cpp
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
```

## Inversion of Control

- Actually, I haven't use `Boost.DI`. But for someday which I learn about this, note it.

```cpp
    auto injector = di::make_injector(
      di::bind<IFoo>.to<Foo>.in(di::singleton),
      // Other configuration
    };
```

## Monostate

```cpp
    class Printer
    {
      static int id;
    public:
      int get_id() const { return id; }
      void set_id(int value) { id = value; }
    };
```

- I think Monostate Pattern is different from Singleton.

## Summary

- Avoid directly usage. (SomeComponenet.getInstance().foo())

