---
layout  : wiki
title   : verilog (베릴로그)
summary : 
date    : 2020-06-25 20:46:51 +0900
lastmod : 2020-06-25 20:53:00 +0900
tags    : [verilog]
draft   : false
parent  : 
---

# 개요 
 * openssd가 verilog가 짜져있어서 읽을수 있을 수준까지 공부하는게 목표

## 출처
 * 기본 문법 : https://blog.naver.com/PostView.nhn?blogId=kyj0833&logNo=221490972642&from=search&redirect=Log&widgetTypeCall=true&directAccess=false
 * 리눅스에서 verilog 사용하기 : https://www.sapphosound.com/archives/1894
## 기본 문법
```verilog
module module_name(port_list);

port, reg, wire, parameter declaration
submodule instance
primitive gate
always, initial
assign,
funciton, task declaration
function, task definition

endmodule
```

### Hello World
```verilog
module main;
  initial
  begin
    $display("Hello World");
    $finish;
  end
endmodule
```
