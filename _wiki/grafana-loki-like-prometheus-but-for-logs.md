---
layout  : wiki
title   : Grafana Loki - Like Prometheus, But for logs.
date    : 2022-12-20 20:02:46 +0900
updated : 2022-12-20 20:02:46 +0900
tags    : [grafana, loki, kubecon]
draft   : false
parent  : kubecon
resource: A4E05DAF-BF29-4153-A521-54E990EEF6A9
---

- [원본 링크](https://youtu.be/CQiawXlgabQ)

## 0. Simple and cost effective to operate
- Loki doesn't index the text of the logs, instead grouping entries into "streams" and indexing those with labels.

## 1. Integrated with existing observability tools

- As a DevOps Engineer, how to work:
  - 1. Alert
  - 2. Dashboard
  - 3. Adhoc Query
  - 4. Log Aggregation
  - 5. Distributed Tracing
  - 6. Fix

- Basically, fluentd makes app push their log into fluentd:
  - It causes various problems.
  - But, promtail pulls their log.

## 2. Cloud Native and Airplane mode

## What's new?
- LogQL Filter Chaining : `{job="app"} |= "/foo" !~ "/foo/bar"`
- Extracting Labels from Logs
- Live Tailing, Context

- LogQL Aggregations:
  - `rate(({job="app} |= "/foo" !~ "/foo/bar")[1m])}))`
  - `extract_label({job="default/nginx"}, "code=(\d+)" |> {code ~= "5.."}`
  - `sum(extract_value({job="app"}, "code(\d+)", "$1"))`

## 개인 생각
- 기본적으로 왜 기존 방식이 아닌 loki를 사용해야하는지에 대해서 얻어가는게 좀 있었던거 같다.:
  - push, pull 방식
  - demo 에서 metric 을 보다가 log를 보는 자연스러운 흐름
- demo가 완전 깔끔한건 아니였지만, 무엇을 말하고 싶은지는 잘 전달되었다. 왜 처음에 DevOps Engineer 가 어떤 방식으로 일하는지에 대해서 말했는지 이해가 되었다.
- 이게 2019 년도 자료인데 3년 (정확힌 2년반)이 지난 지금은 얼마나 발전했을지 생각이 든다.
- PromQL, LogQL 등등 점점 Query Language 가 늘어가는게 약간은 부담이 된다. 비슷비슷하게 생기긴 했는데, 뭔가 근본적으로 이해를 하면서 사용하는 느낌이 아니다. SQL을 처음 배웠을 때는 기본적으로 관계대수에 의거해서 뭔가 배우는 느낌이였는데 이건 약간 이론이 부족한 느낌이다. 실제로 어떻게 구조화 하는게 잘 하는 것인지, 이런것에 대해 이론적인 Best Practice 를 추가적으로 공부해야겠다.
- hackernews 를 demo 로 보여줬는데, 괜찮은 application 인것 같다. 생각해보니 싱글 레포이기도 하고, 잘 알려진 어플리케이션이기도 해서, loki 나 prometheus 를 공부할 떄 이걸 사용해서 실험하는 걸 공부해봐야겠다.
- 아직까지 log가 어떤 방식으로 수집되는 것인지에 대한 근본적인 이해가 약간 부족한것 같다. (stdout 기반인 것 같긴 한데, syslog 등 어떻게 custom 하는지에 대해서 찾아봐야겠다.):
  - 이건 좀 보니 loki 를 yaml으로 설정해서 하는 것 같다. 어떤 파일을 바라볼것인지:
    - Promtail 은 그러면 sidecar 형식으로 뜨게 되어야하나?
    - 좀 보니까 이건 volume mount 한걸 바라보도록 되어있는거 같다. 흐음.. 특정 디렉토리를 deployment 들이 일정한 규칙을 기반해서 mount 하고 해당 directory 를 promtail 로 관찰시키도록 해야하는건가?
    - 간단한 실습은 많이 있는데, 이걸 deployment 들이랑 어떻게 조합해서 log 를 수집할 것인지에 대한 큰 그림을 그리는게 잘 안보인다.
    - 좀 괜찮은 곳을 찾았다. [DEVOCEAN - Grafana Loki에 대해 알아보자](https://devocean.sk.com/blog/techBoardDetail.do?ID=163964)
    - 여기서 k8s 위에 node 별로 뜨는 것도 괜찮은 것 같다.
    - 어떻게 log directory 를 관리할 것인지에 대한 건 정책적인 부분인것 같은데 잘 쓰고 있는 회사들은 어떻게 구성했을까?:
      - 추정은 application 을 사내 어떤 시스템을 통해서 등록받고, 이게 node 마다 directory 를 만들어주고, 이를 [subPath 기능](https://devocean.sk.com/blog/techBoardDetail.do?ID=163964) 을 활용하는 방식으로 구성할것 같긴 한데 label 은 어떻게 흘러갈지 잘 모르겠다. 이건 실제로 만들어봐야지 디테일한 부분들을 어떻게 구성하는지 알 수 있을듯?
