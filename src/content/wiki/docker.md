---
layout  : wiki
title   : docker
summary : 
date    : 2020-04-07 20:34:43 +0900
lastmod : 2020-04-08 12:56:58 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---

- install

    curl -fsSL https://get.docker.com/ | sudo sh

- user 추가

    sudo useradd {username} -m -s /bin/bash -G docker

- docker container run

    docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]

-d : detached mode (background mode)

-p : port forwarding from host port to container

-v : mount host directory

-name : configure container name

-rm : remove automatically when process terminated

-it : -i + -t ⇒ interactive terminal

-link : container link

- sample ubuntu 18.04 image

    docker run ubuntu:18.04

    uml
    docker
