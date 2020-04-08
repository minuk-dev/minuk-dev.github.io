---
layout  : wiki
title   : SSH Server Configuration
summary : 
date    : 2020-04-07 20:36:17 +0900
lastmod : 2020-04-08 13:05:04 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
- Installation

    sudo apt install openssh-server

    sudo vim /etc/ssh/sshd_config

- generate key

    ssh-keygen -R {id}@{host}

    PermitRootLogin prohibit-password
