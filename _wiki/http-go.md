---
layout  : wiki
title   : go snippet for go
date    : 2022-09-02 22:06:05 +0900
lastmod : 2022-09-02 22:30:04 +0900
tags    : [go, http, snippet]
draft   : false
parent  : go
---

## Get, Post Snippet

```go
url := "<url>"

resp, err := http.Get(url)
// resp, err := http.Post(url, "text/plain", reqBody) // reqBody []bytes
// resp, err := http.PostForm(url, url.Values{"Foo":{"Bar"}})
// resp, err := http.Post(url, "application/json", reqBody) // reqBody []bytes; reqBody, err := json.Marshal(data)
if err != nil {
  return err
}
defer resp.Body.Close()

raw, err := ioutil.ReadAll(resp.Body)
if err != nil {
  return err
}

data := struct{
  A, B int
}{}
err = json.Unmarshal(raw, &data)
if err != nil {
  return err
}
```

## With Auth

```go
url := "<url>"
bearer := "Bearer <token>"
req, err := http.NewRequest("GET", url, nil)
if err != nil {
  return err
}

req.Header.Add("Authorization", bearer)
resp, err := http.Do(req)
// skip
```
