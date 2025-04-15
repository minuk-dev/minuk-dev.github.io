---
layout: wiki
title: OTel Sucks (But Also Rocks!)
date: 2025-04-16 02:09:44 +0900
lastmod: 2025-04-16 02:43:45 +0900
tags: 
draft: false
parent: 
---
Original Article: https://opentelemetry.io/blog/2025/otel-rocks/
구글 번역과 함께 번역하였습니다.

---

OpenTelemetry (Otel) 은 vendor 중립성과 포괄적인 data collection 을 약속하며, Observability 의 미래로서 종종 선전됩니다. 하지만 OTel 을 매일 쓰는 사람들의 현실은 어떨까요? 몇몇 엔지니어들과 SRE들과 필터링되지 않은 Otel에 대한 생각을 들어보았습니다. 그 결과는? OTel을 사용하면서 느꼈던 좋은 점, 나쁜 점, 그리고 때로는 답답한 점에 대한 솔직한 대화입니다.
KubeCon talk ["OTel Sucks (But Also Rocks!)"](https://sched.co/1txHm) 를 준비하며, Juraci 는 커뮤니티 맴버들과 이야기하면서 가치있는 인사이트를 모았습니다. 시간 제약상 모든 내용을 발표에 담지는 못했지만, 커뮤니티의 기여를 공정하게 하려고 시도했습니다.

# OTel의 부족한 점
엔지니어와 SRE는 OTel에 대한 솔직한 생각을 나누며 공통적으로 직면한 어려움에 대해서 이야기 나눴습니다. Delivery Hero의 Elena는 "안정적인 collector 버전의 부재" (번역: 각주 1)와 "빠른 변화 속도"가 어렵다고 했습니다. 빈번한 업데이트는 프로덕션 안정성을 유지하기 위해 지루한 점검과 테스트를 필요하기 때문입니다.

Atlassian의 James와 Pismo의 Alexandre는 semantic conventions (번역: 각주 2)의 변경으로 인한 좌절감을 표현했습니다. semantic conventions 이 변경되면, 기존 대시보드를 손상시킬 수 있으며, 대규모 시스템 전반의 계측(Instrumentation)을 업데이트하는 데 상당한 노력이 필요하게 됩니다. Alexandre는 특히 개발자들이 달가워하지 않는, attributes 변경을 회사 전체에 지시하는게 어렵다고 했습니다.

Liatrio의 Adriel은 "계측은 어렵다"며, 방대한 양의 정보와 옵션으로 인해 시작하는 것이 어려울 수 있다 집었습니다. 또한 수동 계측이 초기 장벽으로써 극복하기 어렵게 한다고 말했습니다. James는 강력하지만 때로는 디버깅하기 어려운 예기치 않은 문제로 이어질 수 있는 Java 에이전트의 "magic" (번역: 각주 3)에 대해서도 이야기했습니다.

모든 사람들은 OTel과 관련하여 학습 곡선이 있다는 데 동의했으며, 특히 Collector, 구성 및 의미 규칙을 이해하는 데 어려움이 있었습니다. Adriel은 "OTel을 이해하는 데 많은 개념적 오버헤드가 필요했습니다."라고 언급했습니다. Alexandre는 또한 문서가 개선되고 있지만, 더 많은 예시가 필요하다는 점을 언급했습니다. (번역: 각주 4)

# OTel이 탁월한 이유
인터뷰 대상자들은 이러한 어려움에도 불구하고 OTel의 중요한 이점을 인정했습니다.

예를 들어, Pismo의 Alexandre는 Vendor 중립성의 중요성을 강조했습니다. OTel을 사용하면 특정 생태계에 얽매이지 않고 모든 데이터를 통합하고 원하는 공급업체로 전환할 수 있습니다.

Atlassian의 James는 OTel의 모듈식 설계를 칭찬했습니다. 이 설계는 사용자가 문제가 발생할 경우 작은 모듈식 부품을 교체할 수 있도록 해줍니다. 이러한 유연성은 특히 설정을 맞춤 설정해야 하는 고급 사용자에게 매우 중요합니다.

Delivery Hero의 Elena는 OTel을 통해 로그에서 분산 추적으로 전환하는 것이 얼마나 획기적인 변화를 가져왔는지 공유했습니다. 그녀는 로그로 돌아가는 경험이 "비효율적"이었다고 설명했습니다. James는 또한 Java Agent가 모놀리식 애플리케이션에 대한 "전에 볼 수 없었던 놀라운 그림"을 제공한다고 강조했습니다.

OTel 커뮤니티에 깊이 관여하고 있는 Adriel은 오픈 소스의 가치와 기여 가능성을 강조했습니다. 그는 "처음 시작하는 데 어려움을 겪는 단계를 넘어설 수 있도록 도와주면, 그 이후로는 마치 바람처럼 쉬워지고 매우 강력해집니다."라고 말했습니다.

Pismo의 Alexandre는 OTel을 활용한 Tail Sampling 구현을 통해 관측 비용을 대폭 절감한 매력적인 사례를 공유했습니다. 리소스 할당을 최적화하고 Collector over-scaling 을 방지할 수 있었습니다.

마지막으로 Alexandre는 관측 관행에 표준화를 도입하는 데 있어 OTel의 역할을 강조했습니다. OTel 도입 이전에는 Vendor-specific 라이브러리와 내부 수집기가 혼재되어 있어 일관성이 부족하고 traces 가 끊기게 문제가 되었었습니다. OTel은 "단일 라이브러리, 단일 표준"을 제공하여 데이터 품질을 크게 향상시켰습니다.


# 커뮤니티에 대한 이야기
OpenTelemetry 커뮤니티는 회원들에게 높은 평가를 받고 있으며, Adriel Perkins는 사람들과의 즐거운 소통 덕분에 처음으로 오픈 소스에 적극적으로 참여하게 되었다고 말했습니다. 그는 항상 기꺼이 조언을 아끼지 않는 밝고 친절하며 도움이 되는 많은 분들이 있다는 점을 강조합니다. 커뮤니티 회원들은 풍부한 경험을 바탕으로 유명하며, Adriel은 이러한 경험이 자신이 엔지니어로서 성장하는 데 도움이 되었다고 생각합니다. 또한, 이 커뮤니티는 매우 친절하고 열정적이며 프로젝트의 미래에 대한 기대감이 큰 것이 특징입니다. 회원들은 때로는 직설적일 수 있지만, 일반적으로 정중하고 친절합니다.

James Moessis는 또한 기여자들이 커뮤니티 내 헌신적인 구성원들의 코드 검토를 기대할 수 있으며, 개발자들은 기여에 적극적이라고 강조합니다. 기여자 경험 설문조사는 기여자 경험을 이해하고 개선하려는 커뮤니티의 노력을 보여줍니다. 전반적으로 커뮤니티는 회원들이 배우고 성장할 수 있는 상호 지원적이고 협력적인 환경을 조성합니다.


# 평결
인터뷰를 통해 OTel과의 복잡한 관계가 드러났습니다. 완벽한 솔루션은 아니며, 상당한 어려움이 따릅니다. 하지만 복잡성을 기꺼이 헤쳐나가려는 사람들에게 OTel은 강력한 기능과 상당한 이점을 제공합니다. Atlassian의 James는 "OTel이 아무리 성능이 좋지 않더라도, 좋은 점은 여기저기 작은 모듈식 부품들을 교체할 수 있도록 설계되었다는 것입니다."라고 말했습니다.

궁극적으로 OTel의 가치는 유연성, 벤더 중립성, 그리고 복잡한 시스템에 대한 심층적인 통찰력에 있습니다. 성장 과정의 어려움과 개선의 여지가 있지만, OTel은 의심할 여지 없이 강력한 Observability 도구입니다.

OpenTelemetry에 대한 솔직하고 통찰력 있는 경험을 공유해 주신 Elena Kovalenko, James Moessis, Adriel Perkins, Alexandre Magno에게 감사드립니다. 이들의 이야기는 OTel 도입을 고려 중이거나 현재 사용 중인 모든 사람들에게 귀중한 관점을 제공합니다.

---
- 각주 1: opentelemetry-collector 는 최초 등장한 시점에 비해 오랫동안 안정적이지 못하였다. major 버전이 1로 올라갔으나, 사용자들은 오랫동안 major 0버전을 사용하였으며, 현 시점에는 [v1.30.0/v0.124.0](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.124.0) 이 가장 최신버전이다. [0.63.0](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.63.0) 버전이 2022/10/27 에 릴리즈 된걸 감안한다면, 약 2년 반동안 60 버전 넘게 업그레이드가 되었고, 이 과정중에 수많은 기능들이 deprecated 되어, 버전을 따라가려면 configuration 업그레이드에 피로도가 높다.
- 각주 2: opentelemetry 는 [semantic conventions](https://opentelemetry.io/docs/concepts/semantic-conventions/) 을 제시하고 있으며, 이를 표준이라고 하지만 development 단계에 있는 기능들이 많으며, beta 정도가 되지 않는한 생각보다 변경이 빈번하게 일어난다. 하지만 현실에서는 development 단계에 있는 기능을 감수하고 써야하는 경우가 많다.
- 각주 3: opentelemetry 는 java 에 관해서 auto instrumentation 을 위하여 [agent](https://opentelemetry.io/docs/zero-code/java/agent/) 를 제공하고 있으며, 실행 시점에 옵션을 주어 주입할수 있다. 이는 코드 변경 없이 Otel 을 적용할수 있는 매력적인 방법이며 [opentelemetry kubernetes operator](https://opentelemetry.io/docs/platforms/kubernetes/operator/automatic/#java) 도 옵션을 사용해서 [해당 마법](https://github.com/open-telemetry/opentelemetry-operator/blob/e330c69f57cd3f995c04866765656122d27fadc5/pkg/instrumentation/javaagent.go#L16)을 사용할수 있다. 다른 언어들도 일부 지원하지만, java 가 해당 하는 기능의 메인스트림으로써 커뮤니티에서 동작하고 있다. 단, 해당 마법을 사용하면, opentelemetry 에 대한 이해도가 충분하지 않은 채로 사용하기 때문에 사이드 이펙트가 발생할수 있고, 적용한 사람도 본인의 문제를 잘 설명하지 못하는 경우가 많다.
- 각주 4: opentelemetry를 어떻게 해야 잘 쓰는지에 대한 가이드가 꽤 오랫동안 없는 상태였다. 최근 나온 [Mastering OpenTelemetry and Observability: Enhancing Application and Infrastructure Performance and Avoiding Outages](https://www.amazon.com/Mastering-OpenTelemetry-Observability-Application-Infrastructure/dp/1394253125) 책이 그나마 현 시점에서 가장 읽을만하다고 생각한다.

---
# 번역 후기
- 장점은 크게 각주가 필요가 없는 느낌인데, 단점은 각주가 . 좀많이 필요했던거 같다. 배경지식이 없는 사람도 읽을수 있도록 노력했으나 쉽지 않은거 같다.
- 영어로 읽으면 뭔가 잘 안 와닿아서 번역하면서 읽었는데 잘한거 같다.
- 번역하면서 구글번역기를 많이 사용했는데, 왜 다들 번역투로 쓰는지 알거 같다. 생각보다 자연스럽게 번역하려면 내 생각이 개입되는 느낌이라 최대한 직역하게 되는거 같다.