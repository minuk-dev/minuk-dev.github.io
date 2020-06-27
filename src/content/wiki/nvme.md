---
layout  : wiki
title   : nvme
summary : 
date    : 2020-06-15 20:13:59 +0900
lastmod : 2020-06-27 15:11:20 +0900
tags    : [linux, nvme, ssd]
draft   : false
parent  : ssd
---

# 시작
 * 아무것도 모르고 SSD 에 대해서 아는거라곤, 개발자를 위한 SSD 라는 카카오에서 올린 글(https://tech.kakao.com/2016/07/13/coding-for-ssd-part-1/) 와 [[simplessd]] 논문만 보고 무턱대고 시작한 공부
  
  
## Linux NVMe 공부
 * [[workqueue]]
 * [[block layer]]
 * [[IO mapping]]
 * [[blk_mq]]
 * [[IOMMU]]
 * [[SGL]]{Scatter-Gatter List}

## nvme 자료구조 
 * https://testkernel.tistory.com/3
 
## 의문점
 * linux/drivers/nvme/host 에 있는 nvme 함수들은 어떻게 호출되는가? -> scsi interface 를 사용해서
 * -> 그러면 어디에 있지? source code를 찾아보고 싶다. -> 일단 request 는 찾았다. block device 에 접근 하려면 (실제로 block device는 아닐수도 있지만 SSD를 일단 Block 으로 사용하고 FTL 로 처리?할테니까)
 * -> 흠? 그런데 찾아보니까 /include/nvme.h 라는 파일이 있는데? 이건 만약 nvme 가 단순히 scsi 로만 처리된다면 굳이 맨 바깥쪽 include 에 있을 필요는 없는거 아닌가? 이건 마친 nvme 가 단독으로 interface를 가지고 있는거 같은데?
### 중간 결론
 * interface 마다 module 을 만들어 놓고 어떤 interface 를 사용하는지 KConfig 에 정의 되어있다.
   * `BLK_DEV_NVME` : block device 로 생각하고 접근 
   * `NVME_MULTIPATH` : NVMe multipath support
   * `NVME_HWMON` : hardware monitoring
   * `NVME_FABRICS` : 사용 X
   * `NVME_RDMA` : NVM Express over Fabrics RDMA host driver
   * `NVME_FC` : NVM Express over Fabrics FC host driver
   * `NVME_TCP` : NVM Express over Fabrics TCP host driver
 * 일단 나는 block layer를 통하는 path 를 공부하는게 목표 : 이럴 경우 PCI 와 NVMe Core 부분만 보면 된다.

#### PCI driver structure (실제로 module 의 interface)
 * 참고 : PCI driver structure 설명 : https://wiki.kldp.org/wiki.php/PCI%20Drivers
  
```c
static struct pci_driver nvme_driver = {
	.name		= "nvme",
	.id_table	= nvme_id_table,
	.probe		= nvme_probe,
	.remove		= nvme_remove,
	.shutdown	= nvme_shutdown,
#ifdef CONFIG_PM_SLEEP
	.driver		= {
		.pm	= &nvme_dev_pm_ops,
	},
#endif
	.sriov_configure = pci_sriov_configure_simple,
	.err_handler	= &nvme_err_handler,
};
```

 * 하나씩 보면 `name` 은 driver 이름, `id_table` : driver 가 처리하는 id table 의 포인터
  
```c
static const struct pci_device_id nvme_id_table[] = {
	{ PCI_VDEVICE(INTEL, 0x0953),
		.driver_data = NVME_QUIRK_STRIPE_SIZE |
				NVME_QUIRK_DEALLOCATE_ZEROES, },
	{ PCI_VDEVICE(INTEL, 0x0a53),
		.driver_data = NVME_QUIRK_STRIPE_SIZE |
				NVME_QUIRK_DEALLOCATE_ZEROES, },
	{ PCI_VDEVICE(INTEL, 0x0a54),
		.driver_data = NVME_QUIRK_STRIPE_SIZE |
				NVME_QUIRK_DEALLOCATE_ZEROES, },
	{ PCI_VDEVICE(INTEL, 0x0a55),
		.driver_data = NVME_QUIRK_STRIPE_SIZE |
				NVME_QUIRK_DEALLOCATE_ZEROES, },
	{ PCI_VDEVICE(INTEL, 0xf1a5),	/* Intel 600P/P3100 */
		.driver_data = NVME_QUIRK_NO_DEEPEST_PS |
				NVME_QUIRK_MEDIUM_PRIO_SQ |
				NVME_QUIRK_NO_TEMP_THRESH_CHANGE },
  /* 이하 생략 */
};
```

 * `probe` : id 테이블과 매치한 뒤, 아직 다른 드라이버에 의해 처리되지 않은 모든 장치들에 대한 장치 검색 함수의 포인터, 0을 반환하면 driver가 device를 잘인식하고 쓴다는 것(원문은 device가 driver 를 accept 하면 이라고 써져 있는데, 평소 말하듯이 쓰면 이렇게 쓰는게 맞을듯?)

#### `nvme_probe` 함수 (`nvme_driver` 의 `probe` 부분)
##### 하는일
 1. NUMA NODE 설정
   1-2. `dev_to_node` 를 통해서 [[NUMA]] NODE 를 가져온다. (단, `CONFIG_NUMA` 가 선언되어 있지 않으면 아무것도 하지 않는다.)
   1-3. device 에 numa 노드가 설정되지 않았다면, `first_memory_node` 를 가져온다. 
 2. `struct nvme_dev` 크기에 맞추어 `dev` 변수를 kernel memory 를 할당한다.
 3. queue 들을 설정 한다. (각 device는 적어도 2개, admin command 와 i/o command 를 담당하는 큐를 가지게 된다.)
   3-1. `write_queues`,`poll_queues` 값을 설정한다. (흠.. 이 값을 어디서 세팅해놓는지는 못찾았다. 아마도 config 변수 값일듯)
   3-2. 사용가능한 cpu 개수 + write_queues + poll_queues 값에 맞추어 queue를 할당한다.
 4. device를 가져온다.
   4-1. 2~3 과정에서 설정한 `dev` 변수를 **private_driver_data** 로 지정한다. (`pci_set_drvdata`)
 5. pci를 메모리에 매핑시킨다.
   5-1. pci를 "nvme" 앞으로 예약한다.
   5-2. I/O 물리 메모리를 Virtual Memory 에 매핑시킨다.
 6. `reset_work`, `remove_work` (workqueue) 를 초기화 시킨다.
 7. [[prp]] list용 page, 256(4K~128K) 에 최적화된 prp list를 `dma_pool_create` 를 통해 각각 만든다.
 8. 하드웨어 별로 특이사항이 있는지 확인한다. (`quirks` 에다가 OR 연산으로 넣어놓는다.)
 9. iod용 memory pool 을 할당한다. (iod는 i/o description 의 약자)
 10. NVMe Controller 를 init
   10-1. `spin_lock`, `mutex`, `list`, `rwsem`(read write semaphore), `ops`, `quirks`, workqueues 들을 초기화(이외에도 많은 controller 관련 변수들을 초기화)
   10-2. 이때 `nvme_pci_ctrl_ops` 를 넘겨준다. 이를 기반으로 `core.c` 에 선언 되어 있는 `nvme_init_ctrl` 이 호출된다.
 12. NVMe Controller reset
   11-1. pci에 nvme 를 켜주는 등의 작업.
   11-2. admin queue 설정
   
 13. 오래걸리는 작업 (controller 의 reset_work, scan_work 초기화, 4 에서 가져온 device release (정확히 함수는 `put_device` 호출)) 을 async 하게 동작하도록 예약
 
##### 그림
 * ![nvme](/wiki/images/nvme.jpg)
 * TODO: nvme_reset_work 함수 그림 그리면서 분석해야함.
