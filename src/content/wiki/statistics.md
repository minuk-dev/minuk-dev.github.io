---
layout  : wiki
title   : statistics
summary : 
date    : 2020-07-06 20:02:25 +0900
lastmod : 2020-08-27 20:56:00 +0900
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
 * `Bayes' Theorem, Bayes' Rule`
   * $$\bigcup_{^\forall B_i}{B_i} = S \Rightarrow \^forall A, P(B_i | A) = \frac{P(B_i) \cdot P(A|B_i)}{\sum_{^forall B_i} P(B_i) \cdot P(A|B_i)}$$
   * The meaning of Bayes' Rule is that we can fetch reasons from outcomes.
 * `Random Variable`
   * `Continueous Variable` vs `Discrete Variable`
 * `Probability Mass Function of Discrete Random Variable`
 * `Cumulative Distribution Function of Discrete Random Variable`
   * $$F(x) = P(X \le x) = \sum_{t \le x} p(x)$$
   * $$P(a < X \le b) = F(b) - F(a)$$
 * `Probability Desity Function of Continuous Random Variable`
   * $$^\forall x \in R, f(x) \ge 0$$
   * $$\int_{- \infty }^{\infty} f(x) dx = 1$$
   * $$P(a \le X \le b) = \int_a^b f(x) dx$$
 * `Cumulative Distribution Function of Continuous Random Variable`
   * $$F(x) = P(X \le x) = \int_{- \infty }^x f(t) dt, \infty < x <\infty$$
 * `Joint Probability distribution of Discrete Random Variable`
   * $$f(x, y) \ge 0$$
   * $$\sum_x \sum_y f(x, y) = 1$$
   * $$\text{an area A on the xy plane, }, P[(x, y) \in A] = \sum \sum_A f(x,y)$$
 * `Joint Density Function of Continuous Random Variable`
   * $$\text{About Random Variable X, Y },$$
   * $$^\forall (x, y) \le 0$$
   * $$\int_{-\infty}^{\infty} \int_{-\infty}^{\infty} f(x, y) dy dx =1$$
   * $$P[(x, y) \in A] = \int \int_A f(x, y) dy dx$$
 * `Marginal Probability Distribution`
   * $$f_X(x) = \int_\{- \infty}^{\infty} f(x, y) dy$$
 * `Conditional Distribution`
   * $$f(y|x) = \frac{f(x, y)}{f_x(x)}$$
 * `Expected Value`
   * $$\text{About Discrete Random Variable X}, E(X) = \sum_x x \cdot f(x)$$
   * $$\text{About Continuous Random Variable X}, E(X) = \int_{- \infty}{\infty} x \cdot f(x)$$
   * $$E(X+Y) = E(X) + E(Y)$$
   * $$E(XY) = E(X) \cdot E(Y)$$
   * $$E(aX + b) = aE(X)+b$$
   * $$E(aX^2 + bX + c) = aE(X^2) + bE(X) + c$$
   * $$E(aX + bY) = aE(X) + bE(Y)$$
 * `Variance & Standrad Deviation`
   * $$Var(X) = E[(X-E(X))^2]$$
   * $$Var(X) = E[(X-\mu)^2]$$
   * $$\sigma = \sqrt{Var(X)}$$
   * $$Var(X) = E(X^2) - \{E(X)\}^2$$
   * $$Var(aX + b) = a^2Var(X)$$
   * $$Var(X + Y) = Var(X) + Var(Y)$$
