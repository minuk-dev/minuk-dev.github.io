---
layout  : wiki
title   : learning-coredns
date    : 2022-09-28 11:30:48 +0900
lastmod : 2022-10-26 23:20:28 +0900
tags    : [coredns]
draft   : false
parent  : Book reviews
---

## 공부 이유
- 네트워크 부분에서 모호하게 된 영역이여서
- [google summer code 에 작년 관련 프로젝트가](https://summerofcode.withgoogle.com/programs/2022/projects/R8SxC38F)에 있어서 관심이 가서
- 어짜피 공부해야할 내용인데 책으로 있으면 안할 이유가 없어서
- kubecon 에서 간략하게 소개해줬는데 흥미가 가서, [[coredns-into-and-deep-dive]]

## 공부 방법
- 일단 기본적으로는 책에 있는 내용을 정리하면서 읽기
- 추가적으로 궁금한거 (구현부, 기여할만한지) 등도 추가로 정리하면서 읽기

## 1장 소개
- 제약사항:
  - 완전 재귀를 지원하지 않는다.
  - 동적 업데이트를 지원하지 않는다.
  - DNSSEC (Domain Name SYstem Security 확장)을 제한적으로 지원한다.

## 2장 DNS 소개
- DNS 란?:
  - Resolver : DNS Client
  - Name server : DNS server

- 도메인명과 네임스페이스:
  - 루트 노드는 길이가 0의 null 라벨이라는 특별한 라벨이 존재

- 도메인, 위임, 영역:
  - 위임 : 서브도메인을 만들어 관리를 넘기는 것

- 리소스 레코드:
  - 레코드 타입:
    - A : IPv4 주소
    - AAAA : IPv6 주소
    - CNAME : 도메인명을 다른 도메인명 (Canonical name)으로 매핑
    - MX : Mail Exchange
    - NS : 네임서버
    - PTR : IP 주소를 도메인명에 다시 매핑 (포인터)
    - SOA : Start Of Authority : 영역에 대한 매개 변수 제공
  - RDATA : 레코드별 데이터

- DNS 서버 및 권한:
  - 영역 전송 : 다른 DNS 서버의 영역 정보를 로드하는 것, 이때 영역 전송을 하는 것을 주 DNS 서버, 영역 전송을 받은 것을 보조 DNS 서버라고 부른다.

- 해석기:
  - 도메인명에 대한 정보를 요청하고 DNS 질의로 변환하고 DNS 서버로 전송한다.
  - `getaddrinfo()`, `gethostbyname()` 과 같은 함수를 통해서 사용된다.

- 해석과 재귀
- 캐시:
  - 루트 DNS 서버는 13개 뿐이다.:
    - UDP 패킷의 실질적인 크기 제한으로 인해 13개로 제한하도록 결정되었다.

## 3장 CoreDNS 구성
### CoreDNS 커맨드라인 옵션
- `-conf` : CoreDNS의 설정 파일의 경로를 지정한다. 기본값은 CoreDNS의 작업 디렉터리에 있는 Corefile이다.
- `-cpu` : CoreDNS가 사용할 수 있는 최대 CPU 백분율을 지정한다. 기본값은 100%이다.
- `-dns.port` : CoreDNS가 Listen 하는 포트를 지정한다. 기본값 : 53
- `-help`
- `-pidfile` : pid를 저장할 파일 경로 지정
- `-plugins`
- `-quiet`
- `-version`

### Corefile 구문

```
# comment
<label>, <label2> {
  <statement...>
  {$env_var}
}

<snippet_name> {
  <label_name> {
    ...
  }
}

import <snippet_name>
import <config_filename>

# Server Block
foo.example {
}

# Root Server Block
. {
}

# Specific Port
foo.example:1053 {
}

# Protocol prefix
tsl://foo.example {
}

grpc://bar.example {
}
```

### 플러그인
- root : CoreDNS에 대한 작업 디렉터리를 설정한다.
  ```
  . {
    root /etc/coredns/zones
  }
  ```

- file : DNS를 영역의 주 DNS 서버로 설정하고 파일에서 영역 데이터를 로드한다.
  ```
  file DBFILE [ZONES...] {
    transfer to ADDRESS...
    reload DURATION
  }
  ```

  ```
  foo.example {
    file db.foo.example {
      transfer to 10.0.0.1
    }
  }
  ```

- secondary : CoreDNS를 영역의 보조 DNS 서버로 구성하고 마스터 DNS 서버에서 영역 데이터를 로드한다.
  ```
  secondary [ZONES...] {
    transfer from ADDRESS
    transfer to ADDRESS
  }
  ```

- forward : 하나 이상의 전달기에게 질의를 전달한 CoreDNS를 구성한다.
  ```
  forward FROM TO...
  ```

  ```
  foo.example {
    forward foo.example 10.0.0.1
  }
  ```

  ```
  forward FROM TO... {
    except IGNORED_NAMES...
    force_tcp
    prefer_udp
    expire DURATION
    max_fails INTEGER
    health_check DURATION
    policy random|round_robin|sequential
    tls CERT KEY CA
    tls_servername NAME
  }
  ```

- cache : 질의에 대한 응답을 캐시하도록 구성한다.
  ```
  cache [TTL] [ZONES...] {
    success CAPACITY [TTL] [MINTTL]
    denial CAPACITY [TTL] [MINTTL]
    prefetch AMOUNT [DURATION] [PERCENTAGE%]
  }
  ```

  ```
  foo.example {
    forward . 10.0.0.1
    cache 600
  }
  ```

- errors : 에러를 기록하도록 구성한다.
  ```
  errors {
    consolidate DURATION REGEXP
  }
  ```

  ```
  foo.example {
    file db.foo.example
    errors
  }
  ```

- log : 받은 각 질의를 로깅하도록 한다. BIND와 유사한 방식
  ```
  log [NAMES...] [FORMAT]
  ```

  - [format list](https://coredns.io/plugins/log/)

### DNS 서버 구성 예시
#### 캐싱 전용 DNS 서버
```
. {
  forward . 8.8.8.8 8.8.4.4
  cache
  errors
  log
}
```

#### 주 DNS 서버
```
foo.example {
  root /etc/coredns/zones
  file db.foo.example
  errors
  log
}

. {
  forward 8.8.8.8 8.8.4.4
  cache
  errors
  log
}
```

#### 보조 DNS 서버
```
(logerrors) {
  errors
  log
}

bar.exmple {
  transfer from 10.0.0.1
  import logerrors
}

foo.example {
  file db.foo.example
  root /etc/coredns/zones
  import logerrors
}

. {
  forward 8.8.8.8 8.8.4.4
  cache
  impor logerrors
}
```

## 4장 영역 데이터 관리

- 여기서부터는 책만 보기에는 뭔가 기억에 안남을거 같아서, 실습으로 한다.
- 사용하는 명령어는 coredns, dig, host, nslookup 을 사용해서 하고 있다.
- 추가로, kubernetes 에서는 coredns 를 어떻게 설정하고 있나 궁금해서 찾아봤다:
  - [kubeadm에서 addon 으로 붙어있는 coredns manifest](https://github.com/kubernetes/kubernetes/blob/50097acf156f8942d01301619603c61765dbf646/cmd/kubeadm/app/phases/addons/dns/manifests.go)

### file 플러그인
- reload 는 기본으로 1분이며 0이면 비활성화, 30s 와 같은 형태로 쓸수 있다.

#### 실습
```
# Corefile
foo.example {
  file db.foo.example
}
```

```
# db.foo.example
@ 3600 IN SOA ns1.foo.example. root.foo.example. (
  2019041900
  3600
  600
  604800
  600 )
  3600 IN NS ns1.foo.example.
  3600 IN NS ns2.foo.example.

ns1 IN A 10.0.0.53
    IN AAAA 2001:db8:42:1::53
ns2 IN A 10.0.1.53
    IN AAAA 2001:db8:42:2::53
www IN A 10.0.0.1
    IN AAAA 2001:db8:42:1:1
```

```bash
coredns # 위 파일들이 있는 디렉토리에서
```

```bash
dig @localhost ns1.foo.example

# 출력
# ; <<>> DiG 9.10.6 <<>> @localhost ns1.foo.example
# ; (2 servers found)
# ;; global options: +cmd
# ;; Got answer:
# ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 36641
# ;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 2, ADDITIONAL: 1
# ;; WARNING: recursion requested but not available
#
# ;; OPT PSEUDOSECTION:
# ; EDNS: version: 0, flags:; udp: 4096
# ;; QUESTION SECTION:
# ;ns1.foo.example.               IN      A
#
# ;; ANSWER SECTION:
# ns1.foo.example.        3600    IN      A       10.0.0.53
#
# ;; AUTHORITY SECTION:
# foo.example.            3600    IN      NS      ns1.foo.example.
# foo.example.            3600    IN      NS      ns2.foo.example.
#
# ;; Query time: 0 msec
# ;; SERVER: ::1#53(::1)
# ;; WHEN: Thu Sep 29 18:21:14 KST 2022
# ;; MSG SIZE  rcvd: 155
```

### auto 플러그인

```
auto [ZONES...] {
  directory DIR [REGEX ORIGIN_TEMPLATE]
  transfer to ADDRESS...
  reload DURATION
}
```

### Git 과 auto 플러그인 사용
- git-sync 와 auto 플러그인을 결합해서 git repo 에 있는 dns 내용을 끌어다가 동기화 시킬수 있다.

### hosts 플러그인
- host 문법

  ```
  <IP address> <canonical name> [aliases...]
  ```

```
hosts [FILE [ZONES...]] {
  [INLINE]
  ttl SECONDS
  no_reverse
  reload DURATIOn
  fallthrough [ZONES...]
}
```

- hosts 플러그인은 A, AAAA, A PTR 레코드를 만든다.

### AWS Route53 플러그인

```
route53 [ZONE:HOSTED_ZONE_ID...] {
  [aws_access_key AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY]
  upstream
  credentials PROFILE [FILENAME]
  fallthrough [ZONES...]
}
```


## 5장 서비스 검색
- [RFC 6763](https://www.rfc-editor.org/rfc/rfc6763.html) : DNS-Based Service Discovery 에 관한 RFC 문서:
  - CoreDNS 는 DNS-SD 에 대한 전문적인 지원은 제공하지 않는다.

### 서비스 검색 문제 해결
- 초기에는 hosts 파일을 수정하였으나, 최근에는 DNS 서버를 제공하고 resolver 를 통해서 해결한다.:
  - 장점 : SRV 레코드를 통해서 같은 ip 주소에 여러 서비스를 호스팅할 수 있어진다.

### CoreDNS 및 etcd로 서비스 검색
#### etcd 플러그인
- SkyDNS 메시지 형식

```json
{
  "host": "192.0.2.10",
  "port": 20020,
  "priority": 10,
  "weight": 20
}
```

- 책에서는 이렇게 나와있는데 솔직히 잘 이해가 안된다. 왜 port 가 있지?
  - [github etcd plugin source](https://github.com/coredns/coredns/tree/master/plugin/etcd)
  - [SRV record 설명](https://www.joinc.co.kr/w/man/12/srv) 을 읽어보니까 좀 이해가 된다. srv record 로 질의를 하면 port를 알 수 있다는걸 알게 되었다.

- 실습은 적당히 따라해보긴 했는데, 나중에 서비스 만들때 찾아보면 되는 정도인듯 하다. 외우기에는 너무 많고 한번 해본다고 경험치가 확 올라가진 않는 느낌


## 6장 쿠버네티스

- 책 내용을 좀 읽어봤는데 이건 그냥 coredns 의 kubernetes plugin 을 별도로 읽고 공부해야지 좀 이해할것 같다.

### Plugin 구조 분석
- caddy 를 coredns 를 실행시켜주고 plugin 으로 setup 에서 `plugin.Register(pluginName, setup)` 을 실행시켜서 등록한다. [관련코드](https://github.com/coredns/coredns/blob/0a8ef296ab7b0d6be9bf3deaa8bf4be69e40c300/plugin/kubernetes/setup.go#L33)
- 기본적으로 parsing 작업해주고, `k.InitKubeCache()` 를 호출하면서 `newdnsController()` 를 실행시켜주면서 kubernetes 내부 자원들을 확인하면서 동작한다. [관련코드](https://github.com/coredns/coredns/blob/0a8ef296ab7b0d6be9bf3deaa8bf4be69e40c300/plugin/kubernetes/kubernetes.go#L255)
- newdnsController 는 pod, endpoint, svc, ns 를 기본적으로 확인한다. [관련코드](https://github.com/coredns/coredns/blob/0a8ef296ab7b0d6be9bf3deaa8bf4be69e40c300/plugin/kubernetes/controller.go#L110)

- 궁금증이 많이 해결되는 코드 분석이였는데, 기존에 가지고 있던 궁금증은:
  - kubernetes 의 자원이 변경되는 것을 어떻게 coredns 는 관측하는가
  - 어떤 기준으로 자원들이 관측되는가, crd 도 관측시킬수 있는가
  - plugin 은 어떻게 동작하는가
- 이에 대한 답은:
  - controller 를 붙여서 informer 로부터 정보를 받는다.
  - coredns 에 코드적으로 들어가 있기 때문에, 만약 crd로 연결하고 싶으면 svc 로 하던가, coredns 를 커스텀 해야한다.
  - 기본적으로 coredns 는 caddy 를 사용하고, setup 함수를 인자로 넘기면서 실행을 위임한다.

#### 클러스터 DNS 디플로이먼트 리소스
- 역할 기반 액세스 제어:
  - CoreDNS 는 클러스터 전체의 모든 서비스를 API 에서 데이터를 읽을수 있도록 하기 위해 더 많은 접근 권한의 서비스 어카운트가 필요하다.
- 기본적으로 coredns 는 2개의 replica 가 뜨게 된다.:
  - 이를 극복하기 위해서 dns-autoscaler 를 배포한다.
  - [관련 k8s 문서](https://kubernetes.io/docs/tasks/administer-cluster/dns-horizontal-autoscaling/)

#### CoreDNS 확장
- pods disabled, pods insecure, pods verified
- 와일드카드 질의
