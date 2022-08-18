---
layout  : wiki
title   : vim/vim-go
date    : 2022-08-17 04:51:27 +0900
lastmod : 2022-08-18 13:50:01 +0900
tags    : [vim, go]
draft   : false
parent  : vim
---

## 간단 설명
- vim에서 go를 지원하는 플러그인
- 일반적으로 가장 많이 제시됨.
- 기본적인 공부는 [공식 사이트의 튜토리얼](https://github.com/fatih/vim-go/wiki/Tutorial)을 따라하면 좋다.

## 지원하는 좋은 기능
- 저장시에 자동으로 go fmt 을 실행한다. 이때 import 도 해준다.

## 자주 사용하는 명령어
- `GoRun` : 간단하게 실행할때 사용한다.
- `CTRL-]` : GoDef

## 자주 사용하면 좋은데 손에 잘 안익는거
- `:GoDoc`
- `:GoDecls`
- `:GoDeclsDir`
- 나머지 유용한 내용은 [여기](https://johngrib.github.io/wiki/vim-go-env/)가 더 잘나와있다. 하지만 솔직히 하나씩 손에 익히는게 좋다고 생각하고 몇가지 자주 쓰는 기능만 손에 익히고, 나머지는 기능이 있구나 정도 여부만 알고 진짜 필요할때만 보면 될거 같다. (예를 들어 인터페이스 구현 목록이라던가 등등)


## 개인 생각
- 나는 coc-go랑 같이 사용하고 있는데 둘이 동시에 사용하는 것도 좋다.
- 딱히 충돌난 경험은 없다.
- GoReferers 같은 기능은 잘 안쓰게 되는데, coc 에서는 gr(go referers)로 이동할 수 있어서 사용한다.
