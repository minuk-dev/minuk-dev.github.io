---
layout  : wiki
title   : statistics
summary : 
date    : 2020-07-06 20:02:25 +0900
lastmod : 2020-09-07 18:22:49 +0900
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
   * t- 분포는 모집단의 분산(혹은 표준편차)이 알려져 있지 않은 경우 정규분포 대신 이용하는 확률 분포.
 * `Snedecor's F-Distribution`
   * `The F-distribution`, also known as `Snedecor's f Distribution` or the `Fisher-Snedecor distribution` is a continuous probability distribution that aries frequently as the null distribution of a test statistic, most notably in th analysis of variance (ANOVA).
   * `The null distribution` is the probability distribution of the test statistic when the null hypothesis is true.
   * It is used to check whether two or more sample means are drawn from the same population.
   * When \\(U, V``\\) are independent random variables and they follow \\(\chi^2\\) distribution with \\(v_1, v_2\\) degrees of freedom, \\(F = \frac{U/v_1}{V/v_2} \\) follows F-distribution with (\\(v_1, v_2 \\)) degrees of freedom.
   * $$f(x) = \frac{ \sqrt{\frac{(d_1x)^{d_1} d_2^{d^2}}{(d_1 x + d_2)^{d_1 + d_2}}}}{x B(d_1 / 2, d_2 / 2)}$$
   * $$E(X) = \frac{d_2}{d_2 - 2} \text{ for }d_2 > 2$$
   * $$f_{1 - \alpha} (v_1, v_2) = \frac{1}{f_{\alpha}(v_2, v_1)}$$
   * Assuming that the variances of samples of sizes \\(n_1\\) and \\(n_2\\) extracted independently of each other from the normal population with population variances \\(\sigma_1^2\\) and \\(\sigma_2^2\\), respectively, are \\(S_1^2\\) and \\(S_2^2\\), \\(F=\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2} = \frac{S_1^2 \sigma_2^2}{S_2^2 \sigma_2^2} \sim F(n_1-1, n_2 -1)\\)
 * `Point Estimation`
   * Statistical inference` : estimation, test
   * Estimation : point estimation vs interval estimation
   * Point Estimator
     * minimum-variance mean-unbiased estimator(MVUE) : minimizes the risk of the squared-error loss-funciton.
     * best linear unbiased estimator(BLUE)
     * minimum mean squared error (MMSE)
     * median-unbiased esitmator, minimizes the risk of the absolute-error loss function
     * maximum likelihood estimator (MLE)
     * method of moments and generalized method of moments
   * $$\hat \theta = h (X_1, X_2, ..., X_n)$$
   * Moment method vs Maximum Likelihood method
   * Bias
     * $$B(\hat \theta) = E(\hat \theta) - \theta$$
     * When \\(B(\hat \theta) = 0\\), this estimator \\(\theta\\) is called `unbiased estimator`
   * Error
     * $$MSE(\hat \theta) = E[(\hat \theta - \theta) ^2] \\\\ = Var(\hat \theta) + \{B(\hat \theta)\}^2$$
   * Which estimator is the better estimator?
     * $$Var(\hat \theta_1) < Var(\hat \theta_2) \Rightarrow \theta_1 \text{ is better than } \theta_2$$
   * likelihood function
     * $$L(x_1, x_2, ..., x_n; \theta)$$
     * If \\(X_1, X_2, ..., X_n \\) are the samples from independent random variables which of pdf is \\(f(x;\theta) \\), \\(L(x_1, x_2, ..., x_n;\theta) = f(x_1;\theta) f(x_2; \theta) ... f(x_n; \theta) = \Pi_{i=1}^n f(x_i; \theta) \\)
 * `Interval Estimation`
   * $$P(\hat \theta_l \le \theta \le \hat \theta_h) = 1 - \alpha \text{, } (0 < \alpha < 1)$$
   * confidence level : \\(1 - \alpha \\)
   * confidence interval : \\(100 ( 1- \alpha) % \\)
 * `Estimating the Mean`
   * Known the variance of population (\\(\sigma^2 \\))
     * $$\bar X - z_{\frac{\alpha}{2}} \frac{\sigma}{\sqrt{n}} \le \mu \le \bar X + z_{\frac{\alpha}{2}} \frac{\sigma}{\sqrt{n}}$$
   * Unknown the variance of population
     * $$\bar X - t_{\frac{\alpha}{2} (n-1)} \frac{S}{\sqrt{n}} \le \mu \le \bar X + t_{\frac{\alpha}{2} (n-1)} \frac{S}{\sqrt{n}}\text{ degree of freedom is n-1 }$$
   * In generally, t-distribution is used when #sample < 30
 * `Estimating the Variance`
   * When the population is normal distributiona and #sample n, the variance of sample \\(S^2\\),
   * $$\frac{(n-1)S^2}{\chi_{\frac{\alpha}{2}} ^2} \le \sigma^2 \le \frac{(n-1) S^2}{\chi_{1 - \frac{\alpha}{2} ^ 2}}$$
 * `Estimating the Proportion`
   *$$\hat p - z_\frac{\alpha}{2} \sqrt{\frac{\hat p (1 - \hat p)}{n}} \le p \le \hat p + z_{\frac{\alpha}{2}} \sqrt{\frac{\hat p (1 - \hat p)}{n}}$$ 
 * `Testing a Statistical Hypothesis`
   * Null hypothesis
   * alternative hypothesis
   * Critical value : A critical value is a point on the test disribution that is compared to the test statistic to determine whether to reject the null hypothesis. If the absolute value of your test statistic is greater than the critical value, you can declare statistical significance and reject the null hypothesis.
 * `Error of Testing Statistical Hypothesis`
   * type 1 error : alternative hypothesis is true, but it is rejected.
   * type 2 error : alternative hypothesis is false, but is is accepted.
   * $$ \alpha = P(\text{type 1 error}) = P(H_0 \text{ is rejected} | H_0 \text { is true})$$
   * $$ \beta = P(\text{type 2 error}) = P(H_0 \text{ is accepted} | H_0 \text {is false})$$
 * `One-Sided Test and Two-Sided Test`
   * One-Sided Test
     * $$H_0 : \theta = \theta_0, H_1 : \theta > \theta_0$$
     * $$H_0 : \theta = \theta_0, H_1 : \theta < \theta_0$$
     * $$H_0 : \theta \le \theta_0, H_1 : \theta > \theta_0$$
     * $$H_0 : \theta \ge \theta_0, H_1 : \theta < \theta_0$$
   * Two-Sided Test
     * $$H_0 : \theta = \theta_0, H_1 : \theta \not = \theta_0$$
 * `Hypothesis Test on the Difference between Two Means`
   * Known the variances of two populations.
     * $$Z = \frac{(\bar X - \bar Y) - (\mu_1 - \mu_2)}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}$$
     * Two Sided Test : \\(|Z| \ge z_{\frac{\alpha}{2}} \\)
     * One Sided Test : \\(Z \ge z_{\alpha} \\) or \\(Z \le z_{\alpha} \\)
   * Unkown the variance of two populations.(n >= 30)
     * $$Z = \frac{(\bar X - \bar Y) - (\mu_1 - \mu_2)}{\sqrt{\frac{S_1^2}{n_1} + \frac{S_2^2}{n_2}}}$$
     * Two Sided Test : \\(|Z| \ge z_{\frac{\alpha}{2}} \\)
     * One Sided Test : \\(Z \ge z_{\alpha} \\) or \\(Z \le z_{\alpha} \\)
   * Unkown the variance of two populations.(n < 30)
     * $$T = \frac{(\bar X - \bar Y) - (\mu_1 - \mu_2)}{S_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}$$
     * $$S_p = \sqrt{\frac{(n_1 - 1) S_1^2 + (n_2 - 1)S_2 ^2}{n_1 + n_2 - 2}}$$
     * Two Sided Test : \\(|T| \ge t_{\frac{\alpha}{2}} (n_1 + n_2 - 2) \\)
     * One Sided Test : \\(T \ge t_{\alpha} ( n_1 + n_2 - 2) \\) or \\(T \le -t_{\alpha} (n_1 + n_2 - 2) \\)

 * `Hypothesis Test on the Ratio between Two Variances`
   * We test on the ratio between two variances, so we presume the two variances are same.
   * $$F=\frac{S_1^2}{S_2^2}$$
   * Two Sided Test : \\(F \ ge F_{\frac{\alpha}{2} (n_1 - 1, n_2 - 1)}, F \le F_{1 - \frac{\alpha}{2} (n_1 - 1, n_2 - 1)} \\)
   * One Sided Test
     * $$F \ge F_{\alpha} (n_1 -1, n_2 - 1) \text{, right sided test}$$
     * $$F \le F_{1 - \alpha} (n_1 -1, n_2 - 1) \text{, left sided test}$$
 * `Hypothesis Test on the Difference between Two Proportion`
   * We hypothesize the two proportion is same. \\(p_1 = p_2 \\)
   * $$ Z = \frac{\hat p_1 - \hat p_2}{\sqrt{\hat p ( 1 - \hat p) ( \frac{1}{n_1} + \frac{1}{n_2})}} $$
   * Two Sided Test : \\(|Z| \ge z_{\frac{\alpha}{2}} \\)
   * One Sided Test : \\(z \ge z_{\alpha} \\) or \\(z \le z_{\alpha} \\)
 * `Correlation Analysis`
   * $$Cov(X, Y) = E(XY) - E(X)E(Y)$$
   * $$\rho (X, Y) = \frac{Cov(X, Y)}{\sqrt{Var(X)} \sqrt{Var(Y)}} = \frac{\sigma _{XY}}{ \sigma _X \sigma _Y}$$
 * `Sample Correlation Coefficient`
   * $$S_{XY} = \frac{1}{n-1} \{ \sum_{i=1}^n X_i Y_i - \frac{\sigma_{i = 1}^n X_i \sum_{i = 1}^n Y_i}{n} \}$$
   * $$S_{XX} = \frac{1}{n-1} \{\sum_{i=1}^n X_i^2 - \frac{(\sum_{i=1}^n X_i)^2}{n} \}$$
   * $$\rho(X, Y) = \frac{\rho_{XY}}{\rho_X \rho_Y}, -1 \le \rho(X, Y) \le 1$$
   * $$r(X, Y) = \frac{S_{XY}}{S_{XX} S_{YY}}, -1 \le r(X, Y) \ le 1 \\\\ = \frac{n \sum_{i = 1}^n X_iY_i - \sum_{i=1}^n X_i \sum_{i = 1}^n Y_i}{\sqrt{n \sum_{i=1}^n X_i^2 - (\sum_{i=1}^n X_i)^2} \sqrt{n \sum_{i=1}^n Y_i^2 - (\sum_{i=1}^n Y_i)^2}} = \frac{\sum_{i=1}^n (X_i - \bar X)(Y_i - \bar Y)}{\sqrt{\sum_{i=1}^n (X_i - \bar X)^2} \sqrt{\sum_{i=1}^n (Y_i - \bar Y)^2}}$$
   * $$\rho (X, Y) = \rho (aX + b, cY + b)$$
 * `Regression Analysis`
   * tendency, dependency -> prediction
   * simple regression, multiple regression
   * Regression analysis is a set of statistical processes for estimating the relationships between a dependent variable (often called the 'outcome variable') and one or more independent variables (often called 'predictors', 'covariates', or 'features').
 * `Simple Linear Regression Model`
   * $$y_i = \beta_0 + \beta_1 x_i + \varepsilon _i, (i = 1 \text{ to } n)$$
 * `Finding Regression Coefficient`
   * \\(\beta_0, \beta_1 \\) : regression coefficient
     * \\(\beta_0 \\) : intercept coefficient
     * \\(\beta_1 \\) : slop coefficient
   * Original (Population)
     * $$\beta_0 = E(y) - \beta_1 E(x)$$
     * $$\beta_1 = \frac{Cov(x, y)}{Var(x)}$$

   * Sample
     * $$\bar x = \frac{x_1 + x_2 + ... + x_n}{n}$$
     * $$\bar y = \frac{y_1 + y_2 + ... + y_n}{n}$$
     * $$S_{xx} = \sum_{i=1}^n(x_i - \bar x)^2, S_{yy} = \sum_{i=1}^n(y_i - \bar y)^2$$
     * $$S_{xy} = \sum_{i=1}^n(x_i - \bar x)(y_i - \bar y)$$
     * $$\hat \beta_1 = \frac{S_{xy}}{S_{xx}}, \hat \beta_0 = \bar y - \hat \beta_1 \bar x$$
     * $$\hat y = \hat \beta_0 + \hat \beta_1 x$$
     * $$\hat y_i = \hat \beta_0 + \hat \beta_1 x_i$$
     * $$e_i = y_i - \hat y_i (i = 1 \text{ to } n)$$
 * `The Method of Least Squares`
   * $$e_i^2 = (y_i - \hat y_i)^2$$
   * $$SSE = \sum_{i=1}^n e_i^2 = \sum_{i=1}^n (y_i - \hat y_i)^2$$
   * SSE : Sum of Squares of the Errors
   * $$SSE = \sum_{i=1}^n e_i^2 = \sum_{i=1}^n (y_i - \hat y_i)^2 = \sum_{i=1}^n (y_i - (\hat \beta_0 + \hat \beta_1 x_i))^2 \\\\ = \sum_{i=1}{n}(y_i - \hat \beta_0 - \hat \beta_i x_i)^2$$
   * $$\text{From the partial derivative, } \hat \beta_1 = \frac{n \sum_{i=1}^n x_i y_i - \sum_{i=1}^n x_i \sum_{i=1}^n y_i}{n \sum_{i=1}^n x_i^2 - (\sum_{i=1}^n x_i)^2} \\\\ \hat \beta_0 = \frac{\sum_{i=1}^n y_i - \hat \beta_1 \sum_{i=1}^n x_i}{n}$$
 * `Coefficient of Determination(R-Squared)`
   * sample coefficient
     * $$y = \beta_0 + \beta_1 x + \varepsilon \\\\ \Rightarrow Var(y) = Var(\beta_0 + \beta_1 x + \varepsilon) \\\\ \Rightarrow Var(y) = \beta_1^2Var(x) + Var(\varepsilon)$$
     * $$\rho ^2 = \frac{\beta_1^2Var(x)}{Var(y)} = \frac{[Cov(x,y)]^2}{Var(x) Var(y)}$$
     * When \\(\rho ^2 \\) is close to \\(0 \\), \\(Var(\varepsilon) \\) is bigger and \\(y \\) cannot be estimated well.
     * When \\(\rho ^2 \\) is close to \\(1 \\), \\(y \\) is more linear function of \\(x \\), we can estimate well.
   * coefficient of determination, R-squred
     * $$r^2 = \frac{S_{xy}^2}{S_{xx} S_{yy}}$$
     * The coefficient of determination's value is between 0 to 1. When it is closer, more goo fit.

 * `Mean Squared Error`
   * $$MSE = \frac{SSE}{n-2} = \frac{\sum_{i=1}^n e_i^2}{n-2} = \frac{\sum_{i=1}^n (y_i - \hat y_i)^2}{n-2} = \frac{\sum_{i=1}^n (y_i - b_0 - b_1 x_i)^2}{n-2}$$
   * $$E(MSE) = \sigma^2$$
   * \\(\sigma ^2 \\) is the variance of errors in regression model, it follows Normal Distribution with mean 0, variance \\(\sigma ^2\\).
 * `Properties of the Estimators of Regression Coefficient`
   * \\(\beta_1 \\) estimator's mean and variance
     * Proof
       * $$\hat \beta_1 = \frac{S_{xy}}{S_{xx}} = \frac{\sum_{i=1}^n (x_i - \bar x) (y_i - \bar y)}{\sum_{i=1}^n(x_i - \bar x)^2}$$
       * $$\sum_{i=1}^n (x_i - \bar x)(y_i - \bar y) = \sum_{i = 1}^n(x_i - \bar x) y_i$$
       * $$\hat \beta_1 = \frac{\sum_{i=1}^n (x_i - \bar x)(y_i - \bar y)}{\sum_{i=1}^n(x_i - \bar x)^2} = \frac{\sum_{i=1}^n(x_i - \bar x)y_i}{\sum_{i=1}^n (x_i - \bar x)^2} \\\\ \Rightarrow \hat \beta_1 = \sum_{i=1}^n k_i y_i, \text{ replace } \frac{x_i - \bar x}{\sum_{i=1}^n (x_i - \bar x)^2} = k_i$$
       * $$\sum_{i=1}^n k_i = 0 \Rightarrow \text{ Sum of Variance is 0}$$
       * $$\sum_{i=1}^n k_i x_i = 1$$
       * $$\sum_{i=1}^n k_i ^2 = \frac{1}{\sum_{i=1}^n (x_i - \bar x)^2}$$
     * $$E(\hat \beta _1) = \beta_1$$
     * $$Var(\hat \beta_1) = \frac{\sigma ^2}{\sum_{i=1}^n (x_i - \bar x)^2}$$
   * \\(\beta_1 \\) estimator's mean and variance
     * $$E(\hat \beta_0) = \beta_0$$
     * $$Var(\hat \beta_0) = \sigma^2(\frac{1}{n} + \frac{\bar x ^2}{\sum_{i=1}^n(x_i - \bar x)^2})
   * Conclusion : \\(\beta_1, \beta_0 \\) are `unbiased estimators`.
 
 * `Distribution of the Estimators of regression Coefficient`
   * Main question : What distributions are \\(\frac{\beta_1 - \beta-1}{S(\hat \beta_1)}, \frac{\hat \beta_0 - \beta_0}{S(\hat \beta_0)} \\) respectively?
   * $$\frac{\hat \beta_1 - \beta_1}{S(\hat \beta_1)} = \frac{(\hat \beta_1 - \beta_1) / \sigma(\hat \beta_1)}{S(\hat \beta_1) / \sigma(\hat \beta_1)}$$
     * $$\frac{\hat \beta_1 - \beta_1}{\sigma(\hat \beta_1)} \text{ follows the standard normal distribution}$$
     * $$\frac{S^2(\hat \beta_1)}{\sigma^2(\hat \beta_1)} = \frac{S^2(\hat \beta_1)}{Var(\hat \beta_1)} = \frac{(MSE) / \sum_{i=1}^n (x_i - \bar x)^2}{\sigma^2 / \sum_{i=1}^n (x_i - \bar x)^2} = \frac{(MSE)}{\sigma^2} = \frac{SSE / (n - 2)}{\sigma^2} = \frac{SSE}{\sigma^2(n-2)}$$
     * $$\frac{(SSE)}{\sigma ^2} \sim \chi ^2 (n-2)$$
     * $$\frac{(SSE)}{\sigma^2 (n-2)} \sim \frac{\chi ^2(n-2)}{n-2}$$
     * $$\frac{\beta_1 - \beta_1}{\sigma(\hat \beta_1)} \sim N(0, 1), \frac{S^2(\hat \beta_1)}{\sigma^2(\hat \beta_1)} \sim \frac{\chi^2(n-2)}{n-2}, \text{ Therefore, } \frac{\hat \beta_1 - \beta_1}{S(\hat \beta_1)} \sim \frac{z}{\sqrt{\frac{\chi^2(n-1)}{n-2}}}$$
   * $$\frac{\beta_1 - \beta_1}{S(\hat \beta_1)} \sim \frac{z}{\sqrt{\frac{\chi^2(n-2)}{n-2}}} = t(n-2)$$
   * $$\text{ Through the same induction process, } \frac{\hat \beta_0 - \beta_0}{S(\hat \beta_0)} \sim t(n-2)$$
