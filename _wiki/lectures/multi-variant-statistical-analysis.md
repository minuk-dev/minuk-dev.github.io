---
layout  : wiki
title   : Multi Variant Statistical Analysis
summary : 2021-fall lecture
date    : 2021-09-24 12:38:16 +0900
lastmod : 2021-10-25 01:36:24 +0900
tags    :
draft   : false
parent  : lectures
---

## Chapter 0. Introduction
 * Why do we need multivariate methods?:
   * (Multivariate data) Several measurements, referred to as variables, are node on each unit(individual, item, object, or subject). The variables are commonly correlated each other.
   * (Multivariate methods):
     * Descriptive statistics : simplifications, untangling the overlapping information and finding linear combinations of variables
     * Inferential statistics: Formal estimation, hypothesis tests, and statistical modeling under the correlated structure of the data. Many multivariate statistical methods are extensions of the corresponding univariate methods.

### 0.1 Visualization of Multivariate Data
 * The following list includes several graphical methods to display multivariate data. Note the each face or star in Chernoff faces and star plot is made based on the measurements on a unit while the scatter plot matrix or scatter plots are made based on the variables.

```{r}
head(USArrests)
library(psych) # Scatter Plot Matrix
paris.panels(USArrests)

# Chernoff's Faces
library(aplpack)
faces(USArrests, face.type=1, cex=0.5))

# Star plot
stars(USArrests)

# 3-D scatter plot
library(scatterplot3d)
scatterplot3d(USArrests[, -1], type="h", highlight.3d=TRUE, angle=55, scale.y=0.7, pch=16, main="USArrests")

# 3-D rotated plot
library(rgl)
plot3d(USArrests[,-3])

# Profile plot
library(MASS)
parcoord(USArrests, col=c(1+(1:50)), var.label=T)

# Growth curves for longitudinal data
library(nlme)
head(Orthodont)
library(ggplot2)
p <- ggplot(data = Orthodont, aes(x = age, y = distance, group = Subject, colour=Subject))
p + geom_line()

p + geom_line() + facet_grid(. ~ Sex)
```

### Summary of Introudction
 * Two or more variables are measured on each subject -> multivariate data
 * Multivariate data are commonly correlated -> we need statistical methods handlign those data
 * We learn how to:
   * visualize and display multivariate data
   * apply multivariate normal distribution theory to the data
   * make inferences (estimation of parameters and testing hypothesis)
   * understand the structure of data
   * statistically extract information from multivariate data

## Chapter 1. Linear algebra
### 1.1 Scalars, vectors, matrices
 * Matrix: A rectangular or square array of numbers of variables.
   * $A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\\\ a_{21} & a_{22} & \cdots & a_{2n} \\\\ \vdots & \vdots & \ddots & \vdots \\\\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{pmatrix}$
   * It is common to use a matrix to display a data set: a datset with n subjects and p variables can be written as a $n \times p$ matrix. It is called a data matrix or data array.
   * Note that the $i$th row is the list of the measurments obtained from Unit (Individual) $i$, and the $j$ the column is the list of measruements of Variable $j$.
 * Vector: A column or row matrix
   * $x = \begin{pmatrix} x_1 \\\\ \vdots \\\\ x_n \end{pmatrix}$
   * $x^T = x' = (x_1, \cdots, x_n)$
   * where the transpose of A is defined as:
     * $A^T = A'$
   * Note that $(A^T)^T = A$
 * Scalar: A single number A 1x1 matrix is equivalent to a scalar.
 * Equality of two matrices: A= B if the sizes of two matrices are equal and thhe corresponding elements are equal.
 * Special matrices: The followings are frequently used matrices in this text:
   * Diagonal matrix: $D = diag(d_1, \cdots, d_p) = \begin{pmatrix} d_1 & 0 & \cdots & 0 \\\\ 0 & d_2 & \ddots & \vdots \\\\ \vdots & \ddots & \ddots & 0 \\\\ 0 & \cdots & 0 & d_p \end{pmatrix}$
     * Note that $diag(A) = diag(a_{11}, \cdots, a_{pp})$
   * Identity matrix: $I = diag(1, \cdots, 1)$
   * Matrix with 1's: $J = \begin{pmatrix} 1 & \cdots & 1 \\\\ \vdots & \ddots & \vdots \\\\ 1 & \cdots & 1 \end{pmatrix}$. When we need to clarify the dimension of the matrix, we use $J_{n \times p}$
   * Vector with 1's $j = (1, \cdots, 1)^T$ or $1_{n \times 1} = 1_{n}$
   * Zero matrix and zero vector: $0 = o (0, \cdots, 0)^T$, $O = \begin{pmatrix} 0 & \cdots & 0 \\\\ \vdots & \ddots & \vdots \\\\ 0 & \cdots & 0\end{pmatrix}$

### 1.2 Operations of matrices
 * Scalar multiplication
 * Addition of two matrices
 * Matrix multiplication

 * Some properties of matrix operations:
   * $cA = Ac$
   * $0A = O$
   * $AB \neq BA$
   * $(AB)C = A(BC)$
   * $A(B + C) = AB + AC$
   * $IA = AI = A$

### 1.3 Trace and determinant for square matrcies
 * Trace : $tr(A) \stackrel{\text{def}}{=} \sum_{i=1}^p a_{ii}$:
   * $tr(A + B) = tr(A) + tr(B)$
   * $tr(AB) = tr(BA)$
   * $tr(A'A) = tr(AA') = \sum_{i} \sum_{j} a_{ij}^2 \text{ for } n \times p \text{ matrix } A$
 * Determinant: The determinant of a square matrix $A$, denoted by $\vert A \vert$ or det($A$) is inductively defined:
   * $det(A) = \sum_{j=1}^n (-1)^{j + 1} A_{ij} det(A_{(1, j)})$
   * where $A_{(ij)}$ is a minor matrix of $A$ generated by removing the ith row and the jth column from A, and the determiant of a scalar a euqlas a itself. We call $C = ((-1)^{i + j} det(A_{(ij)}))$ the cofactor matrix of $A$ and $adj(A) = C^T$ the adjoint matrix of A. Therefore, $det(A) = \sum_{j=1}^n A_{ij} C_{ij}$
   * for any fixed $1 \le i \le p$

### 1.4 Rank of a matrix
 * Definition 1.4.1 (linearly dependent (LD) and linearly independent (LI)). Let $a_1, ..., a_n$ be n vectors. If there exist not all zero constants $c_1, ..., c_n$ so that $c_1 a_1 + ... + c_n a_n = 0$, are said to be linearly dependent(LD). Otherwise, they are called linearly independent (LI).
 * Note that if a_1, ..., a_n are LD, then one of them can be obtained by a linear combinations of the others.

### 1.5 Inverse matrix
 * Difinition 1.5.1 When a matrix $A$ is square and of full rank, $A$ is said to be nonsingular or invertible, and A has a unique inverse, denoted by $A^{-1}$ satisfying:
   * $A A^{-1} = A^{-1} A = I$
 * Remark 2. We may solve a linear equation $Ax = b$ when $A$ is square and nonsingular.:
   * $A x = b$
   * $A^{-1} A x = A^{-1} b$
   * $x = A^{-1} b$
 * Remark 3.:
   * $A^{-1} = \frac{1}{\vert A \vert} C^T$
   * where $C=((-1)^{i+j} det(A_{(i, j)}))$ is the cofactor matrix of $A$.

### 1.6 Partitioned matrices
 * We may need to partition a matrix into submatrices such as:
   * $A = \begin{pmatrix} A_{11} & A_{12} \\\\ A_{21} & A_{22} \end{pmatrix}$

#### Example 1.6.2
 * Let $A = \begin{pmatrix} A_{11} & A_{12} \\\\ A_{21} & A_{22} \end{pmatrix}$ be a partitioned matrix with two square and nonsingular submatrices $A_{11}$ and $A_{22}$.
 * We define Schur complement to $A_{22}$ by:
   * $A_{11.2} = A_{11} - A_{12} A_{22}^{-1} A_{21}$
 * Similarly, Schur complement to $A_{11}$ is defined by $A_{22.1} = A_{22} - A_{21} A_{11}^{-1} A_{12}$:
   * The determinant of A can be obtained by:
     * $det(A) = det(A_{11}) det(A_{22.1}) \\\\ = det(A_{22})det(A_{11.2})$
   * When $A$ is a block triangular matrix such as:
     * $A = \begin{pmatrix} A_{11} & O \\\\ A_{21} & A_{22}\end{pmatrix}$
     * we can rewrite it as:
       * $A = \begin{pmatrix} I & O \\\\ O & A_{22}\end{pmatrix} \begin{pmatrix} I & O \\\\ A_{22}^{-1} A_{21} A_{11}^{-1} & I\end{pmatrix} \begin{pmatrix} A_{11} & O \\\\ O & I \end{pmatrix}$
     * Therefore, $\vert A \vert = \vert A_{11} \vert \vert A_{22} \vert$ for a lower or upper block-triangular matrix $A$. Hence,:
       * $\vert A_{22} \vert \vert \begin{pmatrix} I & O \\\\ - A_{22}^{-1}A_{21} & A_{22}^{-1} \end{pmatrix} \vert = 1$
       * $\vert A \vert = \vert A_{22} \vert \vert A_{11} - A_{12} A_{22}^{-1} A_{21} \vert$
 * The inverse matrix $A^{-1}$ may be written as:
   * $A_{-1} = \begin{pmatrix} A_{11.2}^{-1} & -A_{11.2}^{-1} A_{12} A_{22}^{-1} \\\\ -A_{22}^{-1} A_{21} A_{11.2}^{-1} & A_{22}^{-1} (I + A_{21} A_{11.2}^{-1}A_{12} A_{22}^{-1}) \end{pmatrix}$
 * In addition, it can be shown that:
   * $A_{11.2}^{-1} A_{12} A_{22}^{-1} = A_{11}^{-1} A_{12} A_{22.1}^{-1}$
   * $A_{22}^{-1} A_{21} A_{11.2}^{-1} = A_{22.1}^{-1} A_{21} A_{11}^{-1}$

### 1.7 Positive definite matrix
 * If $A' = A$, then we call $A$ symmetric. We call $x'Ax$ a quadratic from while $x'Ay$ is called a bilinear form.
 * Definition 1.7.1. A symmetric matrix $A$ is said to be positive definite (p.d.) If $x'Ax \ge 0 \text{ for all x}$ and $x'Ax = 0$ and only if $x = o$. If $x'Ax \ge 0$ for all vector $x$, then $A$ is called positive semidefinite (p.s.d).
 * Remark 4.:
   * 1. If $A$ is a symmetric positive definite matrix, then there exists $C$ such that $A=C'C$ where $C$ is an upper triangular matrix, that is called the Cholesky decomposition of A.
   * We may obtain $c_{ij}$, from the followings:
     * $c_{11} = \sqrt{a_{11}}$
     * $c_{1j} = \frac{a_{1j}}{c_{11}} \text{ for } 2 \le j \le p$
     * $c_{ii} = \sqrt{a_{ii} - \sum_{k=1}^{i -1} c^2_{ki}} \text{ for } 2 \le i \le p$
     * $c_{ij} = \frac{a_{ij} - \sum{k=1}^{i-1} c_{ki}c_{kj}}{c_{ii}} \text{ for } 2 \le i < j \le p$
     * $c_{ij} = 0 \text{ otherwise }$

### 1.8 Orthogonal vectors and matrices
### 1.9 Eigenvalues and eigenvectors
### 1.10 Spectral decomposition
 * Theorem 1. Let A be a real symmetric matrix. Let $Q = (e_1, ..., e_p)$ be an orthogonal matrix of which the jth column is equal to the eigenvector with the corresponding real eigenvalue $\lambda_j$. We may decompose $A$:
   * $A = Q diag(\lambda_1, ..., \lambda_p) Q^T \\\\ = Q \Lambda Q^T \\\\ = \sum_{i=1}^p \lambda_i e_j e_j^T$
 * Remark 9.:
   * 1. If $A$ is a real symmetric positive definite matrix, then all $\lambda_i > 0$. Conversely, if a real symmetric matrix $A$ has all eigenvalues $\lambda_i > 0$, then A is positive definite.
   * 2. We may define $A^{1/2}$ for a real symmetric positive definite matrix $A$ by:
     * $A^{1/2} = Q diag(\sqrt{\lambda_1}, ..., \sqrt{\lambda_p}) Q'$
   * 3. The inverse of a symmetric matrix may be written as:
     * $A^{-1} = Q diag(\frac{1}{\lambda_1}, ..., \frac{1}{\lambda_p}) Q'$

### 1.11 Cauchy-Schwarz inequality
 * Theorem 2 (cauchy-Schwarz inequality). Let $u$ and $v$ be two vectors in $R^p$. Then:
   * $(u'v)^2 \le (u'u)(v'v)$
   * The equality holds if and only if $u= cv$ or $v = cu$ for some constant $c$.

 * Theorem 3 (Extended Cauchy-Schwarz inequality). Let $A$ be a $p \times p$ positive definite symmetric matrix. Let $u$ and $v$ be two vectors in $R^p$. Then,:
   * $(u'v)^2 \le (u' A u)(v' A^{-1} v)$
   * The equality holds if and only if $u = cA^{-1}v$ or $v = cAu$ for some $c$.
 * $Lemma 1$ (Maximization Lemma). Let $A$ be a $p \times p$ positive definite symmetric matrix. Let v be a vector in $R^p$. Then, for any nonzero vector $x \in R^p$,:
   * $max_{x \not = 0} \frac{(x'v)^2}{x'Ax} = v' A^{-1} v$

 * Proposition 4 (Maximization of Quadratic Forms on the Unit Spehre). Let $A$ be a positive definite symmetric matrix with eigenvalues $\lambda_1 \ge \lambda_2 \ge ... \ge \lambda_p \ge 0$ and associated eigenvectors $e_1, e_2, ..., e_p$:
   * Then,
   * $max_{x \not = 0} \frac{x' A x}{x' x} = \lambda_1$ attained when $x = e_1$
   * $max_{x \bot e_1, ..., e_k} \frac{x' A x}{x'x} = \lambda_{k+1}$ attained when $x=e_{k+1}$

### 1.12 Differentiation in Vectors and Matrices
 * Let $x = (x_1, ..., x_p)' \in R^p$. Let $f(x) = f(x_1, ..., x_p)$ be a function from $R^p$ to $R$.

### 1.13 Some useful quantities
 * Proposition 5. Let x be a vector in $R^p$ and let $A$ and $B$ be $p \times p$ matrices.:
   1. $x^T A x = tr(xx^T A^T) = tr(x(Ax)^T)$
   2. $\frac{\partial}{\partial A} tr(AB) = B^T$
   3. $\frac{\partial}{\partial A} log \vert A \vert = (A^{-1})^T$ if $\vert A \vert > 0$

### 1.14 Random vectors and matrices
#### 1.14.1 Parameter vectors and matrices


## 2. Chapter 2 Multivariate Normal Distribtuion
### 2.1 Definitions
 * Definition 2.1.1. A univariate normal density is:
   * $f(x) = \frac{1}{\sqrt{2 \pi} \sigma} exp(- \frac{(x - \mu)^2}{2 \sigma^2})$
   * It is symmetric about the mean $\mu$ and mound (bell)-shaped curve, hence unimodel.
 * Definition 2.1.2. A bivariate normal random vector $X = (X_1, X_2)'$ has mean $\mu = (\mu_1, \mu_2)'$ and variance-covariance matrix $\Sigma = \begin{pmatrix} \sigma_1^2 & \sigma_1 \sigma_2 \rho \\\\ \sigma_1 \sigma_2 \rho & \sigma_2^2 \end{pmatrix}$ where $\sigma_i^2 = Var(X_i)$ and $\rho = Cor(X_1, X_2) = \frac{Cov(X_1, X_2)}{\sigma_1 \sigma_2}$ so that $Cov(X_1, X_2) = \sigma_1 \sigma_2 \rho$. The density function of a bivariate normal $X = (X_1, X_2)'$ is defined by:
   * $f(x_1, x_2) = \frac{1}{2 \pi \sigma_1 \sigma_2 \sqrt{1 - \rho^2}} exp(-\frac{1}{2(1 - \rho^2)} (\frac{(x_1 - \mu_1)^2}{\sigma_1 ^2} - \frac{2 \rho (x_1 - \mu_1)(x_2 -\mu_2)}{\sigma_1 \sigma_2} + \frac{(x_2 - \mu_2)^2}{\sigma_2^2}))$
   * for $-infty < x_1, x_2 < \infty$

 * Remark 1.:
   * We can see that $X_1$ and $X_2$ are independent if $\rho_{12} = 0$ since $f(x_1, x_2) = f_1(x_1) f_2(x_2)$

 * Definition 2.1.3 (Multivariate Normal Random Vector). A p-variate random vector $X = (X_1, ..., X_p)^T$ is said to be a normal random vector with mean $\mu$ and covariance $\Sigma$ if the joint density is:
   * $f(x_1, ..., x_p \vert \mu, \Sigma) = \frac{1}{(2 \pi)^{\frac{p}{2}} \vert \Sigma \vert ^{1/2}} exp ( - \frac{(x - \mu)^T \Sigma ^{-1} (x- \mu)}{2})$

### 2.2 Properties of multivariate normal distribution
 * 1. Linear combinations of the components of $X ~ N_p(\mu, \Sigma)$ are normally distributed.:
   * Let $a = (a_1, ..., a_p)^T$ be a column vector in $R^p$. Then $a^T X$ has a univariate normal distribution:
     * $a^T X ~ N_1(a^T \mu, a^T \Sigma a)$
     * Conversely, if the lienar combination $a^T X ~ N(a^T \mu, a^T \Sigma a)$ for every $a \in R^p$, then $X ~ N_p(\mu, \Sigma)$.
   * Remark 2. If every linear combination of $X_1, ..., X_p$ has a univariate normal distribution, then $X=(X_1, ..., X_p)'$ has a multivariate normal distribution. Note that the condition must hold for every linear combination.

 * 2. Let $A$ be a $q \times p$ matrix. Then $AX ~ N(A \mu, A\Sigma A^T)$. For any vector $b \in R^q, b^T (AX) = (b^T A)X$ is normally disributed from (Property 1) -> $AX$ is normally distributed. The mean vector is $E(AX) = A \mu$ and the covariance matrix is $E[(AX - A \mu)(AX - A\mu)^T] = A E[(X - \mu)(X - \mu)^T] A^T = A \Sigma A^T$.

 * 3. All subsets of the components of $X$ have a (multivariate) normal distribution.:
   * Let $X = \begin{pmatrix} X_1 \\\\ X_2 \end{pmatrix}$ be a partition of $X$. Let $\mu = \begin{pmatrix} \mu_1 \\\\ \mu_2 \end{pmatrix}$ and $\Sigma = \begin{pmatrix} \Sigma_{11} & \Sigma_{12} \\\\ \Sigma_{21} & \Sigma_{22} \end{pmatrix}$. Then
   * $X_1 ~ N(\mu_1, \Sigma_{11})$
   * $X_2 ~ N(\mu_2, \Sigma_{22})$
 * Remark 3. If a random vector $X = (X_1, ..., X_p)'$ has a multivariate normal distribution, then every component X, has marginally a univariate normal distribution. However, the converse is not true. The counter example can be constructed as follow: define the joint density of $X = (X_1, X_2)'$ by:
   * $f(x_1, x_2) = I(\text{ for } x_1x_2 \ge 0) 2 \phi(x_1) \phi(x_2)$
   * where $\phi(x)$ is a standard normal density. The marginal distribution of $X_i$ is a standard normal distribution.
 * 4. Covariance zero implies that the corresponding components are independently distributed, that is , $Cov(X_1, X_2) = 0$ if and only if $X_1$ and $X_2$ are independent.:
   * Let $X = \begin{pmatrix} X_1 \\\\ X_2 \end{pmatrix} ~ N ( \begin{pmatrix} \mu_1 \\\\ \mu_2 \end{pmatrix}, \begin{pmatrix} \Sigma_{11} & \Sigma_{12} \\\\ \Sigma_{21} & \Sigma_{22}\end{pmatrix})$. If $\Sigma_{12} = 0$, then $X_1$ and $X_2$ are independent.

 * 5. The conditional distributions of the components are (multivariate) normal, that is, let $X = \begin{pmatrix} X_1 \\\\ X_2 \end{pmatrix} ~ N(\begin{pmatrix} \mu_1 \\\\ \mu_2 \end{pmatrix}, \begin{pmatrix} \Sigma_{11} & \Sigma_{12} \\\\ \Sigma_{21} & \Sigma_{22} \end{pmatrix})$. Then $X_1 \vert _{X_2 = x_2}$ has a multivariate normal distribution.
 * Remark 4. Forsimplicity, let $\mu = 0$. Note that:
   * $(X_1^T, X_2^T) \Sigma^{-1} \begin{pmatrix} X_1 \\\\ X_2 \end{pmatrix} = (X_1 - \Sigma_{12} \Sigma_{22}^{-1} X_2)^T \Sigma_{11.2}^{-1} (X_1 - \Sigma_{12} \Sigma_{22}^{-1}X_2) + X_2^T \Sigma_{22}^{-1} X_2$
   * where $\Sigma_{11.2} = \Sigma_{11} - \Sigma_{12} \Sigma_{22}^{-1} \Sigma_{21}$

 * 6. Suppose that $X ~ N_p(\mu, \Sigma)$. Then $(X - \mu)^T \Sigma^{-1} (X - \mu) ~ \chi_{p}^2$

### 2.3 Estimation for sampling from a multivariate normal distributions
 * There are many methods of the point estimations such as the method of moments (MM), the maximum likelihood estimation (MLE), the minimum variance unbiased estimation, etc. Under the multivariate normality assumption on the population, we may need to estimate the population mean vector $\mu$ and the population variance-covariance matrix $\Sigma$. The maximum likelihood estimatiors of $mu$ and $\Sigma$ are frequently used since they are asymptotically optimal in some sense.

#### 2.3.1 Likelihood function of a sample from a multivariate normal distribution
 * Let $X_i \stackrel{\text{iid}}{~} N_p(\mu, \Sigma)$ for $i = 1, ..., n$ be a random sample from a multivariate normal with mean $\mu$ and covariance $\Sigma$. The likelihood function and the log-likelihood funciton may be written as:
   * $L(\mu, \Sigma; x_1, ..., x_n) = f(x_1, ..., x_n; \mu, \Sigma)$ <- joint pdf
   * $= \prod_{i=1}^n f(x_i ; \mu, \Sigma)$ <- indpendent and identically distributed
   * $= \prod_{i=1}^n (\frac{1}{(2 \pi)^{p/2} \vert \Sigma \vert ^ {1/2}} exp(-\frac{(x_i - \mu)^T \Sigma^{-1} (x_i - \mu)}{2}))$
   * $= \frac{1}{(2 \pi)^{np/2} \vert \Sigma \vert ^{n/2}} exp (-\frac{1}{2} \sum_{i=1}^n (x_i - \mu)^T \Sigma^{-1} (x_i - \mu))$
   * $l(\mu, \Sigma; x_1, ..., x_n) = log L(\mu, \Sigma; x_1, ..., x_n) \\\\ = - \frac{1}{2} \sum_{i = 1}^n (x_i - \mu)^T \Sigma^{-1} (x_i - \mu) - \frac{n}{2} log \vert \Sigma \vert - \frac{np}{2} log(2 \pi)$

#### 2.3.2 Maximum likelihood estimations (MLEs) from a multivariate normal distribution
 * A typical way to find the MLEs is to maximize the log-likelihood function in the paraeters.
 * The maximum likelihood estimator (MLE) of the mean vector is:
   * $\hat \mu = \bar X = \frac{1}{n} \sum_{i=1}^n X_i$
 * and the MLE of the covariance matrix is:
   * $\hat \Sigma = S_n = \frac{1}{n} \sum_{i=1}^n (X_i - \bar X)(X_i - \bar X)^T$
 * Remark 5 (Another proof for $\hat \Sigma = \frac{1}{n} \sum_{i=1}^n (x_i \bar x)(x_i - \bar x)')$. It can be shown that $\frac{\partial}{\partial A} log \vert A \vert = (A^T)^{-1}$ and $\frac{\partial}{\partial A} tr(AB) = B'$:
   * $l(\bar X, \Sigma) = - \frac{1}{2} np log(2 \pi) - \frac{1}{2} n log \vert \Sigma \vert -\frac{1}{2} \sum_{i=1}^n (X_i - \bar X)^T \Sigma^{-1} (X_i - \bar X) \\\\ = -frac{1}{2} np log(2 \pi) + \frac{1}{2} n log \vert \Sigma^{-1} \vert - \frac{1}{2} tr(\Sigma^{-1} \sum_{i=1}^n (X_i - \bar X)(X_i - \bar X)^t)$
   * $\frac{\partial}{\partial \Sigma^{-1} l(\bar X, \Sigma)} = \frac{1}{n} \Sigma - \frac{1}{2} \sum_{i=1}^n (X_i - \bar X)(X_i \bar X)^T = O$
   * $\hat \Sigma = \frac{1}{n} \sum_{i=1}^n (X_i -  \bar X) (X_i - \bar X)^T$

### 2.4 Sampling distributions of $\bar X$ and $S$
 * Recall 3 (Sampling distributions from a univariate normal distribution (p = 1)). When $X_1, ..., X_n$ is a random sample from $N(\mu, \sigma^2)$:
   * $\bar X = \frac{X_1 + ... + X_n}{n} ~ N(\mu, \frac{\sigma^2}{n})$
   * $(n-1)\frac{S^2}{\sigma^2} = \frac{1}{\sigma^2} \sum_{i=1}^n (X_i - \bar X)^2 ~ \chi_{n-1}^2$
 * In addition, the sample mean $\bar X$ and the sample variance $S^2$ are independent.

 * Summary of sampling distributions from a multivariate normal $N_p(\mu, \Sigma)$:
   1. The MLE $\mu = \bar X$ of the mean vector $\mu$ is normally distributed as:
     * $\hat \mu = \bar X ~ N_p(\mu, \frac{1}{n} \Sigma)$
   2. The MLE $\hat \Sigma = S_n = \frac{1}{n} \sum_{i=1}^n (X_i - \bar X)(X_i - \bar X)^T$ of $\Sigma$ is distributed as:
     * $n \hat \Sigma = (n -1)S \\\\ = \sum_{i=1}^n(X_i - \bar X)(X_i - \bar X)^T \\\\ = \sum_{j=1}^{n-1} Z_j Z_j^T$
     * where $Z_i \stackrel{\text{iid}}{~} N_p(0, \Sigma)$
   3. Additionally, $\bar X$ and $S$ are independent.

### 2.5 Definition and Properties of the Wishart Distirubiton
 * Definition 2.5.1 (Wishart distribution with m degrees of freedom). Let $Z_i ~ N_p(0, \Sigma)$ be and iid random sample. The distribution of $\sum_{i=1}^m Z_i Z_i^T$ is defined as the Wishart distribution of m degrees of freedom, denoted by $W_m(\Sigma)$ or $W(\bullet \vert \Sigma, m)$ or $W(p, m, \Sigma)$.

 * Remark 6. Wishart distribution for a univariate random variable euqls a chi-square distribution up to a constant multiplication. When $p=1$ and $\Sigma = 1$, $W_m(\sigma^2) = \sigma^2 \chi_m^2$

 * Remark 7. Suppose $W_1 ~ W(p, m_1, \Sigma)$ and they are independent. The sum of two random matrices $W_1 + W_2 ~ W(p, m_1 +m_2, \Sigma)$

### 2.6 Large sample distributions for $\bar X$ and $S$
 * Let $X_1, X_2, ..., X_n$ be independent observations from a population with mean $\mu$ and finite (nonsingular) covariance $\Sigma$. Then:
   * $\sqrt{n}(\bar X - \mu) ~ N_p(0, \Sigma)$
   * $n (\bar X - \mu)^T S^{-1} (\bar X - \mu) ~ \chi_p^2$

### 2.7 Assessing the assumption of multivariate normality
 * Recall 4 (Checking the assumption of univariate normality). Let $X_i \stackrel{\text{iid}}{~} \text{ a density } f$
 * Graphical methods: a normal Q-Q plot:
   * Rearrange the observation in ascending order: $x_{(1)} \le \cdots \le x_{(n)}$
   * Find $q_j$ so that $P(Z \le q_j) = \frac{j - 1/2}{n}$ for $j = 1, ..., n$.
   * Plot $(q_j, x_{(j)})$
   * Check whether the points ar eapproximately on a straight line.
 * Formal hypothesis tests: Correlation coefficent test, Shapiro-Wilk test, Kolmogorov test (Lilliefors test), etc. Note that we will mostly likely reject the normality when the sample size is large because the true density in reality is not normal.

 ---
  * For a multivariate dataset, we may use a chi-square plot as blow:
    1. Marginal normality check for each variable (We use the univariate methods with each variable).
    2. Chi-square plot: Use $(X - \mu)^T \Sigma^{-1}(X - \mu) ~ \chi_m^2$ if $X ~ N_m(\mu, \Sigma)$:
      1. Calculate $d_j^2 = (X_j - \bar X)^T \Sigma^{-1} (X_j - \bar X)$
      2. Rearrange $d_j^2$ in ascending order: $d_{(1)}^2 \le d_{(2)}^2 \le ... \le d_{(1)}^2$
      3. Find $q_j$ such that $P(x_m^2 \le q_j) = \frac{j- 1/2}{n}$
      4. Plot $(q_j, d_{(j)}^2)$
      5. Check whether the points are approximately on a straight line.
    3. Formal hypothesis test:
      * Mardia's test based on multivariate extensions of skewness and kurtosis measures.:
        * $MS = \frac{1}{6n} \sum_{i=1}^n \sum_{j=1}^n [(x_i - \bar x)^T \hat \Sigma ^{-1} (x_j - \bar x)]^3$
        * $MK = \sqrt{\frac{n}{8m(m+2)}}(\frac{1}{n} \sum_{i=1}^n [(x_i - \bar x)^T \hat \Sigma^{-1} (x_j - \bar x)]^2 - m(m+2))$
        * Under the null hypothesis of multivariate normality, the statistic MS will have approximately a chi-squared distribution with $\frac{1}{6} m (m + 1) (m + 2)$ degrees of freedom, and MK will be approximately standard normal $N(0, 1)$.

      * Henze-Zirkler's test based on the empirical characteristic function:
        * $HZ_{\beta} = \frac{1}{n^2} \sum_{i=1}^n \sum_{j=1}^n e^{- \frac{\beta^2}{2} (x_i - x_j)^T \hat \Sigma^{-1} (x_i - x_j)} - \frac{2}{n(1 + \beta^2)^{m/2}} \sum_{i=1}^n e^{- \frac{\beta ^ 2}{2(1 + \beta^2)} (x_i - \bar x)^T \hat \Sigma^{-1} (x_i - \bar x)} + \frac{1}{(1 + 2 \beta^2)^{m/2}}$
        * where $\beta = \frac{1}{\sqrt{2}} (\frac{(2m + 1)n}{4})^{1/(m+4)}$ is a common choice. The HZ test rejects normality if $HZ_{\beta}$ is too large.
      * There are many other tests ssuch as Royston's test ,Coornik-Hansen's test, and Energy test.
      * An R package MVN includes the above tests.

### 2.8 Transformations to near normality
 * When the assumption of normality fails, we may try to transform the dataset so that the normality assumption is not significantly violated for the transformed data.

---
 * For univariate data, there are transformations that are commonly applied in order to make data close to a normal distribution.
 1. Theoreticall transformations:
   * Count y : $\sqrt{y}$
   * Proportion $\hat p$ : $logit(\hat p) = log \frac{\hat p }{1 - \hat p}$
   * Correlation r : Fisher's z transform $z = log(\frac{1+r}{1-r})$

 2. Power transformations: When all observations are nonnegative, we may consider a family of power transformations. If some measurements are negative, then we first add a constant to all measurements and then apply a power transformation.:
   * $x_i + c \rightarrow (x_i + c)^{\lambda}$

 3. Box-Cox transformations: The Box-Cox transformation family is similar to the power transformation. This family continuously connects the logarithmic transform as the power $\lambda$ approaches zero.:
   * $x^{(\lambda)} = \begin{cases} \frac{x ^{\lambda} - 1}{\lambda} & for \lambda \not = 0 \\\\ log x & for \lambda = 0 \end{cases}$
   * for $x > 0$. We choose $\lambda$ by maximizing the log-likelihood function:
     * $l(\lambda) = - \frac{n}{2} log [\frac{1}{n} \sum_{i = 1}^n (x_i^{(\lambda)} - \bar {x ^ {(\lambda)}})^2] + (\lambda - 1) \sum_{i=1}^{n} log x_I$
 4. Note that we should not expect some transformation can always make the data close to normality.

---
 * 내 나름대로 정리
 * Wishart 분포:
   * Chi-square(카이제곱) 분포의 다변량 버전
   * 표본 추정치의 근사추정 분포로 사용
   * 자유도는 표본의 크기와 동일하다.
   * 분포를 결정하는 요소는 자유도, feature의 개수(p), 분산-공분산 행렬이기에 $W(p, m, \Sigma)$로 표현 가능하다.
   * 독립이고 공분산이 같고 동일 feature의 확률 변수 $W_1$과 $W_2$를 더하면 표본의 개수가 늘어났다고 생각할 수 있다. $W_1 + W_2 ~ W(p, m_1 + m_2, \Sigma)$
 * 공분산 행렬의 MLE는 $\hat \Sigma = S_n = \frac{1}{n} \sum_{i=1}^n (X_i - \bar X)(X_i - \bar X)^T$ 이다.
 * 표본의 크기가 커진다면,:
   * $\sqrt{n}(\bar X - \mu) ~ N_p(0, \Sigma)$
   * $n(\bar X - \mu)^T S^{-1} (\bar X - \mu) ~ \chi_p^2$:
     * univariate랑 비교해보면 $\sum_{i=1}^n (\frac{X_i - \mu}{\sigma})^2$에서 분자부는 $\bar X - \mu$가 구성하고, 분모부는 $S^{-1}$이 있다고 생각할 수 있다. (유도해보면 가운데에 분산이 들어가야 한다는 것을 알 수 있다.)

 * 그래서 지금 구한걸로 어캐 쓰는데?:
   * 각 변수들의 각자의 정규성(marginal normality)를 검증하는데 쓰임
   * Chi-square plot을 그려서 직선을 그리는지 확인(??? 이건 뭘 확인하고자 하는거지?) : 일단 찾아보니까 이거 그렸을 때 동일 직선 위에 있는게 아니면 outlier랍니다.
   * Mardia's test를 적용하면 다변량에서 정규성을 검증할수 있다. (2008년에 나왔네 신기)
   * Henze-Zirkler's test도 다변량에서 정규성을 검증하는데 쓰인다는데, 잘 모르겠네
   * 이외에도 다양한 테스트들이 있음.

## Chapter 3 Hypothesis tests
 * In this chapter, we consider a hypothesis test of a normal mean vector $\mu = (\mu_1, ..., \mu_p)'$. For example, we want to test $H_0 : \mu = \mu_0$, that is , we are about to test $\mu_i = \mu_{0i}$ for all $i=1,...,p$ simultaneously. The separate univariate tests such as z-test or t-test do not properly work for testing a multivariate mean vector.
 1. The use of p univariate tests inflates the Type I erro rate, $\alpha$, whereas the multivariate test preserves the exact $\alpha$ level.:
   * For example, if we do $p=10$ separate univariate tests at the .05 level, the probability of at least one false rejection is greater than .05 If the variables were independent (they rarely are), we would have (under $H_0$):
     * Pr(at least one rejection) = 1 - Pr(all 10 tests accept $H_0$) = 1 - $(.95)^10$ = .40
   * The resulting overall of .40 is not an acceptable error rate. Typically, the 10 variables are correlated, and the overall $\alpha$ would lie somewhere between .05 and .40.
 2. The univariate tests completely ignore the correlations among the variables, wehreas the multivariate tests make direct use of the correlations.
 3. The multivariate tests are more powerful than univariate tests in many cases.:
   * The power of a test is the probability of rejecting $H_0$ when it is false. in some cases, all p of the univariate tests fail to reach significance, but the multivariate test is significant because small efects on some of the variables combine to jointly indicate significance. However, for a given sample size, there is a limit to the number of variables a multivariate test can handle without losing power.
   * We shall use the concepts, definitions, and results from Chapter 1 through Chapter 3 to develop multivariate statistical methos for analyzing multivariate data reaching statistical conclusions concerning a population based on information from a random sample. We concentrate on formal inferences about a population mean vector $\mu = (\mu_1, ... \mu_p)'$ and its components. Hotelling's $T^2$ test is a popular procedure for testing a multivariate normal mean vector. It is a generalization of the Student's t test that is frequently used for testing a normal mean. An important concept of multivariate statistical analysis is that p correlated variables must be analyzed jointly rather than marginally. We also present a full statistical analysis of the component means based on simultaneous confidence statements.

### 3.1 Review of hypothesis tests for a univariate normal mean
#### 3.1.1 When $\sigma^2$ is known
 * A random sample $X_1, ..., X_n$ of size n is chosen from $N_1(\mu, \sigma^2)$ with known population variance $\sigma^2$. A hypothesis test of $H_0$ : \mu = \mu_0$ is performed on a basiss of:
   * $\sqrt{n} \frac{\bar X - \mu_0}{\sigma} ~ N(0, 1) \text{ under } H_0$
   * $n(\bar X - \mu_0)(\sigma^2)^{-1} (\bar X - \mu_0) ~ \chi_1^2 \text{ under} H_0$
   * that is called a z-test.

#### 3.1.2 When $\sigma^2$ is unknown
 * Consider a univariate hypothesis test $H_0 : \mu = \mu_0$ against $H_1 : \mu \not = \mu_0$ when a random sample $X_1, ..., X_n$ is selected from $N(\mu, \sigma^2)$. Asignificant test can be conducted based on the test statistic $t = \frac{\bar X - \mu_0}{s / \sqrt{n}}$ that is called a t test. The unull distirubtion of the statistic is a Student's t distribution

### 3.2 Hypothesis test on one sample multivariate normal mean vector
#### 3.2.1 When the covariance matrix $\Sigma$ is known
 * $n(\bar X - \mu)' \Sigma^{-1} (\bar X - \mu) ~ \chi_p^2$
 * Under $H_0 : \mu = \mu_0$, we perform a multivariate $z^2$ test based on $n (\bar X - \mu_0)' \Sigma^{-1} (\bar X - \mu_0) ~ \chi_p^2$.
 * In practice, it is more common that we do not have information of the population covariance matrix $\Sigma$.

#### 3.2.2 Hotelling's $T^2$ Statistic: when $\Sigma$ is unknown
 * Univrariate: The Student's T statistic is:
   * $t = \sqrt{n} \frac{\bar X - \mu_0}{s}$
   * $t^2 = n (\bar X - \mu_0) s^{-2} (\bar X - \mu_0) ~ t_{n-1}^2 = F_{1, n-1}$ under $H_0 : \mu=\mu_0$
   * Reject $H_0$ if $n(\bar X - \mu_0) s^{-2} (\bar X - \mu_0) \ge t_{n-1, \alpha / 2}^2$
 * Multivariate: The multivariate analog of the square of Student's T statistic is:
   * $T^2 = n (\bar X - \mu_0)^T S^{-1} (\bar X - \mu_0) ~ \frac{(n-1)p}{n - p} F_{p, n-p}$ under $H_0: \mu=\mu_0$
   * where $X_i \stackrel{\text{iid}}{~} N_p(\mu, \Sigma)$. It is called a Hotelling's $T^2$ stastistic.
 1. Note $T^2 = Z'(\frac{W}{v})^{-1}Z ~ \frac{vp}{v + 1 - p}F_{p, v+ 1-p}$, where $Z ~ N_p(0, \Sigma)$ and $W ~ Wischart(p, v, \Sigma)$ are independent.
 2. Note that $pF_{p, n-p} \rightarrow \chi_p^2$ so that $T^2 ~ \chi_p^2$ for a large sample under $H_0$
 3. $T^2$ statistic is invariant under linear transformation, that is, Hotelling $T^2$ statistic does not depend on the measurement units.

### 3.3 Hotelling's $T^2$ and likelihodd ratio tests
 * One of general procedure to construct a hypothesis test is the likelihood ratio test(LRT). We may apply the LRT to test multivariate normal mean. Suppose a random sample $x_1, ... x_n$ is drawn from a multivariate normal distribution $N_p(\mu, \Sigma)$. Under$H_0: \mu = \mu_0$, the maximum likelihood estimate (MLE) for $\Sigma$ can be obtained as $\hat \Sigma_0 = \frac{1}{n} \sum_{i=1}^n (x_i - \mu_0)(x_i - \mu_0)'$. The MLEs under no restriction are derived in previous chapter: $\hat \mu = \bar x$ and $\hat \Sigma = \frac{1}{n} \sum_{i=1}^n (x_i - \bar x)(x_i - \bar x)'$. We write the LRT:
   * $LRT = \Lambda = \frac{max_{H_0} L(\mu, \Simga: x_1, ..., x_n)}{max_{H_0 \cup H_1} L(\mu, \Sigma: x_1, ... x_n)} = \frac{\vert \hat \Sigma \vert}{\vert \hat \Sigma_0 \vert}^{n/2}$
 * The test statistic $\Lambda^{2/n}$ is called Wilks' lambda and we can show with some algebra that:
   * $\Lambda^{2/n} = (\frac{\vert \hat \Sigma \vert}{\vert \hat \Sigma_0 \vert}) = \frac{1}{\frac{1 + \frac{T^2}{n - 1}}}$
 * Therefore, the LRT is equivalent to Hotelling's $T^2$ test.
 * We rejct $H_0$ when LRT is small that equivalent to we rejct $H_0$ when $T^2$ is large.

### 3.4 Confidence regions and multiple testing
 * We can extend the concept of a univariate confidence interval to a multivariate confidence region. A univariate onfidence interval is commonly constructed by a pivotal quantity. For example, suppose $Y_1, ..., Y_n$ be a random sample from $N(\mu, \sigma^2)$. The quantity:
   * $\sqrt{n} \frac{\bar Y - \mu}{S} ~ t_{n-1}$
   * consists of the measurements of the sample and the parameter of interest $\mu$ with known distribution that does not depend on the parameter $\mu$. We call it a pivotal quantity for $\mu$. Since:
     * $Pr(-t_{n-1, \alpha / 2} \le \sqrt{n} \frac{\bar Y - \mu}{S} \le t_{n-1, \alpha / 2}) = 1 - \alpha$
     * $Pr(\bar Y - t_{n=1, \alpha / 2} \frac{S}{\sqrt{n}} \le \mu \le \bar Y + t_{n-1, \alpha/2 \frac{S}{\sqrt{n}}) = 1 - \alpha$
     * $Pr(\bar y - t_{n-1, \alpha / 2} \frac{s}{\sqrt{n}} \le \mu \le \bar y + t_{n-1, \alpha / 2} \frac{S}{\sqrt{n}}) = 1 - \alpha$
 * The upper limit of the $100 ( 1- \alpha) %$ two-sided confidence interval is $\bar y + t_{n-1, \alpha/2} \frac{s}{\sqrt{n}$ and the lower limit is $\bar y - t_{n-1, \alpha/2} \frac{s}{\sqrt{n}}}$. We call $1-\alpha$ the confidence coefficient or confidence level. Similarly, we apply the pivotal quantity approach to construct a confidence region for a multivariate normal eman vector. Assume that a random sample $X_1, ..., X_n$ is chosen from $N_p(\mu, \Sigma)$:
   * $n(\bar X - \mu)' S^{-1} (\bar X - \mu) ~ \frac{(n-1)p}{n-p} F_{p, n - p}$
   * is a pivotal quantity for the normal mean vector $\mu$.
 * $Pr(n(\bar X - \mu)' S^{-1} (\bar X - mu) \le \frac{(n-1)p}{n - p}F_{p,n-p, \alpha}) = 1 - \alpha$
 * A $100(1-\alpha)%$ confidence region ofr the mean vector of a p-dimensional multivariate normal distribution is the ellipsoid determined by all vectors $\mu$ satisfying:
   * $n(\bar x -\mu)' S^{-1} (\bar x - \mu) \le \frac{(n-1)p}{n-p} F_{p, n-p, \alpha}$
   * where $\bar x = \frac{1}{n} \sum_{i=1}^n x_i$ and $S = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar x)(x_i - \bar x)'$ given a random sample $x_1, ..., x_n$

#### 3.4.1 Simultaneous confidence intervals
 * Scheffe's method:
   * For a given p-dimensional vector a, a random variable $a'X ~ N_1(a'\mu, a'\Sigma a)$. A confidence interval for $a'\mu$ is obtained based on:
     * $t^2 = n \frac{(a'\bar x - \a' \mu)^2}{a'Sa} \le t_{n-1, \alpha/2}^2$
   * A simultaneous confidence interval for all $a$ can be constructed by finding $c^2$ such that:
     * $t^2 = n \frac{(a' \bar x - a' \mu)^2}{a'Sa} \le c^2$
     * for all $a$ and we obtain $c^2$ by maximizing $t^2$ over all possible $a \not = 0$:
       * $max_a t^2 = n [ max_a \frac{(a' \bar x - a' \mu)^2}{a'Sa} ] = n(\bar x - \mu)' S^{-1} (\bar x - \mu)$ = Hotelling's $T^2$
       * since it is maximized when $a$ is proportional to $S^{-1} (\bar x - \mu)$ from Cauchy-Schwarz inequality
       * $Pr(a' \bar X - \sqrt{\frac{(n - 1)p}{n - p} F_{p, n-p, \alpha} \frac{a'Sa}{n} \le a' \mu \le a' \bar X + \sqrt{\frac{(n-1)p}{n-p} F_{p, n-p, \alpha} \frac{a'Sa}{n}} \text{ for all a })$
 * Remark. Scheffe's simultaneous confidence interval for $a' \mu$ may be obtained by a projection of Hotelling's $T^2$ contour $n(x - \mu)'S^{-1}(x - \mu) = \frac{(n-1)p}{n-p}F_{p, n-p, \alpha}$ onto the vector a. The gradient vector must be proportional to a, that is, $S^{-1}(\bar x - \mu) = ka$. By substition of this into the equation of the ellipsoid, we have $k = \pm \sqrt{\frac{(n-1)p}{n-p} F_{p, n-p, \alpha} \frac{n a' S a}}$. Therefore, $a'(\bar x - \mu) = ka'Sa = \pm \sqrt{\frac{(n-1)p}{n-p} F_{p, n-p, \alpha} \frac{n a' S a}}$
 * Bonferroni's method:
   * Another popular but conservative simultaneous confidence intervals are called Bonferroni method. This approach is derived from the following Bonferroni inequality. Let $C_i$ be a confidence statement for $\mu_i$ with confidence coefficient $\alpha_i$. We want to make sure the probability that all $C_i$ for i = 1, ..., p are true with $1 - \alpha$:
     * $Pr(\text {All } C_i \text{ true}) = 1 - Pr(\text{At least one C_i false}) \\\\ \ge 1 - \sum_{i=1}^p Pr(C_i false) \\\\ = 1 - (\alpha_1 + ... + \alpha_p) = 1 - p \alpha'$
   * Therefore, we choose $\alpha' = \alpha_1 = ... = \alpha_p = \frac{a}{p}$ for each confidence coefficient. 
