---
layout  : wiki
title   : C++ Language
summary : 
date    : 2020-06-02 19:14:04 +0900
lastmod : 2020-12-09 12:09:52 +0900
tags    : [cpp]
draft   : false
parent  : 
---

## Memory
 * [[clflush]]

## Tips
 * 문자열 관련해서 사용하기 쉬운 함수들
  ```cpp
  #define TRIM_SPACE "\t\n\v "
  vector<string> split(string input, char delimiter) {
    vector<string> answer;
    stringstream ss(input);
    string temp;

    while (getline(ss, temp, delimiter)) {
      answer.push_back(temp);
    }
    return answer;
  }

  string trim(string& s, const string& drop = TRIM_SPACE) {
    string r = s.erase(s.find_last_not_of(drop) + 1);
    return r.erase(0, r.find_first_not_of(drop));
  }

  ```
## Books
 * [[Modern C++ Design Pattern]]
