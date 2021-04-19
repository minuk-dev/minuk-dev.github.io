---
layout  : wiki
title   : Database System
summary : 학교 데이터베이스 시스템 수업 정리
date    : 2021-04-18 18:42:47 +0900
lastmod : 2021-04-19 13:48:18 +0900
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

### Organization of Records in Files
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
 * Good for queries involving department $$\Bowtie$$(`join`) instructor, and for queries involving one single department and its instructors
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

## Chatper 14. Indexing
### Basic Concepts
 * Indexing mechanisms used to speed up access to desired data.
 * Searhc Key - attribute to set of attributes used to look up rcords in a file
 * An index file consists of records(called index entries) of the form (search-key + pointer)
 * Index files are typically much smaller than the original file
 * Two basic kinds of indices
   * Ordered indices : search keys are stored in sorted order
   * Hash indices: search keys are distributed uniformly across "uckets" using a "hash function".

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
   * The search key of a primary index is usaully but not necessarily the primary key.
 * Secondary index : an index whose search key speicifies an order different from the sequential order of the file. Also called nonclustering index.
 * Index-sequential file : sequential file ordered on a search key, with a clustering index on the search key.

### Dense Index Files
 * Dense index : index record appears for every search-key value in the file

### Sparse Index Files
 * Sparse Index : contains index records for only some search-key values.
   * Applicable when records are sequentially ordered on search-key
 * To locate a record with search-key vlaue K we:
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
