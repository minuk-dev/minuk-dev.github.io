---
layout  : wiki
title   : TODO Lists
summary : 해야할 일들
date    : 2020-04-08 23:56:59 +0900
lastmod : 2020-11-10 22:30:21 +0900
tags    : [todo]
draft   : false
parent  :
---

* 관리 측면에서, 우선순위가 높을 수록, 당장 실행할 순서대로 문서의 상단에 배치

## 공부
 * [X] linux input method bug, alacritty and ibus. Some people say xim doesn't have it and try "ibus -xim" option.
   * fcitx, xfce4로 바꿧다.
### 리눅스 커널 공부
 * [X] 디버깅을 통해 배우는 리눅스 커널의 구조와 원리 책 정리하기 1
 * [ ] 디버깅을 통해 배우는 리눅스 커널의 구조와 원리 책 정리하기 2
### Blog
 * [ ] 위키 문서에서 특정 라인이나 특정 heading을 링크로 걸수 있게 만들기
 * [.] commit 로그에서 content 와 src, build 를 분리해서 보고 싶음.
   * [X] github 링크 확인하기
     * https://github.com/makerdark98/makerdark98.github.io/search?q=content&type=commits,
     * https://github.com/makerdark98/makerdark98.github.io/search?q=src&type=commits
 * [o] 히스토리 기능
   * [X] 마우스 올리면 전체 표시됬다가, 마우스 벗어나면 다시 3개만 출력되도록 하자 (일단 올리면 되는건 짬)
   * [X] history 에서 최근 3 개 같은 경우 10글자로 안짤리는 문제가 버그가 있음.
   * [ ] history reset 기능 추가
   * ~~[ ] history를 길게 누를때 툴팁으로 전체 이름이 나오면 좋겠음.~~
 * [X] statistics wiki 가 모바일 친화적이지 않음. => 확인해보니까 수식때문에 레이아웃이 깨지는듯 고쳐야함.

### Vim
 * [ ] calendar와 timeline 기능 넣어서, 매일 어떤 공부하는지 확인하기

### 갑자기 궁금해져서 공부해야하는거
 * [ ] gzip 압축 알고리즘
 * [ ] ~~스테가노그레피 원리~~
 * [ ] 무선 통신 이론 공부하기
   * [ ] Queueing Theory

## 생활측면
 * [X] 손톱 물어뜯는 습관 고치기 위해 물품 사기

## Database
* [.] mysql
  * [X] mysql storage engine 문서 읽기
  * [ ] custom storage engine 만들어보기 (일시 정지, 구현해보길 원하는 논문과 기술적 차이가 있다는 걸 알게됨)
## File system
* [o] 나만의 파일시스템 만들이보기
  * [X] hello world kernel module 만들어보기
  * [o] vfs 공부하기
    * [X] kiocb
    * [X] file
    * [ ] 나머지
  * [ ] linux device driver 내용 공부하기
## SSD
 * [.] [[simplessd]]
   * [o] host interface layer
     * [X] simplessd 공식 문서 읽기
     * [o] linux kernel 에서 해당하는 부분 공부하기
       * [X] workqueue 공부하기
       * [X] bio 공부하기
       * [ ] scsi 공부하기
     * [.] open-nvm 에서 controller 에 해당하는 부분 공부하기
       * [o] verilog 공부하기
         * [X] 기본 문법 공부하기
         * [ ] FPGA 공부하기
       * [ ] 순서 그리기
   * [ ] Internal Cache Layer
   * [ ] Flash Translation Layer

## 잡다
* [[개발_TODO]]
