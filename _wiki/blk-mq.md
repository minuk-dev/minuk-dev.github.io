---
layout  : wiki
title   : Multi-Queue Block IO Queueing (blk-mq)
date    : 2020-12-27 17:46:35 +0900
lastmod : 2021-01-12 20:42:47 +0900
tags    : [linux, blk-mq]
parent  : linux-study
---

# Multi-Queue Block IO Queueing Mechanism
## Introduction
### Background
 * The standard of storage development moved to Solid State Drives and Non-Volatile Memories from Magnetic hard disks.
 * They do not have random access penalty and can perform high parallel access. Therefore, the bottleneck of computer storage stack moved from the storage device to the operating system.
 * The former design had a signle queue to store block IO requests with a single lock. Instead of this, the blk-mq API spawns multiple queus with individusal entry points local to the CPU, removing the need for a lock.

### Operation
 * When the userspace performs IO to a block device (reading or writing a file, for instance), blk-mq takes action: it will store and manage IO requests to the block device, acting as middleware between the userspace (and a file system, if present) and the block device driver.
 * blk-mq has two group of queues: software staging queus and hardware dispatch queues.

### Software staging queues
 * The block IO subsystem adds requests in the software staging queus(represented by `struct blk_mq_ctx`) in case that they weren't sent directly to the driver. A request is one or more BIOs. They arrived at the block layer though the data structure struct bio. The block layer will tehn build a new structure from it, the struct request that will be used to communicate with the device driver. Each queue has its own lock and the number of queues is defined by a per-CPU or per-node basis.
 * The statging queue can be used to merge requests for adjacent sectors.

### IO Schedulers
 * There are several schedulers implemented by the block layer, each one following a heruistic to improve the IO performance. They are **pluggable**.

### Hardware dispatch queues
 * The hardware queue (represented by `struct blk_mq_hw_ctx`) is a struct used by device drivers to map the device sumission queues (or device DMA ring buffer), and are the last step of the block layer submission code before the low level device driver taking ownership of the request.

# Source Code
## Open Path (Based F2FS)
 * dentry_open()
   * vfs_open()
     * do_dentry_open()
       * file->f_op->open() -> f2fs_file_open()
         * dquot_file_open()
           * generic_file_open()
## Read Path (Based F2FS)
 * ksys_read()
   * vfs_read()
     * __vfs_read()
     ```c
      ssize_t __vfs_read(struct file *file, char __user *buf, size_t count,
             loff_t *pos)
      {
        if (file->f_op->read)
          return file->f_op->read(file, buf, count, pos);
        else if (file->f_op->read_iter)
          return new_sync_read(file, buf, count, pos);
        else
          return -EINVAL;
      }
     ```
      * new_sync_read()
        * init_sync_kiocb()
        * iov_iter_init()
        * call_read_iter()
          * file->f_op->read_iter() -> generic_file_read_iter()
            * Direct I/O -> TODO
            * Buffered I/O -> generic_file_buffered_read()
              * find_page --> would_block
                        ∧ ├-> no_cached_page : page_cache_alloc() ----------------------------┐
                        | ├-> page_ok -------------------------------------------------------┬-------------┬-> copy_page_to_iter() --┬-> out
                        | ├-> page_not_up_to_date : lock_page_killable() ┐                   ||            |                         |
                        | └-> page_not_up_to_date_locked ----------------┴-> : unlock_page() ┼┴> readpage -┴-> readpage_error -------┘
                        └--------------------------------------------------------------------┘
              * readpage: mapping->a_ops->readpage() -> f2fs_read_data_page()
                * f2fs_read_inline_data() (if it is inline data)
                * f2fs_mpage_readpages()
                  * f2fs_read_single_page()
                    * f2fs_map_blocks()
                      * __submit_bio()
                  * __submit_bio()
                    * submit_bio()
                      * generic_make_request()
                        * q->make_request_fn -> blk_mq_make_request()
              * copy_page_to_iter()


 * blk_mq_make_request()
   * blk_queue_bounce()
     * `!(q->bounce_gfp & GFP_DMA) && q->limits.bounce_pfn >= blk_max_pfn` : 이때는 바로 나감 왜 그런지 이해 아직 못함.
---

### 바운스 버퍼
 * 출처 : https://wiki.kldp.org/wiki.php/IOPerformanceHOWTO
 * 높은 주소의 메모리에 DMA I/O 가 수행될 때는, 낮은 주소의 메모리에 버운스 버퍼가 할당되고, 이 바운스 버버를 통해서 복사가 된다.
 * 많은 양의 메모리를 가지고 있는 시스템에서 집중적 I/O를 수행하면 낮은 주소의 메모리에 바운스 버퍼도 많이 할당되고, 낮은 주소 영역에 쓸 읽도 많아 성능이 저하된다.
 * 또한 바운스 버퍼를 통한 데이터 복사가 대량으로 발생하기도 하여 성능이 저하된다.

---

## blk_mq_make_request()
 * blk_mq_make_request()
   * blk_queue_bounce()
     * __blk_queue_bounce()
       * bounce 버퍼가 필요하지 않다면, 그냥 종료
       * segment sector의 합이 bio의 sector보다 작다면, bio_split()
       * bounce_clone_bio()
       * bounce_pfn보다 pfn이 큰 page에 대해서만 bounce buffer memory pool 에서 페이지를 가져오고(`mempool_alloc()`)
         * 읽기에 대해서는 이 페이지 주소로 타겟 페이지를 지정하고,
         * 쓰기에 대해서는 이 페이지 주소를 테겟 페이지로 지정하고,, memcpy로 복사시킨다.
   * __blk_queue_split()
   * rq_qos_throttle() : io controller 의 함수를 호출하는 구조
     * __rq_qos_throttle()
       * rqos->ops->throttle() : iocost 모델, iolatency 모델, wbt 기본 모델
   * blk_mq_get_request() : 앞으로의 operation에서 사용할 lock 같은 자원들을 할당받아오는 함수
   * blk_mq_bio_to_request() : bio 구조체를 request 구조체로 바꿔주는 함수
   * blk_mq_plug() : plugging
   * blk_insert_flush() : flush 연산일때만 호출되며, 큐에 있는 내용을 비우도록 동작
   * blk_add_rq_to_plug() : plugging 가능하면 합치는 내용
   * blk_mq_sched_insert_request() : 실질적으로 request를 보내는 함수
