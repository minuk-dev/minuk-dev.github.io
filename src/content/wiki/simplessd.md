---
layout  : wiki
title   : simple-ssd
summary : 
date    : 2020-06-10 19:39:41 +0900
lastmod : 2020-06-15 19:48:31 +0900
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

###### Namespace
 * I/O 명령을 다루는 NVMe Namespace는 `hil/nvme/namespace.hh`에 `SimpleSSD::HIL::NVMe::Namespace`로 선언되어 있으며. NVMe Subsystem과 비슷한 구조를 다룬다.(둘다 command를 다룬다.)
 * I/O  명령이 오면, Namespace 는 Subsystem의 해당 함수들을 호출한다.(`read`, `write`, `flush` and `trim`).

 
#### Serial AT Attachment
 * Serial AT Attachment - SATA 는 SSD와 HDD를 위한 전통적 interface이다.
 * SimpleSSD 에서는 Serial ATA Advanced host Controller Interface (AHCI) 1.3.1 에 기반한 STATA HBA를 구현하였고, Serial ATA Revision 3.0 에 기반을 둔 STAT PHY와 프로토콜을 구현하였다.

##### Host interface
 * `hil/sata/interface.hh`에 선언된 `SimpleSSD::HIL::SATA::Interface` 추상 클래스는 simulator에게 common API를 제공한다.
 * SimpleSSD-FUllSystem 에서 `src/dev/storage/sata_interrface.hh`에 선언된 `SATAInterface` 에서 어떻게 상속하는지 확인할 수 있다.

 * `SimpleSSD::HIL::SATA::Interface` 은 오직 `virtual void updateInterrupt(bool) = 0`를 interrupt posting 을 위해서 포함하고 있다.

##### Host Bus Adapter
 * SATA는 Host Bus Adapter(HBA) 라고 불리는 host sid controller 를 필요로 한다.
 * HBA 디자인은 다양하지만, 우리는 누구나 접근할수 있는 AHCI spcification을 사용했다.

 * 우리는 단 하나의 SimpleSSD 인스턴스만 HBA에 연결되기 때문에 단 하나의 port 만 구현했다.

 * `Interface`는 AHCI registser(Genetic Host Controller registers and Port registers)를 `HBA::writeAHCIRegister` 함수를 통해서 쓴다.
 * `PxCl` register에 bits를 쓰는 건 그에 대항하는 NCQ에 새로운 요청이 있다는걸 의미한다.
 * `HBA`는 내부 FIFO(`HBA::lRequestQueue`)에 request를 넣기 위해서 `HBA::processCommand` 를 호출한다.

 * NVMe와 동일하게 *Event Engine*은 주기적으로 `HBA::work` 함수를 호출하고, 이 함수는 `HBA::handleRequest` 함수를 호출하고와 `Device::submitCommand` 함수가 불리게 된다.

 * command handling 이후 `Device`는 `HBA::submitFIS` 함수를 FIS 응답을 host에게 돌려주기 위해서 부른다. `HBA::submitFIS` 함수는 `HBA::lResponseQueue`에 응답을 넣고, `HBA::handleResponse` 함수를 호출하는 event를 예약한다. `handleResponse` 함수는 내부의 FIFO에서부터 첫번째 response를 읽고, NCQ에 써서 `Interface::updateInterrupt` 함수를 사용해 Interrupt를 보낸다.

 
##### Device
 * `hil/sata/device.hh` 에 선언된 `SimpleSSD::HIL::SATA::Device`는 HBA와 연결하는 Device이다.
 * Device는 아래 나열된 ATA 명령어(ATA/ATAPI Command Set -2 (ACS-2) 와 (AT Attachment 8 - ATA/ATAPI Command Set (ATA8-ACS))를 다룰수 있다.
   * `FLUSH CACHE`
   * `FLUSH CACHE EXT`
   * `IDENTIFY DEVICE`
   * `READ DMA`
   * `READ DMA EXT`
   * `READ FPDMA QUEUED`
   * `READ SECTOR`
   * `READ SECTOR EXT`
   * `READ VERIFY SECTOR`
   * `READ VERIFY SECTOR EXT`
   * `SET FEATURE`
   * `WRITE DMA`
   * `WRTIE DMA EXT`
   * `WRITE FPDMA QUEUED`
   * `WRTIE SECTOR`
   * `WRTIE SECTOR EXT`
* Device 의 구현이 NVMe Subsystem에 비해 간단해 보일수 있는데, 이는 Namespace를 관리할 필요가 없기 때문이다.
* 모든 명령어들은 `Device::submitCommand` 함수를 통과하며 적절하게 다루어진다.
* 완료 이후, 각 명령어들은 명령의 결과를 `HBA`에게 보고하기(report) 위해서 `HBA::submitFIS`를 호출한다.
* I/O 와 관련된 `READ*`, `WRITE*` and `FLUSH*` 는 SSD Interface의 함수 (`HIL::HIL::read, write and flush`) 를 호출한다.

#### Universal Flash Storage
 * Universal Flash Storage - UFS : 모바일용 저장소를 위해 디자인된 interface. 대부분의 스마트폰들이 이 UFS interface를 사용하고 있다.
 * SimpleSSD 에서는 `Universal Flash Storage (UFS) Host Controller Interface (JESD223)`을 기반으로 UFS Host Controller를 구현하였으며, UFS PHY는 `Specification for M-PHY Version 4.0` 을, UFS protocol은 `Universal Flash Storage (UFS) Version 2.1 (JESD220C)`를 기반으로 한다.

##### Host Interface
 * `SimpleSSD::HIL::UFS::Interface` 는 simulator에게 common API를 제공하기 위해 추상 클래스로 `hil/ufs/interface.hh` 에 정의되어 있다. 어떻게 구체화 하는지는 SimpleSSD_FullSystem의 `UFSInterface` 는 `scr/dev/storage/ufs_interface.hh` 에 나와 있다.
 * `SimpleSSD::HIL::UFS::Interface` 는 단지 `generateInterrrupt()` 와 `clearInterrupt()` 를 포함한다.

##### Host Controller inteface
 * SATA처럼 UFS도 UFS Host Controller Interface - UFSHCI 를 제공한다. 이 인터페이스는 `Universal Flash Storage (UFS) Host Controller Interface (JESD223)`를 따라간다.
 * UFSHCI 는 `hil/ufs/host.hh` 에 `SimpleSSD::HIL::UFS::Host`로 구현되어 있다.

 * `Interface` 는 UFSHCI register에 `Host::writeRegister` 함수를 사용해서 쓴다.
 * UFS는 3가지 종류의 명령이 있는데
   * UFS Trasnport Protocol Transfer (UTP Transfer)
   * UFS Transport Protocol Task Management (UTP Task)
   * UFS InterConnect Command (UIC Command)
 * 각 명령어들은 request를 알리는데 서로 다른 doorbell을 사용하며
   * `REG_UTRLDBR` 는 UTP Transfer
   * `REG_UTMRLDBR` 는 UTP Task
   * `REG_UICCMDR` 는 UIC Command
 * 를 확인할때 사용할수 있다.

 * 리눅스 커널과 UFS 2.1에서 UTP Task는 구현되지 않았기 때문에 SimpleSSD 에서도 구현하지 않았다.
 * UIC Commands 는 오직 UFS hardware를 초기화 할때만 사용하며(M-PHY link 부팅 등), 그러므로 우린 오직 2가지 기초적 명령어들만 구현했다.
 * NVMe와 SATA처럼 **Event Engine** 은 주기적으로 `Host::work` 함수를 호출하며. `Host::handleRequest` 함수는 `work`에 의해서 호출되고 request가 유효한지를 검증한다. `Host::processUTPCommand` 는 request를 파싱하고, request에 적합한 handler를 부른다.

 * UFS Transfer는 3가지 유형의 명령어들로 정의된다.
   * Command (SCSI protocol)
   * Native UFS Command
   * Device Management Command
 * Native UFS Command는 UFS 2.1 에서 정의되지 않았기 때문에 우린 Command 와 Device Management Command 만을 구현했다.

 * `Device::processCommand` 함수는 Command 를 다루고 `Device::processQueryCommand` 함수는 Device Management Command 를 다룬다.
 * `handleRequest` 함수에서 완료 루틴(Completion routine) 이 선언되어 있으며 이는 `doRequest` 와 `doWrite` 라는 lambda 함수들을 확인하면 된다. `doWrite` 함수는 completion routine(`Host::completion`)을 예약하며, `completion` 함수는 `Interface::updateInterrupt` 함수를 사용해서 Interrupt를 보낸다.

 
##### Device
 * UFSHCI 와 연결해주는 Device 는 `hil/ufs/device.hh`에 `SimpleSSD::HIL::UFS::Device` 를 정의한다.
 * UFS 는 SCSI commands set(`SCSI Block Commands - 3 (SBC-3)` 와 `SCSI Primary Commands - 4(SPC-4)`) 을 I/O 하기 위해서 사용gksek.
 * Device 는 아래 나오는 SCSI 명령어들로 다루어진다.
   * `INQUERY`
   * `MODE SELECT 10`
   * `MODE SENSE 10`
   * `READ 6`
   * `READ 10`
   * `READ CAPACITY 10`
   * `READ CAPACITY 16`
   * `START STOP UNIT`
   * `TEST UNIT READY`
   * `REPORT LUNS`
   * `VERIFY 10`
   * `WRITE 6`
   * `WRITE 10`
   * `SYNCHRONIZE CACHE 10`

 * Device 의 구현은 SATA와 비슷하지만 2가지 명령어 handling 함수를 가진다. (`processCommand` 와 `processQueryCommand`)
 * 완료 이후 각 SCI command 함수는 callback handler 를 호출하며, 이때 `processCommand` 함수의 인자로서 콜백은 제공한다.
 * `processQueryCommand` 는 즉시 결과를 리턴한다. I/O 관련 명령 `READ*`, `WRITE*` 와 `SYNCHRONIZE CACHE` 는 SSD Interface 함수들 (`HIL::HIL::read, write and flush`) 를 호출한다.

 
### SSD Interface
 * HIL 의 SSD Interface는 단순한데 `hil/hil.hh` 에 `SimpleSSD::HIL::HIL` 로 정의되어 있다.
 * I/O request를 host controller로 부터 받아 `Interal Cache Layer` 에 넘겨준다.