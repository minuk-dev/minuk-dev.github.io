---
layout: wiki
title: Mastering-OpenTelemetry-And-Observability
date: 2025-04-12 22:55:34 +0900
lastmod: 2025-04-18 02:26:47 +0900
tags: 
draft: false
parent: 
---
# Mastring OpenTelemetry And Observability
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

#### Agent Mode
- Stand-alone instance
	- Unavailable:
		- During an upgrade
		- During a restart
		- Improperly sized
		- Improperly configured
#### Gateway Mode
- Scenarios:
	- You want to collect data from specific APIs, like the k8s API, or scrape a Prometheus server configured for federation
	- You want to leverage tail-based sampling.
	- You want to receive data from applications that do not support sending to an agent.
	- Your network configuration prevents agents from accessing the Internet and you leverage a cloud-based observability platform.
	- Your security team requires that API tokens be managed central and/or separated from agents.

| Flow                                                          | Pros                                                                                                                                                                                                                                                                                                                          | Cons                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instrumentation to observability platform                     | - Quickest time to value; simplicity.<br>- Lowest latency.                                                                                                                                                                                                                                                                    | - Less data processing flexibility and requires language-specific components, such as resource detection and configuration.<br>- Operational complexity as each language and possibly each application needs to be independently configured.<br>- Added resource requirements to handle processing, and buffer and retry logic.<br>- Decentralized security controls. |
| Instrumentation to agent to observability platform            | - Quick time to value, especially given that instrumentation sends data to a local OTLP destination by default.<br>- Separates telemetry generation from transmission, reducing application load.<br>Enhanced data processing capabilities and dynamic configuration without redploying applications.                         | - Agent is a single point of failure and must be sized and monitored properly.                                                                                                                                                                                                                                                                                        |
| Instrumentation to gateway to observability platform          | - If a gateway cluster separates telemetry generation from transmission without a single point of failure.<br>- Supports advanced data processing capabilities, including metric aggregation and tail-based sampling.<br>- Useful in certain environments, such as serverless, where an agent deployment may not be possible. | - Cannot offload all application processing capabilities, including resource detection.<br>- Requires thought when configuring pull-based receivers to ensure proper load balancing and no data duplication.<br>- May introduce unacceptable latency, impacting applications.                                                                                         |
| Instrumentation to agent to gateway to observability platform | - The pros of agent and gateway mode. Supports the most use cases and requirements while providing the most data flexibility and portability.                                                                                                                                                                                 | - Complex configuration and highest management costs.                                                                                                                                                                                                                                                                                                                 |

#### Sizing
- Running complex regular expressions via configured processors against a large volume of data may result in an excessive amount of CPU being consumed. Optimizing the configuration to be more efficient or load balancing the data across a larger pool of smaller Collectors could help offset this issue.
- Significant spikes in traffic, custom buffer and retry configurations, and the tail-based sampling processor may result in excessive amounts of memory being consumed, leading to the Collector restarting. Testing failure scenarios to understand Collector behavior and validating Collector configuration is vital.
- Excessive logging or configuring the storage extension may consume all disk space. Monitoring and alerting against disk space can help mitigate this issue.

#### Components
- Receivers
- Processors
- Exporters
- Connectors
- Extensions

### Configuration
- GOGC: default 100
- GOMEMLIMIT: no default
- Ballast extensions: deprecated. removed recommended

- Important:
	- The components available depend on the Collector distribution being rune.
	- Every component has a GItHub README that details status, supported signals, defaults, and configuration options.
	- Within service::pipeline, one ore more receivers and exporters and zero or more processors or connectors msut be defined per signal.
	- Not everything defined outside of the service section needs to be used in the service::pipelines section.
	- The components specified in a `service::pipelines::<signal>` must support the signal type.
	- More than one configuration can be passed to the Collector in which case configurations are merged.
	- You can use something defined outside of the service section in multiple service::pipelines.
	- The order in which `service::pipelines::<signal>::processors` are defined determines the order in which processors are executed.
	- The same component and the same `service::pipelines::<signal>` can be defined multiple times by adding a forward slash followed by one more characters like `<component>[/<name>]`.
- otelbin
	- https://www.otelbin.io/
- Processors:
	- Memory limiter: highly recommended
-

| Category                                      | Examples                                                                                              |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Metadata processing                           | - k8sattributesprocessor<br>- resourceprocessor                                                       |
| Filtering, routing, and sampling              | - filterprocessor<br>- routingprocessor (fyi. deprecated router connector)<br>- tailsamplingprocessor |
| Enriching                                     | - k8sattributeprocessor<br>- resourcedetection                                                        |
| Generating (primarily metrics)                | - metricsgenerationprocessor<br>- spanmetricsprocessor                                                |
| Grouping (helpful in batching and processing) | - groupbyattrprocessor<br>- groupbytraceprocessor (valid for tail-based sampling)                     |
| Transforming (primarily metrics)              | - cumulativetodeltaprocessor<br>- deltatorateprocessor<br>- schemaprocessor                           |
- Order
	1. Memory limiter
	2. Any filtering or sampling
	3. Any processor relying on sending source from context (e.g. k8s attritubes)
	4. batch
	5. Any other processor, including CRUD metadata

### Extensions

| Category                                                               | Examples                                                                                |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Authentication - Used by receivers and exporters                       | - basicauthextension<br>- bearertokenauthextension<br>- oidcauthextension<br>           |
| Health and Troubleshooting                                             | - healthcheckextension<br>- pprofextension<br>- remotetapextension<br>- zpagesextension |
| Observers - Used by receivers to discover and collect data dynamically | - dockerobserver<br>- hostobserver<br>- k8sobserver                                     |
| Persistence - Via a database or filesystem                             | - storage/dbstorage<br>- storage/filestorage                                            |

### Connectors
- Exceptions: Generating metrics or logs from span exceptions
- Failover: Allows for health-based routing between trace, metric, and log pipelines, depending on the health of target downstream exporters
- Service graph: Building a map representing the interrelationships between various services in a system

### Observing
- Metrics
- Health check extension
- zPages extension
#### Relevant Metrics
- Dropped data:
	- otelcol_processor_dropped_spans
	- otelcol_processor_dropped_metric_points
	- otelcol_processor_dropped_log_records
- Queue length:
	- otelcol_exporter_queue_capacity
	- otelcol_exporter_queue_size
- Enqueue failed:
	- otelcol_exporter_enqueue_failed_spans
	- otelcol_exporter_enqueue_failed_metric_points
	- otelcol_exporter_enqueue_failed_log_records
  - Recevier refused:
	  - otelcol_receiver_refused_spans
	  - otelcol_receiver_refused_metric_points
	  - otelcol_receiver_refused_log_records
- Exporter send faield:
	- otelcol_exporter_send_failed_spans
	- otelcol_exporter_send_failed_metric_points
	- otelcol_exporter_send_failed_log_records
- CPU cors against a known rate:
	- otelcol_receiver_accepted_spans
	- otelcol_receiver_accpeted_metric_points
	- otelcol_receiver_accpted_log_records

### Troubleshooting
#### Out of Memory crashes
- Reasons:
	- A misconfiguration
		- GOGC, GOMEMLIMIT
	- An improperly sized Collector
	- Using an alpha component
#### Data Not Being Received or Exported
- Debug exporter
- zPages extension

#### Performance Issues
- Memory -> Go envrionment variables, memory limiter
- CPU:
	- alpha component which is not optizmied yet.
	- memory related: zPages
- pprof extension

## Beyond the Basics
### Distributions
- Core, Contrib, K8s
- Beyond the provided distributions, you may want to create your own.
	- Remove unused or unneeded components to reduce the security surface of the Collector, including the required dependencies
	- Extend the Collector with additional capabilities
	- Create custom packaging beyond what OTel provides
- Securing
	- Configuration
		- SHOULD only enable the minimum required components. As covered earlier, everything enabled is a potential attack vector.
		- SHOULD ensure sensitive configuration information is stored securely.
	- Permissions
		- SHOULD NOT run Collector as root/admin user. If the Collector is compromised and run as root/admin, then other systems may be at risk of being compromised.
		- MAY require privileged access for some components. Care should be taken in these circumstances.
	- Receivers/exporters
		- SHOULD use encryption and authentication.
		- SHOULD limit exposure of servers to authorized users.
		- MAY pose a security risk if configuration parameters are modified improperly.
	- Processors
		- SHOULD configure obfuscation/scrubbing of sensitive metadata. Security can also be of the telemetry data being processed.
		- SHOULD configure recommended processors. The recommended processor can help mitigate security concerns such as a distributed denial-of-service (DDos) attack.
	- Extensions
		- SHOULD NOT expose sensitive health or telemetry data. Any information made available could be used to compromise the system.
- Management
	- OpAMP:
		- Remote configuration
		- Status reporting
		- Collector telemetry reporting
		- Management of downloadable Collector-specific packages
		- Secure auto-updating capabilities
		- Connection credentials management

### The Bottom Line
- Distinguish between agent and gateway mode.
	- What is the difference between agent and gateway mode?
- Identify Collector components.
	- When getting started, what are the most essential components to configure?
- Configure and run the Collector.
	- How are Collector components configured?
- Size, secure, observe, and troubleshoot the Collector
	- Which components can be used to observe and troubleshoot the Collector?

## Chapter 6. Leveraging OpenTelemetry Instrumentation
- Get started:
	- Download the required dependencies.
	- Update the configuration
		- Automatic instrumentation: set env variables or runtime parameters
		- Manual instrumentation: add code interfaces
	- Update the runtime parameters and start the application.
- Caution:
	- Setting the `service.name` is critical and highly recommended, otherwise it will be hard to understand what service was impacted when anlyzing data.
	- Updating the exporter settings may be necessary.
	- Changing at least the OTLP endpoint address will be necessary for most containerized environments.

- Auto Instrumentation
- Manual Instrumentation
- Programmatic Instrumentation
- Mixing Automatic and Manual Trace Instrumentation

### Distributions

### The Bottom Line
- Instrument an application in various ways.
	- What is the difference between the automatic, manual, programmatic, and mixed methods of instrumentation?
- Add production-ready instrumentation.
	- After the basics of generating telemetry data that is exported to the console, what are some additional capabilities you should add in preparation for production?
- Enrich instrumentation with metadata.
	- What are some ways you can enrich telemetry data with metadata?

## Chapter 7. Adopting OpenTelemetry
### The Basics
- Data portability and sovereignty, with a goal of gaining deeper insights into application availability and performance.
- Reduced complexity, with a goal of ensuring compliance with industry standards.
- Improved observability, with a goal of reducing mean time to detection (MTTD) and mean time to recovery (MTTR).

### Why OTel and Why Now?
- de facto standard
- support various programming languages and frameworks.
- reducing vendor lock-in

- Consistency:
	- Semantic conventions
	- Processors and telemetry pipelines
	- Context and correlation, which help end users reduce MTTR by enabling problem isolation and root cause analysis

- gRPC vs HTTP:
	- Instrumentation leveraged
	- Protocols leveraged: For example, if gRPC is not used anywhere in your environment, you may not be comfortable using it.
	- The amount of data expected: For environments generating a large amount of telemetry data, gRPC might perform better, but to date, there are no accurate benchmarks in OTel to confirm this. Most instrumentation libraries now default to HTTP/protobuf, but the question remains: what is the best option for the Collection.
	- The number of dependencies: gRPC usually has many more dependencies than HTTP. The net result is that gRPC and its dependencies may need to be upgraded more often to address vulnerabilities, and the package size is often larger.
	- The HTTP version used: gRPC uses HTTP 2.0 whereas HTTP defaults to 2.0 and can fallback to 1.1 if needed. It can also be explictly configured only to use 1.1, though this not recommended.

### Instrumentation
- Extensive performance tests to understand the impacts on the application, including resource utilization and startup time.
- Configuration validation to ensure that items such as context propagation and tagging are correctly set. Also, note that changes in the data received may result in the need to create or update charts and alerts to ensure that they work correctly.
- Metadata enrichment to help provide observability and ensure parity with any previous instrumentation. Not that enrichment may also be possible from the Collector instead of or in addition to the instrumentation.
- Keep in mind when configuring OTel instrumentation:
	- The exporter endpoint may need to be updated, especially for containerized environments or when the Collector is not deployed in agent mode.
	- The service name should be set to distinguish applications from one another. This is necessary to understand the behavior, health, and performance of different services.
	- You should determine how you want additional resource information to be added. Options include instrumentation, Collector, or both, and implementation depends on requirements. Leveraging Collector instances running in agent mode is the recommended default option.
	- You should consider abstracting configuration and instrumentation where it makes sense.
### Production Readiness
- Performance, Reliability, Security

### Maturity Framework
- Level 1((Initial Implementation):
	- Deployment of the Colelctor and basic configuration to start collecting and forwarding data to an observability platform
	- Installation of OTel SDKs in select applications
- Level 2 (Basic Instrumentation)
	- Identifying and instrumenting critical services and application components using OTel SDKs
	- Utilizing OTel APIs to generate custom telemetry data specific your application's needs
	- Ensuring that essential signals are being collected through an environment
- Level 3 (Advanced Instrumentation)
	- Full-stack instrumentation, including external dependencies and third-party services
	- Signals enriches with contextual metadata such as service names, environment tags, and user identifiers (IDs)
	- Enhanced use of OTel APIs to capture fine-grained telemetry data for detailed analysis
- Level 4 (Integrated Observability)
	- Complete integration with existing monitoring and observability tools
	- Centralized dashboards that aggregate and visualize telemetry data from multiple sources for unified visibility
	- Advanced querying and visualization techniques to gain deeper insights into system performance and health
- Level 5 (Proactive Observability)
	- Predictive analytics and machine learning (ML) for anomaly detection and potential issue forecasting
	- Incident response with automated remediation workflows to address incidents and performance bottlenecks in real time
	- Continuous improvement through feedback loops and performance tuning

### Brownfield Deployment
#### Data Collection