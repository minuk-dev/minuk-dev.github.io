---
layout  : wiki
title   : Modern C++ Design Pattern/Chapter 11. 플라이웨이트
summary : 
date    : 2020-04-11 23:28:27 +0900
lastmod : 2020-04-12 20:44:11 +0900
tags    : 
draft   : false
parent  : 
---

* 플라이웨이트 패턴 : 많은 수의 가벼운 임시 객체들을 "스마트 참조"로 사용하는 것을 말하며, 그러한 객체들을 플라이웨이트라고 부른다.
## 사용자 이름
```cpp
struct User
{
User(const string& first_name, const string& last_name)
  : first_name{add(first_anem)}, last_name{add(last_name)} {}
protected:
  key first_name, last_name;
  static bimap<key, string> names; // boost:bimap(양방향 map)
  static key seed;
  static key add(const string& s) { ...}
};

static key add(const string& s)
{
  auto it = names.right.find(s);
  if (it == names.right.end())
  {
    names.insert({++seed, s});
    return seed;
  }
  return it->second;
}

const string& get_first_name() const
{
  return names.left.find(last_name)->second;
}

const string& get_last_name9) const
{
  return names.left.find(last_name)->second;
}
```

## `Boost.Flyweight`
```cpp
class BetterFormattedText
{
public:
  struct TextRange
  {
    int start, end;
    bool capitalize;
    
    bool covers(int position) const
    {
      return position >= start && position <= end;
    }
  };

private:
  string plain_text;
  vector<TextRange> formatting;
}

TextRange& get_range(int start, int end)
{
  formatting.emplace_back(TextRange{ start, end });
  return *formatting.rbegin();
}

friend std::ostream& operator<<(std::ostream& os,
  const BetterFormattedText& obj)
{
  string s;
  for (size_t i = 0; i < obj.plain_text.length(); i++)
  {
    auto c = obj.plain_text[i];
    for (const auto& rng : obj.formatting)
    {
      if (rng.covers(i) && rng.capitalize)
        c = toupper(c);
      s += c;
    }
  }
  return os << s;
}
```

## 요약
* 기본적으로 공간 절약을 위한 테크닉이다.
* 다른 예로는 API 토큰을 전달 받는 경우 등의로 활용 가능하다.

