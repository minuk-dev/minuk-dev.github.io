---
layout  : wiki
title   : 수치해석
summary : 2022-1학기 수치해석을 가장한 그래픽스
date    : 2022-04-21 00:32:34 +0900
lastmod : 2022-04-21 01:44:08 +0900
tags    :
draft   : false
parent  : lectures
---

## Curves
### Curves - Implicit Representation
- Most curvest can be represented implicitly:
  - $$f(x, y) = 0$$
  - Examples:
    - $$ax + by + c = 0$$
    - $$x^2 + y^2 - r^2 = 0$$
  - In 3D, surfaces are represented as:
    - $$f(x, y, z) = 0$$

### Curves - Parametric Representation
- The value of each component (x, y, z) depends on an independent variable, u (the parameter).
- $$p(u) = \begin{bmatrix} x(u) \\ y(u) \\ z(u) \end{bmatrix}$$
- $$\frac{dp(u)}{du} = \begin{bmatrix} \frac{dx(u)}{du} \\ \frac{dy(u)}{y(u)} \\ \frac{dz(u)}{z(u)} \end{bmatrix}$$
  - Derivative : Direction = tangent, Magnitude = speed that curve changes with u

### Criteria for choosing a representation
- Parametric forms are not unique. Many different representations are possible for a single curve.
- Criteria for a good representation:
  - Local control of shape
  - Smoothness and continuity
  - Ability to evaluate derivatives
  - Stability
  - Ease of Rendering
- Parametric curves that are polynomials in u satisfy many of these criteria:
  - $$x(y) = c_0 + c_1 u + c_2 u^2 + \cdots + c_n u^n = \sum_{k=0}^n c_ku^k$$

### Matrix Equation for parametric curve
- We can write the 3 euqations for x(u), y(u), and z(u) in one matrix equation:
  - $$p(u) = \begin{bmatrix} x(u) \\ y(u) \\ z(u) \end{bmatrix} = \begin{bmatrix} \sum_{k=0}^n u^k c_{xk} \\ \sum_{k=0}^n u^k c_{yk} \\ \sum_{k=0}^n u^k c_{zk} \end{bmatrix = \sum_{k=0}^n u^k \begin{bmatrix} c_{xk} \\ c_{yk} \\ c_{zk} \end{bmatrix} = \sum_{k=0}^n u^k c_k$$

### Degree of the Polynomial
- Tradeoff:
  - High degree can have rapid changes and lots of turns, but it requires more computation and curve may not be as smooth.
  - Low degree means a smoother curve, but it may not fit the data as well.
- Compromise: Use low degree polynomials with short curve segments. Cubic polynomial work well.

### Multiple curve segments
- We usually want to define a curve segment between two endpoints. We define the curve between u=0 and u=1, so that:
  - $p(0) = p_0$ and $p(1) = p_1$
- Longer curves are composed of multiple segments. We would like the connection between curves to be as smooth as possible.

### Interpolation
- If one point provides 3 equations and 12 unknowns, then 4 points provide 12 equations with 12 unknowns.
- We can choose any value of u to correspond to the 4 points, so we will choose to divide the interval 0 to 1 evenly(0, 1/3, 2/3, 1).
