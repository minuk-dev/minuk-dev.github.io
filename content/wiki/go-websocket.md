---
layout: wiki
title: go-websocket
date: 2025-01-31 11:55:53 +0900
lastmod: 2025-02-01 03:08:28 +0900
tags:
  - go
  - websocket
draft: false
parent: go
---
## 해당 글을 쓰는 이유
- golang 에서 websocket 을 구성해볼 일이 있는데, 그에 관한 생각과 참조자료들을 정리해두기 위해서이다.

### Go 에서 websocket 구성시 널리쓰이는 방법
- server side: https://github.com/gin-gonic/examples/blob/master/websocket/server/server.go
	- 라이브러리 하나를 제대로 알고 쓰는게 중요하다고 생각하고, gin 이 가장 널리 쓰이는 라이브러리라 생각해서 해당 코드를 가져왔다.
	- [gorilla/websocket](https://github.com/gorilla/websocket)
	- 라이브러리를 쓰는게 가장 일반적인 방법이다.
	- 이를 쓰는 이유는 다음과 같다고 생각한다.
		- Upgrade 처리
			- websocket 에서는 일반 http request 가 올때 protocol 을 websocket 으로 교체해주기 위해서 Upgrade 헤더를 사용해서 응답을 돌려줘야하는데, 이를 매우 쉽게 처리해주고, 이를 위한 옵션들을 제공해준다.
		- connection 객체를 통한 ReadMessage, WriteMessage 메서드 제공
			- connection 을 추상화해서 가지고 연산을 처리하는게 편하게 제공된다.
			- 다만, Blocking 방식의 Method인 ReadMessage 만을 제공해주는건 조금 불편하다. 왜냐하면, select 구문으로 짤때 불편하기 때문이다.
		- 해당 라이브러리 문서에서 특히 [Concurrency](https://pkg.go.dev/github.com/gorilla/websocket#hdr-Concurrency) 파트를 유심히 읽어보면, 아래와 같이 나와있다.
			> Connections support one concurrent reader and one concurrent writer.

		- 그래서 이것저것 시도해보다가 아래 포멧을 채택했다. 자잘한건 틀릴수 있다. 대충 느낌만 적어두었다.
			- 그래도 spring webflux 로 websocket 하는것보다는 훨씬 생각하는게 나은거 같다. flux 로 처리하는건... 쉽지 않은것 같다.
			- 근데 이러면 websocket 연결이 많아짐에 따라서 goroutine 이 쭉쭉 늘어나게 될텐데 라는 생각이 있다.

```go
func (c *Controller) handleWSRequest(ctx *gin.Context) {
	w, req := ctx.Writer, ctx.Request

	conn, err := c.wsUpgrader.Upgrade(w, req, nil)
	if err != nil {
		c.logger.Warn("Cannot upgrade HTTP connection to WebSocket", "error", err.Error())

		return
	}

	c.handleWSConnection(req.Context(), conn)
}

func (c *Controller) handleWSConnection(ctx context.Context, conn *websocket.Conn) {
	// reader loop
	go func() {
		for {
			mt, msg, err := conn.ReadMessage()
			if err != nil {
				// handle close
				return
			}
			err = readingUsecase(mt, msg)
			if err != nil {
				c.logger.Error("handleWSConnection", slog.Any("error", err))
				// even if usecase is failed, we should continue to read from the connection
				continue
			}
		}
	}()

	// writer loop
	go func() {
		for {
			msg, err := writingUsecase()
			if err != nil {
				c.logger.Error("handleWSConnection", slog.Any("error", err))
				continue
			}

			err = conn.WriteMessage(websocket.BinaryMessage, msg)
			if err != nil {
				c.logger.Error("handleWSConnection", slog.Any("error", err))
				continue
			}
		}
	}()
```