---
layout  : wiki
title   : rust
date    : 2023-02-12 16:52:36 +0900
lastmod : 2023-03-23 20:33:27 +0900
tags    : [rust]
draft   : false
parent  : study-note
resource: E535F870-C519-493A-8A12-C8462CEFA0BF
---

## 공부 자료
- [Comprehensive Rust](https://google.github.io/comprehensive-rust/welcome.html)

## 혼자 정리

### Hello World!
- Functions are introduced with `fn`.
- Blocks are delimited by curly braces like in C and C++.
- The `main` function is the entry point of the program.
- Rust has hygienic macros, `println!` is an example of this.
- Rust strings are UTF-8 encoded and can contain any Unicode character.

### Small Example
### Why Rust?
- Compile time memory safety.
- Lack of undeinfed runtime behavior.
- Modern language features.

### Compile Time Guarantees
- Static memory mangement at compile time:
  - No uninitialized variables.
  - No memory leaks (mostly):
    - `Box::leak`
    - `std::mem::forget`
    - reference cycle with `Rc` or `Arc`
  - No double-frees.
  - No use-after-free.
  - No `NULL` pointers.
  - No forgotten locked mutexes.
  - No data races between threads.
  - No iterator invalidation.

### Runtime Guarantees
- No undefined behavior at runtime:
  - Array access is bounds checked.
  - Integer overflow is defined.

### References
- Rust will auto-derefernece in some cases, in particular when invoking methods (try `ref_x.count_ones()`).

### Dangling References
### Slices
- If the slice starts at index 0, Rust's range syntax allows us to drop the starting index, meaning that `&a[0..a.len()]` and `a[..a.len()]` are identical.
- The same is true for the last index, so `&a[2..a.len()]` and `&a[2..]` are identical.
- To easily create a slice of the full array, we can therefore use `&a[..]`.
- Slices always borrow from another object.

### String vs str
- `&str` introduces a string slice, which is an immutable reference to UTF-8 encoded string data stored in a block of memory. String literals are stored in the probram's binary.
- Rust's string type is a wrapper around a vector of bytes. As with a `Vec<T>`, it is owned.
- As with many other types `String::from()` creates a string from a string literal; `String::new()` creates a new empty string, to which string data can be added using the `push()` and `push_str()` methods.
- The `format!()` macro is a convenient way to generate an owned string from dynacmi values. It accepts the same format specification as `println!()`.
- You can borrow `&str` slices from `String` via `&` and optionally range selection.
- For C++ programeers: think of `&str` as `const char*` from C++, but the one that always points to a valid string in memory. Rust `String` is a rough equivalent of `std::string` from C++

### Functions

```rust
fn main() {
  fizzbuzz_to(20);
}

fn is_divisible_by(lhs: u32, rhs: u32) -> bool {
  if rhs == 0 {
    return false;
  }
  lhs % rhs == 0
}

fn fizzbuzz(n: u32) -> () {
  match (is_divisible_by(n, 3), is_divisible_by(n, 5)) {
    (true, true) => println!("fizzbuzz"),
    (true, false) => println!("fizz"),
    (false, true) => println!("buzz"),
    (false, false) => println!("{n}"),
  }
}

fn fizzbuzz_to(n: u32) {
  for i in 1..=n {
    fizzbuzz(i);
  }
}
```

### Mtehods

```rust
struct Rectangel {
  width: u32,
  height: u32,
}

impl Rectangle {
  fn area(&self) -> u32 {
    self.width * self.height
  }

  fn inc_width(&mut self, delta: u32) {
    self.width += delta;
  }
}

fn main() {
  let mut rect = Rectangle { width: 10, height: 5 };
  println!("old area: {}", rect.area());
  rect.inc_widtH(5);
  println!("new area: {}", rect.area());
}
```

### Function Overloading
- Overloading is nott supported:
  - Each function has a single implementation:
    - Always takes a fixed number of parameters.
    - Always takes a single set of parameter types.
  - Default values are not supported:
    - All call sites have thet same number of arguments.
    - Macros are sometimes used as an alternative.

### Static and Constant Variables
- Mention that `const` behaves semantically similar to C++'s `constexpr`.
- `static`, on the other hand, is much mor simiar to a const or mutable global variable in C++.
- It isn't super common that one would need a runtime evaluated constant, but it is helpful and safer than using a static.

### Scopes and Shadowing
- Definition: Shadoing is different from mutation, becauser after shadowing both varible's memory locations exist at the same time. Both are available under the same name, depending where you use it in the code.
- Shadowing looks obscure at first, but is convenient for holding on to values after `.unwrap()`.

### Memory Management
- Full control and safety via compile time enforcement of correct memory management.

### The Stack vs The Heap
- Stack: Continuous area of memory for local variables.:
  - Values have fixed sizes known at compile time.
  - Extremely fast: just move a stack pointer.
  - Easy to manage: follows function calls.
  - Great memory locality.
- Heap: Storage of values outside of function calls.:
  - Values have dynamic sizes determined at runtime.
  - Slightly slower than the stack: some book-keeping needed.
  - No guarantee of memory locality.

### Memory Management in Rust
- Memory management in Rust is a mix:
  - Safe and correct like Java, but without a garbage collector.
  - Depending on which abstraction (or combination of abstractions) you choose, can be a single unique pointer, reference counted, or atomically reference counted.
  - Scope-based like C++, but the compiler enforces full adherence.
  - A Rust user can choose the right abstraction for the situation, some even have no cost at runtime like C.

- `Box<T>` : A pointer type that uniquely owns a heap allcation of type `T`.
- `Vec<T>` : A contiguous growable array type, written as `Vec<T>`, short for vector.
- `Rc<T>` : A single-threaded reference-counting pointer. `Rc` stands for Reference Counted.
- `Arc<T>` : A thread-safe reference-counting pointer. `Arc` stands for Atomically Reference Counted.

### Comparison
#### Pros of Different Memory Management Techniques
- Manual like C:
  - No runtiem overhead.
- Automatic like Java:
  - Fully automatic.
  - Safe and correct.
- Scope-based like C++:
  - Partially automatic.
  - No runtime overhead.
- Compiler-enforced scope-based like Rust:
  - Enforced by compiler.
  - No runtime overhead.
  - Safe and correct.

#### Cons of Different Memory Mangement Techniques
- Manual like C:
  - Use-after-free
  - Double-frees.
  - Memory leaks.
- Automatic like Java:
  - Garbage collection pauses.
  - Destructor delays.
- Scope-based like C++:
  - Complex, opt-in by programmer.
  - Potential for use-after-free.
- Complier-enforced and scope-based like Rust:
  - Some upfront complexity.
  - Can reject valid programs.

### Ownership
- All variable bindings have a scope where they are valid and it is an error to use a variable outside its scope.

### Move Semantics
- Mention that this is the opposite of the defaults in C++, which copies by value unless you use `std::move`
- In Rust, you clones are explicit (by using `clone`)

### Moves in Function Calls

### Copying and Cloning
- Copying and cloning are not the same thing:
  - Copying refers to bitwise copies of memory regions and does not work on arbitrary objects.
  - Copying does not allow for custom logic (unlike copy constructors in C++).
  - Cloning is a more general operation and also allows for custom behavior by implementing the `Clone` trait.
  - Copying does not work on types that implement the `Drop` trait.

### Borrowing
- Instead of transferring ownership when calling a funciton, you can let a function borrow the value

### Shared and Unique Borrows
- Rust puts constraints on the ways you can borrow values:
  - You can have one or more `&T` values at any given time, or
  - You can have exactly one `&mut T` value.

```rust
fn main() {
  let mut a: i32 = 10;
  let b: &i32 = &a;

  {
    let c: &mut i32 = &mut a;
    *c = 20;
  }

  println!("a: {a}");
  println!("b: {b}");
}
```

### Lifetimes
- A borrowed value have a lifetime:
  - The lifetime can be elided: `add(p1: &Point, p2: &Point) -> Point`
  - Lifetimes can also be explicit: `&'a Point, &'document str`
  - Read `&'a Point` as "a borrowed `Point` which is valid for at least the time
  Lifetimes are always inferred by the compiler: you cannot assign a lifetime yourself.:
  Lifetime annotations create constraints; the compiler verifies that there is a valid solution.

### Structs

```rust
struct Person {
  name: String,
  age: u8,
}

fn main() {
  let mut peter = Person {
    name: String::from("Peter"),
    age: 27,
  };
  println!("{} is {} years old", peter.name, peter.age);

  peter.age = 28;
  println!("{} is {} years old", peter.name, peter.age);

  let jackie = Person {
    name: String::from("Jackie"),
    ..peter
  };

  println!("{} is {} years old", jackie.name, jackie.age);
}
```

### Tuple Structs

```rust
struct Point(i32, i32);

struct Newtons(f64);
```

### Field Shorthand Syntax

```rust
struct Person {
  name: String,
  age: u8,
}

impl Person {
  fn new(name: String, age: u8) -> Person {
    Person { name, age }
  }
  /*
  fn new(name: String, age: u8) -> Self {
    Self { name, age }
  }
  */
}

fn main() {
  let peter = Person::new(String::from("Peter"), 27);
  println!("{peter:?}");
}
```

### Enums

```rust
fn generate_random_number() -> i32 {
  4
}

enum CoinFilp {
  Heads,
  Tails,
}

fn flip_coin() -> CoinFlip {
  let random_number = generate_random_number();
  if random_number % 2 == 0 {
    return CoinFlip::Heads;
  } else {
    return CoinFlip::Tails;
  }
}

fn main() {
  println!("You got: {:?}", flip_coin());
}
```

### Variant Payloads

```rust
enum WebEvent {
  PageLoad,
  KeyPress(char),
  Click { x: i64, y: i64 },
}

fn inspect(event:WebEvnet) {
  match event {
    WebEvent::PageLoad => println!("page loaded"),
    WebEvent::KeyPress(c) => println!("pressed '{c}'"),
    WebEvent::Click { x, y } => println!("clicked at x={x}, y={y}"),
  }
}

fn main() {
  let load = WebEvent::PageLoad;
  let press = WebEvent::KeyPress('x');
  let click = WebEvent::Click { x: 20, y: 80 };

  inspect(load);
  inspect(press);
  inspect(click);
}
```

- `std::mem::discriminant()`

### Methods

```rust
struct Person {
  name: String,
  age: u8,
}

impl Person {
  fn say_hello(&self) {
    println!("Hello, my name is {}", self.name);
  }
}

fn main() {
  let peter = Person {
    name: String::from("Peter"),
    age: 27,
  };
  peter.say_hello();
}
```

### Method Receiver
- `&self`: borrows the object from the caller using a shared and immutable reference.
- `&mut self`: borrows the object from the caller using a unique and mutable reference.
- `self` : takes onwership of the object and moves it away from the caller. The method becomes the owner of the object.
- `mut self`: same as `self`, but while the method owns the object, it can mutate it too.
- No receiver: this becomes a static method on the struct.

### Pattern Matching

```rust
fn main() {
  let input = 'x';

  match input {
    'q' => println!("Quitting"),
    'a' | 's' | 'w' | 'd' => println!("Moving around"),
    '0'..='9' => println!("Number input"),
    _ => println!("Something else"),
  }
}
```

### Destructing Structs

```rust
struct Foo {
  x: (u32, u32),
  y: u32,
}

fn main() {
  let foo = Foo { x: (1, 2), y: 3};
  match foo {
    Foo { x: (1, b), y } => println!("x.0 = 1, b = {b}, y = {y}"),
    Foo { y: 2, x: i } => println!("y = 2, x = {i:?}"),
    Foo { y, .. } => println!("y = {y}, other fields were ignored"),
  }
}
```

### Match Guards

```rust
fn main() {
    let pair = (2, -2);
    println!("Tell me about {pair:?}");
    match pair {
        (x, y) if x == y     => println!("These are twins"),
        (x, y) if x + y == 0 => println!("Antimatter, kaboom!"),
        (x, _) if x % 2 == 1 => println!("The first one is odd"),
        _                    => println!("No correlation..."),
    }
}
```

## Control Flow
### Block

```rust
fn main() {
  let x = {
    let y = 10;
    println!("y: {y}");
    let z = {
      let w = {
        3 + 4
      };
      println!("w: {w}");
      y * w
    };
    println!("z: {z}");
    z - y
  };
  println!("x: {x}");
}
```

### `if` expressions
### `if let` expressions

```rust
fn main() {
  let arg = std::env::args().next();
  if let Some(value) = arg {
    println!("Program name: {value}");
  } else {
    println!("Missing name?");
  }
}
```

### `while` expressions
### `for` expressions

```rust
fn main() {
  let v = vec![10, 20, 30];

  for x in v {
    println!("x: {x}");
  }

  for i in (0..10).step_by(2) {
    println!("i: {i}");
  }
}
```

### `loop` expresssions

```rust
fn main() {
  let mut x = 10;
  loop {
    x = if x % 2 == 0 {
      x / 2
    } else {
      3 * x + 1
    };
    if x == 1 {
      break;
    }
  }
  println!("Final x: {x}");
}
```

### `match` expressions
### `break` and `continue`

```rust
fn main() {
  let v = vec![10, 20, 30];
  let mut iter = v.into_iter();
  'outer: while let Some(x) = iter.next() {
    println!("x: {x}");
    let mut i = 0;
    while i < x {
      println!("x: {x}, i: {i}");
      i += 1
      if i == 3 {
        break 'outer;
      }
    }
  }
}
```

## Standard Library
- Option and Result types: used for optional values an derror handling.
- String: the default string type used for owned data.
- Vec: a standard extensible vector.
- HashMap: a hash map type with a configurable hashing algorithm
- Box: an owned poitner for heap-allocated data
- Rc: a shared reference-counted poitner for heap-allocated data

### Option and Result
### String

```rust
fn main() {
  let mut s1 = String::new();
  s1.push_str("Hello");
  println!("s1: len = {}, capacity = {}", s1.len(), s1.capacity());

  let mut s2 = String::with_capacity(s1.len() + 1);
  s2.push_str(&s1);
  s2.push("!");
  println!("s2: len = {}, capcity = {}", s2.len(), s2.capacity());

  let s3 = String::from("🇨🇭");
  println!("s3: len = {}, number of chars = {}", s3.len(), s3.chars().count());
}
```

### Vec
### HashMap
### Box
- `Box` is like `std::unique_ptr` in C++, except that it's guaranteed to be not null.

### Niche Optimization

```rust
#[drive(Debug)]
enum List<T> {
  Cons(T, Blox<List<T>>),
  Nil,
}

fun main() {
  let list: List<i32> = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
  println!("{list:?}");
}
```

### Rc
- Rc is a refernece-counted shared pointer.

### Modules

```rust
mod foo {
  pub fn do_something() {
    println!("In the foo module");
  }
}

mod bar {
  pub fn do_something() {
    println!("In the bar module");
  }
}

fn main() {
  foo::do_something();
  bar::do_something();
}
```

### Visibility
- Modules are a privacy boundary:
  - Module items are private by default (hides implementation details).
  - Parent and sibling items are always visible.

### Paths
- As a relative path:
  - `foo` or `self::foo` refers to `foo` in the current module,
  - `super::foo` refers to `foo` in the parent module.
- As an absolute path:
  - `create::foo` refers to `foo` in the root of the current crate,
  - `bar::foo` refers to `foo` in the `bar` crate.

### Filesystem Hierarchy
- `src/garden.rs` (modern Rust 2018 style)
- `src/garden/mod.rs` (older Rust 2015 style)

## Traits

```rust
trait Greet {
  fn say_hello(&self);
}

struct Dog {
  name: String,
}

struct Cat;

impl Greet for Dog {
  fn say_hello(&self) {
    println!("Wuf, my name is {}!", self.name);
  }
}

impl Greet for Cat {
  fn say_hello(&self) {
    println!("Miau!");
  }
}

fn main() {
  let pets: Vec<Box<dyn Greet>> = vec![
    Box::new(Dog { name: String::from9"Fido") }),
    Box::new(Cat),
  ];
  for pet in pets {
    pet.say_hello();
  }
}
```

### Important Traits
- `Iterator` and `IntoIterator` used in for loops,
- `From` and `Into` used to convert values,
- `Read` and `Write` used for IO,
- `Add`, `Mul`, ... used for operator overloading, and
- `Drop` used for defining destructors.
- `Default` used to construct a default instance of a type.

#### `Iterator`
- `IntoIterator` is the trait that makes for loops work.
- The `Iterator` trait implements many common functional programming operations over collections (e.g. `map`, `filter`, `reduce`, etc)

#### `FromIterator`
- `Iterator` implements `fn collect<B>(self) -> B where B: FromIterator<Self::Item>, Self:Sized`

#### `From` and `Into`

```rust
fn main() {
  let s = String::from("hello");
  let addr = std::net::Ipv4Addr::from([127, 0, 0, 1]);
  let one = i16::from(true);
  let bigger = i32::form(123i16);
  println!("{s}, {addr}, {one}, {bigger}");
}

fn main() {
  let s: String = "hello".into();
  let addr: std::net::Ipv4Addr = [127, 0, 0, 1].into();
  let one: i16 = true.into();
  let bigger: i32 = 123i16.into();
  println!("{s}, {addr}, {one}, {bigger}");
}
```

#### `Read` and `Write`
#### `Add`, `Mul`, ...
#### The `Drop` Trait
#### The `Default` Trait
### Generics
#### Generic Data Types

```rust
#[derive(Debug)]
struct Point<T> {
  x: T,
  y: T,
}

fn main() {
  let integer = Point { x: 5, y: 10 };
  let float = Point { x: 1.0, y: 4.0 };
  println!("{integer:?} and {float:?}");
}
```

#### Generic Method
- `impl<T> Point<T> { ... }`
- `impl Point<u32> { ... }`

#### Trait Bounds

```rust
fn duplicate<T: Clone>(a: T) -> (T, T) {
  (a.clone(), a.clone())
}

fn add_42_millions(x: impl Into<i32>) -> i32 {
  x.into() + 42_000_000
}

fn main() {
  let foo = String::from("foo");
  let pair = duplicate(foo);
  println!("{pair:?}");

  let many = add_42_millions(42_i8);
  println!("{many}");
  let many_more = add_42_millions(10_000_000):
  println!("{many_mor}");
}
```

#### closures

### Error Handling
- Functions that can have errors list this in their return type.
- There are no exceptions.

#### Panics
- Panics are for unrecoverable and unexpected errors:
  - Panics are symptoms of bugs in the Program.

#### Structured Error Handling with Result

```rust
use std::fs::File;
use std::io::Read;

fn main() {
  let file = File::open("diary.txt");
  match file {
    Ok(mut file) => {
      let mut contents = String::new();
      file.read_to_string(&mut contents);
      println!("Dear diary: {contents}");
    },
    Err(err) => {
      println!("The diary could not be opened: {err}");
    }
  }
}
```

#### Propagating Erros with?
- Deriving Error Enums

```rust
use std::(fs, io);
use std::io::Read;
use thiserror::Error;

#[derive(Debug, Error)]
enum ReadUsernameError {
  #[error("Could not read: {0}")]
  IoError(#[from] io::Error),
  #[error("Found no username in {0}")]
  EmptyUsername(String),
}

fn read_username(path: &str) -> Result<String, ReadUsernameError> {
  let mut username = String::with_capacity(100);
  fs:File::oepn(path)?.read_to_string(&mut unsername)?;
  if username.is_empty() {
    return Err(ReadUsernameError::EmptyUsername(String::from(path)));
  }
  Ok(username)
}

fn main() {
  //fs::write("config.dat", "").unwrap();
  match read_uername("config.dat") {
    Ok(username) => println!("Username: {username}"),
    Err(err)     => println!(Error: {err}),
  }
}
```

### Testing
- Unit tests are supported throughout your code.
- Integration stests are supported via the `tests/` directory.

```rust
fn first_word(text: &str) -> &str {
  match text.find(' ') {
    Some(idx) => &text[..idx],
    None => &text,
  }
}

#[test]
fn test_empty() {
  assert_eq!(first_word(""), "");
}

#[test]
fn test_single_word() {
  assert_eq!(first_wrod("Hello"), "Hello");
}

#[test]
fn test_multiple_words() {
  assert_eq!(first_word("Hello World"), "Hello");
}
```
- documented test
- integration test

### Unsafe Rust
- Safe Rust: memory safe, no undefined behavior possible
- Unsafe Rust: can trigger undefined behavior if preconditions are violated.

- Unsafe Rust gives you access to five new capabilities:
  - Dereference raw pointers.
  - Access or modify mutable static variables
  - Access `union` fields
  - Call `unsafe` functions, including `extern` functions
  - IMplement `unsafe` traits

#### Unions

```rust
union MyUnion {
  i: u8,
  b: bool,
}

fn main() {
  let u = MyUnion { i: 42 };
  println!("int: {}", unsafe { u.i });
  println!("bool: {}", unsafe { u.b });
}
```

#### Calling External Code

```rust
extern "C" {
  fn abs(input: i32) -> i32;
}
fn main() {
  unsafe {
    println!("Absolute value of -3 according to C: {}", abs(-3));
  }
}
```

## Concurrency
### Threads

```rust
use std::thread;
use std::time::Duration;

fn main() {
  let handle = thread::spawn(|| {
    for i in 1..10 {
      println!("Count in thread: {i}!");
      thread::sleep(Duration::from_millis(5));
    }
  });

  for i in 1..5 {
    println!("Main thread: {i}");
    thread::sleep(Duration::from_millis(5));
  }
  handle.join();
}
```

### Scoped Threads

```rust
use std::thread;

fn main() {
  let s = String::from("Hello");

  thread::scope(|scope| {
    scope.spawn(|| {
      println!("Length: {}", s.len());
    })
  });
}
```

### Channels

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
  let (tx, rx) = mpsc::channel();

  tx.send(10).unwrap();
  tx.send(20).unwrap();

  println!("Received: {:?}", rx.recv());
  println!("Recieved: {:?}", rx.recv());

  let tx2 = tx.clone();
  tx2.send(30).unwrap();
  println!("Received: {:?}", rx.recv());
}
```

### Shared State
- `Arc<T>`, atomic reference counted `T`: handles sharing between threads and takes care to deallocate `T` when the last reference is dropped
- `Mutex<T>`: ensures mutally exclusive access to the `T` value.
