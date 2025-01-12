---
layout  : wiki
title   : Learning OpenTelemetry
date    : 2024-05-11 01:31:18 +0900
lastmod : 2024-05-15 23:34:03 +0900
tags    : 
draft   : false
parent  : 
resource: fb84f5e3-ac61-4165-b8b1-4e1cd84f2e6e
---

# Learning OpenTelemetry
- Setting Up and Operating a Modern Observability System

## Chapter 1. The State of Modern Observability
### The Times They Are A-Changin'
### Observability: Key Terms to Know
- Resources:
  - Physical compoenents: servers, containers, processes, RAM, CPU, and network cards.
  - Logical components: clients, applications, API endpoints, databases, and load balancers
- Transactions:
  - These are requests that orchestrate and utilize the resources the system needs to do work on behalf of the user.
- User telemetry
- Performance telemetry
- Signal:
  - Events logs
  - System metrics
  - etc.
- instrumentation: code that emits telemetry data
- transmission system: sending the data over the network to an analysis tool
- telemetry + analysis = observability

### A Breif History of Telemetry
### The Three Browser Tabs of Observability
- logs
- metrics
- tracing
- A pillar of observability:
  - Instrumentation
  - Data format
  - Data transmission
  - Storage and analysis

### Emerging Complications
- Most production problems emerge from the way many concurrent transcations interact.

### The Three Pillars Were an Accident
- Useful observations do not come from looking at data in isolation.

### A Single Braid of Data
- Human investigation:
  - suffers as organizations grow larger and systems become more complex.
- Computer investigation:
  - computers can find correlations only between connected pieces of data.

- OpenTelemetry brings all of this information together.

## Chapter 2. Why Use OpenTelemetry?
- A lot of data is an overwehlming amount of data, in fact.
- Not consistent.
- How do you standardize this data? How do you analyze it? How do you ensure that you're collecting what you need to, and how do you make changes to which data you colelct over time?

### The Challenges of Production Debugging
- There are no universal standards for creating telemetry.
- Many debugging techniques are difficult to use when your systems are chaning rapidly.
- Lack of high-quality, stands-based, consistent telemetry data.

### The Importance of Telemetry
#### Hard and Soft Context
- Context: an overloaded term in the mmonitoring and observabiilty space.
- hard context:
  - per-request identifier that services in a distributed application can propagate to other service that are part of the same request.
- soft context:
  - various pieces of metadata that each telemetry instrument attaches to measurements from the various services and infrastructure that handle that same request

#### Telemetry Layering
- Telemetry signals are generally convertible.
- Signals are linked to each other through hard context.
- Logs also are attached to trace contexts as they're processed.
- OpenTelemetry is an evolutionary step in understanding systems.

### What Do People Need?
- Telemetry and observability have many stakeholders.

#### Developers and Operators
- Quality, highly contextual, highly correclated, and layered, among other things.
- Log4j, StatsD, Prometheus, and Zipkin.

#### Teams and Organizations
- Open standards that prevent vendor lock-in.
- Standard data formats and wire protocols.
- Composable, extensible, and well-documented instrumentation libraries and tools.

### Why Use OpenTelemetry?
- Universal Standards
- Correlated Data

## Chapter 3. OpenTelemetry Overview
- OpenTelemetry solves:
  - gives delelopers a single solution for built-in, native instrumentation of their code.
  - allows for instrumentation and telemetry data to be broadly compatible with the rest of the observability ecosystem.

### Primary Observability Signals
- Coapturing the relationships between services in your system using actual production data and service-to-service communication
- Annotating service telemetry with consistent and descriptive metadata about what he service is doing and where it's running
- Definitively identifying the relationships between arbitrary groups of measurements - basically, "this thing happened at the same time as this other thing"
- Efficiently creating accurate counts and measurements of events occurring in a system, such as the number of requests that occur, or how many requests took between 100 and 150 milliseconds to complete

#### Traces
- A trace is a way to model work in a distributed system.
- spans: a collection of related logs for a given transaction.
- Tracing is the core of transaction observability.

#### Metrics
- Metrics are numeric measurements and recordings of system state, such as the number of users concurrently logged into a system.
- metrics are useful for accurately measuring the "big picture" of a system.
- Cheap to create and store.
- OpenTelemetry metrics include semantic meaning that observability pipelines or frontends can take advantage of to intelligently query and visualize metric streams.
- OpenTelemetry metrics can be linked to other signals through both hard and soft context, allowing you to layer telemetry signals for cost control or other purposes.
- OpenTelemetry metrics support StatsD and Prometheus outt of the box, allowing you to map those exsiting metrics signals into the OpenTelemetry ecosystem.

#### Logs
- Logging is the final primary signal.
- In OpenTelemetry, main reasons to use logs:
  - To get signals out of services that can't be traced, such as legacy code, mainframes, and other systems of record
  - To correlate infrastructure resources such as managed databases or load balancers with application events
  - To understand behavior in a system that isn't tied to a user request, such as cron jobs or other recurring and on-demand work
  - To process them into other signals, such as metrics or traces

### Observability Context
- Three basic tyeps of context in OpenTelemetry:
  - time
  - attributes
  - context object

#### The Context Layer
- Context is an essential part of a telemetry system.
- At a high level:
  - conetxt: propagation mechanism which carries execution-scoped values across API boundaries and between logically associated execution units
- Goal: provide a clean interface either to existing context managers
- Propagators carry the hard context of a request
- Semantic convenntions

#### Attributes and Resources
- No more than 128 unique attributes in OpenTelemetry:
  - Not free to create or assign an attribute.
  - Cardinality Explosion

#### Semantic Conventions
- Main sources of semantic conventions:
  - The set of conentions that the project itself describes and ships
  - Platform teams and other internal sources

### OpenTelemetry Protocol

### Compatibility and Future-Proofing
- Standards-based conteext and conventions, alongside a universal data format.
- API: 3-year support guarantee
- Plug-in interfaces: 1-year support guarantee
- Constructors: 1-year support guarantee

## Chapter 4. The OpenTelemetry Architecture
- OpenTelemetry consists of three kinds of components:
  - instrumentation installed within applications
  - exporters for infrastructure
  - pipeline components for sending all of this telemetry to a storage system

### Application Telemetry
#### Library Instrumentation
- HTTP and RPC clients
- Database clients
- OpenTelemetry provides instrumentation libraries for many popular OSS libraries.

#### The OpenTelemetry API
- OpenTelemetry API has a special feature:
  - it is safe to call even when OpenTelemetry is not installed within an application.
  - OSS libraries can include OpenTelemetry instrumentation that will automatically be neabled when OpenTelemetry is in use, and that will act as a zero-cost no-op when the library is installed in applications that don't use OpenTelemetry.

#### The OpenTelemetry SDK

### Infrastructure Telemetry
#### Telemetry Pipelines
- OTLP
- OpenTelemetry Collector

#### What's Not Included in OpenTelemetry
- No Official Observability Backend

#### Hands-On with the OpenTelemetry Demo
- OpenTelemetry provides APIs, SDKs, and an ecosystem of tools to create, collect, transform, and ensure the quality of telemetry data.
- OpenTelemetry ensures that telemetry data is portable and interoperable.
- Unlike the old “three pillars” model, OpenTelemetry braids tracing, metrics, logging, and resources together into a single data model. This creates regularized data that is highly correlated and of uniformly high quality.
- OpenTelemetry Semantic Conventions ensure that telemetry from different libraries is consistent and of uniformly high quality.
- OpenTelemetry is just telemetry. It is designed to send data to a variety of storage and analysis tools and enable newer, more advanced analysis tools to be built.
