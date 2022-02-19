---
layout  : wiki
title   : 베이지안 통계학(Bayesian Statistics)
summary :
date    : 2021-10-03 19:46:55 +0900
lastmod : 2022-02-19 17:40:46 +0900
tags    :
draft   : false
parent  : lectures
---

# Rmarkdown
 * [[Bayesian/week1]]
 * [[Bayesian/week2]]
 * [[Bayesian/week3]]

## Historical Perspective (관점의 변화)
### en
 * Bayesian statistics came first.:
   * Reverend Thomas Bayes, Pierre Simon Laplace in the late 17th/early 18th centuries.
 * Limitations of Bayesian analyses:
   * Difficulty in evaluating $p(\theta \vert y)$ in complex models analytically.
   * Role of prior information - lack of objectivity.
 * Frequentist statistics was introduced as a way of overcoming these issues.:
   * Fisher in the 1920s, Neyman, Pearson in the mid-20th century.
 * Reemergence of Bayesian statistics:
   * Computational advancements have made complex Bayesian analyses feasible.
### ko
 * 베이지안 방법론이 처음 토마스 베이지와 시몬 라플라스에 의해 17세기 말, 18세기 초에 등장했다.
 * 베이지안 분석은 복잡한 모델에 대해서 사후 확률을 추론하기 어려웠고, 사전 정보의 역할이 객관성의 저하를 불러 한계에 부딪혔다.
 * Fisher(1920), Neyman, Pearson(20세기 중기)와 같은 빈도주의자들이 이러한 문제를 극복하는 방법론을 제시했다.
 * 계산의 혁신(컴퓨터의 발전)에 따라서 복잡한 베이지안 분석론이 실용성이 생기게 되어서 재등장하게 된다.


## Frequentist/Classical Paradigm (빈도주의/고전적 패러다임)
### en
 * A parameter $\theta$ is viewed as an unknown fixed constant.
 * Data are a repeatable random sample.
 * Goal : Estimate $\theta$ based on all available information (data) and find its associated error under asymptotic theory.
 * Inference is based on examining how well a procedure would do if it is used many times.:
   * Point estimates and standard errors or 95% confidence intervals.
   * Deduction from $P(data \vert H_0)$, by setting $\alpha$ in advance.
   * Accept $H_1$ if $P(data \vert H_0) < \alpha$
   * Accept $H_0$ if $P(data \vert H_1) \ge \alpha$

### ko
 * 추정하고자 하는 파라메터(이걸 모수로 번역해도 되나?) $\theta$를 우리가 아직 알지는 못하지만 고정된 값이라고 생각한다.
 * 따라서 데이터는 반복가능한 랜덤 샘플이 된다. (이미 집단이 결정되어 있고 우리는 거기에 영향을 주지 못해서 데이터 추출을 몇번을 해도 똑같다는 것)
 * 목표 : 사용가능한 모든 정보(data)에 기반하여 $\theta$를 추정하고 점근적 이론하에 이와 관련된 에러를 찾아낸다.
 * 추정은 여러번 사용할때 얼마나 잘 적용되는지 시험하고 한다.
 * -> 최대한 많이 맞출수 있도록 한다.

## Bayesian Paradigm (베이지안주의 패러다임)
### en
 * A parameter $\theta$ is viewed as a random variable whose distribution is unknown, and described probabilistically .
 * Data are observed from the realized sample.
 * Goal: Estimate the distribution of $\theta$ conditional on the observed data, the posterior distribution of $\theta$.
 * Inference is based on summaries of the posterior distribution of $\theta$.:
   * Induction from $P(\theta \vert data)$, starting with $P(\theta)$
   * Broad descriptions of the posterior distribution such as means and quantiles.
   * Highest posterior density intervals indicating region of highest posterior probability, regardless of contiguity.

### ko
 * 파라메터 $\theta$를 우리가 모르는 분포를 따르는 랜덤 변수라고 보고, 확률적으로 설명 가능하다고 본다.
 * 데이터는 구체화된(실현된으로 번역하기에는 어렵... realized) 샘플로 부터 관측된다.
 * -> 이게 번역이 참 어렵다. 한국어로 어캐 말하지?
 * 목표 : 관측된 데이터로부터 $\theta$의 조건부 분포를 추정한다. ($\theta$의 사후분포를 추정한다.)
 * 추론은 $\theta$의 사후분포에 기반해서 진행된다.:
   * 평균, 분위수과 같은 다양한 통계 수치 등 사후분포에 관한 폭넓은 설명이 가능하다.
   * 연속성 여부에 관계없이 사후 밀도가 높을수록 높은 사후 확률을 가지는 것을 의미한다. -> 연속성 여부와 관련없이 적용가능하다.

## Differences Between Frequentist and Bayesian (빈도주의와 베이지안주의 간의 차이)
### en
 * Waht is fixed?:
   * Frequentist : Parameters are fixed!
   * Bayesian : Data are fixed!
 * General inference:
   * Frequentist : $P(data \vert \theta)$ is the sampling distribution of the data given the parameter.
   * Bayesian : $P(\theta)$ is the prior distribution of the parameter (before the data are seen) and $P(\theta \vert data)$ is the posterior distribution of the parameter.
 * 95% Intervals:
   * Frequentist: In repeated sampling, 95% of realized intervals covers the true parameter.
   * Bayesian: For these data, with probability 95% the parameter is in the interval.
 * Bayesian inference proceeds vertically, with x fixed, according to the posterior distribution $g(\mu \vert x)$.
 * Frequentists reason horizontally, with $\mu$ fixed and x varying.

### ko
 * 뭐를 고정됬다고 볼것인가? 빈도주의는 파라메터를, 베이지안주의는 데이터를 고정된다고 본다.
 * 예: "민욱공정" 이라는 회사에서 일회용 컵을 생산하는 기계를 만들어낸다고 하자. "민욱공정"에서 만들어 내는 기계는 오차율이 정규분포(0.001, 0.0004)를 따른다고 하자. 이 기계를 구입해서 실제로 일회용 컵 10000개를 생산했고, 10개의 불량품을 만들었다, 이 기계의 오차율은 어떻게 될까?:
   * 빈도주의자들은 기계의 오차율은 고정되어 있고, 관측된 데이터가 10개의 불량품을 포함하는 샘플이 추출되었다고 본다. (역으로 추론할 때는 이를 통해서 오차율에 대한 가정을 기각할지 받아들일지 결정한다.)
   * 베이지안 주의자들은 기계의 오차율은 변화한다고 보고, 불량품의 개수가 기계의 오차율을 결정한다고 본다.
 * 뭔가 너무 어렵게 설명한거 같기도 한데, 둘다 맞는 말로 볼 수 있다. 무엇이 무엇을 결정할지에 대한 관점이 달라진 것이다.
 * 살짝 다른 이야기이지만, 가설검증에서 느낀 찝찝한 감정이 이런 점에서 나오는 것이다.:
   * 가설검증에서 통과되는 가설이 여러개인 경우에 대한 찝찝함을 느껴본적이 있나? 이를 베이지안 관점에서 보면, 빈도주의에서 통과시키는 가설이 분포로 존재함을 추론해낼수 있다.

## Overall Recommendation
 * Be pragmatic, not dogmatic.:
   * Use what has been shown to work.
   * As a default approach, the following will serve you well:
     * Design as a bayesian, and evaluate as a frequentist
 * Construct models and procedures from a Bayesian perspective, and use frequentist tools to evaluate their empirical and theoretical perofrmance.
 * In the spirit of being pragmatic, it might seem unnecessarily restrictive to limit oneself to Bayesian procedures, and indeed, there are times when a non-Bayesian procedure may be preferable to a Bayesian one.
 * However, typically, it turns out that there is no disadvantage in considering only Bayesian procedures.


## Bayesian Approach (베이지안적 접근)
### en
 * The idea is to assume a prior probability distribution for $\theta$; that is, a distribution representing the plausibility of each possible value of $\theta$ before the data are observed.
 * To make inferences about $\theta$, one simply considers the conditional distribution of $\theta$ given the observed data, referred to as the posterior distribution, representing the plausibility of each possible value of $\theta$ after seeing the data.
 * This provides a coherent framework for making inferences about unknown parameters $\theta$ as well as any future data or missing data, and for making rational decisions based on such inferences.

### ko
 * $\theta$의 사전 확률을 가정하는 것이 기본 아이디어이다. 데이터를 관측하기 전 $\theta$의 그럴듯한 가능한 값을 나타내는 분포를 설정해야한다.
 * $\theta$에 대한 추론을 하기 위해서, 관측된 데이터 하에 $\theta$의 조건부 분포(사후 분포)를 간단하게 고려한다. 이는 데이터 관측 이후 $\theta$의 가능한 값들의 그럴듯함을 표현한다.
 * 이러한 과정을 통해서 미래의 어떤 관측값이나 유실된 데이터에 대해서도 $\theta$를 추론할 논리적인 체계를 만들어 낸다. 또한 이러한 추론을 기반으로 하여 이성적인 결정을 한다.

## Bayes' Theorem
 * Bayes' Theorem:
   * $p(\theta \vert y) = \frac{p(\theta, y)}{p(y)} = \frac{p(y \vert \theta) p (\theta)}{p(y)}$
   * where $p(y)$ is marginal distribution of y and either $p(y) = \sum_{\theta} p(\theta)p(y\vert\theta)$ or $p(y) = \int p(\theta) p(y \vert \theta) d \theta$.
 * In calcuating,:
   * $p(\theta \vert y) \propto p(y \vert \theta) p(\theta)$

## Bayesian Modeling
 1. Model specification:
   * $p(y \vert \theta)$ : likelihood function of y
   * $p(\theta)$ : prior distribution of $\theta$
 2. Performing inference:
   * $p(\theta \vert y)$ : posterior distribution of $\theta$ given y
   * $p(\theta \vert y) \propto p(y \vert \theta) p(\theta)$
   * How ?:
     * analystically-only possibile for certain models.
     * using simulation when we are not able to write down the exact form of the posterior density.
 3. Inference results:
   * ex) posterior mean : $E[\theta \vert y] = \int _{\theta} \theta p(\theta \vert y) d \theta$

## Binomial Model
 * Goal: estimate an unknown proportion from the results of a sequence of "Bernoulli trials" (data $y_1, ..., y_n$ that are either 1s or 0s)
 * Assume that the data arise from a sequence of n independent trials or draws from a large population where each trial is classified as a "success" ($y_i = 1$) or a "failure" ($y_i = 0$).
 * We can characterize the data by the total number of success, denoted by y, in n tirals.
 * Binomial sampling model:
   * $p(y \vert \theta) = Bin(y \vert n, \theta) = \binom{n}{y} \theta^y (1 - \theta)^{n - y}$
   * where the parameter $\theta$ represents the proportion of successes in the population (equivalently, the probability of success in each trial).
 * Question: How can we get the posterior distribution of $\theta$?
 * First, we need to specify the prioir distribution for $\theta$:
   * One possibility: $p(\theta) = Unif(0, 1)$
 * Second, apply Bayes' Rule:
   * Posterior distribution:
     * $p(\theta \vert y) \propto p(\theta) p(y \vert \theta) \\\\ = I(0 \le \theta \le 1) \binom{n}{y} \theta^y (1 - \theta)^{n - y} \\\\ \propto I(0 \le \theta \le 1) \theta^y (1 - \theta)^{n - y} ~ Beta(y + 1, n - y + 1)$
     * It means the posterior distribution follows the Beta(y + 1, n - y + 1) distribution.
   * Posterior mean:
     * $Beta(\alpha, \beta)$ distribution has $\mu = \frac{\alpha}{\alpha + \beta}$ as mean.
     * So, Binimial model's posterior mean is $\frac{y + 1}{n + 2}$:
       * $\frac{y + 1}{n + 2} = \frac{n}{n + 2} \frac{y}{n} + \frac{1}{n + 2} \\\\ = \text{weight} \times \text{MLE} + \text{weight} \times \text{ Prior information }$
       * Weighted average of sample mean and prior mean

## Binomial Model with Beta Prior
 * Use the different prior distribution:
   * $p(\theta) = Beta(\alpha, \beta)$
 * Posterior distribution:
   * $p(\theta \vert y) \propto p(\theta) p(y \vert \theta) \\\\ = \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha) \Gamma(\beta)} \theta^{\alpha - 1} (1 - \theta)^{\beta - 1} \binom{n}{y} \theta ^ y (1 - \theta)^{n - y} \\\\ \propto \theta^{\alpha - 1 + y} (1 - \theta)^{\beta - 1 + n - y} ~ Beta(\alpha + y, \beta + n - y)$
 * Posterior mean:
   * $E[\theta \vert y] = \frac{\alpha + y}{\alpha + \beta + n} = \frac{n}{\alpha + \beta + n} \frac{y}{n} + \frac{\alpha + \beta}{\alpha + \beta + n} \frac{\alpha}{\alpha + \beta}$
   * It is also weighted average of sample mean and prior mean
   * Actually, unif(0, 1) = Beta(1, 1)
 * Observations:
   * When n is greater, the expectation goes to sample mean.
   * When n is smaller, the expectation goes to prior mean.
   * We can interpret $\alpha + \beta$ is the amount of prior information:
     * When $\alpha + \beta$  is greater (more information of prior), the expectation goes to prior mean.


### Example : Placenta Previa
 * Placenta previa is an unusual pregnancy condition in hwich the placenta is implmented very low in the uterns, obstructing the fetus from a normal vaginal delivery.
 * A study of the sex of placentas previa births in Germany found that there were 437 femals among 980 births.
 * How much evidence does this data provide for the claim that the proportion of female births in the population is less than the proportion of female births in the general population, which is approximately 0.485?:
   * Freq:
     * $Y = # \text{females} ~ Bin(980, \theta)$
     * $\hat \theta_{ML} = \frac{y}{n} = 0.446$
     * $H_0 : \theta = 0.485$
     * $H_1 : \theta < 0.485$
     * $Z = \frac{0.446 - 0.485}{\sqrt{\frac{0.485(1 - 0.485)}{980}}} = -2.44 < -1.65$
     * Reject $H_0$
 * Let $\theta$ be the probability of a female births among placenta previa pregnancies. What do we need to calculate?:
   * Assumming a uniform prior what is $p(\theta \vert y)$?:
     * $\theta ~ Unif(0, 1)$
     * $y = 437, n = 980$
     * $\theta \vert y ~ Beta(y + 1, n - y + 1) = Beta(438, 544)$
 * What is the posterior mean of $\theta$?:
   * $\hat \theta_{Bayes} = E[\theta \vert y] = \frac{438}{438 + 544} = 0.446$
   * Whey they are similar? n is large!
 * What is the posterior standard deviation of $\theta$?:
   * $\sqrt{Var(\theta \vert y)} = \sqrt{\frac{\alpha \beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)}} = 0.016$
 * What is the 95% posterior interval?:
   * integration:
     * $\int_{a}^{b} p(\theta \vert y) d \theta = 0.95$
     * find a, b
   * normal approximation:
     * $0.446 \pm 1.96 * 0.016 \sim [0.415, 0.477]$ not include 0.485
   * numerical method (quantile - base C.I):
     * draw 1000 samples from $p(\theta \vert y)$
     * find 25th, 975th values => $[0.415, 0.476]$
   * HPD(Highest Posterior Density) Interval

 * Use different prior distributions:
   * $\theta ~ Beta(\alpha, \beta)$
   * => $\theta \vert y ~ Beta(437 + \alpha, 543 + \beta)$
 * The sensitivity of posterior inference about $\theta$ to the proposed prior distrubiotn is show blow:
   * prior information is not sensitive since n is large.

## Posterior Predictive Distribution
 * After the data y have been observed, we can predict an unknown observable $\tilde y$
 * The posterior predictive distribution of a future observation, $\tilde y$ is:
   * $p(\tilde y \vert y) = \int p(\tilde y, \theta \vert y) d \theta \\\\ = \int p(\tilde y \vert \theta, y) p (\theta \vert y) d \theta \\\\ = \int p(\tilde y \vert \theta) p (\theta \vert y) d \theta$
 * Assumed $y$ and $\tilde y$ are conditional independent given $\theta$.
 * prior predictive distribution before y observed => $p(\tilde y) = \int p(\tilde y, \theta) d \theta \\\\ = \int p(\tilde y \vert \theta) p(\theta) d \theta$

### Example
 * Binomial model:
   * $y_i ~^{iid} Bern(\theta)$
   * $Y ~ Bin(n, \theta), 0 \le \theta \le 1$
   * $\theta ~ Unif(0, 1)$

---

# Bayesian Statistics
---
- Course Description:
  - Main goal : understand the basic ideas of Bayesian theory and methods, and the essential distinctions between Frequentiest and Bayesian methods.
  - Key topics: Bayesian inference, conjugate prior distribution, informative prior, Bayesian hypothesis testing, Markov chain Monte Carlo, Gibbs sampler, Metropolis-Hastings algorithm, and applications in the real world.
  - Students are expected to understand Bayesian statistical methods, compare with Frequentist methods, apply them to real data and interpret the results.
---

# Bayesian Paradigm
## Historical Perspective
- Bayesian statistics came first:
  - Reverend Thomas Bayes, Pierre Simon Laplace in the late 17th/early 18th centuries.
- Limitations of Bayesian analyses:
  - Difficulty in evaluationg $p(\theta \vert y)$ in complex models analytically.
  - Role of prior information - lack of objectivity.
- Frequentist statistics was introduced as a way of overcoming these issues.:
  - Fisher in the 1920s, Neyman, Pearson in the mid-20th century.
- Reemergence of Bayesian statistics:
  - Computational advancements have made complex Bayesian analyses feasible.

# Frequentist vs. Bayesian
## Frequentist/Classical Paradigm
- A parameter $\theta$ is viewd as an unknown fixed constant.
- Data are a repeatable random sample
- Gogal : Estimate $\theta$ based on all avaiable information (data) and find its associated error under asymptotic theory.
- Inference is based on examining how well a procedure would do if it is used many times:
  - Point estimates and standard errors or 95% confidence intervals.
  - Deduction from $P(data \vert H_0)$, by setting $\alpha$ in advance.
  - Accept $H_1$ if $P(data \vert H_0) < \alpha$.
  - Accept $H_0$ if $P(data \vert H_0) \ge \alpha$.

## Bayesian Paradigm
- A parameter $\theta$ is viewed as a random variable whose distribution is unknown, and described probabilistically.
- Data are observed from the realized sample.
- Goal: Estimate the distribution of $\theta$ conditional on the observed data, the posterior distirbution of $\theta$.
- Inference is based on summaries of the posterior distribution of $\theta$.:
  - Induction from $P(\theta \vert data)$, starting with $P(\theta)$
  - Broad descriptions of the posterior distribution such as means and quantiles.
  - Highest posterior density intervals indicating region of highest posterior probability, regardless of contiguity.

## Differences Between Frequentist and Bayesian
- What is fixed?:
  - Frequentist: Parameters are fixed
  - Bayesian : Data are fixed
- General inference:
  - Frequentist : $P(data \vert \theta)$ is the sampling distribution of the data given the parameter.
  - Bayesian : $P(\theta)$ is the prior distribution of the parameter (before the data are seen) and $P(\theta \vert data)$ is the posterior distribution of the parameter.
- 95% Intervals:
  - Frequentist : In repeated sampling, 95% of realized intervals covers the true parameter.
  - Bayesian : For these data, with probability 95% the parameter is in the interval.

- Bayesian inference proceeds vertically, with $x$ fixed, according to the posterior distribution $g(\mu \vert x)$.
- Frequentists reason horizontally, with $\mu$ fixed and $x$ varying.

## Overall Recommendation
- Be pragmatic, not dogmatic:
  - Use what has been shown to work.
  - As a default approach, the followign will serve you well:
    - Design as a Bayesian, and evaluate as a frequentist
- Construct models and procedures from a Bayesian perspective, and use frequentist tools to evaluate their empirical and theoretical performance.
- In the spirit of being pragmatic, it might seem unnecessarily restrictive to limit oneself to Bayesian procedures, and indeed, there are times when a non-Bayesian Procedure may be preferable to a Bayesian one.
- However, typically, in turns out that there is no disadvantage in cnosidering only Bayesian procedures.

# Probability Review
## Probabilities Defined on Events
- Consider an experiment whose sample space is $S$. For each event $A$ of the sample space $S$, we assume that a number $P(A)$ is defined and satisfies the following three conditions:
  1. $0 \le P(A) \le 1$
  2. $P(S) = 1$
  3. For any sequence of events $A_1, A_2, ...$ that are pariwise mutually exclusive, that is, events for which $A_n \cap A_m = \phi$ when $n \not = m$, then:
    $$ P(\Cup_{n=1}^\infty A_n) = \sum_{n=1}^\infty P(A_n)$$
  We refere to $P(A)$ as the proability of the event A.

## Conditional Proabilities
- If the event $B$ occurs, thenm in order for $A$ to occur it is necessary for the actual occurrence to be apoint in both $A$ and in $B$, that is, it must be in $A \cap B$. Now, because we know that $B$ has occurred, it follows that $B$ becomes our new sample space and hence the probability that the event $A \cap B$ occurs will equal the probability of $A \cap B$ relative to the probability of $B$. That is,
  $$ P(A \vert B) = \frac{P(A \cap B)}{P(B)}$$


## Independent Events
- Two events $A$ and $B$ are said to be independent if
  $$ P(A \cap B) = P(A) P(B) $$
  which implies
  $$ P(A\vert B) = P(A)$$
  $$ P(B \vert A) = P(B)$$
- More generally, the events $A_1, A_2, ..., A_n$ are said to be independent if for every subset $A_{1'}, A_{2'}, ..., A_{r'}$, $r \le n$, of these events
  $$ P(A_{1'}, A_{2'}, ... , A_{r'}) = P(A_{1'}) P(A_{2'}) \cdots P(A_{r'})$$

## Law of Total Probability
- If events $A_1, ..., A_k$ partition a sample space $S$ into mutually exclusive and exhaustive nonempty events, then the Law of Total Probabiilty states that the total probability of an event B is given by
  $$
  \begin{aligned}
  P(B) &= P(A_1 \cap B) + P(A_2 \cap B) + \cdots + P(A_k \cap B) \\
  &= P(B \vert A_1) P(A_1) + P(B \vert A_2) P(A_2) + \cdots + P(B \vert A_k)P(A_k) \\
  &= \sum_{j=1}^k P(B \vert A_j) P(A_j)
  \end{aligned}
  $$

 ## Bayes' Theorem
 - Bayes' Theorem provides a method for invertin conditional probabilities. In its simplest form, if $A$ and $B$ are events and $P(B) > 0$, then
  $$P(A\vert B) = \frac{P(B \vert A) P(A)}{P(B)}$$

#  Discrete Distributions
## Bernoulli Trials
- Several discrete distributions can formulated in terms of the outcomes of Bernoulli tirals.
- A Bernoulli trial has exactly two possible outcomes, "success" or "failure". A Bernoulli random variable $X$ has the probability mas function
   - $P(X = 1) = p$ and $P(X=0) = 1 - p$
   - where p is the probability of success, $0 \le p \le 1$

## Binomial Distribution
- Suppose that $X$ records the number of successes in  n iid Bernoulli tirals with success probability $p$. Then $X$ has the $Binomial(n, p)$ distribution with
   $$
   \begin{aligned}
   P(X = x) & = \binom{n}{x} p^x (1- p)^{n-x} \\
   & = \frac{n!}{x!(n-x)!} p^x(1-p)^{n-x}, & x=0,1,...,n
   \end{aligned}
  $$
- Then mean and variance are
  - $E[X] = np$ and $Var(X) = np(1 - p)$

## Multinomial Distribution
- A multinomial distribution is a generalization of the binomial distribution
- Suppose one does an experiment of extracting n balls of k different colors from a bag, replacing the extracted ball after each draw. Balls from the same color are equivalent. Denote the variable which is the number of extracted balls of color $i(i=1,...k)$ as $X_i$, and denotes as $p_i$, the probability that a given extraction will be in color $i$. THen $X_1, ..., X_k$ has the multinomial distribution with joint pmf
  $$\begin{aligned}
  f(x_1, ..., x_k) & = P(X_1 = x_1, ..., X_k = x_k) \\
  & = \begin{cases} \frac{n!}{x_1! \cdots x_k!} p_1^{x_1} \times \cdots \times p_k^{x_k} & \text{ when } \sum_{i=1}^k x_k = n \\
  0 & otherwise \end{cases}
  \end{aligned}
  $$
- It follows that $E[X_i] = np_i$, $Var(X_i) = np_i (1-p_i)$, $Cov(X_i, X_j) = -np_i p_j, \text{ for } i \not = j$

## Geometric Distribution
- Suppose that independent Bernoulli trials, each having probability $p$ of being a success, are performed until a scucess occurs. If we let $X$ be the number of trials required until the first success, then $X$ has the geometric distribution with pmf
   $$ \begin{aligned}P(X = x) &= (1-p)^{x-1}p,& x = 1,2, ...\end{aligned}$$

- The cdf of $X$ is
   $$ F(x) = P(X \le x) = 1 - (1 - p)^x$$
- It follows that $E[X] = \frac{1}{p}$ and $Var(X) = \frac{1-p}{p^2}$


## Negative Binomial Distribution
- The distribution that applies to the random variable $X$ equal to the number of the trial on which the $r$th success occurs (r = 2, 3, 4, etc) is the negative binomial distribution with pmf
   $$\begin{aligned}P(X=x) &= \binom{x - 1}{r - 1} p^r (1- p)^{x-r}, & x = 1, r+ 1, r+ 2... \end{aligned}$$
- The geometric distribution is a special case of the negative binomial distribution with $r=1$.
- It follows that $E[X] = \frac{r}{p}$ and $Var(X) = \frac{r(1-p)}{p^2}$

## Poisson Distribution
- The Poisson distribution is a discrete probability distribution that expresses the probability of a given number $X$ of events occuring in a fixed interval of time and/or space with pmf
  $$\begin{aligned} P(X = x) = \frac{\lambda^x e^{-\lambda}}{x!}, & x = 0,1,2,... \end{aligned}$$
  where $\lambda > 0$ is the average value of $X$.
- It follows that $E[X] = \lambda$ and $Var(X) = \lambda$

# Continuous Distributions
## Uniform Distribution
- If $\theta_1 < \theta_2$, a random variable $X$ is said to have a continuous uniform distribution on the interval $(\theta_1, \theta_2)$ with pdf
   $$ f(x) = \begin{cases} \frac{1}{\theta_2 - \theta_1}, & \theta_1 \le x \le \theta_2 \\ 0, & \text{otherwise}\end{cases}$$
- It follows that $E[X] = \frac{\theta_1 + \theta_2}{2}$ and $Var(X) = \frac{(\theta_2 - \theta_1)^2}{12}$

## Normal Distribution
- The normal distribution with mean $\mu$ and variance $\sigma^2$ is the continuous distribution with pdf
   $$ \begin{aligned}f(x) &= \frac{1}{\sqrt{2 \pi} \sigma} exp\{ - \frac{1}{2} (\frac{x - \mu}{\sigma})^2\}, & -\infty < x < \infty\end{aligned}$$
- The standard normal distribution $N(0,1)$ has zero mean and unit variance, and the standard normal cdf is
   $$\begin{aligned} \Phi(z) &= \int_{-\infty}^z \frac{1}{\sqrt{2 \pi}} e^{-t^2 / 2} dt, & -\infty < z < \infty \end{aligned}$$
- Linear combinations of normal variables are normal; if $X_1, ..., X_k$ are independent, $X_i \sim N(\mu_i, \sigma_i^2)$, and $a_1, ..., a_k$ are constants, then
   $$Y = a_1 X_1 + \cdots + a_k X_k$$
   is normally distributed with mena $\mu = \sum_{i=1}^k a_i \mu_i$ and variance $\sigma^2 = \sum_{i=1}^k a_i^2 \sigma_i^2$

## Gamma Distribution
- A random variable $X$ is said to have a gamma distribution with parameters $\alpha > 0$ and $\beta > 0$ with pdf
  $$ f(x) = \begin{cases} \frac{1}{\Gamma(\alpha) \beta^{\alpha}} x^{\alpha - 1} e^{- x / \beta}, & 0 \le x < \infty \\ 0, & \text{elsewhere}\end{cases}$$
- It follows that $E[X] = \alpha \beta$ and $Var(X) = \alpha \beta^2$

- $\alpha$ : shape, $\beta$ : scale

## Chi-square Distribution
- A random variable $X$ is said to have a chi-square distribution with $v$ degrees of freedom with pdf
  $$f(x) \frac{1}{\Gamma(v/2) 2^{v/2}} x^{v/2 - 1} e^{- x / 2}$$
  where $v$ is a positive integer
- $\chi^2(v)$ is a special case of the gamma distribution, with shape parameter $v/2$ and scale parameter $2$.
- It follows that $E[X] = v$ and $Var(X) = 2v$
- It $Z_1, ..., Z_v$ are iid standard normal then:
   $$ Z_1^2 + \cdots + Z_v^2 \sim \chi^2(v)$$

## Beta Distribution
- A random variable $X$ is said to have a beta distribution with parameters $\alpha > 0$ and $\beta > 0$ with pdf
  $$ f(x) = \begin{cases} \frac{1}{B(\alpha, \beta)} x^{\alpha - 1} (1-x)^{\beta - 1}, & 0 \le x \le 1 \\ 0, & \text{elsewhere} \end{cases}$$
  where
  $$B(\alpha, \beta) =  \int_0^1 x^{\alpha - 1}(1-x)^{\beta - 1} dx = \frac{\Gamma(\alpha) \Gamma(\beta)}{\Gamma(\alpha + \beta)}$$
- It follows that $E[X] = \frac{\alpha}{\alpha + \beta}$ and $Var(X) = \frac{\alpha \beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)}$

- $\alpha, \beta$ : shape

# Bayesian Approach
## Bayesian Approach
- A parameter $\theta$ is viewd as a random variable whose distribution is unknown.
- Data are observed from the realized sample
- Goal: Estimate the distribution of $\theta$ conditional on the observed data, the posterior distribution of $\theta$.
- Inference is based on summaries of the posterior distribution of $\theta$:
  - Induction from $P(\theta \vert data)$, starting with $P(\theta)$
  - $P(\theta)$ is the prior distribution of the parameter (before the data are observed) and $P(\theta \vert data)$ is the posterior distribution of the parameter (after the data are observed).
  - Broad descriptions of the posterior distribution such as means and quantiles.

- The ida is is to assume a prior probability distribution for $\theta$; that is, a distribution representing the plausibility of each possible value of $\theta$ before the data are observed.
- To make inferences about $\theta$, one simply considers the conditional distribution of $\theta$ given the observed data, referred to as the posterior distribution, representing the plausibility of each possible value of $\theta$ after seeing the data.
- This provides a coherent framework for making inferences about unknown parameters $\theta$ as well as any future data or missing data, and for making rational decisions based on such inferences.

## Notation
- $\theta$ : parameter
- $y$: observed data
- $p(y \vert \theta)$ : likelihood function of y
- $p(\theta)$ : prior distribution
- $p(\theta \vert y)$ : posterior distribution of $\theta$ given y

## Bayes' Theorem
- Bayes' Theorem
  $$p(\theta \vert y) = \frac{p(\theta, y)}{p(y)} = \frac{p(y \vert \theta) p(\theta)}{p(y)}$$
  where $p(y)$ is marginal distribution of y and either $p(y) = \sum_\theta p(\theta) p(y \vert \theta)$ or $p(y) = \int p(\theta) p(y \vert \theta) d \theta$.

- In calculating,
  $$ p(\theta \vert y) \propto p(y \vert \theta) p(\theta)$$


## Baeysian Modeling
1. Model specification:
  - $p(y \vert \theta)$ : likelihood function of y
  - $p(\theta)$ : prior distribution of $\theta$
2. Performing inference
  - $p(\theta \vert y)$ : posterior distribution of $\theta$ given y
  - $p(\theta \vert y) \propto p(y \vert \theta) p(\theta)$
  - How?
    - analytically-only possible for certain models.
    - using simulation when we are not able to write down the exact form of the posterior density.
3. Inference results
  - ex) posetrior mean : $E[\theta \vert y] = \int_\theta \theta p(\theta \vert y) d \theta$

# Binomial Model
## Binomial Model
- Goal : estimate an unknown proportion from the results of a sequence of "Bernoulli trials" (data $y_1, ..., y_n$ that are either 1s or 0s)
- Assume that the data arise from a sequence of n independent trials or draws from a large population where each trial is classified as a "success" ($y_i = 1$) or a "failure" ($y_i = 0$).
- We can characterize the data by the total number of success, denoted by $y$, in $n$ trials.
- Binomial sampling model
  $$ p(y \vert \theta) = Bin(y \vert n, \theta) = \binom{n}{y} \theta^y (1 - \theta)^{n - y}$$
  where the parameter $\theta$ represents the proportion of successes in the population (equivalently, the probability of success in each trial).

- cf. Frequentist:
  $$L\theta \vert y) = \binom{n}{y} \theta^y (1- \theta)^{n-y}$$
  $$\frac{\partial log L}{\partial \theta} = \frac{y}{\theta} - \frac{n - y}{1 - \theta} = 0$$
  $$ \Rightarrow \hat \theta_{ML} = \frac{y}{n} = \bar y$$
  - $$\hat \theta_{ML} \overset{app}{\sim} N(\theta, \frac{\theta(1 - \theta)}{n})$$
- Question : How can we get the posteriro distribution of $\theta$?
- First, we need to specify the prior distribution for $\theta$. One possibility : $p(\theta) = Unif(0, 1)$
- Second, apply Bayes' Rule:
   $$
   \begin{aligned}
   p(\theta \vert y) &\propto p(y \vert \theta) p(\theta) \\
   & = \binom{n}{y} \theta^y (1 - \theta)^{n-y} \\
   & \propto c \theta^y (1-\theta)^{n-y}
   \end{aligned}
   $$
   1. Find $c$ using definition
      $$\int_0^1 c \theta^y (1 - \theta)^{n-y} d \theta = 1$$
    $$\Rightarrow c = \frac{1}{\int_0^1 \theta^y (1-\theta)^{n-y} d \theta} = \frac{1}{p(y)}$$
   2. Find $c$ using known distribution
      $$\theta^{(y + 1) - 1} (1- \theta)^{(n - y + 1) - 1} \sim Beta(y + 1, n - y + 1)$$
  - So, the posterior distribution $Beta(y + 1, n - y + 1)$

- Posterior mean
  $$
  \begin{aligned}
    E[\theta \vert y] &= \int_0^1 \theta p(\theta \vert y) d \theta \\
  & = \frac{n}{n+2} (\frac{y}{n}) + \frac{2}{n+2} (\frac{1}{2}) \\
  & = \frac{n}{n+2} (\text{sample mean from data}) + \frac{2}{n+2} (\text{prior mean})
   \end{aligned}
$$
$\Rightarrow$ Posterior mean is the weighted average of MLE & prior
$n \uparrow \Rightarrow E[\theta \vert y] \rightarrow MLE$
$n \downarrow \Rightarrow E[\theta \vert y] \rightarrow \text{prior mean}$

## Binomial Model with Beta Prior
- Use the different prior distribution:
  $$p(\theta) = Beta(\alpha, \beta)$$
- Posetrior distribution:
    $$\begin{aligned}
  p(\theta \vert y) &\propto p(y \vert \theta) p(\theta) \\
  & \propto \theta^{y + \alpha - 1} (1- \theta)^{n-y + \beta +1} \\
  & \sim Beta(y + \alpha, n - y + \beta)
  \end{aligned}$$
  $$\Rightarrow p(\theta \vert y) = \frac{\Gamma(n + \alpha + \beta)}{\Gamma(y + \alpha) \Gamma(n - y + \beta)} \theta^{y + \alpha - 1} (1- \theta)^{n - y + \beta + 1}$$
- Posterior Mean:
  $$ \begin{aligned} E[\theta \vert y] & = \frac{y + \alpha}{n + \alpha + \beta} \\ &= \frac{n}{n+\alpha + \beta} (\frac{y}{\alpha}) + \frac{\alpha + \beta}{n + \alpha + \beta}(\frac{\alpha}{\alpha + \beta}) \\
  &  = \frac{n}{n+\alpha+\beta} (\hat \theta_{MLE}) + \frac{\alpha + \beta}{n + \alpha + \beta} E[\theta] \end{aligned}$$
  $\Rightarrow$ Weighted average of sample mean & prior mean
- $$n \uparrow \Rightarrow E[\theta \vert y] \rightarrow \bar y$$
- $$n \downarrow \Rightarrow E[\theta \vert y] \rightarrow \text{ prior mean }$$
- $(\alpha + \beta)$ : amount of prior information
  - $$(\alpha + \beta) \uparrow \Rightarrow E[\theta \vert y] \rightarrow \text{ prior mean } E[\theta]$$


- What is the 95% posterior interval?
  1. Find $a$, $b$ satisfying $\int_a^b p(\theta \vert y) d \theta = 0.95$
  2. Normal aaproximation
  3. Numerical method(quantile-based C.I)
  4. HPD(Highetst Posterior Density) Interval

# Posterior Predictive Distribution
## Posterior Predictive Distribution
- After the data y have been observed, we can predict an unknown observable $\tilde y$
- The posterior predictive distribution of a future observation, $\tilde y$ is
   $$\begin{aligned}
   p(\tilde y \vert y) &= \int p(\tilde y, \theta \vert y) d \theta \\
   &= \int p(\tilde y \vert \theta, y) p(\theta \vert y) d \theta \\
   &= \int p(\tilde y \vert \theta) p(\theta \vert y) d \theta
   \end{aligned}$$
- Assumed $y$ and $\tilde y$ are conditional independent given $\theta$
- prior predictive distribution function before $y$ observed
  $$\begin{aligned}
  p(\tilde y) &= \int p(\tilde, \theta) d \theta \\
  &= \int p(\tilde y \vert \theta) p(\theta) d \theta
  \end{aligned}$$

# Poisson Model
## Poisson Model
- Data model: $y_i \overset{iid}{\sim} Poison(\theta)$,  $i=1,...,n$
- Prior distribution : $\theta \sim Gamma(\alpha, \beta)$
- Posterior distribution of $\theta$ given $y$
- $L(\theta) = \prod_{i=1}^n \frac{1}{y_i!}\theta^{y_i} e^{-\theta} = (\prod_{i=1}^n \frac{1}{y_i!}) \theta^{\sum y_i} e^{-n\theta}$
- MLE for $\theta$:
  $$\frac{\partial log L}{\partial \theta} = \frac{\sum y_i}{\theta} - n = 0$$
  $$\Rightarrow \hat \theta_{ML} = \frac{1}{n} \sum y_i = \bar y$$

$$
\begin{aligned}
p(\theta \vert y) & \propto p(y \vert \theta) p(\theta) \\
& \propto e^{\sum y_i + \alpha - 1} e^{-(n + \frac{1}{\beta}) \theta} \\
& \sim Gamma(\sum y_i + \alpha, [n + \frac{1}{\beta}]^{-1})
\end{aligned}
$$
- Posterior Mean
$$
\begin{aligned}
E[\theta \vert y] &= \frac{n}{n + \frac{1}{\beta}} (\frac{\sum y_i}{n}) + \frac{\frac{1}{\beta}}{n + \frac{1}{\beta}} (\alpha \beta) \\
&= \frac{n}{n + \frac{1}{\beta}} (\hat \theta_{ML}) + \frac{\frac{1}{\beta}}{n + \frac{1}{\beta}} (E[\theta]) \\
\end{aligned}
$$
- $$n \uparrow \Rightarrow E[\theta \vert y] \rightarrow \hat \theta_{ML}$$
- $$n \downarrow \Rightarrow E[\theta \vert y] \rightarrow \alpha \beta (\text{ prior mean} )$$

## Posterior Predictive Distribution of Poisson Model
- Posterior predictive distribution, $p(\tilde y \vert y)$:
   $$
   \begin{aligned}
   p(\tilde y \vert y_1, ..., y_n) &= \int_0^\infty p(\tilde y \vert \theta) p(\theta \vert y_1, ..., y_n) d \theta \\
   & = \frac{\Gamma(\tilde y + \sum y_i + \alpha)}{\Gamma(\sum y_i + \alpha) \tilde y!} (\frac{n + \frac{1}{\beta}}{n + \frac{1}{\beta} + 1})^{\sum y_i + \alpha} (\frac{1}{n + \frac{1}{\beta} + 1})^{\tilde y} \\
   & \Rightarrow \tilde y \vert y \sim NegBin(\sum y_i + \alpha, \frac{n + \frac{1}{\beta}}{n + \frac{1}{\beta} + 1})
   \end{aligned}
$$

# Normal Model
- Normal model with unknown mean $\theta$ and known variance $\sigma^2$
   $$ y \sim N(\theta, \sigma^2)$$
- Prior distribution : $\theta \sim N (\mu, \tau^2)$
- Posterior distribution of $\theta$ given $y$
  $$
  \begin{aligned}
  p(\theta \vert y) & \propto p(y \vert \theta) p(\theta) \\
  & \propto exp[- \frac{1}{2} (\frac{1}{\sigma^2} + \frac{1}{\tau^2}) (\theta - \frac{\frac{y}{\sigma^2} + \frac{\mu}{\tau^2}}{\frac{1}{\sigma^2} + \frac{1}{\tau^2}})^2]
  \end{aligned}
 $$
 $$ \theta \vert y \sim N(\frac{\frac{y}{\sigma^2} + \frac{\mu}{\tau^2}}{\frac{1}{\sigma^2} + \frac{1}{\tau^2}}, [\frac{1}{\sigma^2 } + \frac{1}{\tau^2}]^{-1})$$
 - Posterior Mean
   $$ \begin{aligned}
   E[\theta \vert y] & = \frac{\frac{1}{\sigma^2}}{\frac{1}{\sigma^2} + \frac{1}{\tau^2}} y + \frac{\frac{1}{\tau^2}}{\frac{1}{\sigma^2} + \frac{1}{\tau^2}} \mu \\
   & = \frac{\frac{1}{\sigma^2}}{\frac{1}{\sigma^2} + \frac{1}{\tau^2}} \hat \theta_{ML} + \frac{\frac{1}{\tau^2}}{\frac{1}{\sigma^2} + \frac{1}{\tau^2}} E[\theta] \\
   \end{aligned}
   $$
   - $\tau^2$ : prior variance
     - $$\tau^2 \uparrow \Rightarrow \text{ Little Information } \Rightarrow E[\theta \vert y] \rightarrow y (\text{sample mean})$$
     - $$\tau^2 \downarrow \Rightarrow \text{ Much information } \Rightarrow E[\theta \vert y] \rightarrow \mu$$
- Posterior Varaince : $[\frac{1}{\sigma^2} + \frac{1}{\tau^2}]^{-1}$
  - $\text{precision} = \frac{1}{\text{variance}}$
  - $\frac{1}{\sigma^2}$ : precision of data model
  - $\frac{1}{\tau^2}$ : precision of prior
  - posterior precision = prior precision + data precision

## Normal Model with Multiple Observations
- Normal model with unknown mean $\theta$ and known variance $\sigma^2$
   $$ \begin{aligned} y_i &\overset{iid}{\sim} N(\theta, \sigma^2), & i=1,...,n \end{aligned}$$
- Prior distribution : $\theta \sim N(\mu, \tau^2)$
- Posterior distribution of $\theta$ given $y_1, ..., y_n$
  $$
  \begin{aligned}
  p(\theta \vert y) & \propto p(y \vert \theta) p(\theta) \\
  & \propto exp[-\frac{1}{2} (\frac{n}{\sigma^2} + \frac{1}{\tau^2})(\theta - \frac{\frac{\sum y_i}{\sigma^2} + \frac{\mu}{\tau^2}}{\frac{n}{\sigma^2} + \frac{1}{\tau^2}})^2] \\
  \end{aligned}
  $$
  $$\Rightarrow \theta \vert y \sim N(\frac{\frac{\sum y_i}{\sigma^2} + \frac{\mu}{\tau^2}}{\frac{n}{\sigma^2} + \frac{1}{\tau^2}}, [\frac{n}{\sigma^2} + \frac{1}{\tau^2}]^{-1})$$
- Posterior Mean
   $$ \begin{aligned}
   E[\theta \vert y] & = \frac{\frac{n}{\sigma^2}}{\frac{n}{\sigma^2} + \frac{1}{\tau^2}} (\frac{\sum y_i}{n}) + \frac{\frac{1}{\tau^2}}{\frac{n}{\sigma^2} + \frac{1}{\tau^2}} \mu \\
   & = \frac{\frac{n}{\sigma^2}}{\frac{n}{\sigma^2} + \frac{1}{\tau^2}} \hat \theta_{ML} + \frac{\frac{1}{\tau^2}}{\frac{n}{\sigma^2} + \frac{1}{\tau^2}} E[\theta] \\
   \end{aligned}
   $$

   - $\tau^2$ : prior variance
     - $$\tau^2 \uparrow \Rightarrow \text{ Little Information } \Rightarrow E[\theta \vert y] \rightarrow \bar y (\text{sample mean})$$
     - $$\tau^2 \downarrow \Rightarrow \text{ Much information } \Rightarrow E[\theta \vert y] \rightarrow \mu$$
- Posterior Varaince : $[\frac{n}{\sigma^2} + \frac{1}{\tau^2}]^{-1}$
  - $\text{precision} = \frac{1}{\text{variance}}$
  - $\frac{n}{\sigma^2}$ : precision of data model
  - $\frac{1}{\tau^2}$ : precision of prior
  - posterior precision = prior precision + data precision

## Posterior Predictive Distribution
- Normal model with unknown mean $\theta$ and known variance $\sigma^2$
   $$ \begin{aligned} y_i &\overset{iid}{\sim} N(\theta, \sigma^2), & i=1,...,n \end{aligned}$$
- Prior distribution : $\theta \sim N(\mu, \tau^2)$
- Posterior predictive distribution, $p(\tilde y \vert y)$
  $$
  \begin{aligned}
  p(\tilde y \vert y) &= \int_{- \infty}^{\infty} p(\tilde y \vert \theta) p(\theta \vert y) d \theta \\
  & \propto \int exp[-\frac{1}{2} (\frac{1}{\sigma^2} + \frac{1}{\tau^2}) \theta^2 d\theta] \times exp[- \frac{1}{2\sigma^2} \tilde y^2] \\
  & \propto exp [- \frac{1}{2} \frac{1}{\sigma^2 + \tau^2}(\tilde y - \mu)^2]
  \end{aligned}
 $$
 $\Rightarrow \tilde y \vert y \sim N(\mu, \sigma^2 + \tau^2)$

## Normal Model with Known Mean and Unknown Variance
- Normal model with known mean $\theta$ and unknown variance $\sigma^2$.
  $$\begin{aligned} y_i &\sim N(\theta, \sigma^2),& i = 1, ..., n \end{aligned}$$
- Prior distribution : $\sigma^2 \sim Inverse-Gamma(\alpha, \beta)$
- cf. Inverse-Gamma distribution
  $$ x \sim Inverse-Gamma(\alpha, \beta)$$
  where $\alpha > 0$ (shape), $\beta > 0$(shape), and $x \in (0, \infty)$
  - Density function
    $$ p(x) = \frac{1}{\Gamma(\alpha) \beta^{-\alpha}} x^{-(\alpha + 1)} e^{- \frac{\beta}{x}}$$
- Posterior distribution of $\sigma^2$ given $y_1, ..., y_n$
  $$
  \begin{aligned}
  p(\sigma^2 \vert y) & \propto p(y \vert \sigma^2) p(\sigma^2) \\
  & \propto (\sigma^2)^{- (\frac{n}{2} + \alpha + 1)} e^{- \frac{1}{\sigma^2} (\frac{1}{2} \sum(y_i - \theta)^2 + \beta)} \\
  & \sim Inverse-Gamma(\frac{n}{2} + \alpha, \frac{1}{2} \sum (y_i - \theta)^2 + \beta)
  \end{aligned}
$$

# Conjugate Families
- Definition : If $F$ is a class of sampling distribution $p(y \vert \theta)$, and $P$ is a class of prior distributions for $\theta$, then the class $P$ is conjugate for $F$ if
    $$ p(\theta \vert y) \in P \text{ for all } p(\cdot \vert \theta) \in F \text{ and } p(\cdot) \in P$$
- Conjugate Families

   | Data Model $p(y \vert \theta)$ | Conjugate Distribution |
   | --- | --- |
   | Binomial / Bernoulli | Beta |
   | Poisson | Gamma |
   | Normal (unknown mean) | Normal |
   | Normal (unknown variance) | Inverse Gamma |
   | Gamma | Gamma |


# Prior Distributions
## Noninformative Prior Distributions
- When a prior does not depend on the data and does not affect the posterior distribution, the prior density is described as vague, flat, diffuse or noninformative.
- "Let the data speak for themselves" so that inferences are unaffected by information external to the current data.

## Informative Prior Distributions
- A prior distribution is informative if the hyperparameters are chosen to reflect a priori (before seeing the data) knowledge about the known parameters.
- A prior distribution is weakly informative if it contains some information-enough to keep it rougly within reasonable bounds-but without attempting to fully capture one's scientific knowledge about the underlying parameters.

## Proper / Improper Prior Distributions
- A prior distribution is proper if it does not depend on the data and it integrates to 1.
- A prior distribution is improper if the distribution does not integrate to 1.
   - Ex) $x_1, ..., x_n \sim N(\theta, 1)$ and $p(\theta) = c (constant)$
   - $\rightarrow \int_{-\infty}^{\infty} p(\theta) d \theta = \infty$
- Can we use improper prior distributions in Bayesian modeling?
  - Yes, because improper prior distributions can lead to proper posterior distributions.
- If we specify a noninformative prior using an improper distribution, then we must show analytically that our posterior distribution is proper.

# Jeffreys' Prior
## Lack of Invariance
- Consider a normal model with known mean $\mu$ and unknown variance $\theta$:
  $$\begin{aligned} y_i & \sim N(\mu, \theta), & i = 1,..., n \end{aligned}$$
- Because $\theta \in (0, \infty)$, let $\phi = log \theta$ and then $\phi \in (-\infty, \infty)$
- A noninformative prior implies that
  $$ p(\phi) \propto 1 \Rightarrow p(\theta) = p(\phi) \vert \frac{d \phi}{d \theta} \vert \propto \frac{1}{\theta}$$
  which is no longer flat.
- Criticized for the lack of invarinace under one-to-one transformations.

## Jeffreys' Noninformative Prior
- Jeffreys' general principle : any rule for determining the prior density $p(\theta)$ should yield an equivalent result if applied to the transformed parameter: $\phi = h(\theta)$
- Jeffreys' prior is given by
  - $$ p(\theta) \propto \sqrt{I(\theta)}$$
  - where $I(\theta)$ is the Fisher Information for $\theta$:
     $$ I(\theta) = - E[\frac{\partial^2 log p(y \vert \theta)}{\partial \theta^2} \vert \theta]$$
- To see that Jeffreys' prior model is invariant to parameterization, we derive a prior for $\phi = h(\theta)$
  $$\begin{aligned} p(\phi) &= p(\theta) \vert \frac{d \theta}{d \phi} \vert \\
  &\propto \sqrt{I(\theta)} \sqrt{(\frac{d\theta}{d\phi})^2} \\
  &= \sqrt {E[(\frac{\partial log L}{\partial \theta})^2] (\frac{d \theta}{d\phi})^2} \\
  &= \sqrt{E[(\frac{\partial log L}{\partial \theta} \frac{d \theta}{d \phi})^2 \vert \phi]} \\
  &= \sqrt{E[(\frac{d log L}{d\phi})^2 \vert \phi]} \\
  &= \sqrt{I(\phi)} \end{aligned}$$
# Bayesian Inference
## Point Estimation
- From a Bayesian perspective, point estimation means that we would use a single statistic to summarize the posterior distribution, $p(\theta \vert y)$. The most important number summarizing a distribution would be its location.
- Posterior Mean
  - $\hat \theta = E[\theta \vert y] = \int \theta p(\theta \vert y) d \theta$
- Posterior Median
  - $\hat \theta: \int_{-\infty}^{\hat \theta} p(\theta \vert y) d \theta = 0.5$
- Posterior Mode (= Maximum a Posteriori (MAP) estimate)
  - $\hat \theta = \underset{\theta}{argmax} p(\theta \vert y)$
  - Under $p(\theta) \propto 1$, the posterior mode is the MLE.
- The most common classical technique to estimate $\theta$ is maximum likelihood estimation(MLE), which can be applied to the osterior distribution.
- Definition : The generalized maximum likelihood estimate of $\theta$ is the largest mode of $p(\theta \vert y)$, i.e., the value $\hat \theta$ which maximizes $p(\theta \vert y)$.
- Obviously, $\hat \theta$ has the interpretation of being the "most likely" value of $\theta$, given the prior and the sample $y$.
- It is probably worthwhile to calculate and compare all three in a Bayesian study.

## Frequentist Criteria for Evaluating Estimators
- Unbiased Estimators : An estimator is said to be unbiased if the mean of its sampling distribution is the true parameter value. That is, an estimator $\hat \theta$ is unbaised if and only if
   $$ E[\hat \theta] = \in \hat \theta f(\hat \theta \vert \theta) d \hat \theta = \theta$$
   where $f(\hat \theta \vert \theta)$ is the sampling distribution of the estimator $\hat \theta$ given the parameter $\theta$.
- Minimum Variance Unbaised Estimator : AN estimator is said to be a minimum variance unbiased estimator if no other unbiased estimator has a smaller variance. Minimum variance unbiased estimators are often considered the best estimators in frequentist statistics.
- Mean Squared Error of an Estimator : The MSE is the average squared distance the estimator is away from the true value.
   $$ \begin{aligned} MSE[\hat \theta] &= E[\hat \theta - \theta]^2 = \in (\hat \theta - \theta)^2 f(\hat \theta \vert \theta) d \hat \theta \\
   &= Bias[\hat \theta, \theta]^2 + Var[\hat \theta]\end{aligned}$$

  ## Comparing Estimators for Proportion
  - When judged by the frequentist criterion of mean squared error.
  - Example
    - $Y \sim Bin(n, \theta)$
    - $\hat \theta_{ML} = \frac{y}{n}$
      - $E[\hat \theta_{ML}] = \theta$ : Unbiased
      - $Var(\hat \theta_{ML}) = \frac{\theta (1 - \theta)}{n}$
         - $\Rightarrow MSE[\hat \theta_{ML}] = \frac{\theta (1-\theta)}{n}$
    - $\hat \theta_B = \frac{y+1}{n+2}$
      - $E[\hat \theta_B] = \frac{n\theta +1}{n+2} \Rightarrow Bias = \frac{n \theta + 1}{n + 2} - \theta$
      - $Var(\hat \theta_B) = \frac{n \theta(1 - \theta)}{(n + 2)^2}$
      - $MSE[\hat \theta_B] = \frac{(4 - n) \theta^2 - (4 - n)\theta + 1}{(n + 2)^2}$
    - Sample Size가 작을때는 $\theta$가 0또는 1에 아주 가까운 값이 아니라면 Bayesian이 우세하다.
    - Sample Size가 커져도 $\theta$가 0.5에 가까우면 베이지안 추정이 우세하게 되고, 그렇지 않더라도 거의 비슷하다.

## Posterior MSE
- WHen presenting a statistical estimate, it is usually necessary to indicate the accuracy of the estimate
- $\delta(y)$ : an estimate of parameter $\theta$
- Posterior Mean Squared Error (MSE) of $\delta(y)$:
  $$\begin{aligned} V_\delta (y) &= E \{ [\theta - \delta(y)]^2 \vert y\} \\ &= Var(\theta \vert y) + [E(\theta \vert y) - \delta(y)]^2 \end{aligned}$$
$$\begin{aligned}
  pMSE &= (\delta(y) - \theta)^2 \vert y] \\
  &= E[\delta(y - E[\theta \vert y] + E[\theta \vert y] - \theta)^2 \vert y] \\
  & = E[(\delta(y) - E[\theta \vert y])^2 \vert y] + E[(\theta - E[\theta \vert y])^2 \vert y] + \underset{=0}{E[2(\delta(y) - E[\theta \vert y])(E[\theta \vert y] - \theta) \vert y]}\\
  & = (\delta(y) - E[\theta \vert y])^2 + Var(\theta \vert y) \ge Var(\theta \vert y)
\end{aligned}$$
- If $\delta(y) = E[\theta \vert y]$, then posterior MSE = posterior Variance. So p mean smallest pMSE!

# Confidence Regions
## Frequentist Confidence Interval
- A $(1 - \alpha) \times 100$% confidence  interval for a parameter $\theta$ is an interval $(l, u)$ such that
   $$ P(l \le \theta \le u) = 1 - \alpha$$
- The endpoints $l$ and $u$ are random variables since they depend on the random sample.
- Under the frequentist paradigm, the correct interpretation is that $(1 - \alpha) \times 100$% of the random intervals calculated this way will contain the true value.
- Often, the sampling distribution of the estimator used is approximately normal. For example, if $n$ is large in the binomial model, the sample proportion $\hat \theta_f = \frac{y}{n}$ is approximately normal with $\theta$ and standard deviation $\sqrt \frac{\theta(1 - \theta)}{n}$
- This gives an approximate $(1 - \alpha) \times 100$% equal tail area confidence interval for $\theta$:
   $$ \hat \theta_f \pm z_{\alpha /2} \times \sqrt {\frac{\hat \theta_f (1 -\hat \theta_f)}{n}}$$

## Bayesian Credible Interval
-  A $(1 - \alpha) \times 100$ % Bayesian credible interval is an interval that has a posterior probability of $1 - \alpha$ of containing the parameter:
  $$ P(l \le \theta \le u \vert y) = \int_l^u p(\theta \vert y) d \theta = 1 - \alpha$$
- Equal tail area Bayesian credible intervals are often used, since they are easy to find.
- Quantile-based interval : to make a $(1 - \alpha) \times 100$% quantile-based confidence interval, find numbers $\theta_{\alpha/2} < \theta_{1 - \alpha /2}$ such that:
  1. $P(\theta < \theta_{\alpha / 2} \vert Y = y) = \alpha / 2$
  2. $P(\theta > \theta_{1 - \alpha /2} \vert Y = y) = \alpha /2$
  - So,
    $$P(\theta_{\alpha / 2} \le \theta \le \theta_{1 - \alpha / 2} \vert Y = y) = 1 - \alpha$$

- Approximation Method
  1. Simulation method:
    - draw 1000 samples from $p(\theta \vert y)$
    - find 25th, 975th values $\Rightarrow$ lower bound, upper bound
  2. Normal approximation:
    - using $E[\theta \vert y]$ & $SD[\theta \vert y]$ $\rightarrow$ useful for symmetric distribution

## Highest Posterior Density (HPD) Credible Set
- The $100(1 - \alpha)$ % Highest Posterior Density (HPD) credible set for $\theta$ is the subset $C$ of $\Theta$ of the form
   $$ C = \{\theta \in \Theta : p(\theta \vert y) \ge k(\alpha) \}$$
   - where $k(\alpha)$ is a constant such that
     $$P(\theta \in C \vert y) = 1 - \alpha$$
- All points in an HPD region have a higer posterior density than points outside the region.

# Hypothesis Testing
## Classical P-values
- Let $y$ be the observed data and $\theta$ be the vector of parameters, and $y^{rep}$ be the replicated data that could have been observed under the same model and the same value of $\theta$ that produced the observed data.
- The classical p-value for the test statistic $T(y)$ is
  $$p_c = P\{ T(y^{rep}) \text{ more "extreme" than } T(y) \vert \theta, H_0 \}$$
  where the probability is taken over the distribution of $y$ with $\theta$ fixed, and "extremeness" is in the direction of the alternative hypothesis.
- If the p-value is less than some prespecified Type I error rate, $H_0$ is rejected; otherwise, it is not.

## Posterior Predictive P-values
- To evaluate the fit of the posterior distribution of a Bayesian model, we can compare the observed data to the posterior predictive distribution.
- The Bayesian p-value is defined as the probability that the replicated data could be more extreme than the observed data, as measured by the test quantity:
   $$p_B = P(T(y^{rep}, \theta) \ge T(y, \theta) \vert y)$$
 - It works with the distribution of $y^{rep}$ given the current state of knowledge, that is, with the posterior predictive distribution,
    $$p(y^{rep} \vert y) = \int p(y^{rep} \vert \theta) p(\theta \vert y) d\theta$$
- It follows that
   $$ p_B = \int \int I_{T(y^{rep}, \theta) \ge T(y, \theta)} p(y^{rep} \vert \theta)p(\theta \vert y) d y^{rep} d \theta$$

-  In practice, we compute the posterior predictive distribution using simulation.
-  If we already have $S$ simulations from the posterior density of $\theta$, we just draw one $y^{rep}$ from the predictive distribution for each simulated $\theta$. We now have $S$ draws from the joint posterior distribution, $p(y^{rep}, \theta \vert y)$
-  THe posterior predictive check is the comparision between the realized test quantities, $T(y, \theta^s)$, and the predictive test quantities, $T(y^{rep, s}, \theta^s)$
-  The estimated p-value is just the proportion of these $S$ simulations for which the test quantity equals or exceeds it realized value; that is, for which
   $$T(y^{rep, s}, \theta^s) \ge T(y, \theta^s), s= 1, ..., S$$

# Bayes Factor
## Bayesian Hypothesis Testing
- To evaluate the relative plausibility of a hypothesis (model), we use the posterior model probability:
   $$ p(H_j \vert y) = \frac{p(y \vert H_j) p(H_j)}{p(y)} \propto p(y \vert H_j) p(H_j)$$
   where $p(H_j)$ is the prior model probability and
   $$p(y \vert H_j) = \int p(y \vert \theta) p(\theta \vert H_j) d\ theta$$
   is the marginal likelihood under model $H_j$ and $p(\theta \vert H_j)$ is the prior for parameter $\theta$ when model $H_j$ is true.
- Note that the marginal likelihood for simple hypotheses, e.g. if $H_0: \theta = \theta_0$ then $\theta \vert H_0 \sim \delta_{\theta_0}$, is
   $$ p(y \vert H_0) = \int p(y \vert \theta) p(\theta \vert H_0) d \theta = p(y \vert \theta_0)$$

 ## Bayes Factor
 - If we only have two models: $H_0$ and $H_1$, then the Bayes Factor is defined as the ratio of the posterior odds of $H_1$ to the prior odss of $H_1$:
    $$ \begin{aligned}
  BF(H_1 : H_0) & = \frac{p(H_1\vert y) / p(H_0 \vert y)}{p(H_1) / p(H_0)} \\
  &= \frac{p(y \vert H_1)}{p(y \vert H_0)}
\end{aligned} $$
   which is the ratio of the observed marginal densities for the two models.
- Assuming the two models are a prior equally probable (i.e., $p(H_1) = p(H_0) = 0.5$), we have that
   $$ BF(H_1: H_0) = \frac{p(H_1 \vert y)}{p(H_0 \vert y)}$$
   which is the posterior odds of $H_1$.
 - Bayes factor captures the change in the odds in favor of model 1 as we move from prior to posterior.

## Probabilities of bayes Factor
- Bayes factors
  - need proper priors.
  - reduce to likelihood ratio for simple hypotheses.
  - work also for non-nested models.
  - are symmetric measures of evidence.
- Clearly a Bayes factor much greater than 1 supports Model 1 over Model 0.
- Kass and Raftery (1995) proposed the following rules:

| BF        | Strength of Evidence      |
| --------- | ------------------------- |
| < 1       | Negative (supports $H_0$) |
| 1 to 3    | Barely worth mentioning   |
| 3 to 20   | Positive                  |
| 20 to 150 | Strong                    |
| > 150     | Very Strong               |


# Multiparameter Models
- Every practical problem in statistics involves more than one unknown quantity.
- Assume that we have a model with two parameters $\theta_1$ and $\theta_2$. We are interested in the posterior distribution $\theta_1$ given y
- $\theta_2$ may be considered a "nuisance" parameter
- Joint posterior distribution:
  $$ p(\theta_1, \theta_2 \vert y) \propto p(y \vert \theta_1, \theta_2) p(\theta_1, \theta_2)$$
- Marginal posterior distribution:
  $$ \begin{aligned} p(\theta_1 \vert y) &= \int p(\theta_1, \theta_2 \vert y) d \theta_2 \\ &= \int p(\theta_1 \vert \theta_2, y) p(\theta_2 \vert y) d \theta_2\end{aligned}$$

# Normal with Noninformative Prior
## Normal Model with a Noninformative Prior Distribution
- Data model: $\begin{aligned}y_i &\sim N(\mu, \sigma^2), & i=1, ..., n \end{aligned}$
- Noninformative prior : $p(\mu, \sigma^2) \propto \frac{1}{\sigma^2}$
- Joint posterior distribution:
  $$\begin{aligned}
  p(\mu, \sigma^2 \vert y) & \propto \sigma^{-n -2} exp(-\frac{1}{2} \sum_{i=1}^n (y_i - \mu)^2) \\
  & \propto (\sigma^2) ^{-\frac{n}{2} -  1} exp[- \frac{1}{2 \sigma^2} \{ (n-1) S^2 + n (\bar y - \mu)^2\}]
  \end{aligned}$$
  where $S^2 = \frac{1}{n-1} \sum (y_i - \bar y)^2$ : sample variance
- Marginal posterior distribution of $\mu$
  $$
  \begin{aligned}
  p(\mu \vert y) &= \int_0^\infty p(\mu, \sigma^2 \vert y) d \sigma^2 \\
  & \propto [(n-1)S^2 + n(\bar y - \mu)^2]^{-\frac{n}{2}} \\
  & \propto [1 + \frac{n (\mu - \bar y)^2}{(n-1)S^2}]^{-\frac{n}{2}} \\
  & \sim t_{n-1} (\bar y, \frac{\sigma^2}{n}) : \text{ non-standardized t- distribution}
  \end{aligned}
  $$
- Marginal posterior distribution of $\sigma^2$
   $$\begin{aligned}
   p(\sigma^2 \vert y) & \propto \int \sigma^{-n-2} exp(-\frac{1}{2\sigma^2} [(n-1)s^2 + n(\bar - \mu)^2]) d\mu \\
   & \propto (\sigma^2)^{- \frac{n+1}{2}} exp[- \frac{(n-1)s^2}{2 \sigma^2}] \\
   & \sim IG(\frac{n-1}{2}, \frac{(n-1)s^2}{2}) = \text{ (scaled) Inverse } \chi^2(n-1, s^2)
 \end{aligned}$$
 - Conditional posterior distribution of $\mu$
   $$\begin{aligned}
   p(\mu \vert \sigma^2, y) & \propto p(y \vert \mu, \sigma^2) p(\mu \vert \sigma^2) \\
   & \propto \prod_{i=1}^n e^{-\frac{1}{2\sigma^2} (y_i - \mu)^2} \\
   & \sim N(\bar y, \frac{\sigma^2}{n})
   \end{aligned}$$
- Conditional posterior distribution of $\sigma^2$
  $$\begin{aligned}
  p(\sigma^2 \vert \mu, y) & \propto p(y \vert \mu, \sigma^2) p(\sigma^2 \vert \mu) \\
  & \propto (\sigma^2)^{-\frac{n}{2} - 1} e^{-\frac{1}{2\sigma^2} \sum(y_i - \mu)^2} \\
  & \sim IG(\frac{n}{2}, \frac{1}{2} \sum_{i=1}^n (y_i - \mu)^2)
  \end{aligned}$$

- Simulating from the joint posterior distribution
  1. Independent Simulation
    ```
    for (j in 1 :J) {
      - draw \sigma_j^2 from p(\sigma^2 \vert y)
      - draw \mu_j from p(\mu \vert y)
   }
   ```
   2. Conditional simulation
    ```
   for (j in 1 :J) {
      - draw \sigma_j^2 from p(\sigma^2 \vert y)
      - draw \mu_j from p(\mu \vert \sigma_j^2, y)
   }
   ```

- Posterior predictive distribution for a future observation
   $$ \begin{aligned}
   p(\tilde y \vert y) & = \int \int p(\tilde \vert \mu, \sigma^2, y) p(\mu, \sigma^2 \vert y) d \mu d \sigma^2 \\
   & \sim t_{n-1}(\bar y, (1 + \frac{1}{n})^{\frac{1}{2}} s)
   \end{aligned}$$



# Multinomial Model
## Multinomial Model for Categorical Data
- Binomial distribution can be generalized to allow more than two possible outcomes.
- Multinomial data : data for which each observation is one of k possible outcomes.
- Multinomial sampling distribution If $y$ is the vector of counts of the number of observations of each outcome, then
   $$ p(y \vert \theta) \propto \prod_{j=1}^k \theta_j^{y_i}$$
  where $\sum_{j=1}^k \theta_j = 1$ and $\sum_{j=1}^k y_j = n$
- Conjugate prior distribution : Dirichlet distribution

## Dirichlet Distribuiton
- Dirichlet distribution is a multivariate generalization of the Beta distribution.
  $$ \theta \sim Dirichlet(\alpha_1, ..., \alpha_k)$$
  where $\alpha_j > 0$ and $\alpha_0 \equiv \sum_{j=1}^k \alpha_j$
  - Density function
     $$ p(\theta) = \frac{\Gamma(\alpha_1 + \cdots + \alpha_k)}{\Gamma(\alpha_1) \cdots \Gamma(\alpha_k)} \theta_1^{\alpha_1 - 1} \cdots \theta_k ^{\alpha_k - 1}$$
    where $\theta_j \in [0,1]$ and $\sum_{j=1}^k \theta_j = 1$
  - Mean and Variance
    $$E(\theta_j) = \frac{\alpha_j}{\alpha_0}$$
    $$Var(\theta_j) = \frac{\alpha_j(\alpha_0 - \alpha_j)}{\alpha_0^2 (\alpha + 1)}$$
    $$Cov(\theta_i, \theta_j) = - \frac{\alpha_i \alpha_j}{\alpha_0^2 (\alpha_0 + 1)}$$
- Posterior distribution
  $$p(\theta \vert y) \sim Dirichlet (y_1 + \alpha_1, y_2 + \alpha_2, \cdots, y_k + \alpha_k)$$


# Multivariate Normal Models
## Multivariate Normal Model with Known Variance
- The baisc model considers an observable vector $y$ of $d$ components, with the multivariate normal distribution,
  $$y \vert \mu, \Sigma \sim N(\mu, \Sigma)$$
  where $\mu$ is a vector of length $d$ and $\Sigma$ is a $d \times d$ variance matrix, which is symmetric and positive definite.
- The likelihood function for a sample of n iid observations, $y_1, ..., y_n$ is
  $$\begin{aligned}
  p(y_1, ..., y_n \vert \mu, \Sigma) & \propto \vert \Sigma \vert ^{-n /2} exp(-\frac{1}{2} \sum_{i=1}^n(y_i - \mu)^T \Sigma^{-1} (y_i - \mu)) \\
  & = \vert \Sigma \vert ^{-n /2} exp(-\frac{1}{2} tr(\Sigma^{-1} S_0))
  \end{aligned}$$
  where $S_0$ is the matrix of 'sums of squares' relative to $\mu$,
  $$S_0 = \sum_{i=1}^n(y_i - \mu)(y_i - \mu)^T$$

## Conjugate Analysis
- The log-likelihood is a quadratic form in $\mu$, and therefore the conjugate prior distribution for $\mu$ is the multivariate normal distribution, $\mu \sim N(\mu_0, \Lambda_0)$.
- Posterior distribution for $\mu$ is
   $$ \mu \vert y, \Sigma \sim N(\mu_n, \Lambda_n)$$
   where
    $$\mu_n = (\Lambda_0^{-1} + n \Sigma^{-1})^{-1} (\Lambda_0^{-1} \mu_0 + n \Sigma^{-1} \bar y)$$
    $$\Lambda_n = (\Lambda_0^{-1} + n \Sigma^{-1})^{-1}$$
- $$\Rightarrow \mu \vert MVN(\mu_n, \Lambda_n)$$

## Posterior Marginal and Conditional Distribution of Subvectors of $\mu$
- It follows that the marginal posterior distribution of a subset of the parameters, $\mu^{(1)}$ says, is also multivariate normal, with mean vector equal toe the appropriate subvector of the posterior mean vector $\mu_n$ and variance matrix equal to the appropriate submatrix of $\Lambda_n$
- The conditional posterior distribution of a subset $\mu^{(1)}$ given the values of a second subset $\mu^(2)$ is multivariate normal,
   $$ \mu^{(1)} \vert \mu ^{(2)}, y \sim N(\mu^{1 \vert 2}, \Lambda^{(1 \vert 2)}$$
   where
   $$\mu^{1 \vert 2} = \mu_n^{(1)} + \Lambda_n^{(12)} (\Lambda_n^{(22)})^{-1} (\mu^{(2)} - \mu_n ^{(2)})$$
   $$\Lambda^{1 \vert 2} = \Lambda_n^{(11)} - \Lambda_n^{(12)} (\Lambda_n^{(22)})^{-1} \Lambda_n^{(21)}$$

## Posterior Predictive Distribution for New Data
- The joint distribution is the exponential of a quadratic form in $(\tilde y, \mu)$; hence $(\tilde y, \mu)$ have a joint normal posterior distribution, and so the marginal posterior distribution of $\tilde y$ is normal.
- As in the univariate case, we can determine the posterior mean and variance of $\tilde y$
   $$p(\tilde y, \mu \vert y) = p(\tilde y \vert \mu) p(\mu \vert y)$$
   $$E[\tilde y \vert y] = E[E[\tilde y \vert \mu, y] \vert \mu] = E[\mu \vert y] = \mu_n$$
   $$Var(\tilde y \vert y) = E[Var(\tilde y \vert \mu, y) \vert y] + Var[E[\tilde y \vert \mu, y] \vert y] = E[\Sigma \vert y] + Var(\mu \vert y) = \Sigma + \Lambda_n$$

 ## Noninformative Prior Density for $\mu$
 - A noninformative uniform prior density for $\mu$ is
    $$ p(\mu) \propto constant$$

- The posterior density is then proportional to the likelihood. THis is a proper posterior distribution only if $n \ge d$; otherwise the matrix $S_0$ is not full rank.
- If $n \ge d$, the posterior distribution for $\mu$, given the uniform prior density, is
  $$\mu \vert \Sigma, y \sim N(\bar y, \Sigma / n)$$

$$p(\mu \vert y) \propto exp[-\frac{1}{2} (\mu - \bar y)^T n \Sigma^{-1} (\mu - \bar y)]$$

# Hierarchical Models
## Hierarchical Models
- For instance, in a study of the effectiveness of cardiac treatments, with the patients in hospital j having survival probability $\theta_j$, it might be reasonable to expect that estimates of the $\theta_j$'s, which represent a sample of hosipitals, should be related to each other.
  - Use a prior distribution in which the $\theta_j$'s  are viewed as a sample from a common population distribution.
- The observed data, $y_{ij}$, with units indexed by $i$ within groups indexed by $j$, can be used to estimate aspectes of the population distribution of the $\theta_j$'s even though the values of $\theta_j$ are not themselves observed.
- Model hierarchically with observable outcomes modeled conditionally on certain parameters, which themselves are given a probabilistic specification in terms of further parameters, known as hyperparameters.

## General Framework
1. Likelihood function:
  $$ y_1, ..., y_n \vert \theta_1, ..., \theta_n, \phi \sim p(y_i \vert \theta_i)$$
2. Prior distribution:
  $$ \theta_1, ..., \theta_n \vert \phi \sim p(\theta_i \vert \phi)$$
3. Hyperprior distribution:
  $$ \phi \sim p(\phi)$$

## Conditional and Marginal Distributions
- Analytic derivation of condtional and marginal distributions
   1. Write the joint posterior density:
     $$p(\theta, \phi \vert y) \propto p(y \vert \theta) p(\theta \vert \phi)p(\phi)$$
   2. Determine analytically the conditional posterior density of $\theta$ given the hyperparameters $\phi$, $p(\theta \vert \phi, y)$.
   3. Obtain the marginal posterior distribution of $\phi$, $p(\phi \vert y)$.
     $$p(\phi \vert y) = \int p(\theta, \phi \vert y) d \theta$$

## Posterior Summaries
- Obtaining posterior summaries via conditional simulation
  1. Draw the vector of the hyperparameters, $\phi$, from the mgarginal posterior distribution of $\phi$, $p(\phi \vert y)$.
  2. Draw the parameter vector $\theta$ from its condtional posterior distribution, $p(\theta \vert \phi, y)$, given the drawn value of $\phi$.
  3. Draw predictive values of $y$ and $\theta$, if desired.

 # Hierarchical Binomial Model
 ## Hierarchical Binomial Model
 - Hierarchical Bayeisan Binomial Model:
    $$y_1, ..., y_n \vert \theta_1, ..., \theta_n, \alpha, \beta \overset{ind}{\sim} Binomial(n_i, \theta_i)$$
  $$\theta_1, ..., \theta_n \vert \alpha, \beta \overset{iid}{\sim} Beta(\alpha, \beta)$$
  $$p(\alpha, \beta) \propto 1$$
  where $n_i$ are assumed to be known.
- Joint posterior density
   $$p(\theta, \alpha, \beta \vert y) \propto [\prod_{i=1}^n \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha) \Gamma(\beta)} \theta_i^{y_i + \alpha - 1} (1 - \theta_i)^{n_i - y_i + \beta +1}]$$
 - Conditonal posterior density of $\theta$
    $$\begin{aligned}
  p(\theta_i \vert \alpha, \beta, \theta_{(-i)}, y) & \propto \theta_i^{y_i + \alpha - 1} (1 - \theta_i)^{n_i - y_i + \beta -1} \\
  & \sim Beta(y_i + 2, n_i - y_i + \beta)
  \end{aligned}$$
  $$\begin{aligned}
  p(\theta_1, ..., \theta_n \vert \alpha, \beta, y) & \propto \prod_{i=1}^n Beta(y_i + \alpha, n_i - y_i + \beta)
  \end{aligned}$$
- Marginal posterior density of $(\alpha, \beta)$
  $$p(\alpha, \beta \vert y) \propto \prod_{i=1}^n \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha) \Gamma(\beta)} \times \frac{\Gamma(\alpha + y_i) \Gamma(\beta + n_i - y_i)}{\Gamma(\alpha + \beta + n_i)}$$
- Conditional posterior density of $(\alpha, \beta)$
  $$p(\alpha, \beta \vert \theta_1, ..., \theta_n, y) \propto \prod_{i=1}^n [\frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha) \Gamma(\beta)} \theta_i ^{\alpha - 1}(1 - \theta_i)^{\beta - 1}]$$

# Hierarchical Poisson Model
## Hierarchical Poisson Model
 - Hierarchical Bayeisan Binomial Model:
    $$y_1, ..., y_n \vert \theta_1, ..., \theta_n, \alpha, \beta \overset{ind}{\sim} Poisson(\lambda_i)$$
  $$\lambda_1, ..., \lambda_n \vert \beta \overset{iid}{\sim} Gamma(\alpha, \beta)$$
  $$\beta \sim Gamma(c, d)$$
  where $\alpha$, $c$, $d$ are assumed to be known.
- Joint posterior density
  $$p(\lambda, \beta \vert y) \propto [ \prod_{i=1}^n (\lambda_i)^{y_i + \alpha - 1} e^{- (1 + \frac{1}{\beta} \lambda_i)}]\beta^{c - 1 - n\alpha} e^{-\frac{\beta}{\alpha}}$$
  where $n_i$ are assumed to be known.
- Conditional posterior density of $\lambda$
  $$ p(\lambda_i \vert \beta, \lambda_{(-i)}, y) \sim Gamma(y_i + \alpha, [1 + \frac{1}{\beta}]^{-1})$$
  $$ p(\lambda_1, ..., \lambda_n \vert \beta, y) \propto \prod_{i=1}^n \frac{(1 + \frac{1}{\beta})^{y_i + \alpha}}{\Gamma (y_i + \alpha)} \lambda_i^{y_i + \alpha - 1} e^{-(1 +\frac{1}{\beta})}$$

- Marginal posterior density of $\beta$
  $$ \begin{aligned}
  p(\beta \vert y) &= \int \cdots \int p(\lambda_1, ..., \lambda_n, \beta \vert y) d \lambda_1 \cdots d \lambda_n \\
  & = \frac{p(\lambda, \beta \vert y)}{p(\lambda \vert \beta, y)}
  \end{aligned}$$
- Conditional posterior density of $\beta$
  $$ \begin{aligned}
  p(\beta \vert \lambda, y) & \propto [\prod_{i=1}^n e^{-\frac{1}{\beta} \lambda_i}] \beta^{c - 1 -n\alpha} e^{-\frac{\beta}{\alpha}} \\
  & = e^{- \frac{1}{\beta} \sum \lambda_i } e^{-\frac{\beta}{\alpha}} \beta^{c - 1 - n \alpha}
  \end{aligned}$$

## Hierarchinal Normal Model
- Hierarchical Bayesian Normal Model:
  $$ y_1, ..., y_n \vert \theta_1, ..., \theta_n, \mu \overset{ind}{\sim} N(\theta_i, \sigma^2)$$
  $$ \theta_1, ..., \theta_n \vert \mu \overset{iid}{\sim} N(\mu, \tau^2)$$
  $$ p(\mu) \propto 1$$
  where $\sigma^2$ and $\tau^2$ are assumed to be known.
- Joint posterior density
  $$ \begin{aligned}
  p(\theta, \mu \vert y) &\propto e^{-\frac{1}{2\sigma^2} \sum_{i=1}^n (y_i -\theta_i)^2} e^{-\frac{1}{2 \tau^2} \sum_{i=1}^n (\theta_i -\mu)^2} \\
  &\sim N (\frac{\frac{1}{\sigma^2} y_i + \frac{1}{\tau^2} \mu}{\frac{1}{\sigma^2} + \frac{1}{\tau^2}}, [\frac{1}{\sigma^2} +\frac{1}{\tau^2}]^{-1})
  \end{aligned}$$
- Marginal posterior density of $\mu$
  $$ p(\mu \vert y) = \int \cdots \int p(\theta_1, ..., \theta_n, \mu \vert y) d \theta_1 ... d \theta_n$$
- Conditional posterior density of $\mu$
  $$ p(\mu \vert \theta, y) \sim (\bar \theta, \frac{\tau^2}{n})$$

# Monte Carlo Integration
## Numerical Integration
- Bayesian computation
  - Posterior distribution, $p(\theta \vert y)$
  - Posterior preedictive distribution, $p(\tilde y \vert y)$
- For complicated or unusual models or in high dimensions, more elaborate algorithms are required to approximate the posterior distruution.
- Numberical integration methods
  - Deterministic methos: Newton-Cotes quadrature, Romberg integration, Gaussian quadrature, etc.
  - Not appropriate for high-dimensional Bayesian problems.
  - Simulation methods : Monte Carlo integration

## Monte Carlo Integration
- Monte Carlo integration is a simple and powerful method for computing the value of complex integrals using probabilistic thecniques.
- Suppose that $\theta$ has a posterior density $p(\theta \vert y)$ and we are interested in learning about a particular function of the parameters $h(\theta)$. THe posterior mean of $h(\theta)$ is given by:
  $$ E[h(\theta) \vert y] = \int h(\theta) p(\theta \vert y) d \theta$$
- Suppose we are able to simulate an independent sample $\theta_1, ..., \theta_n$ from the posterior density. The Monte Carlo estimate at the posterior mean is given by the sample mean:
   $$ \bar h_{MC} = \frac{1}{n} \sum_{i=1}^n h(\theta_i)$$
 - The associated simulation standard error of this estimate is estimated by
    $$ SE(\bar h_{MC}) = \sqrt{\frac{\sum_{i=1}^n (h(\theta_i) - \bar h_{MC})^2}{n(n-1)}}$$

- We consider the problem of approximating the value of integrals such as $\int_a^b g(x) dx$
- Suppose that $X_i \overset{iid}{\sim} Unif[a, b]$. Then the density of $X_i$ is $f(x) = \frac{1}{b - a} I_{[a, b]} (x)$.
   $$\begin{aligned}
   \int_a^b g(x) & = (b-a) \int_a^b g(x) f(x) dx \\
   & = (b-a) E[g(X)]\\
   \approx \frac{b -a}{n} \sum_{i=1}^n g(X_i)
   \end{aligned}$$
   for sufficiently large n.

# Rejection Sampling
## Rejection Sampling
- Rejection sampling is one of the most useful methods for simulating draws from a variety of distributions.
- In many situations, the posterior doest not have a familiar form and we need to use an alternative algorithm for producing a simulated sample.
- Suppose we wish to produce an independent sample from a posterior density $p(\theta \vert y)$ where the normalizing constant may not be known.
- The first step is to find another probability density $g(\theta)$ such that:
   - It is easy to simulate draws from $g$.
   - The density $g$ resembles the posterior density of interest $p$ in terms of location and spread.
   - For all $\theta$ and a constant $M$, $p(\theta \vert y) \le M g(\theta)$
- Suppose we are able to find a density $g$ with these properties. THen, one obtains draws from $p$ using the following accept/reject algorithm:
   1. Indepdently simulate $\theta^*$ from $g$, and a uniform random variable $U$ on the unit interval.
   2. If $U \le \frac{p(\theta^* \vert y)}{M g(\theta^*)}$, then accept $\theta^*$ accept $\theta^*$ as a draw from the density p; otherwise reject $\theta^*$.
   3. Continue steps 1 and 2 of the algorithm until one has collected a sufficient number of "accepted" $\theta^*$

## Remarks
- The main task in designing a rejection sampling algorithm is finding a suitable proposal density $g$ and constant value $M$.
- The probability of accepting a candidate draw is given by $p(\theta \vert y) / (M g(\theta))$.
- One can monitor the algorithm by computing the proportion of draws of $g$ that are accepted; an efficent rejction sampling algorithm has a high acceptance rate.
- The more closely the shape of $g$ resembles that of $p$, the more efficient the sampling will be.
- A good approximate density $g$ should be roughly proportional to $p$.
- When $g$ is not nearly proportional to $p$, the bound $M$ must be set so large that almost all draws obtained in step 1 will be rejected in step 2.

# Importance Sampling
## Importance sampling
- Importance sampling is a method that is used for computing expectations using a random sample drawn from an approximation to the target distribution.
- Suppose we are interested in $E[h(\theta) \vert y]$, but we cannot generate random draws of $\theta$ from $p(\theta \vert y)$ and thus cannot evaluate the integral by a simple average of simulated values.
- Idea of importance sampling: draw the sample from a proposal distribution and re-weight the integral using importance weights so that the correct distribution is targeted.
- The normalizing constant of the posterior density $p(\theta \vert y)$ will be unknown, so the posterior mean of the function $h(\theta)$ will be given by the ratio of integrals
   $$E[h(\theta) \vert y] = \frac{\int h(\theta) p(\theta) p(y \vert \theta) d \theta}{\int p(\theta) p(y \vert \theta) d \theta}$$
- In the case where we are not able to generate a sample directly from $p$, suppose instread that we can construct a probability density $g$ that we can simulate and that approximates the posterior density $p$. We rewrite the posterior means as
   $$ \begin{aligned}
   E[h(\theta) \vert y] = \frac{\int h(\theta) w(\theta) g(\theta) d\theta}{\int w(\theta) g(\theta) d \theta}
   \end{aligned}$$
   where $w(\theta) = p(\theta) p(y \vert \theta ) /g(\theta)$ is the weight function.

 - If $\theta_1, ..., \theta_n$ are a simulated sample from the approximation density $g$, then the importance sampling estimate of the posterior mean is
    $$ \bar h_{IS} = \frac{\sum_{i=1}^n h(\theta_i) w(\theta_i)}{\sum_{i=1}^n w(\theta_i)}$$
  This is called an importance sampling estimate because we are sampling values of $\theta$ that are important in computing the integrals in the numerator and denominator.
- The simulation standard error of an importance sampling estimate is estimated by
  $$ SE(\hat h_{IS}) = \frac{\sqrt{\sum_{i=1}^n ((h(\theta_i) - \bar h_{IS}) w(\theta_i))^2}}{\sum_{i=1}^n w(\theta_i)}$$

## Remarks
- The main issue in designing a good importance sampling estimate is finding a suitable sampling density $g$.
- This density should be of a familiar functional form so simulated draws are avaiable. The density should mimic the posterior density $p$ and have relatively flat and thicker tails so that the weight function $w(\theta)$ is bounded from above.
- One can monitor the choice of $g$ by inspecting the values of the simulated weights $w(\theta_i)$. If there are no unusually large weights, then it is likely that the weight function is bounded and the importance sampler is providing a suitable estimate.

# Markov Chain Monte Carlo
## Markov Chains
- Consider a sequnce of random variables {$X^{(t)}$}, t= 0,1, ... , where each $X^{(t)}$ may equal one of a finite or countably infinite number of possible values, called states.
- The notation $X^{(t)} = j$ indicates that the process is in state j at time t.

