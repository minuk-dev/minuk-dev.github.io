---
layout  : wiki
title   : 2022-1 정보보호이론
summary : 2022-1 정보보호이론 정리노트
date    : 2022-04-18 08:59:34 +0900
lastmod : 2022-06-14 02:49:32 +0900
tags    : [lectures]
draft   : false
parent  : lectures
---

## Chapter 1 Introduction
### 1.1. Security goals
- Confidentiality : 기밀성, 비밀성:
  - most common aspect of information security
  - protect our confidential information
  - guard aginst those malicious actions that endanger the confidentiality of the information
- Integrity: 무결성:
  - information needs to be changed constantly
  - changes need to be done only by authorized entities and through authorized mechanisms
- Availability: 가용성:
  - information needs to be available to authorized entities

### 1.2 Attacks
- Attacks Threatening Confidentiality:
  - Snooping: unauthorized access to or interception of data. 도청, 엿보기
  - Traffic analysis: to obtain some other type of information by monitoring. 통신량 분석
- Attacks Threatening Integrity:
  - Modification: attacker intercepts the message and changes it. Insertion, deletion attack 변조
  - Masquerading or spoofing: attacker impersonates somebody else. 신원(명의)도용
  - Replaying: attacker obtains a copy of a message sent by a user and later tries to replay it. 다시 사용하기
  - Repudiation: 부인, 부정:
    - sender of a message denies that she has sent it.
    - receiver of a message denies that he has received it
- Attacks Threatening Availability:
  - Denial of service (DoS): slows down or totally interrupts the service of a system.

### 1.3. Services and Mechanisms
- ITU-T(International Telecommunication Union:Telecommunication Standardization Sector, 국제전기통신연합) provides some security services and seom mechanisms to implement those services. Security services and mechanisms are closely related because a mechanism or combination of mechanisms are used to provide a service.

#### 1.3.1. Security Services
- Data confidentiality: 메시지 전체 혹은 일부에 대한 기밀성을 유지하는 수단
- Data integirty: modification, insertion, deletion 예방하는 수단
- Authentication: peer entity 인증, data origin 인증하는 수단
- Nonrepudiation: proof of origin, proof of delivery 보장하는 수단
- Access control: unauthorized access 방지하는 수단

## Chapter 2. Mathematics of Cryptography
### 2.1 Integer Arithmetic
- In integer arithmetic, we use a set and a few operations. You are familiar with this set and the corresponding operations, but they are reviewed here to create a background for modular arithmetic.

#### 2.1.1. Set of Integers
- The set of integers, denoted by $Z$, contains all integral numbers (with no fraction) from negative infinity to positive infinity
- $$Z = \{..., -2, -1, 0, 1, 2, ...\}$$

#### 2.1.2. Binary Operations
- In cryptography, we are interesed in three binary operations applied to the set of integers. A binary operation takes two inputs and creates one output.

#### 2.1.3. Integer Division
- In integer arithmetic, if we divide $a$ by $n$ ($a/n$), we can get $q$ and $r$. The relationship between these four integers can be shown as
- $$a = q \times n + r$$
- $n$ : positive
- $r$ : nonnegative

#### 2.1.4. Divisbility
- If $a$ is not zero and we let $r=0$ in the division relation, we get
- $$a = q \times n$$
- If the remainder is zero, $n \mid a$ (n divides a)
- If the remainder is not zero, $n \not \mid a$ (n does not divide a)
- Properties:
  - Property 1 : if $a \mid 1$, then $a = \pm 1$
  - Property 2 : if $a \mid b$ and $b \mid a$, then $a = \pm b$
  - Property 3 : if $a \mid b$ and $b \mid c$, then $a \mid c$.
  - Property 4 : if $a \mid b$ and $a \mid c$, then $a \mid (m \times b + n \times c)$, where $m$ and $n$ are arbitrary integers
- Facts 양의 양수만을 고려하였을때:
  - The integer 1 has only one divisor, itself.
  - Any positive integer has at least two divisors, 1 and itself(but if can have more).
- GCD(Greatest Common Divisor):
  - The greatest common divisor of two positive integers is the largest integer that can divide both integers.
- Euclidean Algorithm:
  - Fact 1. $gcd(a, 0) = a$
  - Fact 2. $gcd(a, b) = gcd(b, a % b), \text{ for } a \ge b > 0$.

  ```
  r_1 <- a; r_2 <- b; (initialization)
  while (r_2 > 0)
  {
    q <- r_1 / r_2;
    r <- r_1 - q * r_2;
    r_1 <- r_2; r_2 <- r;
  }
  gcd(a, b) <- r_1
  ```

- Extended Euclidean Algorithm:
  - Given two integers $a$ and $b$, we often need to find other two integers, $s$ and $t$, such that
  - $$s \times a + t \times b = gcd(a, b)$$
  - The extended Eculidean algorithm can calculate the $gcd(a, b)$ and at the same time calculate the value of $s$ and $t$.

  ```
  r_1 <- a; r_2 <- b;
  s_1 <- 1; s_2 <- 0;
  t_1 <- 0; t_2 <- 1;
  while (r_2 > 0)
  {
    q <- r_1 / r_2;
    r <- r_1 - q * r_2;
    r_1 <- r_2; r_2 <- r;

    s <- s_1 - q * s_2;
    s_1 <- s_2; s_2 <- s;

    t <- t_1 - q * t_2;
    t_1 <- t_2; t_2 <- t;
  }
  gcd(a, b) <- r_1; s <- s_1; t <- t_1;
  ```

### 2.2. Modular Arithmetic
- The division relationship ($a=q \times n + r$) discussed in the previous section has two inputs ($a$ and $n$) and two outputs ($q$ and $r$). In modular arithmetic, we are intereseted in only one of the outputs, the remainder $r$.

#### 2.2.1. Modulo Operator
- The modulo operator is shown as mod. THe second input($n$) is called the modulus. The output $r$ is called the residue

#### 2.2.3. Congruence
- To show that two integers are congruent, we use the congruence operator ($\equiv$):
  - $2 \equiv 12 (\text{ mod } 10)$

#### 2.2.4. Operation in $Z_n$
- The three binary operations that we discussed for the set $Z$ can also be defined for the set $Z_n$. The result may need to be mapped to $Z_n$ using the mod operator.
- $$Z_n = \{ 0, 1, 2, ..., (n-1)\}$$
- Properties:
  - Property 1 : $(a + b) \text{ mod } n = [(a \text{ mod } n) + (b \text{ mod } n)] \text{ mod } n$
  - Property 2 : $(a - b) \text{ mod } n = [(a \text{ mod } n) - (b \text{ mod } n)] \text{ mod } n$
  - Property 3 : $(a \times b) \text{ mod } n = [(a \text{ mod } n) \times (b \text{ mod } n)] \text{ mod } n$

#### 2.2.5. Inverses
- Additive Inverse:
  - In $Z_n$, two numbers $a$ and $b$ are the additive inverse of each other if
    - $$(a + b) \text{ mod } n = 0$$
- Multiplicative Inverse:
  - In $Z_n$, two numbers $a$ and $b$ are the multiplicative inverse of each other if
    - $$(a * b) \text{ mod } n = 1$$
  - An integer $b$ in $Z_n$ has a multiplicative inverse:
    - if and only if $gcd(n, b) = 1$
    - n과 b가 서로소(n and b are relatively prime)

#### 2.2.6. Additive and Multiplication Tables
#### 2.2.7. Different Sets
- We need to use $Z_n$ when additive inverses are needed; we need to use $Z_n^*$

#### 2.2.8. Two More sets
- Cryptography often uses two more sets: $Z_p$ and $Z_p^*$. p is a prime number
- $$Z_p = Z_p^* \cup \{ 0 \}$$

## Chapter 3. Traidtional Symmetric-Key Ciphers
### 3.1. Introduction
#### 3.1.1. Kerckhoff's Principle
- Based on Kerckhoff's principle, one should always assume that the adversary, Eve, knows the encryption/decryption algorith. The reisistance of the cipher to attack must be based only one the secrecy of the key.
- Shanon : The enemy knows the system.

#### 3.1.2. Cryptanalysis
- As cryptography is the science and art of creating secret codes, Cryptanalysis is the science and art of breaking those codes.

### 3.2. Substitution ciphers (대치암호)
- A substitution cipher replaces one symbol with another. Subsitution ciphers can be categorized as either monoalphabetic ciphers or polyalphabetic ciphers.

#### 3.2.1. Monoalphabetic Ciphers
- In monoalphabetic substitution, the relationship between a symbol in the plaintext to a symbol in the ciphertext is always one-to-one.
- Additive Cipher(= Caesar cipher) 덧셈 암호:
  - The simplest monoalphabetic cipher is the additive cipher. This cipher is sometimes called a shift cipher and sometimes a Caesar cipher, but the term additive cipher better reveals it mathematical nature.
  - $$C = (P + k) \text{ mod } 26$$
  - $$P = (C - k) \text{ mod } 26$$
  - Historically, additive ciphers are called shift ciphers. Julius Caesar used an additive cipher to communicate with his officers. For this reason, additive ciphers are sometimes referred to as the Caesar cipher. Caesar used a key of 3 for his communications.
  - Statistical Attack
- Multiplicative Ciphers
  - $$C = (P \times k) \text{ mod } 26$$
  - $$P = (C \times k^{-1}) \text{ mod } 26$$
- Affine Ciphers (덧셈 곱셈 혼합)
  - $$T = (P \times k_1) \text{ mod } 26$$
  - $$C = (T + k_2) \text{ mod } 26$$
  - $$T = (C - k_2) \text{ mod } 26$$
  - $$P = (T \times k_1^{-1}) \text{ mod } 26$$
- Monoalphabetic Substitution Cipher:
  - Because additive, multiplicative, and affine ciphers have small key domains, they are very vulnerable to brute-force attack.
  - A better solution is to create a mapping between each plaintext character and the corresponding ciphertext character. Alice and Bob can agree on a table showing the mapping for each character.

#### 3.2.2. Polyalphabetic Ciphers
- In polyalphabetic substitution, each occurrence of a character may have ad ifferent substitute. The relationship between a character in the plaintext to a character in the ciphertext is one-to-many.
- Autokey Ciphers:
  - $$k = (k_1, P_1, P_2, ...)$$
  - $$C_i = (P_i + k_i) \text{ mod } 26$$
  - $$P_i = (C_i - k_i) \text{ mod } 26$$
- Playfair Cipher : 영국 1차 세계 대전 사용
  - 5 x 5 의 Secret Key 존재
  - J 는 잘 안쓰기 때문에 i와 같은 칸 차지
  - 두 글자씩 암호:
    - 같은 글자가 연속으로 나오면 미리 약속한 글자를 삽입
    - 같은 row : 각 글자의 오른쪽 글자 대치
    - 같은 column : 각 글자의 아래 글자 대치
    - 그 외 : 직사각형에서 같은 row의 반대편 글자로 대치

- Vigenere Cipher : 비지네르 프랑스 수학자:
  - secret key 가 문자열이고, 이를 돌아가면서 키로 사용

- Hill Cipher:
  - secret key 가 m x m 정사각 행렬
  - 글자수가 안맞으면 끝에 z(약속된 문자) 삽입
  - 복호화는 secret key 의 역행렬을 사용한다.

- One-Time Pad:
  - One of the goals of cryptography is perfect secrecy. A study by Shannon has shown that perfect secrecy can be achieved if each plaintext symbol is encrypted with a key randomly chosen from a key domain. This idea is used in a cipher called one-time pad, invented by Vernam.

### 3.3. Transposition Ciphers (치환 암호)
- A transposition cipher does not substitute one symbol for another, instead it changes the location of the symbols.

#### 3.3.1. Keyless Transposition Ciphers
- Split odd and even
- example. meet me at the park -> memateaketethpr

#### 3.3.2. Keyed Transposition Ciphers
- The key used for encryption and decryption is a permutation key, which shows how the character are permuted.
  - For example, key = (3 1 4 5 2)

#### 3.3.3. Combining Two Approaches
- keyless + keyed

### 3.4. Stream and block ciphers
- The literature divides the symmetric ciphers into two broad categories: stream ciphers and block ciphers.
- Although the definitions are normally applied to modern ciphers, this categorization also applies to traditional ciphers.

#### 3.4.1. Stream Ciphers
- Call the plaintext stream P, the ciphertext stream C, and the key stream K.
- $P=P_1P_2P_3...$, $C=C_1C_2C_3...$, $K=(k_1, k_2, k_3, ...)$

#### 3.4.2. Block Ciphers
- In a block cipher, a group of plaintext symbols of size $m (m> 1)$ are encrypted together creating a group of ciphertext of the same size. A single key is used to encrypt the whole block even if the key is made of multiple values.

- Playfair cipher, Hill cipher

## Chapter 6. Data Encryption Standard (DES)
### 6.1. Introduction
- The Data Encryption Standard (DES) is a symmetric-key block cipher published by the National Institute of Standards and Technology (NIST).

#### 6.1.1. History
- 1973, NIST 미국 표준 대칭 키 암호 공모
- IBM의 Lucifer 당선. DES라 부름
- DES 1975 미국 표준 발표.
- 현재 : 표준 탈락

#### 6.1.2. Overview
- DES is a block cipher.
- symmetric-key cipher(대칭키 암호)
- 동일 plaintext라고 key에 따라 다른 ciphertext가 생성

### 6.2. DES structure
- The encryption process is made of two permutations(P-boxes), which we call initial and final permutations, and sixteen Feistel rounds.

#### 6.2.1. Initial and Final Permutations
- 1~64 정수들의 permutation
- 규칙적
- IP와 FP는 서로 역 permutation

#### 6.2.2. Rounds
- $L_i = R_{i - 1}$
- $R_i = f(R_{i-1}, K_i}) \oplus L_{i-1}$

- DES Function:
  - The heart of DES is the DES function. The DES function applies a 48-bit key to the rightmost 32 bits to produce a 32-bit output.

- Expansion P-box:
  - Since $R_{i-1}$ is a 32-bit input and $K_i$ is a 48-bit key, we first need to expand $R_{i-1}$ to 48bits.
  - Although the relationship between the input and output can be defined mathematically, DES uses Table.

- XOR:
  - After the expansion permutation, DES uses the XOR operation on the expanded right section and the round key.
  - Note that both the right section and the key are 48-bits in length.
  - Also note that the round key is used only in this operation.

- S-Boxes (substitution-box, 48bits -> 32bits):
  - The S-boxes do the real mixing (confusion). DES uses 8 S-boxes, each with a 6-bit input and a 4-bit output.
  - 불규칙적

- Straight P-box(Permutation box):
  - 불규칙적

#### 6.2.3. Cipher and Reverse Cipher
- Using mixers and swappers, we can create the cipher and reverse cipher, each having 16 rounds.
- To achieve this goal, one approach is to make the last round (round 16) different from the others; it has only a mixer and no swapper.
- cipher와 reverse cipher는 같은 코드 사용

- Pseudocode for DES cipher
```
Cipher (plainBlock[64], RoundKeys[16, 48], cipherBlock[64])
{
  permute(64, 64, plainBlock, inBlock, InitialPermutationTable)
  split(64, 32, inBlock, leftBlock, rightBlock)
  for (round = 1 to 16)
  {
    mixer(leftBlock, rightBlock, RoundKeys[round])
    if (round != 16) swapper(leftBlock, rightBlock)
  }
  combine(32, 64, leftBlock, rightBlock, outBlock)
  permute(64, 64, outBlock, cipherBlock, FinalPermutationTable)
}

mixer(leftBlock[32], rightBlock[32], RoundKey[48])
{
  copy(32, rightBlock, T1)
  function(T1, RoundKey, T2)
  exclusiveOr(32, leftBlock, T2, T3)
  copy(32, T3, leftBlock)
}

swapper(leftBlock[32], rightBlock[32])
{
  copy(32, leftBlock, T)
  copy(32, rightBlock, leftBlock)
  copy(32, T, rightBlock)
}

function(inBlock[32], RoundKey[38], outBlock[32])
{
  permute(32, 48, inBlock, T1, ExpansionPermutationTable)
  exclusiveOr(48, T1, RoundKey, T2)
  substitute(T2, T3, SubstituteTables)
  permute(32, 32, T3, outBlock, StraightPermutationTable)
}
```

- Key Generation:
  - The round-key generator creates sixteen 48-bit keys out of a 56-bit cipher key.

### 6.3 DES Analysis
- Critics have used a strong manifier to analyze DES.
- Tests have been done to measure the strength of some desired properties in a block cipher.

#### 6.3.1. Properties
- Two desired properties of a block cipher are the (1)avalanche effect and the (2)completeness.
- To check the (1)avalanche effect in DES, let us encrypt two plaintext blocks (with the same key) that differ only in one bit and observe the differences in the number of bits in each round.
- Although the two plaintext blocks differ only in the rightmost bit, the ciphertext blocks differ in 29 bits. This means that chaning one bit of the plaintext creates a change of approximately 45 percent in hte ciphertext.
- Completeness effect means that each bit of the ciphertext needs to depend on many bits on the plaintext.

#### 6.3.2. Design Criteria
- Shannon, 1949
- Diffusion(확산) : ciphertext와 plaintext의 관계를 숨기는 것
- Confusion(혼돈) : ciphertext와 key의 관계를 숨기는 것
- Product cipher: Substitution과 Transposition(Permutation)을 결합하여 만든 cipher
- Feistel ciphers are a class of product cipher.

- S-Boxes 와 P-Boxes:
  - confusion과 diffusion을 잘 만들고 있다.
- Number of Rounds:
  - DES uses sixteen rounds of Feistel ciphers. After eight rounds, the ciphertext is throughly a random function of plaintext and key. DES with less than 16 rounds are more vulnerable to attacks.

#### 6.3.3. DES Weaknesses
- During the last few years critics have found some weaknesses in DES.
- Weaknesses in Key:
  - Key size (56bits) is too small: 2^56 keys
  - Weak keys exist.
- Key complement:
  - In the key domain (2^56), definitely half of the keys are complement of the other half. A key complement can be made by inverting (changing 0 to 1 or 1 to 0) each bit in the key. Does a key complement simplify the job of the cryptanalysis? It happens that it does. The attacker can use only half of the possible keys (2^55) to perform brute-force attack.
  - $$C=E(K, P) \rightarrow \bar C = E(\bar K, \bar P)$$

### 6.4 Multiple DES
- The major criticism of DES regards its key length. This means that we can use double or triple DES to increase the key size.

#### 6.4.1. Double DES
- The first approach is to use double DES(2DES)
- Use two different keys k1 and k2 (= 112 bits)
- Meet-in-the-Middle Attack:
  - However, using a known-plaintext attack called meet-in-the-middle attack proves that double DES improves this vulnerability slightly (to 2^57 tests), but not tremendously (to 2^112).
  - 즉 112 bit인데 57 bit 효과만 나타남

#### 6.4.2. Triple DES
- Triple DES with Three keys:
  - Triple DES with three keys is used by many applications such as PGP.
  - $$E_{k3}(D_{k2}(E_{k1}(P))) = C$$
  - $$D_{k1}(E_{k2}(D_{k3}(C))) = P$$

### 6.5. Security of DES
- DES, as the first important block cipher, has gone through much scrutiny. Among the attempted attacks, three are of interest: brute-force, differential cryptanalysis, and linear cryptanalysis.

## Chapter 4. Mathematics of Cryptography
### 4.1. Algebraic strucutres
- Cryptography requires sets of integers and specific operations that are defined for those sets. The combination of the set and the operations that are applied to the elements of the set is called an algebraic struture.

#### 4.1.1. Groups
- $<G, \cdot>$ is a group:
  - $G$ : a set elements
  - $\cdot$ : a binary operation
  - if it satisifes four properties (or axioms).
- A commutative (or abelian) group satisfies an extra property, commutativity.

- Closure(닫힘) : $a \cdot b \in G$ for any $a, b \in G$
- Associativity(결합) : $a \cdot (b \cdot c) = (a \cdot b) \cdot c$
- Commuativity(교환) : $a \cdot b = b \cdot a$ for any $a, b \in G$ (abelian group)
- Existence of identity(항등원) : there is $e \in G$ such that $a \cdot e = e \cdot a = a$ for all $a \in G$
- Existence of inverse(역) : there is $a' \in G$ such that $a \cdot a' = a' \cdot a = e$ for each $a \in G$

- Finite Group: the set has a finite number of elements.
- Order of group: $\vert G \vert$ = number of elements (집합의 크기)

#### 4.1.3. Field (체)
- A field, denoted by $<G, \cdot, \square>$, satisfies 11 properties:
  - G: set
  - $\cdot, \square$ : two binary operators
- $<G, \cdot>$ is an abelian group
- $<G, \square>$ is an abelian group
- Distribution(배분) : $a \square (b \cdot c) = (a \square b) \cdot (a \square c)$ for any $a,b,c \in G$

- Example :
  - $<R, +, *>$ is a field.
  - 정수들로 이루어진 field 필요. $GF(p), GF(2^n)$

- GF(p) field (Galois Field, p는 소수)
- $GF(p) = <Z_p, +, \times>$, p는 소수

### 4.2. $GF(2^n)$ Fields
- In cryptography, we often need to use four operations (addition, subtraction, ultiplicationh, and division). In other words, we need to use fields.

#### 4.2.1. Polynomials 다항식
- A polynomial of degree(차수) n-1 is
- $$f(x) = a_{n-1}x^{n-1} + a_{n-2} x^{n-2} + \cdots + a_1 x^1 + a_0 x^0$$
- where $x^i$ is called the i-th term and $a_i$ is called the coefficient of the i-th term.
- Addition and subtraction on polynomials are the same operation.

- Additive identity: 0
- Additive inverse: itself

- Polynomial multiplication:
  1. The coefficent multiplication is done is GF(2).
  2. The multiplying $x^i$ by $x^j$ results in $x^{i+j}$.
  3. The multiplication may create terms with degree more than $n-1$, which means the result needs to be reduced using a modulus polynomial (or irreducible polynomial).

- Multiplicative identity: 1
- Multiplicative inverse: use the extended Euclidean algorithm

#### 4.2.3. Summary
- The finite field GF(2^n) can be used to define four operations of addition, subtraction, multiplication and division over n-bit words.

## Chapter 7. Advanced Encryption Standard (AES)
### 7.1. Introduction
- The Advanced Encryption Standard (AES) is a symmetric-key block cipher published by the National Institute of Standards and Technology(NIST) in December 2001.

#### 7.1.1. History
- NIST: DES를 대체할 새 대칭 키 블록 암호 선정 절차
- 벨기에: Vincent Rijmen and Joan Daemen의 Rijndael 암호에 기반
- In February 2001, NIST announced that a draft of the Federal Information Processing Standard (FIPS) was available for public review and comment.
- Finally, AES was published as FIPS 197 in the Federal Register in December 2001.

#### 7.1.3. Rounds
- AES is a non-Feistel cipher that encrypts and decrypts a data block of 128 bits. It uses 10, 12, or 14 rounds. The key size, which can be 128, 192, or 256 bits, depends on the number of rounds.
- AES has defined three versions (AES-128, -192, -256), with 10, 12, and 14 rounds.
- Each version uses a different cipher key size (128, 192, or 256 bits), but the round keys are always 128 bits.

#### 7.1.4. Data Units
- 1 byte = 8bits
- 1 word = 4 bytes =32 bits
- 1 block = 4 words = 16 bytes = 128 bits

#### 7.1.5. Strucutre of Each Round
- AES-128 version: 10 rounds

```
Cipher(InBlock[16], OutBlock[16], w[0 ... 43])
{
  BlockToState(InBlock, S)

  S <- AddRoundKey(S, w[0...3])
  for (round = 1 to 10)
  {
    S <- SubBytes(S)
    S <- ShiftRows(S)
    if (round != 10) S <- MixColumns(S)
    S <- AddRoundKey(S, w[4 * round, 4 * round + 3])
  }
  StateToBlock(S, OutBlock);
}
```

### 7.2. Transformations
- To provide security, AES uses four types of transformations:
  - substitution(SubBytes), permutation(ShiftRows), mixing(MixColumns), and key-adding(AddRoundKey)

#### 7.2.1. Substitution
- AES, like DES, uses substitution. AES uses two invertible transformations.
- SubBytes:
  - The first transformation, SubBytes, is used at the encryption site. To subsitute a byte, we interpret the byte as two hexadecimal digits.
  - SubBytes table
  - Transformation Using GF(2^8) Field
  - AES also defines the transformation algebraically using the GF(2^8) field with the irreducible polynomial ($x^8 + x^4 + x^3 + x + 1$)
  - $d = X \cdot s^{-1} \oplus y$
- InvSubBytes:
  - $s=(X^{-1} \cdot (d \oplus y))^{-1}$

#### 7.2.2. Permutation
- Another transformation found in a round is shifting, which permutes the bytes.
- ShiftRows:
  - In the encryption, the transformation is called ShiftRows.
- InvShiftRows:
  - In the decryption, the transformation is called InvShiftRows and the shifting is to the right.

#### 7.2.3. Mixing
- We need an interbyte transformation that changes the bits inside a byte, based on the bits inside the neighboring bytes.
- MixColumns:
  - The MixColumns transformation operates at the column level; it transforms each coulmn of the stae to a new column.

- InvMixColumns:
  - The InvMixColumns transformation is basically the same as the MixColumns transformation.
  - The MixColumns and InvMixColumns transformations are inverses of each other.

#### 7.2.4. Key Adding
- AddRoundKey:
  - AddRoundKey proceeds one column at a time. AddRoundKey adds a round key word with each state column matrix; the operation in AddRoundKey is matrix addition.
  - The AddRoundKey transformation is the inverse of itself.

### 7.3. Key Expansion
- To create round keys for each round, AES uses a key-expansion process. If the number of rounds is $N_r$, the key-expansion routine creates $N_r + 1$ 128-bit round keys from one single 128-bit cipher key.

#### 7.3.1. Key Expansion in AES-128
- RotWord(w) : one-byte circular left shift, i.e., [b0, b1, b2, b3] is transformed into [b1, b2, b3, b0]
- SubWord(w) : SubBytes transformation applied to four bytes

```
KeyExpansion([key_0 to key_{15}], [w_0 to w_{43}])
{
  for (i = 0 to 3)
    w_i <- key_{4i} + key_{4i+1} + key_{4i+2} + key_{4i+3}

  for (i = 4 to 43)
  {
    if (i mod 4 != 0) w_i <- w_{i-1} \oplus w_{i-4}
    else
    {
      t <- SubWord(RotWord(w_{i-1})) \oplus RCon_{i/4}
      w_i <- t \oplus w_{i-4}
    }
  }
}
```

- Each round key in AES depends on the previous round. The dependency, however, is nonlinear because of SubWord transformation. The addition of the round constants also guarantees that each round key will be different from the previous one.

### 7.4. Ciphers
- AES uses four types of transformations for encryption and decryption. In the standard, the encryption algorithm is referred to as the cipher and the decryption algorithm as the inverse cipher.

```
Cipher (InBlock[16], OutBlock[16], w[0...43])
{
  BlockToState(InBlock, S)

  S <- AddRoundKey(S, w[0...3])
  for (round = 1 to 10)
  {
    S <- SubBytes(S)
    S <- ShiftRows(S)
    if (round != 10) S <- MixColums(S)
    S <- AddRoundKey(S, w[4 * round, 4 * round + 3])
  }

  StateToBlock(S, OutBlock);
}
```

## Chapter 9. Mathematics of Cryptography
### 9.1. Primes
- Asymmetric-key cryptography uses primes extensively. The topic of primes is a large part of any book on number theory.

#### 9.1.1. Definition
- Positive integers:
  - Number 1, Primes, Composites
  - A prime is divisible only by itself and 1.

#### 9.1.2. Cardinality of Primes
- Infinite Number of Primes
- Number of Primes:
  - $$\frac{n}{ln(n)} < \pi(n) < \frac{n}{ln(n) - 1.08366}$$
    - for large n
  - $$\pi(n) \approx \frac{n}{ln(n)}$$
    - for large n

#### 9.1.3. Checking for Primeness
- Given a number n, how can we determine if n is a prime?
- We need to see if the number is divisible by all primes less than $\sqrt n$
- We know that this method is inefficient, but it is a godo start.
- Any composite integer can be expressed as a product of prime numbers.

#### 9.1.4. Euler's Phi-Function
- $\phi(n)$ : Euler's phi-function:
  - number of positive integers that are both smaller than n and relatively prime to n.

- Properties:
  - $\phi(1) = 0$
  - $\phi(p) = p - 1$, if p is a prime.
  - $\phi(m \times n) = \phi(m) \times \phi(n)$, if m and n are relatively prime. $m \ge 2, n \ge 2$
  - $phi(p^e) = p^e - p^{e - 1}$, if p is a prime

#### 9.1.5. Fermat's Little Theorem
- First Version:
  - If $p$ is a prime and $a$ is an integer such that $p$ does not divide $a$, then:
  - $$a^{p-1} \text{ mod } p = 1$$

- Second Version:
  - if $p$ is a prime and $a$ is an integer, then:
    - $$a^p \text{ mod } p = a \text{ mod } p$$

- Multiplicative Inverse:
  - If $p$ is a prime and $0 < a < p$, then:
    - $$a^{-1} \text{ mod } p = a^{p - 2} \text{ mod } p$$

#### 9.1.6. Euler's THeorem
- If $a$ and $n$ are relatively prime, then:
  - $$a^{\phi(n)} \text{ mod } n = 1$$
  - n이 소수이면, Fermat's Little Theorem이 됨.

#### 9.1.7. Generatign Primes
- Mersenne Primes:
  - A number in the form $M_p = 2^p - 1$, $p$ prime, is called a Mersenne number and may or may not be a prime.

### 9.2. Primality Testing
- Finding an algorithm to correctly and efficiently test a very large integer and output a prime or a composite has always been a challenge in number theory, and consequently in cryptography. However, recent developments look very promising.

#### 9.2.1. Deterministic Algorithms

```
Divisibility_Test(n)
{
  r <- 2
  while (r < sqrt (n))
  {
    if (r | n) return "a composite"
    r <- r + 1
  }
  return "a prime"
}
```
- 수행시간 : $n_b$ = no. of bits of n

#### 9.2.2. Probabilistic Algorithms
- Fermat test

  ```
  repeat k times:
    pick a randomly from [2, n-2]
    if a^{n-1} mod n != 1, then return "composite"
  return "prime"
  ```

- Square Root Test:
  - If n is a prime, then $sqrt 1$ mod n = {1, n-1}

- Miller-Rabin Test: Fermat test + Square Root test:

  ```
  Miller-Rabin(n, a)

  find m and k such that n - 1 = m * 2^k
  T <- a^m mod n
  if (T = 1 or n - 1) return "prime"

  for (i=1 to k-1)
    T <- T^2 mod n
    if (T=1) return "composite"
    if (T=n-1) return "prime"

  return "composite"
  ```

#### 9.2.3. Recommended Primality Test
- Today, one of the most popular primality test is combination of the divisibility test and the Miller-Rabin test.
  1. Choose an odd integer, n.
  2. Do the divisibility tests on primes 3,5,7,11,13,17,19,23.
  3. Choose a set of bases, say 10 bases.
  4. Do the Miller-Rabin test on each of these bases.:
    - If any of them failes, then go to step 1.
    - If the test passes for all 10 bases, then declare n as a prime.

### 9.3. Factorization
- Factorization has been the subject of continuous research in the past; such research is likely to continue in the future. Factorization plays a very important role in the security of several public-key cryptosystems.

#### 9.3.1. Fundamental Theorem of Arithmetic
- Any positive integer n can be written uniquely in a prime factorization form. $p_1, p_2, ... p_k$ are primes, and $e_1, e_2, ..., e_k$ are positive integers.:
  - $$n = p_1^{e_1} \times p_2^{e_2} \times \cdots \times p_k^{e_k}$$

### 9.6. Exponentiation and Logarithm
- Fast Exponentiation

## Chapter 10. Asymmetric-Key (Public-Key) Cryptography
### 10.1 Introduction
- Symmetric and public-key cryptography will exist in parallel and continue to serve the community. We actually belive that they are complements of each other; the advantages of one can compensate for the disadvantages of the other.

- Symmetric-key cryptography : sharing secrecy
- public-key cryptography : personal secrecy

#### 10.1.1. Keys
- PUblic key cryptography uses two separate keys:
  - one private key and one public key

#### 10.1.2. General Idea
- Plaintext/Ciphertext:
  - Plaintext and ciphertext are treated as integers in public-key cryptography.
- Encryption/Decryption:
  - $C=f(K_{pulibc}, P), P = g(K_{private}, C)$

#### 10.1.3. Need for Both
- There is a very important fact that is cometimes misunderstood: The advent of public-key cryptogrpahy does not eliminate the need for symmetric-key cryptography.
- Symmetric-key: faster. Good for encryption of large messages
- Public-key: slow, but needed for authentication, digital signature, and key exchange.

#### 10.1.4. Trapdoor One-Way Function
- The main idea behind public-key cryptogaphy is the concept of the trapdoor one-way function
- One-Way Function: $y=f(x)$
  - $f$ is easy to compute. Given $x,y=f(x)$ can be easily computed.
  - $f^{-1}$ is difficult to compute. Given $y$, it is computationally infeasible to compute $x=f^{-1}(y)$

- Trapdoor One-way Function:
  - Given $y$ and $a$ trapdoor (secret), $x$ can be computed easily $x=f^{-1}(y)$.

- Every public-key cryptography depends on a trapdoor one-way function.

### 10.2. RSA Cryptosystem
- The most common public-key algorithm is the RSA cryptosystem, named for its inventors (Rivest, Shamir, and Adleman, 1977).

#### 10.2.1. Introduction
- Plaintext : $P$, $P$ is an integer and $P < n$
  - Encryption: $C=P^e \text{ mod } n$
- Ciphertext : $C$, $C$ is an integer and $C < n$:
  - Decryption: $P=C^d \text{ mod } n$
- $e,n$ : public key
- $d$ : private key

#### 10.2.2. Procedure
- RSA key generation 키 생성:
  1. 두 소수 p,q, 생성, p != q
  2. n = p * q 계산
  3. $\phi(n) = (p - 1)(q - 1)$ 계산
  4. $e$ 선택: $1 < e < \phi(n)$ 이고, $e$와 $\phi(n)$ 은 서로소
  5. $d = e^{-1} \text{ mod } \phi(n)$ 계산

- $p, q, \phi(n)$ 모두 폐기
- In RSA, $p$ and $q$ must be at least 512 bits; $n$ must be at least 1024 bits.

#### 10.2.4. Attacks on RSA
- Potential attacks on RSA:
  - Factorization:
  - Chosen-ciphertext:
  - Encryption exponent: Coppersmith, broasdcast, related messages, and short pad
  - Decryption exponent: Revealed and low exponent
  - Plaintext: SHort message ,cyclic, and unconcealed
  - Modulus: Common modulus
  - Implementation: Timing and power

- Factorization attack:
  - $n$ is so large that it is infeasible to factor it in a reasonable time.
  - If Eve can factor $n$ and obtaion $p$ and $q$, she can calculate $\phi(n) = (p - 1)(q - 1)$. She then calculates $d=e^{-1} \text{ mod } \phi(n)$ because $e$ is public.
  - There are many factorization algorithms, but none of them can factor a large integer with polynomial time complexity. $n$ must be at least 1024 bits.
  - RSA is secure as long as an efficient algorithm for factorization has not been found.
- RSA reommendations based on theoretical and experimental results:
  1. The number of bits for $n$ should be at least 1024.
  2. $p$ and $q$ must each be at least 512 bits
  6. n must not be shared.
  7. $e$ should be $2^{16} + 1$ or an integer close to this.
  8. If $d$ is leaked, we must change $n$ as well as both $e$ and $d$.

#### 10.2.6. OAEP
- Optimal asymmetric encryption padding
- Encryption:
  1. m-bit message M이 mbit가 안되면 padding하여 m bit로 만든다.
  2. random number r of k bits 생성
  3. G(r) 계산. G는 public one-way 함수(k bit를 m bit로 확대, k < m)
  4. $P_1 = M \bigoplus$ G(r)$ 계산. $P_1$ : masked message (m bit)
  5. $P_2 = H(P_1) \bigoplus r$. H는 another public one-way 함수(m bit를 k bit로 축소)
  6. $C=(P_1 \vert \vert P_2)^e \text{ mod } n$으로 암호

- Decryption:
  1. 복호 $P = C^d \text{ mod } n = P_1 \vert \vert P_2$. $P_1$와 $P_2$를 얻음.
  2. $r$ 얻음. $H(P_1) \bigoplus H(P_1) \bigoplus r = r$
  3. 마스크 없앰. $G(r) \bigoplus P_1 = G(r) \bigoplus M \bigoplus G(r) = M$
  4. M에서 padding을 없애면 원래 메시지 얻음

- Applications:
  - RSA is slow if the message is long.
  - RSA is useful for short messages.
  - RSA is used in digital signatures and others that often need to encrypt a small message without having access to a symmetric key.

### 10.4. ElGamal Cryptosystem
- Besides RSA and Rabin, another public-key cryptosystem is ElGamal. ElGamel is based on the discrete logarithm problem
- Discrete Logarithm (이산 대수):
  - $y= g^x \text{ mod } p$:
    - Given $p,g$ and $x$, it is easy to compute y.
    - Given $p, g$ and $y$, however, it is computationally infeasible to compute $x$.
- discrete logarithm problem $\approx$ factorization
- Key Geneartion:
  1. $p$ : 소수 생성
  2. $e_1$ 선택, $e_1$ 은 $<Z_p^*, \times>$의 primitive root
  3. $d$ 선택, $1 \le d \le p-2$
  4. $e_2=e_1^d \text{ mod } p$ 계산
- 공개키 : $e_1, e_2, p$
- 개인키 : $d$
- $e_1, e_2, p$를 알아도 $d$를 계산하는 것은 어려움
- Encryption:
  1. $r$ 랜덤 선택, $1 \le r \le p-1$, $r$ 비밀
  2. $C_1 = e_1^r \text{ mod } p$ 계산
  3. $C_2 = M e_2^r \text{ mod } p$ 계산
- $(C_1, C_2)$가 $M$의 암호문
- Decryption:
  1. $M = C_2 / C_1^d \text{ mod } p$ 계산
- RSA와 달리 특별한 정리 필요 없음.

### 10.5. Elliptic Curve Cryptosystems
- Although RSA and ElGamal are secure asymmetric-key cryptosystems, their security comes with a price, their large keys. Researchers have looked for alternatives that give the same level of security with smaller key sizes. One of these promising alternatives is the elliptic curve cryptosystem (ECC).

#### 10.5.1. Elliptic Curves over Real Numbers
- The general equiation for an elliptic curve is:
  - $$y^2 + b_1 xy + b_2 y = x^3 + a_1 x^2 + a-2 x + a_3$$
- Elliptic curves over real numbers use a special class of elliptic curves of the form:
  - $$y^2 = x^3 + ax + b$$:
    - where $4a^3 + 27b^2 \not = 0$
  - In this case, the curves have three distinct (real or complex) roots.

##### Point addition
- Case 1: 두개의 다른점
  - $$\labmda = (y_2 - y_1) / (x_2 - x_1)$$
  - $$x_3 = \lambda^2 - x_1 - x_2, y_3 = \lambda(x_1 - x_3) - y_1$$
- Case 2: 접선:
  - $$\lambda = (3x_1^2 + a) / (2 y_1)$$
  - $$x_3 = \lambda^2 - 2 x_1, y_3 = \lambda(x_1 - x_3) - y_1$$
- Case 3: 점과 자기역:
  - $P + (-P) = O$

#### 10.5.2. Elliptic Curves over GF(p)
- The coordinates of the points are over the GF(p) field with prime p.
  - $$y^2 \text{ mod } p = (x^3 + ax + b) \text{ mod } p$$
    - where $x,y,a$, and $b$ are in $Z_p$, and $(4a^3+27b^2) \text{ mod } p \not = 0$
- $E_p(a, b)$ consists of all points of $(x, y)$ that satisfies the equation, and $O$, the zero point.

- Finding an Inverse:
  - The inverse of a point $(x, y)$ is $(x, -y)$, where $-y$ is the additive inverse of $y \text{ mod } p$.

- Adding two points:
  - We use the elliptic group defined over real numbers, but calculations are done in GF(p).
  - Instead of subtraction and division, we use additive and multiplicative inverses.

#### 10.5.4. ECC Simulating ElGamal
- Generating Public and Private Keys:
  1. Choose $E_p(a, b)$ over $GF(p)$.
  2. Choose a point $e_1 = (x_1, y_1)$ in $E_p(a, b)$.
  3. Choose an integer $d$.
  4. Calculate $e_2 = (x_2, y_2) = d \times e_1$
  5. Announce $p,a,b,e_1$ and $e_2$ as public key, keep $d$ as private key.

- Encryption:
  - Select $P$, a point in $E_p(a, b)$, as plaintext.
  - Choose a random positive integer $r$.
  - Calculate a pair of points:
    - $$C_1 = r \times e_1, C_2 = P + r \times e_2$$

- Decryption:
  - $$P = C_2 - (d \times C_1)$$

- Easy to calculate $e_2$ from $d$ and $e_1$. $e_1$ and $e_2$ are public, but computationally difficult to calculate $d$ from $e_1$ and $e_2$.
- elliptic curve discrete logarithmic problem(ECDLP)

## Chapter 11. Message Integrity and Message Authentication
### 11.1 Message Integrity
- The cryptography systems that we have studied so far provide secrecy, or confidentiality, but not integrity. However, there are occasions where we may not even need secrecy but instead msut have integrity.
#### 11.1.1. Document and Fingerprint
- 문서(document)의 무결성(integrity) 보장
- 도장, 사인, 지장(finger print)

#### 11.1.2. Message and Message Digest
- Message : Digital Document
- Message Digest : finger print

#### 11.1.3. Difference
- Two pairs (document/fingerprint) and (message/message digest) are similar, with some differences.:
  - document and fingerprint: physically linked together.
  - message and message digest : can be unlinked separately.
- message digest needs to be safe from change.

#### 11.1.4. Checking Integrity

#### 11.1.5. Cryptographic Hash Function Criteria
- Cryptographic hash function h: for a message M, $y=h(M)$:
  1. $h$ can be applied to a message of any size
  2. $h$ produces a fixed-length output.
  3. Given $M$, it is easy to compute $y$.
  4. Given $y$, it is computationally difficult to find any message $M$ such that $h(M) = y$. : Primage resistance
  5. Given $M$ and $y=h(M)$, it is computationally difficult to find another message $M'(\not = M)$ such that $h(M') = y$. : Second preimage resistance
  6. It is computationally difficult to find a pair of messages $M$ and $M'(M \not = M')$ such that $h(M) = h(M')$ : Collision resistance

### 11.2. Random Oracle Model
- The Random Oracle Model, which was introduced in 1993 by Bellare and Rogaway, is an ideal mathmatical model for a cryptographic hash function.

#### 11.2.1. Pigeonhole Principle
- If $n$ pigeonholes are occupied by $n+1$ pigeons, then at least one pigeonhole is occupied by two pigeons. The generalized version of the pigeonhole principle is that if $n$ pigeonholes are occupied by $kn +1$ pigeons, then at least one pigeonhole is occupied by $k+1$ pigeons.

#### 11.2.2. Birthday Problems
- "likely" menas "with probability $\ge$ 1/2"
- Problem 1:
  - What is the minimum number of students, $k$, in a classroom such that it is likely that at least one student has a predefined birthday?
  - $$1 - \frac{1}{N} \approx e^{- \frac{1}{N}}$$
  - $$e^{-\frac{k}{N}} \le \frac{1}{2}$$
  - $$-\frac{k}{N} \le ln \frac{1}{2} = - ln 2$$
  - $$k \le ln 2 \times N \approx 0.69 \times N$$
  - $$ N = 365, k \ge 253$$
- Problem 2:
  - What is the minimum number of students, $k$, in a classroom such that it is likely that at least one student has the same birthday as the student selected by the professor?
- Problem 3:
  - What is the minmum number of students, $k$, in a classroom such that it is likely that at least two students have the same birthday?
  - $$1 - e^{-\frac{k^2}{2N}} \ge \frac{1}{2}$$
  - $$k \ge \sqrt{2 N \times ln 2} \approx 1.18 \times \sqrt N$$
  - $$N = 365, k = 23$$
- Problem 4:
  - Two classes, each with $k$ students. what is the minimum value of $k$ such that it is likely that at least one student from the first classroom has the same birthday as a student from the second classroom?

- Preimage Attack:

  ```
  for i = 1 ~ k:
    create M_i
    compute t = h(M_i)
    if (t == y) return M_i
  return failure
  ```

  - $$k \ge 0.69 \times N = 0.69 \times 2 ^n$$

- Collision Attack

  ```
  for i = 1 ~ k:
    create M_i
    compute y_i = h(M_i)
    for j = 1 ~ i - 1:
      if (y_i == y_j) return M_i and M_j
  return failure
  ```

  - $k \ge 1.189 \times N^{-1/2} = 1.18 \times 2^{n / 2}$

### 11.3 Message Authentication
- A message digest does not authenticate the sender of the message. To provide message authentication, Alice needs to provide proof that it is Alice sending the message and not an impostor. The digest created by a cryptographic hash function is normally called a modification detection code (MDC). What we need for message authetnication is a message authentication code (MAC)

#### 11.3.1. Modification Detection Code (MDC)
- MDC: 메시지의 integrity 보장
- Alice에게 Bob에게 메시지를 보내려할 때 메시지가 전송 중에 변하지 않았음 을 보장하려면 MDC를 만드록, 메시지와 MDC를 상대에게 보냄.

#### 11.3.2. Message Authentication Code (MAC)
- 메시지의 integirty 와 data origin authentication을 동시에 보장하려면 MDC-> MAC(message authentication code)으로 바꿈
- 둘의 차이점: MAC은 Alice와 Bob 사이에 비밀 사전 공유

- MAC 의 종류
  - HMAC : hash함수를 이용
  - CMAC : CBCMAC (대칭키 암호를 이용)
  - 전용 MAC함수를 따로 개발

## Chapter 12. Cryptographic Hash Functions
### 12.1 Introduction
- A cryptographic hash function takes a message of arbitrary length and creates a message digest of fixed length.

#### 11.1.1. Iterated Hash Function
- Merkle-Damagard Scheme:
  - $H_0$: 초기값(미리 정해진 값)
  - $H_i = f(H_{i-1}, M_i), 1 \le i \le t$
  - $H_t = h(M)$
  - $f$ : compression function
  - $n$ : block 크기
  - $m$ : message digest 길이

#### 12.1.2. Two Groups of Compression Functions
1. $f$ 함수 : made from scratch(새로 개발):
  - Message Digest(MD) : MD2, MD4, MD5 - Rivest 개발
  - Secure Hash Algorithm (SHA) : SHA-2, SHA-512 미국 표준
2. $f$ 함수 : based on block ciphers:
  - Whirlpool

### 12.2 SHA-512
- SHA-512 is the version of SHA with a 512-bit message digest. This version, like the others in the SHA family of algorithms ,is based on the merkle-Damgard scheme.(by NSA and NIST)

- With a message digest of 512 bits, SHA-512 expected to be resistant to all attacks, including collision attacks.

## Chapter 13. Digital Signature
- Conventional Signatures:
  - A person signs a document to show that it originated from her or was approved by her.
  - The signature is a proof to the recipient that the document comes from the correct entity.
- Digital Signatures:
  - When Alice sends a message to Bob, Bob needs to check the authenticity of the sender; he needs to be sure that the message comes from Alice and not Eve.
  - Bob can ask Alice to sign the mssage electronically. The electornic signature can prove the authenticity of Alice as the sender.

### 13.1. Comparision
- Let us begin by looking at the differences between conventional signatures and digital signatures.

#### 13.1.1 Inclusion
- A conventional signature is included in the document; it is part of the document.
- But when we sign a document digitally, we send th signature as a separate document.

#### 13.1.2. Verification Method
- For a conventional signature, wehn the recipient receives a document, she compares the signature on the document with the signature on file.
- For a digital signature, the recipient receives the message and the signature. The recipient needs to apply a verification techinique to the combination of the message and the signature to verify the authenticity.

#### 13.1.3. Relationship
- For a conventional signature, there is normally a one-to-many relationship between a signature and documents.
- For a digital signature, there is a one-to-one relationship between a signature and a message.

#### 13.1.4. Duplicity
- In conventional signature, a copy of the signed document can be distinguished from the original one on file.
- In digital signature, there is no such distinction unless there is a factor of time one the document.

### 13.2. Process
- The sender uses a signing algorithm to sign the message. The message and teh signature are sent to the receiver. The receiver receives the message and the signature and applies the verifying algorithm to the combination. If the result is true, the message is accepted; otherwise, it is rejected.

#### 13.2.1. Need for Keys
- A digital signature needs a public-key system.
- The signer signs with her private key;
- the verifier verifies with the signer's public key.
- 공개 키 암호의 두가지 용도:
  - 암호복호(기밀성 유지): the private and public keys of the receiver 사용
  - 디지털서명(저자 확인) : the private and public keys of the sender 사용

#### 13.2.2. Signing the Digest
- 공개키 암호시스템: 긴 메시지에서 속도 느림.
- 메시지 대신 메시지 다이제스트에 서명

### 13.3 Services
- message confidentiality, message authentication, message integrity, and nonrepudiation.
- A digital signature can directly provide the last tree; for message confidentiality we still need encryption/decryption.

#### 13.3.1. Message Authentication
- message authentication (or data-origin authentication)
- 메시지 인증: 메시지의 저자(보낸 사람) 확인

#### 13.3.2. Message Integrity
- 메시지와 디지털 서명은 1대1 관계
- 미시지가 바뀌면 그에 따라 디지털서명도 바뀌어야 함
- 디지털 서명을 새로 만드려면 개인 키 필요

#### 13.3.3. Nonrepudiation
- 디지털 서명을 서명자가 부인할 수 없음

#### 13.3.4. Confidentiality
- 디지털 서명은 기밀성을 제공하지 못한다.
- 기밀성 보장은 반드시 암복호화가 적용된 다른 레이어를 통해서 제공되야한다.

### 13.5. Digitial Signature Schemes
- Several digital signature schemes have evolved during the last few decades. Some of them have been implemented.

### 13.6. Variations and Application
#### 13.6.1. Variations
- Time Stamped Signatures:
  - 시간 정보를 포함한 서명(replay attack 방지)
- Blind Signatures:
  - 문서 내용을 보여주지 않고 서명하기

## Chapter 14. Entity Authentication
### 14.1. Introduction
- Entity authentication is a technique designed to let one party prove the identity of another party. AN entity can be a person, a process, a client, or a server. The entity whose identity needs to be proved is called the claimant; the party that tries to prove the identity of the claimant is called the verifier.

#### 14.1.1. Message Versus Entity Authentication
- Two differences between message authentication (data-origin authentication), and entity authentication:
  1. Message authentication might not happen in real time; entity authentication does. When Bob authenticates the message, Alice may or may not be present in the communication process. MAC, 디지털 서명의 경우
    In Entity authentication, Alice needs to be online and to take part in the process. Only after she is authenticated message can be communicated between them.
  2. Message authentication simply authenticates one message; the process needs to be repeated for each new message.
    Entity authentication authenticates the claimant for the entire duration of a session.

#### 14.1.2. Verification Categories
- Something known:
  - Password, PIN, secret key, private key
- Something possessed:
  - ID card, Passport
- Something inherent:
  - Fingerprint, voice, handwriting

### 14.2. Passwords
- The simplest and old method of entity authentication is the password-based authentication, where the password is something that the claimant knows.

- Hashing the password
- Dictionary Attack:
  - Salting the password

### 14.3. Challenge-Response
- In password authentication, the claimant proves her identity by demonstrating that she knows a secret, the password. In challenge-reponse authentication, the claimant proves that she knows a secret without sending it.

#### 14.3.1. Using a Symmetric-Key Cipher
- 일방향 인증:
  - verifier가 평문을 보냄, claimant는 이를 암호화 해서 보내고 verifier는 대칭키로 이를 해제함으로써 claimant가 key를 알고있다고 판단.
- 양방향 인증:
  - verifier가 평문을 보냄, claimant가 생성한 평문과 받은 평문을 붙여서 암호화 해서 보냄. 이를 verifier가 복호화후 평문의 순서를 바꿔 암호화하여 전송
  - 상호 인증

#### 14.3.3. Using a Public-Key Cipher

### 14.4. Zero-Knowledge
- In zero-knowledge authentication, the claimant does not reveal anything that might endanger the confidentiality of the secret. The claimant proves to the verifier that she knows a secret, without revealing it. The interactions are so designed that they cannot lead to revealing or guessing the secret.
- Cave Example, Two balls and the color-blind friend
