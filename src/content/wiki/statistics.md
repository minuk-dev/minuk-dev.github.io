---
layout  : wiki
title   : statistics
summary : 
date    : 2020-07-06 20:02:25 +0900
lastmod : 2020-08-28 23:52:01 +0900
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
   * $$\text{In sample space } S, \bigcup_{^{\forall} B_i}{B_i} = S \Rightarrow ^{\forall} A, P(A) = \sum_{^{\forall} B_i} {P(B_i) \cap A} = \sum_{^{\forall} B_i} {P(B_i) \cdot P(A | B_i)}$$
 * `Bayes' Theorem, Bayes' Rule`
   * $$\bigcup_{^{\forall} B_i}{B_i} = S \Rightarrow ^{\forall} A, P(B_i | A) = \frac{P(B_i) \cdot P(A|B_i)}{\sum_{^{\forall} B_i} P(B_i) \cdot P(A|B_i)}$$
   * The meaning of Bayes' Rule is that we can fetch reasons from outcomes.
 * `Random Variable`
   * `Continueous Variable` vs `Discrete Variable`
 * `Probability Mass Function of Discrete Random Variable`
 * `Cumulative Distribution Function of Discrete Random Variable`
   * $$F(x) = P(X \le x) = \sum_{t \le x} p(x)$$
   * $$P(a < X \le b) = F(b) - F(a)$$
 * `Probability Desity Function of Continuous Random Variable`
   * $$^{\forall} x \in R, f(x) \ge 0$$
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
   * $$^{\forall} (x, y) \le 0$$
   * $$\int_{-\infty}^{\infty} \int_{-\infty}^{\infty} f(x, y) dy dx =1$$
   * $$P[(x, y) \in A] = \int \int_A f(x, y) dy dx$$
 * `Marginal Probability Distribution`
   * $$f_X(x) = \int_\{- \infty}^{\infty} f(x, y) dy$$
 * `Conditional Distribution`
   * $$f(y|x) = \frac{f(x, y)}{f_x(x)}$$
 * `Expected Value`
   * $$\text{About Discrete Random Variable X}, E(X) = \sum_x x \cdot f(x)$$
   * $$\text{About Continuous Random Variable X}, E(X) = \int_{- \infty}^{\infty} x \cdot f(x)$$
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
 * `Covariance`
   * $$Cov(X, Y) = E[(X-\mu_x)(Y-\mu_y)]$$
   * $$Cov(X, Y) = \sum_x \sum_y (x - \mu_x)(y - \mu_y) \cdot f(x, y)$$
   * $$Cov(X, Y) = \int_{- \infty}^{\infty} \int_{- \infty}^{\infty} (x-\mu_x)(y-\mu_y) \cdot f(x, y) dx dy$$
   * $$Cov(X, Y) = E(XY)-E(X)E(Y)$$
   * $$Cov(X, X) = Var(X)$$
   * $$Cov(aX, bY) = abCov(X, Y)$$
   * $$Cov(X + a, Y + b) = Cov(X, Y)$$
   * $$Cov(X, aX+b) = a Var(X)$$
   * $$Cov(aX + b, cX + d) = acVar(X)$$
 * `Correlation Coefficient`
   * $$\rho(X, Y) = \frac{Cov(X, Y)}{\rho_X, \rho_Y}, -1 \ge \rho(X, Y) \ge 1$$
 * `Markov's Inequality & Chebyshev's Inequality`
   * $$\text{Assume the random variable X is continuous and a > 0. } \Rightarrow P(X \ge a) \le \frac{E(X)}{a}$$
   * $$\text{Let X be a random variable with finite expected value } \mu \text{ and finite non-zero variable } \sigma ^2. \\\\ \text{ Then for any real number k > 0 }, P(|X - \mu| \ge k \sigma) \le \frac{1}{k^2}.$$
 * `Bernoulli Distribution`
   * `The Bernoulli distribution` is the `discrete probability distribution` of a random variable which takes the value 1 with probability \\(p\\) and the value \\(0\\) with probability \\(q = 1 - p \\).
   * $$f(x) = p I(x = 1) + (1-p) I(x = 0)$$
   * $$E(X) = p$$
   * $$Var(X) = pq = p(1-p)$$
   * $$M_X(t) = q + p^t$$
 * `Binomial Distribution`
   * `The Binomial distribution` with parameters \\(n\\) and \\(p\\) is the `distrcete probability distribution` of the number of successes in a sequence of \\(n\\) indipendent experiments, each asking a yes-no question, and each with its own boolean-valued outcome. 
   * $$f(x) = \binom{n}{x}p^x(1-p)^{n-x}$$
   * $$E(X) = np$$
   * $$Var(X) = npq = np(1-p)$$
   * $$M_X(t) = (q + pe^t)^n$$
    
 * `Multinomial Distribution`
   * `The multinomial distribution` is a gneralization of the `binomial distribution`.
   * It models the probability of counts for each side of a \\(k\\)-sided die rolled \\(n\\) times.
   * $$f(x_1, ..., x_k) = P(X_1 = x_1 and ... and X_k = x_k) = \frac{n!}{x_1 ! \cdots x_k !} p_1^{x_1} \times \cdots \times p_k^{x_k} I (\sum_{i=1}^k x_i = n)$$
   * It can be expressd using the `gamma function` \\(f(x_1, ..., x_k) = \frac{\Gamma(\sum_i x_i + 1)}{\Pi_i \Gamma (x_i + 1)} \Pi_{i = 1}^k p_i^{x_i}\\)
   * $${E(X_i) = np_i}$$
   * $$Var(X_i) = np_i(1 - p_i)$$
   * $$Cov(X_i, X_j) = -np_ip_j (i \neq j)$$
   * $$M_X(t) = (\sum_{i=1}^k p_i e^{t_i})^n$$
 * `Hypergeometric Distribution`
   * `The hypergeometric distribution` is a `discrete probability distribution` that describes the probability of \\(k\\) successes in \\(n\\) draws, without replacement, from a finite population of size \\(N\\) that contains exactly \\(K\\) objects with that feature, wherein each draw is either a success or a failure.
   * $$p_X(k) = P(X = k) = \frac{\binom{N}{k} \binom{N-K}{n-k}}{\binom{N}{n}}, \\\\ \text{where N is the population size,} \\\\ \text{K is the number of success states in the population,} \\\\ \text{n is the number of draws,} \\\\ \text{k is the number of observed success}$$
   * $$E(X) = \frac{nk}{N}$$
   * $$Var(X) = (\frac{N - n}{N - 1}) \cdot n \cdot \frac{k}{N} \cdot (1 - \frac{k}{N})$$
   * $$M_X(t) = \frac{\binom{N-K}{n} {_2}F_1(-n, -K;N-K-n+1;e^{it})}{\binom{N}{n}}$$
   * $$_2 F_1(a, b; c; z) = \sum_{n = 0} ^{\infty} \frac{(a)_n (b)_n}{(c)_n} \frac{z^n}{n!}$$
 * `Geometric Distribution`
   * `The Geometric distribution` is ether of two `discrete probability distributions`
     * The probability distribution of the number \\(X\\) of `Bernoulli trials` needed to get one success, supported on the set {1, 2, 3, ...}
     * The probability distribution of the number \\(Y = X -1 \\) of failures before the first success, supported on the set {0, 1, 2, 3, ... }
   * $$f(x) = (1 - p)^x p I(x \in \{0, 1, 2, 3, ...\})$$
   * $$E(X) = \frac{1}{p}$$
   * $$Var(X) = \frac{1 - p}{p^2}$$
   * $$M_X(t) = \frac{p}{1 - (1-p)e^t}$$
 * `Negative Binomial Distribution`
   * `The Negative Binomal distribution` is a `discrete probability distribution` that models the number of failures in a sequence of independent and identically distribution `Bernoulli trials` before a specified number of successes (\\r\\) occurs.
   * $$f(x) = \binom{x - 1}{k-1} p^k q^{x-k} I(x \ge k)$$
   * $$E(X) = \frac{1}{p}$$
   * $$Var(X) = \frac{1-p}{p^2}$$
   * $$M_X(t) = \frac{pe^t}{1 - (1-p)e^t}I(t < -ln(1 - p)$$
