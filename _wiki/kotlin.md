---
layout  : wiki
title   : kotlin
date    : 2022-12-23 01:53:21 +0900
updated : 2022-12-23 01:53:21 +0900
tags    : [kotlin]
draft   : false
parent  : study-note
resource: F26E30A8-E552-4987-AEB8-71F2AED5784C
---

## Variable

```kotlin
val answer: Int = 42 // value
var answer: Int = 42 // variable
```

```kotlin
fun main(args: Array<String>) {
  val name = if (args.size > 0) args[0] else "Kotlin"
  println("Hello, $name!")
}
```

```kotlin
class Person(
  val name: String,
  var isMarried: Boolean
)

val person = Person("Bob", true)
```

```kotlin
class Rectangle(val height: Int, val width: Int) {
  val isSquared: Boolean
    get() {
      return height == width
    }
}
```

```kotlin
enum class Color {
  RED, ORANGE, YELLOW
}

enum class Color(
  val r: Int, val g: Int, val b: Int
) {
  RED(255, 0, 0),
  ORANGE(255, 165, 0),
  YELLOW(255, 255, 0)

  fun rgb() = (r * 256 + g) * 256 + b
}
```

```kotlin
fun mix(c1: Color, c2: Color) =
  when (setOf(c1, c2)) {
    setOf(RED, YELLOW) -> ORANGE
    setOf(YELLOW, BLUE) -> GREEN
    else -> throw Exception("Dirty color")
  }
```

```kotlin
interface Expr
class Num(val value: Int) : Expr
class Sum(val left: Expr, val right: Expr) : Expr

fun eval(e: Expr) : Int =
  when (e) {
    is Num -> e.value
    is Sum -> eval(e.right) + eval(e.left)
    else -> throw IllegalArgumentException("Unknown expression")
  }
```

```kotlin
for (i in 1..100) {
  println(i)
}
```

```kotlin
val binaryReps = TreeMap<Char, String>()
for (c in 'A'..'F') {
  val binary = Integer.toBinaryString(c.toInt())
  binaryReps[c] = binary
}

for ((letter, binary) in binaryReps) {
  println("$ltter = $binary")
}
```

```kotlin
for isLetter(c: Char) = c in 'a'..'z' || c in 'A'..'Z'
println(isLetter('q'))
```

```kotlin
fun readNumber(reader: BufferdReader): Int? {
  try {
    val line = reader.readLine()
    return Integer.parseInt(line)
  } catch (e: NumberFormatException) {
    return null
  } finally {
    reter.close()
  }
}
```

```kotlin
fun <T> joinToString(
  collection: Collection<T>,
  separator: String = ", ",
  prefix: String = "",
  postfix: String = ""
): String
```

```kotlin
const val UNIX_LINE_SEPARATOR = "\n"
// public static final String UNIX_LINE_SEPARATOR = "\n";
```

```kotlin
fun String.lastChar(): Char = get(length - 1)
```
