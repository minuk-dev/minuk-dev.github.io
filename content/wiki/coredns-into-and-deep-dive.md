---
layout  : wiki
title   : CoreDNS - Intro and Deep Dive
date    : 2022-09-22 00:53:03 +0900
lastmod : 2022-09-22 02:10:37 +0900
tags    : [kubecon, coredns, kubernetes]
draft   : false
parent  : kubecon
---

- [원본링크](https://youtu.be/rNlSgYZoIYs)


## What is CoreDNS?
- Flexible DNS server written in GO
- Focus on service discovery
- Plugin based architecture, easily extended
- Support serving via DNS, DNS over TLS, DNS over HTTP/2, DNS over gRPC
- Support forwarding to upstream via DNS, DNS over TLS, DNS over gRPC
- Integration with Route53/Google Cloud DNS/Azuer DNS
- Integrates with Prometheus, Open Tracing, OPA
- Default DNS server in Kubernetes
- Basis for node local cache feature in K8s

## Latest Updates
- 1.8.5 - 1.9.2:
  - 1.9.2. Released May, 2022
  - New plugins: geoip, header:
    - geoip reports where the query comes from
    - header allows fiddle with header bits
  - Backwards incompatible changes:
    - kubernetes: Removed wild card query functionality.
    - route53: Plaintext secret in Corefile deprecated.
  - Built with golang 1.17.8+ since 1.9.1:
    - golang < 1.17.6 security issues

### Security Audit
- Completed by Tail of Bits (March 2022)
- Sponsored by Linux Foundation
- 1 high severity issue (TOB-CDNS-8):
  - May lead to cache poisoning attacks
- 1 medium issue (TOB-CDNS-12):
  - Mitigation possible withouth coredns update
- 12 low or informational issues.
- All have been resolved now.

## Three ways to cusomize CoreDNS
- Rebuilding with external plugins
- Using CoreDNS as a library
- Building your own plugin

### Rebuilding with External Plugins
- You do not need to know Go to do this!
- "External":
  - Not built into the standard binaries and Docker images
  - Not supported by core team
- No dynamic loading of plugins:
  - Plugins are built-in at compile time
  - Controlled by plugin.cfg
- Plugin ordering is fixed at compile time

### External Plugins
- Prerequisites: Docker and a shell:
  1. Clone CoreDNS
  2. Modify plugin.cfg
  3. Build CoreDNS

### CoreDNS as a Library
- Replace the CoreDNS main.go
- Allows you to:
  - Reduced the size and memory footprint of the binary
  - Limit the functionality and CLI flags
  - Do extra setup or initialization
- Used, for example, by Node Local DNS in K8s

### Example: dnscached
- Source is in [https://github.com/coredns/learning-coredns](https://github.com/coredns/learning-coredns)
- Simple caching DNS server
- Embeds only bind, cache, erros, forward and log plugins
- CLI args to generate a Corefile internally

### Writing a Plugin
- Three categories of plugins
- Best practice: stick to one of these in your plugin
- Backends:
  - Source of data
  - file, forward, hosts, clouddns, template, kubernetes
- Mutators:
  - Modify the inbound request, the outbound response, or both
  - acl, cache, rewrite, nsid
- Configurators:
  - Modify the internal state or functioning of CoreDNS
  - bind, log, health, ready

## Four functions
- Name - literally, just returns the name of the plugin
- ServeDNS - request handling
- init - register your plugin with Caddy
- setup - parse your config

### Example: There can be only one!
- onlyone plugin from Learning CoreDNS
- Filters out all but one of specific record types

### Function: setup

- setup.go

```go
func setup(c *caddy.Controller) error {
  t, err := parse(c)
  if err != nil {
    return plugin.Error("onlyone", err)
  }

  dnsserver.GetConfig(c).AddPlugin(func(next plugin.Handler) plugin.Handler {
    t.Next = next
    return t
  })

  return nil
}
```

### Function: ServeDNS

## 개인 생각
- 기본적으로 Google 개발자들이 발표하는게 퀄리티가 좋은듯? 너무 기업에서 "우리 최고죠?" 이런 느낌으로 홍보 가까운 느낌인데, 구글껀 괜찮은듯, 일단 전체적으로 보편적으로 다들 쓰고 있는걸 말한다.: 구글이 쓰니까 보편적인건가? 뭐든 학습자 입장에서는 쓰지도 않을 Framework, Library 공부하는 것보다는 좋은듯
- CoreDNS Plugin 을 만드는 방법에 대해서 설명해주고 있다. 마지막에 Learning CoreDNS 책을 소개해주는데 github 에도 있어서 읽어봐야겠다.
