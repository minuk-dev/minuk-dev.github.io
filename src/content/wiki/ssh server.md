---
layout  : wiki
title   : SSH Server Configuration
summary : 
date    : 2020-04-07 20:36:17 +0900
lastmod : 2020-06-27 15:15:35 +0900
tags    : [linux, ssh]
parent  : linux command
---
- Installation

    sudo apt install openssh-server

    sudo vim /etc/ssh/sshd_config

- generate key

    ssh-keygen -R {id}@{host}

    PermitRootLogin prohibit-password
