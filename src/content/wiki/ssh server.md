---
layout  : wiki
title   : 
summary : 
date    : 2020-04-07 20:36:17 +0900
lastmod : 2020-04-07 20:36:19 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# - Installation

    sudo apt install openssh-server

    sudo vim /etc/ssh/sshd_config

- generate key

    ssh-keygen -R {id}@{host}

    PermitRootLogin prohibit-password
