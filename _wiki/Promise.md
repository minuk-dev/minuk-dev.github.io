---
layout  : wiki
title   : Promise 정리
date    : 2020-04-07 20:22:09 +0900
lastmod : 2022-03-15 02:30:12 +0900
tags    : [js, promise]
draft   : false
---

# ## Synchronous vs Asynchronous

## Callback hell

```js
    CallEndpoint("api/getidbyusername/hotcakes", function(result) {
    	CallEndpoint("api/getfollowersbyid/" + result.userID, function(result) {
    		CallEndpoint("api/someothercall/" + result.followers, function(result) {
    			CallEndpoint("api/someothercall/" + result, function(result) {
    				// do something...
    			});
    		});
    	});
    });
```

## Promise

## Async, Await

References

[The Great Escape from Callback Hell](https://medium.com/@js_tut/the-great-escape-from-callback-hell-3006fa2c82e)
