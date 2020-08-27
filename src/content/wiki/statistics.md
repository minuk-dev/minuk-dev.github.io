---
layout  : wiki
title   : statistics
summary : 
date    : 2020-07-06 20:02:25 +0900
lastmod : 2020-08-27 17:28:23 +0900
tags    : [statistics, math]
draft   : false
parent  : 
---

## 기본 용어
 * [[quartile]]

 
## 용어 정리
 * 참고 : https://blog.naver.com/mykepzzang
 * `Probability` is the branch of mathematics concerning numerical descriptions of how likely an event is to occur or how likely it is that a proposition is true.
 * `Sample Space` : the set of all possible outcomes or results of an experimentor random trial. Usually it is denoted using set notation and the possible ordered outcomes are listed as elements in the set.
 * `Event` : the subset of `sample space`
   * `total event`( \\(S\\) ) : the event which includes all elements.
   * `null event`( \\(\phi\\) ): the event which does not includes any element.
   * `complementary event` : the event without elements of another Event.
   * `union event` : 
   * `intersection event`
   * `mutually exclusive event`
 * `Multiplication Rule`
 * `Permutation`
   * $$_{n} P _{r}$$, $$_{n} \Pi _{r}$$
 * `Combination`
   * $$_{n} C _{r}$$, $$_{n} H _{r}$$
 * `Axiomatic Definition of Probability`
   * $$\text{event } ^{\forall}E, 0 \le P(E) \le 1$$
   * $$P(\phi) = 0$$
   * $$P(S) = 1$$
 * `Additive Rules of Probability`
   * $$\text{event } ^{\forall}E, P(E^{C}) = 1 - P(E) $$
   * $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$
 * `Conditional Probability`
   * $$P(A|B) = \frac{P(A \cap B)}{P(B)}$$
 * `Proudct Rule, Multiplicative Rule`
   * $$P(A \cap B) = P(A) \cdot P(B | A)$$
 * `Law of Total Probability`
   * $$\text{In sample space } S, \bigcup_{^\forall B_i}{B_i} = S \Rightarrow ^\forall A, P(A) = \sum_{^\forall B_i} {P(B_i) \cap A} = \sum_{^\forall B_i} {P(B_i) \cdot P(A | B_i)}$$
