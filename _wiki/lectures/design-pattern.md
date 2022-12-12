---
layout  : wiki
title   : lectures/design-pattern
date    : 2022-10-23 00:15:47 +0900
lastmod : 2022-10-23 20:24:38 +0900
tags    : [design-pattern, lecture]
draft   : false
parent  : lectures
---

## 5. Factory
### Factory Patterns
- Creational patterns:
  - Allow to creating new objects without explicitly using the new operator
  - We can instantiate different objects without modifying client code!
- Factory Method:
  - Uses inheritance to decide the object to be instantiated
- Abstract Factory:
  - Delegates object creation to a factory object

### Factory Method Pattern
- Purpose:
  - Exposes a method for creating objects, allowing subclasses to constrol the actual creation process.
- Use When:
  - A class will not know what classes it will be required to create.
  - Subclasses may specify what objects should be created.
  - Parent classes wish to defer creation to their subclasses.

- Defines an instance for creating an object, but lets subclasses decide which class to instantiate.
- Factory Method lets a class defer instantiation to subclasses

### Design Principle: Dependency Inversion Principle
- Dependency Inversion Principle:
  - Depend upon abstractions. Do not depend upon concreate classes.
  - High-level components should not depend on low-level components; rather, they should both depend on abstractions
- Factory Method is one way of following the dependency inversion principle

### Factory Method Pattern
- What exactly does it mean by saying that "the Facotry Method Pattern lets subclasses decide which class to instantiate?":
  - Creator class is written in such a fashion that it does not know what actual Concrete Product class will be instantiated. The Concreate Product class to be instantiated is determined solely by which Concrete Creator subclass is instantiated and sused by the application.
  - It does not mean that the subclass decides at runtime which ConcreteProduct class to create

### Abstract Factory Patttern
- Purpose:
  - Provide an interface that delegates creation calls to one or more concrete classes in order to deliver specific objects.
- Use When:
  - The creation of objects should be independent of the system utilizing them.
  - Systems should be capable of using multiple families of objects.
  - Families of objects must be used together.
  - Libraries must be publisehd without expsing implementation details.
  - Concreate classes should be decoupled from clients.

### Factory Paterns
- Abstract factory pattern is one level of abstraction higher than the factory method pattern
- Mechanisms:
  - Abstract Factory pattern uses composition & delegation
  - Factory Method pattern uses inheritance

### Participants
- AbstractFactory:
  - Declares an interface for operations that create abstract product objects
- Concreate Factory:
  - Implements the operations to create concreate product objects
- Abstract Product:
  - Declares an interface for a type of product object
- ConcreateProduct:
  - Defines a product object to be created by the corresponding concreate factory
  - Implements the AbstractProduct interface
- Client:
  - Uses only interfaces declared by AbstractFactory and AbstractProduct classes

### Abstract Factory Pattern
- Consequences:
  - (+) Isolates concrete classes:
    - Factory encapsulates responsibility and process of creating parts
    - Isolates clients from implementation classes
  - (+) Exchanging product families easy:
    - Concret factory appears once where it is instantiated
  - (+) Promotes consistency among products
  - (-) Supporting new kinds of proudcts is difficult:
    - Fixes set of parts to be created

### Related Patterns
- Abstract Factory:
  - classes are often implemented with Factory Methods
  - but they can also be implemented using Prototype
- Easy start -> Factory Method:
  - less complicated, more customizable, subclasses proliferate
  - Later evolve toward Abstract Factory, Prototype, or Builder when more flexibility is needed.

### Summary
- Dependency Inversion Principle (DIP):
  - Depend on abstractions. Do not depend on concreate classes
- Factory Method:
  - Define an interface for creating an object, but let subclasses decide which class to instantiate.
  - Class-scope pattern (uses only inheritance)
- Abstract Factory:
  - Provide an interface for creating families of related or dependent objects without specifying their concreate classes
  - Object-scope pattern (uses object composition & delegation)

## 6. Adapter Pattern
- Also known as:
  - Wrapper
- Purpose:
  - Permits classes with different interfaces to work together by creating a common object by which they may communicate and interact.
- Use When:
  - A class to be used doesn't meet interface requirements.

### Typical working process and Motivation
- Mechanism:
  - A client makes a request to the adapter by calling a method on it using the target interface
  - The adapter translates the rquest into one or more calls on the adaptee using the adpatee interface
  - The client receives the resutls of the call and never knows there is an dapter doing the translation
- Motivation:
  - A toolkit or class library may have an interface which is incompatible wich an application's interface we want to integrate.
  - It is possible that we do not have access to the source code of the toolkit or library.
  - Even if the source code is available, we may want to minimize the change

### Implementation Issues
- How much adaptation?:
  - Simple and straightforward interface conversion such as:
    - Chaning method names
    - Changing the order of arguments
  - Totally different set of operations
- Two-way transparency?:
  - A two-way adapter supports both the Target and the Adaptee interface. It allows an adapted object (Adapter) to appear as an Adaptee object or a Target object

### Summary
- Adapter pattern:
  - Converts the interface of a class into another interface clients expect.
  - Lets classes work together that couldn't otherwise because of incompatible interfaces
  - Class adapter and object adapter

## 7. Facade Pattern
- Purpose:
  - Supplies a single interface to a set of interfaces within a system.
- Use When:
  - A simple interface is needed to provide access to a complex system.
  - There are many dependencies between system implementations and clients.
  - Systems and subsystems should be layerd.

- Provides a unified interface to a set of interfaces in a subsystem. It defines a higher-level interface that makes a subsystem easier to use

### Motivation
- In typical OO Design,:
  - Structuring a system into subsystems helps reduce complexity
  - Subsystems are groups of classes, or groups of classes and other subsystems
  - May produces many minimal classes
- Problems:
  - Class/Subsystem interface can become quite complex:
    - Too many options to use!
  - A new-comer cannot figure out where to begin
- Solution:
  - Facade object provides a single, simplified interface to the more general facilities of a subsystem

### Benefits
- Hides the implementation of the subsystem from clients:
  - makes the subsystem easier to use
- Promotes weak coupling between the subsystem and its clients:
  - allows changing the classes comprising the subsystem without affecting the clients
- Does not prevent sophisticated clients from accessing the underlying classes
- Notice: Facde does not add any functionality, it just simplifies interface

### The Principle of Least Knowledge (Law of Demeter)
- Talk only to your immediate friends:
  - When you design a system, you should be careful of the number of classes it interacts with and also how it comes to interact with those classes
  - A method m of an object o may only invoke the methods of the following kinds of objects

### Facade Review
- Provides a unified interface to a set of interfaces in a subsystem.
- Facade defines a higher-level interface that makes the subsystem easier to use

### Related Patterns
- Mediator:
  - Mediator's colleagues are aware of Mediator
- Facade:
  - Unidirecitonal rather than cooperative interactions between object and subsystem
  - The subsystem doesn't know about the Facade
  - Facade doesn't add funcitonality, Mediator does

## 8. Singleton Pattern
- Purpose:
  - Ensures that only one instance of a class is allowed within a system.
- Use When:
  - Exactly one instance of a class is required.
  - Controlled access to a single object is necessary.

### Design Points
- Make the constructor be private:
  - `private Singleton() {}`
- Provide a getInstance() method:
  - `public static Singleton getInstance()`
- Remember the instance once you have created it.

### Reviewing the Options
- Synchronize the getInstance() method (Option 1):
  - A straightforward technique that is guaranteed to work. It causes small impact on run-time performance due to frequent locking.
- Use eager instantiation (Option 2):
  - In case we are alwasy going to instantitate the calss, then statically initializing the intsance would cause no concerns.
- Double checked locking (Option 3):
  - A perfect solution w.r.t performance. However, double-checked locking may be overkill in case we have no performance concerns. In addition, we'd have to ensure that we are running at least Java 5.

### Related Patterns and Summary
- Abstract Factory, Builder, and Prototype can use Single in their implementation
- Facade objects are often Singletons because only one Facade object is required.
- State objects are often Singletons.
- Singleton pattern:
  - creates at most one instance
  - Implemenation: beware of multi-threaded issue

## 9. Mediator Pattern
- Purpose:
  - Allows loose coupling by encapsulating the way disparate sets of objects interact and communicate with each other.
- Use When:
  - Communication between sets objects is well defined and complex.
  - Too many relationships exist and common point of control or communication is needed.

### Battling Class Complexity
- Let's abstract this to classes and their objects in a program:
  - When objects are allowed to communicate directly with each other, then they become too tightly coupled.
  - When one object wishes to send a message to another then we need the equivalent of an air traffic controller to forward the message to the recipient
  - Keep the dispatching information inside the new controller
  - Call this coordinating object a mediator

### Mediator Pattern
- Encapsulates interconnects between objects into Mediator:
  - communications hub
  - Reponsible for coordinating and controlling colleague interaction
- Promotes loose couping betwee nclasses:
  - By preventing from referring to each other explicitly
  - Mediator is commonly used to coordinate related GUI components
- (-) mediators are hardly ever reusable
- (+) easy to understatnd the flow of communication

### Decoupling Senders and Receivers
- Observer Pattern:
  - decouples subjects and observers by an interface for signaling changes
  - a subject may have multiple observers
  - the number of observers can vary at run-time
  - best for decoupling objects with data dependencies

- Mediator Pattern:
  - decouples objects (Colleagues) through a Mediator object
  - routes requests between Colleague objects
  - centralizes communication between Colleague objects

### Communication: Encaplusate vs. Distribute
- Mediator:
  - encapsulates communication between objects
  - centralizes communications
  - maintains a communication constratin in the mediator
  - (-) mediators are hardly ever reusable
  - (+) easier to understand the flow of communication
- Observer:
  - distributes communication by introducing Observer and Subject objects
  - observer and subject cooperate to maintain a constraint
  - (+) easire to make reusable observers and subects
  - (-) difficulat to understand the flow of communication

## 10. SOLID
- The Single-Responsibility Principle (SRP)
- The Open-Closed Principle (OCP)
- The Liskov Substitution Principle (LSP)
- The Interface Segregation Principle (ISP)
- The Dependency Inversion Principle (DIP)

### The Single Responsibility Principle
- Responsibility:
  - "a contract or obligation of a class"
  - reason to change:
    - More responsibilities == More likelihood of change
    - The more a class changes, the more likely we will introduce bugs
    - Changes can impact the others
- SRP: Separate coupled responsibilities into separate classes:
  - Related measure - Cohesion: how strongly-related and focused are the various responsibilities of a module

### Open Closed principle
- Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
- You should be able to extend a class's behavior, without modifying it.

#### Conforming to OCP
- Open for extension:
  - Behavior of the module can be extended
  - We are able to chnage what the module does
- Closed for modification:
  - Extending behavior does not result in excessive modification such as architectural changes of the module
- Violation Indicator: Design Smell of Rigidity:
  - A single change to a program results in a cascade of changes to dependent modules

#### Abstraction is the Key!
- Abstractions:
  - Fixed and yet represent an unbounded group of possible behaviors
  - Abstract base class: fixed
  - All the possible derived classes : unbounded group of possible behaviors
- Program the class:
  - to interfaces (or abstract classes)
  - not to implementation (concrete classes)

#### Anticipating Future Changes
- Strategy is needed:
  - Choose the kinds of changes against which to close design
  - Guess the most likely kinds of changes, and then construct abstractions to protect him from those changes.
- Beware: Consider the cost!:
  - Conforming to OCP is expensive
  - Time and effort to create appropriate abstractions
  - Abstractions also increase complexity

- Do not put hooks in for changes that might happen:
  - "Fool me once, shame on you. Fool me twice, shame on me"
  - Initially write the code expecting it to not change.
  - When a change occurs, implement the abstractions that protect from future changes of that kind.
  - It's better to take the first hist as early as possible:
    - We want to know what kind of changes are likely before going too far in the development.
  - Use TDD and listen to the tests.

### Liskov Substitution Principle
- Subtypes must be substitutable for their base types
- Drvied classes msut be substitutable for their base classes

- A rule that you want to check when you decide to use inheritance or not
- If C is a subtype of P, then objects of type P may be replased with objects of type C without altering any of the desirable properties of the program

#### Subtytping VS Implementation Inheritance
- Subtyping:
  - establishes ans IS_A relationsihp
  - also known as interface inheritance
- Implementation Inheritance:
  - only reuses implementation and establishes a syntactic relationship not necessarily a semantic relationship
  - Also known as code inheritance
- Most OOP languages like Java, C++, and C#, inheritance keyword such as "extends" does the both Subtypign and Implementation Inheritance:
  - But some languages disthingushi them

- Think twice when you dicide to use Inheritance!:
  - If you want to reuse implementation of List, you had better exploit object composition, not inheritance.
  - If you inherit Queue from List, then you violate LSP since Queue object cannot be substituable for List.

### Dependency Inversion Principle
- High-level modules should not depend on low-level modules. Both should depend on abstractions
- Abstractions should not depend on details. Details should depend on abstractions.
- Why Inversion?:
  - DIP attempts to "invert" the dependencies that result from a structured analysis and design approach

#### Inversion of Ownership
- Its not just an inversion of dependency, DIP also inverts ownership:
  - Typically a service interface is "owned" or declared by the server, here the client is specifying what they want from the server
  - DIP -> Clients should own the interface!

### Interface Segregation Principle (ISP)
- Clients should not be forced to depend on methods they do not use
- Make fine grained interfaces that are client specific

#### Fat interface
- Bundling functions for different clients into one interface create unnecessary coupling among the clients.:
  - When one client causes the interface to change, all other clients are forced to recompile.:
    - Solution: Break the interface into cohesive groups
- ISP solves non-cohesive interfaces:
  - Clients should know only abstract base classes that have cohesive interfaces

### Summary
- SOLID:
  - Single-Responsibility Principle
  - Open-Closed Principle
  - Liskov Substitution Principle
  - Dependency Inversion Principle
  - Interface Segregation Principle
- Design Principles:
  - Help manage dependency
  - Better maintainability, flexivility, robustness, and reusability
  - Abstraction is important

## 11. Iterator Pattern

### The Iterator Pattern
- Also Known As:
  - Cursor
- Purpose:
  - Allows for access to the elements of an aggregate object without allowing access to its underlying representation.
- Use When:
  - Access to elements is needed without access to the entire representation.
  - Multiple or concurrent traversals of the elements are needed.
  - A uniform interface for traversal is needed.
  - Subtle differences exist between the implementation details of various iterators.

### Iterator Pattern
- Provides a way to access the elemetns of an aggregate object sequentially without expsoing its underlying representation.

### Related Patterns
- Iterator can traverse a Composite. Visitor can apply an operation over a Composite.
- Polymorphic iterators rely on Factory Methods to instantiate the appropriate Iterator subclass.
- Memento is often used in conjunction with Iterator. An Iterator can use a Memento to capture the state of an interation. The Iterator stores the Memento internally.


### Summary
- Single Responsibility Principle:
  - A class should have only one reason to chnage
- Iterator Pattern:
  - Provide a way to access the elemtns of an aggregate object sequentialy without exposing its underlying representation

## 12. Composite Pattern
- Purpose:
  - Facilitates the creation of object hierarchies when each object can be treated independently or as a set of nested objects through the same interface.
- Use When:
  - Hierarchical representations of objects are needed.
  - Objects and compositions of objects should be treated uniformly.

### Things to Consider
- A composite object stores the information about its contained components:
  - It depends on applications. Having these references supports the Chain of Responsibility pattern

### Related Patterns
- Composite vs Decorator:
  - Both have similar structure diagrams:
    - recursive composition to organize an open-ended number of objects
  - Different intentions:
    - Decorator lets you add responsibilities to objects without subclassing
    - Composite's focus is not on embellishement but on representation
    - They are complementary; hence, Composite and Decorator are often used in concert
- Iterator:
  - Provide a way to access the elements of an aggregate object (=typically uses composite pattern) sequentially without exposing its underlying representation

### Summary
- Composite Pattern:
  - compose objects into tree structures to represent whole-part hierarchies.
  - lets clients treate individual objects and compositions of objects uniformly


## Decorator Pattern
- Purpose:
  - Allows for the dynamic wrapping of objects in order to modify their existing responsibilities and behaviors.
- Use When:
  - Object responsibilities and behaviors should be dynamically modifiable.
  - Concreate implementations should be decoupled from responsibilities and behaviors.
  - Subclassing to achieve modification is impractical of impossible.
  - Specific functionality should not reside high in the object hierarchy.
  - A lot of little objects surrounding a concrete implementation is acceptable.

### Design Princple: OCP
- Open Closed Principle:
  - Classes should be open for extension, but closed for modification
  - Allow classes to be easily extended to incorporate new behavior without modifying existing code.
  - resilient to change and flexible enough to take on new functionality to meet chaning requirements.
- Caution: Don't try applying the Open-Closed Principle (OCP) to every single case. Keep simple designs if possible!

### Review of Decorator Idea
- The decorator adds its own behvior.
- You can use one or more decorators to wrap an object.
- We can pass around a decorated object in place of the original (wrapped) object.
- Decorators have the same super type as the objects they decorate.
- We can decorate objects dynamically at runtime with as many decorators as we want

### The Definition of the Decorator
- The Decorator Pattern attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionaliy.

### Related Patterns
- Regarding the interfaces:
  - Adapter provides a different interface to its subject
  - Proxy provides the same interface
  - Decorator provides an enhanced interface

### Summary
- Design Principle: Open-Closed Principle (OCP)
- Advantages:
  - attaches additional responsibilities to an object dynamically
  - flexible alternative to subclassing for extending functionality
- Key mechanism:
  - Uses object composition and delegation
  - Decorator class mirrors the type of components they are decorating
    - We can wrap a component with any number of decorators
- Disadvantage:
  - can generate a lot of small classes
  - hard to understand if not familiar with the pattern
  
## State Pattern
- Purpose:
  - Ties object circumstances to its behavior, allowing the object to behave in different ways based upon its internal state.
- Use When:
  - The behavior of an object should be influenced by its state.
  - Complex conditions tie object behavior to its state.
  - Transitions between states need to be explicit.
  
### Applicaility of the State Pattern
- Use the State pattern when:
  - An object's behavior depends on its state, and it must change its behavior at run-time depending on that state
  - Operations have large, multipart conditional statements that depend on the object's state. The State pattern puts each branch of the conditional in a separate class.

### Consequences of the State Pattern
- Benefits:
  - Puts all behvior associated with a state into one object
  - Allows state transition logic to be incorporated into a state object rather than in a monolithic if or switch statement
  - Helps avoid inconsistent states since state changes occur using just the one state object and not several objects or attributes
- Liabilities:
  - Increased number of objects
  
### State vs. Strategy
- Note the similarities between the State and Strategy patterns!:
  - The difference is one of intent.
- A State object encapsulates a state-dependent behavior (and possibly state transitions):
  - The context's behavior chnages over tim
  - An alternative to putting lots of conditionals in the context
- A Strategy object encapsulates an algorithm:
  - Often, there is a strategy object that is most appropriate for a context object
  - A flexible alternative to subcalssing
- They are both examples of Composition with Delegation!

### Summary
- State Pattern:
  - Encapsulate state-based behavior and delegate behavior to the current state
- Strategy Pattern:
  - Encapsulate interchangeable behaviors and use delegation to decide which behavior to use
- Template Method:
  - Subclasses decide how to implement steps in an algorithm
