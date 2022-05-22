# ---
layout  : wiki
title   : 신호 및 시스템
summary : 2022-1학기 신호 및 시스템 공부
date    : 2022-03-15 14:58:52 +0900
lastmod : 2022-05-23 00:19:29 +0900
tags    : [lecture]
draft   : false
parent  : lectures
---

# Week 1
## 1-1 자연상수와 오일러 등식
### 기본 자료
1. 자연 상수(Euler's number) e의 정의
  $$ e = lim_{n-> \infty} ( 1 + \frac{1}{x})^n = 2.71828...$$
  - 사용 예:
	  1. $$\frac{d}{dx} (e^x) = e^x$$
		  - 지수함수 미분시, 자기 자신
	  2. $$y = log_e x = ln x \rightarrow y' = \frac{1}{x}$$
	  3. $$ \int_{1}^e \frac{1}{x} dx = 1$$

2. 정현파 (sinusoidal wave)
	- 진폭 (amplitude), 주파수 (frequency), 위상 변이(phase shift)
	- $$x(t) = A cos(2 \pi f_0 t + \phi) = A cos(w_0t + \phi)$$
	- 진폭 : 회전하는 원의 반지름 길이
	- 주파수 : 주기의 역수:
		- ex) 0.25 Hz는 4초에 1번 회전
	- 각 (agnular, radian) 주파수 :  $w = 2 \pi f$ (단위 : rad/s)
		- ex) $2\pi$ rad/s 는 1초에 원을 1번 회전
	- 위상 변이 : 원 회전의 시작 위치
		- $$x(t) = A cos(w_0 t + \phi) = A cos(2 \pi f (t + \frac{\phi}{2 \pi f})) = A cos(2 \pi f (t - t_0))$$
			- $t_0$ : time delay
	- 정현파의 표현 방법
		1. 시간 함수 : $Acos(2\pi f t + \phi)$
		2. 회전 벡터: $(X, Y) = (A cos \phi, A sin \phi)$
		3. 복소수 표현 : $(X, Y) = X + iY = A cos \phi + i A sin \phi$
		4. 극좌표계 표현 : $A \angle \phi$
	- 오일러 공식을 이용한다면 $A e^{i \phi}$ 또는  $A \angle \phi$

---
### 복소수 표현
- 직각 좌표형 : $x + iy$ -> 직각 좌표계를 이용
- 극(polar) 좌표형: $r \angle \theta$ -> 원점과의 거리와 가로축과의 각도로 표현

---
### 오일러 등식
- Property 1.
	- $$\begin{aligned}
		f(x_1) \times f(x_2) &= (cos x_1 + i sin x_1)(cos x_2 + i sin x_2) \\
		&= cos x_1 cosx_2 - sinx_1 sinx x_2 + i(sinx_1 cosx_2 + cos x_1 sin x_2) \\
		&= f(x_1 + x_2)
	\end{aligned}$$
- Property 2.
	- $$\{f(x) \}^2 = f(2x)$$
- Property 3.
	- $$\frac{1}{f(x)} = \frac{1}{f(x)} \times \frac{f(-x)}{f(-x)} = \frac{f(-x)}{f(0)} = f(-x)$$
- Property 4.
	- $$f(0) = 1$$
- Property 5.
	- $$f'(x) = if(x)$$

- $$e^{ix} = cos x + i sin x$$

#### 유도과정
- 원점으로부터 거리가 $1$, 실수축과의 각도가 $\theta$ rad인 복소수 : $z = cos \theta + i sin \theta$
- $z$ 를 $\theta$에 대해 미분하면,
	- $$\begin{aligned}
		\frac{dz}{d\theta} &= - sin \theta + i cos\theta \\
		&= i^2 sin \theta + i cos \theta \\
		&= i (cos \theta + i sin \theta)
	\end{aligned}$$

- $$\int \frac{1}{z} dz = \int i d \theta \Rightarrow z = i \theta + C$$
- $\theta= 0$인 경우, $$ln(z) = 0 + C = C$$
- $z = cos \theta + i sin \theta$ 에 $\theta = 0$ 을 대입하면 $z = 1$ 이므로 $C = 1$이다.

### 5. 복소수 사칙 연산
- 직각 좌표형 표현
	- 덧셈/뺄셈 : $z_1 \pm z_2 = (x_1 + i y_1) \pm (x_2 + i y_2) = (x_1 \pm x_2) + i(y_1 \pm y_2)$
	- 곱셈 : $z_1 \times z_2 = (x_1 + i y_1) \times (x_2 + i y_2) = (x_1 x_2 - y_1 y_2) + i (x_1 y_2 + x_2 y_1)$
	- 나눗셈 : $\frac{z_1}{z_2} = \frac{z_1 z_2^*}{\vert z_2 \vert ^2} = \frac{(x_1 x_2 + y_1 y_2) + i(x_2 y_1 - x_1 y_2)}{x_2^2 + y_2^2}$
	- 오일러 공식 이용
		- 곱셈 : $z_1 \times z_2 = r_1 e^{i \theta} r_2 e^{i \theta_2} = (r_1 r_2) e^{i(\theta_1 + \theta_2)}$
		- 나눗셈 : $z_1 / z_2 = \frac{r_1 e^{i \theta_1}}{r_2 e^{i \theta_2}} = \frac{r_1}{r_2} e^{i(\theta_1 - \theta_2)}$
		- complex conjugate : $z_1^* = r_1 e^{- i \theta}$

---
## 1. 미분 방정식 -> (목적 함수의 최적화, 대상 함수의 추정)
- 독립변수, 종속 변수, 미분식 (종속 변수의 도함수) 과 고차항이 포함된 방정식
- order(계수)와 degree(차수)
	- $y' + x y^2 = 4$ : first order ordinary differntial equation (DE)
	- $y'' + 3 x y' + 4y = 1$: second order differntial quation
	- cf. $\frac{\partial ^ u}{\partial x^2} + \frac{\partial ^2 u}{\partial y^2} = 0$ : second order partial DE u(x,y)
	- $3x y' + 5y = 0$ : order 결정하는 미분항의 거듭 제곱수 -> degree = 1
	- $(y'')^2 + 4 y + 4 = 0$ -> degree = 2

- 선형 미분 방정식 : y가 x의 함수일 때, y의 n차(음이 아닌 정수) 미분항들과 그들의 계수가 상수 또는 독립변수의 선형 조합(다항식)
	$$a_0 y + a_1 y' + \cdots + a_n y^{(n)} = g(x)$$
	$$a_n(x) \frac{d^n y}{d x^n} + \cdots + a_0 (x) y = h(x)$$
		- 이때 $h(x) = 0$ 이면, homogenous liunear ordinary DE
-> non-homogenous LODE의 일반해: $y = y_n + y_p = c_1 y + \cdots + c_n y_n + y_p$
	- $y_n$ : homogenous solution
	- $y_p$ : particular solution

## 2. 미분방정식의 해
- 정의:
	-  $F(x, y, y', \cdots, y^{(n)}) = 0$
	- $\phi : I \rightarrow \mathbb{R}$
	- $\phi$는 $F$의 해 $\Leftrightarrow \forall x \in I, F(x, \phi(x), \phi'(x), \cdots, \phi^{(n)}(x))=0$
- 예시 1.
	- $\frac{dy}{dx} + y + 1 = 0$
	- $\phi(x) = -1 + c e^{-x}$ (c : 임의의 상수)
	- $\phi'(x) = -ce^{-x}$ 이므로
		$$\phi'(x) + \phi(x) + 1 = -ce^{-x} + (-1 + ce^{-x}) + 1 = 0$$
		- $\phi(x)$ 는 $\frac{dy}{dx} + y + 1 = 0$의 해
- 예시 2.
	- $x \frac{dy}{dx} - 2 y = 0$
	- $\phi(x) = c x^2$ (c: 임의의 상수)
	- $\phi'(x) = 2cx$ 이므로
		$$ x \phi'(x) - 2 \phi(x) = x(2 c x) - 2cx^2 = 0$$
		- $\phi(x) 는 x\frac{dy}{dx} - 2y = 0$의 해

### 미분방정식 풀이
- one-degree ordinary DE
	1. separable equation : $y' = F(x) G(x)$ 형태 -> $\frac{1}{G(y)}dy = F(x)dx$
		- 예제
			$$\begin{aligned}
			\frac{dy}{dx} &= y^2 e^{-n} \\
			\frac{1}{y^2}dy &= e^{-x} dx \\
			-\frac{1}{y} &= -e^{-x} + k_1 \\
			y &= \frac{1}{e^{-n} + k_2}
			\end{aligned}$$
	2. linear equation : $y' + p(x) y = g(x)$ 형태 -> $e^{\int p(x) dx}$를 양변에 곱하고 적분
		- $e^{\int p(x) dx}$ : integrating factor
		- 예제 1
			$$\begin{aligned}
			y' + y &= x \\
			e^x y ' + e^x y &= e^x x \\
			e^x y &= x e^x - e^x + c \\
			y &= x - 1 + e^{-x}
			\end{aligned}$$
		- 예제 2
			$$\begin{aligned}
			y ' + 2y &= 5 \\
			e^{2x} y' + 2 y e^{2x} &= 5e^{2x} \\
			e^{2x} y &= \frac{5}{2} e^{2x} + C\\
			y &= \frac{5}{2} + c e^{-2x}
			\end{aligned}$$
		- 예제 3
			$$\begin{aligned}
			y' + y & = x^2 \\
			e^x y' + e^x y &= e^x x^2 \\
			e^x y &= x^2 e^x - 2 x e^x + 2 e^x + c \\
			y &= x^2 - 2x + 2 + c e^{-x}
			\end{aligned}$$

- two-degree ordinary DE
	- $ay'' + b y' + cy = 0$ 형식에 $y=e^{\lambda x}$를 대입
	- $e^{\lambda x} (a \lambda^2 + b \lambda + c) = 0$
	- 특성 방정식 : $a \lambda^2 + b \lambda + c = 0$
		- 서로 다른 두 실근 : $y_1 = e^{\lambda_1 x}, y_2 = e^{\lambda_2 x}$
			- 일반해 : $y = c_1 e^{\lambda_1 x} + c_2 e^{\lambda_2 x}$
		- 중근 : $y = c_1 e^{\lambda x} + c_2 x e^{\lambda x}$
		- 서로 다른 두 허근 ($\lambda = \alpha \pm i \beta$)
			$$\begin{aligned}
			y &= c_1 e^{\lambda_1 x} + c_2 e^{\lambda_2 x} \\
			&= e^{\alpha x}(c_1 e^{i \beta x} + c_2 e^{-i \beta x}) \\
			& = e^{\alpha x} (c_1 cost \beta x + c_2 sin \beta x)
			\end{aligned}$$
	- ex.1
		$$y'' - y' - 6 y = 0$$
		- $y = e^{\lambda x}$를 대입하면, $e^{\lambda x}(\lambda^2 - \lambda - 6) = e^{\lambda x}(\lambda - 3)(\lambda + 2) = 0$
		- $y = c_1 e^{-2x} + c_2 e^{-3x}$

	- ex2
		$$ y'' + 11 y' + 24 y = 0, y(0) = 0, y'(0) = -7$$
		$$ e^{\lambda x} (\lambda ^2 + 11 \lambda + 24) = 0$$
		$$\lambda = -8 \text{ or } -3$$
		$$y(x) = c_1 e^{-8x} + c_2 e^{-3x}$$
		$$y(0) = c_1 + c_2 = 0$$
		$$y'(0) = -8c_1 + (-3 C_2) = -7$$
		$$\rightarrow c_1 = 1.4, c_2 = - 1.4$$
		$$ y(x) = 1.4e^{-8x} -1.4 e^{-3x}$$

	- ex3
		$$ y'' + 2y' + 3 y = 0 \rightarrow \lambda = - 1 \pm i \sqrt{2}$$
		$$y = e^{-x}(c_1 cos \sqrt{2} x + c_2 sin \sqrt 2 x)$$

	- ex4
		$$y'' - 4 y' + 9y = 0, y(0) = 0, y'(0) = -8$$
		$$\rightarrow \lambda ^2 - 4 \lambda + 9 = 0, \lambda = \frac{4 \pm i \sqrt{20}}{2} = 2 \pm i\sqrt 5$$
		- 오일러 공식을 이용해서 식 변형
		$$y(x) = exp(2x)[c_1 cos (\sqrt 5 x) + c_2 sin(\sqrt 5 x)]$$
		- 초기 조건 대입
		$$y(x) = \frac{-8\sqrt 5}{5} exp(2x) sin(\sqrt 5 x)$$

- 미정 계수법(method of undetermined coefficients)
	1. 상수 계수의 non-homogeneous linear DE -> 특수해를 가짐
	2. 얻어진 특수해를 DE에 대입하여 계수를 결정
		- 예: $y'' - 4 y' + 3y = x$
			- 특수해를 식해 대입해도 성립함
			- 미정계수 테이블을 이용해 구한다. 예제 식의 경우 $y_p = Ax + B$ 의 형태
			- 풀이
				- $y = e^{\lambda x}$라고 가정하여 대입
				- $\lambda = 1 \text{ or } 3$
				- homogeneous solution : $y_n = c_1 e^x + c_2 e^{3x}$
				- 일반해 : $y(x) = c_1 e^x + c_2 e^3x + Ax + B$
				- 특수해를 원래 식에 대입하여도 성립하므로, $y_p'=A, Y_p '' =0$
				- 이를 다시 원래식에 대입하면 $A = \frac{1}{3}, B = \frac{4}{9}$
				- 일반해 : $y(x) = c_1 e^x + c_2 e^{3x} + \frac{1}{3} x + \frac{4}{9}$

---
### 고유값과 고유벡터 (eigenvalues and eigenvectors)
- 행렬 $A$가 $n\times n$의 정방 행렬이고, $x \not = 0$인 벡터 $x \in \mathbb{R}^n$ 존재할때
- 다음 관계를 만족하는 스칼라 $\lambda$를 행렬 $A$의 고유값, 벡터 $\vec x$를 고유 벡터라고 한다.
	$$A \vec x = \lambda \vec x$$
- 고유값의 계산
	$$\begin{aligned}
	A \vec x &= \lambda \vec x \\
	A \vec x - \lambda \vec x &= 0 \\
	(A - \lambda I) \vec x &= 0 \\
	\Rightarrow \vec x = 0 &\text{ or } (A - \lambda I) \vec x = 0
	\end{aligned}$$
	- 동차일차 연립방정식 $M\vec x = 0$ 에서 $\vec x =0$ 이 아닌 해를 얻는 유일한 경우는 $\vert M \vert = 0$ 인 경우
	- 따라서 위 식을 만족하려면 $\vert A - \lambda I \vert = 0$ 일때 $\vec x \not = 0$인 해가 존재
	- 이떄 $\vert A - \lambda I \vert = 0$ 식을 $A$의 특성방정식이라고 부른다.
		- $$\lambda^N + a_1 \lambda^{N-1} + \cdots + a_{N-1} \lambda + a_0 = 0$$
		- $A$는 $n \times n$ 행렬, $\lambda$를 $A$의 고유값
		- N개의 고유값과 고유 벡터를 구할수 있다.
		- 고유벡터로 정의되는 부분 공간을 $A$의 고유 공간이라 한다.

- 기하학적 의미
	- 행렬(선형변환) $A$의 고유벡터는 선형변환 $A$에 의해 방향은 보존되고 스케일만 변화되는 방향벡터를 나타내고, 고유값은 그 고유벡터의 변화되는 스케일 정도를 나타내는 값.


---
## Ch.1. Signal and System
### 1.1. Continuous-time(C-T) and discrete-time(D-T) signals
#### 1.1.1. Exmaples & mathematical representation
- Signals describe a variety of physical phenomena
	- ex) 전기회로 내 전원과 ㅊapacitor 전압의 시간상 변화패턴, 적용된 힘의 시간상 변화에 의한 자동차 속도, 사람의 대화(acoustic pressure에서의 fluctuation), 영상 내 밝기 값의 variation 패턴
- 신호는 독립변수의 함수로 표현
	- ex:
		-  음성신호 : 시간상의 함수로 acoustic pressure
		-  영상신호 : 2개의 spatial 변수의 함수로 밝기를 표현
- 신호의 종류
	- continuous-time(C-T) signal -> $x(t)$
		- 독립변수가 continuous-time domain에서 정의
		- 신호는 독립변수의 값들의 연속체
			- ex) speech 는 시간의 함수. 대기압은 고도의 함수
				- t : continus-time independent variable
	- discrete-time (D-T) signal -> $x[n]$
		- 독립 변수가 discrete-time domain에서 정의
		- n: discrete-time independent variable, 여기서 n: integer
			- ex) Dow-Janes stock market index, demographic data, successive samples of an underlying phenomeon
		- 표현 방법
			1. 이산 정현파 신호
				$$y(t) = Acos(2\pi f t + \phi) \rightarrow y(nTs) = Aws(2 \pi fnTs + \phi)$$
				-> $y[n] = A cos(2 \pi fn + \phi)$
			2. 이산 지수함수
				$$y(t) = e^t = exp(t) \rightarrow y(nTs) = exp(nTs) \rightarrow y[n] = exp[n]$$
			3. 이산 복소 지수 함수 
				$$y[n] = e^{jn} = exp[jn]$$
			4. 오일러 공식
				$$e^{jn} = cos[n] + j sin[n], cos[n] = \frac{1}{2} (e ^{jn} + e^{-jn})$$
	cf. 신호의 종류
		- 정의 신호, 잡음 신호
		- C-T 신호, D-T 신호
		- 결정/확정(deterministic) 신호 : 주기 신호, 비주기 신호(지수 신호)
		- 비결정/비확정 신호 : stationary(통계적 특성이 매우 짧은 시간내 불변), non-stationary
		- 에너지 신호, 전력(power)신호 : 에너지, 전력에 정의되는지 여부에 따라

#### 1.1.2 Signal energy & power (신호의 정량적 표현/비교에 평균값, 최대값 x)
- 에너지(J) : 일을 할 수 있는 능력
- 전력(power, J/s, Watt) : 단위 시간당 생성/전달/소비되는 에너지양(평균 에너지)
- 전기회로의 예
	- v(t), i(t) : 저항값 R의 저항에서 전압과 전류
	- instantaneous power : $p(t) = v(t)i(t) = \frac{1}{R}v^2(t)$
	- total energy expended over the time internval $t_1 \le t \le t_2$
		$$ \int_{t_1}^{t_2} p(t) dt = \int_{t_1}^{t_2} v^2(t) dt$$
	- average power over this time interval
		$$ \frac{1}{t_2 - t_1} \int_{t_1}^{t_2} p(t) dt = \frac{1}{t_2 - t_1} \int_{t_1}^{t_2} \frac{1}{R} v^2(t)dt$$
	
---
- Signal may describe a variety of physical phenomena
# - Signal is a pattern of variation of some form
- Signals are variables that carry information
- Examples of signal
	- Electrical signals : voltages and currents in a circuit
	- Acoustic signals : acoustic pressure (sound) over time
	- Mechanical signals : velocity of a car over time
	- Video signals : intensity level of a pixel (camera, video) over time

### How is a Signal Represented?
- Mathematically, signals are represented as a funciton of one or more indepndent variables.
- For instance a black & white viedo signal intensity is dependent on x,y coordinates and time $t : f(x, y, t)$
- We shall be exclusively concerned with signals that are a function of a single variable:time

### Continuous & Discrete-Time Signals
- Continuous-Time Signals
	- Most signals in the real world are continuous time, as the scale is infinitesimally fine.
		- ex) voltage, velocity
	- Denote by x(t), where the time interval may be bounded (finite) or infinite
- Discrete-Time Signals
	- Some real world and many digital signals are discrete time, as they are sampled
		- ex) pixels, daily stock price
- Smpaled continuous signal
	- $x[n]=x(nk)$. k is sample time

### 참고: 전기회로
- 전하, 전류
	- 전하(charge) : 기본 전기량
	- 전하의 최소량: 하나의 전자가 운반하는 전하량
		$$q_e = -1.602 \times 10^{-19} \text{C}$$
	- 기본 전하 : 양자 -> 양전하 & 전자 -> 음전하
	- 전류(electric current): 어떤 단면을 단위 시간에 지나가는 전하량
		$$i = \frac{dq}{dt} \frac{C}{s}$$
	- 전류가 흐르기  위해서는 폐회로(closed circuit)가 구성되어야함
- 키리히호프 전압법칙(Kirchhoff's voltage law)
	- 두 점 사이의 전압, 전위차(potential differnce)
		- 서로 다른 두 점 사이의 전하의 이동과 관련된 단위 전하당 총 일
		- 두 점 사이의 전위 에너지(potential energy)
		- 한 점에서 다른 한점으로 전하를 이동시키는데 필요한 에너지
			- $1 volt = \frac{1 joule}{colomb}$
	- 키리히호프 전압법칙
		- 전기회로에서 에너지가 발생 또는 소멸되지 않는 가정
		- source와 관련된 모든 전압의 합은 부하(load) 전압의 합과 같다.
- 전력(power)
	- 단위 시간당 에너지(일)
		- $P = \frac{일}{시간} = \frac{일}{단위전하} \frac{전하}{시간} = 전압\times 전류$
- 회로소자와 전압-전류 특성
	- 키리히호프 전압법칙
		- 소자를 통과하여 흐르는 전류 I, 소자 양단의 전위차(전압) V
		- source와 관련된 모든 전압의 합은 부하 전압의 합과 같다.
- 옴의 법칙 : V=RI
	- 저항(resistor) : $1 \Omega = V/ A$
	- 크기가 R인 저항의 소모 전력 : $P = VI = I^2 R = V^2 / R$
- 직렬저항과 전압분배 법칙
	- 키리히호프 전압법칙
		$$V = V_1 + V_2 = IR_1 + IR_2 = I(R_1 + R_2) = IR$$

- Capacitor
	- 전압이 시간의 함수로 변화하면, 전하 분리의 형태로 에너지를 저징
		- 외부 전압에 비례 : $$Q=CV$$
		- RC 회로에서
			- 외부 전압이 시간에 따라 변화하면, 저장된 전하도 변화
				$$q(t) = Cv(t)$$
				$$i(t) = dq(t) / dt = C dv(t) / dt$$
				$$v_R(t) = Ri(t), v_C(T) = \frac{1}{C} \int_{-\infty}^t i(t) dt$$
				$$v_R(t) + v_c(t) = v_s(t)$$
				$$\therefore Ri(t) + \frac{1}{C} \int _{-\infty}
^t i(t) dt = v_s(t)$$

- energy and power
	- total envery over the time interval $t_1 \le t \le t_2$ in C-T signal $x(t)$
		$$\int_{t_1}^{t_2} \vert x(t) \vert ^2 dt$$
		- 여기서 $\vert x(t) \vert$ : 신호 x(t)의 크기 (일반적으로 x(t)는 복소수)
		- time-averaged power는 $$\int_{t_1}^{t_2} \vert x(t) \vert ^2 dt / (t_2 - t_1)$$
	- total energy over the time interval $n_1 \le n \le n_2$ in D-T signal $x[n]$
		$$\sum_{n=n_1}^{n_2} \vert x[n] \vert ^2$$
		- interval 상의 average power는 $$\sum_{n=n_1}^{n_2} \vert x[n] \vert ^2 / (n_2 - n_1)$$
	- 무한대의 time interval 상에서
		- total energy 는 위 식의 극한으로 정의
			$$E_{\infty} \triangleq {lim}_{\tau \rightarrow \infty} \int_{-\infty}^{\infty} \vert x(t) \vert ^2 dt = \int _{- \infty}^{\infty} \vert x(t) \vert ^2 dt $$
			$$E_\infty \triangleq {lim}_{N \rightarrow \infty} \sum_{n = - N}^{N} \vert x[n] \vert ^2 = \sum_{N = -\infty}^{\infty} \vert x[n] \vert ^2$$
			- $x(t), x[n]$이 모든 시간에서 0이 아닌 값ㅡㄹ 갖는 경우
			- $E_\infty$는 합이 수렴하지 않는다. : 무한한 에너지
	- 무한 구간에서 시간 평균 power (time-averaged power over on infinite interval)
	  $$ P_\infty \triangleq {lim}_{T \rightarrow \infty} \frac{1}{2T} \int_{-T}^T \vert x(t) \vert ^2 dt$$
	  $$ P_\infty \triangleq {lim}_{N \rightarrow \infty} \frac{1}{2 N + 1} \sum_{n = -N}^{N} \vert x[n] \vert ^2$$
	  - ex : $cos 2 pi t$ : 주기 1
	    $$P_{\infty} = {lim}_{T \rightarrow \infty} \int_{-T}^{T} cos^2 (2 \pi t) dt = {lim}_{T \rightarrow \infty} \frac{1}{4 T} \int_{- \infty}^{\infty} \{ cos(4 \pi t) + 1 \}dt$$
		$$\frac{1}{4 \pi} \int cos u du = \frac{1}{4 \pi} sin u$$
		$$P_{\infty} = {lim}_{T \rightarrow \infty} \frac{1}{4 T} = \frac{1}{2}$$
	 - 주기 신호는 power 신호
	 - ex : 신호 $A e^{- t} (t \ge 0)$ 의 에너지의 전력?
		 $$E_{\infty} = \int_{0}^\infty \vert A e^{-1} \vert ^2 dt = \int_{0}^{\infty} A^2 e^{-2t} dt = - \frac{A^2}{2} e^{-2t} \vert _0 ^{\infty} = \frac{A^2}{2}$$
		 $$P_{\infty} = {lim}_{T \rightarrow \infty} \frac{E_{\infty}}{T} = 0$$
    - 유한한 total energy 가지는 신호는 average power = 0
		$$P_{\infty} = {lim}_{T \rightarrow \infty} \frac{E_\infty}{2T} = 0$$
		- ex) $0 \le t \le 1$ 구간에서는 1. 나머지에서는 0인 신호
			$E_{\infty} = 1$ 이고 $P_{\infty} = 0$
	- 유한한 average power 가지는 신호 ($P_\infty > 0$)는 total energy = $\infty$
		ex) constant signal $x(t) = 4$
			$$P_\infty = {lim}_{T \rightarrow \infty} \frac{1}{2 T} \vert x(t) \vert ^2 dt = {lim}_{T \rightarrow \infty} \frac{1}{2 T} \int_{- T}^{T} 16 dt = 16$$
			$$E_\infty = \infty$$
	- $P_\infty$와 $E_\infty$ 모두 무한대값을 갖는 신호
	- 정리하면,
		- 에너지 신호 : 유한한 total energy 가지는 신호
			$$E_{|infty} < \infty, P_\infty = {lim}_{T \rightarrow \infty} \frac{E_\infty}{2 T} = 0$$
		- power 신호 : 유한한 평균 power 가지는 신호
			$$P_\infty < \infty, P_{\infty} > 0 \rightarrow E_\infty = \infty$$
			- $\exists$ signals for which $P_\infty = \infty$ and $E_\infty = \infty$

 - 에제 : D-T 신호와 에너지와 전력
    $$x[n] = \begin{cases} (0.5)^n & n \ge 0 \\ 2^n & n < 0\end{cases}$$
	- 신호의 에너지 $E_\infty \triangleq \sum_{n = -\infty}^{\infty} \vert x[n] \vert ^2$ 이용하면,
		$$E_\infty = \sum_{n = -\infty}^{-1} (2)^{2n} + \sum_{n = 0} ^ \infty (0.5)^{2n} = \sum_{n = 1}^\infty (0.25)^n + \sum_{n=0}^\infty (0.25)^n = \frac{5}{3}$$
		- 이 신호의 에너지는 유한, 전력은 0

### 1.2. Transformations of the Independent Variable
#### 1.2.1. Examples of transformations of the indepdnent variable
- time shift
	- $x[n]$과 $x[n - n_0]$는 동일한 shape & displaced (shifted)
	- $x(t - t_0)$:
		- delayed if $t_0$ is positive
		- advanced if $t_0$ is negative
		- ex) $cos2t$를 $t_0$만큼 delay : $t$ 대신 $t-t_0$ 대입
- time reversed : $t$ 대신 $-t$ 대입
- time scaling:
	- 독립변수의 scaling: $x(t), x(2t)$ : 2배속, $x(t/2)$ : 1/2 배속
- affine 변환으로 설명
	- $x(t) \rightarrow y(t) = x(\alpha t + \beta)$
		- $x(t + \beta)$ : $x(t)$ shifted by $- \beta$
		- scaling by $\alpha$
	- $\vert \alpha \vert < 1$ 이면 stretched, $\vert \alpha \vert > 1$이면 선형적 압축
	- $\alpha < 0$ 이면 시간 상에서 reversed, $\beta$ 가 non-zero 면 shift

#### 1.2.2. Periodic signals
- periodic C-T signal $x(t)$는 모든 $t$에 대해 $x(t) = x(t + T)$
	$$\exists T \text{s.t. } x(t) = x(t + T) \forall t \overset{def}{\Leftrightarrow} x(t) \text{ is a periodic signal with period }T$$
	- 주기신호는 time shift T에 의해 변화하지 않는다.
	- $x(t)$가 주기 $T$를 가지고 주기적이라면, 모든 $t$와 어떤 정수 $m$에도 $x(t) = x(t + m T)$ : $x($)$ 는 주기 $2T, 3T, \cdots$에 대해서도 주기적
	- $x(t)$의 기본 주기 $T_0$ : 주기가 될수 있는 가장 작은 $T$ 값
	- D-T 신호 $x[n] = x[n + N]$ : $N_0$: 기본 주기

#### 1.2.3. Even and odd signals
- even signal
	- C-T : $x(-t) = x(t)$
	- D-T : $x[-n] = x[n]$
- odd signal
	- $x(-t) = -x(t), x[-n] = -x[n]$
- 임의 신호를 기함수와 우함수 신호로 분리 가능
	- $Ev\{ x(t)\} = \frac{1}{2} [ x(t) + x(-t)] = x_e(t)$
	- $Od\{ x(t) \} = \frac{1}{2} [ x(t) - x(-t)] = x_o(t)$



- Signal Properties:
	- Periodic signals: it repeats itself after a fixed period T
	- Even signals: $x(-t) = x(t)$
	- Odd signals: $x(-t) = -x(t)$
	- A signal is (real) exponential if it can be represented as $x(t) = C e^{at}$. A signal is (complex) expoential if it can be represented in the smae form but $C$ and $a$ are complex numbers.
	- A pulse signal is one which is nearly completely zero, apart from a short spike, $\delta(t)$. A step signal is zero up to a certain time, and them a constant value after that time, $u(t)$.


### 1.3. Exponential Signal & Sinusoidal Signals
#### 1.3.1. C-T- complex exponential & sinusoidal signals
- expoential signal:
	- $x(t) = Ce^{at}$
	- $C$와 $a$가 실수라면, $x(t)$ 는 real exponential signal
		- $a >0$ 이면, $x(t)$ 는 $t$가 증가할수록 증가
		- $a <0$이면, $x(t)$ 는 $t$가 증가할수록 감소

- periodic complex exponential
	- $x(t) = Ce^{at}$ 에서 $a$를 허수로 놓으면
		- $x(t) = C e^{j w_0 t}$
		- 주기적이라면, $e^{j w_0 t} = e^{j w_0(t + T)} = e^{jw_0 t} e^{j w_0 T}$
		- $w_0 = 0$이면, $x(t) = 1$, 어떤 $T$에 대해서도 성립
		- $w_0 \not = 0$이면, $x(t)$의 기본주기 : $T_0 = \frac{2\pi}{\vert w_0 \vert}$ (신호 $e^{j w_0 t}$ 와 $e^{-jw_0t}$는 같은 기본 주기 가정)
		  - $x(t)$는 복소 평면에서 크기 $C$인 원주상을 등속도 $w_0$로 회전하는 신호
  - $e^{(a + j w)t} = e^{at} e^{jwt}$
  - $e^{st}$에서
	  - $s$ 가 실수이고 양수이면 증가하는 신호
	  - $s$ 가 실수이고 음수이면 감소하는 신호
	  - $s$ 가 허수이면 진동하는 신호
	  - $s$ 가 복소수이면 증가/감소하며 진동하는 신호

  - 주기적 복소지수 신호 -> 정현파 신호
	  $x(t) = A cos(w_0 t + \phi)$

- 오일러 관계 ($e^{jw_0t} = cos w_0 t + j sin w_0 t$)로부터
	- $A cos(w_0t +\phi) = \frac{A}{2} e^{j \phi} e^{j w_0 t} + \frac{A}{2} e^{- j \phi} e^{-j w_0 t}$ : 정현파 신호는 주기적인 복소지수항으로 표현 가능
	- $A cos(w_0 + \phi) = A Re(e^{j(w_0 t + \phi)})$
	- $A sin(w_0 + \phi) = A Im(e^{j(w_0 t + \phi)})$
- $x(t) = e^{jw_0 t}$ (복 소 주기 지수 신호)에 대해
	$$E_{period} = \int_0^{T_0} \vert e^{j w_0 t} \vert ^2 = \int_0 ^{T_0} 1 dt = T_0$$
	$$P_{period} = \frac{1}{T_0} E_{period} = 1$$
	$$P_{\infty} = {lim}_{T \rightarrow \infty} \frac{1}{2T} \int_{-T}^{T} \vert e^{jw_0t} \vert ^2 dt = 1$$
- 복소 지수 $e^{jwt}$가 주기 $T_0$를 가지며 주기적이기 위해 필요조건은
	$e^{jwT_0} = 1$ -> $wt_0$가 $2\pi$의 곱 : $wT_0 = 2 \pi k$, $k= -, \pm 1, \pm 2, \cdots$

	$w_0 = \frac{2 \pi}{T_0}$ 로 정의하면, 위 식을 만족시키기 위해서 $w$는 $w_0$의 정수배 -> 고조파(주기를 공유하는 정현파들의 모음)의 복소지수 집합
	$\phi_k(t) = e^{jkw_0t}, k=0, \pm 1, \cdots$ : $w_0$의 모든 배수인 기본 주파수를 가지는 주기적인 지수 집합

- $k=0$이면 $\phi_k(t)$는 상수:
	- $k \not = 0$ 인 k에 대해 $\phi_k(t)$는 기본주파수 $\vert k \vert w=_0$, 기본주기 $\frac{2 \pi}{\vert k \vert w_0} = \frac{T_0}{\vert k \vert}$ 를 갖는 주기 신호

- 예제 1.5 : 두 개의 복소지수의 합을 하나의 복소지수와 하나의 정현파 신호의 곱으로 표현:
	- $$\begin{aligned} x(t) &= e^{j2t} + e^{j3t} \\ &= e^{j2.5t} (e^{e^{-j0.5t} + e^{j0.5t}}) = 2e^{j2.5t} cos(0.5t) \\ \vert x(t) \vert &= 2 \vert cos(0.5t) \vert \end{aligned}$$
	- 전파 정류 정현파 신호

- 일반적인 복수 지수 신호:
	- 실수지수와 주기적 복소지수를 이용해 해석/표현
	- $Ce^{\alpha t}$ -> $C$는 극좌표 형식($C = \vert C \vert e^{j\theta}$), $\alpha$ 는 직교좌표 형식($a=r + j w_0$) 표현
	- $$\begin{aligned} Ce^{e \alpha t} &= \vert C \vert e^{j\theta} e^{r + j w_0)t} = \vert C \vert e^{rt} e^{j(w_0 t + \theta)} \\ &= \vert C \vert e^{rt} cos(w_0 t + \theta) + j \vert C \vert e^{rt} sin(w_0 t + \theta)\end{aligned}$$
	- $r = 0$이면, 복소지수의 실수와 허수 부분은 정현파
	- $r > 0$이면, 증가하는 지수가 곱해진 정현파
	- $r < 0$이면, 감소하는 지수가 곱해진 정현파

### 1.3.3. Periodicity properties of D-T complex exponentials
- $w_0 + 2 \pi$ 주파수를 가지는 D-T 복소지수:
	- $$e^{j(w_0 + 2 \pi)n} = e^{j 2 \pi n} e^{j w_0 n} = e^{jw_0 n}$$
	- 위 특성으로 $e^{j w_0 n}$ 은 $w_0 = \pi$ 될 때까지 진동 증가하다가 $w_0 = 2\pi$ 될때까지 감소
	- $w_0 + 2 \pi$인 지수는 주파수 $w_0$와 같다. -> $2 \pi$의 주파수 구간만 고려
	- $e^{jw_0 n}$ 에 대해 $w_0 = \pi$와 홀수배의 경우:
		- $e^{j\pi n} = (e^{j \pi})^n = (-1)^n$ -> 시간의 각 지점에서 부호 바뀌며 진동
	- $e^{j w_0 n}$의 주기가 $N(N>0)$ 이기 위해서는
	- $$e^{jw_0 (n + N)} = e^{j w_0 n} \rightarrow e^{j w_0 N} = 1$$
	- 위 식이 성립하려면, $w_0 N = 2 \pi m$ (m은 정수)
	  - $x[n]$이 기본 주기 $N$을 갖고 주기적이라면, 기본 주파수는 $\frac{2 \pi}{N}$
		- 즉, 주기신호 $e^{j w_0 n}$ 의 기본 주파수 : $\frac{2 \pi}{N} = \frac{w_0 }{m}$

- 예제 1.6 : 다음 D-T 신호의 기본 주기는?
  - $$x[n] = e^{j(2 \pi / 3) n} + e^{j(3 \pi/4)n}$$
	- 각각의 기본주기는 3과 8이므로 24가 기본주기이다.
- 고조파와 관련된 (공통 주기 N을 갖는) 주기적인 D-T 지수 신호
  - $$\phi_k[n] = e^{j k(2 \pi/N) n}, k = 0, \pm 1, \cdots$$
	- $$\phi_{k + N}[n] = e^{j (k + N) (2 \pi / N) n} = \phi_k[n]$$
	- 구별되는 주기 지수들은 N개 존재

## 1.4. Unit impluse and unit step function
### 1.4.1. D-T unit impulse & unit setp sequences
- 단위 임펄스(단위 샘플) 신호:
	- $$\delta[n] = \begin{cases} 0, & n \not = 0 \\ 1, & n = 0 \end{cases}$$
- 단위 계단 신호:
	- $$u[n] = \begin{cases} 0, & n < 0 \\ 1, & n \ge 0 \end{cases}$$
- $$\delta[n] = u[n] - u[n-1]$$
- $$u[n] = \sum_{m = - \infty}^{n} \delta[m]$$
- 단위 임펄스 순차열은 $n = 0$에서 신호를 샘플링하기 위해 사용:
	- $$x[n]\delta[n] = x[0]\delta[n]$$
	- 일반적으로, $n=n_0$에서 단위 임펄스 $\delta[n - n_0]$의 경우:
		- $$x[n]\delta[n - n_0] = x[n_0] \delta[n - n_0]$$

### 1.4.2. C-T unit setp & unit impluse functions
- C-T 단위 계단 함수:
	- $$u(t) = \begin{cases} 0, & t < 0 \\ 1, & t > 0\end{cases}$$
	- $u(t)$ 의 total energy : $\infty$, power : ${lim}_{T \rightarrow 2T} \frac{1}{2T} \int_{-T}^T u(t)dt = {lim}_{T \rightarrow \infty} \frac{1}{2T} \int_{0}^T 1 dt = \frac{1}{2}$$
	- $u(t) = \int_{-\infty}^t \delta(\tau) d \tau$ : 단위 임펄스 함수의 연속 적분
	- $\delta(t) =  \frac{d u(t)}{dt}$ : C-T 단위 계단함수의 일차 도함수
- $u(t)$는 $t=0$에서 불연속 -> 미분 불가능 문제:
	- 단위 계단 $u_\Delta(t)$로 근사 : 짧은 시간 구간 동안에 그 값이 0에서 1로 증가:
		- $u(t)$는 $\Delta \rightarrow 0$과 같이 $u_\Delta (t)$의 극한을 취합
		- $u_\Delta(t)$의 미분 $\delta_\Delta(t) = \frac{d u_\Delta(t)}{dt}$를 고려하면, $\delta_\Delta(t)$ 는 구간 $\Delta$ 에서 단위 면적을 갖는 짧은 펄스
		- $\Delta \rightarrow 0$ 일 때, 면적은 일정하게 유지(폭은 좁아지고 길이는 길어짐) -> 면적만 가지고 두께는 없음
		- $$\delta_\Delta(t) = {lim}_{\Delta \rightarrow 0}\delta_\Delta(t)$$
  - 임펄스 $u \delta(t)$는 면적이 $u$
	- D-T에서와 마찬가지로 적분변수 $\tau$ 를 $\sigma = t - \tau$로 바꾸면:
		- $$u(t) = \int_{-\infty}^t \delta(\tau) d\tau = \int_{0}^\infty \delta(t - \sigma) d \sigma$$

- 샘플링 특성:
	- 임펄스와 C-T 신호 $x(t)$의 곱 : $x_\cdot (t) = x(t) \delta_\Delta(t)$:
		- $\Delta$가 충분히 작기 때문에 $x(t)$는 거의 일정한 값이고, 극한 값이므로 : $x(t) \delta(t) = x(0) \delta(t)$
	- $t_0$의 임펄스인 경우 : $x(t) \delta(t - t_0) = x(t_0) \delta(t - t_0$)$
	- sampling property:
		- $$\int_{-\infty}^{\infty} x(t) \delta(t - \sigma) d t = x(\sigma) \int_{-\infty}^{\infty} \delta(t - \sigma) dt = x(\sigma)$$

## 1.5. C-T and D-T system
- 시스템 : 입력 신호가 시스템에 의해 변환 또는 입력 시스템에 대해 시스템의 응답을 출력:
	- 예시 : 음성 녹음에서의 톤 변화, 전기 회로, 자동차
	- C-T system : $x(t) \rightarrow y(t)$
	- D-T system : $x[n] \rightarrow y[n]$

### 1.5.1. Simple examples of systems
- RC 전기회로의 예 (저항, 전류, 전압)
- 자동차의 속력의 예 (가속도, 속도, 위치)

### 1.5.2. Interconnections of systems
- 두 시스템의 직렬 or casecade 상호 연결:
	- 전파 -> 라디오 수신 -> 증폭
- 병렬 상호 연결:
	- 여러 마이크가 연결된 하나의 증폭기와 스피커
- 직렬-병렬 상호 연결
- 피드백 상호 연결

## 1.6
### 1.6.1 Systems with & without memory
- memoryless 시스템:
	- 주어진 시간에서 독립 변수 각각의 값에 대한 출력이 같은 시간의 입력에만 의존
- 항등(identity) 시스템 : $y(t) = x(t)$, $y[n] = x[n]$
- 시스템에서 memory : 현재 이외의 시간 입력을 저장/유지:
	- memory D-T 시스템
	- memory C-T 시스템

### 1.6.2. Invertiblity & inverse systems
- invertibility -> 인코딩/디코딩:
	- $$x \rightarrow y \text{ is invertible } \overset{def}{\Leftrightarrow} \exists \text{ an inverse system } : y \rightarrow w \text{ s.t. } w= x$$
- non-invertible system

### 1.6.3. Casuality
- casuality : 어떤 시간에서의 출력이 현재와 과거의 입력값들에만 의존:
	- 두 개의 입력이 어떤 시간($t_0$ or $t_n$)까지만 주어지면, 출력도 같은 시간까지 동일
	- 독립 변수가 시간이 아닌 경우(영상처리), 인과성은 필수 조건이 아님
	- 높은 변동성 데이터 처리 -> 변동을 부드럽게 + 추이를 유지하기 위해 구간내 평균계산

- 예제 1.12 : 시스템의 인과성 검사:
	- $y[n] = x[-n]$:
		- 양의 시간 $n_0$에서 출력 $y[n_0]$은 입력신호 $x[-n_0]$에 의해 결정
		- 여기서 시간 $-n_0$은 음의시간 -> 인과적
		- $n < 0$ 인 경우, 미래의 입력에 의해 출력 결정
	- $y(t) = x(t) cos(t + 1)$:
		- 시간 t에서 출력은 같은 시간의 입력에 따라 변화하는 수를 곱한 결과와 같음

### 1.6.4. Stability
- Stable system : 작은 입력에 대해 출력이 발산하지 않음. 제한된 입력에  제한된 출력

### 1.6.5. Time invariance
- time invariance : 시스템 특성이 시간에 대해 고정

---
4주차 18페이지
