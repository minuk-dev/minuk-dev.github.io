---
layout  : wiki
title   : 리눅스 카카오톡
summary : 차라리 내가 만들고 만다
date    : 2021-02-21 20:43:13 +0900
lastmod : 2021-02-21 23:02:04 +0900
tags    : [linux, kakaotalk, nextjs, electron]
draft   : false
parent  :
---

## 발단
 * 리눅스용으로 카카오톡을 지원해줄 생각을 안한다. (https://luckyyowu.tistory.com/180)
 * 그러던 차에 [node-kakao](https://github.com/storycraft/node-kakao) 를 알게되었다.
 * 차라리 내가 필요한 기능은 내가 만들고 만다.

## 진행
### 개발 스택 (과거)
 * 원래는 내가 TUI 찐이라서 terminal ui중에 그나마 쓸만한 [blessed](https://github.com/chjj/blessed) 로 만들려고 했다.
 * blessed ui로 만든 Dialog
 * ![linux-kakao-2](/wiki/images/linux-kakao-2.png?style=centerme)

 * 로그인 화면
 * ![linux-kakao-1](/wiki/images/linux-kakao-1.png?style=centerme)

 * 우분투 알람 화면
 * ![linux-kakao-3](/wiki/images/linux-kakao-3.jpg?style=centerme)
 * 이 중에서 그나마 알림기능이 제일 쓸만하다

### 개발 스택 (현재)
 * 마음에는 안들지만 왜 다들 Electron을 사용하는지 알게 됬다.
 * 근데, 바닐라로 화면 구성을 할 생각을 하니 아찔해졌다.
 * 라이브러리 의존도를 신경 안써도 되니 편한 라이브러리를 덕지덕지 붙여서 하기로 결정했다.
 * 그래서 [nextron](https://github.com/saltyshiomix/nextron) 이걸 사용하기로 했다. 결정한 이유는 다음과 같은데
   * Typescript 기본 예제가 있다. => babel, webpack 설정을 안해도 된다.
   * Materail-UI 이 달린 예제가 있다. => 내가 아는 UI Library다
   * Next.js 다 => React 디렉토리 구조 안짜도 된다, 이미 알고 있는 Framework이다.
   * 빌드해서 AppImage 로 내뱉을수 있다. => 다 만들고 빌드 어떻게 할지 고민 안해도 된다.

### 개발 진행 사항 (현재 진행형)
 * UI 짜기 귀찮다. 다른 사람이 짠걸 찾아봤다. [React로 Slack 만들기 프로젝트](https://blog.naver.com/hanjunt57/222199675610) 가 나왔다. 큰 틀을 가져왔다. UI를 안짜도 되니 마음이 편안해진다.

 * ![linux-kakao-4](/wiki/images/linux-kakao-4.png?style=centerme)
 * ![linux-kakao-5](/wiki/images/linux-kakao-5.jpg?style=centerme)

 * 아직 구현 안된 기능이 많다. 일주일 4시간 미만 코딩해서 어느 세월에 완성하나 싶다.

## 결론
 * 공식 리눅스 카카오톡 만들어줬으면 좋겠다.
