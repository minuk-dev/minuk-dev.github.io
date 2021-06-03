---
layout  : wiki
title   : Multicore Computing
summary : 
date    : 2021-06-02 17:11:08 +0900
lastmod : 2021-06-03 06:53:06 +0900
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
