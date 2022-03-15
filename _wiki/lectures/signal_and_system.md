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