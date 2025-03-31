---
layout: wiki
title: opampcommander
date: 2025-02-14 02:49:15 +0900
lastmod: 2025-03-24 00:03:48 +0900
tags: 
draft: true
parent: 
---
## 해당 문서 존재 이유
- 내가 개발하다가 자꾸 진행사항을 까먹어서

## 2025-02-14 진행사항
- etcd 개발을 대충 됬는데, 매번 수동으로 잘 돌아가는지, DB 상태 점검하는게 짜쳐서 test를 만드는중
- test 에서 etcd 랑, cmd 띄우고 otelcollector contrib 를 띄워서 데이터 넣은 다음에 db 에 올바른 값 들어가는지 확인해야함
- 이 과정 중에서 vim 으로는 좀 힘든가 하는 상태를 도달함. 왜냐하면 사실 어느정도 테스트 짜면서 어디까지 짯는지 기억을 못해서 실행시켜보면서 짜야하는데 좀 답답한 상황


### 2025-03-18 진행사항
- 너무 오랜만에 해서 다 까먹어서 한참 해맴

```
# opampcommander
# build binary for development
make dev
```

```
# opampcommander
# run apiserver
./dist/apiserver_darwin_arm64_v8.0/apiserver
```

```
# opampcommander/etcd
./etcd

# get etcd data
./etcdctl get agents --prefix
```

```
# otel-collector attach
docker run -v ./opampextension.yaml:/etc/otelcol-contrib/config.yaml otel/opentelemetry-collector-contrib:0.114.0
```

- opamp-go 로 서버 구현 변환 작업 완료
- opampctl 만들다가 agent 를 출력하는걸 짜야함
	- formmater

### 2025-03-23
fommatter 구현까지 완료
- https://github.com/minuk-dev/opampcommander/issues/8
- 해당 이슈 구현중 -> 구현 완료

- https://github.com/minuk-dev/opampcommander/issues/3
	- 구현 중

- command 에 대한 생각
	- 도메인 모델은 interface 가 아닌 구체타입이 되는게 좋은거 같다.
		- 아직 확실한 생각까지는 아닌데,
		- golang 에서는 최초에는 구체타입으로 선언하고 adapter 에서는 interface 로 받아서 쓰다가, 나중에 확장할 일이 있으면 Factory 함수를 고치는 식으로 발전시키는게 좋은거 같다.
		- 처음부터 Command 를 interface 화 시켜서 구현하려고 하니 너무 막막한 감이 있다.
		- Factory 함수를 golang 에서 잘 만들수 있으면 좋을텐데... 아직도 Factory 패턴은 어떤게 좋은지 모르겠다.
- 일단은, domain 을 먼저 정의하고, outport, inport 순서로 뻗어나가면 될거 같다.