---
layout: wiki
title: IT 엔지니어를 위한 네트워크 입문
date: 2025-02-20 21:38:16 +0900
lastmod: 2025-04-14 01:52:21 +0900
tags: 
draft: true
parent: 
---
## 1장 네트워크 시작하기
### 1.1 네트워크 구성도 살펴보기
- 3계층 디자인
- 2계층 디자인

---
	- Spine-Leaf 아키텍쳐 
- [https://alluknow.tistory.com/40](https://alluknow.tistory.com/40 "https://alluknow.tistory.com/40")
- https://blog.naver.com/jkjk010jkjk/222239390955

### 1.2 프로토콜
- 물리적 측면: 데이터 전송 매체, 신호규약, 회선 규칙 등
- 논리적 측면: 장치들끼리 통신하기 위한 프로토콜 규격

- 비트기반: 효율성
- 텍스트기반: 확장성


---
- kubernetes 에서 mtu 관련 버그가 있어서 사이즈를 꽉채워서 보내면 버그가 있다.
	- https://github.com/kubernetes/kubernetes/issues/100212#issuecomment-800000542

- [https://www.fibermall.com/ko/blog/what-is-infiniband-network-and-difference-with-ethernet.htm](https://www.fibermall.com/ko/blog/what-is-infiniband-network-and-difference-with-ethernet.htm "https://www.fibermall.com/ko/blog/what-is-infiniband-network-and-difference-with-ethernet.htm")

### 1.3. OSI 7 계층과 TCP/IP
- 볼만한 글: https://www.fibermall.com/ko/blog/what-is-infiniband-network-and-difference-with-ethernet.htm

- [https://www.cisco.com/c/ko_kr/support/docs/routers/12000-series-routers/47321-ciscoef.html](https://www.cisco.com/c/ko_kr/support/docs/routers/12000-series-routers/47321-ciscoef.html "https://www.cisco.com/c/ko_kr/support/docs/routers/12000-series-routers/47321-ciscoef.html")
### 1.5. 인캡슐레이션과 디캡슐레이션
- 현재 계층에서 정의하는 정보
- 상위 프로토콜 지시자

- 이더넷에서 수용 가능한 최대 크기 1500
- MSS 1460

## 2장 네트워크 연결과 구성 요소
### 2.1. 네트워크 연결 구분
- LAN, MAN, WAN
	- 예전에는 LAN, MAN, WAN 마다 사용하는 기술이 달라 프로토콜이나 전송 기술에 따라 쉽게 구분할 수 있었다. 하지만 요즘은 이를 통한 구분은 무의미하고, 관리 범위 기준으로 구분한다.

### 2.2. 네트워크 회선
#### 2.2.1. 인터넷 회선
- 광랜: 기가 ~ 100Mbps
- FTTH(Fibber To The Home): 기가 ~ 100Mbps
- 동축 케이블 인터넷: 수백 ~ 수십 Mbps
- xDSL(ADSL, VDSL 등): 수십 ~ 수 Mbps

#### 2.2.2. 전용 회선
- 저속: 음성 전송 기술 기반
- 고속: 메트로 이더넷

#### 2.2.3. 인터넷 전용 회선

#### 2.2.4 VPN
##### 2.2.4.1. 통신사업자 VPN
##### 2.2.4.2. 가입자 VPN

- VPN 관련 글
	- https://tech.devsisters.com/posts/wireguard-vpn-1/
	- https://blog.naver.com/simula/223771392775?trackingCode=rss
	- ![[Pasted image 20250227002824.png]]

- 개인적으로는 VPN클라이언트들은 하나같이 좀 답답한 측면이 있는거 같지만... 회사에서는 어쩔수 없나 싶다.
- https://kimalarm.tistory.com/69 이거 봤는데, AWS 는 신이다. 이런것도 지원해주다니... 
#### 2.2.5. DWDM
- Dense Wavelength Division Multiplex 
- https://www.fibermall.com/ko/blog/cwdm-dwdm-mux-demux-technology.htm

### 2.3. 네트워크 구성요소
### 2.3.1. 네트워크 인터페이스 카드 (NIC)
- 직렬화
- MAC 주소
- 흐름 제어


### 2.3.2. 케이블과 커넥터
#### 2.3.2.1. 이더넷 네트워크 표준

#### 2.3.2.2 케이블 커넥터 구조
#### 2.3.2.3. 케이블 - 트위스티드 페어 케이블

#### 2.3.2.4. 케이블 - 동축 케이블

### 2.3.3. 허브
### 2.3.4. 스위치
### 2.3.5. 라우터

### 2.3.6. 로드밸런서
- DSR
- Proxy
- http://redisgate.kr/redis/network/load_balancing.php
- https://delightwook.tistory.com/39
- https://sysdocu.tistory.com/1369

### 2.3.7. 보안 장비(방화벽/IPS)
### 2.3.8 기타 (모뎀/공유기)


## 3장 네트워크
### 3.1. 유니캐스트, 멀티캐스트, 브로드캐스트, 애니캐스트
- 유니캐스트: 1:1 통신
- 브로드캐스트: 동일 네트워크에 존재하는 모든 호스트가 목적지
- 멀티캐스트: 하나의 출발지에서 다수의 특정 목적지로 데이터 전송
- 애니캐스트: 1:1 통신, 다수의 동일 그룹 중 가장 가까운 호스트에서 응답
- BUM 트래픽: BUM B(Broadcast), U(Unknown Unicast), M(Multicast)
	- BUM 트래픽이 중요한 이유는 네트워크 자원을 사용하고 성능에 영향을 미치기 때문이다.

### 3.2 MAC 주소
- OUI: IEEE 가 제조사에 할당하는 부분
- UAA: 각 제조사에서 네트워크 구성 요소에 할당하는 부분

### 3.3. IP 주소
#### 3.3.1 IP 주소 체계
- 네트워크 주소
- 호스트 주소

#### 3.3.2 클래스풀과 클래스리스
#### 3.3.3. 서브네팅

#### 3.3.4. 공인 IP와 사설 IP

### 3.4.TCP 와 UDP
#### 3.4.1. 4계층 프로토콜과 서비스 포트
- 각 계층에서 정의하는 정보
- 상위 프로토콜 지시자 정보

#### 3.4.2. TCP
- 패킷 순서, 응답 번호
- 윈도 사이즈와 슬라이딩 윈도우
- 3방향 핸드셰이크
- 4 way handshake https://hojunking.tistory.com/107

#### 3.4.3. UDP

### 3.5 ARP
#### 3.5.3 GARP
- IP 주소 충돌 감지
- 상대방의 ARP 테이블 갱신
- 클러스터링, FHRP(VRRP, HSRP)

#### 3.5.4. RARP

### 3.6. 서브넷과 게이트웨이
#### 3.6.1. 서브넷과 게이트웨이의 용도
#### 3.6.2. 2계층 통신 vs 3 계층 통신


## 4장 스위치: 2계층 장비
- 2계층 프레임
- 3계층 패킷
- 4계층 세그먼트

- 편의상 패킷이라 부름

### 4.1. 스위치 장비 동작

- 플러딩
- 어드레스 러닝
- 포워딩/필터링

### 4.2. VLAN
- VLAN 할당 방식: 포트기반 VLAN, MAC 주소 기반의 VLAN

#### 4.2.3. VLAN 모드(Trunk/Access) 동작 방식
### 4.3. STP
- 루프: 네트워크에 연결된 모양이 고리처럼 되돌아오는 형태로 구성된 상황
- 브로드캐스트 스톰
- 스위치 MAC 러닝 중복 문제

- STP: Spanning Tree Protocol
	- BPDU
- 스위치 포트의 상태 및 변경과정:
	- Blocking:
		- 패킷 데이터를 차단한 상태로 상대방이 보내는 BPDU를 기다린다.
		- 총 20초인 Max Age 기간 동안 상대방 스위치에서 BPDU를 받지 못했거나 후순위 BPDU를 받았을때 포트는 리스닝 상태로 변경된다.
		- BPDU 기본 교환 주기는 2초이고 10번의 BPDU를 기다린다.
	- Listening:
		- 리스닝 상태는 해당 포트가 전송 상태로 변경되는 것을 결정하고 준비하는 단계이다. 이 상태부터는 자신의 BPDU 정보를 상태방에게 전송하기 시작한다.
		- 총 15초 동안 대기한다.
	- Learning:
		- 러닝 상태는 이미 해당 포트를 포워딩하기로 결정하고 실제로 패킷 포워딩이 일어날 때 스위치가 곧바로 동작하도록 MAC주소를 러닝하는 단계
		- 총 15초 동안 대기한다
	- Forwarding:
		- 패킷을 포워딩하는 단계이다.

- 향상된 STP(RSTP, MST)
	- RSTP:
		- 빠른 시간 내에 토폴로지 변경을 감지 복구 가능
	- MST:
		- 여러개의 VLAN을 그룹으로 묶고 그 그룹마다 별도의 스패닝 트리가 동작

- 스위치의 구조와 스위치에 IP 주소가 할당된 이유:
	- 관리용으로 IP를 할당하는 경우가 있음

## 5장 라우터/L3 스위치: 3계층 장비
- Router? L3 스위치:
	- 스위치는 대표적인 2계층 장비이지만, 라우터처럼 3계층에서 동작하는 L3 장비도 많이 사용되고 있다.

### 5.1 라우터의 동작 방식과 역할
#### 5.1.1 경로 지정
#### 5.1.2. 브로드캐스트 컨트롤
- 스위치는 패킷의 도착지 주소를 모르면, 모든 포트에 플러딩한다.
- 라우터는 분명한 도착지 정보가 있을때만 통신을 허락한다.
- 라우터는 바로 연결되어 있는 네트워크 정보를 제외하고 경로 습득 설정을 하지 않으면 패킷을 포워딩할 수 없다.
#### 5.1.3. 프로토콜 변환
- 현대 네트워크는 이더넷으로 수렴되므로 줄었지만, 과거와 현재도 일부에서는 프로토콜 변환을 한다.

### 5.2. 경로 지정 - 라우팅/스위칭
- 경로 정보를 얻어 경로 정보를 정리하는 역할
- 정리된 경로 정보를 기반으로 패킷을 포워딩하는 역할

#### 5.2.1. 라우팅 동작과 라우팅 테이블
- 넥스트 홉을 지정할때 사용하는 일반적인 세가지 방법:
	- 다음 라우터의 IP를 지정하는 방법
	- 라우터의 나가는 인터페이스를 지정하는 방법
	- 라우터의 나가는 인터페이스와 다음 라우터의 IP를 동시에 지정하는 방법
- 라우팅 테이블에 저장되는 정보:
	- 목적지 주소
	- 넥스트 홉 IP 주소, 나가는 로컬 인터페이스 (optional)
- PBR(Policy-Based Routing):
	- 관리가 힘들어 널리 쓰이지는 않는다.
- 루프가 없는 3계층: TTL

#### 5.2.2. 라우팅(라우터가 경로 정보를 얻는 방법)
- 다이렉트 커넥티드
- 스태틱 라우팅
- 다이나믹 라우팅

#### 5.2.3. 스위칭 (라우터가 경로를 지정하는 방법)
- LPM (Longest Match Rule)
	- 가장 큰 부하.
	- 캐시를 둬서 계산값 재이용

### 5.3. 라우팅 설정 방법
- 다이렉트 커넥티드
- 스태틱 라우팅
- 다이나믹 라우팅
	- RIP, OSPF, IS-IS IGRP, EIGRP, BGP 같은 다양한 라우팅 프로토콜이 있지만
	- OSPF 와 BGP 프로토콜이 주로 사용된다.

- AS: Autonomous System
- IGP: AS 내에서 사용하는 라우팅 프로토콜
- EGP: AS 간 통신에 사용하는 라우팅 프로토콜
- 디스턴스 벡터: 인접한 라우터에서 경로 정보를 습득하는 라우팅 프로토콜
- 링크 스테이트: 라우터에 연결된 링크 상태를 서로 교환하고 각 네트워크 맵을 그리는 라우팅 프로토콜


## 6장 로드 밸런서/방화벽: 4계층 장비(세션 장비)
### 6.1. 4계층 장비의 특징
- 세션 테이블
- Symmetric 경로 요구
- 정보 변경

### 6.2. 로드 밸런스
- L4 로드 밸런싱
- L7 로드 밸런싱

#### 6.2.1. L4 스위치
#### 6.2.2. ADC
- Application Delivery Controller
- ADC 는 4계층에서 애플리케이션 계층까지 로드 밸런싱 기능을 제공하고, Failover, Redirection 등을 함꺠한다.
- 추가적으로 Caching, Compression, 콘텐츠 변환 및 재작성, 인코딩 변환 등 애플리케이션 프로토콜 최적화 기능이 있는 경우도 있다.

#### 6.2.3. L4 스위치 vs ADC

### 6.3. 방화벽

### 6.4. 4계층 장비를 통과할 떄의 유의점 (세션 관리)

#### 6.4.1. 세션 테이블 유지, 세션 정보 동기화
##### 6.4.1.1. 세션 장비 운영자 입장
- 세션 만료 시간 증가
- 세션 시간을 둔 채로 중간 패킷을 수용할 수 있도록 방화벽 설정
- 세션 장비에서 세션 타임아웃 시 양 단말에 세션 종료 통보

#### 6.4.2. 비대칭 경로 문제

#### 6.4.3. 하나의 통신에 두 개 이상의 세션이 사용될 때의 고려사항


## 7장 통신을 도와주는 네트워크 주요 기술
### 7.1. NAT/PAT
- NAT: Network Address Translation
- NAPT (Network Address Port Translation, RFC2663)
- PAT (Port Address Translation)

#### 7.1.1. NAT/PAT의 용도와 필요성
- IPv4 주소 고갈문제
- 보안 강화
- IP 주소 체계가 같은 두 개의 네트워크 간 통신을 가능하게 해준다.
- 불필요한 설정 변경을 줄일수 있다.

#### 7.1.2. NAT 동작 방식

#### 7.1.3 PAT 동작 방식

#### 7.1.4. SNAT와 DNAT
- SNAT(Source NAT) : 출발지 주소를 변경하는 NAT
- DNAT(Destination NAT) : 도착지 주소를 변경하는 NAT
- ref. https://blog.naver.com/alice_k106/221305928714
- DNAT: PREROUTING
- SNAT: POSTROUTING

#### 7.1.5. 동적 NAT와 정적 NAT

### 7.2. DNS
### 7.2.1 DNS 소개
### 7.2.2. DNS 구조와 명명 규칙
- e.g. www.naver.com
- Third-Level Domain: www
- Second-Level Domain: naver
- Top-Level Domain (TLD): com
- root: . 은 보통 생략

#### 7.2.2.1. 루트 도메인
a.root-server.net ~ m.root-servers.net

#### 7.2.2.2. Top-Level Domain (TLD)
- Generic (gTLD)
	- com, edu, gov, int, mil, net, org
- country-code (ccTLD)
	- kr
- sponsored(sTLD)
	- 특정 목적을 위한 도메인
	- aero, asia, edu, museum 등
- infrastructure
	- .arpa: 인터넷 안정성을 유지하기 위함
- generic-restricted(grTLD)
	- 특정 기준을 충족하는 사람이나 단체가 사용할수 있는 도메인
	- .blz, .name, .pro
- test(tTLD)
	- 테스트 목적, .test

### 7.2.3. DNS 동작 방식

- hosts 파일
- DNS local cache
- DNS 서버 쿼리
- 재귀적 쿼리(Recursive Query) vs 반복적 쿼리 (Iterative Query)

### 7.2.4. 마스터와 슬레이브
- 엑티브-스탠바이
- 엑티브-엑티브

### 7.2.5. DNS 주요 레코드
- A: 도메인 주소를 IPv4 로 매핑
- AAAA: 도메인 주소를 IPv6 로 매핑
- CNAME: 도메인 주소에 대한 별칭
	- ![[Pasted image 20250410024044.png]]
- SOA: 본 영역에 대한 권한
- NS: 본 영역에 대한 네임 서버
- MX: 도메인에 대한 메일 서버 정보
- PTR: IP 주소를 도메인에 매핑 (역방향)
- TXT: 도메인에 대한 일반 텍스트

### 7.2.6. DNS에서 알아두면 좋은 내용
#### 7.2.6.1. 도메인 위임(DNS Delegation)

- CDN이나 GSLB를 사용하는게 제일 일반적

#### 7.2.6.2. TTL
- 윈도우: 1시간
- 리눅스: 3시간

#### 7.2.6.3. 화이트 도메인
- 대량으로 이메일을 발송할 경우 스팸메일로 차단된다.
- KISA에 화이트 도메인을 등록해야한다

#### 7.2.6.4 한글 도메인
- 퓨니코드로 드록한 이후 이걸 DNS 에 도메인을 생성해야한다
- 퓨니코드: 클라이언트 단에서 퓨니코드로 변환되어서 전송된다. (xn--으로 시작하는 문자열)
- RFC 3492 에 정의되어 있다.

### 7.2.7 DNS 설정 (windows)
### 7.2.8 DNS 설정 (Linux)
- bind 패키지 사용

### 7.2.9 호스트 파일 설정

### 7.3. GSLB
### 7.3.1. GSLB 동작 방식

### 7.3.2. GSLB 구성방식
- 도메인 자체를 GSLB로 사용
- 도메인 내의 특정 레코드만 GSLB를 사용

### 7.3.3. GSLB 분산 방식
- 서비스 제공의 가능 여부를 체크해 트래픽 분산
- 지리적으로 멀리 떨어진 다른 데이터 센터에 트래픽 분산
- 지역적으로 가까운 서비스에 접속해 더 빠른 서비스 제공이 가능하도록 분산


## 7.4. DHCP
### 7.4.1 DHCP 프로토콜
- BOOTP(Bootstrap Protocol)을 기반으로 한다.

### 7.4.2. DHCP 동작 방식
1. DHCP Discover: DHCP 서버를 찾기 위한 브로드캐스트
2. DHCP Offer : DHCP 서버가 DHCP서버 정보를 클라이언트로 전송
3. DHCP Request :  DHCP 서버로부터 제안 받은 주소를 브로드캐스트로 전송
4. DHCP Acknowledgement: DHCP 클라이언트로부터 IP 주소를 사용하겠다는 요청을 받으면 DHCP Request를 잘 받았다는 신호로 응답 전송

- 위 과정중에 왜 3번 과정 DHCP Request 는 Dest MAC 이 Broadcast 인가를 고민...
	- ![[Pasted image 20250410025815.png]]
	- https://blog.naver.com/jga0674/221004234317
	- DHCP 서버가 여러개일수 있는데, 어떤게 선택되었는지를 전파하기 위해서 브로드캐스트여야한다
	- 


### 7.4.4. DHCP 릴레이

# 8장 서버 네트워크 기본
## 8.1. 서버의 네트워크 설정 및 확인

#### 8.1.1. 리눅스 서버 네트워크
- centos: `/etc/sysconfig/network-scripts`
- ubuntu: `/etc/network/interfaces`

## 8.2. 서버의 라우팅 테이블
### 8.2.1. 서버의 라우팅 테이블
- Destination : 목적지
- Genmask : 서브넷
- Gateway : 게이트웨이
- Iface : 인터페이스
- Metric : 우선순위
- 

### 8.2.2. 리눅스 서버의 라우팅 확인 및 관리
```
ip route
```

```
route add { -host | -net } Target[/prefix] [gw Gw] [metric M] [[dev] If]
```

```
route del { -host | -net } Target[/prefix] [gw Gw] [metric M] [[dev] If]
```


#### 8.2.1.1 CentOS 의 영구적 라우팅 설정
```
/etc/sysconfig/network-scripts/route-장치명
```

#### 8.2.2.2. Ubuntu의 영구적 라우팅 설정
`
`/etc/network/interfaces`

```
up route add [ -net | -host] <host/net>/<mask> gw <host/IP> dev <Interface>
```

## 8.3. 네트워크 확인을 위한 명령어
### 8.3.1. ping (Packet InterNet Grouper)
- 살짝 명령어 먼저 만들고 나중에 끼워 맞춘거 같은데...

### 8.3.3. traceroute(리눅스)

### 8.3.4. tcptraceroute

### 8.3.5. netstat (network statistics)
- ss, ip route, ip -s link, ip maddr

### 8.3.6. ss(socket statistics)

### 8.3.7 nslookup(name server lookup)

### 8.3.8. telnet(tele network)

### 8.3.9. ipconfig

### 8.3.10. tcpdump
