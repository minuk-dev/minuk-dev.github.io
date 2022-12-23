---
layout  : wiki
title   : kotlin
date    : 2022-12-23 01:53:21 +0900
lastmod : 2022-12-23 01:53:21 +0900
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

```kotlin
interface Clickable {
  fun click()
  fun showOff() = println("I'm clickable!")
}

interface Focusable {
  fun setFocus(b: Boolean) =
    println("I $if (b) "got" else "lost"} focus.")
  fun showOff() = println("I'm focusable!")
}

class Button: Clickable, Focusable {
  override fun click() = println("I was clicked")
  override fun showOff() {
    super<Clickable>.showOff()
    super<Focusable>.showOff()
  }
}
```

```kotlin
sealed class Expr {
  class Num(val value: Int) : Expr()
  class Sum(val left: Expr, val right: Expr) : Expr()
}

fun eval(e: Expr): Int =
  when (e) {
    is Expr.Num -> e.value
    is Expr.Sum -> eval(e.right) + eval(e.left)
  }
```

```kotlin
class User constructor(_nickname: String) {
  val nickname: String
  init {
    nickname = _nickname
  }
}

class User (_nickname: String) {
  val nickname = _nickname
}

class User(val nickname: String)

class User(val nickname: String,
           val isSubscribed: Boolean = true)

open class User(val nickname: String) { ... }
class TwitterUser(nickname: String) : User(nickname) { ... }
```

```kotlin
open class View {
  constructor(ctx: Context) {
    // code
  }

  constructor(ctx: Context, attr: AttributeSet) {
    // code
  }
}

class MyButton : View {
  constructor(ctx: Context)
    : this(ctx, MY_STYLE) {
    // code
  }

  constructor(ctx: Context, attr: AttributeSet)
    : super(ctx, attr) {
    // code
  }
}
```

```kotlin
class Client(val name: String, val postalCode: Int) {
  override fun equals(other: Any?): Boolean {
    if (other == null || other !is Client)
      return false
    return name == other.name &&
      postalCode == other.postalCode
  }
  override fun hashCode(): Int = name.hashCode() * 31 + postalCode
}
val client1 = Client("John", 4122)
val client2 = Client("John", 4122)

println(client1 == client2) // true (called equals)
println(client1 === client2) // false
```

```kotlin
class DelegatingCollection<T> (
  innerList: Collection<T> = ArrayList<T>()
) : Collection<T> by innerList {}
```

```kotlin
class CountingSet<T>(
  val innerSet: MutableCollection<T> = HashSet<T>()
) : MutableCollection<T> by innerSet {
  var objectsAdded = 0
  override fun add(element: T): Boolean {
    objectsAdded++
    return innserSet.add(element)
  }

  override fun addAll(c: Collection<T>): Boolean {
    objectsAdded += c.size
    return innerSet.addAll(c)
  }
}
```

```kotlin
object CaseInsenitiveFileComparator: Comparator<File> {
  override fun compare(file1: File, file2: File): Int {
    return file1.path.compareTo(file2.path,
      ignoreCase = true)
  }
}

println(CaseInsensitiveFileComparator.compare(
  File("/User"),
  File("/user")
))
```

```kotlin
class A {
  companion object {
    fun bar() {
      println("Companion object called")
    }
  }
}
A.bar()
```

```kotlin
class User private consturctor(val nickname: String) {
  companion object {
    fun newSubscribingUser(email: String) =
      User(email.substringBefore('@'))
    fun newFacebookUser(accountId: Int) =
      User(getFacebookName(accountId))
  }
}
```

```kotlin
class Person(val name: String) {
  companion object Loader {
    fun fromJSON(jsonText: String): Person = ...
  }
}

person = Person.Loader.fromJSON("{name: 'Dmitry'}")
```

```kotlin
val sum = { x: Int, y: Int -> x + y }
println(sum(1, 2)) // 3
```

```kotlin
val people = listOf(Person("Alice", 29), Person("bob", 31))
println(people.maxBy() { p: Person -> p.age })
println(people.maxBy({ p: Person -> p.age })
println(people.maxBy { p: Person -> p.age })
println(people.maxBy { it.age })
```

```kotlin
val list = listOf(1, 2, 3, 4)
println(list.filter { it % 2 == 0 })
println(list.map { it * it })
```

```kotlin
val canBeInClub27 = { p: Person -> p.age <= 27 }
val people = listOf(Person("Alice", 27), Person("Bob", 31))
println(people.all(canBeInClub27)) // false
println(people.any(canBeInClub27)) // true
println(peopl.count(canBeInClub27)) // 1
println(people.find(canBeInClub27)) // Person(name=Alice, age=27)
```

```kotlin
println(people.groupBy { it. age })
// {29=[Person(name=Bob, age=29)], 31=[Person(name=Alice, age=31)]}
```

```kotlin
val strings = listOf("abc", "def")
println(strings.flatMap { it.toList() })
// [a, b, c, d, e, f]
```

```kotlin
people.asSequence()
  .map(Person::name)
  .filter { it.startsWith("A") }
  .toList()
```

```kotlin
fun alphabet(): String {
  val stringBuilder = StringBuilder()
  return with(stringBuilder) {
    for (letter in 'A'..'Z') {
      this.append(letter)
    }
    append("\nNow I know the alphabet!")
    this.toString()
  }
}

fun alphabet() = StringBuilder().apply {
  for (letter in 'A'..'Z') {
    append("letter")
  }
  append("\nNow I know the alphabet!")
}.toString()
```
