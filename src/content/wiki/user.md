---
layout  : wiki
title   : linux user command
summary : 
date    : 2020-04-07 20:35:41 +0900
lastmod : 2020-04-08 13:03:45 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---

- check username

    cat /etc/passwd | grep {username}

- create user & select default shell

    useradd {username} -m -s /bin/bash

- password

    echo {password} | passwd --stdin {username}

- home directory

    mkhomedir_helper {username}
