---
layout  : wiki
title   : To IPv6 - The Dual-stack Adoption Advisory Panel
date    : 2022-10-03 21:37:29 +0900
lastmod : 2022-10-03 22:21:38 +0900
tags    : [kubecon, ipv6]
draft   : false
parent  : kubecon
---

- [원본](https://youtu.be/CqfEwzXI5W0)

## 간략 설명
- 강연이 아닌 자유 토론식으로 진행된 세션
- 따라서 여기에 정리된 내용도 세션 순서에서 시간흐름대로 난잡하게 정리함.
- PPT 없이 말하는걸 그대로 직역직해해서 적어야해서 놓치는 워딩을 다시 잡기위해서 평소보다 오래 봤다.


## 본문
- Question :
  - "How many of you are already familiar with dual stack networking?"
  - ipv6 bandwagon when it comes to k8s?

- 기본적으로 네트워크에 대해 알고 있는 사람을 10점 만점으로 했을떼 6~8 점인 사람을 위한 세션인듯 하다.

### 앱 개발자로서 ipv6 를 정말로 알아야할까요? 그렇다면 어디서부터 시작해야하죠? (Do I really care about ipv6? Should I really care about ipv6? If I do, what are my resources to get started?)
- cluster admin 이 부담하면 상관 없긴한데, 얼마만큼 부담을 주고 싶나요?
- 예전에는 ipv4 일때는 클러스터 밖에서 안으로 route 안됬는데, ipv6 나 dual stack 을 사용하면서 routable 해졌다. 알긴 해야하는것 같다.
- nat 안에 있을때는 괜찮았지만 지금은 ipv6 로 되면서 다 연결 가능해졌고, 기존에 복잡하게 했던 것들을 더 단순하게 할수 있게 되었다. 그렇다면 간단한 방법을 안쓸 이유가 있나?
- 결과적으로 ipv6 가 되면서 converting 없이 할 수 있게 되었고 이는 개발자에게 더 좋은 방향일 수 있다.

### ipv4 에서 ip6 로 어떻게 이주해야할까요.
- 과거에는 사용하면 "와, 이거 웰케 어렵냐?" 라는 소리가 절로 나왔지만, 1.20 버전 이후로는 단순해졌고 이를 위해서 지속적으로 노력하고 있다.
- 고객들은 ipv6 를 바로 사용하는 것을 원할수 있지만, 당분간은 dual stack 을 사용해야 할 것이다. 단순히 transport 뿐만 아니라 software application 에서 달라진 network 를 적응하기 어려울 것이다.
- ipv4 와 ipv6 를 동시에 사용하고 싶을 때 dual stack 은 정말 도움이 될 것이다.

### ipv4 에 비해서 ipv6 가 모두에게 필요하지 않을 수 있다고 말했는데 nat 64는 어떤 선택지인지?
- 참고 : nat64 는 ipv4 와 ipv6 간 변환하는 전환 매커니즘
- 두가지 channel 을 동시에 사용하는 것은 충분히 혼란스러운 일이지만, overhead 나 service discovery 등 문제들을 복합적으로 고려한다면 결과적으로 ipv4 에서 문제를 해결하는 것이 아니라 ipv6 로 옮겨가서 문제를 해결하는게 맞다. 앞으로도 계속 규모는 커질 것이고(pod 가 증가하는 예시) 언제까지고 ipv4 로는 addressing problem 을 막을 수는 없다.
- dual stack 은 ipv6 에 대해서 사용자들이 친숙하게 하는 것에 도움을 줄 것이다.
- v6 는 simple address 이다. 전환하는건 어렵더라도 결과적으로 올바른 방향이 맞다.
- 결국에는 사용자들도, 제공하는 것도 계속 증가한다. kubernetes 는 이를 위해서 만들어진 것이고 이를 위해서 노력해야한다.

### 향후 가장 강조되고 있는 이슈는 무엇인가요?
- adressing scheme 이며 만약 이에 어려움을 겪는다면 언제라도 물어봐주면 usecase 들을 제공해준다고 한다.
- 내 해석 : 전환하는데에서 어떻게 주소부여를 할 것이며 어떻게 하는 것이 올바른 것인지 어려움이 많을텐데 이를 위해서 많이 질문해줬으면 좋겠다 라고 답변한걸로 이해했다.

### 모든 컴포넌트가 addressable 한데 어떻게 security 제어할 것인지?
- 질문 해석 : 모든 컴포넌트가 addressable 하면, 외부에 너무나 많은 것들이 노출되게 되는데 이를 제어하기 위한 수단이 있는지:
  - 과거 ipv4 에서는 어짜피 local network 라서 접근을 못해서 이에 대해 단순하게 생각할수 있었지만 앞으로는 어떻게 해야하는가?
- ipv6 에만 해당하는 답변은 아닌데 anp(admin network policy) 와 관련된 api 를 만들고 있다.
- 지금은 cluster network policy 로 만들고 있긴 한데 multi-cluster network policy 로 넘어갈 것이다.
- 약간 벗어난 이야기이긴 한데, 단순히 만들기만 하면 아무도 안쓸꺼기 때문에 core api나 components 들에 dual stack 을 적용하기 위한 provider 를 만들고 있고 이를 위해 interface 도 만들고 있다.

## 내 생각
- 위에 더 내용이 많긴 한데, 중복되는 내용도 많고, 이미 정리된 내용으로 강연의 목적이나 향후 방향성에 대해서 충분히 엿볼수 있는 것 같아서 저정도만 정리했다.
- 요약하자면, ipv4 에서 문제를 계속 들고 있는 것 보다 ipv6 에서 문제를 해결하는 것이 올바른 방향이며, 지금까지 ipv4와 ipv6를 공존시키기 위해 nat64 를 사용했지만 이는 결과적으로 모든 문제를 해결하지 못했다.
- 하지만, 당장 ipv6 에 대해서 모든 사람이 익숙한 것이 아니며, 개발해야할 툴들도 많다. 이를 위해서 dual stack 을 사용해서 동시에 사용하는 것을 선택하였으며 core api 나 component 에 지속적으로 영향이 있을 것이다. 이를 위해 provider 들도 노력하고 있다.
- 이런 결의 내용이며, 자잘한 툴들이나 팁들 같은 경우는 세션의 성격에 맞지 않아서 안한듯 하다.
- 여기서 얻을 수 있는 내용은:
  - nat64 는 더이상 해결책이 아니다.
  - dual stack 을 사용한다.
  - ipv6 에서 addressable 문제가 있기에 이를 위한 해결책들이 제시되고 있다.

