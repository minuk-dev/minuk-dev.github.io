---
layout: wiki
title: Who Watches the Watchers
date: 2025-07-05 14:05:23 +0900
lastmod: 2026-07-05 20:58:04 +0900
tags:
draft: false
parent: observability
---
## 0. Background
- 원본 영상: https://youtu.be/nYxLSHljwxQ?si=45Q61r_mm0ahC_k3
- Kubecon India 2026
- Open Source Summit Korea 2026 에서도 동일한 제목으로 발표가 있음 아마 같은 내용일듯
- 키노트도 해당 발표 회사에서 함
	- JioHotster 라는 회사에서 발표
	- 스트리밍 시스템을 하는 회사

## 1. 발표 배경
- incident 중에 Dashboard 가 blank 가 된다면?
	- Dashboards go blank during an incident?

## What we'll cover - After your safety Net goes blank
1. The problem: When you safety net goes blank.
2. Why dashboards die: Cardinality bomb, Block duration, Retention Period
3. Solution - Traffic Shaping: OTel collector as a smart pipeline
4. Solution - Defusing Cardinality: Prometheus Recording rule that saves memory
5. Solution - Backpressure & Limits: Surviving 10x traffic spikes
6. Results & Mental Model: 87.5% memory reduction - how we think now

## 3 Failure modes
- 1. Cardinality Explosion:
	- 널리 알려진 문제.
	- 메트릭을 노출할때 user_id 같은 값을 메트릭의 label로 노출하기 시작한다면 cardinality 가 증가하고 메모리가 터지게 된다.
		- 현대의 prometheus와 유사한 time-series db는 [gorilla 압축 알고리즘](https://www.vldb.org/pvldb/vol8/p1816-teller.pdf) 에 기반해서 데이터를 저장한다.
		- 이때, 주의깊게 봐야하는건 label들은 압축이 되지 않는다는 점이다.
		- 즉 sample 수가 증가하는 것은 압축이 잘되지만, series 수가 증가하는 것은 압축이 잘되지 않는다.
			- 단순히 압축을 하면 되는거 아니냐라고 생각할수도 있는데, label은 일종의 index 이기 때문에 비 압축 상태로 memory 에 올라와 있어야한다. (storage 에 있을수도 있지만 그러면 스캔 속도가 느려질것이다...)
				- 근데 db 처럼 block 형태로 두고 scan 하면 안되나? prometheus 는 어떻게 되어있지? 
				- 관련 공부자료: https://ganeshvernekar.com/blog/prometheus-tsdb-the-head-block/
				- 찾아보니까 inverted index 구조로 persistent block 으로 한다고 한다.
				- 그러면 inverted index 가 업데이트 될떄마다 비효율적으로 storage에 접근하게 되는거 아닌가? 라는 생각을 해서 찾아봤다.
				- 2시간 간격으로 block 을 만들고, 나머지는 in-memory 에만 저장하고 LSM Tree 로 WAL 와 checkpoint 구조로 만든다.
				- cardinality explosion 으로 inverted index 와 series 개수가 엄청 커져서 OOM 장애 나면, wal 와 chunks_head 를 날리고 재시작하면 된다고 한다.
			- head는 언제나 메모리에 상주하는거
				- https://github.com/prometheus/prometheus/blob/main/tsdb/head.go?utm_source=chatgpt.com
			- wal 은 복구용
- 2. Block duration:
	- https://prometheus.io/docs/prometheus/latest/storage/
- 3. Memory Retention Policy

## Rebuilding Control
- Active Traffic Shaping:
	- Batching
	- Tail sampling
	- Memory limiter
- Cardinality firewall:
	- Recording Rules
	- Label Relabeling
	- Retention Tiering
- TSDB Surgery:
	- Block Duration
	- WAL Compression
	- Retention
- Back pressure & Limits:
	- Queue Limits
	- Retry, Backoff
	- Prometheus Remote write Tuning


# The Mental Model Shift
- Collect Everything, figure it out later -> Pipeline-first thinking: design telemetry flow before choosing tools
- Labels are free - add as many as you want -> Cardinality budget: treat label cardinality like memory - spend it deliberately
- If the collector goes down, restart it -> Degrade gracefully: losing 10% of traces beats losing 100%
- Vertical scale when things break -> Design for failure: back-pressure, limits, and circuit breakers at every layer

---
# 결론
- Tier storage를 운영해야한다는 것에는 동의한다. 하지만, recording rule에 의해서 cardinality 를 제어해서 사용하는 것은 observability 라고 부르기에는 어려움이 있다고 생각된다. recordingrule 에 의한 제어가 아닌, 너무 많은 cardinality 의 유입을 차단하는 방법을 마련하는게 더 좋은 방향 아닌가 싶다.
	- otel collector 에서는 이걸 막기 위한 시도로 뭐가 있는지 찾아보니 cardinalityguardianprocessor가 있다.
		- https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/cardinalityguardianprocessor
		- 여기도 hyperloglog 를 사용해서 해결하는 해결책을 사용한다.
			- https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/87f90e10c42cb4925a1a5b500a5f4acd2f494bcc/processor/cardinalityguardianprocessor/processor.go#L69
		- 주기적으로 rotate 하면서 사용한다.
			- https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/87f90e10c42cb4925a1a5b500a5f4acd2f494bcc/processor/cardinalityguardianprocessor/processor.go#L714
		- 여기는 해당 로직이 해제되면, 받아들인다.
- block duration 관련해서 잘 몰랐는데, 새롭게 알게 된게 많다. prometheus 가 memory 사용량도 많고 scale out이 안되는 이유에 대해서 많이 알게 되었다.
	- 이런 측면에서 victoria metrics나 mimir가 더 좋아보이는건 어쩔수가 없는거 같다. 한계가 있는것 같다.
- 이외에 Batching 이나 Tail sampling이나 Memory Limiter 같은 부분은 좀 뜬구름 잡는게 있었다고 생각한다.
- Back pressure & Limits 도 그렇다. 결국에는 push 방식에서 발생하고 multi-hop 에 대한 단점을 이야기하면서 했으면 좋았을것 같다.