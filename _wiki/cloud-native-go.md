---
layout  : wiki
title   : Cloud Native Go
date    : 2022-11-02 00:20:40 +0900
lastmod : 2022-11-03 00:41:00 +0900
tags    : [go]
draft   : false
parent  : Book reviews
---

#### 누가 이 책을 읽어야하는가
- imtermediate-to-advanced developers
- web application engineer
- DevOps specialists/site reliability engieers


# Part 1. Going Cloud Native
## Chapter 1. What is a "Cloud Native" Application?
- A traditional three-tiered architecture:
  - Client - Web server + application server - Database server
  - Presentation tier - Business logic tier - Data management tier

### What Is Cloud Native?
- Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds
- Scalable, Loosely coupled, Resilient, Manageable, Observable

- Scalability:
  - Vertical scaling: upsizing the hardware resources (e.g. adding memory or CPU)
  - Horizontal Scaling: adding service instances (e.g. incresing the number of service nodes behind a load balancer)

- Loose Coupling:
  - System's components have minimal knowledge of any other components.
  - do not make distributed monolith, which are having a multiple services with the dependencies and entanglements of a monolithic system.

- Resilience:
  - roughly synonymous with fault tolerance
  - how well a system withstands and recovers from errors and faults.

  - Resilience is not reliability:
    - The resilence of a system is the degree to which it can continue to operate correctly in the face of errors and fults.
    - The reliability of a system is its ability to behave as expected for a given time interval.

- Manageability:
  - A system's manageability is the eas (or lack thereof) with which its behavior can be modified to keep it secure, running smoothly, and complaint with changing requirements.

  - Manageability is not maintainability:
    - Manageability describes the ease with which chnages can be made to the behavior of a running system, up to and including deploying (and redeploying) components of that system.
    - Maintainability describes the ease with which changes can be made to a system's underlying functionality, most often its code.

- Observability;
- The observability of a system is a measure of how well its internal states can be inferred from knowledge of its external outputs.


## Chapter 2. Why Go Rules the Cloud Native World
### The Motivation Behind Go
### Features for a Cloud Native World
- High program comprehensibility, Fast Builds, Efficiency, Low cost of updates

- Composition and Structural Typing:
  - type-like concept in the form of structs
  - embedding, composition

- Comprehensibility:
  - Go was designed with large projects with lots of contributors in mind.

- CSP-Style Concurrency:
  - CSP(Communicating Sequential Processes)
  - Do not communicate by sharing memory. Instead, share memory by communicating
  - cf. Concurrency is not parallelism:
    - Parallelism describes the simultaneous execution of multiple independent processes.
    - Concurrency describes the ocmposition of independently executing processes; it says nothing about when processes will execute

- Fast Builds:
  - Go language was designed to provide a model of software construction free of complex relationships

- Linguistic Stability:
  - to spend time writing with the language rather than writing the language.
  - unlikely event (breaking change), Go will provide a conversion utility

- Memory Safety
- Performance
- Static Linking
- Static Typing
