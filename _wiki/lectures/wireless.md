---
layout  : wiki
title   : wireless 무선이동통신 수업
summary : 무선이동통신 수업 정리
date    : 2021-04-20 19:23:19 +0900
lastmod : 2021-06-04 07:10:19 +0900
tags    : [wireless, lectures]
parent  : lectures
---

## NS3
 * [[ns3]]

## 정보통신기술용어 해설 정리
 * 정보통신기술용어
## Theory
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
 * $$F_X(x) = \begin{cases} 0, & $x<0$ \\ 1 - e^{- \lambda x}, & \text{for $0 \le x < \infty$} \end{cases} $$
 * $$E[X] = \frac{1}{\lambda}$$
 * $$Var(X) = \frac{1}{\lambda ^ 2}$$

### Multiple Random Variables
 * There are cases whter the result of one experiment determines the values of several random variables
 * The joint probabilities of these variables are:
   * Discreate variables:
     * $$p(x_1, ..., x_n) = P(X_1 = x_1, ..., X_n = x_n)$$
   * Continuous variables:
     * cdf : $$F_{x_1, x_2, ..., x_n}(x_1, ..., x_n) = P(X_1 \le x_1, ..., X_n \le x_n)$$
     * pdf : $$f_{X_1, X_2, ..., X_n}(x_1, ..., x_n) = \frac{\partial^n F_{X_1, ..., X_n}(x_1, ..., x_n)}{\partial x_1 \partial x_2 ... \partial x_n}$$

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
 * A theorem concerning conditional probabilities of the form $$P(X | Y)$$ (read: the proability of X, given Y) is:
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
   * $$L_s = \sum_{i=0}^{\infty} i P(i) = \alpha + \frac{\rho \alpha ^ S P(0)}{S! (1 - \rho)^2}$$
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
 * $$\mathcal{F}(e^{iat} g(t)) = G(f - \frac{a}{2 \pi})$$ : Shift in frequency
 * $$\mathcal{F}(g(at)) = \frac{1}{|a|} G(\frac{f}{a})$$ : Widening in time makes narrowing in frequency, or vice versa
 * $$\mathcal{F}(G(t)) = g(-f)$$ : Duality property
 * $$\mathcal{F}(\frac{d^n g(t)}{d t^n}) = (i 2 \pi f)^n G(f)$$
 * $$\mathcal{F}(t^n g(t) = (\frac{i}{2 \pi}) ^n \frac{d^n G(f)}{df^n}$$
 * $$\mathcal{F}((g * h)(t)) = G(f)H(f)$$
 * $$\mathcal{F}(g(t)h(t)) = (G*H)(f)$$

 * Fourier Transform of $$f(t) e^{i 2 \pi f_0 t}$$:
   * $$F(f + f_0)$$ 이므로 $$e^{i 2 \pi f_0 t}$$ 를 원함수에 곱한다는 것은 주파수 영역에서 $$f_0$$만큼 평행이동한다는 것을 의미한다.
   * 이때 $$e^{i 2 \pi f_0 t} = cos(2 \pi f_0 t)$$ 이기 때문에, 아래 식 또한 같은 의미를 가진다.
   * $$f(t) cos(2 \pi f_0 t)$$

### Fourier Transform of Various Function
 * $$\mathcal{F}(rect(at)) = \frac{1}{|a|} sinc(\frac{f}{a})$$
 * $$\mathcal{F}(sinc(at)) = \frac{1}{|a|} rect(\frac{f}{a})$$
 * $$\mathcal{F}(sinc^2(at)) = \frac{1}{|a|} tri(\frac{f}{a})$$
 * $$\mathcal{F}(tri(at)) = \frac{1}{|a|} sinc^2 (\frac{f}{a})$$
 * $$\mathcal{F}(e^{- \alpha t^2}) = \sqrt{\frac{\pi}{\alpha}} e^{-\frac{(\pi f)^2}{\alpha}}$$
 * $$\mathcal{F}(e^{i \alpha t^2}) = \sqrt{\frac{\pi}{\alpha}} e^{-i \frac{\pi ^2 f ^2}{\alpha} - \frac{\pi}{4}}$$
 * $$\mathcal{F}(cos(at^2)) = \sqrt{\frac{\pi^2 f^2}{a} cos(\frac{\pi^2 f^2}{a} - \frac{\pi}{4})}$$
 * $$\mathcal{F}(sin(at^2)) = -\sqrt{\frac{\pi^2 f^2}{a} sin(\frac{\pi^2 f^2}{a} - \frac{\pi}{4})}$$
 * $$\mathcal{F}(e^{-a |t|}) = \frac{2 a}{a^2 + 4 \pi^2 f ^2}$$
 * $$\mathcal{F}(\frac{1}{\sqrt{|t|}}) = \frac{1}{\sqrt{|f|}}$$
 * $$\mathcal{F}(1) = \delta (f)$$
 * $$\mathcal{F}(\delta (t)) = 1$$
 * $$\mathcal{F}(e^{iat}) = \delta (f - \frac{a}{2 \pi })$$
 * $$\mathcal{F}(cos(at)) = \frac{\delta (f - \frac{a}{2 \pi}) + \delta (f + \frac{a}{2 \pi})}{2}$$
 * $$\mathcal{F}(sin(at)) = i \frac{\delta (f + \frac{a}{2 \pi}) + \delta (f - \frac{a}{2 \pi})}{2}$$
 * $$\mathcal{F}(t^n) = (\frac{i}{2 \pi})^n \delta^{(n)} (f)$$
 * $$\mathcal{F}(\frac{1}{t^n}) = -i \pi \frac{(-i 2 \pi f)^{n - 1}}{(n-1)!} sgn(f)$$
 * $$\mathcal{F}(sgn(t)) = \frac{1}{i \pi f}$$
 * $$\mathcal{F}(u (t)) = \frac{1}{2} (\frac{1}{i \pi f} + \delta (f))$$
 * $$\mathcal{F}(e^{- at} u(t)) = \frac{1}{a + i 2 \pi f}$$
 * $$\mathcal{F}(\sum_{n = - \infty}^{\infty} \delta (t - n T)) = \frac{1}{T} \sum_{k = - \infty}^{\infty} \delta(f - \frac{k}{T})$$

## Chapter 3. Radio Propagation, Sampling & Quantization
### Information, Signals, and Communications
 * Goal of communication is to deliver (send, transmit) information from a source to a destination
 * AWGN(Additive whit Gaussian noise) : is a baisc noise model used in information theory to mimic the effect of many raondom processes that occur in nature.:
   * Additive becuase it is added to any noise that might be intrinsic to the information system.
   * White refers to the idea that it has uniform power across the frequency band for the information system. It is an analogy to the color white which has uniform emissions at all frequencies in the visible spectrum.
   * Gaussian because it has a normal distribution in the time domain with an average time domain value of zero.

### Radio Frequency Bands
| Classification Band | Initials | Frequency Range    | Characteristics |
| ------------------- | -------- | ---------------    | --------------- |
| Extremely low       | ELF      | < 300 Hz           | Ground wave     |
| Infra low           | ILF      | 300 Hz ~ 3 kHz     | Ground wave     |
| Very low            | VLF      | 3kHz ~ 30 kHz      | Ground wave     |
| Low                 | LF       | 30 kHz ~ 300 kHz   | Ground wave     |
| Medium              | MF       | 300 kHz ~ 3 MHz    | Ground/Sky      |
| High                | HF       | 3 MHz ~ 30 MHz     | Sky wave        |
| Very high           | VHF      | 30 MHz ~ 300 MHz   | Space wave      |
| Ultra high          | UHF      | 300 MHz ~ 3 GHz    | Space wave      |
| Super high          | SHF      | 3 GHz ~ 30 GHz     | Space wave      |
| Extremely high      | EHF      | 30 GHz ~ 300 GHz   | Space wave      |
| Tremendously high   | THF      | 300 GHz ~ 3000 GHz | Space wave      |

### Propagation Mechanisms
 * Reflection:
   * Propagtation wave impinges on an object which is large as compared to wavelength
 * Diffraction:
   * Radio path between transmitter and receiver obstructed by surface with sharp irregular edges.
 * Scattering:
   * Objects smaller than the wavelength of the propagtion wave

### Free-space Propagation
 * The recieved signal power at distance d:
   * $$P_r = \frac{A_e G_t P_t}{4 \pi d^2}$$
   * where $$P_t$$ is transmitting power, $$A_e$$ is effective area, and $$G_t$$ is the transmitting antenna gain. Assuming that the radiated power is uniformly distributed over the surface of the sphere.

### Antenna Gain
 * For a circular reflector antenna:
   * $$ G = \eta ( \pi D / \lambda)^2$$
   * where $$\eta$$ is net efficiency (depends on the electric field distribution over the antenna aperture, losses, ohmic heating, typically 0.55) and $$D$$ is diameter
   * thus $$G = \eta (\pi D f / c)^2, c = \lambda f$$

### Land Propagation
 * The received signal power:
   * $$P_r = \frac{G_t G_r P_t}{L}$$
   * where $$G_r$$ is the receiver antenna gain, $$L$$ is the propagation loss in the channel
   * $$L = L_p L_S L_F$$
   * where $$L_p$$ is path loss, $$L_S$$ is Slow fading, and $$L_F$$ is Fast fading

### Path Loss (Free-space)
 * Definition of path Loss $$L_p$$:
   * $$L_P = \frac{P_t}{P_r}$$
 * Path Loss in Free-space:
   * $$L_{PF}(dB) = 32.45 + 20 log_{10} f_c(MHz) + 20 log_{10} d (km)$$
   * where $$f_c$$ is teh carrier frequency. This shows greater than $$f_c$$, more is the loss.

### Path Loss (Land Propagation)
 * Simplest Formula:
   * $$L_p = Ad^{-\alpha}$$
   * where $$A$$ and $$ \alpha$$ : propgation constants
   * $$d$$ : distance between transmitter and receiver
   * $$\alpha$$ : value of 3 ~ 4 in typical urban area

### Path Loss
 * Path loss in decreasing order:
   * Urban area > Urban area(medium and small city) > Suburban area > Open area

### Slow Fading
 * The long-term variation in the mean level is known as slow fading (shadowing or long-normal fading)_. This fading caused by shadowing.
 * Log-normal distribution :
   * The pdf of the received signal level is given in decibels by:
     * $$p(M) = \frac{1}{\sqrt{2 \pi} \sigma} e^{- \frac{(M - \bar M)^2 }{2 \sigma^2}}$$
     * where M is the treue received signal level m in decibels,
     * $$\bar M$$ is the area average signal level
     * $$\sigma$$ the standard deviation in decibels

### Fast Fading
 * The signal from the transmitter may be reflected from objects such as hills, buildings, or vehicles.
 * When LOS does not exist, the envelope distribution of received signal is Rayleigh distribution.
 * The pdf is:
   * $$p(r) = \frac{r}{\sigma^2} e ^{- \frac{r^2}{2 \sigma^2}}, r > 0 $$
   * where $$\sigma$$ is the standard deviation.
   * Middle value $$r_m$$ of evelope signal within sampe range to be satisfied by $$P(r \le r_m) = 0.5$$
   * We have $$r_m = 1.777 \sigma$$
 * It called Reyleigh Distribution

 * When LOS exists, the envelope distribution of received signal is Rician distribution. The pdf is:
   * $$ p(r) = \frac{r}{\sigma^2} e ^{- \frac{r^2 + \alpha ^ 2}{2 \sigma^2}} I_0 (\frac{r \alpha}{\sigma}), r \ge 0$$
   * where $$\sigma$$ is the standard deviation,
   * $$I_0(x)$$ is the zero-order Bessel function of the first kind.
 * When $$\alpha = 0$$, Rician Distribution are equal to Rayleigh Distribution

### Characteristics of Instantaneous Amplitude
 * Level Crossing Rate:
   * Average number of times per second that the signal envelope crosses the level in positive going direction
 * Fading Rate:
   * Number of times signal evelope crosses middle value in positive going direction per unit time.
 * Fading Duration:
   * Time for which signal is below given threshold.

### Doppler Shift
 * Doppler Effect : When a wave source and a receiver are moving towards each other, the frequency of the received signal will not be the same as the source.:
   * When they are moving toward each other, the frequency of the received signal is higher than the source.
   * When they are opposing each other, the frequency decreases.
 * Thus the frequency of the received signal is:
   * $$f_R = f_C - f_D$$
   * where $$f_C$$ is the frequency of source carrier,
   * $$f_D$$ is the Doppler frequency.
* $$f_D = \frac{v}{\lambda} cos \theta$$
* where $$v$$ is the moving speed, $$\lambda$$ is the wavelength of carrier.

### Delay Spread
 * When a signal propagates from a transmitter to a receiver, signal suffers one or more reflections.
 * This forces signal to follow different paths.
 * Each path has different path length, so the time of arrival for each path is different.
 * This effect which spreads out the signal is called "Delay Spread".

### Intersymbol Interference (ISI)
 * Caused by time delayed multipath signals
 * Has impact on burst error rate of channel
 * Second multipath is delayed and is received during next symbol
 * Second multipath is delayed and is received during next symbol
 * For low bit-error-rate (BER):
   * $$ R < \frac{1}{2 \tau_d}$$
   * R(digital transmission rate) limited by delay spread.

### Digital Communications
### General Structure of a Communication Systems
 * Source -(info) -> Transmitter -(Transmitted signal) -> Channel -(Recieved signal) -> Receiver - (Received info) -> Destination

### Digital versus Analog
 * Regnerator receiver
 * Diffrent kinds of digital signal are treated identically.

### Advantages of Digital Communications over Analog
 * Digital signals are more easily regenerated.
 * Extremely low error rates producing high signal fidelity are possible through error detection & correction.
 * Easy availability of digital circuits & u-processors.
 * Multiplexing & switching is easier
 * Much data (e.g., computers) is inherently digital.

### Formatting and Transmission of Signal
 * Analog Info -> Sample -> Quantize -> Encode -> Pulse Moduolated -> Transmitted.
 * Textual Info -> Encode -> Pulse Modulate -> Transmitted.
 * Digital Info -> Pulse Modulate -> Transmitted.
 * Received Data -> Demodulate/Detect -> Decode -> Low-pass filter -> Analog Info
 * Received Data -> Demodulate/Detect -> Decode -> Textual info
 * Received Data -> Demodulate/Detect -> Digital info.

### Sampling
### Sampling of Analog Signal
 * Time domain 에서는 연속적인 데이터를 잘라서 샘플링 한다.
 * 이는 Frequency Domain 에서는 하나의 함수를 중복해서 반복시키는 것 (frequency 영역에서 주기를 가지는 delta 함수와 convolution) 과 동일한 의미이다.
 * 다시말해서 주파수 영역에서 반복되는 함수를 찾아서 시간 영역으로 옮기면 원 함수를 추출할수 있다고 할 수 있다.
 * 이때 하나의 고유값이 나오게 된다.(Nyquist rate) 바로 아래에서 추가 설명한다.

### Aliasing effect & Nyquist Rate
 * 도메인 영역에서 반복되는 함수를 추출하기 위해서 필터를 씌우는데 이를 LP filter 라고 한다.
 * 원함수의 정의역의 최솟값($$-f_m$$)과 최댓값($$f_m$$)이라고 할때 LP filter의 최소 크기를 Nyquist rate 라고 하며 $$f_s = 2f_m$$ 이다.
 * 이보다 작게 된다면 aliasing 이 일어나게 된다.

### Sampling Theorem
 * Sampling theorm: A bandlimited signal with no spectral components beyond $$f_m$$, can be uniquely determined by values sampled at uniform intervals of $$T_s \le \frac{1}{2 f_m}$$
 * The samplign rate:
   * $$f_s = \frac{1}{T_S} = 2 f_m$$
   * is called Nyquist rate.

### Quantization
 * Amplitutde quantizing : Mpaaing samples of a continuous amplitude waveform to a finite set of amplitudes.
 * Average quantization noise power:
   * $$\sigma^2 = \frac{q^2}{12}$$
 * Signal peak power:
   * $$V_p^2 = \frac{L^2 q^2}{4}$$
 * Signal power to average quantization noise power:
   * $$(\frac{S}{N})_q = \frac{V_p^2}{\sigma^2} = 3 L^2$$

### PCM
  * A uniform linear quantizer is called Pualse Code Modulation (PCM) from the Pulse Modulated (PAM) Signal.
  * Pulse code modulation (PCM) : Encoding the quantized signals into a digital word(PCM word or codeword)
    * $$ k = log_2 L$$

### Quantization error
 * Quantizing error : The difference between the input and output of a qunatizer

### Non-uniform quantization
 * It is done by uniformly quantizing the "compressed" signal.
 * At the receiver, an inverse compression characteristic, called "expansion" is employed to avoid signal distortion.
 * compression + expansion -> companding

### Baseband transmission
 * To transmit information thru physical channels, PCM sequences (codewords) are transformed to pulses (waveforms).:
   * Each waveform carries a symbol from a set of size M.
   * Each transmit symbol represents $$m=log_2M$$ bits of the PCM words.
   * PCM waveforms (line codes) are used for binary symbols (M=2).
     * Here, consider PCM and PAM are interchangeable.
 * M-ary pulse modulation are used for non-binary symbols(M > 2):
   * For a given rate, M-ary PAM (M>2) requires less bandwidth than binary PCM.
   * For a given average pulse power, binary PCM is easier to detect than M-ary PAM(M > 2).
 * Assuming real time Tx and euqal energy per tx data bit for binary-PAM and 4-ary PAM:
   * 4-ary: T=2T_b and Binary : T= T_b
   * Energy per symbol in binary-PAM: A^2 = 10 B^2

## Chapter 4, 7
## Source and Channel Coding
 Source - Info -> Transmitter (Formatter -> Source encoder -> Channel encoder -> modulator -> Multiplexer) - Transmitted signal -> Channel (With noise) - Received Signal -> Receiver(Demultiplexer -> Demodulator -> Channel decoder -> Source decoder -> Formmater) - Received Info -> Destination

### Source Coding vs. Channel Coding
 * Coding theory is the study of the properties of codes and their fitness for a specific application. Codes are used for data compression, cryptography, error-correction and more recently also for network coding.
 * This typically involves the removal of redundancy or the correction (or detection) of errors in the transmitted data.
 * There are essentially two aspects to coding theory:
   * Data compression (or, source coding)
   * Error correction (or channel coding)
 * Source encoding attempts to compress the data from a source in order to ransmit it more efficiently. This practice is found every day on the Internet where the common Zip data compression is used to reduce the network load and make files smaller.
 * Channel encoding, adds extra data bits to make the transmission of data more robust to disturbances present on the transmission channel. A typical music CD uses the Reed-Solomon code to correct for scratches and dust. Cell phones also use coding techniques to correct for the fading and noise of high frequency radio transmission. Data modems, telephone transmissions, and NASA all employ channel coding techniques to get the bits through, for example the turbo code and LDPC codes.

### Source Coding
#### Introduction
 1. Source symbols encoded in binary
 2. The average codelength must be reduced
 3. Remove redundancy -> reduces bit-rate
 * Consider a discrete memoryless source on the alphabet
 * $$S = \{s_0, s_1, ... s_k\}$$
 * Let the corresponding probabilities be $$\{p_0, p_1, ... , p_k\}$$
 * and codelengths be $$\{ l_0, l_1, ..., l_k \}$$
 * Then, the average codelength (average number of bits per symbol) of the source is defined as
 * $$ L = \sum_{k=0}^{K-1} p_k l_k$$
 * If $$L_{min}$$ is the minimum possible value of $$\bar L$$, then the coding efficiency of the source is given by $$\eta$$
 * $$\eta = \frac{L_{min}}{\bar L}$$
 * Data Compaction:
   1. Removal of redundant information prior to transmission.
   2. Loseless data compaction - no information is lost.
   3. A source code which represents the output of a discrete memoryless source should be uniquely decodable.

#### Source Coding Schemes for Data Compaction
 * Prefix Coding:
   1. The Prefix Code is variable length source coding scheme where no code is the prefix of any other code.
   2. The prefix code is a niquely decodable code.
   3. But, the converse is not true

 * Any symbol $$s_k$$ is emitted with probability $$p_k=2^{-l_k}$$
 * $$ sum_{k=0}^{K-1} 2^{-l_k} = \sum_{k=0}^{K -1} p_k = 1$$
 * Therefore, the average codeword length is given by
 * $$\bar L = \sum_{k=0}^{K-1} \frac{l_k}{2^{l_k}}$$

### Huffman Coding
 * Step 1: arrange the symbol probabilities in a decreasing order and consider them as leaf nodes of a tree.
 * Step 2: while there are more than one node:
   * Find the two nodes with the smallest probability and assign the one with the lowest probability a "0", and the other one a "1"(or the other way, but be consistent)
   * Merge the two nodes to form a new node whose proability is the sum of the two merged nodes.
   * Go back to Step 1
 * Step 3: For each symbol, determine its codeword by tracing the assigned bits from the corresponding leaf node to the top of the tree. The bit at the leaf node is the last bit of the codeword

 * Huffman code is a prefix code
 * The length of codeword for each symbol is roughly equal to the amount of information conveyed.
 * If the probability distribution is known and accurate. In this sight, Huffman coding is very good.
 * Variance is a measure of the variablitiy in codeword lengths of a source code and is defined as follows:
   * $$ \sigma^2 = \sum_{k=0}^{K-1} p_k (l_k - \bar L)^2$$
 * It is reasonable to choose the Huffman tree which gives greater variance (Provide diversity or disimilarity to avoid errors).

### Channel Coding
#### Forward Error Correction(FEC)
 * The key idea of FEC is to transmit enough redundant data to allow receiver to recover from erros all by itself. No sender retransmission required.
 * The major categories of FEC codes are:
   * Block codes, Cyclic codes, Reed-Solomon codes, Convolutional codes, and Turbo codes

#### Block Codes
 * Information is divided into blocks of length k
 * r parity bits or check bits are added to each block (total length n = k + r)
 * Code rate R = k/n
 * Decoder looks for codeword cloest to received vector (code vector + error vector)
 * Tradeoffs between:
   * Efficiency
   * Reliability
   * Encoding/Decoding complexity

### Block Codes: Linear Block Codes
 * C of the Linear Block Code is $$ C= mG$$
 * where m is the uncoded message vector $$m = (m_1, m_2, ..., m_k)$$
 * and $$G$$ is the generator matrix, $$G=[I|P]
 * where $$p_i$$ = Remainder of [$$x^{n-k+i-1} / g(x)$$] for i = 1, 2,... k, and I is unit matrix.
 * g(x) = generator polynomial

 * The parity check matrix:
   * $$H = [p^T | I]$$
   * where $$p^T$$ is the transpose of the matrix p.

 * Operations of the generator matrix and the parity check matrix
 * The parity check matrix H is used to detect erros in the received code by using the fact that $$c*H^T = 0$$ (null vector)
 * Let $$x \bigoplus e$$ be the received message where c is the correct code and e is the rror
 * Compute $$S = x * H^T = (c \bigoplus e) * H^T = c H^T \bigoplus e H^T = e H^T$$
 * If S is 0 then message is correct else there are erros in it, from common known error patterns the correct message can be decoded.

### Convolutional Codes
 * Encoding of information stream rather than information blocks
 * Value of certain information symbol also affects the encoding of next M information symbols.
 * Easy implementation using shift register
 * Assuming k inputs and n outputs
 * Decoding is mostly performed by the Viterbi Algorithm

### Interleaving
 * 인풋 데이터를 순서대로 하는 것이 아닌 2차원 형태로 바꾼 다음 열의 순서로 보내는 방식
 * Error spreading -> Can be correct.

### Information Capacity Theorem (Shannon Limit)
 * The information capacity (or channel capacity) C of a continuous channel with bandwidth B hertz can be perturbed by additive Gaussian white noise of power spectral density N_0/2 provided bandwidth B satisfies
 * $$ C = B log_2 (1 + \frac{P}{N_0 B})$$ bits/ second
 * where P is the average transmitted power $$P = E_b R_b$$ (for an ideal system, $$R_b = C$$).
 * $$E_b$$ is the transmitted energy per bit,
 * $$R_b$$ is transmission rate.

### Turbo Codes
 * A brief historic of turbo codes:
   * The turbo code concept was first introduced by C. Berrou in 1993. Today, Turbo Codes are considered as the most efficient coding schmes for FEC.
   * Scheme with known components (simple convolutional or block codes, interleaver, soft-decision decoder, etc.)
   * Performance close to the Shannon Limit at modest complexity!
   * Turbo codes have been proposed for low-power applications such as deep-space and stellite communications, as well as for interference limited applications such as third generation cellular, personal communication services, ad hoc and sensor networks.

### Modulation
### Signal transmission through linear systems
 * Input x(t) -> y(t) Output
 * Y(f) = X(f)H(f)

### Bandwidth of signal
 * Baseband versus bandpass:
   * x(t) (Baseband signal) - convolution $$ cos (2\pi f_ct)$$ (local socillator) -> x_c(t) (Bandpass signal)
   * 기저 대역(baseband)에 있는 메시지를 통과대역(passband)로 변환하는 과정
   * 수신자는 송신자와 같은 대역으로 대역으로 발진해야하지만, 실제로는 도플러효과나 오실레이터의 노화에 따라서 대역이 변화하게 된다. 따라서 이를 동기화(Synchronization)을 해줘야지만 이를 수신할 수 있게 된다.
   * 물론 이를 동기화 하지 않고 수신하는 기법(DPSK)도 있지만 성능이 떨어진다.

### Bandwidth of signal
 * 신호에 절대값을 씌웠을 때,
 * Half-power bandwidth : 3dB 가 되는 지역, 즉 Power 가 최대의 절반이 되는 지점까지
 * Noise equivalent bandwidth : 노이즈와 파워가 동등해지는 대역
 * Null-to-null bandwidth : 최대값을 기준으로 처음으로 0이되는 양쪽 지점 사이 대역폭
 * Fractional power containment bandwidth
 * Bounded power spectral density

### Modulation
 * Encoding information in a manner suitable for transmission.:
   * Translate baseband source signal to bandpass signal
   * Basdpass signal: "modulated signal"
 * Why need modulation?:
   * Small antenna size

### Modulation and Demodulation
 * Major sources of erros:
   * Thermal noise (AWGN):
     * distrubs the signal in an additive fashion (Additive)
     * has flat spectral density for all frequencies of interest (White)
     * is modeled by Gaussian random process (Gaussian Noise)
   * Inter-Symbol Interference (ISI):
     * Due to the filtering effect of transmitter, channel and receiver, symbols are "smeared".

### Basic Modulation Techniques
 * Amplitude Modulation (AM)
 * Frequency Modulation (FM)
 * Frequency Shift Keying (FSK)
 * Phase Shift Keying (PSK)
 * Quadrature Phase Shift Keying (QPSK)
 * Quadrature Amplitude Modulation (QAM)

#### Amplitude Modulation (AM)
 * Amplitude of arrier signal is varied as the message signal to be transmitted.
 * Frequency of carrier signal is kept constant.

#### Frequency Modulation (FM)
 * FM integrates message signal with carrier signal by varying the instantaneous frequency.
 * Amplitude of carrier signal is kept constant.

#### Frequency Shift Keying (FSK)
 * 1/0 represented by two different frequencies slightly offset from carrier frequency

#### Phase Shift Keying (PSK)
 * Use alternative sine wave phase to encode bits

### Receiver job for Demoulation
 * Demodulation and sampling:
   * Waveform recovery and preparing the received signal for detection:
     * Improving the signal power to the noise power (SNR) using matched filter (project to signal space)
     * Reducing ISI using equalizer (remove channel distortion)
     * Samplign the recovered waveform
 * Detection:
   * Estimate the transmitted symbol based on the received sample

### Receiver structure
 * Step 1 - waveform to sample transofrmation: (demodulate & sample)
   * Frequency down-conversion : For bandpass signals
   * Receiving filter
   * Equalizing filter : Compensation for channel induced ISI
 * Step 2- decision making:(detect)
   * Threshold comparison

### Signal Space Concept
 * What is a signal space?:
   * Vector representations of signals in an N-dimensional orthogonal space
 * Why do we need a signal space?:
   * It is a menas to convert signals to vectors and vice versa.
   * It is a means to calculate signals energy and Euclidean distances between signals.
 * Why are we interested in Euclidean distances between signals?:
   * For detection purposes: The received signal is transformed to a received vectors.
   * The signal which has the miniumum distance to the received signal is estimated as the transmitted signal.

### Signal space
 * To form a signal space, first we need to know the inner product between two signals:
   * Inner (scalar) product:
     * $$<x(t),y(t)> = \int_{-\infty}^{\infty} x(t) y^{*}(t) dt$$
     * = cross-correlation between x(t) and y(t)
   * Properties of inner product:
     * <ax(t), y(t)> = a <x(t), y(t)>
     * <x(t), ay(t)> = a* <x(t), y(t)>
     * <x(t) + y(t), z(t) > = <x(t), z(t)> + <y(t), z(t)>
* The distance in singal space is measure by calculating the norm.
* What is norm?:
  * Norm of a signal:
    * $$||x(t)|| = \sqrt{<x(t), x(t)>} = \sqrt{\int_{-\infty}^{\infty} |x(t)|^2 dt} = \sqrt{E_x}$$
    * $$||ax(t)|| = |a| ||x(t)||$$
  * Norm between two signals:
    * $$d_{x,y} = || x(t) - y(t) ||$$
* We refer to the norm between two signals as the Euclidean distance between two signals.


### Orthogonal signal space
 * N-dimensional orthogonal signal space is chracterized by N linearly independent functions $$\{\psi_j(t) \}_{j=1} ^N$$ called basis functions. The basis functions must satisfy the orthogonality condition
 * $$<\psi_i(t), \psi_j(t)> = \int_0^T \psi_i(t) \psi_j^*(t)dt = K_i \delta_{ji}$$, $$0 \le t \le T$$, $$j,i = 1,...,N$$
 * where $$\delta_{ij} = \begin{case} 1 -> i = j \\\ 0 -> i \not = j \end{case}$$
 * If all $$K_i=1$$, the signal space is orthonormal.
 * Constructing Orthonormal basis from non-orthnormal set of vectors:
   * Gram-Schmidt precedure
 * Example : BPSK

### Signal space
 * Any arbitrary finite set of waveforms $$\{s_i(t)\}_{i=1}^M$$ where each member of the set is of duration T, can be expressed as a linear combination of N orthogonal waveforms $$\{\psi_j (t)\}_{j=1}^N$$ where $$N \le M$$
 * $$s_i(t) = sum_{j=1}^N a_{ij} \psi_j(t)$$
 * where $$a_{ij} = \frac{1}{K_j}<s_i(t), \psi_j(t)> = \frac{1}{K_j} \int_{0}^T s_i(t) \psi_j(t) dt$$, $$j=1,...N$$, $$i=1,...,M$$, $$0 \le t \le T$$
 * $$s_i = (a_{i1}, a_{i2}, ..., a_{iN})$$ : vector representation of waveform
 * $$E_i = \sum_{j=1}^N K_j |a_{ij} | ^2$$ : Waveform energy

### Quadrature Amplitude Modulation (QAM)
* Combination of AM and PSK
* Two carriers out of phase by 90 deg are amplitude modulated


## Chapter 6.
### Network Software
 * Layered Architecture:
   * To reduce their design complexity, most networks are organized as a stack of layers or levels.
   * The purpose of each layer is to offer certain services to the higher layers, shielding those layers from the details of how the offered services are actually implemented
   * Protocol: An agreement between communicating parties on how communication is to proceed.

### Terminologies
 * The entities comprising the corresponding layers on different machines are called peers.
 * Interface: defines which primitive operations and services the lower layer makes available to upper one.
 * A set of layers and protocols is called a network architecture.
 * A list of protocols used by a certain system, once protocols per layer, is called a protocol stack

### Service Primitives
 * Tells the service to perform some action or report an action taken by a peer entity
 * Sequence chart in a simple client-server interaction on a connection-oriented network

### Reference Models
 * Network Protocol Suites that are heavily referenceed:
   * OSI refernce Model
   * TCP/IP

### Data Link Layer
 * Provides for reliable transfer of information across the physical link
 * Sends blocks (frames) with the necessary synchronization, error control and flow control
 * Usually subdivided by Medium Access Control(MAC) and Logical Link Control (LLC)

### Multiple Radio Access
 * Multiple access networks:
   * Each node is attached to a transmitter/receiver which communicates via a medium shared by other nodes
   * Transmission from any node is received by other nodes

### Multiple Access
 * Multiple access issues:
   * If more than one node transmit at a time on the broadcast channel, a collision occurs
   * How to determin which node can transmit?
 * Multiple access protocols:
   * Solving multiple access issues

 * Contention-free vs Contention-based(Conflict-baased)

### Contention-free protocols
#### FDMA (Frequency Division Multiple Access)
 * Single channel per carrier
 * All fist generation systems use FDMA

#### TDMA (Time Division Multiple Access)
 * Multiple channels per carrier
 * Most of second generation systems use TDMA

#### Combining TDMA and FDMA
 * Each channel gets a certain frequency band for a certain amount of time. Example :GSM
 * Advantages:
   * More robust against frequency-selective interference
   * Much greater capacity with time compression
   * Inherent tapping protection
 * Disadvantages:
   * Frequency changes must be coordinated

#### CDMA (Code Division Multiple Access)
 * User share bandwidth by using code sequences that are orthogonal to each other
 * Some second generation systems use CDMA
 * Most of third generation systems use CDMA

### Types of Channels
 * Control channel:
   * Forward (Downlink) control channel
   * Reverse (uplink) control channel
 * Traffic channel:
   * Forward traffic (information) channel
   * Reverse traffic (information) channel

### Duplexing Methods for Radio Links
#### Frequency Division Duplex(FDD)
 * Forward link frequency and reverse link frequency is different.
 * In each link, signals are continuously transmitted in parallel.

#### Time Division Duplex (TDD)
 * Forward link frequency and reverse link frequency is the same.
 * In each link, signals take turns just like a ping-pong game.

#### Frequency Hopping Spread Spectrum (FHSS)
#### Direct Sequnce Spread Spectrum (DSSS)
 * This sequnce can be mapped into bipolar notations
 * $$S * T = \frac{1}{m} \sum_{i=1}^m S_i T_i = 0$$
 * $$S * S = \frac{1}{m} \sum_{i=1}^m S_i S_i = \frac{1}{m} \sum_{i=1}^m S_i^2= \frac{1}{m} \sum_{i=1}^{m} (\pm 1)^2 = 1$$
 * $$S * \bar S = -1$$
 * During each bit time,:
   * a station can transmit a 1 by sending its chip sequence,
   * it can transmit a 0 by sending the negative of its chip sequence,
   * Or it can be silent and transmit nothing
 * At the receiving station, the transmitted bit is recovered by computing the inner producet of received signal and its chip sequence
 * For example, if the received signal $$S = A + \bar B + C$$, the receiver computes
 * $$S * C = (A + \bar B + C) * C = A*C + \bar B * C + C *C = 0 + 0 + 1 = 1$$
 * and determines that bit 1 has been transmitted independent of what is the signal for A, B, and D is.

### Contention-Based Protocols
 * ALOHA:
   * Developed in the 1970s for a packet radio network by Hawaii University.
   * Whenever a station has a data, it transmits. Sender finds out whether transmission was successful or experienced a collision by listening to the broadcase from the destination station. Sender retransmits after some random time if there is a collision.
 * Slotted ALOhA:
   * Improvement: Time is slotted and a packet can only be transmitted at the beginning of one slot. Thus, it can reduce the collision duration.

 * CSMA(Carrier Sense Multiple Access):
   * Improvement: Start transmission only if no transmission is ongoing
 * CSMA/CD (CSMA with Collision Detection):
   * Improvement: Stop ongoing transmission if a collision is detected
 * CSMA/CA (CSMA with Collision Avoidance):
   * Improvement: Wait a random time and try agian when carrier is quite. If is still quit, then transmit
 * CSMA/CA with ACK
 * CSMA/CA with RTS/CTS

### ALOHA analysis
 * In poission process:
   * $$P(k,t)= \frac{(\lambda t)^k e^{- \labmda t}}{k!}, k=0,1,2...$$
   * E[Number of attempts in t seconds] = $$\lambda t$$
 * Assumptions:
   * Assume backlogged frames randomized sufficently, so that retransmissions can be recirculated and counted as new arrivals:
     * New overall Poisson arrival rate G > $$\lambda$$
     * G is therefore defined as the rate of attempted transmissions(including retransmissions and new arrivals)
     * In reality, G is time varying, but assume constant for our analysis
   * The probability that a transmitted frame is successful is defined as $$P_0$$
   * The throughput S is defined as the departure rate of the system.
   * Therefor, $$S = G P_0$$ in this notation.
 * Unslotted analysis:
   * $$P_0 = e^{-2G}$$
   * $$S=GP_0=Ge^{-2G}$$
   * To maximize throughput, maximize departure rate
   * G=0.5 -> 18% maximum efficiency
   * if G > 0.5, too many collisions
   * if G < 0.5, too many idle slots
 * Slotted analysis assumptions:
   * Frames all have same length
   * Time is slotted, and users synchronized
   * Nodes listen to results (1s later) to determine what happend
   * All frames either collide or perfectly received
   * Now, vulnerable period is cut in half
   * G=1, 36% maximum efficiency
 * Tradeoff between ALOHA and round-robin(Time Division Multiplexing):
   * TDM : avoid collisions, but longer average delays
   * Aloha : small delay (immediately transmit), but collisions possible

#### Summary of Aloha
 * Some problems:
   * Inefficient(good for infrequent transactions in a large user population)
   * Not good for back-to-back data transmissions
 * Some stabilization techniques have achieved throughputs on order of 50%
 * Still, a good technique for many users

### CMSA (Carrier Sense Multiple Access)
 * CSMA gives imporved throughput compared to Aloha protocols.
 * Listens to the channel befor transmitting a packet

#### Non-persistent / x-persistent CSMA Protocols
 * Nonpersistent CSMA Protocol:
   * Step 1 : If the medium is idel, transmit immediately
   * Step 2 : If the medium is busy, wait a random amount of time and repeat Step1
   * Random backoff reduces probability of collisions
   * Waste idel time if the backoff time is too long
 * 1-persisten CSMA Protocol:
   * Step 1 : If the medium is idel, transmit immediately
   * Step 2 : If the medium is busy, continue to listen until medium becomes idel, and then transmit immediately
   * There will always be a collision if two nodes want to retransmit
 * p-persistent CSMA Protocol:
   * Step 1 : If the medium is idel, transmit with probability p, and delay for one propagation delay with probability (1-p)
   * Step 2 : If the medium is busy, continue to listen until medium becomes idle, then go to Step 1
   * Step 3 : If transmission is delayed by one time slot, continue with Step 1
 * A good tradeoff between nonpersistent and 1-persistent CSMA

#### How to select probability p?
 * Assume that N nodes have a packet to send and the medium is busy
 * Np is the expected number of nodes that will attempt to transmit once the medium becomes idle
 * If Np > 1, then a collision is expected to occur. Therefore, network must make sure that Np < 1, where N is the maximum number of nodes taht can be activate a time

### CSMA/CD (CSMA with Collision Detection)
 * In CSMA, if 2 terminals begin sending packet at the same time, each will transmit its complete packet(although collision is takign place).
 * Wasting medium for an entire packet time.
 * CSMA/CD:
   * Step 1: If the medium is idel, transmit
   * Step 2: If the medium is busy, continue to listen until the channel is idel then transmit
   * Step 3: If a collision is detected during transmission, cease transmitting
   * Step 4: Wait a random amount of time and repeats the same algorithm

### CSMA/CA (CSMA with collision Avoidance)
 * All terminals listen to the medium same as CSMA/CD.
 * Terminal ready to transmit senses the medium.
 * If medium is busy it waits until the end of current transmission.
 * It again waits for an additional predetermined time period DIFS (Distributed inter frame Space)
 * Then picks up a random number of slots (the initial value of backoff counter) within a contention window to wait before transmitting its frame.
 * if there are transmissions by other terminals during this time period (backoff time), the terminal freezes its counter.
 * It resumes count down after other terminals finish transmission + DIFS. The terminal can start its transmission when the counter reaches to zero.

#### CSMA/CA with ACK
 * Immediate Acknowlegements from receiver upon reception of data frame.
 * ACK frame transmitted after time interval SIFS (Short Inter-Frame Space) (SIFS < DIFS)
 * Receiver transmits ACK without sensing the medium.
 * If ACK is lost, retransmission done.

### Hidden node problem
 * CSMA will be ineffective here

### CSMA/CA with RTS/CTS
 * Transmitter sends a RTS (request to send) after medium has been idle for time interval more than DIFS.
 * Receiver responsds with CTS (clear to send) after medium has been idle for SIFS.
 * Then data is exchnaged.
 * RTS/CTS is used for reserving channel for data transmission so that the collision can only occur in control message.

### Exponential Backoff
 * When transmitting a packet, choose a backoff interval in the range[0, cw]:
   * cw is contention window
 * Count down the backoff interval when medium is idle:
   * Count-down is suspended if medium becomes busy
 * When backoff interval reaches 0, transmit RTS

### Backoff Interval
 * Choosing a large cw leads to large backoff intervals and can result in larger overhead
 * Choosing a small cw leads to a larger number of collisions (when two nodes count down to 0 simultaneously)
 * Since the number of nodes attempting to transmit simultaneously may change with time, some mechanism to manage contentions is needed.
 * IEEE 802.11 DCF : contention window cw is chosen dynamically depending on collision occurrence.

## Chapter 13, 5, 10
### Network Layer Protocols
### Why Wireless?
 * Objective:
   * anything, anytime, anywhere
 * Advantages:
   * Spatial flexibility in radio reception range
   * Ad hoc networks without former planning
   * No problems with wiring
   * Robust against disasters like earthquake, fire
 * Disadvantages:
   * Generally very low transmission rates for higher numberfs of users
   * Many national regulations, global regulations are evolving slowly
   * Restricted frequency range, interferences of frequencies

### Wireless vs. Mobile
 * Two aspects of mobility:
   * user mobility. user communicate (wireless), anytime, anywhere with anyone.
   * device portability: devices can be connected any time, anywhere to the network

### Wireless Routing
 * So, the routing(network) still relies upon the existing wireline routing protocols with apperas in Chapter 9.
 * Instead, we will discuss true wireless multi-hop networks called MANET (Mobile Ad hoc Network) which is an autonomous system of nodes(MSs) connected by wireless links.
 * A MANET does not necessarily need support from any existing network infrastructure like an Internet gateway or other fixed stations.

### Chracteristics of Ad Hoc Networks
 * Dynamic topologies: Network topology may change dynamiccaly as the nodes are free to move or battery is off.
 * No oracle for configuration : Distributed and Self-organizing.
 * Bandwidth-constrained, variable capacity links: Realized throughput of wireless communication is less than the radio's maximum transmission rate. Collision occurs frequently (Low BW relative to wired).
 * Energy-constrained operation: Some nodes in the ad hoc network may rely on batteries or other exhaustible means for their energy.
 * Limited physical security: More prone to physical security threats than fixed cable networks.

### Routing in MANETS - Goals
 * Provide the maximum possible reliability - use alternative routes if an intermediate node fails.
 * Choose a route with the least cost metric (memory, bandwidth, power, etc).
 * Give the nodes the best possible response time and throughput.
 * Route computation must be distributed. Centralized routing in a dynamic network is usually very expensive.
 * Routing computation should not involve the maintenance of global state.
 * Every node must have quick access to routes on demand.
 * Each node must be only concerned about the routes to its destination.
 * Broadcast should be avoided(highly unreliable)
 * It is desirable to have a backup route when the primary route has become stale.

### Routing Classification
 * The existing routing protocols can be classified as:
   * Proactive: when a packet neetds to be forwarded, the route is already known.
   * Reactive: Determine a route only when there is data to send.
 * Routing protocols may also be categorized as:
   * Table Driven protocols
   * Source Initiated (on demand) protocols

### Table Driven Routing Protocols
 * Each node maintains routing information independently of need for communication
 * Update messages send throughout the network periodically or when network topology changes.
 * Low latency, suitable for real-time traffic
 * Bandwidth might get wasted due to periodic updates
 * They maintain O(N) state per node, N = #nodes
 * Examples are:
   * Destination Sequenced Distance Vector routing (DSDV)
   * Cluster-head Gateway Switch routing (CGSR)
   * Wireless Routing Protocol (WRP)

### Destination Sequenced Distance Vector Routing (DSDV)
 * Based on the Bellman-Ford algorithm.
 * Each mobile node maintains a routing table in terms of number of hops to each destination, i.e., every node knows "where" everybody else is.
 * Routing table updates are periodically transmitted.
 * Each entry in the table is marked by a sequence number which helps to distinguish stale routes from new ones, and thereby avoiding loops.
 * To minimize the routing updates, variable sized update packets are used depending on the number of topological changes. (incremental dump of changes)

### Cluster-head Gateway Switch Routing (CGSR)
 * CGSR is a clustered multi-hop mobile wireless network with several heuristic routing schemes.
 * A distributed cluster-head (CH) selection algorithm is used to select a node as the cluster head.
 * It modified DSDV by using a hierarchical CH to route traffic.
 * Gateway nodes serve as bridge nodes between two or more clusters.
 * A packet sent by a node is first routed to its CH and then the packet is routed from the CH to a gateway of another cluster and then to the CH and so on, until the destination cluster head is reached.
 * Frequent changes in the CH may affect the performance of the routing protocol.

### Source-Initiated On-Demand Routing (Reactive)
 * Each source discovers route(s) to its destination only when the source needs it.
 * Save energy and bandwidth during inactivity
 * Can be busrty -> congestion during high activity
 * Significant delay might occur as a result of route discovery
 * Good for light load, collapse in large loads
 * Examples are:
   * Dynamic Source Routing (DSR)
   * Ad hoc On-Demand Distance Vector (AODV).

### Dynamic Source Routing (DSR)
 * Each packet header contains a route, which is represented as a complete sequence of nodes between a source-destination pair
 * Protocol consists of two phases:
   * route discovery
   * route maintenance
 * Optimizations for efficiency:
   * Route cache
   * Piggybacking
   * Error handling

 * The protocol consists of two major phases: Route Discovery, Route Maintenance.
 * When a mobile node has a packet to send to some destination, it first consults its route cache to check whether it has a route to that destination.
 * If it is an un-expired route, it will use this route.
 * If the node doest not have a route, it initiates route discovery by broadcasting a Route Request packet.
 * This Route Request contains the address of the destination, along with the source address.
 * Each node receiving the packet checks to see whether it has a route to the destintaiton. If it does not, it adds its own address to the route record of the packet and forwards it.
 * A route reply is generated when the request reaches either the destination itself or an intermediate node that contains in its route cache an un-expired route to that destination.
 * If the node generating the route reply is the destination, it places the route record contained in the route request into the route reply.

 ### Ad-hoc On Demand Distance Vector (AODV)
  * On demand protocol that uses sequence numbers to build loop free routes
  * Key difference from DSR si that source route is no longer required
  * Path discovery:
    * Reverse path setup
    * Forward path setup
  * Table management and path maintenance
  * Local connectivity management
  * AODV is an improvement over DSDV, which minimizes the number of required broadcasts by creating routes on demand.
  * Nodes that are not in a selected path do not maintain routing information or participate in routing table exchanges.
  * A source node initiates a path discvoery process to loacate the other intermediate nodes(and the destination), by boradcasting a Route Request (RREQ) packet to its neighbors.

### The Cellular Concept
 * Cell shape : Ideal(Circle), Actual(Not circle), 실제로는 빈틈 없이 모델링을 하기 위해서 육각형을 많이 사용한다.
 * Signal Strength
 * Handoff Region:
   * By looking at the variation of signal strength from either base station it is possible to decide on the optimum area where handoff can take place.
   * 한 기지국에서 이동하면서 더 좋은 기지국으로 접속해야한다. 이때 넘겨지는 영역을 Handoff Region이라고 한다. (Handover Region)

### Cell Capacity
 * Average number of MSs requesting service (Average arrival rate): $$\lambda$$
 * Average length of time MS requires service (Average holding time): T
 * Offered load: $$a = \labmda T$$
 * e.g., in a cell with 100 MSs, on an average 30 requests are gnerated during an hour, with average holding time T = 360 secs.
 * Then, arrivatl rate $$\lambda = 30 / 3600$$ requests/sec.
 * A channel kept busy for one hour is defined as on Erlang
 * e.g., $$a = 30/3600 \text{calls/sec} * 360 \text{sec / call} = 3 \text { Erlangs }$$
 * Average arrival rate during a short interval t is given by $$\lambda t$$
 * Assuming Poisson distribution of service requests, the probability P(n, t) for n calls to arrive in an interval of length t is given by:
   * $$P(n, t) = \frac{(\lambda t)^n}{n!} e^{-\lambda t}$$
 * Assumming $$\mu$$ to be the service rate, probability of each call to terminate during interval t is given by $$\mu t$$
 * Thus, probability of a given call requires service for time t or less is given by:
   * $$S(t) = 1 - e^{-\mu t}$$

### Erlang B and Erlang C
 * Probability of an arriving call being blocked is:
   * $$B(C, a) = \frac{a^C}{C!} \frac{1}{\sum_{i=1}^C \frac{a^i}{i!}}$$ : Erlang B formula
 * Probabilty of an arriving call beign delayed is:
   * $$C(C, a) = \frac{\frac{a^C}{(C-1)! (C-a)}}{\frac{a^C}{(C-1)!(C-a)} + \sum_{i=0}^{C-1} \frac{a^i}{i!}}$$ : Erlang C formula
 * where C(C,a) is the probability of an arriving call being delayed with a load and C Channels.

### Efficiency (Utilization)
  * Efficiency = Traffic non blocked / Capacity = Erlangs * portions of nonrouted traffic / Number of trucks(channels)

### Cell Structure
 * 육각형으로 모델링을 하는데, 인접한 Cell끼리는 서로 다른 주파수 영역을 써서, 간섭(interference)과 동시전송(cross talk)을 방지하고자 한다.

### Frequency Reuse
 * 인접한 영역끼리 같은 주파수를 못쓴다. 반대로 말하면, 인접하지 않으면 같은 주파수를 쓸수 있다는 뜻이다. 따라서 주파수를 다시 재활용 해야한다.
 * 인접하지 않은(간섭을 주지 않는) 영역끼리는 같은 주파수를 사용할 수 있게 한다.

### Reuse Distance
 * For hexagonal cells, the reuse distance is given by:
   * $$D = \sqrt(3N) R$$
   * where R is cell radius and N is the reuse pattern (the cluster size of the number of cells per cluster).
 * Reuse factor is:
   * $$\frac{D}{R} = \sqrt{3N}$$
 * The cluster size of the number of cells per cluster is given by:
   * $$N = i^2 + ij + j^2$$
   * where i and j are integers.
 * N = 1,3,4, 7, 9 ...
 * The popular value of N begin 4 and 7.

### Cochannel Interference
 * Cochannel interference ratio is given by:
   * $$\frac{C}{I} = \frac{\text{Carrier}}{\text{Interference}} = \frac{C}{\sum_{k=1}^M I_k + N}$$ : SINR
   * where I is co-channel interference and M is the maximum number of co-channel interfering cells.

### Cell Splitting
 * Large cell(low density)
 * Small cell(high density) : low power consumption and powerful signal but frequent handover
 * Depending on traffic patterns the smaller calls may be activated/deactivated in order to efficiently use cell resources.
 * femto cell : 아파트 한 층
 * picocell : 아파트 건물 하나
 * microcell : 도시(urban)
 * macrocell : 대도시(suburban)

### Cell Sectoring by Antenna Design
### Cellular SYstem
 * MS : Mobile Station
 * BTS: Base Transceiver System
 * BSC: BS Controller
 * MSC: Mobile Switching Center
 * VLR: Visitor Location Register
 * HLR: Home Location Register
 * AUC: AUthentication Center
 * EIR: Equipment Identify Register

### Registration
 * Wireless system needs to know whether MS is currently located in its home area or some other area (routing of incoming calls).
 * This is done by periodically exchagning signals between BS and MS known as beacons.
 * BS perioidically boradcasts beacon signal (e.g., 1 signal per second) to determine and test the MSs around.
 * Each MS listens to the beacon, if it has not heard it previously then it adds it to the active beacon kernel table.
 * This information is used by the MS to locate the nearest BS.
 * Information carried by beacon signal: cellular network identifier, timestamp, gateway address ID of the paging area, etc.

### Steps for Registration
 * MS listens to a new beacon, if it's a new one, MS adds it to the active beacon kernel table.
 * If MS decides that it has to communicate through a new BS, kernel modulation initiates handoff process.
 * MS locates the nearest BS via user level processing.
 * The visiting BS performs user level processing and decides:
   * Who the user is?
   * What are it access permissions?
   * Keeping track of billing.
 * Home site sends appropriate authentication response to the current serving BS.
 * The BS approves/disapproves the user access.

### Handoff
 * Change of radio resoruces from one cell to adjacent one.
 * Handoff depends on cell size, signal strength, fading, reflection, etc.
 * Handoff can be initiated by MS or BS and could be due to:
   * Radio link
   * Network management
   * Service issues
 * Radio link handoff is due to mobility of MS.
 * It depends on:
   * Number of MSs in the cell
   * Number of MSs that have left the cell
   * Number of calls generated in the cell
   * Number of calls transferred from the neighboring cells
   * Number of calls terminated in the cell
   * Number of calls that were handoff to neighboring cells
   * Number of active calls in the cell
   * Cell population
   * Total time spent in the cell by a call
   * Arrival time of a call in the cell
   * etc.
 * Network management may cause handoff if there is drastic imbalance of traffic in adjacent cells and optimal balance of resources is required.
 * Serivce related handoff is due to the dagradation of Qos(Quality of service)

### Time for Handoff
 * Factors deciding right time for handoff:
   * Signal strength
   * Signal phase
   * Combination of above two
   * Bit error rate(BER)
   * Distance
 * Need for Handoff is determined by:
   * Signal strength
   * SINR(Signal to Interference and Noise Ratio)

### Handoff initiation
 * One option is to do handoff where the two signal strengths are equal.
 * If MS moves back and forth around this point, it will result in too frequent handoffs(ping-pong effect).
 * Therefore, MS is allowed to continue with the existing BS till the signal strength decreased by a threshold value E.
 * Different cellular systems follow different handoff procedures.

### Types of Handoff
 * Hard Handoff (break before make):
   * Releasing current resources from the prior BS before acquiring resources from the next BS.
   * FDMA & TDMA follow this type of handoff.
 * Soft Handoff (make before break):
   * In CDMA, since the same channel is used, we have to change the code of the handoff, if the code is not orghogonal to the codes in the next BS.
   * Therefore, it is possible for the MS to communicate simultaneously with the prior BS as well as the new BS.

### Roaming
 * To move from a cell controlled by one MSC area to a cell connected to another MSC.
 * Beacon signals and the use of HLR-VLR allow the MS to roam anywhere provided we have the same service provider, using that particular frequency band.
