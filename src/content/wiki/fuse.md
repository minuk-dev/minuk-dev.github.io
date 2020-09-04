---
layout  : wiki
title   : Filesystem in Userspace
summary : 
date    : 2020-09-04 20:06:36 +0900
lastmod : 2020-09-04 20:15:45 +0900
tags    : [filesystem, fuse]
draft   : false
parent  : Storage
---

## 계기
 * 알게된 이유는, 옆에서 오라큰 파일 시스템이라는 단어를 말했는데 `?????` 이라고 느껴서, 공부해보자고 찾아보면서 시작됬다.
 
## 기본 개념
 * 파일시스템을 유저레벨에서 하고자 하는 경우 사용한다. 보통은 속도보다는 보호와 보안, 백업 등의 용도로 사용한다.
 * application(user) -> glib(user) -> vfs(kernel) -> fuse module(kernel) -> glib(user) -> libfuse(user) -> user filesystem(user) -> ...
 * 위와 같은 순서로 진행된다. 그러면 성능은? 이라는 생각이 들어서 찾아보니, FAST'17에서 나온 `To FUSE or Not to FUSE: Performance of User-Space File Systems` 라는 논문이 있다. 간단하게 읽어보니, User Space Filesystem 을 가볍게 구성하고 ext4로 파일을 저장하게 할때, 성능을 분석한 거다. 링크를 참조하자 : https://www.usenix.org/system/files/conference/fast17/fast17-vangoor.pdf
