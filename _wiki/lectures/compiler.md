### ---
layout  : wiki
title   : 컴파일러 수업 정리
summary : 2022-1 컴파일러 수업 정리
date    : 2022-03-25 22:26:53 +0900
lastmod : 2022-06-15 15:53:46 +0900
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
- It is good at expressing the recursive structure of a program
- In our programming languages, recursive structures are very frequently observed.

### Derivations
- A derivation ($\Rightarrow$) is a sequence of replacements.
  - $\Rightarrow^*$ : Do derivations zero or more times
- A rule for derivations:
  - Leftmost($\Rightarrow_{lm}$) : replace the left-most non-terminal first
  - Rightmost($\Rightarrow_{rm}$) : replace the right-most non-terminal first

### Token Validation Test
- Definition : A sentinel form of a CFG G
  - $\alpha$ is a sentinel form of G, if $A \Rightarrow^* \alpha$, where A is the start symbol of G
    - If $A \Rightarrow_{lm}^* \alpha$ or $A \Rightarrow_{rm}^* \alpha$, $\alpha$ is a (left or right) sentinel form of G
- Definition: A sentence of a CFG G:
  - $\alpha$ is a sentence form of G,
  - If $\alpha$ is a sentinel form of a CFG G which consists of terminals only
- Definition: A language of a CFG G:
  - $L(G)$ is a language of a CFG G
  - $L(G) = \{ \alpha \vert \alpha \text{ is a sentence of G}\}$
- If an input string (e.g., a token set) is in $L(G)$, we can say that it is valid in G

1. Decides whether a given set of tokens is valid or not
  - Q. How to specify the rule for deciding valid token set?
  - A. Make a context free grammar G based on the rule of a programming language
  - Q. How to distinguish between valid and invalid token sets?
  - A. Check whether the given token set can be derived from the context free grammar G

2. Creates a tree-like intermediate representation (e.g., parse tree) that depicts the grammatical structure of the token stream

# Semantic Analyzer
- Check many kinds of semantic grammars:
  - Semantic grammars can be different depending on the programming language
- Common semantic grammars:
  - Scope checking:
    - All variables must be declared before their use (globally or locally)
    - All variables must be declared only once (locally)
    - All functions must be declared only once (globally)
  - Type checking:
    - All variables must be used with the right type of constant or variables
    - All functions must be used with the right number and type of arguments

## Part 1: Scope Checking
- The scope of an identifier is the portion of a program in which the identifier can be accessed:
  - Scope matches identifier declarations with uses
  - The same identifier may refer to different things in different scopes
- Two type of scope:
  - Static scope (used in most programming languages):
    - Scope depends on the physical structure of program text:
      - e.g., {}, ()
  - Dynamic scope (use in LISP, SNOBOL):
    - Scope depends on execution of the program:
      - e.g., the most currently declared identifier is used
- In most programming langues, the scope of identifiers are determined with:
  - Function declarations
  - Class declarations
  - Variable declarations
  - Formal parameters

### The Most-Closely Nested Scope Rule
- An identifier is matched with the identifier declared in the most-closely nested scope:
  - The identifier should be declared before it is used

### Implementation of Scope Checking
- While travelling AST:
  - Update the symbol table with the scope information
  - But such simple solution can occur problems:
    - Problem 1: Ambiguity
    - Problem 2: Inefficiency
  - Construct a symbol table for each scope, describing a nesting structure
  - Update the symbol table with information about what identifiers are in the scope
  - When an identifier is used, find the identifier in the current symbol table:
    - If not exist, moves to its parent table and find the identifier in the table
    - Repeat this process until the identifier is detected or their is no more parent table
- How to support function call/class name used before declarations?:
  - Solution: Multi-pass scope checking:
    - Pass 1: Gather information about all function/class names
    - Pass 2: Do scope checking

---
### Summary: Scope Checking
- The scope of an identifier is the portion of a program in which the identifier can be accessed:
  - Scope mathces identifier declarations with uses
  - The same identifier may refer to different things in different scopes
- For scope check, we use the most-closely nested scope rule:
  - Construct a symbol table for each scope, describing a nesting structure
  - Udpate the symbol table with information about what identifiers are in the scope
  - When an identifier is used, find the identifier in the current symbol table
- Semantic analysis usually requires multiple (probably more than two) passes:
  - To allow to use function calls/ class names before declaration

## Part 2: Type Checking
### Type, Type System, and Type Checking
- What is a type (data type)?:
  - An attribute of data which teslls compilers how programmers intend to use the data
- What is a type system?:
  - A set of rules that assign specific types to the various constructs of a computer program
- What is a type checking?:
  - Ensuring that the types of the operands match the type expected by the operator
- Why do we need type checking?:
  - We cannot distinguish expressions without type in the assembly languagee level
  - We should do the type checking with higher-level representations

### Two Kinds of Languages
- Statically-typed languages:
  - The type of a variable is determined/known at compile time
  - Type checking is performed during compile-time (before run-time)
  - Advantage: better run-time performance + easy-to-understand/easy-to-find type-related bugs(due to strict rules)
- Dynamically-typed languages:
  - The type of a variable is assocatied with run-time values
  - Type checking is performed on the fly, during execution
  - Advnatage: higher flexibility + rapid prototyping support

### How Types are Used/Checked in Practice?
- In statically-typed lanagues:
  - Programmers declare types for all identifiers statically:
    - Types are ssociated with specific keywords
- Compilers:
  - Infer the type of each expression from the types of its components
  - Confirm that the types of expressions matches what is expected

### Rules of Inference
- Inference rules usually have the form of "if-then' statements:
  - If hypothesis is true, then conclusion is true
- Type checking computes via reasoning
- Notations for rules of inferences:
  - x: T = x has type T
  - $\frac{Hypothesises}{Conclusions}$ = if-then statement, "if Hypothesises are true, Conclustions are true"
  - $\vdash$ = "we can infer"
  - Examples:
    - For an expression A && B:
      - If we can infer that A has type bool and B has type bool, then we can infer that A && B has type bool:
        - $$\frac{\text{We can infer that A has type bool and B has type bool}}{\text{We can infer that A && B has type bool}} \\ \frac{\vdash \text{A has type bool } \vdash \text{B has type bool}}{\vdash \text{A && has type bool}} \\ \frac{\vdash A:bool \vdash B:bool}{\vdash \text{A && B}: bool}$$

### Problem #1: Free Variables
- Free variables?:
  - A variable is free in an expression if its type if not defined/declared within the expression

#### Solution: Adding Scope Information
- Scoping information can give types for free variables
- $$S \vdash e:T$$
- We can infer that an exression e has type T in scope S:
  - Types are now proven relative to the scope the expression are in
- So far, we've defined inference rules for expressions
- Q. How to check whether statements are semantically well-formed or not?

#### Solution: Defining Well-Formedness Rules
- Extend our proof system (rules of inferences) to statements
- $$S \vdash WF(stmt)$$
- We can infer that a statement stmt is semantically well-formed in scope S

### How Types are Used/Checked in Practice?
- In statically-typed language, programmers declare types for all identifiers:
  - Types are associated with specific keywords
- Compilers:
  - Infer the type of each expression from the types of its components
  - Confirm that the types of expressions matches what is expected
  - Especially, by using the rules of inference + scope information + well-formedness rules
- How to use the inference rules for type checking?:
  - First, before doing type-checking
  - For each statement:
    - Do type checking for any subexpressions it contains
    - Do type checking for child statements
    - Check the overall well-formedness
---
### Summary: Type checking
- Ensuring that the types of the operands match the type expected by the operator
- In statically-typed lanauges:
  - Programmers declare tyeps for all identifiers statically:
    - Types are associated with specific keywords
- Compilers:
  - Infer the type of each expression from the types of its components
  - Confirm that the types of expressions matches what is expected
  - Especially, by using the rules of inference + scope information + well-formedness rules
- How to use the inference rules for type checking?:
  - Before doing type checking, do scope-checking, first
- For each statement:
  - Do type-checking for any sub-expressions it contains
  - Do type-checking for child statements
  - Check the overall well-formedness

# Compilers: Intermediate Code Generator
## Tree Address Code (TAC)
### Intermediate Code Generator
- Translates a high-level intermediate representation (e.g., parse trees or AST) into a low-level intermediate representation (e.g., three address code)
- Why do we use an intermediate representation?:
  - Easy-to-understand/optimize:
    - Doing optimizations on an intermediate representation is much easier and clearer than that on a machine-level code
    - A machine code has many constraints that inhabit optimizations
  - Easy-to-be-translated:
    - Compared to a high-level code, it looks much more like a machine-level code
    - Therefore, we can translate an intermediate representation to a machine-level code with low cost
- How to design a good intermediate representation?:
  - "Often a single compiler has multiple intermediate representations"
  - Different intermediate representations have different information/characteristics which can be used for optimizations
  - In GCC,:
    - Source Code -> AST -> Generic -> High GIMPLE -> SSA -> Low GIMPLE -> RTL -> Machine Code

### AST: Abstract Syntax Tree
- Abstract syntax trees look like parse trees, but without some parsing details
- We can eliminate the following nodes in parse trees:
  - Single-successor nodes
  - Symbols for describing syntactic details
  - Non-terminals with an operator and arguments as their child nodes
- AST can be constructed by using semantic actions

### TAC:Tree Address Code
- A high-level assembly where each operation has at most three operands:
  - A linearized representation of AST
- Components of TAC:
  - Operands (= addresses)
  - Operators (= instructions)

### Types of TAC:Variable Assignment
- Copy operation:
  - Explicit or temporary variable = any kind of operand
- Binary operation:
  - Explicit or temporary variable = any kind of operand binary operator any kind of operand:
    - Binary operators:
      - Arithmetic operatiors: +, -, *, /, ...
      - Boolean operators: &&, ||, ...
      - Comparision operators: ==, != ...
- Unary operation:
  - Explicit or temporary variable = unary operator any kind of operand:
    - Unary operators: -, !
- Unconditional jump with label
- Conditional branch
- Call procedures
- Array operations
- Return statements

### How to Represent TAC: Quadruples
- Quadruples have four fields (op, arg1, arg2, results) and they are stored in a linked list

### AST to TAC
- When constructing AST, we define TAC construction rules for each node:
  - TAC construction rules:
  - Operation Node
    - Create a new quadruple with op
    - arg1 = the computation resul of its left child
    - arg2 = the computation result of its right child
    - result = a new temporary variable t_i
    - Store the qudruple to the end of the linked list
    - Return its value
- While traveling AST, construct TAC based on the rules
- TAC construction rules for whlie:
  - Create and store a neq quadruple with op = label, arg1 = a new label L_i
  - Create a new quadruple with op = if not
  - arg1 = the computation result of tis left child (compute condition)
  - arg2 = another new lavel L_j
  - Store the quadruple
  - Compute the right child (compute the while statements'block)
  - Create and store a new quadruple with op = goto, arg1 = L_i
  - Create and store a new quadruple with op = label, arg1 = L_j

---
### Summary: Intermediate Code Generator
- Translates a high-level intermediate representation (e.g., parse tree or AST into a low-level intermediate representation (e.g., three address code))

# Code Optimization
## Local Optimization
### Intermediate Code Optimizer
- Improves the code generated by the intermeidate code generator:
  - For optimizing the run-time performance, memory usage, and power consumption of the program, the preserving the semantics of the original program
- Why do we need optimization?:
  - Intermediate code is generated without considering optimization
  - Programmers write a poor code frequently
- Optimizations can be also performed with machine-level code:
  - To improve performance based on the characteristics of specific machines
- Intermediate code optimizations try to improve performance more generally (independently of machines)

### Basic Blocks
- A basic block is a maximal sequence of consecutive three adderes instructions:
  - A program can only enter the basic block through the first instruction in the block
  - The program leves the block without halting or branching at the last instruction in the block

### Control Flow Graphs
- A control flow graph is a graph of the basic blocks:
  - Edges indicates which blocks can fllow which other blocks

### Types of Intermediate Code Optimizations
- An optimization is "local":
  - If it works on just a single basic block
- An optimization in "global":
  - If it works on an entire control-flow graph

### Local Optimizations
- Typical local optimization techniques:
  - Common sub-expressions elimination
  - Copy propagation
  - Dead code elimination
  - Arithmetic simplification
  - Constant folding

### Implementation of Local Optimizations
- Available expression analysis:
  - For common sub-expressions elimination & copy propagation:
    - An expression is called avilable if variabels in the expression hold an up-to-date value
  - Determine for each point in a program the set of available expressions:
    - Initially, no expressions are available
    - Whenever we check a statement a = opeartaion:
      - Any expression holding a is invalidated!
      - The new expression a = operation becomes avaiable

- Common sub-expressions elimination with available expressions:
  - Let's suppose that we currently check an expressio nb = operation1 and an expression a= operation1 is in the set of available expression:
    - The right-hand sides of two expressions are same
    - Then, replace the right-hand side of the current expression (b = operation1) by the left-hand side of the corresponding available expression( a= operation1)

- Copy propagation with available expressions:
  - let's suppose that we currently check an expression c= operation with b and an expression b = a or b = constant number is in the set of available expressions
  - Then, replace b in the right-hand side of the current expression (c = oepration with b) by a (the right-hand side of the corresponding avaiable expression) (b=a)

- Live variable analysis:
  - For dead code elimination:
    - A variable is called a live variable if ti holds a value that will be needed in the future
  - Two know whether a variable will be used in the future or not, checks the statements in a basic block in a reverse order:
    - Initially, some small set of variables are known to be live
    - Just before executing the statement a = ... b ...:
      - a is not alive because its value will be newly overritten
      - b is alive because it will be used

- Dead code elimination with live variables:
  - Let's suppose that we currently check an expression b = operation1 and b is not a live variable after this assignment
  - Then, eliminate the assignment statement

---
### Summary: Intermediate Code Optimizer
- Improve the code generated by the intermediate code generator:
  - For optimizing the run-time performance, memory usage, and power consumption of the program, but preserving the semantics of the original program
  - Types of optimizations:
    - Local optimizations
    - Global optimizations
  - Typical local optimization techniques:
    - Common sub-expressions elimination:
      - through avaiable expression analysis
    - Copy propagation:
      - through available expression analysis
    - Dead code elimination:
      - through live variable analysis
    - Arithmetic simplification
    - Constant folding

## Global Optimization
### Global Optimizations
- Work on a control-flow graph as a whole:
  - Many of the local optimization techniques can be applied globally:
    - Global dead code elimination
    - Global copy propagation / common sub-expression elimination

### Global Dead Code Elimination

### Global Copy Propataion / Common Subexpressions Eliminzation
- Key idea: computer available expressions globally

### Summary: Global Optimizations
- Work on a control-flow graph as a whole:
  - Many of local optimization techniques can be applied globally:
    - Global copy/constant propagation
    - Global dead code elimination
  - Some optimizations are possible in global analysis that aren't possible locally:
    - e.g. code motion: moving code from basic block into another to avoid unneccessary computations

# Compilers: Code Generation
## Part 1: Runtiem Environment
### Code Generator
- Translates an intermediate representation (e.g., three address code) into a machine-level code (e.g., assembly code)

### Runtime Environment
- A set of data structures used at runtime to support high-level structures
- This environment deals with a variety of issues:
  - What do objects look like in memory?:
    - The representation of the objects in memory space
  - What do functions look like in memory?:
    - The linkages between functions
    - The machanisms passing parameters
  - Where in memory should objects and functions be placed?:
    - The layout and allocation of memory space for the ojbects and functions

### Object Representations
- Data alignment:
  - Compilers determine how objects are arranged & accessed in computer memory:
    - Objects are N-bytes aligned in memory space:
      - N-byte alignment: the start memory address of objects is a multiple of N bytes
      - N can be different depending on the type of objects
- Representing arrays:
  - In different programming languages, arrays are differently represented in memory space
- For an array A[n],:
  - C-style arrays: each element A[i] is stored consecutively in memory space(aligned based on its base type)
  - Java-style arrays: each element A[i] is stored consecutiely in memory space + size information is prepended

- Representing multi-dimensional arrays:
  - Often represned as an array arrays

### Function Representations
- Two main questions related with function representations:
  - How to represent the relationship between functions?
  - How to keep the information needed to manage functions?

#### Activations
- An invocation of a funciton F is called an activation of F:
  - The lifetime of an activation of F is until all the statements in F is executed
  - F can invoke another function Q:
    - Then, the lifetime of an activation of F included the execution of all the statements in Q
  - The relationship between function activations can be depicted as a tree, called an activation tree

#### Activation Records
- The information needed to manage an activation of function F:
  - Input parameters:
    - This is supplied by the caller of F
  - Space for F's return value:
    - This is needed by the caller of F and filled when F is completed
  - Control link: a pointer to the previous activation record (the caller of F)
  - Machine status prior to calling F(e.g., return address, contents of registers)
  - F's local, temporary variables

---
- Two main questions related with function representations:
  - How to represent the relationship between functions?: Use a stack
  - How to keep the information needed to manage functions?: Store an activation record

### Memory Layout
- Compilers determine how code and data are stored in memory:
  - Assumption: a program uses contiguous memory space
  - Global variables:
    - All references to global variable to the same object
    - Global variables cannot be stored in an activation record
    - Instead, global variables are assigned a fixed address
    - Statically allocated
  - Activation records:
    - Managed in a stack
    - The stack grows from high addresses to low addresses
  - Dynamically-allocated data:
    - Dynamically-allocated data is managed in a heap
    - The heap grows from low addresses to high addresses
    - "To avoid the overlap between the stack and heap"

---
### Summary: Runtime Envornment
- A set of data structures used at runtime to support high-level structures
- This environment dealts with a variety of issues:
  - What do objects look like in memory?:
    - "Data structure alignment, array representations.."
  - What do functions look like in memory?:
    - "Keep activation records functions in a tack"
  - Where in memory should objects and functions be placed?:
    - Determine memory layout for code and data"

- Compiler dtermines, at compile-time, the memory layout of code and data, and generates code that correctly accesses the location of target data

## Part 2: Code Generation
### Assembly Languages
- Any low-level(machine-level) programming language:
  - Each assembly language is specific to a particular computer architecture

### MIPS assembly
- Chracteristics:
  - Only load and store instructions access memory
  - All other instructions use registers as operands
  - Registers:
    - Can be accessed quickly
    - Can have computations performed on them
    - But, exist in small quantity
- Basic instructions:
  - lw reg1 offset(reg2) : reg1 = reg2[offset]
  - sw reg1 offset(reg2) : reg2[offset] = reg1
  - add reg1 reg2 reg3: reg1 = reg2 + reg3:
    - sub, mul, div
  - seq reg1 reg2 reg3: reg1 = reg2 == reg3:
    - sne, sgt, sge, slt, sle
  - li reg1 immediate: reg1 = immediate
  - addi reg1 reg2 immediate: reg1 = reg2 + immediate
    - subi, muli, divi
  - seqi reg1 reg2 immediate: reg1 = reg2 == immediate
    - snei, sgti, sgei, slti, slei

### Better Register Allocation
- Goal: reduce the number of memory reads and writes with limited resources:
  - By using no more registers than those available
  - By holding as many variables as possible in registers

- Register Allocation with Live Variable Analysis:
  - Step 1: Do live variable analysis globally
  - Step 2: Construct RIG(Register Interference Graph):
    - Node: each variable
    - Edge: they are alive simultaneously at some point in the program

#### Graph Coloring = Register ALlocation
- Color = register
- If the RIG is K-colorable, then there is a register allocationthat uses no more than K registers

- The graph coloring problem is known as an NP-hard problem:
  - No efficient algorithms are known
  - The conmputation complexity of the most efficient on: O(2^n n), where n is the number of variables
  - Key idea:
    - Eliminate a node T which has neighbors fewer tha nK
    - If the remaining RIG is K-colorable, then the RIg with T is also K-colorable
  - Implementation:
    - Step 1: Pick a node T with fewer than K neighbors
    - Step 2: Eliminate T from the RIG and put it on a stack
    - Step 3: Repeat the stp 1-2 until there is no node in the RIG
    - Step 4: Pick the node in the top-of-stack
    - Step 5: Assign a color different from those already assigned to colored neighbors
    - Step 6: Repeat the step 4-5 until the RIG is completely restored
