---
layout  : wiki
title   : namespaces
date    : 2022-07-02 03:42:51 +0900
lastmod : 2022-07-02 04:26:13 +0900
tags    : [devops]
draft   : false
parent  : devops
---

  - [namespace 구현과 관련된 nsproxy code](https://elixir.bootlin.com/linux/latest/source/kernel/nsproxy.c)
  - [namespace 구현과 관련된 nsproxy 자료구조](https://elixir.bootlin.com/linux/latest/source/include/linux/nsproxy.h#L31)

    ```c
    struct nsproxy {
      atomic_t count;
      struct uts_namespace *uts_ns;
      struct ipc_namespace *ipc_ns;
      struct mnt_namespace *mnt_ns;
      struct pid_namespace *pid_ns_for_children;
      struct net 	     *net_ns;
      struct time_namespace *time_ns;
      struct time_namespace *time_ns_for_children;
      struct cgroup_namespace *cgroup_ns;
    };
    ```

    - uts : unix time-sharing
    - ipc : inter-process communication
    - mnt : mount
    - pid : process id
    - net : network
    - time : system clock(monotonic & boottime)
    - cgroup : control groups

  - [task_struct 에 존재하는 nsproxy 코드](https://elixir.bootlin.com/linux/latest/source/include/linux/sched.h#L1083)

    ```c
    struct task_struct {
      /* skip */
      struct nsproxy *nsproxy;
      /* skip */
    };
    ```

    - 어떻게 동작하는지 러프하게 따라가기:
      - [sethostname 호출](https://elixir.bootlin.com/linux/latest/source/kernel/sys.c#L1354):
        - [ns_capable 호출](https://elixir.bootlin.com/linux/latest/source/kernel/capability.c#L384):
          - [ns_capable_common 호출](https://elixir.bootlin.com/linux/latest/source/kernel/capability.c#L365):
            - 잡다한 보안 호출:
              - [cap_capable 호출](https://elixir.bootlin.com/linux/latest/source/security/commoncap.c#L51)
      - 위의 코드와 다른 코드들 몇가지를 트래킹하면서 깨달은 점. namespace 를 system call을 거의 호출하자마자 검사하고 분기하며, 이미 많은 커널 코드들에 녹아들어 있다.:
        - 엄청 아래 레벨에서만 레이어화 되어있을줄 알았는데 그건 아니다. 초창기에 들어올때나 그랬고 성능상의 문제나 구현상의 문제로 점점 녹아든걸로 생각한다.

---
- 결론 : namespace는 kernel code 전반에 있어서 녹아들어 있으며 (task_struct 와 같은 자료구조에 nsproxy 가 있는 점등이 근거), 성능이 떨어지지 않기 위해서 많은 노력이 이미 들어가 있는 거 같음.
- 추가적으로 알수 있었던 점 : cgroup과 namespace가 구분되어 있는 이유가 궁금하였는데 namespace의 구현은 이미 kernel code 전반에 걸쳐서 있어 자원 제어와 관련된 부분(예시: 독점)을 코딩하는 레이어를 만들기는 어려웠을 것 같음. 이는 cgroup의 구현을 조금 더 보아야하나, namespace에서 cgroup을 별도로 가르키고 있다는 점, 별도의 자료구조를 추가적으로 통한다는 점에서 하드웨어 자원을 관리하기 위한 함수구조가 있을 것으로 추정
