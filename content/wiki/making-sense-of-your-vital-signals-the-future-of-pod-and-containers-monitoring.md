---
layout  : wiki
title   : Making Sense of Your Vital Signals - The Future of Pod and Containers Monitoring
date    : 2023-08-27 15:49:49 +0900
lastmod : 2023-08-27 16:27:34 +0900
tags    : [kubecon, observability]
draft   : false
parent  : kubecon
resource: 0236c698-186c-47c5-beca-f7fb82cebfca
---
- https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/program/schedule/
- https://www.youtube.com/watch?v=w6PeNpPhIF8&t=1s&ab_channel=CNCF%5BCloudNativeComputingFoundation%5D

## You were paged! Why!?
- Observability:
  - Understand resource usage, changes with deployments, rollouts
  - Identify issues and unexpected behavior with applications
  - Alerting on unexpected conditions
- SLO/SLIs
- Node stability:
  - Kubelet subcomponents:
    - (e.g. eviction manager) depend on metrics to understand which pods to evict:
      - e.g. pod that over consumes ephemeral storage will be evicted

## There's a lot of metrics in k8s...
- Node Level Metrics (i.e. node-exporter)
- Kubernetes component metrics (e.g. api-server, controller manager, scheduler, kubelet etc)
- Derived metrics from API resources( e.g. kube-state-metrics)
- Pod and Containers [Workload] metrics

- Today we will be focusing on Pod and Containers [Workload} metrics]

## cAdvisor Humble Beginning

## What is cAdvisor?
- Provides observability for containerized workloads:
  - Scrapes and collects containers running on the node
  - Parses the information and provides in multiple formats
  - "In tree" support for docker, containerd, CRI-O
  - Uses runc's libcontainer library to scrape cgroupfs
- cAdvisor can be used in:
  - "standalone mode" - Run as daemonset
  - "library" - Use it as a library from golang
- Kubelet depends on cAdvisor as a library

## There's quite a few metrics
## Where do the workload metrics come from?
- cgroups [v1 & v2]
  - Linux Kernel feature that provides ability to:
    - Group a set of process hierarchically
    - Set of controllers (cpu, memory, io, etc...) to manage and limit resources in groups and provide monitoring
  - Allow us to:
    - Limit usage of group of process (amount of CPU or memory or pids).
    - Measure resource usage for a group of processes

## A Day in the Life of a Metric
- Cgroup value -> runc libcontainer -> cAdvisor -> /metrics/cadivsor, /stats/summary

## How is cAdvisor exposed today
- Kubelet exposes the cAdvisor metrics via:
  - /metrics/cadvisor (direct prometheus)
    - `kubectl get --raw "/api/v1/nodes/kind-worker/proxy/metrics/cadvisor"`
  - /stats/summary (json)
    - `kubectl get --raw "/api/v1/nodes/kind-worker/proxy/stats/summary"`
- Kubelet also depends on cAdvisor for:
  - Gathering node level stats
  - Eviction Manager

## Case study
### CPU
- For each resource (cpu, memory, IO, storage) consider:
  - Utilization: the average time that the resource was busy servicing work
  - Saturation: the degree to which the resource has extra work which it can't service, often queued
  - Errors (if applicable)

#### CPU Requests & Limits
- Requests: Minimum Floor for CPU - you will always get CPU request
- Limtis: Ceiling for CPU - you will be throttled going above
- How does it work?:
  - CPU Shares
  - CFS Bandwidth Control:
    - CPU Quota [time slice] and CPU Period (100 ms)
- `rate(container_cpu_usage_seconds_total)`

#### CPU Saturation
- What container workload metrics measuring throttling?:
  - `container_cpu_cfs_periods_total`
  - `container_cpu_cfs_throttled_period_total`
- Throttled Percentage = Throttled Periods / Total Periods

### CPU throttling
- How do we fix it?: Increase the CPU limit (and requests)

## Future of Metrics
### cAdvisor Limitations
- Monolithic design
- Barely CRI aware
- Kernel separated containers not supported:
  - Windows
  - Kata containers, etc
- Duplicated:
  - Performance impact

### Who should own metrics collection?
- CRI-O? cAdvisor? containerd?

#### KEP-2371
- cAdvisor takes metrics collection
- cri-o & containerd push the metrics to the CRI
- https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/2371-cri-pod-container-stats/README.md
- https://github.com/kubernetes/enhancements/issues/2371

### How CRI stats will be exposed tomorrow
- Kubelet exposes the CRI metrics via:
  - `/metrics/cadvisor`:
    - Interpreted from metrics object of CRI
  - `/stats/summary`:
    - Interpreted from Stats object of CRI
  - `/metrics/resource`:
    - Interpreted from Stats object of CRI
- Kubelet still depends on cAdvisor for:
  - Gathering node level stats
  - Eviction Manager

- Alpha: implementation
- Beta: Testing (Accuracy, Metric coverage, Performance)

### End user impact?
- Hopefully, none!:
  - /stats/summary is a stable API of the Kubelet and its fields can be relied upon
  - /metrics/cadvisor has become a "stable" API of the Kubelet
  - In general: testing should prevent regressions

## Summary
- Observability helps gain insights in your application performance
- cAdvisor powers workload and container monitoring in Kubernetes
We are working on KEP-2371, "cAdvisor-less, CRI-full Container and Pod Stas KEP" moves pod and container stats into the CRI
