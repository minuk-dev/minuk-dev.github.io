---
layout  : wiki
title   : Promise 정리
summary : 
date    : 2020-04-07 20:22:09 +0900
lastmod : 2020-04-08 12:48:44 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---

# ## Synchronous vs Asynchronous

## Callback hell

    CallEndpoint("api/getidbyusername/hotcakes", function(result) {
    	CallEndpoint("api/getfollowersbyid/" + result.userID, function(result) {
    		CallEndpoint("api/someothercall/" + result.followers, function(result) {
    			CallEndpoint("api/someothercall/" + result, function(result) {
    				// do something...
    			});
    		});
    	});
    });

## Promise

## Async, Await

References

[The Great Escape from Callback Hell](https://medium.com/@js_tut/the-great-escape-from-callback-hell-3006fa2c82e)
