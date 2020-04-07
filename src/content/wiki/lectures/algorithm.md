---
layout  : wiki
title   : 
summary : 
date    : 2020-04-07 20:37:08 +0900
lastmod : 2020-04-07 20:41:15 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
8. Basic Sorting algorithm
The most common uses of sorted sequences are

- making lookup or search efficient;
- making merging of sequences efficient
- enable processing of data in a defined order

# Sorting algorithm

The output of any sorting algorithm must satisfy two conditions

- The output is in non-decreasing order: each element is no smaller than the previous element according to the desired total order
- The output is a permutation meaning that a reordering, yet retaining all of the original elements of the input.

# Classification of Sorting Algorithms

- Computational Complexity : O(nlogn)
- Memory usage : O(1), sometimes O(log(n))
- Recursion
- Stability
- Whether or not they are a comparison sort
- Adaptability

# Common sorting algorithms

- Bubble sort : Exchange two adjacent elements if they are out of order. Repeat until array is sorted.
- Selection sort : Find the smallest element in the array, and put it in the proper place. Swap it with the value in the first position. Repeat until array is sorted.
- Insertion sort : Scan successive elements for an out-of-order item, then insert the item in the proper place.
- Merge sort : Divide the list of elements in two parts, sort the two parts individually and then merge it.
- Quick sort : Partition the array into two segments. In the first segment, all elements are less than or equal to the pivot value. In the second segment, all elements are greater than or equal to the pivot value. Finally, sort the two segments recursively.

9. Divide and Conqure
 # Divide and Conquer Paradigm

## Advantages of Divide and Conquer

- Solving difficult problems
- Algorithm efficiency
    - Karatsuba's fast multiplication method, quick and merge sort, Strassen algorithm for matrix multiplication, fast Fourier transforms.
- Parallelism
    - multi-processor machines, sub-problems can be executed on different processors.
- Memory access
    - An algorithm designed to exploit the cache in this way is called cache-oblivious
    - D&C(Divide and Conquer) algorithms can be designed for important algorithms such as sorting, FFTs, matrix multiplication to be optimal cache-oblivious algorithms
- Roundoff control

## Implementation issues

- Recursion
    - If D&C algorithms are naturally implemented as recursive procedures, the partial sub-problems leading to the one currently being solved are automatically stored in the procedure call stack.
    - A recursive function is a function that calls itself within its definition.
- Explicit stack
    - If D&C algorithms are implemented by a non-recursive program that stored the partial sub-problems in some explicit data structure, such as a stack, queue, or priority queue.
- Stack size
    - In recursive implementations of D&C algorithms, one must make sure that there is sufficient memory allocated for the recursion stack, otherwise the execution may fail because of stack overflow.
- Choosing the base cases
- Sharing repeated subproblems

## General Method

## Divide and Conquer Strategy

1. divide the problem instance into two or more smaller instances of the same problem, solve the smaller instances recursively, and assemble the solutions to form a solution of the original instance.
2. The recursion stop when an instance is reached which too small to divide
3. When dividing the instance, one can either use whatever division comes most easily to hand or invest time in making the division carefully so that the assembly is simplified.

4. Effective Sorting Algorithm
# Review : Divide and conquer algorithms

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f9a9793-fbfb-4a26-bc7a-91a20bfb9a6d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f9a9793-fbfb-4a26-bc7a-91a20bfb9a6d/Untitled.png)

# Overview of Merge Sort

Because we're using divide-and-conquer to sort, we need to decide what our subproblems are going to look like. The full problem is to sort an entire array. Let's say that a subproblem is to sort a subarray.

In particular, we'll think of a subproblem as sorting the subarray string at index p and going through index r. It will be convenient to have a notation for a subarray, so let's say that array[p..r] denotes this subarray of array.

Note that we're using "tow-dot" notation just to describe the algorithm, rater than a particular implementation of the algorithm in code. In terms of our notation, for an array of n elements, we can say that the original problem is to sort array[0..n-1].

Here's how merge sort uses divide-and-conquer:

1. Divide by finding the number q of the position midway between p and r. Do this step the same way we found the midpoint in binary search: add p and r, divide by 2, and round down.
2. Conquer by recursively sorting the subarrays in each of the two subproblems created by the dividing step. That is, recursively sort the subarray array[p..q] and recursively sort the subarray array[q+1..r].
3. Combine by merging the two sorted subarrays back into the single sorted subarray array[p..r].

## Linear-time merging

THe remaining piece of merge sort is the merge function, which merges two adjacent sorted subarrays, array[p..q] and array[q+1..r] into a single sorted subarray in array[p..r]. We'll see how to construct this function so that it's as efficient as possible.

## Analysis of merge sort

1. The divide step takes constant time, regardless of the subarray size. After all, the divide step just computes the midpoint q of the indices p and r. Recall that in big-Theta notation, we indicate constant time by Theta(1).
2. The conquer step, where we recursively sort two subarrays of approximately n/2 elements each, takes some amount of time, but we'll account for that time when we consider the subproblems.
3. The combine step merges a total of n elements, taking Theta(n) time.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e67189ca-6023-4485-8062-7b5e04603a16/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e67189ca-6023-4485-8062-7b5e04603a16/Untitled.png)

# Overview of Quick Sort

1. Divide by choosing any element in the subarray array[p..r]. Call this element the pivot. Rearrange the elements in array[p..r] so that all elements in array[p..r] that are less than or equal to the pivot are to its left and all elements that are greater than the pivot are to its right. We call this procedure partitioning . At this point, it doesn't matter what order the elements to the left of the pivot are in relation to each other, and the same holds for the elements to the right of the pivot. We just care that each element is somewhere on the correct side of the pivot.
2. Conquer by recursively sorting the subarrays array[p..q-1] (all elements to the left of the pivot, which must be less than or equal to the pivot) and array[q+1..r]. All elements to the right of the pivot, which must be greater than the pivot.
3. Combine by doing nothing. Once the conquer step recursively sorts, we are done.

## Linear-time Partitioning

- Best-case running time

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9d8abd3b-d978-4a02-9a48-a0537fc9798c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9d8abd3b-d978-4a02-9a48-a0537fc9798c/Untitled.png)

- Average-case running time

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6ac383e4-4ea5-4f12-acb7-e0e9454e68a4/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6ac383e4-4ea5-4f12-acb7-e0e9454e68a4/Untitled.png)

12. Greedy Algorithm
# Introduction

- The greedy method is a simple strategy of progressively building up a solution, one element at a time, by choosing the best possible element at each stage.

# Knapsack Problem

- p[i]/w[i] ratio

# Optimal Storage on Tapes

# Job Sequencing with Deadlines

- sort p_i, put last

# Optimal Merge Patterns

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ce9d81e-671d-45bb-b9ad-15413a88913b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ce9d81e-671d-45bb-b9ad-15413a88913b/Untitled.png)

# Huffman Codes

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4d71a77e-cc28-4ad4-9206-d87e14b813a0/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4d71a77e-cc28-4ad4-9206-d87e14b813a0/Untitled.png)

13.Graph Algorithm

# Basic definitions

- Graph G= (V,E) where V is a set of vertices and E is a set of edges
- Directed graph G = <V,E> where E consists of ordered pairs
- Weighted graph G with a weight function w_g(e) where e in E
- Degree of a vertex v : deg(v)
    - The number of incoming edges to v: indeg(v)
    - The number of outgoing edges from v : outdeg(v)

# Representation of Graphs

- G=(V, E) where V is a set of vertices {v_1, ... , v_n}

## Adjacency Matrix

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bb8cd6cc-1c54-4d2e-8786-5121420ff916/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bb8cd6cc-1c54-4d2e-8786-5121420ff916/Untitled.png)

## Adjacency List

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e6d4092-6a9e-46d7-a369-8fa655795c15/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0e6d4092-6a9e-46d7-a369-8fa655795c15/Untitled.png)

# Path, Cycles, and Subgraphs

- Path P : a sequence of vertices P = (v_1, ... v_k) where all i, (v_i, v_{i+1}) in E
    - Simple path : v_i ≠ v_j where v_i, v_j in P
- Cycle : a sequence of vertices P = (v_1, ... v_k, v_{k+1} = v_1) where all i, (v_i, v_{i+1}) in E
    - Simple Cycle : v_i ≠ v_j where v_i, v_j in P except the pair v_1, v_{k+1}
- Subgraphs : a graph G` = (V`, E`) is G \subset G iff V` \subset V and E` \subset E
    - Connected graph : for every pair of vertices (u,v) there exists P = (u,...,v)

# Trees and Spanning Trees

- Tree : a connected asyclic graph
    - Spanning tree : a tree that contains all vertices in V and is a subgraph of G
- Let T be a spanning tree of a graph G. Then
    - Any two vertices in T are connected by a unique simple path.
    - If any edge is removed from T, then T becomes diconnected.
    - If we add any edge into T, then the new graph will contain a cycle.
    - Number of edges in T is n-1

# Minimum Spanning Trees (MST)

- Weight of a spanning tree w(T0) : the sum of weights of all edges in T
- Minimum Spanning Tree : a spanning tree with the smallest possible weight
- Examples of MST : Network Design, Airline routes

# MST related algorithms

- Kruskal's algorithm : For a graph with n vertices, keep on adding the least cost edge until n-1 edges added
- Prim's algorithm : By focusing on vertices instead of edges, yielding a simple algorithm(implementation)
- Dijkstra's algorithm : The single Source Shortest-Path problem

## Dijkstra's Algorithm

- Pseudocode

    function Dijkstra(graph, Source):
    	create vertex set Q
    	for each vertex v in Graph:  // Initialization
    		dist[v] <- INFINITY  // Unknown distance from source to v
    		prev[v] <- UNDIFINED // Previous node in optimal path from source
    		add v to Q
      dist[source] <- Q
      while Q is not empty:
        u <- vertex in Q with min dist[u]
        remove u from Q
        for each neighbor v of u:
          alt <- dist[u] + length(u, v)
          if alt < dist[v]:
            dist[v] <- alt
            prev[v] <- u
      return dist[], prev[]

- Pseudocode (If we are only interested in a shortest path between vertices source and target)

    S <- empty sequence
    u <- target
    if prev[u] is defined or u = source:
      while u is defined:
        insert u at the beginning of S
        u <- prev[u]

- Algorithm using priority queue

    function Dijkstra(Graph, source):
      dist[source] <- 0
      create vertex set Q
      for each vertex V in Graph:
        if V != source
          dist[v] <- INFINITY
        prev[v] <- UNDEFINED
        Q.add_with_priority(v, dist[v])
      while Q is not empty:
        u <- Q.extract_min()
        for each neighbor v of u:
          alt <- dist[u] + length(u, v)
          if alt < dist[v]
            dist[v] <- alt
            prev[v] <- u
            Q.descreate_priority(v, alt)
      return dist, prev

## Algorithm : Complexity

- O(|V|^2)
- O(|E| + |V|^2) = O(|V|^2)
- If sparse graphs, Theta((|E| + |V|) * log|V|)

# Kruskal's Algorithm

- Kruskal's algorithm is a minimum-spanning-tree algorithm which finds an edge of the least possible weight that connects any two trees in the forest.

    KRUSKAL(G):
    A = 0
    foreach v in G.V:
      MAKE-SET(v)
    foreach (u, v) in G.E ordered byu weight(u, v) increasing:
      if FIND-SET(u) != FIND-SET(v):
        A = A \union { (u, v) }
        UNION(u, v)
    return A

## Complexity

- O(E log V)

# Prim's Algorithm

1. Initialize a tree with a single vertex, chosen arbitarily from the graph.
2. Grow the tree by one edge: of the edges that connect the tree to vertices not yet in the tree, find the minimum-weight edge, and transfer it to the tree
3. repeat step 2 until all vertices are in the tree

## Complexity

- Adjacency Matrix : O(|V|^2)
- Binary heap and adjacency List : O(|E| log |V|)

14. Dynamic algorithm
- Dynamic Programming (Bellman equation)

# Introduction

- Steps in a dynamic programming solution
    - Verify that the principle of optimality holds
    - Set up the dynamic-programming recurrence equations
    - Solve the dynamic-programming recurrence equations for the value of the optimal solution
    - Perform a trace back step in which the solution itself is constructed
- Core of dynamic programming
    - Do not re-compute previously computed ones!
    - This method is also called "Memoization"
- Difficulties
    - It may be impossible to decompose original problem into smaller ones
    - Impractical number of sub-problems

# All pairs shortest paths

## Floyd's algorithm (Time complexity : O(n^3))

    function floyd(cost, a, n){
      for i := 1 to n do {
        for j := 1 to n do {
          a[i,j] := cost[i,j];
        }
      }
      for k := 1 to n do {
        for i := 1 to n do {
          for j := 1 to n do {
            a[i,j] := min(a[i,j], a[i,k] + a[k,j]);
          }
        }
      }
    }

## Multi-Stage Graphs (Time complexity : Theta(|V| + |E|))

    function fgraph(G, k, n, p){
      cost[n] : = 0;
      for j := n-1 to 1 step -1 do {
        let r be a vertex such that (j,r) is an edge of G and c[j,r] + cost[r] is minimum;
        cost[j] := c[j,r] + cost[r];
        d[j] := r;
      }
      p[1] := 1;
      p[k] := n;
      for j:= 2 to k-1 do {
        p[j] := d[p[j-1]];
      }
    }

# The Knapsack Problem

- w_k = the weight of each type-k item, for k = 1,2,...,N
- r_k = the value associated with each type-k item, for k = 1,2,...,N
- c = the weight capacity of the knapsack.


15. Basic Traversal Methods
# Definitions

## Search

- finding a path or traversal
- between a start node and one of a set of goal nodes
- a study of states and their transitions

## Traversal

- the search that involved the examination of every vertex in the tree.

# Techniques for Traversal of a Binary Tree

- Three ways to traverse a binary tree : In-order, Pre-order, Post-order
- Common Point : The left subtree is traversed before The right subtree
- Difference Point : THe time at which a node is visited.

## Inorder Traversal

    Algorithm inorder(Node t)
    {
      if t!=0, then
      {
        inorder(t->left_child);
        visit(t);
        inorder(t->right_child);
      }
    }

## Preorder Traversal

    Algorithm preorder(Node t)
    {
      if t!=0, then
    	{
        visit(t);
        preorder(t->left_child);
        preorder(t->right_child);
      }
    }

## Postoder Traversal

    Algorithm postorder(Node t)
    {
      if t!=0, then
    	{
        postorder(t->left_child);
        postorder(t->right_child);
    	  visit(t);
      }
    }

# Non-Recursive Binary Tree Traversal Algorithms

## Non-Recursive Inorder Traversal

    Algorithm inorder(){
    			stack[1] = 0;
    			vertex = root;
    top:	while(vertex!=0){
    				push the vertex into the stack, vertex = leftchild(vertex)
    			}
    			pop the elemenet from the stack and make it as vertex
    			while(vertex!=0){
    				print the vertex node
    				if(rightchild(vertex)!=0){
    					vertex = rightchild(vertex)
    					goto top
    				}
    			pop the element from the stack and made it as vertex
    			}
    }

## Non-Recursive Preorder Traversal

    Algorithm Preorder(){
    			stack[1] = 0;
    			vertex = root;
    			while(vertex!=0){
    				print the vertex node
    				if(rightchild(vertex)!=0){
    					push the right child of vertex into the stack
    				if(leftchild(vertex) !=0){
    					vertex := leftson(vertex)
    			  else
    					pop the element from the stack and made it as vertex
    			}
    }

## Non-Recursive Postorder Traversal

    Algorithm postorder(){
    			stack[1] = 0;
    			vertex = root;
    top:	while(vertex!=0){
    				push vertex onto stack
    				if(rightchild(vertex)!=0)
    					push -vertex onto stack
    				vertex := leftson(vertex)
    			}
    			pop from stack and make it as vertex
    			while(vertex > 0){
    				print the vertex node, pop from stack and make it as vertex
    			}
    			if(vertex < 0){
    				vertex := -vertex
    				goto top
    			}
    }
