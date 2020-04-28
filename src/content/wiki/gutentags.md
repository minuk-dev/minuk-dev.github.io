---
layout  : wiki
title   : gutentags
summary : 
date    : 2020-04-28 21:21:45 +0900
lastmod : 2020-04-28 21:24:10 +0900
tags    : [vim, gutentags]
draft   : true
parent  : 
---

## 발생한 문제점
* `git` 에서 커밋할때마다 아래와 같은 에러로그가 뜬다
```
hint: Waiting for your editor to close the file...
Error detected while processing DirChanged Autocommands for "*":
E475: Invalid argument: Channel doesn't exist
E475: Invalid argument: Channel doesn't exist
Error detected while processing function <SNR>149_nvim_job_exit_wrapper[1]..gutentags#ctags#on_job_exit[1]..gutentags#remove_job_by_data[2]..gutentags#remove_job:
line   22:
```

* 해결책 : 아래줄을 추가해줘서 특정 filetypes를 제외해준다. 일단 지금은 gitcommit 만 필요해서 처리했고 나머진 나중에 천천히 추가할 예정
```vimrc
 let g:gutentags_exclude_filetypes = ['gitcommit']
```
