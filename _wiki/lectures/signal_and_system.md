---
layout  : wiki
title   : 신호 및 시스템
summary : 2022-1학기 신호 및 시스템 공부
date    : 2022-03-15 14:58:52 +0900
lastmod : 2022-03-15 14:59:28 +0900
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
- Signal is a pattern of variation of some form
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