---
layout  : wiki
title   : C++ Language
summary : 
date    : 2020-06-02 19:14:04 +0900
lastmod : 2020-12-26 17:33:43 +0900
tags    : [cpp]
draft   : false
parent  : 
---

## Memory
 * [[clflush]]

## Tips
### String
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

### Time
 * 시간 잴때 사용하는 코드 더미
 * minuk.h
   ```c
   #ifndef __MINUK_H__
   #define __MINUK_H__
   #include <time.h>
   unsigned long long calclock(struct timespec *spclock, unsigned long long *total_time, unsigned long long *total_count);
   #ifndef BILLION
   #define BILLION 1000000000
   #endif /* BILLION */
   #endif /* __MINUK_H__ */
   ```
 * minuk.cc
   ```c
   #include "minuk.h"
   unsigned long long calclock(struct timespec *spclock, unsigned long long *total_time, unsigned long long *total_count){
     long temp, temp_n;
     unsigned long long timedelay = 0;
     if (spclock[1].tv_nsec >= spclock[0].tv_nsec) {
       temp = spclock[1].tv_sec - spclock[0].tv_sec;
       temp_n = spclock[1].tv_nsec - spclock[0].tv_nsec;
       timedelay = BILLION * temp + temp_n;
     } else {
       temp = spclock[1].tv_sec - spclock[0].tv_sec - 1;
       temp_n = BILLION + spclock[1].tv_nsec - spclock[0].tv_nsec;
       timedelay = BILLION * temp + temp_n;
     }

     __sync_fetch_and_add(total_time, timedelay);
     __sync_fetch_and_add(total_count, 1);
     return timedelay;
   }

   /**
    * example code
    *
    * struct timespec spclock[2];
    * clock_gettime(CLOCK_REALTIME, &spclock[0]);
    * do something
    * clock_gettime(CLOCK_REALTIME, &spclock[1]);
    * calclock(spclock, &total_time, &total_count);
    *
    * */
   ```

## Books
 * [[Modern C++ Design Pattern]]
