---
layout  : wiki
title   : Regression Analysis
summary : 2021 Spring
date    : 2021-06-06 14:56:14 +0900
lastmod : 2021-06-19 02:04:20 +0900
tags    : [statistics, lectures]
draft   : false
parent  : lectures
---

## Chapter 1. Introduction
### 1.1 What is regression analysis?
 * Regression analysis a method ofr investigating functional relationships among variables.
 * Relationship is expressed in the form of an equiation or a model connecting the response or dependent variable and one or more explanatory or predictor variables.
 * $$ Y = f(X_1, \cdots, X_p) + \epsilon $$:
   * where $$\epsilon$$ is a random error and the funciton $$f$$ describes the relationship between $$Y$$ and $$X_1, \cdots, X_p$$
 * $$Y$$ is called a response (output, or dependent) variable.
 * $$X_1, \cdots, X_p$$ are called predictors (explanatory, independent, input) variables, regressors, covariates, factors or carriers.
 * When $$f(X_1, \cdots, X_p) = \beta_0 + \beta_1 X_1 + \cdots + \beta_p X_p$$, it is called a linear regression model:
   * $$ Y = \beta_0 + \beta_1 X_1 + \cdots \beta_p X_p + \epsilon$$
   * where $$\beta_0, \beta_1, \cdots, \beta_p$$ are called the regression coefficients (parameters) to be unknown and estimated.

### 1.2 Hisotry
 * Least squares estimation (LSE) to fit a traight line to 2-dimensional data:
   * Legendre(1805), Gauss(1809)
   * -> Laplace(1810) : CLT and connecting LS method with normality
   * -> Gauss (1822): first part of Gauss-Markov theorem
 * The term of "regression" was coined by F. Galton:
   * Francis Galton (1886), "Regression towards mediocrity in hereditary stature". The journal of the Anthropological Institute of Great Britain and Ireland 15
   * Galton conclude in the paper "it is that the height-deviate of the offspring is, on the average, two-thirds the height-deviate of tis mid-perentage."
 * Yule(1892) and K.Pearson (1903) theoretically formulated the regression analysis for a bivariate normal ditribution.
 * RA Fisher (1922, 1925) released the assumption of the bivariate normality to the conditional normality of response given predictor.
 * George E.P.Box (1979) in his Response Surface Methodology book:
   * "Essentially, all models are wrong, but some are useful."

### 1.4 Procedures of regression analysis
 1. Statement of the problem
 2. Selection of potentially relevant variables
 3. Experimental design and data colelciton
 4. Model specification
 5. Choice of fittin model
 6. Model fitting
 7. Model validation and criticism
 8. Using the model for the intended purpose

#### Various Models
 * Univariate : Only one quantative response variable
 * Multivariate : Two or more quantitative response variables
 * Simple : Only one predictor variable
 * Multiple : two or mor predictor variables
 * Linear : All parameters enter the equation linearly, possibly after transformation of the data
 * Nonlinear : The relationship between the resposne and some of the predictors is nonlinear or some of the parameters appear nonlinearly, but no transformation is possible to make the parameters appear linearly
 * Analysis of variance : All predictors are qualitative variable
 * Analysis of covariance : Some predictors are quantitative variables and others are qualitative variables
 * Logistic : The response variable is qualitative

## Chapter 2. Corrleation analysis and simple linear regression
### 2.1 Covariance and correlation
 * Let $$X$$ and $$Y$$ be RVs defined on a population of interest. The vocariance of $$X$$ and $$Y$$ is defined by:
   * $$Cov(X,Y)=E\{(X-EX)(Y-EY)\} = E(XY) - (EX)(EY)$$
 * The sample covariance is the unbaised estimator of $$Cov(X,Y)$$ and defined as:
   * $$\hat {Cov}(X,Y) = \frac{1}{n-1}\sum_{i=1}^n (y_i - \bar y) (x_i - \bar x)$$
 * The (population) correlation coefficient is defined by:
   * $$\rho = \rho_{xy} = Cor(X,Y) = Cov(\frac{X-EX}{\sigma_X}, \frac{Y - EY}{\sigma_Y})$$
 * The sample correlation coefficient is defined by:
   * $$\gamma = \gamma_{xy} = \hat {Cor}(X, Y) = \frac{\sum_{i=1}^n (x_i - \bar x)(y_i - \bar y)}{\sqrt{(\sum_{i=1}^n(x_i - \bar x)^2 (\sum_{i=1}^n (y_i - \bar y)^2)}} \\\\ = \frac{1}{n-1}\sum_{i=1}^n \frac{x_i - \bar x}{s_x} \frac{y_i - bar y)}{s_y}$$

### Anscombe's quartet
 * What is the lesson from Anscombe's quartet? The quartet illustration the importance of looking at a set of data graphically before staring to analyze according to a particular type of relationship, and the inadequancy of basic statistic properties for describing relistic datasets.
 * A single extern observation (outlier) may influence the correlation analysis or linear model too much and distort the result.

### 2.2 Simple linear regression
 * $$Y = \beta_0 + \beta_1 X + \epsilon$$
 * We call $$\beta_0$$ and $$\beta_1$$ the regression coefficients (parameters).

### 2.3 Least Squares Estimation (LSE)
 * Sum of squares of the vertical distance:
   * $$S(\beta_0, \beta_1) = \sum_{i=1}^n \epsilon_i^2 \\\\ = \sum_{i=1}^n (y_i - \beta_0 - \beta_1 x_i)^2$$
 * By differentiating in $$\beta_0$$ and $$\beta_1$$, the LSEs are obtained as follows:
   * $$\hat \beta_1 = \frac{\sum_{i=1}^n (x_i - \bar x)(y_i - \bar y)}{\sum_{i=1}^n(x_i - \bar x)^2} = \frac{S_{xy}}{S_{xx}}$$
   * $$\hat \beta_0 = \bar y - \hat \beta_1 \bar x$$
 * Relation between the correlation coefficient and the regression coefficient:
   * $$\beta_1 = \gamma_{xy} \frac{s_y}{s_x}$$

### 2.4 Properties of the LSE
 * Assume $$E \epsilon_i = 0, Var(\epsilon_i) = \sigma^2$$, and they are independent.:
   * $$E \hat \beta_0 = \beta_0$$
   * $$E \hat \beta_1 = \btea_1$$
   * $$Var(\hat \beta_0) = \sigma^2[\frac{1}{n} + \frac{\bar x ^2}{\sum_{i=1}^n (x_i - \bar x)^2}] = \sigma^2 [\frac{1}{n} + \frac{\bar x^2}{S_{xx}]$$
   * $$Var(\hat \beta_1) = \frac{\sigma^2}{\sum_{i=1}^n (x_i - \bar x)^2 = \frac{\sigma^2}{S_{xx}}}$$
   * $$Cov(\hat \beta_0, \hat \beta_1) = - \frac{\bar x}{S_xx} \sigma^2$$

 * Assume $$\epsilon_i \sim^{i.i.d} N(0, \sigma^2)$$:
   * $$\hat \beta_0 \sim N(\beta_0, \sigma^2 [\frac{1}{n} + \frac{\bar x^2}{\sum_{i=1}^n (x_i - \bar x)^2}])$$
   * $$\hat \beta_1 \sim N(\beta_1, \frac{\sigma^2}{\sum_{i=1}^n (x_i - \bar x)^2})$$

 * How to estimate (or get) $$\sigma$$?:
   * If we have a priori knowledge about $$\sigma$$ from previous studies, then we may use the value of $$\sigma$$.
   * Otherwise, estimate it:
     * $$\hat \sigma^2 = \frac{sum_{i=1}^n e_i^2}{n-2} = \frac{\sum_{i=1}^n (y_i - \hat y_i)^2}{n-2} = \frac{SSE}{n-2} = MSE$$
     * The estimator $$\hat \sigma^2$$ is unbiased for $$\sigma^2$$, that is, $$E \hat \sigma^2 = \sigma^2$$
     * Without proof, $$\frac{SSE}{\sigma^2} \sim \chi_{n-2}^2$$ if $$\epsilon_i \sim^{i.i.d} N(0, \sigma^2)$$
