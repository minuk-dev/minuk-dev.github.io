---
layout: wiki
title: Enterprise-Integration-Patterns
date: 2025-01-02 05:49 +09:00
lastmod: 2025-01-02T06:03:07+09:00
tags: 
draft: true
parent: 
---

## 책을 읽게 된 계기
- 이벤트기반 아키텍쳐에 대해서 이야기할 일이 있었는데, 이 책도 안읽어봤다는 것에 대해서 팀 리드분이 약간 부정적인 말을 해서
	- 책을 읽어봐야겠다는 생각은 했지만, 개인적으로 사람을 무시하는 듯한 발언들을 섞어가면서 독성말투로 그렇게 말을 해야하나 싶다. 요즘 진짜 현타가 많이 오는거 같다.

- 책은 조금만 구글링 하면 어렵지 않게 github 에 raw pdf 로 올라온걸 찾을수 있다.

## Preface
### Who Should Read This book
- Application architects and developers
- Integration architects and developers
- Enterprise Architects

### What You Will Learn
- The advantages and limitations of messaging as compared to other integration techniques
- How to determine the message channels your applications will need, how to control whether multiple consumers can receive the same message, and how to handle invalid messages
- When to send a message, what it should contain, and how to use special message properties
- How to route a message, what it should contain, and how to use special message properties
- How to route a message to its ultimate destination even when the sender does not know where that is
- How to convert messages when the sender and receiver do not aggre on a common format
- How to design the code that connects and application to the messaging system
- How to manage and monitor and messaging system once it's in use as part of the enterprise

## Introduction

- All integration solutions have to deal with a few fundamental challenges:
	- Networks are unreliable.
	- Networks are slow.
	- Any tow applications are different.
	- Change is inevitable.

- Over time, developers have over come these challenges with four main approaches:
	- File transfer
	- Shared Database
	- Remote Procedure Invocation
	- Messaging

### What is Messaging?
- Messaging is a technology that enables high-speed, asynchronous, program-to-program communication with reliable delivery.
- The message itself is simple some sort of data structure

### What is a Messaging System?
- In essence, a message is transmitted in five steps:
	1. Create - The sender creates the message and populates it with data.
	2. Send - The sender adds the message to a channel.
	3. Deliver - The messaging system moves the message from the sender's computer to the receiver's computer, making it available to the receiver.
	4. Receive - The receiver reads the message from the channel.
	5. Process - The receiver extracts the data from the message.

- Two important messaging concepts:
	- Send and forget
	- Store and forward

### Why Use Messaging?
- Specific benefits of messaging include:
	- Remote Communication.
	- Platform/Language Integration.
	- Asynchronous Communication.
	- Variable Timing.
	- Throttling.
	- Reliable Communication.
	- Disconnected Operation.
	- Mediation
	- Thread Management.

### Challenges of Asynchronous Messaging
- Complex programming model.
- Sequence issues.
- Synchronous scenarios.
- Performance.
- Limited platform support.
- Vendor lock-in.

### Thinking Asynchronously
- Asynchronous communication has a number of implications:
	- Multiple threads enable sub-procedures to run concurrently.
	- Results arrive via a callback.
	- Asynchronous sub-processes can execute in any order.

### Distributed Applications vs. Integration
