---
layout: wiki
title: go
summary: go 언어 관련
date: 2022-08-02 15:52:30 +0900
lastmod: 2025-03-23 17:47:58 +0900
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
- [[go-websocket]]

## Snippet
- [[http-go]]

### 특정 OS 용 파일이 vim-go 에서 자동완성이 안될때 (gopls가 인식하지 못할때)
- [참고자료](https://github.com/fatih/vim-go/issues/1056)
- vim을 시작할때 환경변수를 주입시켜주면 된다.
- `:let $GOOS = 'linux'` 도 된다고 하는데, 나는 잘 안되서 (아마도 로딩 순서 이슈일거 같다.) alias로 설정해놨다.

```bash
alias nvim-linux='GO111MODULE=on CGO_ENABLED=0 GOOS=linux nvim'
```


## time
- `time.Now()` 는 코딩할때 항상 골치덩어리다. 테스트하기도 뭐하고, 그렇다고 clock 을 만들어서 주입받자니 좀 짜치고
	- https://github.com/search?q=repo%3Akubernetes%2Fkubernetes+Now%28%29&type=code&p=2
	- 일단 kubernetes 에서는 time.Now를 직접 쓴다.
	- https://github.com/kubernetes/kubernetes/blob/dab4af9f4e49227bb2083f17c6732464b53f7201/pkg/kubelet/token/token_manager.go#L36
	- 혹은 k8s.io/utils/clock 패키지가 있다.
		- https://pkg.go.dev/k8s.io/utils/clock
		-  이게 그나마 신뢰성 있는 패키지 같다. 직접 구현하기는 좀 짜치는게 있으니까 Interface 만 선언하고, 구현체는 가져다 쓰자. 어짜피 대부분의 경우에는 Now가 필요한거니
		- https://github.com/kubernetes/kubernetes/blob/dab4af9f4e49227bb2083f17c6732464b53f7201/pkg/kubelet/token/token_manager.go#L78
		- 주입 자체는 외부에서 주입하는게 아니라, 자체적으로 생성하고, 테스트할때만 패키지 안쪽 레벨로 테스트 하는거 같다.