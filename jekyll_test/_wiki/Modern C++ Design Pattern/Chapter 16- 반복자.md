---
layout  : wiki
title   : Modern C++ Design Pattern/Chatper 16. 반복자
summary :
date    : 2020-04-21 23:12:43 +0900
lastmod : 2020-09-26 23:24:56 +0900
tags    : [cpp, iterator, design pattern]
draft   : false
parent  : Modern C++ Design Pattern
---

## 간략 설명
* 복잡한 데이터 구조를 다루어야 할 때 데이터 순회 문제를 해결하는 방법

## 표준 라이브러리의 반복자
* `begin`
* `end`
* `rbegin`
* `rend`
* `cbegin`
* `cend`
* `crbegin`
* `crend`

## 이진 트리의 탐색
```cpp
template <typename U> struct PreOrderIterator;
template <typename T> struct BinaryTree;

template <typename T> struct Node
{
  T value;
  Node<T> *left = nullptr;
  Node<T> *right = nullptr;
  Node<T> *parent = nullptr;
  BinaryTree<T>* tree = nullptr;

  explicit Node(const T& value)
    : value(value) {}

  Node(const T& value, Node<T>* const left, Node<T>* const right)
    : value(value), left(left), right(right)
  {
    this->left->tree =this->right->tree = tree;
    this->left->parent = this->right->parent = this;
  }

  void set_tree(BinaryTree<T>* t)
  {
    tree = t;
    if (left) left->set_tree(t);
    if (right) right->set_tree(t);
  }
};

template <typename T> struct BinaryTree
{
  Node<T>* root = nullptr;

  explicit BinaryTree(Node<T>* const root)
    : root{ root }
  {
    root->set_tree(this);
  }
  typedef PreOrderIterator<T> iterator;

  iterator begin()
  {
    Node<T>* n = root;

    if (n)
      while (n->left)
        n = n->left;
    return iterator{ n }
  }

  iterator end()
  {
    return iteraotr { nullptr };
  }
};

template <typename U>
struct PreOrderIterator
{
  Node<U>* current;
  explicit PreOrderIterator(Node<U>* current)
    : current(current)
  {
  }

  bool operator!=(const PreOrderIterator<U>& other)
  {
    return current != other.current;
  }

  Node<U>& operator*() { return *current; }

  PreOrderIterator<U>& operator++()
  {
    if (current->right)
    {
      current = current->right;
      while (current->left)
        current = current->left;
    }
    else
    {
      Node<U>* p = current->parent;
      while (p && current == p->right)
      {
        current = p;
        p = p->parent;
      }
      current = p;
    }
    return *this;
  }
}

```

## 코루틴을 이용한 순회
* 흐음... 잘 모르겠다. 아직 이런 불편함을 안겪어봐서인듯

