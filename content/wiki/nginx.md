---
layout  : wiki
title   : nginx
summary : 
date    : 2020-04-07 22:51:14 +0900
lastmod : 2021-08-27 15:25:43 +0900
tags    : [web, nginx]
parent  : web
---
# Nginx 관련

## lmu.makerdark98.dev 설정
```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	server_name _;
}

map $http_upgrade $connection_upgrade {
	default upgrade;
	''      close;
}

charset           utf-8;

server {
	charset        utf-8;
	server_name lmu.makerdark98.dev; # managed by Certbot
	rewrite ^/rstudio$ $scheme://$http_host/rstudio/ permanent;
	rewrite ^/api$ $scheme://$http_host/api/ permanent;

	location / {
		proxy_pass http://localhost:3000;
		proxy_redirect http://localhost:3000/ $scheme://$http_host/;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection $connection_upgrade;
		proxy_read_timeout 20d;
	}

	location /api/ {
		rewrite ^/api/(.*)$ /$1 break;
		proxy_pass http://localhost:9999;
		proxy_redirect http://localhost:9999/ $scheme://$http_host/api;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection $connection_upgrade;
		proxy_read_timeout 20d;
	}
	location /rstudio/ {
		rewrite ^/rstudio/(.*)$ /$1 break;
		client_max_body_size 50M;
		proxy_pass http://localhost:8787;
		proxy_redirect http://localhost:8787/ $scheme://$http_host/rstudio/;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection $connection_upgrade;
		proxy_read_timeout 20d;
	}

	location /jupyter/ {
		rewrite ^/(.*)$ /$1 break;
		client_max_body_size 50M;
		proxy_pass http://localhost:8888;
		proxy_redirect http://localhost:8888 $scheme://$http_host/;
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

	listen [::]:443 ssl ipv6only=on; # managed by Certbot
		listen 443 ssl; # managed by Certbot
		ssl_certificate /etc/letsencrypt/live/lmu.makerdark98.dev/fullchain.pem; # managed by Certbot
		ssl_certificate_key /etc/letsencrypt/live/lmu.makerdark98.dev/privkey.pem; # managed by Certbot
		include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
		ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
	if ($host = lmu.makerdark98.dev) {
		return 301 https://$host$request_uri;
	} # managed by Certbot


	listen 80 ;
	listen [::]:80 ;
	server_name lmu.makerdark98.dev;
	return 404; # managed by Certbot


}
```

## Nginx log위치

    /var/log/nginx/access.log
    /var/log/nginx/error.log
