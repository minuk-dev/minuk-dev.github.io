---
layout: wiki
title: rbac
date: 2025-04-16 02:48:49 +0900
lastmod: 2025-04-16 02:55:14 +0900
tags: 
draft: false
parent: 
---
## RBAC
- Role Based Access Control
- 더 자세한 정의는 다른 사이트에 잘나와있다.

## 구현체
- golang 으로 인증 쪽에 관심이 있어서 좀 찾아보니까, [casbin](https://github.com/casbin/casbin) 이라는 게 있다.
	- 스타도 충분히 많고 (적는거 기준 18.5k)
	- 문서화도 잘되어 있는것으로 보인다.
	- 그리고 java 도 있어서 맨날 java 개발자들이 잘 못쓸까봐 걱정하는걸 안해도 된다.
- PERM 메타 모델이라는 걸 사용한다. (Policy, Effect, Request, Matchers)
```
# Request definition
[request_definition]
r = sub, obj, act

# Policy definition
[policy_definition]
p = sub, obj, act

# Policy effect
[policy_effect]
e = some(where (p.eft == allow))

# Matchers
[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
```
뭔가 미묘하게 toml 문법과 비슷해보여서 기분나쁘긴 한데, 일단 직관적이긴 한거 같다.
- echo system 도 잘되어있는거 같다.
	- https://casbin.org/ecosystem?tags=Go