---
layout  : wiki
title   : Typescript/Interface
date    : 2020-04-07 20:33:43 +0900
lastmod : 2022-03-15 02:48:53 +0900
tags    : [typescript]
parent  : Typescript
--

# duck typing
- structural subtyping

```typescript
interface LabelledValue {
  label: string;
}

function printLabel(labeledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

## Optional Properties

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
```

## Readonly properties

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x:10, y: 20 };
p1.x = 5; // Error!

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error
ro.push(5); // error
ro.length = 100; // error
a = ro; //error

a = ro as number[];
```

## `readonly` vs `const`

- variables use const
- properties use readonly

## Excess Property Checks—

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color:string; area: number } {
  // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
// Error
```

- Caution! interface has other properties.

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

## Function Types

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
```

## Indexable Types

```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

interface NumberDictionary {
  [index: string]: nmber;
  length: number;
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray:ReadonlyStringArray = ["Alice", "Bob"];
```

## Class Type

### Implementating an interface

```typescript
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number) {}
}
```

### Difference between the static and instance sides of classes

```typescript
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick();
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implments ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    consol.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

## Extending Interfaces

```typescript
interface Shape {
  color: string;
}

interface Square extends Sahpe {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sidLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

## Hybrid Types

```typescript
interface Counter {
  (start:number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {};
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter;
c(10);
c.reset();
c.interval = 5.0;
```

## Interfaces Extending Classes

```typescript
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}
```
