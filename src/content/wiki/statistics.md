---
layout  : wiki
title   : statistics
summary : 
date    : 2020-07-06 20:02:25 +0900
lastmod : 2020-09-01 20:53:29 +0900
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
 * `Negative Hypergeometric Distribution`
   * `The negative hypergeometric distribution` describes probabilities for when sampling from a finite population without replacement in which each sample can be classified into two mutually exclusive categories.
   * $$f(x) = \frac{\binom{k+1r-1}{k} \binom{N-r-k}{K-k}}{\binom{N}{K}} I(0 \le k \le K)$$
   * $$E(X) = r \frac{K}{N-K+1}$$
   * $$Var(X) = r \frac{(N+1)K}{(N-K+1)(N-K)+2} [1 - \frac{r}{N-K+1}]$$
 * `Possion Distribution`
   * `The poisson distribution` is a `discrete probability distribution` that expresses the probability of a given number of events occurring in a fiexd interval of time or space if these events occur with a known constant mean rate and independently of the time since the last event.
     * The experiment consists of counting the number of events that will occur during a specific interval of time or in a specific distance, area,or volume.
     * The probability that an event occurs in a given time, distance, area, or volume is the same.
     * Each event is independent of all other events.
   * $$f(x) = \frac{\lambda ^x e ^{-\lambda}}{k !}$$
   * $$E(X) = \lambda$$
   * $$Var(X) = \lambda$$
   * $$M_X(t) = exp(\lambda (e^t - 1))$$
 * `Possion Distribution`, `Binomial Distribution`, `Hypergeometric Distribution`
   * `Poisson` - conditioning -> `Binomial` - conditioning -> `Hypergeometric`
   * `Poisson` <- limit - `Binomial` <- limit - `Hypergeometric`
 * `Uniform Distribution`
   * `The continuous uniform distribution` is a family of `symmetric probability distributions`.
   * It describes an experiment where there is an arbitrary outcome that lies between certain bounds.
   * $$f(x) = \frac{1}{b-1} I(a \le x \le b)$$
   * $$E(X) = \frac{a+b}{2}$$
   * $$Var(X) = \frac{(b-a)^2}{12}$$
   * $$M_X(t) = \frac{e^{tb} - e^{ta}}{t(b-a)} I(t \neq 0) + I(t = 0)$$
 * `Normal Distribution`
   * `A normal distribution` is a type of `continuous probability distribution` for real-valued random variable.
   * $$f(x) = \frac{1}{\sigma \sqrt{2 \pi}} e ^{- \frac{1}{2} (\frac{x- \mu}{\sigma})^ 2}$$
   * $$E(X) = \mu$$
   * $$Var(X) = \sigma ^ 2$$
   * $$M_X(t) = exp(\mu t + \sigma^2 t^2 / 2)$$
 * `Gamma Distribution`
   * $$\Gamma(\alpha) = \int_0^{\infty} x^{\alpha - 1} e ^ {- x} dx \\ = \lim_{n \rightarrow \infty} \frac{n! n^{\alpha}}{\alpha (\alpha + 1) (\alpha + 2) ... (\alpha + n)}$$
   * $$\Gamma(1) = 1$$
   * $$\Gamma(\frac{1}{2}) = \sqrt{\pi}$$
   * $$\Gamma(\alpha + 1) = \alpha \Gamma(\alpha)$$
   * $$n \in \mathbb{R}, \Gamma(n + 1) = n!$$
   * `The gamma distribution` is a two-parameter family of continuous probability distributions.
   * There are two parameters, a shape parameter \\(\alpha \\) and an scale parameter \\( \beta \\).
   * $$f(x) = \frac{1}{\beta^\alpha \cdot \Gamma(\alpha)} x^{\alpha-1}e^{- \frac{x}{\beta}}$$
   * $$E(X) = \alpha\beta$$
   * $$Var(X) = \alpha \beta ^2$$
   * $$M_X(t) = (1 - \beta t)^{-\alpha} I (t < \frac{1}{\beta})$$
 * `Exponential Distribution`
   * `The exponential distribution` is a specific form of `gamma distribution`.
   * It is the probiability distribution of the time between events in a Possion point process.
   * $$f(x) = \frac{1}{\beta} e ^{- \frac{x}{\beta}} I(x > 0)$$
   * $$E(X) = \beta$$
   * $$Var(X) = \beta^2$$
 * `Beta Distribution`
   * It is important in baysian statistics.
   * `The beta distribution` is a family of continuous probability distributions defined on the interval [0, 1] parameterized by two positive shape parameters, denoted by \\(\alpha \\) and \\(\beta \\), that appear as exponents of the random variable and control the shape of the distribution.
   * The beta distribution has been applied to model the behavior of random variables limited to intervals of finite length in a wide variety of disciplines.
   * Beta Function \\( B(\alpha, \beta) \\)
     * $$B(\alpha, \beta) = \int _0 ^1 x^{\alpha - 1} (1 - x) ^{\beta - 1} dx$$
     * $$B(\alpha, \beta) = \frac{\Gamma(\alpha) \Gamma(\beta)}{\Gamma(\alpha + \beta)}$$
     * $$B(\alpha, \beta) = B(\beta, \alpha)$$
     * $$B(\alpha, \beta) = 2 \int_0 ^{\frac{\pi}{2}} (cos \theta)^{2 \alpha -1} (sin \theta)^{2 \beta - 1} d\theta$$
     * $$B(\alpha, \beta) = \int_0^1 \frac{s ^{\alpha - 1}}{(1 + s) ^{\alpha + \beta}} ds$$
     * $$B(\alpha, \beta) = \frac{(\alpha - 1)!}{(\alpha -1 + \beta) (\alpha -2 + \beta) ... (1+\beta) \beta}$$
     * $$B(\alpha, \beta) = \frac{(\alpha - 1) (\beta - 1)}{(\alpha + \beta -1) (\alpha + \beta - 2)} B(\alpha - 1, \beta - 1)$$
   * $$f(x) = \frac{1}{B(\alpha, \beta)} x^{\alpha - 1} (1-x)^{\beta - 1} I(0 < x < 1)$$
   * $$E(X) = \frac{\alpha}{\alpha + \beta}$$
   * $$Var(X) = \frac{\alpha \beta}{(\alpha + \beta)^2(\alpha + \beta + 1)}$$
   * Generialized beta distribution
     * $$f(x) = \frac{1}{B(\alpha, \beta} (x - a)^{\alpha - 1} (b - x)^{\beta - 1} I(a < x < b)$$
     * $$ X \sim GBETA(\alpha, \beta, a, b)$$
     * $$E(X) = (b-a) \frac{\alpha}{\alpha + \beta} + a$$
     * $$Var(X) = (b-a)^2 \frac{\alpha \beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)}$$

 * `Transformation of Random Variables`
   * `확률 변수 X의 확률분포는 f(x)이고, 확률변수 Y는 Y=u(X)라는 일대일 관계가 성립한다. y= u(x)를 x에 관하여 푼 유일한 x = w(y) 일 때, Y의 확률분포 g(y)=f[w(y)] 이다.`
   * `연속확률변수 X의 확률분포가 f(x)이고, X와 Y 사이에는 일대일 대응 관계가 성립해서 y=u(x)를 풀면 유일하게 x=w(y)로 될때, Y의 확률분포 g(y)=f(w(y)) |J|이다. 여기서 J=w'(y)이며, J를 야코비안이라 한다.`
 * `Moment-Generating Function`
   * `The moment-generating funciton` of a real-valued random variable is an alternative specification of its probability distribution.
   * Not all random variable have moment-generating functions.
   * $$M_X(t) = E[e^{tX}], t \in R$$
   * $$M_X(0) = 1$$
   * $$e^{tX} = 1 + tX + \frac{t^2 X^2}{2!} + \frac{t^3 X^3}{3!} + \cdots + \frac{t^n X^n}{n!} + \cdots \\\\ \text{hence, } M_X(t) = E(e^{tX}) = 1 + tE(X) + \frac{t^2 E(X^2)}{2!} + \frac{t^3 E(X^3)}{3!} + \cdots + \frac{t^nE(X^n)}{n!} \cdots \\\\ = 1 + tm_1 + \frac{t^2 m_2}{2!} + \frac{t^3 m_3}{3!} + \cdots + \frac{t^n m_n}{n!} + \cdots, \\\\ \text{ where } m_n \text{is the } n \text{th moment.}$$
 * `Sampling`
   * `population` : A population can be defined as including all people or items with the characteristic one wishes to understand.
   * `complete enumeration`
   * `sample` :the selection of a subset of individuals
   * `sampleing` : sampling is the selection of a subset of individuals from within a statistical population to estimate chracteristics of the whole population.
   * `random sampling`
   * `purposive sampling` 
   * $$\text{When n independent probabilities } X_1, X_2, X_3, ..., X_n \\\\ \text{ exist and each random variable has the same probability distribution } f(x), \\\\ \text{define } X_1, X_2, X_3, ... X_n \text{ as n samples from the population, and the combined probability density function is } \\\\ f(x_1, x_2, ..., x_n) = f(x_1)f(x_2) ... f(x_n)$$
 * `Sample Mean & Sample Variance of Random Samples`
   * Random Sample has these properties
     * When sampling n samples, each sample is independent.
     * Each sample has the same probability distribution.
     * $$E(X_i) = E(X) = \mu < \infty, i = 1, 2, ..., n $$
     * $$0 < Var(X_i) = Var(X) < \infty , i = 1, 2, ..., n $$
   * $$\text{Define } X_1, X_2, ..., X_2 \text{ is as n samples,} \\\\ \bar X = \frac{1}{n} \sum_{i=1}^n X_i$$
   * $$S^2 = \frac{1}{n-1} \sum_{i=1}^n (X_i - \bar X)^2$$
 * `Central Limit Theorem`
   * `The central limit theorem (CLT)` establishes that, in some situations, when independent random variables are added, their properly normalized sum tends toward a normal distribution even if the original variables themselves are not normally distributed.
   * If \\(X_1, X_2, ..., X_n \\) are random samples each of size \\(n\\) taken from a population with overall mean \\(\mu \\) and finite variance \\(\sigma^2 \\) and if \\(\bar X \\) is the sample mean, the lmiting from of the distribution of \\(Z = (\frac{\bar X_n - \mu}{\sigma / \sqrt{n}}) \\) as \\( n \rightarrow \infty \\), is the standard normal distribution.
 * `Chi-Squared Distribution`
   * $$f(x) = \frac{1}{2^{v / 2} \Gamma (v / 2)} x^{v / 2 -1} e ^{- x / 2}$$
   * If random variables \\(X_1, X_2, ... , X_n \\) are independent from each other and follow \\(N(\mu, \sigma^2) \\), \\( Y = \sum_{i=1}^n (\frac{X_i - \mu}{\sigma})^2 \\) follows \\(\chi ^2 (n) \\).
   * `Degree of freedom`
 * `Student-T Distribution`
   * When \\(X_1, X_2, ..., X_n \\) are random samples from the population which follows \\(N(\mu, \sigma ^2) \\) and define the sample variance \\( S^2 \\), \\(\frac{(n-1) S^2}{\sigma^2} = \sum_{i=1}^n \frac{(X_i - \bar X)^2}{\sigma ^2} \sim \chi ^2 (n-1) \\)
   * When \\(Z \sim N(0, 1), V \sim \chi^2(v) \\) are independent, \\(T=\frac{Z}{\sqrt{\frac{V}{z}}} \sim T(v) \\).
   * $$f(x) = \frac{\Gamma(\frac{v+1}{2})}{\Gamma (\frac{v}{2} ) \sqrt{\pi v})} ( 1 + \frac{t^2}{v}) ^{- \frac{v + 1}{2}}, -\infty < t < \infty$$
   * t- 분포는 모집단의 분산(혹은 표준편차)이 알려지ㅕ 있지 않은 경우 정규분포 대신 이용하는 확률 분포.
