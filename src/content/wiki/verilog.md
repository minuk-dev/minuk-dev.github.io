---
layout  : wiki
title   : verilog (베릴로그)
summary : 
date    : 2020-06-25 20:46:51 +0900
lastmod : 2020-06-26 20:55:47 +0900
tags    : [verilog]
draft   : false
parent  : 
---

# 개요 
 * openssd가 verilog가 짜져있어서 읽을수 있을 수준까지 공부하는게 목표

## 출처
 * 기본 문법 : https://blog.naver.com/PostView.nhn?blogId=kyj0833&logNo=221490972642&from=search&redirect=Log&widgetTypeCall=true&directAccess=false
 * 리눅스에서 verilog 사용하기 : https://www.sapphosound.com/archives/1894
 * http://www.asic-world.com/verilog/intro1.html#Design_Styles
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

### D flip-flop Code

```verilog
module d_ff (d, clk, q, q_bar);
input d, clk;
output q, q_bar;
wire d, clk;
reg q, q_bar;

always @ (posedge clk)

begin
  q <= d;
  q_bar <= !d;
end

endmodule
```

### Data Type (English)
 * Hardware does have two kinds of drivers.
 * A driver is a data type which can drive a load. Basically, in a physical circuit, a driver would be anything that electrons can move through/into.
   * Driver that can store a value (example: flip-flop).
   * Driver that can not store value, but connects two points (example: wire).
 * The first type of driver is called a reg in Verilog (short for "register"). The Second data type is called a wire (for... well, "wire"). You can refer to tidbits section to understand it better.
### Data Type (한국어)
 * 하드웨어는 2가지 종류의 드라이버가 있으며, 기본적으로 물리적인 회로이며, 드라이버는 전자가 들어오거나 나갈수 있는 무엇이든 될 수 있다.
   * 드라이버는 값을 저장할 수 있다. (예를 들어 플립플롯) -> reg(register의 준말) 
   * 드라이버는 값을 저장하지 못하는 대신, 두 지점을 연결 시킬수 있다. (예를 들어 wire) -> wire

### Opertators

| Operator Type | Operator Symbol | Operation Performed   |
|---------------|-----------------|-----------------------|
| Arithmetic    | `*`             | Multiply              |
|               | `/`             | Division              |
|               | `+`             | Add                   |
|               | `-`             | Subtract              |
|               | `%`             | Modulus               |
|               | `+`             | Unary plus            |
|               | `-`             | Unary minus           |
| Logical       | `!`             | Logical negation      |
|               | `&&`            | Logical and           |
|               | `||`            | Logical or            |
|               | `>`             | Greater than          |
|               | `<`             | Less than             |
|               | `>=`            | Greater than or equal |
|               | `<=`            | Less than or equal    |
| Equality      | `==`            | Equality              |
|               | `!=`            | inequality            |
| Reduction     | `~`             | Bitwize negation      |
|               | `~&`            | nand                  |
|               | `|`             | or                    |
|               | `~|`            | nor                   |
|               | `^`             | xor                   |
|               | `^~`            | xnor                  |
|               | `~^`            | xnor                  |
| Shift         | `>>`            | Right shift           |
|               | `<<`            | Left shift            |
| Concatenation | `{}`            | Concatenation         |
| Conditional   | `?`             | conditional           |


### Control Statements
### If-else

```verilog
// begin and end act like curly braces in C/C++.
if (enable == 1'b1) begin
  data = 10;         // Decimal assigned
  address = 16'hDEAD; // Hexadecimal
  wr_enable = 1'b1; // Binary
end else begin
  data = 32'b0;
  wr_enable = 1'b0;
  address = address +1;
end
```

### Case

```verilog
case(address)
  0: $display ("It is 11:40PM");
  1: $display ("I am feeling sleepy");
  2: $display ("Let me skip this tutorial");
  default: $display ("Need to complete");
endcase
```

### while

```verilog
while (free_time) begin
  $display ("Continue with webpage development");
end
```

#### Counter example
```verilog
module counter (clk, rst, enable, count);
input clk, rst, enabl;
output [3:0] count;
reg [3:0] count;

always @ (posedge clk or posedge rst)
if (rst) begin
  count <= 0;
end else begin: COUNT
  while (enable) begin
    count <= count + 1;
    disable COUNT;
  end
end

endmodule
```

### For loop

```verilog
for (i = 0; i < 15; i = i + 1) begin
  $display ("Current value of i is %d", i);
end
```

### Repeat

```verilog
repeat (16) begin
  $display ("Current value of i is %d", i);
  i = i + 1;
end
```

### Initial Blocks

```verilog
initial begin
  clk = 0;
  reset = 0;
  req_0 = 0;
  req_1 = 0;
end
```

### Always Blocks

```verilog
always @ (a or b or sel)
begin
  y = 0;
  if (sel == 0) begin
    y = a;
  end else begin
    y = b;
  end
end
```
 * ?? 이건 근데 mux랑 똑같은거 아닌가? mux 만들어 놓고, initial block 에서 wire 연결 해두면 안되는 건가?
 * always block의 쓰임을 잘 모르겠네, 어떻게 되는 거지? 
 * => 주변에 있는 다른 분께 물어보니 같은 동작을 하는건 맞고, 실제 기판으로 나오는게 똑같으면 어떻게 코딩하든 상관 없다고 하심.

```verilog
always begin
  #5 clk = ~clk;
end
```

### Assign Statement

```verilog
assign out = (enable) ? data : 1'bz;
```

```verilog
assign out = data;
```

### Task and Function
```verilog
function parity;
input [31:0] data;
integer i;
begin
  parity = 0;
  for (i = 0; i< 32; i = i + 1) begin
    parity = parity ^ data[i];
  end
end
endfunction
```

 * 흠... for을 도는건 delay 없이 도는 거니 위에 내용은 실제로 컴파일 되면 data의 모든 bit를 한번에 xor하는 결과가 나오는건가?
 * 그래서 한번 만들고 compile 해봤다.
 
```verilog
 
module parity (d, p);
  output reg p;
  input [31:0] d;

  function parity;
    input [31:0] data;
    integer i;

    begin
      parity = 0;
      for (i = 0; i< 32; i = i + 1) begin
        parity = parity ^ data[i];
      end
    end
  endfunction

  always @ (d)
    p = parity(d);

endmodule
```

 * 아래는 컴파일 된걸 연 결과다
```
#! /usr/bin/vvp
:ivl_version "10.1 (stable)";
:ivl_delay_selection "TYPICAL";
:vpi_time_precision + 0;
:vpi_module "system";
:vpi_module "vhdl_sys";
:vpi_module "v2005_math";
:vpi_module "va_math";
S_0x56211aafb800 .scope module, "parity" "parity" 2 1;
 .timescale 0 0;
    .port_info 0 /INPUT 32 "d"
    .port_info 1 /OUTPUT 1 "p"
o0x7f15420240a8 .functor BUFZ 32, C4<zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz>; HiZ drive
v0x56211ab1be30_0 .net "d", 31 0, o0x7f15420240a8;  0 drivers
v0x56211ab1bf30_0 .var "p", 0 0;
E_0x56211aac3cc0 .event edge, v0x56211ab1be30_0;
S_0x56211aafb9c0 .scope function, "parity" "parity" 2 5, 2 5 0, S_0x56211aafb800;
 .timescale 0 0;
v0x56211aafbbb0_0 .var "data", 31 0;
v0x56211ab1bcb0_0 .var/i "i", 31 0;
v0x56211ab1bd90_0 .var "parity", 0 0;
TD_parity.parity ;
    %pushi/vec4 0, 0, 1;
    %store/vec4 v0x56211ab1bd90_0, 0, 1;
    %pushi/vec4 0, 0, 32;
    %store/vec4 v0x56211ab1bcb0_0, 0, 32;
T_0.0 ;
    %load/vec4 v0x56211ab1bcb0_0;
    %cmpi/s 32, 0, 32;
    %jmp/0xz T_0.1, 5;
    %load/vec4 v0x56211ab1bd90_0;
    %load/vec4 v0x56211aafbbb0_0;
    %load/vec4 v0x56211ab1bcb0_0;
    %part/s 1;
    %xor;
    %store/vec4 v0x56211ab1bd90_0, 0, 1;
    %load/vec4 v0x56211ab1bcb0_0;
    %addi 1, 0, 32;
    %store/vec4 v0x56211ab1bcb0_0, 0, 32;
    %jmp T_0.0;
T_0.1 ;
    %end;
    .scope S_0x56211aafb800;
T_1 ;
    %wait E_0x56211aac3cc0;
    %load/vec4 v0x56211ab1be30_0;
    %store/vec4 v0x56211aafbbb0_0, 0, 32;
    %fork TD_parity.parity, S_0x56211aafb9c0;
    %join;
    %load/vec4  v0x56211ab1bd90_0;
    %store/vec4 v0x56211ab1bf30_0, 0, 1;
    %jmp T_1;
    .thread T_1, $push;
# The file index is used to find the file name in the following table.
:file_names 3;
    "N/A";
    "<interactive>";
    "parity.v";
```
 * TODO: 아직 결과 분석을 못했다. 일단 오늘 공부는 여기까지
