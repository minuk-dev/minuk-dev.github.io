---
layout: wiki
title: http2 탐구
summary: RFC 문서와 golang 라이브러리를 뜯어보며 http2 탐구
date: 2022-08-03 15:42:58 +0900
lastmod: 2025-04-17 20:37:07 +0900
tags:
  - http
  - http2
draft: false
parent: devops
---

- 동기 : gRPC 에서 bidirection을 지원하는데 이게 http2 에서 이미 지원하고 있어서 라는 사실을 알게 되었다. http2 에 대해 너무 모르고 있었던 것 같아서 정리한다.

---

- 특징 알아보기
  - [출처 - 나만 모르고 있던 http2](https://www.popit.kr/%EB%82%98%EB%A7%8C-%EB%AA%A8%EB%A5%B4%EA%B3%A0-%EC%9E%88%EB%8D%98-http2/)
  - HTTP/1.1 의 문제점
    - HOL(Head Of Line) Blocking
    - 반복적인 3-way Handshake 로 인한 RTT 증가
    - 언제나 Cookie를 보내면서 무거운 Header 구조
  - Multiplexed Streams
  - Stream Prioritization
  - Server Push
  - Header Compression
  - graceful shutdown

---

## RFC 7540 과 go 코드 뜯어보기

- 특징이 나와있는 사이트들은 정말 많지만, 코드 레벨로 말하는 곳은 얼마 없다.
- RFC 문서와 구현 코드를 비교하면서 정리하자.
- golang 에서는 아직 standard library인 net/http 는 http 1.1 만을 지원하는 것 같다. http2 는 [golang.org/x/net/http2](http://golang.org/x/net/http2) 를 사용해야한다.

### HTTP 버전별 분기

```
3.1.  HTTP/2 Version Identification

   The protocol defined in this document has two identifiers.

   o  The string "h2" identifies the protocol where HTTP/2 uses
      Transport Layer Security (TLS) [TLS12].  This identifier is used
      in the TLS application-layer protocol negotiation (ALPN) extension
      [TLS-ALPN] field and in any place where HTTP/2 over TLS is
      identified.

      The "h2" string is serialized into an ALPN protocol identifier as
      the two-octet sequence: 0x68, 0x32.
```

```go
// golang.org/x/net/http2/http2.go#L53
const (
  /* skip */
  NextProtoTLS = "h2"
  /* skip */
)
```

```go
// net/http/server.go#L2630
type Server struct {
  // skip
  TLSNextProto map[string]func(*Server, *tls.Conn, Handler)
  // skip
}
```

```go
// golang.org/x/net/http2/server.go#L304
  s.TLSNextProto[NextProtoTLS] = protoHandler

```

- 위와 같이 상수값으로 정의하고 http 모듈에서 TLS 상의 ALPN(Application Layer Protocol Negotiation) 을 통해서 TLSNextProto에 있는 handler mapping 을 사용해서 사용한다.

---

### HTTP2 Multiplexed stream

```
5.1.  Stream States

   The lifecycle of a stream is shown in Figure 2.

                                +--------+
                        send PP |        | recv PP
                       ,--------|  idle  |--------.
                      /         |        |         \
                     v          +--------+          v
              +----------+          |           +----------+
              |          |          | send H /  |          |
       ,------| reserved |          | recv H    | reserved |------.
       |      | (local)  |          |           | (remote) |      |
       |      +----------+          v           +----------+      |
       |          |             +--------+             |          |
       |          |     recv ES |        | send ES     |          |
       |   send H |     ,-------|  open  |-------.     | recv H   |
       |          |    /        |        |        \    |          |
       |          v   v         +--------+         v   v          |
       |      +----------+          |           +----------+      |
       |      |   half   |          |           |   half   |      |
       |      |  closed  |          | send R /  |  closed  |      |
       |      | (remote) |          | recv R    | (local)  |      |
       |      +----------+          |           +----------+      |
       |           |                |                 |           |
       |           | send ES /      |       recv ES / |           |
       |           | send R /       v        send R / |           |
       |           | recv R     +--------+   recv R   |           |
       | send R /  `----------->|        |<-----------'  send R / |
       | recv R                 | closed |               recv R   |
       `----------------------->|        |<----------------------'
                                +--------+

          send:   endpoint sends this frame
          recv:   endpoint receives this frame

          H:  HEADERS frame (with implied CONTINUATIONs)
          PP: PUSH_PROMISE frame (with implied CONTINUATIONs)
          ES: END_STREAM flag
          R:  RST_STREAM frame
```

```go
// golang.org/x/net/http2/http2.go#L100
var stateName = [...]string{
  stateIdle:             "Idle",
	stateOpen:             "Open",
	stateHalfClosedLocal:  "HalfClosedLocal",
	stateHalfClosedRemote: "HalfClosedRemote",
	stateClosed:           "Closed",
}
```

```go
// golang.org/x/net/http2/server.go#L1506
func (sc *serverConn) closeStream(st *stream, err error) {
	sc.serveG.check()
	if st.state == stateIdle || st.state == stateClosed {
```

- stream의 lifecycle 이다. closeStream() 을 호출할 때 state를 체크하고 있는 걸 볼수 있다.

```
4.1.  Frame Format

   All frames begin with a fixed 9-octet header followed by a variable-
   length payload.

    +-----------------------------------------------+
    |                 Length (24)                   |
    +---------------+---------------+---------------+
    |   Type (8)    |   Flags (8)   |
    +-+-------------+---------------+-------------------------------+
    |R|                 Stream Identifier (31)                      |
    +=+=============================================================+
    |                   Frame Payload (0...)                      ...
    +---------------------------------------------------------------+

                          Figure 1: Frame Layout

```

```
5.1.1.  Stream Identifiers

   Streams are identified with an unsigned 31-bit integer.  Streams
   initiated by a client MUST use odd-numbered stream identifiers; those
   initiated by the server MUST use even-numbered stream identifiers.  A
   stream identifier of zero (0x0) is used for connection control
   messages; the stream identifier of zero cannot be used to establish a
   new stream.
```

```go
// golang.org/x/net/http2/server.go#L492
type serverConn struct {
  // skip
  streams map[uint32]*stream
  // skip
```

```go
// golang.org/x/net/http2/server.go#L1455
func (sc *serverConn) processWindowUpdate(f *WindowUpdateFrame) error {
	sc.serveG.check()
	switch {
	case f.StreamID != 0: // stream-level flow control
		state, st := sc.state(f.StreamID)
```

- frame 의 구성에서 frame payload 전에 stream identifier 가 담겨있는 것을 볼 수 있다.
- stream은 streamID 를 통해서 관리되며, 어떠한 입력이 왔을 때 streamID 를 통해 상태를 조회하고, 동작하는 것을 코드로도 볼 수 있다.
- 즉, Multiplexed Streams 을 지원한다는 이야기이다.

---

### Stream Prioritization

Stream Prioritization 은 둘러보다가 testcode랑 구현 내용을 발견하긴 했는데, 어떻게 구현했을지가 크게 궁금하지도 않고, 코드를 뜯어보는 비용에 비해서 크게 남는게 없을거 같아서 생략한다.

---

### Server Push

```
8.2.  Server Push

   HTTP/2 allows a server to pre-emptively send (or "push") responses
   (along with corresponding "promised" requests) to a client in
   association with a previous client-initiated request.  This can be
   useful when the server knows the client will need to have those
   responses available in order to fully process the response to the
   original request.
```

```go
// golang.org/x/net/http2/server.go#L807
func (sc *serverConn) serve() {
  // skip
  for {
    // skip
    select {
    // skip until #L879
    case msg := <-sc.serveMsgCh:
			switch v := msg.(type) {
			// skip until #L899
			  case *startPushRequest:
				sc.startPush(v)
   // skip
```

- 위 코드를 이해하려면 다른 http, http2 의 코드들의 배경지식도 필요하다.
- 대충 설명하면, `serve()` 함수는 `http.ListenAndServe()` 가 호출되었을 때 결과적으로 호출되게 되는 함수이다. (살짝 다르긴 하지만, [[go-http]] 참고)
- 이렇게 그리고 http2 는 channel 과 goroutine 을 통해서 보내야하는 내용을 제어하고 있다.
- `startPush()` 는 별다른 게 없는 함수다. 읽어보면 그냥 규격대로 구현되어 있고, 특별한 점을 찾지는 않아서 적지는 않았다.
- 위 구현은 golang 을 잘 활용해서 구현한거니, 아마도 다른 언어에서는 쓰레드와 producer-consumer queue를 활용해서 구현해놨을 것 같다.

---

### Header Compression

```go
4.3.  Header Compression and Decompression

   Just as in HTTP/1, a header field in HTTP/2 is a name with one or
   more associated values.  Header fields are used within HTTP request
   and response messages as well as in server push operations (see
   Section 8.2).

   Header lists are collections of zero or more header fields.  When
   transmitted over a connection, a header list is serialized into a
   header block using HTTP header compression [COMPRESSION].  The
   serialized header block is then divided into one or more octet
   sequences, called header block fragments, and transmitted within the
   payload of HEADERS (Section 6.2), PUSH_PROMISE (Section 6.6), or
   CONTINUATION (Section 6.10) frames.
```

```go
// golang.org/x/net/http2/server.go#L415
sc.hpackEncoder = hpack.NewEncoder(&sc.headerWriteBuf)

r := NewFramer(sc.bw, c)
fr.ReadMetaHeaders = hpack.NewDecoder(initialHeaderTableSize, nil)
```

```go
// golang.org/x/net/http2/frame.go#L487
func (fr *Framer) ReadFrame() (Frame, error) {
  // skip until L516
  if fh.Type == FrameHeaders && fr.ReadMetaHeaders != nil {
		return fr.readMetaFrame(f.(*HeadersFrame))
	}
  return f, nil
}
```

- 어떻게 compression 할지는 추가적으로 정의가 되어있고, 여기서는 그냥 이를 사용만 한다.
- 위 코드를 보면 framer 에 Decoder 로 hpack 을 넣어주는 것을 볼 수있다.
- 이를 사용해서 frame을 읽는다.
- 쓰기 부분은 추가적으로 찾지는 않았지만 sc.hpackEncoder 를 통해서 할 것 이라고 추정할 수 있다.

### Graceful shutdown
- [6.8 GOAWAY](https://datatracker.ietf.org/doc/html/rfc7540?ref=pangyoalto.com#section-6.8)

```
6.8.  GOAWAY

   The GOAWAY frame (type=0x7) is used to initiate shutdown of a
   connection or to signal serious error conditions.  GOAWAY allows an
   endpoint to gracefully stop accepting new streams while still
   finishing processing of previously established streams.  This enables
   administrative actions, like server maintenance.

   There is an inherent race condition between an endpoint starting new
   streams and the remote sending a GOAWAY frame.  To deal with this
   case, the GOAWAY contains the stream identifier of the last peer-
   initiated stream that was or might be processed on the sending
   endpoint in this connection.  For instance, if the server sends a
   GOAWAY frame, the identified stream is the highest-numbered stream
   initiated by the client.

   Once sent, the sender will ignore frames sent on streams initiated by
   the receiver if the stream has an identifier higher than the included
   last stream identifier.  Receivers of a GOAWAY frame MUST NOT open
   additional streams on the connection, although a new connection can
   be established for new streams.

   If the receiver of the GOAWAY has sent data on streams with a higher
   stream identifier than what is indicated in the GOAWAY frame, those
   streams are not or will not be processed.  The receiver of the GOAWAY
   frame can treat the streams as though they had never been created at
   all, thereby allowing those streams to be retried later on a new
   connection.
```

- Graceful shutdown 을 위해서 connection 이 끝났다고 통보하기 위해서 http2 는 goaway 를 보내야한다.