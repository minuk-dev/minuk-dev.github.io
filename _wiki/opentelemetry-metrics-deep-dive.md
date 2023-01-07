---
layout  : wiki
title   : opentelemetry metrics deep dive
date    : 2023-01-08 06:16:05 +0900
lastmod : 2023-01-08 07:10:08 +0900
tags    : [opentelemetry, kubecon]
draft   : false
parent  : kubecon
resource: FBDAA896-41E6-4A8C-B4D6-73E84866B6C4
---

## Original
- [Youtube link](https://youtu.be/L-Ss8PtWlRA)

## 1. Goals & timeline
### Goals: Who is this for?
- Platform engineer: install SDKs and colelctors, configure resources, metrics receivers, export pipelines
- Software engineer: use metrics APIs, write instrumentations pkgs
- End user: observe and monitor!

### Goals: Vendor-netural
- OpenTelemetry mandates a strong separation of the API, the SDK, and exporters
- Decoupling these avoids vendor "lock-in"

### Goals: Open-source & observaibility
- First-class support for open-source ecosystems
- Community devloped.

- Jaeger : Open Metrics
- ZIPKIN : StatsD
- OTEL : OTL

### Goals: OpenCensus requirements are met
- SDK has programmable processing interfaces:
  - configurable aggregation
  - high performance
  - label set reduction
  - push and pull controls

### Goals: Semantic conventions
- Standard instruments : e.g. `http.server.duration`
- Standard attribute names shared with tracing : e.g. `http.method`, `http.host`
- General naming patterns : e.g. `.usage`, `.limit`, `.time`, `.io`, and `.duration`
- Shared resources attributes : e.g. `service.name`, `telemetry.sdk.language`

## 2. Data & semantic models
### Data model: Count timeseries
- measurements are sum totals : **cumulative**

### Data model: Rate timeseries
- measurements are sum changes : **delta**

### Data model: Gauge timeseries
- individual measurements : last value reporting

### Data model: Histogram timeseries
- individual measurmenets : value and count are independent

### Data model: Resources
- Resources: attributes describing the process or entity producing metric and trace data, distinct from per-timeseries attribute (a.k.a. "labels", "tags"), an OpenTelemetry-wide concept

### Data model: Support both cumulative & delta
- Temporality : can be Cumulative or Delta
- Instrument Temporality: describes whether a metric instrument input at the API is a change or a total
- Aggregation Temporality: describes whether output sums and counts are reset on collection

### Data model: Why temporality?
- Instrument temporality? This choise makes the application stateless with respect to the SDK. Counter instruments capture transactional changes(delta), while SumObserver instruments capture current totals
- Aggregation temporality? Offers a trade between memory and reliability costs when configuring an export pipeline

### Data model: Counter measurements
- In both Prometheus and Statsd APIs, the Counter instruments capture changes in a sum (delta).
- In OpenTelemetry:
  - `Counter.Add()` : increments are non-negative (monotonic)
  - `UpDownCounter.Add()` : positive and negative increments

### Data model: "Gauge" is not for sums
- "Gauge" has similar but different meaning in Statsd and Prometheus
- The term is restircted in OpenTelemetry for conveying non-sum data

### Data model: Individual measurements
- In both Prometheus and Statsd APIs, the Gauge and Histogram instruments capture individual measurements, have the same semantice type.
- OpenTelemetry creates a new distinction:
  - `ValueRecorder.Record()` : application calls the SDK
  - `ValueObserver.Observe()` : SDK calls the application.

### Data model: Why restict Gauge?
- Prometheus and Statsd Gauges are sometimes used to capture cumulative sums, sometimes individual values, i.e., diffrerent semantic kinds of data.
- In OpenTelemetry:
  - `SumObserver.Observe()` : observe a monotonic sum
  - `UpDownSumObserver.Observe()` : observer a sum

--- WIP

## 3. Export features & costs
