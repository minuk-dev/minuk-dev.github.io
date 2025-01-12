---
layout  : wiki
title   : process-status
summary : process 상태 종류 정리
date    : 2022-07-31 09:53:00 +0900
lastmod : 2022-07-31 22:00:20 +0900
tags    : [process]
draft   : false
parent  : devops
---

- `D` :
  - uninterruptible sleep, 방해불가능한 수면상태
  - system call을 통해 커널함수를 실행하면 되는 상태(예시, 입출력 등)
  - signal 로도 interrupt가 불가능해진다.
  - 일반적으로 무한루프, spin lock 직전에 상태를 체크한다.
  - 참고:
    - [stackoverflow: what is an interruptible process](https://stackoverflow.com/questions/223644/what-is-an-uninterruptible-process)
    - [bootlin: linux kernel state code definitions](https://elixir.bootlin.com/linux/latest/source/include/linux/sched.h#L82)
    - [bootlin: linux kernel uninterruptible example code](https://elixir.bootlin.com/linux/latest/source/block/bdev.c#L586)

- `R` :
  - running
  - 지금 실행하고 있는 상태
  - 참고:
    - [bootlin: linux kernel TASK_RUNNING example code](https://elixir.bootlin.com/linux/latest/source/kernel/sched/core.c#L3627)
- `S` : sleeping
- `T` : traced or stopped
- `Z` : zombie
