---
layout  : wiki
title   : go-http
summary : go 언어 http 동작방식이 궁금해져서 탐구해보는 자료
date    : 2022-08-02 15:55:09 +0900
lastmod : 2022-08-02 16:23:30 +0900
tags    : [go, http]
draft   : false
parent  : go
---

## 기본적인 내용
- `net/http` 는 go에서 기본으로 제공하는 http 관련 모듈이다.
- 보통 web service를 구성할때는 아래 framework를 쓰는 것이 일반적이다.
  - [gin](https://gin-gonic.com/)
  - [beego](https://beego.vip/)
  - [revel](https://revel.github.io/)
  - [echo](https://echo.labstack.com/)

## 탐구
### 1. http 모듈에 넘겨주는 함수는 어떻게 실행되는가?

- 함수 호출 구조

```txt
/* register step */
*http.ServeMux.HandleFunc(pattern string, handler func(ResponseWriter, *Request))
- *http.ServeMux.Handle(pattern string, handler Handler)
-- /* save muxEntry{h: handler, pattern: pattern} into mux.m[pattern] */

/* listen step */
http.ListenAndServe(addr string, handler Handler) error
- *http.Server.ListenAndServe() error
-- net.Listen(network, address string) (Listener, error)
-- *http.Server.Serve(l net.Listener) error
--- go *http.conn.serve(ctx context.Context)

/* serve step */
*http.conn.serve(ctx context.Context)
- http.serverHandler.ServeHTTP(w http.ResponseWriter, req *http.Request)
-- http.Handler.ServeHTTP(w http.ResponseWriter, req *http.Request)
--- *http.ServeMux.ServeHTTP(w http.ResponseWriter, req *http.Request)
---- ...
```

  - 위의 내용을 정리해보자면, 1. Handler를 등록하는 단계, 2. Listen 을 하면서 connection 을 만드는 단계 3. 2에서 생성된 connection을 1에서 등록한 함수와 매핑해서 실제 응답을 제공하는 단계로 구성된다.
  - 2번에서 3번으로 넘어가는 단계에서 go 가 호출된다.
  - 코드 상의 특이한 점은 Listen 을 호출하면 별도의 Listener 인터페이스가 반환되고 Listener 에 Serve를 호출하는 구조로 되어있다는 점이다.
  - 당연하다고 생각하면 당연할수도 있지만, connection 을 생성하는 loop를 Listener 안쪽에 넣음으로써 추후 확장을 용이하게 해놓았다.
  - 개인 생각 : 만약 connection을 맺는 속도 및 connection을 제어하는 알고리즘을 별도로 구성하게 된다면 (예를 들어, 실제 tcp socket을 열고, http listen 을 하는 구조가 아닌, 성능상의 이슈로 pull 방식으로 request를 처리해야하는 일이 있다면) Listener를 별도로 정의해주고 httpHandler를 등록하는 식으로 별도의 handler 분리 없이 Listener Layer만 고치면 될것 같다.
