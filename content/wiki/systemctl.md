---
layout  : wiki
title   : systemctl 중요한것만 정리
date    : 2022-07-31 22:20:31 +0900
lastmod : 2022-07-31 23:07:35 +0900
tags    : [devops]
draft   : false
parent  : devops
---

## 간략 설명
- systemd 를 제어하기 위한 명령어

## 사용하는 것들

```bash
systemctl start <servicename>
systemctl status <servicename>
systemctl kill <servicename> [--signal=SIGABRT]
systemctl status <servicename>
systemctl stop <servicename>

systemctl is-active <servicename>
systemctl reload <servicename>
systemctl restart <servicename>
```

```bash
journalctl -u <servicename> [-o json]
```
