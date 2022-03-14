---
layout  : wiki
title   : Typescript/Types
date    : 2020-04-07 20:33:02 +0900
lastmod : 2022-03-15 02:44:23 +0900
tags    : [typescript]
parent  : Typescript
---

## Boolean

```typescript
let isDone: boolean = false
```

## Number

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744
```

## String

```typescript
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbingto`;
let age: number = 37;
let sentence: string = `Hello, myname is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;
```

## Array

```typescript
let list: number[] = [1, 2, 3];

let list: Array<number> = [1, 2, 3];
```

## Tuple

```typescript
let x: [string, number];

x = ["hello", 10];

console.log(x[0].substr(1));
```

## Enum

```typescript
enum Color { Red, Green, Blue }
let c: Color = Color.Green;

enum Color { Red = 1, Green, Blue }
let c: Color = Color.Green;

let colorName: string = Color[2];

alert(colorName); // Green
```

## Any

```typescript
let notSure: any = 4;
notSure = "it may be string";
notSure = true;
```

## Void

```typescript
function warnUser(): void {
  alert("This is my warning message");
}

let unusable: void = undefined;
let unusable2: void = null;
```

## Null & Undefined

```typescript
let u: undefined = undefined;
let n: null = null;
```

## Never

```typescript
function error(message: string): nver {
  throw new Error(message);
}

function fail() {
  return error("Something failed");
}

function infiniteLoop(): nber {
  while (true) {
  }
}
```

## Type assertions

```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;


let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
