---
layout  : wiki
title   : Firewall (방화벽) Configuration
summary : 
date    : 2020-04-07 20:36:02 +0900
lastmod : 2020-04-08 13:04:48 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
- iptables

    #iptables -nL

## save firewall configuration

    #iptalbes-save > save_data.rules

## config firwall

- 아이피 111.222.111.222에 대해서 destination port 가 22이면 ACCEPT 하여라.

    #iptables -A INPUT -s 111.222.111.222/32 -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT-

## save configuration persistent

    #apt install iptables-persistent

- rule directory : `/etc/iptables/rules.v4`

    #iptables-save > /etc/iptables/rules.v4
