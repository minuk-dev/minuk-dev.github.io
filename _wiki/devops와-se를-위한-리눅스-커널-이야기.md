---
layout  : wiki
title   : DevOps와 SE를 위한 리눅스 커널 이야기
date    : 2022-08-22 13:49:39 +0900
lastmod : 2022-08-30 18:17:47 +0900
tags    : [book, devops, se, linux]
draft   : false
parent  : [devops]
---

## 간략 설명
- 이 책은 실습과 개념, Tip 이 동시에 존재하는 책이다.
- 개념, 실습에 대한 내용은 책을 반드시 참고하자. 실험이 알차다.
- 여기선 Tip 에 해당하는 각 챕터의 요약부분만을 정리해둔다.

## 1. 시스템 구성 정보 확인하기
- demidecode 명령을 통해서 CPU, 메모리, BIOS 등의 정보를 확인할 수 있다.
- CPU 정보는 `/proc/cpuinfo` 파일을 통해서도 확인할 수 있다.
- free 명령을 통해서 시스템에 설치된 메모리의 전체 크기를 알 수 있다.
- 시스템에 마운트된 블록 디바이스의 정보는 df 명령을 통해 확인할 수 있다.
- 네트워크 카드 정보는 ethtool 명령을 통해서 확인할 수 있다.
- ethtool 명령 중 -g 옵션으로 네트워크 카드에 설정된 Ring Buffer의 최대 크기와 현재 크기를 확인할 수 있다.
- ethtool 명령 중 -k 옵션으로 네트워크 카드의 부수적인 기능들을 확인할 수 있다.
- ethtool 명령 중 -i 옵션으로 네트워크 카드가 사용 중인 커널 드라이버의 정보를 확인할 수 있다.

## 2. top을 통해 살펴보는 프로세스 정보들
- top 명령으로 현재 시스템의 CPU, Memory, swap의 사용량 및 각 프로세스들의 상태와 메모리 점유 상태를 확인할 수 있다.
- top 명령의 결과 중 VIRT는 프로세스에게 할당된 가상 메모리 전체의 크기를 가리킨다. RES는 그 중에서도 실제로 메모리에 올려서 사용하고 있는 물리 메모리의 크기, 그리고 SHR은 다른 프로세스와 공유하고 있는 메모리의 크기를 의미한다.
- 커널은 프로세스가 메모리를 요청할 때 그에 맞는 크기를 할당해주지만 해당 영역을 물리 메모리에 바로 할당하지는 않는다. Memory Commit 참고- `vm.overcommit_memory` 는 커널의 Memory Commit 동작 방식을 변경할 수 있게 해주는 커널 파라미터이다.
- top으로 볼 수 있는 프로세스의 상태 중 D는 I/O 대기중인 프로세스, R은 실제 실행 중인 프로세스, S는 sleep 상태의 프로세스를 의미한다. T는 tracing 중인 프로세스, Z는 좀비 상태의 프로세스를 의미한다.
- 프로세스에는 우선순위가 있어 우선순위값이 더 작을 수록 빨리 실행된다. 우선순위는 nice 명령을 통해서 조절될 수 있다.

---
- 개인 생각: nice를 조절해본 경험이 없는데, 조절할일이 많나?

## 3. Load Average와 시스템 부하
- Load Average는 실행 중 혹은 실행 대기 중이거나 I/O 작업 등을 위해 대기 큐에 있는 프로세스들의 수를 기반으로 만들어진 값이다.
- Load Average 자체의 절대적인 높음과 낮음은 없다.
- 커널에도 버그가 있을 수 있으므로 Load Average 값을 절대적으로 신뢰해서는 안된다.
- vmstat 툴도 시스템 부하를 측정하는데 사용할 수 있다.
- `/proc/sched_debug`는 nr_running과 runnable tasks 항목에서 각 CPU에 할당된 프로세스 수와 프로세스의 PID 등 정보를 확인할수 있다.

## 4. free 명령이 숨기고 있는 것들
- free 명령으로 볼 수 있는 buffers 는 파일 시스템의 메타 데이터 등을 저장하고 있는 블록 디바이스의 블록을 위한 캐시이다.
- free 명령으로 볼 수 있는 cached는 I/O 작업의 효율성을 위해 한번 읽은 파일의 내용을 저장하는 데 사용하는 캐시이다.
- buffers와 cached는 미사용중인 메모리 영역을 시스템의 효율성을 위해서 커널이 사용하고 있는 것이며, 프로세스가 요청하면 이 영역을 해제하여 프로세스에게 전달해 줄수 있다.
- `/proc/meminfo` 에서 보이는 anon 영역은 프로세스에서 사용하는 영역, file 영역은 I/O 를 위한 캐시이다.
- slab 영역은 커널이 사용하는 캐싱 영역을 의미, dentry cache, inode cache 등 다양한 캐싱 용도로 사용된다.

## 5. swap, 메모리 증설의 포인트
- 버디시스템
- swap 을 사용할 경우 성능하락이 생길수 있다.
- swap 영역을 사용할 때에는 어떤 프로세스에서 swap 영역을 사용하는지 정확하게 알 필요가 있으며 smem 이라는 툴을 이용해 빠르게 확인할 수 있다.
- `vm.swappiness` 파라미터를 통해서 메모리 재할당시, swap을 사용하게 할지 페이지 캐시를 해제하게 할지 비율을 조절할 수 있다.
- `vm.vfs_cache_pressure` 파라메터를 통해 메모리 재할당시, 페이지 캐시를 더 많이 해제할지 vfs 관련 cache를 더 많이 해제할지 비율을 조절할 수 있다.

## 6. NUMA, 메모리 관리의 새로운 세계
### 개인 의견
- NUMA는 예전에 논문 볼때 봤던건데, 최근 본 kubecon에서도 관련 자료가 있고, 이 책에도 있어 좀 놀랐다. 이게 이렇게나 기본 상식인지 몰랐다.
- 내용 자체는 좋으나 난이도가 있다고 생각해서, 모두 적지는 않는다.

### 요약
- NUMA : Non-Uniform Memory Access, 하드웨어 설계에 따른 cpu에 따라 특정 메모리에 접근하는 속도가 각기 다르다.
- numastat, numactl 명령어를 사용해서 NUMA 의 상태, 제어를 할 수 있다.
- `/proc/<pid>/numa_maps` 에 process 별 numa 정보가 확인 가능하다.
- numad 는 데몬으로 상주하면서 프로세스의 numa 상태를 최적화한다. 하지만 항상 최적화가 좋은건 아니다.
- `vm.zone_reclaim_mode` 는 zone 에서 최대한 재할당해서 메모리를 확보하려고 노력할지, 최대한 다른 zone 을 통해서 메모리를 확보할지를 결정하는 변수이다.
- numa 정책:
  - bind : 특정 노드에서 메모리를 할당받도록 강제한다.
  - preferred : 선호하는 노드를 정하되, 부족하면 다른 곳에서 받는다.
  - interleave : 최대한 여러 노드에서 균등하게 받도록 한다.
- NUMA 아키텍쳐와 관련된 workload는 요구되는 memory size와 process의 thread 방식에 가장 큰 영향을 받는다.

## 7. TIME_WAIT 소켓이 서비스에 미치는 영향
### 개인 의견
- 워낙에 유명한 문제이기도 하고, 운영을 배울때 거의 단골로 나오는 내용이라 정리한다는 느낌으로만 봤다.

### 요약
- TIME_WAIT 소켓은 먼저 연결을 끊는 쪽에서 발생한다.
- 클라이언트 입장에서의 TIME_WAIT 소켓은 tw_reuse 파라미터를 통해 재사용할 수 있기 때문에 로컬 포트 고갈 문제는 발생하지 않는다.
- 불필요한 TCP 3 way handshake가 일어날 수 있기 때문에 가급적, Connection Pool 방식을 적용해 TIME_WAIT 소켓을 줄이도록 한다.
- 서버 입장에서는 TIME_WAIT 소켓은 tw_recycle 파라미터를 통해 빠르게 회수 할 수 있지만, 권장되지는 않는다. 근본적인 문제(connection 이 지나치게 낭비된다거나 등)를 찾아서 해결해야한다.
- 서버 입장에서 keepalive 기능을 켬으로써 불필요한 TCP 3way handshake 를 줄일 수도 있고 TIME_WAIT 소켓도 줄일수 있다. 서비스의 응답 속도 향상이 가능하지만, keepalive 가 가져올수 있는 문제점이 있기에 사용 시 테스트를 반드시 해봐야한다. 자세한건 keepalive 관련 챕터 및 LB 관련 내용 참고
- TIME_WAIT 소켓은 정상적인 TCP 연결 해제를 위해 반드시 필요하다.

## 8. TCP Keepalive 를 이용한 세션 유지
- TCP Keepalive 는 커널레벨에서 종단 간의 세션을 유지시켜주는 기능을 한다.
- net.ipv4.tcp_keepalive_time 는 두 종단 간의 연결이 유지되어 있는지를 keepalive 패킷을 보내는 주기를 설정한다.
- net.ipv4.tcp_keepalive_probes 는 keepalive 패킷에 대한 응답을 받지 못했을 때 추가로 보내는 패킷의 개수를 지정한다.
- net.ipv4.tcp_keepalive_intvl은 keepalive 패킷에 대한 응답을 받지 못해서 재전송 패킷을 보낼 때 필요한 주기를 설정한다.
- tcp keepalive 설정으로 좀비 커넥션을 관리한다.
- HTTP keepalive가 설정되어 있다면 tcp keepalive 설정 값과 다르다고 해도 의도한 대로 동작한다. 혼동하지 말자
- LB 환경에서는 TCP Keepalive 가 설정되어 있지 않다면 LB Idle time 값을 참조해 설정해야 한다.

## 9. TCP 재전송과 타임아웃
- RTO(Retransmission Timeout)
- TCP 재전송은 RTO를 기준으로 발생한다.
- RTO 는 RTT를 기반으로 동적으로 생성된다.
- 관련 파라메터:
  - net.ipv4.tcp_syn_retries
  - net.ipv4.tcp_synack_retries
  - net.ipv4.tcp_orphan_retries
  - net.ipv4.tcp_retries1, net.ipv4.tcp_retries2
- 최소한 한번의 재전송은 견딜 수 있도록 connection timeout 은 3s, read tiemout 은 300ms 이상으로 설정하는 것이 좋다.
