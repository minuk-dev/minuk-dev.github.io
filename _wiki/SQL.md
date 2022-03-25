---
layout  : wiki
title   : SQL
summary : 가끔 써서 잘 기억 안나는 sql
date    : 2020-04-07 20:34:32 +0900
lastmod : 2022-03-26 03:28:59 +0900
tags    : [sql]
public  : true
parent  :
latex   : false
---

## Mysql User Create
```sql
create user 'username'@'localhost' identified by 'password'
```

## Grant privileges

```sql
grant all privileges on *.* to 'username'@'localhost';
grant all privileges on 'DBname'.* to 'username'@'localhost';
```

## Drop User

```sql
drop user 'username'@'localhost';
```

## Create Database

```sql
CREATE DATABASE 'DBname';
```

## Create Table

```sql
CREATE TABLE table_name
(
column1 data_type(size),
column2 data_type(size),
column3 data_type(size),
...
)
```
