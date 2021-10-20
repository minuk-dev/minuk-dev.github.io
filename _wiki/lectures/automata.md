---
layout  : wiki
title   : 오토마타와 형식언어 정리
date    : 2021-10-19 21:46:37 +0900
lastmod : 2021-10-19 22:31:58 +0900
draft   : false
parent  : lectures
---

# Chapter 1. Introduction
## 1.2 Three basic concepts Languages
 * String : A sequence of symbolx
 * Alphabet : $\Sigma = \{ a, b \}$

## String Operations
 * Concatenation(연결):
   * $w = a_1 a_2 ... a_n$
   * $v = b_1 b_2 ... b_m$
   * $wv = a_1 a_2 ... a_n b_1 b_2 ... b_m$
   * 교환법칙 성립X
 * Reverse(역):
   * $w = a_1 a_2 ... a_n$
   * $w^R = a_n ... a_2 a_1$
 * Length(길이):
   * $w = a_1 a_2 ... a_n$
   * $\vert w \vert = n$
 * Length of concatenation:
   * $\vert u v \vert = \vert u \vert + \vert v \vert$
 * Empty Strings(공스트링):
   * A string with no symbools : $\lambda$
   * Observation : $\vert \lambda \vert = 0, \lambda w = w \lambda = w$
 * Substring:
   * Substring of string: a subsequnce of consecutive characters
 * Prefix and Suffix:
   * prefix와 suffix는 substring이다.
   * $\lambda$도 substring이기 때문에 prefix, suffix에 포함된다.
 * Power(제곱):
   * $w^n = w w ... w$
   * Definition: $w^0 = \lambda$
 * The * operation(스타 연산):
   * $\Sigma^*$ : the set of all possible strings from alphabet $\Sigma$
   * 무한집합이다.
 * The + operation(플러스 연산):
   * $\Sigma^+$ : the set of all possible strings from alphabet $\Sigma$ except $\lambda$
## Languages
 * Languages:
   * A language is any subset of $\Sigma^*$
 * Operations on Lanugages:
   * The usual set operations:
     * union, intersection, complement, relative complement
   * Reverse:
     * Definition $L = \{ w^R : w \in L \}$
   * Concatenation:
     * Definition: $L_1 L_2 = \{xy : x \in L_1, y \in L_2 \}$
     * 교환법칙이 성립하지 않는다.
   * Another Operation:
     * Definition $L^n = L L ... L$
     * Special case $L^0 = \{ \lambda \}$
   * Star-Closure:
     * Definition: $L^* = L^0 \cup L^1 \cup L^2 \cup \cdots$
   * Positive Closure:
     * Definition: $L^+ = L^1 \cup L^2 \cup \cdots$

## Grammars
 * Grammar: $S \rightarrow aSb, S \rightarrow \lambda$
 * Derivation of sentence string:
   * $S \Rightarrow aSb \Rightarrow ab$
 * Language of the Grammer:
   * example: $S \rightarrow aSb, S \rightarrow \lambda$:
     * $L = \{ a^n b^n : n \le 0 \}$
 * More Notation:
   * Grammar:$G=(V, T, S, P)$:
     * V : Set of variables
     * T : Set of terminal symbols
     * S : Start variable
     * P : Set of Productions
 * Sentential Form:
   * A setence that contains variables and terminals
   * $S \stackrel{*}{\Rightarrow} aaabbb$

## Automata
 * Different kinds of automata:
   * Automata are distinguished by the temporary memory
   * Finite Automata : no temporary memory
   * Pushdown Automata : stack
   * Turing Machines : random access memory
 * Power of Automata:
   * Finite Automata < Pushdown Automata < Turing Machine
   * More power means it can solve more compational problems

# Chatper 2. Finite Automata
## 2.1 Deterministic Finite Automata (DFA)
 * Transition Graph

## Determistic Finite Automata (DFA)
 * $M = (Q, \Sigma, \sigma, q_0, F)$:
   * $Q$ : set of states
   * $\Sigma$: input alphabet
   * $\sigma$: transition $\sigma : Q \times \Sigma \rightarrow Q$
   * $q_0$ : initial (or start) state
   * $F$ : set of final states $F \subseteq Q$

## Extended Transition Function $\sigma^*$
 * $\sigma^* : Q \times \Sigma^* \rightarrow Q$

## Languages Accepted by DFAs
 * Definition:
   * The language L(M) contains all inputs strings accepted by M

## Regular Languages
 * Definition:
   * A language L is regular if there is a DFA M such that L=L(M)

## Non-determistic automata(NFA)
 * An NFA accepts a string:
   * when there is a computation of the NFA that accepts the string
 * An NFA rejects a string:
   * when there is no computation of the NFA that accepts the string

### $\lambda$ - transition

### Formal Definition of NFAs
 * $M = (Q, \Sigma, \sigma, q_0, F)$:
   * $Q$ : Set of states
   * $\Sigma$ : Input alphabet
   * $\sigma$ : Transition function $\sigma : Q \times (\Sigma \cup \{ \lambda \}) \rightarrow 2^Q$
   * $q_0$ : Initial state
   * $F$ : Final state

### Extened Transition Function $\sigma^*$
 * Informally:
   * $q_j \in \sigma^*(q_i, w)$ : there is a walk from $q_i$ to $q_j$ with label w
 * Formally:
   * The language accepted by NFA M is:
     * $L(M) = \{w, ...\}$
     * where $\sigma^* (q_0, w) = \{q_i, ... \}$ and there is some $q_k \in F$

### Why Nondeterminism?
 * Best case in multiple choices:
   * Automatic backtracking
   * Hide unncessary detils
 * Good fit to (transform) other notations
 * Basically, close to human:
   * Easy to design.
### Equivalence of DFAs and NFAs
 * Equivalence of Machines:
   * Definition for automata:
     * Machine $M_1$ is equivalent to machine $M_2$ if $L(M_1) = L(M_2)$
