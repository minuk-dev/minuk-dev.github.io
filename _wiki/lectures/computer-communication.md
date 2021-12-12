---
layout  : wiki
title   : 컴퓨터통신
date    : 2021-10-15 23:07:20 +0900
lastmod : 2021-12-12 19:40:50 +0900
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

### 슬라이딩 윈도우
 * 아이디어 : 송신자가 ACK를 받기 전에 여러 프레임을 전송할 수 있도록 한다.
 * ACK를 받지 않은 상태에서 보내지는 프레임(outstanding frame)이 복수로 늘어난다. 그 수는 제한된다.(window size):
   * 모두 오류 제어 대상, 순서 번호 필요
   * stop & wait는 sliding window의 window size가 1인 경우
 * 각각의 프레임에 대해서는 ARQ, 즉 ACK/timeout & retransmission
   * ACK #n의 의미를 일관성 있도록 정의해서 사용
 * 즉, 효율 높은 오류제어: 버퍼링보다는 오류제어가 핵심이다.

### Sliding Window Protocol의 성능
  * $U(Utilization) \propto N, 1/t_{prop}, t_{frame}$
  * 윈도우 크기(N)이 충분히 크면, 효율이 증가한다.
  * 즉, ACK가 돌아올 때까지 윈도우가 모두 소진되지 않으면 기다리는 시간 없이 100% 통신이 가능하다.

### 슬라이딩 윈도우의 오류 복구
 * 복수의 outstanding frame 중 어느 프레임에서도 오류 발생 가능:
   * 따라서 모든 프레임은 개별적으로 재전송준비가 되어야한다.
 * 오류 처리 정책:
   * Go-Back-N : 오류가 발생한 지점부터 새출발
   * Selective - Repeat : 오류가 발생한 프레임만 재전송

### Go-Back-N (구현) 옵션
 * Go-Back-N에는 여러가지 옵션이 가능하다.
 * 수신 쪽에서 out-of-order 프레임을 어떻게 처리하는가에 따라서:
   * ACK를 보낼 것인가?
   * 저장을 할 것인가?
 * 저장 안하고 ACK도 보내지 않는다. -> stop & wait
 * 저장하고 ACK는 안보낸다. -> 이를 가정하고 설명한다.
 * 저장 안하고 ACK를 보낸다. -> 중복 ACK
 * 저장하고 ACK도 보낸다. -> 중복 ACK
 * 송신 쪽은 동일하게 동작:
   * 각 outstanding 프레임에 대해:
     * 재전송 버퍼에 저장 : 타임아웃 설정
   * 오류 발생 인지 이후 : 모든 outstanding frame을 동시 전송? 각 frame의 timeout에 전송
 * 어떤 옵션으로 구현되어도 연동가능, 즉 오류 복구 가능

### 오류처리 정책 : Go-Back-N 재검토
 * 오류가 발생한 N부터 다시 출발(N이하를 무조건 다시 보낸다는 의미가 아님)
 * 핵심 : ACK는 "~까지 잘받았다"는 의미의 누적(cumulative) ACK 사용
 * 수신쪽에서의 버퍼링은 수신자가 독립적으로 결정:
   * 버퍼링 안해도 된다.

### 오류처리 정책 : Selective Repeat
 * 필요조건:
   * 수신쪽은 out-of-order 프레임 수신. 버퍼링 필수
   * 수신쪽이 정확한 수신 상황ㅈ 정보를 송신 쪽에 알려주어야 함.
   * ~는 잘 받았다는 개별(individual)/선택(selective) ACK 필수

### Sliding Window 세부사항
 * Sliding Window는 오류 제어 프로토콜:
   * 각각의 outstanding frame에 대해 기본적으로 ARQ수행
   * 복수 개의 outstanding frame 처리를 위해 buffering 추가
 * (Go-Back-N, Selective-Repeat) 선택은 송신자의 결정:
   * 송신자의 재전송 방법 : 수신자의 buffering은 별도문제
   * Sending Buffer : 필수 (재전송)
   * Receiving Buffer:
     * Selective-Repeat : 필수 (out-of-order 프레임 반드시 저장)
     * Go-Back-N : 성능 향상을 위한 option
   * 수신자가 out-of-order를 저장한다고 Selective Repeat은 아님
 * 송신자가 Selective-Repeat을 하기 위해서는 수신 상황 정보가 필요:
   * 수신 쪽에서 송신 쪽으로 selective/individual ACK를 보내야한다. 송신쪽에서 Selective Repeat 가능

### 프로토콜의 구현
 * 오류제어 이전까지는 Adaptor(NIC)에서 하드웨어로 구현
 * 오류제어는 소프트웨어로 구현되는 첫 프로토콜
 * 송수신 양쪽에서 보는 것은 이론적 설명에서만 실제론:
   * 송수신이 각각 독립적으로 동작
   * 프로토콜의 동작에 대해서 확실한 이해 필요
   * 특히, 비정상 상황에 대해서
 * 난이도:
   * Concurrent and distributed program

### 슬라이딩윈도우(GoBackN) 세부알고리즘
 * 송신자:
   * 각 프레임에서 순서번호를 할당(SeqNum) : 각 outstanding frame의 ID
   * 세 개의 상태 변수를 유지:
     * 송신창 - send window size(SWS)
     * 마지막으로 받은 ACK 의 프레임 번호 - last acknowledgement received (LAR)
     * 마지막으로 보낸 프레임 - last frame sent (LFS)
   * 다음 항등식(invariant)을 유지 : LFS - LAR + 1 <= SWS
   * 상위 계층에서 전송 요청을 받으면, 1) LFS를 증가시키고 (LFS 증가가 불가능하면 wait), 2) 타임아웃을 설정한 뒤, 3) 프레임을 전송
   * ACK를 받으면 1) 타임아웃을 해지하고, 2) LAR을 증가시키며, 3) 이에 따라 새로 창이 열리며 전송이 가능
   * 타임아웃이 걸리면 1) 타임아웃을 설정한 뒤, 2) 프레임을 재전송
   * SWS만큼의 프레임은 버퍼에 유지 -- 재전송에 필요
 * 수신자:
   * Out-of-order 프레임을 저장하는 GoBackN 알고리즘
   * 세 개의 상태 변수를 유지:
     * 수신창 - receive window size(RWS)
     * 받아들일 수 있는 마지막 프레임 - last frame acceptable (LFA)
     * 수신 예상 프레임 - next frame expected (NFE)
   * 항등식(invariant)을 유지: LFA - NFE + 1 <= RWS
   * SeqNum의 프레임이 도착하면:
     * If NFE <= SeqNum <= NFA -> 받아들임(accept):
       * 중간에 빈 곳 없는 연속되는 데이터는 상위 계층으로 deliver
     * If (SeqNum < NF) or (SeqNum > NFA) -> 버림 (discard):
       * SeqNum < NFE 는 ACK 전송 필요
     * 누적 ACK(cumulative ACK)를 보낸다. (NFE 값으로)

### 순서 번호 공간 (Sequence Number Space)
 * 순서번호는 오류제어에서 필수
 * 프레임 헤더의 필드는 한정된 공간 (많이 사용할 수록 overhead 증가): 결국 일정한 숫자에서 순서번호는 순환되며 사용
 * 순서번호공간 : 가능한 순서번호 구간:
   * 예 : 4-bit 필드 => [0..15]
 * 문제 : 순서번호 필드를 얼마로 잡아야 안전하겠는가?:
   * 반대로, 주어진 순서번호 공간에서 최대 outstanding 프레임, 즉, 송신자 기준 WindowSize는 얼마까지 늘릴 수 있나?
 * 순서 번호 공간은 현재 전송 중인 프레임의 수보다 커야한다.:
   * 어떤 프레임이 오류 및 재전송의 대상이 될지 모르므로, outstanding Frame 각각은 서로 다른 SeqNum를 갖고 있어야한다.
 * outstanding 프레임의 최대 수 = SendingWindowSize(SWS)
 * 따라서, 순서번호공간 크기 > SWS
 * 하지만 단순히, SWS <= 순서번호공간에서는 다른 문제가 생긴다.:
   * 순서가 순환되었음에도 수신자가 이를 인지하지 못하고 새로운 데이터를 재전송된 데이터라고 판단하는 문제
 * 결론 : SWS < 순서번호 공간 / 2:
   * 즉, WindowSize는 최대로 보낼 수 있는 outstanding 프레임의 수이고 이는 순서번호공간의 반보다 작아야한다.
   * 정확하게는 SWS < (MaxSeqNum + 1) / 2
 * 직관적으로 설명하면, SeqNum는 순서 번호 공간의 1/2 사이를 오고간다.

### 동시 논리 채널(Concurrent Logical Channels)
 * 하나의 점대점(point-to-point) 링크를 통해 여러 개의 논리적 채널을 동시/다중 송신함.
 * 각각의 논리적 채널은 정지 대기(stop-and-wait)방식으로 운영된다.
 * 각 지상 링크에 대해서 8개의 논리적 채널을 유지한다.
 * 각 프레임의 헤더에는 3-bit 채널 번호와 1-bit 순서 번호, 총 4비트가 포함되어 있으며, 이는 슬라이딩 윈도우 프로토콜가 8개의 송신창을 유지하는데 필요한 것과 같다.
 * 신뢰성 문제를 흐름제어(flow control)와 프레임 순서(frame order) 문제와 분리:
   * Sliding Window Protocol은 all-in-one approach이기에, 오류 문제, 버퍼링 문제, 순서 문제를 한번에 처리하여 복잡하다.

### Sliding Window 구현
 * 목적:
   * 통신 알고리즘이 어떻게 구현되는가에 대한 궁금증 해결 (계층 구조는 어떻게 구현되는가?)
   * 슬라이딩 윈도우 알고리즘 구현을 통한 확실한 이해
 * 어디서, 즉, 시스템의 어느 단계에서, 동작하는 프로그램인가?:
   * 프레임 하나 하나의 송수신은 NIC(Network Interface Card)이 담당
   * 슬라이딩 윈도우는 바로 그 위에서 동작 -> 디바이스 드라이버
 * 프로토콜 내부동작의 실체는?:
   * 계층구조에 따라, 헤더 정보를 써넣고, 읽고 처리하는 것이 기본
   * 담당 기능에 따라 세부 동작이 정해짐 (슬라이딩 윈도우 - 오류 제어)

```c
typedef u_char SwpSeqno;
typedef struct {
  SwpSeqno SeqNum; /* sequence number of this packet */
  SwpSeqno AckNum; /* allows window sizes of up to 128 */
  u_char   flags;  /* up to 16 bits worth of flags */
} SWPHdr;

typedef struct {
  /* sender side state; */
  SwpSeqno    LAR;      /* seqno of last ACK received */
  SwpSeqno    LFS;      /* last frame sent */
  Semaphore   sendWindowNotFull;
  SWPHdr      hdr;      /* pre-initialized header */
  struct txq_slot {
    Event   timeout;    /* event associated with send-timeout */
    Msg     msg;
  } sendQ[SWS];

  /* receiver side state: */
  SWPSeqno    NFE;      /* seqno of next frame expected */
  struct rxq_slot {
    int     recieved; /* is msg valid? */
    Msg     msg;
  } recvQ[RWS];
} SwpState;

static XkHandle
sendSWP(SwpState *state, Msg *frame)
{
  struct sendQ_slot *slot;
  hbuf[HLEN];
  /* wait for send window to open */
  semWait(&state->sendWindowNotFull);
  state->hdr.SeqNum = ++state->LFS;
  slot = &state->sendQ[state->hdr.SeqNum % SWS];
  store_swp_hdr(state->hdr, hbuf);
  msgAddHdr(frame, hbuf, HLEN);
  msgSaveCopy(&slot->msg, frame);
  slot->timeout = evSchedule(swpTimeout, slot, SWP_SEND_TIMEOUT);
  return send(LINK, frame);
}

static int
deliverSWP(SwpState *state, Msg *frame)
{
  hbuf = msgStripHdr(frame, HLEN);
  load_swp_hdr(&hdr, hbuf);
  if (hdr.Flags & FLAG_ACK_VALID)
  {
    /* received an acknowledgment --- do SENDER-side */
    if (swpInWindow (hdr.AckNum, state->LAR+1, state->LFS))
    {
      do
      {
        struct sendQ_slot *slot;
        slot = &state->sendQ[++state->LAR % SWS];
        evCancel(slot->timeout);
        msgDestroy(&slot->msg);
        semSignal(&state->sendWindowNotFull);
      } while (state->stateLAR != hdr.AckNum);
    }
  }
  // 송신 쪽, timeout 처리는 생략
  if (hdr->Flags & FLAG_HAS_DATA)
  {
    struct recvQ_slot *slot;
    /* received data packet -- do RECEIVER-side */
    slot = &state->recvQ[hdr.SeqNum & RWS];
    if (!swpInWindow(hdr.SeqNum, state->NFE, state->NFE + RWS - 1))
    {
      /* drop the message */
      return SUCCESS;
    }
    msgSaveCopy(&slot->msg, frame);
    slot->received = TRUE;
    if (hdr.SeqNum == state->NFE)
    {
       Msg m;
       while (slot->received)
       {
         deliver(HLP, &slot->msg);
         msgDestroy(&slot->msg);
         slot->received = FALSE;
         slot = &state->recvQ[++state->NFE % RWS];
       }
       /* send ACK; */
       prepare_ack(&m, state->NFE);
       send(LINK, &m);
       msgDestroy(&m);
    }
    return SUCCESS;
  }
}
```

## 이더넷 (Ethernet) 개요
 * LAN(Local Area Networks)의 대명사
 * 역사:
   * skip
 * CSMA/CD:
   * Carrier Sense : 반송 신호 감지
   * Multiple access : 다중 접근
   * Collision detection : 충돌 검출
 * 버스 토폴로지: 다중 접근 연결
 * 문제 : 공유 매체에 공평하게 접근할 수 있는 분산(distributed) 알고리즘:
   * 즉, 매체접근 (MAC: Medium Access Contorol) 필요

### 물리적 특성 (버스 토폴로지)
 * 고전적 이더넷 (Classicial Ethernet) : Thick-net:
   * 현재는 거의 사용하지 않지만, 이더넷 동작을 이해하기 위해서 알 필요가 있다.
   * 최대 세그먼트 500m
   * transceiver taps은 적어도 2.5m 떨어져야함.
   * 중계기(repeaters)로 여러 개의 세그먼트를 연결
   * 두 노드 사이에서 중계기가 4개를 초과하여 있을 수 없다.:
     * 총 길이 : 2500m
   * 호스트의 최대 개수는 1024개
   * 10Base5라고도 불림(10 Mbps, 500m)

### 10BaseT Network
 * 대안 기술:
   * 10Base2 (thin-net) : 200m : 데이지 체인(daisy-chain) 형태
   * 10BaseT (twisted-pair): 100m : 성형(star configuration)

### 프레임 형식(Frame Format)
 * 주소 (Addresses) : MAC 주소:
   * 각각의 어댑터에 유일한 48-bit 유니캐스트 주소가 할당됨
   * 브로드캐스트(Broadcast) : 모든 비트가 1
   * 멀티캐스트(Multicast) : 첫 비트가 1
 * 어댑터는 모든 프레임을 수신: 다음 경우에 받아들임 (즉, 호스트로 보냄):
   * 주소항이 자신의 유니캐스트 주소인 프레임
   * 브로드캐스트 주소로 지정된 프레임
   * 수신하도록 프로그램된 멀티캐스트 주소로 지정된 프레임
   * 무차별 모드(promiscuous mode)일 때는 모든 프레임

### 전송 알고리즘(Transmitter Algorithm)
 * 다중 매체접근제어(MAC) : 기본적으로, 경쟁 방식:
   * 즉, 제어방식, 예약방식이 아님
 * CS: carrier sense:
   * 전송 전에 회선의 상태를 확인
 * 회선이 유휴(idle) 상태이면:
   * 즉시 전송
   * 메시지 사이즈의 상한선은 1500 바이트
   * 연속해서 프레임을 보낼 때는 $9.6 \mu s$를 기다려야함.
 * 회선이 사용중이라면:
   * 유휴 상태가 될 때까지 대기하였다가 즉시 전송
   * 1-persistent라 불림 (p-persistent의 특정 형태)

### 전송 알고리즘 : 충돌(Collision)
 * CD(Collision Detection) : 전송 중에도 회선 점검:
   * 최소 얼마 동안 감지해야 확실한 충돌감지:
     * 최악의 충돌 시나리오 - 51.2 $\mu s$
   * 51.2 $\mu s$ 전에 전송이 끝나면?:
     * 수신자 위치에 따라 충돌 없는 수신도 발생 가능. 즉, 충돌 여부가 확실하지 않음.
     * 따라서, 10Mbps 기준, 전송 최소 프레임의 길이는 512bit, 즉, 64 바이트
 * 충돌(collision)이 생긴다면:
   * 잼(jam) 신호를 발송하고, 프레임 전송을 멈춤
   * 지연시간(delay)을 가진 후 재시도:
     * 첫번째: (0, 51.2) 중 택일
     * 두번째 : (0, 1 * 51.2, 2 * 51.2, 3 * 51.2) 중에서 택일
     * N번째 : rnadomly select k * 51.2, k=0..2^n -1
     * 여러번 시도 후에 포기(일반적으로 16번)
   * 지수 백오프(exponential backoff)

### CDMA/CD 평가
 * 여러 MAC 정책을 평가하는데에 있어서, 적절한 지표:
   * 확장성 등
 * 충돌에 소모되는 총 비용은 무엇의 함수:
 * 1-persistent 정책 : Detecting 계속해서 하다가 아무도 안보낸다 싶으면 바로 전송
 * CD를 하지 않는다면? CD로 얻게되는 이익은 어디서 나오는 것인가: 충돌을 감지해서 충돌 발생시 소모되는 비용을 감소시킨다.
 * 충돌이 감지된 후 1-persistent인가? : 지수적 백오프(exponential backoff)로 전송하기 때문에 1-persistent가 아니다.
 * CDMA/CD가 유요한 환경은? : Bursty Traffic이 발생하는 곳. (평소에는 충돌 가능성이 낮은)

### 이론과 실제
 * 10-200 개의 호스트
 * 길이는 1500m보다 짧다. (RTT의 경우 51$\mu$ 보다는 5$\mu$에 가깝다)
 * 패킷의 길이는 bimodal distribution을 따른다. (최대 크기인 1500에 가깝거나, 아주 짧은 80에 가까운 값들이 많은 분포)
 * 상위 수준의 흐름제어(flow control)와 호스트 성닝이 부하를 제한한다.
 * 권장사항:
   * 과부화를 피할 것(최대 30%의 효율)
   * 컨트롤러(controller)를 정확하게 구현
   * 큰 패킷을 사용

### 이더넷 확장
 * 속도:
   * FastEthernet, Gigabit Ethernet 등
 * 스위칭 기능:
   * Repeater 대신 Bridge:
     * 각 세그먼트가 독립적으로 사용가능하도록
   * Multiport Bridge(= LAN Switch)
   * Switched Ethernet:
     * HUB에 Switch로 동작
     * 각 호스트는 대역폭을 점유해서 사용가능

## 토큰링
 * 토큰링 네트워크(Token Ring Networks):
   * PRONET: 10Mbps와 80Mbps 링
   * IBM: 4Mbps 토큰링
   * 16Mbps IEEE 802.5/토큰링
   * 100Mbps Fiber Distributed Data Interface(FDDI)
   * 현재는 많이 사용되지 않지만, 이더넷의 반대 정책으로 유명

### 토큰링의 연결
 * relay를 이용한 bypass
 * 다중 접속 장치:
   * 외부에서 보면 HUB와 유사

### 토큰링 MAC 기본 개념
 * 프레임은 한 방향으로 돈다.:
   * upstream to downstream
 * 특별한 비트 패턴(token)이 링을 회전한다.
 * 전송하기 전에 토큰을 획득해야 함
 * 전송을 마치면 토큰 방출(release)
 * 프레임이 되돌아 오면 프레임을 제거
 * 지국들은 라운드 로빈(round-robin) 서비스를 받게 됨

### 매체 접근 제어 세부사항
 * 1 비트 버퍼 + 모니터(monitor) 지국
 * 토큰 보유 시간 제한
 * 전송 우선순위 지원:
   * 예약 비트
   * 우선순위 복구
 * 토큰 방출:
   * 즉시 방출
   * 지연 방출

### 토큰링 관리
 * 모니터 지국 : 링의 정상적 동작을 감시/유지:
   * 토큰의 회전을 감시; 문제 발생시 재생성
   * 변질/orphan 프레임의 제거
   * Dead station의 검출
 * 모니터 지국의 선출:
   * 모너티로부터 announce가 없을 경우
   * 감지한 노드가 claim frame 발송
   * 자신이 보낸 claim frame을 받으면 => 링의 모든 노드 인정 => 모니터 지국으로 동작
   * 동률 규정 : high address wins

### 프레임 형식
 * 식별자 (delimiter):
   * illegal Manchester Coding
 * 접근 제어(Access Control):
   * 프레임 우선순위, 예약 우선순위
 * 프레임 제어(Frame Control):
   * 상위 계층 프로토콜에 대한 역다중화 키
 * 프레임 상태(Frame status):
   * A bit: 수신자가 송신자에게로 ACK
   * C bit: 수신자가 프레임을 copy했음

## 무선(Wireless) LANs
 * IEEE 802.11
 * 대역폭:
   * 1 or 2 Mbps: 11M(802.11b), 54M(802.11g/a), 300M(802.11n), 1G+(802.11ac)
 * 물리적 매체:
   * 확산 스펙트럼(spread spectrum) radio : 2.4GHz, 5GHz
   * 발산 적외선 (diffused infrared) : 10m
 * infrastructure mode:
   * wireless host communicates with base station
   * base station = access point(AP)
   * Basic Service Set(BSS):
     * wireless hosts
     * access point (AP)
   * Ad hoc mode:
     * host only

### 확산 스펙트럼 (Spread Spectrum)
 * 개념:
   * 공용대역(public band) 사용을 위한 기술적 요구사항:
     * 다른 사용자를 지속적으로 방해하면 안된다.
     * 특정 주파수 대역만을 사용하면, 간섭/충돌이 지속되어서 다른 사용자와 동시 사용 불가능
  * 넓은 주파수 대역으로 확산해서 신호를 전송:
    * 간섭/충돌은 일시적, 동시 사용을 해도 통신 가능
    * 확산 사용 방식은 사용자별로 다르게
  * 원래, 신호 방해를 무산시키기 위한 군사용으로 설계
  * Code Division Multiplexing도 포함

#### 확산 스펙트럼 예 : 블루투스
 * 주파수 호핑(Frequency Hopping):
   * 임의의 주파수 시퀀스로 전송
   * 송신자와 수신자는 다음을 공유:
     * Psudo random number generator
     * 초기값 (seed)
   * Bluetooth 사용
   * 초기 802.11은 79 x 1MHz-wide 주파수 대역을 사용

#### 확산 스펙트럼 예 : 무선 LAN
 * 직접 시퀀스(Direct Sequence):
   * 각 비트에 대해, 해당 비트를 n개의 임의 비트와 XOR한 비트열을 전송
   * 송/수신자는 임의의 n비트 시퀀스를 알고 있음.:
     * n-bit chipping code
   * 802.11은 11-bit chipping code 사용

### 매체 접근
 * 다른 무선기기와의 주파수 공유 문제는 Spread Spectrum으로 해결
 * 같은 BSS, 또는 주변의 같은 802.11 기기 사이에서의 채널 사용문제는 여전히 해결 필요 => 접근 제어, 즉, MAC 필요
 * 기본적으로 이더넷과 유사
 * 단, 매체 특성 때문에:
   * 충돌 인식(Collision Detection)에 hidden node, exposed node라는 새로운 문제가 발생

### IEEE 802.11: multiple access
 * avoid collisions : 2* nodes transmitting at same time
 * 802.11 : CSMA - sense before transmitting:
   * don't collide with ongoing transmission by other node
 * 802.11 : no collision detection:
   * difficult to receive (sense collisions) when transmitting due to weak received signals(fading)
   * can't sense all collisions in any case : hidden terminal, fading
   * goal : avoid collisions : CMSA/CA

### 충돌 회피(Collisions Avoidance)
 * MACAW (Multiple Access with Collision Avoidance for Wireless)
 * 송신자는 RequestToSend(RTS) frame을 전송
 * 수신자는 ClearToSend(CTS) frame을 전송
 * 다른 노드:
   * CTS를 들으면 : keep quite
   * RTS는 들리지만, CTS는 들리지 않는다면 : ok to transmit
 * 수신자는 프레임을 받은 후, ACK를 전송 (MAC 수준의 ACK):
   * 다른 노드들은 ACK가 전송될 때까지 기다린다.
 * 충돌 문제:
   * 두 개 이상의 노드가 RTS를 동시에 보낼 때
   * 충돌 인식 방법 없음 : 일정 시간 안에 CTS를 받지 못하면 충돌
   * exponential backoff
 * 충돌 비용 개선
 * RTS/CTS threashold:
   * 작은 프레임은 RTS/CTS 교환 없이 보내는 것이 유리

### 이동성(Mobility) 지원
 * Case 1 : ad hoc networking
 * Case 2 : access poitns (AP):
   * 고정 위치
   * 각 이동 노드는 하나의 AP와 연계

### BSS 접속/가입 (이동 감지)
 * 스캐닝 (Scanning) : AP 선정 작업:
   * 이동 노드가 Probe frame 전송
   * Probe를 받은 모든 AP는 ProbeResponse frame 응답
   * 노드가 AP를 선택: AssociateRequest frame 전송
   * AP는 AssociationResponse frame을 응답
   * 새 AP가 이전 AP에게 유선 네트워크를 통해 이를 통보
 * 스캐닝 시점:
   * 능동적 : when join or move
   * 수동적 : AP가 주기적으로 Beacon frame을 전송
 * 이동 경우, 프레임 포워딩(forwarding) 문제는 별도

### 매체접근제어(MAC) 비교
 * 이더넷 : CSMA/CD
 * 토큰링 : Token Passing
 * 무선LAN : CSMA/CA
 * 충돌에 대비하는 방법 :
   * 이더넷 : 소모 비용 감소
   * 토큰링 : 충돌 감소
   * 무선 LAN : 소모 비용 감소
 * MAC Overhead : 토큰 방식은 오버헤드가 크다.

## 네트워크 어댑터
 * 데이터 링크 기능이 구현되는 곳:
   * 프레이밍(Framing)
   * 오류 검출(Error Detection)
   * 매체 접근 제어(Media Access Control)

### 호스트의 관점(제어)
 * 상태 제어 레지스터 (Control Status Register) (CSR):
   * 특정 메모리 주소로 사용가능
   * CPU는 읽고 쓸 수 있음
   * CPU는 어댑터에게 명령
   * 어댑터는 CPU에게 정보를 알려줌

### 호스트와 어댑터 사이에서의 프레임(데이터) 이동
 * 직접 메모리 접근(DMA)
 * 프로그램 I/O (PIO)

# 3장 패킷스위칭(Packet Switching)
## 확장성 있는 네트워크(Scalable Networks)
 * 교환기: 입력 포트에서 출력 포트로 패킷을 보냄. 출력 포트는 패킷 헤더의 목적지 주소에 기초해서 선택됨
 * 지리적으로 광범위한 네트워크 구성 가능
 * 많은 수의 호스트를 지원하는 네트워크 구성 가능
 * 기존 호스트들의 성능에 영향을 주지 않고새로운 호스트를 추가 가능(스위치 용량의 한도내에서)

## 데이터그램 (Datagrams)
 * 연결 설정 단계가 없음
 * 각각의 패킷은 독립적으로 포워드
 * 우편 시스템과 유사한 형태
 * 비연결성(connectionless) 모델
 * 각 스위치는 포워딩(라우팅) 테이블을 유지

## 가상회선 스위칭(Virtual Circuit Switching)
 * 명시적인 연결 설정 및 해지 과정
 * 이어지는 패킷 역시 같은 경로를 따라 전달
 * 전화와 유사한 형태
 * 연결성(connection-oriented)모델이라고도 불림
 * 각 스위치는 가상회선 테이블을 유지

## 가상회선 대 데이터그램
|                  | VC(가상회선)                                                                                                                            | DG(데이터그램)                                                                                           |
| -                | -                                                                                                                                       | -                                                                                                        |
| 연결설정시간     | 일반적으로 첫번째 데이터를 보내기 전에 연결 설정을 위한 왕복 지연시간(RTT)을 기다려야함. (해당 가상 회선에 대한 테이블 entry) 생성      | 연결 설정을 위한 왕복 지연시간을 기다릴 필요가 없음; 호스트는 데이터가 준비가 되자마자 바로 보낼 수 있음 |
| 주소 오버헤드    | 연결 요청에는 목적지의 완전한 주소를 포함하지만, 데이터 패킷에는 작은 식별자(identifier)만 포함하면 되므로 패킷 헤더의 오버헤드가 작다. | 매 패킷은 목적지의 완전한 주소를 가져야 하기 때문에, 패킷당 오버헤드가 연결성 모델보다 크다              |
| 패킷 포워딩 시간 | 간단한 VC-ID 테이블 검색 => 빠른 시간에 가능(HW 처리도 가능)                                                                            | 모든 주소에 대한 포워딩 테이블 검색 -> 늦어질 가능성 높음                                                |
| 장애극복         | 스위치/링크가 고장나거나 비정상적으로 연결이 끊어지면, 새로운 연결을 설정해야 함 -> stateful                                            | 패킷이 독립적으로 다루어지기 때문에 고장난 링크나 노드를 우회하여 라우팅 가능 -> stateless of soft state |
| 자원 예약        | 연결 설정시 자원 예약이 가능                                                                                                            | 발신지 호스트는 네트워크가 패킷을 전달할 수 있는지, 또는 목적지 호스트가 동작 중인지도 알 수 없음        |

## 소스 라우팅(Source Routing)
 * 주소는 발신지로부터 목적지까지 경로의 포트번호를 포함하고 있음

## 스위치 성능
 * 스위치는 범용 워크스테이션으로 만들 수 있다
 * 총 대역폭(Aggregate bandwidth):
   * I/O 버스 대역폭의 1/2
   * 용량은 스위치에 연결된 모든 호스트에서 공유됨
   * 예: 800Mbps 버스는 100Mbps 포트 4개를 지원할 수 있음
 * 초당 처리할 수 있는 패킷 수:
   * 스위치의 패킷 처리 능력:
     * pps(packet per second)
   * 초당 15,000 - 100,000 패킷 정도
   * 예: 64-byte 패킷이라면:
     * 7.69-51.2Mbps을 의미함
   * 작은 패킷을 스위치하는 경우 성능 결정 요소

## 브리지 및 확장 LAN (Bridges and Extended LANs)
 * LAN의 물리적인 제한 + 트래픽 분리
 * 두개 또는 그 이상의 LAN들을 repeater/bridge를 이용하여 연결
 * 브리지에 의해서 연결된 LAN의 집합을 extended LAN(확장 LAN0이라고 함)
 * 확장 LAN이 보편화:
   * (LAN, extended LAN) => (LAN segment, LAN)

### 브리지(Bridge)의 동작
 * 동작: 수신(Accept) 및 포워딩(forward) : 스위치 => 필터링(filtering); 리피터와 차이
 * 여러 개의 포트를 가지는 브리지 => LAN 스위치
 * Level-2 (패킷 헤더를 붙이지 않음); (라우터와의 큰 차이점)

### 계층-2(Level-2) 연결
 * 브리지는 네트워크 주소를 갖지 않음:
   * 또, 별도의 헤더도 붙이지 않음
   * 네트워크 계층에서 보면, 브리지는 invisible; 즉, link component
   * 따라서, 브리지로 연결된 (확장)LAN 은 하나의 네트워크

### 학습 브리지(Learning Bridges)
 * 불필요할 때는 포워드를 하지 않음
 * 포워딩 테이블의 유지
 * 발신지 주소에 기초해서 테이블의 엔트리를 작성
 * 표는 성능 개선이 목적이므로 완벽할 필요 없다.
 * 브로드캐스트 프레임은 항상 포워드
 * Soft-state table

### Switching Hub: traffic isolation
 * switch installation breaks subnet into LAN segments
 * switch filter packets:
   * same-LAN-segment frames not usually forwarded onto other LAN segments
   * segments become separate collision domains

### 브리지/LAN 스위치의 한계
 * 확장성이 없음:
   * 스패닝 트리 알고리즘은 확장성이 부족함
   * 브로드캐스팅도 확장성에 제약
   * => VLAN (Virtual LAN)
 * 이질성(heterogenity)을 허용하지 않음
 * 투명성에 주의; 즉, 노드에서 브리지는 보이지 않음

## 셀스위칭 (Cell Switching): ATM
### 개요
 * ATM(비동기 전송 모드)
 * 전화회사가 만든 패킷스위칭 네트워크 (극단적인 연결성 패킷 스위치)
 * 작은 고정길이 패킷:
   * cell이라고도 함 : 5-byte 헤더 + 48-byte 페이로드
 * Signalling(연결 설정) 프로토콜 : Q.2931
 * 한때, WAN과 LAN 환경에서 모두 사용 : 인터넷 대체 추진
 * 현재 LAN에서는 Switching Ethernet에 의해 퇴출
 * 보통 광케이블을 사용하는 장거리 연결에 사용:
   * SONET interface 카드를 이용
 * 현재는 인터넷의 아래 계층, 즉 이더넷 수준의 역할을 수행

### Cells
 * 가변길이 대 고정 길이:
   * 최적의 고정길이는 없음:
     * 작다면 데이터에 비해 헤더가 차지하는 오버헤드가 크다
     * 크다면 작은 메시지에 대해서 효율이 낮다.
   * 고정 길이는 하드웨어로 스위치하는 것이 쉽다:
     * 보다 간단함
     * 병렬 처리가 가능
 * 작은 길이가 큐잉을 개선:
   * 링크를 스케쥴링하는데 보다 세밀한 선점(preemption)이 가능
 * 즉시 전달과 유사하게 동작

### ATM 셀
 * 패킷화에 소요되는 시간(packetizing delay) : 가장 중요한 cell size 선택 이유
 * 셀로 음성을 전송하는 경우:
   * 전화는 delay에 민감: 음성 전송에 소요되는 총 지연시간은 500ms 이하이어야 함
   * 음성은 64Kbps로 디지탈 인코드를 함(8KHz를 8-bit로 샘플)
   * 셀을 전송하기 전에 셀을 채울 만큼의 샘플이 필요

### 셀 형식(Cell Format)
 * 호스트와 스위치 사이의 형식(host-to-swtich format)
 * GFC : Generic Flow Control
 * VCI : Virtual Circuit Identifier
 * VPI : Virtual Path Identifier
 * Type
 * CLP : Cell Loss Priority
 * HEC : Header Error Check

# 4장 인터네트워킹(Internetworking)
## 인터넷 서비스 모델
 * 인터네트워크:
   * 네트워크의 연속
   * Concatenation of Networks
 * 네트워크 계층 위에서 표준화:
   * 다양한 네트워크들을 링크로 간주해서 그대로 사용
   * 전역 주소 체계(Global Addressing Cheme) 필요
 * 프로토콜 스택

## 패킷 전달 서비스 모델
 * 전역 주소 체계 (Global Addressing Scheme)
 * 비연결성 (데이터그램-기반)
 * 최선 노력 전달 (신뢰성 없는 서비스):
   * 패킷이 상실될 수 있음
   * 패킷이 순서가 뒤바뀌어 올 수 있음
   * 중복된 패킷이 올 수 있음
   * 패킷이 오랜 시간 동안 지연될 수 있음
 * 단편화 및 재조립

## IP 패킷 헤더 형식
 * 버전 Version : 4bit
 * Hlen(4) : Header Length
 * TOS(8) : 서비스의 종류, 일반적으로 사용되지 않음
 * Length(16) : 데이터그램 전체의 바이트 단위 길이
 * Ident(16) : 단편화(fragmentation)에 사용됨
 * Flags/Offset(16) : 단편화에 사용됨
 * TTL(8) : 데이터그램이 최대로 방문할 수 있는 홉의 수
 * Protocol(8) : 역다중화키
 * Checksum(16) : 헤더의 체크섬
 * DestAddr & SrcAddr(32) : 발신지 및 목적지 주소

## 단편화와 재조립(Fragmenation and Reassembly)
 * 각 네트워크는 나름대로의 MTU(Maximum Transmission Unit)을 가진다.
 * 방법:
   * 필요할 때만 분할(MTU < Datagram)
   * 발신지에서의 단편화는 지양 (cf. IPv6에서는 발신지에서 PathMTU)
   * 재단편화(refragmentation) 가능
   * 분할된 단편은 독립적인(self-contained) 데이터그램
   * 목적지까지 재조립을 미룸
   * 상실된 단편이 있으면 재조립 불가능

## 전역 주소(Global Addresses)
 * 특성:
   * 전역적으로 유일하다
   * 계층적(hierarchical): 네트워크 + 호스트:
     * 같은 네트워크에 있는 노드들의 네트워크 주소부분은 같아야한다.
 * Class:
   * A class : 0으로 시작, 초기 0을 제외 7비트가 네트워크 주소 (나머지 24 비트가 호스트부)
   * B class : 10으로 시작, 초기 10을 제외한 14비트가 네트워크 주소 (나머지 16비트가 호스트부)
   * C class : 110으로 시작, 초기 110을 제외한 21비트가 네트워크 주소(나머지 8비트가 호스트부)

## 데이터그램 포워딩 : IP의 실제 동작
 * 방법:
   * 모든 데이터그램은 목적지의 주소를 포함한다.
   * 데이터그램을 받은 IP는:
     * 목적지 네트워크가 직접 연결되어 있다면, 호스트로 직접 포워드 함.
     * 목적지 네트워크가 직접 연결되어 있지 않다면, 다른 라우터에게 포워드함
   * 포워딩 테이블은 네트워크 번호에 대한 다음 홉을 가리키고 있다.
   * 각 호스트는 디폴트 라우터를 가지고 있다.
   * 각 라우터는 포워딩 테이블을 유지

## 주소 번역(Address Translation)
 * 인터네트는 논리적(가상) 네트워크:
   * 계층 하위에 있는 물리적 네트워크/링크에게 전달을 위임
 * 위임할 때, IP 주소를 해당 물리적(physical) 주소로 변환해야 함.
 * 필요한 주소를 어떻게 알아내는가?:
   * 테이블 기반(IPv4)
   * IP 주소의 호스트 부분에 물리적 주소를 인코드 시켜서 넣어줌(IPv6)
 * ARP(Address Resolution Protocol):
   * IP주소와 물리적 주소가 바인딩되어 있는 테이블 구축 담당
   * IP주소가 테이블에 없다면 요청을 브로드캐스트
   * 해당 호스트는 자신의 물리적 주소를 보내줌
   * 오랫동안 사용되지 않은 엔트리는 없애준다.
   * 프로토콜 계층에서 2계층과 3계층 사이에 존재한다.

### ARP 프로토콜
 * Request format:
   * HardwareType, ProtocolType, HLEN & PLEN, Operation, Source/Target Physcial/Protocol Addresses
 * 특징:
   * 테이블의 엔트리는 약 10분의 타임아웃
   * 요청에 대한 목적지에서는 발신지 주소로 테이블을 갱신
   * 엔트리가 이미 있다면 테이블을 갱신(+ 타임아웃 연장)

## 호스트 구성(Configuration) : DHCP
 * IP 주소 배정의 문제:
   * IP 주소는 네트워크의 구조를 반영하여야함
   * 즉, 같은 네트워크에 있는 다른 호스트들의 주소와 앞 부분이 같아야한다.
 * IP주소 이외에도 구성 정보가 필요하다(default router, name server)
 * 자동 구성 기능 필요 : DHCP(Dynamic Host Configuration Protocol)

### DHCP 동작
 * DHCP 서버:
   * a pool of available address를 관리
   * 클라이언트의 요청에 대해 구성 정보를 제공
   * address lease도 가능
 * DHCP relay:
   * 구성 정보 요청을 서버로 relay
 * Server discovery:
   * DHCPDISCOVER 메시지를 브로드케스트

## 공유기
 * 하나의 인터넷 주소를 여러 호스트가 공유해서 사용한다는 말에서 유래
 * 대부분 wireless router 기능을 포함한다.
 * 인터넷 서비스 업체(ISP)는 인터넷 링크 연결을 제공하면서, 하나의 IP주소를 DHCP로 할당
 * 공유기는 내부 LAN의 여러 호스트들에게 인터넷 접근을 제공:
   * IP 패킷을 내외부로 전달: IP라우터
   * LAN 내부에서 사설 IP 주소 사용 지원 : DHCP 서버
   * 하나의 IP주소를 여러 호스트가 사용: NAT(Network Address Translation)
   * 유선 LAN 지원 : switch
   * 무선 LAN 지원 : AP(Access Point)
   * 보안 지원 : firewall(방화벽)

## ICMP(Internet Control Message Protocol)
 * IP 동작을 보조하기 위한 제어 프로토콜:
   * IP 자체에 포함시키지 않고, 별도의 프로토콜 (out-of-band 기법)
 * 기능 면에서 보며,ㄴ IP의 동료(companion protocol)
 * 힌트 수준: 반드시 필요하지는 않음 => IP로 전송
 * 제어 작업 내용:
   * 응답(echo) - ping
   * 라우터의 변경(라우터에서 발신지로)
   * 목적지에 도착하는 것이 불가능:
     * 프로토콜, 포트, 호스트 등의 이유
   * TTL을 초과한 경우:
     * 데이터그램이 계속 네트워크 배회하는 일이 없음
   * 체크섬이 실패한 경우
   * 재조립을 실패한 경우
   * 단편화를 할 수 없는 경우

## 가상 네트워크(Virtual Networks)
 * 실제의 물리적 연결과 독립적으로 연결/구축되는 네트워크:
   * 물리적 네트워크 위에 떠있는 가상의 네트워크
 * VPN(Virtual Pivate Networks):
   * 전용선 대신 공용 네트워크를 이용하여 사설망 구축
   * IP 망을 통한 사설망 구축:
     * IP는 모든 노드가 서로 통신; connectivity 제어가 안됨
     * IP 터널링 기법

## IP 터널링(IP Tunneling)
 * 임의의 네트워크 사이에 두고 있는 한쌍의 노드 사이를 연결하는 점대점 링크
 * 즉, 라우터 간의 가상 링크(virtual link)
 * 구현:
   * 링크 양 끝 노드를 발신지/목적지로 하여 IP encapsulation

## 터널링/가상 네트워크 사용이유
 * 보안:
   * 공용 네트워크 안에서 사설 링크 구현
   * 암호화와 함께 사용 가능
 * 특수 기능 구현:
   * 특수 기능을 가지는 가상 네트워크 구현
   * ex) 멀티캐스트 라우팅 기능을 가지는 라우터들의 네트워크 구축
 * 비 IP 패킷의 IP망을 통한 전달:
   * ex) IPv6 패킷의 전달

## 확장성 문제(Scalability Issues)
 * Flat vs hierarchical address
 * IP는 주소를 계층화하여 중간 라우터에서는 호스트 주소를 알 필요 없이 설계 되었으나 다음과 같은 문제가 발생한다:
   * 주소 공간의 비효율성:
     * 예 : 두 개의 호스트만을 가진 C클래스 네트워크
   * 너무 많은 수의 네트워크 개수:
     * 오늘날 인터넷은 수만개의 네트워크를 가지고 있다.
     * 라우팅 테이블의 크기에 확장성 문제가 발생하며, 이는 라우트 전달 프로토콜에서도 발생한다.

### 서브네팅(Subnetting)
 * 주소/라우팅 계층 구조에 따른 다른 단계를 추가시키는 기능
 * 서브넷 마스크(subnet mask)는 클래스의 가변적인 분할을 정의한다.
 * IP 주소에서 네트워크 주소를 떼어내는 방법이 변경되었다.:
   * 과거에는 IP의 초기 비트를 기준으로 네트워크 주소를 분리하였지만, 이제는 비트마스킹을 통해 처리한다.
 * 서브넷은 외부네트워크에서 보이지 않는다.

### 포워딩 알고리즘
 * 특징:
   * 대응되는 것을 찾을 수 없다면 디폴트 라우터를 사용
   * 서브넷 마스크에서 모든 1이 연속적일 필요는 없음
   * 하나의 물리적인 네트워크에 여러 개의 서브넷이 존재할 수 있음
   * 서브넷은 인터넷의 나머지 부분에서 보이지 않음

## Classless 라우팅(CIDR)
 * 수퍼넷팅(Supernetting), CIDR(Classless Inter-Domain Routing)
 * 기본적으로, 기존 A,B,C class와 무관하게 필요한 만큼 할당
 * 단, 지역적으로 가까운 네트워크에 대해서 연속적이 네트워크 번호 묶음을 할당
 * 각 묶음(block)은 다음과 같은 쌍으로 표현 (first_network_address, count)
 * 현실적으로, 묶음(블록) 크기는 2의 제곱 형태로 제한:
   * 블록 사이즈를 알아내기 위해서 비트마스크를 사용(CIDR mask) => prefix 길이로 표현 가능
 * 결론: prefix 길이로 어느 자리에서나 네트워크 주소 경계를 정의

 * Classless 라우팅 : Aggregation (병합)

## 차세대 IP (Next Generation IP(IPv6))
 * 주요 기능:
   * 128-bit 주소
   * 멀티캐스트
   * 실시간 서비스(Real-time service) 대비
   * 인증 및 보안 (Authentication and security)
   * 자동 구성 (Autoconfiguration)
   * 종단간 단편화(End-to-end fragmentation)
   * 프로토콜 확장

### IPv6 주소
 * Classless 주소/라우팅(CIDR과 유사)
 * 표기법:
   * 연속적인 0은 압축됨
   * IPv6은 IPv4 주소와 호환 가능
 * 주소 할당(네트워크 제공자 기반):
   * Aggregatable Global Unicast Addressing
   * Subnet / Classless 개념 모두 도입

### IPv6 헤더
 * 40-바이트 기본 헤더
 * 확장 헤더:
   * 고정된 순서, 대부분 고정 길이
   * 단편화(fragmenation)
   * 소스 라우팅
   * 인증 및 보안
 * flow:
   * 같은 수준의 서비스로 처리되어야하는 패킷의 연속(sequence of packets)
 * FlowLabel: 단순 식별자

### IP NextHeader
 * 상위 프로토콜 DemuxKey
 * optional header 유무/종료 표시 및 payload 시작점 표시

## 이통 호스트에 대한 라우팅
 * 문제:
   * IP 주소는 계층적; 주소에 네트워크 주소 부분 포함
   * 호스트가 이동하여 다른 네트워크에 접속되면, 패킷 전달 불가능
 * 접근 방법:
   * 새 IP 주소 할당 => 통신 중단; 서비스 중단
   * Mobile IP:
     * 호스트의 이동이 투명하도록
     * 기존 통신 소프트웨어 및 라우터에 변경 없이 이동 호스트 지원

## Mobile IP
 * 구성 요소:
   * home address : 이동 호스트의 영구적인 IP 주소
   * Home Agent(HA) : 이동 호스트의 홈 네트워크에 있는 라우터
   * Foreign Agent(FA) : 이동 호스트가 접속되어 있는 외부 네트워크의 라우터
   * care-of-address(COA) : 이동 호스트에 대한 패킷을 보낼 주소; 대개 FA 주소
 * 구성 설정:
   1. HA와 FA는 주기적으로 자신의 존재를 홍보
   2. 이동 호스트는 HA의 주소 인식
   3. 이동 호스트가 어떤 외부 네트워크에 접속하면 => FA 인식; HA의 주소를 알림
   4. FA는 HA에게 care-of-address 통보

### Mobile IP의 패킷 전달
 * 이동 호스트에서 송신하는 패킷의 전달:
   * IP 패킷 포워딩 과정에서 source address는 참조되는 않음.
   * 따라서, 기존과 동일(보안, 멀티캐스트 제외)
 * 이동 호스트로의 패킷 전달

### 세부 문제/기술
 * HA가 이동호스트로 향하는 패킷을 가로채는 방법: Proxy ARP
 * HA가 이동호스트로의 패킷을 FA에게 보내는 방법: 터널링
 * FA가 수신된 패킷을 이동호스트로 전달하는 방법 : IP 포워딩을 사용하지 않고, Hardware 주소로 직접
 * FA와 이동호스트가 동일한 경우 (Collocated COA):
   * FA가 없는 네트워크로 이동 등
   * 처리 간단; 단, 동적으로 IP 주소를 배정 받을 수 있어야 함.
 * 보안 문제:
   * 제3자가 FA를 자처하며, 이동호스트로의 패킷을 interception

### 경로 최적화
 * triangle routing problem
 * HA가 송신자에게:
   * binding update 메시지를 보내서
   * 이동호스트의 care-of-address를 알려줌
 * 송신자는:
   * Binding cache를 유지하면서
   * FA로 직접 터널링

