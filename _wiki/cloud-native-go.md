---
layout  : wiki
title   : Cloud Native Go
date    : 2022-11-02 00:20:40 +0900
lastmod : 2023-02-16 23:50:46 +0900
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

  ```go
  type Circuit func(context.Context) (string, error)

  func DebounceLast(circuit Circuit, d time.Duration) Circuit {
    threshold := time.Now()
    var ticker *time.Ticker
    var result string
    var err error
    var once sync.Once
    var m sync.Mutex

    return func(ctx context.Context) (string, error) {
      m.Lock()
      defer m.Unlock()

      threshold = time.Now().Add(d)

      once.Do(func() {
        ticker = time.NewTicker(time.Millisecond * 100)

        go func() {
          defer func() {
            m.Lock()
            ticker.Stop()
            once = sync.Once{}
            m.Unlock()
          }()

          for {
            select {
            case <- ticker.C:
              m.Lock()
              if time.Now().After(threshold) {
                result, err = circuit(ctx)
                m.Unlock()
                return
              }
              m.Unlock()
            case <- ctx.Done():
              m.Lock()
              result, err = "", ctx.err()
              m.Unlock()
              return
            }
          }
        }()
      })
    }
    return result, err
  }
  ```

#### Retry
- Participants:
  - Effector: The function that interacts with the service.
  - Retry: A function that accepts Effector and returns a closure with the same function signature as Effector.

- Sample Code:

  ```golang
  type Effector func(context.Context) (string, error)

  func Retry(effector Effector, retries int, delay time.Duartion) Effector {
    return func(ctx context.Context) (string, error) {
      for r := 0; ; r++ {
        response, err := effector(ctx)
        if err == nil || r >= retries {
          return response, err
        }

        select {
        case <- time.After(delay):
        case <- ctx.Done():
          return "", ctx.Err()
        }
      }
    }
  }
  ```

#### Throttle
- Participants:
  - Effector: The function to regulate
  - Throttle: A function that accepts Effector and returns a closure with the same function signature as Effector.

- Sample Code:

  ```golang
  type Effector func(context.Context) (string, error)

  func Throttle(e Effector, max uint, refill uint, d time.Duration) Effector {
    var tokens = max
    var once sync.Once

    return func(ctx context.Context) (string, error) {
      if ctx.Err() != nil {
        return "", ctx.Err()
      }

      once.Do(func() {
        ticker := time.NewTicker(d)

        go func() {
          defer ticker.Stop()

          for {
            select {
            case <- ctx.Done():
              return
            case <- ticker.C:
              t := tokens + refill
              if t > max {
                t = max
              }
              tokens = t
            }
          }
        }()
      })

      if tokens <= 0 {
        return "", fmt.Errorf("too many calls")
      }

      tokens--

      return e(ctx)
    }
  }
  ```

#### Timeout
- Participants:
  - Client: The client who wants to exectue SlowFunciton
  - SlowFunction: The long-runnign function that implements the funcitonality desired by Client.
  - Timeout: A wrapper function around SlowFunction that implements the timeout logic.

- Sample Code:

  ```golang
  type WithContext func(context.Context, string) (string, error)

  func Timeout(f SlowFunction) WithContext {
    return func(ctx context.Context, arg string) (string, error) {
      chres := make(chan string)
      cherr := make(chan error)

      go func() {
        res, err := f(arg)
        chres <- res
        cherr <- err
      }()

      select {
      case res := <-chres:
        return res, <-cherr
      case <- ctx.Done():
        return "", ctx.Err()
      }
    }
  }
  ```

### Concurrency Patterns
#### Fan-In
- Participants:
  - Sources: A set of one or more input channels with the same type. Accepted by Funnel.
  - Destination: An output channel of the same type as Sources. Created and provided by Funnel.
  - Funnel: Accepts Sources and immediately returns Destination. Any input from any Sources will be output by Destination.

- Sample Code:

  ```golang
  func Funnel(sources ...chan int) chan int {
    dest := make(chan int)

    var wg sync.WatiGroup

    wg.Add(len(sources))

    for _, ch := range sources {
      go func(c chan int) {
        defer wg.Done()

        for n := range c {
          dest <- n
        }
      }(ch)
    }

    go func() {
      wg.Wait()
      close(dest)
    }()

    return dest
  }
  ```

#### Fan-Out
- Participants:
  - Source: An input channel. Accepted by Split.
  - Destinations: An output channel of the same type as Source. Created and provided by Split.
  - Split: A function that accepts Source and immediately returns Destinations. ANy input from Source will be output to a Destination.

- Sample Code:

  ```golang
  func Split(source chan int, n int) []chan int {
    dests := make([]chan int, 0)

    for i := 0; i < n; i ++ {
      ch := make(chan int)
      dests := append(dests, ch)

      go func() {
        defer close(ch)
        for val := range source {
          ch <- val
        }
      }()
    }

    return dests
  }
  ```

#### Future
- Participants:
  - Future: The interface that is received by the consumer to retrieve the eventual result.
  - SlowFunction: A wrapper funciton around some function to be asynchronously exectued; provides Future
  - InnerFuture: Satisfies the Future interface; includes an attached method that contains the result access logic.

- Sample Code:

  ```golang
  type Future interface {
    Result() (string, error)
  }

  type InnerFuture struct {
    once sync.Once
    wg sync.WaitGroup

    res string
    err error
    resCh chan string
    errCh chan error
  }

  func (f *InnerFuture) Result() (string, error) {
    f.once.Do(func() {
      f.wg.Add(1)
      defer f.wg.Done()
      f.res = <- f.resCh
      f.err = <-f.errCh
    })

    f.wg.Wait()

    return f.res, f.err
  }
  ```

#### Sharding
- Horizontal vs Vertical:
  - Horizontal sharding: partitioning of data across service instances.
  - Vertical sharding: partitioning of data within a single instance.

- Participants:
  - ShardedMap: An abstraction around one or more Shards providing read and write access as if the Shards were a single map.
  - Shard: An individually lockable collection representing a single data partition.

- Sample code:

  ```golang
  type Shard struct {
    sync.RWMutex
    m map[string]any
  }

  type ShardedMap []*Shard

  func NewShardedMap(nshards int) ShardedMap {
    shards := make([]*Shard, nshards)

    for i := 0; i < nshards; i ++ {
      shard := make(map[string]any, 0)
      shards[i] = &Shard{m: shard}
    }

    return shards
  }

  const arbitraryByte int = 17
  func (m ShardedMap) getShardIndex(key string) int {
    checksum := sha1.Sum([]byte(key))
    hash := int(checksum[arbitraryByte])
    return hash % len(m)
  }

  func (m ShardedMap) getShard(key string) *Shard {
    index := m.getShardIndex(key)
    return m[index]
  }

  func (m ShardedMap) Get(key string) any {
    shard := m.getShard(key)
    shard.RLock()
    defer shard.RUnlock()

    return shard.m[key]
  }

  func (m ShardedMap) Set(key string, value any) {
    shard := m.getShard(key)
    shard.Lock()
    defer shard.Unlock()

    shard.m[key] = value
  }
  ```

## Chapter 5. Building a Cloud Native Service

- Idempotent operations are safer
- Idempotent operations are often simpler
- Idempotent operations are more declarative

### Building an HTTP Server with `net/http`

```go
type Handler interface {
  ServeHTTP(ResponseWriter, *Request)
}
```

- `DefaultServeMux`
- `ListenAndServe`

### Building an HTTP Server with `gorilla/mux`

- https://github.com/gorilla/mux
- Variables in URI paths:

```go
r := mux.NewRouter()
r.HandleFunc("/products/{key}", ProductHandler)
r.HandleFunc("/articles/{category}/", ArticlesCategoryHandler)
r.HandleFunc("/articles/{category}/{id:[0-9]+}", ArticleHandler)

vars := mux.Vars(request)
category := vars["category"]
```

---
- Warning : If you're using `iota` as enumerations in serializations(as we are here), take care to only append to the list, and don't reorder or insert values in the middle, or you won't be able to deserialize later.

## Chapter 6. It's All about Dependability
- Dependability:
  - Attributes:
    - Availability
    - Reliability
    - Maintainability
  - Threats:
    - Faults
    - Errors
    - Failures
  - Means:
    - Fault prevention - Scalability
    - Fault tolerance - Resilience
    - Fault removal - Manageability
    - Fault forecasting - Observability

### The Continuing Relevance of the Twelve-Factor App
- Use declarative formats for setup automation, to minimize time and cost for new developers joining the project
- Have a cleaen contact with the underlying operating system, offering maximum portability between execution environments
- Are suitable for deployment on modern cloud platforms, obviating the need for servers and systems administration
- Minimize divergence between development and production, enabling continuous deployment for maximum agility
- Can scale up without significant changes to tooling, architecture, or development practices

#### Twelve-Factor App
- Codebase : One codebase tracked in revision control, many deploys.
- Dependencies : Explicitly declare and isolate (code) dependencies.
- Configuration : Store configuration in the environment.
- Backing Services : Treat backing services as attached resources.
- Build, Release, Run : Strictly separate build and run stages.
- Processes : Execute the app as one or more stateless processes.
- Data Isolation : Each service manages its own data
- Scalability : Scale out via the process model.
- Disposability : Maximize robustness with fast startup and graceful shutdown.
- Development/Production Parity : Keep development, staging, and production as similar as possible.
- Logs : Treat logs as event streams.
- Administrative Processes : Run administrative/management tasks as one-off processes.

## Chatpr 7. Scalability
### The Four Common Bottlenecks
- CPU, Memory, Disk I/O, Network I/O

### Advantages of Statelessness
- Scalability, Durability, Simplicity, Cacheability

### Scaling Postponed: Efficiency
- hashicorp/golang-lru

### The pros and cons of serverlessness
- Operational management
- Scalability
- Reduced costs
- Productivity
- Startup latency
- Observability
- Testing
- Cost
