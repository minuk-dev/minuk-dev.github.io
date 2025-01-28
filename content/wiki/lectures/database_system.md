---
layout: wiki
title: Database System
summary: 학교 데이터베이스 시스템 수업 정리
date: 2021-04-18 18:42:47 +0900
lastmod: 2025-01-29 02:53:20 +0900
tags:
  - lectures
  - database
parent: lectures
---

## Chapter 12. Physical Storage Systems
### Classification of Physical Storage Media
 * Volatile Storage(휘발성 저장장치) : loses contents when power is switched off
 * Non-volatile Storage(비휘발성 저장장치)
   * Contents persist even when power is switched off.
   * Includes secondary and tertiary storea, as well as batter-backed up main-memory.
 * Factors
   * Speed with which data can be accessed (얼마나 데이터에 빠르게 접근 할수 있는가?)
   * Cost per unit of data (데이터 당 비용, 가격적 측면)
   * Reliability (신뢰성, 얼마나 안 날아가느냐? 고장이 안나느냐)

### Storage Hierarchy
 * Cache, Main memory, flash memory, magnetic disk, optical disk, magnetic tapes
 * primary storage : Fastest but volatile (cache, main memory), 매우 빠르지만 휘발성임. buffer로써 쓰임.
 * secondary storage(on-line storage) : non-volatile, moderately fast access time (flash memory, magnetic disks), 비휘발성이고 상대적으로 빠른 접근 속도임
 * tertiary storage(off-line storage, archival storage) : non-volatile, slow accesstime (magnetic tape, optical storage), 비휘발성이고 상대적으로 느리지만, 가격적 측면에서 좋음. 그래서 백업 플랜으로 사용

### Storage Interfaces
 * Disk interface standards families :이런게 있다만 알고가면 될듯
   * SATA (Seiral ATA), SAS(Serial Attached SCSI), NVMe(Non-Volatile Memory Express)
 * Disks usually connected directly to computer system, 대부분의 경우 컴퓨터 시스템과 직접 연결되지만, 아닌 경우도 있는데, 아래와 같은 2 경우가 대표적이다.
 * Storage Area Networks (SAN) : a large nubmer of disks are connected by a high-speed network to a number of servers.
 * Network Attached Storage (NAS) : networked storage provides a file system interface using networked file system protocol, instead of providing a disk system interface.

### Magnetic Disks
 * Read-write head (읽고 쓸때 head라는 것을 통해서 하게 된다. 이게 결과적으로 기계 장치이기 떄문에 속도가 느린것이다.)
 * Surface of platter divided into circular tracks : Over 50K-100K tracks sper platter on typical hard disks (platter는 디스크의 한 판을 의미하는데 이를 원형 track들로 쪼갠다. 안쪽 track일수록 sector 개수가 적음.)
 * Each track is divided into sectors. (각 track은 sector로 구성되어 있다.)
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
   * Ensures successful writigin by reading back sector after writing it
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
   * Seek time - time it takes to reposition the arm over the correct track. (head가 앞뒤로 움직이는 시간)
     * Average seek time is 1/2 the worst case seek time. (평균 검색 시간은 최악의 경우의 1/2 이다.)
       * Would be 1/3 if all tracks had the same number of sectors, and we ignore the time to start and stop arm movement
     * 4 to 10 milliseconds on typical disks
   * Rotational latency - time it takes for the sector to be accessed to appear under the thead. (회전시간)
     * 4 to 11 milliseconds on typical disks (5400 to 10000 r.p.m.)
     * Average latency is 1/2 of the above latency. (평균 회전 시간은 최대 시간의 1/2이다.)
   * Overall latency is 5 to 20 msec depeding on disk model
 * Data-transfer rate - the rate at which data can be retrieved from or stored to the disk. (데이터 전송속도)
   * 25 to 200 MB per second max rate, lower for inner tracks.

 * Disk block is a logical unit for storage allocation and retrieval (디스크 블록은 공간 할당과 검색의 논리적인 단위)
   * 4 to 16 kilobytes typcially (일반적으로는 4kb~16kb 정도로 잡는다.)
     * Smaller blocks : more transfers from disk (작게 잡는다면 디스크로부터 많이 전송받아야하고)
     * Larger blocks : more space wasted due to partially filled blocks (크게 잡는다면 낭비되는 공간이 생긴다)
 * Sequential acccess pattern (연속적인 접근 패턴)
   * Successive requests are for successive disk blocks (연속적인 디스크 블록에서 연속적인 요청을 하는 패턴)
   * Disk seek required only for first block (첫번째 block만을 찾으면 된다.)
 * Random access pattern (랜덤 접근 패턴)
   * Successive requrests are for blocks that can be anywhere on disk (연속적이지 않은 아무 영역의 블록을 연속적으로 요청하는 패턴)
   * Each access requires a seek (매번 새롭게 찾아야한다.)
   * Transfer rates are low since a lot of time is wasted in seeks (검색 시간으로 많이 버려지기에 데이터전송속도가 낮다.)
 * I/O operations per second (IOPS) (초당 I/O 연산율)
   * Number of random block reads that a disk can support per second
   * 50 to 200 IOPS on current generation magnetic disks
 * Mean time to failure (MTTF) - the average time the disk is expected to run continuously without any failure. (고장까지 평균 시간)
   * Typically 3 to 5 years (3년에서 5년)
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
   * Disk access time : seek time + rotational latency + data transfer time (탐색시간 + 회전 시간 + 전송 시간)
   * major portion : seek time + rotation latency (대부분 탐색과 회전 시간이다)
 * Disk block : Unit of I/O between memory (DBMS buffer) and disk (database)
 * Disk : sete of disk blocks, entire database is persistently stored in blocks
 * DBMS buffer
   * set of buffer pages
   * limited space
   * frequently and/or recently accessed disk blocks are cached.

## Chapter 13. Data Storage Structures
### File Organization
 * The database is stored as a collection of files. Each file is a sequence of records. A record is a sequence of fields.
 * One approach
   * Assume record size if fixed
   * Each file has records of one particular type only
   * Different files are used for different relations
   * This case is easiest to implement.

### Fixed-Length Records (고정 길이 레코드)
 * Simple approach
   * Store record i starting from byte n * (i - 1), where n is the size of each record.
   * Record access is simple but records may cross blocks
     * Modification : do not allow records to cross block boundaries
     * Deletion of record i:
       * move records i + 1, ..., n to i, ... , n - 1
       * move record n to i
       * do not move records, but link all free records on a free list(링크드리스트로 관리하기 때문에 그냥 링크만 지운다.)

### Variable-Length Records (가변 길이 레코드)
 * Variable-length records arise in database systems in several ways:
   * Storage of multiple record types in a file.
   * Record types that allow varaible lengths for one or more fields such as strings (varchar).
   * Record types that allow repeating fields (used in some older data models).
 * Attributes are stored in order
 * Variable length attributes represented by fixed size (offset, length), with actual data stored after all fixed length attributes
 * Null values represented by null-value bitmap

### Variable-Length Records : Slotted Page Structure (가변 길이 레코드가 페이지에 저장되는 구조, Slotted Page structure)
 * Slotted page header contains:
   * number of record entries (몇개의 레코드를 가지고 있는지 이값으로 빈공간의 첫부분을 알아낼 수 있다)
   * end of free space in the block (블록의 빈 공간의 끝이 어디인지)
   * location and size of each record (각 레코드의 사이즈와 위치, 이걸 slot으로 저장)
 * Records can be moved around within a page to keep them contiguous with no empty space between them; entry in the header must be updated.
 * Pointers should not point directly to record - instead they should point to the entry for the record in header.

### Storing Large Objects
 * ?? 이건 수업시간에 안한거 같긴 한데
 * E.g., blob/clob types
 * Records must be smaller than pages
 * Alternatives:
   * Store as files in file systems
   * Store as fiels managed by database
   * Break into pieces and store in multiple tuples in separate relation

### Organization of Records in Files
 * Heap : record can be placed anywhere in the file where there is space (그냥 다 쌓아두는 거, 찾을 때 오래 걸림)
 * Sequential : store records in sequential order, based on the value of the search key of each record (정렬해두는 것, 삽입 삭제때 문제가 생김)
 * In a multitable clustering file oragnization : records of several different relations can be stored in the same file (관련성이 깊은 서로 다른 릴레이션 끼리 같은 파일에 저장해놓는것)
   * Motivation : store related records on the same block to minimize I/O
 * B+-tree file organization : Ordered storage even with inserts/deletes
 * Hasing : a hash function computed on search key; the result specifies in which block of the file the record should be placed

### Heap File Organization
 * Records can be placed anywhere in the file where there is free space
 * Records usually do not move once allocated
 * Important to be able to efficiently find free space within file
 * Free-space map
   * Array with 1 entry per block. Each entry is a few bits to a byte, and records fraction of block that is free
 * Free space map written to disk periodically, OK to have wrong (old) values for some entries (will be detected and fixed)
 * 레벨을 여러겹을 두어서 Entry를 저장할 수도 있는데, 이때 상위 level의 entry는 하위 entries의 max값을 저장하여 최소한 몇개의 빈공간은 있을 것이다를 저장한다.

### Sequential File Organization
 * Suitable for applications that require sequtntial processing of the entire file
 * The records in the file are ordered by a search key.
 * Deletion : use pointer chains
 * Insertion : locate the position where the record is to be inserted
   * if there is free space insert there (빈 공간이 있으면 거기에 삽입한다.)
   * If no free space, insert the record in an overflow block (빈공간이 없다면 넘처셔 다른 블록에 저장한다.)
   * In either case, pointer chain must be updated (두 경우 모두 pointer는 udpate해줘야 한다.)
 * Needed to reorganized the file from time to time to restore sequential order

### Multitable Clustring File Organization
 * Store several relations in one file using a multitable clustering file organization (관련이 깊은 여러개의 릴레이션을 하나의 파일에 모아서 저장하는 방식)
 * Good for queries involving department $$\bowtie$$(`join`) instructor, and for queries involving one single department and its instructors (join연산에 효율적이다)
 * Bad for queries involving only department (join연산을 하지 않고 하나의 릴레이션에 대해서만 조회하는 것은 성능이 나쁘다.)
 * results in variable size records (가변 길이의 결과를 준다? ?? 이건 뭔 뜻이지?)
 * Can add pointer chains to link records of a particular relation (관련 있는 릴레이션을 포인터를 통해서 묶을 수 있다.)

### Partitioning
 * Table partitioning : Records in a relation can be partitioned into smaller relations that are stored separately
 * Queries wrtieen on transaction must access records in all partitions
 * Partitioning:
   * Reduces costs of some operations such as free space management
   * Allows different partitions to be stored on different storage devices

### Data Dictionary Storage
 * The Data dictionary (also called system catalog) stores metadata; that is, data about data, such as (메타데이터를 저장하는 곳을 데이터 딕셔너리, 시스템 카칼로그라고한다.)
   * Inforamtion about relations (릴레이션에 대한 정보)
     * names of relations (릴레이션들의 이름)
     * names, types and lengths of attributes of each relation (각 릴레이션에 들어있는 요소의 이름, 타입, 길이)
     * names and definitions of views (view에 대한 이름과 정의)
     * integrity constraints (무결성 제약조건들)
   * User and accounting information, including passwords (유저와 패스워드를 포함한 계정 정보들)
   * Statistical and descriptive data (통계적, 설명적 자료)
     * number of tuples in each realtion
   * Physical file organization information (물리적인 파일 조직에 대한 정보)
     * How relation is stored (sequential/has/...)
     * Physical location of relation
   * Information about indices (인덱스에 대한 정보)

### Storage Access
 * blocks are units of both storage allocation and data transfer. (블록은 저장공간 할당과 데이터 전송의 기본 단위이다.)
 * Database system seeks to minimize the number of block transfers between the disk and memory. We can reduce the number of disk accesses by keeping as many blocks as possible in main memory.
 * (데이터베이스는 디스크와 메모리 사이의 블록 전송의 횟수를 최소하하기 위한 방법을 찾는다. 메인 메모리에 최대한 많은 블록들을 저장하므로써 디스크 접근 횟수를 줄일 수 있다.)
 * Buffer : portion of main memory available to store copies of disk blocks. (디스크 블록들의 복사본 저장을 하기 위한 메인메모리의 가용 영역)
 * Buffer manager : subsystem responsible for allocating buffer space in main memory. (메인 메모리에 버퍼 공간을 할당하기 위한 서브시스템)

### Buffer Manger
 * Programs call on the buffer manager when they need a block from disk. (디스크에 있는 블록이 필요할 때, 프로그램은 버퍼 매니저를 호출하게 된다.)
   * If the block is already in the buffer, buffer manager returns the address of the block in main memory. (만약 이미 버퍼에 블록이 존재한다면, 메인 메모리 상의 해당 블록의 주소를 넘겨준다.)
   * If the block is not in the buffer, the burffer manager
     * Allocates space in the buffer for the block.
       * Replacing (throwing out) some other block, if required, to make space for the new block.
       * Replaced block written back to disk only if it was modified since the most recent time that it was written to/fetched from the disk.
     * Reads the block from the disk to the buffer, and returns the address of the block in main memory to requester.
   * 만약 블록이 버퍼에 존재하지 않는다면,
     * 블록을 위한 버퍼를 할당하고, 디스크로부터 내용을 읽어들인다. 그 뒤 요청자에게 메인메모리 상의 블록의 주소를 반환한다.
     * 이때, 새로운 블록을 위한 공간이 없다면, 다른 블록을 교체한다. 교체할 때, 교체 대상 블록이 디스크로부터 꺼내온 뒤 수정이 된적이 있다면 디스크에 쓰게된다.
 * Buffer replacement strategy (이후로부터는 버퍼를 어떻게 교체할것인지 서술)
 * Pinned block : memory block that is not allowed to be written back to disk (디스크로 내려가는 것을 금지하는 블록을 Pinned 블록이라고 한다)
   * Pin done before reading/writing data from a block (블록으로부터 읽기 전, 쓰기 전에 핀 작업이 수행되며)
   * Unpin done when read/write is complete (읽기와 쓰기가 완료된 후에는 핀이 해제된다.)
   * Multiple concurrent pin/unpin operations possible (여러개가 동시에 핀/언핀 연산이 가능하다)
     * Keep a pin count, buffer block can be evicted only if pin count = 0 (만약 핀카운트가 0이 되었을 때 버퍼에서 내려가는게 가능하다)
 * Shared and exclusive locks on buffer (버퍼는 공유되고 상호 베타적인 락을 가지게 된다.)
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
 * LRU는 query 처리에는 적합하지 않은 Cache 방식인데, 가장 최근에 Access 된 데이터가 Access 될 가능성이 낮기 때문이다.
 * 따라서 MRU를 채택하므로써 가장 최근에 접속 된 것이 나가도록 한다.
 * Buffer manager can use statistical information regarding the probability that a request will reference a particular relation
   * E.g. the data dictionary is frequently accessed. Heuristic : keep data-dictionary blocks in main memory buffer
 * Operating system or buffer manager may reorder writes
   * Can lead to corruption of data structures on disk.
     * E.g, linked list of blocks with mssing block on disk
     * File systems perform consistency check to detect such situations
   * Careful ordering of writes can avoid many such problems
 * Buffer managers support forced output of blocks for the purpose of recovery
 * Nonvolatile write buffers speed up disk writes by writing blocks to a non-volatile RAM or flash buffer immeditately
   * Writes can be reordered to minimize disk arm movement
 * Log disk - a disk devoted to writing a sequential log of block updates
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

## Chatper 14. Indexing
### Basic Concepts
 * Indexing mechanisms used to speed up access to desired data.
 * Search Key - attribute to set of attributes used to look up rcords in a file
 * An index file consists of records(called index entries) of the form (search-key + pointer)
 * Index files are typically much smaller than the original file
 * Two basic kinds of indices
   * Ordered indices : search keys are stored in sorted order
   * Hash indices: search keys are distributed uniformly across "buckets" using a "hash function".

### Index Evaluation Metrics
 * Access types supported efficiently
   * Records with a specified value in the attribute
   * Records with an attribute value falling in a speicifed range of values.
 * Access time
 * Insertion time
 * Deletion time
 * Space overhead

### Ordered Indicies
 * In an ordered index, index entires are stored sorted on the search key value.
 * Clustring index : in a sequentially ordered file, the index whose search key specifies the sequential order of the file.
   * Also called primary index
   * The search key of a primary index is usually but not necessarily the primary key.
 * Secondary index : an index whose search key speicifies an order different from the sequential order of the file. Also called nonclustering index.
 * Index-sequential file : sequential file ordered on a search key, with a clustering index on the search key.

### Dense Index Files
 * Dense index : index record appears for every search-key value in the file

### Sparse Index Files
 * Sparse Index : contains index records for only some search-key values.
   * Applicable when records are sequentially ordered on search-key
 * To locate a record with search-key value K we:
   * Find index record with largest search-key value < K
   * Search file sequentially starting at the record to which the index record points
 * Compared to dense indices:
   * Less space and less maintenance overhead for insertions and deletions.
   * Genearlly slower than dense index for locating records.
 * Good tradeoff:
   * for clustered index: sparse index with an index entry for every block in file, corresponding to least search-key value in the block.
   * For unclusted index : sparse index on top of dense index(multilevel index)
 * Index record points to a bucket that contains pointers to all the actual records with that particular search-key value.
 * Secondary indices have to be dense

### Multilevel Index
 * If index dows not fit in memory, access becomes expensive.
 * Solution: treat index kept on disk as a sequential file and construct a sparse index on it.
   * outer index : a sparse index of the basic index
   * inner index : the basic index file
 * If even outer index is too large to fit in main memory, yet another level of index can be created, and so on.
 * Indices at all levels much be updated on insertion or deletion from the file.
 * Composite search key
   * Values are sorted lexicographically

### B+-Tree Index Files
 * A B+-tree is a rooted tree satisfying the following properties:
   * All paths from root to leaf are of the same length
   * Each node that is not a root or a leaf has between $$\lceil x / 2 \rceil$$ and n children.
   * A leaf node has between $$\lceil (n-1) / 2 \rceil$$ and n - 1 values
   * Special cases:
     * If the root is not aleaf, it has at least 2 children.
     * If the root is a leaf (that is, there are no other nodes in the tree), it can have between 0 and (n-1) values.

### B+-Tree Node Structure
 * Typical node
   * $$P_1, K_1, P_2, ..., P_{n-1}, K_{n-1}, P_n$$
   * $$K_i$$ are the search-key values
   * $$P_i$$ are pointers to children (for non-leaf nodes) or pointers to records or buckets of records (for leaf nodes).
 * The search-keys in a node are ordered
   * $$K_1 < K_2 < ... < K_${n-1}$$
   * (Initially assume no duplicate keys, address duplicates later)

### Leaf Nodes in B+-Trees
 * Properties of a leaf node:
   * For i= 1, ..., n-1, pointer $$P_i$$ points to a file record with search-key value $$K_i$$.
   * If $$L_i, L_j$$ are leaf nodes and i < j, $$L_i$$'s search-key values are less than or equal to $$L_j$$'s search values
   * $$P_n$$ points to next leaf node in search-key order

### Non-Leaf Nodes in B+-Trees
 * Non leaf nodes form a multi-level sparse index on the leaf nodes. For a non-leaf node with m pointer:
   * All the search-keys in the subtree to which $$P_1$$ points are less than $$K_1$$
   * For $$2 \le i \le n-1$$, all the search-keys in the subtree to which $$P_i$$ points have values greater than or equal to $$K_{i-1}$$ and less than $$K_i$$
   * All the search-keys in the subtree to which $$P_n$$ points have values greater than or equal to $$K_{n-1}$$

### Observations about B+-Trees
 * Since the inter-node connections are done by pointers, "logically" close blocks need not be "physically" close.
 * The non-leaf levels of the B+-tree form a hierarchy of sparse indices.
 * The B+-tree contains a relatively small number of levels
   * Level below root has at least 2 * $$\lceil n/2 \rceil$$ values
   * Next level has at least 2 * $$\lceil n/2 \rceil * \lceil n/2 \rceil$$ values
   * ... etc.
   * If there are K search-key values in the file, the tree height is no more than $$\lceil log_{\lceil n/2 \rceil}(K) \rceil$$
   * thus searches can be conduced efficiently.
 * Insertions and deletions to the main file can be handled efficiently, as the index can be restructured in logarithmic time.

### Queries on B+-Trees
```
funciton find(v)
1. C = root
2. while (C is not a leaf node)
  1. Let i be least number s.t V <= K_i,
  2. if there is no such number i then
  3.  Set C = last non-null pointer in C
  4. else if (v = C.K_i) Set C = P_{i+1}
  5. else set C= C.P_{i}
3. if for some i, K_i - V then return C.P_i
4. else return null /* no record with search-key value v exists. */
```

 * Range qureies find all records with search key values in a given range
   * See `function findRange(lb, ub)`
   * Real implementations usually provide an iterator interface to fetch matching records one at a time, using a `next()` function

```
function findRange(lb, ub)
/* Returns all records with search key value V such that lb <= V <= ub */
  Set result Set = {};
  Set C = root node
  while (C is not a leaf node) begin
    Let i = smallest nubmer such that lb <= C.K_i
    if there is no such number i then begin
      Let P_m = last non-null pointer in the node
      Set C= C.P_m
    end
    else if (lb = C.K_i) then Set C = C.P_{i+1}
    else Set C = C.P_i /* lb < C.K_i */
  end
  /* C is a leaf node */
  Let i be the least value such that K_i >= lb
  if there is no such i
    then Set i = 1 + number of keys in C; /* To force move to next leaf */
  Set done = false;
  while (not done) begin
    Let n = nubmer of keys in C.
    if (i <= n and C.K_i <= ub) then begin
      Add C.P_i to resultSet
      Set i = i + 1
    end
    else if (i <= and C.K_i > ub)
      then Set done = true;
    else if (i > n and C.P_{n + 1} is not null)
      then Set C = C.P_{n + 1}, and i = 1 /* Move to next leaf */
    else Set done = true; /* No more leaves to the right */
  end
  return result Set;
```

 * If ther e are K search-key values in the file, the height of the tree is no more than $$\lceil log_{\lceil n / 2 \rceil} (K) \rceil$$.
 * A node is generally the same size as a disk block, typically 4 kilobytes
   *and n is typicall around 100 (40 bytes per index entry).
 * With 1 million search key values and n = 100
   * at most $$log_{50}(1,000,000)$$ = 4 nodes are accessed in a lookup traversal from root to leaf.
 * Contrast this with a balanced binary tree with 1 million searhc key values around 20 nodes are accessed in a look up
   * above difference is significant since very node access may need a disk I/O, costing around 20 milliseconds

### Non-Unique Keys
 * If a search key $$a_i$$ is not unique, create instead an index on a composite key ($$a_i, A_p$$), which is unique
   * $$A_p$$ could be a primary key, record ID, or any other attribute that guarantees uniqueness
 * Search for $$a_j = v$$ can be implemented by a range search on composite key, with range $$(v, - \inf)$$ to $$(v, + \inf)$$
 * But more I/O operations are needed to fetch the actual records
   * If the index is clustering, all accesses are sequential
   * If the index is non-clustering, each record access may need an I/O operation

### Updates on B+-Trees: Insertion
 * Assume record already added to the file. Let:
   * pr be pointer to the record
   * v be the search key value of the record
 * Find the leaf node in which teh search-key value would appear
   * If there is room in the leaf node, insert (v, pr) pair in the leaf node
   * Otherwise, split the node (along with the new (v, pr) entry) and propagate updates to parent nodes.
 * Splitting a leaf node:
   * take the n(search-key value, pointer) pairs( including the one being inserted) in sorted order. Place the first $$\lceil n/2 \rceil$$ in the original node, and the rest in a new node.
   * let the new node be p, and let k be the least key value in p. Insert (k, p) in the parent of the node being split.
   * If the parent is full, split it and propagate the split further up.
 * Splitting of nodes proceeds upwards till a node that is not full is found.
   * In the worst case the root node may be split increasing the height of the tree by 1.

```
procedure insert(value K, pointer P)
  if (tree is empty) create an empty leaf node L, which is also the root
  else Find the leaf node L that should contain key value K
  if (L has less than n - 1 key values)
    then insert_in_leaf(L, K, P)
    else begin /* L has n - 1 key values already, split it */
      Create node L`
      Copy L.P_1, ... L.K_{n-1} to a block of memory T that can hold n (pointer, key-value) pairs
      insert_in_leaf(T, K, P)
      Set L`.P_n = L.P_n; Set L.P_n = L`
      Erase L.P1 through L.K_{n-1} from L
      Copy T.P_1 through T.K_{\lceil n/2 \rceil} from T into L starting at L.P_1
      Copy T.P_{\lceil n/2 \rceil + 1} through T.K_n from T into L` strarting at L`.P_1
      Let K` be the smallest key-value in L`
      insert_in_parent(L, K`, L`)
    end

procedure insert_in_leaf(node L, value K, pointer P)
  if (K < L.K_1)
    then insert P, K into L just before L.P_1
    else begin
      Let K_i be the highest value in L that is less than or equal to K
      Insert P, K into L just after L.K_i
    end

procedure insert_in_parent(node N, value K`, node N`)
  if (N is the root of the tree)
    then begin
      Create a new node R containing N, K`, N` /* N and N` are pointers */
      Make R the root of the tree
      return
    end
  Let P = parent(N)
  if (P has less than n pointers)
    then insert (K`, N`) in P just after N
    else begin /* Split P */
      Copy P to a block of memory T that can hold P and (K`, N`)
      Insert (K`, N`) into T jsut after N
      Erase all entries from P; Create node P`
      Copy T.P_1 ... T.P_{\lceil (n+1)/2 \rceil} into P
      Let `` = T.K_{\lceil(n+1) / 2 \rceil}
      Copy T.P_{\lceil (n+1)/2 \rceil + 1} ... T.P_{n + 1} into P`
      insert_in_parent(P, K``, P`)
    end
```

### Updates on B+-Trees: Deletion
 * Assume record already deleted from file. Let V be the search key value of the record, and Pr be the pointer to the record.
 * Remove (Pr, V) from the leaf node
 * If the node has too few entries due to the removal, and the entries in the node and a sibiling fit into a single node, the merge sibilings:
   * Insert all the search-key values in the two nodes into a single node (the one on the left), and delete the other node.
   * Delete the pari($$K_{i-1}, P_i$$), where $$P_i$$ is the pointer to the delted node, from its parent, recursively using the above procedure.
 * Otherwise, if the node has too few entries due to the removal, but the entries in the node and a sibiling do not fit into a single node, then redistribute pointers:
   * Redistribute the pointers between the node and a sibling such that both have more than the minimum number of entries.
   * Update the coreesponding search-eky value in the parent of the node.
 * The node deletions may cascade upwards till a node which has $$\lceil n/2 \rceil$$ or more pointers is found.
 * If the root node has only one pointer after deletion, it is delted and the sole child becomes the root.

### Complexity of Updates
 * Cost (in terms of number of I/O Operations) of insertion and deletion of a single entry proportional to height of the tree
   * With K entries and maximum fanout of n, worst case complexity of insert/delete of an entry is $$O(log_{\lceil n/2 \rceil}(K))$$
 * In practice, number of I/O operations is less:
   * Internal nodes tend to be in buffer
   * Splits/merges are rare, most insert/delete operations only affect a leaf node
 * Average node occupancy depends on insertion order
   * 2/3rds with random, 1/2 with insertion in sorted order

### Non-Unique Search Keys
 * Alternatives to scheme described earlier
   * Buckets on separate block (bad idea)
   * List of tuple pointers with each key
     * Extra code to handle long lists
     * Deletion of a tuple can be expensive if there are many duplicates on search key
       * Worst case complexity may be linear.
     * Low space overhead, no extra cost for queries
   * Make search key unique by adding a record-identifier
     * Extr storage overhead for keys
     * Simpler code for insertion/deletion
     * Widely used

### B+-Tree File Organization
 * B+-Tree File Organization:
   * Leaf nodes in a B+-tree file organization store records, instead of pointers
   * Helps keep data records clustereed even when there are insertions/deletions/updates
 * Leaf nodes are still required to be half full
   * Since records are larger than pointers, the maximum number of records that can be stored in a leaf node is less than the number of pointers in a nonleaf node.
 * Insertion and deletion are handled in the same way as insertion and deletion of entries in a B+-tree index.
 * Good space utilization important since records use more space than pointers.
 * To improve space utilization, involve more sibling nodes in redistribution during splits and merges
   * Involving 2 siblings in redistribution (to avoid split / merge where possible) results in each node having at least $$\lfloor 2n/3 \rfloor$$ entries

### Other Issues in Indexing
 * Record relocation and secondary indices
   * If a record moves, all secondary indices that store record pointers have to be updated
   * Node splits in B+-tree file organizations become very expensive
   * Solution: use search key of B+-tree file organization instead of record pointer in secondary index
     * Add record-id if B+-tree file organization search key is non-uniuqe
     * Extra traversal of file organization to locate record
       * Higher cost for queries, but node splits are cheap

---
 * ?? 이건 왜 수업때 안하셨지 알아야하는거 같긴한데

### Indexing Strings
 * Variable length strings as keys
   * Variable fanout
   * Use space utilization as criterion for splitting, not number of pointers
 * Prefix compression
   * Key values at internal nodes can be prefixes of full key
     * Keep enough characters to distringuish entries in the subtrees separated by the key value
   * Keys in leaf node can be compressed by sharing common prefixes

### Bulk Loading and Bottom-Up Build
 * Inserting entries on-at-a-time into a B+-tree requires >= 1 IO per entry
   * assuming leaf level does not fit in memory
   * can be very inefficient for loading a large number of entries at a time (bulk loading)
 * Efficient alternative 1:
   * sort entries first (using efficient external-memory sort algorithms)
   * insert in sorted order
     * insertion will go to existing page (or cause a split)
     * much improved IO performance, but most leaf nodes half full
 * Efficient alternative 2: Bottom-up B+-tree construction
   * As before sort entries
   * And then create tree layer-by-layer, starting with leaf level
   * Implemented as part of bulk-load utility by most database systems

### Static Hasing
 * A bucket is a unit of storage containing one or more entries (a bucket is typically a disk block).
   * we obtain the bucket of an entry from its search-key value using a hash function
 * Hash function h is a function from the set of all search-key values K to the set of all bucket addresses B.
 * Hash function is used to locate entries for access, insertion as well as deletion.
 * Entries with different search-key values may be mapped to the same bucket; thus entire bucket has to be searched sequentially to locate an entry.
 * In a hash index, buckets sotre entries with pointers to records
 * In a hash file-organization buckets store records

### Handling of Bucket Overflows
 * Bucket overflow can occur because of
   * Insufficient buckets
   * Skew in distribution of records. This can occur due to two reasons:
     * multiple records has same serach-key value
     * chosen hash function produces non-uniform distribution of key values
 * Although the probability of bucket overflow can be reduced, it cannot be eliminated; it is handled by using overflow buckets.
 * Overflow chaining : the overflow buckets of a given bucket are chained together in a linked list.
 * Above scheme is called closed addressing(also called closed hasing or open hashing depending on the book you use)
   * An alternavtive , called open addressing(also called open hasing or closed hasing depending on the book you use) which doese not use overflow buckets, is not suitable for database applications.

### Deficiencies of Static Hasing
 * In static hasing, function h maps search-key values to a fixed set of B of bucket addresses. Databases grow or shrink with time.
   * If initial number of buckets is too small, and file grows, performance will degrade due to too much overflows.
   * If space is allocated for anticipated growth, a significant amount of space will be wasted initially (and buckets will be underfull).
   * If database shrinks , again space will be wasted.
 * One solution: periodic re-organization of the file with a new hash function
   * Expensive, disrupts normal operations
 * Better solution : allow the number of buckets to be modified dynamically.

### Dynamic Hasing
 * Priodic rehasing
   * If number of entries in a hash table becoms (say) 1.6 times size of hash table,
     * create new hash table of size (say) 2 times the size of the previous hash table
     * rehash all entries to new table
 * Linear Hasing : Do rehasing in an incremental manner
 * Extendable Hasing
   * Tailored to disk based hasing, with buckets shared by multiple hash values
   * Doubling of # of entreis in hash table, without doubling of buckets

### Comparison of Ordered Indexing and Hashing
 * Cost of periodic re-organization
 * Relative frequency of insertions aned deletions
 * Is it desirable to optimize average access time at the expense of worst-case access time?
 * Expected type of queries:
   * Hashing is generally better at retrieving records having a specified value of the key.
   * If range queries are common, ordered indices are to be preferred
 * In practice:
   * PostgreSQL supports hash indices, but discourages use tdue to poor performance
   * Oracle supports static hash organization, but not hash indices
   * SQLServer supports only B+-trees

### Multiple-Key Access
 * Use multiple indices for certain types of queries.
 * Possible strategies for processing query using indices on single attributes

### Indicies on Multiple Keys
 * Composite search keys are search keys containing more than one attribute
 * Lexicographic ordering (a_1, a_2) < (b_1, b_2) if either
   * a_1 < b_1 or, a_1 = b_1 and a_2 < b_2

### Indices on Multiple Attributes
 * With the where clause
   * where A = "a" and B = "b"
   * Using separate indices in less efficient - we may fetch many reecords (or pointers) that satisfy only one of the conditions.
 * Can also efficiently handle
   * where A = "a" and B < "b"
 * But cannot efficiently handle
   * where A < "a" and B = "b"

### Other Features
 * Covering indices
   * Add extra attributes to index so (some) queries can avoid fetching the actual records
   * Store extra attributes only at leaf
 * Particularly useful for secondary indices

### Creation of Indices
 * Example
   ```sql
   create index takes_pk on takes (ID, course_ID, year, semester, section)
   drop index takes_pk
   ```
 * Most database systems allow specification of type of index, and clustering
 * Indices on primary key created automatically by all databases
 * Some database also create indices on foreign key attributes
 * Indices can greately speed up lookups, but impose cost on updates

### Index Definition in SQL
 * Create an index
   ```sql
   create index <index-name> on <relation-name> (<attribute-list>)
   ```
 * Use create unique index to indirectly specify and enforce the condition that the search kye is a candidate key is a candidate key.
   * Not really required if SQL unique integrity constraint is supported
 * To drop an index
   ```sql
   drop index <index-name>
   ```
 * Most database systems allow specification of type of index, and clustering.

### Write Optimized Indices
 * Performance of B+-trees can be poor for write-intensive workloads
   * One I/O per leaf, assuming all internal nodes are in memory
   * With magnetic disks, < 100 inserts per second per disk
   * With flash memory, one page overwrite per insert
 * Two approaches to reducing cost of writes:
   * Lost-structured merge tree
   * Buffer tree

 *  이거 안한거 같은데? LSM 하고 Buffer Tree 는 내용이 많아서 하면 오래 걸리니까 일단 그만하고 Bitmap Index로 건너뛰어야겠다.

---
### Bitmap Indices
 * Bitmap indices are a special type of index designed for efficient querying on multiple keys
 * Records in a relation are assumed to be numbered sequentiall from, sqy, 0
   * Given a number n it must be easy to retrieve record n
     * Particularly easy if records are of fixed size
 * Applicable on attributes that take on a relatively small number of distinct values
 * A bitmap is simply an array of bits
 * In its simplest form a bitmap index on an attribute has a bitmap for each value of the attribute
   * Bitmap has as many bits as records
   * In a bitmap for value v, the bit for a record is 1 if the record has the value v for the attribute, and is 0 otherwise
 * Bitmap indices are useful for queries on multiple attributes
   * not particularly useful for single attribute queries
 * Queries are answered using bitmap operations
   * Intersection (and)
   * Union (or)
 * Each operation takes two bitmaps of the same size and applies the operation on corresponding bits to get the result bitmap
 * Bitmap indices generally very small compared with relation size
 * Deletion needs to be handled properly:
   * Existence bitmap to note if there is a vliad record at a record location
   * Needed for complementation. not(A=v)
 * Should keep bitmaps for all values, even null value:
   * To correctly handle SQL null semantics for Not(A=v):
     * intersect above result with (NOT bitmap-A-null)

## An Introduction to DB Programming
 * Host Langauge
 * Data sublanguage

### DB API
 * ESQL (Embedded SQL)
 * ODBC (Open database connectivity)
 * JDBC (java database connectivity)
 * Web/DB interoperability : ASP/ADO

### Tracsactions in application program
 * AP contains one or more transactions
 * A transaction contains one or more SQL statements

### JDBC
 * Connection:
   * DriverManager.getConnection() : create connection instance
   * createStatement() : create Statement instance
 * Statement:
   * executeQuery() : create ResultSet instance
   * executeUpdate()
 * ResultSet:
   * next()
   * getSTring()
   * getInt()
 * PreparedStatement:
   * created by Connection's prepareStatement()
   * Dynamic SQL
   * setSTring()
   * setInt()

### Dynamic SQL
 * Prepared statment:
   * query를 컴파일하여 저장한 후 인자 값을 바꾸어가며 여러 번 수행가능

```java
public static void CSEE_Student_Name(String userid, String paswd) {
  try {
    Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/dbname?useUnicode=True", userid, passwd);
    Statement stmt = conn.createStatemet();
    ResultSet rset = stmt.executeQuery("select name from student where dept_name= 'test'");

    while (rset.next()) {
      System.out.println("Student name: " + rset.getString("name"));
    }
  } catch (SQLException sqle) {
    System.out.println("SQLException : " + sqle);
  }
}
```

### ESQL
 * Source Program -> Oracle Precompiler -> Modified Source Program -> Compiler -> Object Program -> Linker -> Executable File
 * Oracle Runtime Library(SQLLIB) is linked by Linker.

### Dynamic SQL in ESQL
 * PREPARE
 * EXECUTE
 * EXECUTE IMMEDIATE

### ODBC
 * Four types of Handle:
   * Environment handle
   * Connection handle
   * Statement handle
   * Descriptor handle

### Web/DB Interoperability:ASP/ADO
#### Web/DB Interoperability
 * Web/DB 연동:
   * 데이터베이스 기반의 웹 응용(Database-backed web application)
   * Dynamic Web page (contents)
   * DB 검색 결과 데이터를 browser를 통해 display하기 위한 HTML tagging
 * Web programming with DB APIs:
   * Stored Procedure 및 Oracle의 PL/SQL을 이용한 Web/DB 연동
   * ASP, JSP, PHP의 Web/DB 연동 기능
   * Example: ASP/ADO

## Chapter 15. Query Processing
### Basic Steps in Query Processing
 1. Parsing and translation:
   * translate the query into its internal form. THis is then translated into relation algebra.
   * Parser checks syntax, verifies relations
 2. Optimization
 3. Evaluation:
   * The query-execution engine takes a query-evaluation plan, executes that plan, and returns the answers to the query.
 * Evaluation-plan : Annotated expression specifying detailed evaluation strategy
 * Query Optimization : Amongst all equivalent evalution plans choose the one with lowest cost.:
   * Cost is estimated using statisitcal information from the database catalog

### Measures of Query Cost
 * Many factors contribute to time cost:
   * disk access, CPU, and network communication
 * Cost can be measured based on:
   * reponse time
   * total resource consumption
 * We ignore CPU costs for simplicity:
   * Real systems do take CPU cost into account
   * Network costs must be considered for parallel systems
 * We describe how estimate the cost of each operation:

 * Disk cost can be stimated as:
   * Number of seeks * average seek cost
   * Number of blocks read * average block read cost
   * Number of blocks written * average block write cost
 * For simplicity we just use the number of block transfers from disk and the number of seeks as the cost measures:
   * time to transfer one block : $$t_T$$
   * time for one seek : $$t_s$$
   * Cost for b block transfers plus S seeks:
     * $$ b * t_T + S * t_S$$
   * $$t_s$$ and $$t_T$$ depend on where data is stored; with 4KB blocks
   * Required data may be buffer resident already, avoiding disk I/O:
     * But hard to take into account for cost estimation
   * Several algorithms can reduce disk IO by using extra buffer space:
     * Amount of real memory available to buffer depends on other concurrent queries and OS processes, known only during execution
   * Worst case estimates assume that no data is intially in buffer and only the minimum amount of memory needed for the operation is available:
     * But more optimistic estimates are used in practice

### Selection Operation
 * File scan
 * Algorithm A1(linear search). Scan each file block and test all records to see whether they satisfy the selection condition:
   * Cost estimate = b_r block transfers + 1 seek:
     * $$b_r$$ denotes number of blocks containing records from relation $$r$$
   * If selection is on a key attribute, can stop on fiding record:
     * $$cost = (b_r/2)$$ block transfers + 1 seek
   * Linear search can be applied regardless of:
     * seleciton condition
     * ordering of records in the file
     * availability of indices
 * Note: binary search generally does not make sense since data is not stored consecutively:
   * except when there is an index available
   * binary search requires more seeks than index search
 * Index scan - search algorithms that use an index:
   * selection condition must be on search-key of index.
 * A2(clustering index, equality on key):
   * Retreive a single record that satisfies the coreesponding equality condition
   * $$Cost = (h_i + 1) * (t_T + t_S)$$
 * A3(clustring index, equality on nonkey):
   * Retrieve multiple records.
   * Records will be on consecutive blocks
   * $$Cost = h_i * (t_T + t_S) + t_S + t_T * b$$
 * A4(secondary index, equality on key/non-key):
   * Retrieve a single record if the search-key is a candidate key:
     * $$Cost=(h_i + 1) * (t_T + t_S)$$
   * Retrieve multiple records if search-key is not a candidate key:
     * each of n matching records may be on a different block
     * $$Cost = (h_i + n) * (t_T + t_S)$$

### Selections Involving Comparisions
 * Can implement selection of the form $$\sigma_{A \le V}(r)$$ or $$\sigma_{A \ge V}(r)$$ by using:
   * a linear file scan vs using indeces in the following ways
 * A5(clustering index, comparision) (Relation is sorted on A):
   * For $$\sigma_{A \ge V}(r)$$ use index to find first tuple >= v and scan relation sequentially from there
   * For $$\sigma_{A \le V}(r)$$ just scan relation sequentially till first tuple > v; do not use index.
 * A6(clustering index, comparision):
   * For $$\sigma_{A \ge V}(r)$$ use index to find first index entry >= v and scan index sequentially from there, to find pointers to records.
   * For $$\sigma_{A \le V}(r)$$ just scan leaf pages of index fiding pointers to records, till first entry > v
   * In either case, retrieve records that are pointed to
   * requires an I/O per record; Linear file scan may be cheaper!

### Implementation of Comple Selections
 * Conjunction : $$\sigma_{\theta1 \wedge \theta2 \wedge ... \wedge \theta_n} (r)$$
 * A7 (conjunctive selection using one index):
   * Select a combination of $$\theta_i$$ and algorithms A1 through A7 that results in the least cost for $$\sigma_{\theta i}(r)$$
   * Test other conditions on tuple after fetching it into memory buffer.
 * A8 (conjunctive selection using composite index):
   * Use appropriate composite (multiple-key) index if available.
 * A9 (conjunctive selection by intersection of identifiers):
   * Requires indices with record pointers
   * Use corresponding index for each condition, and take intersection of all the obtained sets of record pointers.
   * Then fetch records from file
   * If some conditions do not have appropriate indices, apply test in memory.
 * Disjunction:$$\sigma_{\theta1 \vee \theta_2 \vee .. \vee \theta n}(r)$$
 * A10 (disjunctive selection by union of identifiers):
   * Applicable if all conditions have available indices:
     * Otherwise use linear scan
   * Use corresponding index for each condition, and take union of all the obtained sets of record pointers
   * Then fetch records from file
 * Negation:$$\sigma_{\neg \theta}(r)$$:
   * Use linear scan on file
   * If very few records satisfy $$\neg \theta$$ and an index is applicable to $$\theta$$:
     * Find satisfying records using index and fetch from file

### Bitmap Index Scan
 * The bitmap index scan algorithm of PostgreSQL:
   * Bridges gap between secondary index scan and linear file scan when number of matching records is not known befor execution
   * Bitmap with 1 bit per page in relation
   * Steps:
     * Index scan used to find record ids, and set bit of corresponding page in bitmap
     * Linear file scan fetching only pages with bit set to 1
   * Performance:
     * Simlar to index scan when only a few bits are set
     * Similar to linear filescan when most bits are set
     * Never behaves very badly compared to best alternative

### Sorting
 * We may build an index on the relation, and then use the index to read the relation in sorted order. May lead to one disk block access for each tuple.
 * For relations that fit in memory, techniques like quicksort can be used.:
   * For relations that don't fit in memory, external sort-merge is a good choice.

### External Sort-Merge
```
Let M denote memory size
1. Create sorted runs. Let i be 0 initially.:
   Repeatedly do the following till the end of the relation:
   (a) Read M blocks of relation into memory
   (b) Sort the in-memory blocks
   (c) Write sorted data to run R_i : increment i.
Let the final value of i be N
1. Merge the runs (N-way merge). We assume (for now) that N < M:
  1. Use N blocks of memory to buffer input runs, and 1 block to buffer output. Read the ifrst block of each run into its buffer page
  2. repeat:
    1. Select the first record (in sort order) among all buffer pages
    2. Write the record to the output buffer. If the output buffer is full write it to disk
    3. Delete the record from tis input buffer page. If the buffer page becomes empty then read the next block (if any) of the run into the buffer.
  3. until all input buffer pages are empty
```
 * If N >= M, several merge passes are required.:
   * In each pass, contiguous groups of M - 1 runs are merged.
   * A pass reduces the number of runs by a factor of M - 1, and creates runs longer by the same factor.:
     * E.g If M= 11, and there are 90 runs, one pass reduces the number of runs to 9, each 10 timns the size of the initial runs
   * Repeated passes are performed till all runs have been merged into one.
 * Cost analysis:
   * 1 block per run leads to too many seesk during merge:
     * Instead use $$b_b$$ buffer blocks per run -> read/write $$b_b$$ blocks at a time
     * Can Merge $$\lfloor M / b_b \rfloor - 1$$ runs in one pass
     * Total number of merge passes required: $$\lceil log_{\lfloor M / b_b \rfloor - 1} (b_r / M) \rceil$$.
     * Block transfers for initial run creation as well as in each pass is $$2b_r$$:
       * for final pass, we don't count write cost:
         * we ignore final write cost for all operations since the output of an operation may be sent to the parent operation without being written to disk
         * Thus total number of block transfers for external sorting:
           * $$b_r(2 \lceil log_{\lfloor M/ b_b \rfloor - 1}(b_r / M) \rceil + 1)$$

### Join Operation
 * Several different algorithms to implement joins:
   * Nested-loop join
   * Block nested-loop join
   * Indexed nested-loop join
   * Merge-join
   * Hash-join
 * Choice based on cost estimate

### Nested-Loop Join
 * To compute the theta join $$r \bowtie_{\theta} s$$
```
for each tutple t_r in r do begin
  for each tuple t_s in s do begin
    test pari(t_r, t_s) to see if they satisfy the join condition \theta
    if they do, add t_r * t_s to the result
  end
end
```
 * r is called the outer relation and s the inner relation of the join.
 * Requires no indices and canbe used with any kind of join condition.
 * Expensive since it examines every pair of tuples in the two relations
 * In the worst case, if there is enough memory only to hold one block of each relation, the stimated cost is:
   * $$n_r * b_s + b_r$$ block transfers, plus $$n_r + b_r$$ seeks
 * If the smaller relation fits entirely in memory, use that as the inner relation:
   * Reduces cost to $$b_r + b_s$$ block transfers and 2 seeks
 * Block nested-loops algorithm is preferable.

### Block Nested-Loop Join
 * Variant of nested-loop join in which every block of inner relation is paried with every block of outer relation.
```
for each block B_r of r do begin
  for each block B_s of s do begin
    for each tuple t_r in B_r do begin
      for each tuple t_s in B_s do begin
        Check if (t_n, t_s) satisfy the join condition
        if they do, and t_r * t_s to the result
      end
    end
  end
end
```

### Indexed Nested-Loop Join
 * Index lookups can replace file scans if:
   * join is an equi-join or natural join and
   * an index is available on the inner relation's join attribute:
     * Can construct an index just to compute to join
 * For each tuple t_r in the outer relation r, use the index to look up tuples in s that satisfy the join condition with tuple t_r
 * Worst case: buffer has space for only one page of r, and , foreach tuple in r, we perform an index lookup on s.
 * Cost of the join: $$b_r(t_T + t_S) + n_r * c$$:
   * Where c is the cost of traversing index and fetching all matching s tuples for one tuple or r.
   * c can be stimated as cost of a single selection on s using the join condition.
 * If indices are available on join attributes of both r and s, use the relation with fewer tuples as the outer relation.

### Merge-Join
 1. Sort both relations on their join attribute (if not already sorted on the join attributes).
 2. Merge the sorted relations to join them:
   1. Join step is similar to the merge stage of the sort-merge algorithm.
   2. Main difference is handling of duplicate values in join attribute - every pari with same value on join attribute must be matched

```
pr := address of first tuple of r
ps := address of first tuple of s
while (ps != null and pr != null) do
  begin
    t_s = tuple to which ps points;
    S_s : = {t_s};
    set ps to point to next tuple of s;
    done := false;
    while (not done and ps != null) do
      begin
        t_s' := tuple to which ps points;
        if (t_s'[JoinAttrs] = t_s[JoinAttrs])
          then begin
              S_s := S_s \cup { t_s '}:
              set ps to point to next tuple of s;
          end
        else done := true;
      end
     t_r := tuple to which pr points;
     while (pr != null and t_r[JoinAttrs] < t_s[JoinAttrs]) do
       begin
         set pr to point to next tuple of r;
         t_r := tuple to which pr points;
       end
     while (pr != null and t_r[JoinAttrs] = t_s[JoinAttrs]) do
       begin
         for each t_s in S_s do
           begin
             add t_s \bowtie t_r to result;
           end
         set pr to point to next tuple of r;
         t_r := tuple to which pr points;
       end
    end
```
 * 뭔가 거창하게 적혀있는데 기본 Merge Sort 알고리즘과 거의 흡사한 구조다.
 * Merge Sort는 숫자가 작은걸 골라서 넣는다면, Merge Join은 Join 조건이 맞으면 넣는거다.
 * 그리고 조건이 맞지 않다면 둘중 하나는 더 작다는 뜻이므로 작은걸 넘겨주면 된다.
 * Can be used only for equi-joins and natural joins : 왜 equi-join 과 natrual join 만 되는지는 알고리즘을 생각해보면 자명하다.
 * Each block needs to be read only once (assuming all tuples for any given value of the join attributes fit in memory)
 * Thus the cost of merge join is:
   * $$b_r + b_s$$ block transfer + $$\lceil b_r / b_b \rceil + \lceil b_s / b_b \rceil$$ seeks + the cost of sorting if relations are unsorted.
 * hybrid merge-join: if one relation is sorted, and the other has a secondary B+-tree index on the join attribute:
   * Merge the sorted relation with the leaf entries of the B=-tree.
   * Sort the result on the addresses of the unsorted relation's tuples
   * Scan the unsorted relation in physical address order and merge with previous result, to replace addresses by the actual tuples:
     * Sequential scan more efficient than random lookup

### Hash-Join
 * Applicable for equi-joins an natrual joins.
 * A hash function h is used to partion tuples of both relations
 * h maps JoinAttrs values to {0, 1, ..., n}, where JoinAttrs denoted the common attributes of r and s used in the natrual join.:
   * r_0, r_1, ..., r_n denote partitions of r tuples:
     * Each tuple $$t_r \in r $$ is put in partition $$r_i$$ where i = h(t_r[JoinAttrs]).
   * s_0, s_1, ... s_n denotes partitions of s tuples:
     * Each tuple $$t_s \in s$$ is put in partition s_i, where i = h(t_s[JoinAttrs]).
 * The hash-join of r and s is computed as follows.:
   1. Parittion the relation s using hashing function h. When partitioning a relation, one block of memory is reserved as the output buffer for each partition.
   2. Partition r similarly.
   3. For each i:
     1. Load s_i into memory and build an in-memory hash-index on it using the join attribute. This hash index uses a different hash function than the earlier one h
     2. Read the tuples in r_i from the disk one by one. For each tuple t_r locate each matching tuple t_s in s_i using the in-memory hash index. Output the concatenation of the attributes.
 * Relation s is called the build input and r is called the probe input
 * The value n and the hash function h is chosen such that each s_i should fit in memory:
   * Typically n is chosen as $$\lceil b_s / M \rceil * f$$ where f is a fudge factor.
   * The probe relation partitions s_i need not fit in memory.
 * Recursive partitioning required if nubmer of partitions n is greater than number of pages M of memory:
   * instead of paritioning n ways, use M - 1 partitions for s
   * Further paritition the M- 1 paritions using a different hash function
   * Use same partitioning method on r

### Hadnling of Overflows
 * Partitioning is said to be skewed if some paritions have significantly more tuples than some others
 * Hash-table overflow occurs in partition s_i if s_i does not fit in memory.:
   * Many tuples in s with same value for join attributes
   * Badh hash function
 * Overflow resolution can be deon in build pahse:
   * Parition s_i is further paritioned using different hash funciton
   * Parition r_i must be similarly partitioned
 * Overflow avoidance performs paritioning carefully to avoid overflows during build phase
 * Both approaches fail with large numbers of duplicates

### Cost of Hash-Join
 * If recursive paritioning is not required: cost of hash join is:
   * $$3(b_r + b_s) + 4 * n_h + 2(\lceil b_r / b_b \rceil + \lceil b_s / b_b \rceil)$$
 * If recursive paritioning required:
   * number of passes required for paritioning build raltion s to less than M blocks per partition is $$\lceil log_{\lfllor M/b_b \r_ceil -1 (b_s / M) \rceil$$}
   * best to choose the smaller relation as the build relation
   * Total cost estimate is:
     * $$2(b_r + b_s) \lceil log_{lfloor M / b_b \rfloor -1} (b_s / M) \rceil + b_r + b_s + 2(\lceil b_r / b_b \rceil + \lceil b_s / b_b \rceil) \lceil log_{\lceil M/ b_b \rceil - 1} (b_s / M) \rceil$$
  * If the entire build input can be kept in main memory no partitioning is required:
    * Cost estimate goest down to $$b_r + b_s$$

### Complex Joins
 * Join with a conjunctive condition:
   * $$r \bowtie_{\theta_1 \wedge \theta_2 \wedge ... \wedge \theta_n} s$$
   * Either use nested loops/block nested loops or
   * Compute the result of one of the simpler joins $$r \bowtie_{\theta_i} s$$:
     * final result comprieses those tuples in the intermediate results that satisfy the remaining condition
 * Join with a disjunctive condition:
   * $$r \bowtie_{\theta_1 \vee \theta_2 \vee ... \vee \theta_n} s$$
   * Either use nested loops/block nested loops, or
   * Compute as the union of the records in individual joins $$r \bowtie_{\theta_j} s$$

### Joins over Spatial Data
 * No simple sort order for spatial joins
 * Indexed nested loops join with spatial indices:
   * R-trees, quad-trees, k-d B-trees

### Other Operations
 * Duplicate elimination can be implemented via hashing or sorting.:
   * On sorting duplicates will come adjacent to each other, and all but one set of duplicates can be deleted.
   * Optimization: duplicates can be deleted during run generation as well as at intermediate merge steps in external sort-merge.
   * Hashing is similar - duplicates will come into the same bucket.
 * Projection:
   * perform projection on each tuple
   * followed by duplicate elimination

 * Aggretion can be implemented in a manner similar to duplicate elimination:
   * Sorting or hasing can be used to bring tuples in the same group together, and then the aggregate functions can be applied on each group
   * Optimization: partial aggregation:
     * combine tuples in the same group during run generation and intermediate merges, by computing partial aggregate values
     * For count, min, max, sum: keep aggregate values on tuples found so far in the group:
       * When combining partial aggregate for count, add up the partial aggregates

  * Set operations ($$\cup, cap$$ and - ) : can either use variant of merge-join after sorting, or variant of hash-join.
  * E.g., Set operations using hashing:
    * Parition both relations using the sam hash function
    * Process each partition as i as follows:
      * Using a different hashing function, build an in-memory hash index on r_i.
      * Process s_i as follows:
        * $$r \cup s$$:
          * Add tuples in s_i to the hash index if they are not already in it.
          * At end of s_i add the tuples in the hash index to the result
        * $$r - s$$:
          * for each tuple in s_i, if it is there in the hash index, delete it from the index.
          * At end of s_i add remaining tuples in the hash index to the result

### Answering Keyword Queries
 * Indices mapping keywords to documents:
   * For each keyword, store sorted list of document IDs that contain the keyword:
     * Commonly referred to as a inverted index
   * To answer a query with several keywords, compute intersection of lists corresponding to those keywords
 * To support ranking, inverted lists sotre extra information:
   * Term frequency of the keyword in the document
   * Inverse document frequency of the keyword
   * Page rank of the document/web page

### Outer Join
 * Outer join can be computed either as:
   * A join followed by addition of null-padded non-participating tuples
   * by modifying the join algorithms
 * Modifying merge joint to compute r ⟕ s:
   * In r ⟕ s, none paritcipating tuples are those in $$r - \Pi_R (r \bowtie s)$$
   * Modify merge-join to compute r ⟕ s:
     * During merging, for every tuple t_r from r that do not match any tuple in s, output t_r padded with nulls.
   * Right outer-join and full outer-join can be computed similarly.

### Evalution of Expressions
 * Alternatives for evaluting an entire expression tree:
   * Matrialization: generate results of an expression whose inputs are relations or are already computed, materialize(store) it on disk. Repeat
   * Pipelining: pass on tuples to parent operations even as an operation is beign executed

### Materialization
 * Materialized evaluation : evaluate one operation at a time, starting at the lowest-level. Use intermediate results materialized into temporary relations to evalue next-level operations.
 * Materialized evaluation is alreays appilcable
 * Cost of writing results to disk and reading them back can be quite high:
   * Our cost formulas for operations ignore cost of writing results to disk, so:
     * Overall cost = Sum of costs of individual operations + cost of writing intermediate results to disk.
 * Double buffering : use two output buffers for each operation, when one is full write it to disk while the other is getting filled:
   * Allows overlap of disk writes with computation and reduces execution time

### Pipelining
 * Pipelined evaluation: evaluate several operations simultaneously, passing the results of one operation on to the next.
 * Much cheaper than materialization: no need to store a temporary relation to disk.
 * Pepelining may not always be possible - e.g. sort, hash-join
 * For pipelining to be effective, use evaluation algorithms that generate output tuples even as tuples are received for inputs to the operation.
 * Pipelines can be executed in two ways: demand driven and producer driven
 * In demand driven or lazy evalutaion:
   * system repeatedly requests next tuple from top level operation
   * Each operation requests next tuple from children operations as required, in order to output its next tuple
   * In between calls, operation has to maintain "state" so it knows what to return next
 * In producer-driven or eager pipelining:
   * Operators produce tuples eagerly and pass them up to their parents:
     * Buffer maintained between operators, child puts tuples in buffer, parent removes tuples from buffer.
     * If buffer is full, child waits till their is space in the buffer, and then generates more tuples
   * System schedules operations that have space in output buffer and can process more input tuples
 * Implementation of demand-driven pipelining:
   * Each operation is implemented as an iterator implementing the following operations:
     * open(), next(), close()

### Blocking Operations
 * Blocking operations : cannot generate any output until all input is consumed:
   * E.g. sorting, aggregation
 * But can often consume inputs from a pipeline, or produce outputs to a pipeline
 * Key idea: blocking operations often have two suboperations:
   * E.g., for sort: run generation and merge
   * For hash join: partitioning and build-probe
 * Treat them as separate operations

### Pipeline Stages
 * Pipeline stages:
   * All operations in a stage run concurrently
   * A stage can start only after preceding stages have completed execution

### Evaluation Algorithms for Pipelining
 * Some algorithms are not able to output results even as they get input tuples:
   * E.ge., merge join, or hash join
   * intermediate results written to disk and then read back
 * Algorithm variants to generate (at least some) results on the fly, as input tuples are read in:
   * E.g. hybrid hash join generates output tuples even as probe relation tuples in the in-memory partition (partition 0) are read in
   * Double-pipelined join technique : Hybrid hash join, modified to buffer parititon 0 tuples of both relations in-memory, reading them as they become avaialbe, and output results of any matches between parition 0 tuples:
     * When a new r_0 tuple is found, match it with existing s_0 tuples, output matches,  and save it in r_0
     * Symmetrically for s_0 tuples

### Pipelining for Continuous-Stream Data
 * Data  streames:
   * Data entring database in a continuous manner
 * Continuous queries:
   * Results get updated as streaming data enters the database
   * Aggregtation on windows if often used:
     * E.g., tumbling windows divide time into units, e.g. hours, minutes
 * Need to use pipelined processing algorithms:
   * Punctuations used to infer when all data for a window has been received

### Query Processing In memoery
 * Query compilation to machine code:
   * Overheads of interprelation:
     * Overhead of expression evaluation
   * Compilation can avoid many such overheads and speed up query processing
   * Often via generation of JAva byte code /LLVM, with just-in-time(JIT) compilation
 * Column-oriented storage:
   * Allows vectoer operations (in conjunction with compilation)
 * Cache conscious algorithms

### Cache Conscious Algorithms
 * Goal: minimize cache misses, make best use of data fetched into the cache as part of a ache line
 * For sorting:
   * Use runs that are as large as L3 cache (a few megabytes) to avoid cache misses during sorting of a run
   * THen merge runs as usual in merge-sort
 * For hash-join:
   * First create parititions such that build+probe paritions fit in memory
   * THen subpartition further s.t. build subparittion+index fits in L3 cache:
     * Speeds up probe phase significantly by avoiding cache misses
 * Lay out attributes of tuples to maximize cache usage:
   * Attributes that are often accessed together should be stored adjacent to each other
 * Use multiple threads for parallel query processing:
   * Cache misses leads to stall of one thread, but others can proceed

---
 생각보다 수업시간에 안다룬 내용이 많았는데 그냥 그런가보다 하고 정리했다.
 어짜피 도움되는 내용이기도 하고, PPT만 안했지 말로는 설명한 부분들도 있었기 때문이다.

## Chapter 16. Query Optimization
 * An evaluation plan defines exactly what algorithm is used for each operation, and how the execution of the operations is coordinated.
 * Cost difference between evaluation plans for a query can be enormous
 * Steps in cost-based query optimization:
   * Generate logically equivalent expressions using equivalence rules
   * Annotate resultant expressions to get alternative query plans
   * Choose the cheapest plan based on estimated cost
 * Estimation of plan cost based on:
   * Statistical information about relations
   * Statistics estimation for intermediate results
   * Cost formulae for algorithms, computed using statistics

### Viewing Query Evaluation Plans
 * Most database support `explain <query>`:
   * Displays paln chosen by query optimizer, along with cost estimates
   * Some syntax variations between databases
 * Some databases (e.g. PostgreSQL) support `explain analyse <query>`:
   * Show actual runtime statistics found by running the query, in addition to showing theplan
 * Some databases (e.g. PostgreSQL) show cost as f..l:
   * f is the cost of delivering first tuple and l is cost of delivering all results

### Generting Equivalent Expressions
### Transofrmation of Relational Expressions
 * Two relational algebra expressions are said to be equivalent if the two expressions generate the same set of tuples on every legal database instance:
   * Note : order of tuples is irrelevant
   * we don't care if they generate different results on databases that violate integrity constraints
 * In SQL, inputs and outputs are multisets of tuples:
   * Two expressions in the multiset version of the relational algebra are said to be equivalent if the two expressions generate the same multiset of tuples on every legal database instance.
 * An equivalence rule says that expressions of two forms are equivalent:
   * Can replace expression of first form by second, or vice versa

### Equivalence Rules
 1. Conjunctive selection operations can be deconstructed into a sequence of individual selections.:
   * $$\sigma_{\theta_1 \wedge \theta_2}(E) \equiv \sigma_{\theta_1}(\sigma_{\theta_2}(E))$$
 2. Selection operations are commutative.:
   * $$\sigma_{\theta_1}(\sigma_{\theta_2}(E)) \equiv \sigma_{\theta_2}(\sigma_\theta_1(E))$$
 3. Only the last in a sequnce of projection operations is needed, theothers can be omitted.:
   * $$\Pi_{L_1} (\Pi_{L_2}(... ( \Pi_{L_n}(E)) ... )) \equiv \Pi_{L_1}(E)$$
   * where $$L_1 \subseteq L_2 \subseteq ... \subseteq L_n$$
 4. Selections can be combined with Cartesian products and theta joins.:
   * $$\sigma_{\theta} ( E_1 \times E_2) \euiqv E_1 \bowtie_{\theta} E_2$$
   * $$\sigma_{\theta_1}( E_1 \bowtie_{\theta_2} E_2) \equiv E_1 \bowtie_{\theta_1 \wedge \theat_2} E_2$$
 5. Theta-join operations (and natural joins) are commutative.:
   * $$E_1 \bowtie E_2 \equiv E_2 \bowtie E_1$$
 6. :
   * Natural join operations are associate:
     * $$(E_1 \bowtie E_2) \bowtie E_3 \equiv E_1 \bowtie(E_2 \bowtie E_3)$$
   * Theta jions are associative in the following manner:
     * $$(E_1 \bowtie_{\theta_1} E_2) \bowtie_{\theta_2 \wedge \theata_3} E_3) \equiv E_1 \bowtie_{\theta_1 \wedge \theta_3} (E_2 \bowtie_{\theta_2} E_3)$$
     * where $$\theta_2$$ involves attributes from only $$E_2$$ and $$E_3$$
 7. The selection operation distributes over the theta join operation under the following two conditions:
   1. When all the attributes in $$\theta_0$$ involve only the attributes of one of the expressions ($$E_1$$) being joined.:
     * $$\sigma_{\theta_0} (E_1 \bowtie_{\thtea} E_2) \equiv (\sigma_{\theta_0} (E_1)) \bowtie_{\theta} E_2$$
   2. When $$\theta_1$$ involves only the attributes of $$E_1$$ and $$\theta_2$$ involves only the attributes of $$E_2$$:
     * $$\sigma_{\theta_1 \wedge \theat_2}(E_1 \bowtie_{\theta} E_2) \equiv (\sigma_{\theta_1} (E_1)) $$
 8. The projection operation distributes over the theta join operation as follows:
   1. if $$\theta$$ involves only attributes from $$L_1 \cup L_@$$:
     * $$\Pi_{L_1 \cup L_2} (E_1 \bowtie_{\theta} E_2) \equiv \Pi_{L_1} (E_1) \bowtie_{\theta} \Pi_{L_2} (E_2)$$
   2. In general, consider a join $$E_1 \bowtie_{\theta} E_2$$:
     * Let $$L_1$$ and $$L_2$$ be sets of attributes from $$E_1$$ and $$E_2$$, respectively.
     * Let $$L_3$$ be attributes of $$E_1$$ that are involved in join condition $$\theta$$, but are not in $$L_1 \cup L_2$$
     * Let $$L_4$$ attributes of $$E_2$$ that are involved in join condition $$\theta$$, but are not in $$L_1 \cup L_2$$:
       * $$\Pi_{L_1 \cup L_2} (E_1 \bowtie_{\theta} E_2) \equiv \Pi_{L_1 \cup L_2} (\Pi _{L_1 \cup L_3}(E_1) \bowtie_{\theta} \Pi_{\L_2 \cup L_4 } (E_2))$$
       * Similar equivalences hold for outerjoin operations
 9. The set operations union and intersection are commutative:
   * $$E_1 \cup E_2 \equiv E_2 \cup E_1$$
   * $$E_1 \cap E_2 \equiv E_2 \cap E_1$$
 10. Set union and intersection are associative.:
   * $$(E_1 \cup E_2) \cup E_3 \equiv E_1 \cup (E_2 \cup E_3)$$
   * $$(E_1 \cap E_2) \cap E_3 \equiv E_1 \cap (E_2 \cap E_3)$$
 11. The selection operation distributes over $$\cup,\cap$$ and -:
   * $$ \sigma_{\theta}(E_1 \cup E_2) \equiv \sigma_{\theta} (E_1) \cup \sigma_{\theta}(E_2)$$
   * $$ \sigma_{\theta}(E_1 \cap E_2) \equiv \sigma_{\theta} (E_1) \cap \sigma_{\theta}(E_2)$$
   * $$ \sigma_{\theta}(E_1 - E_2) \equiv \sigma_{\theta} (E_1) - \sigma_{\theta}(E_2)$$
   * $$ \sigma_{\theta}(E_1 \cap E_2) \equiv \sigma_{\theta} (E_1) \cap E_2$$
   * $$ \sigma_{\theta}(E_1 - E_2) \equiv \sigma_{\theta} (E_1) - E_2$$
   * preceding equivalence does not hold for $$\cup$$
 12. The projection operation distributes over union:
   * $$\Pi_L (E_1 \cup E_2) \equiv (\Pi_L(E_1)) \cup (\Pi_L(E_2))$$
 13. Selection distributes over aggregation as below:
   * $$\sigma_\theta(_G \gamma _A (E)) \equiv _G \gamma _A (\sigma_\theta(E))$$
   * provided $$\theta$$ only involves attributes in G
 14. Outerjoin is commutative?:
   * Full outerjoin is commutative
   * Lef and right outerjoin are not commutativeo
 15. Selection distributes over left and right outerjoins
 16. Outerjoins can be replaced by inner joins under some conditions

### Enumeration of Equivalent Expressions
 * Query optimizers use equivalence rules to systematically generate expressions equivalent to the given expression
 * Can generate all equivalent expressions as follows:
   * Repeat:
     * apply applicable equivalence rules on every subexpression of every equivalent expression found so far
     * add newly generated expressions to the set of equivalent expressions
   * Until no new equivalent expressions are generated above
 * The above approach is very epxrensive in space and time:
   * Two approaches:
     * Optimized plan generation based on transformation rules
     * Special case approach for queries with only selections, projections and joins

### Implementing Transformation Based Optimization
 * Space requirements reduced by sharing common sub-expressions:
   * when E1 is generated from E2 by an equivalence rule, usually only the top level ofthe two are different, subtrees below are the same and can be shared using pointers
   * Sam sub-expression may get generated multiple times:
     * Detect duplicate sub-expressions and share one copy
 * Time requirements are reduced by not generating all expressions:
   * Dynamic programming

### Cost Estimation
 * Cost of each operator computer as described in Chapter 15:
   * Need statistics of input relations (E.g., number of tuples, size of tuples)
 * Inputs can be results of sub-expressions:
   * Need to estimate statistics of expression results
   * To do so, we require additional statistics (e.g., number of distinct values for an attribute)
 * More on cost estimation later

### Choice of Evaluation Plans
 * Must consider the interaction of evaluation techniques when choosing evaluation plans:
   * choosing the cheapest algorithm for each operation independently may not yield best overall algorithm
   * E.g:
     * merge-join may be costlier than hash-join, but may provide a sorted output which reduces the cost for an outer elevel aggregation.
     * nested-loop join may provide opportunity for pipelining
   * practical query optimizers incorporate elements of the following two broad approaches:
     * Search all the plans and choose the best plan in a cost-based function
     * Uses heuristics to choose a plan.

### Cost-Based Optimization
 * Consider finding the best join-order for $$r_1 \bowtie r_2 \bowtie \cdots \bowtie r_n$$
 * There are $$\frac{(2(n-1))!}{(n-1)!}$$ different join orders for above expression:
   * Too large number
 * No need to generate all the join orders. Using dynamic programming, the least-cost join order for any subset of $$\{r_1, r_2, ..., r_n\}$$ is computed only once and stored for future use.

### Dynamic Programming in Optimization
 * To find best join tree for a set of n relations:
   * To find best plan for a set S of n relations, consider all possible plans of the form: $$S_1 \bowtie (S - s_1)$$ where $$S_1$$ is any non-empty subset of S.
   * Recursively compute costs for joining subsets of S to find the cost of each plan. Choose the cheapest of the $$2^n - 2$$alternatives.
   * Base case for crcursion: single relation access plan:
     * Apply all selections on $$R_i$$ using best choice of indices on $$R_i$$
     * When plan for nay subset is ocmputed, sotre it and reuse it when it is required again, instead of recomputing it

### Join Order Optimization Algorithm
```
procdedure findbestplan(S)
  if (bestplan[S].cost != \infty)
    return bestplan[S]
  // else bestplan[S] has not been computed earlier, compute it now
  if (S contains only 1 relation)
    set bestplan[S].plan and bestpaln[S].cost based on the best wy of accessing
    S using selections on S and indices (if any) on S else for each non-empty
    subset S1 of S such that S1 != S

    P1 = findbestplan(S1)
    P2 = findbestplan(S - S1)
    for each algorithm A for joining results of P1 and P2
      // For indexed-nested loops join, the outer could be P1 or P2
      // Similarly for hash-join, the build relation could be P1 or P2
      // We assume the alternatives are considered as separate algorithms
      if algorithm A is indexed nested loops
        Let P_i and P_0 denote inner and outer inputs
        if P_i has a single relation r_i and r_i has an index on the join attribute
          plan = "execute P_0 plan; join results of P_0 and r_i using A",
                 with any selection conditions on P_i performed as part of the join condition
          cost = P_0 cost + cost of A
        else cost = \infty; /* cannot use indexed nested loops join */
      else
        plan = "execute P1.plan; execute P2.plan;
                join results of P1 and P2 using A;"
        cost = P1.cost + P2.cost + cost of A

      if cost < bestplan[S].cost
        bestplan[S].cost = cost
        bestplan[S].plan = plan;
  return bestplan[S]
```

### Left Deep Join Trees
 * In left-deep join trees, the right-hand-side input for each join is a relation, not the result of an intermediate join.

### Cost of Optimization
 * With dynamic programming time complexity of optimization with bushy trees is O(3^n)
 * Space complexity is O(2^n)
 * To find best left-deep join tree for a set of n relations:
   * Consider n alternatives with one relation as right-hand side input and the other relations as left-hand side input
   * Modify optimization algorithm
 * If ony left-deep trees are considered, time complexity of finding best join order is O(n 2^n)
 * Cost-based optimization is expensive, but worthwhile for queries on large datasets

### Interesting Sort orders
 * Consider the expression $$(r_1 \bowtie r_2) \bowtie r_3$$ (with A as common attribute)
 * An interesting sort order is a particular sort order of tuples that could make a later operation (join/group by/order by) cheaper:
   * Using merge-join to compute $$r_1 \bowtie r_2$$ may be costlier than hash join but gnerates result sorted on A
   * Which in turn may make merge-join with $$r_3$$ cheaper, which may reduce cost of join with $$r_3$$ minimizing overall cost
 * Not sufficient to find the best join order for each subset of the set of n given relations:
   * must find the best join order for each subset, for each interesting sort order
   * Simple extension of earlier dynamic programming algorithms
   * Usually, number of interesting orders is quite small and doesn't affect time/space complexity significantly

### Cost Based Optimization with Equivalence Rules
 * Physical equivalence rules allow logical query plan to be converted to physical query plan specifying what algorithms are used for each operation.
 * Efficient optimizer based on equivalent rules depends on:
   * A space efficient representation of expressions which avoids making multiple copies of subexpressions
   * Efficient techniques for detecting duplicate derivations of expressions
   * A form of dynamic programming based on memoization, which stores the best plan for a subexpression the first time it is optimized, and reuses in on repeated optimization calls on same subexpression
   * Cost-based pruning techinques that avoid generating all plans
 * Pioneered by athe Volcano project and implemented in the SQL Server optimizer

### Heuristic Optmization
 * Cost-based optimzation is expesnvie, even with dynamic programming.
 * Systems may use heuristics to reduce the number of choices that must be made in a cost-based fashion.
 * Heuristic optimization transforms the query-tree by usign a set of rules that typically (but not in all cases) improve execution performance:
   * Perform selection early (reduces the nubmer of tuples)
   * Perform projection early (reduces the number of attributes)
   * Perform most restrictive selection and join operations(e.e., with smallest result size) before other similar operations.
   * Some systems use only heuristics, others combine heuristics with partial cost-based optimization

### Structure of Query Optimizers
 * Many optimizers considers only left-deep join orders:
   * Plus heuristics to push selections and projections down the query tree
   * Reduces optimization complexity and generates plans amendable to pipelined evaluation.
 * Heuristic optimization used in some versions of Oracle:
   * Repeatedly pick "best" relation to join next:
     * Starting from each of n starting points. Pick best among these
 * Intricacies of SQL complicate query optimization
 * Some query optimizers integrate heuristic selection and the generation of alternative access plans.:
   * Frequently used approach:
     * hueristic rewriting of nested block structure and aggregation
     * followed by cost-based join-order optimization for each block
   * Some optimizers apply transformations to entire query and do not depend on block structure
   * Optimization cost budget to stop optimization early (if cost of plan is less than ocst of optimization)
   * Plan caching to reuse previously computed plan if query is resubmitted:
     * Even with different constants in query
 * Even with the use of heuristics, cost-based query optimization imposes a substantial overhead.
   * But is worth it for expesnive queries
   * Optimizers often use simple heuristics for very cheap queries, and perform exhaustive enumeration for more expensive queries

### Statistics for Cost Estimation
### Statistical Information for Cost Estimation
 * $$n_r$$ : number of tuples in a relation r.
 * $$b_r$$ : number of blocks containing tuples of r
 * $$l_r$$ : size of a tuple of r
 * $$f_r$$ : blocking factor of r - i.e., the number of tuples of r that fit into one block.
 * V(A, r) : nubmer of distinct values that appear in r for attribute A; same as the size of $$\Pi_A(r)$$
 * If tuples of r are stored together physically in a file, then:
   * $$b_r = \lceil \frac{n_r}{f_r} \rceil$$

### Histograms
 * Histogram on attribute age of relation person
 * Equi-width histograms
 * Equi-depth histograms break up range such that each range has (approximately) the same number of tuples
 * Many databases also sotre n most-frequent values and their counts:
   * Histogram is built on remaining values only
 * Histograms and other statistics usually computed based on a random sample
 * Statistics may be otu of date:
   * Some database require a nalyze command to be executed to update statistics
   * Others automatically recompute statistics

### Selection Size Estimation
 * $$\sigma_{A=v}(r)$$:
   * $$n_r / V(A, r)$$ : number of records that will statisfy the selection
   * Equality condition on a key attribute: size estimate = 1
 * $$\sigma_{A \le V}(r)$$ (case of $$\sigma_{A \ge V}(r)$$ is symmetric):
   * Let c denote the estimated number of tuples satisfying the condition.
   * If min(A,r) and max(A, r) are available in catalog:
     * c = 0 if v < min(A, r)
     * $$c = n_r \frac{v - min(A,r)}{max(A,r) - min(A,r)}$$
   * If histograms available, can refine above estimate
   * In absence of statistical information c is assumed to be $$n_r / 2$$

### Size Estimation of Complex Selections
 * The selectivity of a condition $$\theta_i$$ is the probability that a tuple in the relation r satisfies $$\theta_i$$.:
   * If $$s_i$$ is the number of satisfying tuples in r, the selctivity of $$\theta_i$$ is given by $$s_i / n_r$$.
 * Conjunction : $$\sigma_{\theta_1 \wedge \theta_2 ... \wedge \theta_n}(r)$$. Assuming independence, estimate of tuples in the result is : $$n_r * \frac{s_1 * s_2 * ... * s_n}{n_r^n}$$
 * Disjunction : $$\sigma_{\theta_1 \vee \theta_2 \vee ... \vee \theta_n}(r)$$ Estimated number of tuples:
   * $$n_r * (1 - (1 - \frac{s_1}{n_r}) * (1 - \frac{s_2}{n_r}) * \cdots * (1 - \frac{s_n}{n_r}))$$
 * Negation : $$\sigma_{\neg \theta}(r)$$. Estimated number of tuples:
   * $$n_r - size(\sigma_{\theta}(r))$$

### Estimation of the Size of Joins
 * The Cartesian product $$r \times s$$ contains $$n_r n_s$$ tuples; each tuple occupies $$s_r + s_s$$ bytes.
 * If $$R \cap S = \phi$$, then $$r \bowtie s$$ is the same as $$r \times s$$
 * If $$R \cap S$$ is a key for R, then a tuple of s will join with at most one tuple from r:
   * therefore, the number of tuples in $$r \bowtie s$$ is no greater than the number of tuples in s
 * If $$R \cap S$$ in S is a foreign key in S referencing R, then the number of tuples in $$r \bowtie s$$ is exactly the same as the number of tuples in s.:
   * The case for $$R \cap S$$ being a foreign key referencing S is symmetric.

 * If $$R \cap S = \{ A \}$$ is not a key for R or S:
   * If we assume that every tuple t in R produces tuples in $$R \bowtie S$$, the number of tuples in $$R \bowtie S$$ is estimated to be:
     * $$\frac{n_r * n_s}{V(A, S)}$$
   * If the reverse is true, the estimate obtained will be:
     * $$\frac{n_r * n_s}{V(A, r)}$$
   * The loer of these two estimates is probably the more accurate one.
 * Can improve on above if histograms are available:
   * Use formula similar to above, for each cell of histograms on the two relations

### Size Estimation for Other Operations
 * Projection : estimated size of $$\Pi_A (r) = V(A, r)$$
 * Aggregation : estimated size of $$_G \gamma _A(r) = V(G, r)$$
 * Set operations:
   * For unions/intersections of selections on the same relation: rewrite and use size estimate for selections
   * For operations on different relations:
     * estimated size of $$r \cup s$$ = size of r + size of s.
     * estimated size of $$r \cap s$$ = minimum size of r and size of s.
     * estimated size of r - s = r.
     * All the three estimates may be quite inaccurate, but provide upper bounds on the sizes
 * Outer join:
   * Estimated size of r ⟕ s = size of $$r \bowtie s$$ + size of r
   * Estimated size of r ⟗ s = size of $$r \bowtie s$$ + size of r + size of s

### Estimation of Number of Distinct Values
 * Selections : $$\sigma_{\theta} (r)$$:
   * If $$\theta$$ forces A to take a specified value : $$V(A, \sigma_{\theta} (r)) = 1$$
   * If $$\theta$$ forces A to take on one of a specified set of values:
     * $$V(A, \sigma_{\theta} (r))$$ = number of specified values
   * If the selection condition $$\theta$$ is of the form A op r:
     * estimated $$V(A, \sigma_{\theta} (r)) = V(A,r) *s$$
     * where s is the selectivity of the selection.
   * In all the other cases: use approximate estimate of:
     * $$min(V(A,r), n_{\sigma_{\theta}(r)})$$
     * More accurate estimate can be got using probability theory, but this one works fine generally
 * Joins :$$r \bowtie s$$:
   * If all ttributes in A are from r:
     * estimated $$V(A, r \bowtie s) = min (V(A, r), n_{r \bowtie s})$$
   * If A contains attributes A1 from r and A2 from s, then estimated:
     * $$V(A, r \bowtie s) = min(V(A1, r) * V(A2 - A1, s), V(A1 - A2, r)* V(A2, s), n_{r \bowtie s})$$
     * More accurate estimate can be got using probability theory, but this one workts fine generally
 * Estimation of distnct values are straightforward for projections.:
   * They are the same in $$\Pi_{A(r)}$$ as in r.
 * The same holds for grouping attributes of aggregation
 * For aggregated values:
   * For min(A) and max(A), the number of distinct values can be estimated as min(V(A,r), V(G, r)) where G denotes grouping attributes
   * For other aggregates, assume all values are distinct, and use V(G, r)

### Additional Optimization techinques
 * SQL conceptually treats nested subqueries in the where clause as functions that take parameters and return a single vlaue of set of vlaues:
   * Parameters are variables from outer level query that are used inthe nested subquery; such variables are called correlation variables
 * Conceptually, nested subquery is executed once for each tuple in the corss-product generated by the outer level from clause:
   * Such evalution is called correlated evaluation
   * Note: other conditions in where clause may be used to compute a join (instead of a corss-product) before executing the nested subquery
 * Correlated evaluation may be quite inefficient since:
   * a large number of calls may be made to the nested query
   * there may be unnecessary random I/O as a result
 * SQL optimizers attempt to transform nested subqueries to joins where possible, enabling use of efficient join techinuqes

### Materialized Views
 * A materialized view is a view whose contents are computed ans stored.

#### Materialized View Maintenance
 * The task of keeping a materialized view up-to-date with the underlying data is known as materialized view maintenance
 * Materialized views can be maintained by recomputation on every update
 * A better option is to use incremental view maintenance:
   * Changes to database relatiosn are used to compute changes to the materialized view, which is then updated
 * View maintenance can be done by:
   * Manually defining triggers on insert, delete, and update of each relation in the view definition
   * Manually writeen code to update the view whenever database relations are updated
   * Periodic recomputation
   * Incremental maintenance supported by many database systems:
     * Avoids manual effort/correctness issues

#### Incremental View Maintenance
 * The changes (inserts and deletes) to a relation or expressions are reffered to as its differential:
   * Set of tuples inserted to and deleted from r are denoted $$i_r$$ and $$d_r$$
 * To simplify out description, we only consider inserts and deletes:
   * We replace updates to a tuple by deletion of the tuple followed by insertion of the update tuple
 * We describe how to compute the chnage to the result of each relational operation, given changes to its inputs
 * We then outline how to handle relational algebra expressions

#### Join Operations
#### Aggregation Operations
#### Other Operations
#### Handling Expressions
#### Query Optimization and Materialized Views

양이 너무 많다 ㅠ 학교 시험 범위는 아니라 읽어만 보고 정리는 생략했다.
수식을 입력하는데 시간이 너무 오래 걸린다. 사실 이렇게 오래동안 필기할 내용은 아니였는데 ㅠ
---

## Chapter 17 Transaction
### Transaction Concept
 * A transaction is a unit of program execution that accesses and possibly updates various data items.
 * Two main issues to deal with:
   * Failures of various kinds, such as hardware failures and system crashes
   * Concurrent execution of multiple transactions
 * Atomicity requirement:
   * The system should ensure that updates of a partially executed transaction are not reflected in the database
 * Durability requirement : the updates to the database by the transaction must persist even if there are software or hardware failures.
 * Consistency requirement:
   * Explicitly specified integrity constraints such as primary keys and foreign keys
   * Implicit integrity constraints
   * A transaction must see a consistent database
   * During transaction execution the database may be temporarily inconsistent
   * When the transcation complete successfully the database must be consistent:
     * Erroneous transaction logic can lead to inconsistency
 * Isolation requirement:
   * isolation can be ensured trivially by running transctions serially

### ACID Properties
 * A transcation is a unit of program execution that acesses and possibly updates various data itmes. To preserve the integrity of data the database system must ensure:
   * Atomicity. Either all operations of the transcation are properly reflected in the database or none are.
   * Consistency. Execution of a transcation in isolation preserves the consistency of the database
   * Isolation. Although multiple transactions may exectue concurrently, each transaction must be unaware of other ocncurrently executing transactions. Intermediate transaction results must be hidden from other concurrently executed transactions
   * Durability. After a transcation completes successfully, the changes it has made to the database persist, even if there are system failures.

### Transaction State
 * Active - the initial state; the transaction stays in this state while it is executing
 * Partially committed - after the final statment has been executed.
 * Failed - after the discovery that normal execution can no longer proceed.
 * Aborted : after the transaction has been rolled back and the database restored to its state prior toe the start of the transaction. Two options after it has been aborted:
   * Restart the transcation:
     * Can be done only if not internal logical error
   * Kill the transcation
 * Committed - after successful completion

### Concurrent Executions
 * Multiple transcations are allowed to run concurrently in the system. Advantages are:
   * Increased processor and disk utilization, leading to better transaction throughput
   * Reduced average response time for transactions: short transactions need not wait behind long ones.
 * Concurrency control schemes : mechanisms to achieve isolation:
   * That is, to control the interaction among the ocncurrent transaction in order to prevent them from destroying the consistency of the database

### Schedules
 * Schedule - a sequences of instructions that specify the chronological order in which instructions of concurrent transcations are executed:
   * A schedule for as set of transactions must consist of all instructions of those transactions
   * Must preserve the order in which the instructions appear in each individual transaction
 * A transaction that successfully completes its execution will have a commit instructions as the last statement
 * A transaction that fials to successfully complete its execution will have an abort instruction as the last statement

### Serializability
 * Basic Assumption - Each transaction preserves database consistency
 * Thus, serial execution of a set of transactions preserves database consistency
 * A (possibly concurrent) schedule is serializable if it is equivalent to a seiral schedule. Different forms of schedule equivalence give rise to the notions of:
   * Confilict serializability
   * View serializability

### Simplified view of transactions
 * We ignore operations other than read and write instructions

### Confliciting Instructions
 * INstruction I_i and I_j of transactions T_i and T_j respectively, conflict if and only if there exists some item Q accessed by both I_i and I_j and at least one of these instructions wrote Q
 * Intuitively, a conflict between I_i and I_j forces a (logical) temporarl order between them.
 * If I_i and I_j are consecuvitve in a schedule and they do not conflict, their results would remain the same even if they had been interchanged in the schedule.

### Conflict Serializability
 * If a schedule S can be transformed into schedule S' by a series of swaps of non-conflicting instructions, we say that S and S' are conflict equivalent
 * We say that a schedule S is conflict serialiable if it is conflict equivalent to a serial schedule

### View Serializability
 * Let S and S' be two schedules with the same set of transactions. S and S' are view equivalent if the following three conditions are met, for each data item Q:
   * If in schedule S, transcation T_i reads the initial value of Q, then in schedule S' also transcation T_i must read the initial value of Q
   * If in schedule S transaction T_i executes read(Q), and that value was produced by transaction T_j (if any), then in schedule S' also transaction T_i must read the value of Q that was produced by the same write(Q) operation of transaction T_j
   * The transaction (if any) that performs the ifnal write(Q) operation in schedule S must also perform the final write(Q) operation in shceudle S
 * As can be seen, view equivalence is also based purely on reads and writes alone
 * A schedule S is view serializable if it is view equivalent to a seiral schedule.
 * Every conflict serializable schedule is also view serializable
 * Below is a schedule which is view-serializable but not conflict serializable
 * Every view serializable schedule that is not conflict serializable has blind writes

### Testing for Serializability
 * Consider some schedule of a set of transcations T_1, T-2, ..., T_n
 * Precedence graph - a direct graph where the vertices are the transactions(names)
 * We draw an arc from T_i to T_j if the two transaction conflict, and T_i accessed the data item on which the conflict arose earlier.
 * We may label the arc by the item that was accessed.
 * A schedule is conflict serializable if and only if its precedence graph is acyclic.
 * Cycle-detection algorithms exist which take order n^2 times, where n is the number of vertices in the graph.:
   * Better algorithms take ordern + e where e is the nubmer of edges
 * If precedence graph is acyclic, the serializability order can be obtained by a topological sorting of the graph:
   * This is alinear order consistent with the partial order of the graph.

### Test for View Serializability
 * The precedence graph test for conflict serializability cannot be used directly to test for view serializabilty.:
   * Extension to test for view serializability has cost exponential in the size of the precedence graph.
 * The problem of checking if a schedule is veiw serializable falls in the clas of NP-complete problems.:
   * Thus, existence of an efficient algorithms is extremely unlikely
 * However practical algorithms that just check some sufficient conditions for view serializability can still be used.

### Recoverable Schedules
 * Need to address the effect of transaction failures on concurrently running transactions
 * Recoverable schedule - if a transaction T_j reads a data item previously written by a transcation T_i, then the commit operation of T_i appears before the commit operation of T_j

### Cascading Rollbacks
 * Cascading rollback - a single transaction failure leads to a series of transaction rollbacks.
 * Can lead to the undoing of a significant amount of work.

### Cascadeless Schedules
 * Cascadeless schedules - cascading rollbacks cannot occur:
   * For each pair of transactions T_i and T_j such that T_j reads a data item previously written by T_i, the commit operation of T_i appears before the read operation of T_j
 * Every Cascadeless schedule is also recoverable
 * It is desirable to restrict the schedules to those that are cascadeless

### Concurrency Control
 * A database must provide a mechanism that will ensure that all possible schedules are:
   * either conflict or view serializable
   * recoverable and preferably cascadeless
 * A policy in which only one transaction can execute at a time generates serial schedules, but provides a poor degree of concurrency
 * Testing a schedule for serializability after it has executed is a little too late
 * Goal - to develop concurrency control protocols that will assure serializability.

 * Schedules must be conflict or view serializable, and recoverable, for the sake of database consistency, and preferably cascadeless.
 * A policy in which only one transaction can execute at a time generates serial scheudles, but provides a poor degree of concurrency.
 * Concurrency-control schemes tradeoff between the amount of concurrency they allow and the amount of overhead that they incur.
 * Some schemes allow only conflict-serializable schedules to be nerated, while others allow view-serializable schedules that are non conflict-serializable.

### Concurrency Control vs. Serializability Tests
 * Concurrency-control protocols allow concurrent scheudles, but ensure that the schedules are conflict/view serializable, and are recoverable and cascadeless
 * Concurrency control protocols (generally) do not examine the precedence graph as it is being created:
   * Instead a protocol imposes a discipline that avoids non-serializable schedules
 * Different concurrency control protocols provide different tradeoffs between the amount of concurrency they allow and the amount of overhead that they incur.
 * Tests for serializability help us understand why a concurrency control protocol is correct.

### Weak Levels of COnsistency
 * Some applications are willing to live with weak levels of consistency, allowign schedules that are not serializable
 * Tradeoff accuracy for performance

### Levels of Consistency in SQL-92
 * Serializable - default
 * Repeatable read - only committed records to be read:
   * Repeated reads of same record must return same vlaue.
   * However, a transaction may not be serializable - it may find some records inserted by a transaction ubt not find others.
 * Read committed - only committed records can be read:
   * Successive reads of record may return different (but committed) values.
 * Read uncommitted - even uncommitted records may be read.

 * Lower degress of consistency useful for gathering approximate information about the database

### Transaction Definition in SQL
 * In SQL, a transaction begins implicitly
 * A transaction is SQL ends by:
   * Commit work commits current transaction and begins a new one.
   * Rollback work causes current transaction to abort
 * In almost all database systems, by default, every SQL statement also commits implicitly if it exectues successfully:
   * Implicit commit can be turned of by a database directive
 * Isolation level can be set at database level
 * Isolation level can be changed at start of transcation

### Implementation of Isolation Levels
 * Locking:
   * Lock on whole database vs lock on items
   * How long to hold lock?
   * Shared vs exclusive locks
 * Timestamps:
   * Transaction timestamp assigned e.g. when a transaction begins
   * Data items store two timestamps:
     * Read timestamp, Write timestamp
   * Timestamps are used to detect out of order accesses
 * Multiple versions of each data item:
   * Allow transcations to read from a snapshot of the database

---
## Chapter 18. Concurrency Control
### Lock-Bassed Protocols
 * A lock is a mechanism to control ocncurrent access to a data item
 * Data items can be locked in two modes:
   * exclusive(X) mode. Data item can be both read as wellas written X-lock is requested using lock-X instruction
   * shared(S) mode. Data item can only be read. S-lock is requested using lock-S instruction
 * Lock requests are made to concurrency-control manager. Transaction can proceed only after request is granted.
 * Lock compatibility matrix
  |   | S     | X     |
  |---|-------|-------|
  | S | true  | false |
  | X | false | false |
 * A transaction may be granted a lock on an item if the requested lock is compatible with locks already held on the item by other transactions
 * ANy number of transactions can hold shared locks on an item.
 * But if any transaction holds an exclusive on the item no other transaction may hold any lock on the item.

### Schedule With Lock Grants
 * A locking protocol is a set of rules followed by all transactions while requesting and releasing locks.
 * Locking protocols enforce serializability by restricting the set of possible schedules.

### Deadlock
 * The potential for deadlock exists in most locking protocols. Deadlocks are a necessary evil.
 * Starvation is also possible if concurrency control manager is badly designed. For example:
   * A transaction may be waiting for an X-lock on a item, while a sequence of other transactions request and are granted an S-lock on the same item
   * The same transaction is repeatedly rolled back due to deadlocks
 * Concurrency control manager can be designed to prevent starvation

### The Two-Phase Locking Protocol
 * A protocol which ensures conflict-serializable schedules.
 * Phase 1 : Growing Phase:
   * Transactino may obtain locks
   * Transaction may not release locks
 * Phase 2 : Shrinking Phase:
   * Transaction may release locks
   * Transaction may not obtain locks
 * The protocol assures serializabilitty. It can be proved that the transactions can be seriallized in the order of their lock points.
 * Two-phase locking does not ensure freedom from deadlocks
 * Exensions to basic two-phase locking needed to ensure recoverability of freedom from cascading roll-back:
   * Strict two-phase locking: a transaction must hold all its exclusive locks till it commits/aborts:
     * Ensures recoverability and avoids cascading roll-backs
   * Regorous two-phase locking : a transaction must hold all locks till commit/abort.:
     * Transactions can be serialized in the order in which they commit.
 * Most databases implement rigorous two-phase locking, but refer to it as simply two-phase locking
 * Two-phase locking is not a necessary condition for serializability:
   * There are conflict serializable schedules that cannot be obtained if the two-phase locking protocol is used.
 * In the absence of extra information (e.g., ordering of accesse to data), two-phase locking is necessary for conflict serializability in the following sense

### Locking Protocols
 * Given a locking protocol (such as 2PL):
   * A schedule S is legal under a locking protocol if it can be generated by a set of transactions that follow the protocol
   * A protocol ensures serializabilty if all legal schedules under that protocol are serializable

### Lock Conversaions
 * Two-phase locking protocol with lock conversions:
   * Growing Phase:
     * can acquire a lock-S on item
     * can acquire a lock-X on item
     * can convert a lock-S to a lock-X (upgrade)
   * Shrinking Phase:
     * can release a lock-S
     * can release a lock-X
     * can convert a lock-X to a lock-S (downgrade)
 * This protocol ensures serializability

### Automatic Acquisition of Locks
 * Skip

### Implementation of Locking
 * A lock manager can be implemented as a separate process
 * Transactions can send lock and unlock requests as messages
 * The lock manager replies to a lock requests by sending a lock grant messages (or a message asking the transaction to roll back, in case of a deadlock):
   * The requesting transaction waits until its request is answered
 * The lock manager maintains an in-memory data-structure called a lock table to record granted locks and pending requests

### Graph-Based Protocols
 * Graph-based protocols are an alternative to two-phase locking
 * Impose a partial ordering -> on the set D= {d-1, d_2, ..., d_h} of all data items.:
   * If d_i ->d_j then any transactino accessing both d_i and d_j must access d_i before accessing d_j.
   * Implies that the set D may not be viewed as a directed acyclic graph, called a database graph.
 * The tree-protocol is a simple kind of graph protocol.
 * The tree protocol ensures conflict serializability as well as freedom from deadlock.
 * Unlocking may occur earlier in the tree-locking protocol than in the two-phase locking protocol.:
   * Shorter waiting times, and increase in concurrency
   * Protocol is deadlock-free, no rollbacks are requied
 * Drawbacks:
   * Protocol does not guarantee recoverability or cascade freedom:
     * Need to introduce commit dependencies to ensure recoverability
   * Transactions may have to lock data items that they do not access.:
     * increased locking overhead, and additional waiting time
     * potential decrease in concurrency
 * Schedules not possible under two-phase locking are possible under the tree protocol, and vice versa.

### Tree Protocol
 * ONly exclusive locks are allowed.
 * The first lock by T-i may be on any data item. Subsequently, a data Q can be locked by T_i only if the parent of Q is currently locked by T_i.
 * Data items may be unlocked at any tiem.
 * A data item that has been locked and unlocked by T_i cannot subsequently be relocked by T_i

### Deadlock Handling
 * System is deadlocked if there is a set of transactions such that every transaction in the set is waiting for another transaction in the set.
 * Deadlock prevention protocols ensure that the system will never enter into a deadlock state. Some prevention strategies:
   * Require that each transaction locks all its data items before it begins execution (pre-declaration).
   * Impose partial ordering of all data items and require that a transaction can lock data items only in the order specified by the partial order (graph-based protocol)

### More Deadlock Prevention Strategies
 * wait-die scheme - non-preemptive:
   * Older transaction may wait for younger one to release data item
   * Younger transactions never wait for older ones; they are rolled back instead.
   * A transaction may die several times before acquiring a lock
 * wound-wait scheme - preemptive:
   * Older transaction wounds (forces rollback) of younger transaction instead of waiting for it.
   * Younger transactions may wait for older ones.
   * Fewer rollbacks than wait-die scheme.
 * In both schemes, a rolled back transactions is restarted with its original timestamp.:
   * Ensures that older transactions have precedence over newer ones, and starvation is thus avoided.
 * Timeout-Based Schemes:
   * A transaction waits for a lock only for a specified amount of time. After that, the wait times out and the transaction is rolled back.
   * Ensures that deadlocks get resolved by timeout if they occur
   * Simple to implement
   * But may rol back transaction unnecessarily in absence of daedlock:
     * Difficult to determine good value of the timeout interval.
   * Starvation is also possible
 * Wait-for graph:
   * Vertices: transcations
   * Edge from T_i -> T_j : if T_i is waiting for a lock held in conflicting mode by T_j
 * The system is in a deadlock state if and only if the wait-for graph has a cycle.
 * Invoke a deadlock-detection algorithm periodically to look for cycles.

### Deadlock Recovery
 * When deadlock is detected:
   * Some transaction will have to rolled back (made a victim) to break deadlock cycle.:
     * Select that transaction as victim that will incur minimum cost
   * Rollback - determine how far to roll back transaction:
     * Total rollback: Abort the transaction and then restart it.
     * Parital rollback : Roll back victim transaction only as far as necessary to release locks that another transaction in cycle is waiting for
 * Starvation can happen:
   * One solution : oldest transaction in the deadlcok set is nevre chosen as victim.

### Multiple Granularity
 * Allow data items to be a various sizes and define a hierarchy of data granularities, where the small granularities are nested within larger ones
 * Can be represented graphically as a tree (but don't confuse with tree-locking protocol)
 * When a transaction locks a node in the tree explicitly, it implicitly locks all the node's descendants in the same mode.
 * Granularity of locking (level in tree where locking is done):
   * Fine granularity (lower in tree): high concurrency, high locking overhead
   * Coarse granularity (higher in tree) : low lockign overhead, low concurrency

### Intention Lock Modes
 * In addition to S and X lock modes, there are three additional lock modes with multiple granularity:
   * intention-shared(IS): indicates explicit locking at a lower level of the tree but only with shared locks.
   * intention-exclusive (IX): indicates explicit locking at a lower level with exclusive or shared locks
   * shared and intention-exclusive (SIX) : the subtree rooted by that node is locked explicitly in shared mode and explicit locking is being done at a lower level with exclusive-mode locks
 * Intention locks allow a higher level node to be locked in S or X mode without having to check all descendent nodes.

---
 * 사실상 수업때는 Chapter 18 안한수준이네, 중요한 내용들이긴 한데... 나중에 정리하고 여기까지

## Chapter 19. Recovery System
### Failur Classification
 * Transaction faiulre:
   * Logical erros : transaction cannot complete due to some internal error condition
   * System errors: the database system must terminate an active transaction due to an error condition (e.g., deadlock)
 * System crash: a power failure or other hardware or software failure causes the system to crash.:
   * Fail-stop assumption : non-volatile storage contents are assumed to not be corrupted by system crash:
     * Database systems have numerous integrity checks to prevent corruption of disk data
 * Disk failure : a head crash or similar disk failure destorys all or part of disk storage:
   * Destruction is assumed to be detectable: disk drives use checksums to detect failures

### Recovery Algorithms
 * Recovery algorithms have two parts:
   1. Actions taken during normal transaction processing to ensure enough information exists to recover from failures
   2. Actions taken after a failure to recver the database contents to a state that ensures atomicity, consistency and durability

### Storage Structure
 * Volatile storage:
   * Does not survive system crashes
   * Examples: main memory, cache memory
 * Nonvolatile storage:
   * Survives system crashes
   * Examples: disk, tape, flash memory, non-volatile RAM
   * But may still fail, losing data
 * Stable storage:
   * A mythical form of storage that survives all failures
   * Approximated by maintaining multiple copies on distinct nonvolatile media

### Stable-Storage Implementation
 * Maintain multiple copies of each block on separate disks:
   * copies can be at remote sites to protect against disasters such as fire or flooding.
 * Failure during data transfer can still result in inconsistent copies: Block transfer can result in:
   * Successful completion
   * Partial failure : destination block has incorrect information
   * Total failure: destination block was never updated
 * Protecting sotrage media from failure during data transfer (one solution):
   * Execute output operation as folows (assuming two copies of each block):
     1. Write the information onto the fisrt physical block
     2. When the first write successfully completes, write the same information onto the second physical block
     3. The output is completed only after the second write successfully completes

### Protecting storage media from failure
 * Copies of a block may differ due to failure during output operation.
 * To recover from failure:
   1. First find inconsistent blocks:
     * Expesnive solution: Compare the two copies of every disk block
     * Better solution:
       * Record in-progress disk writes on non-volatile storage (Flush, Non-volatile RAM or special area of disk)
       * Use this information during recovery to find blocks that may be inconsistent, and only compare coipes of these
       * Used in hardware RAID systems
   2. If either copy of an inconsistent block is detected to have an error (bad checksume), overwrite it by the other copy. If both have no error, but are different, overwrite the second block by the first block.

### Data Access
 * Physical blocks are those blocks residing on the disk
 * Buffer blocks are the blocks residing temporarily in main memory.
 * Block movements between disk and main memory are initiated through the following two operations:
   * input (B) transfers the physical block B to main memory.
   * output (B) transfers the buffer block B to the disk, and replaces the appropriate physical block there
 * We assume, for simplicity, that each data item fits in, and is stored inside, a single block.
 * Each transaction T_i has its private work-area in which local copies of all data items accessed and updated by it are kept:
   * T_i's local copy of a data item X is called x_i
 * Transferring data items between system buffer blocks and its private work area done by:
   * read(X) assigns the value of data item X to the local vairable x_i
   * write(X) assigns the value of local data x_i to data item {X} in the buffer block.
   * Note: output(B_x) need not immediately follow write(X). System can perform the output operation when it deems fit.
 * Transactions:
   * Must perform read(X) before accessing X for the first time (subsequent reads can be from local copy)
   * write(X) can be executed at any time before the transaction commits

### Reacovery and Atomicity
 * To ensure atomicity despite failures, we first output information describing the modifications to stable storage without modifying the database itself.
 * Less used alternative : shadow-copy and shadow-paiging

### Log-Based Recovery
 * A log is a sequence of log records. The records keep information about update activities on the database.:
   * The log is kept on stable storage
 * When transaction T_i starts, it registers itself by writing a:
   * <T_i, start> log record
 * Before T_i exectues write(X), a log record:
   * <T_i, X, V_1, V_2>
   * is written, where V_1 is the value of X before the write (the old value), and V_2 is the value to be written to X (the new value)
 * When T_i finishes it last statement, the log record<T_i commit> is written.
 * Two approaches using logs:
   * Immediate database modification
   * Deferred database modification

### Immediate Database Modification
 * The immediate-modification scheme allows updates of an uncommitted transaction to be bade to the buffer, or the disk itself, before the transaction commits
 * Update log record must be written before database item is written:
   * We assume that the log record is output directly to stable storage
 * Output of updated blocks to disk can take place at any time before or after transaction commit
 * Order of updated blocks to disk can take place at any time before or after transaction commit
 * Order in which blocks are output can be different from the order in which they are written
 * The deferred-modification scheme performs updates to buffer/disk only at the time of transaction commit:
   * Simplifies some aspects of recovery
   * But has overhead of storing local copy

### Transaction Commit
 * A transaction is said to have committed when its commit log record is output to stable storage:
   * All prvious log reocrds of the transaction must hav been output already
 * Wirtes performed by a transaction may still be in the buffer when the transaction commits, and my be output later

### Concurrency Control and Recovery
 * With concurrent trnasactions, all transactions share a single disk buffer and a single log:
   * A buffer block can have data items updated by one or more transactions
 * We assume that if a transaction T_i has modified an item, no other transaction can modify the same item until T_i has committed or aborted:
   * i.e., the updates of uncommitted transactions should not be visible to other transactions
   * Can be ensured by obtaining exclusive locks on updated items and holding the locks till end of transaction (strict two-phase locking)
 * Log records of different transactions may be interspersed in the log

### Undo and Redo Operations
 * Undo and Redo of Transactions:
   * undo(T_i) -- restores the value of all data items updated by T_i to their old values, going backwards from the last log record for T_i:
     * Each time a data item X is restored to its old value V a special log record <T_i, X, V> is written out
     * When undo of a transaction is complete, a log record <T_i abort> is written out.
   * redo(T_i) -- sets the value of all data items updated by T_i to the new values, going forward from the first log record for T_i:
     * No logging is done in this case

### Recovering from Failure
 * When recovering after failure:
   * Transaction T_i needs to be undone if the log:
     * Contains the record <T_i start>
     * But does not contain either the recrod <T_i commit> or <T_i abort>
   * Transaction T_i needs to be redone if the log:
     * Contains the records <T_i start>
     * And contains the record <T_i commit> or <T_i abort>
 * Suppose that transaction T_i was undone earlier and the <T_i abort> record was written to the log, and then a failure coccurs
 * On recovery from failure transaction T_i is redone:
   * Such a redo redoes all the original actions of transaction T_i including the stps that resotred old values:
     * Known as repeating history
     * Seems wasteful, but simplifies recovery greatly

### Checkpoints
 * Redoing/undoing all transactions recorded in the log can be very slow:
   * Processing the entire log is time-consuming if the system has run for a long time
   * We might unnecessarily redo transactions which have already output their updates to the database.
 * Streamline recovery procedure by periodically perfoming checkpoint:
   1. Output all log records currently residing in main memory onto stable stoarge
   2. Ouptut all modified buffer blocks to the disk
   3. Wirte a log record <checkpoint L> onto stable storage where L is a list of all transactions active at the time of checkpoint
   4. All updates are stopped while doing checkpointing
 * During recovery we need to consider only the most recent transaction T_i that started before the checkpoint, and transactions that started after T_i:
   * Scan backwards from end of log to find the most recent <checkpoint L> record
   * Only trnasactions that are in L or started after the checkpoint need to be redone or undone
   * Transactions that committed or aborted before the checkpoint already have all their updates output to stable storage
 * Some earlier part of the log may be needed for undo operations:
   * Continue scanning backwards till a recrod <T_i start> is found for every transaction T_i in L
   * Parts of log prior to earliest <T_i start> record above are not needed for recovery, and can be erased whenever desired

### Recovery Algorithm
 * Logging (during normal operation):
   * <T_i start> at transaction start
   * <T_i, X_j, V_1, V_2> for each update
   * <T_i commit> at transcation end
 * Transaction rollback (during normal operation):
   * Let T_i be the transaction to be rolled bakc
   * Scan log backwards from the end, and for each log record of T_i of the form <T_i, X_j, V_1, V_2>:
     * Perform the undo by writing V_1 to X_j
     * Write a log record <T_i, X_j, V_1>:
       * such log records are called compensation log records
     * Once the record <T_i start> is found stop the scan and write the log record <T_i abort>
 * Recovery from failure: Two phases:
   * Redo phase: replay updates of all transactions, whether they committed, aborted, or are incomplete
   * Undo phase: undo all incomplete transactions
 * Redo phase:
   1. Find last <checkpoint L> record, and set undo-list to L
   2. Scan forward from above <checkpoint L> record:
     1. Whenever a record <T_i, X_j, V_1, V_2> or <T_i, X_j, V_2> is found, redo it by writing V_2 to X_j
     2. Whenever a log record <T_i start> is found, add T_i to undo-list
     3. Whenever a log record <T_i commit> or <T_i abort> is found, remove T_i from undo-list
 * Undo phase:
   1. Scan log backwards from end:
     1. Whenever a log record <T_i, X_j, V_1, V_2> is found where T_i is in undo-list perform same actions as for transaction rollback:
       1. perform undo by writing V_1 to X_j
       2. write a log record <T_i, X_j, V_1>
     2. Whenever a log record <T_i start> is found where T_i is in undo-list:
       1. Write a log record <T_i abort>
       2. Remove T_i from undo-list
     3. Stop when undo-list is empty:
       1. i.e., <T_i start> has been found for every transaction in undo-list
 * After undo phase completes, normal trnasaction processing can commence

### Log Record Buffering
 * Log record buffering: log records are buffered in main memory, instead of being output directly to stable storage.:
   * Log reocrds are output to stable storage when a block of log records in the buffer is full, or a log force operation is executed.
 * Log force is performed to commit a trnasaction by forcing all its log records (including the commit record) to stable storage.
 * Several log records can thus be output using a single output operations, reducing the I/O cost
 * The rules below must be followed if log records are buffered:
   * Log records are output to stable storage in the order in which they are created
   * Transaction T_i enters the commit state only when the log record <T_i commit> has been output to stable storage
   * Before a block of data in main memory is output to the database, all log records pertaining to data in the block must hav ebeen output to stable storage:
     * This rule is called the write-head logging or WAL rule
     * Strictly speacking, WAL only requires undo information to be output

### Database Buffering
 * Database maintains an in-memory buffer of data blocks:
   * When a new block is needed, if buffer is full an existing block needs to be removed from buffer
   * If the block chosen for removal has been updated, it must be output to disk
 * The recovery algorithm supports the no-force policy: i.e., updated blocks need not be written to disk when transaction commits:
   * force policy : requires updated blocks to be written at commit:
     * More expensive commit
 * The recovery algorithm supports the steal policy: e.e., blocks containing updates of uncommitted transactions can be written to disk, even before the trnasaction commits
 * If a block with uncommitted updates is output to disk, log records with undo inofrmation for the updates are output to the log on stable storage first
 * No updates should be in progress on a block when it is output to disk. Can be ensured as follows:
   * Before writing a data item, transaction acquires exclusive lock on block containing the data item
   * Lock can be released once the write is completed.:
     * Such locks held for short duration are called latches
 * To output a block to disk:
   1. First acquire an exclusive latch on the block:
     1. Ensures no update can be in progress on the block
   2. Then perform a log flush
   3. Then output the block to disk
   4. Finally release the latch on the block

### Buffer Management
 * Database buffer can be implemented either:
   * In an area of real main-memory reserved for the database
   * In virtual memory
 * Implementing buffer in reserved main-memory has drawbacks:
   * Memory is partitioned before-hand between database buffer and applications, limiting flexibility.
     * Needs may change, and although operating system knows best how memory should be divided up at any time, it cannot change the partitioning of memory.
 * Database buffers are generally implemented in virtual memory in spite of some drawbacks:
   * WHen operating system need to evict a page that has been modified, the page is written to swap space on disk
   * WHen database decides to write buffer page to disk, buffer page may be in swap space, and ay have to be read from swap space on disk and output to the database on disk, resulting in extra I/O!:
     * Known as dual paging problem
   * Ideally when OS needs to evict a page from the buffer, it should pass control to databse, which in turn should:
     1. Ouput the page to database instead of to swap space (making sure to output log records first), if it is modified
     2. Release the page from the buffer, for the OS to use
   * Dual paging can thus be avoided, but common operating systems do not support such funtionality.

### Fuzzy Checkpointing
 * To avoid long interruption of normal processing during checkpointing, allow updates to happen during checkpointing
 * Fuzzy checkpointing is done as follows:
   1. Temporarily stop all updates by transactions
   2. Write a <checkpoint L> log record and force log to stable storage
   3. Note list M of modified buffer blocks
   4. Now permit transactions to proceed with thier actions
   5. Ouput to disk all modified buffer blocks in list M:
     * blocks should not be updated while being ouput
     * Folow WAL: all log records pertaining to a block must be output before the block is output
   6. Store a point to the checkpoint record in a fixed position last_checkpoint on disk
 * When recovering using a fuzzy checkpoint, start scan form the checkpoint reocrd pointed to by last_checkpoint:
   * Log records before last_checkpoint have their updates reflected in database on disk, and need not be redone.
   * Incomplete checkpoints, where system had crashed while performing checkpoint, are handled safely

### Failure with Loss of Nonvolatile Storage
 * So far we assumed no loss of non-volatile storage
 * Technique similar to checkpointing used to deal with loss of non-voilatile storage:
   * Periodically dump the entire content of the database to stable stoarge
   * No transaction may be active during the dump procedure; a proceduer similar to checkpointing must take place:
     * Output all log records currently residing in main memory onto stable storage
     * Output all buffer blocks onto the disk
     * Copy the ocntents of the database to stable storage
     * Output a record <dump> to log on stable storage

### Recovering from Failure of Non-Volatile Sotrage
 * To recover from disk failure:
   * restore database from most recent dupm
   * Conculst the log and redo all transactions that committed after the dump
 * Can be extended to allow transactions to be active during dump; known as fuzzy dump or online dump

---
생략

## Chapter 20. Database System Architectures
### Centralized Database Systems
 * Run on a single computer system
 * Single-user system:
   * Embedded databases
 * Multi-user systems also known as server systems:
   * Servifce requests received from clicent systems
   * Multi-core systems with coarse-grained parallelism:

### Server System Architeture
 * Serve systems can be broadly categorized into two kinds:
   * transaction servers:
     * Widely used in relational database systems
   * data servers:
     * Parallel data servers used to implement high-performance transaction processing systems

### Transaction Servers
 * Also called query server systems or SQL server systems:
   * Clients send requests to the server
   * Transactions are executed at the server
   * Results are shipped back to the client
 * Requests are specified in SQL, and communicated to the server through a remote procedure call (RPC) mechanism
 * Transactional RPC allows many RPC calls to form a transaction
 * Applications typically use ODBC/JDBC APIs to communicate with transaction servers

### Transaction Server Process Structure
 * A ypcial transaction server consists of multiple processes accessing data in shared memory
 * Shared memory contains shared data:
   * Buffer pool
   * Lock table
   * Log buffer
   * Cached query plans (reused if same query submitted again)
 * All database processes can access shared memory
 * Server processes:
   * These receive user queries (transactions), execute them and send results back
   * Processes may be multithreaded, allowing a single process to execute several user queries concurrently
   * Typically multiple multithreaded server processes
 * Database writer process:
   * Output modified buffer blocks to disk continually
 * Log write process:
   * Server processes simply add log records to log record buffer
   * Log writer process outputs log records to stable storage
 * Checkpoint process:
   * Performs periodic checkpoints
 * Process monitor process:
   * Monitors other processes, and takes recovery actions if any of the other processes fail
 * Lock manager process:
   * To avoid overhead of interprocess communication for lock request/grant, each database process operates directly on the lock table
   * Lock manager process still used for deadlock detection
 * To ensure that no two processes are accessing the same data structure at the same time, databases systems implement mutual exclusion using either:
   * Atomic instructions:
     * Test-And-Set
     * Compare-And-Swap (CAS)
   * Operating system semaphores:
     * Higher overhead than atmoic instructions

---
## Chapter 10 Big Data
### Motivation
 * Very large volumes of data being collected:
 * Big Data : differentiated from data handled by earlier generation databases:
   * Volume : much larger amounts of data stored
   * Velocity : much higher rates of insertions
   * Variety : many types of data, beyond realtion data

### Querying Bit Data
 * Transaction processing systems that need very high scalability:
   * Many applications willing to sacrifice ACID propertie sand other database features, if they can get very high scalability
 * Query processing systems that:
   * Need very high scalability
   * Need to support non-relation data

### Big Data Storage Systems
 * Distributed file systems
 * Sharding across multiple databases
 * Key-value storage systems
 * Parallel and sitributed databases

### Distirbuted File Systems
 * A distributed file system stores data across a large colleciton of machines, but provides single file-system view
 * Highly scalable distirbuted file system for large data-intensive applications
 * Provides redunant storage of massive amounts of data on cheap and unreliable computers:
   * Files are replicated to handle hardware failure
   * Detect failures and reocvers from them
 * Examples:
   * Google File System (GFS)
   * Hadoop File System (HDFS)

### Hadoop FIle System Architecture
 * Single Namespace fore entire cluster
 * Files are broken up into blocks:
   * Typically 64 MB block size
   * Each block replicated on multiple DataNodes
 * Client:
   * Filnds location of blocks from NameNode
   * Accesses data directly from DataNode

### Hadoop Distributed File System (HDFS)
 * NameNode:
   * Maps a filename to list of Block IDs
   * Maps each Block ID to DataNodes containing a replica of the block
 * DataNode: Maps a Block ID to a phyusical location on disk
 * Data Coherency:
   * Write-once-read-many access model
   * Client can only append to existing files
 * Distributed file systems good for millions of large files:
   * But have very high overheads and poor performance with billions of smaller tuples

### Sharding
 * Sharding : partition data across multiple databases
 * Partitioning usually done on some partioning attributes (also known as partitioning keys or shard keys)
 * Application must track which records are on which database and send queries/updates/to that database
 * Positives: scales well, easy to implement
 * Drawbacks:
   * Not transparent: application has to deal with routing of queries, queires that span multiple databases
   * When a database is overloaded, moving part of its load out it not easy
   * Chance of failure more with more databases:
     * need to keep replicas to ensure availability, which is more work for application

### Key Value Storage Systems
 * Key-value storage systems store large numbers of small sized records
 * Records are partitioned across multiple machines
 * Queries are routed by the system to appropriate machine
 * Records are also replicated acorss multiple machines, to ensure availability evn if a machine fails:
   * Key-value stores ensure that updates are appliced to all replicas, to ensure that their values are consistent
 * Key-value sotres may store:
   * uninterpreted byets, with an associated key:
     * E.g., Amazon S3, Amazon Dynamo
   * Wide-table (can have arbitrarily many attribute names) with associated key:
     * Google BitTable, Aphache Cassandra, Apache Hbase, Amazon DynamoDB
     * Allows some opertaions to execute on storage node
   * JSON:
     * MongoDB, CouachDB (document model)
 * Document stores store semi-structured data, typically JSON
 * Some key-value stores support multiple versions of data, with timestamps/version numbers
 * Key-value store support:
   * put(key, value) : used to store values with an associated key
   * get(key) : which retrieves the stored value associated with the specified key
   * delete(key) : remove the key and its associated value
 * Some systems also support range queries on key values
 * Document stores also support queries on non-key attributes
 * Key value stores are not full database systems:
   * Have no/limited support for transactional updates
   * Applications must manage query processing on their own
 * Not supporting above features makes it easier to build scalable data storage sysetms:
   * Also called NoSQL systems

### Parallel and Distributed Databases
 * Parallel databases run multiple machines (Cluster)
 * Parallel databases were designed for smaller scale
 * Replication used to ensure data avaiability despite machine failure:
   * But typically restart query in event of failure:
     * Restarts may be frequent at a very large scale
     * Map-reduce systems can continue query execution working around failures
 * Availability (system can run even if parts have failed) is essential for parallel/distributed databases
 * Consistency is important for replicated data:
   * All live replicas have same value, and each read sees latest version
 * Network paritions (network can break into two or more parts, each with active systems that can't talk to other parts)
 * In presence of paritions, cannot guaranttee both availability and consistency:
   * Brewer's CAP "Theorem"
 * Very large systems will partiiotn at some point:
   * Choose one of consistncy or availability
 * Traditional database choose consistency

### The MapReduce Paradigm
 * Paltform for reliable, scalable parallel computing
 * Abstracts issues of distributed and parallel environment from programmer:
   * Programmer provides core logicl
   * System takes care of parallelization of computation, coordination, etc.
 * Paradigm dates back many decades
 * Data storage/access typically done using distributed file systems or key-value stores

### MapReduce Programming Model
 * Inspired from map and reduce operations commonly used in funcitonal programming langauges like Lisp
 * Input : a set of key/value pairs
 * User supplies two functions:
   * map(k, v) -> list(k1, v1)
   * reduce(k1, list(v1)) -> v2
 * (k1,v1) is an intermediate key/value pair
 * Output is the result of (k1, v2) pairs
