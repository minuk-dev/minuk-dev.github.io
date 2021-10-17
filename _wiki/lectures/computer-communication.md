---
layout  : wiki
title   : 컴퓨터통신
date    : 2021-10-15 23:07:20 +0900
lastmod : 2021-10-17 19:53:00 +0900
draft   : false
parent  : lectures
---

## 컴퓨터에서 의미란? 데이터
 * 문자 (디지털데이터)
 * 음성 (아날로그 데이터) => 실제로는 디지털화 시켜서 사용
 * 컴퓨터 기반 기기에서 모든 의미는 디지털 데이터로 표현되어야 한다. 따라서 의미교환이란 디지털 데이터를 교환한다는 것이다.

## 데이터 전달/교환이란? 신호송수신
 * 0/1은 추상적인 표시이다.:
   * 0/1로 추상화했다고 해서 실제로 전달하는 매체가 디지털이라는 것이 아니다. 약속을 한다면 아날로그를 쓰더라도 디지털데이터를 전달하는 데에는 문제가 없다.
 * 0/1을 유선/무선을 통해 전달하려면 신호화가 필요하다.
 * 신호는 디지털 신호/아날로그 신호가 존재한다.
 * 매체: 신호를 전달하는 물체. 예) 공중, 케이블
 * 유선(구리선, 광케이블), 무선(전파):
   * 매체에 따라 디지털이 잘 전송되지 않는다.
   * 무선에서는 특히 아날로그를 선택해서 전달한다.

## 직접 신호 교환의 한계: 스위칭
 * 통신 상대방과 직접 신호교환을 할 것인가?:
   * 블루투스 스피커
   * 대부분은 기지국/공유가와 신호를 교환한다.
   * 직접적으로 신호를 교환하는 것은 특수한 경우이고, 오히려 간접적으로 교환하는 것이 보편적이다.
 * 거리가 멀다면 결국에는 중계기를 설치할 수 밖에 없다.
 * 연결할 수 있는 규모 - 스위치:
   * 통신자간 수많은 기기들(라우터 등)을 통해 통신하며, 이때 수많은 기기들을 망(Network)라고 한다.
 * 컴퓨터 통신을 하기 위해서는 망을 거치는 것이 필수적이다.
 * 직접 통신의 한계:
   * 물리적 한계(거리에 따라 세기가 감소하는 등) : 중간에 있는 기기들이 이를 극복하기 위해서 중계를 해주어야한다.
   * 통신의 용이성(통신자가 바뀌어도 전달 가능) : 중간에 있는 기기들은 스위칭, 라우팅 등을 통해 올바른 목적지를 향해 데이터를 보내주는 것이다.

## 서로 다른 통신망 연결: 이질성 극복
 * 통신하는 양쪽의 통신망이 서로 다를 수 있다.:
   * 기술, 관리, 정책 측면에서
 * 극복방법 필요:
   * 네트워크 간의 네트워크(internet)이 필요하다. Internet

---
## 컴퓨터 통신 기술 재정의
 * 컴퓨터 기반 기기를 통한 의미 교환
 * = 컴퓨터 기반 응용들을 통한 의미교환 (컴퓨터 기반 응용들의 의미 교환)
 * = 컴퓨터 기반 응용들의 디지털데이터 교환
 * = 컴퓨터 기반 응용들의 디지털데이터를 담고 있는 신호 교환
 * = 컴퓨터 기반 응용들의 디지털데이터를 담고 있는 신호를, 필요에 따라서 중계기, 스위치를 경유하면서 교환
 * = **컴퓨터 기반 기기/응용들**이 필요에 따라서 **중계기/스위치**를 경유하면서, **디지털데이터**를 담고있는 **신호**를 교환해서 의미를 교환하는 것

## 네트위크를 보는 관점: 관심사항에 따른 관점
 * 네트워크 사용자: 통신 응용이 필요로 하는 서비스:
   * 즉, 보낸 메시지가 오류 없이 어떤 정해진 시간 안에 전달되는 것을 보장하는 서비스
 * 네트워크 설계자: 효과적인 설계:
   * 즉, 네트워크 자원들이 효율적으로 이용되며 각각의 사용자에게 공평하게 할당되는 설계
 * 네트워크 제공자: 운영 및 관리가 용이한 시스템:
   * 즉, 통신 장애가 쉽게 분산되며, 사용량에 따른 요금 부과가 용이한 시스템

## 컴퓨터 통신/네트워크 분야
 * 컴퓨터공학 전공자의 시각:
   * 컴퓨터 통신 응용의 개발:
     * 통신 응용들의 사례 및 발전 추세
     * (통신의 기본 개념 + 컴퓨터 통신 시스템 동작원리) 필요
   * 컴퓨터 통신 시스템의 이해 및 개발:
     * 개발 과정, 관리측면에서 컴퓨터 전문가가 필요하다.


---
# 1장 기본개념
 * 요구사항:
   * 네트워크가 제공해야 하는 것
   * 네트워크에 대한 기능적 정의
 * 네트워크 구조:
   * 네트워크를 만드는 방법
   * 체계적인 접근이 필수
 * 성능:
   * 네트워크 비교/평가 기준 (성능의 기준)
   * 빠른 네트워크란?

 * 노드(node):
   * 단말(terminal), 호스트(host)
   * 스위치(switch), 라우터(router)

## 연결(Connectivity)
 * 통신 첫단계 - 통신 주체를 연결하는 것
 * 따라서, 통망이 해야하는 제1업무 : 연결
 * 통신주체 :
   * 전화기 등 단말기(terminal)
   * 일반화하여 통신 응용
   * 실제로 통신 응용에서 고려하면 어렵기 때문에 단말기로 가정

### 연결: 직접 링크(Direct Links)
 * 점대점 연결(Point-to-Point):
   * 가장 간단한 네트워크
   * 불특정 다수와 연결해야하는데, 현실성이 떨어진다.
 * 다중 접근(multiple access):
   * 직접연결의 특성을 살리면서 사용하려는 것
   * 링크 1개를 사용해서 여러개가 공유하는 것
   * 장점 : 비용
   * 단점 : 사용성

### 간접 연결: Switched Networking
 * 간접 연결(Indirect Connectivity): Switched Network
 * 스위칭 네트워크(Switching Network)
 * 인터네트워크(internetworks) : Network of Networks

### 간접 연결방법 : 스위칭 정책
 * 회선 스위칭(circuit switching): 전화네트워크:
   * 스위치가 사전에 output link에 전용(dedicated) 회선(용량) 확보
   * 비트스트림을 중단/간섭 없이 송/수신(흘려보냄)
   * 기본적으로 point-to-point 연결
 * 패킷 스위치(packet switching) : 인터넷/우편:
   * 데이터를 묶음으로 전송: 패킷
   * 스위치의 동작: store-and-forward
   * 장점 : Bursty Traffic
 * 컴퓨터 통신에 적합한 것은?:
   * 사용자 입장 vs 네트워크입장
   * bursty traffic에 적합한 것은?

## 어드레싱(Addressing) 및 라우팅(Routing)
 * 상대방을 지정, 즉, ID 지정
 * 주소(address) : 노드를 식별하는 바이트열:
   * 대개 유일하다
 * 참고: 라우팅:
   * 목적지 노드를 향해 메시지를 어떻게 포워딩할지를 주소에 입각해서 결정하는 직업
 * 주소의 종류(즉, 연결 형태):
   * 유니캐스트(unicast): 특정노드를 가정
   * 방송/브로드캐스트(broadcast) : 네트워크의 모든 노드
   * 멀티캐스트(multicase) : 네트워크의 일부 노드 집합을 지정

## 비용 효율적인 자원 공유(Resource Sharing)
 * 여러 사용자들의 네트워크 자원(노드 및 링크)을 공유하도록 하여야한다.
 * 통신용어로는, 다중화(Multiplexing) 지원
 * 흔히 사용되는 다중화 선택:
   * 시분할 다중화(Time-Deivision Multiplexing : TDM)
   * 주파수 분할 다중화(Frequency-Division Multiplexing:FDM)
   * 코드 분할 다중화(Code-Division Multiplexing: CDM)

### Multiplexing
 * link = physical
 * channel = logical

### 주파수분할 다중화(Frequency Division Multiplexing)
 * 주파수 사이에 틈(gap)이 있어야한다.

### 시분할 다중화(Time-Division Multiplexing)
 * 동기식(Synchronous) 시분할 다중화

### 다중화: FDM and TDM
 * Frequency Division Multiplexing
 * Time Division Multiplexing

### 통계적 다중화(Statistical Multiplexing)
 * 시분할 방법의 일종: 고정 분할이 아닌 요구에 따른 분할(On-demand):
   * 비동기식 다중화
 * Demux key/select?
 * 항상 좋은가?

### 통계적 다중화와 패킷스위칭
 * 통계적 다중화는 링크를 공유하는 방법
 * 패킷 스위칭은 노드가 목적지를 향해 데이터를 전달하는 방법
 * 패킷 스위칭: 패킷 단위로 링크 사용을 재스케줄링:
   * 패킷스위칭의 결과, 링크로 (거의) 통계적 다중화
   * 링크에서 통계적 다중화를 하려면, 노드에서는 패킷스위칭 필요
 * 다른 출발지/소스(source)로부터의 패킷들이 링크에서 섞이게 됨.
 * 링크로 나가기 위해 경쟁하는 패킷들을 저장: 버퍼링(buffering):
   * 서로간 독립적으로 동작시키기 위해서 경쟁상태에서 buffering이 이를 가능케함.
 * 패킷은 FIFO로 처리되거나, 기타 다른 방식으로 처리
 * 버퍼 오버플로우(overflow)를 혼잡(congestion)이라 부름.:
   * 혼잡은 전파되는 경향이 있음.

### 통신 서비스 제공
 * 통신의 주체는 응용프로그램
 * 따라서, 네트워크는 응용프로그램이 원할히 통신할 수 있는 기능을 제공:
   * 통신 기술을 기반으로 응용프로그램이 요구하는 기능을 구현/제공
   * Network Transparency : 실제 통신과정과 상관 없이, Host 간 연결을 투명하게, 추상화되도록 하는것
   * 즉, 호스트 간의 연결을 프로세스 간의 통신 형태로 변환
 * 네트워크는 프로세스와 프로세스 간의 채널을 지원한다.

### 통신 서비스: 통신 장애극복
 * 네트워크가 정상적으로 동작하지 않는 경우:
   * 비트 수준 오류(전자가 간섭/방해)
   * 패킷 수준 오류(혼잡)
   * 링크/노드 고장
   * 메시지의 지연
   * 메시지의 순서가 바뀌어 전달(out-of-order)
   * 제삼자의 도청

### 프로토콜 (Protocol)
 * 통신에 사용되는 약속:
   * 예) 수신호, 언어
   * 양쪽이 같아야함. 즉, 반드시 대칭 관
 * 다양한 컴퓨터 통신 시스템/응용:
   * 프로토콜의 복잡화
   * 불명확한 해석
   * 변경 등 관리의 어려움
   * 새로운 프로토콜이 필요할 때마다 반복
 * 복잡성을 해결하는 구조적인 기법이 필요

### 계층화 (Layering)
 * 복잡한 문제를 한번에 풀 수 없다.:
   * 복잡한 내용/문제를 숨겨서 문서를 단순화 -> 추상화(abstraction)
   * 추상화된 문제/내용의 해결 -> 추상화를 recursive하게 적용
 * 추상화는 자연스럽게 계층화를 유도한다.
 * 각 계층은 하나의 기능을 하는 부품/개체로서 다른 프로토콜에서 재사용 가능

### 프로토콜 계층/개체
 * 프로토콜 계층/개체:
   * (전체) 프로토콜을 구성하는 계층, 즉, 프로토콜의 구성요소
   * 자체도 프로토콜이라고 부름
 * 각 프로토콜 개체는 두 개의 다른 인터페이스를 갖는다.:
   * 서비스 인터페이스(service interface) : 해당 프로토콜의 작업을 정의
   * 동료 인터페이스(peer-to-peer interface): 동료간에 교환되는 메시지를 정의
   * 대부분의 구현은 procedure signiture이다.
   * 상위 계층에서 줘야하는 parameter를 알려주어야하기 때문이다.

### (전체) 프로토콜 정의: 프로토콜 그래프
 * 프로토콜 그래프 (또는 프로토콜 스택):
   * 프로토콜 모음(collection)과 그들 사의의 의존관계(dependency)
   * 동료 간의 통신은 대개 간접적으로 이루어진다.:
     * 실제 통신은 하위 계층을 사용하여 (즉, 위임하여) 이루어진다.
     * 하드웨어 수준에서만 동료간이 직접적임

 * 하위 프로토콜 공유:
   * 다중화(Multiplexing) 및 역다중화(Demultiplexing) - demux key

### (계층적) 프로토콜: 동작원칙
 * 포장/캡슐화 (Encapsulation):
   * 헤더(Header)
   * 바디(Body)

### 추상화/계층화 개념 정리
 * 추상화 : 기능이 있다고 가정하자
 * 계층화 : 여러 계층으로 나누어 각 계층이 해당 기능을 담당한다

### 표준구조 (Standard Architectures)
 * Open System Interconnect (OSI) Architecture:
   * International Standards Organization (ISO)
   * International Telecommuications Union(ITU) : formerly CCITT
   * 참조 모델(Reference Model): 통신 문제를 나누어 생각하는 틀

#### 7계층(기능) 정의
 * Application 7 응용 계층: 응용 자체와 관련된 사항만
 * Presentation 6 표현 계층 : 데이터 표현 방법과 관련된 사항
 * Session 5 세선 계층 : 대화 패턴과 관련된 사항 담당
 * Trasnport 4 트랜스포트 계층: 통신 응용 사이의 신뢰성 있는 메시지 교환
 * Network 3 네트워크 계층 : 네트워크를 통해 연결된 호스트(단말) 사이의 데이터(패킷) 교환
 * Link 2 링크계층 : 하나의 링크로 연결된 노드 사이의 비트 묶음(프레임) 교환
 * Pysical 1 물리 계층: 물리적인 신호 교환과 관련된 사항 담당

#### 인터넷(Internet) 구조
 * Internet Engineering Task Force (IETF)
 * 5,6 계층은 탈락
 * Internet Protocol (IP)는 3-4 계층 사이에 존재하며, 서로 다른 네트워크를 연결하지만 3계층에 가까움
 * 성능상의 문제

 * OSI(7계층) 모델 : 컴퓨터 네트워크 설계/구현 및 구조 체계 표준이지만, 실제 구현과 동일하지 않고, 문제 인식/ 설계의 참조모델로서 사용한다.
 * 각 계층 설명:
   1. 물리 계층 : 직접 연결된 노드 사이의 비트 전송
   2. 링크 계층 : 직접 연결 노드 사이 프레임(비트 묶음) 전송
   3. 네트워크 계층 : 스위치로 간접연결 된 호스트 사이의 패킷 전성
   4. 트랜스포트 계층 : 종단간(end-to-end) 신뢰성 있는 전송

### 성능(Performance) : 대역폭
 * 대역폭(Bandwidth) -- 처리량/처리속도(throughput):
   * 단위 시간 당 전송될 수 있는 데이터의 양:
     * 예) 10Mbps (bits-per-second)
   * 링크 간 대 종단간
   * 표기 방법:
     * KB - 2^10 bytes
     * Mbps - 10^6 bits per second
   * 대역폭은 비트 폭(bit width)과 관련이 있다.:
     * 속도가 높아지면 비트폭이 작아진다. 즉, 비트 사이가 좁아진다.

### 성능: 소요 시간 / 지연 시간
 * 소요시간(Latency) / 지연시간(Delay)
 * A지점에서 B지점으로 메시지를 송신하는 데 걸리는 시간:
   * 예: 24 milliseconds(ms)
 * 때로 왕복지연시간(round-trip time:RTT)이 중요할 수 있다.
 * 시간 소요 항목:
   * 소요시간 : Propagation(고정항목, 상수) + Transmit(보내는 양에 따라 변화) + Queue (변수 항목) (+ 스위칭 시간)
   * Propagation (전파지연시간) = Distance / Speed of Light
   * Transmit (전송 시간) = Size / Bandwidth
 * 광속(Speed of light) - 전파의 속도
 * 직접 링크에서는 큐잉 지연(queueing delay)은 없음.

### Timing of Circuit Switching
 * 아무리 빨라도 받는데에 시간 소요가 있음(Propagation Delay)
 * Address를 다 보내는 동안은 Node 1도 Node 2에게 전송하지 못하고 기다려야한다
 * circuit switch는 데이터를 보내기 전에 충발지로부터 도착지까지 적어도 한번은 갔다와야된다. : RTT = 2 * total 전파 지연 시간
 * circuit switch에서 초기 연결시간이 있다는 것

### Timing of Packet Switching
 * Store and Forward -> 동시에 일어나는게 아니라 store를 다하고 forward한다.
 * processing and queueing delay 시간이 필요함.

### Packet Segmentation: Pipelining
 * Circuit Switch의 data와 비슷한 모습이 된다.


## 성능 (Performance)
 * 대역폭과 소요시간의 상대적 중요성:
   * 작은 메시지(예: 1byte) : 소요시간 중요
     * 1ms vs 100ms dominates 1Mbps vs 100Mbps
   * 큰 메시지 (예: 25MB) : 대역폭 중요:
     * 1Mbps vs 100Mbps dominates 1ms vs 100ms

 * 무한대 대역폭:
   * 총 소요시간이 중요:
     * Throughput : Tansfer Size / Transfer Time (전송완료시간)
     * Transfer Time = RTT + (1 / Bandwidth) x TransferSize
   * 1-MB file to 1-Gbps link as 1-KB packet to 1-Mbps link
   * 데이터도 같이 증가
   * 대역폭이 증가해서 소요시간이 더 중요해지거나 싶지만 주고 받는 데이터의 양도 증가했다. 따라 여전히 대역폭과 소요시간 두개의 다 중요하다.

## 지연시간 x 대역폭 (Delay x Bandwidth Product)
 * "in flight" or "in the pipe" 데이터양
 * 비트로 나타내는 링크의 길이(bit length):
   * 링크의 부피
   * 대역폭이 반영된 지연시간
 * 예: 100ms x 45Mbps = 560 KB

## Frames
 * 대역폭을 키운다고 바로 사용하는 것이 아닌 대역폭을 활용하기 위해 크기를 조절해야한다.

## 통신 성능을 높이는 방법?
 * 처리량(대역폭)을 높이는 방법
 * 소요시간(지연시간)을 줄이는 방법
 * 두 방법이 같은 것은 아님:
   * 대역폭을 높이면, 소요시간이 일부개선
   * 그러나 소요시간은 다른 요소 포함.
   * 또한, 데이터양이 적으면 대역폭 확장은 효과 미미

 * 실제 생활 문제로 대체하여 이해:
   * 두 지점 사이에 탑승자/물류 이송의 성능 문제

## 대역폭을 높이는 방법?
 * 한번에 보내는 양을 높인다.:
   * 데이터를 신호화하는 작업의 효율 증대
 * 보내는 속도를 높인다.:
   * 고주파 채널을 사용한다.
 * 채널을 넓힌다.:
   * 넓은 대역 채널을 사용한다
   * 여러 통신 채널을 병렬 사용

## 소요시간을 줄이는 방법?
 * 신호(전파, 광파)의 속도를 높일수는 없다.
 * 지역처리를 높여서 실질적인 거리를 줄인다.
 * 트래픽을 조절해서 큐잉 대기 시간을 줄인다.

# 2장. 데이터 링크 네트워크 (Data-Link Network)
## 데이터링크 계층
 * OSI 7계층의 1,2 계층은 무엇을 담당?:
   * 하나의 링크로 연결된 두 노드 사이의 비트 묶음(프레임) 교환
 * 하나의 링크로 연결된 두 노드:
   * 점대점 연결 네트워크: 가장 간단한 네트워크
   * 일반적인 네트워크 구성의 기본 block

## 하드웨어 구성요소: 노드(Nodes)
 * 단말/호스트, 스위치/라우터
 * 범용(프로그래밍할 수 있는) 컴퓨터로 구성된다고 가정:
   * 예) PC
 * 때때로 특수한 목적의 하드웨어로 대체되기도 한다.
 * 유한 메모리(제한된 버퍼공간을 의미)
 * 네트워크 어뎁터(or NIC:Network Interface Cache)fㅡㄹ 통해서 네트워크에 연결
 * 프로세서는 빠르고, 메모리는 느림

## 링크(Link)
 * 데이터(신호) 전달을 위한 물리적 매체, 예) 케이블, 공기
 * Wired vs Wireless
 * 전송모드:
   * Simplex, Half-duplex, Full-duplex
 * 링크는 논리적 통로:
   * 하나의 케이블에 여러링크. 예)ADSL

## 모듈레이션: 데이터의 신호화
 * 데이터를 링크, 즉, 물리적 매체를 통해서 전달하기 위해서
 * 인코딩/모듈레이션(Modulation) : data -> signal
 * 수신 쪽에서는 반대작업(Demodulation) : signal-> data
 * 모뎀(Modem)
 * 신호의종류 : 전자기파 스펙트럼:
   * 주파수, 파장

## 전자기 스펙트럼과 매체 특성
  * 저주파일수록 전송 특성이 좋다. (장애물을 잘 통과한다)
  * 저주파는 고속의 데이터 전송에 한계가 존재한다.:
    * 통신속도(대역폭)과 비트폭(length)
  * 통신의 발전: 저주파 -> 고주파


## 사용가능한 유선 링크의 종류
 * Category 5 twisted pair : 흔히 말하는 UTP 케이블, 10~100Mbps, 100m
 * 50-ohm coax (ThinNet) : 10~100Mbps, 200m (동축케이블)
 * 75-ohm coax (ThickNet) : 10~100Mbps, 500m (동축케이블)
 * Multimode filter : 100Mbps, 2km (광케이블)
 * Single-mode filter : 100~2400Mbps, 40km (광케이블)
 * 전화회사로부터 선을 임대하는 경우:
   * ISDN : 64kbps
   * T1 : 1544 Mpbs
   * T3 : 44736 Mbps
   * STS-1 : 51840 Mbps
   * STS-3 : 155250 Mbps
   * STS-12 : 622080 Mbps
   * STS-24 : 1.244160 Gpbs
   * STS-48 : 2.488320 Gpbs

## 광케이블 : Optical Fiber
 * Index of reflection = Speed of vaccum/Speed in medium Modes

## 가입자선로(Last-Mile Links)
 * 집(사용자)와 인터넷공급자 사이를 마지막으로 연결하는 링크
 * 사용자가 선택해서 사용하는 링크이므로 중요
 * 과거 : 모뎀을 통한 음성전화 링크
 * xDSL(Digital Subscriber Loop) : 음성과 data를 FDM 방식으로 동시에:
   * ADSL
   * VDSL
 * Cable Modem: asymmetric, shared bandwidth

## 무선링크(Wireless Links) : 일반
 * 장점 : 고정된 링크가 없음:
   * 이동성 지원
   * 즉시 사용가능
 * 단점 : 공중으로 퍼져나감:
   * 고주파 vs 저주파
   * 인접한 링크 사이에 간섭이 일어날 수 있음:
     * 전화 사용에 규재가 필요 - 라이센스 제도
   * Multipath problem

### 이동 통신(Cellular Network)
 * 기지국 <-> 단말기:
   * 셀 : 하나의 기지국이 관할하는 지역
   * 한드오프(hand-off) 문제
 * 기술발전:
   * AMPS => PCS(GSM/CDMA) => W-CDMA => 4세대 이동통신 => 5G
   * Overlapping circular cells, Idealized hexagonal netowrk, Microcells within a network

### 고정 무선 통신(Wireless Field linked)
 * 무선 고속 전용링크
 * 무선 가입자망:
   * 소수의 이용자를 위해서, 선깔기는 아쉬울때 사용. 안태나에 지향성을 부과해서 공간을 분할한다.

### 위성통신(Satellite system)
 * 정지궤도 방송/전화 -> 대부분 고정식
 * 정지궤도 데이터(VSAT)
 * 저궤도 전화 : 양방향 원할, 이동가능 (셀이 작아지고, 많은 양의 위성이 필요하다.)
 * 위성방송/DMB : 위성은 단순히 스위치, 중계만 하도록 사용했다. 지연시간 등의 속도적 문제점은 있을 수 있지만, 위성을 재활용해서 지상에서 업데이트가 가능하다는 장점이 있다.

### 단거리 무선통신(Short Range)
 * Public (licensefree) band 이용
 * 적외선통신
 * 무선 LAN - IEEE 802.11
 * Bluethooth
 * ZigBee/IEEE 802.15.4

## 인코딩
### 인코딩(Encoding)
 * 신호(Signal)는 물리적 매체를 통해 전달된다.:
   * 디지털 신호, 아날로그 신호
 * 데이터는 디지털 데이터만 취급:
   * 아날로그 데이터는 디지털 데이터를 변환
 * 문제: 발신지에서 목적지로 보내려는 이전 데이터를 전달될 수 있는 신호로 인코딩 해야함.
 * 보다 일반적인 용어로는 변조(Modulation)이라고 한다.

### 디지털 전송(Transmission)
 * 신호 중계방법:
   * 아날로그 전송:
     * 신호를 단순 증폭만 한다.
     * 즉, 앰프(Amplifier)를 사용한다.
   * 디지털 전송:
     * 신호에서 데이터를 복원하여 다시 신호화:
       * 디지털 데이터를 담은 신호만 사용가능
     * 즉, 리피터(Repeater) 사용
   * 거의 모든 전송 방법이 디지털 전송 사용:
     * noise 제거
     * 기기비용, 부가기능 추가기능 등을 고려하여 사용

## 데이터 전송(Transmission)
 * 전송할 때 Analog를 Digital로 변환하여 보낸다.

## Pulse Code Modulation
 * sampling의 주기를 줄이면, 손실을 줄일 수 있다. 즉, sampling 주기는 각 샘플을 얼마나 정확하게 저장할 것이냐를 의미한다.

## PCM
 * Sampling Theorem:
   * Sampling rate = 2 * Highest Signal Frequency
 * 4 kHz Voice = 8 kHz sampling rate
 * Represent samples as pulses (PAM)
 * Quantize the samples (PCM)
 * 8 k samples/sec * 8 bits/ smaple = 64 kbps

## 변조 : Amplitude Modulation
 * 하나의 신호로 많은 비트를 보낼 수 없다.

 * 주파수 변조(Frequency Modulation), 위상 변조(Phase Modulation)
 * 이동통신의 속도가 2배 증가시킬려면?:
   * Shannon의 법칙
   * AM, FM, PSM을 동시에 적용한다.

## 디지털 전송(Transmission)
 * Analog Data, Digital Data
 * Digital Transmission
 * Modulation : Data -> A-Signal

### Non-Return to Zero(NRZ)
 * 노드 내부의 데이터 표현과 일치(즉, 별도의 인코딩 필요 없음)
 * 문제점 : 1 또는 0이 연속되는 경우:
   * Low Signal(0)인 경우 수신자는 신호가 없는 것으로 오해할 수 있음
   * High Signal(1)인 경우 전류가 계속 흐르게되고, 기저 전압의 혼돈이 생김.
   * Clock 복구가 불가능:
     * 송신자와 수신자의 Clock이 맞지 않으면 잘못된 비트 인식
     * 수신자가 송신자의 Clock의 자신의 Clock을 맞추는 작업

### NRZI and Manchester
 * Non-return to Zero Inverted(NRZI):
   * 1을 인코딩할 경우 현재의 신호로부터 중앙지점에서 전이(mid transition)을 하고, 0을 인코딩할 경우 현재의 신호 상태를 유지함:
     * 연속되는 1 문제를 해결하는 방법
 * Manchester:
   * 0 : uptransition, 1: down transition
   * NRZ 방식으로 인코딩 데이터와 클럭을 베타적 논리합(XOR)을 시켜서 바꾼다.:
     * 50% 효율 문제

### 4B/5B
 * 아이디어:
   * 데이터를 매 4bits 마다 5-bit의 코드로 인코드한다. 이 5-bit 코드는 앞에 1개, 뒤에는 2개까지의 0이 나오도록 제한하여 선택된 코드이다. (따라서, 0이 4개 이상 연속되게 나올 수 없다.)
   * 5-bit 코드는 NRZI 인코딩을 이용해서 전송된다.
   * 효율을 80% 달성한다.

### 프레이밍(Framing)
 * 데이터를 끝없이 보낼수는 없음(특히, 패킷 네트워크에서는)
 * 문제:
   * 비트(bit)들의 연속을 하나의 묶음(frame)으로 자르는 것
   * 수신 쪽이 프레임을 인식할 수 있도록 묶는 것
   * 프레임의 처음과 끝 인식
 * 전형적으로 네트워크 어뎁터에서 구현된다.
 * 어뎁터는 호스트메모리로부터 프레임을 넣고 가져옴.

### 바이트 중심 프로토콜(Byte-Oriented Protocol)
 * 보초 방법(Sentinel Approach):
   * BICYNC
   * IMP-IMP, PPP
   * 문제점 : 프레임의 데이터부에서 ETX 문자가 나올 경우
   * 해결 : 확장문자(escaping character) 사용:
     * BICSYNC의 경우 DLE 문자를 ETX문자를 앞에 부착
     * IMP-IMP의 경우에는 DLE 문자 앞에 DLE문자를 부착
 * 바이트 수 방법(Byte Counting Approach) - DDCMP:
   * 문제: 개수(count) 합이 잘못된 경우(training error)
   * 해결 : 순회 중복검사(CRC)가 실패하므로 오류 검출

### 비트 중심 프로토콜 (Bit-Oriented Protocol)
 * HDLC : High-level Data Link Control (also SDLC and PPP):
   * 특별한 bit-sequence를 프레임의 앞과 뒤에 붙여서 프레임을 구현(01111110)
 * 비트 삽입(bit stuffing):
   * 송신자 : 메시지의 중간에 연속되는 5개의 1이 나오면 0을 생성함.
   * 수신자 : 1을 연속해서 5개 받았을 때, 다음 비트를 본다.:
     * 다음 비트가 0이라면 그 비트를 삭제한다.
     * 다음 비트가 10이라면 프레임의 끝
     * 다음 비트가 11이라면 오류

### 오류 검출 코드(Error Detecting Code)
 * 데이터 영역 안에 오류가 있는지 없는지를 알아내는 부가 데이터
 * 예):
   * 크기면에서 EDC << data : 오류가 없는 경우 단순 부하이므로
   * 효율면에서, 오류 검출율이 높아야함
   * 비용면에서, f() 연산에 시간이 적게 소모되어야함.

### 오류 검출율
 * EDC가 완벽하게 오류를 검출할 수 있을까?
 * 검출 실패 : 시스템 integrity 상실
 * 매우 높은 오류 검출율 + 중복 오류 검사

#### 2차원 패리티(Two-Demsional Parity)
#### 인터넷 체크섬 알고리즘(Internet Checksum Algorithm)
 * 아이디어 : 메시지를 16-bit의 정수의 연속으로 간주하고, 각 정수들을 16-bit 1의 보수 연산을 사용하여 모두 더한다. 그리고 그 결과 값의 1의 보수를 얻는다.

```c
u_short cksum(u_short *buf, count)
{
  register u_long sum = 0;
  while (count --) {
    sum += *buf;
    if (sum & 0xFFFF0000) {
      /* carry occured, so wrap around */
      sum &= 0xFFFF;
      sum ++;
    }
  }
  return ~(sum & 0xFFFF);
}
```


#### 순회 중복 검사9Cyclic Redundancy Check: CRC)
 * 더하기보다 복잡한 나누기 사용 : 나머지 오류 검출코드로 전송
 * 갯수로 사용될 송수신 사이에 약속된 비트 패턴: C
 * 보낼 메시지 : M
 * 오류 검출을 위해 추가되는 정보 : F(즉, EDC)
 * 송신쪽:
   * (M || F) % C == 0 이 되도록 F를 설정, 즉 (F에 나머를 넣어서) 전체 프레임이 C로 나누어 떨어지도록 함.
   * (M || F)를 전송
   * 예) C=1101, M=10011010 이면, F=101 생성, 10011010101 전송
 * 수신쪽:
   * 수신된 메시지 전체를 C로 나누어서:
     * 나누어 떨어지지 않으면 오류 발생
     * 나누어 떨어지면 오류가 없는 것으로 간주

 * 성능:
   * 오류검출율:
     * 비트 C의 선택이 좌우
     * 수학적 분석에 의해 잘 잡으면 32bit 코드 사용하면, 1500bytes 이상의 데이터에 대해서도 99.99의 검출율
   * 연산속도:
     * 전송 속도보다 늦으면 곤란하기 때문에 네트워크 카드내에서 하드웨어적으로 처리
   * 빠른 연산과 분석을 위해서 xor로 구현

### Error Pattern: E(X)
 * 전송하는 프레임 : P(X)
 * 수신하는 프레임 : P'(X)
 * 전송 중 발생한 오류를 프레임에 대응되는 형태로 나타내면 : E(X)
 * 관계:
   * P(X) xor P'X() = E(X)
 * 주의:
   * E(X) 값을 구하는 것이 목적이 아님
   * 오류가 없었다면, E(X) = 0 이고, P(X)=P'(X)라는 사실

### CRC에 대해 간단히 설명하시오
 * 전송되는 데이터의 오류 여부확인을 위해 부가되어 보내지는 오류 검출 코드
 * 송신자가 계산해서 추가, 수신자가 이를 확인
 * 오류 검출율이 매우 높고, 하드웨어 구현이 가능해서 거의 모든 링크 전송에서 사용

### 복구 : 개요
 * 오류에 의해 변질된 프레임의 복구
 * 오류 수정 코드(Error Correction Codes: ECC):
   * 순방향 수정(Forward Error Correction :FEC)
 * 자동반복 요청(Automatic Repeat reQuest: ARQ): 재전송:
   * ACK와 타임아웃(Acknowledgements and Timeouts)
   * 역방향 수정(Backward Error Correction)
 * 참고 : 오류 중에는 프레임 자체가 성립하지 않는 framing error 도 있음:
   * 이 경우 수신 쪽이 frame 수신 여부를 인식하지 못함.(frame loss)

### 오류 수정 코드(Error Correcting Codes)
 * Forward Error Correction(FEC)
 * 재전송이 용이하지 않는 경우 유용:
   * 전화 같은 실시간 통신, 재전송이 의미가 없는 경우

### 재전송을 통한 오류 복구
 * 타임아웃, 재전송용 버퍼처리 등 필요
 * 어뎁터에서 단독으로 처리하는데 한계
 * 2계측이 제공해야하는 기능이지만, 노느 내의 소프트웨어로 처리한다.

### ARQ
 * 응답(ACK) 및 타임아웃
 * 순서번호(Seq):
   * ACK의 분실 경우 중복 데이터 문제 발생:
     * 순서번호 필요
     * 수신된 중복 data는 무시한다.
     * 반드시 ACK을 전송한다
 * Automatic Repeat Request(ARQ):
   * Error detection
   * Acknowledgement
   * Retransmission after timeout
   * Negative acknowledgement (optional)

### Stop and Wait : Tming 분석
 * Utilization of Link = (frame size / bit rate) / (distance / speed of signal) = frame size / (distance x bit rate)
 * 문제점 : 파이프를 꽉 채운채로 유지하지 못함.
