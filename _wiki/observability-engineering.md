---
layout  : wiki
title   : Observability Engineering
date    : 2023-02-20 22:40:32 +0900
lastmod : 2023-03-20 01:21:52 +0900
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
- Observability lets you explicitly discover the source of any problem, along any dimension or combination of dimensions, without needing to first predict where and how that problem might be happening; this model centers around questioning and understanding.
- Differences:
  - Relying on institutional knowledge
  - Finding Hidden Issues
  - Having confidence in diagnosing production issues
- Observability tools pull high-cardinality, high-dimensionality context from telemetry data into a signle location where investigators can easily slice and dice to zoom in, zoom out, or follow breadcrumbs to find definitive answers.

### Conclusion
- Monitoring-based debugging:
  - Metics & dashboard
- Observability-based debugging:
  - Withouth learning on experience or intimate system knowledge to generate a hunch

## Chapter3. Lessons from Scaling Wihtout Observability
- `If you can solve your problem with a LAMP stack (or equivalent), you probably should`:
  - When architecting a service, the first rule is to not add unnecessary complexity.
  - Don't confuse boring with bad.
- On a technical level, thse shifts include several primary effects:
  - The decomposition of everything, from one to many
  - The need for a variety of data stores, from one database to many storage systems
  - A migration from monolithic applications toward many smaller microservices
  - A variety of infrastructure types away from "big iron" servers toward contatiners, functions, serverless, and other ephemeral, elastic resources

### The Evolution Toward Modern Practices
- Userexperience can no longer be generalized as being the same for all service users. In the new model, different users of a service may be routed through the system in different ways, using different components, providing experience s that can vary widely.
- Monitoring alerts that look for edge cases in production that have system conditions exceeding known thresholds generate a tremendous number of false positives, false negatives, and meaningless noise. Alerting has shifted to a model in which fewer alerts are triggered, by focusing only on symptoms that directly impact user experience.
- Debuggers can no longer be attached to one specific runtime. Fullfilling service requests now requires hopping across a network, spanning multiple runtimes, often multiple times per individual request.
- Known recurring failures that require manual remediation and can be defined in a runbook are no longer the norm. Service failures have shifted from that model toward one in which known recurring fialures can be recovered automatically. Failures that cannot be automatcially recovered, and therefore trigger an alert, likely mean the responding engineer wil lbe facing a novel problem.

- Tips to diagnose problems:
  - Microservices and requests that spanned multiple runtimes.
  - Polyglot storage systems, without requiring expertise in each.
  - Multitenancy and running obht server-side code and queries; we could easily drill down into individual user experiences to see exactly what was happening.

## Chapter 4. How Observability Relates to DevOps, SRE, and Cloud Native
### Cloud Native, DevOps, and SRE in a Nutshell
- Loose coupling unlocks several key bueniness benefits
- CNCF defines:
  - cloud native: building and running scalable applications in modern, dynamic environments...
  - resilient, manageable, and observable.
  - make high-impact changes frequently and predictably with minimal toil

### Observability: Deubbing Then Versus Now
- Goal: agnostic in terms of how it's accomplished.
- Immutable infrastructure means that it's no longer feasible to ssh into a host for debugging.

### Observability Empowers DevOps and SRE Practices
- Chaos engineering and continuous verification
- Feature flagging
- Progressive release patterns
- Incident analysis and blameless postmortem

### Conclusion
- The shift toward DevOps, SRE, and cloud native practices have created a need for a solution like observability.

# Part II. Fundamentals of Observability
## Chatper 5. Structured Events Are the Building Blocks of Observability
- Metrics do not retain the context of the event, simply an aggregate measurement of what occurred at a particular time.

### Debugging with Structured Events
- event : a record of everything that occurred while one particular request interacted with your service.
- Details:
  - unique IDs, variable values, headers, every parameter passed by the request, the execution time, any calls made to remote services, the execution time of those remote calls, or any other bit of context
  - key value pairs
- Arbitariliy wide events

### The Limitations of Metrics as a Building Block
- pre-aggregated measure
- As aggregate numerical representations of predefined relations over predefined periods of time

### The Limitations of Traditional Logs as a Building Block
#### Unstructured Logs
- Traditional logs are unstructured
- hug volumes of noisy data : slow & clunky
- Hard to handle in nowadays systems.

#### Structured Logs
- Many logs are only portions of events
- Dozon log lines
- Log data can be useful when redesigned to resemble a structured event.

### Properties of Events That Are Useful in Debugging
- unknown-unknowns
- An observability tool must be able to support high-cardinality queries to be useful to an investigator.
- High cardinality and high dimensionality are the capabilities that enable you to find very fine-grained needles in deeply complex distributed system haystacks

### Conclusion
- The fundamental building block of observability is the arbitrarily wide structured event.
- Metrics aggregate system state over a predefined period of time.
- Unstructured logs are human redable but computationally difficult to use.
- Structured logs are machine parsable and can be useful for the goals of observability.
