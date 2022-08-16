---
layout  : wiki
title   : teamnote-go
summary : go teamnote
date    : 2022-07-08 20:57:32 +0900
lastmod : 2022-08-15 20:02:01 +0900
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
/*
maxHeap
	q := newPQ[int](func(a, b *int) bool {
		return *a < *b
	})
*/

type PQ[T any] struct {
	v    []T
	comp func(a, b *T) bool
}

func newPQ[T any](comp func(a, b *T) bool) *PQ[T] {
	return &PQ[T]{
		v:    make([]T, 0),
		comp: comp,
	}
}

func (q PQ[T]) Len() int      { return len(q.v) }
func (q PQ[T]) Swap(i, j int) { q.v[i], q.v[j] = q.v[j], q.v[i] }
func (q *PQ[T]) Push(x any)   { q.v = append(q.v, x.(T)) }
func (q *PQ[T]) Pop() any {
	x := (q.v)[len(q.v)-1]
	q.v = (q.v)[:len(q.v)-1]
	return x
}
func (q *PQ[T]) Top() T {
	return q.v[0]
}
func (q *PQ[T]) Less(i, j int) bool {
	return q.comp(&q.v[i], &q.v[j])
}
```
