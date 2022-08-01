---
layout  : wiki
title   : teamnote-go
summary : go teamnote
date    : 2022-07-08 20:57:32 +0900
lastmod : 2022-08-01 17:04:11 +0900
tags    : [algorithm, teamnote]
draft   : false
parent  : algorithm
---

## FASTIO

```go
var stdio = bufio.NewReadWriter(
	bufio.NewReader(os.Stdin),
	bufio.NewWriter(os.Stdout),
)
func main() {
	defer stdio.Flush()
}
```

## Pair

```go
type Pair[T1, T2 any] struct {
	First  T1
	Second T2
}
// Usage
// p := Pair[int, int]{5, 3}
```

## Pair Priority Queue

```go
// Usage
// pq := &PQueue[int]{}
// heap.push(pq, Pair[int, int]{5, 3})

type Pair[T1, T2 any] struct {
	First  T1
	Second T2
}

type PQueue[T any] []Pair[int, T]

func (p PQueue[T]) Len() int           { return len(p) }
func (p PQueue[T]) Less(i, j int) bool { return p[i].First > p[j].First }
func (p PQueue[T]) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }
func (p *PQueue[T]) Push(x any)        { *p = append(*p, x.(Pair[int, T])) }
func (p *PQueue[T]) Pop() any {
	x := (*p)[len(*p)-1]
	*p = (*p)[:len(*p)-1]
	return x
}
```
