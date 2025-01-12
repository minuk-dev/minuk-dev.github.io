---
layout  : wiki
title   : 수치해석
summary : 2022-1학기 수치해석을 가장한 그래픽스
date    : 2022-04-21 00:32:34 +0900
lastmod : 2022-06-16 10:30:04 +0900
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
  - $$p(u) = \begin{bmatrix} x(u) \\ y(u) \\ z(u) \end{bmatrix} = \begin{bmatrix} \sum_{k=0}^n u^k c_{xk} \\ \sum_{k=0}^n u^k c_{yk} \\ \sum_{k=0}^n u^k c_{zk} \end{bmatrix} = \sum_{k=0}^n u^k \begin{bmatrix} c_{xk} \\ c_{yk} \\ c_{zk} \end{bmatrix} = \sum_{k=0}^n u^k c_k$$

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


---
## PCA
### Principal Components
- All principal components(PCs) start at the origin
- First PC is direction of maximum variance from origin
- Subsequent PCs are orthogonal to 1st PC and describe maximum residual variance

### Principal Component Analysis
- For an arbitrary set of N vertices $P_1, P_2, ..., P_N$
- Mean position : $m = \frac{1}{N} \sum_{i=1}^N P_i$
- 3x3 covariance matrix : $C= \frac{1}{N} \sum_{i=1}^N(P_i - m ) (P_i - m)^T$:
  - Represents the corrleation between each pair of the $x,y,$ and $z$ coordinates
- Covariance matrix entries:
  - $$C_{11} = \frac{1}{N} \sum_{i=1}^N(x_i - m_x)^2, C_{12} = C_{21} = \frac{1}{N} \sum_{i=1}^N (x_i - m_x)(y_i - m_y)$$
  - $$C_{22} = \frac{1}{N} \sum_{i=1}^N(y_i - m_y)^2, C_{13} = C_{31} = \frac{1}{N} \sum_{i=1}^N (x_i - m_x)(z_i - m_z)$$
  - $$C_{33} = \frac{1}{N} \sum_{i=1}^N(z_i - m_z)^2, C_{23} = C_{32} = \frac{1}{N} \sum_{i=1}^N (y_i - m_y)(z_i - m_z)$$

- An entry of zero : no corrleation
- $C$ is diagonal matrix : three coordinates are uncorrelated

- We want to transform points so that the covariance matrix is diagonal
  - $$\begin{aligned}C' &= \frac{1}{N} \sum_{i=1}^N(AP_i - Am)(AP_i - Am)^T \\ &= \frac{1}{N} \sum_{i=1}^N A(P_i - m)(P_i - m)^T A^T \\ &= ACA^T \end{aligned}$$
- Find $A$ using eigenvectors:
  - Rows of $A$ are unit eigenvectors sorted by eigenvalues in decreasing order

### Higher Diemnsions
- Suppose data poitns are N-dimensional:
  - Same procedure applies :$C' = ACA^T$
  - The eigenvectors define a new coordinates:
    - eigenvector with largest eigenvalue captures the most variation among training vectors
    - eigenvector with smallest eigenvalue has least variation
  - We can compress the data by only using the top few eigenvectors:
    - corresponds to choosing a "linear subspace"

## Decomposition
### Trianglular Systems
- Lower triangular matrix $L$:
  - Square matrix for which $L_{ij} = 0$ when $i < j$
- Linear system $Lx = r$
- $$\begin{bmatrix} L_{11} & 0 & \cdots & 0 \\ L_{21} & L_{22} & \cdots 0 \\ \vdots & \vdots & \ddots & \vdots \\ L_{n1} & L_{n2} & \cdots & L_{nn} \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n\end{bmatrix} = \begin{bmatrix} r_1 \\ r_2 \\ \vdots \\ r_n \end{bmatrix}$$
- Forward substitution:
  - $$x_i = \frac{1}{L_{ii}} ( r_i - \sum_{k=1}^{i-1} L_{ik}x_k)$$

- Upper triangle
  - Square matrix for which $U_{ij} = 0$ when $i > j$
- $$\begin{bmatrix} U_{11} & U_{12} & \cdots & U_{1n} \\ 0 & U_{22} & \cdots U_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & U_{nn} \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n\end{bmatrix} = \begin{bmatrix} r_1 \\ r_2 \\ \vdots \\ r_n \end{bmatrix}$$
- Backward substitution:
  - $$x_i = \frac{1}{U_{ii}} ( r_i - \sum_{k=i+1}^{n} U_{ik}x_k)$$

### LU Decomposition
- $LU = M$
- $$\begin{bmatrix} L_{11} & 0 & \cdots & 0 \\ L_{21} & L_{22} & \cdots 0 \\ \vdots & \vdots & \ddots & \vdots \\ L_{n1} & L_{n2} & \cdots & L_{nn} \end{bmatrix} \begin{bmatrix} U_{11} & U_{12} & \cdots & U_{1n} \\ 0 & U_{22} & \cdots U_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & U_{nn} \end{bmatrix} = \begin{bmatrix} M_{11} & M_{12} & \cdots & M_{1n} \\ M_{21} & M_{22} & \cdots & M_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ M_{n1} & M_{n2} & \cdots & M_{nn} \end{bmatrix}$$
- $$M_{ij} = \sum_{k=1}^i L_{ik} U_{kj}, \text{ if } i \le j$$
- $$M_{ij} = \sum_{k=1}^j L_{ik} U_{kj}, \text{ if } i \ge j$$

- $Mx = r \Rightarrow LUx = r$:
  - Let $Ux = y$
  - Solve $Ly = r$
  - Solve $Ux = y$

- Doolittle's Method:
  - $L_{ii} \equiv 1, i =1, 2, ..., n$
- We can express L and U in one matrix:
  - $$D = \begin{bmatrix} U_{11} & U_{12} & U_{13} & \cdots & U_{1n} \\ L_{21} & U_{22} & U_{23} & \cdots & U_{2n} \\ L_{31} & L_{32} & U_{33} & \cdots & U_{3n} \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ L_{n1} & L_{n2} & L_{n3} & \cdots & U_{nn} \end{bmatrix}$$

- Solve U and L for each column j for top to bottom:
  - $$U_{1j} = M_{1j}; L_{i1} = \frac{M_i1}{U_{11}}$$
  - $$U_{ij} = M_{ij} - \sum_{k=1}^{i-1} L_{ik} U_{kj}, \text{ if } i > 1$$
  - $$L_{ij} = \frac{1}{U_{jj}} ( M_{ij} - \sum_{k=1}^{j - 1} L_{ik} U_{kj}), \text{ if } j > 1$$

### Error Reduction
- Suppose we solve a linear system $Mx = r$:
  - If we obtained a solution $x= x_0$, $x_0$ usually slightly different from the true solution due to round-off error
  - Thus $Mx_0 = r_0$:
    - $M(x + \Delta x) = r + \Delta r$, where $\Deltax = x_0 - x, \Deltar = r_0 - r$
    - $M \Delta x = \Delta r$
    - $M \Delta = M x_0 - r$
    - solve for the error $\Delta x$ and improve the solution : $x = x_0 - \Delta x$

### Matrix Inversion
- Matrix inverse can be computed in a column-by-column method
- $$MM^{-1} = I$$

## Iterative
### Solving Large Lienar Systems
- Global illumination (Radiosity):
  - Solve $B = (I - \rho F)^{-1} E$
  - Need to solve for a large matrix
  - It takes too much time with conventional methods

### Jacobi Method
- Iterative or approximate method
- Solve a linear system $AX=B$
- General formula:
  - $$x_i^{(k+1)} = \frac{1}{a_{ii}} ( b_i - \sum_{j \not = i} a_{ij} x_{j}^{(k)}), i=1,2, ...,n$$
- Convergence check:
  - $\epsilon_i = \vert \frac{x_i^j x_i^{j-1}}{x_i^j} \vert < \epsilon_s$

### Gauss-Seidel Method
- Speed up the convergence
- Use better approximations when possible
- $x_{k+1}$ is a better approximation to $x$ than $x_k$.
- $x_i^{(k+1)} = \frac{1}{a_{ii}} (b_i - \sum_{j < i} a_{ij} x_j^{(k+1)} - \sum_{j > i} a_{ij} x_j^{(k)}), i = 1,2,...,n$

### Convergence
- Sufficient condition for convergence:
  - Method always converge if the matrix $A$ is diagonally dominant
  - Row diagonal dominance: For each row, the absolution value of the diagonal term is greater than the sum of absolute values of other terms
  - $\vert a_{ii} \vert > \sum_{i \not = j} \vert a_{ij} \vert$

### Relaxation in Gauss-Seidel
- Slight modification for improving convergence
- $x_i^{(k+1)} = \lambda x_i^{(k+1)} + (1 - \lambda) x_i^{(k)}$, $0 < \lambda < 2$:
  - If $\lambda = 1$, no changes
  - If $0 < \lambda < 1$, underrelaxation helps to make a nonconvergent system converge
  - If $1 < \lambda < 2$, overrelaxation to accelerate the converge

## Interpolation
### Interpolation
- Iterpolation:
  - A process of finding a function that passes through a given set of points $(x_i, y_i)$ (data fitting or curve fitting)
  - It can be used to estimate variable $y$ corresponding to unknown $x \in [a, b] - \{ x_i \}$
- Extrapolation:
  - Estimate variable $y$ corresponding to $x < x_0$ or $x > x_n$
- Purpose of interpolation:
  1. Replace a set of data points $\{(x_i, y_i)\}$ with a function given analytically.
  2. Approximate functions with simpler ones, usually polynomials or 'piecewise polynomials'.

### Linear Interpolation
- Interpolation with straight line:
  - Let two data poitns $(x_0, y_0)$ and $(x_1, y_1)$ be given. There is a unique straight line passing through these points. We can write the formula for a straight line as:
    - $$P_1(x) = y_0 + (\frac{y_1 - y_0}{x_1 - x_0})(x - x_0)$$

### Quadratic Interpolation
- We want to find a polynomial:
  - $P_2(x) = a_0 + a_1 x + a_2 x^2$
  - which satisfies:
    - $P_2(x_i) = y_i, i = 0, 1, 2$
    - for given data points $(x_0, y_0), (x_1, y_1), (x_2, y_2)$

- Lagrange interpolation:
  - $P_2(x) = y_0 L_0(x) + y_1 L_1(x) + y_2 L_2(x)$
  - with:
    - $L_0(x) = \frac{(x - x_1)(x - x_2)}{x_0 - x_1)(x_0 - x_2)}$
    - $L_1(x) = \frac{(x - x_0)(x - x_2)}{x_1 - x_0)(x_1 - x_2)}$
    - $L_2(x) = \frac{(x - x_0)(x - x_1)}{x_2 - x_0)(x_2 - x_1)}$
- Uniqueness:
  - Can there be another polynomial, call it $Q(x)$, for which:
    - $deg(Q) \le 2$
    - Let $R(x) = P_2(x) - Q(x)$
    - From the properties of $P_2$ and $Q$, we have $deg(R) \le 2$
    - $R(x_i) = P_2(x_i ) - Q(x_i) = y_i - y_i = 0$
    - Three zeros for quadratic function
    - So, $R(x) = 0$ for all x, $Q(x) = P_2(x)$ for all x

### Higher Degree Interpolation
- Polynomail function of degree $n$:
  - $deg(P_n) \le n$
  - $P_n(x_i) = y_i, i = 0, 1, ..., n$
  - with data points $(x_0, y_0), ..., (x_n, y_n)$
- Lagrange interpolation:
  - $P_n(x) = y_0 L_0(x) + y_1 L_1(x) + \cdots + y_n L_n(x)$
  - $L_k(x) = \frac{(x - x_0) ... (x - x_{k-1})(x - x_{k+1}) ... (x - x_n)}{(x_k - x_0) ... (x_k - x_{k-1})(x_k - x_{k+1})...(x_k - x_n)}$

### Newton Polynomials
- It is sometimes useful to find $P_1(x), P_2(x), ..., P_N(x)$
- Lagrange polynomials:
  - No constructive relationship between $P_{N-1}(x)$ and $P_N(x)$
- Newton polynomials:
  - Recursive pattern
  - $P_N(x) = P_{N-1}(x) + g_N(x)$
  - $g_N(x) = a_N(x - x_0)(x - x_1) ... (x - x_{N-1})$
- To find $a_k$ for all polynomials $P_1(x), P_2(x), ..., P_N(x)$ that approximate a given function $f(x)$
- $P_k(x)$ is based on the centers $x_0, x_1, ..., x_k$
- $a_1$ : slope of the line between $(x_0, f(x_0))$ and $(x_1, f(x_1))$

#### General Divided Differnce
- Given $n + 1$ distinct points $x_0, ..., x_n$, with $n \ge 2$, define:
  - $$f[x_0, ..., x_n] = \frac{f[x_1, ..., x_n] - f[x_0, ..., x_{n-1}]}{x_n - x_0}$
  - $$f[x_0, ...l, x_n] = \frac{1}{n!} f^{(n)}(xc)$
  - for some $c$ intermediate to the points $\{x_0, ..., x_n \}$

### Spherical Linear Interpolation
- $$q(t) = \frac{sin \theta (1 - t)}{sin \theta} q_1 + \frac{sing \theta t}{sin \theta} q_2$$

### Bilinear Interopolation
- $$f(R_1) \approx \frac{x_2 - x}{x_2 - x_1} f(Q_{11}) + \frac{x - x_1}{x_2 - x_1} f(Q_{21})$$
- $$f(R_2) \approx \frac{x_2 - x}{x_2 - x_1} f(Q_{12}) + \frac{x - x_1}{x_2 - x_1} f(Q_{22})$$
- $$f(P) \approx \frac{y_2 - y}{y_2 - y_1} f(R_1) + \frac{y - y_1}{y_2 - y_1} f(R_2)$$

## Least Squares
### Least-Squares Line
- Data points $(x_1, y_1), ..., (x_N, y_N), \{x_k \}$ are distinct
- Numerical method is to determine $y=f(x)$
- Lienar approximation: $y = f(x) = Ax + B$
- If there is an error in the data points:
  - $$f(x_k) = y_k + e_k$$,
  - where $e_k$ is the error

### Errors
- Erros: $e_k = f(x_k) - y_k$ for $1 \le k \le N$
- Norms to measure how far the curve $y=f(x)$ lies from the data
- Maximum error: $E_{\infty} (f) = {max}_{1 \le k \le N} \{ \vert f(x_k) - y_k \}$
- Average error: $E_1 (f) = \frac{1}{N} \sum_{k=1}^N \vert f(x_k) - y_k \vert$
- Root-mean-squre error: $E_2 (f) = ( \frac{1}{N]} \sum_{k=1}^N \vert f(x_k) - y_k \vert ^2)^{1/2}$
- Maximum error is sensitive to extreme data
- Average is often used since it's easy to compute
- RMS is often used when statistical nature is used

### Least-Squares Line
- A best-fitting line is minimizing the rror
- RMS is the traditional choice
- Coefficients of least-squares line $y=Ax + B$ are the solution of the followign linear system:
  - $$(\sum_{k=1}^N x_k^2) A + (\sum_{k=1}^N x_k) B = \sum_{k=1}^N x_k y_k$$
  - $$\sum_{k=1}^N x_k) A + NB = \sum_{k=1}^N y_k$

- Eror is teh vertical distance between $(x_k, y_k)$ and $(x_k, Ax_k + B)$ and we want minimize their squared sum
- $E(A, B)$ is minimum when the partical derivatives $\partial E / \partial A$ and $\partial E / \partial B$ equal to zero
- $$\begin{aligned} \frac{\partial E(A, B)}{\partial A} &= \sum_{k=1}^N 2(A x_k + B - y_k)(x_k) \\ &= 2 \sum_{k=1}^N (A x_k^2 + B x_k - x_k y_k) \end{aligned}$$
  - $$0 = A \sum_{k=1}^N x_k^2 = B \sum_{k=1}^N x_k - \sum_{k=1}^N x_k y_k$$
- $$\begin{aligned} \frac{\partial E(A, B)}{\partial B} &= \sum^N 2(Ax_k + B - y_k) \\ &= 2 \sum_{k=1}^N (A x_k + B - y_k)\end{aligned}$
  - $$0 = A \sum_{k=1}^N x_k + NB - \sum_{k=1}^N y_k$$

### Power Fit
- Fitting $f(x) = Ax^M$, where $M$ is known
- Least-squares power curve: minimize the RMS (Root-Mean-Square) error:
  - $$A = \sum_{k=1}^N x_k^M y_k) / (\sum_{k=1}^N x_k^{2M})$$
- Least-Squares method: minimize $E(A)$:
  - $$E(A) = \sum (Ax_k^M - y_k)^2$$
- Solve $E'(A) = 0$:
  - $$E'(A) = 2 \sum (A x_k^{2M} - x_k^M y_k)$$
  - $$0 = A \sum x_k^{2M} - \sum x_k^M y_k$$

### Data Linearization
- Data linearization : process to transform a non-linear relation into a linear relation

### Matrix Formulation
- Lienar system:
  - $F^TFC = F^TY$ for the coeeficient matrix $C$

### Polynomial Fitting
- Polynomial function:
  - $$f(x) = c-1 + c_2 x + c_3 x^2 + \cdots + c_{M+1} x^M$$
- Least-squares parabola

### Nonlinear Least-Squares Method
- Nonlinear system can be solved with Newton's Method:
  - Time consuming
  - Requires good starting values for $A$ and $C$
- Minimize $E(A, C)$ directly using optimization methods

## Optimization
- Methods for locating extrema(maxima or minima) of functions

### Functions of One Variable
- The function $f$ has a local minimum value at $x=p$, if there exists an open interval $i$ containing $p$ s.t. $f(p) \le f(x)$ for all $ x \in I$
- $f$ has a local maximum value at $x = p$, if there exists an open interval $i$ containing $p$ s.t. $f(x) \le f(p)$ for all $ x \in I$
- $f$ has a local extremum value at $x=p$, if it has local minimum or maximum value at $x=p$.

- Theorem 1:
  - Suppose that $f(x)$ is continuous on $i= [a,b]$ and is differentiable on $(a, b)$:
    - If $f'(x) > 0$ for all $x \in 9a, b)$, then $f(x)$ is increasing on $I$.
    - If $f'(x) < 0$ for all $x \in (a, b)$, then $f(x)$ is decreasing on $I$.
- Theorem 3:
  - Suppose that $f(x)$ is continuous on $i= [a,b]$ and $f'(x)$ is defined for all $x \in (a, b)$, except possibly at $x=p$:
    - If $f'(x) < 0$ on $(a, p)$ and $f'(x) > 0$ on $(p, b)$, then $f(p)$ is a local minimum.
    - If $f'(x) > 0$ on $(a, p)$ and $f'(x) < 0$ on $(p, b)$, then $f(p)$ is a local maximum.
- Theorem 4:
  - Suppose that $f(x)$ is continuous on $i= [a,b]$ and $f',f''$ is defined for all $x \in (a, b)$, Also, $p \in (a, b)$ is a critical point where $f'(p) = 0$:
    - If $f''(p) > 0$, then $f(p)$ is a local minimum of $f$.
    - If $f''(p) < 0$, then $f(p)$ is a local maximum of $f$.
    - If $f''(p) = 0$, then this test is inconclusive.

### Bracketing Search Methos
- Evaluate the function many times and search for a local minimum/maximum
- To reduce the number of function evaluations, a good strategy is needed for determining where the function is to be evaluated
- Definition:
  - The function $f(x)$ is unimodal on $I = [a, b]$, if there exists a unique number $p \in I$ such that:
    - $f(x)$ is decreasing on $[a, p]$
    - $f(x)$ is increasing on $[p, b]$

### Golden Ratio Search
- If $f(x)$ is unimodal on $[a,b]$, then it is possible to replace the interval with a subinterval on which $f(x)$ takes on its miniumum value
- Select two interior points $c < d \Rightarrow a < c < d < b$
- $f(c), f(d) < max(f(a), f(b))$:
  - When $f(c) \le f(d)$:
    - The minimum must occur in $[a,d]$
    - New subinterval $[a, d]$
  - When $f(d) < f(c)$:
    - The minimum must occur in $[c, d]$
    - New subinterval $[c, b]$
- $c = ra + (1 - r)b$
- $d = (1 - r)a + rb$
- $r = \frac{-1 + \sqrt 5}{2}$

### Fibonacci Search
- The value r is not constant on each subinterval
- Number of subintervals (iterations) is predetermined and based on the specified tolerance
- The interior poitns $c_k$ and $d_k$ of the k-th subinterval $[a_k, b_k]$ are:
  - $c_k = a_k + (1 - \frac{F_{n-k-1}{F_{n-k}}})(b_k - a_k)$
  - $d_k = a_k + \frac{F_{n-k-1}}{F_{n-k}}(b_k - a_k)$

- For a tolerance $\epsilon$, find the smallest value of $n$ such that:
  - $$\frac{b_0 - a_0}{F_n} < \epsilon, F_n > \frac{b_0 - a_0}{\epsilon}$$

### Multidimensional Optimization
- Find the extremum of a function of several variables:
  - Direct method (No derivatives)
  - Gradient method (Use derivatives)

#### Direct Methods - Random Search
- Based on evaluation of the fuction randomly at selected values of the independent variables.
- If a sufficient number of samples are ocnducted, the optimum will be eventually located
- Advantages:
  - Works even for discontiuous and nondifferentiable functions.
- Disadvantages:
  - As the number of independent variables grows, the task can become onerous.
  - Not efficient, it does not account for the behavior of underlying function

#### Direct Method - Univariate and Pattern Search
- More efficient than random search and still doesn't require derivative evaluation
- The baisc strategy:
  - Change one variable at a time while the other variables are held constant.
  - Problem is reduced to a sequence of one-dimensional searches that can be solved by variety of methods
  - The search becomes less efficient as you approach the maximum.

### Gradient
- Graident of a function $f$, $\nabla f$, tells us:
  - $$\nabla f = \begin{bmatrix} \frac{\partial f}{\partial x_1} \\ \vdots \\ \frac{\partial f}{\partial x_n} \end{bmatrix}$

### Hessian Matrix (of Hessian of $f$)
- $$H = \begin{bmatrix} \frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partialx_1 \partial x} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\ \frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} & \cdots & \frac{\partial^2 f}{\partial x_2 \partial x_n} \\ \vdots & \vdots & \ddots & \vdots \\ \frac{\partial^2 f}{\partial x_n \partial x_1} & \frac{\partial^2 f}{\partial x_n \partial x_2} & \cdots & \frac{\partial^2 f}{\partialx_n^2} \end{bmatrix}$
- Also known as the matrix of second partial derivatives.
- It provides a way to discern if a funciton has reached an optimum or not.

## Solution of Nonlinear Equation
### Basis of Bisection Method
- An equation $f(x) = 0$, where $f(x)$ is a real continuous function, has at least one root between $x_l$ and $x_u$ if $f(x_l)f(x_u) < 0$.
- If 
