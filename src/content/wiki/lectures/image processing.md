---
layout  : wiki
title   : lectures/image processing
summary : 
date    : 2020-04-07 20:37:08 +0900
lastmod : 2020-06-27 15:23:41 +0900
tags    : [lecture, image processing]
parent  : lecture
---
PCA (Principal Components Analysis)

# Eigenvalues and Eigenvectors

- The prefix eigen- is adopted from the German word eigen for "proper", "characteristic"
- Eigenvalues are a special set of scalars associated with a linear system of equations that are sometimes also known as characteristic roots, characteristic values
- Each eigenvalue is paired with a corresponding so-called eigen vector.
- Eigenvectors are a special set of vectors associated with a linear system of equations that are sometimes also known as characteristic vectors
- The Lanczos algorithm is an algorithm for computing the eigenvalues and eigenvectors
- Eigenvalues and eigenvectors feature prominently in the analysis of transformations

## Covariance matrix

- The covariance matrix consists of the variances of the variables along the main diagonal and the covariance between each pair of variables in the other matrix positions

## Face Recognition

1. obtain face images I_1, ... , I_m (training faces) (very important : the face images must be centered and of the same size)
2. represent every I_i as a vector Gamma_i
3. compute the average face vector Psi :

    $$\Psi = {1 \over M } \sum_{i=1}^M \Gamma_i$$

4. subtract the mean face

    $$\Phi_i = \Gamma_i - \Psi$$

5. compute the covariance matrix C

    $$C = {1 \over M} \sum_{n=1}^M \Phi_n\Phi_n^T$$

    
    요점 정리
- 영상처리란? : 그림을 다루는 학문 이미 획득되었거나 만들어진 영상을 조작
- 영상처리 알고리즘 분류 방법
    - 포인트 처리 : 화소의 원래 값이나 위치에 기반한 화소값을 변경한다.
    - 영역처리 : 화소의 원래 값과 이웃하는 화소의 값을 기반으로 하여 화소값을 변경한다. (ex. 유채화 효과)
    - 기하학적 처리 : 화소들의 위치나 배열을 변화시킨다.
    - 프레임 처리 : 두개 이상의 영상들에 대한 연산을 기반으로 화소값을 생성한다.
- 영상 획득 : 영상들은 숫자들의 2차원 배열로 컴퓨터에 저장된다.
- 포인트 처리 : 화소값에 의하여 수행. Look-up table을 이용하여 쉽게 구현
    - 산술 연산 : pixel에 일정한 값을 더하거나 빼거나 곱하거나 나누는 연산
    - Brightness : + → 밝기가 밝아진다. (단순 이동), * → 밝기 대비가 커진다.(명암 대비 증가)
