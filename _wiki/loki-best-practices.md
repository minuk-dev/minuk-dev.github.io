---
layout  : wiki
title   : loki label best practices
summary : loki label best practices 문서를 번역해둔 문서
date    : 2022-12-22 13:03:25 +0900
updated : 2022-12-22 13:03:25 +0900
tags    : [loki]
draft   : false
parent  : loki
resource: FF4ED150-E5B0-4337-80EB-9A842C823F13
---

- [원본 링크](https://grafana.com/docs/loki/latest/best-practices/)

## Grafana Loki label best practices (loki 에서 label 을 붙이는 모범 사례)

- Grafana loki 는 활발한 개발 중에 있고 꾸준하게 성능 향상을 위해서 개발진들은 노력하고 있습니다. 하지만 label을 붙이는 현재 권고사항 몇개를 loki에서 최고의 경험을 받기 위해 제시합니다.

### Static labels are good (static labels 이 좋습니다.)
- host, application, environment 같은 것들은 좋은 labels 입니다.
- 주어진 system/app 에 고정되며, 제한된(bounded) 값을 가집니다.
- Static labels 을 논리적인 감각아래서 로그에 query 하기 쉽게 하기 위해서 사용하세요.
- 예를 들어, 주어진 어플리케이션과 특정 환경에서 모든 로그를 보거나 특정한 호스트 위에 있는 모든 어플리케이션들에 대한 로그를 볼수 있습니다.

### Use dynamic labels sparingly (동적 labels 은 조금만 쓰세요)
- 너무 많은 label 값들의 조합은 너무나 많은 stream을 만들게 됩니다.
- 이렇게 되면, Loki가 큰 index와 작은 chunks 를 저장소에 가지게 되는 단점을 가지고 결국에는 성능이 감소할 수 있습니다.

- 이런 이슈를 피하기 위해, 진짜로 필요하다고 생각하기 전까지 label 을 추가하지 마세요.
- Filter Expressions (`|= "text`, `"|~ "regex"`, ...) 를 사용하고 이런 로그를 brute force 로 탐색하세요. 이런 방식은 작동하고 빠릅니다.

- 예전에는, `level` 을 위해 Promtail 파이프라인을 동적으로 label 설정하고 있었습니다. 이는 종종 `level="error"` 와 같은 로그만 보길 원할때 직관적으로 보여졌었습니다.
- 하지만, 우리는 지금 이런 쿼리를 재평가 하고 있습니다.
- `{app="loki"} |= "level=error"` 가 `{app="loki", level="error"}` 보다 우리의 많은 어플리케이션에서 빠르다는 것을 증명 중에 있습니다.

- 이건 놀랍게 보이지만, 어플리케이션이 중간쯤부터 작은 볼륨을 가지고 있다면 ~~(아 이걸 어케 번역해야할지 모르겠네, 그냥 작은것부터 중간 쯤 사이즈의 볼륨을 가지고 있는 어플리케이션의 경우라고 보는게 맞나)~~, label 은 하나의 어플리케이션의 로그를 5개의 streams 으로 분리하게 만들고, 이는 5배의 chunks 가 저장되게 만든다는 뜻입니다.
- 그리고 chunks를 로딩하는 것은 이와 관련해서 오버헤드를 가집니다. query 가 `{app="loki", level!="debug"}` 라고 생각할 때를 가정해보겠습니다. 이는 `{app="loki"} != "level=debug"` 보다 더 많은 chunks 를 로딩해야한다는 것을 알 수 있습니다.

- 위에서 _진짜로 필요하다고 생각하기 전까지 label을 추가하지 마세요._ 라고 언급했는데, 그럼 언제 진짜로 labels 이 필요한 상황일까요??
- 아래에 `chunk_target_size` 섹션이 있습니다. 만약 `chunk_target_size` 를 1MB로 (적당한 값입니다) 잡았다면, 1MB의 압축된 크기로 chunks를 자르려고 할꺼고, 압축되지 않은 log라면 대략 5MB 정도일것입니다. (압축을 어떻게 하느냐에 따라서 10MB 정도일수도 있습니다.) 만약 이런 로그가 `max_chunk_age` 보다 적은 시간 안에 5MB 를 쓸만큼 충분하다면, 또는 이런 timeframe 에 많은 chunk 가 있다면, dynamic label 을 따라 별도의 stream을 분리하는 것을 고려하길 원할 수도 있습니다.

- log file 을 streams로 분리하는 것은 피해야하는 것입니다, stream 이 idle 하거나 가득 차기 전에 max age에 도달하게 된다면 chunks 가 flushed 되는 결과를 이끌게 됩니다.
- Loki 1.4.0 부터, 왜 chunks 가 flushed 되는지 `sum by (reason) (rate(loki_ingester_chunks_flushed_total{cluster="dev"}[1m]))` 라는 metric 으로 부터 알 수 있습니다.

- 모든 chunks 가 flushed 될때 가득 찼는지는 중요하지는 않지만 연산의 많은 부분을 향상시켜줍니다.
- 이와 같이, 우리의 이 가이드는 dynamic labels 을 가급적 피하고 대신 filter expressions 을 선호하라는 것입니다.
- 예를 들어, `level` dynamic label 을 추가하지 말고, `|= "level=debug"` 를 대신 쓰는 것처럼요.

### Label values must always be bounded (label은 언제나 제한(bounded)되어야만 합니다.)
- 만약 동적으로 labels 을 설정한다면 제한되지 않거나 무한한 값을 지닌 label 을 사용하지 마세요. 이는 언제나 Loki 에 큰 문제를 가져오게 됩니다.
- (개인 해석) : label 이 임의의 문자열을 가지도록 하지말고 enum 이여야 한다는 뜻으로 해석된다. stream 의 관점인듯

- 가능한한 값의 후보를 작게 제한하도록 노력하세요. Loki 를 다루는 것에 대한 완벽한 방법을 가지고 있지는 않지만, 단일 숫자나 10의 자리 정도 되는 dynamic label 을 가지고 있다고 상상해봅시다.
- 이(label 이 bounded 값을 가져야한다는)는 static labels 에서는 덜 중요하긴 합니다.
- 예를 들어, 여러분들의 환경에서 1000 개의 호스트를 가지고 있고, host label 이 1000 개 있는 것은 괜찮습니다.

- (개인 해석) : 이게 참 말을 어렵게 써놨는데, dynamic label 은 stream 으로 쪼개지게 되어 있어서 많아야 10자리 숫자를 넘지 말라는 뜻이고, static label 은 hosts 개수가 많다면 그정도는 있어도 된다는 뜻이다.
- (개인 의문) : static 이랑 dynamic 이랑 labels 이 어떻게 처리되는지 내부 구조를 알고 싶은데, 찾아봐도 잘 안나온다. 아마도 내가 검색어를 모르는 수준인 것 같은데 일단은 넘어가자

### Be aware of dynamic labels applied by clients (dynamic labels 은 licent 에서 적용된 다는 사실을 기억하자)

- Loki 는 다양한 client 옵션이 있다.:
  - Promtail : systemd journal 수집과 TCP 기반 syslog 수집을 지원한다.
  - Fluentd, Fluent Bit, Docker Plugin 등등
- 이들 각각은 log stream 을 만들기 위해 label을 무슨 labels 을 적용할지 설정하는 그들만의 방법을 가지고 있습니다.
- 하지만 dynamic labels 이 어떻게 적용될 것인지를 알고 있어야합니다.
- Loki Series API 를 사용해서 log stream 의 형태를 파악하고 stream 과 cardinality 를 줄일수 있는지를 알아낼 수 있습니다.
- Series 정보는 Series API를 이용해서 조회할수 있고, logcli 를 사용해서도 할수 있습니다.

- Loki 1.6.0 이상의 logcli series 명령어는 `--analyze-labels` 플레그가 추가 되었으며 높은 cardinality labels 을 디버깅하기 위해 특정적으로(specifically) 사용됩니다.

```
Total Streams:  25017
Unique Labels:  8

Label Name  Unique Values  Found In Streams
requestId   24653          24979
logStream   1194           25016
logGroup    140            25016
accountId   13             25016
logger      1              25017
source      1              25016
transport   1              25017
format      1              25017
```

- 이 예시에서 `requestId` 가 24979 stream에서 24653 개의 서로 다른 값을 가짐을 발견할수 있습니다. 이건 안좋습니다.
- 이 사례가 정확하게 label 이 되면 안되는 사례인데, `requestId` 는 label 에서 제거되고 대신 filter expression 을 특정한 `requestId` 를 조회할 때 사용해야합니다.
- 예를 들어, `requestId` 를 key=value 페어 형태로 특정 로그 라인에서 찾아냈다면, `{logGroup="group1"} |= "requestId=32422355"` 형태로 쓸수 있습니다.

### Configure caching

- Loki 는 많은 단계로 data 를 캐시하며, 성능을 확연하게(drastcially) 향상시킵니다. 이는 향후 글에서 상세하게 다룰 예정입니다.

### Time ordering of logs

- Loki 는 잘못된(out-of-order) 쓰기를 기본적으로 허용합니다. 이 색션은 Loki가 잘못된 쓰기 허용을 껏을 때의 모범사례(best practice) 를 다룹니다.

- Loki를 사용하는 많은 사람들이 겪는 문제 중 하나는 그들의 client 가 잘못된 log entries 를 위해 error 를 수신하는 것입니다. 이 문제는 엄격하고 빠른 Loki 내의 규칙 때문에 발생합니다.:
  - 어느 단일 log stream 에서, logs 는 항상 증가하는 시간 순으로 보내지고 있습니다.
  - 만약 log 가 stream 내의 가장 최신에 수신한 로그보다 더 오래된 timestamp 를 수신한다면, 이 로그는 버려집니다.
- 이 구문을 잘게 쪼개서 봅시다. 첫번째는 stream당 제약입니다. 예시를 봅시다.

```
{job="syslog"} 00:00:00 i'm a syslog!
{job="syslog"} 00:00:01 i'm a syslog!
```

- 만약 Loki 가 동일한 stream 에서 이 두 로그를 수신했다면, 모든게 괜찮습니다. 하지만 아래 경우를 봅시다.

```
{job="syslog"} 00:00:00 i'm a syslog!
{job="syslog"} 00:00:02 i'm a syslog!
{job="syslog"} 00:00:01 i'm a syslog!  <- Rejected out of order!
```

- 우리는 이 상황에서 뭘 할수 있을까요? 이게 로그들이 다른 시스템에 있는 sources 로부터 왔을까요?
- 우리는 이를 시스템 마다 고유한 추가적인 label 을 가지게 함으로써 해결할 수 있습니다.

```
{job="syslog", instance="host1"} 00:00:00 i'm a syslog!
{job="syslog", instance="host1"} 00:00:02 i'm a syslog!
{job="syslog", instance="host2"} 00:00:01 i'm a syslog!  <- Accepted, this is a new stream!
{job="syslog", instance="host1"} 00:00:03 i'm a syslog!  <- Accepted, still in order for stream 1
{job="syslog", instance="host2"} 00:00:02 i'm a syslog!  <- Accepted, still in order for stream 2
```

- 하지만 만약 application 이 자체적으로 잘못된 순서로 로그를 만든다면요? 이게 문제가 될까봐 두렵습니다. (I'm afraid this is a problem.)
- Promtail pipeline stage 같은 무언가로 뽑아낸 log line 으로부터 timestamp 를 추출하고 있다면, 이 작업을 하는 대신 Promtail 에서 loglines 에다 timestamp 를 할당하도록 할수 있습니다.:
  - 개인 생각 : application 에서 timestamp 찍지 말고, promtail 에서 찍어서 application 이 timestamp 를 잘못 찍으면 어떻게하지 라는 생각을 제거하라는 소리이다. 이미 promtail 과 같은 툴에서는 timestamp 에 대해서 충분히 고민했을 테니
  - 개인 생각 : 이런 상황이 생각보다 많이 나올 수 있는데 request 를 받아놓고 async 하게 처리하도록 코드는 짜놓고 디버깅한다고 request 가 들어온 시간을 찍는거다. 당연히 logger 가 timestamp 를 자동으로 찍어주는데 굳이굳이 들어온 시간을 보고 싶다고 그걸로 찍도록 설정하는 거다. 이해가 안갈수도 있지만 그럴수 있다. 이외에도 logger 를 singleton 으로 안쓰고 여러개 만들어서 쓰다가 동시성 문제가 일어나면 발생할수 있다. 대부분의 프레임워크에서는 이미 고려된 상황이지만 직접 짠다면 발생할수도 있다.
- 아니면 어플리케이션 안에서 희망적으로 고칠수도 있습니다.

- Loki push API 의 batch 특성으로 일부 인스턴스에서 false positive 라고 생각되는 에러를 발생 시킬수도 있다는 점에서 볼만한 가치가 있습니다.
- (아마도 배치가 부분적으로 성공하고 존재한다면; 또는 이전에 성공했던 어떤 것이든 잘못된 entry 를 반환한다면; 혹은 새로운 무언가가 받아들여진다면)

### Use `chunk_target_size` (`chunk_target_size` 를 사용하세요)
- `chunk_target_size` 를 사용하는 것은 Loki 가 1.5MB 로 압축하기 위해 모든 chunks 를 채우도록 노력하도록 합니다.
- 더 큰 chunks 일수록 Loki 가 처리하기에 더 효율적입니다.

- 다른 설정 변수들도 chunk 가 채워지기에 영향을 미칩니다.
- Loki 는 기본적으로 `max_chunk_age` 는 1시간, `chunk_idle_period` 는 30분으로 하여 사용하는 메모리 총량을 제한하며 또한 만약 process 가 문제가 생겼다면(crashed) log 유실 정도를 최소화 합니다.

- 사용하는 압축에 따라(우린 압축률은 낮지만 더 좋은 성능의 snappy 를 사용하고 있습니다.), 5-10 배 또는 7.5-10MB 의 raw log를 채우는데 1.5MB chunk 가 필요합니다.
- chunk 가 stream 마다 존재한다는 사실을 기억하면, 로그 파일을 더 많은 stream으로 분할할 수록 더 많은 chunk가 메모리에 저장되고 제한 시간 중 하나가 채워지기 전에 flush 될 가능성이 높아집니다.

- 작고, 다 채워지지 않은 chunks 들이 많으면 Loki 에 부정적인 영향을 미칩니다. 우리는 항상 이를 개선하려고 일하고 있고 특정 상황에서 compactor 가 이를 개선하도록 고민합니다.
- 하지만 일반적으로 똑같이 가이드는 제시됩니다.: chunk 를 채우도록 최선을 다하세요.

- 만약, 어플리케이션이 이런 chunks 를 빠르게 채울만큼 빠르게 로깅한다면 (`max_chunk_age` 보다 적은 시간 내에), dynamic label 을 사용해서 분리된 stream 으로 쪼개는 것이 더 합리적입니다.

### Use `-print-config-stderr` or `-log-config-reverse-order` (`-print-config-stderr` 이나 `-log-config-reverse-order` 를 사용하세요)
- Loki 와 Promtail 은 시작할 때 stderr 이나 log file 에 모든 설정을 dump 하는 flags가 있습니다.
- `-print-config-stderr` 은 Loki 가 command line 으로부터 호출되었을때 잘 동작하며, 모든 Loki configuration 을 빠르게 출력으로 받아볼수 있습니다.
- `-log-config-reverse-order` 는 모든 환경에서 Loki 를 동작시킬 때 사용가능한 flags 입니다.
- configuration entries 들은 역순으로 되어 있으며, 이는 Grafana Explore 로 봤을 때 위에서부터 아래로 읽어도 올바른 순서로 configuration 을 볼 수 있게 되어 있습니다.


## 개인 생각
- 대부분 label 을 어떻게 설정할 것인가에 대한 이야기이다. 아무래도 label 기반으로 동작하기에 어떻게 설계하는 지에 따라 성능이 민감하게 반응해서 별도의 best practice 문서로 분리된것 같다.
- k8s 에서 promtail 과 fluentd 를 사용했을 때 어떤 식으로 설계하는 게 best practice 인지를 확인하기 위해서 문서를 읽기 시작했는데 약간 아쉬운 부분이 있다.
- log 수집기가 선택지가 많은 상황인데 이를 잘 정돈한 사례를 찾아봐야겠다.
- 일단 label과 chunk 에 대해서 많은 부분을 이해할수 있어서 괜찮았던 것 같다.:
  - dynamic label 은 client 사이드에서 처리된다.
  - chunk 는 최소한으로 내리는게 좋다. (유실 가능성이 높아지긴 하지만, 성능을 생각한다면)
