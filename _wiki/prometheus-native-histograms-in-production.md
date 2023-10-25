---
layout  : wiki
title   : prometheus-native-histograms-in-proudction
date    : 2023-09-04 01:05:34 +0900
lastmod : 2023-09-04 01:32:44 +0900
tags    : [kubecon, prometheus, observability]
draft   : false
parent  : kubecon
resource: 8a6fe6b8-a1d8-47b2-b521-ccd848d0f06c
---

## Links
- https://www.youtube.com/watch?v=TgINvIK9SYc&list=PLj6h78yzYM2ORxwcjTn4RLAOQOYjvQ2A3&index=6

## Disclaimer
- Native Histograms are an experimental feature!
- Everything described here can stil lchange!
- Things might break or behave weirdly!

```bash
prometheus --enable-feature=native-histograms
```

## Wishlist
- Everything that works well now should continue to work well.
- I never want to configure buckets again.
- All histograms should always be aggregatable with each other, across time and space.
- I want accurate quantile and percentage estimations across the whole range of observations.
- I want all of that at a lower cost thant current histograms so that I can finally partition histograms at will.

## 1. Resource consumption of the instrumented binary
## 2. Frequency of resets and resolution reduction
- Scraping 15 instances of the cloud-backend-gateway.
- Drop everything but the `cortex_request_duration_seconds` histograms.

- Scraping classic histograms:
  - 964 histograms (peak)
  - 16388 series (964 * 17)
  - 14460 buckets (964 * 15)

- Scraping native histograms:
  - 964 histograms (peak)
  - 964 series

### Frequency of resets to reduce bucket count
- Top 10 rest histograms are all:
  - `{route=~"api_prom_api_v1_query(_range)", status_code="200"}`
- Even among thos typically just a handful of rests per day.
- Worst offender during the 15d of the experiment: 8 resets per day. (Please check the original video)
- Rarely touching the configured 1h limit.

### Frequency of resolution reduction
- Only ever happended one stap (from growth factor 1.0905... to 1.1892...).
- Happens "occasionally"...

## 3. Prometheus resource consumption
## 4. Query Performance
