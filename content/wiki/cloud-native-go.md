---
layout: wiki
title: Cloud Native Go
date: 2022-11-02 00:20:40 +0900
lastmod: 2025-03-23 17:42:52 +0900
tags:
  - go
draft: false
parent: Book reviews
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

## Chapter 8. Loose Coupling
### Tight Coupling
- "Tightly coupled" components have a great deal of knowledge about another component.:
  - Fragile exchange protocols
  - Shared dependencies
  - Shared point-in-time
  - Fixed addresses
- "Loosely coupled" components have minimal direct knowledge of one another.

### Communications Between Services
- Two messaging patterns:
  - Request-response (synchronous)
  - Publish-subscribe (asynchronous)

#### Request-Response Messging
- Common Request-Response Implementations:
  - REST
  - Remote procedure calls(RPC)
  - GraphQL
- Issuing HTTP Requests with net/http

```go
package main

import (
  "fmt"
  "io"
  "net/http"
  "strings"
)

const json = `{ "name":"Matt", "age": 44}`

func main() {
  in := strings.NewReader(json)

  resp, err := http.Post("http://example.com/upload", "text/json", in)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  message, err := io.ReadAll(resp.Body)
  if err != nil {
    panic(err)
  }

  fmt.Printf(string(message))
}
```

- Remote Procedure Calls with gRPC:
  - Advantages over REST:
    - Conciseness : Its messages are more compact, consuming less network I/O.
    - Speed : Its binary exchange format is much faster to marshal and unmarshal.
    - Strong-typing : It's natively strongly typed, eliminating a lot of boilerplate and removing a common source of errors.
    - Feature-rich : It has a number of built-in fetures like authentication, encryption, timeout, and compression (to name a few) that you would otherwise have to implement yourself.
  - Disadvantages:
    - Contact-driven: gPRC's contracts make it less suitable for external-facing services
    - Binary format: gRPC data isn't human-redable, making it harder to inspect and debug.
  - Interface definition with protocol buffers

### Loose Coupling Local Resources with Plug-ins
- Plug-in vocabulary:
  - Plug-in, Open, Symbol, Look up
- HashiCorp's Go Plug-in SYstem over RPC:
  - They can't crash your host process
  - They're more version-flexible
  - They're relatively secure
  - More verbose
  - Lower performance

### Hexagonal Architecture
#### The Architecture
- The core application
- Ports and adapters
- Actors

## Chapter 9. Resilience
- Resilience : The measure of a system's ability to withstand and recover from errors and failures.
- Resilience is not reliability:
  - The resilience of a system is the degree to which it can continue to operate correctly in the face of erros and faults.
  - The reliability of a system is its ability to behave as expected for a given time interval.

### Cascading Failures
- Preventing Overload:
  - Throttling
  - Load shedding : Service using this strategy intentionally drop("shed") some proportion of load as they approach overload conditions by either refusing requests or falling back into a degraded mode.

- Throttling

```go
type Effector func(context.Context) (string, error)
type Throttled func(context.Context, string) (bool, string, error)

type bucket struct {
  tokens uint
  time   time.Time
}

func Throttle(e Effector, max uint, refill uint, d time.Duration) Throttled {
  buckets := map[string]*bucket{}

  return func(ctx context.Context, uid string) (bool, string, error) {
    b := buckets[uid]

    if b == nil {
      buckets[uid] = &bucket{
        tokens: max -1,
        time: time.Now(),
      }

      str, err := e(ctx)
      return true, str, err
    }

    refillInterval := uint(time.Since(b.time) / d)
    tokensAdded := refill * refillInterval
    currentTokens := b.tokens + tokensAdded

    if currentTokens < 1 {
      return false, "", nil
    }

    if currentTokens > max {
      b.time = time.Now()
      b.tokens = max - 1
    } else {
      deltaTokens := currentTokens - b.tokens
      deltaRefills := deltaTokens / refill
      deltaTime := time.Duration(deltaRefills) * d

      b.time = b.time.Add(deltaTime)
      b.tokens = currentTokens - 1
    }

    str, err := e(ctx)

    return true, str, err
  }
}
```

```go
var throttled = Throttle(getHostname, 1, 1, time.Second)

func getHostname(ctx context.Context) (string, error) {
  if ctx.Err() != nil {
    return "", ctx.Err()
  }

  return os.Hostname()
}

func throttledHandler(w http.ResposneWriter, r *http.Request) {
  ok, hostname, err := throttled(r.Context(), r.RemoteAddr)

  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  if !ok {
    http.Error(w, "Too many requests", http.StatusTooManyRequests)
    return
  }

  w.WriteHeader(http.StatusOK)
  w.Write([]byte(hostname))
}

func main() {
  r := mux.NewRouter()
  r.HandleFunc("/hostname", throttledHandler)
  log.Fatal(http.ListenAndServe(":8080", r))
}
```

- Load shedding

```go
const MaxQueueDepth = 1000

func loadSheddingMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    if CurrentQueueDepth() > MaxQueueDepth {
      log.Println("load shedding engaged")

      http.Error(w,
        err.Error(),
        http.StatusServiceUnavailable)
      return
    }

    next.ServeHTTP(w, r)
  })
}

func main() {
  r := mux.NewRouter()

  r.Use(loadSheddingMiddleware)

  log.Fatal(http.ListenAndServe(":8080", r))
}
```

### Play It Again: Retrying Requests
#### Backoff Algorithms

- Very Common (not good)

```go
res, err := SendRequest()
base, cap := time.Second, time.Minute

for backoff := base; err != nil; backoff <<= 1 {
  if backoff > cap {
    backoff = cap
  }
  time.Sleep(backoff)
  res, err = SendRequest()
}
```

- With jitter(good)

```go
res, err := SendRequest()
base, cap := time.Second, time.Minute

for backoff := base; err != nil; backoff <<= 1 {
  if backoff > cap {
    backoff = cap
  }

  jitter := rand.Int63n(int64(backoff * 3))
  sleep := base + time.Duration(jitter)
  time.Sleep(sleep)
  res, err = SendRequest()
}
```

#### Circuit Breaking
- Circuit Breaker is generally applied only to outgoing requests. It usually doesn't care one bit about the request rate
- Throttle works like the throttle in a car by limiting a number of requests

#### Timeouts
- Using Context for service-side timeouts

```go
func UserName(ctx context.Context, id int) (string, error) {
  const query = "SELECT username FROM users WHERE id=?"

  dctx, cancel := context.WithTimeout(ctx, 15 * time.Second)
  defer cancel()

  var username string
  err := db.QueryRowContext(dctx, query, id.Scan(&username))

  return username, err
}

func UserGetHandler(w http.ResponseWriter, r *http.Request) {
  vars := mux.Vars(r)
  id := vars["id"]

  rctx := r.Context()

  ctx, cancel := context.WithTimeout(rctx, 10*time.Second)
  defer cancel()

  username, err := UserName(ctx, id)

  switch {
  case errors.Is(err, sql.ErrNoRows):
    http.Error(w, "no such user", http.StatusNotFound)
  case errors.Is(err, context.DeadlineExceeded):
    http.Error(w, "database timeout", http.StatusGatewayTimeout)
  case err != nil:
    http.Error(w, err.Error(), http.StatusInternalServerError)
  default:
    w.Write([]byte(username))
  }
}
```

#### Idempotence

### Service Redundancy
#### Designing for Redundancy
- Fault masking : When a system fault is invisibly compensated for without being explicitly detected.

#### Autoscaling

### Healthy Health Checks
- Failures:
  - A local failure like an application error or resource depletion(CPU, Memory Issue)
  - A remote failure in some dependency that affects the functioning of the service(Database)
- Three Types of Health Checks:
  - Liveness checks:
    - That the service instance is listening and accepting new connections on the expected port
    - That the instance is reachable over the network
    - That any firewall, security group, or other configurations are correctly defined
  - Shallow health checks:
    - The availability of key local resources (memory, CPU, database connections)
    - The ability to read or write local data, which checks disk space, permissions, and for hardware malfunctions such as disk failure
    - The presence of support processes, like monitoring or updater processes
  - Deep health checks:
    - Deep health chekcs directly inspect the ability of a service to interact with its adjacent systems.
    - Dependencies, invalid credentials, the loss of connectivity to data sotres, or other unexpected networking issues
- Failing Open

## Chapter 10. Manageability
- Manageability describes the ease with which changes can be made to the behavior of a sytem, typically without having to resort to changing its code.
- Maintainability describes the ease with which a software system or component can bemodified to change or add capbilities, correct faults or defects, or improve performance, usually by making changes to the code.

### What Is Manageability and Why Should I Care?
- Configurations and control
- Monitoring, logging, and alerting
- Deployment and updates
- Service discovery and inventory

### Configuring Your Application
- Store configuration in the environment
- Configuration should be strictly separated from the code
- Configurations should be stored in version control

#### Configuration Good Practice
- Version control your configurations
- Don't roll your own format
- Make the zero value useful

#### Configuring with Environment Variables

```go
name := os.Getenv("NAME")
place := os.Getenv("CITY")

fmt.Printf("%s lives in %s.\n", name, place)

if val, ok := os.LookupEnv(key); ok {
  fmt.Printf("%s=%s\n", key, val)
} else {
  fmt.Printf("%s not set\n", key)
}
```

#### Configurint with Command-Line Arguments
- The standard flag package

```go
pakcage main

import (
  "flag"
  "fmt"
)

func main() {
  strp := flag.String("string", "foo", "a string")

  intp := flag.Int("number", 42, "an integer")
  boolp := flag.Bool("boolean", false, "a boolean")

  flag.Parse()

  fmt.Println("string:", *strp)
  fmt.Println("integer:", *intp)
  fmt.Println("boolean:", *boolp)
  fmt.Println("args:", flag.Args())
}
```

- The Cobra command-line parser

```go
package main

import (
  "fmt"
  "os"
  "github.com/spf13/cobra"
)

var strp string
var intp int
var boolp bool

var rootCmd = &cobra.Command{
  Use: "flags",
  Long: "A simple flags experimentation command, built with Cobra.",
  Run: flagsFunc,
}

func init() {
  rootCmd.Flags().StringVarP(&strp, "string", "s", "foo", "a string")
  rootCmd.Flags().IntVarP(&intp, "number", "n", 42, "an integer")
  rootCmd.Flags().BoolVarP(&boolp, "boolean", "b", false, "a boolean")
}

func flagsFunc(cmd *cobra.Command, args []string) {
  fmt.Println("string:", strp)
  fmt.Println("integer:", intp)
  fmt.Println("boolean:", boolp)
  fmt.Println("args:", args)
}

func main() {
  if err := rootCmd.Execute(); err != nil {
    fmt.Println(err)
    os.Exit(1)
  }
}
```

- Configuring with Files:
  - Our configuration data structure:
    - Configuration keys and values can be mapped to corresponding fields in a specific struct type.
    - Configuration data can be decoded and unmarshalled into one or more, possibly nested, maps of type `map[string]any`.
  - Working with JSON:

    ```go
    type Config struct {
      Host string
      Port uint16
      Tags map[string]string
    }

    // func Marhsal(v any) ([]byte, error)
    // func MarshalIndent(v any, prefix, indent string) ([]byte, error)
    bytes, err := json.MarhsalIndent(c, "", "  ")
    fmt.Println(string(bytes))

    c := Config{}
    err := json.Unmarshal(bytes, &c)
    ```

  - Customizing JSON keys:

    ```go
    CustomKey string `json:"custom_key"`
    OmitEmpty string `json:",omitempty"`
    IgnoredName string `json:"-"`
    ```

  - Working with YAML:

    ```go
    Flow map[string]string `yaml:"flow"`
    Inline map[string]string `yaml:",inline"`
    ```

- Watching for configuration file changes

```go
func loadConfiguration(filepath string) (Config, error) {
  dat, err := ioutil.ReadFile(filepath)
  if err != nil {
    return Config{}, err
  }

  config := Config{}

  err = yaml.Unmarshal(dat, &config)
  if err != nil {
    return Config{}, err
  }

  return config, nil
}

func startListening(update <- chan string, errors <- chan err) {
  for {
    select {
    case filepath := <-updates:
      c, err := loadConfiguration(filepath)
      if err != nil {
        log.Println("error loading config:", err)
        continue
      }
      config = c

    case err := <-errors:
      log.Println("error watching config:", err)
    }
  }
}

func init() {
  updates, errors, err := watchConfig("config.yaml")
  if err != nil {
    panic(err)
  }

  go startListening(updates, errors)
}

func calculateFileHash(filepath string) (string, error) {
  file, err := os.Open(filepath)
  if err != nil {
    return "", err
  }
  defer file.Close()

  hash := sha256.New()

  if _, err := io.Copy(hash, file); err != nil {
    return "", err
  }

  sum := fmt.Sprintf("%x", hash.Sum(nil))

  return sum, nil
}

func watchConfig(filepath string) (<- chan string, <- chan error, error) {
  errs := make(chan error)
  changes := make(chan string)
  hash := ""

  go func() {
    ticker := time.NewTicker(time.Second)

    for range ticker.C {
      newhash, err := calculateFileHash(filepath)
      if err != nil {
        errs <- err
        continue
      }
    }

    if hash != newhash {
      hash = newhash
      changes <- filepath
    }
  }()

  return changes, errs, nil
}
```

- fsnotify

```go
func watchConfigNotify(filepath string) (<-chan string, <- chan error, error) {
  changes := make(chan string)

  watcher, err := fsnotify.NewWatcher()
  if err != nil {
    return nil, nil, err
  }

  err = watcher.Add(filepath)
  if err != nil {
    return nil, nil, err
  }

  go func() {
    changes <- filepath

    for event := range watcher.Events {
      if event.Op&fsnotify.Write == fsnotify.Write {
        changes <- event.Name
      }
    }
  }()

  return changes, watcher.Errors, nil
}
```

- Viper:
  - Explicitly set values
  - Command-line flags
  - Environment variables
  - Configuration files, in multiple file formats
  - Remote key/value stores

```go
viper.Set("Verbose", true)
viper.Set("LogFile", LogFile)

var rootCmd = &cobra.Command{ /* */ }

func init() {
  rootCmd.Flags().IntP("number", "n", 42, "an integer")
  viper.BindPFlag("number", rootCmd.Flags().Lookup("number"))
}

n := viper.GetInt("number")
viper.BindEnv("id")
viper.BindEnv("port", "SERVICE_PORT")

id := viper.GetInt("id")
port := viper.GetInt("port")

viper.SetConfigName("config")
viper.SetConfigType("yaml")

viper.AddConfigPath("/etc/service/")
viper.AddConfigPath("$HOME/.service")
viper.AddConfigPath(".")

if err := viper.ReadInConfig(); err != nil {
  panic(fmt.Errorf("fatal error reading config: %w", err))
}

viper.WatchConfig()
viper.OnConfigChange(func(e fsnotify.Event) {
  fmt.Println("Config file changed:", e.Name)
})
```

- viper remote provider

### Feature Management with Feature Flags
- Generation 0: The Initial Implementation
- Generation 1: The Hard-Coded Feature Flag
- Generation 2: The Configurable Flag
- Generation 3: Dynamic Feature Flags

## Chapter 11. Observability

- Data is not information, information is not knowledge, knowledge is not understanding, understanding is not wisdom.

### The Three Pillars of Observability
- Tracing, Metrics, logging

### OpenTelemetry
#### The OpenTelemetry Components
- Specifications
- API
- SDK
- Exporters
- Collector

#### Tracing Concepts
- Spans : A span describes a unit of work performed by a request, such as a fork in the execution flow or hop across the network, as it propagates through a system. Each span has an associated name, a start time, and a duration.
- Traces : A trace represents all of the events - individually represented as spans - that make up a request as it flow through a system

#### Tracing with OpenTelemetry
- The Console Exporter

```go
stdExporter, err := stdout.NewExporter(
  stdout.WithPrettyPrint(),
)
```

- The Jaeger Exporter

```go
jaegerEndpoint := "http://localhost:14268/api/traces"
serviceName := "fibonacci"

jaegerExporter, err := jaeger.NewRawExporter(
  jaeger.WithCollectorEndpoint(jaegerEndpoint),
  jaeger.WithProcess(jaeger.Process{
    ServiceName: serviceName,
  }),
)
```

### Push Versus Pull Metric Collection

- Push-based metric collection
- Pull-based metric collection (e.g. Prometheus)

### Logging
- time, level, one or more contextual elements
- Dynamic sampling:
  - zap

```go
package main

import (
  "fmt"

  "go.uber.org/zap"
  "go.uber.org/zap/zapcore"
)

func init() {
  cfg := zap.newDevelopmentConfig()
  cfg.EncoderConfig.TimeKey = ""
  cfg.Sampling = &zap.SamplingConfig{
    Initial: 3,
    Thereafter: 3,
    Hook: func(e zapcore.Entry, d zapcore.SamplingDecision) {
      if d == zapcore.LogDropped {
        fmt.Println("event dropped...")
      }
    },
  }

  logger, _ := cfg.Build()
  zap.ReplaceGlobals(logger)
}
```
