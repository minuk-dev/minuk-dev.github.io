---
layout  : wiki
title   : amazon msk 삽질
summary : 
date    : 2021-08-30 15:23:10 +0900
lastmod : 2021-08-30 15:33:32 +0900
tags    : 
draft   : false
parent  : 
---

## 삽질 목록

### PLAINTEXT 안만들어 놓고 TLS없이 접속하려고 함.
 * MSK 만들때 encryption 에서 똑바로 확인 안하고 무지성으로 만들어서 생긴 문제
 * 해결법 : Plaintext interface 도 열어둠(TLS도 언젠가 사용할지 모르니까 열어둠)

### MSK에 접속이 안된문제
 * 같은 VPC인데 왜 접속이 안되지? 라면서 삽질함
 * 해결법:
   * https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html 에서 18~21번을 안해줬었음
   * 굳이 EC2가 있을때 메뉴얼 따라할 필요가 없다고 생각했는데 보안 설정을 추가로 해줘야한다는 것을 알게됨
   * private ip에 대해서 모든 traffic을 허용해주면 됨.

### Unknown topic
 * Spring 에서 Listener 생성할 때 Unknown topic 이라고 뜨는 문제
 * 해결법:
   * 토픽을 생성을 안해줌
   * https://docs.aws.amazon.com/msk/latest/developerguide/create-topic.html
   * 를 따라서 해줘야한다. 여기서 위에 적힌 접속이 안되는 문제를 겪었음. zookeeper는 위의 보안 그룹만 설정해주면 따라가는 듯?

### The class is not in the trusted packages
 * 문제점 : 데이터를 보낼때 패키지를 못믿겠다고 터지는것
 * 해결법 :
   * 원래는 코딩적으로 패키지마다 풀어줘야하는데, 어짜피 VPC내부에서 보낸것만 받을수 있고, 안정성 때문에 하나하나 풀 이유가 없다고 생각해서 전부 풀어주는 방법을 선택함
   * `spring.kafka.consumer.properties.spring.json.trusted.packages=*`
   * 참고 : https://stackoverflow.com/questions/51688924/spring-kafka-the-class-is-not-in-the-trusted-packages
