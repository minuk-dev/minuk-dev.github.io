---
layout  : wiki
title   : 통계학습개론(Introduction to statistical learnning) 수업 정리
summary : 2021 가을학기 수업 정리
date    : 2021-10-08 04:46:27 +0900
lastmod : 2021-12-08 03:16:51 +0900
tags    :
draft   : false
parent  : lectures
---

# [en] 1. Introduction to Statistical Learning
 * Machine learning arose as a subfield of Artifical Intelligence. Statistical learning arose as a subfield of Statistics. There is much overlap - both fields focus on supervised and unsupervised problems: Classification, Clustering, Regression, Detection, etc. But the distinction has become more and more blurred.:
   * Statistical learning theory is a framework for machine learning drawing from the fields of statistics and functional analysis. Statistical learning theory deals with the problem of finding a predictive function based on data.:
     * $Y = f(X) + \epslion$
     * where $f$ is some fixed but unknown function of $X$, and $\epsilon$ is a random error term, which is independent of $X$ and has mean zero.
   * Problems:
     * Predict whether someone will have a heart attack on the basis of demographic.
     * Customize an email spame detection system.
     * Identify the numbers in a handwritten zip code.
     * Establish the relationship between salary and demographic variables in population survey data.
   * Parametric Methods vs Non-parametric Methods:
     * Parametric Methods:
       * First, we make an assumption about the functinoal form, or shape, or $f$.
       * It reduces the problem of estimating $f$ down to one of estimating a set of parameters.
       * It the chosen model is too far from the true f, then our estimate will be poor.
       * Linear regrssion, logistic regrssion, linear SVM, LDA, QDA, etc.
     * Non-parametric Methods:
       * Non-parametric methods do not make explicit assumptions about the functional form of $f$. Instead they seek an estimate of $f$ that gets an close to the data points as possible without being too rough or wiggly.
       * A very large number of observations (far more than is typically needed for a parametric approach) is required in order to obtain an accurate estimate for $f$.
       * thin-plate spline, KNN, kernel SVM, decision tree.
   * Supervised Learning vs Unsupervised Learning:
     * Supervised Learning Problem:
       * Outcome measurement $Y$ (also called dependent variable, response, target).
       * Vector of $p$ predictor measurements $X$ (also called inputs, regressors, covariates, features, independent variables).
       * In the regression problem, Y is quantitative (e.g price, blood pressure).
       * In the classification problem, Y takes values in a finite, unordered set(survived/died, digit 0-9, cancer class of tissue sample).
       * We have training data $(x_1, y_1) ..., (x_N, y_N)$
     * Unsupervised Learning Problem:
       * No outcome variable, just a set of predictors (features) measured on a set of samples.
       * objective is more fuzzy - find groups of samples that behave similarly, find features that behave similarly, find linear combinations of features with the most variation.
       * difficult to know how well you are doing.
   * Training, test, and validation set:
     * A raining dataset is a dataset of examples used for learning, that is to fit the parameters. Most approaches that search though training data for empirical relationships tend to overfit the data, meaning that they can identify apparent relationships in the training data that do not hold in general.
     * A test dataset is a dataset that is independent of the training dataset, but that follows the same probability distribution as the training dataset.
     * A validation dataset is a set of examples used to time the hyperparameters of a clasifier.
   * Assessing Model Accuracy : It is an important task to decide for any given set of data which method produces the best results:
     * $\text{Training MSE} = \frac{1}{n} \sum_{i = 1}^{n}(y_i - \hat f (x_i))^2$, for training data $(x_i, y_i)$.
     * $\text{Test MSE} = \frac{1}{n} \sum_{i=1}^n (y_{0i} - \hat f (x_{0i}))^2$, for test data $(x_{0i}, y_{0i})$
  * We want to choose the moethod that gives the lowest test MSE, as opposed to the lowest training MSE. In practice, one can usually compute the training MSE with relative ease, but estimating test MSE is considerably more difficult because usually no test data are available. -> cross validation.
  * Expected test MSE : $E(y_0 - \hat f(x_0))^2 = Var(\hat f (x_0)) + [Bias(\hat f(x_0))]^2 + Var(\epsilon)$.:
    * Variance : The amount by which $\hat f$ would change if we estimated it using a different training data set. More flexible statistical methods have higher vriance.
    * Bias : Error that is introduced by approximating a real-life problem. More flexible methods result in less bias.
    * Good test set performance of a statistical learning method requires low variance as well as low squared bias. This is referred to as a trade-off because it is easy to obtain a method wich extremely low bias but high variance (for instance, by drawing a curve that passes through every single training observation) or a method with very low variance but high bias (by fitting a horizontal line to the data). The challenge lies in finding a method for which both the variance and the sqaured bias are low.
# [ko] 1. 통계학습 개론
 * 머신러닝은 인공지능의 한 분야로 생겨났고, 통계학습은 통계학의 한 분야로 생겨났다. 출발 지점은 다르지만 많은 부분이 겹친다. 두분야 모두 지도학습과 비지도학습의 문제(분류, 군집, 회귀, 감지 등)를 풀어내고 두 분야의 차이점은 점점 희미해지고 있다.:
   * 통계학습 이론은 통계학과 기능적 분석으로부터 기계학습을 이끌어내기 위한 체계이다.:
     * $Y = f(X) + \epsilon$
     * $f$는 $X$에 대한 결정된(fixed) 미지의 함수, $\epsilon$은 X와 독립이며, 평균은 0인 랜덤 변수이다.
     * `개인해석` : f가 결정되었다는 말은, 우리가 함수를 알지 못할뿐 변화하지는 않는다는 뜻이다. 다시 말해 키와 몸무게에 대해서 위와 같은 식을 세운다면 우리는 키와 몸무게의 관계는 결정되어 있지만 우리가 정확히 찾지 못한다는 것이다. 하지만 이렇게 되면 이론적으로나, 현실적으로나 문제가 생기게 되는데 이를 해결하기 위해서 사용되는 것이 오차이다. 오차가 존재하고 결정되지 않았다(랜덤 변수)라고 하는 것이다. 다시 말해서 몸무게가 키가 포함된 일정한 식에 의해서 결정된다고 우리는 추론을 하는데 이 식에 맞지 않는 사람이 나온다면 그 차이만큼이 오차이고, 이건 확률이라는 것이다.
     * 이걸 좀 더 고민해본다면, 오차의 평균은 0이라고 할 수 있음을 금방 추론해낼수 있다.:
       * 증명 : 만약 오차의 평균이 0이 아니라고 가정하자, 그렇다면 $\epsilon = c + \epsilon'$으로 쓸수 있다. ($\epsilon'$의 평균은 0). 이때 c 는 상수이므로 f(X)에 포함될 수 있고, 랜덤 변수와는 관계가 없다. 따라서 오차의 평균은 0이여야한다.
     * 독립이여야함은 나도 정확히 증명은 안했는데, 말로 대충 때우자면, 키 값에 따라서 오차가 변화한다면 에초에 그건 f에 포함되었어야 한다.
   * 문제:
     * 인구 통계(demographic)에 기반한 심장마비 예측
     * 스팸메일 탐지
     * 손으로 쓴 우편번호 구별
     * 인구 설문 조사에서 얻은 연봉과 인구 통계(demographic, 주변 환경)과 관계
   * 모수적 방법 vs 비모수적 방법:
     * 모수적 방법:
       * 먼저 f에 대해서, 함수의 형태나 모양에 대해서 가정한다.
       * 이에 기반하여, 함수를 추정하는 문제에서 함수의 모수(parameter)를 추정하는 문제로 변환한다.
       * 이렇게 나온 모델을 통해서 정확도를 분석한다.
       * 선형회귀, 로지스틱 회귀, 선형 SVM, LDA, QDA 가 이 방법에 해당한다.
     * 비모수적 방법:
       * f에 대한 명시적 가정이 없다.(모양이 어떻게 생겼을 것이다라는 걸 애초에 짐작하지 않는다.) 대신 f를 데이터에 가능한 부드럽게(끊기거나 요동치지 않게) 맞춘다.
       * 많은양의 데이터가 있을 수록 정확한 추정이 가능하다.
       * tin-plate spline, KNN, kernel SVM, decision tree 와 같은 방법이 있다.
   * 지도 학습 vs 비지도 학습:
     * 지도학습:
       * 결과 $Y$를 안다. (의존 변수, 반응, 목표 등으로도 불린다.)
       * 예측자의 벡터 $X$를 안다. (입력, 회귀자?, 특성, 독립변수 등으로 불린다.)
       * 회귀 문제에서 Y는 정량적이며 (가격, 혈압)
       * 분류 문제에서 Y는 유한하고 순서가 없는 집합의 값중 하나다.(삶/죽음, 0-9 사이 숫자, 암조직이다 아니다.)
       * 학습 데이터가 (특성, 답) 으로 구성된다.
     * 비지도학습:
       * 결과를 모른다. 단지 특성들만 있을 뿐이다.
       * 객관성이 매우 떨어진다. - 비슷한 집단을 그룹화, 유사한 특징을 가지는 특성들 찾기 등
       * 잘 되는건지 모름.
   * 학습, 테스트, 검증 세트:
     * 학습 데이터셋은 모수를 맞추기(fitting) 하기 위해서 사용된다. 대부분의 접근법에 학습 데이터 셋에 과적합되어, 일반적이지 않고 학습 데이터 셋에서만 보이는 관계를 찾을 수 있다. (아 한국어가 어렵네, 과적합이 될수도 있다는 말임.)
     * 검증 데이터 셋은 hyperparameter들을 조정하는데 사용된다. (과적합이나 학습이 덜되는 문제를 풀기 위해서 쓰임)
   * 모델의 정확도:
     * Training MSE, Test MSE
     * Training MSE가 아닌, Test MSE를 고려해서 가장 작은 Test MSE를 내는 방법을 선택해야하지만, 실제로는 테스트 데이터가 굉장히 어려워서 Test MSE를 알아내기 어렵다. -> 교차검증의 필요성
   * Test MSE의 추정값:
     * 분산 : 대부분의 탄력 있는 통계적 방법들은 높은 분산을 지닌다.
     * 편향 : 현실 문제와 비슷하게 소개되는 오차 개념 대부분의 탄력적 통계 방법은 작은 편향을 가진다.
   * 가장 좋은 모델은 분산과 편향이 둘다 낮은 것이다. 하지만, 이 둘은 서로 상호보환적이며 한쪽이 작으면 한쪽이 커지는 현상이 생긴다.

# 2. Linear regression
## [en]
 * A linear regresion model assumes that the regression function $E(Y \vert X)$ is linear in the inputs $X_1, ..., X_p$.

### 2.1 Review - Linear regression
 * Model:
   * $f(X) = \beta_0 + \sum_{j = 1}^p X_j \beta_j$
   * Typically we have a set of training data $(x_1, y_1), ..., (x_N, y_N)$ from which to estimate the parameters $\beta$. Each $x_i = x_{i1}, x_{i2}, ... x_{ip})'$ is a vector of feature measurements from the ith case.
 * Estimation:
   * The most popular estimation method is least squares,:
     * $RSS(\beta) = \sum_{i=1}^N (y_i - \beta_0 - \sum_{j=1}^p x_{ij} \beta_j)^2 = (y - X \beta)' (y - X \boldsymbol{\beta})$
     * where $X$ is the $N \times (p + 1)$ matrix, $\boldsymbol{\beta} = (\beta_0, ..., \beta_p)'$, and $y$ is the N-vector of outputs in the training set.
   * Then:
     * $\hat \beta = (X'X)^{-1} X' y$
     * $\hat y = X \hat \beta = X(X'X)^{-1}X'y = Hy$
   * It might happen that the columns of $X$ are not linearly independent, so that $X$ is not of full rank. Then $X'X$ is singular and the least squares coefficients $\hat \beta$ are not uniquely defined.
 * Inference:
   * Under $y_i = E(y_i \vert x_{i1}, ..., x_{ip}) + \epsilon_i = \beta_0 + \sum_{j=1}^p x_{ij} \beta_j + \epsilon_i$, where $\epsilon_i i.i.d ~ N(0, \sigma^2)$, we can show that:
     * $\hat \beta ~ N(\beta, (X' X)^{-1} \sigma^2)$,
     * $(N - p - 1) \hat \sigma^2 ~ \sigma^2 \chi_{N-p-1}^2$,
     * and $\hat \beta_j$ and $\hat \sigma^2$ are statistically independent.
   * To test $H_0:\beta_j = 0(j = 0, ..., p)$,:
     * use $z_j = \frac{\hat \beta_j}{\hat \sigma \sqrt{v_{j+1}}}$, where $v_j$ is the j th diagonal element of $(X'X)^{-1}$. Under $H_0, z_j ~ t_{N - p - 1}$.
   * $(1 - \alpha) \times 100$ % CI of $\beta_j$:
     * $\hat \beta_j \pm t_{\alpha / 2, N - P - 1} se(\hat \beta_j)$
   * To test $H_0:\beta_{p_0 + 1} = ... = \beta_{p_1} = 0$:
     * use $F = \frac{(RSS_0 - RSS_1)/(p_1 - p_0)}{RSS_1 / (N - p_1 - 1)}$, where $RSS_1$ is the residual sum of squares for the bigger model with $p_1 + 1$ parameters and $RSS_0$ is the same for the smaller model with $p_0 + 1$ parameters. Under $H_0, F~F_{p_1 - p_0, N - p_1 - 1}$.
   * $R^2$ and $adj R^2$
* The Gauss-Markov Theorem : The least squares estimates of the parameters $\beta$ have the smallest variance among all linear unbiased estimates.:
  * $MSE(\tilde \theta) = E(\tilde \theta - \theta)^2 = Var(\tilde \theta) + [E(\tilde \theta) - \theta]^2$.
  * Note that, there may well exist a biased estimator with smaller mean squared error. Such an estimator would trade a little bias for a larger reduction in variance. Any method that shrinks or sets to zero some of the least squares coefficients may result in a biased estimate (variable selection and ridge regression).
* Some important questions.:
  1. Is at least one of the predictors $X_1, X_2, ..., X_p$ useful in predicting the response?
  2. Do all the predictors help to explain $Y$, or is only a subset o the predictors useful?
  3. How well does the model fit the data?
  4. How accurate is our prediction?
* Potential Problems:
  1. Non-linearity of the response-predictor relationships.
  2. Correlction of error terms.
  3. Non-constant variance of error terms.
  4. Outliers.
  5. Collinearity.

### 2.2 Comparision of Linear regression with KNN
 * KNN regression:
   * $\hat f (x_0) = \frac{1}{K} \sum_{x_i \in N_0} y_i$
   * where $N_0$ is the K training observations that are closest to $x_0$. In general, the optimal value for K will depend on the bias-variance tradeoff.
 * The parametric approach will outperform the nonparametric approach if the parametric form that has been selected is close to the true form of f
 * KNN perform much better than linear regression for non-linear situations.
 * Curse of dimensionality in KNN:
   * The increase in dimension has only caused a small deterioration in the linear regression test set MSE, but it has caused more than a tend-fold increase in the MSE for KNN. This decrease in performance as the dimension increases in a common problem for KNN, and results from the fact that in higher dimensions there is effectively a reduction in sample size.

## [ko]
### 선형 회귀
 * 모델:
   * $f(X) = \beta_0 + \sum_{j = 1}^p X_j \beta_j$
   * 우리가 가지고 있는 학습용 데이터가 $(x_1, y_1), ..., (x_N, y_N)$의 형태일때, 이를 활용해서 $\beta$를 추정한다. 이때, $x_i$를 i번째의 특성 평가 벡터라고 한다.

 * 추정:
   * 가장 널리 알려진 추정 방법은 최소제곱법인데,:
     * $RSS(\beta) = \sum_{i=1}^N (y_i - \beta_0 - \sum_{j=1}^p x_{ij} \beta_j)^2 = (y - X \beta)' (y - X \boldsymbol{\beta})$
     * 이때, $X$ 는 각각 학습 데이터인 $N \times (p + 1)$ 행렬, $\boldsymbol{\beta} = (\beta_0, ..., \beta_p)'$, $y$는 크기가 N인 벡터이다.


---
# 3. Resampling Method
## 3.1 Cross-Validation
 * Given a data set, the use of a particular statistical learning method is warranted if it results in a low test error. The test error can be easily calculated if a designated test set is available. Unfortunately, this is usually not the case. In the absence of a very large designated test set that can be used to directly estimate the test error rate, a number of techniques can be used to estimate this quantity using the available training data. In this section, we consider a class of methos that estimate the test error rate by holding out a subset of the training observations from the fitting process, and then applying the statistical learning method to those held out observations.

### 3.1.1 The Validation Set approach
 * Here we randomly divide the available the avialbe set of samples into two parts: a training set and a validation or hold-out set.
 * The model is fit on the training set, and the fitted model is used to predict the responses for the observations in the validation set.
 * The resulting validation-set error provides an estimate of the test error. This is typically assessed using MSE in the case of a quantitative response and misclassification rate in the case of a qualitative (discrete) response.
 * Drawbacks:
   * the validation estimate of the test error can be highly variable, depending on precisely which observations are included in the training set and which observations are included in the validation set.
   * In the validation approach, only a subset of the observations are used to fit the model.

### 3.1.2 K-fold Cross-validation
 * Idea is to randomyl divide the data into K equal-size parts. We leave out part k, fit the model to the other K-1 parts (combined), and the nobtain predictions for the left-out k-th part. This is done in turn for each part k = 1, 2, ..., K, and then the results are combined.
 * Let the K parts be $C_1, ..., C_K$, where $C_k$ denotes the indices of the observations in part k. There are $n_k$ observations in part k. Compute:
   * $CV_{(K)} = \sum_{k=1}^K \frac{n_k}{n} MSE_k$
   * where $MSE_k = \sum_{i \in C_k} (y_i - \hat y_i^{(k)})^2/n_k$, and $\hat y_i^(k)$ is the fit for observation i, obtained from the data with part k removed.

 * When K=n, it is leav-one out CV : less bias, but expensive (time consuming) to implement. With least squares linear or polynomial regression, an amazing shortcut makes the cost of LOOCV the same as that of a single model fit. That is,:
   * $CV_{(n)} = \frac{1}{n} \sum_{i=1}^n (y_i - \hat y_i^{(i)})^2 = \frac{1}{n} \sum_{i=1}^n (\frac{y_i - \hat y_i}{1 - h_{ii}})^2$
   * where $\hat y_i$ is the ith fitted value from the OLS fit, and $h_i$ is the leverage value.
 * K = 5 or 10 provides a good compromise for this bias-variance tradeoff.

## 3.2 The Bootstrap
 * The bootstrap is a general tool for assessing statistical accuracy.
 * Suppose that we wish to invest a fixed sum of money in two financial assets that yield returns of X and Y, respectively, where X and Y are random quantities. We wish to choose $\alpha$ to minimize the total risk, or variance, of our investment. In other words, we want to minimize $Var(\alpha X + (1 - \alpha)Y)$.
 * Then the minimum solution is:
   * $\alpha = \frac{\sigma_Y^2 - \sigma_{XY}}{\sigma_X^2 + \sigma_Y^2 - 2\sigma_{XY}}$
 * To quantify the accuracy of our estimate of this value, we repeated the process of simulating 100 paired observations of X and Y, and estimating $\alpha$ 1000 times, $\hat \alpha_r, r=1,...,10000$. Then:
   * $\bar \alpha = \frac{1}{1000} \sum_{r=1}^1000 \hat \alpha_r$
   * and the standard derivation of the estimates is:
     * $\sqrt{\frac{1}{1000 - 1} \sum_{r=1}^1000 (\hat \alpha_r - \bar \alpha)^2}$
 * The procedure outlined above cannot be applied, because for real data we cannot generate new samples from the original population. Rather than repeatedly obtaining independent data sets from the population, we instead obtain distinct data sets by repeatedly sampling observations from the original data set with replacemenet, called as "bootstrap data sets".
 * The bootstrap method to estimate test MSE:
   * $\frac{1}{B} \frac{1}{n} \sum_{b=1}^B \sum_{i=1}^n (y_i - \hat y_i^b)^2$
   * where $\hat y_i^b = \hat f ^b (x_i)$ is the fitted value at $x_i$ from the b th bootstrap dataset.
 * Bute each bootstrap sample has significant overlap with the original data. Consider one bootstrap sample in the above formula,:
   * $\frac{1}{n} \sum_{i=1}^n (y_i - \hat y_i^b)^2$
 * There are some data points $y_i$ that is also in b th bootstrap dataset and used for training. About two-thirds of the original data points appear in each bootstrap sample.:
   * $P(\text{obs. } i \in \text{bootstrap sample b}) = 1 - (1 - \frac{1}{n})^n \\\\ \approx 1 - e^{-1} \\\\ = 0.632$
 * This will cause the bootstrap to seriously underestimate the true test error. (In corss-validation, each of the K validation folds is distinct from the other K-1 folds used for training.) There are some modified bootstrap estimators, such as "leav-one-out bootstrap estimator" or ".632 estimator".


# 4. Linear Model Selection and Regularization
 * Why consider alternatives to least squares?:
   * Prediction Accuracy: especially when p > n, the OLS $\hat \beta$ is not unique, and the variance is infinite so the OLS method cannot be used at all.
   * Model Interpretability: By removing irrelevant features - that is, by setting the corresponding coefficient estimates to zeero - we can obtain a model that is more easily interpreted.

## 4.1 Subset Selection
### Best Subset Selection
 1. Let $M_0$ denote the null model, which contains no predictors. This model simply predicts the sample mean for each observation.
 2. For $k = 1, ..., p$:
   1. Fit all $\binom{p}{k}$ models that contain exactly k predictors.
   2. Pick the best among these $\binom{p}{k}$ models, and call it $M_k$. Here best is defined as having the smallest RSS, or equivalently largest $R^2$.
 3. Select a single best model from among $M_0, ..., M_p$ using cross-validated prediction error, $C_p$ (AIC), BIC, or adjusted $R^2$.

### Forward Stepwise Selection
 1. Let $M_0$ denote the null model, which contains no predictors.
 2. For $k = 0, ..., p-1$:
   1. Consider all $p-k$ models that augment the predictors in $M_k$ with one additional predictor.
   2. Choose the best among these $p - k$ models, and call it $M_{k+1}$. Here best is defined as having smallest RSS or highest $R^2$.
 3. Select a single best model from among $M_0, ..., M_p$ using cross-validated prediction error, $C_p$ (AIC), BIC, or adjusted $R^2$.

### Backward Stepwise Selection
 1. Let $M_p$ denote the full model, which contains all p predictors.
 2. For $k=p, p-1, ..., 1$:
   1. Consider all k models the contains all but one of the predictors in $M_k$, for a total of k - 1 predictors.
   2. Choose the best among htese k models, and call it $M_{k-1}$. Here best is defined as having smallest RSS or highest $R^2$.
 3. Select a single best model from among $M_0, ..., M_p$ using cross-validated prediction error, $C_p (AIC), BIC, or adjusted R^2$.

---
 * The model containing all of the predictors will always have the smallest RSS ( RSS = \sum_{i=1}^N (y_i - \hat y_i)^2 = n \times MSE_{training}$) and the largest $R^2$, since these quantities are related to the training data.
 * We wish to choose a model with low test error, not a model with low training error.
 * Below measures consider the gap between the RSS (training MSE) and the test MSE, and use the value as a penalty term.:
   * Mallow's $C_p$:
     * $C_p = \frac{1}{n} (RSS + 2 p \hat \sigma ^2)$,
     * where p is the total number of parameters.
   * AIC:
     * $AIC = - 2 log L + 2p$
     * where L is the maximized value of the likelihood function for the estimated model.
   * BIC:
     * $BIC = \frac{1}{n}(RSS + log(n) p \hat \sigma^2)$
   * Adjusted $R^2$:
     * $AdjR^2 = 1 - \frac{RSS/(n - p - 1)}{TSS / (n-1)}$
     * where TSS is the total sum of squares.
   * Validation and Cross-Validation: We compute the validation set error or the cross-validation error for each model $M_k$ under consideration, and then select the k for which the resulting estimated test error is samllest.

## 4.2 Shrinkage
### 4.2.1 Ridge regression
 * Recall:
   * $RSS = \sum_{i=1}^n (y_i - \beta_0 - \sum_{j-1}^p \beta_j x_{ij})^2$
 * Ridge regression coefficients are the minimization solution of:
   * $\sum_{i=1}^n (y_i - \beta_0 - \sum_{j=1}^p \beta_j x_{ij})^2$ subject to $\sum_{j=1}^p \beta_j^2 < t$,
   * $\sum_{i=1}^n(y_i - \beta_0 - \sum_{j=1}^p \beta_j x_{ij})^2 + \lambda \sum_{j=1}^p \beta_j^2$
   * where $t \ge 0$ and $\lambda \ge 0$ is a tuning parameter.
 * The second term, called a shrinkage penalty, is small when $\beta_j$'s are close to zero, and so it has the effect of shrinking the estimates of $\beta_j$ towards zero. The tuning parameter $\lambda$ serves to control the relative impact of two terms on the regression coefficient estimates.:
   * $\hat \beta_{\lambda}^r = (X'X + \lambda I)^{-1} X'Y \\\\ = (X'X + \lambda I)^{-1} X'X \hat \beta^{OLS}$
   * For special case of $X'X = I, \hat \beta_{\lambda}^r = \frac{1}{1 + \lambda} \hat \beta ^{OLS}$
 * The ridge regression coefficient estimates can change substantially when multiplying a given predictor by a constant, due to the sum of squared coefficients term in the penalty part of the ridge regression objective funciton. Therefore, it is best to apply ridge regression after standardizing the predictors.

 * Bias-Variance tradeoff:
   * $\sum_{i=1}^p var(\hat \beta_{i, \lambda}^r) = \sigma^2 \sum_{i=1}^{P} \frac{d_i^2}{(d_i^2 + \lambda)^2}$
   * $E(\hat \beta_{\lambda}^r - \beta) = V[(D^2 + \lambda I)^{-1} D^2 - I] \alpha$
   * where $\beta = V \alpha$. Then the $bias^2$ is:
     * $E(\hat \beta_{\lambda}^r - \beta)'E(\hat \beta_{\lambda}^r - \beta) = \lambda^2 \sum_{i=1}^p \frac{\alpha_i^2}{(d_i^2 + \lambda)^2}$

 * Remark:
   * $\lambda = 0 \rightarrow = 0$
   * The variance decreases monotonically as $\lambda$ increase, whereas the $bias^2$ increase.
 * Estimation of $\lambda$ - Standard way is to use cross-validation:
   1. Partition the training data n into K separate sets of equal size, $C_1, ..., C_K$
   2. For each k, fit the model $\hat \beta_{\lambda}^{r(k)}$, which is the fitted value for the observations in $C_k$.
   3. The overall CV error is:
     * $CV_{(K)}^{\lambda} = \sum_{k=1}^K \frac{n_k}{n} MSE_k$
     * where $MSE_k^{\lambda} = \sum_{i \in C_k} (y_i - \hat y_{i, \lambda}^(k))^2 / n_k$
   4. Select $\lambda^*$ as the one with minimum $CV_{(K)}^{\lambda}$
   5. Then fit the firdge regression with $\lambda^*$ to entire training set and estimate ridge regression coefficients.
   6. If you have a separate test set, compute test error.

### 4.2.2 The Lasso regression
 * The lasso (Least Absolute Selection and Shrinkage Operator) coefficients, $\hat \beta_{\lambda}^L$, minimize the quantity,:
   * $\sum_{i=1}^n(y_i - \beta_0 - \sum_{j=1}^p \beta_j x_{ij})^2$ subject to $\sum_{j=1}^p \vert \beta_j \vert < t$,
   * which can be written as:
     * $\sum_{i=1}^n (y_i - \beta_0 - \sum_{j=1}^p \beta_j x_{ij})^2 + \lambda \sum_{j=1}^p \vert \beta_j \vert$
 * The $l_1$ penalty has the effect of forcing some of the coefficient estimates to be exactly equal to zero when the tuning parameter $\lambda$ is sufficiently large - variance selection, sparse model.

 * Unlike ridge regression, $\hat \beta_{\lambda}^L$ has no closed form.
 * However, we can derive a closed form when $X'X=I$
   $ L(\beta) & = \sum_{i=1}^n (y_i - \beta_0 - \sum_{j=1}^p \beta_j x_{ij})^2 + \lambda \sum_{j=1}^p \vert \beta_j \vert \\ & = \sum_{j=1}^p (\beta_j - \hat \beta_j^{OLS})^2 - \sum_{j=1}^p (\hat \beta_j^{OLS})^2 + \sum_{i=1}^n y_i^2 + \lambda \sum_{j=1}^p \vert \beta_j \vert \\ & = \sum_{j=1}^p (\beta_j)^2 - 2 \sum_{j=1}^p \hat \beta_j^{OLS} \beta_j + \sum_{i=1}^n y_i ^2 + \labmda \sum_{j=1}^p\vert \beta_j \vert$
 * Note that if $\hat \beta_j^{OLS} > 0$, then $\beta_j \ge 0$, and if $\hat \beta_j^{OLS} <0$, then $\beta_j \le 0$.
 * Then, when $\hat \beta_j^{OLS} > 0, L(\beta) = \sum_{j=1}^p (\beta_j)^2 - 2 \sum_{j=1}^p \hat \beta_j^{OLS} \beta_j + \sum_{i=1}^n y_i^2 + \lambda \sum_{j=1}^p \beta_j,$
   $ \frac{\partial L}{\partial \beta_k} = 2 \beta_k - 2 \hat \beta_k^{OLS} + \lambda = 0$
   $ \hat \beta_k^L = (\hat \beta_k^{OLS} - \lambda)^+$.
 * When, $\hat \beta_j^{OLS} < 0, L(\beta) = \sum_{j=1}^p (\beta_j)^2 - 2 \sum_{j=1}^p \hat \beta_j^{OLS}\beta_j + \sum_{i=1}^n y_i^2 - \lambda \sum_{j=1}^p \beta_j$,
   $ \frac{\partial L}{\partial \beta_k} = 2 \beta_k - 2 \hat \beta_k^{OLS} - \lambda = 0$
   $ \hat \beta_k^l = (\hat \beta_k^{OLS} + \lambda)^- = - (- \hat \beta_k^{OLS} - \lambda)^+ = sgn(\hat \beta_k^{OLS})(\vert \hat \beta_k^{OLS} \vert - \labmda)^+$
 * i.e. for both cases, $\hat \beta_k^L = sgn(\hat \beta_k^{OLS})(\vert \hat \beta_k ^{OLS} \vert - \lambda)^+$.
 * `lars` package in R impelments the Lasso.
 * We need to standardizing $X$.
 * Although we can't write down explicit formulas for the bias and variance of the lasso estimate, we know the general trend.:
   * The biase increased as $\lambda$ increase.
   * The variance decreased as $\lambda$ increase.
 * When not only continuous but also categorical predictors (factors) are present, the lasso solution is not satisfactory as it only selects individual dummy variables instead of whole factors -> group lasso.

# 5 Moving Beyond Linearity
 * The linearity assumption is almost always an approximation, and sometimes a pooer one. In this chapter we relax the linearity assumption while still attempting to maintian as much interpreability as possible.

## 5.1 Polynomial Regression
 $ y_i = \beta_0 + \beta_1 x_i + \beta_2 x_i^2 + ... + \beta_d x_i^d + \epsilon_i$.
 * A polynomial regression allows us to produce an extremely non-linear curve. The regression coefficients can be easily estimated using least squares linear regression useing $x_i, x_i^2, ...$ as $X$ variables.

## 5.2 Step functions
 * Here we break the range of $X$ into bias, and fit a different constant in each bin.
 * In greater detail, we create cutpoints $c_1, c_2, ... c_K$ in the range of $X$, and then construct $K$ new variables
   $C_1(X) = I(c_1 \le X < c_2). \\ C_2(X) = I(c_2 \le X < c_3), \\ \vdots \\ C_{K-1}(X) = I(C_{K-1} \le X < c_K), \\ C_K(X) = I(c_K \le X)$
 * Then fit a linear model
   $y_i = \beta_0 + \beta_1 C_1(x_i) + \beta_2 C_2(x_i) + ... + \beta_K C_K(x_i) + \epsilon_i$

## 5.3 Regression Splines
 * Piecewise Polynomials:
   * Instead of fitting a high-dgree polynomial over the entire range of $X$, piecewise polynomial regression involves fittign separate low-degree polynomials over different regions of $X$.
   * For example:
     * $y_i = \begin{cases} \beta_{01} + \beta_{11} + \beta_{21} x_i^2 + \beta{31} x_i^3 + \epsilon_i, & \text{ if } x_i < c \\ \beta_{02} + \beta_{12} x_i + \beta_{22} x_i^2 + \beta_{32} x_i^3 + \epsilon_i, & \text{ if } x_i \ge c\end{cases}$
   * The points where the coefficients change are called knots.
 * Regression Splines:
   * A function $g(x)$ is a spline of degree $d$ on $[ a, b]$ if:
     * $g(x) = \begin{cases} S_0(x), t_0 \le x \le t_1, \\ S_1(x), t_1 \le x \le t_2 \\ \vdots \\ S_{n-1}(x), t_{K-1} \le x \le t_K\end{cases}$
     * where $S_i(x)$ is a degree-d polynomial, $g(x)$ is continuity in derivateives up to degree $d-1$, and $a = t_0 < ... < t_K = b$ are knots.
 * The Spline Basis Representation:
   * In order to fit a cubic spline to a data set with $K$ knots, we perform least squares regression with an intercept and $3 + K$ predictors, of the form $X, X^2, X^2, h(X, \ksi_1), ..., h(X, \ksi_K)$, where $\ksi_is$ are the knots, and $h(x, \ksi) = (x - \ksi)^3_+$ (total of $K + 4$ regression coefficients).
   * i.e. truncated basis functions can represent the spline regression model.
   * Unfortunately, splines can have high variance at the outer range of the predictors.
   * A natural spline is a regression spline with additional boundary constraints: the function is required to be linear at the boundary. This additional constraint means that natural splines generally produce more stable estiamtes at the boundaries.
 * Choosing the Number and Locations of the Knots:
   * One option is to place more knots in places where we feel the function might very most rapidly, and to place fewer knots where it seems more stable. Perform CV for choosing the number of the knots.

## 5.4 Smoothing Splines
 * Note that $RSS = \sum_i (y_i - g(x_i))^2$ is zero by choosing $g$ such that it interpolates all of the $y_i$. What we really want is a function $g$ that makes RSS small, but that is also smooth.
 * $\sum_{i=1}^n (y_i - g(x_i))^2 + \lambda \int g''(t)^2 dt$,
 * where $\labmda \ge 0$ is a tuning parameter. The function $g$ that minimizes is known as a smoothing spline.:
   * The second derivate of a function is a measure of its roughness: it is large in absolute value if $g(t)$ is very wiggly near $t$, and it is close to zero otherwise.
   * The larger the value of $\labmda$, the smoother $g$ will be. $\lambda$ controls the bais-variance trade-off of the smoothing spline.
   * The minimization solution: It is a natural cubic spline with knots at $x_1, ..., x_n$.
   * We may write the estimation as:
     * $\hat g_{\lambda} = S_{\lambda} y$,
     * for a particular choice of $\labmda$, and the effective degrees of freedom is defined as
     * $df_{\lambda} = \sum_{i=1}^n \{ S\}_{ii}$
   * $\lambda$ is chosen by LOOCV (or GCV).:
     * $\underset{\lambda}{argmin} RSS_{cv}(\lambda) = \frac{1}{2} \sum_i (y_i - \hat g_{\lambda}^{(-i)} (x_i))^2 = \frac{1}{n} \sum_i [\frac{y_i - \hat g_\lambda(x_i)}{1 - \{ S_{\lambda}_{ii}\}}]^2$
     * $GCV(\lambda) = \frac{1}{n} \sum_{i} [\frac{y_i - \hat g_{\lambda} (x_i)}{1 - \frac{1}{n} tr(S_\lambda)}]^2$ : GCV is an approximation of the LOOCV.

## 5.5 Local regression
### Alogirhtm
 1. Gather the fraction $s= k/n$ of training points whose $x_i$ are closest to $x_0$.
 2. Assign a weight $K_{i0} = K(x_i, x_0)$ to each point in this neighborhood, so that the point furthest from $x_0$ has weight zero, and the closest has the highest weight. All but theses $k$ nearest neighbors get weight zero.
 3. Fit a weighted least squares regression of the $y_i$ on the $x_i$ using the aformentioned weightes, by finding $\hat \beta_0$ and $\hat \beta_1$ that minimize:
   * $\sum_{i=1}^n K_{i0}(y_i - \beta_0 - \beta_1 x_i)^2$.
 4. The fitted value at $x_0$ is given by $\hat f(x_0) = \hat \beta_0 + \hat \beta_1 x_0$

### 5.5.1
 * How to define the weighting function $K$?
 * Fit linear, quadratic model for Step 3 above?:
   * Local regression is based on the ideas that any function can be well approximated in a small neighborhood by a low-order polynomial and that simple models can be fit to data easily. High-degree polynomials would tend to overfit the data.
 * Choose $s$, span (Similar to $\lambda$ is smoothing spline - control the flexibility of the fit (wiggly vs smooth))).
 * Advantage - does not require the specification of a function to fit a model to all of the data in the sample.
 * Disadvantage - local regression requires fairly large, densely sampled data sets in order to produce good models.

## 5.6 Generalized Additive Models
 * Generalized additive models (GAMs) provide a general framework for extending a standard linear model by allowign non-linear functions of each of the variables, while maintaining additivity.
   $g(E(y)) = \beta_0 + f_1(x_1) + f_2(x_2) + ... + f_p(x_p)$,
   where $g(\dot)$ is link function. Compare the above model with $y = \beta_0 + f(x_1, ..., x_p) + \epsilon$. GAM avoid `the curese of dimensionality` by additivity property.
   * The functions $f_i$ may be functions with a specified parametric form (for example a polynomial, or spline regression) or may be specified non-parametrically, simply as 'smooth functions', to be estimated.
   * For example, a locally weighted mean, for $f_1(x_1)$, and then use a spline model for $f_2(x_2).$
   * We assume that $f_i$'s are smooth function and $E(f_i(x_i)) = 0$.
   * Note that GAM can be applied to exponential family distribution (ex. binomial, poisson, etc) using link function.

### 5.6.1 Backfitting Algorithm
 * A popular method to estimate GAM.
 * Algorithm:
   1. Initialize: $\hat \alpha = \frac{1}{n} \sum_{i=1}^n y_i, \hat f_j = 0 \text{ for all } j$
   2. Cycle over j until the functions $\hat f_j$ changes less than a pre-specified threshold.:
     1. Compute partial residuals $\tilde y_i = y_i - \hat \alpha - \sum_{k \not = j} f_k(x_{ik})$ for all i
     2. Apply the 1-dimensional smoother to $\{ x_{ij}, \tilde y_i \}_{i=1}^n$ to obtain $\hat f_j$.
     3. Set $\hat f_j$ equal to $\hat f_j - \frac{1}{n} \sum_{i=1}^n \hat f_j(x_{ij})$

# 6. Support Vector Machines
 * Support vector machines (SVMs) proposed by Vapnik (1996, 1998), are supervised learning models with associated learning algorithms that analyze data used for classification.

## 6.1 Separating Hyperplane
 * Our first objective wil lbe to contruct functions that optimally separate two classes of training data.
 * Suppose that we have $n$ observed training data $x_1, ..., x_n$, which each $x_i = (x_1, ..., x_p)^T$. Here, let us assume that we already know the membership of the training data in the two classes $G_1$ and $G_2$. Our objective is to find a hyperplane.
 * $ \omega_1 x_1 + ... + \omega_p x_p + b = \omega^T x + b = 0$,
 * which seperates two classes.
 * $G_1$: the data set such that $\omega^T x_i + b > 0$,
 * $G_2$ : the data set such tat $\omega^T x_i + b < 0$.
 * Let's introduce the class label $y$. Then we can represent the n training data as follows:
   $(x_1, y_1), ...,(x_n, y_n); y_1 = \begin{cases} 1 & \text{ if } x_i \in G_1 \\ -1 & \text{ if } x_i \in G_2 \end{cases}$
 * Then the following inequality holds for all of those data:
   * $y_i(\omega ^T x_i + b) > 0 & i=1, ..., n$
 * The question we must now consider is how to find the optimum separation hyperplane for linearly separable training data. i.e. what criterion to use as a basis for estimation of the coefficient vector $\omega$ (weight vector) and the intercept $b$ -> We will use the distance between the data and the hyperplane and maximize it. (Review - The distance from $x_0 = (x_1, ..., x_p)^T$ to the hyperplane $\omega^T + b = 0$ is $d=\frac{\omega^T x_0 + b}{\vert \vert \omega \vert \vert}$).
 * If the data are linearly separable, then a hyperplane (H) exits that separates the two classes, together with two equidistant parallel hyperplanes(H+ and H-) on opposite sides, and any number of such hyperplans can be constructed.
 * The distance from $x_+$ on hyperplane $H_+$ and $x_-$ on hyperplane $H_-$ to hyperplane $H$ defined the margin,
   * $d = \frac{\omega^T x_+ + b}{\vert \vert \omega \vert \vert} = \frac{-(\omega^T x_- + b)}{\vert \vert \omega \vert \vert}$
 * Then find the separating hyperplane that maximizes this margin.
   $\underset{\omega, b}{max} d subject to \frac{y_i(\omega^T x_i + b)}{\vert \vert \omega \vert \vert} \ge d, & i=1,...,n$

## 6.2 Quadratic Programming and Dual Problem
 * $\frac{y_i(\omega^T x_i + b)}{\vert \vert w \vert \vert} \ge d$
 * $y_i(\frac{1}{d \vert \vert \omega \vert \vert} \omega^Tx_i + \frac{1}{d \vert \vert \omega \vert \vert} b) \ge 1$,
 * and taking $r = \frac{1}{d\vert \vert \omega \vert \vert}$, and set $r \omega = \omega^*$ and $rb = b^*$.
   * $y_i(\omega^{* T} x_i + b^*) \ge 1$,
   * where $\omega^* = \frac{1}{d \vert \vert \omega \vert \vert} \omega$ and $b^* = \frac{1}{d \vert \vert \omega \vert \vert} b$.
 * The euqality holds for the data on hyper planes $H_+$ and $H_-$. Then, the margin is defined as
   * $ d^* = \frac{y_i (\omega^{* T} x_i + b^*)}{\vert \vert \omega^* \vert \vert} = \frac{1}{\vert \vert \omega^* \vert \vert}$.
 * Based on this contraint, the problem now becomes one of finding $\omega^*$ and $b^*$ that maximize the margin $d^* = \frac{1}{\vert \vert \omega^* \vert \vert}$.
   $\underset{\omega}{min} \frac{1}{2} \vert \vert \omega \vert \vert ^2$ subject to $y_i (\omega ^T x_i + b) \ge 1, & i = 1,...,n$.
 * This problem is known as the quadratic programming, and several mathematical programming procedures have been proposed for this purpose. Let's use the Lagrangian function to transform it to an optimization problem known as the dual problem.
   * $L(\omega, b, \alpha_1, ..., \alpha_n) = \frac{1}{2} \vert \vert \omega \vert \vert ^2 - \sum_{i=1}^n \alpha_i \{y_i (w^T x_i + b) - 1\}$
   * By differentiating the Lagrangian function with respect to the wiehgt vector $\omega$ and the bias $b$ and setting the results to zero, we have
     $\frac{\partial L(\omega, b, \alpha_1, \alpha_2, ..., \alpha_n)}{\partial \omega} = \omega - \sum_{i=1}^n \alpha_i y_i x_i = 0$
     $\frac{\partial L(\omega, b, \alpha_1, \alpha_2, ..., \alpha_n)}{\partial b} = - \sum_{i=1}^n \alpha_i y_i = 0$.
   * Here we used $\partial \partial \partial \omega \vert \vert ^2 / \partial \omega = \partial \omega ^T \omega / \partial \omega = 2 \omega$ and $\partial \omega^T x_i / \partial \omega = x_i$. We thus obtain:
     * $\omega = \sum_{i=1}^n \alpha_i y_i x_i, & \sum_{i=1}^n \alpha_iy_i = 0$.
   * Substituting these equations back into the Lagrangian function in $L(\omega, b, \alpha_1, ..., \alpha_n) = \frac{1}{2} \vert \vert \omega \vert \vert ^2 - \sum_{i=1}^n \alpha_i \{y_i (w^T x_i + b) - 1\}$ gives the Lagrangian dual objective function
     * $L_D(\alpha_1, \alpha_2, ..., \alpha_n) = \sum_{i=1}^n \alpha_i - \frac{1}{2} \sum_{i=1}^n \sum_{j=1}^n \alpha_i \alpha_j y_i y_j x_i^T x_j$.
   * In this way, we transform the quadratic programming problem of $\underset{\omega}{min} \frac{1}{2} \vert \vert \omega \vert \vert ^2$ subject to $y_i (\omega ^T x_i + b) \ge 1, & i = 1,...,n$ which is a primal problem, to the following dual problem.

### Dual problem
 * $\underset{\alpha_1, ..., \alpha_n}{max} L_D(\alpha_1, \alpha_2, ..., \alpha_n) = \underset{\alpha_1, ..., \alpha_n}{max} (\sum_{i=1}^n \alpha_i - \frac{1}{2} \sum_{i=1}^n \sum_{j=1}^n \alpha_i \alpha_j y_i y_j x_i^T x_j)$
 * Then the optimal solution is:
   * $\hat \omega = \sum_{i=1}^n \hat \alpha_i y_i x_i$
   * $\hat b = - \frac{1}{2} (\hat \omega^T x_+ + \hat \omega^T x_-)$.
 * The data that satisfies the equation $y_i(\hat \omega^T x_i + \hat \beta) = 1$ are called as support vectors.
 * From Karush-Kuhn-Tucker conditions, we can prove that the optimum separating hyperlplane as the discriminant function is:
   * $\hat \omega^T x + \hat b = \sum_{i \in S} \hat \alpha_i y_i x_i^T x + \hat b = \begin{cases}\ge 0 \rightarrow G_1 \\ < 0 \rightarrow G_2 \end{cases}$
   * where $S$ is the index set of the support vectors.

## 6.3 Linearly Nonseparable Case
 * The standard SVM classifier works only if you have a well separated categories. It means there exist a line (or hyperplane) such that all points belonging to a single category are either below or above it. In many cases that condition is not satisified, but still the two classes are pretty much separated except some small training data where the two categories overlap. It wouldn't be a huge error if we would draw a line (somewhere in between) and accept some level of error - hagving training data on the wrong side of the marginal hyperplanes. How do we measure the error? slack variables.
 * For, the linearly separable case, we have $y_i(\omega^T x_i + b) \ge 1$ and the equality holds for the data on marginal hyperplane, $H_+$ and $H_-$.
 * For the point is on the wrong side of the marginal hyperplane, $y_i(\omega^T x_i + b) < 1$.
 * Then if we set $\ksi_i := 1 - y_i(w^T x_i + b)$, for the point is on the wrong side of the marginal hyperplane, $\ksi_i >0$, and for the point is on the right side of the marginal hyperplane, set $\ksi_i = 0$.
 * $\ksi_i = \begin{cases} 0, & y_i(\omega^T x_i + b) \ge 1 \\ 1 - y_i(\omega^T x_i + b), & y_i(\omega^T x_i + b) < 1\end{cases}$
 * (Geometrical interpretation) For the wrong side located data point, the distance of the point to its corresponding marginal hyperplane is equal to $\ksi_i$.
 * Therefore, we ant to minimize $\sum \ksi_i$
 * Goal : maximize margin $\frac{1}{\vert \vert \omega \vert \vert}$, minimize slack margin sum $\sum_i \ksi_i$ under $y_i (\omega^T x_i + b) \ge 1 - \ksi_i$ and $\ksi_i \ge 0$ (soft margin SVM).

### Primal problem for the soft margin SVM
 * $\underset{\omega, \ksi}{min} (\frac{1}{2} \vert \vert \omega \vert \vert ^2 + \lambda \sum_{i=1}^n \ksi_i)$, subejct to $y_i(\omega^T x_i + b) \ge 1 - \ksi_i$, $\ksi_i \ge 0$, $i=1,...,n$
 * where $\lambda (> 0)$ controls the trade-off between margin maximization and constraints.
 * Soft-margin SVMs minimize training error traded off against margin. The parameter $\lambda$ is a regularization term, which provides a way to control overfitting:
   * as $\lambda$ becomes large, we are more focus on minimize $\sum \ksi_i$ rather than maximizing margin.
   * when $\lambda$ is small, we are focus on maximizing margin and $\sum \ksi_i$ got less restiction.

# 7. Principal component analysis
 * Unsupervised learning:
   * Unsupervised learning is often much more challenging than supervised learning . The exercise tends to be more subjective, and there is no simple goal for the analysis, such as prediction of a reponse. Unsupervised learning if often performed as part of an exploratory data analysis.
   * Techniques for unsupervised learning are of growing importance in a number of fields and PCA is one of a popular method.
   * Principal component analysis (PCA) (Hotelling, 1993) was introduced as a techinuqe for deriving a reduced set of orthogonal linear projections of a single collection of correlated varibles.

## 7.1 Principal Components Analysis
 * The goal of PCA - A method is required to visualize the $n$ observations when $p$ is large. In particular, we would like to find a low-dimensional representation of the data that captures as much of the information as possible. PCA finds a low-dimensional representation of a data set that contains as much as possible of the variation (dimension reduction).
 * PCA definition:
   * Assume that the random p-vector:
     * $X = (X_1, ..., X_p)^T$
   * has mean $\mu_X$ and covariance $\Sigma_{XX}$. Without loss of generality, assume $X$ has zero mean. PCA seeks to replace the set of $p$ (unordered and correlated) input variables by a (potentially smaller) set of $t$ (ordered and uncorrelated) linear projections, $\ksi_1, ..., \ksi_t (t \le p)$ of the input variables,
     * $\ksi_j = b_j^T X = b_{j1} X_1 + ... + b_{jp}Xp, & j=1,2,...,t$
     * where we minimize the loss of information. Here, $b$ are called as loadings of the PC and we constrain the length of loadings is equal to 1, $\sum_{k=1}^p b_{jk}^2 = 1$
 * In PCA, information is interpreted as the total variation of the original input variables,
   * $\sum_{j=1}^p var(X_j) = tr(\Sigma_{XX})$
 * From the spectral decomposition theorem, we can write
   * $\Sigma_{XX} = U \Lambda U^T, U^T U=I_p$,
   * where the diagnoal matrix $\Lambda$ has diagonal elements the eigenvalues, $\labmda_j$, and the columns of $U$ are the eigenvectors. Thus, tr($\Sigma_{XX}) = tr(\Lambda) = \sum \lambda_j$.
   * The first $t$ linear projections $\ksi_j$ of $X$ are ranked in order to $var(\ksi_j)$.
 * Derivation:
   * The first PC(scores), $\ksi_1$ is obtained by choosing the $b_1$ so that the variance of $\ksi_1$ is a maximum. That is,
     * $\underset{b_1}{argmax} var(b_1^T X)$ subject to $b_1^T b_1 = 1$.
   * Then the optimization problem can be rewritten as:
   * $f(b_1) = b_1^T \Sigma_{XX} b_1 - \lambda_1(b_1^T b_1 -1)$
   * where $\lambda_1$ is a Lagrangian multiplier.
   * $\frac{\partial f(b_1)}{\partial b_1} = 2(\Sigma_{XX} - \lambda_1 I_p) b_1 = 0$
   * If $b_1 \not = 0$, then $\lambda_1$ should satisfy the
   * $\vert \Sigma_{XX} - \lambda_1 I_p \vert = 0$,
   * That is $\lambda_1$ is the largest eigenvalue of $\Sigma_{XX}$, and $b_1$ is the eigenvector $\Sigma_{XX}$.
   * The second PC, $\ksi_2$ is computed from
   * $\underset{b_2}{argmax} var(b_2^T X)$ subject to $b_2^T b_2 = 1, b_1^T b_2 = 0$
   * Note that a second constraint is comes from the uncorrelation between $\ksi_1$ and $\ksi_2$. Then
   * $f(b_2) = b_2^T \Sigma_{XX} b_2 - \lambda_2 (b_2^T b_2 -1) - \mu b_1^T b_2$,
   * where $\lambda_2$ and $\mu$ are the Lagrangian multiplier and the maximum yields from:
     * $\frac{\partial f(b_2)}{\partial b_2} = 2(\Sigma_{XX} - \lambda_2 I_r) b_2 - \mu b_1 =0$.
   * Then we can see that $\lambda_2$ is the second largest eigenvalues of $\Sigma_{XX}$ and the $b_2$ is the corresponding eigenvector.
   * In this sequential manner, we obtain the remaining sets of coefficients for the principal components.

 * Remarks:
   * We have already mentioned that before PCA is performed, the variables should be centered to have mean zero. Furthermore, the results obtained when we perform PCA will also depend on whether the variables have been individually scaled.
   * Each principal component loading vector is unique, up to a sign flip.
   * We are interested in knowing the proportion of variance explained (PVE) by each principal component. i.e. the variance explained by the $m$ th PC is:
     * $\frac{var(\ksi_m)}{\sum_{i=1}^p var(\ksi_i)} = \frac{var(\ksi_m)}{\sum_{i=1}^p var(X_i)} = \frac{\lambda_m}{\sum_{i=1}^p \lambda_i}$

## 7.2 Principal Components Regression
 * The principal components regression (PCR) approach involves constructing the first $q$ principal components and then using these components as the predictors in a linear regression model that is fit using least squares.
 * Procedure:
   1. Let $Y_{n \times 1}$ denote the observed outcomes and $X_{n \times p}$ denotes data matrix of observed covariates.
   2. Assume that $Y$ and each of the $p$ columns of $X$ have already been centered so that all of them have zero emprical means.
   3. Perform PCA on the observed data matrix for the explanatory variables to obtain the principal components, and then (usually) select a subset, based on some appropriate criteria, of the principal components so obtained for further use.
     * Principal components $Z_{n \times q} = XB = [X b_1, ..., Xb_q]$.
   4. Now regress the observed vector of outcomes on the selected principal components as covariates, using ordinary least squares regression (linear regression) to get a vector of estimated regression coefficients (with dimension equal to the number of selected principal components).
     * $\beta_{PCR} = (Z^TZ)^{-1} Z^T Y, & \hat \beta = B \beta_{PCR}$
 * As more principal components are used in the regression model, the bias decreases, but the variance increases.
 * This results in a typical U-shape for the mean squared error.
 * We note that even though PCR prodives a simple way to perform regression using $q < p$ predictors, it is not a feature selection method. It is more similar to the ridge regression.

# 8. Classification
 * Predicting a qualitative response for an observation can be referred to as classifying that observation, since it involves assigning the observation to a category, or class.
   * Given a feature vector $X$ and a qualitative response Y taking values in the set $C$, the classification task is to build a funciton $C(X)$ that takes as input the feature vector $X$ and predicts its value for $Y$
   * Often we are more interested in estimating the probabilities that $X$ belongs to each category in $C$.

## 8.1. Logistic Regression
 * Let $p(X) = Pr(Y = 1 \vert X)$ for binary $Y$.
 * If we use a linear regresion model, the model is:
   * $E(Y \vert X) = p(X) = \beta_0 + \beta_1, X$
 * and we might produce probabilities less than zero or bigger than one.
 * The logistic regression uses the form:
   * $p(X) = \frac{e^{\beta_0 + \beta_1 X}}{1 + e^{\beta_0 + \beta_1 X}}$,
 * which can be rearranged as:
   * $log(\frac{p(X)}{1 - p(X)}) = \beta_0 + \beta_1 X$
 * This monotone transformation is called log odds or logit transformation of $p(X)$.

### Interpretation of $\beta$
 * Probability $p(X) = P(Y = 1 \vert X) = \frac{exp(\beta_0 + \beta_1 X)}{1 + exp(\beta_0 + \beta_1 X)}$
 * Odds $\Delta = \frac{p(X)}{1 - p(X)} = exp(\beta_0 + \beta_1 X)$ : The ratio of the probability that the event will happen to the probability that the event will not happen
 * Log odds $log(\frac{p(X)}{1 - p(X)}) = \beta_0 + \beta_1 X$
 * Odds ratio $OR(X) = \frac{\Delta(X=1)}{\Delta(X=0)} = exp(\beta_1)$
 * Sign of $\beta_1$:
   * $\beta_1 \approx 0 \leftrightarrow \Delta(X=1) \approx \Delta (X = 0)$
   * $\beta_1 > 0 \leftrightarrow \Delta(X=1) > \Delta (X = 0)$
   * $\beta_1 <  0 \leftrightarrow \Delta(X=1) < \Delta (X = 0)$

### Estimation
 * We use maximum likelihood to estimate the parameters.
 * $l(\beta_0, \beta_1) = \prod_{i:y_i=1} p(x_i) \prod_{i:y_i = 0} (1 - p(x_i))$
 * We pick $\beta_0$ and $\beta_1$ to maximize the likelihood of the observed data.
 * (We may use non-linear least square fit, but MLE is preferred.)

### Logistic regression with several variables
 * $log (\frac{p(X)}{1 - p(X)}) = \beta_0 + \beta_1 X_1 + ... + \beta_p X_p$
 * $p(X) = \frac{exp(\beta_0 + \beta_1 X_1 + ... + \beta_p X_p)}{1 + exp(\beta_0 + \beta_1 X_1 + ... + \beta_p X_p)}$

## 8.2 KNN classifier
 * KNN classifier: $Pr(Y = j \vert X =x_0) = \frac{1}{K} \sum_{i \in N_0} I(y_i = j)$, where $N_0$ is the $K$ points in the training data that are closes to $x_)$.

## 8.3 Comparison methods
 * KNN:
   * Advantages : It is automatically non-linear, it can detect linear or non-linear distributed data, it tends to perform very well with a lot of data points.
   * Disadvantages : It needs to be carefully tuned, the choice of $K$ and the metric (dstinace) to be used are critical. KNN is also sensitive to outliers and removing them before using KNN tends to improve results.
 * SVM:
   * Advantages : SVM can be used in linear or non-linear ways with the use of a Kernel. When you have alimited set of points in many dimensions SVM tends to be very good. SVM is good with outliers as it will only use the most relevant points to find a linear separation (SVs).
   * Disadvantages : SVM needs to be tuned, the cost $C$ and the use of a kernel and its parameters.
 * Logostoc regression:
   * Advantages : It tells important predictors; It also give a probability not the label. We may add interaction between the variables.
   * Disadvnatges : It is a linear classifier. Doesn't perform well when the dimension is too large.

# 9. Clustering
 * Clustering consists of partioning a large number of objects characterized by multiple variables into groups (clusters) based on some indicator of mutual similarity between the objects.
 * Difference between classification and clustering:
   * (Classification) known number of groups:
     * The objective is to assign new observations to one of these known groups.
   * (Clustring) Unknown number of groups, unknown group structure:
     * The goal is to find an optimal grouping for which the observations or object within each cluster are similar but the clusters are dissimilar to each other.
 * Clustering depends on how to define "similarity" between objects(items or variables).
 * Data can be written as a $n \times p$ matrix:
   * $Y = (y_1^T, ..., y_n^T)^T$
   * where $y_i \sim R^p$. We gernerally wish to group the n $y_j$ s( rows) into $g$ clusters.
 * Clustering methods:
   * Hierarchical methods: It proceeds in successive stps from smaller to larger clusters, which can be directly observed visually by humans.
   * Nonhierarchical methods: It consists of progressively refining the data partitions to obtain a given number of clusters. (e.g. k-means, self-organizing map, and mixture-model clustering)

## 9.1. Hierarchical Clustering
 * Hierarchical clustering essentially consists of progressively organizing all of the candidate objects into clusters comprising mutually similar objects as determined by some measure of interobject and intercluster similarity.
 * The clusters formed in each step can be graphically displayed in tree diagrams referred to as dendrigrams.
 * Interobject Similarity:
   1. Euclidean distance:
     * $d(x, y) = \sqrt{(x -y)'(x - y)} = \sqrt{\sum_{i=1}^p (x_i - y_i)^2}$
   2. $L_1$ distance:
     * $d(x, y) = \sum_{i=1}^p \vert x_i - y_i \vert$
   3. Minkowski distance:
     * $d(x, y) = (\sum_{i=1}^ p \vert x_i - y_i \vert ^m)^{1/m}$
   4. Mahalanobis distance:
     * $d(x, y) = \sqrt{(x - y)' S^{-1} (x-y)}$
 * Euclidean distance usuqlly serves as the measure of similarity. Note that Minkowski distance reduces to the $L_1$ distance when $m=1$ and to the Euclidean distance whe n$m=2$.
 * Intercluster Distance, linkage methods:
   * Based on the distances found between the data in the dataset, we begin to form a single cluster containing the objects separated by the shortest interobject distance. It is then necessary to determine the distance from that cluster to other objects in the set.
   * Let $C_{\alpha}$ and $C_{\beta}$ be two clusters formed on the basis of distnace between object.
   * Single linkage: minimum distance or nearest neighbor:
     * $d(C_\alpha, C_\beta) = \underset{i,j}{min} \{ d(x_i^\alpha, x_j^\alpha), x_i^\alpha \in C_\alpha, x_j^\beta \in C_\beta \}$
   * Complete linkage: maximum distance or farthest neighbor:
     * $d(C_\alpha, C_\beta) = \underset{i,j}{max} \{ d(x_i^\alpha, x_j^\alpha), x_i^\alpha \in C_\alpha, x_j^\beta \in C_\beta \}$
   * Avergage linkage: average distnace:
     * $d(C_\alpha, C_\beta) = \frac{1}{n_\alpha n_\beta} \sum_{i}^{n_\alpha} \sum_{j}^{n_\beta} \{ d(x_i^\alpha, x_j^\alpha), x_i^\alpha \in C_\alpha, x_j^\beta \in C_\beta \}$
   * Centroid linkage: distance between the cluster centroids:
     * $d(C_\alpha, C_\beta) = d(\bar x_\alpha, \bar x_\beta), \bar x_\alpha = \frac{1}{n_\alpha} \sum_{i}^{n_\alpha} x_i^{\alpha}, \bar x_\beta = \frac{1}{n_\beta} \sum_{i}^{n_\beta} x_i^{\beta}$
 * Dendrogram - The results of both agglomerative and divisive methods may be displayed in the form of a two-dimensional diagram.
### Compare the linkages
 * Single linkage suffers from chaining.
 * Complete linkage avoids chaining, but suffers from crowding. Because its score is based on the worst-case dissimilarity between pairs, a point can be closer to points in other clusters than to points in its own cluster.
 * Average linkage tries to strike a balance. But, results of average linkage clustering can change with a monotone increasing transformation of the dissimilarities.

## 9.2 Nonhierarchical Clustering
 * In nonhierarchical clustering, a predetermined number of clusters are formed.

### 9.2.1 K-means clustering
 * MacQueen (1967) suggests the term K-means for describing an algorithm that assigns each item to the cluster having the nearest centroid (mean).
 * (Procedure) In its simplest version, the process is composed of these three steps:
   1. From among the $n$ objects, take $k$ objects at random as seeds that will form the nuclei of $k=3$ clusters.
   2. Assign each of the remaining objects to the nearest nucleus using an appropriate measure of similarity (usually squared Euclidean distance), thus partitioning the entire set into $k$(three) clusters.
   3. Compute the centroid, $\Delta$, of each of the $k$ clusters formed in step (2), and reassign each of the objects to the nearest resulting centroid, thus forming three new clusters with these computed centroids replacing the original nuclei set with the initial values.
   4. Compute a new centroid for each of the new $k$ clusters and then reassign the objects to these new centroids, thus updating their membership in these $k$ clusters, in the same manner as in step (3). Repeat this step until no further intercluster movement occurs for any of the objects.
 * It is generally recognized that the clusters ultimately formed in k-means clustering may differ with the seed selection in step (1); that is, the clusters are dependent on the initial values.

### 9.2.2 K-medoids - Partitioning Around Medoids (PAM) clustering
 * Both the k-menas and k-medoids algorithms are partitional (breaking the dataset up into groups) and both attempt to minimize the distance between points labeled to be in a cluster and a point designated as the center of that cluster.
 * In contrast to the k-means algorithm, k-medoids chooses datapoints as centers (medoids or exemplars) and works with a generalization of the Manhattan Norm ($l_1$) define distance between datapoints instead of Euclidean ($l_2$) distance.
 * Medoids are more robust to outliers than centroids, but they need more computation for high dimensional data.
 * The most common realisation of k-medoid clustering is the Partitioning Around Medoids (PAM) algorithm.

# 10. Quantile regression
 * What the regression curve does is give a grand summary for the averages of the distributions corresponding to set of x's. We could go further and compute several different regression curves corresponding to the various percentage points of the distributions and thus get a more complete picture of the set.

## 10.1 Motivation
 * Measuring heterogenous effects:
   * The effect of a variable may not be the same for all individuals. Ignored in standard linear regressions, which focus on average effects.
   * But this heterogeneity may be important for public policy.
   * Least squares(LS) : Legendre (1805)
     * $\hat \beta_{LS} = \underset{\beta \in R^p}{argmin} E(Y - X\beta)^2$
     * $X \hat \beta_{LS}$ approximate the conditional mean of $Y$ given $X$.
     * $\Rightarrow$ LS methods provides only partial description of the conditional distribution of $Y$.
 * Robustness to outliers and to heavy tails
   * In a linear model : $Y = X \beta + \epsilon$
   * If $\epsilon$ is symmetric around zero, we can estimate $\beta$ with OLS or median regression but we may prefer to estimate it with median regression if $\epsilon$ has heavy tails.:
     $ \hat \beta_{LAD} = \underset{\beta \in R^p}{argmin} \vert Y - X \beta \vert$
   * Indeed, if $E(\vert \epsilon \vert) = \infty$, OLS are inconsistent, whereas the median is always defined.

## 10.2 Quantile
 * Given a real-valued random variable, $X$ with distribution function $F_X$, we define the $\tau$ th quantile of $X$ as
 * $Q_X(\tau) = F_X^{-1} (\tau) = inf\{x \vert F(X) \ge \tau\}$
 * Viewed from the perspective of densities, the $\tau$ th quantile splits the area under the density into two parts: one with area $\tau$ below the $\tau$ th quantile and the other with area $1 - \tau$ above it.
 * Define the loss function $\rho_\tau (x) = x(\tau - I_{(x < 0)})$, then the quantile can be found by:
   * $Q_X(\tau) = \underset{\alpha}{min} E(\rho_{\tau} (X - \alpha))$
 * A convex loss function $\rho_\tau$ and its derivative function $\psi_\tau$.

## 10.3 Conditional quantile and quantile regression
 * The $\tau$ th conditional quantile function is $Q_{Y \vert X} (\tau)$ is computed as
   * $Q_{Y \vert X}(\tau) = X \beta_\tau$, where $\beta_\tau = \underset{\beta \in R^p}{argmin} E(\rho_\tau(Y - X \beta))$
 * Solving the sample analog gives the estimator of $\beta$.
    $\beta_\tau = \underset{\beta \in R^p}{argmin} \sum_{i=1}^n(\rho_\tau(Y_i - X_i \beta))$
 * $X \hat \beta_\tau$ approximates the $\tau$ the conditional quantile function.

## 10.4 Real data analysis
 * The QR estimator does not have a closed form.
 * The minimization criteria is not everywhere differentiable, so that standard numerical algorithms do not work. - It can be solved using linear programming methods.
 * Beyond simple linear regression, there are several machine learning methods that can be extended to quantile regression. We can apply all neural network and deep learning algorithms to quantile regression. Tree-based learning algorithms are also available for quantile regression(e.g., Quantile Regression Forests, as a simple generalization of Random Forests).

# 11. Tree-based methods
 * Here we descirbe tree-based methods for regression and classification.
 * Since the set of splitting rules used to segment the predictor space can be summarized in a tree, these types of approaches are known as decision-tree methods.
 * Tree-based methods are simple and useful for interpretation.
 * However they typically are not competitive with the best supervised learning approaches in terms of prediction accuracy. -> ensemble methods.

## 11.1 Regression Trees
### How do we build the regression tree
 1. We divide the predictor space - that is, the set of possible values for $X_1, ..., X_p$ - into $J$ distinct and non-overlapping regions, $R_1,...,R_J$.:
   * Find $R_1, ..., R_J$ that minimize the RSS given by:
     * $RSS = \sum_{j=1}^J \sum_{i \in R_j} (y_i - \hat y R_j)^2$,
   * where $\hat y R_j$ is the mean response for the training observations within the $R_j$.
 2. For every observation that falls into the region $R_j$, we make the same prediction, which is simply the mean of the reponse values for the training observations in $R_j$.
 * Computationally infeasible to consider every possible partition of the feature space into $J$ boxes. Thus, we take a top-down, greedy approach called recursive binary splitting.
 1. We first select the predictor $X_j$ and the cutpoint $s$ such that splitting the predictor space into the regions $R_1 = \{ X\vert X_j < s \}$ and $R_2 = \{ X \vert X_j \ge s \}$ leads to the greatest possible reduction in RSS.:
   * $RSS = \sum_{i:x_i \in R_1} (y_i - \hat y_{R_1})^2 + \sum_{i: x_i \in R_2} (y_i - \hat y_{R_2})^2$
 2. Next, we repeat the process, looking for the best predictor and best cutpoint in order to split the data further so as to minimize the RSS within each of the resulting regions. However, this time, instead of splitting the entire predictor space, we split one of the two previously identified regions.

### Pruning a tree
 * The process described above may produce good predictions on the training set, but is likely to overfit the data, leading to poor test set performance.
 * A smaller tree with fewer splits might lead to lower variance and better interpretation at the cost of a little bias.
 * A strategy is to grow a very large tree $T_0$, and then prune it back in order to obtain a subtree. (Cost complexity pruning) For each value of $\alpha$, find a subtree $T$ that:
   * $\sum_{m=1}^{\vert T \vert} \sum_{i \in R_m} (y_i - \hat y_{R_m})^2 + \alpha \vert T \vert$
   * is as small as possible.
   * The tuning parameter $\alpha$ controls a trade-off between the subtree's complexity and its fit to the training data.
   * We select an optimal value $\hat \alpha$ using cross-validation.
   * We then return to the full data set and obtain the subtree corresponding to $\hat \alpha$.

## 11.2 Classification Trees
 * Very similar to a regression tree, except that it is used to predict a qualitative response rather than a quantitative one.
 * Just as in the regression setting, we use recursive binary splitting to grow a classification tree.
 * A natrual alternative to RSS is the classification error rate. Let $\hat p_{mk}$ represents the proportion of training observations in the mth region that are from the kth class.
 * $\hat pm_{mk} = \frac{1}{N_m} \sum_{x_i \in R_m} I(y_i = k)$.
 * Misclassification error : $1 - \underset{k}{max} \hat p_{mk}$
 * Gini index : $G = \sum_{k=1}^K \hat p_{mk} (1 - \hat p_{mk})$, a measure of total variance across the K classes. A small value indicates that a node contains predominantly observations from a single class.
 * Cross-entropy:
   * $ D = - \sum_{k=1}^K \hat p_{mk} log \hat p_{mk}$
   * The entropy will take on a value near zero if the $\hat p_{mk}$'s are all near zero or near one.
 * When building a classification tree, either the Gini index or the entropy are typically used to evaluate the quality of a particular split, since these two approaches are more sentivie to node purity than is the classification error rate.
