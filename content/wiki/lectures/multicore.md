---
layout  : wiki
title   : Multicore Computing
summary :
date    : 2021-06-02 17:11:08 +0900
lastmod : 2021-06-03 09:21:24 +0900
tags    :
parent  : lectures
---

## Introduction to Multicore Computing
### Multicore Processor
 * A single computing component with two or more independent cores
   * Core(CPU): computing unit that reads/executes program instructions
   * share cache or not
   * symmetric or asymmetric
 * Multiple cores run multiple instructions at the same time(concurrently)
 * Increase overall program speed(performance)
 * performance grained by multi-core processor

### Manycore processor (GPU)
 * multi-core architectures with an especially high number of cores(thousands)
 * CUDA
   * Compute Unified Device Architecture
   * parallel computing platform and programming model created by NVIDIA and implemented by the graphics processing units (GPUs) that they produce
   * GPGPU (General Purpose Graphics Prcessing Unit)
 * OpenCL
   * Open Standard parallel programming platform

### What is Prallel Computing?
 * Parallel computing : using multiple processors in parallel to solve problems more quickly than with an single processor
 * Examples:
   * A cluster computer that contains multiple PCs combined together with a high speed network
   * A shared memory multiprocessor by connecting multiple processors to a single memory system
   * A Chip Multi-Processor(CMP) contains multiple processors (called cores) on a single chip
 * Concurrent execution comes from desire for performance.

### Parallelism vs Concurrency
 * Parallel Programming
   * Using additional computational resources to produce and answer faster
 * Concurrent Programming
   * Correctly and efficiently controlling access by multiple threads to shared resources
   * Problem of preventing a bad interleaving of operations from different thrads
 * Often used interchangeably

### Parallel Programming Techniques
 * Shared Memory : OpenMP, pthreads
 * Distributed Memory : MPI
 * Distributed/Shared Memory : MPI + OpenMP
 * GPU Parallel Programming : CUDA, OpenCL

### Parallel Processing Systems
 * Small-Scale Multicore Environment
   * Notebook, Workstation, etc.
   * POSIX threads
   * GPGPU-based supercomputer
   * Development of CUDA/OpenCL/GPGPU
 * Large-Scale Multicore Environemnt
   *  Supercomputer
   * Clusters
   * Servers
   * Grid Computing

### Parallel Computing vs. Distirbuted Computing
 * Parallel Computing
   * all processors may have access to a shared memory to exchange information between processors.
   * more tightly coupled to multi-threading.
 * Distributed Computing
   * multiple computers communicate through network
   * each processor has its own private memory(distributed memory)
   * executing sub-taks on different machines and then merging the results

### Cluster Computing vs. Grid Computing
 * Cluster Computing:
   * a set of loosely connected computers that work together so that in many respects they can be viewed as a single system.
   * good price /performance.
   * memory not shared
 * Grid Computing
   * federation of computer resources from multiple locations to reach a common goal (a large scale distributed system)
   * grids tend to be more loosely coupled, heterogeneous, and geographically dispered

### Cloud Computing
 * shares networked computing resources rather than having local servers or personal devices to handle applicatons.
 * "Cloud" is used as a metaphor for "Internet" meaning " a type of Internet-based computing."

### Good Parallel Program
 * Correct (Results)
 * Good Performance
 * Scalability
 * Load Balance
 * Portability
 * Hardware Specific Utilization

### Moore's Law
 * Doublign of the number of transisotrs on integrated circuits rougly every two years.

### Computer Hardware Trend
 * Chip density is continuing increase ~ 2x every 2years:
   * Clock speed is not(in high clock speed, power consumption and heat generation is too high to be tolerated.)
   * # of cores may double instead
 * No more hidden paralleism(ILP;instruction level parallelism) to be found
 * Transistor# still rising
 * Clock speed flattening shareply
 * Need Multicore programming

### Examples of Paralle lComputer
 * Chip MultiProcessor (CMP)
 * Symemetric Multiprocessor(SMP)
 * Heterogeneous Chips
 * Clusters
 * Supercomputers

### Generic SMP
 * Symmetric MultiProcessor(SMP) System:
   * multiprocessor hardware architecture
   * two or more identical processors are connected to a single shared memory
   * controlled by a single OS instance
   * Most common multiprocessor systems today use and SMP architecture
   * Both Multicore and multi-CPU
   * Single logical memory image
   * Shared bus often bottleneck

### Summary
 * All computers are now parallel computers
 * Multi-core processors represent an important new trend in computer achitecture.
 * They enable true thread-level parallelism with great energy efficiency and scalability.
 * To utilize their full potential, applications will need to move from a single to a multi-threaded model.
 * The software industry needs to get back into the state where existing applications run faster on new hardware.

### Principles of Parallel Computing
 * Finding enough parallelism (Amdahl's Law)
 * granularity
 * Locality
 * Load balance
 * Coordination and Synchronization

### Overhead of Parallelism
 * Tradeoff: Algorithm needs sufficiently large units of work to run fast in parallel, but not so large that htere is not enough parallel work.

### Locality and Parallelism
 * Large memories are slow, fast memories are small
 * Storage hierarchies are large and fast on average
 * Parallel processors, collectively, have large, fast cache
 * Algorithm should do most work on loccal data

### Load Imbalance
 * Load imbalance is the time that some processors in the system are idle due to:
   * insufficient parallelism (during the phase)
   * unequal size tasks

## Performance of Parallel Programs
### Flynn's Taxonomy on Parallel Computer
 * Classified with two independent dimension:
   * Instruction stream
   * Data stream

#### SISD (Single Instruction, Single Data)
 * A serial (non-parallel) computer
 * This is the oldes and even today, the most common type of computer

#### SIMD (Single Instruction, Multiple Data)
 * All processing units execute the same instruction at any given clock cycle
 * Best suited for specialized problems characterized by a high degree of regularity, such as graphics/image processing.

#### MISD (Multiple Instruction, Single Data)
 * Each processing unit operates on the data independently via separate instruction streams.
 * Few actual examples of this class of parallel computer have ever existed.

#### MIMD (Multiple Instruction, Multiple Data)
 * Very processor may be executing a different instruction stream
 * Every processor may be working with a different data stream
 * the most common type of parallel computer
 * Most modern supercomputers fall into this category.

### Creating a Parallel Program
1. Decomposition
2. Assignment
3. Orchestration/Mapping

#### Decomposition
 * Break up computation into tasks to be divided among processes
 * identify concurrency and decide level at which to exploit it.

#### Domain Decomposition
 * data associated with a probelm is decomposed.
 * Each parallel task then works on a portion of data.

#### Functional Decomposition
 * the focus is on the computation that is to be performed rather than on the data
 * problem is decomposed according to the work that must be done.
 * Each task then performs a portion of the overall work.

#### Assignment
 * Assign taks to threads:
   * Balance workload, reduce communication and management cost
   * Together with decomposition, and callled partitioning
 * Can be performed statically, or dynamically
 * Goal:
   * Balanced workload
   * Reduced communication costs

#### Orchestration
 * Sturucturing communication and synchronization
 * Organizing data structures in memory and scheduling taks temporarlly
 * Goals:
   * Reduce cost of communication and synchronization as seen by processors
   * Reserve locality of data reference (including data structure organization)

#### Mapping
 * Mapping threads to execution units (CPU cores)
 * Parallel Pplication tries to use the entire machine
 * Usually a job for OS
 * Mapping decision:
   * Place related threads (cooperating threas) on the same processor
   * maximize locality, data sharing, minimize coasts of comm/sync

### Performance of Parallel Programs
 * Decomposition:
   * Coverage of parallelism in algorithm
 * Assignment:
   * Granularity of partitioning among processors
 * Orchestration/Mapping:
   * Locality of computation and communication

#### Coverage (Amdahl's Law)
 * Potential program speedup is defined by the fraction of code that can be prallelized
 * p = fraction of work that can be prallelized, n = the number of processor
 * speedup = old running time / new runing time = 1 / { (1-p) + p/n }

#### Performance Scalability
 * Scalability : the capability of a system to increase total throughput under an increased load when resources(typically hardware) are added

#### Granularity
 * Granularity is a qualitative measure of the ratio of computation to communication:
   * Coarse: relatively large amounts of computational work are done between communication events
   * Fine : relatively small amounts of computational work are done between communication events
 * Computation stages are typically seperated from periods of communication by synchronization events
 * Granularity:
   * the extent to which a system is broekn down into small parts
 * Corase-grained systems:
   * consist of fewer, larger components than fine-grained systems
   * regards large subcomponents
 * Fine-grained systems:
   * regard smaller components of which the larger ones are composed.

### Fine vs Coarse Granularity
 * Fine-grain Parallelism:
   * Low computation to communication ratio
   * Samll amounts of computational work between communication stages
   * Less oppertunity for performance enhancement
   * HIgh communication overhead
 * Coarse-grain Parallelism:
   * High computation to communication ratio
   * Large amounts of computational work between communication events
   * More oppertunity for performance increase
 * The most efficient granularity is dependent on the algorithem and the hardware
 * In most cases the overhead associated with communications and synchronization is high relative to execution speed so it is advantageous to have coarse granularity.
 * Fine-grain parallelism can help reduce overheads due to load imbalance.

### Load Balancing
 * distributing approximately equal amounts of work among taks so that all taks are kept busy all of the time.
 * It can be sonsidered a minimization of task idel time.

### General Load Balancing Problem
 * The whole work should be compoleted as faster as possible.
 * As workers are very expensive, they should be kept busy.
 * Thw work should be distributed fairly. About the same amount of work should be assigned to every worker.
 * There are precedence constraints between different tasks. Thus we also have to find a clever procssing order of the different jobs.

### Load Balancing Problem
 * Processors that finish early have to wait for the processor with the largest amoung of work to complete

### Static load balancing
 * Programmer make decisions and assigns a fixed amount of work t each processing core a  priori
 * Low run time overhead
 * Works well for homogeneous multicores:
   * All core are the same
   * Each core has an equal amount of work
 * Not so well for heterogeneous multicores:
   * Some cores may be faster than others.
   * Work distribution is uneven.

### Dynamic Load Balancing
 * WHen one core finishes its allocated work, it takes work from a work queue or a core with the heaviest workload
 * Adapt partitioning at run time to balance load
 * High runtime overhead
 * Ideal for codes where work is uneven, unpredictable, and in heterogeneous multicore

### Granularity and Performance Tradeoffs
 * Load balancing:
   * How well is work distributed among cores?
 * Synchronization/Communication:
   * Communication Overhead

### Communication
 * With message passing, programmer has to understand the computation and orchestrate the communication accordingly

### Factors to consider for communication
 * Cost of communications:
   * Inter-task communication virtually always implies overhead.
   * Communications frequently require some type of synchronization between tasks, which can result in taks spending time 'waiting' instead of doing work.
 * Latency vs Bandwidth:
   * Latency:
     * the time it takes to send a minimal message from point A to point B.
   * Bandwidth:
     * The amount of data that can be communicated per unit of time.
   * Sending many small messages can cause latency to dominate communication overheads.
   * Often it is more efficient to package small messages into a larger message.
 * Synchronous vs asynchronous:
   * Synchronous : require some type of handshaking between tasks that shred data
   * Asynchronous : transfer data independently from one another.
 * Scope of communication:
   * Point-to-Point
   * Collective

### MPI : Message Passing Library
 * MPI :portable specification:
   * Not a language or compiler specification
   * Not a specific implementation or product
   * SPMD model (same program, multiple data)
 * For parallel computers, clusters, and heterogeneous networks, multicores
 * Multiple communication modes allow precise buffer management
 * Extensive collective operations for scalable global communication

### Point-To-Point
 * Basic method of communication between two processors:
   * Originating processor "sends" message to destination processor
   * Destination processor then "receives" the message
 * The message commonly includes:
   * Data or other information
   * Length of the message
   * Destination address and possibly a tag

### Synchronous vs Asynchronous Messages
 * Synchronous send:
   * Sender notified when message is received
 * Asynchronous send:
   * Sneder only know that message is sent

### Blocking vs .Non-Blocking Messages
 * Blocking messages:
   * Sender waits until message is transmitted: buffer is empty
   * Receiver watis until message is received: buffer is full
   * Potential for deadlock
* Non-blocking:
  * Processing continues even if message hasn't been transmitted
  * Avoid idel time and deadlocks

### Broadcase
 * one processor sends the same inforamtion to many other processors
 * MPI_BCAST
```
A[n] = {...}
B[n] = {...}
Broadcast(B[1..n])
for (i 1 to n)
  // round robin distribute B to m processors
  Send(A[i % m])
```

### Reduction
 * A reduction combines data from all processors and returns it to a singl process
 * MPI_REDUCE
 * Can apply any associative operation on gathered data(ADD , OR, AND, MAX, MIN, etc)
 * No processor can finish reduction before each processor has contributed a value
 * BCAST/REDUCE can reduce programming complexity and may be more efficient in some programs

### Synchronization
 * Coordination of simultaneous events(threads/processes) in order to obatin correct runtime order and avoid unexpected condition
 * Type of synchronization:
   * Barrier:
     * Any thread/process must stop at this point(barrier) and cannot proceed until all other threads/processes reach this barrier
   * Lock/semaphore:
     * The first task acquires the lock. This task can then safely(serially) access the procted data or code.
     * Other takss can attempt to acquire the lock but must wait until the task that owns the lock release it.

### Locality
 * Large memories are slow, fast memories are small.
 * Storage hierarchies are large and fast on average
 * Parallel processors, collectively, have large, fast cache
 * Algorithm should do most work on local data
 * Need to exploit spatial and temporal locality

### Memory Access Latency in Shared Memory Architectures
 * Uniform Memory Access (UMA):
   * Centrall located memory
   * All processors are equidistant (access times)
 * Non-Uniform Access (NUMA):
   * Physicall partitioned but accessible by all
   * Processors have the same address space
   * Placement of data affects performance
   * CC-NUMA (Cache-Coherent NUMA)

### Cache Coherence
 * The uniformity of shared resource data that ends up sotred in multiple local caches
 * Problem: When a processor modifies a shared variable in local cache, different processors may have different value of the variable.:
   * Copies of a variable can be present in multiple caches
   * A write by one processor may not become visible to others
   * They'll keep accessing stale value in their caches
   * Need to take actions to ensure visibility or cache coherence

 * Snooping cache coherence:
   * Send all requests for data to all processors
   * Works well for small systems
 * Directory-based cache coherence:
   * Keep track of what is being shared in a directory
   * Send point-to-point requests to processors.

### Shared Memory Architecture
 * All processors to access all memory as global address space(UMA, NUMA)
 * Advantage:
   * Global address space provides a user-friendly programming perspective to memory
   * Data shring between taks is both fast and uniform due to the proximity of memory to CPUS
 * Disadvantage:
   * Primary distadvantabe is the lack of scalaility between memory and CPUs
   * Programmer responsibility or synchronization
   * Expense: It becomes incresasingly difficult and expensive to design and produce shared memory machines with ever increasing numbers of processors.

### Distributed Memory Architecture
 * Characteristics:
   * Only private(local) memory
   * Independent
   * require a communication network to connect inter-processor memory
 * Advantages:
   * Scalable(processors, memory)
   * Cost effective
 * Disadvantages:
   * Programmer responsibility of data communication
   * No global memory access
   * Non-uniform memory access time

### Hybrid Architecture:
 * Advantages/Disadvantage:
   * Combination of Shared/Distributed architecture
   * Scalable
   * Increased programmer complexity

## JAVA Thread Programming
### Process
 * Process:
   * Operating system abstraction to represent what is needed to run a single program
   * a sequential stream of execution in its own address space
   * program in execution

### Unix process
 * Every process, except process 0, is cresated by the fork() systemcall:
   * fork() allocates entry in process table and assigns a unique PID to the child process
   * child gets a copy of process image of parent
   * both child and parent are executing the same code following fork()
```cpp
main()
{
  int pid;
  cout << "just one process so far" << endl;
  pid = fork();
  if (pid == 0)
    cout << "im the child" << endl;
  else if (pid > 0)
    cout << "im the parent" << endl;
  else
    cout << "fork failed" << endl;
}
```

### Threads
 * Definition:
   * single sequential flow of control within a program
   * A thread runs within the context of a program's process and takes advantage of the resources allocated for that process and it's environment
 * Each thread is comprised of (from OS perspective):
   * Program counter
   * Register set
   * Stack
 * Threads belonging to the same process share:
   * Code sectino
   * Data section
   * OS resources such as open files

### Multi-process vs Multi-thread
 * Process:
   * Child process gets a copy of parents variables
   * Relatively expensive to start
   * Don't have to worry about concurrent access to variables
 * Thread:
   * Child process shares parent's variables
   * Relatively cheap to satrt
   * Concurrent access to variables is an issue

### Programming JAVA Threads
### Java Threading Models
 * Java has thread built-in(java.lang.thread)
 * Applicatons consist of at least on thread:
   * Often called main
 * Thre Java Virtual Machine creates the initial thread which exectues the main method of the class passed to the JVM
 * The methods executed by the 'main' thread can then create other threads

### Creating THreads: method1
```java
class Mythreads extends Thread {
  public void run() {
    // work to do
  }
}

/*
 MyThread t = new THread();
 t.start
 */
```

### Thread Names
 * All threads have a name to be printed out.
 * The default name is of the format: `Thread-No`:
   * Thread-1, THread-2, ...
 * User-defined names can be given thru consturctor:
   `Thread myThread = new THread("HappyThread");`
 * Or using the `setName(aString)` method
 * There is a method in THread class, claeed `getName()`, to obtain a thread's name

### Creating Threads: method 2
 * Since Java does not permit multiple inheritance, we often implement the run() method in a class not derived from Thread but from the interface Runnable.
```java
public interface Runnable {
  public abstract void run();
}
class MyRun implements Runnable {
  public void run() {
    // do something
  }
}
/*
 Thread t = new Thread(new MyRun());
 t.start();
 */
```

### Thread Life-Cycle
 * Created : start() -> Alive, stop() -> Terminated
 * Alive : stop() or run returns -> Terminated
 * Terminated

 * The predicate `isAlive()` can be used to test if a thread has been started but not terminated. Once terminated, it cannot be restarted.

### Alive States
 * Runnuing : wait(), sleep(), I/O blocking -> Non-Runnable, yield() -> Runnable(Ready)
 * Runnable(Ready) : dispatch -> Running
 * Non-Runnable : notify(), Time expires, I/O completed -> Runnable(Ready)

### Thread Priority
 * All Java Threads have a priority value, currently between 1 and 10.
 * Priority can be changed at any time:
   * `setPrioirty(int newPriority)`
 * Initial priority is that of the creating thread
 * Preemptive scheduling:
   * JVM gives preference to higher priority threads, (Not guarentted)

### yield
 * Release the right of CPU
 * static void yeild():
   * allows the scheduler to select another runnable thread(of the same priority)
   * no guaranttes as to which thread

### Thread identity
 * Thread.currentThread():
   * Returns reference to the running thread
 * Compare running thread with created thread

### Thread sleep, suspend, resume
 * static void sleep(long millis):
   * Blocks this thread for at least the time specified
 * void stop(), void suspend(), void resume()
   * deprecated

### Thread Waiting & Status check
 * void join(), void join(long), void join(long, int):
   * Once thread (A) can wait for another thread (B) to end
 * boolean isAlive():
   * returnes true if the thread has been styarted and not stopped

### THread syncrhonization
 * The advantage of threads is that they allow many things to happen at the same time
 * The problem with threads is that they allow many thigns to happen at the same time
 * Safety:
   * Nothing bad ever happens
   * no race condition
 * Liveness:
   * Something eventually happens: no deadlock
 * Concurrent access to shared data in an object
 * Need a way to limit thread's access to shared data:
   * Reduce concurrency
 * Mutual Exclusion of Critical Section
 * Add a lock to an obejct
 * Any thread must acquire the loc kbefore executing the methods.
 * If lock is currently unavailable, thread will block

### Synchronized JAVA methods
 * We can control access to an object by using the `synchronized` keyword
 * Using the `synchronized` keyword will force the lock on the object to be used

### Synchronized Lock Object
 * Every Java obejct has an associated lock acquired via
 * synchronized statements (block)
```java
synchronized(anObject) {
  // execute code while holding an Object's lock
}
```
 * Only one thread can hold a lock at a time
 * Lock granularity: small criticial section is better for concurrency object

### Condition Variables
 * Lock(synchronized):
   * control thread access to data
 * condition variable (wait, notify/notifyall):
   * synchronization primitives that enable threads to wait until a particular condition occurs.
   * enable threads to atomically release a lock and enter the sleeping state.
   * Without condition variables:
     * the programmer would need to have threads continually polling, to check if the condition is met.
     * A condition variable is a way to achieve the same goal without polling.
   * A condition variable is always used in conjunction with a mutex lock.

### wait() and notify()
 * wait():
   * If no interrupt(normal case), current thread is blocked
   * The thread is placed into wait set associated with the object
   * Synchronization lock for the object is rleased
 * notify():
   * One thread, say T, is removed from wait se,t if exists.
   * T retains the lock for the object
   * T is resumed from waiting status

## Producer-Consumer Problem
 * The problem describes two processes, the producer and the consumer, who share a coommon, fixed-size buffer used as a queue.
 * The solution for the producer is to go to sleep if the buffer is full. The next time the consumer removes an item from the buffer, it notifies the producer, who starts to fill the buffer agin.
 * In the sameway, the consumer can go to sleep if it finds the buffer to be empty. The next tiem the producer puts data into the buffer, it wakes up the sleeping consumer.
 * generalized to have multiple producers and consumers.

## Potential Concurrency Problejms
 * Deadlock : Two or more threads stop and wait for each other
 * Livelock : Two or more threads continue to execute, but make no progress toward the ultimate goal.
 * Starvation : Some thread gets deferred forever.
 * Lack of fairness : Each thread gets a turn to make progress.
 * Race Condition : Some possible interleaving of threads results in an undesired computation result.

## Important Concepts in Concurrent Programming
 * Concurrency/Prallelism : logically/physically simultaneous processing.
 * Synchronization
 * Mutual Exclusion
 * Critical Section
 * Race Condition
 * Semaphore
 * Concurrent hash map
 * copy on write arrays
 * Barrier

## Devide-and-Conquer way for parallelization
 * In theory, you can divide down to single elements, do all your result-combining in parallel and get optimal speed up:
   * Total time : O(n/numProcessors + log n)
 * In practice, creating all those threads and communicating swamps the savings, so:
   * Use a sequential cutoff, typically around 500-1000:
     * Eliminates almost all the recursive thread creation(bottom levels of three)
     * Exactly like quicksort switching to insertion sort for small subproblems, but more important here
   * Do not create two recursive threads: create one and do the other yourself

## Pthread Programming
### Thread Properties
 * Exists within a process and uses the process resources
 * Has its own independent flow of control as long as its parent process exists and the OS supports it.
 * Duplicates only the essential resources it needs to be independently schedulable
 * May share the process resources with other threads that act equally independently (and dependently)
 * Dies if the parent process dies - or something similar
 * Is lightweight because most of the overhead has already been accomplished through the creation of its process.
 * All threads within a process share same address space.
 * Therefore, inter-thread communication is more efficient than inter-process communication

### pthread
 * pthread:
   * POSIX thread
   * Standardized C language threads for UNIX
   * For portability
   * Working in shared memory multiprocessor
 * Why pthreads?:
   * Performance gains
   * Requires fewer system resources than process

### Pthreads API
 * Three groups:
   * Thread Management:
     * Thread creation, and destruction
   * Mutexes (mutual exclusion):
     * synchronization
   * Conditional Variables:
     * Communication between threads that share a mutex

### Thread Management
 * `pthread_create(thread, attr, start_routine, arg)`
 * `pthread_exit(status)`
 * `pthread_cancel(thread)``

#### Thread Creation
 * Creates a new thread and makes it excuatable.
 * The creating process (or thread) must provide a location for storage of the thread id.
 * The third parameter is just the name of the funciton for the thread to run.
 * The last parameter is a pointer to the arguments.
 * When a new thread is created, it runs concurrently with the creating process.
 * When creating a thread, you indicate which funciton the thread should execute.
 * Thread handle returned via pthread_t structure
 * Specify NULL to use default attributes
 * Single argument sent to the function
 * If no arguments to funciton, speicify NULL
 * Check error codes

#### Thread Termination
 * There are several ways in which a pthread may be terminated:
   * The thread returns from its starting routinge (the main routine for the initial thread).
   * The thread makes a call to the `pthread_exit` subroutine.
   * The thread is canceled by another thread via the `pthread_cancel` routine
   * The entire process is terminated due to making a call to either the `exec()` or `exit()`
   * If `main()` finises first, without calling `pthread_exit` explicitly itself.
 * The programmers may optionally specify a termination status, which is sotred as a void pointer for any thread that may join the calling thread.,
 * Cleanup: the pthread_exit() routine does not close files; any files opened inside the thread will reamin open after the thread is terminated.

#### Thread Cancellation
 * Once thread can request that another exit with `pthread_cacel`
 * `int pthread_cancel(pthread_t thread);`
 * The pthread_cancel returns after making the request.

#### Joinning
 * The `pthread_join()` subroutine blocks the claling thread until the specified thread terminates.
 * The programmer is able to obtain the target thread's termination returns status if it was specified in the target thread's call to `pthread_exit()`.
 * A joining thread can match one `pthread_join()` call. It is a logical error to attempt multiple joins on the same thread.

### Mutexes
 * Mutual Exclusion
 * implementing thread synchronization and protecting shared data when multiple writes occur.
 * A mutex variable acts like a lock protecting access to a shared data resource
 * Used for preventing race condition
 * When several threads compete for a mutex, the losers block at the call.

#### Mutex Routins
 * `pthread_mutex_init( mutex, attr)`
 * `pthread_mutex_destroy(mutex)`
 * Mutex variables must be declared with type ptyhread_mutex_t, and must be initialzed before they can be used.

#### Locking/Unlocking Mutexes
 * `pthread_mutex_lock(mutex)`
 * `pthread_mutex_trylock(mutex)`
 * `pthread_mutex_unlock(mutex)`

#### User's Responsibility for Using Mutex
 * When protecting shared data, it is the programmer's reponsibility to make sure every thread that needs to use a mutex does so.

### Condition Variables
 * another way for threads to synchronize
 * mutexes:
   * synchronization by controlling thread access to data
 * condition variables:
   * synchronization based upon the actual value of data.
   * without condition variables, the programmer would need to have threads continually polling, to check if the conditoin is met.
   * always used in conjunction with a mutex lock

#### Condition Variables Routines
 * `pthread_cond_init(condition, attr)`
 * `pthread_cond_destory(condition)`
 * Condition variables must be declared with type `pthread_cond_t`, and must be initialized before they can be used.
 * attr is used to set condition variable attribute(NULL: defaults)
 * `pthread_cond_destory()` should be used to free a condition variable that is no longer needed.
 * `pthread_cond_wait(condition, mutex)`:
   * blocks the claling thread until the specified condition is signalled.
   * This routine should be called while mutex is locked
   * will automatically release the mutex lock while it waits
   * After signal is received and thread is awakened, mutex will be automatically locked for use
 * `pthread_cond_signal(condition)`
   * signal(or wake up) another thread which is waiting on the condition variable.
 * It is a logical error to call pthread_cond_signal() before calling pthread_cond_wiat()
 * `pthread_cond_broadcast(condition)`
   * should be used instead of pthread_cond_signal() if more than one thread is in a blocking wait state.

## OpenMP
### Shared Memory Model
 * All threads have access to the same, globally shared memory.
 * Data can be shred or private
 * Shared data is accessible by all threads
 * Private data can be accessed only by the threads that owns it.
 * Data transfer is transpearent to the programmer
 * Synchronization takes place, but it is motely implicit.

### Example -Matrix times vector
```c
#pragma omp parallel for default(none) \
            private(i, j, sum) shared(m, n, a, b, c)
for (i = 0; i < m; i ++)
{
  sum = 0.0;
  for (j = 0; j < n; j ++)
    sum += b[i][j] * c[j];
  a[i] = sum;
}
```

### When to consider using OpenMP
 * The compiler may not be able to do the parallelization in the way you like to see it:
   * A loop is not parallelized:
     * The data dependency analysis is not able to determine whether it is safe to parallelize or not
   * The granularity is not high enough:
     * The compiler lacks information to parallelize at the highest possible level
 * This is when explicit parallelization through OpenMP directives and functions comes into the picture.

### About OpenMP
 * The OpenMP programming model is a powerful, yet compact, de-facto standard for Shared Memory Programming
 * Languages supoprted: Fortran and C/C++

### Terminology
 * OpenMP Tema := Master + Workers
 * A Parallel Region is a block of code executed by all threads simultaneously:
   * The master thread always has thread ID 0
   * Thread adjustment (if enabled) is only done before entering a parallel region
   * parallel regions can be nested, but support for this is implementation dependent
   * An if clause can be used to guard the parallel region; in case the condition evaluates to "false", the code is executed serially
 * A work-sharing construct divides the execution of the enclosed code region among the members of the team; in other words: they split the work

### Components of OpenMP
 * Directives:
   * Parallel regions
   * Work sharing
   * Synchronization
   * Data scope attributes:
     * private
     * firstprivate
     * lastprivate
     * shared
     * reduction
   * Orphaning
 * Environment Variables:
   * Number of threads
   * Scheduling type
   * Dynamic thread adjustment
   * Nested parallelism
 * Runtime environment:
   * Number of threads
   * Thread ID
   * Dynamic thread adjustment
   * Nested parallelism
   * Timers
   * API for locking

### About OpenMP clauses
 * Many OpenMP directives supoprt clauses
 * These clauses are used to specify additional information with the directive.
 * For example, `private(a)` is a clause to the for directive:
   * `#progma omp for private(a)`
 * Before we present an overview of all the directives, we discuss several of the OpenMP clauses first
 * The specific claus(s) that can be used, depends on the directive

### The if/private/shared clauses
 * `if(scalar expression)`:
   * Only execute in parallel if expression evaluates to true
   * Otherwise, execute serially
 * `private(list)`:
   * No storage association with original object
   * All references are to the local object
   * Values are undefined on entry and exit
 * `shared(list)`:
   * Data is accessible by all threads in the team
   * All threads access the same address space.

### About storage association
 * Private variables are undefined on entry and exit of the parallel region
 * The value of the original variable (before the parallel region) is undeinfed after the parallel region.
 * A private variable within a parallel region has no storage association with the same variable outside of the region
 * Use the first/last private clause to override this behaviour

### The first/last private cluases
 * firstprivate(list):
   * All variables in the list are initialized with the value the original object had before entering the parallel construct
 * lastprivate(list):
   * The thread that exectues the sequentially last iteration or section updates the value of the objects in the list

### The default clause
 * default(none | shared | private)
 * default(none | shared) (default(private) is not supported in C/C++)
 * none:
   * No implicit defatuls
   * Have to scope all variables explicitly
 * shared:
   * All variables are shared
   * The default in absence of an explicit default clause
 * private:
   * All variables are private to the thread
   * Includes common block data, unless THREADPRIVATE

### The reduction clause
 * reduction(operator:list)
 * Reduction variable(s) must be shared variables
 * The reduction can be hidden in a funciton call

### The nowait clause
 * To minimize synchronization, some OpenMP directives/pragmas support the optional nowait clause
 * If present, threads will synchronize/wait at the end of that particular construct
 * In C, it is one of the clauses on the pragma

### The parallel region
 * A parallel region is a block of code executed by multiple threads simultaneously

### Work-sharing constructs
 * The work is distributed over the threads
 * Must be enclosed in a parllel region
 * Must be encountered by all threads in the team, or none at all
 * No implied barrier on entry; implied barrier on exit(unless nowait is specified)
 * A work-sharing construct does not launch any new threads

### The omp for/do directive
```
#pragma omp for [cluase[[,] clause] ...]
  <origianl for-loop>
```

### Load balancing
 * Load balancing is an important aspect of performance
 * For regular operations, load blancing is not an issue.
 * For less regular workloads, care needs to be taken in distributing the work over the threads.
 * Examples of irregular workloads:
   * Transposing a matrix
   * Multiplication of triangular matrices
   * Parallel searches in a linked list
 * For these irregular situations, the schedule clause supports various iteration scheduling algorithms

### The schedule clause
 * schedule(static | dynamic | guided [, chunk])
 * schedule(runtime)
 * static[, chunk]:
   * Distribute iterations in blocks of size chunk over the threads in a round-robin fashion
   * In absence of chunk, each thread executes approx, N/P chunks for a loop for length N and P threads
 * dynamic[, chunk]:
   * Fixed portions of work; size is controlled by the value of chunk
   * When a thread finishes, it starts on the next portion of work
 * guided[, chunk]:
   * Same dynamic behaviour as "dynamic", but size of the portion of work decreases exponentially
 * runtime:
   * Iteration scheduling scheme is set as runtime through environment variable OMP_SCHEDULE

### The SECTIONS directive
```
#pragma omp sections [cluases(s)]
{
#pragma omp section
  <code block1>
#pragma omp section
  <code block2>
#pragma omp section
...
}
```

### Orphaning
 * The OpenMP standard does not restrict worksharing and synchronization directives (omp for, omp single, critical, barrier, etc.) to be within the lexical extent of a parllel region. These directives can be orphaned
 * That is, they can appear outside the lexical extent of a parallel region
 * When an orphaned worksharing or synchronization directive is encountered within the dynamic extent of a parallel region, its behaviour will be similar to the non-orphaned case
 * When an orphaned worksharing or synchronization directive is encoutnered in the sequential part of the program (outside the dynamic extent of any parallel region), it will be executed by the master thread only. In effect, the directive will be ignored.

### Synchornization Controls
### Barrier
 * `#pragma omp barrier`
 * When data is updated asynchronously and the data integrity is at risk
 * Unfortunately, barriers tend to be expensive and also may not scale to a large number of processors.

### Critical region
 * Useful to avoid a race condition, or to perform I/O(but which still will have random order)
 * Be aware that your parallel computation may be serialized and so this could introduce a scalability bottleneck

```
#pragma omp critical [(name)]
{ <code-block> }
```

```
#pragma omp atomic
<statement>
```

### Single processor region
 * Usually, there is a barrier needed after this region
 * Migh therefore be a scalability bottleneck

### SING and MASTER construct

```
#pragma omp single [clause[[,] clause] ...]
{
  <code-block>
}
```

```
#pragma omp master
{ <code-block> }
```

### More synchronization directives
 * ordered, flush

### OpenMP Environment Variableso
 * OMP_NUM_THREADS : default 1
 * OMP_SCHEDULE : static, "N/P" (1)
 * OMP_DYNAMIC : TRUE(2)
 * OMP_NESTED : FALSE(3)

### OpenMP and Global data
 * Global data is shared and requires special care
 * A problem may arise in case multiple threads access the same memory section simultaneously:
   * Read-only data is no problem
   * Updates have to be checked for race conditions
 * It is your responsibility to deal with this situation
 * In general one can do the following:
   * Split the global data into a part that is accessed in serial parts only and a part that is accessed in parallel
   * Manullay create thread private copies of the latter
   * Use the thread ID to access these private copies

### The threadprivate construct
 * `#pragma omp threadprivate (list)`
 * Thtread private copies of the designated global variables and common blocks will be made
 * Several restriction and rules apply when doing this:
   * The number of threas has to remain the same for all the parallel regions
   * Initial data is undefined, unless copyin is used

### The copyin caluse
 * `copyin(list)`
 * Applies to THREADPRIVATE common blocks only
 * At the start of the parallel region, data of the master thread is copied to the thread private copies

### OpenMP Runtime Functions
 * OpenMP provides various user-callable functions:
   * To control and query the parallel environment
   * General puerpose semaphore/lock routines
 * The runtime functions take precedence over the corresponding envrionment variables
 * Recommended to use under control of an #ifdef for _OPENMP(C/C++)
 * C/C++ programs need to include <omp.h>

### OpenMP runtime library
 * omp_set_num_threads
 * omp_get_num_threads
 * omp_get_max_threads
 * omp_get_thread_num
 * omp_get_num_procs
 * omp_in_parallel
 * omp_set_dynamic
 * omp_get_dynamic
 * omp_set_nested
 * omp_get_nested
 * omp_getwtime
 * omp_get_wtick

### OpenMP locking routines
 * Locking provide greater flexibility over critical sections and atomic updates:
   * C/C++ : type omp_lock_t and omp_nest_lock_t for nested locks
 * Lock variables should be manipulated throught the API only
 * It is illegal, and behaviour is undefined, in case a lock variable is used without the appropriate initialization

## Nested locking
 * Simple locks
 * Nestable locks
 * simple locks:
   * omp_init_lock
   * omp_destroy_lock
   * omp_set_lock
   * omp_unset_lock
   * omp_test_lock
 * nestable locks:
   * omp_init_nest_lock
   * omp_destroy_nest_lock
   * omp_set_nest_lock
   * omp_unset_nest_lock
   * omp_test_nest_lock

## Manycore GPU Programming with CUDA
 * Moore's Law :  Transistor count of integrated circuits doubles every two years

### The Need of Multicore Architecture
 * Hard to design high clock speed(frequency):
   * power consumption and heat generation : too high
   * # of cores may still increase

### Many-core GPUs
 * Motivation:
   * Originally driven by the insatiable marget demand for realtime, high-definition 3D graphics
   * programmable GPU has evolved into a highly parallel, multithreaed, manycore processor with tremendous computational horsepower and very high memory bandwidth
 * GPGPU:
   * General Puerpose computing on GPU (Graphical Processing Unit)
   * Utilization of GPU (typically handles computations for graphics) to perform general purpose computation(traditionally handled by CPU)

### Processor:Multicore vs Many-core
 * Multicore direction(CPU) : 2~8 cores:
   * Typically handles general puerpose computation
   * seeks to maintain/increase the execution speed of sequential programs
   * Complex  : out-of-order, multiple instruction issue, branch predction, pipelining, large cahce ...
   * while moving into multiple cores
 * Many-core direction(GPU) : 100~3000 cores:
   * Focuse on the execution throughput of parallel applications
   * Simple : inorder ,single instruction issue
   * Large number of smaller cores

### GPU
 * Specially designed for highly parallel applications:
   * Programmable using high level languages (C/C++)
   * Supports standard 32-bit floating point precision
   * Lots of GFLOPS
 * Fast processing must come with high bandwidth!
 * Simpler memory models and fewer constraints allow high bandwidth
 * Memory bandwidth
 * GPU is specialized for:
   * Compute-intensive
   * Highly data parallel computation
   * More transistors devoted to data processing rather than data caching and flow control
 * What graphics rendering needs? : Geometry(vertex) + Pixel processing
 * Motivates many application developers to move the computationally intensive parts of their software to GPUs for execution

### Applications
 * 3D rendering
 * image and media processing applications such as post processing of rendered images, video encoding and decoding, image scaling, stereo vision, and pattern recognition
 * many other kinds of algorithms are accelerated by data-parllel processing

### CPU vs GPU
 * CPU: Optimized for sequential code performance:
   * sophisticated control logic:
     * to allow instructions from single thread to execute in parallel or even out-of order
     * branch prediction
   * large cache memory:
     * to reduce the instruction and data access latencies
   * Powerful ALU:
     * reduced operation latency
 * GPU: Optimized for execution throughput of multiple threads:
   * Originally for fast(3D) video game:
     * Requires a massive number of floating-point calculations per frame
   * Minimize control logic and cache memory:
     * Much more chip area is dedicated to the floating-poitn calculations
     * Boost memory throughput
   * Energy Efficient ALU
   * Designed as (data parllel) numeric computing engins

 * GPU : Maximize throughput
 * CPU : Minimize latency

### GPU Architecture
 * GPUs consist of many simple cores
 * Array of highly threded streaming multicores(SMs)
 * Two or more SMs form a building block.

### GPU chip design
 * GPU core is stream processor
 * Steram processors are grouped in stream multiprocessors

### Popularity of GPUs
 * Performance
 * Cost
 * large marketplace &* customer population
 * Practical factors and easy accessibility
 * Support of IEEE floating-point standard
 * CUDA:
   * Programmer can use C/C++ programming tools
   * No longer go through complex graphics interface

### Why more parallelism?
 * Applications will continue to demand increased speed
 * A good implmentation on GPU can achieve more than 100 times speedup over sequential execution

### CUDA(Computer Unified Device ARchitecture)
 * Parallel Computing Framework Developed by NVIDIA
 * Inttroduced in 2006
 * General Purpose Programming Model:
   * GPGPU (General Porpose GPU)
   * Offers a computing API
   * Explicit GPU memory management
 * Goal:
   * Develop application SW that transparently scales its parallelism to leverage the increasing number of processor cores

### Compute Capability
 * general speicifications and features of compute device
 * Defined by major revision number of minor revision number

### CUDA - Main Features
 * C/C++ with extensions
 * Heterogeneous programming model
 * Operates in CPU(host) and GPU (device)

### CUDA device and threads
 * Device:
   * Is a coprocessor to the CPU or host
   * Has access to DRAM (device memory)
   * Runs many threads in parallel
   * Is typically a GPU but can also be another type of parallel processing device
 * Data-parallel portions of an applications are expressed as device kernels which run on many threads
 * Differences between GPU and CPU threads:
   * GPU threads are extremely lightweight
   * GPU needs 1000s of threads for full efficiency

### CUDA Hello World
```cpp
#include <stdio.h>
__glogal__void hello_world(void) {
  pritnf("Hello World\n");
}

int main (void) {
  hello_world<<<1, 5>>>();
  cudaDeviceSynchronize();
  return 0;
}
```

### C Language Extension
 * Function Type Qualifiers
 * `__global__`:
   * executed on the device (GPU)
   * callable from the host (CPU) only
   * functions should have voicd return type
   * any call to a __global__ function must specify the execution configuration for that call
 * <<<blocksPerGrid, threadsPerBlock>>>
 * <<<1, 10>>>
 * dim3 blocksPerGrid(65535, 65535, 1)
 * dim3 threadsPerBlock(1024, 1, 1)

 * Built-in Variables:
   * blockIdx = (x, y, z) : three unsigned integers, uint3
   * threadIdx = (x, y, z) : three unsigned integers, uint3
 * Built-in Vector types:
   * dim3:
     * Integer vector type based on uint3
     * used to specify dimensions

### Simple Processing Flow
 1. Copy input data from CPU memory to GPU memory
 2. Load GPU program and execute, caching data on chip for performance
 3. Copy results from GPU memory to CPU memory

### Hello World! with Device Code
 * `nvcc` seperates source code into host and device components:
   * Device function processed by NVIDIA compiler
   * Host functions processed by standard host compiler
 * Triple brackets mark a call from host code to device code:
   * Also called a "kernel launch"

### Memory Mangement
 * Host and device memory are seperate entities:
   * Device pointers point to GPU memory:
     * May be passed to/from host code
     * May not be dereferenced in host code
   * Host pointers point to CPU memory:
     * May be passed to/from device code
     * May not be dereferenced in device code
 * Simple CUDA API for handling device memory:
   * `cudaMalloc()`, `cudaFree()`, `cudaMemcpy()`
   * Similar to the C equivalents `malloc()`, `free()`, `memcpy()`

```cpp
__global__ void add(int *a, int *b, int *c) {
  *c = *a + *b;
}
int main (void) {
  int a, b, c;
  int *d_a, *d_b, *d_c;
  int size = sizeof(int);
  
  cudaMalloc((void **) &d_a, size);
  cudaMalloc((void **) &d_b, size);
  cudaMalloc((void **) &d_c, size);
  
  a = 2;
  b = 7;
  cudaMemcpy(d_a, &a, size, cudaMemcpyHostToDevice);
  cudaMemcpy(d_b, &b, size, cudaMemcpyHostToDevice);
  
  add<<<1,1>>>(d_a, d_b, d_c);
  
  cudaMemcpy(&c, d_c, size, cudaMemcpyDeviceToHost);
  
  cudaFree(d_a);
  cudaFree(d_b);
  cudaFree(d_c);
  return 0;
}
```

### Running in Parallel
### Moving to Parallel
 * GPU computing is about massive parallelism
 * Instaed of executing add() once, execute N times in parallel

## Vector Addition on the Device
```cpp
__glogal__ void add(int *a, int *b, int *c) {
  c[blockIdx.x] = a[blockIdx.x] + b[blockIdx.x];
}
// add<N, 1>> (...);
```

### CUDA Threads
 * Terminology : a block can be split into parllel threads
 * Let's change add() to use parallel threads instead of parllal blocks

### Combining Blocks and Threads
 * Handling Arbitrary Vector Sizes:
```cpp
__global__ void add(int *a, int *b, int *c, int n) {
  int index = threadIdx.x + blockIdx.x * blockDim.x;
  if (index < n)
    c[index] = a[index] + b[index];
}
// add<<<(N + M - 1) / M, M >>>(d_a, d_b, d_c, N);
```

### 1D Stencil
 * Consider applying a 1D stencil to a 1D array of elements:
   * Each output element is the sum of input elements with a radius

#### Implementing Within a block
 * Each thread processes one output element:
   * blockDim.x elements per block
 * Input elements are read several times

#### Sharing Data Between Threads
 * Terminology: within a block, threads share data via shared memory
 * Extremely fast on-chip memory, user-managed
 * Declare using __shared__, allocated per block
 * Data is not visible to threads in other blocks

```cpp
__global__ void stencil_ld(int *int, int *out) {
  __shared__ int temp[BLOCK_SIZE + 2 * RADIUS];
  int gindex = threadIdx.x + blockIdx.x * blockDim.x;
  int lindex = threadIdx.x + radius;

  temp[lindex] = in[gindex];
  if (threadIdx.x < RADIUS) {
    temp[lindex - RADIUS] = in[gindex - RADIUS];
    temp[lindex + BLOCK_SIZE] = in[gindex + BLOCK_SIZE];
  }

  __syncthreads();
  int result = 0;
  for (int offset = -RADIUS; offset <= RADIUS ; offset ++)
    result += temp[lindex + offset];
  out[gindex] = result;
}
```


### Coordinating Host & Device
 * Kernel launches are asynchronous:
   * Control returns to the CPU immediately
 * CPU needs to synchronize before consuming the results

### Reporting Erros
 * All CUDA API calls return an error code (cudaError_t):
   * Error in the API call itself
   * Error in an earlier asynchronous operation
 * Get the error code for the last error:
   * `cudaError_t cudaGetLastError(void)`
 * Get a string to describe the rror:
   * `char *cudaGetErrorString(cudaError_t)`

### Device Managment
 * Application can query and select GPUs:
   * `cudaGetDeviceCount(int *count)`
   * `cudaSetDevice(int device)`
   * `cudaGetDevice(int *device)`
   * `cudatGetDeviceProperties(cudaDeviceProp *prop, int device)`
 * Multiple CPU threads can share a device
 * A single CPU thread can manage multiple devices

