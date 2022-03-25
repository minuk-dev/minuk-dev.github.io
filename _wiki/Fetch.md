---
layout  : wiki
title   : Fetch 문법 간단 정리
date    : 2020-04-07 20:22:29 +0900
lastmod : 2022-03-15 02:33:06 +0900
tags    : [js, fetch]
draft   : false
parent  : Javascript
---

# Basic Usage

```js
    const queryData = {
    	query:`
    query {
      hello,
      persons {
        name,
      }
    }`
    };
    const headers = new Headers({
      "Accept" : "application/json",
      "Content-Type" : "application/json"
    });

    const fetchPromise = fetch('/graphql', {
        headers,
        method: "POST",
        body: JSON.stringify(queryData),
    });

    fetchPromise
    	.then(response => response.clone().json()) // avoid reponse lock
    	.then(data => console.log);
```
