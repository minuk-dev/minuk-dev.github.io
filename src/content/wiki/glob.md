---
layout  : wiki
title   : glob
summary : 
date    : 2020-04-13 22:06:38 +0900
lastmod : 2020-06-27 15:14:23 +0900
tags    : [linux, glob, cli, bash, zsh, regex]
draft   : false
parent  : linux command
---

## glob
### Wikipedia
  In computer programming, glob patterns specify sets of filenames with wildcard characters. For example, the Unix Bash shell command mv *.txt textfiles/ moves (mv) all files with names ending in .txt from the current directory to the directory textfiles. Here, * is a wildcard standing for "any string of characters" and *.txt is a glob pattern. The other common wildcard is the question mark (?), which stands for one character.  In addition to matching filenames, globs are also used widely for matching arbitrary strings (wildcard matching).  In this capacity a common interface is fnmatch.
  
### 내 나름 요약
  `glob` 패턴은 컴퓨터 프로그래밍에서 와일드카드를 사용해서 파일을 선택할때 사용한다.

| wildcard | Description                             | Example     | Matches              | Does not match |
|----------|-----------------------------------------|-------------|----------------------|----------------|
| *        | 모든 문자들 매칭 (아무것도 없어도 포함) | Law*        | Law, Laws or Lawyer  | GrokLaw        |
| ?        | 아무 문자 매칭                          | ?at         | Cat, cat, Bat or bat | La or Law      |
| [abc]    | 괄호 안 문자 중 하나                    | [CB]at      | Cat or Bat           | cat or bat     |
| [a-z]    | 괄호 범위 문자 중 하나                  | Letter[0-9] | Letter0, Letter1     | Letters        |

### 특이한 거
 * `bash` 에서 not 은 `!`, `zsh` 에서 not 은 `^`
 * `regex`랑 비교하면 `?` 은 `.`, `*` 은 `.*` 와 동일
