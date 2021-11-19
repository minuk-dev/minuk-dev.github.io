---
layout  : wiki
title   : jupyter notebook
summary : jupyter notebook 에서 삽질하거나 설정한거 모음
date    : 2021-11-20 02:29:02 +0900
lastmod : 2021-11-20 02:34:32 +0900
tags    : 
draft   : false
parent  : tool
---

## Jupyter Notebook 에서 pdf 에서 한글이 잘 나오지 않을때
* texlive 에서 폰트 및 기본적인거 그냥 다 설치 (2G 정도 소모)
```bash
sudo apt-get install texlive-full
```

* 만약 이래도 한글이 안나오면,
* `/home/<username>/.local/share/jupyter/nbconvert/templates/latex`에서 `base.tex.j2` 파일에서
```
...
    \usepackage{xcolor} % Allow colors to be defined
    \usepackage{kotex}  % Allow Korean
    \usepackage{enumerate} % Needed for markdown enumerations to work
...
```
 다음과 같이 kotex package를 template에 추가
* 전역적용 되니 만약 딱 1번만 사용할꺼면 다른 사람들 블로그에 나와있는 nbconvert를 직접적으로 사용하는 방법


## Jupyter Notebook 에서 latex package 사용하기
* `/home/<username>/.local/share/jupyter/nbconvert/templates/latex`에서 `base.tex.j2` 파일에 추가

