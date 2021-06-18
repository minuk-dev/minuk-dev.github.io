---
layout  : wiki
title   : Regression Analysis
summary : 2021 Spring
date    : 2021-06-06 14:56:14 +0900
lastmod : 2021-06-19 03:59:06 +0900
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
   * $$\gamma = \gamma_{xy} = \hat {Cor}(X, Y) = \frac{\sum_{i=1}^n (x_i - \bar x)(y_i - \bar y)}{\sqrt{(\sum_{i=1}^n(x_i - \bar x)^2 (\sum_{i=1}^n (y_i - \bar y)^2)}} \\\\ = \frac{1}{n-1}\sum_{i=1}^n \frac{x_i - \bar x}{s_x} \frac{y_i - \bar y)}{s_y}$$

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
   * $$E \hat \beta_1 = \beta_1$$
   * $$Var(\hat \beta_0) = \sigma^2 [\frac{1}{n} + \frac{\bar x ^2}{\sum_{i=1}^n (x_i - \bar x)^2}] = \sigma^2 [\frac{1}{n} + \frac{\bar x^2}{S_{xx}]$$
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
 * Standard error: the estimate of the standard deviation is called the standard error:
   * $$s.e.(\hat \beta_0) = \hat \sigma \sqrt{\frac{1}{n} + \frac{\bar x^2}{\sum_{i=1}^n (x_i - \bar x)^2}} \\\\ = \hat \sigma \sqrt{\frac{1}{n} + \frac{\bar x^2}{S_{xx}}} = \hat \sigma \sqrt{\frac{\sum x_i ^2}{n S_{xx}}}$$
   * $$s.e.(\hat \beta_1) = \frac{\hat \sigma}{\sqrt{\sum_{i=1}^n (x_i - \bar x)^2}} = \hat \sigma \sqrt{\frac{1}{S_{xx}}}$$

 * Under normality assumption, e.e., $$\epsilon_i \sim^{i.i.d} N(0, \sigma^2)$$:
   * $$\frac{\hat \beta_0 - \beta_0}{\hat \sigma \sqrt{\frac{1}{n} + \frac{\bar x^2}{\sum (x_i - \hat x)^2}}} \sim t_{n-2}$$
   * $$\frac{\hat \beta_1 - \beta_1}{\hat \sigma \frac{1}{\sqrt{\sum (x_i - \bar x)^2}}} \sim t_{n-2}$$

 * Hypothesis testing:
   * $$H_0 : \beta_0 = \beta_0^*$$
   * Test statistic: $$T = \frac{\hat \beta_0 - \beta_0^*}{\hat \sigma \sqrt{\frac{1}{n} + \frac{\bar x^2}{\sum(x_i - \bar x)^2}}} \sim t_{n-2} \text{ under } H_0$$
   * Let $$t_0$$ be the value of the test statistic with the data
   * Calculate the two-sided p-value by $$2P(T > |t_0|)$$ and reject H_0 if and only if the p-value <= the level of significance $$\alpha$$

   * $$H_0 : \beta_1 = \beta_1^*$$
   * Test statistic: $$T = \frac{\hat \beta_1 - \beta_1^*}{\hat \sigma \sqrt{\frac{1}{\sum (x_i - \bar x)^2}}} \sim t_{n-2} \text{ under } H_0$$
   * Let $$t_1$$ be the observed value of the test statistic from the data.
   * Calculate the p-value by $$2P(T > |t_1|)$$ and reject $$H_0$$ if and only if the p-value <= the level of significance $$\alpha$$

 * Confidence intervals:
   * $$\hat \beta_0 \pm t_{n-2, \alpha / 2} \times s.e.(\hat \beta_0)$$
   * $$\hat \beta_1 \pm t_{n-2, \alpha / 2} \times s.e.(\hat \beta_1)$$

 * Prediction and predction intervals:
   * Predicted value at $$x = x_0$$:
     * $$\hat y_0 = \hat \beta_0 + \hat \beta_1 x_0$$
   * Prediction interval:
     * $$\hat y_0 \pm t_{n-2, \alpha / 2} \times s.e.(\hat y_0)$$
     * where $$s.e.(\hat y_0) = \hat \sigma \sqrt{1 + \frac{1}{n} + \frac{(x_0 - \bar x)^2}{\sum(x_i - \bar x)^2}}$$

 * Mean response estimate and confidence limits:
   * Point estimate of the mean response at $$x = x)0$$:
     * $$\hat \mu_0 = \hat \beta_0 + \hat \beta_1 x_0$$
   * Confidence interval for $$\mu_0$$:
     * $$\hat \mu \pm t_{n-2, \alpha/2} \times s.e.(\hat \mu_0)$$
     * where $$s.e.(\hat \mu_0) = \hat \sigma \sqrt{\frac{1}{n} + \frac{(x_0 - \bar x)^2}{\sum(x_i - \bar x)^2}}$$

### 2.5 Quality of fit
 1. (objective) Thre greater t test statistic of $$H_0 : \beta_1 = 0$$ (or the smaller the p-value) is, the stronger the strength of the linear relationship between X and Y is.
 2. (subjective) The scatter plot may be used to discover the strength of the linear relationship.
 3. Examine the scatter plot of Y versus $$\hat Y$$. The closer the set of points to a straight line, the stronger the linear relationship between Y and X. One can measure the strength of the linear relationship in this graph by computing the correlation coefficient between Y and $$\hat Y$$,:
   * $$Cor(Y, \hat Y) = |Cor(Y, X)|$$
 4. Furtuermore, in both simple and multiple regressions, $$Cor(Y, \hat Y)$$ is related to another useful measure of the quality (goodness) of fit of the linear model to the observed data, that is called the coefficient of determination $$R^2$$.

 * Decomposition of the sum of square erros and the coefficient of determination $$R^2$$:
   * $$\sum(y_i - \bar y)^2 \text{ (SST) } = \sum (\hat y_i - \bar y)^2 \text{ (SSR) } + \sum (y_i - \hat y_i)^2 \text{ (SSE) }$$
   * $$R^2 = \frac{SSR}{SST} = 1 - \frac{SSE}{SST} = [cor(X, Y)]^2 = [cor(\hat Y, Y)]^2$$
   * $$R^2 = \frac{\text{Explained variance}}{\text{Total variance}}$$
   * $$R^2 = \frac{\sum (\hat y_i - \bar y)^2}{\sum {y_i - \bar y)^2}}$$

 * The coefficient of determination $$R^2$$ is a statistical measure of how well the regression line approximates the real data points.
 * $$R^2$$ does not provide the validty of the regression assumptions
 * We reemphasize that the regression assumptions should be checked before drawing statistical conclusions from the analysis (e.g., conducting tests of hypothesis or constructing confidence or prediction intervals) because the validity of these statistical procedures hinges on the validity of the assumptions.

### 2.6 Simple linear regression with no intercept
 * Model:
   * $$Y = \beta_1 X + \epsilon$$
 * The LS of $$\beta_1$$:
   * $$\hat \beta_1 = \frac{y_i x_i}{\sum x_i^2}$$
 * Fitted values and residuals:
   * $$\hat y_i = \hat \beta_1 x_i$$
   * $$\e_i = y_i - \hat y_i$$
 * Note that $$\sum e_i \not = 0$$
 * The standard error of the slope:
   * $$s.e.(\hat \beta_1) = \frac{\hat \sigma}{\sqrt{\sum x_i^2}} = \sqrt{\frac{SSE}{(n-1) \sum x_i^2}}$$
   * The coefficient of determination:
     * $$\sum y_i^2 = \sum \hat y_i ^2 + \sum e_i ^2$$
     * $$R^2 = \frac{\sum \hat y_i^2}{\sum y_i^2}$$

### 2.7 Trivial regression and one sample t test
 * Consider a linear model with zero slope:
   * $$Y = \beta_0 + \epsilon$$
 * To test $$H_0 : \beta_0 = \mu_0$$:
   * $$t = \frac{\bar y - \mu_0}{s.e.(\bar y)} = \frac{\bar y - \mu_0}{s_y / \sqrt{n}}$$

### 2.8 Hypothesis tests about a population correlation coefficient
 * Consider a bivariate randome variable (X, Y). Let $\rho$ be the population correlation of X and Y. We may perform a hypothesis test $H_0: \rho = 0$ using linear regression analysis when (X, Y) has a bivariate normal distribution.:
   * $t = r \sqrt{\frac{n-2}{1 - r ^2}} \sim t_{n-2} \text { under } H_0$
   * $r = \frac{t}{\sqrt{n-2 + t^2}}$
 * A permutation test or bootstrap method can be used without assuming normality
 * Fisher's z-transform can be used under assumption of large sample and normality.:
   * $z(r) = \frac{1}{2} log (\frac{1 + r}{1 - r})$
   * $\sqrt{n - 3} (z(r)-z(\rho_0)) \sim ^{asymp} N(0, 1) \text{ under } H_0 : \rho = \rho_0$
 * Under normality assumption, the exact distribution of the sample correlation coefficient is known

### Appendix
 * (Derivation of the LSEs of the regression coefficients) Consider a simple linear regression model:
   * $Y = \beta_0 + \beta x + \epsilon$
   * Suppose we have an iid randome sample $(x_1, Y_1), \cdots, (x_n, Y_n)$:
     * $Y_i = \beta_0 + \beta_1 x_i + \epsilon_i$
   * The unobservable errors are:
     * $\epsilon_i = Y_i - \beta_0 - \beta_1 x_i$
   * The LSEs are obtained by minimizing the sum of squared erros:
     * $SSE(\beta_0, \beta_1) = \sum_{i=1}^n (Y_i - \beta_0 - \beta_1 x_i)^2$
   * To find the LSEs, we differentiate $SSE(\beta_0, \beta_1)$ in $\beta_0$ and $\beta_1$ and the equations below are called the normal equations:
     * $\frac{\partial SSE(\beta_0, \beta_1)}{\partial \beta_0} = -2 \sum_{i=1}^n (Y_i - \beta_0 - \beta_1 x_i) = 0$
     * $\frac{\partial SSE(\beta_0, \beta_1)}{\partial \beta_1} = -2 \sum_{i=1}^n x_i (Y_i - \beta_0 - \beta_1 x_i) = 0$
   * The normal equations can be written as:
     * $\sum_{i=1}^n Y_i - n \beta_0 - \sum_{i=1}^n x_i \beta_1 = 0$:
       * This equation is equivalent to $\bar Y = \beta_0 + \beta_1 \bar x$
     * $\sum_{i=1}^n x_i Y_i - \sum_{i=1}^n x_i \beta_0 - \sum_{i=1}^n x_i^2 \beta_1 = 0$
