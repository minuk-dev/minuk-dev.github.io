---
layout  : wiki
title   : Cloud Native Go
date    : 2022-11-02 00:20:40 +0900
lastmod : 2022-11-06 23:57:27 +0900
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


# Part II. Cloud Native Go Constructs
## Chapter 3. Go Language Foundations
- Basic Data Types:
  - Booleans, Numberic, String
- The Blank Identifier `_`
- Container Types: Array, Slice, Map


## Chapter 4. Cloud Native Patterns
- The network is unreliable: switches fail, routers get misconfigured.
- Latency always exists : it takes time to move data across a network
- Bandwidth is finite: a network can only handle so much data at a time.
- The network is insecure : don't share secrets in plain text
- Topology can change: servers and services come and go
- There are multiple administrator: multiple admins lead to heterogenous solutions
- Transport cost is not zero: moving data around costs time and money
- The network is not homogeneous: every network is (sometimes very) different
- Services are unreliable: services that you depend on can fail at any time.

### The Context Package

```go
type Context interface {
  // Done returns a channel that's closed when this Context is canceeled.
  Done() <-chan struct{}

  // Err indicates why this context was cancelled after the Done channel is
  // closed. If Done is not yet closed, Err returns nil.
  Err() error

  // Deadline returns the time when this Context should be cancelled; it
  // returns ok==false if no deadline is set.
  Deadline() (daedline time.Time, ok bool)

  // Value returns the value associated with this context for key, or nil
  // if no value is associated with key. Use with care.
  Value(key interface{}) interface{}
}
```

- What Conext Can Do for You:
  - Context:
    - thread safe
    - allowing the cancellation signal to be coordinated
- Creating Context:
  - `func Background() Context` : top-level
  - `func TODO() Context` : unclear, not yet available
- Defining Context Deadlines and Timeouts:
  - `func WithDeadline(Context, time.Time) (Context, CancelFunc)`
  - `func WithTimeout(Context, time.Duartion) (Context, CancelFunc)`
  - `func WithCancel(Context) (Context, CancelFunc)`
- Defining Request-Scoped Values
  - `func WithValue(parent Context, key, val interface{}) Context`
- Using a Context:

  ```go
  func Stream(ctx context.Context, out chan Value) error {
    dctx, cancel := context.WithTimeout(ctx, time.Second * 10)
    defer cancel()
    res, err := SlowOperation(dctx)
    if err != nil {
      return err
    }

    for {
      select {
      case out := <- res:
        // do something
      case <- ctx.Done():
        return ctx.Err()
      }
    }
  }
  ```

- 관련 참고자료:
  - [go dev blog - Contexts and structs](https://go.dev/blog/context-and-structs)
  - [github: golang/go #22602 - context: relax recommendation against putting Contexts in structs](https://github.com/golang/go/issues/22602)

### Stability Patterns
#### Circuit Breaker
- Participants:
  - Circuit: The function that interacts with the service
  - Breaker: A closure with the same function signature as Circuit
- Adapter Pattern
- Sample Code:

  ```go
  type Circuit func(context.Context) (string, error)

  func Breaker(circuit Circuit, failureThreshold uint) Circuit {
    consecutiveFailures := 0
    lastAttempt := time.Now()
    var m sync.RWMutex

    return func(ctx context.Context) (string, error) {
      m.RLock()

      d := consecutiveFailures - int(failureThreshold)
      if d >= 0 {
        shouldRetryAt := lastAttempt.Add(time.Second * 2 << d)
        if !time.Now().After(sholdRetryAt) {
          m.RUnlock()
          return "", errors.New("service unreachable")
        }
      }

      m.RUnlock()
      res, err := circuit(ctx)
      m.Lock()
      defer m.Unlock()

      lastAttempt = time.Now()

      if err != nil {
        consecutiveFailures++
        return res, err
      }

      consecutiveFailures = 0

      return response, nil
    }
  }
  ```

#### Debounce
- Debounce limits the frequency of a function invoation so that only the first of last in a cluster of calls is actually performed.
- Participants:
  - Circuit: The function to regulate
  - Debounce: A closure with the same function signature as Circuit
- Sample code:

  ```go
  type Circuit func(context.Context) (string, error)

  func DebounceFirst(circuit Circuit, d time.Duration) Circuit {
    var threshold time.Time
    var result string
    var err error
    var m sync.Mutex

    return func(ctx context.Context) (string, error) {
      m.Lock()

      defer func() {
        threshold = time.Now().Add(d)
        m.Unlock()
      }()

      if time.Now().Before(threshold) {
        return result, err
      }

      result, err = circuit(ctx)

      return result, err
    }
  }
  ```
