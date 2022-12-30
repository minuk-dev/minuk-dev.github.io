---
layout  : wiki
title   : kotlin
date    : 2022-12-23 01:53:21 +0900
lastmod : 2022-12-31 04:40:04 +0900
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

```kotlin
fun strLenSafe(s: String?): Int =
  if (s != null) s.length else 0
```

```kotlin
fun printAllCaps(s: String?) {
  val allCaps: String? = s?.toUpperCase()
  println(allCaps)
}
```

```kotlin
class Address(val streetAddress: String, val zipCode: Int,
             val city: String, vall country: String)
class Company(val name: String, val address: Address?)
class Person(val name: String, val company: Company?)
fun Person.countryName(): String {
  val country = this.company?.address?.country
  return if (country != null) country else "Unknown"
}
```

```kotlin
fun foo(s: String?) {
  val t: String = s ?: ""
}
```

```kotlin
class Person(val firstName: String, val lastName: String) {
  override fun equals(o: Any?): Boolean {
    val otherPerson = o as? Person ?: return false
    return otherPerson.firstName == firstName &&
           otherPerson.lastName == lastName
  }

  override fun hashCode(): Int =
    firstName.hashCode() * 37 + lastName.hashCode()
}
```

```kotlin
fun ignoreNulls(s: String?) {
  val sNotNull: String = s!!
  println(sNotNull.length)
}
```

```kotlin
fun sendEmailTo(email: String) {
  println("Sending email to $email")
}
var email: String? = "yole@example.com"
email?.let { sendEmailTo(it) }
```

```kotlin
fun <T> printHashCode(t: T) {
  println(t?.hashCode())
}
printHashCode(null) // T = Any?
```

```kotlin
interface Processor<T> {
  fun process(): T
}
class NoResultProcessor: Processor<Unit> {
  override fun process(0 {
    // does not need to return
  })
}
```

```kotlin
fun fail(message: String): Nothgin {
  throw IllegalStateException(message)
}
```

```kotlin
fun <T> copyElements(source: Collection<T>,
                     target: MutableCollection<T>) {
  for (item in source) {
    target.add(item)
  }
}
```

- `List` : `listOf` : `mutableListOf`, `arrayListOf`
- `Set` : `setOf` : `mutableSetOf`, `hashSetOf`, `linkedSetOf`, `sortedSetOf`
- `Map` : `mapOf` : `mutableMapOf`, `hashMapOf`, `linkedMapOf`, `sortedMapOf`

```kotlin
data class Point(val x: Int, val y: Int) {
  operator fun plus(other: Point): Point {
    return Point(x + other.x, y + other.y)
  }
}

val p1 = Point(10, 20)
val p2 = Point(30, 40)
println(p1 + p2) // Point(x=40, y=60)
```

```kotlin
operator fun <T> MutableCollection<T>.plusAssign(element: T) {
  this.add(element)
}
```

```kotlin
operator fun Point.unaryMinus(): Point {
  return Point(-x, -y)
}
val p = Point(10, 20)
println(-p)
```

```kotlin
class Person(
  val firstName: String, val lastName: String
) : Comparable<Person> {
  override fun compareTo(other: Person): Int {
    return compareValuesBy(this, other,
      Person::lastName, Person::firstName)
  }
}

val p1 = Person("Alice", "Smith")
val p2 = Person("Bob", "Johnson")
println(p1 < p2)
```

```kotlin
operator fun Point.get(index: Int): Int {
  return when(index) {
    0 -> x
    1 -> y
    else ->
      throw IndexOutOfBoundsException("Invalid coordinate $index")
  }
}
val p = Point(10, 20)
println(p[1])
```

```kotlin
data class MutablePoint(var x: Int, var y: Int)
operator fun MutablePoint.set(index: Index, value: Int) {
  when(index) {
    0 -> x = value
    1 -> y = value
    else ->
      throw IndexOutOfBoundsException("Invalid coordinate $index")
  }
}
val p = MutablePoint(10, 20)
p[1] = 42
```

```kotlin
data class Rectangle(val upperLeft: Point, val lowerRight: Point)
operator fun Rectangle.contains(p: Point): Boolean {
  return p.x in upperLeft.x until lowerRight.x &&
    p.y in upperLeft.y until lowerRight.y
}
val rect = Rectangle(Point(10, 20), Point(50, 50))
println(Point(20, 30) in rect)
```

```kotlin
// operator fun <T: Comparable<T>> T.rangeTo(that: T): ClosedRange<T>
val now = LocalDate.now()
val vacation = now..now.plusDays(10)
println(now.plusWeeks(1) in vacation)
```

```kotlin
operator fun ClosedRange<LocalDate>.iterator(): Iterator<LocalDate> =
  object : Iterator<LocalDate> {
    val current = state
    override fun hasNext() =
      current <= endInclusive
    override fun next() = current.apply {
      current = plusDays(1)
    }
  }

val newYear = LocalDate.ofYearDay(2017, 1)
val daysOff = newYear.minusDays(1)..newYear
for (dayOff in daysOff) { println(dayOff) }
// 2016-12-31
// 2017-01-01
```

```kotlin
val p = Point(10, 20)
val (x, y) = p
// val a = p.component1()
// val b = p.component2()

class Point(val x: Int, val y: Int) {
  operator fun component1() = x
  operator fun component2() = y
}
```

```kotlin
class Foo {
  var p: Type by Delegate()
}
```

```kotlin
class Person(val name: String) {
  private var _emails: List<Email>? = null
  val emails: List<Email>
    get() {
      if (_emails == null) {
        _emails = loadEmails(this)
      }
      return _emails!!
    }
}

class Person(val name: String) {
  val emails by lazy { loadEmails(this) }
}
```

```kotlin
fun twoAndThree(operation: (Int, Int) -> Int) {
  val result = operation(2, 3)
  println("The result is $result")
}
```

```kotlin
inline fun<T> synchronized(lock: Lock, action: () -> T): T {
  lock.lock()
  try {
    return action()
  }
  finally {
    lock.unlock()
  }
}

val l = lock()
synchronized(l) {
  // do something
}
```

```kotlin
fun lookForAlice(people: List<Person>) {
  people.forEach label@{
    if (it.name == "Alice") return@label
  }
  println("Alice might be somewhere")
}
```

```kotlin
val <T> List<T>.penultimate: T
  get() = this[size - 2]
```

```kotlin
class Processor<T> {
  fun process(value: T) {
    value?.hashCode() // value is nullable
  }
}

class Processor<T: Any> {
  fun process(value: T) {
    value.hashCode() // value is not nullable
  }
}
```

```kotlin
if (value is List<*>) { ... }
```

```kotlin
fun printSum(c: Collection<Int>) {
  if (c is List<Int>) {
    println(c.sum())
  }
}
```

```kotlin
inline fun<reified> isA(value: Any) = value is T
println(isA<String>("abc") // true
println(isA<String>(123))  // false
```

```kotlin
open class Animal {
  fun feed() { ... }
}

class Herd<T: Animal> {
  val size: Int get() = ...
  operator fun get(i: Int): T { ... }
}

fun feedAll(animals: Herd<Animal>) {
  for (i in 0 until animals.size) {
    animals[i].feed()
  }
}
```

```kotlin
interface FieldValidator<in T> {
  fun validate(input: T): Boolean
}

object DefaultStringValidator: FieldValidator<String> {
  override fun validate(input: String) = input.isNotEmpty()
}

object DefaultIntValidator : FieldValidator<Int> {
  override fun validate(input: Int) = input >= 0
}
```

```kotlin
class HasTempFolder {
  @get:Rule
  val folder = TemporaryFolder()

  @Test
  fun testUsingTempFolder() {
    val createdFile = folder.newFile("myfile.text")
    ...
  }
}
```

- `property`, `field`, `get`, `set`, `receiver`, `param`, `setparam`, `delegate`, `file`

```kotlin
data class Person(
  @JsonName("alias") val firstName: String,
  @JsonExclude val age: Int? = null
)
```
