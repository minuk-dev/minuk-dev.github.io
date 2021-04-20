---
layout  : wiki
title   : wireless 무선이동통신 수업
summary : 
date    : 2021-04-20 19:23:19 +0900
lastmod : 2021-04-20 19:52:00 +0900
tags    : 
parent  : lectures
---

## Chapter 2. Probability & Fourier Transform
### Introduction
 * Several factors influence the performance of wireless systems:
   * Density of mobile users
   * Cell size
   * Moving direction and speed of users (Mobile models)
   * Call rate, call duration
   * Interference, etc.
 * Probability, statistics theory and traffic patterns, help make these factors tractable.

### Probability Theory and Statistics Theory
 * Random Variables(RVs):
   * Let S be sample associated with experiment E
   * X is a function that associates a real number to each $$s \in S$
   * RVs can be of two types: Discrete or Continuous
   * Discrete random variable => probability mass function (pmf)
   * Continuous random variable => probability density function (pdf)

### Discrete Random Variables
 * The probability mass function (pmf) pk) of X is defined as:
   * $$p(k) = p(X = k), for k=0,1,2, ...$$
   * where
     * Probability of each state occuring $$0 \le p(k) \le 1$$ for every k;
     * Sum of all states $$\sum p(k) = 1$$ for all k.

### Continuous Random Varaibles
 * Mathmatically, X is a continuous random variable if there is a function f, called probability density function (pdf) of X that satisfies the following criteria:
   * $$f(x) \ge 0$$ for all x;
   * $$\int f(x) dx = 1$$

### Cumulative Distribution Function
 * Applies to all random variables
 * A cumulative distribution function (cdf) is defined as:
   * For discreate random variables:
     * $$P(k) = P(X \le k) = \sum_{all \le k} P(X = k)$$
   * For continous random variables:
     * $$F(x) = P(X \le x) = \int_{- \inf}^X f(x) dx$$

### Probability Density Function
 * The pdf f(x) of a continous random variable X is the derivative of the cdf F(x),
 * $$ f(x) = \frac{F_X(x)}{dx}$$

### Expected Value, nth Moment, nth Central Moment, and Variance
 * Discreate Random Variable:
   * Expected value represented by E or average of random variable
     * $$E[X] = \sum_{all \le k} k P(X=k)$$
   * nth moment:
     * $$E[X^n] = \sum_{all \le k} k^n P(X=k)$$
   * nth central moment
     * $$E[(X-E[X])^n] = \sum_{all \le k} (k-E[X])^n P(X=k)$$
   * Variance or the second central moment
     * $$\sigma^2 = Var(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$$

 * Continous Random Variable:
   * Expected value or mean value:
     * $$E[X] = \int_{-\inf}^{\inf} xf(x) dx$$
   * nth moment
     * $$E[X^n] = \int_{-\inf}^{\inf} x^n f(x) dx$$
   * nth central moment
     * $$E[(X - E[X])^n] = \int_{-\inf}^{\inf} (x - E[X])^n f(x) dx$$
   * Variance or the second central moment
     * $$\sigma^2 = Var(X) = E[(X-E[X])^2] = E[X^2] - E([X])^2$$

### Some Important Discrete Random Distributions
#### Poisson
 * $$P(X=k)=\frac{\lambda ^k e ^{-\lambda}}{k!}, k=0,1,2,...,and \lambda > 0$$
 * $$E[X] = \lambda, and Var(X) = \lambda$$

#### Geometric
 * $$P(X) = p(1-p)^k, k =0,1,2,...$$
 * where p is success probability
 * $$E[X] = 1 / (1-p) and Var(X) = p/(1-p)^2$$

#### Binomial
 * Out of n dice, exactly k dice have the same value, and (n - k) dice have different values: $$(1-p)^{n-k}$$
 * $$P(X=k)=\binom{n}{k} p^{k}(1-p)^{n-k}$$
 * where k = 0, 1, 2, ..., n; n = 0, 1, 2, ...; p is teh success probability

#### Normal
 * $$f_X(x)=\frac{1}{\sqrt{2 \pi} \sigma} e^{\frac{-(x - \mu)^2}{2 \sigma ^2}}, for -\inf < x < \inf$$
 * and the cumulative distribution function can be obtained by
 * $$F_X(x) = \frac{1}{\sqrt{2 \pi} \sigma} \int_{- \inf}^{x} e ^ {\frac{- (y - \mu)^2}{2 \sigma^2}} dy$$
 * $$E[X] = \mu, and Var(X) = \sigma^2$$

#### Uniform
 * $$f_x(x) = \begin{cases} \frac{1}{b-a}, & \text{for a \le x \le b} \\ 0, \text{otherwise}$$
