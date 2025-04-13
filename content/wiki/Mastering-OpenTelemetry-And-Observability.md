---
layout: wiki
title: Mastering-OpenTelemetry-And-Observability
date: 2025-04-12 22:55:34 +0900
lastmod: 2025-04-14 02:17:55 +0900
tags: 
draft: true
parent: 
---
# Mastring OpenTelemetry And Obserability
- Enhancing Application and Infrastructure Performance and Avoiding Outages
- Terms:
	- Backend: The data access layer of an application, which often includes processing and persistence of data.
	- Framework: A structure on which other things are built.
		- OTel is a telemetry framework that can be extended to support various use cases.
	- Frontend: The presentation layer of an application, which is often a user interface of user-facing way to interact with an application.
	- Instrumentation: Software added to an application to generate telemetry data. Various forms of instrumentation are available, including automatic, which is injected at runtime, manual, which is added with the existing code, and programmatic, which is a particular form of manual instrumenation where specific libraries or frameworks have already been instrumented.
	- Platform: An environment in which software is executed. An observability or monitoring platform typically consists of one or more backend and frontend components.
	- Telemetry: Data used to determine the health, performance, and usage of applications.

## Chapter 1. What Is Observability?
### Definition
- Observability is a system property that defines the degree to which the system can generate actionable insights. It allows users to understand a system's state from these external outputs and take (corrective) action.
	- ref. https://glossary.cncf.io/observability/
- The goal of observability should be where a system's state can be fully understood from its external output without the need to ship code.
- Observability is not just about collecting data but about collecting meaningful data.
- A system is truly observable when you can troubleshoot without prior knowledge of the system.

### Cloud Native Era
### Monitoring Compared to Observability
- The data collection needs to be added before issues happen; otherwise, you cannot proactively determine nor quickly resolve the problems as the arise.

#### Types of Monitoring
- White box monitoring
- Blackbox-monitoring
---
- Due to the difficulty in troubleshooting mircroservice-based architectures, a popular meme was shared throughout the community:
	- We replaced our monolith with micro services so that every outage could be more like a murder mystery.
### Metadata
#### Dimensionality
- Dimensionality refres to the number of unique keys
#### Cardinality
- Cardinality refres to the number of unique values for a given key within a set.
#### Semantice Conventions
- semconvs are standardized dimensions, or keys, for metadata and ensure consistency in how data is recorded, labeled, and interpreted across different systems and services.
#### Data Sensitivity
- Metadata can contain sensitive information.
#### Signals
- MELT: metrics, events, logs, and traces

#### Metrics
- RED: requests, error, and duration
- USE: Utilization, saturation, and erros
- Four golden signals: latency, traffic, errors, saturation
#### Logs
- Structured
- Unstructured
#### Traces
- A trace is a recording of a time-based transaction or end-to-end request with metadata
- Head-based
- Tail based
#### Other Signals
- Baggage: metadata passed between spans that must be explicitly added to signals.
- Sessions: used in Real User Monitoring (RUM) to analyze user experience (UX)
- Profiles

### Collecting Signals
- Metrics emit small payloads at very frequent intervals. As a result, performance is critical. Metrics are usually not collected nor sent anywhere by default. While it is easy to add metrics and many frameworks exist, most metrics do not contain context or correlation information.
- Logs can contain richer information than metrics but, as a result, have larger payloads, and parsing requires proper formatting. Logs are usually written to a destination like a disk or a remote solution. While frameworks exist to add logs to applications, developers add most logging manually. Likce metrics, most logs do not contain context or correlation.
- Traces are similar to logs. While they are easier to parse, it requires assembling an entire trace to realize the full potential. Traces require passing a context (typically a header) between request. In addition, adding trace instrumentation is often significantly more challenging than metrics or logs. Trace payloads are as big, if not bigger, than logs and are frequently sampled.

#### Instrumentation
- Manual, Automatic, Via an instrumentation library

### Push Versus Pull Collection
- Cloud native workloads, pull is most common for metrics
### Data Collection
- Simplicity, Efficiency, Middle ground, Consistency

### Sampling Signals
- Filtering
- Sampling

### Observability
- Scalability
- Reliability
- User experience
- Ease of use
- Performance
- Security
- Cost
- Lock-in

### Application Performance Monitoring
#### The Bottom Line
- Differentiate between monitoring and observability
	- What is the difference between a "Known known" and "unknown unknown"
- Explain the importance of metadata
	- What are the differences between dimensionality, cardinality, and semantic conventions?
- Identify the differences between telemetry signals.
	- Why are there at least three separate ways to collect telemetry data from applications?
- Distinguish between instrumentation and data collection.
	- Given instrumentation, why is data collection necessary?
- Analyze the requirements for choosing an observability platform
	- How are observability platforms different from APM?

## Chapter 2. Introducing OpenTelemetry
### Background
#### Observability Pain Points
- Inconsistent features
- vendor lock-in
- Supportability and security concerns
- Duplication among vendors
- Lack of standardization, including context and correlation across signals and semantic conventions (semconvs)

#### The Rise of Open Source Software
#### Specification
- Data specification: Used to define implementation guidance, data models, semconvs, and protocols
- API Specification: Used to define the instrumentation interface standard for applications
- SDK Specification: Used to define the standard for processing and exporting signals provided by the API specification
- Versioning and Stabability: SUed to define versioning scheme and support gurantees

#### Data Collection
- The OTel Collector is a significant component and primary data collection mechanism in the Otel Project.
- Otel collector supports:
	- A robust and extensible architecture to receive, process, and export traces, metrics, and logs
	- A variety of form factors, including agent and edge processing as well as push and pull collection mechanism
	- A variety of integrations, including Prometheus, Fluent Bit, Apache Arrow, and eBPF, to name a few

### Instrumentation
- Supports:
	- A robust and extensive architecture to generate, process, and export signals
	- A single instrumentation solution for more than ten languages that supports traces, metrics, and logs.
	- Manual and automatic instrumentation

### OpenTelemetry Concepts
#### Distributions

#### Pipelines
- Instrumentation: Providers, Generators, Processors, Exporters
- Collector: Receivers or Connectors, Processors, Exporters or Connectors
#### Resources
- Cloud Provider: In develpment
- Compute Unit: In development
- Compute Instance: In develpment
- Environment: In develpment
- Service: Mixed (service.name and service.version stable)
- Telemetry: Mixed (telemetry.sdk.* stable)

#### Registry
- Automatic instrumentation for specific frameworks and languages
- Instrumentation and Collector components, including generators, receivers, processors, exporters, and extensions. Vendoer components are listed here as well as components for other open source projects.
- OTel components for instrumentation languages not hostsed by OTel, including Crystal, Dart, Haskell, Kotlin, Ocamel, Perl, and Scalar.

#### Roadmap
- 1 traces, 2 metrics, 3 logs
- No plans for creating a major version of OpenTelemetry (API) past v1.0

### The Bottom Line
- Recognize observability problems and the need for open standards.:
	- What is an open stardard and why does it matter?
- Explain the history and goals of the OpenTelemetry project:
	- What does the OTel project provides, and what does it intentionally not provide?
- Identify the OpenTelemetry components and project status:
	- Is OTel generally available (GA) and production-ready?
		- https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/ga-roadmap.md
		- https://opentelemetry.io/community/roadmap/

## Chapter 3. Getting Started with the Astronomy Shop

## Chapter 4. Understanding the OpenTelemetry Specification
### API Specification
### API Definition
#### API Context
#### API Signals
- Traces support TracerProvider, Tracer, and Span
- Metrics support MeterProvider, Meter, and Instrument.
- Logs support LoggerProvider and Logger.

- A Signal Provider is a stateful object that holds all the Signal Recorders.
- An application should user a signal Signal Provider and may have one or more Signal Recorders.
- A Signal Provider must provide a way to get its respective Signal Recorder
- A Signal Provider must be the only way to create a Signal Recorder.
- The interfaces supports by signals are vast and signal specific.

#### API Implementation

#### SDK Specification
- Signal-specific processors, exporters, and samplers
- Configuration
- Resources
#### SDK Definition
- Categories:
	- Constructors are used by application owners and include configuration objects, environment variables, and SDK builders.
	- Plug-in interfaces are used by plug-in authors and include processors, exporters, and samplers.
- OTel SDK spec covers
	- Configuration: OTel requires the SDK configuration be possible programmatically and via a file, while envrionment variables (envvars) are optional.
	- Resources: OTel requires taht the SDK provide access to a resource with at least semantic attributes with a default value. A resource is an "immutable representation of the entity producing telemetry." Beyond the options to create and merge resources, resource detectors may be implemented to add metadata automatically.

#### SDK Signals
- Signal Provider: Shutdown, Force Flush
- Traces: OTLP, standard out, Jaeger, Zipkin
- Metrics: OTLP, standard out, in-memory, and Prometheus
- Logs: OTLP and standard out

### SDK Implementation
### Data Specification
- Data models: https://opentelemetry.io/docs/specs/otel/metrics/data-model
- Protocols: https://opentelemetry.io/docs/specs/otel/protocol/
	- https://opentelemetry.io/docs/specs/opamp/
- Semantic conventions: https://opentelemetry.io/docs/specs/otel/semantic-conventions

#### Data Models
- OTel instruments have multiple proprties
	- Additive, nonadditive, monotonic, or grouped
	- Synchronous or asynchronous
- Temporality is not applicable to the Last Value aggregation. Temporality is confugred when creating instrumentation. Beyond temporality, metrics can also be reaggregated in the following ways:
	- Spatial: Used to reduce the number of attributes on a metric
	- Transformative: Used to change the temporality of metrics that are sum aggregated (cumulative to delta or vice versa)
- The metric instruments available in OTel, along with their associated properties, type, and default aggregation

| Instrument              | Properties  | Type         | Default Aggregation |
| ----------------------- | ----------- | ------------ | ------------------- |
| Counter                 | Monotonic   | Synchronous  | Sum                 |
| UpDownCounter           | Additive    | Synchronous  | Sum                 |
| ObserableCounter        | Monotonic   | Asynchronous | Sum                 |
| ObservableUpDownCounter | Addtive     | Asynchrous   | Sum                 |
| Gauge                   | Nonadditive | Synchronous  | Last Value          |
| Observable Gauge        | Nondditive  | Asynchronous | Last Value          |
| Histogram               | Grouped     | Synchronous  | Histogram           |

- Field names available to log records and what they mean


| Field Name           | Description                       | Notes                            |
| -------------------- | --------------------------------- | -------------------------------- |
| Timestamp            | When the event occurred           | Common syslog concepts           |
| ObservedTimestamp    | When the event was observed       |                                  |
| SeverityText         | Log level                         |                                  |
| SeverityNumber       | Numeric value of log level        |                                  |
| Body                 | The message of the log record     |                                  |
| Resource             | Source information                | OTel concept; metadata           |
| Attributes           | Additional information            |                                  |
| InstrumentationScope | Scope that emitted the log record |                                  |
| TraceID              | Request trace ID                  | Used to enable trace correlation |
| SpanId               | Request span ID                   |                                  |
| TraceFlags           | W3C trace flags                   |                                  |

#### Data Protocols
- OTLP

#### Data Semantic Conventions

#### Data Compatibility
- Trace: W3C, B3, and Jaeger context propagation
- Metrics: Prometheus and OpenMetrics
- Logs: Trace context in non-OTLP formats

### General Specification

### The Bottom Line
- Distinguish between OpenTelemetry versioning and stability, including support guarantees.
	- What are the long-term support guarantees for OTel?
- Understand the OpenTelemetry data model, including protocol support and OTLP
	- How is OTLP leveraged in OTel, and what value does it provide?
- Differentiate betwen the OpenTelemetry API and SDK
	- Who or what typically implements the OTel API and SDK?

## Chapter 5. Managing the OpenTelemetry Collector
- All data received by a reciever is converted to OpenTelemetry Protocol (OTLP) protobuf structs.
- By default, the Collector is stateless and keeps all data in memory.
- OTel Pros:
	- Open source and vendor-agnostic: The collector can transform data from any available receiver format to any available exporter format.
	- Extensible: The Collector supports observability data formats, including Jaeger, Prometheus, and OpenSearch, and can be extended to support future formats.
	- One agent for all signals: The collector is among the first to support trace, metrics, and logs in both agent and gateway modes.
	- Processing capabilities: The Collector offers a rich set of processing capabilities, which can be leveraged by any data that the Collector can receive.
	- Multiple destinations: One use case that most agents do not handle well is the ability to export the same data to two different platforms in parallel. The Collector fully supports this capability.
	- Fully OTel compliant: Given the Collector exists in the OTel project, it fully supports all OTel concepts, including signals, resources, and schemas.

### Deployment Modes