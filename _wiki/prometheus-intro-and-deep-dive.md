---
layout  : wiki
title   : Prometheus Intro and Deep Dive
date    : 2022-10-01 21:20:08 +0900
lastmod : 2022-10-01 22:07:56 +0900
tags    : [kubecon, kubernetes]
draft   : false
parent  : kubecon
---

- [원본 링크](https://youtu.be/eM3RXdK1yys)

## What is Prometheus
- OSS metrics-based monitoring & alerting stack.
- Instrumentation - Metrics collection and storage - Querying, Alerting, Dashboarding
- Works for all levels of the stack!
- Mode for dynamic cloud environments.

## Architecture
- Instrumentation & Exposition - Target (web app, API server, Linux VM, mysqld, cgouprs ...)
- Collection, Storage & Processing - Prometheus + Service Discovery (DNS, Kubernetes, AWS, ...)
- Qurying, Dashboards - Grafana, Prometheus Web UI, Automation
- Alertmanager

## Selling Points
- Dimensional data model
- Powerful query language
- Simple architecture & efficient server
- Service discovery integration

## Data Model
- What is a time series?:
  - `<identifyer> -> [(t0, v0), (t1, v1), ...]`
  - metric name
  - labels

## Querying
- PromQL:
  - Functional query language
  - Great for time series computations
  - Not SQL-style

### Example
- All partitions in my entire infrastructure with more than 100GB capacity that are not mounted on root?:

  ```
  node_filesystem_bytes_total{mountpoint!="/"} / 1e9 > 100
  ```

- What's the ratio of request errors across all service instances?

  ```
  sum(rate(http_requests_total[status="500"}[5m]])) / sum(rate(http_requests_total[5m]))
  ```

## Efficiency
- Local storage is scalable enough for many args:
  - 1 million+ samples/s
  - Millions of series
  - 1-2 bytes per sample
- Good for keeping a few weeks or months of data. Some people keep years, with careful backups.

## Bringing the gap
- Not everything speaks Prometheus - exporters help:
  - Translate from other metric systems (statsd, CloudWatch, ...)
  - Transform system-specific metrics (Linux, MySQL, HAProxy, ...)
  - Do it yourself (JSON exporter, Python, Go, ...)

## Conclusion
- Prometheus helps you make sense of complex dynamic environments via its:
  - Dimensional data model
  - Powerful query language
  - Simplicity + efficiency
  - Integrations and exporters

## What's new?
- Some of the new features released in the last ~12 months... only looking at prometheus

### New in v2.25: Feature flags
```bash
prometheus --enable-feature=agent,promql-at-modifier
```

### What's new in PromQL
- offset
- @ end()
- sin, rad, atan2, ... (v2.31)
- present_over_time (v2.29)

### New in v2.32: Agent mode
```bash
prometheus --enable-feature=agent
```

### New in v2.25: Remote write receiver
```bash
prometheus --enable-feature=remote-write-receiver
```

### New in v2.27: Env-var expansion
```bash
prometheus --enable-feature=expand-external-labels
```

```yaml
global:
  external_labels:
    __replica__: ${POD_NAME}
    cluster: eu-central-4
```

### Prometheus v2.37 LTS


## 개인 생각
- Prometheus 에 대해 설명하는 강연이긴 했지만, 괜히 봤다 싶다. 이유는 당장 나에게 필요가 없는 강연이였고 (내부 구조나 이런걸 설명해줄줄 알았는데 이미 널리 알려진 Architecture 를 다시 설명들었다.)
- 새로운 Feature는 솔직히 잘 공감이 안된다. 삼각함수가 추가됬다? offset 이 생격다 정도만 기억에 남을듯 하다.
- 기본적인 PromQL 을 좀 공부해야겠다. 실무에서 Prometheus 잘쓰는건 PromQL 을 잘쓰면 나쁘지 않게 쓸거 같다.
