---
layout  : wiki
title   : Multi-Queue Block IO Queueing (blk-mq)
date    : 2020-12-27 17:46:35 +0900
lastmod : 2020-12-27 20:46:30 +0900
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


