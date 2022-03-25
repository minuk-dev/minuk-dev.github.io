---
layout  : wiki
title   : 컴파일러 수업 정리
summary : 2022-1 컴파일러 수업 정리
date    : 2022-03-25 22:26:53 +0900
lastmod : 2022-03-25 22:27:33 +0900
tags    : [lecture]
draft   : false
parent  : lectures
---

# Introduction
- Programming Languages
	- Notations for describing computations to people and to machines
	- All the software running on all the computers was written in some programming languages
	- Before a program can be run, it first must be translated into a form in which it can be executed by a computer
- Compilers
	- The software systems that do this translation
	
## The Move to Higher-Level Languages
- The evolution of programming languages
	- Machine Languages : Machine instructions(= the patterns of 0's and 1's)
	- Assembly Langues : `ADD t1,t2`
	- Higher-Level Lanagues : C, C++, Java, Python
	
## Using High-Level Languages is a Free Lunch?
- No
	- How can a program written in some high-level language be executed by computer?
		- Language translation (additional process) is required

## The Major Role of Language Processors
- Language Translation
	- Translates source code (e.g., C, C++, Java, Python, ...) into semantically-equivalent target code (e.g., Assembly / Machin languages)
- Error Detection
	- Detects and reports any errors in the soruce program duting the translation process
	
## Two Representative Strategies

| | Compilation | Interpretation |
|-|-|-|
| What to translate | An entire source program | One statement of a source program |
| When to translate | Once before the program runs | Every time when the statement is executed |
| Translation Result | A target program (equivalent to the source program) | Target code (equivalent to the statement) |
| Examples | C, C++ | Javascript |

- Compilation:
	- Pros: Runs faster, Optimized, No dependencies
	- Cons: Additional Step, Incompatibility issue, Hard to Debug
- Interpretation:
	- Pros: Execution Control, Cross Platform, Easier to Debug
	- Cons: Slower, Not Optimized, Dependencies file rquired

- Hybrid Compilers:
	- Combine compilation and interpretation (e.g., Java, Python)
	
	
## Common Language-Processing Systems
- source program -> Preprocessor - (modified source program) -> Compiler - (target assembly program) -> Assembler - (relocatable machine code) -> Linker/Loader -> target machine code

## Requirements for Designing Good Compilers
- Correctness (Mandatory)
- Performance Improvment (Optional)
- Reasonable Compilation Time (Optional)

## Structure of Modern Compilers
- Modern compilers preserve the outlines of the FORTRAN I compiler
	- The first compiler, in the last 1950s
	- source program -> Lexical Analyzer -> Syntax Analyzer -> Semantice Analyer -> Intermeidate Code Generator -> Code Optimizer -> Code Generator
	
	
### Lexical Analyzer (Scanner)
- Devides the stream of characters into meaningful sequences and produces a set of tokens
- Input : Character stream
- Output : Token

### Syntax Analyzer (Parser)
- Creates a tree-like intermediate representation (e.g., syntax tree) that depicts the grammatical structure of the token stream
- Input : Token
- Output : Syntax Tree

### Semantic Analyzer
- Checks the source program for semantic consistency with the language definition (e.g., type checking/conversion)
- Input : Syntax tree
- Output : Syntax tree

### Intermediate Code Generator
- Constructs intermediate representations
	- They should be easy to produce and easy to translate into a targe tmachine code
- Input: Syntax tree
- Output : Intermediate representation

### Code Optimization (Optional)
- Attempts to improve the intermediate code so that better target code will result (e.g., better code = faster or shorter code)
- Input : Intermediate representation
- Output : Intermediate representation

### Code Generator
- Maps an intermediate representation of the source into the target language
- Input : Intermeidate representation
- Output : Target-machine code


# Lexical Analysis
## Part1. Specification of Tokens
### Overview
- What does a lexical analzyer do?
	- Reading the input characters of a source program
	- Grouping the characters into meaningful sequences, called lexemes
	- Producing a sequence of tokens
	- Storing the token information into a symbol table
	- Sending the tokens to a syntax analzyer

### Definition: Tokens
- A token is a syntactic category
	- Examples:
		- In English: noun, verb, adjective, ...
		- In a programming language: identifer, number, operator, ...
	- Tokens are structured as a pair consisting of a token name and an optional token value
		- Example: an identifier A
			- Its token name is "identifier" and its token value is "A"
			
### Definition: Lexemes
- A lexeme is a sequence of characters that mathces the patterns ofr a token
	- Pattern: a set of rules that defines a token
	- Examples
	
		| Token (token name) | Lexeme |
		|-|-|
		| IDENTIFIER( or simple ID) | pi, score, i, j, k |
		| Number | 0, 3.14, ... |
		| IF | if |
		| COMMA | , |
		| LPAREN | ( |
		| LITERAL | "Hello World" |
		| COMPARISION | <, >, <=, ==, ... |
		
### Class of Tokens
- Keyword:
	- e.g., IF for if, ELSE for ele, FLOAT for float, CHAR for char
- Operators:
	- e.g., ADD for +, COMPARISON for <, >, == , and ..
- Identifiers:
	- e.g., ID for all kinds of identifiers
- Constants:
	- e.g., NUMBER for any numeric constant, INTEGER, REAL, LITERAL
- Punctuation Symbols:
	- e.g., LPAREN for (, COMMA for ,
- Whitespace
	- e.g., a non-empty sequence of blanks, newlines, and tabs
		- Lexical analzyers usually discard uninteresting tokens that don't contribute to parsing (e.g., whitespace, comment)
		
### Lexical Anlysis does
1. Partitioning input strings into sub-strings (lexemes)
2. Identifying the token of each lexeme

### For the specifcation of tokens
- Why do we use "reuglar languages"?
	- Simple, but powerful enough to describe the pattern of tokens
- The coverage of formal languages
	- Reuglar Lnague < Context-Free Language < Context-Sensitive Language < Recursively Enumerable Language
	
### Definition: Alphabet, String, and Language
- An alphabet $\Sigma$ is nay finite set of symbols
	- Letter = $\Sigma^L$ = {a, b, c, ..., z, A, B, C, ... , Z}
	- Digit = $\Sigma^D$ = {0, 1, ..., 9}
	
- A string s over alaphabet $\Sigma$ is a finite sequence of symbols drawn from the alphabet:
	- If $\Sigma = \{ 0 \}$, s = 0, 00, 000, or, ...
	- If $\Sigma = \{ a, b \}$, s = a, b, aa, ab, ...
-  A language L is any set of strings over some fixed alphabet $\Sigma$
	-  If $\Sigma = \{ a, b\}$, $L_1 = \{a, ab, ba, aba \}$ and $L_2 = \{ a, b, aa, ab, ba, bb, aa, ... \}$
		-  $L_1$ is a finite language (the number of strings in the language is finite)
		-  $L_2$ is an infinite language (the number of strings in the language is infinite)
		
### Operations on Strings
- $s$: A string (A finite sequence of symbols over alphabet $\Sigma$)
- $\vert s \vert$ : The length of s (the number of occurences of symbols in $s$)
- $s_1 s_2$ : Concatenation of $s_1$ and $s_2$
- $\epsilon$ : An empty string
- $s^i$ : Exponentiation of $s$ (concatenation of $s$ i-times)

### Operations on Languages
- $L$ : A language (A set of strings over alphabet $\Sigma$)
- $L_1 \cup L_2$: Union of $L_1$ and $L_2$ {s $\vert$ s in $L_1$ or s is in $L_2$}
- $L_1L_2$ : Concatenation of $L_1$ and $L_2$ {$s_1s_2$ $\vert$ $s_1$ is in $L_1$ and $s_2$ is in $L_2$}
- $L^i$ : Concatenation of $L$ i-times
- $L^*$ : Kleene closure of $L$ (Concatenation of $L$ zero or more times)
- $L^+$ : Positive closure of $L$ (Concatenation of $L$ one or more times)

### Regurlar Expressions
- A notation of describing regular languages
	- Each regular expression $r$ describes a regular language $L(r)$
- Basic regular expressions

| Regular expression | Expressed regular language |
|-|-|
| $\epsilon$ | $L(\epsilon) = \{ \epsilon \}$ |
| $a$ | $L(a) = \{ a \}$, where $a$ is a symbol in alphabet $\Sigma$ |
| $r_1 \vert r_2$ | $L(r_1) \cup L(r_2)$, where $r_1$ and $r_2$ are regular expressions |
| $r_1 r_2$ | $L(r_1r_2) = L(r_1) L(r_2) = \{ s_1 s_2 \vert s_1 \in L(r_1) \text{ and } s_2 \in L(r_2)\}$ |
| $r^*$ | $L(r^*) = \Cup_{i \ge 0} L(r^i)$ |

- A An expression is a regular expression
	- If and only if it can be described by using the basic reuglar expressions only
	
### Rules for Regular Expressions
- Precedence : exponentiation (*, +) > concatenation > union ($\vert$)
	- $(r_1) \vert (r_2)^* (r_3)) = r_1 \vert r_2^* r_3$
- Equivalence:
	- $r_1 = r_2, \text{ if } L(r_1 = L(r_2))$
- Algebraic laws

	| Operations | Laws |
	|-|-|
	| $\vert$(union) | - Communitative :$r_1 \vert r_2 = r_2 \vert r_1$, - Associative : $r_1 \vert (r_2 \vert r_3) = (r_1 \vert r_2) \vert r_3$ \
	| concatenation |  - Associative : $r_1 (r_2r_3) = (r_1 r_2)r_3$, - Concatenation distributes over $\vert$ : $r_1(r_2 \vert r_3) = r_1 r_2 \vert r_1 r_3$ |
	| $\epsilon$ | - The identity ofr concatenation : $r-1 \epsilon = \epsilon r_1 = r_1$ |
	| $a^*$ | - Idempotent: $a^{**} = a^{*}$ |


#### Examples of Specifying Tokens
- $Keyword = if \vert else \vert for \vert \cdots$
- $Comparision = < \vert > \vert <= \vert >= \vert \cdots$
- $Whitespace = \text{ } \vert \text{\\t} \vert \text{\\n} \vert \cdots$
- $Digit = [0-9] = 0 \vert 1 \vert \cdots \vert 9$
- $Integer = Digit^*$
- $Identifier = \{letter\_ \} (\{letter\_ \} \vert \{digit\})^*$
- $optionalFraction = .Integer \vert \epsilon$
- $optionalExpoent = (E (+ \vert - \vert \epsilon) Integer) \vert \epsilon$
- $Float = \text{Integer optionalFraction optionalExponent}$


### To Recognize Tokens
1. Merge the regular expression of tokens
  $Merged = Keyword \vert Identifier \vert Comparison \vert Float \vert Whitespace \vert \cdots$
2. When an input stream $a_1 a_2 a_3 \cdots a_n$ is given,
	```
	mIdx = 0;
	for i <= i <= n
	  if a_1 a_2 ... a_n \in L(Merged), mIdx = i;
	end
	partition and classify a_1 a_2 ... a_{mIdx}
	```
3. Do the step 2 for the remaning input stream


### Summary
- What does a lexical analyzer do?
	- token
	- getNextToken
- How to specify the pattern for tokens? Regular Languages
- How to recognize the tokens from input streams? Finite Automata

## Part 2. Recognition of Tokens
### Finite Automata
- The implementation ofr recognizing tokens
	- It accepts or rejects inputs based on the patterns specified in the form of regular expressions
- A finite automata $M = \{Q, \Sigma, \delta, q_0, F\}$
	- A finite set of sets $Q= \{q_0, q_1, ..., q_i\}$
	- An input alphabet $\Sigma$: a finite set of input symbols
	- A start state $q_0$
	- A set of accepting (or final) states $F$ which is a subset of $Q$
	- A set of state transition functions $\delta$
- A finite automata can be expressed in the form of graphs, a transition graph
- A finite automata can be also expressed in the form of table, a transition table

### Deterministic vs. Non-deterministic
- Deterministic Finite Automata (DFA):
	- (Exactly or at most) one transition for each state and for each input symbol
	- No $\epsilon$-moves
- Non-deterministic Finite Automata (NFA):
	- Multiple transitions for each state and for each input symbol are allowed
	- $\epsilon$-moves are allowed
- DFAs and NFAs can recognize the same set of regular languages
- DFA:
	- One deterministic path for a single input
	- Accepted if and only if the path is from the start state one of the final states
- NFA:
	- Multiple possible paths for a single input
	- Accepted if and only if any path among hte possible paths is from the start state to one of the final states
	
| | DFA | NFA |
|-|-|-|
| transitions | All transitions are deterministic | Some transitions could be non-deterministic |
| $\epsilon$-move | x | o |
| # paths for a given input | Only one | One or more |
| Accepting condition | For a given input, its path must end in one of accepting states | For a given input, there must be at least one path ending in one of accepting states |
| Pros | Fast to execute | Simple to represent (easy to make/understand) |
| Cons | Complex ->space problem (exponentially larger than NFA) | Slow -> performance problem (several paths) |


### Procedures for Implementing Lexical Analyzers
- Lexical Specifications -> Regular Expressions -> NFA -> DFA(in the form of a transition table)

### Regular Expressions to NFAs
- McNaughton-Yamada-Thompson algorithm
	- This works recursively by splitting an expression into its constituent subexpressions
	
### NFAs to DFAs
- Subset (powerset) construction algorithm:
	- Basic idea: Grouping a set of NFA states reachable after seeing some input strings
- Definitions:
	- $\epsilon$-closure($q^N$) : A set of NFA states reachable from NFA state $q^N$ with only $\epsilon$-moves ($q^N$ is also included)
	- $\epsilon$-closure(T) : A set of NFA states reachable from some NFA state in a set $T = \{ q_i, ... \}$ with only $\epsilon$ - moves
	
	
### Summary
- What does a lexical analyzer do?
	- Reading the input characters of a source program
	- Grouping the characters into meaningful sequences, called lexemes
	- Producing a sequence of tokens
	- Storing the token information into a symbol table
	- Sending the tokens to a syntax analzyer
	
	
# Syntax Analysis (Parser)
## Part 1. Context-Free Grammars (CFG)
### Syntax Analyzer
1. Decides whether a given set of tokens is valid or not
	- Parse tree:
		- It shows how the start symbol of a grammar derives a string in the language
		- Given a context-free grammar, a parse tree is a tree is a tree with the following properties:
			- The root is labeled by the start symbol
			- Each leaf is labeled by a terminal or by $\epsilon$
			- Each interior node is labeled by a non-terminal
			- If $A$ is the non-terminal labeling some interior node and $X_1,  ..., X_n$ are the labels of the children of that node from left to right, then there must be a production $A \rightarrow X_1 X_2 \cdots X_n$
2. Creates a tree-like intermediate representation (e.g., parse tree) that depicts the grammatical structure of the token stream

### Why don't we use regular expressions?
- It is not sufficient to depict the syntax of programming languages

### Context-Free Grammars (CFG)
- A notation for describing context free languages
- A CFG consists of:
	- Terminals: the basic symbols (usually, token name = terminal)
		- Terminals can not be replaced
	- Non-terminals: syntactic variables:
		- Non-terminals can be replaced by other non-terminals or terminals
	- A start symbol: one non-terminal (usually, the non-terminals of the first rule)
	- Productions(->) : a rule for replacement