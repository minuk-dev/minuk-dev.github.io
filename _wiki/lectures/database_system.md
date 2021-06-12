---
layout  : wiki
title   : Database System
summary : 학교 데이터베이스 시스템 수업 정리
date    : 2021-04-18 18:42:47 +0900
lastmod : 2021-06-12 18:34:35 +0900
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
