---
layout  : wiki
title   : Simple한 File Server
summary :
date    : 2021-12-03 04:07:49 +0900
lastmod : 2021-12-03 04:17:12 +0900
tags    :
draft   : false
parent  :
---

## 요약
 * script
```bash
python3 -m http.server 8000
```
 * nginx configuration
```
 location /file/ {
                rewrite ^/file/(.*)$ /$1 break;
                client_max_body_size 50M;
                proxy_pass http://localhost:8000;
                proxy_redirect http://localhost:8000 $scheme://$http_host/;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

                # websocket headers
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection $connection_upgrade;
                proxy_set_header X-Scheme $scheme;
                proxy_buffering off;
        }
```
 * 스크린샷
 ![simple-file-1](/wiki/images/simple-file.png)

## 이유
 * 이야기하다가 파일 공유해야할 일이 있는데 카카오톡은 300M, 디스코드는 100M인데 파일 보내주기 불편해서 사용한다.
 * 업로드가 어려운 구조이다보니 나중에 개인 프로젝트로 개발할듯:
   * 관리자는 키를 발급할 수 있고 이는 짧은 문자열이다.(단순히 불러줄 수 있게)
   * 키는 6글자 영어소문자와 숫자, 혼동되지 않는 특수문자를 포함하도록 한다.
   * 관리자가 키를 발급하는 것은 반드시 cli 환경에서 가능해야한다. (ssh로 접속해서 할 수 있도록)
   * 발급한 키는 업로드만 가능하다.
   * 다운로드는 서버를 순간적으로 키는 것으로 한다.(항상 켜긴 좀... 이건 나-중에 키에 권한 부여 어캐할지 고민해보면 생각함)
   * 언어는 java가 편할듯 하지만, go를 배워서 해보고 싶다는 생각은 있다.

