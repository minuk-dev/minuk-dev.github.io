---
layout  : wiki
title   : 12요소 어플리케이션
date    : 2022-08-18 15:07:21 +0900
lastmod : 2022-08-18 15:16:06 +0900
tags    : [devops]
draft   : false
parent  : devops
---

## 공부 계기
- [[kubernetes-patterns]] 의 11장에서 언급되어있다.
- 참고자료 : [클라우드에서의 운영 - 12요소 애플리케이션](https://assu10.github.io/dev/2020/12/27/12factor-app/)

## 구성요소
1. Codebase : 각 마이크로서비스는 각자 코드베이스를 가지고 있고, 공유되지 않는다.
2. Dependencies : 의존성을 명시적으로 관리하여야 한다.
3. Config : 환경설정은 코드와 분리된다.
4. Backing services : backing services 는 URL로 접근 가능해야한다.
5. Build, release, run : 이 3단계가 명확히 분리되어야 한다.
6. Processes : 무상태, 비공유 프로세스여야 한다. 만약 상태가 필요하면 backing services에서 처리한다.
7. Port binding : 서비스 자체로 port binding 이 가능해야한다. (tomcat 같은게 내장되어야한다.)
8. Concurrency : 복제를 통한 확장이 가능해야한다.
9. Disposability : 시작과 종료는 최대한 빨리 그리고 gracefully shutdown 이 되어야한다.
10. Dev/prod parity : 운영을 개발에서 재연가능해야한다.
11. Logs : I/O가 병목이 될수 있으므로 바깥쪽으로 빼야한다. (기타 이유들도 있으니 참고자료 확인)
12. Admin processes : 관리자를 위해 태스크를 지원해야한다.
