---
layout  : wiki
title   : ffmpeg 를 사용한 convert 요약
summary : ffmpeg 로 간단한 비디오 변환 하려고 만든 페이지
date    : 2021-11-15 11:18:06 +0900
lastmod : 2021-11-15 11:22:35 +0900
tags    : [ffmpeg]
draft   : false
parent  : linux command
---

## local file (mp4 -> gif)

```bash
ffmpeg \
  -i <input-filename> \
  -r 15 \
  -vf scale=512:-1 \
  -ss 00:00:03 -to 00:00:06 \
  <output-filename>
```
 * 간단한 옵션
 * `-r` : frame rate
 * `-ss` : start offset

 * [ffmpeg 옵션 잘 정리한 페이지](https://saramsarang.tistory.com/214)
