---
layout  : wiki
title   : TODO Lists
summary : 
date    : 2020-04-08 23:56:59 +0900
lastmod : 2020-06-27 15:22:01 +0900
tags    : [todo]
draft   : false
parent  : 
---

## 생활측면
 * [ ] 손톱 물어뜯는 습관 고치기 위해 물품 사기

## 공부
### SSD
 * [.] simplessd
   * [o] host interface layer
     * [X] simplessd 공식 문서 읽기
     * [ ] linux kernel 에서 해당하는 부분 공부하기
       * [ ] workqueue 공부하기
       * [ ] bio 공부하기
       * [ ] scsi 공부하기
   * [ ] Internal Cache Layer
   * [ ] Flash Translation Layer
### Database
* [X] mysql
  * [X] mysql storage engine 문서 읽기
  * [ ] custom storage engine 만들어보기 (일시 정지, 구현해보길 원하는 논문과 기술적 차이가 있다는 걸 알게됨)
### Blog
 * [X] 다시 cdn 에서 static 가져오도록 바꾸기
 * [ ] google analytics 붙이기
 * [X] git blame을 사용해서 wiki diff 만들기
 * [X] table of contents 를 홈페이지 측면에 띄우기
 * [.] vimwiki 와 hugo 연동한거 글쓰기
   * [X] 초고쓰기 시작 위키에다가만 적음
   * [X] 계기
   * [ ] 깃허브 페이지 연결
   * [ ] 도메인 연결
   * [ ] 스크린샷들 첨부
   * [ ] 오프라인 삽질
   * [ ] blame 삽질
   * [ ] partial 만들기
   * [ ] 최적화
 * [X] wiki에서 괄호()가 들어가면 링크가 정상적으로 안걸림 ()를 자동으로 제거해야함.
 * [ ] 글을 자동배포하면 좋겠음. push까진 아니여도 commit이 자동으로 될 방법은 없나 생각해보자.
   * [ ] 자동 배포할떄 commit message 에 content, build 가 태그가 적히도록 해보자
     * [ ] 최신 변경 글 보는 기능에 github page 에서 content tag를 검색해서 보여주면 될듯?
 * [ ] 히스토리 기능
   * [ ] 마우스 올리면 전체 표시됬다가, 마우스 벗어나면 다시 3개만 출력되도록 하자 (일단 올리면 되는건 짬)
```   
historyElem.addEventListener('mouseover', () => {
    historyElem.innerHTML = '<nav aria-label="breadcrumb"><ol class="breadcrumb">' + getHistory().map(h=>`<li class="breadcrumb-item">[[${h}]]</li>`).join('\n'); + '</ol></nav>';
});
```
 
### Vim
 * [O] tagbar 알아서 잘 되도록 설정하기
   * [X] markdown 에서 tagbar
   * [X] universal tag 설치 
   * [X] [[gutentags]] 문제 해결하기 : 링크 참고
 * [ ] vim ultisnip 사용법 알아보기
 * [ ] coc 설정 하기

## 잡다
* [[개발_TODO]]
