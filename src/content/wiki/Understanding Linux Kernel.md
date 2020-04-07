---
layout  : wiki
title   : 
summary : 
date    : 2020-04-07 20:48:28 +0900
lastmod : 2020-04-07 20:48:41 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# # 1. Introduction

- Linux pros
    - Monolithic kernel
    - Compiled and statically linked traditional Unix kernels
    - Kernel threading
    - Multithreaded application support - lightweight processes(LWP)
    - Preemptive kernel
    - Multiprocessor support - symmetric multiprocessing(SMP)
    - Filesystem
    - STREAMS

## Basic Operating System Concepts

- Interact with the hardware components, servicing all low-level programmable elements included in the hardware platform.
- Provide an execution environment to the applications that run on the computer system (the so-called user programs)

## Multiuser Systems

- An authentication mechanism for verifying the user's identity
- A protection mechanism against buggy user programs that could block other applications running in the system
- A protection mechanism against malicious user programs that could interfere with or spy on the activity of others users
- An accounting mechanism that limits the amount of resource units assigned to each user

## Users and Groups

- User ID(UID), Group ID(GID)
- superuser

## Processes

- Process : An instance of a program in execution or execution context
- Multi Processing operating system with preemptable processes.
- process/kernel model - Whenever a process makes a system call, the hardware changes the privilege mode from User ode to Kernel Mode.

## Kernel Architecture

- Kernels are `monolithic`: each kernel layer is integrated into the whole kernel program and runs in Kernel Mode on behalf of the current process.
- cf.) `microkernel` operating systems demand a very small set of functions from the kernel, generally including a few synchronization primitives, a simple scheduler, and an interprocess communication mechanism.
- The main advantages of using modules include:
    - A modularized approach
    - Platform independence
    - Frugal main memory usage
    - No performance penalty

## An Overview of the Unix Filesystem

### Files

- All the nodes of the tree, except the leaves, denote directory names.

### Hard and Soft Links

- Hard links have two limitations:
    - It is not possible to create hard links for directories. Doing so might transform the directory tree into a graph with cycles, thus making it impossible to locate a file according to its name.
    - Links can be created only among files included in the same filesystem. This is a serious limitation, because modern Unix systems may include several filesystems located on different disk and/or partitions, and users may be unaware of the physical divisions between them.

### File Types

- Unix files may have one of the following types:
    - Regular file
    - Directory
    - SYmbolic link
    - Block-oriented device file
    - Character-oriented device file
    - Pipe and named pipe (also called FIFO)
    - Socket

### File Descriptor and Inode

- All information needed by the filesystem to handle a file is included in a data structure called an `inode`.
- Unix system must always provide at least the following attributes, which are specified in the POSIX standard:
    - File type
    - Number of hard links associated with the file
    - File length in bytes
    - Device ID(i.e., an identifier of the device containing the file)
    - Inode number that identifies the file within the filesystem
    - UID of the file owner
    - User group ID of the file
    - Several timestamps that specify the inode status change time, the last access time, and the last modify time
    - Access rights and file mode

### Access Rights and File Mode

- User types
    - The user who is the owner of the file
    - The users who belong to the same group as the file, not including the owner
    - All remaining users (others)
- Access rights : read, write and executed
    - Additional flags : suid, sgid, sticky

### File-Handling System Calls

- Opening a file

        fd = open(path, flag, mode)

    - `path` : Denotes the pathname (relative or absolute) of the file to be opened.
    - `flag` : Specifies how the file must be opened (e.g., read, write, read/write, append). It also can specify whether a non-existing file should be created.
    - `mode` : Specifies the access rights of a newly created file.
- Accessing an opened file

        newoffset = lseek(fd, offset, whence);

    - `fd` : Indicates the file descriptor of the opened file
    - `offset` : Specifies a signed integer value that will be used for computing the new position of the file pointer
    - `whence` : Specifies whether the new position should be computed by adding the offset value to the number 0 (offset from the beginning of the file), the current file pointer, or the position of the last byte (offset from the end of the file)

        nread = read(fd, buf, count);

    - `fd` :  Indicates the file descriptor of the opened file
    - `buf` : Specifies the address of the buffer in the process's address space to which the data will be transferred.
    - `count` : Denotes the number of bytes to read
- Closing a file

        res = close(fd);

- Renaming and deleting a file

        res = rename(oldpath, newpath);
        res = unlink(pathname);

## An Overview of Unix Kernels

### The Process/Kernel Model

- Kernel threads Characteristics
    - They run in Kernel Mode in the kernel address space
    - They do not interact with users, and thus do not require terminal devices
    - They are usually created during system startup and remain alive until the system is shut down
- Kernel routines can be activated in several ways
    - A process invokes a system call.
    - The CPU executing the process signals an exception, which is an unusual condition such as an invalid instruction. Thee kernel handles the exception on behalf of the process that caused it.
    - A peripheral device issues and interrupt signal to the CPU to notify it of an event such as a request for attention, a status change, or the completion of an I/O operation. Each interrupt signal is dealt by a kernel program called an interrupt handler. Because peripheral devices operate asynchronously with respect to the CPU, interrupts occur at unpredictable times.
    - A kernel thread is executed. Because it runs in Kernel Mode, the corresponding program must be considered part of the kernel.

### Process Implementation

- Process descriptor include:
    - The program counter(PC) and stack pointer (SP) registers
    - The general purpose registers
    - The floating point registers
    - The processor control registers (Processor Status Word) containing information about the CPU state
    - The memory management registers used to keep track of the RAM accessed by the process.
