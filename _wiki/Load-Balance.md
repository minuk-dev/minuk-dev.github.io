---
layout  : wiki
title   : Load Balance
summary : 
date    : 2020-07-13 20:06:55 +0900
lastmod : 2020-07-13 20:28:50 +0900
tags    : [web, load balance]
draft   : false
parent  : web
---

## 기본 개념
 * 한 대의 서버로 여러 Client의 요청을 처리할 수 없고, Client에겐 단일 point 로 보이고 싶을때 사용하는 방법
 * Client가 Load Balancer (이하 LB) 에게 Request를 보내게 하고, LB는 일정한 알고리즘에 따라 Web Application Server(이하 WAS)에게 나눠주는 방법
 * 상황에 따라 L4, L7 이 필요하다.

## 궁금점
### WAS는 Client를 어떻게 식별(Identification)하나?
 * 당연하게도 cookie 로 식별(Identification)할 수 있다. 하지만 cookie 없이 IP는 식별 불가능한가? 라는 생각이 든다.
 * 이를 위한 표준으로 `Forwarded` 라는 값이 있고, 여기에 Proxy Ip들을 넣어주면 된다.

### WAS는 Client를 어떻게 인증(Authentication) 하나?
 * 별도의 인증서버를 두는 방법, JWT 같은 변조 불가능한 Token을 사용하는 방법이 있다.

### 이런 구조에서 파일 업로드와 같은 기능은 어떻게 되는가?
 * 별도의 NAS를 사용하는 방법, DB에 저장하는 방법 등이 있다.
