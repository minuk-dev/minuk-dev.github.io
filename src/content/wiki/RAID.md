---
layout  : wiki
title   : RAID(Redundant Array of Independent Disks)
summary : 
date    : 2020-08-23 20:50:40 +0900
lastmod : 2020-08-23 20:57:43 +0900
tags    : [storage, raid]
draft   : false
parent  : storage
---

## 종류
 * RAID 0 : stripping
 * RAID 1 : mirroring
 * RAID 5 : stripping + mirroring + parity (at least 3 disks)
 * RAID 6 : stripping + mirroring + parity (at least 4 disks)
 * RAID 0 + 1 : mirroring after stripping
 * RAID 10 (1 + 0) : stripping after mirroring

 
## Benchmark
 * SSD 에서의 밴치마크 : https://www.phoronix.com/scan.php?page=article&item=linux55-ssd-raid&num=1
 * Btrfs 는 전반적으로 수치가 좋지 않고,
 * F2FS 는 SQLite 에서 성능이 좋지 않으며 특히 multi threading 환경에서 도드라진다.
