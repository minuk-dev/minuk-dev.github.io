---
layout: wiki
title: go
summary: go 언어 관련
date: 2022-08-02 15:52:30 +0900
lastmod: 2025-04-07 03:22:03 +0900
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
- 

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

## Fx
- https://github.com/uber-go/fx
- DI Framework
- wire 와 비교하는 개인적인 생각:
	- wire 는 code generation 기반이라 마음에 들지 않는다.
	- 개인적으로 code generation 기반에서 널리 쓰이는게,  [gomock](https://github.com/golang/mock), [go-enum](https://github.com/abice/go-enum) 정도인데, 개인적으로는 둘다 조금 구리다.
	- 구린 이유는
		1. generated 된 코드를 github 에 commit 할때 코드 변경량이 너무 크게 잡힌다.
			- 이게 구린 이유는, 코드 변경량에 따라서 github PR 에 label 같은걸 붙여주는 기능 같은게 망가진다.
		2. 코드 리뷰에서 generated 된 코드는 리뷰를 안하게 된다.
			- 대부분의 경우에는 큰 문제가 되지 않으나,  generated 된 코드에서 문제가 발생할 경우 개발 경험이 너무 안좋다.
	- 개인적으로 이런 이유로 code generation 을 비선호한다.
		- 물론 근데 gomock 정도는 사용한다. testing 에만 사용하는건 그렇게까지 별로는 아닌거 같다.
	- 그리고 개인적으로는 wire 가 조금더 사용하기 어렵다고 생각이 들었다. 뭔카 코드 자체는 아키텍쳐적으로 좋지만, 소규모 프로젝트에서는 그리 당기지는 않는 느낌이다.
	- 결국 code generation 기반은 CI 툴이나 local 개발에서 script 도 잘되어 있어야지 잘 쓸수 있다는 생각이 있다.
	- 그래서 Fx 가 비록 runtime 기반이고, 에러가 발생하면 조금 디버깅하기 난해하긴 하지만, 거의 initialization 타임에만 문제가 생기고 그 다음부터는 괜찮다고 생각되어서 Fx 를 메인으로 배우고 쓰기로 했다.
### 샘플 코드
- 아래는 내가 쓰는 샘플 코드다.
	- https://github.com/minuk-dev/minuk-boilerplate
	- fx, cobra, gorm, gin, golangci-lint, goreleaser 가 적용되어 있다.
		- viper 도 넣을까 했는데, 일단 내가 viper 를 별로 선호하지 않기도 하고 그래서, boilerplate 에는 추가해두지 않았다.
		- 적용된 기술들 대부분 너무 널리 알려진 라이브러리와 툴이기 때문에, 모르는게 있다면 공부하는걸 추천한다.
		- 여기에 + 로 [samber/lo](https://github.com/samber/lo) 정도를 나는 널리 쓰는거 같다.
			- fx 랑 gorm 은 그리 잘쓰지는 않는다...
				- fx 는 팀원들이 모두 적응해야하는데, golang 이 익숙하지 않은 팀원이 한명이라도 있다면 golang에 적응하기도 힘든데 fx 도 적응해야해서 비선호한다.
					- 비슷한 이유로 [ginkgo](https://github.com/onsi/ginkgo) 도 비선호한다.
					- [testify](https://github.com/stretchr/testify) 정도만 팀에서는 사용한다.
				- 개인적으로는 모두가 golang 에 익숙한 팀에서 일하고 싶다... 는 생각도 좀 한다. 아무래도 현재 있는 팀이 (나를 포함해서) 주니어가 많다보니 다들 도메인과 기본적인 기술(코딩 + 인프라)에도 좀 헤매는게 있어서 복잡도를 높이기가 쉽지가 않다.
				- gorm 은 전통적인 db 에 접근할 필요가 있는 프로덕트라면... 굳이 golang 으로 짜야하나 싶다. 인력적으로나 라이브러리 서포트쪽으로나 spring 이 더 좋은 방향이라 생각한다. 언어적으로 좀 편해지고 싶으면 kotlin 을 쓰면 되고, Java 도 요즘 정도면 괜찮지 않나... 싶어서