---
layout  : wiki
title   : cgroup
date    : 2022-07-02 04:20:55 +0900
lastmod : 2022-07-02 04:33:11 +0900
tags    : [cgroups, devops]
draft   : false
parent  : devops
---

- 초창기에는 cpu도 namespace를 통해서 격리 구현을 하려는 아이디어가 있었다.
  - [namespaces 의 초기 구현과 관련된 커밋](https://lwn.net/Articles/872507/):
    - [초기 기본적인 CPU 격리 구현에 대한 정보](https://pratiksampat.github.io/cpu_namespace.html): 초창기에 namespace가 들어오고 cgroup 이 들어왔다는 것을 보여주는 듯.
      - pCPU : physical CPU
      - vcpu와 pcpu 매핑:
        - namespaces가 pCPU와 vCPU를 scramble 해두고 이게 추상화를 가능하게 하며, 정말 완벽히 일치하지 않고도 매핑될수 있게 됨.
        - 속도상의 문제로 flat heirarchy를 사용. (child namespace도 독립적으로 pCPU에 메핑될 수 있음.):
          - 상속에 상속 구조여도 위를 타고 올라가지 않고 바로 접근하므로써 빠른 vCPU-pCPU 변환이 가능하도록 함.
          - parent 와 child 간의 정보를 추상화함. 이는 child의 virtual-physical CPU 정보를 부모가 모르게 함으로써 가능한 공격 지점을 줄임
        - vpuset cpus: CPU namespace에 접근 가능한 cpus 셋을 의미하고 pCPU의 virtual 짝이 들어있음.
        - Parent CPU namespace의 포인터가 존재하고 Init namespace는 이 값이 NULL임.
- 하지만 독점과 관련된 문제 등으로 인해서 분리되어 cgroups 로 별도로 분리된것으로 보인다.
  - 관련된 커널 커밋은 아직 찾지 못했다.
  - 하지만 kernel/cgroup 으로 별도로 분리되어 존재한다는 점. [cgroup을 정지하기 위한 별도의 함수가 존재한다는 점](https://elixir.bootlin.com/linux/latest/source/kernel/cgroup/freezer.c#L14), [이 함수가 불리는 시점이 do_exit 이라는 점](https://elixir.bootlin.com/linux/latest/source/kernel/exit.c#L736) 을 통해서 코드로 이를 알수 있다.
