---
layout  : wiki
title   : ftp server command
summary : 
date    : 2020-04-07 20:35:51 +0900
lastmod : 2020-04-08 13:04:00 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
- use vsftpd(Very Secure FTP Server Daemon)

## Installation

    # apt install vsftpd

## check vsftpd status

    # service vsftpd status

## check network port

    # netstat -natp | grep ftp

## Configuration vsftpd

    # vi /etc/vsftpd.conf

    #/etc/vsftpd.conf
    listen=YES
    listen_ipv6=NO
    anonymous_enable=NO
    port_enable=NO
    pasv_enable=YES
    local_enable=YES
    write_enable=YES
    use_localtime=YES
    xferlog_enable=YES
    chroot_local_user=YES
    allow_writeable_chroot=YES
    secure_chroot_dir=/var/run/vsftpd/empty
    pam_service_name=vsftpd
    ftpd_banner=Welcom to My FTP Server!
    ssl_enable=YES
    rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
    rsa_private_key=/etc/ssl/private/ssl-cert-snakeoil.key
    listen_port=21
    pasv_min_port=60020
    pasv_max_port=60030
    #utf8_filesystem=YES
    #local_umask=022
