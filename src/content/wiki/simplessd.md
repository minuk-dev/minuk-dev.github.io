---
layout  : wiki
title   : simple-ssd
summary : 
date    : 2020-06-10 19:39:41 +0900
lastmod : 2020-06-12 20:03:17 +0900
tags    : 
draft   : [ssd]
parent  : 
---


## 새롭게 알게된 것
 * [[gem5]]
## 다운로드

 * [simplessd 공홈](https://docs.simplessd.org/en/v2.0.12/instructions/start.html)
 * 하라는 대로 하면 된다. (FullSystem은 example 을 실행해도 그대로 안되서, 그냥 standalone 을 먼저 봐보기로 했다.)

---

## 문서 읽기
 * 그냥 홈페이지에 있는 문서를 읽어보자. 중요하니까 정리해놨겠지

---
### Host Interface Layer
 * HIL 이라고도 불리는 Host Interface Layer에 대한 설명이다.
 * HIL 은 host side에 있는 host controller, host controller 에게 추상화된 API를 제공해주는 SSD Interface

#### Host Controller
 * NVMe, SATA and UFS를 구현해 놓았으며, Open-Channel SSD 는 NVMe 를 상속받음. 
  
##### Host Interface
 * `hil/nvme/interface.hh` 에 `SimpleSSD::DMAInterface`를 상속하여 선언된 `SimpleSSD::HIL::NVMe::Interface` 를 보자.
  
```cpp
class DMAInterface {
 public:
  DMAInterface() {}
  virtual ~DMAInterface() {}

  virtual void dmaRead(uint64_t, uint64_t, uint8_t *, DMAFunction &,
                       void * = nullptr) = 0;
  virtual void dmaWrite(uint64_t, uint64_t, uint8_t *, DMAFunction &,
                        void * = nullptr) = 0;
};
```

```cpp
class Interface : public SimpleSSD::DMAInterface {
 protected:
  Controller *pController;

 public:
  virtual void updateInterrupt(uint16_t, bool) = 0;
  virtual void getVendorID(uint16_t &, uint16_t &) = 0;
};
```
 * `DMAInterface` 에서는 Direct Memory Access 를 위해서 `dmaRead`, `dmaWrite` 를 제공한다.
 * `updateInterrupt` 는 host의 특정 interrupt vector 에 interrupt를 보낸다.
 * `getVendorId` 는 NVMe의 `Identify Controller`가 vendor Id와 subsystem vendor ID를 필요로 하기 때문에 존재하는 method 이다.

##### Controller and Firmware
 * NVMe controller/firmware 는 아래 3가지 컴포넌트 (Controller, Subsystem and Namespace)로 구성된다.
   * Controller는 모든 queue 연산(SQ 에서 request 를 읽고, CQ에 request를 쓰고, 인터럽트를 발생시키는)을 담당한다.
   * Subsystem은 모든 NVMe의 admin commands를 다루며, Namespace를 제어하고, SSD Layer에 I/O를 실행한다.
   * Namespace는 모든 NVMe의 I/O commands 를 다룬다.
    
###### Controller
 * 모든 queue 연산을 담당하는 Controller는 `hil/nvme/controller.hh`에 `SimpleSSD::HIL::NVMe::Controller` 로 정의되어 있다.
 * `EventEngine`은 주기적으로 `Controller::work`를 유발시키며, 이때 주기는 `WorkPeriod` 설정값을 참조한다. 
 * `Controller::work` 는 설정된 중재 함수(`Controller::collectSQueue`)를 사용하여 모든 submission queue를 모은다.
 * 새로운 `Request`는 내부의 FIFO Queue(`Controller::lSQFIFO`) 에 넣어지며, 새로운 Request 가 있다면, `Controller:handleRequest`를 호출해야 한다. 이때 이 함수는 `AbstractSubsystem::submitReqeust`를 유발한다.

 * `AbstractSubsystem` 이 request를 처리하고 난 뒤, `Controller::submit` 함수가 불려지게 되며, 내부적으로 존재하는 FIFO Queue(`Controller::lCQFIFO`)에 완료된 걸 넣는다.
 * `Controller::submit` 함수는 `Controller::completion` 함수를 부르는 event를 관리한다.
 * `Controller::completion` 함수는 CQ entry를 채우고, `Controller::updateInterrupt` 를 사용해서 interrupt를 보낸다.
 * `Controller::updateInterrupt`는 단순히 `Interface::updateInterrupt`를 호출한다.

###### Subsystem
 * admin commmands를 다루는 NVMe Subsystem은 `hil/nvme/subsystem.hh`에 `SimpleSSD::HIL::NVMe::Subsystem` 으로 선언되어 있다.
 * Open-channel SSD Subsystem은 `hil/nvme/ocssd.hh`에 `SimpleSSD::HIL::NVMe::OpenChannelSSD`로 선언되어 있다.
 * 두 subsystem 모두 `hil/nvme/abstract_subsystem.hh`의 `SimpleSSD::HIL::NVMe::AbstractSubsystem` 을 상속한다.
 * 기본적으로 아래쪽 설명들은 NVMe subsystem 을 기반으로 하고 있는데, Open-Channel SSD 랑 사소한 차이만 있기 때문이다.

 * NVMe Subsystem은 2부분으로 나뉘는데, command handling, I/O request handling.
 * Subsystem이 여러 namespaces를 가질수 있으므로, Subsystem은 반드시 I/O requests 를 Namespaces 로부터 HIL의 SSD Interface로 넘겨줘야 한다.

 * 각 NVMe 명령들은
   * I/O 명령이라면, `Subsystem::submitCommand` 함수를 통해서 특정한 Namespace로 가지게 되며.
   * 관리용(admin) 명령이라면, `submitCommand` 함수는 OPCODE를 확인한 이후 적절한 함수를 호출하게 된다.
 * 모든 명령들은 완료됨을 알리기 위해서 `Controller::submit` 를 유발한다.

 * 특정한 I/O 함수들(`Subsystem::read, write, flush and trim`)이 불리게 된다면, I/O unit으로 번역된뒤, SSD Intreface의 함수들로 간다. (`HIL::HIL::read`, `HIL::HIL::write`, `HIL::HIL::flush` and `HIL::HIL::trim`);

 * SSD를 선형적으로 쪼개기 위해서, Subsystem은 multiple Namespaces를 유지한다.
   * 예를 들어 1TB SSD 가 4K 논리적 block을 사용한다고 하자. 이때 512GB, 256GB, 256GB 용량으로 3개의 Namespaces로 쪼갤수 있다.
   * Subsystem은 offset과 length를 찾아서 namespaces를 할당할 것이고, Subsystem은 할당되지 않은 공간을 처음 맞는 Namespaces에 할당한다.(first-fit). 만약 공간이 없다면 할당이 실패한다.

 * 각 Namespace 마다 offset과 length를 가지고 있으며, 이 값은 SSD interface를 위해 I/O unit으로 번역될때 쓰인다.
