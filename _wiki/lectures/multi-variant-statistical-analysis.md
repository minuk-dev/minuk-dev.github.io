---
layout  : wiki
title   : Multi Variant Statistical Analysis
summary : 2021-fall lecture
date    : 2021-09-24 12:38:16 +0900
lastmod : 2021-10-14 03:42:51 +0900
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
   * $A = \begin{pmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\\\ a_{21} & a_{22} & \cdots a_{2n} \\ \vdots & \vdots & \ddots \vdots \\\\ a_{m1} & a_{m2} \cdots a_{mn} \end{pmatrix}$
   * It is common to use a matrix to display a data set: a datset with n subjects and p variables can be written as a $n \times p$ matrix. It is called a data matrix or data array.
   * Note that the $i$th row is the list of the measurments obtained from Unit (Individual) $i$, and the $j$ the column is the list of measruements of Variable $j$.
 * Vector: A column or row matrix
   * $x = \begin{pmatrix} x_1 \\\\ \vdots \\\\ x_n \end{pmatrix}$
   * $x^T = x' = (x_1, \cdots, x_n)$
   * where the transpose of A is defined as:
     * $A^T = A' = (a_{ji}$
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
 * Trace : $tr(A) =^{\def} \sum_{i=1}^p a_{ii}$:
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
     * $c_{1j} = \frac{a_{1j}}{\c_{11}} \text{ for } 2 \le j \le p$
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
     * $A^{1/2} = Q diag(\sqrt{\labmda_1}, ..., \sqrt{\lambda_p}) Q'$
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
 * Definition 2.1.2. A bivariate normal random vector $X = (X_1, X_2)'$ has mean $\mu = (\mu_1, \mu_2)'$ and variance-covariance matrix $\Sigma = \begin{pmatrix} \sigma_1^2 & \sigma_1 \sigma_2 \rho \\\\ \sigma_1 \sigma_2 \rho \\\\ \sigma_2^2 \end{pmatrix}$ where $\sigma_i^2 = Var(X_i)$ and $\rho = Cor(X_1, X_2) = \frac{Cov(X_1, X_2)}{sigma_1 \sigma_2}$ so that $Cov(X_1, X_2) = \sigma_1 \sigma_2 \rho$. The density function of a bivariate normal $X = (X_1, X_2)'$ is defined by:
   * $f(x_1, x_2) = \frac{1}{2 \pi \sigma_1 \sigma_2 \sqrt{1 - \rho^2}} exp(-\frac{1}{2(1 - \rho^2) (\frac{(x_1 - \mu_1)^2}{\sigma_1 ^2} - \frac{2 \rho (x_1 - \mu_1)(x_2 -\mu_2)}{\simga_1 \sigma_2} + \frac{(x_2 - \mu_2)^2}{\sigma_2^2})})$
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

 * 2. Let $A$ be a $q \time p$ matrix. Then $AX ~ N(A \mu, A\Sigma A^T)$. For any vector $b \in R^q, b^T (AX) = (b^T A)X$ is normally disributed from (Property 1) -> $AX$ is normally distributed. The mean vector is $E(AX) = A \mu$ and the covariance matrix is $E[(AX - A \mu)(AX - A\mu)^T] = A E[(X - \mu)(X - \mu)^T] A^T = A\SimgaA^T$.

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

