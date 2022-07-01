---
layout  : wiki
title   : LXC
date    : 2022-07-02 03:27:34 +0900
lastmod : 2022-07-02 04:49:19 +0900
tags    : [devops]
draft   : false
parent  : devops
---

### LXC 란
- [원문](https://github.com/lxc/lxc)
- 2008년부터 개발 시작
- 분리된 커널을 돌리고 모든 하드웨어를 시뮬레이팅하는 것을 오버헤드 없이 하는 것을 목표로 함.
- Unprivileged containers 는 어떠한 권한 없이 돌아가는 컨테이너를 의미.:
  - UID와 GID를 격리
  - 이를 위해서 서로 다른 범위를 사용. host의 100000번 이후를 0으로 내부적으로 매핑
  - 이러한 것들은 몇가지 제약을 가져왔고 아래 3가지 setuid code를 이용해 이를 극복:
    - lxc-user-nic
    - newuidmap
    - newgidmap
- 일반적으로 LXC의 목표는 커널상의 모든 보안 기능을 사용 가능하게 하는데에 있음. 이를 통해서 LXC는 그들의 요구에 따라 복잡하게 튜닝할수 있게 함.
- LXC는 모든 권한 없이도 잘 돌아가지만 일반적으로 몇가지 유용한 것들은 꽤나 제한적임. 대표적인 2가지 문제는 Network와 Usernamespaces 임.:
  - Network : host의 network namespace는 격리 수준을 낮추고 attack vector를 증가시킴. host와 container가 똑같은 network namespace를 사용한다는 것은 sysfs mount가 거부될수 있음을 의미함.
  - user namespaces는 보안 증가에는 효율적이지만 privileged helper에 의하지 않고 unprivileged 유저가 container에 그들의 uid를 매핑하는 게 허락되있음. POSIX 시스템에서는 65536 UIDs와 GIDs 로도 모든 기능을 사용 가능한게 보장되어 있음.

---
### lxc가 namespace와 cgroup 을 어떻게 사용하는가:
  - [lxc_init 함수를 통해 lxc를 초기화 할때 cgroup_init을 호출한다.](https://github.com/lxc/lxc/blob/a5e32dabc641ab5e8a04b3359bb2c61895684b77/src/lxc/start.c#L860)
  - [lxc 는 권한 문제에서 자유로우면서도 안전하게 동작시키기 위해 lxc_namespace_t 를 추가로 선언해서 관리한다.](https://github.com/lxc/lxc/blob/97592484fa8f16fb354322b4b6c727450868a8f9/src/lxc/namespace.c#L38)

---
### Docker는 LXC를 사용하는가?
- [docker와 container 차이 설명글](https://hwan-shell.tistory.com/116)
- 위 글에 따르면, libcontainer를 별도로 사용한다.
- 궁금점 : 그러면 lxc는 아무도 사용안하나?
  - 나는 지금 메인은 도커와 containerd 라고 생각하는데 containerd 도 [cgroup을 사용하기 위한 별도의 구현체](https://github.com/containerd/cgroups) 가 있는 것으로 보아, 의존성 없이 kernel의 cgroup과 namespace을 직접 사용하는 것 같다.
  - lxc는 [ubuntu lxd](https://ubuntu.com/server/docs/containers-lxd) 쪽에서만 자료가 좀 나온다.
