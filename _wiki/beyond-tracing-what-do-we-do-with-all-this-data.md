---
layout  : wiki
title   : Beyond Tracing - What do we do with all this data
date    : 2023-03-06 02:28:31 +0900
lastmod : 2023-03-06 02:56:19 +0900
tags    : [tempo, grafana]
draft   : false
parent  : grafanacon
resource: 5397AE45-DFEA-4F2D-9141-042158948EFE
---

## Links
- https://www.youtube.com/watch?v=zVHHeO8tAWQ

## Overview
- Metrics-generator
- Parquet
- TraceQL

## Matrics-generator
### Why metrics if you have traces?
- Transcation-oriented : Highly structured
- Service-oriented : Aggregated, historical

- Span metrics:
  - Rate, Error, Duration

- Service graph metrics:
  - Extract service topology

- Tempo Launched at Oct 2022
- Tempo 1.0 Jun 2021
- Search over recent data Nov 2021
- Full backend search Jan 2022
- Parquet storage format Dec 2021

## What is Parquet?
- Apache Parquet is an opensource, column-oriented data file format designed for efficient data storage and retrieval.
- What dos this mean?:
  - Tempo can store and access data more efficiently
  - So can you - arege ecosystem of tools
  - No new infrastructure - just a new file format

### Schema

```
TraceID
Duration
  Span #1
    Name
    ServiceName
    Tag #1
    Tag #2
    .
    Duration
  Span #2
    Name
    ServiceName
    Tag #1
    Event#1
    .
    Duration
```

- 1. Encodings:
  - traceID into dictionary
  - duration into delta
  - tags into dictionary
  - events into snappy
- 2. FindTraceByID
- 3. Attribute search:
  - `cluster="foo", namespace="bar"`
  - It uses their tags
- 4. Felxible schema:
  - easily add new column (e.g. cluster, http.url)
  - This feature makes us easily find tracing data using custom columns.

### Inside a block
- Parquet:
  - Open file format - use existing tools
  - `parquet-tools head data.parquet`

## TraceQL
### Selecting Traces - Basics

```
{ duration > 2s }
{ name = "GET /:endpoint" }
{ .http.status = 200 }
{ span.http.url =~ "/api/v1/.*" }
{ resource.namespace = "prod" }
{ .http.url="/:endpoint" && .http.status = 200 }
```

### TraceQL - Aggregates

```
{ .db.system = "postgres" } | cound() > 3 }
{ name = "dns.lookup" } | avg(duration) > 500ms }
```

### TraceQL - Pipelines of Spansets
### Selecting Traces - Structural
### TraceQL - Structural

```
{ .service.name = "foo" } >> {.service.name = "bar" }
{ name = "tcp.connect" } ~ { name = "dns.lookup" }
{ .service.name != parent.service.name }
```


## Personal Notes
- How to connect metircs and tracing graph? Is only the traceId enough to do it?:
  - For now, prometheus is well known as a troublesome because of its structure which cannot be horizontally scaled.
  - To solve this problem, lots of companies use Thanos with low resolution.
  - In this situation, tracing information is newly occurred data to save it.
  - In my opinion, it is needed to be examined especially in the sight of storage like retention & resolution. Because it is linked to metrics which can be stored with short retention and low resolution.
