---
layout  : wiki
title   : Multi Variant Statistical Analysis
summary : 2021-fall lecture
date    : 2021-09-24 12:38:16 +0900
lastmod : 2021-09-24 13:09:40 +0900
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
