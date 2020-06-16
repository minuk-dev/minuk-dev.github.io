---
layout  : wiki
title   : nvme
summary : 
date    : 2020-06-15 20:13:59 +0900
lastmod : 2020-06-16 20:41:50 +0900
tags    : [linux, nvme, ssd]
draft   : false
parent  : 
---

## Linux NVMe 공부
 * [[workqueue]]
 * [[block layer]]

 
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

### PCI module 연결 부분
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
 * TODO: 아직 probe 함수를 안 읽어봤음.. 읽어보고 정리 하고 파라메터 정리
