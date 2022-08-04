---
layout  : wiki
title   : dockerfile
summary : dockerfile 만들때마다 까먹어서 만들어두는 cheatsheet
date    : 2022-08-04 13:57:13 +0900
lastmod : 2022-08-04 14:09:17 +0900
tags    : [devops, docker, dockerfile]
draft   : false
parent  : devops
---

```
FROM ubuntu:20.04
MAINTAINER Min Uk Lee <minuk.dev@gmail.com>

LABEL lmu-version="v0.1.0"
VOLUME ["/home/lmu/tools/volume-for-docker/base"]

# Build time
ARG BASE_URL 0.0.0.0

# Runtime
ENV PREFIX /api

COPY app.py /app.py

RUN \
    apt-get update && \
    apt-get install -y python3

RUN useradd lmu
USER lmu

EXPOSE 80

WORKDIR /root/
ENTRYPOINT ["sleep", "4800"]
CMD ["echo", "$PREFIX"]
```
