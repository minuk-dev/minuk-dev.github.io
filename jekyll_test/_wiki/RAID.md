---
layout  : wiki
title   : RAID(Redundant Array of Independent Disks)
summary : 
date    : 2020-08-23 20:50:40 +0900
lastmod : 2020-08-24 20:06:49 +0900
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
 
 * RAID 5 기준으로 작성 다른 RAID 같은 경우 위 링크 참조
|                                                                                   | Btrfs             | EXT4            | F2FS   | XFS    |
|-----------------------------------------------------------------------------------|-------------------|-----------------|--------|--------|
| Application Start-up Time v3.4.0 (Only Sequential Reads - Xterm)                  | 8.69              | 0.20            | 5.51   | 8.76   |
| Application Start-up Time v3.4.0 (Sequential Reads + Writes - Xterm)              | 3.68              | 2.64            | 1.62   | 1.85   |
| Application Start-up Time v3.4.0 (Only Sequential Reads - GNOME Terminal)         | 22.70             | 30.39           | 15.26  | 39.19  |
| Application Start-up Time v3.4.0 (Only Sequential Reads - LibreOffice Writer)     | 14.34             | 22.94           | 10.28  | 28.06  |
| Application Start-up Time v3.4.0 (Sequential Reads + Writes - GNOME Terminal)     | 10.68             | 7.19            | 4.77   | 8.63   |
| Application Start-up Time v3.4.0 (Sequential Reads + Writes - LivreOffice Writer) | 6.93              | 6.06            | 2.91   | 6.33   |
| SQLite v3.30.1 (Threads / Copies : 1)                                             | 83.30             | 40.36           | 46.17  | 46.38  |
| SQLite v3.30.1 (Threads / Copies : 8)                                             | 227.68            | 308.02          | 412.05 | 221.80 |
| Flexible IO Tester v3.16 (Random Write)                                           | 115K              | 93K             | 85K    | 122K   |

 * 대충 이정도만 정리 나머진 직접 링크 가서 확인

