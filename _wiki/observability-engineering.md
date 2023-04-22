---
layout  : wiki
title   : Observability Engineering
date    : 2023-02-20 22:40:32 +0900
lastmod : 2023-04-23 03:12:43 +0900
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

## Chapter 6. Stitchign Events into Traces
- Distributed traces are simply an interrelated series of events.

### Distributed Tracing and Why It Matters Now
- Distirbuted tracing is a method of tracking the progression of a single request as it is handled by various services that make up an application.
- Solution
  - Twitter's Zipkin (2012)
  - Uber's Jaeger (2017)
  - Honycomb, Lightstep

### The Components of Tracing
- TraceID: unique identifier
- SpanID: unique identifier for each individual span created.
- ParentID: A Parent ID is absent in the root span.
- Timestamp: Each span must indicate when its work began
- Duration: Each span must also record how long that work took to finish.

### Instrumenting a Trace the Hard Way
- traceID: UUID

```go
func rootHandler(r *http.Request, w http.ResponseWriter) {
  traceData := make(map[string]any)
  traceData["trace_id"] = uuid.String()
  traceData["span_id"] = uuid.String()

  startTime := time.Now()
  traceData["timestamp"] = startTime.Unix()

  authorized := callAuthService(r)
  name := call NameService(r)

  if authorized {
    w.Write([]byte(fmt.Sprintf(`{"message": "Waddup %s"}`, name)))
  } else {
    w.Write([]byte(`{"message": "Not cool dawg"}`))
  }

  traceData["duration_ms"] = time.Now().Sub(startTime)
  sendSpan(traceData)
}
```


- [W3C](https://www.w3.org/TR/trace-context/)
- X-B3-TraceId: Contains the trace ID for the entire trace
- X-B3-ParentSpanId: Contains the current span ID, which will be set as the parent ID in the child's generated span

### Adding Custom Fields into Trace Spans

```go
func rootHandler(r *http.Request, w http.ResponseWriter) {
  traceData := make(map[string]any)
  traceData["tags"] = make(map[string]any)

  hostname, _ := os.Hostname()
  traceData["tags"]["hostname"] = hostname
  //
}
```

### Stitching Events into Traces
- Tracing doesn't have to be limited to service-to-service calls.

### Conclusion
- Events are the building blocks of observability, and traces are simply an interrelated series of events.

## Chapter 7. Instrumentation with OpenTelemetry

- OpenTelemetry standard

### A Brief Introduction to Instrumentation
- Before otel, we may have installed instrumentation libraries or agents in our applications

### Open Instrumentation Standards
- OpenTelemetry(OTel) : OpenTracing + OpenCensus
- OTel has become the single open source standard for application instrumentation among observability solutions.

### Instrumentation Using Code-Based Examples
- OpenTelemetry:
  - API
  - SDK
  - Tracer
  - Meter
  - Context propagation
  - Exporter
  - Collector

#### Start with Automatic Instrumentation
- go:
  - http

    ```go
    import "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"

    mux.Handle("/rout", otelhttp.NewHandler(otelhttp.WithRoutTag("/route", http.HandlerFunc(h)), "handler_span_name"))
    ```

  - gprc

    ```go
    import (
      "go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgprc"
    )

    s := grpc.NewServer(
      grpc.UnaryInterceptor(otelgrpc.UnaryServerInterceptor()),
      gprc.StreamInterceptor(otelgrpc.StreamServerInterceptor()),
    )
    ```

- java:
  - [openfeign micrometer - related commit](https://github.com/spring-cloud/spring-cloud-openfeign/commit/e745dd0c7cc84c916765337761edc7a92ad00e60)
  - [open feign docs](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/#micrometer-support)

  - `spring.cloud.openfeign.micrometer.enabled=true`
  - `spring.cloud.openfeign.client.config.feignName.micrometer.enabled=true`
  - create `MicrometerObservationCapability` using `ObservationRegistry` Bean

  ```java
  @Configuration
  public class ObservationConfiguration {
    @Bean
    public MicrometerObservationCapability micrometerObservationCapability(ObservationRegistry registry) {
        return new MicrometerObservationCapability(registry);
    }
  }
  ```

#### Add Custom Instrumentation
- Starting and finishing trace spans

```go
import "go.opentelemetry.io/otel"

var tr = otel.Tracer("module_name")

func funcName(ctx context.Context) {
  sp := tr.Start(ctx, "span_name")
  defer sp.End()

  // do work here
}
```

- Adding wide fields to an event

```go
import "go.opentelemetry.io/otel/attribute"

sp.SetAttributes(attribute.Int("http.code", resp.ResponseCode))
sp.SetAttributes(attribute.String("app.user", username))
```

### Send Instrumentation Data to a Backend System

```go
import (
  x "github.com/my/backend/exporter"
  "go.opentelemetry.io/otel"
  sdktrace "go.opentelemetry.io/otel/sdk/trace"
)

func main() {
  exporterX := x.NewExporter(...)
  exporterY := y.NewExporter(...)
  tp, err := sdktrace.NewTracerProvider(
    sdktrace.WithSampler(sdktrace.AlwaysSample()),
    sdktrace.WithSyncer(exporterX),
    sdktrace.WithBatcher(exporterY),
  )
  otel.SetTracerProvider(tp)
}
```

### Conclusion
- OTel is an open source standard.

## Chapter 8. Analyzing Events to Achieve Observability
- Hypothesis-driven debugging: form hypotheses and explorer the data to confirm or deny them. replying on intuition and pattern matching.

### Debugging from Known Conditions
- Prepare runbook to identify and solve evry possible "root cause"
- Modern systems rarely fail in precisely the same way twice.:
  - The time for creating runbooks & dashboards is largely wasted
  - Technical debt
  - Wrong documentation is perhaps more dangerous than no documentation

- Be debugging from known conditions, is not collection event data for unknown conditions.:
  - e.g. `tail -f` and `grep` with unstructured logs, or finding a spike on one dashboard

### Debugging from First Principles
- The real power of observability is that you shouldn't have to know so much in advance of debugging an issue.

### Using the Core Analysis Loop
- Four stages of the core analysis loop:
  - What are you trying to understand?
  - Visualize telemetry data to find relevant performance anomalies
  - Search for common dimensions within the anomalous area by grouping of filtering for different attributes in your wide events
  - Has this isolated likely dimensions that identify potential sources of the anomaly?

### Automating the Brute-Force Portion of the Core Analysis Loop
- The core analysis loop is a method to objectively find a signal that matters within a sea of otherwise normal system noise.

### This Misleading Promise of AIOps
- artificial intelligence for operations (AIOps)

### Conclusion
- The core analysis loop is an effective technique for fast fault localization.

## Chapter 9. How Observability and Monitoring Come Together
### Where Monitoring Fits
- RRDs(round-robin databases) to TSDB(time series databases)
- The optimization of monitoring systems to find known-unknowns means that it's a best fit for understanding the state of your systems, which change much less frequently and in more predictable ways than your application code.
- Over time, metrics have also been adapted to creep into monitoring application-level concerns.:
  - In the role of a warning signal, aggregate measures like metrics work well.

### Where Observability Fits
- The optimization of observability to find unknown-unknowns means it's a best fit for understanding the state of the code you write, which changes much more frequently than your systems (typically, every day) and in far less predictable ways.
- Monitoring and observabitliy tools have different best practices and different implementations, and they serve different purposes.

### System Versus Software Considerations
- Software: the code you are actively developing that runs a production service delivering value to your customers.
- System: an umbrella for everything else about the underlying infrastructure and runtime that is necessary to run that service.:
  - databases(e.g., MySQL or MongoDB)
  - compute and storage (e.g. containers or virtual machines)
  - others (kafka, Postfix, HAProxy, Memcached, or even something like Jira)

- Factors that vary between systems and software

| Factor                    | Your systems                                 | Your software                                                                                             |
| Rate of change            | Package updates (monthly)                    | Repo commits (daily)                                                                                      |
| Predictability            | High (stable)                                | Low (many new features)                                                                                   |
| Value to your business    | Low (cost center)                            | High (revenue generator)                                                                                  |
| Number of users           | Few (internal teams)                         | Many (your customers)                                                                                     |
| Core concern              | Is the system or service healthy?            | Can each request acquire the resources it needs for end-to-end execution in a timely and reliable manner? |
| Evaluation perspective    | The system                                   | Your customers                                                                                            |
| Evaluation criteria       | Low-level kernel and hardware device drivers | Variables and API endpoint                                                                                |
| Functional responsibility | Infrastructure operations                    | Software development                                                                                      |
| Method for understanding  | Monitoring                                   | Observability                                                                                             |

### Accessing Your Organizational Needs
- Observability will help you deeply understand how software you develop and ship is performing when serving your customers.
- Metrics-based monitoring tools and their associated alerts help you see when capacity limits or known error conditions of underlying systems are being reached.:
  - low level DNS counters, disk statistics, ethernet ports, statistics, system firmware, etc.
- Today, your mileage may vary, depending on the robustness of your cloud provider.

#### Exceptions: Infrastructure Monitoring That Can't Be Ignored.
- higher-order infrastructure metircs like CPU usage, memory consumption, and disk activity are indicative of physical performance limitations.

#### Real-World Examples
- skip to summarize

### Conclusion
- Monitoring is best suited to evaluating the health of your systems.
- The most notable exceptions to that neat dividing line are higher-order infrastructure metrics on physical devices that directly impact software performance.

# Part III. Observability for Teams
## Chapter 10. Applying Observability Practices in Your Team
### Join a Community Group
- Technical Advisory Group (TAG) for Observability: https://github.com/cncf/tag-observability

### Start with the Biggest Pain Points
- The fastest way to drive adoption is to solve the biggest pain points for teams responsible for managing their production services. Target those pains. Resist the urge to start small.

### Buy Instead of Build
- ROI
- Your best way to do that is to instrument your applications by using OpenTelemetry.
- ELK stack (Elasticsearch, Logstash, and Kibana)
- Prometheus
- Jaeger

### Flesh Out Your Instrumentation Iteratively
- You don't need a fully developed set of instrumentation to get immediate value with observability

### Look for Opportunities to Leverage Existing Efforts
- Individuals and organizations commit the sunk-cost fallacy when they continue a behavior or endeavor as a result of previously invested time, money, or effort.
- Examples:
  - If you're using an ELK stack - or even just the Logstash part - it's trivial to add a snippet of code to fork the output of a source stream to your observability tool.
  - If you're already using structured logs, all you need to do is add a unique ID to log events as they propagate throughout your entire stack. You can keep those logs in your existing log analysis tool, while also sending them as trace events to your observability tool.
  - Try running observability instrumentation (for example, Honeycomb's Beelines or OTel) alongside your existing APM solution.
  - If you're using Ganglia, you can leverage that data by parsing the Extensible Markup Language (XML) dump it puts into `/var/tmp` with a once-a-minute cronjob that that shovels that data into your observability tool as events. That's a less than optimal use of observabilty, but it certainly creates familiarity for Ganglia users.
  - Re-create the most useful of your old monitoring dashbaords as easily referenceable queries within your new observability tool. While dashbaords certainly have their shortcomings, this gives new users a landing spot where they can understand the system performance they care about at glance, and also gives them an opportunity to explore and know more.

### Prepare for the Hardest Last Push
- The goal of a complete implementation is to have built a reliable go-to debugging solution that can be used to fully understand the state of your production applications whenever anything goest wrong.

### Conclusion
- moving fast, demonstrating high value and ROI, and tackling work iteratively.

## Chapter 11. Observability-Driven Development
### Test-Driven Development
- TDD is particularly powerful because tests run the same way every time.
- Observability can help you write and ship better code even before it lands in source control

### Observability in the Development Cycle
- While the original intent is still fresh in the original author's head.

### Determining Where to Debug
- Observability is not for debugging your code logic.
- Observability is for figuring out where in your systems to find the code you need to debug.

### Debugging in the Time of Microservices
- It is likely still incredibly unclear according to your monitoring tooling whether that slowness is being caused by any of the collowing:
  - A bug in your code
  - A particular user chaning their usage pattern
  - A database overflowing its capacity
  - Network connection limits
  - A misconfigured load balancer
  - Issues with service registration or service discovery
  - Some combination of the preceding factors

### How Instrumentation Drives Observability
- Good instrumentation drives observability.
- Every engineer should be expected to instrument their code such that they can answer these questions as soon as it's deployed:
  - Is your code doing what your expected it to do?
  - How does it compare to the previous version?
  - Are users actively using your code?
  - Are any abnormal condtions emerging?

### Shifting Observability Left
- observability-driven development

### Using Observability to Speed Up Software Delivery
- Observability-driven development in tandem with feature flags and progressive delivery patterns can equip engineering teams with the tools they need to stop instinctively rolling back deployments and instead dig in to further investigate what's really happening whenever issues occur during relase of a new feature.

### Conclusion
- Observability can, and should, be used early in the software development life cycel.
- Test-driven development is a useful tool for examining how your code runs against a defined specification.
- Observability-driven development is a useful tool for examining how your code behaves in the chaotic and turbulent world of production.

## Chapter 12. Using Service-Level Objectives for Reliability
### Traditional Monitoring Approaches Create Dangerous Alert Fatigue
- Problem: normalization of deviance
