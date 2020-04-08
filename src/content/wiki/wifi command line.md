---
layout  : wiki
title   : Wifi commands
summary : 
date    : 2020-04-07 20:35:07 +0900
lastmod : 2020-04-08 12:58:44 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---

- Wifi Adapter 찾기

    iw dev

- Adapter status

    ip link show wlp2s0

- Adapter Start

    ip link set wlp2s0 up
    # When Operation fail because of rfkill
    
    # $rfkill list
    # $sudo rfkill unblock wifi

- Wifi Adapter interface check

    iw wlp2s0 link

- Wifi Scan

    iw wlp2s0 scan

- Public Wifi Connect

    sudo iw dev wlp2s0 connect iptime

- WPA/WPA2 Wifi Connect

    $ sudo wpa_passphrase ${SSID} > wpa_supplicant.conf
    ${password}
    
    $ sudo wpa_supplicant -B -i wlp2s0 -c wpa_supplicant.conf

- dhcp

    sudo dhclient wlp2s0
