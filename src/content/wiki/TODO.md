---
layout  : wiki
title   : TODO Lists
summary : 
date    : 2020-04-08 23:56:59 +0900
lastmod : 2020-07-22 22:51:40 +0900
tags    : [todo]
draft   : false
parent  : 
---

## 생활측면
 * [X] 손톱 물어뜯는 습관 고치기 위해 물품 사기

## 공부
### SSD
 * [.] simplessd
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
### Database
* [.] mysql
  * [X] mysql storage engine 문서 읽기
  * [ ] custom storage engine 만들어보기 (일시 정지, 구현해보길 원하는 논문과 기술적 차이가 있다는 걸 알게됨)
### File system
* [o] 나만의 파일시스템 만들이보기
  * [X] hello world kernel module 만들어보기
  * [o] vfs 공부하기
    * [X] kiocb
    * [X] file
    * [ ] 나머지
  * [ ] linux device driver 내용 공부하기
### Blog
 * [o] commit 로그에서 content 와 src, build 를 분리해서 보고 싶음.
   * [X] github 링크 확인하기
   * [ ] 실제로 링크 넣기
 * [o] 히스토리 기능
   * [X] 마우스 올리면 전체 표시됬다가, 마우스 벗어나면 다시 3개만 출력되도록 하자 (일단 올리면 되는건 짬)
   * [X] history 에서 최근 3 개 같은 경우 10글자로 안짤리는 문제가 버그가 있음.
   * [ ] history reset 기능 추가
   * [ ] history를 길게 누를때 툴팁으로 전체 이름이 나오면 좋겠음.
 * [ ] about 페이지 만들기
 * [X] 읽은 논문 정리
 * [ ] meta data 정리
 * [X] 다시 cdn 에서 static 가져오도록 바꾸기
 * [X] google analytics 붙이기
 * [X] git blame을 사용해서 wiki diff 만들기
 * [X] table of contents 를 홈페이지 측면에 띄우기
 * [X] wiki에서 괄호()가 들어가면 링크가 정상적으로 안걸림 ()를 자동으로 제거해야함.
 * [X] folding 기능 구현
### Vim
 * [ ] vim ultisnip 사용법 알아보기
 * [ ] calendar와 timeline 기능 넣어서, 매일 어떤 공부하는지 확인하기
 * [O] tagbar 알아서 잘 되도록 설정하기
   * [X] markdown 에서 tagbar
   * [X] universal tag 설치 
   * [X] [[gutentags]] 문제 해결하기 : 링크 참고
 * [X] coc 설정 하기

### 갑자기 궁금해져서 공부해야하는거
 * [ ] gzip 압축 알고리즘
 * [ ] JPG 압축 원리
   * [ ] Fourier Transform
 * [ ] 스테가노그레피 원리
 * [ ] 무선 통신 이론 공부하기
   * [ ] Queueing Theory
 * [ ] NFS 파일 시스템 동작 원리 공부하기
   * [ ] RAID 공부하기
     * [ ] RAID 종류 정리
     * [ ] RAID 에서는 Cocurrency 고려 안하나?
 * [X] WAS와 대표 IP 공부하기 (아마도 로드밸런싱)

## 잡다
* [[개발_TODO]]
