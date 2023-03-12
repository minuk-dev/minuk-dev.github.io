---
layout  : wiki
title   : Observability Engineering
date    : 2023-02-20 22:40:32 +0900
lastmod : 2023-03-05 22:48:38 +0900
draft   : false
parent  : Book Review
resource: 946BEF17-575B-4500-ABE7-19CA927C1835
---

# Part I. The Path to Observability
## Chapter 1. What Is Observability?
### The Mathematical Definition of Observability
- Observability : a measure of how well internal states of a system can be inferred from knowledge of its external outputs.

### Applying Observability to Software Systems
- Understand the inner workings of your application
- Understand any stem state your application may have gotten itself into, even new ones you have never seen before and couldn't have predicted
- Understand the innner workings and system state solely by observing and interrogating with external tools
- Understand the internal state without shipping any new custom code to handle it (because that implies you needed prior knowledge to explain it)

### Why Observability Matters Now
- With monitoring, software developers can't fully see their systems. They squint at the systems.

#### Is This Really the Best Way?
- As an industry, we generally don't question whether we should do it, but how.
- More abstract and more complex system

#### Why Are Metrics and Monitoring Not Enough?
- Traditional:
  - Monolith
  - 1 stateful (database)
  - low-level permission
  - controllable containers, VMs, bare metals
  - static, long-running
  - only can examine after problems occurred.
  - dashboard & telemetry serve for only ops engineers.
  - block-box applications
  - focus on uptime & failure prevention
  - limited or small number of dimensions
- But, now:
  - many service
  - polyglot persistence
  - extremely dynamic infrastructure
  - many far-flung and loosely couped services
  - uncontrollable
  - not only ops engineers, but also others
  - automatic instrumentation for complex systems
  - focus on reliability & toleration
  - unlimited number of dimensions

### Debugging with Metrics Versus Observability
- Debugging with metrics requires you to connect dozens of disconnected metrics that were recorded over the course of executing any one particular request, across any number of service or machines, to infer what might have occurred over the various hops needed for its fulfillment.
- Monitoring is for the known-kunknowns, but observability is for the unknown-unknowns.

### The Role of Cardinality
- Cardinality matters for observability, because high-cardinality information is almost always the most useful in identifying data for debugging or understanding a system.
- Unfortunately, metrics-based tooling systems can deal with only low-cardinality dimensions at any reasonable scale.

### The Role of Dimensionality
- Cardinality: The uniqueness of the value within your data
- Dimensionality: The number of keys within that data

## Debugging with Observability
- Observability tools encourage developers to gather rich telemetry for every possible event that could occur, passing along the full context of any given request and storing it for possible use at some point down the line.
- Observability tools are specifically designed to query aginst high-cardinality, high-dimensionality data.

## Observability Is for Modern Systems

# Chapter 2. How Debugging Practices Differ Between Observability and Monitoring
- Traditional monitoring:
  - checking system conditions against known thresholds
  - reactive approach
- Observability tools:
  - enabling iterative exploratory investigations
  - proactive approch to identifying any failure mode, whether known or unknown

## How Monitoring Data Is Used for Debugging
- Two main consumers of monitoring data:
  - machine: alert
  - human: dashboard

### Troubleshooting Behaviors When Using Dashboards
- Seeing that pattern, you quickly pull up the dashboard for the caching component of your system to confirm  your suspicion.

#### The Limitations of Troubleshooting by Intuition
- Example 1: Insufficient correlation:
  - Is a particular query scanning fewer rows than before?
  - How often is the new index getting chosen by the query planner, and for which queries?
  - Are write latencies up overall, on average, or at the 95th/99th percentiles?
  - Are queries fatser or slower when they use this index than their previous query plan?
  - What other indexes are also used along with the new index?
  - Has this index made any other indexes obsolete, so we can drop those and reclaim some write capacity?

- The engineers in the preceding examples might go back and add custom metrics for each query family, for expiration rates per collection, for error rates per shards, etc.

#### Traditional Monitoring Is Fundamentally Reactive

### How Observability Enables Better Debugging
