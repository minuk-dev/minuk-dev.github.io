---
layout  : wiki
title   : Database System
summary : 학교 데이터베이스 시스템 수업 정리
date    : 2021-04-18 18:42:47 +0900
lastmod : 2021-04-18 20:04:46 +0900
tags    : [lectures, database]
parent  : lectures
---

## Chapter 12. Physical Storage Systems
### Classification of Physical Storage Media
 * Volatile Storage(휘발성 저장장치) : loses contents when power is switched off
 * Non-volatile Storage(비휘발성 저장장치)
   * Contents persist even when power is switched off.
   * Includes secondary and tertiary storea, as well as batter-backed up main-memory.
 * Factors
   * Speed with which data can be accessed
   * Cost per unit of data
   * Reliability

### Storage Hierarchy
 * Cache, Main memory, flash memory, magnetic disk, optical disk, magnetic tapes
 * primary storage : Fastest but volatile (cache, main memory)
 * secondary storage(on-line storage) : non-volatile, moderately fast access time (flash memory, magnetic disks)
 * tertiary storage(off-line storage, archival storage) : non-volatile, slow accesstime (magnetic tape, optical storage)

### Storage Interfaces
 * Disk interface standards families
   * SATA (Seiral ATA), SAS(Serial Attached SCSI), NVMe(Non-Volatile Memory Express)
 * Disks usually connected directly to computer system
 * Storage Area Networks (SAN) : a large nubmer of disks are connected by a high-speed network to a number of servers.
 * Network Attached Storage (NAS) : networked storage provides a file system interface using networked file system protocol, instead of providing a disk system interface.

### Magnetic Disks
 * Read-write head
 * Surface of platter divided into circular tracks : Over 50K-100K tracks sper platter on typical hard disks
 * Each track is divided into sectors.
   * A sector is the smallest unit of data that can be read or written.
   * Sector size typically 512 bytes
   * Typical sectors per track : 500 to 1000 (on inner tracks) to 1000 to 2000 (on outer tracks)
 * To read/write a sector
   * disk arm swings to position head on right track
   * platter spins continually; data is read/written as sector passes under head
 * Head-disk assemblies
   * multiple disk platters on a single spindle (1 to 5 usually)
   * one head per platter, mounted on a common arm.
 * Cylinder i consists of ith track of all the platters
 * Disk controller - interfaces between the computer system and the disk drive hardware.
   * accepts high-level commands to read or write a sector
   * initiates actions such as moving the disk arm to the right track and actually reading or writing the data
   * Computes and attaches checksums to each sector to verityf that data is read back correctly
     * If data is corrupted, with very high probability stored checksum won't match recomputed checksum
   * Ensures successful writigin by reading back sector after wiriting it
   * Perforams reammping of bad sectors

### Magnetic Hard disk Mechanism
 * Disk 는 여러층의 track 으로 나뉘어져 있고, track은 sector로 나뉘어져 있다.
 * sector가 Disk의 head를 지날 때 데이터에 접근 가능하다.
 * 읽으려고 하는 sector를 head로 옮기는 시간을 seek time 이라 부른다.
 * Access time 은 Disk의 기계적 동작이 주를 차지한다.
 * 같은 반경을 가지는 track을 모아서 cylinder라고 부른다.
 * cylinder 내의 접근을 추가적인 seek 없이 접근할 수 있기에 하드웨어의 구성을 감안하여 관련 데이터를 같은 cylinder에 모으면 빨라진다.

### Performance Measures of Disks
 * Access time - the time it takes from when a read or write request is issued to when data transfer begins.
   * Seek time - time it takes to reposition the arm over the correct track.
     * Average seek time is 1/2 the worst case seek time.
       * Would be 1/3 if all tracks had the same number of sectors, and we ignore the time to start and stop arm movement
     * 4 to 10 milliseconds on typical disks
   * Rotational latency - time it takes for the sector to be accessed to appear under th thead.
     * 4 to 11 milliseconds on typical disks (5400 to 10000 r.p.m.)
     * Average latency is 1/2 of the above latency.
   * Overall latency is 5 to 20 msec depeding on disk model
 * Data-transfer rate - the rate at which data can be retrieved from or stored to the disk.
   * 25 to 200 MB per second max rate, lower for inner tracks.

 * Disk block is a logical unit for storage allocation and retrieval
   * 4 to 16 kilobytes typciall
     * Smaller blocks : more transfers from disk
     * Larger blocks : more space wasted due to partially filled blocks
 * Sequential acccess pattern
   * Successive requests are for successive disk blocks
   * Disk seek required only for first block
 * Random access pattern
   * Successive requrests are for blocks that can be anywhere on disk
   * Each access requires a seek
   * Transfer rates are low since a lot of time is wasted in seeks
 * I/O operations per second (IOPS)
   * Number of random block reads that a disk can support per second
   * 50 to 200 IOPS on current generation magnetic disks
 * Mean time to failure (MTTF) - the average time the disk is expected to run continuously without any failure.
   * Typically 3 to 5 years
   * Probability of failure of new disks is quite low, corresponding to a "theoretical MTTF" of 500,000 to 1,200,000 hours for a new disk
     * E.g an MTTF of 1,200,00 hours for a new disk means that given 1000 relatively new disks, on an average one will fail every 1200 hours
   * MTTF decreases as disk ages

### Flash Storage
 * 흠... 이건 수업시간엔 안한거 같은데 그냥 공부하는 겸 해야겠네
 * NOR flahs vs NAND flash
 * NAND flash
   * used widely for storage, cheaper than NOR flash
   * requires page-at-a-time read (page: 512 bytes to 4 KB)
     * 20 to 100 microseconds for a page read
     * Not musch difference between sequential and random read
   * Page can only be written once
     * Must be erased to allow rewrite
 * Solid state disks
   * Use standard block-oriented disk interfaces, but store data on multiple flash storage devices internally
   * Transfer rate of up to 500 MB/sec using SATA, and up to 3 GB/sec using NVMe PCIe
 * Erase happens in units of erase block
   * Takes 2 to 5 millisecs
   * Erase block typically 256 KB to 1 MB (128 to 256 pages)
 * Remapping of logical page addresses to physical page addresses avoids waiting for erase
 * Flash translation table tracks mapping
   * also stored in a label field of flash page
   * remapping carried out by flash translation layer
 * After 100,000 to 1,000,000 erases, erase block becomes unreliable and cannot be used
   * wear leveling

### SSD Performance Metrics
 * Random reads/writes per second
 * Data transfer rate for sequential reads/writes
 * Hybrid disks : combine small amount of flsh cache with larger magnetic disk

### Storage Class Memory
 * 3D-Xpoint memory technology pioneered by Intel
 * Available asIntel Optane
   * SSD interface shipped from 2017 : Allows lower latency than flash SSDs
   * Non-volatile memory interface announced in 2018 : Supports direct access to words, at speeds comparable to main-memory speeds

---
 * 아 그냥 다 할려고 했는데 생각보다 수업시간에 안한게 많네 RAID를 타이핑 하기에는 조금 지치니까 여기까지만 해야겠다.

### Summary
 * Magnetic disk
   * Disk access time : seek time + rotational latency + data transfer time
   * major portion : seek tiem + rotation latency
 * Disk block : Unit of I/O between memory (DBMS buffer) and disk (database)
 * Disk : sete of disk blocks, entire database is persistently stored in blocks
 * DBMS buffer
   * set of buffer pages
   * limited space
   * frequently and/or recetly accessed disk blocks are [[cached]]

## Chapter 13. Data Storage Structures
### File Organization
 * The database is stored as a coolection of files. Each file is a sequence of records. A record is a sequence of fields.
 * One approach
   * Assume record size if fixed
   * Each file has records of one particular type only
   * Different files are used for different relations
   * This case is easiest to implement.

### Fixed-Length Records
 * Simple approach
   * Store record i starting from byte n * (i - 1), where n is the size of each record.
   * Record access is simple but records may cross blocks
     * Modification : do not allow records to cross block boundaries
     * Deletion of record i:
       * move records i + 1, ..., n to i, ... , n - 1
       * move record n to i
       * do not move records, but link all free records on a free list

### Variable-Length Records
 * Variable-length records arise in database systems in several ways:
   * Storage of multiple record types in a file.
   * Record types that allow varaible lengths for one or more fields such as strings (varchar)
   * Record types that allow repeating fields (used in some older data models).
 * Attributes are stored in order
 * Variable length attributes represented by fixed size (offset, length), with actual data stored after all fixed length attributes
 * Null values represented by null-value bitmap

### Variable-Length Records : Slotted Page Structure
 * Slotted page header contains:
   * number of record enttries
   * end of free space in the block
   * location and size of each record
 * Records can be moved around within a page to keep them contiguous with no empty space between them; entry in the header must be updated.
 * Pointers should not point directly to record -instead they should point to the entry for the record in header.

### Storing Large Objects
 * ?? 이건 수업시간에 안한거 같긴 한데
 * E.g., blob/clob types
 * Records must be smaller than pages
 * Alternatives:
   * Sore as files in file systems
   * Store as fiels managed by database
   * Break into pieces and store in multiple tuples in separate relation

### Organization of Recrods in Files
 * Heap : record can be placed anywhere in the file where there is space
 * Sequential : store records in sequential order, based on the value of the search key of each record
 * In a multitable clustring file oragnization : records of several different relations can be sotred in the same file
   * Motivation : store related records on the same block to minimize I/O
 * B+-tree file organization : Ordered storage even with inserts/ deletes
 * Hasing : a hash function computed on search key; the result specifies in which block of the file the record should be placed

### Heap File Organization
 * Records can be placed anywhere in the file where there is free space
 * Records usually do not moveonce allocated
 * Important to be able to efficiently find free space within file
 * Free-space mape
   * Array with 1 entry per block. Each entry is a few bits to a byte, and records fraction of block that is free
 * Free space map written to disk periodically, OK to have wrong (old) values for some entries (will be detected and fixed)

### Sequential File Organization
 * Suitable for applications that require sequtntial processing of the entire file
 * The records in the file are ordered by a search key.
 * Deletion : use pointer chains
 * Insertion : locate the position where the record is to be inserted
   * if there is free space insert there
   * If no free space, insert the record in an overflow block
   * In either case, pointer chain must be updated
 * Neded to reorganized the file from time to time to restore sequential order

### Multitable Clustring File Organization
 * Store several relations in one file using a multitable clustering file organization
 * Good for queries involving department $\Bowtie$(`join`) instructor, and for queries involving one single department and its instructors
 * Bad for queries involving only department
 * results in variable size records
 * Can add pointer chains to link records of a particular relation

---
 * 이 뒤는 수업때는 안했는데 RAID랑은 다르게 모르는 내용이 있기 때문에 그냥 공부함.

### Data Dictionary Storage
 * The Data dictionary (also called system catalog) stores metadata; that is, data about data, such as
   * Inforamtion about relations
     * names of relations
     * names, types and lengths of attributes of each relation
     * names and definitions of views
     * integrity constraints
   * User and accounting information, including passwords
   * Statistical and descriptive data
     * number of tuples in each realtion
   * Physical file organization information
     * How relation is stored (sequential/has/...)
     * Physical location of relation
   * Information about indices

### Storage Access
 * blocks are units of both storage allocation and data transfer.
 * Database system seeks to minimize the number of block transfers between the disk and memory. We can reduce the number of disk accesses by keeping as many blocks as possible in main memory.
 * Buffer : portion of main memory available to store copies of disk blocks.
 * Buffer manager : subsystem responsible for allocating buffer space in main memory.

### Buffer Manger
 * Programs call on the buffer manager when they need a block from disk.
   * If the block is already in the buffer, buffer manager returens the address of the block in main memory.
   * If the block is not in the buffer, the burffer manager
     * Allocates space in the buffer for the block.
       * Replacing (throwing out) some other block, if required, to make space for the new block.
       * Replaced block writeen back to disk only if it was modified since the most recent time that it was written to/fetched from the disk.
     * Reads the block from the disk to the buffer, and returns the address of the block in main memory to requester.
 * Buffer replacement strategy
 * Pinned block : memory block that is not allowed to be writeen back to disk
   * Pin done before reading/writing data from a block
   * Unpin done when read/write is complete
   * Multiple concurrent pin/unpin operations possible
     * Keep a pin count, buffer block can be evicted only if pin count = 0
 * Shared and exclusive locks on buffer
   * Needed to prevent concurrent operations from reading page contents as they are moved/reorganized, and to ensure only one move/reorganize at a time
   * Readers get shared lock, updates to a block require exclusive lock
   * Locking rules:
     * Only one process can get exclusive lock at a time
     * Shared lock cannot be concurrently with exclusive lock
     * Multiple processes may be given shared lock concurrently

### Buffer-Replacement Policies
 * Most operating systems replace the block least recently used (LRU strategy)
   * Idea begind LRU - use past pattern of block references as predictor of future references
   * LRU can be bad for some queries
 * Queries have well-defined access patterns (such as sequential scans), and a databse system can use the information in a user's query to predict future references
 * Mix strategy with hints on replacement strategy provided by the query optimizer is preferable
 * Toss-immediate strategy - frees the space occupied by a block as soon as the final tuple of that block has been processed
 * Most recently used (MRU) strategy - system must pin the block currently being processed. After final tuple of that block has been processed, the block is unpinned, and it becomes the most recently used block.
 * Buffer manager can use statistical information regarding the probability that a request will reference a particular relation
   * E.g. the data dictionary is frequently accessed. Heuristic : keep data-dictionary blocks in main memory buffer
 * Operating system or buffer manager may reorder wirtes
   * Can lead to corruption of data structures on disk.
     * E.g, linked list of blocks with mssing block on disk
     * File systems perform consistency check to detect such situations
   * Careful ordering of writes can avoid many such problems
 * BUffer mangaers support forced output of blocks for the purpose of recovery
 * Nonvolatile write buffers speed up disk writes by writing blocks to a non-volatile RAM or flash buffer immeditately
   * Writes can be reordered to minimize disk arm movement
 * Log disk - adisk devoted to writing a sequential log of block updates
   * Used exactly like nonvolatile RAM
     * Write to log disk is very fast since no seeks are required
 * Journaling file systems write data in-order to NV-RAM or log disk
   * Reordering without journaling: risk of corruption of file system data

### Column-Oriented Storage
 * Also known as columnar representation
 * Store each attribute of a relation separately
 * Benefits
   * Reduced IO if only some attributes are accessed
   * Improved CPU cache performance
   * Improved compression
   * Vector processing on modern CPU architectures
 * Drawbacks
   * Cost of tuple reconstruction from columnar representation
   * Cost of tuple deletion and update
   * Cost of decompression
 * Columnar representation found to be more efficient for decision support than row-oriented representation
 * Traditional row-oriented representation preferable for transaction processing
 * Some databases support both representations
   * Called hybrid row/column stores

