---
layout  : wiki
title   : my-page (나만의 홈페이지 만들기)
summary : 
date    : 2020-06-20 00:40:20 +0900
lastmod : 2020-06-20 01:17:54 +0900
tags    : [spring]
draft   : false
parent  : web
---

# 시작
* 예전에 React를 배우면서 구성하던 게 있었는데, 실제 사용성이 낮고 토이프로젝트로밖에 못쓴다고 생각했다. 물론 토이여도 상관 없을수 있지만 나는 장기적으로 내가 사용할수 있는 서비스를 구축해서 내가 스스로 쓰는게 목표이다.

## 개발환경 설정
* 사실 이게 제일 귀찮다. 하지만 한번만 제대로 해놓으면 좋을 꺼라고 생각한다.
* 그런 의미에서 항상 java로 개발할때 사용하던 Intellij 를 버리고, vim 환경에서 cli로만 짜보자는 생각을 하게되었다.
* 물론 사실 요세 CLI와 GUI를 구별하는게 의미없다고 생각한다. 하지만 내가 주로 쓰는 툴들이 CLI, TUI 환경인 툴들이다 보니 (vimwiki, tig, tmux, tmuxinator) 당연하게도 spring은 왜 vim에서 못하나 생각이 들었다.

### spring cli 설정
#### sdkman
* `sdkman` 이라는 패키지매니저? 프로그램 관리툴? 을 사용해서 spring-cli를 까는게 제일 일반적인것 같아서 깔았다.
* 공홈 : https://sdkman.io/install

```bash
curl -s "https://get.sdkman.io" | bash
```

#### spring boot cli 설정
* 공홈 : https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html#getting-started-installing-the-cli
```bash
sdk install springboot
```

#### open-jdk 설치
* 실행해보니 JAVA_HOME 을 못잡는다. 생각해보니 한번도 java를 실행한적이 없다. jdk를 깔아주자
 
```
sudo apt install openjdk-11-jdk
```

#### 중간 잡담
* 나름 잘된다. 물론 spring boot cli를 이용하는게 아니라 홈페이지에서 프로젝트 설정을 받는 방법도 있다. 하지만 개인적 취향이 아니므로 한번 하고싶은대로 하자. 어짜피 개인프로젝트인데, 실제 협업할때는 맘대로 하고싶어도 못할텐데

#### vim 설정
* 기존에 나는 [[coc]]를 사용하고 있었다.
* coc java는 없나 싶어서 찾아보니 있다. 설치해주자
* 공홈 : https://github.com/neoclide/coc-java
```
:CocInstall coc-java
```
* 자동으로 maven 이나 gradle 설정을 찾아서 한다고 한다. 어짜피 spring boot cli 도 maven을 사용하니 신경쓰지 않고 사용해도 된다.

#### tmuxinator 설정
* 매번 켜주기 귀찮다. [[tmuxinator]] 를 활용하자. 다른 프로젝트들도 그렇듯이 자동으로 프로젝트를 통째로 열수 있게 해놓자.
```
# ~/.tmuxinator/page.yml

name: page
root: ~/workspace/page

windows:
  - editor:
      - nvim +"SLoad page"
  - server: 
  - logs: 
```
* 여기서 vim 도 session 자동으로 열어주는 [[vim-staritfy]]를 사용해서 설정해놓았다. 
* server 나 logs 부분은 아직 안적어 놓았다. 나중에 필요하면 적고, 일단은 빈 쉘이 열리도록 하자.

### 개발
* 올바른 설계 방법은 사실 기능에 집중하고 인증이나 부차적인 것을 나중에 집중하는게 맞다고 생각한다. 하지만 개인 플젝인걸 다시 한번 강조하고, 귀찮은 부분을 제일 처음 처리하고 싶어하는 성격을 고려하여
* 인증 - 데이터베이스 - 패키지 구조 설계 - 서비스 및 관리용 cli 프로그램 - 웹 순서로 코딩할 생각이다.

#### 인증부분
* 인증은 혹시라도 나중에 react 나 vue 같은 front-end framework 를 쓰고 싶어질수도 있다는 생각하에 (~~사실 지금은 SSR 같은 부분이 잘 지원안될것 같아서 하고 싶지 않다. front-end와 back-end 를 서로 다르게 구성하고 nginx 같은걸로 묶는 건 더 싫다. 개인적으로 모노리스 서비스가 좋다.~~) [[jwt]]를 사용해보자.
* 참고 자료 : https://velog.io/@minholee_93/Spring-Security-JWT-Security-Spring-Boot-10
* jwt spring 치면 제일 상단에 나오는 글 보고 하기로 했다.
* 안되면 그냥 spring-security 공식 doc 보고 하면 될듯, 대충 찾아보면 대부분 양산형 블로그들이다. 그냥 공식 문서가 훨씬 퀄리티 좋다고 생각한다.
* 
