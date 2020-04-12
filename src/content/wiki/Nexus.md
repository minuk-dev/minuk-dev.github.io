---
layout  : wiki
title   : Nexus
summary : 
date    : 2020-04-07 20:21:19 +0900
lastmod : 2020-04-12 20:37:29 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# docker 설치

    sudo apt install apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
    sudo apt update
    sudo apt install docker-ce -y

# nexus 실행

    sudo docker volume create --name nexus-data
    sudo docker run -d -p 8081:8081 --name nexus -v nexus-data:/nexus-data sonatype/nexus3

# nexus bash 실행

    sudo docker exec -it 7f1dc6675c11 /bin/bash
# [[Docker Volume]]
