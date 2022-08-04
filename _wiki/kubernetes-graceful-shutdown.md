---
layout  : wiki
title   : kubernetes-graceful-shutdown
summary : 글을 보고 궁금한걸 코드로 정리한 문서
date    : 2022-08-04 17:25:09 +0900
lastmod : 2022-08-04 17:31:12 +0900
tags    : [kubernetes, devops]
draft   : false
parent  : devops
---

### 동기
- slack 에서 [kubernetes graceful shutdown](https://learnk8s.io/graceful-shutdown) 과 관련해서 올라왔는데, 동작 방식이 궁금해서

## 기본구조
1. api server layer 에서 pod 가 삭제되면 endpoint 를 갱신함으로써 새롭게 들어오는 트래픽 차단
2. 새롭게 들어오는 트래픽 차단 이후 기존 traffic 이 다 처리될때까지 pod를 죽이지 않고 기다려준다.:
  - 왜냐하면, 기존에 들어왔던 모든 트래픽이 처리되고 iptable이 갱신 되기 전에 pod가 죽어버리면 서비스 단절현상이 일어난다.

## 코드 구조
- 하단에 해석 있음

```
// kubernetes/pkg/controller/endpoint/endpoints_controller.go#L282
Endpointcontroller.deletePod(obj interface{})
- endpointutil.GetPodFromDeleteAction(obj interface{}) // pod 유효성 검사
- Endpointcontroller.addPod(obj interface{}) // addPod 라고 적혀있긴 한데, 실제로는 이 Pod를 스케줄링하라는 의미
-- ServiceSelectorCache.GetPodServiceMemberships(v1listers.ServiceLister, *v1.Pod) // Pod 가 대상인 서비스들을 조회
-- GetPodServiceMemberships() 함수 값들에 대해서 갱신 -> syncService() 호출
```

```
// kubernetes/pkg/controller/endpoint/endpoints_controller.go#L366
EndpointController.syncService(context.Context, string)
// L534 에서 Endpoints 를 갱신함
- _, err = e.client.CoreV1().Endpoints(service.Namespace).Update(ctx, newEndpoints, metav1.UpdateOptions{})
// 이 시점이 그림상에서 2번째로 API Server 가 호출되는 시점
```

```
// kubernetes/pkg/proxy/iptables/proxier.go #L298
endpointsChanges:         proxy.NewEndpointChangeTracker(hostname, newEndpointInfo, ipFamily, recorder, nil),
// 위를 보면 proxier(kube-proxy) 는 endpoint의 변화를 tracking 하고 있음.
```

- 코드 해석
  1. Pod 가 삭제되면 PodInformer 를 통해서 Endpointcontroller 에게 Pod 가 삭제되었다고 통보된다.
  2. Pod 가 삭제됨에 따라 Pod 가 연결되어 있던 Service 를 조회한다.
  3. 2번 과정에서 조회된 Service 들을 재 동기화
  4. 재동기화를 통해 Service는 Service는 Endpoints 갱신:
    - 이 과정을 통해서 새롭게 들어오는 트래픽은 다른 곳으로 보내지게 된다.

---

- proxy는 이것저것 엮인게 많이 있어서 iptables 까지 어떻게 바뀌는지는 분석하지 못했지만 이정도면 충분할 것 같다.
