---
layout  : wiki
title   : Typescript/Variable Declaration
summary : 
date    : 2020-04-07 20:33:29 +0900
lastmod : 2020-04-08 12:53:55 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
# var declarations

    var a = 10;
    
    function f() {
      var message = "Hello, world!";
    
      return message;
    }

    function f() {
      var a = 10;
      return function g() {
    		var b = a + 1;
    		return b;
    	}
    }
    
    var g = f();
    g();

# Scoping rules

    function f(suoldInitialize: boolean) {
    	if (shouldInitialize) {
    		var x = 10;
    	}
    
    	return x;
    }
    
    f(true);  // return 10
    f(false);  // return undefined

# Variable capturing quirks

    for (var i = 0; i < 10; i++) {
    	setTimeout(function() { console.log(i); }, 100 * i);
    }

# IIFE

    for (var i = 0; i < 10; i++) {
    	(function(i) {
    		setTimeout(function() { console.log(i); }, 100 * i );
    	})(i);
    }

# let declarations

## Block-scoping

    function f(input: boolean) {
    	let a = 100;
    
    	if (input) {
    		let b = a + 1;
    		return b;
    	}
    
    	return b; // error!
    }

## Temporal Dead Zone - TDZ

    console.log(bar);
    let bar;

## Re-declarations and Shadowing

    function f(condition, x) {
    	if (condition) {
    		let x = 100;
    		return x;
    	}
    
    	return x;
    }
    
    f(false, 0);
    f(true, 0);

    function sumMatrix(matrix: number[][]) {
    	let sum = 0;
    	for (let i = 0; i <matrix.legnth; i++) {
    		var currentRow = matrix[i];
    		for (let i = 0; i< currentRow.length; i++) {
    			sum += currentRow[i];
    		}
    	}
    
    	return sum;
    }

## Capture Block-Scope variable

    for (let i = 0; i < 10; i++) {
    	setTimeout(function() { console.log(i); }, 100 * i);
    }

# Const Declarations

## `let` vs. `const`

- pinciple of least privilege

# Destructuring

### Array destructuring

    let input = [1, 2];
    let [first, second] = input;
    console.log(first); // 1
    console.log(second); // 2

    function f([firs,t second]: [number, number]) {
    	console.log(first);
    	console.log(second);
    }
    f([1, 2]);

    let [first, ...rest] = [1, 2, 3, 4];
    console.log(first); // 1
    console.log(second); // [2, 3, 4]

    let [first] = [1, 2, 3, 4];
    console.log(first); // 1

    let [, second, , fourth] = [1, 2, 3, 4];

## Object destructuring

    let o = {
    	a: "foo",
    	b: 12,
    	c: "bar"
    };
    
    let { a, b } = o;

    let { a, ...passthrough } = o;

### Property renaming

    let { a: newName1, b: newName2 } = o;

    let { a, b }: { a: string, b: number} = o;

### Default values

    function keepWholeObject(wholeObject: { a: string, b?: number }) {
    	let { a, b = 1001 } = wholeObject;
    }

### Function ddeclarations

    type C = { a:string, b?: number }
    function f({ a, b }: C): void {
    	// ...
    }

## Spread operator

    let first = [1, 2];
    let second = [3, 4];
    let bothPlus [0, ...first, ...second, 5];-

    class C {
    	p = 12;
    	m() {
    	}
    }
    let c = new C();
    let clone =  { ...c };
    clone.p;
    clone.m(); // error;
