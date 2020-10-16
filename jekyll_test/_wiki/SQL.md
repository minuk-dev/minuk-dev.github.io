---
layout  : wiki
title   : SQL
summary : 
date    : 2020-04-07 20:34:32 +0900
lastmod : 2020-04-08 12:56:35 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---

## Mysql User Create

    create user 'username'@'localhost' identified by 'password'

## Grant privileges

    grant all privileges on *.* to 'username'@'localhost';
    grant all privileges on 'DBname'.* to 'username'@'localhost';

## Drop User

    drop user 'username'@'localhost';

## Create Database

    CREATE DATABASE 'DBname';

## Create Table

    CREATE TABLE table_name
    (
    column1 data_type(size),
    column2 data_type(size),
    column3 data_type(size),
    ...
    )
