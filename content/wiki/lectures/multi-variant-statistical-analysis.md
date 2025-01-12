---
layout: wiki
title: Multi Variant Statistical Analysis
summary: 2021-fall lecture
date: 2021-09-24 12:38:16 +0900
lastmod: 2025-01-12 23:33:56 +0900
tags: 
draft: false
parent: lectures
---

## Chapter 0. Introduction
 * Why do we need multivariate methods?:
   * (Multivariate data) Several measurements, referred to as variables, are node on each unit(individual, item, object, or subject). The variables are commonly correlated each other.
   * (Multivariate methods):
     * Descriptive statistics : simplifications, untangling the overlapping information and finding linear combinations of variables
     * Inferential statistics: Formal estimation, hypothesis tests, and statistical modeling under the correlated structure of the data. Many multivariate statistical methods are extensions of the corresponding univariate methods.

### 0.1 Visualization of Multivariate Data
 * The following list includes several graphical methods to display multivariate data. Note the each face or star in Chernoff faces and star plot is made based on the measurements on a unit while the scatter plot matrix or scatter plots are made based on the variables.

```r
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
---


# Chapter 0. Introduction
- Why do we need multivariate methods?
	- (Multivariate data) Several measurements, referred to as variables, are made on each unit (individual, item, object, or subject). The variabels are commonly correlated ech other.
	- (Multivariate methods) A collection of statistical methods that can handle multivariate data.
		- Descriptive statistics : simplifications, untangling the overlapping information and finding linear combinations of variables
		- Inferential statistics : Formal estimation, hypothesis test, and statistical modeling under the correlated structure of the data. Many multivariate statistical methods are extensions of the corresponding univariate methods.

## 0.1. Visualization of Multivariate Data
1. Scatter Plot Matrix
	```r
	library(psych)
	pairs.panels(USArrests)
	```
2. Chernoff's Faces
	```r
	library(aplpack)
	faces(USArrests, face.type=1, cex=0.5)
	```
3. Star plot
	```r
	stars(USArrests)
	```
4. 3-D scattor plot
	```r
	library(scatterplot3d)
	scatterplot3d(USArrests[,-3], type="ht", highlight.3d=TRUE,
				  angle=55, scale.y=0.7, pch=16, main="USArrests")
	```
5. 3-D roated plot
	```r
	library(rgl)
	plot3d(USArrests[, -3])
	```
6. Profile plot:
	```r
	library(MASS)
	parcoord(USArrests, col=c(1+(1:50)), var.label=T)
	```
7. Growth curves for longitudinal data
	```r
	library(nlme)
	library(ggplot2)
	p <- ggplot(data = Orthodont, aes(x = age, y=distnace, group = Sbuject, colour=Subject))
	p + geom_line()
	p + geom_line() + facet_grid(.~Sex)
	```
---
### Summary of Introduction
- Two or more variables are measured on each subject $\rightarrow$ multivariate data
- Multivariate data are commonly correlated $\rightarrow$ we need statistical methods handling those data
- We learn how to:
	- visualize and display multivariate data
	- apply multivariate normal distribution theory to the data
	- make inferences (estimation of parameters and testing hypothesis)
	- understand the structure of data
	- statistically extract information from multivariate data

# Chapter 1. Linear algebra
## 1.1 Scalars, vectors, matrices
- Matrix : A rectangular or square array of numbers of variables.
  $$ A = \begin{pmatrix}
  a_{11} & a_{12} & \cdots & a_{1n} \\
  a_{21} & a_{22} & \cdots & a_{2n} \\
  \vdots & \vdots & \ddots & \vdots \\
  a_{m1} & a_{m2} & \cdots & a_{mn} \\
\end{pmatrix}$$
- It is common to use a matrxi to display a data set: a dataset with n subjects and p variables can be written as a $n\times p$ matrix. It is called a data matrix or data array. A $3 \times 2$ matrix $X$ can be written as
$$ X = (x_{ij}) = 
\begin{pmatrix} 
x_{11} & x_{12} \\
x_{21} & x_{22} \\
x_{31} & x_{32} \\
\end{pmatrix}$$
- Note that the $i$th row is the list of the measurments obtained from Unit (Individual) $i$, and the $j$th column is the list of measurements of Variable $j$.
- Vector : A column or row matrix.
  $$ x = \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}$$
  $$ x^T = x' = (x_1, \cdots, x_n)$$
  where the ranspose of $A$ is defined as
  $$A^T = A' = (a_{ji})$$
- Note that $(A^T)^T = A$
- Given a data matrix $X$,
   $$\mathrm x_j = \begin{pmatrix} x_{1j} \\ \vdots \\ x_{nj}\end{pmatrix}$$
   is a column vector of $n$ measurements of $j$th variable.
   $$x_i^T = (x_{i1}, \cdots, x_{ip})$$
   is a row vector of $p$ measurements on $i$th subject.
   
- Hence the data matrix can be written as
  $$ \begin{aligned}
  X &= \begin{pmatrix}
  x_{11} & x_{12} & \cdots & x_{1p} \\
  x_{21} & x_{22} & \cdots & x_{2p} \\
  \vdots & \vdots & \ddots & \vdots \\
  x_{n1} & x_{n2} & \cdots & x_{np} \\
\end{pmatrix} \\
&= \begin{pmatrix}\mathrm x_1 & \mathrm x_2 & \cdots & \mathrm x_p \end{pmatrix} \\
&= \begin{pmatrix} x_1^T \\ x_2^T \\ \vdots \\ x_{2n}^T\end{pmatrix}
\end{aligned}$$

- Scalar : A singlenumber. A $1 \times 1$ matrix is equivalent to a scalar.
- Equality of two matrices : $A =B$ if the sizes of two matrices are equal and the corresponding elements are equal.
- Special matrices : The followings are frequently used matrices in this text:
	- Diagonal matrix: $D = diag(d_1, \cdots, d_p) = \begin{pmatrix} d_1 & 0 & \cdots & 0 \\ 0 & d_2 & \ddots & \vdots \\ \vdots & \ddots & \ddots & 0 \\ 0 & \cdots & 0 & d_p \end{pmatrix}$
	- Note the $diag(A) = diag(a_{11}, \cdots, a_{pp})$
	- Identity matrix: $I = diag(1, \cdots, 1)$
	- Matrix with 1's: $J = \begin{pmatrix} 1 & \cdots & 1 \\ \vdots & \ddots & \vdots \\ 1 & \cdots & 1\end{pmatrix}$. When we need to clarify the dimension of the matrix, we use $J_{n \times p}$
	- Vector with 1's : $\mathrm j = (1, \cdots, 1)^T$ or $1_{n \times 1} = 1_n = \begin{pmatrix} 1 \\ \vdots \\ 1\end{pmatrix}$
	- Zero matrix and zero vector: $\mathrm 0 = o = (0, \cdots, 0)^T$, $O = \begin{pmatrix} 0 & \cdots & 0 \\ \vdots & \ddots & \vdots \\ 0 & \cdots & 0 \end{pmatrix}$

## 1.2 Operations of matrices
- Scalar multiplication:
$$cA = (ca_{ij})$$
- Addition of two matrices: Let $A$ and $B$ be two $n \times p$ matrices. We define
  $$A + B = (a_{ij} + b_{ij})$$
- Matrix multiplication: Let $A$ and $B$ be two $m \times n$ and $n \times p$ matrices, respectively. An $m \times p$ matrix $AB$ is defined as a matrix of which $(i,j)$ element is calculated by $\sum_{k=1}^n a_{ik} b_{kj}$.
- Some properties of matrix operations:
	- $cA = Ac$
	- $0A = O$
	- $AB \not = BA$
	- $(AB)C = A(BC)$
	- $A(B + C) = AB + AC$
	- $IA = AI = A$

## 1.3 Trace and determinant for square matrices
- Trace : $tr(A) \overset{def}{=} \sum_{i=1}^p a_{ii}$
   $$ \begin{aligned}
   tr(A + B) &= tr(A) + tr(B) \\
   tr(AB) &= tr(BA) \\
   tr(A'A) &= tr(AA') = \sum_i \sum_j a_{ij}^2 \text{ for } n \times p \text{ matrix } A
   \end{aligned}$$
- Determinant : The determinant of a square matrix $A$, denoted by $\vert A \vert$ or $det(A)$ is inductively defined:
  $$ det(A) = \sum_{j=1}^n (-1)^{j+1} A_{1j} det(A_{(1j)})$$
  wwhere $A_{(ij)}$ is a minor matrix of $A$ generated by removing the $i$th row and the $j$th column from $A$ and the determinant of a scalar $a$ equals $a$ itself. We call $C = ((-1)^{i+j} det(A_{(ij)}))$ the cofactor matrix of $A$ and $adj(A) = C^T$ the adjoint matrix of $A$. Therefore,
    $$ det(A) = \sum_{j=1}^n A_{ij} C_{ij}$$
	for any fixed $1 \le i \le p$
	
## 1.4 Rank of a matrix
- Definition 1.4.1 (linearly dependent (LD) and linearly independent (LI)). Let $a_1, \cdots, a_n$ be $n$ vectors. If there exist not all zero constants $c_1, \cdots, c_n$ so that $c_1 a_1 + \cdots + c_n a_n = 0$, then $a_1, \cdots, a_n$ are said to be linearly dependent (LD). Otherwise, they are called linearly independent (LI).
- Note that if $a_1, \cdots, a_n$ are LD, then one of them can be obtained by a linear combination of the others.
- Definition 1.4.2(Rank). We define the rank of a matrix by $rank(A) = \text{ number of linearly independent rows of A} = \text{ number of linearly independent columns of A}$.
- Remark 1. An $n \times p$ matrix $A$ is said to be of full rank if the rank of $A$ equals the smaller of $n$ and $p$.

## 1.5 Inverse matrix
- Definition 1.5.1 When a matrix $A$ is square and of full rank, $A$ is said to be nonsingular or invertible, and $A$ has a unique inverse, denoted by $A^{-1}$ satisfying
  $$AA^{-1} = A^{-1}A = I$$
- Remark 2. We may solve a linear equation $Ax=b$ when $A$ is square and nonsingular.
  $$\begin{aligned}
  Ax &= b \\
  A^{-1}Ax &= A^{-1} b \\
  x &= A^{-1}b
  \end{aligned}$$
 
- Remark 3.
  $$ A^{-1} = \frac{1}{\vert A \vert} C^T$$
  where $C=((-1)^{i+j} det(A_{(i,j)}))$ is the cofactor matrix of $A$.
  
## 1.6 Partitioned matrices
- We may need to partition a matrix into submatris such as
   $$ A = \begin{pmatrix} A_{11} & A_{12} \\ A_{21} & A_{22}\end{pmatrix}$$
 - If two matrices are conformably partitioned, then the matrix multiplication can be calculated as if submatrices were scalars:
   $$\begin{aligned}
   AB & = \begin{pmatrix} A_{11} & A_{12} \\ A_{21} & A_{22}\end{pmatrix} \begin{pmatrix} B_{11} & B_{12} \\ B_{21} & B_{22}\end{pmatrix} \\
   & = \begin{pmatrix} A_{11}B_{11} + A_{12}B_{21} & A_{11}B_{12} + A_{12} B_{22} \\ A_{21}B_{11} + A_{22}B_{21} & A_{21}B_{12} + A_{22}B_{22}\end{pmatrix}
   \end{aligned}$$
   
 - We define Schur complement to $A_{22}$ by
	 $$ A_{11.2} = A_{11} - A_{12}A_{22}^{-1}A_{21} $$
	 Similarly, Schur complement to $A_{11}$ is defined by $A_{22.1} = A_{22} - A_{21}A_{11}^{-1}A_{12}$.
- The determinant of $A$ can be obtained by
	$$\begin{aligned}
	det(A) &= det(A_{11}) det(A_{22.1}) \\
	& = det(A_{22})det(A_{11.2})
	\end{aligned}$$
	When $A$ is a block triangular matrix such as
		$$ A = \begin{pmatrix} A_{11} & O \\ A_{21} & A_{22} \end{pmatrix}$$
		$$ \vert A \vert = \vert A_{22} \vert \vert A_{11} - A_{12}A_{22}^{-1} A_{21} \vert $$
- The inverse matrix $A^{-1}$ may be written as
   $$ A^{-1} = \begin{pmatrix} A_{11.2}^{-1} & - A_{11.2}^{-1} A_{12} A_{22}^{-1} \\ - A_{22}^{-1} A_{21}A_{11.2}^{-1} & A_{22}^{-1} ( I + A_{21}A_{11.2}^{-1}A_{12} A_{22}^{-1})\end{pmatrix}$$
  
  ## 1.7. Positive definite matrix
  - If $A'  = A$, then we call $A$ symmetric. We call $x'Ax$ a quadratic form while $x'A y$ is called a bilinear form.
  - Definition 1.7.1. A symmetric matrix $A$ is said to be positive define (p.d) If $x'Ax \ge 0$ for all $x$ and $x'Ax = 0$ if and only if $x = o$. If $x'Ax \ge 0$ for all vector $x$, then $A$ is called positive semidefinite (p.s.d.).
  - Remark 4. 1. If $A = C'C$ where $C$ is an $n \times p$ matrix of rank $p < n$, then
     $$ x'Ax = x'C'Cx = (Cx)'(Cx) = y'y \ge0$$
	 Since $y = Cx = 0$ implies $x = 0, A= C'C$ is positive definite.
- If $A$ is a symmetric positive definite matrix, then there exists $C$ such that $A = C'C$ where $C$ is an upper triangular matrix, that is called the Cholesky decomposition of $A$.
  $$ c_{11} = \sqrt{a_{11}}$$
  $$c_{1j} = \frac{a_{1j}}{c_{11}}$$
  for $2 \le j \le p$
  $$c_{ii} = \sqrt{a_{ii} - \sum_{k=1}^{i-1} c_{ki}^2}$$
  for $2 \le i \le p$
  $$c_{ij} = \frac{a_{ij} - \sum_{k=1}^{i-1} c_{ki}c _{kj}}{c_{ii}}$$
  for $2 \le i < j \le p$
  $$c_{ij} = 0$$
  otherwise
  
## 1.8 Orthogonal vectors and matrices
- Definition 1.8.1
	1. The length or norm of a vector $a$ is defined by $\vert \vert a \vert \vert = \sqrt{a'a}$
	2. The angle of two vectors $a$ and $b$ is defined by $cos \theta = \frac{a'b}{\sqrt{a'a}\sqrt{b'b}}$

- Remark 5. The projection of $b$ onto $a$ can be calculated as $P_a b = \frac{a'b}{a'a} a$. If $a$ has unit length, then $P_a b = (a'b)a$.
- Definition 1.8.2
	1. Two vectors $a$ and $b$ are said to be orthogonal if $a'b = a_1b_1 + \cdots + a_n b_n = 0$.
	2. If a vector $a$ satisfies $\vert \vert a \vert \vert ^2 = a'a = 1$, then it is called normalized.
	3. A square matrix $Q = (q_1, \cdots, q_p)$ is said to be orthogonal if $q_i'q_j = 0$ for $i \not =j$ and $q_i ' q = 1$, that is $Q'Q = I$. If $Q$ is orthogonal, then $QQ'=I$ as well, that is , $Q^{-1} = Q'$.
	
## 1.9 Eigenvalues and eigenvectors
- Definition 1.9.1 For every square matrix $A$, a scalar $\lambda$ and a nonzero vector $x$ can be found such that
   $$ Ax = \lambda x$$
   where $\lambda$ is called an eigenvalue of $A$ and $x$ is called an eigenvector of $A$.
- Remark 6. Suppose $x$ and $\lambda$ are an eigenvector and the associated eigenvalue of $A$. Since $A(cx) = cAx = c\lambda x = \lambda(cx)$, if $x$ is an eigenvector of $A$ , then $cx$ is an eigenvector too. We may select $c = \sqrt{x'x}$ so that $e = \frac{x}{\sqrt{x'x}}$ is a normalized eigenvector.
- Remark 7. How to find the eigenvalues and eigenvectors
	$$(A - \lambda I) x = 0$$
- Remakr 8. The trace of a square matrix is the sum of all eigenvalues and the determinant is the product of all eigenvalues.

## 1.10 Spectral decomposition
- Theorem 1. Let $A$ be a real symmetric matrix. Let $Q = (e_1, \cdots, e_p)$ be an orthogonal matrix of which the $j$th column is eqal to the eigenvector with the corresponding real eigenvalue $\lambda_j$. We may decompose $A$ as
	$$ \begin{aligned}
	A & = Q diag(\lambda_1, \cdots, \lambda_p) Q^T \\
	&= Q\ Lambda Q^T \\
	&= \lambda_1 e_1 e_1^T + \cdots + \lambda_p e_p e_p^T = \sum_{i=1}^p \lambda_j e_j e_j^T
	\end{aligned}$$

## 1.11 Cauchy-Schwarz inequality
- Theorem 2 (Cauchy-Schwarz inequality). Let $U$ and $v$ be two vectors in $\mathbb R ^p$. Then
	$$ (u'v)^2 \le (u'u)(v'v)$$
	The equality holds if and only if $u = cv$ or $v=cu$ for some constant $c$.
- Theorem 3 (Extended Cauchy-Schwarz ineqaulity). Let $A$ be a $p \times p$ positive definite symmetric matrix. Let $u$ and $v$ be two vectors in $\mathbb R^p$. Then,
	$$(u'v)^2 \le (u'Au)(v'A^{-1}v)$$
	The equality holds if and only if $u=cA^{-1}v$ or $v=cAu$ for some c.
- Lemma 1 (Maximization Lemma). Let $A$ be a $p \times p$ positive definite symmetric matrix. Let $v$ be a vector in $\mathbb R^p$. Then, for any nonzero vector $x \in \mathbb R^p$,
	$$ \underset{x \not = 0}{max} \frac{(x'v)^2}{x'Ax} = v'A^{-1}v$$
- Proposition 4 (Maximization of Quadratic Forms on the Unit Sphere). Let $A$ be a positive definite symmetric matrix with eigenvalues $\lambda_1 \ge \lambda_2 \ge \cdots \ge \lambda_p \ge 0$ and associated eigenvectors $e_1, e_2, \cdots, e_p$. Then,
	$$ \underset{x \not = 0}{max} \frac{x'Ax}{x'x} = \lambda_1 \text{ attained when } x = e_1$$
	$$ \underset{x \perp e_1, \cdots, e_k}{max} \frac{x'Ax}{x'x} = \lambda_{k+1} \text{ attained when } x= e_{k+1}$$
	
## 1.12 Differentaiation in Vectors and Matrices
- Let $x= (x_1, \cdots, x_p)' \in \mathbb R^p$ be a column vector in $\mathbb R^p$. Let $f(x) = f(x_1, \cdots, x_p)$ be a function from $\mathbb R^p$ to $\mathbb R$. We use a vector differentiation notation:
	$$\frac{\partial}{\partial x} f(x) = \begin{pmatrix} \frac{\partial}{\partial x_1} f(x_1, \cdots, x_p) \\ \vdots \\ \frac{\partial}{\partial x_p} f(x_1, \cdots, x_p) \end{pmatrix}= \nabla f(x) = Df(x)$$
	that is the graident vector of $f(x)$.
	$$\frac{\partial^2}{\partial x^T \partial x} f(x) = 
	\begin{pmatrix}
	\frac{\partial^2}{\partial x_1^2} f(x_1, \cdots, x_p) & \cdots & \frac{\partial^2}{\partial x_1 \partial x_p} f(x_1, \cdots, x_p) \\
	\vdots & \ddots & \vdots  \\
	\frac{\partial^2}{\partial x_p \partial x_1} f(x_1, \cdots, x_p) & \cdots & \frac{\partial^2}{\partial x_p^2} f(x_1, \cdots, x_p) \\
	\\ \end{pmatrix} = \nabla^2 f(x) = D^2 f(x)$$
	that is the Hessian matrix of the function $f$.
- We also define a differentiation in a matrix. Let $X = \begin{pmatrix} x_{11} & \cdots & x_{1q} \\ \vdots & \ddots & \vdots \\ x_{p1} &\cdots & x_{pq}\end{pmatrix}$ be a $p \times q$ matrix. Let $f(X) = f(x_{11}, \cdots, x_{pq})$ be a function from $\mathbb R^{pq}$ to $\mathbb R$.
   $$\frac{\partial}{\partial X} f(X) = \begin{pmatrix}
   \frac{\partial f}{\partial x_{11}} & \cdots & \frac{\partial f}{\partial x_{1q}} \\ \vdots & \ddots & \vdots \\ \frac{\partial f}{\partial x_{p1}} & \cdots & \frac{\partial f}{\partial x_{pq}}\end{pmatrix}$$
   
## 1.13 Some useful quantities
- Proposition 5. Let $x$ be a vector in $\mathbb R ^p$ and let $A$ and $B$ be $p \times p$ matrices.
	1. $x^T A x = tr(xx^T A^T) = tr(x(Ax)^T)$
	2. $\frac{\partial}{\partial A} tr(AB) = B^T$
	3. $\frac{\partial}{\partial A} log \vert A \vert = (A ^{-1})^T$ if $\vert A \vert > 0$


## 1.14 Random vectors and matrices
- Suppose that we are interested in multiple variables that are to be measured on each unit in a population.

### 1.14.1 Parameter vectors and matrices
- Let $X = \begin{pmatrix} X_1 \\ \vdots \\ X_p \end{pmatrix}$ be the p-variate measurement vector from a population. The population mean vector is defined by
   $$ \mu = E(X) = \begin{pmatrix} EX_1 \\ \vdots \\ EX_p\end{pmatrix}$$
   that is, $\mu_i = EX_i$.
   - In order to define the population variance-covariance matrix, consider a random matrix
      $$ (X - \mu)(X - \mu)^T$$
- Remark 10. Note that the outer product of two vectors $v= (v_1, \cdots, v_m)^T$ and $w = (w_1, \cdots, w_n)^T$ is defined by
	$$v \otimes w = vw'$$
- The population variance-covariance matrix is defined by the expected matrix of the outer product of $X - \mu$ and $X - \mu$:
   $$ \Sigma = Cov(X) = E[(X - \mu)(X - \mu)^T] = E(XX^T) - \mu \mu^T $$
- The $(i,j)$ element of the covariance matrix is denoted by $\Sigma_{ij}$ and $\Sigma_{ij} = E[(X_i - \mu_i)(X_j - \mu_j)]$. Sometimes we use $\sigma_{ij} = \Sigma_{ij}$
- The population correlation matrix is defined by
   $$ \rho = \begin{pmatrix}
   1 & \cdots & \frac{\Sigma_{1p}}{\sqrt{\Sigma_{11}\Sigma_{pp}}} \\
   \vdots & \ddots & \vdots \\
   \frac{\Sigma_{p1}}{\sqrt{\Sigma_{pp} \Sigma_{11}}} & \cdots & 1
   \end{pmatrix} = \begin{pmatrix} 1 & \cdots & \rho_{1p} \\
   \vdots & \ddots & \vdots \\
   \rho_{p1} & \cdots & 1
   \end{pmatrix}$$
   where $\rho_{ij} = \frac{E[(X_i - \mu_i)(X_j - \mu_j)]}{\sqrt{E[(X_i - \mu_i)^2] E[(X_j - \mu_j)^2]}}$ is the correlation coefficient of $X_i$ and $X_j$.
   
  - Remark 11. The variance-covariance matrix is always positive semi-definite.


### 1.14.2 Numerical summarization of multivariate data
- A multivariate data set may be written as a matrix. Let $X$ be an $n \times p$ data matrix, that is,
  $$ X = \begin{pmatrix}
  x_{11} & \cdots & x_{1p} \\
  \vdots & \ddots & \vdots \\
  x_{i1} & \cdots & x_{ip} \\
  \vdots & \ddots & \vdots \\
  x_{n1} & \cdots & x_{np} \\
  \end{pmatrix}$$
  Let $x_i = (x_{i1}, \cdots, x_{ip})'$ be the p-variate measurement vector from the $i$th subject.
1. Sample mean vector: The sample mean vector is defined by
	$$ \begin{aligned}
	\bar X &= \frac{1}{n}X^T 1_{n \times 1} \\
	& = \frac{1}{n} \sum_{i=1}^n x_i = (\sum_{i=1}^n x_{i1}, \cdots, \sum_{i=1}^n x_{ip})^T
	\end{aligned}$$
2. Sample variance-covariance matrix and sample correlation matrix: The sample covariance matrix is defined by
    $$ S = \frac{1}{n -1} \sum_{i=1}^n (X_i - \bar)(X_i - \bar X)^T $$
	that is a unbaised estimate for the population covariance. Another (biased) estimate of the covariance matrix is
    $$ S = \frac{1}{n} \sum_{i=1}^n (X_i - \bar)(X_i - \bar X)^T $$
	that is the maximum likelihood estimate under normality assumption. The sample correlation matrix is defiend by
	$$ R = \begin{pmatrix}
	1 & \cdots & \frac{\sum (x_{i1} - \bar x_1)(x_{ip} - \bar x_p)}{\sqrt{\sum (x_{i1} - \bar x_1)^2 \sum (x_{ip} - \bar x_p)^2)})} \\
	\vdots & \ddots & \vdots \\
	\frac{\sum (x_{ip} - \bar x_p)(x_{i1} - \bar x_1)}{\sqrt{\sum (x_{ip} - \bar x_p)^2 \sum (x_{i1} - \bar x_1)^2)})} & \cdots & 1 \\
	
	\end{pmatrix} =
	\begin{pmatrix} 1 & \cdots & r_{1p} \\ \vdots & \ddots & \vdots \\ r_{p1} & \cdots & 1 
	\end{pmatrix}$$
	In a matrix form, $R= D^{-1/2} SD^{-1/2}$ where $D = diag(S)$.
	
	
	# Chatper 2. Multivariate Normal Distribution
	- A generalization of the well-known mound-shaped normal density to multiple dimensions plays a fundamental role in multivariate analysis. Most of the techinques in this multivariate statistics course are based on the assumption that the data were randomly drawn from a multivariate normal distribution. While real data are never exactly multivariate normal, the normal density is often a useful approximation to the "true" (but unknown) population distribution. One advantage of the multivariate normal distribution stems from the fact that it is mathematically tractable and "beautiful" results can be obtained. This is frequently not the case for other distributions. Of course, mathematical attractiveness is of little use to the practitioner. It turns out, however, that normal distributions are useful in practice for two reasons:
		1. the normal distribution serves as a bona fide population model in some instances;
		2. the sampling distributions of many multivariate statistics are approximately normal, regardless of the form of the population, because (multivariate) central limit theorem for a large sample size. To summarize, meany real-world problems fall naturally within the framework of normal theory or we may transform the data set to satisfy the (approximate) normality. The importance of the normal distribution rests on its dual role as both population model for certain natural phenomena and approximate sampling distribution for many statistics.

## 2.1 Definitions
- Definition 2.1.1 A univariate normal density is
	$$f(x) = \frac{1}{\sqrt{2 \pi \sigma}}exp (-\frac{(x-\mu)^2}{2 \sigma^2})$$
	It is symmetric about the mean $\mu$ and mound (bell)-shaped curve, hence unimodal.
- Definition 2.1.2 A bivariate normal random vector $X = (X_1, X_2)'$ has mean $\mu = (\mu_1, \mu_2)'$ and variance-covariance matrix $\Sigma = \begin{pmatrix} \sigma_1^2 & \sigma_1\sigma_2 \rho \\ \sigma_1 \sigma_2 \rho & \sigma_2^2\end{pmatrix}$ where $\sigma_i^2 = Var(X_i)$ and $\rho = Cor(X_1, X_2) = \frac{Cov(X_1, X_2)}{\sigma_1  \sigma_2}$ so that $Cov(X_1, X_2) = \sigma_1 \sigma_2 \rho$. The density function of a bivariate normal $X = (X_1, X_2)'$ is defined by
	$$f(x_1, x_2) = \frac{1}{2 \pi \sigma_1 \sigma_2 \sqrt{1 - \rho^2}} exp[-\frac{1}{2(1 - \rho^2)} (\frac{(x_1 - \mu_1)^2}{\sigma_1^2} - \frac{2 \rho(x_1 - \mu_1)(x_2 - \mu_2)}{\sigma_1 \sigma_2} + \frac{(x_2 - \mu_2)^2}{\sigma_2^2})]$$
	for $-\infty < x_1, x_2 < \infty$
- Remark 1.
	-  We can see that $X_1$ and $X_2$ are independent if $\rho_{12} = 0$ since $f(x_1, x_2) = f_1(x_1) f_2(x_2)$.
	- A constant level set (constant probability density contour) is an ellipse centered at $(\mu_1, \mu_2)$. Let $e_1, e_2$ be the eigenvectors of $\Sigma$ with the associated eigenvalues $\lambda_1, \lambda_2$ respectively. 
		- Note $\Sigma e_i = \lambda_i e_i$ implies that $\Sigma^{-1} e_i = \frac{1}{\lambda_i} e_i$. By appliying the spectral decomposition of $\Sigma^{-1}$,
		  $$(x - \mu)' \Sigma^{-1} (x- \mu) = (x-\mu)'(\frac{1}{\lambda_1} e_1 e_1' + \frac{1}{\lambda_2} e_2 e_2') (x-\mu) = \frac{z_1^2}{\lambda_1} + \frac{z_2^2}{\lambda_2} = c^2$$
		  where $z_i = e_i'(x - \mu)$. Later, we see that $Pr((x- \mu)' \Sigma^{-1} (x -\mu) \le \chi_{p,\alpha}^2) = 1 -\alpha$
- Definition 2.1.3 (Multivariate Normal Random Vector). A p-variate random vector $X = (X_1, \cdots, X_p)^T$ is said to be a normal random vector with mean $\mu$ and covariance $\Sigma$ if the joint density is
   $$ f(x_1, \cdots, x_p \vert \mu, \Sigma) = \frac{1}{(2 \pi)^{\frac{p}{2}} \vert \Sigma \vert ^{\frac{1}{2}}} exp(- \frac{(x - \mu)^T \Sigma^{-1}(X - \mu)}{2})$$.
   
   
 ## 2.2 Properties of multivariate normal distribution
  - 1. Linear combinations of the components of $X \sim N_p(\mu, \Sigma)$ are normally distributed. Let $a = (a_1, \cdots, a_p)^T$ be a column vector in $\mathbb R^p$. Then $a^TX$ has a univariate normal distribution:
	  $$a^T X \sim N_1(a^T \mu, a^T \Sigma a)$$
	  - Conversely, if the linear combination $a^T X \ N(a^T \mu, a^T \Sigma a)$ for every $a \in \mathbb R^p$, then $X \sim N_p(\mu, \Sigma)$
 - Remark 2. If every linear combination of $X_1, \cdots, X_p$ has a univariate normal distribution, then $X = (X_1, \cdots, X_p)'$ has a multivariate normal distribution. Note that the condition must hold for every linear combination.
 - 2. Let $A$ be a $q \times p$ matrix. Then $AX \sim N(A \mu, A \Sigma A^T)$. For any vector $b\in \mathbb R^q$, $b^T(AX) = (b^TA)X$ is normally distributed from (Property 1) $\rightarrow$ $AX$ is normally distributed. The mean vector is $E(AX) = A\mu$ and the covariance matrix is $E[(AX - A \mu)(AX - A \mu)^T] = AE[(X - \mu)(X - \mu)^T] A^T = A \Sigma A^T$.
 - 3. All subsets of the components of $X$ have a (multivariate) normal distribution. Let $X = \begin{pmatrix} X_1 \\ X_2 \end{pmatrix}$ be a partition of $X$. Let $\mu = \begin{pmatrix} \mu_1 \\ \mu_2 \end{pmatrix}$ and $\Sigma= \begin{pmatrix} \Sigma_{11} & \Sigma_{12} \\ \Sigma_{21} & \Sigma_{22} \end{pmatrix}$. Then
	 $$X_1 \sim N(\mu_1, \Sigma_{11})$$
	 $$X_2 \sim N(\mu_2, \Sigma_{22})$$
- Remark 3. If a random vector $X = (X_1, \cdots, X_p)'$ has a multivariate normal distribution, then every component $X_i$ has marginally a univariate normal distribution. However, the converse is not true. The counter example can be constructed as follow : define the joint density of $X = (X_1, X_2)'$ by
	$$f(x_1, x_2) = \begin{cases} 2 \phi(x_1)\phi(x_2) & \text{ for } x_1 x_2 \ge 0 \\ 0 & \text{otherwise}\end{cases}$$
	where $\phi(x) = \frac{1}{\sqrt{2 \pi}}e^{- \frac{x^2}{2}}$ is a standard normal density. The marginal distribution of $X_i$ is a standard normal distribution.
- 4. Covariance zero implies that the corresponding components are independently distributed, that is, $Cov(X_1, X_2) = 0$ if and only if $X_1$ and $X_2$ are independent. Let $X = \begin{pmatrix} X_1 \\ X_2 \end{pmatrix} \sim N (\begin{pmatrix} \mu_1 \\ \mu_2 \end{pmatrix}, \begin{pmatrix} \Sigma_{11} & \Sigma_{12} \\ \Sigma_{21} & \Sigma_{22}\end{pmatrix})$. If $\Sigma_{12} = 0$, then $X_1$ and $X_2$ are independent.
- 5. The conditional distributions of the components are (multivariate) normal, that is, $X = \begin{pmatrix} X_1 \\ X_2 \end{pmatrix} \sim N (\begin{pmatrix} \mu_1 \\ \mu_2 \end{pmatrix}, \begin{pmatrix} \Sigma_{11} & \Sigma_{12} \\ \Sigma_{21} & \Sigma_{22}\end{pmatrix})$. Then $X_1 \vert _{X_2 = x_2}$ has a multivariate normal distribution.
- Remark 4. For simplicity, let $\mu = 0$. Note that
	$$ (X_1^T, X_2^T) \Sigma^{-1} \begin{pmatrix} X_1 \\ X_2 \end{pmatrix} = (X_1 - \Sigma_{12} \Sigma_{22}^{-1} X_2)^T \Sigma_{11.2}^{-1} (X_1 - \Sigma_{12} \Sigma_{22}^{-1} X_2) + X_2^T \Sigma_{22}^{-1}X_2$$
	where $\Sigma_{11.2} = \Sigma_{11} - \Sigma_{12} \Sigma_{22}^{-1} \Sigma_{21}$
- 6.Suppose that $X \sim N_p(\mu, \Sigma)$. Then (X- \mu)^T \Sigma^{-1} (X- \mu) \sim \chi_p^2$.
	- Recall. If $Z \sim N_p(0, I_{p \times p}),$, then $Z^T Z = Z_1^2 + \cdots + Z_p^2 \sim \chi_p^2$.

## 2.3 Estimation for sampling from a multivariate normal distributions
- There are many methods of the point estimations such as the method of moments (MM), the maximum likelihood estimation (MLE), the minimum variance unbaised estimation, etc. Under the multivariate normality assumption on the population, we may need to estimate the population mean vector $\mu$ and the population variance-covariance matrix $\Sigma$. The maximum likelihood estimators of $\mu$ and $\Sigma$ are frequently used since they are asymptotically optimal in some sense.

### 2.3.1 Likelihood function of a sample from a multivariate normal distribution
- Let $X_i \overset{iid}{\sim} N_p(\mu, \Sigma)$ for $i=1, \cdots, n$  be a random sample from a multivariate normal with mean $\mu$ and covariance $\Sigma$. The likelihood function and the log-likelihood function may be written as
   $$ \begin{aligned}
   L(\mu, \Sigma; x_1, \cdots, x_n) &= f(x_1, \cdots, x_n; \mu, \Sigma) \\
   &= \prod_{i=1}^n f(x_i; \mu, \Sigma) \\
   &= \prod_{i=1}^n [\frac{1}{(2\pi)^{p;2} \vert \Sigma \vert^{1/2}} exp(- \frac{(x_i - \mu)^T \Sigma^{-1}(x_i - \mu)}{2})] \\
   & = \frac{1}{(2 \pi)^{np /2} \vert \Sigma \vert ^{n/2}} exp(- \frac{1}{2} \sum_{i=1}^n (x_i - \mu)^T \Sigma^{-1}(x_i - \mu))
   \end{aligned}$$
   $$ \begin{aligned}
   l(\mu, \Sigma; x_1, \cdots, x_n) &= logL(\mu, \Sigma; x_1, \cdots, x_n) \\
   &= -\frac{1}{2} \sum_{i=1}^n (x_i - \mu)^T \Sigma^{-1}(x_i - \mu) -\frac{n}{2} log \vert \Sigma \vert - \frac{np}{2} log(2 \pi)
   \end{aligned}$$
  
 ### 2.3.2 Maximum likelihood estimations (MLEs) from a multivariate normal distribution
- A typical way to find the MLEs is to maximize the log-likelihood function in the parameters.
- The maximum likelihood estimator (MLE) of the mean vector is
	$$\hat \mu = \bar X = \frac{1}{n} \sum_{i=1}^n X_i$$
   and the MLE of the covariance matrix is
   $$\hat \Sigma = S_n = \frac{1}{2} \sum_{i=1}^n (X_i - \bar X) (X_i - \bar X)^T$$
   
## 2.4 Sampling distributions of $\bar X$ and $S$
- Summary of sampling distributions from a multivariate normal $N_p(\mu, \Sigma)$
	1. The MLE $\hat \mu = \bar X$ of the mean vector $\mu$ is normally distributed as
		$$ \hat \mu = \bar X \sim N_p(\mu, \frac{1}{n} \Sigma)$$
	2. The MLE $\hat \Sigma = S_n = \frac{1}{2} \sum_{i=1}^n (X_i - \bar X)(X_i - \bar X)^T$ of $\Sigma$ is distributed as
		$$ \begin{aligned}
		n \hat \Sigma & = (n-1)S \\
		&= \sum_{i=1}^n (X_i - \bar X)(X_i - \bar X)^T \\
		&= \sum_{j=1}^{n-1} Z_j Z_j^T
		\end{aligned}$$
		where $Z_i \overset{iid}{\sim} N_p(0, \Sigma)$
	3. Additionally, $\bar X$ and $S$ are independent.

## 2.5 Definition and Properties of the Wishart Distribution
- Definition 2.5.1 (Wishart distribution with $m$ degrees of freedom). Let $Z_i \sim N_p(0, \Sigma)$ be an iid random sample. The distribution of $\sum_{i=1}^m Z_i Z_i^T$ is defined as the Wishart distribution of $m$ degrees of freedom, denoted by $W_m(\Sigma)$ or $W(p,m,\Sigma)$.
- Remark 6. Wishart distribution for a univariate random variable equals a chi-square distribution up to a constant multiplication. When $p=1$ and $\Sigma =1$, $W_m(1) = \chi_m^2$. When $p=1$ and $\Sigma = \sigma^2$, $W_m(\sigma^2) = \sigma^2 \chi_m^2$.
- Remark 7. Suppose $W_1 \sim W(p, m_1, \Sigma), W_2 \sim W(p, m_2, \Sigma)$ and they are independent. The sum of two random matrices $W_1 + W_2 \sim W(p, m_1 + m_2, \Sigma)$.

## 2.6 Large sample distributions for $\bar X$ and $S$
- Let $X_1, X_2, \cdots, X_n$ be independent observations from a population with mean $\mu$ and finite (nonsingular) covariance $\Sigma$. Then
	$$\sqrt{n}(\bar X - \mu) \sim N_p(0, \Sigma)$$
	$$n(\bar X - \mu)^T S^{-1}(\bar X - \mu) \sim \chi_p^2$$
	
## Assessing the assumption of multivariate normality
1. Marginal normality check for each variable (We use th univariate methods with each variable).
2. Chi-square plot : Use $(X -  \mu)^T \Sigma^{-1} (X - \mu) \sim X_m^2$ if $X \sim N_m(\mu, \Sigma)$.
	1. Calculate $d_j^2 = (X_j - \bar X)^T X^{-1}(X_j - \bar X)$.
	2. Rearrange $d_j^2$ in ascending order : $d_{(1)}^2 \le d_{(2)}^2 \le \cdots \le d_{(n)}^2$.
	3. Find $q_j$ such that $P(\chi_m^2 \le q_j) = \frac{j - \frac{1}{2}}{2}$
	4. Plot $(q_j, d_{(j)}^2)$
	5. Check whether the points are approximately on a straight line.
3. Formal hypothesis test:
	- Mardia's test based on based on multivariate extensions of skewness and kurtosis measures.
		$$MS = \frac{1}{6n} \sum_{i=1}^n \sum_{j=1}^n [ (x_i - \bar x)^T \hat \Sigma^{-1} (x_j - \bar x)]^3$$
		$$MK = \sqrt{\frac{n}{8m(m+2)}} \{\frac{1}{n} \sum_{i=1}^n [(x_i - \bar x)^T \hat \Sigma^{-1} (x_j - \bar x)]^2 - m(m+2)\}$$
		Under the null hypothesis of multivariate normality, the statistic MS will have approximately a chi-squared distribution with $\frac{1}{6}m(m+1)(m+2)$ degrees of freedom, and MK will be approximately standard normal $N(0,1)$.
	- Henze-Zirkler's test based on the empirical characteristic function:
	   $$HZ_\beta = \frac{1}{n^2} \sum_{i=1}^n \sum_{j=1}^n e^{-\frac{\beta^2}{2}(x_i -x_j)^T \hat \Sigma^{-1} (x_i - x_j)} - \frac{2}{n(1 + \beta^2)^{m/2}} \sum_{i=1}^n e^{- \frac{\beta^2}{2(1 + \beta^2)} (x_ i - \bar x)^T \hat \Sigma^{-1}(x_i - \bar x)} + \frac{1}{(1 + 2 \beta^2)^{m/2}}$$
	   where $\beta = \frac{1}{\sqrt{2}} [\frac{(2m+1)n}{4}]^{1 /(m+4)}$ is a common choice. The HZ test rejects normality if $HZ_\beta$ is too large.
   - There are many other tests such as Royston's test, Coornik-Hansen's test, and Energy test.
   - An R package MVN includes the above tests.


## 2.8 Transformations to near normality
- When the assumption of normality fails, we may try to transform the dataset so that the normality assumption is not significantly violated for the transformed data.
---
- For univariate data, there are transformations that are commonly applied in order to make data close to a normal distribution.
1. Theoretical transformations

 | Variable            | Transformation                                        |
 | ------------------- | ----------------------------------------------------- |
 | Count $y$           | $\sqrt{y}$                                            |
 | Proportion $\hat p$ | $logit(\hat p) = log \frac{\hat p}{1 -\hat p}$        |
 | Correlation $r$     | Fisher's $z$ transform $z = log(\frac{1 + r}{1 - r})$ | 

   - In most of real situations, it may not be clear what transform would make the data closer to a normal distribution.
2. Power transformations: When all observations are nonnegative, we may consider a family of power transformations. If some measurements are negative, the we first add a constant to all measurements and then apply a power transformation.
	$$ x_i + c \rightarrow (x_i + c)^{\lambda}$$
3. Box-Cox transformations: The Box-Cox transformation family is similar to the power transformation. This family continuously connects the logarithmic transform as the power $\lambda$ approaches zero.
	$$ x^{(\lambda)} = \begin{cases} \frac{x^\lambda - 1}{\lambda} & \text{ for } \lambda \not = 0 \\ log x & \text{ for } \lambda = 0\end{cases}$$
	for $x>0$. We choose $\lambda$ by maximizing the log-likelihood function:
		$$l(\lambda) = -\frac{n}{2} log [\frac{1}{n} \sum_{i=1}^n (x_i^{(\lambda)} - \bar x^{(\lambda)}) ^2] + (\lambda - 1) \sum_{i=1}^n log x_i$$
4. Note that we should not expect some transformation can always make the data close to normality.


# Chapter 3. Hypothesis tests
## 3.1 Review of hypothesis tests for a univariate normal mean
### 3.1.1 When $\sigma^2$ is known
- A random sample $X_1, \cdots, X_n$ of size $n$ is chosen from $N_1(\mu, \sigma^2)$ with known population variance $\sigma^2$. A hypothesis test of $H_0:\mu = \mu_0$ is performed on a basis of
	$$\sqrt{n} \frac{\bar X - \mu_0}{\sigma} \sim N(0, 1) \text{ under } H_0$$
	$$n(\bar X - \mu_0)(\sigma^2)^{-1}(\bar X - \mu_0) \sim \chi_1^2 \text{ under } H_0$$
	that is called a z-test.
	
### 3.1.2 When $\sigma^2$ is unknown
- Consider a univariate hypothesis test $H_0 : \mu = \mu_0$ aginst $H_1 : \mu \not = \mu_0$ when a random sample $X_1, \cdots, X_n$ is selected from $N(\mu, \sigma^2)$. A significant test can be conducted based on the test statistic $t = \frac{\bar X - \mu}{s / \sqrt{n}}$ that is called a t-test. Thu null distribution of the statistic is a Student's t distribution.

## 3.2 Hypothesis test on one sample multivariate normal mean vector
### 3.2.1 When the covariance matrix $\Sigma$ is known
- In previous chapter, we drived the sampling distribution for the sample mean vector $\bar X$. 
	$$ n (\bar X - \mu)' \Sigma^{-1} (\bar X - \mu) \sim \chi_p^2$$
	Under $H_0 : \mu = \mu_0$, we perform a multivariate $z^2$ test based on $n(\bar X - \mu_0)' \Sigma^{-1} (\bar X - \mu_0) \sim \chi_p^2$. In practice, it is more common that we do not have information of the population covariance matrix $\Sigma$.
	
### 3.2.2 Hotelling's $T^2$ Statistic: when $\Sigma$ is unknown
 - Univariate : The Student's $T$ statistic is
	 $$t = \sqrt n \frac{\bar X - \mu_0}{s}$$
	 $$t^2 = n(\bar X - \mu_0) s^{-2} (\bar X - \mu_0) \sim t_{n-1}^2 = F_{1, n - 1} \text{ under } H_0: \mu = \mu_0$$
	 $$\text{Reject } H_0 \text{ if } n(\bar X - \mu_0)s^{-2} (\bar X - \mu_0) \ge t_{n-1, \frac{\alpha}{2}}^2$$
- Multivariate: THe multivariate analog of the square of Student's T statistic is
	$$T^2 = n(\bar X - \mu_0)^T S^{-1} (\bar X - \mu_0) \sim \frac{(n-1)p}{n - p} F_{p, n-p} \text{ under } H_0: \mu = \mu_0$$
	where $X_i \overset{iid}{\sim} N_p(\mu, \Sigma)$. It is called a Hotelling's $T^2$ statistic.

---
1. Note $T^2 = Z'(\frac{W}{v})^{-1}Z \sim \frac{vp}{v + 1 - p}F_{p, v + 1 - p}$,  where $Z \sim N_p(0, \Sigma)$ and $W \sim Wishart(p, v, \Sigma)$ are independent.
2. Note that $pF_{p, n-p} \rightarrow \chi_p^2$ as $n \rightarrow \infty$ so that $T^2 \sim \chi_p^2$ for a large sample under $H_0$.
3. $T^2$ statistic is invariant under linear transformation, that is, Hotelling $T^2$ statistic does not depend on the measurement units.


## 3.3 Hotelling's $T^2$ and likelihood ratio tests
- One of general procedures to construct a hypothesis test is the likelihood ratio test (LRT). We may apply the LRT to test multivariate normal mean. Suppose a random sample $x_1, \cdots, x_n$ is drawn from a multivariate normal distribution $N_p(\mu, \Sigma)$. Under $H_0: \mu = \mu_0$, the maximum likelihood estimate (MLE) for $\Sigma$ can be obtained as $\hat \Sigma_0 = \frac{1}{n} \sum_{i=1}^n (x_i - \mu_0)(x_i - \mu_0)'$. The MLEs under no restriction are $\hat \mu = \bar x$ and $\hat \Sigma = \frac{1}{n} \sum_{i=1}^n (x_i - \bar x) (x_ i - \bar x)'$.  We write the LRT
	$$LRT = \Lambda = \frac{max_{H_0} L(\mu, \Sigma: x_1, \cdots, x_n)}{max_{H_0 \cup H_1} L(\mu, \Sigma : x_1, \cdots, x_n)} = (\frac{\vert \hat \Sigma \vert}{\vert \hat \Sigma_0 \vert})^{n/2}$$
	
- The test statistic $\Lambda^{2/n}$ is called Wilks' lambda and we can show with some algebra that
	$$\Lambda^{2/n} = (\frac{\vert \hat \Sigma \vert}{\vert \hat \Sigma_0 \vert}) = \frac{1}{(1 + \frac{T^2}{(n-1)})}$$
	Therefore, the LRT is equivalent to Hotelling's $T^2$ test.
	We reject $H_0$ when LRT is small that is equivalent to we reject $H_0$ when $T^2$ is large.
	
## 3.4 Confidence regions and multiple testing
- We can extend the concept of a univariate confidence interval to a multivariate confidence region. A univariate confidence interval is commonly constructed by a pivotal quantity. For example, suppose $Y_1, \cdots, Y_n$ be a random sample from $N(\mu, \sigma^2)$. The quantity
	$$\sqrt n \frac{\bar Y - \mu }{S} \sim t_{n-1}$$
	consists of the measurements of the sample and the parameter of intereset $\mu$ with known distribution that does not depend on the parameter $\mu$. We call it a pivotal quantity for $\mu$. Since
	$$ Pr( - t_{n-1, \alpha / 2} \le \sqrt n \frac{\bar Y - \mu}{S} \le t_{n-1, \alpha / 2})= 1 - \alpha$$
	The upper limit of the $100(1 - \alpha)$% two-sided confidence interval is $\bar y + t_{n-1,  \alpha/2} \frac{s}{\sqrt n}$ and the lower limit is $\bar y - t_{n-1, \alpha/2} \frac{s}{\sqrt n}$. We call $1 - \alpha$ the confidence coefficient or confidence level. Similarly, we apply the pivotal quantity approach to construct a confidence region for a multivariate normal mean vector. Assume that a random sample $X_1, \cdots, X_n$ is chosen from $N_p(\mu, \Sigma)$.
	$$n(\bar X - \mu)'S^{-1}(\bar X - \mu) \sim \frac{(n-1)p}{n - p} F_{p, n-p}$$
	is a pivotal quantity for the normal mean vector $\mu$.
- A $100(1 - \alpha)$% confidence region for the mean vector of a p-dimensional multivariate normal distribution is the ellipsoid determined by all vectors $\mu$ satisfying
	$$n (\bar x - \mu)'S^{-1} (\bar x - \mu) \le \frac{(n-1)p}{n-p} F_{p, n-p, \alpha}$$
	where $\bar = \frac{1}{n} \sum_{i=1}^n x_i$, and $S = \frac{1}{n-1} (x_i - \bar x)(x_i - \bar x)'$ given a random sample $x_1, \cdots, x_n$

### 3.4.1 Simultaneous confidence intervals
- Scheffe's method : For a given p-dimensional vector $a$, a random variable $a'X \ sim N_1(a ' \mu, a' \Sigma a)$. A confidence interval for $a'\mu$ is obtained based on
	$$ t^2 = n \frac{(a' \bar x - a' \mu)^2}{a'Sa} \le t_{n-1,\alpha / 2}^2$$
	A simultaneous confidence interval for all $a$ can be constructed by finding $c^2$ such that
	$$ t^2 = n \frac{(a' \bar x - a' \mu)^2}{a'Sa} \le c^2$$
	for all $a$ and we obtain $c^2$ by maximizing $t^2$ over all possible $a \not = 0$.
	$$ \underset{a}{max} t^2 = n [ \underset{a}{max} \frac{(a' \bar x - a' \mu)^2}{a'Sa}] = n (\bar x - \mu)S^{-1}(\bar x - \mu) = \text{Hotelling's } T^2$$
	since it is maimized when $a$ is propertional to $S^{-1} (\bar x - \mu)$ from Cauchy-Shwarz inequality.
	$$Pr(a' \bar X - \sqrt{\frac{(n-1)p}{(n-p)} F_{p, n-p,\alpha} \frac{a'Sa}{n}} \le a' \mu \le a' \bar X + \sqrt{\frac{(n-1)p}{n-p)}F_{p, n-p, \alpha} \frac{a'Sa}{n}} \text{ for all a }) = 1 - \alpha$$

- Remark 2. Scheff's simultaneous confidence interval for $a' \mu$ may be obtained by a projection of Hotelling's $T^2$ contour $n(x - \mu)' S^{-1} (x - \mu) = \frac{(n-1)p}{n - p} F_{p, n- p, \alpha}$ onto the vector $a$ The gradient vector must be proportional to $a$, that is, $S^{-1}(\bar x - \mu) = ka$. By substitution of this into the equation of the ellipsoid, we have $k = \pm \sqrt{\frac{(n-1)p}{n-p} F_{p, n-p, \alpha} \frac{1}{n a'Sa}}$. There fore, $a'(\bar x - \mu) = k a'Sa = \pm \sqrt{\frac{(n-1)p}{n-p} F_{p, n-p, \alpha} \frac{a'Sa}{n}}$.

- Bonferroni's method : Another popular bu conservative simultaneous confidence intervals are called Bonferroni method. This approach is derived from the following Bonferroni inequality. Let $C_i$ be a confidence statement for $\mu_i$ with confidence coefficient $\alpha_i$. We want to make sure the probability that all $C_i$ for $i=1, \cdots, p$ are true with $1 - \alpha$.
	$$\begin{aligned}
	Pr(\text{All } C_i \text{ true}) & = 1 - Pr(\text{At least one } C_i \text{ false }) \\ & \ge 1 - \sum_{i=1}^p Pr(C_i \text{ false}) \\ & = 1 - (\alpha_1 + \cdots + \alpha_p) = 1 - pa'
	\end{aligned}$$
	Therefore, we choose $\alpha' = \alpha_1 = \cdots = \alpha_p = \frac{\alpha}{p}$ for each confidence coefficient. where $\alpha = Pr(\text{At least one } C_i \text{ false})$ is the overall confidence coefficient. The Bonferroni simultaneous confidence interval can be written as
	$$\bar x_i - t_{n_1, \frac{\alpha}{2p}} \sqrt{\frac{s_{ii}}{n}} \le \mu_i \le \bar x_i + t_{n_1, \frac{\alpha}{2p}} \sqrt{\frac{s_{ii}}{n}} $$
	for $i = 1, \cdots, p$
	
## 3.5 Large sample inferences
- When we have a large sample, we does not need the assumption of normality for statistical inferences. As explained before, $\frac{(n-1)p}{n-p} F_{p, n-p, \alpha} \rightarrow \chi_{p, \alpha}^2$ as $n \rightarrow p$. A large sampole simultaneous confidence interval is written as
  $$ a' \bar x - \sqrt{\chi_{p,\alpha}^2} \sqrt{\frac{a'Sa}{n}} \le a'\mu \le a' \bar x + \sqrt{\chi_{p,\alpha}^2} \sqrt{\frac{a'Sa}{n}}$$

---
## Summary
1. Hotelling's $T^2$ test statistic for one sample normal mean vector
	- Reject $H_0: \mu = \mu_0 \text{ if } T^2 = n (\bar x - \mu_0)'S^{-1}(\bar - \mu_0) \ge \frac{p(n-1)}{n - p}F_{p, n-p, \alpha}$
2. Confidence region and simultaneous confidence intervals with confidence level $1 - \alpha$.

| Test name                           | CI                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| Hotelling's $T^2$ confidence region | $n(\bar x - \mu)'S^{-1} (\bar x - \mu) \le \frac{(n-1)p}{n-p} F_{p, n-p, \alpha}$     |
| Scheffe's simultaneous CIs          | $\bar x_i \pm \sqrt{\frac{p(n-1)}{(n-p)} F_{p, n-p, \alpha}} \sqrt{\frac{s_{ii}}{n}}$ |
| Bonferroni's simultaneous CIs       | $\bar x_i \pm t_{n-1, \frac{\alpha}{2p}} \sqrt{\frac{s_{ii}}{n}}$                                                                                      |

# Chapter 4. Two Sample Comparision and MANOVA

- In this chapter, we extend univariate paired t-test, independent two-sample t-tests, univariate analysis of variance (ANOVA) to multivariate paried $T^2$ test, independent two-sample $T^2$ tests, and multivariate analysis of variance (MANOVA), in which we measure more than onve variable on each experimental unit.

## 4.1 Paired Comparisons and a Repeated Measures Design
- Measurements are often recorded under different sets of experimental conditions to see whether the responses differ significantly over these sets. One rational approach to comparing two treatments, or the presence and absence of a single treatment, is to assign both treatments to the same or identical units. The paired responses may then be analyzed by computing their differences, therby eliminating much of the influence of extraneous unit-to-unit variation.
- Univarite t-test for matches pairs experiment
	- In the single response (univariate) case, let $X_{j1}$ denote the response to treatment 1 (or the reponse before treatment), and let $X_{j2}$ denote the response to treatment 2(or the response after treatment) for the $j$th trial. That is, $(X_{j1}, X_{j2})$ are measurments recorded on the $j$th unit or $j$th pair of like units. By design, the $n$ differences
		$$D_j = X_{j1} - X_{j2}$$
		reflect the diffrential effects of the treatments.
		By assuming $D_j \overset{iid}{\sim} N(\delta, \sigma_d^2)$, the statistic
			$$ t = \frac{\bar D - \delta}{s_d / \sqrt n}$$
		where $\bar D = \frac{1}{n} \sum_{j=1}^n D_j$ and $s_d^2 = \frac{1}{n-1} \sum_{j=1}^n (D_j - \bar D)^2$, has a t distribution with $n-1$ degrees of freedom under $H_0 : \delta = \delta_0$. Hence, we $\begin{cases} \text{reject } H_0:\delta = \delta_0 & \text{if } \vert t \vert = \vert \frac{\bar d - \delta_0}{s_d / \sqrt n}\vert \ge t_{n-1, \alpha/2} \\ \text{ do not reject } H_0:\delta = \delta_0 & \text{otherwise}\end{cases}$ in favor of $H_1:\delta \not = \delta_0$
- Multivariate $T^2$ for matched paris design:
	- Let
		$$D_j = \begin{pmatrix} D_{j1} \\ \vdots \\ d_{jp}\end{pmatrix} = \begin{pmatrix} X_{1j1} - X_{2j1} \\ \vdots \\ X_{1jp} - X_{2jp}\end{pmatrix} $$
		Suppose $E(D_j) = \delta = \begin{pmatrix} \delta_1 \\ \vdots \\ \delta_p \end{pmatrix}$ and $Cov(D_j) = \Sigma_d$. Let $\bar D = \frac{1}{n} \sum_{j=1}^n D_j$ and $S_d = \frac{1}{n-1} \sum_{j=1}^n (D_j - \bar D)(D_j - \bar D)^T$ and under $H_0:\delta = \delta_0$, the Hotelling's T test sttatistic is given by
		$$T^2 = n(\bar D - \delta_0)^T S_d^{-1} (\bar D - \delta_0) \sim \frac{(n-1)p}{n-p}F_{p, n-p}$$
	- Hypothesis test about a multivariate mean difference for matched pairs:
		We $\begin{cases}
		\text{reject } H_0: \delta = \delta_0 & \text{ if } T^2 = n(\bar d - \delta_0)^T S_d^{-1} (\bar d - \delta_0) \ge \frac{(n-1)p}{n-p} F_{p, n-p} \\
		\text{do not reject } H_0: \delta= \delta_0 & \text{otherwise}
		\end{cases}$ in favor of $H_1:\delta \not = \delta$
	- Confidence region and simultaneous confidence intervals
	
| Test name                           | CI                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| Hotelling's $T^2$ confidence region | $n(\delta - \bar D)'S_d^{-1} (\delta - \bar D) \le \frac{(n-1)p}{n-p} F_{p, n-p, \alpha}$     |
| Scheffe's simultaneous CIs          | $\bar d_i \pm \sqrt{\frac{p(n-1)}{(n-p)} F_{p, n-p, \alpha}} \sqrt{\frac{s_{d_i}^2}{n}}$ |
| Bonferroni's simultaneous CIs       | $\bar d_i \pm t_{n-1, \frac{\alpha}{2p}} \sqrt{\frac{s_{d_i}^2}{n}}$                     |

## 4.2 Comparing Mean Vectors from Independent Two Samples
- Univariate independent two sample Student's t-test:
	- Suppose $x_{11}, \cdots, x_{1n_1}$ is a random sample from $N_1(\mu_1, \sigma_1^2)$ and $x_{21}, \cdots, x_{2 n_2}$ is an independent (of the first random sample) random sample from $N_1(\mu_2, \sigma_2^2)$. We want to test $H_0: \mu_1 - \mu_2 = \delta_0$.
		- (Test equality of the variances $H_0 : \delta_1^2 = \delta_2^2$) Test statistic $F = \frac{S_1^2}{S_2^2} \sim F_{n_1 - 1, n_2 - 1}$ under $H_0: \delta_1^2 = \delta_2^2$. If $F_{n_1 - 1, n_2 - 1, 1 - \alpha/2} \le F = \frac{S_1^2}{S_2^2} \le F_{n_1 - 1, n_2 - 1, \alpha / 2}$, then go to (Case $\delta_1^2 = \delta_2^2$). Otherwise, goto (Case $\delta_1^2 \not = \delta_2^2$).
		- (Case $\delta_1^2 = \delta_2^2$) Test statistic $T = \frac{\bar X_1 - \bar X_2 - \delta_0}{S_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}} \sim t_{n_1 + n_2 - 2}$ under $H_0$, where $S_p^2 = \frac{(n_1 - 1)S_1^2 + (n_2 - 1)S_2^2}{n_1 + n_2 - 2}$ is the pooled sample variance.
		- (Case $\delta_1^2 \not \delta_2^2$) Test statistic $T= \frac{\bar X_1 - \bar X_2 - \delta_0}{(S_1^2 / n_1)^2 / (n_1 - 1) + (S_2^2/n_2)^2 / (n_2 -1)}$ that is called Welch-Satterthwaite approximation.

---
- Multivariate independent two sample Hotelling's $T^2$ test:
	- Consider a random sample of size $n_1$ from population 1 and a sample of size $n_2$ from population 2. The observations on $p$ variables can be arranged as follows:
	
	| Sample                   | Summary Statistics                                                                                                               |
	| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
	| $x_{11}, \cdots, x_{1n_1}$ | $\bar x_1 = \frac{1}{n_1} \sum_{j=1}^{n_1} x_{1j}, S_1 = \frac{1}{n_1 - 1} \sum_{j=1}^{n_1} (x_{1j} - \bar x_1)(x_{1j} - \bar x_1)^T$ |
	| $x_{21}, \cdots, x_{2n_2}$ | $\bar x_2 = \frac{1}{n_2} \sum_{j=1}^{n_2} x_{2j}, S_2 = \frac{1}{n_2 - 1} \sum_{j=1}^{n_2} (x_{2j} - \bar x_2)(x_{2j} - \bar x_2)^T$ |
	
	  - We assume
		  1. $x_{11}, \cdots, x_{1n_1} \overset{iid}{\sim} N_p(\mu_1, \Sigma_1)$
		  2. $x_{21}, \cdots, x_{2n_2} \overset{iid}{\sim} N_p(\mu_2, \Sigma_2)$
		  3. $x_{11}, \cdots, x_{1n_1}$ and $x_{21}, \cdots, x_{2n_2}$ are independent

### 4.2.1 When $\Sigma = \Sigma_1 = \Sigma_2$
- The assumptions imply $E(\bar X_1 - \bar X_2) = \mu_1 - \mu_2 = \delta$ and $Cov(\bar X_1 - \bar X_2) = \frac{1}{n_1} \Sigma + \frac{1}{n_2} \Sigma = (\frac{1}{n_1} + \frac{1}{n_2}) \Sigma$. We define the pooled covariance matrix
	$$\begin{aligned}
	S_{pooled} &= \frac{(n_1 - 1)S_1 + (n_2 - 1)S_2}{n_1 + n_2 - 2}\\
	&= \frac{1}{n_1 + n_2 - 2}(\sum_{j=1}^{n_1} \sum_{j=1}^{n_1} (x_{1j} - \bar x_1)(x_{1j} - \bar x_1)^T + \sum_{j=1}^{n_2} (x_{2j} - \bar x_2)(x_{2j} - \bar x_2)^T) \end{aligned}$$
	Therefore, $\frac{1}{n_1} + \frac{1}{n_2} S_{pooled}$ is an estimate for $Cov(\bar X_1 - \bar X_2) = (\frac{1}{n_1} + \frac{1}{n_2}) \Sigma$
- Theorem 1. Under th above assumptions, the statistic
	$$T^2 = (\bar x_1 - \bar x_2 - \delta_0)^T[(\frac{1}{n_1} + \frac{1}{n_2})S_{pooled}]^{-1} (\bar x_1 - \bar x_2 - \delta_0)$$
	is distributed as $\frac{(n_1 + n_2 - 2)p}{n_1 + n_2 - p - 1} F_{p, n_1 + n_2 - p - 1}$ under $H_0 : \delta = \delta_0$.
	
---
- In case of $\Sigma_1 = \Sigma_2$,
	- Hypothesis test about multivariate normal mean difference for two independent samples: We reject $H_0 : \delta = \delta_0$ if
	  $$ T^2 = (\frac{1}{n_1} + \frac{1}{n_2})^{-1} (\bar x_1 - \bar x_2 - \delta_0)^T S_{pooled}^{-1} (\bar x_1 - \bar x_2 - \delta_0) \ge \frac{(n_1 + n_2 - 2)p}{n_1 + n_2 - 1 - p}F_{p, n_1 + n_2 - 1 - p, \alpha}$$
	- $100(1 - \alpha)$% confidence region and simultaneous confidence intervals:

		
		| Test name                     | CI                                                                                                                                                                                                       |
		| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
		| Confidence region             | $\frac{\delta - (\bar x_1 - \bar x_2))^T S_{pooled}^{-1} (\delta - (\bar x_1 - \bar x_2))}{(\frac{1}{n_1} + \frac{1}{n_2})} \le \frac{(n_1+ n_2 - 2)p}{n_1 + n_2 - 1-p} F_{p, n_1 + n_2 - 1 -p, \alpha}$ |
		| Scheffe's CIs for $\delta_i$    | $\bar x_{1i} - \bar x_{2i} \pm \sqrt{\frac{(n_1 + n_2 - 2)p}{n_1 + n_2 - 1 - p} F_{p, n_1+n_2 - 1 - p,\alpha}}\sqrt{(\frac{1}{n_1} + \frac{1}{n_2}) S_{pooled, ii}}$                                     |
		| Bonferroni's CIs for $\delta_i$ | $\bar x_{1i} - \bar x_{2i} \pm t_{n_1 + n_2 - 2, \frac{\alpha}{2p}} \sqrt{(\frac{1}{n_1} + \frac{1}{n_2})S_{pooled, ii}}$                                                                                 |
		
		
	### 4.2.2 When $\Sigma_1 \not = \Sigma_2$
	- Large sample : Suppose that $n_1$ and $n_2$ are large.
		$$(\bar x_1 - \bar x_2 - (\mu_1 - \mu_2))^T (\frac{1}{n_1}S_1 + \frac{1}{n_2} S_2)^{-1} (\bar x_1 - \bar x_2 - (\mu_1 - \mu_2)) \sim \chi_p^2$$
	- Small sample:
		$$(\bar x_1 - \bar x_2 - (\mu_1 - \mu_2))^T (\frac{1}{n_1} S_1 + \frac{1}{n_2} S_2)^{-1}(\bar x_1 - \bar x_2 - (\mu_1 - \mu_2)) \sim \frac{vp}{v - p + 1} F_{p, v-p + 1}$$
		where
		$$v = \frac{p + p^2}{\sum_{i=1}^2 \frac{1}{n_1}[tr \{(\frac{1}{n_i} S_i (\frac{1}{n_1}S_1 + \frac{1}{n_2}S_2)^{-1})^2\} + (tr\{(\frac{1}{n_i} S_i(\frac{1}{n_1} S_1 + \frac{1}{n_2} S_2)^{-1} \})^2]}$$
		that is an extension of Welch approximation to Behrens-Fisher problem.
	
	---
- In case of $\Sigma_1 \not = \Sigma_2$,
	- Hypothesis test about multivariate normal mean difference for two independent samples: We reject $H_0 : \delta = \delta_0$ if
	  $$ T^2 = (\bar x_1 - \bar x_2 - \delta_0)^T (\frac{S_1}{n_1} + \frac{S_2}{n_2})^{-1} (\bar x_1 - \bar x_2 - \delta_0) \ge \frac{vp}{v + 1 - p}F_{p, v + 1 - p, \alpha}$$
	- $100(1 - \alpha)$% confidence region and simultaneous confidence intervals:

		
		| Test name                     | CI                                                                                                                                                                                                       |
		| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
		| Confidence region             | $(\delta - (\bar x_1 - \bar x_2))^T (\frac{S_1}{n_1} + \frac{S_2}{n_2})^{-1} (\delta - (\bar x_1 - \bar x_2)) \le \frac{vp}{v + 1 - p} F_{p,v + 1 -p, \alpha}$ |
		| Scheffe's CIs for $\delta_i$    | $\bar x_{1i} - \bar x_{2i} \pm \sqrt{\frac{vp}{v + -p} F_{p, v + 1 - p,\alpha}}\sqrt{(\frac{S_{1ii}}{n_1} + \frac{S_{2ii}}{n_2})}$                                     |
		| Bonferroni's CIs for $\delta_i$ | $\bar x_{1i} - \bar x_{2i} \pm t_{n_1 + n_2 - 2, \frac{alpha}{2p}} \sqrt{(\frac{S_{1ii}}{n_1} + \frac{S_{2ii}}{n_2})}$                                                                                 |
		
	## 4.3 Comparising Several Multivariate Population Means
	- Univariate one-way ANOVA : Let $x_{ij} \sim N(\mu_i, \Sigma^2)$ for $i=1, \cdots, g$ and $j=1, \cdots, n_i$. In other word, the liear model for ANOVA can be written as
		$$\begin{aligned}
		x_{ij} &= \mu_i + \epsilon_{ij} & \text{Means model} \\
		x_{ij} &= \mu + \tau_{i} + \epsilon_{ij} & \text{Effects model}
		\end{aligned}$$
		where $\epsilon+_{ij} \sim N_1(0, \sigma^2)$. Commonly we want to test $H_0: \mu_1 = \cdots = \mu_g$.
		
		| Source of Variantion | Sume of Squares                                                        | df    | Mean square             | F                    |
		| -------------------- | ---------------------------------------------------------------------- | ----- | ----------------------- | -------------------- |
		| Treatment            | $SSA = \sum_{i=1}^g n_i(\bar x_{i \cdot} - \bar x_{\cdot \cdot})^2$    | $g-1$ | $MSA = \frac{SSA}{g-1}$ | $F = \frac{MSA}{MSE} |
		| Error                | $SSE = \sum_{i=1}^g \sum_{j=1}^{n_i} (x_{ij} - \bar x_{i \cdot})^2$    | $n-g$ | $MSE = \frac{SSE}{n-g}$ |                      |
		| Total                | $SST = \sum_{i=1}^g \sum_{j=1}^{n_i} (x_{ij} - \bar x_{\cdot \cdot})^2$ | $n-1$      |                         |                      |
		- A one-way ANOVA F-test rejects $H_0 : \mu_1 = \cdots = \mu_g$ if $F = \frac{MSA}{MSE} \ge F_{g-1, n-g, \alpha}$. This F-test is equivalent to the likelihood ratio test.

---
 - Multivariate one-way ANOVA (one-way MANOVA):
	 - Let $x_{ij} = \begin{pmatrix} x_{1ij} \\ \vdots \\ x_{pij}\end{pmatrix} \sim N_p(\mu_i, \Sigma)$  for $i=1, \cdots, g$ and $j=1, \cdots, n_i$. 
	 - We specify the MANOVA model for one-way layout
		 $$\begin{aligned}
		 x_{ij} & = \mu_i + \epsilon_{ij} & \text{means model} \\
		 x_{ij} &= \mu + \tau_i + \epsilon_{ij} & \text{effects model}
		 \end{aligned}$$
		  where $\mu_i = \mu + \tau_i$ with $\sum_{i=1}^g \tau_i = 0$. The random error vector $\epsilon_{ij} \sim N_p(0, \Sigma)$. We define the grand mean vector $\bar x_{\cdot \cdot} = \frac{1}{N} \sum_{i=1}^g \sum_{j=1}^{n_i} x_{ij}$ where $N = \sum_{i=1}^g n_i$. The group mean vector is defined by $\bar x_{i \cdot} = \frac{1}{n_i} \sum_{j=1}{n_i} x_{ij}$.

		| Source of Variation        | Sume of Squares                                                                                             | df    |
		| -------------------------- | ----------------------------------------------------------------------------------------------------------- | ----- |
		| Treatment (Between groups) | $B = \sum_{i=1}^g n_i (\bar x_{i \cdot} - \bar x_{\cdot \cdot})(\bar x_{i \cdot} - \bar x_{\cdot \cdot})^T$ | $g-1$ |
		| Error(Within group)        | $W = \sum_{i=1}^g \sum_{j=1}^{n_i} (x_{ij} - \bar x_{i \cdot})(x_{ij} - \bar x_{i \cdot})^T$                | $N-g$ |
		| Total                      | $W + B = \sum_{i=1}^g\sum_{j=1}^{n_i} (x_{ij} - \bar x_{\cdot \cdot})(x_{ij} - \bar x_{\cdot \cdot})^T$     | $N-1$ |
	- To test $H_0 : \mu_1 = \cdots = \mu_g$ in favor of $H_1: \text{ not all } \mu_i \text{ are the same}$, one may use one of the following four test statistics.
		1. Wilk's lambda:
			$$\Lambda = \frac{\vert W \vert}{\vert W + B \vert} = \prod_{i=1}^s \frac{1}{1 + \lambda_i}$$
			where $\lambda_1 \ge \cdots \ge \lambda_s$ are the eigenvalues of $W^{-1}B$ and $s = min(p, g- 1)$ that is the rank of $B$. We reject $H_0: \mu_1 = \cdots = \mu_g$ if $\Lambda$ is small.
		2. Roy's (largest root) test:
			Let $\lambda_1$ be the largest eigenvalue of $W^{-1}B$. We reject $H_0: \mu_1 = \cdots = \mu_g$ if $\theta = \frac{\lambda_1}{1 +\lambda_1}$ is large.
		3. Pillai test:
			$V = \sum_{i=1}^s \frac{\lambda_i}{1 + \lambda_i}$ where $s = min(g - 1, p)$. We reject $H_0 : \mu_1 = \cdots = \mu_g$ if $V$ is lage.
		4. Lawley and Hotelling tests:
			$U = tr(W^{-1}B) = \sum_{i=1}^s \lambda_i$. We reject $H_0: \mu_1 = \cdots = \mu_g$ if $U$ is large.
	
- Remark1. Wilk's $\Lambda$ is equivalent to the likelihood ratio test. It has been developed early and this statistic is widely used. The exact null distributions for some cases given number of variables $p$ and the number of groups $g$ are known.
- For a large sample $N = \sum n_i$, the null distribution of Wilk's lambda can be approximated by a chi-square distribution.
	$$- (N - 1 - \frac{p + g}{2}) log \Lambda \sim \chi_{p(g+1)}^2$$
	We reject $H_0$ if
	$$- (N - 1 - \frac{p + g}{2}) log \Lambda \ge \chi_{p(g-1), \alpha}^2$$
- Wilk's lambda, Pillai's trace, and Lawley-Hotelling's tests have similar power in many scenarios, but Roy's largest root test is optimal if the mean vectors are collinear to each others.

## 4.4 Simultaneous Confidence Intervals for Treatment Effects
- When the hypothesis of equal treatment effects $H_0: \mu_1 = \cdots = \mu_g$ is rejected, those effects that led to the rejection of the hypothesis are of interest. For pariwise comparisions, the Bonferroni approach can be used to construct simultaneous confidence intervals for the components for the differences.
- There are $p\frac{g(g-1)}{2}$ pairewise comparisions to be performed. The Bonferroni adjuested level will be $\frac{\alpha}{2pg(g-1)/2} = \frac{\alpha}{pg(g-1)}$
- $H_{00i'k}: \mu_{ik} = \mu_{i'k}$ for $k=1, \cdots, p$ and $1 \le i < i' \le g$.
- The estimate of $\hat \mu_{ik} - \hat \mu_{i'k} = \bar X_{ik} - \bar X_{i'k}$. The variance of $\bar X_{ik} - \bar X_{i'k}$ can be obtained as
	$$Var(\bar X_{ik} - \bar X_{i'k}) = (\frac{1}{n_i} + \frac{1}{n_{i'}}) \Sigma_{kk}$$
	$$\hat {Var} (\bar X_{ik}- \bar n_{i'k}) = (\frac{1}{n_i} + \frac{1}{n_{i'}}) \frac{W_{kk}}{N-g}$$
- $100(1 - \alpha)$% simultaneous confidence intervals are
	$$ \mu_{ik} - \mu_{i'k} \in (\bar x_{ik} - \bar x_{i'k} - t_{N-g, \frac{\alpha}{pg(g-1)}} \sqrt{(\frac{1}{n_i} + \frac{1}{n_{i'}})\frac{w_{kk}}{N - g}},\bar x_{ik} - \bar x_{i'k} + t_{N-g, \frac{\alpha}{pg(g-1)}} \sqrt{(\frac{1}{n_i} + \frac{1}{n_{i'}})\frac{w_{kk}}{N - g}})$$
	We identify groups $i$ and $i'$ of which the interval does not contain zero.
	
## 4.5 Testing for Equality of Covarinace Matrices
- One of the assumptions that we made when comparing two or more multivariate mean vectors is that the covariance matrices of the multiple populations are the same. Before pooling the variation accross samples to form a pooled covariance matrix when comapring mean vectors, it can be worthwhile to test the equality of the population covariance matrices. One commonly employed test for equal covariance matrices is Box's M-test
	With $g$ populations, the null hypothesis is
		$$ H_0 : \Sigma = \Sigma_1 = \cdots = \Sigma_g$$
	The likelihood ratio test can be drived as
		$$LRT = \prod_{i=1}^g (\frac{\vert S_i \vert}{\vert S_{pooled} \vert})^{(n_i - 1) / 2}$$
		$$M = - 2 log LRT \sim \chi_v^2$$
		where $v = \frac{1}{2}p(p+1)(g-1)$. A better approximation is derived as
		$(1 - u)M = \{ 1 - [\sum_{i=1}^g \frac{1}{n_i - 1} - \frac{1}{\sum_{i=1}^g (n_i - 1)}][\frac{2 p^2 + 3p - 1}{6(p+1)(g -1)}] \}M \sim \chi_v^2$
		
		
# Chapter 5. Discriminant analysis and classification
- Discrimination Analysis is a statistical method that describes group separation using functions of the variables (discriminant functions). The goal is to identify or separate groups as much as possible.
- Classification is a statistical method that assigns or allocates an observation based on functions of the variables (classification functions) to one of the groups. The goal is to predict the group membership of an observation to which the subject most likely belong.

## 5.1 Discriminant function
 - (Linear) Discrimant functions are linear combinations of variables that best separate groups.
 
 ## 5.2 Discriminant functions for two groups
 - RA Fisher's approach: transform the multivariate observations $x$ to univariate observations $y$ such that the $y$'s derived from population $\pi_1$ and $\pi_2$ were separated as much as possible.
 - Suppose we have Group 1($C_1$) and Group 2($C_2$)
 - Find a direction (vector) $a$ so taht the projected data $y=a'x$ (more preicely, $y_{ij} = a'x_{ij}, \bar y_i = a' \bar x_i$) has the maximum separation $D = \vert \frac{\bar y_i - \bar y_2}{s_y} \vert$, where $s_y^2 = \frac{(n_1 -1)s_{y_1}^2 + (n_2 - 1)s_{y_2}^2}{n_1 + n_2 - 2} = \frac{(n_1 -1)a'S_1a+ (n_2 - 1)a'S_2a}{n_1 + n_2 - 2} = a'S_pa$
- We need to find $a$ such that
	$$D_{max}^2 = \underset{a}{max} D^2 = \underset{a}{max} \frac{(a'(\bar x_1 - \bar x_2))^2}{a'S_pa}$$
- By Cauchy-Schwarz inequality,
	$$D^2 = (\bar x_1 - \bar x_2)' S_p^{-1} (\bar x_1 - \bar x_2) = D_{max}^2$$
	that is maximized when $S_p \alpha \propto (\bar x_1 - \bar x_2)$. We set $a = S_p^{-1}(\bar x_1 - \bar x_2)$.
- Therefore, we have a discriminant function $y = (\bar x_1 - \bar x_2)' S_p^{-1}x$.
- (Classification based on discrimant function) We may use the discriminant function to allocate an observation to one of groups: assign $x_0$ to $C_i$ if $y_0 = a'x_0$ is closer to $\bar y_i = a' \bar x_i$.
	- Assign a new observation $x_0$ into
		$$\begin{cases} 
		C_1 & \text{if } a'x_0 \ge a'\frac{\bar x_1 + \bar x_2}{2} \\
		C_2 & \text{if } a'x_0 < a'\frac{\bar x_1 + \bar x_2}{2} \\
		
		\end{cases}$$
	
## 5.3 Classification analysis
- Let $f_i, i=1, 2$ be the density functions of two groups.
- Define the misclassification probabilities $P(j \vert i)$ to be the probability that an observation of $C_i$ is misclassified into $C_j$.
- Define the misclassification cost $c(1 \vert 2)$ and $c(2 \vert 1)$. The quantity $c(1 \vert 2)$ is the cost that we must pay by misclassification  of an obseration in $C_2$ to $C_1$.
- Define the expected cost of misclassification (ECM)
	$$ECM = c(2 \vert 1) P(2 \vert 1) p_1 + c(1 \vert 2) P(1 \vert 2) p_2$$
	where $p_1 = P(1)$ is the proportion of gorup 1 and $p_2 = P(2)$ is the proportion of group 2: they are called the prior probabilities of $C_1$ and $C_2$.
- Let $R_1$ and $R_2$ be the classification regions for gorup 1 and 2, respectively.
- (Minimizing ECM) We can find the clasification regions that minimize ECM:
	$$\begin{aligned}
	ECM &= c(2 \vert 1) P(2 \vert 1) p_1 + c(1 \vert 2) P(1 \vert 2) p_2 \\
	&= c(2 \vert 1) p_1 \int_{R_2} f_1(x)dx + c(1 \vert 2) p_2 \int_{R_1} f_2(x) dx \\
	&= c(2 \vert 1) p_1 + \int_{R_1} [c(1 \vert 2) p_2 f_2(x) - c(2 \vert 1) p_1 f_1(x)]dx
	\end{aligned}$$
	$$ R_1 = \{x : c(1 \vert 2)p_2 f_2(x) - c(2 \vert 1) p_1 f_1(x) \le 0 \} \Leftrightarrow \frac{f_1(x)}{f_2(x)} \ge \frac{c(1 \vert 2) p_2}{c(2 \vert 1) p_1}$$
	$$ R_2 = \{x : c(1 \vert 2)p_2 f_2(x) - c(2 \vert 1) p_1 f_1(x) > 0 \} \Leftrightarrow \frac{f_1(x)}{f_2(x)} < \frac{c(1 \vert 2) p_2}{c(2 \vert 1) p_1}$$
- (Minimizing TPM) We may minimize the total probability of misclassification (TPM):
	$$TMP = p_1 \int_{R^2} f_1(x) dx + p2 \int_{R_1} f_2(x) dx$$
	It is the same as ECM when $c(1 \vert 2) = c(2 \vert 1) = 1$
	$$R_1 : \frac{f_1(x)}{f_2(x)} \ge \frac{p_2}{p_1}$$
	$$R_2 : \frac{f_1(x)}{f_2(x)} < \frac{p_2}{p_1}$$
	It is also called the maximum posterior probability (MPP) classification.
	
## 5.4 Classification for multivariate normal distributions
- (When $\Sigma_1 = \Sigma_2 = \Sigma$: LDA or Linear Classification Rule) Note
	$$f_i(x) = \frac{1}{(2 \pi)^{p/2} \vert \Sigma \vert^{1/2}} exp(- \frac{1}{2} (x - \mu_i)' \Sigma^{-1} (x - \mu_i))$$
    $$R_1 : \frac{f_1(x)}{f_2(x)} = exp((\mu_1 - \mu_2)' \Sigma^{-1}x - (\mu_1 - \mu_2)' \Sigma^{-1} (\frac{\mu_1 + \mu_2}{2})) \ge \frac{c(1 \vert 2) p_2}{c(2 \vert 1) p_1}$$
	Assign $x$ to $\pi_1$ if $\frac{f_1(x)}{f_2(x)} = exp((\mu_1 - \mu_2)' \Sigma^{-1}x - (\mu_1 - \mu_2)' \Sigma^{-1} (\frac{\mu_1 + \mu_2}{2})) \ge log(\frac{c(1 \vert 2)p_2}{c(2 \vert 1) p_1})$

- Estimated linear classification rule minimizing ECM:
	- Assign $x$ to $\pi_1$ if $\frac{f_1(x)}{f_2(x)} = exp((\bar x_1 - \bar x_2)' S_p^{-1}x - (\bar x_1 - \bar x_2)' S_p^{-1} (\frac{\bar x_1 + \bar x_2}{2})) \ge log(\frac{c(1 \vert 2)p_2}{c(2 \vert 1) p_1})$
	- This is the same as Fisher's linear discriminant function if $\frac{c(1 \vert 2) p_2}{c(2 \vert 1)p_1} = 1$.

- (When $\Sigma_1 \not = \Sigma_2$ : QDA or Quadratic Classification Rule)
	$$R_1 : \frac{f_1(x)}{f_2(x)} = (\frac{\vert \Sigma_2 \vert}{\vert \Sigma_1 \vert})^{1/2} exp(- \frac{1}{2} (x - \mu_1)' \Sigma_1^{-1} (x - \mu_1) + \frac{1}{2} (x - \mu_2)' \Sigma_2^{-1}(x - \mu_2)) \ge \frac{c(1 \vert 2) p_2}{c(2 \vert 1) p_1}$$
	- Assign $x$ to $\pi_1$ if
		$$-\frac{1}{2}x'(\Sigma_2^{-1} - \Sigma_2^{-1})x + (\mu_1'\Sigma_1^{-1} - \mu_2' \Sigma_2^{-1})x - \frac{1}{2} log(\frac{\vert \Sigma_1 \vert}{\vert \Sigma_2 \vert}) - \frac{1}{2} (\mu_1' \Sigma_1^{-1} \mu_1 - \mu_2' \Sigma_2^{-1} \mu_2) \ge log(\frac{c(1 \vert 2) p_2}{c(2 \vert 1)p_1})$$
- We need to specify the prior probabilities $p_1$ and $p_2$. Otherwise, the sample proportions $\hat p_1$ and $\hat p_2$ are used for the classification rules.

## 5.5 discriminant analysis for several groups
### 5.5.1 Discrimant functions
- We want to find linear combinations of variables that beset separate the $k$ groups of multivariate observations.
	1. Examine gorup separation in a two-dimensional plot. When there are more than two groups, it requires more than one discriminant function to describe group separation. If the points in the p-dimensional space are projected onto a 2-dimensional space represented by the first two discriminant functions, we obtain the best possible view of how the groups are separated.
	2. Find a subset of the original variables that separates groups almost as well as the original set.
	3. Rank the variabels in terms of their relative contribution to group separation.
	4. Interpret the new dimensions represented by the discriminant functions.
	5. Follow up to fixed-effects MANOVA.
- For $k$ groups with $n_i$ observations in the $i$th groups, we transform each observation vector $x_{ij}$ to obtain $y_{ij} = a'x_{ij}$ for $i=1,\cdots, k$ and $j=1, \cdots, n_i$, and find the means $\bar y_i = a' \bar x_i$, where $\bar x_i = \sum_{j=1}^{n_i} x_{ij}$.
- Recall that for two gruops $(k=2)$ we find $a$ such that 
	$$\frac{(\bar y_1 - \bar y_2)^2}{s_y^2} = \frac{a'(\bar x_1 - \bar x_2)(\bar x_1 - \bar x_2)'a}{a'S_p a}$$
	It can be extended to $k$ groups:
		$$h(a) = \frac{a'Ba}{a'Wa} = \frac{SSB(y)}{SSW(y)}$$
	that is an F statistic in a univariate ANOVA table for $y= a'x$. Since $h(a) = h(ca)$ for any non-zero constant c, we can maximize $a'Ba$ under constant $a'Wa = 1$. By applying Lagrange multiplier method, we maximize
		$$a^TBa - \lambda(a^T Wa - 1)$$
		and hence,
		$$\begin{aligned}
		\frac{\partial}{\partial a}[a^T B a - \lambda(a^T Wa - 1)] & = 0 \\
		2 Ba - 2 \lambda Wa & = 0 \\
		W^{-1}Ba & = \lambda a
	\end{aligned}$$
	The solutions of the above equation are the eigenvalues $\lambda_1 \ge \lambda_2 \ge \cdots \ge lambda_s$ with associated eigenvectors $e_1, e_2, \cdots, e_s$ of $W^{-1}B$ where $s= min(k-1, p)$ is the rank of $B$. Because $h(e_i) = \lambda_i$, the first discriminant function is $y_1 = a^T  = e_1^T x$ wit hthe largest eigenvalue $\lambda_1$. The second discriminant function is defined as $y_2 = a_2^Tx$ so that $a_2 = \underset{a}{argmax} h(a)$ under under $a^TWa= 1$ and $a_1^T Wa=0$. Using the lagrange multipliers, we maximize
	$$ a^T B a - \lambda(a^T W a - 1) - \eta_1 a_1^TWa$$
	$$\begin{aligned}
	\frac{\partial}{\partial a}[ a^T Ba - \lambda(a^TWa - 1) \eta_1 a_1^T Wa] &= 0 \\
	2Ba - 2 \lambda Wa -\eta_1 Wa_1 &= 0
	\end{aligned}$$
	Multiply $a_1^T$ to the left, we obtain
		$$2a_1^T Ba - 2\lambda a_1^TWa - \eta_1 a_1^T W a_1 = 0$$
	Therefore, $\eta_1 = 0$ and $a_2$ must satisfy $Ba_2 - \lambda Wa_2 =0$ that implies $a_2 = e_j$ for $j=1, \cdots, s$. Because $a_1 = e_1$ and the second eiegenvector $e_2$ has the second largest eigenvalue $\lambda_2 = h(e_2), a_2=e_2$. We can repeat this process. The $i$th discriminant function, given $i-1$ discriminant functions $y_1 = a_1^T x = e_1^T x, \cdots, y_{i-1} = a_{i-1}^T x = e_{i-1}^T x$, is defined by
		$$\underset{a^TWa=1, a_1^TWa = 0, \cdots, a_{i-1}^T W a=0}{argmax} h(a)$$
	Using the Lagrange multipliers, we maximize
		$$a^T B a - \lambda(a^T W a - 1) - \eta_1 a_1^T W a - \cdots - \eta_{i-1} a_{i-1}^T Wa$$
	Hence,
		$$\begin{aligned}
		\frac{\partial}{\partial a}[a^T B a - \lambda(a^T W a - 1) - \eta_1 a_1^T W a - \cdots - \eta_{i-1}a_{i-1}^T W a] & = 0 \\
		2B a - 2 \lambda W a - \eta_1 W a_1 - \cdots - \eta_{i-1} W a_{i-1} & = 0
	\end{aligned}$$
	Multiplying $a_j^T$ to the left, we have $\eta_j = 0$ for $j=1, \cdots, i-1$ since
		$$\begin{aligned}
		2 a_j^T B a - 2 \lambda a_j^T W a - \eta_1 a_j^T W e_j - \cdots - \eta_{i-1}a_j^TW a_{i-1} &= 0 \\
		2 \lambda_j a_j^T Wa - 2\lambda a_j^T W a - \eta_1 a_j^T Wa_1 - \cdots - \eta_{i-1}a_j^T W a_{i-1} &= 0 \\
		\eta_j & = 0
		\end{aligned}$$
	Therefore, we have $s$ discriminant functions
		$$\begin{aligned}
		y_1 &= e_1' x, \\
		y_2 &= e_2' x, \\
		\vdots \\
		y_s &= e_s' x
		\end{aligned}$$
		Note, $e_i$ and $e_j$ are not orthogonal since $W^{-1} B$ is not symmetric. Instead, the discriminant functions are uncorrelated since $W$ is the estimate of $\Sigma$ up to constant. $Cov(e_i^Tx, e_j^Tx) = e_i^T \Sigma e_j = 0$.
	
	- The relative importance of each discriminant function $x_i$ can be assessed by considering its eigenvalue as a proportion of the toal:
		$$\frac{\lambda_i}{\sum_{j=1}^s \lambda_j}$$
		
## 5.6 Stepwise Discriminant Analysis
- When a large number of variables are collected, we like to eliminiate redundant variables for separating the groups.
- Stepwise variable selection: forward selection (FS), backward elimination (BE), and stepwise selection (SS).

# Chapter 6. Principal Component Analysis (PCA)
## 6.1 Introduction
- Explain the variance-covariance of a set of variables with a smaller number of linear combinations of the variables.
- Dimension redcution : Reproduce most of variability of the $p$ variables by $k(\le p)$ principal components.
- PCA is usually a means and an intermediate step in statistical analyses.
- $\Rightarrow$ The results of PCA are  frequently used as an input to an other analysis.
---
- We seek to maximize the variance of a lienar combination of the variables.
- The first principal component is the lienar combination with maximal variance.
- The second principal component is the linear combination with maximal variance in a direction orthogonal to the first component, and so on.

## 6.2 Method
- Notation : Let $X = \begin{pmatrix} X_1 \\ \vdots \\ X_p\end{pmatrix}$ have the covariance matrix $\Sigma = Cov(X) = E(X - \mu_x) (X - \mu_x)'$ and the correlation matrix $\rho$.
- Problem : Find the linear combination of $X_1, \cdots, X_p$ say $Y_1 = v_{11}X_1 + v_{21} X_p + \cdots + v_{p1} X_p$, that has the largest variance. Let $v_1 = \begin{pmatrix} v_{11} \\ \vdots \\ v_{p1} \end{pmatrix}$, so that $Y_1 = v_1' X$.
- Normalization As $\vert \vert v_1 \vert \vert$ gets largest, $v_1'\Sigma v_1$ becomes large.
- Problem corrected : Find the lieaner combination of $X_1, \cdots, X_p$, say $Y_1 = v_{11}X_1 + v_{21}X_2 + \cdots + v_{p1} X_p,$ that has the largest variance where $\vert \vert v_1 \vert \vert = 1$. $\Rightarrow$ Find $v_1$ such that $v_1 ' \Sigma v_1$ is maximized under $\vert \vert v_1 \vert \vert = 1$.
- Solution : Using Lagrange multiplier,
	$$\begin{aligned}
	\text{Maximize } v_1' \Sigma v_1 - \lambda_1(v_1'v_1 - 1) \\
	\Rightarrow \Sigma v_1 - \lambda_1 v_1 = 0 \\
	\Rightarrow (\Sigma - \lambda_1 I) v_1 = 0
	\end{aligned}$$
- Conclusion : The Direction of the maximum variance is the same as the direction of the eigenvector $v_1 = e_1$ with the lragest eigenvalue (= largest variance) $\lambda_1$.
- Problem continued : Find the direction of the second maximum variance $\lambda_2$ of which direction $v_2$ is orthogonal to $v_1 = e_1$.
	- Find the direction of the maximum variance $\lambda_j$ of which direction $v_j$ is orthgonal to $v_1, \cdots, v_{j-1}$
- Solution : We can find $p$ orthonormal eigenvectors $v_1 = e_1, v_2 = e)2, \cdots, v_p = e_p$ with corresponding eigenvalues $\lambda_1 \ge \lambda_2 \ge \cdots \ge \lambda_p$.
- Summary
	- Let $V= (v_1 : v_2 : \cdots : v_p) = (e_1 : e_2 : \cdots : e_p)$ be the orthogonal matrix generated by the eigenvectors.
	$$V' \Sigma V = \Lambda = diag(\lambda_1, \lambda_2, \cdots, \lambda_p)$$
	$$V' V = V V' = I$$
	$$Y = V'X$$
	$$Cov(Y) = V'Cov(X)V = V' \Sigma V = \Lambda$$
	$$Cov(Y_i, X_j) = Cov(Y_i, \sum_{k=1}^p v_{jk} Y_k) = v_{ji} \lambda_i$$
	$$Cor(Y_i, X_j) = \frac{Cov(Y_i, X_j)}{\sqrt{Var(Y_i)}\sqrt{Var(X_j)}} = \frac{v_{ji} \lambda_i}{\sqrt \lambda_i \sqrt{\Sigma{jj}}} = \frac{v_{ji} \sqrt{\lambda_i}}{\sqrt{\Sigma_{jj}}}$$
	$$\begin{aligned}
	\text{Total variance} = trace(\Sigma) = \sum_{i=1}^p Var(X_i) = \sum_{i=1}^p \Sigma_{ii} \\
	=trace(V \Lambda V') = trace(\Lambda V' V) = \sum_{i=1}^p Var(Y_i) = \lambda_1 + \cdots + \lambda_p
	\end{aligned}$$
	- Proportion of total variance due to $k$th PC = $\frac{\lambda_k}{\lambda_1 + \cdots +\ lambda_p}$
	- Proportion of total variance due to firth $k$th PCs = $\frac{\lambda_1 + \cdots + \lambda_k}{\lambda_1 + \cdots + \lambda_k + \lambda_{k+1} + \cdots + \lambda_p}$

- Working with dat : Since the population variance-covariance matrix is unknonw, we use the sample variance-covariance matrix $S = \frac{1}{n-1} \sum_{i=1}^n (X_i - \bar X)(X_i - \bar X)'$

## 6.3 PCA from the correlation matrix
- Since the (sample) covariance matrix $S$ is not invariant under change of measurement units, the principal components extracted from the covariance matrix may be drastically vary by scaling of variables. In such cases, teh principal components obtained from the (sample) correlation matrix $R$ may be preferred to the components from $S$
- Howerver, note that the principal components extracted from teh sample covraiance $S$ instead of the sample correaltion matrix $R$ may be more interpretable when they are supposed to used in further analysis.

- Standardization : Let $Z = (Z_1, \cdots, Z_p)'$ be the standardized variable vector with:
	$$Z_i = \frac{X_i - \mu_i}{\sqrt{\Sigma_{ii}}}$$
	Let $D = diag(\Sigma_{11}, \cdots, \Sigma_{pp})$
	$$Cov(Z) = D^{-1/2} \Sigma D^{-1/2} = \rho$$
	We may use the principal components of the correlation matrix $\rho$.
- Working with data : We use the sample correlation matrix $R$.
	1. The percent of variance in total variance accounted for by the components of $R$ will differ from the percent for $S$.
	2. The coefficients of the principal components from $R$ differ from those obtained from $S$.
	3. If we express the components from $R$ in terms of the original variable,s they still will not agree with the components from $S$.
	4. The principal components from $R$ are scale invariant, because $R$ itselft is scale invariant.
	5. The components from a given matrix $R$ are not unique to that $R$.


## 6.4 Plotting of principal components
- We can plot the first two components as a dimension reduction device. We simply evaluate the first two compoents $(y_1, y_2)$ for each observation vector and plot these n points. The plot is equivalent to a projection of the p-dimensional data swarm onto the plan that shows the greatest spread of the points.
- If the original variables have amultivariate normal distribution, then the principal components have a multivariate normal distribution as well since the components are the linear combinations of the original variables. The catter plot must look like an ellipse under normality assumption.

## 6.5 How many components to retain?
- In every application, a decision must be made on how many principal components should be retained in order to effectively summarize the data. The following guidelines have been proposed:
	1. Retain sufficient components to account for a specified percentage of the total variance, say 80%
	2. Retain the components whose eigenvalues are greater than the average of the eigenvalues, $\sum_{i=1}^p \lambda_i / p$. For a correaltion matrix, this average is 1.
	3. Use the scree plot, a plot of $\lambda_i$ versus $i$, and look for a natural break between the "large" eigenvalues and the "small" eigenvalues.
	4. Test the significance of the "larger" components, that is, the components corresponding to the larger eigenvalues. This approach assumes multivariate normality. Suppose $X \sim N_p(\mu, \Sigma)$ and $2 \le k \le p$. We can test $H_{0k} = \lambda_{p - k + 1} = \lambda+{p - k + 2} = \cdots = \lambda_p$ using the likelihood ratio test. When the sample size $n$ is large, the LRT statistic is
		$$ - 2 log LRT = ( n - \frac{2 p + 11}{6}) ( k log [\frac{1}{k} \sum_{i=p-k+1}^p \lambda_i] - \sum_{i=p-k+1}^p log \lambda_i) \sim \chi_v^2 \text{ under } H_0$$
		where the degrees of freedom is $v = \frac{1}{2} (k - 1) (k+2)$. Therefore, we begin with $H_{02}: \lambda_{p-1} = \lambda_p$., then we test $H_{03}$ and so on until we reject $H_{0k}$. Suppose we reject $H_{0k}$ whereas we fail to reject $H_{0, k-1}, \cdots, H_{02}$. Then, we retain first $p-k +1$ principal components $Y_1, \cdots, Y_{p-k+1}$.
		
	## 6.6 Large sample inferences for eigenvalues and eigenvectors
	- PCA is based on the eigenvalues and eigenvectors of the covariance or correlation matrix
	- Let $\lambda = \begin{pmatrix} \lambda_1 \\ \vdots \\ \lambda_p\end{pmatrix}$ and $\Lambda = diag(\lambda_1, \cdots, \lambda_p)$. For a large sample,
		$$ \sqrt n (\hat \lambda - \lambda) \sim N_p(0, 2 \Lambda^2)$$
		- $100(1-\alpha)$% CI for $\lambda_i$ : $\frac{\hat \lambda_i}{1 \pm z_{\frac{\alpha}{2} \sqrt{\frac{2}{n}}}}$
		$$\sqrt{n}(\hat e_i - e_i) \sim N_p(0, \lambda_i \sum_{k \not = i} \frac{\lambda_k}{(\lambda_k - \lambda_i)^2 e_k e_k'})$$
		
	
## Chapter 7 . Factor Analysis (FA)
- In eary 20th century, Karl Pearson, Charles Spearman, and others attempted to define and measure intelligence.
- Charles Spearman is credited with the early development of factor analysis. He studied the correlations between students' test scores of various types and noted that many observed correlations could be accounted for by a simple model (Spearman, 1904). 
- Spearman suggested that the six test scores could be described by the eqution
	$$ X_i = a_iF + e_i$$
	where
		- $X_i$ is the $i$th score after it has been standardized to have a mean of zero and a standard deviation of one for all the boys $a_i$ is a constant.
		- $F$ is a factor value, which has a mean of zero and a standard deviation of one for all the boys
		- $e_i$ is the part of $X_i$ that is specific to the $i$th test only.
- The main purpose of factor analysis is to describe, if possible, the covariance relationships among many variables in terms of a few underlying, but unobservable (latent, hidden), random quantities called factors( constructs).
- We want to repreasent the variables $X_1, \cdots, X_p$ as linear combinations of a few random variables $F_1, \cdots, F_m$, where $m<p$.
- Differences between PCA and FA
	1. In PCA, principal components are defined as linear combinations of the original variables. In FA, the original variables are expressed as linear combinations of the factors.
	2. In PCA, we explain a large part of the toal variance of the variables. In FA, we seek to account for the covariances or correlations among the variables.
- Suppose variables can be gouped by their correlations. That is, suppose all variables within a particular group are highly correlated among themselves, but have relative small correlations with variables in a different group. Then it is conceivable that each group of variables represents a single underlying construct, or factor, that is repsonsible for the observed correlations.

## 7.1 Orthogonal factor model
- The observable random vector $X$, with $p$ components, has mean $\mu$ and covariance matrix. The factor model postulates that $X$ is linearly dependent upon a few unobservable random variables $F_1, F_2, \cdots, F_m$, called common factors, and $p$ additional sources of variation $\epsilon_1, \epsilon_2, \cdots, \epsilon_p$, called errors or, sometimes, specific factors. In particular, the factor analysis model is
	$$\begin{aligned}
	X_1 - \mu _1 &= l_{11} F_1 + \cdots + l_{1m} F_m + \epsilon_1 \\ 
	X_2 - \mu_2 &= l_{21} F_1 + \cdots + l_{2m} F_m + \epsilon_2 \\
	\vdots \\
	X_p - \mu_p &= l_{p1} F_1 + \cdots + l_{pm} F_m + \epsilon_p
	\end{aligned}$$
	In matrix notatio, an orthogonal factor model with m common factors is defined by
	$$X - \mu = LF + \epsilon$$
	where
	$$X = \begin{pmatrix} X_1 \\ X_2 \\ \vdots \\ X_p\end{pmatrix},
	\mu = \begin{pmatrix} \mu_1 \\ \mu_2 \\ \vdots \\ \mu_p \end{pmatrix},
	L = \begin{pmatrix}
	l_{11} & l_{12} & \cdots & l_{1m} \\
	l_{21} & l_{22} & \cdots & l_{2m} \\
	\vdots & \vdots & \ddots & \vdots \\
	l_{p1} & l_{p2} & \cdots & l_{pm} \\
	\end{pmatrix},
	F = \begin{pmatrix} F_1 \\ F_2 \\ \vdots \\ F_m \end{pmatrix},
	\epsilon = \begin{pmatrix} \epsilon_1 \\ \epsilon_2 \\ \vdots \\ \epsilon_p\end{pmatrix}$$
	
- We assume
	$$E(F) = 0, E(\epsilon) = 0$$
	$$Cov(F) = E(FF^T) = I, Cov(\epsilon) = E(\epsilon \epsilon^T) = \Psi = \begin{pmatrix}
	\psi_1 & 0 & \cdots & 0 \\
	0 & \psi_2 & \cdots & 0 \\
	\vdots & \vdots & \ddots & \vdots \\
	0 & 0 & \cdots & \psi_p
	\end{pmatrix}$$
	$$Cov(\epsilon, F) = E(\epsilon F) = 0$$
- From the assumptions, we have $Cov(X, F) = L$.
- $l_{ij}$ is called the loading of the $i$th variable on the $j$th factor.
- $\psi_i$ is called the $i$th specific variance.
- $L$ is called the matrix of factor loadings.
- Note that the orthogonal factor model implies the covariance struct of $X$:
	$$\begin{aligned}
	\Sigma &= Cov(X) = E[(X - \mu)(X - \mu)^T] \\
	& = E[(LF + \epsilon)(LF + \epsilon)^T] \\
	& = LE(FF^T)L^T + E(\epsilon F^T) L^T + LE(F \epsilon^T) + E(\epsilon \epsilon^T) \\
	& = LL^T + \Psi
	\end{aligned}$$
	That is,
		$$\begin{aligned}
		\Sigma_{ii} & = l_{i1}^2 + \cdots + l_{lm}^2 + \psi_i \\
		Var(X_i) &= \text{communality} + \text{specific variance} \\
		&= h_i^2 + \psi_i \text{ where } h_i^2 = l_{i1}^2 + \cdots + l_{im}^2
		\end{aligned}$$
- The orthogonal factor model is not unique since $L^* = LQ$ for any orthogonal matrix $Q$ satisfies $X - \mu= LQQ^TF + \epsilon = L^* F^* + \epsilon$ if we define $L^* = LQ$ and $F^* = Q^TF$. Furthermore, $E(F^*) = Q^TE(F) = 0$ and $Cov(F^*) = Q^TCov(F)Q = I$. It is impossible to distinguish the loading matrix $L$ from the another loading matrix $L^*$.
- When $m < p$, not every covariance matrix $\Sigma$ can be written as $\Sigma = LL^T + \Psi$.

## 7.2 Estimations
1. (Principal component method)
	$$\begin{aligned}
	\Sigma &= \sum_{i=1}^p \lambda_i e_i e_i' = \sum_{i=1}^p (\sqrt{\lambda_i} e_i)(\sqrt{\lambda_i}e_i)' \\
	& = (\sqrt{\lambda_i} e_1 : \cdots : \sqrt{\lambda_p} e_p) \begin{pmatrix}\sqrt{\lambda_1}e_1' \\ \vdots \\ \sqrt{\lambda_p} e_p'\end{pmatrix}
	\end{aligned}$$
	If $\lambda_{m+1}, \cdots, \lambda_p$ are small, then we can approximate the covariance matrix by:
	$$\Sigma \approx ( \sqrt{\lambda_1} e_1 : \cdots : \sqrt{\lambda_m} e_m)
	\begin{pmatrix}
	\sqrt{\lambda_1} e_1' \\ \vdots \\ \sqrt{\lambda_m} e_m' \end{pmatrix} + 
	\begin{pmatrix} \psi_1 & 0 & \cdots & 0 \\ 0 & \psi_2 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \psi_p\end{pmatrix}$$
	where $\psi_i = \Sigma_{ii} - \sum_{j=1}^m l_{ij}^2$
	Communalities are
		$$h_i^2 = l_{i1}^2 + \cdots + l_{im}^2$$
		
- When applied to the smaple covariance matrix $S$ or the sample correlation matrix $R$, is known as the principal component solution. The residual matrix is given by
	$$S - \hat L \hat L' + \hat \psi)$$
	resulting from approximation of $S$ by the principal component solutions
	$$\text{Sum of squared entries of } S - (\hat L \hat L' + \hat \Psi) \le \hat \lambda_{m+1}^2 + \cdots + \hat \lambda_p^2$$
	$$\text{Proportion of total vairnace due to jth factor} = \begin{cases} 
	\frac{\hat \lambda_j}{s_{11} + \cdots + s_{pp}} & \text{for }S \\
	\frac{\lambda_j}{p}	& \text{for } R
	\end{cases}$$
	
2. (Principal factors) We initially estimate $\Phi^{(0)}$, and apply the principal component solution to $S - \Psi^{(r)}$.
	$$\begin{aligned}
	S - \Psi^{(r)} &= \sum_{j=1}^m \lambda_j^{(r)}e_j^{(r)}e_j^{(r)T} + \sum_{j=m+1}^p \lambda_j^{(r)} e_j^{(r)} e_j^{(r)T}\\
	\Psi^{(r+1)} & = diag(S - L^{(r)}L^{(r)T})
	\end{aligned}$$
	- Repeat these steps until converges. The common intial diagonal matrix $\Psi^{(0)}$ is chosen as $diag(S^{-1})$ for factoring the sample covariance matrix and $diag(R^{-1})$ for factoring the sample corelation matrix.
3. (Maximum likelihood method) Assume $X_j - \mu = LF_j + \epsilon_j$ has a multivariate normal distribution. The likelihood function is given by
	$$\begin{aligned}
	L(\mu, \Sigma) &= \prod_{i=1}^N [\frac{1}{(2 \pi)^{p/2} \vert \Sigma \vert ^{1/2}} e^{-\frac{1}{2}(x_i - \mu)' \Sigma^{-1} (x_i - \mu)}] \\
	&= \prod_{i=1}^N [\frac{1}{(2 \pi)^{p/2} \vert LL^T + \Psi \vert ^{1/2}} e^{-\frac{1}{2}(x_i - \mu)' (LL^T + \Psi)^{-1} (x_i - \mu)}] \\
	\end{aligned}$$
	Since $LQQ^TL^T = LL^T$ for any $m \times m$ orthogonal matrix $Q$, it is necessary to impose a condition to obtain a unique maximum likelihood solution: we need $m(m-1)/2$ constraints. Note
	$$(LL^T + \Psi)^{-1} = \Psi^{-1} - \Psi^{-1}L(I + L^T \Psi^{-1}L)^{-1}L^T \Psi^{-1}$$
	If we impose a condition that $L^T \Psi^{-1}L$ is a diagonal matrix (it is exactly $m(m-1)/2$ constraints), then we acan numerically find the MLEs. Hence, we assume
		$$L^T\Psi^{-1}L = \Delta \text{ a diagonal matrix }$$
	We numerically obtain $\hat L$ and $\hat \Psi$ asusuming $L^T \Psi^{-1}L$ is diagonal.
	
	
## 7.3 Hypothesis Testing on the Number of Factors
- We may use the likelihood ratio test:
	$$\begin{aligned}
	-2 log \Lambda & = n log(\frac{\vert \hat \Sigma \vert}{\vert \hat S_n \vert}) \\
	&= n log (\frac{\vert \hat L \hat L' + \hat \Psi \vert}{\vert \hat S_n \vert})
	\end{aligned}$$
	We reject the null hypothesis of $H_0: \Sigma = LL' + \Psi$ if
		$$ n log(\frac{\vert \hat L \hat L' + \hat \Psi \vert}{\vert \hat S_n \vert}) \ge \chi_{df - df_0}^2 (\alpha)$$
	where $df = \frac{p(p+1)}{2}$ is the number of free parameters in $\Sigma$ and $df_0 = p(m+1) - \frac{m(m-1)}{2}$ is the number of free parameters in $LL' + \Psi$ under the $\frac{m(m-1)}{2}$ uniqueness contraint $L' \Psi^{-1} L = \Delta$. The Wilks' chi0-square approximation can be used only for $df - df_0 > 0$, that is, $m< \frac{1}{2}(2p + 1 - \sqrt{8p+1})$. Otherwise, we may use a parametric bootstrap method to find the null distribution of the likelihood ratio test statistic. We may use Bartlett's corrected test statistic to improvfe the large sample approximation:
	$$(n - 1 - \frac{(2p + 4m + 5)}{6}) log (\frac{\vert \hat L \hat L' + \hat \Psi \vert}{\vert \hat S_n \vert}) \ge \chi_{df - df_0}^2 (\alpha)$$
- When the sample size $n$ is large and the number of common factors $m$ is small, the hypothesis test usually tends to reject $H_0$.
- Suppose $\hat D^{-1/2} S_n \hat D^{-1/2} = R$.
	$$ \frac{\vert \hat \Sigma \vert }{\vert S_n \vert} = \frac{\hat \Sigma \hat L' + \hat \Psi}{\vert S_n \vert} = \frac{\vert \hat L_z \hat L_z' + \hat \Psi_z \vert}{\vert R \vert}$$
	When we use the standardized variables and the correlation matrix instead of the covraince matrix, the likelihood ratio test statistic for the number of factors is still valid.

## 7.4 Factor Rotation
- (Varimax rotation) Maximize sum of the variances of squares of (scaled) loadings for factors:
	$$V = \frac{1}{p} \sum_{j=1}^m [\sum_{i=1}^p (\bar l_{ij}^*)^4 - (\sum_{i=1}^p (\bar l_{ij}^*)^2)^2 / p]$$
	where $\bar l_{ij}^* = \frac{\hat l_{ij}^*}{\hat h_i}$
- (Oblique rotation) We may allow correlated factos for a better interpretation:
	$$\begin{aligned}
	X - \mu & = (LP)(P^{-1}F) + \epsilon \\
	& = L^*F^* + \epsilon \\
	Cov(F^*) &= P^{-1}P'^{-1} = (P'P)^{-1} \not = I
	\end{aligned}$$
	Since $Cov(F^*) \not = I$, the factor model obtained from oblique rotation is no longer an orthogonal factor model.

## 7.5 Factor scores
- In factor anlysis, interest is usually centered on th parameters in the factor model.
- However, the estimated values of the common factors, called factor scores, may also be required.
- These quantities, factor scores, are often used for diagnostic purposes, as well as inputs to a subsequent analysis.
- Let $f_j$ be the unobserved factor vector of subject $j$.

1. (Weighted Least Squares Method) Bartlett suggested weighted least squares be used to estimate the common factor values:
	$$x - \mu = Lf + \epsilon$$
	$$Var(\epsilon_i) = \psi_i$$
	$$\text{Minimize } \sum_{i=1}^p \frac{\epsilon_i}{\psi_i} = \epsilon' \Psi^{-1} \epsilon = (x - \mu - Lf)' \Psi^{-1}(x - \mu - Lf)$$
	$$\hat f = (L' \Psi^{-1} L)^{-1} L' \Psi^{-1} (x - \mu)$$
	Hence, the estimated factor score is
		$$\begin{aligned}
		\hat f_j &= (\hat L' \hat \Psi^{-1} \hat L)^{-1} \hat L' \hat \Psi^{-1} (x_j - \bar x) \\
		& = \hat \Delta ^{-1} \hat L' \hat \Psi^{-1} (x_j - \bar x)
		\end{aligned}$$
		When the correlation matrix is factored,
		$$\hat f_j = (\hat L_z' \hat \Psi_z ^{-1} \hat L_z)^{-1} \hat L_z' \hat \Psi_z^{-1} z_j = \hat \Delta_z ^{-1} \hat L_z' \hat \Psi_z^{-1} z_j$$
		where $z_j = D^{-1/2}(x_j \bar x)$ and $\hat \rho = \hat L_z \hat L_z' + \hat \Psi_z$. When $\hat L$ and $\hat \Psi$ are determined by the maximum likelihood method, these estimates must satisfy the uniqueness condition, $\hat L' \hat \Psi^{-1} \hat L = \hat \Delta$, a diagonal matrix.

2. (Regression Method) Since $X  - \mu = LF + \epsilon \sim N_p(0, LL' + \Psi)$ and $F \sim N_m(0, I)$, they have aj oint normal distribution $N_{p+m} (0, \Sigma^*)$ where
	$$\Sigma^* = \begin{pmatrix} \Sigma = LL' + \Psi & L \\ L' & I\end{pmatrix}$$
	From the conditional mean vector of a partitioned normal random vector given the rest partitioned vector is
	$$E(F \vert x) = L'(LL' + \Psi)^{-1} (x - \mu)$$
	$$\hat f_j = \hat L'(\hat L \hat L' + \hat \Psi)^{-1} (x_j - \bar x)$$
	$$\hat f_j = \hat L' S^{-1} (x_j - \bar x)$$
	To reduce the ffects of a (possibly) incorrect determination of the number of factors, practitioners tend to calculate the factor scores by using $S$ (the original sample covarinace matrix) instead of $\hat \Sigma$.
	Inf a correlation matrix is factored,
		$$\hat f_j = \hat L_z ' R^{-1} z_j$$
	- Remark1. If rotated loadings $\hat L ^* = \hat L T$ are used in place of the original loadings, the subsequence factor scores $\hat f_j^*$ are obtained by $\hat f_j^* = T \hat f_j$
	
3. (Principal component method) When the principal component solution is used, it is common to estimate the factor scores by a ordinary least squares method:
	$$F = (L'L)^{-1} L'(X- \mu)$$
	$$\hat f_j = (\hat L' \hat L)^{-1} \hat L'(x_j - \bar x)$$
	Since $\hat L = (\sqrt{\lambda_1} \hat e_1 : \cdots : \sqrt{\lambda_m} \hat e_m)$, we have $\hat L \hat L = diag(\hat \lambda_1, \cdots, \hat \lambda_m)$ and
	$$\begin{aligned}
	\hat f_j & = (\hat L' \hat L)^{-1} \hat L' (x_j - \bar x) \\
	& = \begin{pmatrix}
	\frac{1}{\lambda_1} & 0 & \cdots & 0 \\
	0 & \frac{1}{\lambda_2} & \cdots & 0 \\
	\vdots & \vdots & \ddots & \vdots \\
	0 & 0 & \cdots & \frac{1}{\lambda_m}
	\end{pmatrix}
	\begin{pmatrix}
	\sqrt{\hat \lambda_1} e_1 ' \\
	\sqrt{\hat \lambda_2} e_2 ' \\
	\vdots \\
	\sqrt{\hat \lambda_m} e_m'
	\end{pmatrix}
	(x_j - \bar x) \\
	&= \begin{aligned}
	\frac{1}{\sqrt{\lambda_1}} e_1' (x_j - \bar x) \\
	\frac{1}{\sqrt{\lambda_2}} e_2' (x_j - \bar x) \\
	\vdots \\
	\frac{1}{\sqrt{\lambda_m}} e_m' (x_j - \bar x) \\
	\end{aligned}
	\end{aligned}$$
	
## 7.6 Strategy for Factor Analysis
1. Perform a principal component factor analysis, including a varimax rotation
2. Perform a maximum likelihood factor analysis, including a varimax rotation
3. Compare the solutions
4. Repeat 1- 3 for other number of common factors $m$

# Chapter 8 Multivariate regression
- In this cahpter, we consider the linear relationship between one or more $y$'s  (the dependent or response variables) and one or more $x$'s (the independent or predictor variables). We will use a linear model to relate the $y$'s to the $x$'s  and will be concerned with estimation and testing of the parameters in the model.
- One aspect of interest will be choosing which variables to include in the model if this is not already known.
- Regression analysis is the statistical methodology for predicting valus of one or more response(dependent) variables from a collection of predictor (independent) variabel values. It can also be used for assessing the effects of the predictor variables on the reponses.

## 8.1 The Classical (Univariate) Linear Regression Model
- Let $Y$ be a response variable and $z_1, \cdots, z_r$ be $r$ predictor variables. The classical linear regression model states that $y$ is composed of a mean, which depends in a continuous manner on the $z_i$s, and a random error $\epsilon$, which accounts for measurement error and the effects of other variables not explicitly considered in the model. The values of the predictor variables recorded from the eperiment or set by the investigator are treated as fixed. The rror (and hence the response) is viewed as a random variable whose behavior is characterized by a set of distributional assumptions.
   $$ Y = \beta_0 + \beta_1 z_1 + \cdots + \beta_r z_r + \epsilon$$
   Given data $(y_i, z_{i1}, \cdots, z_{ip})$, we employ a matrix notation.
   $$\begin{aligned}
   Y_1 &= \beta_0 + \beta_1 z_{11} + \cdots + \beta_r z_{1r} + \epsilon_1 \\
   Y_2 &= \beta_0 + \beta_1 z_{21} + \cdots + \beta_r z_{2r} + \epsilon_2 \\
   \vdots \\
   Y_n &= \beta_0 + \beta_1 z_{n1} + \cdots + \beta_r z_{nr} + \epsilon_n \\
   \end{aligned}$$
   In matrix notation,
   $$Y = Z \beta + \epsilon$$
   where $Y = \begin{pmatrix} 
   y_1 \\ y_2 \\ \vdots \\ y_n
   \end{pmatrix}, Z = \begin{pmatrix} 
   z_{11} & \cdots  & z_{1p} \\
   z_{21} & \cdots & z_{2p} \\
   \vdots & \ddots & \vdots \\
   z_{n1} & \cdots & z_{np}
   \end{pmatrix}, \beta = \begin{pmatrix}
   \beta_1 \\ \vdots \\ \beta_p
   \end{pmatrix}, \epsilon = \begin{pmatrix}
   \epsilon_1 \\ \vdots \\ \epsilon_n
   \end{pmatrix}$.
   We assume
   		1. $E(\epsilon_i) = 0$
   		2. $Cov(\epsilon) = \sigma I$
		
## 8.2 Least Squares Estimation
- We minimize the sume of squares of the differences between the reponse values and the fitted values.
	$$\begin{aligned}
	S(\beta) & = (y - Z \beta)'(y - Z \beta) \\
	& = \sum_{i=1}^n (y_i - \beta_0 - \beta_1 z_{i1} - \cdots - \beta_r z_{ir})^2
	\end{aligned}$$
- Theorem 1. If $Z$ as of full rank $r + 1 \le n$, then the least squares estimate (LSE) minimizing $S(\beta)$ is given by
	$$\hat \beta = (Z'Z)^{-1}Z' y$$
	$$S(\hat \beta) = y'(I - Pz)y$$
- Definition 8.2.1 We define
	1. the fitted values by $\hat y = P_z y$
	2. the residuals by $\hat \epsilon = y - \hat y = (I - P_z) y$
	
- Theorem 2. Let $\hat \beta$ be the LSE of the model $Y = Z\beta + \epsilon$ with $E(\epsilon) = 0$ and $Cov(\epsilon) = \sigma^2 I$
- Properties
	1. $E(\hat \beta) = \beta$, that is, the LSE for $\beta$ is unbiased.
	2. $Cov(\hat \beta) = \sigma^2(Z'Z)^{-1}$
	3. $E(\hat \epsilon) = 0$
	4. $E(\frac{\hat \epsilon' \epsilon}{n-r-1}) = \sigma^2$$
	5. $Cov(\hat \beta, \hat \epsilon) = 0$
	6. $\hat y' \hat \epsilon = 0$
	7. $1'\hat \epsilon = 0$.

## 8.3 Sum of Squares Decomposition
- Since $\hat y' \hat \epsilon = 0$,  the total sum of squares of the responses is
	$$\begin{aligned}
	y'y & = (\hat y + y - \hat y)' (\hat y + y - \hat y) \\
	&= \hat y ' \hat y + \hat \epsilon ' \hat \epsilon
	\end{aligned}$$
- Since $\bar y' \hat \epsilon = 0$, the total sum of squares about mean is decomposed as
	$$(y - \bar y)' (y- \bar y) = (\hat y - \bar y)'(\hat y - \bar y) + \hat \epsilon' \hat \epsilon$$
- Definition 8.3.1. The coefficient of determination is defined by 
	$$R^2 = \frac{(\hat y - \bar y)' (\hat y - \bar y)}{(y - \bar y)' (y - \bar y)}$$
	The multiple correlation coefficient is defined by the positive root of $R^2$, that is , $R = \sqrt{R^2}$
	
## 8.4 Inferences About the Regression Model
- The distributions of the estimators can be described under normality assumption on the error vector $\epsilon \sim N(0, \sigma^2 I)$.
- Theorem 3. Let $\hat \beta$ be the LSE of the model $Y = Z\beta + \epsilon$ with $\epsilon \sim N_n(0, \sigma^2 I)$. Suppose that $Z$ is of full rank $r + 1 \le n$.
	1. $\hat \beta = (Z'Z)^{-1} Z'y \sim N_{r+1}(\beta, \sigma^2(Z'Z)^{-1})$
	2. $n \hat \sigma^2 = \hat \epsilon ' \hat \epsilon \sim \sigma^2 \chi_{n-r-1}^2$ where $\hat \sigma^2$ is the MLE of $\sigma^2$.
	3. A $100(1- \alpha)$% confidence region for $\beta$ is given by
		$$(\beta - \hat \beta)' Z'Z(\beta - \hat \beta) \le (r + 1) s^2 F_{r+1, n-r-1, \alpha}$$
		The simultaneous confidence intervals for $\beta_i$'s are given by
		$$\hat \beta_i \pm \sqrt{s^2 (Z'Z)^{(ii)}} \sqrt{(r+1)F_{r+1, n-r-1, \alpha}}$$
		where $(Z'Z)^{(ii)}$ is the $(i,i)$ diagonal element of $(Z'Z)^{-1}$.
		The one-at-a-time confidence intervals are given by
		$$\hat \beta_i \pm t_{n-r-1, \alpha/2} \sqrt{s^2 (Z'Z)^{(ii)}}$$
		
### 8.4.1 Likelihood ratio tests (LRTs)
- Now we consider a hypothesis test $H_0 : \beta_{(2)} = 0$ where
	$$Z = (Z_1 : Z_2) \text{ and } \beta = \begin{pmatrix} \beta_{(1)} \\ \beta_{(2)} \end{pmatrix}$$
	$$Y = Z \beta + \epsilon = Z_1 \beta_{(1)} + Z_2 \beta_2 + \epsilon$$
- The likelihood function is given by
	$$L(\beta, \sigma^2) = \frac{1}{(2 \pi)^{n/2} (\sigma^2)^{n/2}} exp(-\frac{1}{2 \sigma^2} (y - Z \beta)' (y - Z \beta))$$
	$$\hat \beta = (Z'Z)^{-1}Z' y$$
	$$\hat \sigma^2 = \frac{1}{n} (y - Z \hat \beta)' (y - Z \hat \beta)$$
	$$L(\hat \beta, \hat \sigma^2) = (2 \pi e)^{-n/2} (\hat \sigma^2)^{-\frac{n}{2}}$$
- Under $H_0: \beta_{(2)} = 0, Y = Z_1 \beta_{(1)} + \epsilon$
	$$\hat \beta_{(1)} = (Z'_1 Z_1)^{-1}Z_1'y$$
	$$\hat \sigma_{H_0}^2 = \frac{1}{n}( y- Z_z \hat \beta_{(1)})'(y - Z_1 \hat \beta_{(1)})$$
	$$L(\hat \beta_{(1)}, \hat \sigma_{H_0}^2) = (2 \pi e)^{- n/ 2} (\hat \sigma_{H_0}^2)^{-\frac{n}{2}}$$
- The LRT is given by
	$$\begin{aligned}
	\Lambda &= \frac{\underset{\beta_{(1)}, \beta_{(2)}= 0, \sigma^2}{max} L(\beta, \sigma^2)}{\underset{\beta, \sigma^2}{max} L(\beta, \sigma^2)} \\
	& = (\frac{\hat \sigma_{H_0}^2}{\hat \sigma^2})^{-\frac{n}{2}} \\
	& = (1 + \frac{\hat \sigma_{H_0}^2 - \hat \sigma^2}{\hat \sigma^2})^{-\frac{n}{2}} \le k
	\end{aligned}$$
  Therefore, we reject $H_0$ if $\frac{\hat \sigma_{H_0}^2 - \hat \sigma^2}{\hat \sigma^2}$ is large. We multiply a constant to obtain a distribution of the statistic:
  	$$F = \frac{\hat \sigma_{H_0}^2 - \hat \sigma^2}{\hat \sigma^2} \frac{n/(r-q)}{n/ (n-r-1)} = \frac{(RSS_{H_0} - RSS) / (r-q)}{RSS / (n-r-1)} \sim F_{r-q, n-r-1}$$
	or
	$$F = \frac{(R^2 - R_{H_0}^2) / (r-q)}{(1 - R^2)/ (n-r-1)} \sim F_{r-q, n-r-1}$$
More general hypothesis $H_0 : C \beta = \gamma_0$ where $C$ is $p \times (r + 1)$ matrix of full rank $p \le r + 1$. We can show that the null hypothesis $H_0$ is rejected if
	$$F = \frac{(C \hat \beta - \gamma_0)'[C(Z'Z)^{-1}C']^{-1} (C \hat \beta - \gamma_0)}{s^2} > p F_{p, n-r-1, \alpha}$$
	where $s^2 = \frac{1}{n-r-1}(y - Z \hat \beta)'(y - Z \hat \beta)$
	
## 8.5 Inferences from the Estimated Regression Function
- When the fitted model is properly selected and satisfied theassumptions, we may use the model to predict the response value at a given predictor values $z_0$.
- (Estimating the mean response) The mean response at $z_0$ is $E(Y \vert z_0) = \beta' z_0$ and $\hat \beta' z_0 \sim N(\beta' z_0, \sigma^2 z_0'(Z'Z)^{-1}z_0)$. The estimator $(n-r-1)s^2 \sim \sigma^2 \chi_{n-r-1}^2$ independently of $\hat \beta$. A $100(1 - \alpha)$% confidence interval for the mean response is given by
	$$\hat \beta' z_0 \pm t_{n-r-1, \frac{\alpha}{2}} \sqrt{s^2 z_0' (Z'Z)^{-1}z_0}$$
- (Prediction of the response value) We can predict a response random variable $Y_0$ at a given predictor vector $z_0$.
	$$\begin{aligned}
	Y_0 & = \beta' z_0 + \epsilon_0 \\
	Y_0 - \hat \beta' z_0 &= (\beta'z_0 - \hat \beta z_0) + \epsilon_0 \\
	Var(Y_0 - \bar \beta' z_0) & = Var(\beta' z_0 - \hat \beta z_0) + Var(\epsilon_0) \\
	& = [z_0'(Z'Z)^{-1} z_0 + 1] \sigma^2 \\
	E(Y_0 - \hat \beta'z_0) &=0 \\
	Y_0 - \hat \beta' z_0 & \sim N(0, [z_0'(Z'Z)^{-1}z_0 + 1] \sigma^2)
	\end{aligned}$$
	A $100(1 - \alpha)$% prediction interval for the response $Y_0$ at $z_0$ is given by
		$$\hat \beta' z_0 \pm t_{n-r-1, \frac{\alpha}{2}} \sqrt{s^2 [ 1+ z_0'(z'Z)^{-1}z_0]}$$
		
## 8.6 Model Checking and Other Aspects of Regression
- We need to check adequacy of the model before making inferences or predictions. The residuals $\hat \epsilon = (I - H)y$ hasmean zero but covariance matrix $\sigma^2(I - H)$. Using the residual mean square $s^2$ as an estimate of $\sigma^2$, we have $\hat {Var}(\hat \epsilon_i) = s^2 (1 - h_{ii})$. The studentized residual $\hat \epsilon_i^*$ is defined by
	$$ \hat \epsilon_i^* = \frac{\hat \epsilon_i}{\sqrt{s^2(1 - h_{ii})}}$$
- The residuals can be used to detect violations of the assumptions.
	1. Plot the residuals $\hat \epsilon_i$ against the predicted values $\hat y_i$.
	2. Plot the residuals $\hat \epsilon_i$ aginast a predictor variable $z_j$
	3. Q-Q plots and histograms
	4. Plot the residuals versus time or location
- Outliers, Leverage and Influence
- Multicollinearity
- Variable selection

## 8.7 Multivariate Multiple Regression
- The multivariate multiple linear regression equation cna be written in matrix form
	$$Y_{n \times m} = Z_{n \times(r+1)} \beta_{(r+1) \times m} + \epsilon_{n \times m}$$
	with assumptions $E(\epsilon_{(i)}) = 0$ and $Cov(\epsilon_{(i)}, \epsilon_{(j)}) = \sigma{ij} I$ for $i,j=1, \cdots, m$. This multivariate multiple linear regression model implies each response variable has a (univariate response) multiple linear regression model
	$$Y_{(i)} = Z \beta_{(i)} + \epsilon_{(i)} \text{ where } Cov(\epsilon_{(i)}) = \sigma_{ii} I_{n \times n}$$
	However, the erros for diddfent responses $Y_{ij}$ and $Y_{ik}$ on the same subject are correlated, that is, $Cov(Y_{ij}, Y_{ik}) = \sigma_{jk}$.
