---
layout  : wiki
title   : The Future Of Reproducible Research - Powered by Kubeflow
date    : 2022-08-06 00:54:31 +0900
lastmod : 2022-08-06 00:55:39 +0900
tags    : [kubecon, devops, kubeflow]
draft   : false
parent  : kubecon
---


- [출처](https://youtu.be/JiqY5lWbFVE)

---

## Motivation

### Articles About Why Reproducible Research is Important

### The Replication Crisis: What Is It?

- Wikipedia Article Paraphrase:
  - Many scientific studies are difficult or impossible to reproduce.
  - Most prevalent in psychology and medicine, but also serious in other natural and social sciences.
  - Term coined in eary 2010s, gave rise to meta-science discipline.

### The Replication Crisis : Causes

- Wikipiedia Article Paraphrase:
  - C ommodification of Science
  - Publish or Perish Culture in Academia
  - Fraud and otherwise “Questionable” Research Practices
  - Statistical Issues
  - Base Rate Hypotheses Accuracy

### The Replication Crisis: Consequences

- Wikipedia Article Paraphrase:
  - Political repercussions
  - Public awareness and perceptions
  - Response in Academia

### The Replication Crisis: Potential Remedies

- Wikipedia Article Paraphase:
  - Reforms in publishing
  - Statistical Reform
  - Replication Efforts
  - Changes to scientific approach

### My Experience Trying to Reproduce Research

- Grad Student/ Academic Papers
- Working on someone else’s old junk code
- Working on my own old junk code

## What we did

### Tower of Babel: Making Apache Spark, K8s, and Kubeflow Play Nice

### 10 Minute Quick Overview of KF4COVID

- Early days of pandemic - everyone was scared, no solutions were out of bounds.
- Various ERs turned to CT scans and ultrasounds to detect ‘ground glass occlusions’ a hallmark of covid (technique has been used in ERs in the past for rapid pneumonia detection).
- CT Scans deliver high dose of radition
- Low Dose CT Scans deliver, low dose of radiation, but produce ‘noisy’ images.
- We used K8s, Apache Spark, Apache Mahout & Kubeflow to denoise CT Scans

### Rapid Testing Needed -Desperately

- Mental Time Machine - to March 2020.
  - No one understands Coronavirus - but hospitals are being overrune and people are dying.
  - Slow Tests
  - Rapid test “issues”
  - No answer was ‘out of bounds’

### The Pipeline: Overview

- S3 Buckets of images (can be easily swapped out to other image repo)
- PyDiCOM to turn CT scan into numerical matrix, write matrix to disk
- Load matrix in apache spark (~500 MB each) then wrap RDD into Mahout DRM
- DS-SVD on Mahout DRM (why couldn’t do this in Numpy?)
- DS-SVD results in two matrices- one of basis vectors, one of weights per image - to “de noise” you only use first X% of basis vectors. These get output and can be easily rastered using a laptop.

## Call to action / How you can do the same

- Assume they won’t be using your laptop.

### Use Kubeflow

Assuming someone will want to replicate your work, and that they won’t have access to your machine, Kubeflow provides a nice framework for reproducing results.

### What is Kubeflow and Why Will it Help?

- Talk about Kubeflow pipelines- a seris of docker containers that execute steps then hand off data to next step

## Conclusion / Q&A

- Buy our book

---

### 개인 생각

- 전체적으로 유쾌하면서도 전달하고자하는바가 명확한 강연이였다.
- 요약하자면, 과학자들은 실험을 하고 재현하려고 노력하는데 개발자들은 그렇지 않은 경우가 많고, 자신의 컴퓨터에서만 동작하면 끝인줄 안다. 재현 가능함 여부는 굉장히 중요하며 이를 위해서 kubeflow 를 사용했다. + 추가적을 자기 책 사주면 좋겠다.
- kubeflow 를 한번도 안써봐서 좀 찾아봐야겠다. 이런 목표의 프로젝트인지 잘 몰랐다.
- [참고자료](https://litiblue.com/post/kubeflow/)
  - Kubeflow 의 목적은 machine learning workflow 를 kubernetes에 배포하는 것을 단순화 시키는 것
    - 더 빠르고 일관된 배포에 초점을 맞추어 이 강연은 진행되었다.
- 추가적인 궁금점
  - kubernetes 에서 gpu device 는 어떻게 지원되고, 어떻게 세팅되는가
    - 전부를 다 볼필요는 없고 대충 세팅이 가능하다만 국내 블로그 있나 찾아봤다. [있다.](https://velog.io/@h13m0n/3) 그러면 뭐 잘 되나보지 하고 일단 덮어뒀다.
  - kubernetes 에서 gpu 는 어떻게 scheduling 될까?
    - 확실치는 않은데 개수 단위로 요청하는 것 같다. [출처](https://kubernetes.io/ko/docs/tasks/manage-gpus/scheduling-gpus/)
    - 흐음… GPU 머신이 있으면 좋겠는데 조금 아쉽다. 실제로 테스트 해보고 싶은데
