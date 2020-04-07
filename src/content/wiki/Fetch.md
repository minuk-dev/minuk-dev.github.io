---
layout  : wiki
title   : 
summary : 
date    : 2020-04-07 20:22:29 +0900
lastmod : 2020-04-07 20:22:31 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# # Basic Usage

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
