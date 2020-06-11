---
layout  : wiki
title   : simple-ssd
summary : 
date    : 2020-06-10 19:39:41 +0900
lastmod : 2020-06-11 20:24:34 +0900
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
