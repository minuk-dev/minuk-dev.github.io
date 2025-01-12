---
layout  : wiki
title   : 오토마타와 형식언어 정리
date    : 2021-10-19 21:46:37 +0900
lastmod : 2021-12-26 17:51:01 +0900
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

     # Chapter 6. Simplifications of Context-Free Grammars
## 6.1 Methods for transforming grammars
### A Substitution Rule (치환 규칙)
$$
\begin{aligned} 
A \rightarrow aB \\
A \rightarrow aaA \\
A \rightarrow abBC \\
B \rightarrow aA \\
B \rightarrow b
\end{aligned}
$$

- Equivalent grammar (Substitution $B \rightarrow b$)
$$
\begin{aligned}
S \rightarrow aB \vert ab \\
A \rightarrow aaA \\
A \rightarrow abBC \vert abbc \\
B \rightarrow aA
\end{aligned}
$$

- Equivalent grammar (Substitution $B \rightarrow aA$)
$$
\begin{aligned}
S \rightarrow aB \vert ab \vert aaA \\
A \rightarrow aaA \\
A \rightarrow abBc \vert abbc \vert abaAc
\end{aligned}
$$
- Equivalent grammer (Erase unused variable)

$$
\begin{aligned}
S \rightarrow ab \vert aaA \\
A \rightarrow aaA \\
A \rightarrow abbc \vert abaAc
\end{aligned}
$$

- In general:
	- $$\begin{aligned} A \rightarrow xBz \\ B \rightarrow y_1 \vert y_2 \vert \cdots \vert y_n \end{aligned}$$
	- Substitute $B \rightarrow y_1 \vert y_2 \vert \cdots y_n$
	- $$A \rightarrow xy_1 z \vert x y_2 z \vert \cdots \vert x y_n z$$

### Parsing
- $\lambda$ - productions, unit productions 은 없는 것이 parsing에 좋음.

### 1) Removing $\lambda$ - productions
- 가정: $\lambda \not \in L(G)$
- Nullable Variables 정의:
	- Nullable Variables: 공스트링을 만들 수 있는 변수들
- Nullable variables을 포함하는 각 productions 에 대해서 substitution 적용



## 9.2 Combining Turing machines for complicated tasks
- Tranducer
$$ input \rightarrow \text{Turing machine} \rightarrow output$$
- Example:
	- $f(x, y) = \begin{cases} x + y & \text{ if } x \ge y \\ 0 & \text{ if } x < y\end{cases}$
	- Comparer, Adder, Eraser를 사용해서 구현

### Combining TMs
- 앞에서 만든 comparer, adder 이용
- eraser: 모든 1을 blank로 바꾸기
- Example:
	- Multipler:
		- repeat until x contains no more 1:
			- find a 1 in x and replace it with an a
			- replace the leftmost 0 by 0y
	    - replace all a's with 1's

## 9.3 Turing's Thesis, 튜링 명제(가설))
- Any computation that can be done by mechanical means can be done by a Turing Machine
- A computation is mechincal if and only if it can be performed by a Turing Machine

### Turing's Thesis 뒷받침 하는 것들
- Anything that can be done on any existing digital computer can also be done by a TM
- No one has yet been able to find a problem, solvable by an algorithm, for which a TM program cannot be written
- Many alternative models have been proposed for mechanical means, but none of them is more powerful than TMs

### Definition of Algorithm
- An algorithm for function $f(w)$ is a Turing Machine which computes $f(w)$
- It should complete computation; in other words, it should halt.
- When we say:
	- There exists an algorithm
- We mean:
	- There exists a Turing Machine that executes the algorithm


# Chapter 10 Other Models of Turing Machine
## The Standard model
- Infinite Tape
- Read-Write Head(Left or Right move)
- Control Unit (Deterministic)


## 10.1, 10.2: Variations of the Standard Model
- TMs with Stay:
	- The head can stay in the same position
- TMs with a Multiple Track Tape:
	- tracks
- Semi-Infinite Tape:
	- 양방향 무한이 아닌, 왼쪽 끝이 존재한다.
- The Off-Line Machine:
	- Input File with Read-only Head
	- Control Unit
	- Tape with Read-Write Head
- Multi-tape Turing Machines:
	- tape이 여러 개 있다.
- Two-Dimensional Turing Machines:
	- 2차원 tape
	- Moves : LRUD
- All variants are equally powerful as the standard TM:
	- 모든 변형들이 standard와 동등하다는 것을 증명할 수 있음
	- Turing's thesis에 의하면 당연하다.

## 10.3 Nondeterministic Turing Machines
- Standard TM의 Transition Function:
	- $\delta(q_1, a) = q_2, b, R)$
	- $\delta : Q \times \Gamma \rightarrow Q \times \Gamma \times \{ L, R \}$

- Nondeterministic Choice:
	- $\delta(q_1, a) = \{(q_2, b, L), (q_3, c, R) \}$
	- $\delta : Q \times \Gamma \rightarrow 2^{Q \times \Gamma \times \{L, R \}}$
- Input string $w$ is accepted if a computation leading to acceptance exists:
	- $q_0 w \overset{*}{\vdash} xq_fy$
	- $q_0 w$ : Initial configuration
	- $q_f$ : Final state
	- $x q_f y$: Final Configuration
- Nondeterministic Machines simulate Standard(deterministic) Machines:
	- Every deterministic machine is also a nondeterministic machine.

- Deterministic machines simulate Non-deterministic machines:
	- Deterministic machine: Keeps track of all possible computations


### Theorem 10.2
- The class of deterministic TMs and the class of nondeterministic TMs are equivalent


## 10.4 A Universal Turing Machine
### Universal Turing Machine
- Reprogrammable TM
- General-purposed TM
- Simulates any other Turing Machine
- Universal Turing Machine simulates any other Turing Machine $M$
- Universal TM의 구조:
	- Tape for the description of M
	- Tape for the tape contents of M
	- Tape for the state of M
- State, Tape Alphabet can be encoded as unary formats.
- Transition can be encoded using separator
- In other words, a turing machine is described with a binary string of 0's and 1's
- Therefore:
	- The set of Turing machines forms a lanaguage:
		- each string of the language is the binary encoding of a Turing Machine


## Set Theory(집합론), (Un)countable Sets, Enumeration Procedure
- Infinite sets are either:
	- Countable(모든 유한 집합, 정수집합) or Uncountable(실수 집합)
- Countable set:
	- Infinite Countable set:
		- There is a one to one correspondence between elements of the set and positive integers

- If for a set there is an enumeration procedure, then the set is countable.

### Theorem 10.3:
- The set of all Turing Machines is countable
- Proof:
	- Any Turing Machine can be encoded with a binary string of 0's and 1's
	- Find an enumeration procedure for the set of Turing Machine strings

### Enumeration Proceduer
- Repeat
	1. Generate the next binary string of 0's and 1's in proper order
	2. Check if the string describes a Turing Machine:
		- if YES: output it
		- if NO : ignore it

---
- Note
	1. Not every langage is countable.
	2. If there exists an enumeration procedure, the set is countable.
	3. Not every language is enumerable.


# Chap 11 A Hierarchy of Formal Languages and Automata
- Regular Langauges < Context-Free Langages < Languages accepted by Turing Machines

## Recursively Enumerable(r.e.) Languages
- A TM M defines a language, as usual.
	- $L(M) = \{ w : q_0 w \overset{*}{\vdash} x_1 q_f x_2 \}$
	- where $q_f$ is a final state.

- A language is recursively enumerable (r.e.) if there exists a Turing machine that accepts it.

- For a string w in L(M), M halts in a final state. (halts & says "yes")
- For a string w not in L(M), either M halts in a non-final state (halts & says "no") or runs forever (i.e. infinite loop) (no answer)

## Recursive Languages
- A language L on $\Sigma$ is said to be recursive if there exists a Turing machine that accepts L and that halts on every w in $\Sigma^+$
- In other words, a language is recursive if and only if there exists a membership algorithm for it.
- non-recursive $\Leftrightarrow$ 알고리즘으로 membership을 판단할 수 없다
- recursive : always finish

- Example : Recursive Languages
	- Every Context-Free language is a recursive language. because CFL is always applied CYK algorithm

## Languages that are Not Recursively Enumerable
- A Language that has no Turing machine accepting it.
- A class of languages that the Turing Machine cannot accept.

### Theorem 11.1
- Let S be an infinite countable set
- The powerset $2^S$ of S is uncountable
- Proof:
	- Since $S$ is countable, we can write (enumeration procedure)
	- $S = \{ s_1, s_2, s_3, ... \}$
	- We encode each element of the power set with a binary string of 0's and 1's (bitvector)
	- Let's assume (for contradiction) that the powerset is countable.
	- Then, we can enumerate the elements of the powerset by an enumeration procedure.
	- We define x is a diagonal component's complement.
	- x must be an element of the powerset. Hence, it should also be on the list.
	- However, x does not equal to all elements.
	- So, it cannot be on the list. $\Rightarrow$ Contradiction!
	- Since, we proved that "The powerset $2^S$ of $S$ is uncountable"
	
- Other example:
	- $\Sigma = \{a, b \}$
	- The set of all Strings:
		- $S = \{ a, b \}^* = \{ \lambda, a, b, aa, ab, ba, bb, aaa, aab, ... \}$ is infinite and countable.
		-  The powerset of $S$ contains all languages

- Conclusion:
	- There are some languages not accepted by Turing Machines
	- Theorem 11.2: There exist languages that are not r.e..
	- (These languages cannot be described in mechnical computation methods)
	- Lnaguages not accepted by Turing machines


- Theorem 11.3
	- $\Sigma = \{ a\}$
	- Consider the set of all TMs with $\Sigma$
	- This set is countable by Theorem 10.3
	- $M_1, M_2, ....$ : enumeration of TMs
	- $a, a^2, ...$ : all possible strings
	- Define a new language & its complement:
		- $L = \{ a^i : M_i \text{ accepts } a^i\}$
		- $\bar L = \{ a^i : M_i \text{ does not accepts } a^i\}$
	- We prove * Will show $\bar L$ is not r.e.*:
		- Assume $\bar L$ is r.e.
		- Then therer is a TM $M_k$ that accepts $\bar L$
		- Consider string $a^k$:
			- $(M_k, a^k) = 1 \text{ or } 0?$
			- $a^k \in L \Leftrightarrow M_k \text{ accepts } a^k \Leftrightarrow a^k \in \bar L \Leftrightarrow a^k \not \in L$
			- $a^k \in \bar L \Leftrightarrow M_k \text{ not accepts } a^k \Leftrightarrow a^k \not \in \bar L$
	   - Contradiction! So, $\bar L$ is not r.e.

-Theorem 11.5
  - $L = \{ a^i : M_i \text{ accepts } a^i \}$ is r.e., but not recursive
  
  
## 11.2, 11.3 Unrestricted Grammars & Context-sensitive grammars
### Unrestricted Grammar
- A grammar $G = (V, T, S, P)$ is unrestricted if all the productions are of the form $x \rightarrow y$ where $x \in (V \cup T)^+$ and $y \in (V \cup T)^*$
- unrestricted grammars = TMs = r.e. languages
- Theorem 11.6 and 11.7
	- Any language generated by an unrestricted grammar is recursively enumerable.
	- For every recursively enumerable language L, there exists an unrestricted grammar G such that L=L(G)
	
### Context-sensitive Grammar
- A grammar $G = (V, T, S, P)$ is context-sensitive it all productions are of the form $x \rightarrow y$ where $x,y \in (V \cup T)^+$ and $\vert x \vert \le \vert y \vert$
- context-sensitive language = context-sensitive grammar 가 존재한다.
- Every context-free language is context-sensitive.
- Example:
	- $L = \{ a^n b^n c^n : n \ge 1 \}$
	- It is not context-free, but context-sensitive.

### Context-sensitive language
 - Without proof.
 - Every context-sensitive language is recursive.
 - There exists a recursive language that is not context-sensitive.

## 11.4 The Chomsky Hierarchy
- fa < pda < lba < TM
- regular grammar < cfg < csg < unrestricted grammar
- type 3 < type 2 < type 1 < type 0
- Extented Hierarchy
	- $L_{REG} < L_{DCF} < L_{CF} < L_{CS} < L_{REC} < L_{RE}$


# Chap 12 Limits of Algorithmic Computation

## 12.1 Problems that cannot be solved by TMs
### The Halting Problem(HP)
- Turing이 증명
- 최초의 undecidable problem
- undecidable problem:
	- Problems that cannot be solved by TMs (mechanical means, algorithms)
- Proof:
	- Assume there is an algorithm that decides (solves) HP
	```
	halt(string P, i)
		if (program P halts on input i)
			return yes
		else
			return no
			
	trouble (string s)
		if (halt(s, s) = no)
			return yes
		else
			loop forever
	```
    - trouble(trouble) 은 halt 인가? not halt 인가?
		- trouble(trouble) 이 halt 라고 해보자
		- halt(trouble, trouble) 은 no를 반환한다는 것을 의미한다.
		- 이는 trouble(trouble) 이 not halt임을 의미한다.
		- 반대의 경우에도 마찬가지의 모순 발생
   - 따라서 HP is undecidable
 
 ### Undecidable problems for CFL
 1. Is a cfg unambiguous?
 2. Are two cfg's equivalent?
 3. Do two cfg's generate any common string?
 
 
