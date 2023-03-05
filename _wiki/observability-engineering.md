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
- Two big implications:
  - 
