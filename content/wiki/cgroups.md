---
layout  : wiki
title   : cgroup
date    : 2022-07-02 04:20:55 +0900
lastmod : 2022-07-18 23:39:11 +0900
tags    : [cgroups, devops]
draft   : false
parent  : devops
---

- 관련된 커널 커밋은 아직 찾지 못했다.
- 하지만 kernel/cgroup 으로 별도로 분리되어 존재한다는 점. [cgroup을 정지하기 위한 별도의 함수가 존재한다는 점](https://elixir.bootlin.com/linux/latest/source/kernel/cgroup/freezer.c#L14), [이 함수가 불리는 시점이 do_exit 이라는 점](https://elixir.bootlin.com/linux/latest/source/kernel/exit.c#L736) 을 통해서 코드로 이를 알수 있다.
