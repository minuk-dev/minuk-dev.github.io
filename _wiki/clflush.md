---
layout  : wiki
title   : clflush (cache line flush)
summary : 
date    : 2020-06-02 19:15:07 +0900
lastmod : 2020-06-02 19:40:31 +0900
tags    : [cpp, memory]
draft   : false
parent  : 
---

## 출처
https://software.intel.com/sites/landingpage/IntrinsicsGuide/#text=_mm_clflush&expand=678,679
## 내용

```cpp
void _mm_clflush (void const* p)
#include <emmintrin.h>
Instruction: clflush m8
CPUID Flags: SSE2
```

```cpp
void _mm_clflushopt (void const * p)
#include <immintrin.h>
Instruction: clflushopt m8
CPUID Flags: CLFLUSHOPT
```

 * `clflush` vs `clflushopt`
 * 출처 : https://software.intel.com/en-us/forums/software-tuning-performance-optimization-platform-monitoring/topic/712498
 * clflushopt : clflush optimization
