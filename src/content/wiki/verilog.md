---
layout  : wiki
title   : verilog (베릴로그)
summary : 
date    : 2020-06-25 20:46:51 +0900
lastmod : 2020-06-29 20:47:04 +0900
tags    : [verilog]
draft   : false
parent  : 
---

# 개요 
 * opennvm가 verilog가 짜져있어서 읽을수 있을 수준까지 공부하는게 목표

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
 * 읽어보면, 실제로 loop돌고 jump 하는 것처럼 보인다.
 * 생각해보면 그럴수 밖에 없는 것 같기도 하고, 만약 1번에 끝내길 바랬으면 다르게 짜야지 싶기도 해서

### Task Benches

```verilog
module arbiter (
clock,
reset,
req_0,
req_1,
gnt_0,
gnt_1
);

input clock, reset, req_0, req_1;
output gnt_0, gnt_1;

reg gnt_0, gnt_1;

always @ (posedge clock or posedge reset)

if (reset) begin
  gnt_0 <= 0;
  gnt_1 <= 0;
end else if (req_0) begin
  gnt_0 <= 1;
  gnt_1 <= 0;
end else if (req_1) begin
  gnt_0 <= 0;
  gnt_1 <= 1;
end

endmodule
// Testbench Code Goes here
module arbiter_tb;

reg clock, reset, req0, req1;
wire gnt0, gnt1;

initial begin
  $monitor ("req0=%b,req1=%b,gnt0=%b,gnt1=%b", req0, req1, gnt0, gnt1);
  clock = 0;
  reset = 0;
  req0 = 0;
  req1 = 0;
  #5 reset = 1;
  #15 reset = 0;
  #10 req0 = 1;
  #10 req0 = 0;
  #10 req1 = 1;
  #10 req1 = 0;
  #10 {req0, req1} = 2'b11;
  #10 {req0, req1} = 2'b00;
  #10 $finish;
end

always begin
  #5 clock = !clock;
end

arbiter U0 (
.clock (clock),
.reset (reset),
.req_0 (req0),
.req_1 (req1),
.gnt_0 (gnt0),
.gnt_1 (gnt1)
);


endmodule
```

 * 처음에 initial block 에서 monitor로 변수 값 바뀔때 tracking 해주고, req0 = 0, req1 = 0 이 설정 되고, gnt는 설정이 안되서 0, 0, x, x 가 나오고 나머지는 다 delay 걸려서 실행 안되고 있고, arbiter 호출해준다.
 * 5 delays 뒤에 reset 이 1 이 되면서 gnt_0, gnt_1 이 되면서 0, 0, 0, 0 이 출력
 * 10 delays 뒤에 req0 가 1이 되면서, 1, 0, 0, 0
 * 그러면서 1, 0, 1, 0
 * 그 뒤 req0 이 0 되면서 0, 0, 1 , 0
 * req1 이 1 이 되면서 0, 1, 1, 0
 * 그 직후 0, 1, 0, 1
 * 0, 0, 0, 1
 * 1, 1, 0, 1
 * 1, 1, 1, 0
 * 0, 0, 1, 0
 * 순으으로 나오게 된다.
 * 처음에는 reset 이 0 으로 바뀌는걸 못봐서 한참 삽질했다.

 
### Counter Design

```verilog
//-----
// Function : This is a 4 bit up-counter with
// Synchronous active high reset and
// with active high enable signal
//-----
module first_counter (
clock,
reset,
enable,
counter_out
);

input clock;
input reset;
input enable;

output [3:0] counter_out;

wire clock;
wire reset;
wire enable;

reg [3:0] counter_out;

always @ (posedge clock)
begin: COUNTER // Block Name
  if (reset == 1'b1) begin
    counter_out <= # 4'b0000;
  end
  
  else if (enable == 1'b1) begin
    counter_out <= #1 counter_out + 1;
  end
end

endmodule
```

```verilog
`include "first_counter.v"
module first_counter_tb();
// Declare inputs as regs and outputs as wires
reg clock, reset, enable;
wire [3:0] counter_out;

// Initialize all variables

initial begin
  $display ("time\t clk reset enable counter");
  $monitor ("%g\t %b %b %b %b");
    $time, clock, reset, enable, counter_out;
    
  clock = 1;
  reset = 0;
  enable = 0;
  #5 reset = 1;
  #10 reset = 0;
  #10 enable = 1;
  #100 enable = 0;
  #5 $finish;
end

always begin
  #5 clock = ~clock;
end

first_counter U_counter (
clock,
reset,
enable,
counter_out
);

endmoudle
```

 * 다른 module 을 부를때 `include 라는 문법을 쓰는걸 알게 되었다.
 * 나머진 예전에 배운 논리회로랑 똑같아서 스킵

### Comments

```verilog
/* This is a
  Multi line comment
  example */
module addbit (
a,
b,
ci,
sum,
co);

input a;
input b;
input ci;
output sum;
output co;
wire a;
wire b;
wire ci;
wire sum;
wire co;

endmodule

```

### Numbers in Verilog
#### Integer Number
 * Syntax : <size>'<radix><value>;
 
| Integer    | Stored as                        |
|------------|----------------------------------|
| 1          | 00000000000000000000000000000001 |
| 8'hAA      | 10101010                         |
| 6'b10_0011 | 100011                           |
| 'hF        | 00000000000000000000000000001111 |

#### Real Numbers
 * Syntax : <value>.<value>, <mantissa>E<exponent>


### Modules
#### Ports
 * Syntax 
```
input [range_val:range_var] list_of_identifier;
output [range_val:range_var] list_of_identifier;
inout [range_val:range_var] list_of_identifier;
```
 * Examples
```verilog
input clk;
input [15:0] data_in;
output [&;0] count;
inout data_bi;
```

```verilog
module addbit(
a,
b,
ci, sum,
co
);
input a;
input b;
input ci;
output sum;
output co;

wire a;
wire b;
wire ci;
wire sum;
wire co;

assign {co, sum} = a + b + ci;

endmodule
```

##### Modules connected by port order (implicit)

```verilog
module adder_implicit (
result,
carry,
r1,
r2,
ci
);

input [3:0] r1;
input [3:0] r2;
input ci;

output [3:0] result;
ouput carry;

wire [3:0] r1;
wire [3:0] r2;
wire ci;
wire [3:0] result;
wire crarry;

wire c1;
wire c2;
wire c3;

addbit u0 (
r1[0],
r2[0],
ci ,
result[0],
c1
);

addbit u1 (
r1[1] ,
r2[1] ,
c1,
result[1],
c2
);

addbit u2 (
r1[2] ,
r2[2], 
c2,
result[2],
c3
);

addbit u3(
r1[3],
r2[3],
c3,
result[3],
carry
);

endmodule
```

##### Modules connected by name

```verilog
module adder_explicit (
result,
carry,
r1,
r2,
ci
);

input [3:0] r1;
input [3:0] r2;
input ci;

ouput [3:0] result;
ouput carry;

wire [3:0] r1;
wire [3:0] r2;
wire ci;
wire [3:0] result;
wire carry;

wire c1;
wire c2;
wire c3;

addbit u0 (
.a (r1[0]),
.b (r2[0]),
.ci (ci),
.sum (result[0]),
.sum (result[0]),
co (c1)
);

addbit u1 (
.a (r1[1]),
.b (r2[1]),
.ci (c1),
.sum (result[1]),
.co (c2)
);

addbit u2 (
.a (r1[2]),
.b (r2[2]),
.ci (c2),
.sum (result[2]),
.co (3)
);

addbit u3 (
.a (r1[3]),
.b (r2[3]),
.ci (c3),
.sum (result[3]),
.co (carry)
);

endmodule
```


##### Instantiating a module
```verilog
module parity (
a,
b,
c,
d,
y
);

input a;
input b;
input c;
input d;

ouput y;

wire a;
wire b;
wire c;
wire d;
wire y;

wire out_0;
wire out_1;

xor u0 (out_0, a, b);
xor u1 (out_1, c, d);

xor u2 (y, out_0, out_1);

endmodule
```

#### Port Connection Rules
 * Inputs : internally must always be of type net, externally the inputs can be connected to a variable of type reg or net.
 * Outputs : internally can be of type net or reg, externally the outputs must be connected to a variable of type net.
 * Inouts : internally or externally must always be type net, can only be connected to a variable net type.
 * Width matching : it is legal to connect internal and external ports of different sizes. But beware, synthesis tools could report problems.
 * Unconnected ports : unconnected ports are allowed by using a ",".
 * The net data types are used to connect structure.
 * A net data type is required if a signal can be driven a structural connection.

 
##### Example - Implicit Unconnected Port
```verilog
module implicit();
reg clk, d, rst, pre;
wire q;

dff u0 (q,, clk, d, rst, pre);

end module

module dff (q, q_bar, clk, d, rst, pre);
input clk, d, rst, pre;
output q, q_bar;
reg q;

assign a_bar = ~q;

always @ (posedge clk)

if 9rst ==1'b1) gegin
  q <= 0;
end else if (pre == 1'b1) begin
  q <= 1;
end else being
  q <= d;
end

endmodule
```

##### Example - Explicit Unconnected Port
```verilog
module explicit();
reg clk, d, rst, pre;
wire q;

dff u0 (
.q (q),
.d (d),
.clk (clk),
.q_bar (),
.rst (rst),
.pre (pre)
);

endmodule


module dff (q, q_bar, clk, d, rst, pre);
input clk, d, rst, pe;
output q, q-bar;
reg q;

assign q_bar = ~q;

always @ (posedge clk)

if (rst == 1'b1) begin
  q <= 0;
end else if (pre == 1'b1) begin
  q <= 1;
end else begin
  q <= d;
end

endmodule
```

* TODO : 지친다. 오늘은 여기까지. 다음 차례때 해야할 부분 : http://www.asic-world.com/verilog/syntax3.html
