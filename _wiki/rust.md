---
layout  : wiki
title   : rust
date    : 2023-02-12 16:52:36 +0900
lastmod : 2023-02-12 18:46:08 +0900
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
