---
layout  : wiki
title   : selinux
date    : 2022-09-03 05:23:50 +0900
lastmod : 2022-09-03 05:44:54 +0900
tags    : [linux, selinux, devops]
draft   : false
parent  : devops
---

## 공부 계기
- [nerdctl](https://github.com/containerd/nerdctl) 에 최근 기여하게 되면서 issue를 유심히 보게되었는데 [selinux 관련 주제](https://github.com/containerd/nerdctl/issues/1336)로 불타서 대충 개념만 알고 있었는데, 구현레벨에서 이걸 어떻게 하는지를 전혀 모르고 있다는 것을 알게 되었다.

## 개념
- Security Enhanced Linux
- 상태나 생긴 이유나 이런건 다른 곳에도 많이 나와있으므로 스킵
- 구현과 동작 방식:
  - Kernel space 에 Security Policy 와 AVC(Access Vector Cache) 가 있다.
  - 이를 통해서 유저레벨에서 뿐만 아니라 추가적으로 관리를 한다.
  - 동작하는 코드는 아래 순서로 보면 쉽다.:
    - [file_ioctl 을 호출할 때 selinux_file_ioctl 훅을 걸도록 설정된 코드](https://elixir.bootlin.com/linux/latest/source/security/selinux/hooks.c#L7081)
    - [ioctl_has_perm 을 호출하며 권한을 체크하는 코드](https://elixir.bootlin.com/linux/latest/source/security/selinux/hooks.c#L3684)
    - [ioctl_has_perm 내부적으로 avc_has_extended_perms, avc_has_perm 등 권한 체크하는 코드](https://elixir.bootlin.com/linux/latest/source/security/selinux/hooks.c#L3642)
  - 결론적으로 말하면 SELinux 를 쓰면 성능이 감소한다는 이야기는 어느정도 사실이다. hook 을 걸어 추가 로직을 동작시키는 방식이니까, 하지만 진짜 그렇게 떨어지나 보기는 조금 어렵다.:
    - [phoronix-Fedora 23 SELinux Impact](https://www.phoronix.com/news/Fedora-23-SELinux-Impact) 자료를 보면 유의미하게 떨어진다고 보기 어려운 결과가 나온다. 저정도 성능감소 때문에 서버에서 SELinux 를 못킨다? c, rust 말고는 어플리케이션 금지하는건가? 그게 훨씬 유의미 하지 않나? 이런 생각이 들거 같다.
    - 뭐 이것저것 추가적인 권한제어 로직이 있는거니 작업하기 번거롭기는 할 것 같다.

- 아직 이해하지 못한 부분:
  - [containers/container-selinux github](https://github.com/containers/container-selinux) 를 통해서 container selinux 를 관리하는 것 같은데, 어떻게 여기 레포에 추가되면 SELinux Policy 에 추가되는거지? 라는 의문이 있다. 컨테이너는 공부하면 할수록 신기하기만 하다.


## 참고자료
- [SELinux 개념 + 관련 명령어](https://it-serial.tistory.com/entry/Linux-SELinux-%EA%B0%9C%EB%85%90-%EA%B4%80%EB%A0%A8-%EB%AA%85%EB%A0%B9%EC%96%B4)

- [보안 강화리눅스](https://lesstif.gitbook.io/web-service-hardening/selinux)
