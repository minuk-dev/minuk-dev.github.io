---
layout  : wiki
title   : wireless 무선이동통신 수업
summary : 무선이동통신 수업 정리
date    : 2021-04-20 19:23:19 +0900
lastmod : 2021-04-21 16:38:13 +0900
tags    : [wireless, lectures]
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
     * $$F(x) = P(X \le x) = \int_{- \infty}^X f(x) dx$$

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
     * $$E[X] = \int_{-\infty}^{\infty} xf(x) dx$$
   * nth moment
     * $$E[X^n] = \int_{-\infty}^{\infty} x^n f(x) dx$$
   * nth central moment
     * $$E[(X - E[X])^n] = \int_{-\infty}^{\infty} (x - E[X])^n f(x) dx$$
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
 * where k = 0, 1, 2, ..., n; n = 0, 1, 2, ...; p is the success probability

#### Normal
 * $$f_X(x)=\frac{1}{\sqrt{2 \pi} \sigma} e^{\frac{-(x - \mu)^2}{2 \sigma ^2}}, for -\infty < x < \infty$$
 * and the cumulative distribution function can be obtained by
 * $$F_X(x) = \frac{1}{\sqrt{2 \pi} \sigma} \int_{- \infty}^{x} e ^ {\frac{- (y - \mu)^2}{2 \sigma^2}} dy$$
 * $$E[X] = \mu, and Var(X) = \sigma^2$$

#### Uniform
 * $$f_x(x) = \begin{cases} \frac{1}{b-a}, & \text{for $a \le x \le b$} \\ 0, & \text{otherwise} \end{cases}$$
 * $$F_X(x) = \begin{cases} 0, & \text{for $x < a$} \\ \frac{x-a}{b-a}, & \text{ for $a \le x \le b$} \\ 1, & \text{for $x > b$} \end{cases}$$
 * $$E[X] = \frac{a+b}{2}, \text{ and } Var(X) = \frac{(b-a)^2}{12}$$

#### Exponential
 * $$f_X(x) = \begin{cases} 0, & $x<0$ \\ \lambda e^{-\lambda x}, & \text{for $0 \le x < \infty$} \end{cases}$$
 * $$F_X(x) = \begin{cases} 0, & $x<0$ \\ 1 - e^{- \lambda x}, & \text{for $0 \le x < \infty$}$$
 * $$E[X] = \frac{1}{\lambda}$$
 * $$Var(X) = \frac{1}{\lambda ^ 2}$$

### Multiple Random Variables
 * There are cases whter the result of one experiment determines the values of several random variables
 * The joint probabilities of these variables are:
   * Discreate variables:
     * $$p(x_1, ..., x_n) = P(X_1 = x_1, ..., X_n = x_n)$$
   * Continuous variables:
     * cdf : $$F_{x_1, x_2, ..., x_n}(x_1, ..., x_n) = P(X_1 \le x_1, ..., X_n \le x_n)$$
     * pdf : $$f_{X_1, X_2, ..., X_n}(x_1, ..., x_n) = \frac{\partial^n F_{X_1, ..., X_n}(x_1, ..., x_n)}{\parital x_1 \partial x_2 ... \partial x_n}$$

### Indpendence and Conditional Probability
 * Independence : The random variables are said to be independent of each other when the occurrence of one does not affect the other. The pmf for discrete random variables in such a case is given by:
     * $$p(x_1, x_2, ..., x_n) = P(X_1 = x_1)P(X_2=x_2) \cdots P(X_n = x_n)$$
   * and for continous random variables as:
     * $$F_{X_1, X_2, ..., X_n} = F_{X_1}(x_1)F_{X_2}(x_2) \cdots P(X_n = x_n)$$

 * Conditional probability : is the probability that $$X_1 = x_1$$ given that $$X_2 = x_2$$. Then for discrete random variables the probability becomes:
   * $$P(X_1 = x_1 | X_2 = x_2, ... , X_n = x_n) = \frac{P(X_1 = x_1, X_2 = x_2, ..., X_n = x_n)}{P(X_2 = x_2, ..., X_n = x_n)}$$
 * and for continous random variables it is:
   * $$P(X_1 \le x_1 | X_2 \le x_2 , ... , X_n \le x_n) = \frac{X_1 \le x_1, X_2 \le x_2, ..., X_n \le x_n}{P(X_2 \le x_2, ... , X_n \le x_n)}$$

### Bayes Theorem
 * A theorem concerning conditional probabilities of the form P(X | Y) (read: the proability of X, given Y) is:
   * $$P(X|Y) = \frac{P(Y|X)P(X)}{P(Y)}$$
   * where P(X) and P(Y) are the unconditional probabilities of X and Y respectively.

### Importatnt Properties of Random Variables
 * Sum property of the expected value:
   * Expected value of the sum of random variables:
     * $$E[\sum_{i=1}^n a_i X_i] = \sum_{i=1}^n a_iE[X_i]$$
 * Product property of the expected value:
   * Expected value of product of stochastically independent random variables:
     * $$E[\prod_{i=1}^n X_i] = \prod_{i=1}^n E[X_i]$$
 * Sum property of the variance:
   * Variance of the sum of random variables is:
     * $$Var[\sum_{i=1}^n a_iX_i] = \sum{i=1}^n a_i^2 Var(X_i) + 2 \sum_{i=1}^{n-1} \sum_{j=i+1}^n a_i a_j cov[X_i, X_j]$$
     * where $$cov[X_i, X_j]$$ is the covariance of random variables $$X_i$$ and $$X_j$$ and
     * $$cov[X_i, X_j] = E[(X_i-E[X_i])(E_j - E[X_j) \\ = E[X_i X_j] - E[X_i]E[X_j]$$
 * If random variables are independent of each other, i.e., $$cov[X_i, X_j] = 0$$, then
   * $$Var(\sum_{i=1}^n a_i X_i) = \sum_{i=1}^n a_i^2 Var(X_i)$$

### Central Limit Theorem
 * The Central Limit Theorem states that whenever a random sample ($$X_1, X_2, ..., X_n$$) of size n is taken from any distribution with expected value $$E[X_i] = \mu$$ and variance $$Var(X_i) = \sigma^2$$, where i=1, 2, ..., n, then their arithmetic mean is defined by:
   * $$S_n = \frac{1}{n} \sum_{i=1}^{n} X_i$$

 * The sample mean is approximated to a normal distribution with:
   * $$E[S_n] = \mu$$ and $$Var(S_n) = \sigma^2 /n $$
 * The larger the value of the sample size n, the better the approximation to the normal.
 * This is very useful when inference between signals needs to be considered.

## Queueing Theory
### Poisson Arrival Model
 * A Possion process is a sequence of events randomly spaced in time.
 * For example, customers arriving at a bank and Geiger counter clicks are similar to packets arriving at a buffer.
 * The rate $$\lambda$$ of a Possion process is the average number of events per unit time(over a long time).

### Properties of a Poisson Process
 * Properties of a Poisson process
   * For a time interval [0, t), the probability of n arrivals in t units of time is:
     * $$P_n(t) = \frac{(\lambda t)^n}{n!}e^{-\lambda t}$$
   * For two disjoint (non overlapping) intervals (t1, t2) and (t3, t4), the number of arrivals in (t1, t2) is independent of arrivals in (t3, t4).

### Interarrival Times of Poisson Process
 * Interarrival times of a Possion process
   * We pick an arbitrary starting point $$t_0$$ in time. Let $$T_1$$ be the time until the next arrival. We have
     * $$P(T_1 > t) = P_0 (t) = e^{-\lambda t}$$
   * Thus the distribution function of $$T_1$$ is given by
     * $$F_{T_1} (t) = P(T_1 \le t) = 1 - e ^ {- \lambda t}$$
 * The pdf of $$T_1$$ is given by:
   * $$f_{T_1} (t) = \lambda e^{- \lambda t}$$
   * Therefore, $$T_1$$ has an exponential distribution with mean rate $$\lambda$$.

### Memoryless and Merging Properties
 * Memoryless property:
   * A random variable X has the property that "the future is independent of the past". i.e., the fact taht it hasn't happened yet, tells us nothing about how much longer it will take before it does happen.
     * $$P(X > \delta +t | X > \delta) = P(X > t)$$
 * Merging property:
   * If we merge n Possion processes with distributions for the inter arrival times
     * $$1 - e^{- \lambda i t}$$,
     * where i = 1, 2, ..., n

 * into one single process, then the result is a Possion process for which the inter arriavl times have the distribution $$1 - e^{-\lambda t}$$ with mean
   * $$\lambda = \lambda_1 + \lambda_2 + ... + \lambda_n$$

### Basic Queuing Systems
 * What is queuing theory?:
   * Queuing theory is the study of queues(sometimes called waiting lines).
   * Can be used to describe real world queues, or more abstract queues, found in many branches of computer science, such as operating systems and networks.
 * Basic queuing theory
   * Queuing theory is divided into 3 main sections:
     * Traffic flow
     * Scheduling
     * Facility design and employee allocation

### Kendall's Notation
 * D.G. Kendall in 1951 propsed a standard notation for classifying queuing systems into different types.
 * Accordingly the systems were described by the notation A/B/C/D/E where:
   * A : Distribution of inter arrival times of customers
   * B : Distribution of service times
   * C : Number of servers
   * D : Maximum number of customers in the system
   * E : Calling population size

 * A and B can take any of the following distributions types:
   * M : Exponential distribution (Markovian)
   * D : Degenerate (or deterministic) distribution
   * $$E_k$$ : Erlang distribution (k = shape parameter)
   * $$H_k$$ : Hyper expoential with parameter k

### Little's Law
 * Assuming a queuing environment to be operating in a stable steady state where all initial transients have vanished, the key parameters characterizing the system are:
   * $$\lambda$$ - the mean steady state consumer arrival
   * $$N$$ - the average no. of customers in the system
   * $$T$$ - the mean time spent by each customer in the system which gives:
     * $$N = \lambda T$$

### Markov Process
 * A Markov process is one in which the next state of the process depends only on the present state, irrespective of any previous states taken by the process.
 * The knowledge of the current state and the transition probabilties from this state allows us to predict the next state.

### Birth-Death Process
 * Special type of Markov process
 * Often used to model a population (or, no.of jobs in a queue).
 * If, at some time, the population has n entities (n jobs in a queue), then birth of another entity (arrival of another job) causes the state to change to n + 1.
 * On the other hand, a death(a job removed from the queue for service) would cause the state to change to n-1.
 * Any state transitions can be made only to one of the two neighboring states.

### State Transition Diagram
 * The state transition diagram of the continuous birth-death process.

### M/M/1/inf or M/M/1 Queuing System
 * When a customer arrives in this system it will be served if the server is free. Otherwise the customer is queued.
 * In this system customers arrive according to a Poisson distribution and compete for the service in a FIFO (first in first out) manner.
 * Service tiems are independent identically distributed (IID) random variables, the common distribution being exponential.

### Queuing Model and State Transition Diagram
 * The M/M/1/inf queuing model
 * The state transition diagram of the M/M/1/inf queuing system

### Equilibrium State Equations
 * If mean arrival rate is $$\lambda$$ and mean service rate is $$\mu$$, i = 0, 1, 2, .. be the number of customers in the system and P(i) be the state probability of the system having i customers.
 * From the state transition diagram, the equilibrium state equations are given by:
   * $$\lambda P(0) = \mu P(1), i=0$$
   * $$(\lambda + \mu) P(i) = \lambda P(i-1) + \mu P(i + 1), i \ge 1$$

### Traffic Intensity
 * We know that the P(0) is the probability of server being free. Since P(0) > 0, the necessary condition for a system being in steady state is,:
   * $$\rho = \frac{\lambda}{\mu} < 1$$
 * This means taht the arrival rate cannot be more than the service rate, otherwise an infinite queue will form and jobs will experience infinite service time.

### Queuing System Metrics
 * $$\rho = 1 - P(0)$$, is the probability of the server being busy. Therefore, we have
   * $$P(i) = \rho^i (1 - \rho)$$
 * The average number of customers in the system is
   * $$L_s = \frac{\lambda}{\mu - \lambda}$$
 * The average dwell time of customers is
   * $$W_s = \frac{1}{\mu - \lambda}$$

### Queuing System Metrics
 * The average queuing length is
   * $$L_q = \sum_{i=1}^{\infty} (i-1) P(i) = \frac{\rho^2}{1 - \rho} = \frac{\lambda ^ 2}{\mu(\mu-\lambda)}$$
 * The average waiting time of customers is
   * $$W_q = \frac{L_q}{\lambda} = \frac{\rho ^ 2}{\lambda(1 - \rho)} = \frac{\lambda}{\mu(\mu - \lambda)}$$
 * The average number of customers in the system is
   * $$L_s = \sum_{i=0}{\infty} i P(i) = \alpha + \frac{\rho \alpha ^ S P(0)}{S! (1 - \rho)^2}$$
 * The average number dwell time of a customer in the system is given by
   * $$W_S = \frac{L_S}{\lambda} = \frac{1}{\mu} + \frac{\alpha^S P(0)}{S_{\mu} S! (1 - \rho)^2}$$

### M/G/1/inf Queuing Model
 * We consider a single server queuing system whose arrival process is Poisson with mean arrival rate $$\lambda$$.
 * Service times are independent and identically distributed with distribution function $$F_B$$ and pdf $$f_b$$.
 * Jobs are scheduled for service as FIFO.

### Basic Queuing Model
 * Let N(t) denote the number of jobs in the system (those in queue plus in service) at time t.
 * Let $$t_n$$ (n = 1, 2, ...) be the time of departure of the nth job and $$X_n$$ be the number of jobs in the system at time $$t_n$$ so that:
   * $$X_n = N(t_n), \text{for n = 1, 2, ...}$$
 * The stochastic process can be modeled as a discrete Markov chain known as imbedded Markov chain, which helps convert a non-Markovian problem into a Markovian one.

### Queuing System Metrics
 * The average number of jobs in the system, in the steady state is:
   * $$E[N] = \rho + \frac{\lambda^2 E[B^2]}{2(1-\rho)}$$
 * The average dwell time of customers in the system is:
   * $$W_s = \frac{E[N]}{\lambda} = \frac{1}{\mu} + \frac{\lambda E[B^2]}{2(1-\rho)}$$
 * The average waiting time of customers in the queue is:
   * $$E[N] = \lambda W_q + \rho$$
 * Average wiating time of customers in the queue is:
   * $$W_q = \frac{\lambda E[B^2]}{2(1-\rho)}$$
 * The average queue length is:
   * $$L_q = \frac{\lambda^2E[B^2]}{2(1-\rho)}$$

## Fourier Transform
### Dirac Delta Function
 * The dirac delta function can be loosely thought of as a function on the real line which is zero everywhere except at the origin, where it is infinite:
   * $$\delta(x) = \begin{cases} \infty, & x = 0 \\ 0, & x \not = 0 \end{cases}$$
 * and which is also constrained to satisfy the identity:
   * $$\int_{-\infty}^{\infty} \delta (x) dx = 1$$
 * An important property:
   * $$\int_{-\infty}^{\infty} f(x) \delta(x) dx = f(0)$$
   * where f is a suita ble test function.

### Unit Step Function
 * Unit Step funciton is defined by:
   * $$u(t) = \begin{cases} 1, & t > 0 \\ 1/2, & t = 0 \\ 0, & t < 0 \end{cases}$$

### Sinc Function
 * Sinc Function is defined by:
   * $$sinc(x) = \frac{sin(\pi x)}{\pi x}$$
   * For all x except x = 0. For x = 0, sinc(0) = 1

### Rectangular Function
 * Rectangular funciton is defined by
   * $$rect(t) = \sqcap(t) = \begin{cases} 0 & if |t| > \frac{1}{2} \\ \frac{1}{2} & if |t| = \frac{1}{2} \\ 1 & if |t| < \frac{1}{2} \end{cases}$$

### Triangular Function
 * Triangular Function is defined by
   * $$tri(t) = \wedge (t) = \begin{cases} 1 - |t|; & |t| < 1 \\ 0 & otherwise \end{cases}$$

### LTI System
 * LTI (Linear Time Invariant) system is the system satisfies the following two:
   * Linearity:
     * If the input to the system is the sum of two component signals:
       * $$x(t) = x_1(t) + x_2(t)$$
     * then the output of the system will be $$y(t) = y_1(t) + y_2(t)$$ where $$y_n(t)$$ is the output resulting from the sole input $$x_n(t)$$
     * Formally, a linear system is a system which exhibits the following property:
       * if the input of the system is $$x(t) = \sum_{n} c_n x_n(t)$$
       * then the output of the system will be $$y(t) = \sum_{n} c_n y_n(t)$$ for any constants $$c_n$$ and where each $$y_n(t)$$ is the output resulting from the sole input $$x_n(t)$$
   * Time-Invariance:
     * means that whether we apply an input to the system now of T seconds from now, the output will be identical except for a time delay of the T seconds.
     * If the output due to input x(t) is y(t), then the output due to input x(t - T) is y(t - T). More specifically, an input affected by a time delay should effect a corresponding time delay in the output, hence time-invariant.
   * Impulse Response h(t):
     * Is the response of the system to a unit impulse input $$\delta (t)$$
     * $$h(t) = LTI[\delta(t)]$$
   * Very Important Result:
     * $$y(t) = LTI[x(t)] \\ = LTI[x(t) * \delta(t)] \\ = LTI[\int_{-\infty}^{\infty} x(\tau)\delta(t - \tau) d \tau] \\ = \int_{-\infty}^{\infty} x(\tau) LTI[\delta(t - \tau)] d \tau \\ = \int_{-\infty}^{\infty} x(\tau)h(t - \tau) d \tau \\ = x(t)*h(t)$$
     * 여기서 적분을 LTI 밖으로 꺼낼 수 있는 것은 Linearity, $$LTI[\delta(t-\tau)]$$ 를 계산할수 있는 것은 Time-invariant 때문이다.

### Taylor Series
 * Definition:
   * The Taylor series of a function f that is differentiable in a neighborhood of a, is the power series:
     * $$f(a) + \frac{f'(a)}{1!} (x - a) + \frac{f''(a)}{2!} (x - a)^2 + \frac{f^{(3)}(a)}{3!} (x - a)^3 + \cdots$$
   * Thus, we can say:
     * $$e^x = \sum_{n = 0}^{\infty} \frac{x^n}{n!} \text{for all x}$$
     * $$cos x = \sum_{n = 0}^{\infty} \frac{(-1)^n}{(2n)!} x^{2n} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots \text{for all x}$$
     * $$sin x = \sum_{n = 0}^{\infty} \frac{(-1)^n}{(2n + 1)!} x^{2n + 1} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots \text{for all x}$$
 * Euler's Formula:
   * $$e^{ix} = cos(x) + i sin(x)$$
   * since:
     * $$e^{iz} = 1 + iz + \frac{(iz)^2}{2!} + \frac{(iz)^3}{3!} + \cdots \\ = 1 + iz - \frac{z^2}{2!} - \frac{iz^3}{3!} + \cdots \\ = (1 - \frac{z^2}{2!} + \frac{z^4}{4!} - \cdots) + i (z - \frac{z^3}{3!} + \frac{z^5}{5!} - \cdots ) \\ = cos(z) + i sin(z)$$
 * The Fourier transform of a funciton x is defined by $$X(f) = \int_{- \infty}^{\infty} x(t) e ^{-i 2 \pi f t} dt, \text{ for } f$$.
 * When the idependent variable t represents time (with unit of seconds), the transform variable f represents frequecy (in hertz).
 * If x is a continuous function, then it can be reconstructed from x by the inverse transform:
   * $$x(t) = \int_{-\infty}{\infty} X(f) e^{i 2 \pi f t} df, \text{ for } t$$
 * Note that a symbol of a Fourier transform is capitalized.

### Fouerier Transform Properties
 * $$\mathcal{F}(a g(t) + b h(t)) = a G(f) + b H(f)$$ : Linearity
 * $$\mathcal{F}(g(t - a)) = e^{- i 2 \pi a f}G(f)$$ : Shift in time
 * $$\mathcal{F}(e^{iat} g(t)} = G(f - \frac{a}{2 \pi})$$ : Shift in frequency
