---
layout  : wiki
title   : Defining A Common Observability Query Language and Other observability TAG Updates
date    : 2023-08-27 14:41:29 +0900
lastmod : 2023-08-27 15:46:19 +0900
tags    : [kubecon]
draft   : false
parent  : kubecon
resource: dc5d75d9-7e50-4c12-9dde-d70f89c301c8
---

- [Original Link](https://www.youtube.com/watch?v=9mchgI3mr_8&list=PLj6h78yzYM2PyrvCoOii4rAopBswfz1p7&index=55&ab_channel=CNCF%5BCloudNativeComputingFoundation%5D)
- https://kccnceu2023.sched.com/event/1Ipz2/defining-a-common-observability-query-language-and-other-observability-tag-updates-alolita-sharma-matt-young-apple?iframe=no&w=100%&sidebar=yes&bg=no


## CNCF Observability Project Landscape
- Graduated Projectes:
  - fluentd
  - jeager
  - prometheus

- Incubating Projects:
  - chaos mesh
  - openmetrics
  - opentelemetry
  - cortex
  - litmux
  - thanos
- Sandbox Projects:
  - chaosblade
  - Pixie
  - fonio
  - skooner
  - kuberhealthy
  - trickster
  - opencost

## OTAG Initiatives, Workgroups, Activities
- Initiatives:
  - Observability query language standardization
  - Continuous cost measurement and optimization
  - Profilling in Open Telemetry
  - Graphs in Observability
  - Exceptions as another telemetry data type
  - Correlation across telemetry data signals

- https://opentelemetry.io/blog/2022/why-and-how-ebay-pivoted-to-opentelemetry/
- https://px.dev/

## Profiling support in OpenTelemetry
- Profiling support in Opentelemetry:
  - Update by Ryan Perry (Jan 2023)

## Observability Query Language Standardization
- Started as a request at Open Telemetry Community Meeting at Kubecon NA 2022 in Detroit:
  - OpenTelemetry project recommendation to continue query specification discussions in OTAG
  This discussion has been requestsed by several end-users( e.g. EBay, Netflix, Apple)
- Workgroup charter discussed and finalkized in CNCF Observability TAG
- Workgroup creation request for approval from TOC is currently under consideration
- Get Involved. See the following links:
  - https://github.com/cncf/tag-observability/blob/main/working-groups/query-standardization.md

## Observability Query Language Stadnardization
- Benefits:
  - Portability for end users
  - Correlate various telemetry data types
  - Reduce developer and operations toil
  - Federated veiw regardless of data location
  - Let vendors focus on unique features
  - Lower migration and acquisition costs
- Goals:
  - Compile a list of end user use cases
  - Research existing QLs
  - Recommend semantics, models and behaviors for a standard:
    - Follow-up groups/projects would implement recommendations
- Help Needed:
  - Provides uses cases
  Document languages and semantics
  Work together towards a standard

## Q&A
- There are various types in tsdb, how can I define how to sort the results when querying:
  - Details about the implementation, there are various languages right now, and there are some that are not open source, so we still have to come up with a proposal to know.
  - (Personal thought) I thought the question was ambiguous to answer, so the answer is bound to be ambiguous accordingly. I wonder if it was a question with too standard content and an answer with standard content.

## Personal Impression
- There are a lot of links in the presentation. But, there is no link to access it. It made me spend a lot of time to find the links.
- It is just a good video to follow the recent observability's trend.:
  - Many observability tools are separated.
  - And too many developers are suffered by repeated implementation and makes a mistake again.
  - So, observability query languages should be defined nowadays.
  - IMO, promql is a de-facto standard for metrics.
    - There are not a standard for log & trace.
    - But, cncf & opentelemetry are very closed to grafana.
    - logql & traceql are strong candidates because of it.
    - I believe they are not kind to user, so I worry.
