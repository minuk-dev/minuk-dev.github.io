---
layout  : wiki
title   : spring boot cli
summary : 내가 써먹으려고 적어두는 cli snippet
date    : 2022-12-19 14:03:25 +0900
updated : 2022-12-19 14:03:25 +0900
tags    : [spring, kotlin]
draft   : false
parent  : tool
resource: 023482B3-8819-467D-A572-4DD97E63C84A
---

- kotlin 을 어떻게든 vim 에서 해볼려고 했는데, 이건 지옥이다.
- 일단 커뮤니티가 성숙해져있지 않고, 대부분 제풀에 못이겨 나가떨어진 상태로 보인다. 그냥 Intellij 쓰는게 정신 건강에 이롭다고 판단한듯 하다.
- FZF, Ripgrep, Buffer 등 몇몇 기능들이 아깝긴 한데, 이건 `.ideavimrc` 를 잘 다듬어서 극복해봐야할듯 하다.
- 누군가 neovim 에도 kotlin과 spring framework 의 빛을 내려줬으면 좋겠다.

## 아래 내용은 폐기 되었습니다.
## 목적
- intellij 에 의존적으로 프로젝트를 생성해야만 하는게 별로라 도구를 찾다가 도달하였다.
- 내부적으로는 똑같이 동작하는 것 같다.
- 약간 cli를 고집하는 것처럼 느껴져서 애매하긴 하다. intellij + ideavim 이 진짜 해결책인가 생각이 좀 든다.

## installation

```bash
sdk install springboot
```

## spring + web + kotlin

```bash
spring init -d=web,mustache,jpa,h2,devtools --build=gradle -t=gradle-project -l=kotlin -n=kopring --package-name=com.example.blog
```
