---
layout  : wiki
title   : 
summary : 
date    : 2020-04-07 20:35:41 +0900
lastmod : 2020-04-07 20:35:42 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# - check username

    cat /etc/passwd | grep {username}

- create user & select default shell

    useradd {username} -m -s /bin/bash

- password

    echo {password} | passwd --stdin {username}

- home directory

    mkhomedir_helper {username}
