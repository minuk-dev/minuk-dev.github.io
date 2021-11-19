---
layout  : wiki
title   : 베이지안 통계학(Bayesian Statistics)
summary : 
date    : 2021-10-03 19:46:55 +0900
lastmod : 2021-11-20 02:39:13 +0900
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
