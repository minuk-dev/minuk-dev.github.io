---
layout  : wiki
title   : tikz
summary : 
date    : 2021-07-26 10:37:13 +0900
lastmod : 2021-07-26 18:34:58 +0900
tags    : [tikz]
draft   : false
parent  : tool
---

## tikz in jekyll
 * tikz 를 jekyll 에서 사용하고 싶어서 쓴 글
 * github page를 사용해서 wiki를 만든지 1년 정도 되었는데, 그림을 올리고 싶은 욕구를 해결할 방법이 없다.
 * 그러던 중 tikz를 알게되었는데 이게 잘 동작하지 않는다.

 * javascript 로 include 해서 사용한 것도 있었지만 잘 동작하지 않았다.
 * 따라서 그냥 github push 할때 추가로 image를 만든뒤, auto append, commit 해서 추가하는 스크립트를 만들기로 했다.

## Configuration Tikz in Jekyll
### 1. Install Tools

```bash
sudo apt install tikzit
```

```bash
sudo apt install texlive-latex-base texlive-fonts-recommended texlive-fonts-extra texlive-latex-extra
```

```bash
sudo apt install -y imagemagick
```

### 2. Configure Imagemagick

```bash
sudo sed -i_bak \
's/rights="none" pattern="PDF"/rights="read | write" pattern="PDF"/' \
/etc/ImageMagick-6/policy.xml
```

### 3. Write simple script (Writing)

```bash
#!/bin/bash
SAVEIFS=$IFS
IFS=$'\n'
filelist=($(git diff --cached --name-status | awk '$1 != "D" { print $2 }'))
IFS=$SAVEIFS
for (( i=0; i<${#filelist[@]}; i++ ))
do
  echo "$i: ${filelist[$i]}"
done
```

## tikz 관련 자료
 * [tikz-uml](https://perso.ensta-paris.fr/~kielbasi/tikzuml/var/files/doc/tikzumlmanual.pdf)


