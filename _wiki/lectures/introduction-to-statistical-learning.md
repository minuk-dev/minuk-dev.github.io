---
layout  : wiki
title   : 통계학습개론(Introduction to statistical learnning) 수업 정리
summary : 2021 가을학기 수업 정리
date    : 2021-10-08 04:46:27 +0900
lastmod : 2021-10-08 05:54:31 +0900
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
