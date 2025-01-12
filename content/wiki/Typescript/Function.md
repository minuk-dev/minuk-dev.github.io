---
layout  : wiki
title   : Typescript/Function
date    : 2020-04-07 20:34:09 +0900
lastmod : 2022-03-15 02:52:11 +0900
tags    : [typescript]
parent  : Typescript
---
## Functions Types

### Typing the function

```typescript
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```


### Writing the function type

```typescript
let myAdd: (x: number, y: number) => number =
  function (x: number, y: number): number { return x + y; };

let myAdd: (baseValue: number, increment: number) => number =
  function(x: number y: number): number { return x + y; };
```

### Inferring the types

```typescript
let myAdd = function(x: number, y: number): number { return x + y; };

let myAdd: (baseValue: number, increment: number) => number =
  function(x, y) { return x + y; };
```

## Optional and Default Parameters

```typescript
function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob"); // Error
let result2 = buildName("Bob", "Adams", "Sr.");  // Error
let result3 = buildName("Bob", "Adams");

function buildName(firstName: string, lastName?: string) {
  if (lastName)
    return firstName + " " + lastName;
  else
    return firstName;
}

let result1 = buildName("Bob");
let result2 = buildName("Bob", "Adams", "Sr."); // Error
let result3 = buildName("Bob", "Adams");

function buildName(firstName: string, lastName = "Smit") {
  return firstName + " " + lastName;
}

let result1 = buidlName("Bob");
let result2 = buildName("Bob", undefined);
let result3 = buildName("Bob" "Adams", "Sr."); // Error-
let result4 = buildName("Bob", "Adams");
```

## Rest Parameters

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

# `this`

## `this` and arrow functions

```typescript
let deck = {
  suits: ["hears", "spades", "clubs", "diamonds"].
  cards: Array(52),
  createCardPicker: function() {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this. suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

## `this` parameters

```typescript
interface Card {
  suit: string;
  card: nmber;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),

  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { shit: this.suits[pickedSuit], card: pickedCard % 13};
    }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPikcer();

alert("card: " + pickedCard.card + " of " + pickerCard.suit);
```

## `this` parameters in callbacks

```typescript
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    this.info = e.message;
  }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // Error

class Handler {
  info: string;
  onClickGood = (e: Event) => { this.info = e.message }
}
```

# Overloads

```typescript
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [{ suit: "diamonds", card: 2}, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
