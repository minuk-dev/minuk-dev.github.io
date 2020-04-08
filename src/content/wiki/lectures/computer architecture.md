---
layout  : wiki
title   : lectures/computer architecture
summary : 
date    : 2020-04-07 20:37:08 +0900
lastmod : 2020-04-08 13:21:51 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
 5. Large and Fast : Exploiting Memory Hierarchy5.
 # Principle of Locality

- Temporal locality
- Spatial locality

# Taking Advantage of Locality

- Memory hierarchy
    - Store everything on disk (lowest level)
    - Copy recently accessed (and nearby) items from disk to smaller DRAM(e.g. Main Memory)
    - copy more recently accessed (and nearby) items from DRAM to smaller SRAM memory(e.g. Cache memory attached to CPU)

# Memory Hierarchy Levels

- A block (aka line) : unit of copying
- If accessed data is present in upper level
    - Hit : access satisfied by upper level
        - Hit ratio: hits/accesses
- If accessed data is absent
    - Miss : block copied from lower level
        - Time taken : miss penalty
        - Miss ratio : misses/accesses = 1 - hit ratio
    - Then accessed data supplied from upper level

# Memory Technology

- Static RAM (SRAM) : 0.5ns - 2.5ns, $2000 - $5000 per GB
- Dynamic RAM(DRAM) : 50ns - 70ns, $20 - $75 per GB
- Magnetic disk : 5ms - 20ms, $0.20 - $2 per GB
- Ideal memory
    - Access time of SRAM
    - Capacity and cost/GB of disk

# SRAM Technology

- Data stored using 6~8 transistors in an IC
    - fast, but expensive
    - fixed access time to any datum
    - no refresh needed
    - usually for caches, integrated on processor chips

# DRAM Technology

- Data stored as a charge in a capacitor
    - Single transistor used to access the charge
    - Must periodically be refreshed
        - Read contents and write back
        - Performed on a DRAM "row"
- Synchronous DRAM (SDRAM)
    - DRAM with clocks to improve bandwidth
- Ex> Double data rate (DDR) DRAM
    - Transfer on rising and falling clock edges

# Flash Memory

- Non-volatile semiconductor storage ( a type of EEPROM)
    - 100x - 1000x faster than disk
    - smaller, lower power, more robust
    - But more $/GB (between disk and DRAM)
- Types
    - NOR flash : bit cell like a NOR gate
        - Random read/write access
        - Used for instruction memory in embedded systems
    - NAND flash : bit cell like a NAND gate
        - Denser (bits/area), but block-at-a-time access
        - Cheaper per GB
        - Used for USB keys, media storage, ...
- Flash bits wears out after 1000's of accesses
    - Not suitable for direct RAM or disk replacemenet
    - Wear leveling : remap data to less used blocks

# Disk Storage

- Nonvolatile, rotating magnetic storage

## Disk Sectors and Access

- Each sector records : Sector ID, Data(512 bytes, 4096 bytes proposed), Error correcting code (ECC), Synchronization fields and gaps
- Access to a sector involves : Queuing delay if other accesses are pending, Seek(move the heads), Rotational latency, Data transfer,Controller overhead

## Disk Access Example

- Given : 512B sector, 15000rpm, 4ms average seek time, 100MB/s transfer rate, 0.2ms controller overhead, idle disk
- Average read time

    = 4ms (seek time) 

    + 1/2 / (15000 (rpm) / 60 (min/s) ) (rotational latency)

    + 512 / 100 MB/s (transfer time)

    + 0.2ms controller delay

    = 6.2ms

- If actual average seek time is 1 ms ⇒ Average read time = 3.2ms

# Disk Performance Issues

- Manufacturers quote average seek time
    - Based on all possible seeks
    - Locality and OS scheduling lead to smaller actual average seek times
- Smart disk controller allocate physical sectors on disk
    - Present logical sector interface to host
    - SCSI, ATA, SATA
- Disk drives include caches
    - Prefetch sectors in anticipation of access
    - Avoid seek and rotational delay

# The Basics of Cache Memory

- Cache memory : The level of the memory hierarchy closest to the CPU

## Direct Mapped Cache

- Location determined by address
- Direct mapped : only one choice ( ex : (block address) modulo (#Blocks in cache))

## Tags and Valid Bits

- How do we know which particular block is stored in a cache location
    - Store block address as well as the data
    - Actually, only need the high-order bits
    - Called the tag
- What if there is no data in a location?
    - Valid bit : 1 = present, 0 = not present, Initially 0

# Block Size Considerations

- Larger blocks should reduce miss rate
- But in fixed-sized cache
    - Larger blocks ⇒ fewer of them (increased miss rate)
    - Larger blocs ⇒ pollution
- Larger miss penalty
    - Can override benefit of reduced miss rate
    - Early restart and critical-word-first can help

# Cache (Read) Misses

- On cache hit, CPU proceeds normally
- On cache miss
    - Stall the CPU pipeline
    - Fetch block from next level of hierarchy
        - Instruct main memory to perform a read and wait form the memory to complete its access
        - Write content into the cache entry (including data, tag, and valid bit)
    - Restart cache access
        - For *instruction cache* miss
            - Send original PC value (that is, PC -4), and restart instruction fetch
        - For *data cache* miss
            - Complete data access

# Cache (Write) Misses

- Similar to cache read misses, but need extra steps
- What should happen on a write miss?
    - On data-write hit, could just update the block in cache
    - But if 'store' writes something only into the cache, then memory will have different value from that in the cache ⇒ inconsistency!

## Write-through

- Always update both the cache and the memory.
    - write to cache first, then write also to memory
    - simple
- But makes writes take longer
    - if base CPI = 1, 10% of instructions are stores, write to memory takes 100 cycles → Effective CPI = 1 + 0.1x100 = 11
- Solution : need write buffer
    - Holds data waiting to be written to memory
    - CPU continues immediately
        - only stalls on write if write buffer is already full

## Write-Back

- update only the cache, and write the modified block to memory when it is replaced
    - On data-write hit, just update the block in cache
        - Keep track of whether each block is "dirty"
    - When a dirty block is replaced
        - Write it back to meory
        - Can use a write buffer to allow replacing block to be read first
- Usually faster, but much more complex
    - we cannot overwrite the cache before detecting miss (since previous value may be dirty)
    - thus, we must detect first, and when write to cache(→extra cycle)

# Write Allocation

- On a write miss, should we fetch the memory into cache?
- For write-through, two alternatives:
    - Allocate on miss: fetch the block
    - Write around : don't fetch the block
        - Since programs often write a whole block before reading it
- For write-back
    - Usually fetch the block

# Measuring Cache Performance

- Cpu time = (CPU execution time) + (Memory-stall time)
    - Program execution cycles
        - Includes cache hit time
    - Memory stall cycles
        - Mainly from cache misses
- With simplifying assumptions
    - assuming similar cycles for read and write (ignoring write buffer stalls)
    - Memory stall cycles =

        Memory accesses / Program * Miss rate * Miss penalty

        + Instructions / Program * Misses/Instruction * Miss penalty

# Average Access Time

- Hit time is also important for performance
    - although we assumed this as part of CPU execution time..
- Average memory access time (AMAT)
    - AMAT = Hit time + Miss rate * Miss penalty

# Associative Caches

- Unlike 'Direct-mapped' Caches
    - where there is only one cache entry location for any block.
- Fully assocative
    - Allow a given block to go in any cache entry
    - More flexible, and reduces miss rate!
    - Requires all entries to be searched at once
    - Comparator per entry → Expensive!
- M-way Set assocative
    - Each set contains M entries
    - Block number determines which set
    - Search all entries in a given set at once
    - M comparators (less expensive)

# How much Associativity

- Increased associativity decreases miss rate
    - But with diminishing returns
    - Also, may increase search time or cost
    - Choice depends on the cost of a miss versus the cost of implementing associativity, both in time and in extra hardware
- Size of Tags versus set associativity

# Replacement Policy

- Direct mapped : no choice
- Set associative
    - Prefer non-valid entry, if there is one
    - Otherwise, choose among entries in the set → but how?
- Least-recently used(LRU)
    - Choose the one unused for the longest time
        - Simple for 2-way, manageable for 4-way, too hard beyond that
- Random
    - Gives approximately the same performance as LRU for high associativity

# Multilevel Caches

- Primary cache attached to CPU
    - small, but fast
    - Focus on minimal hit time
        - L-1 cache usually smaller than a single cache
        - L-1 block size smaller than L-2 block size
- Level-2(L-2) cache services misses from primary cache
    - Larger, slower, but still faster than main memory
    - Focus on low miss rate to avoid main memory access
    - Hit time has less overall impact
- Main memory services L-2 cache misses
- Some high-end systems include L-3 cache

# Encoding/Decoding

- Encoding/Decoding
    - error detection/correction
    - encryption/decryption
    - compression/decompression
    - modulation/demodulation
- If error is detected
    - may drop data
    - may try to fix the error
