---
layout  : wiki
title   : 비모수 통계학
summary :
date    : 2021-04-24 20:44:25 +0900
lastmod : 2021-04-24 21:17:55 +0900
tags    :
draft   : false
parent  : lecture
---

## 1장 서론
### 1.1 비모수적 방법
 * 통계학은 기술통계학(descriptive statistics)과 추측통계학(inferential statistics)로 나뉜다.
 * 통계적 추론(statistical inference) : 표본으로부터 정보를 이용하여 모집단에 대한 추측 또는 의사결정을 하는 과정, 접근방법에 따라 모수적 방법, 비모수적 방법, 베이즈적 방법 등으로 분류
 * 확률적 진술이 필요하기 때문에 데이터가 얻어진 모집단의 분포에 대한 정보가 필요
 * 모집단에 대하여 구체적인 분포함수를 가정하는 것이 무리일때, 모집단 분포에 대한 가정을 약화시켜 오류의 가능성을 줄이고 때로는 효율을 높일 수 있는 대안을 사용해야함. 이를 통칭하여 비모수적(nonparametric) 방법이라고 함.
 * 비모수적 방법에는 순수 비모수적 방법(truly nonparametric)과 분포무관 방법(distribution free) 가 존재하며, 두 방법을 구분하지 않고 비모수적 방법이라고 부른다.
 * 비모수적 방법에서 흔히 사용하는 모집단에 대한 가정으로는 연속성, 대칭성이 있으며,
 * 흔히 사용하는 도구로는 부호(sign), 순위(rank), 순위에 기초한 점수(score) 가 존재한다.
 * 일반적으로 관측값 대신 관측값의 부호와 상대적인 크기를 나타내는 순위만 사용할 경우 정보의 손실이 많으리라 예상되지만, 실제로는 많은 분포에서 그 정보의 손실이 심각하지 않다.

 * 비모수적 방법의 장점:
   * 일반적으로 최소한의 가정하에서 개발된 통계적 방법이므로, 가정이 만족되지 않음으로써 발생하는 오류의 가능성이 적다.
   * 데이터가 순위척도(ordinal scale)로 주어져서, 상대적인 크기로 데이터가 주어진 경우에는 순위에 기초한 비모수적 방법이 유용하게 쓰일수 있다.
   * 통계적 의미를 직관적으로 이해하기 쉽다.
   * 통계량의 계산이 모수적 방법에 비해 단순하다.

 * 비모수적 방법의 단점:
   * 비모수적 추론에 사용되는 통계량의 분포는 일반적으로 복잡하며, 이론 전개에 어려움이 많다. 즉, 비모수적 추정량의 분포와 비모수적 검정 통계량의 대립가설하에서의 분포는 일반적으로 매우 복잡하여 소표본(small sample) 분포를 이용할 수 없으며, 점근분포의 성질에 의존하는 경우가 많다.
   * 특정한 분포를 가정하고 얻은 모수적 젗라에 비하여 그 특정 분포에서는 효율이 떨어지는 경우가 많다.
   * 비모수적 통계량의 계산은 단순하지만, 그 계산이 지루하고 단순 반복 작업을 요구하는 경우가 많다.

 * 준모수적(semi-parametric) 방법 : 모수적 방법과 비모수적 방법의 중간적인 추론방법

### 1.2 기본 개념
 * 추정법:
   * 점추정(point estimation)
   * 구간추정(interval estimation)
 * 검정법:
   * 모집단의 분포의 모양, 모수 등에 대한 가설을 세우고, 모집단에서 추출한 표본에 기초하여가설의 채택이나 기각을 결정하는 통계적 기법을 가설 검정이라고 한다. 가설에는 $$H_0$$로 표시되는 귀무가설과 $$H_1$$으로 표시되는 대립가설이 있다.
 * 신뢰구간:
   * 모집단이 정규분포를 따르고 모분산이 알려져 있는 경우 신뢰구간은 다음과 같다.
   * $$(l,u) = (\bar x - z_{\alpha / 2} \frac{\sigma}{\sqrt{n}}, \bar x + z_{\alpha/2} \frac{sigma{\sqrt{n}}})$$
 * 신뢰구간과 기각역에 대한 약속:
   * 신뢰구간은 열린구간이다
   * 검정통계량의 값이 기각값보다 크거나 같으면 $$H_0$$를 기각한다.
   * 유의확률 (p-value) 가 유의수준 ($$\alpha$$)보다 작거나 같으면 $$H_0$$를 기각한다.
 * 점근 상대효율:
   * 추정법이나 검정법을 비교하는 방법
   * ARE(asymptotic relative efficiency)

### 1.3 부호와 순위
 * 부호(sign) : 관측값이 기준값보다 크면 1, 아니면 0으로 부여한 값
 * 순위(rank) : 관측값이 작은 값에서 큰 값의 순으로 나열하였을 때의 순서를 나타냄. 전체 표본 내에서 자신보다 작은 관측값의 개수에 1을 더한 값. 동점인 경우 평균순위(midrank, average rank)를 사용
 * 부호와 순위를 이용한 검정통계량의 분포는 연속이 아니며, 주어진 유의수준 $$\alpha$$와 같은 크기의 기각역을 구할 수 없다. 이와 같은 경우 유의확률을 계산하여 유의수준과 비요하여 검정결과를 나타내는 것이 일반적이다.
 * 이와같은 문제는 구간추정에서도 발생하며, 미리 설정한 신뢰계수를 만족하는 신뢰구간을 구할 수 없을 때에는 원래의 신뢰계수에 가장 가까운 신뢰계수값을 가지는 신뢰계수를 선택한다.

## 2장 일표본 위치문제
### 2.1 서론
 * 한 모집단에서 위치모수(location parameter)의 추론 문제
 * 데이터 : $$X_1, X_2, ..., X_n: r.s$$
 * 가정:
   * A1. 모형: $$X_i = \theta + e_i, i = 1, 2, \cdots, n, \text{ where $\theta$: (미지의) 위치모수, e: 오차항}$$
   * A2. n개의 오차항 e들은 서로 독립
   * A3. n개의 e들은 동일한 연속분포에 따름
   * A3'. 오차항 e의 중앙값은 0
   * A4. 오차항 e는 0에대하여 대칭인 분포에 따름
   * A5. $$e \sim N(0, \sigma^2)$$
 * 가정 A1, A2, A3(또는 A3') 성립을 가정 -> 부호검정
 * 가정 A1, A2, A3, A4 성립을 가정 -> 윌콕슨 부호순위검정
 * 가정 A1, A2, A3, A4, A5 성립을 가정 -> 모수적 방법

 * 가설 $$H_0:\theta = \theta_0, H_1:\theta > \theta_0$$ 또는 $$H_1: \theta < \theta_0$$ 또는 $$H_1: \theta \not = \theta_0$$

 * 모수적 방법: $$e \sim N(0, \sigma^2)$$ 가정

 * (주의사항) 모집단의 분포가 정규분포가 아닌 경우 구간추정에서 신뢰계수가 $$1-\alpha$$가 되지 않고, 검정에서는 유의수준이 $$\alpha$$가 되지 않는다.

### 2.2 부호검정
 * 부호검정(sign test) : $$H_0$$하에서 위치모수의 값이 $$\theta_0$$ 보다 큰 관측값의 개수만을 이용하여 검정
 * 절차:
   1. 부호검정 통계량:
     * $$B = \sum_{i=1}^n \psi(X_i - \theta_0), \text{ where } \psi(x) = \begin{cases} 1, & \text{ if } x > 0 \\ 0, & \text{ if } x \le 0 \end{cases}$$
     * $$B$$ : $$\theta_0$$ 보다 큰 관측값의 개수
   2. 검정법: