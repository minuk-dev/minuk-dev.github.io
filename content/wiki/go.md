---
layout: wiki
title: go
summary: go 언어 관련
date: 2022-08-02 15:52:30 +0900
lastmod: 2025-01-31 11:55:09 +0900
tags:
  - go
draft: false
parent: study-note
---

- [[cloud-native-go]]

## Convention 관련 자료
- [effective go](https://go.dev/doc/effective_go)
- [뱅크샐러드 Go 코딩 컨벤션](https://blog.banksalad.com/tech/go-best-practice-in-banksalad/)
- [The Zen of Go](https://the-zen-of-go.netlify.app)
- [Uber Go Style Guide](https://github.com/uber-go/guide/blob/master/style.md)

## Vim 관련
- [vim-go](https://github.com/fatih/vim-go)

## 혼자서 탐구해본 자료
- [[go-http]]

## Snippet
- [[http-go]]

### 특정 OS 용 파일이 vim-go 에서 자동완성이 안될때 (gopls가 인식하지 못할때)
- [참고자료](https://github.com/fatih/vim-go/issues/1056)
- vim을 시작할때 환경변수를 주입시켜주면 된다.
- `:let $GOOS = 'linux'` 도 된다고 하는데, 나는 잘 안되서 (아마도 로딩 순서 이슈일거 같다.) alias로 설정해놨다.

```bash
alias nvim-linux='GO111MODULE=on CGO_ENABLED=0 GOOS=linux nvim'
```
