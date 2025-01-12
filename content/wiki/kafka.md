---
layout  : wiki
title   : Kafka
summary : 
date    : 2021-12-13 16:07:50 +0900
lastmod : 2021-12-13 16:36:06 +0900
tags    : 
draft   : false
parent  : 
---

## Kafka
 * Apache Kafka is an event streaming platform
 * publish-subscribe model(producer, consumer, broker)

### Topic, Partition, Offset
 * Topic : 특정 스트림 데이터이며, 카프카 클러스터에서 데이터를 관리할 때 기준이 된다.:
   * Similar to a table in a database (without all the constraints)
   * 원하는 수만큼 토픽을 만들 수 있다.
   * 토픽의 구별자는 토픽의 이름이다.
   * 토픽은 파티션으로 나누어 처리되며, 각 파티션은 순서가 있고, 각각의 파티션 내 메시지는 offset이라는 단위로 고유 id가 증가한다.:
 * Parition : 각 토픽 당 데이터를 분산처리하는 단위. 카프카에서는 토픽 안에서 파티션을 나누어 그 수대로 데이터를 분산처리 한다. 카프카 옵션에서 지정한 replica의 수만큼 파티션이 각 서버들에게 복제된다.
 * offset은 특정 partition에서만 의미가 있으며 순서 또한 파티션 내에서만 보장된다.
 * 데이터의 기본 보존 주기는 7일이고 log.retention.hours 설정을 통해서 변경 가능하다.
 * 데이터가 특정 파티션에 쓰여지게 된다면 절대 변경되지 않는다.
 * 특정 키로 파티션을 지정하지 않는다면, 데이터는 랜덤하게 파티션이 지정되어 쓰여진다.

### Broker
 * Kafka Cluster 는 여러대의 broker로 구성된다.
 * 각 broker는 고유한 id로 구분되며, 특정한 topic partition을 포함한다.
 * bootstrap broker라 불리는 어떤 broker에나 연결이 된다면, 전체 클러스터에 연결된 것이다.
 * 일반적으로 3개의 broker로 운영을 하는게 이상적이지만 규모에 따라서 여러개로 늘릴 수 있다.
 * Replication Factor:
   * Kafka topic 파티션의 Replication Factor(RF)는 broker 설정 중 `offsets.topic.replication.factor`에 의해 결정 된다. 기본값은 3으로, 하나의 파티션이 총 3개로 분산되어 저장된다.
   * 1개의 broker만이 특정 파티션의 leader가 될 수 있고, leader만이 해당 파티션의 데이터를 송수신 가능하다.

### Producer
 * Producer는 topic에 데이터를 write한다.
 * Producer는 데이터를 쓸때 어떤 브로커와 파티션에 데이터를 write할지 알고 있다.
 * Producer는 데이터를 write 할 때의 receive acknowledgment를 선택할 수 있다.:
   * acks=0 : Producer는 acknowledgement 를 기다리지 않음
   * acks=1 : producer는 leader acknowledgment를 기다렸다가 다음 액션을 한다.
   * acks=all : leader + ISR acknowledgment를 모두 기다린다.
 * Message keys:
   * Producer는 메시지 데이터와 함께 key를 선택하여 보낼 수 있다.
   * key=null 이라면, 데이터는 라운드로빈 동작으로 브로커에 순차적으로 데이터를 송신한다.
   * key를 지정하여 데이터를 송신하면, 해당 key로 보내지는 데이터는 항상 같은 파티션으로 보내진다.

### Consumer & Consumer Group
 * Consumer는 topic에 있는 데이터를 read한다.
 * Consumer는 데이터를 읽을 때에 자동적으로 어떤 브로커와 파티션에서 데이터를 read할 지 알고 있게 된다.
 * 데이터는 각 파티션 내에 순서대로 읽어온다.

 * Consumer Groups:
   * Consumer는 Consumer Group 안에 속하여 데이터를 read하게 된다.
   * 그룹 내의 각 Consumer는 서로 다른 partition에 할당된다.
   * 컨슈머의 수가 파티션의 수보다 많다면 컨수머는 놀게 된다.
   * 컨수머는 자동적으로 GroupCoordinator와 ConsumerCoordinator를 사용하여 컨슈머와 파티션을 할당한다.

 * Consumer Offsets:
   * 특정한 consumer가 어디까지 reading 했는지에 대한 offset정보를 저장하고 있다. `__consumer_offsets`
 * 3 delivery semantic:
   * at most once:
     * offsets are committed as soon as the message is received. 메시지가 도착하는 즉시 offsets 은 커밋된다.
     * If the processing goes wrong, the message will be lost (it won't be read again). 처리가 잘못 되었을 때 메시지는 손실된다.
   * at least once (usually perferred):
     * offsets are committed after the message is processed. 메시지가 처리되면 offset이 commit 된다.
     * If the processing goes wrong, the message will be read agian. 처리가 잘못된다면, 동일한 메시지가 다시 읽힐 수 있다.
     * This can result it duplicate processing of messages. Make sure your processing is idempotent. 결과적으로 동일한 메시지의 중복된 처리를 읽으키기 때문에, 처리가 멱등성을 지녀야한다.(재처리 된다고 하더라도 상관 없어야한다.)
   * Exactly once:
     * Can be archieved for kafka
     * For kafka, External System workflows, use an idempotent consumer.

### Zookeeper
 * zookeeper는 분산 코디네이션 시스템이다.
 * 카프카 브로커는 하나의 클러스터로 코디네이팅하는 역할을 하며, 카프카 클러스터의 리더(Leader)fㅡㄹ 발탁하는 방식을 제공한다.
 * 새로운 토픽 생성, 브로커 서버 다운 등 모든 카프카 클러스터 내 변화들에 대하여 알림을 준다.
 * 카프카는 언제나 주키퍼가 존재해야한다.
 * 일반적으로 주키퍼는 홀수개로 운영된다.
 * consumer offset은 zookeeper가 아닌 kafka topic에 저장되도록 되어 있다.
