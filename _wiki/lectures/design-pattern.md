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

## Builder Pattern
- Purpose:
  - Allows for the dynamic creation of objects based upon easily interchangeable algorithms.
- Use When:
  - Runtime control over the creation process is required.
  - Multiple representations of creation algorithms are required.
  - Object creation algorithms should be decoupled form the system.
  - The addtion of new creation funcitonality without changing the core code is necessary.

### Builder - Participants
- Client:
  - selects director and concrete builder to build the product
  - asks concrete builder to return final constructed product
- Director:
  - knows what steps it takes to build a product
  - but it does not know how each step is to be carried out
- Builder:
  - specifies an abstract interface for creating parts of a Product object
- Concrtete Builder:
  - constructs and assembles parts of the product by implementing the Builder interface
  - defines and keeps tractk of the representation it creates
  - provides an interface for retrieving the product
- Product:
  - represents the complex object under construction

### When a Builder Shouldn't Be Used
- If the interface is not stable the Builder has few benefits:
  - Every interface change requires a change to the Controller and impacts the abstract base class or its objects
  - A new method would require changing the base class and all concrete classes that will need to override the new method
  - A specific method interface change would require all concrete clases supporting the old method to change

### Related Patterns and Summary
- A Composite is what the Builder often builds
- A Builder is a Strategy that is specialized to create a composite object or data struct
- Comparison with Abstract Factory:
  - Builder constructs the object step-by-step and the reulst is requested at a later stage
  - Abstract factory returns the requested object immediately
  - Abstract factory does not have an abstract builder; application calls the factory methods directly

## Template Method Pattern
- Purpose:
  - Identifies the framework of an algorithm, allowing implementing classes to define the actual behavior.
- Use When:
  - A single abstract implementation of an algorithm is needed.
  - Common behavior among subclasses should be localized to a common class.
  - Parent classes should be able to uniformly invoke behavior in their subclasses.
  - Most of all subclasses need to implement the behavior

- The template pattern defines the steps of an algorithm and allows the subcalsses to implement one or more of the steps.
- Encapsulates an algorithm by creating a template for it.
- Defines the skeleton of an algorithm as a set of steps.
- Some methods of the algorithm have to be implemented by the subclasses - these are abstract methods in the super class.
- The subclasses can redefine certain steps of the algorithm without changing the algorithm's structure.
- Some steps of the algorithm are concrete methods defined in the super class.

### Design Princi8ple: Hollywood Principle
- The Hollywood Principle: Don't call us, we'll call you!:
  - It prevents "Dependency rot"
  - Dependency rot: high-level components depend on low-level components, and vice versa.
- With the Hollywood principle:
  - We allow low level components to hook themselves into a system
  - But high level components determine when they are needed and how.
  - High level components give the low-level components a "don't call use, we'll call you" treatement.

### Related Patterns
- Template Method uses inheritance to vary part of an algorithm.
- Strategy uses delegation to vary the entire algorithm.
- Factory Method is a specialization of Template Method

### Summary
- Hollywood Principle:
  - Don't call us, we'll call you
- Template Method Pattern:
  - Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
  - Template Method lets subclsses redefine certain steps of an algorithm without changing the algorithm's structure.

## Proxy Pattern
- Purpose:
  - Allows for object level access control by acting as a pass through entity or a placeholder object.
- Use When:
  - Access control for the original object is required.
  - Added funcitonality is required when an object is accessed.
- Proxy Pattern provides a surrogate or placeholder for another object to control access to it.

### Proxy Pattern Collaborations
- Subject:
  - defines the common interface for RealSubject and Proxy so that a Proxy can be used anywherer a RealSubject is expected
- RealSubject:
  - defines the real object that the proxy represents
- Proxy:
  - maintains a reference that lets the proxy access the real subject
  - provides an interface identical to Subject's so that a proxy can by substitued for the real subject
  - controls access to the real subject and may be responsible for creating and deleting it

### Applicability
- whenever there is a need for a more versatile or sophisticated reference to an object than a simple pointer:
  - remote proxy:
    - responsible for encoding a request and its arguments and for sending the encoded request to the real subject in a different address space
  - virtual proxy:
    - may cache additional information about the real subject so that they can postpone accessing it
  - protection proxy:
    - checks that the caller has the access permissions required to perform a request

### Distributed Computing
- Distributed Computing:
  - involves the design and implementation of applications as a set of cooperating software entities (processes, threads, objects) that are distributed across a network of machines
- Advantages to Distributed Computing:
  - Performance
  - Scalability
  - Resource Sharing
  - Fault Tolerance
- Difficulties in developing Distributed Computing systems:
  - Latency
  - Synchronization
  - Partial Failure

### Client-Server Model and Programming
- Client-Server Model:
  - Client - entity that makes a request for a service
  - Server - entity that responds to a request and provides a service
  - The predominant networking protocol in use today is the Internet Protocol (IP). The main API for writing client-server programs using IP is the Berkeley socket API.
- Programming:
  - Dealing with all of the details of the socket library calls can be tedious.
  - The java.net package provides classes to abstract away many of the detials of socket-level programing, making it simple to write client-server applications

### Remote Procedure Call (RPC)
- Disadvantage of Client-Server model:
  - Both the client and server had to be aware of the socket level details
- Wouldn't it be nice if even these details were abstracted away and the request to the server looked like a local procedure call from the viewpoint of the client?
- That's the idea behind a Remote Procedure Call (RPC), a technology introduced in the late 1970's.

### Serialization basics
- Serialization:
  - the process of transforming an in-memory object to a byte stream.
- Deserialization:
  - the inverse process of reconstructing an object from a byte stream to the same state in which the object was previously serialized.
- For an object to be serializable:
  - its class or some ancestor must implement the empty `Serializable` interface
- An empty interface is called a marker interface

### Object graphs and transient fields
- If an object has references to other objects or arrays, the entire object graph is serialized when the object is serialized.:
  - The object graph consists of the object directly serialized and any other objects or arrays to which the object has direct or indirect references.
- A field marked as `transient` is not impaced by serialization.:
  - During deserialization, transient fields are restored to their default values

### Related Patterns
- w.r.t. Interface:
  - Adapter provides a different interface to its subject
  - Proxy provides the same interface
  - Decorator provides an enhanced interface

- w.r.t. Structure:
  - Decorator and Proxy have similar structures
  - Both describe how to provide a level of indireciton to another object, and the implementations keep a reference to the object to which they forward requests

## Chain of Responsibility Pattern
- Purpose:
  - Gives more than one object an opportunity to handle a request by linking receiving objects together.
- Use When:
  - Multiple objects may handle a request and the handler doesn't have to be a specific object.
  - A set of objects should be able to handle a request with the handler determined at runtime.
  - A request not being handled is an acceptable potential outcome.

- Each object in the chain:
  - receives the request
  - handle it or forward it to the next object
- Notice:
  - Object making the request has no knowledge of which object is handling the request
  - The request has an implicit receiver

### HelpHandler class diagram
- Each object in the chain shares a cmmon interface for handling requests and accessing its successor on the chain

### Participants
- Handler:
  - defines an interface for handling the requests
  - (optional) implements the successor link
- Concrete Handler:
  - handles requests it is responsible for
  - can access its successor
  - if the COncrete Handler can handle the request, it does so; other wise it forwards the request to its successor
- Client:
  - initiates the reuqest to a COncrete Handler object on the chain

### Consequences
- Benefits:
  - Decoupling of senders and receivers
  - Added flexibility
  - Sender doesn't need to know specifically who the handlers are
- Potential Drawbacks:
  - Client can't explicitly specify who handles a request
  - No guarantee of request being handled (requirest falls off end of chain)

### Implementation
- Implementing the successor chain:
  - Option 1 : Define new links (in Handler or COncreteHandler)
  - Option 2 : Use existing links (such as the parent references from the Composite pattern)
- Connecting successors
- Representing requests

### Related pattern
- Chain of responsibility is often applied in conjuction with Composite.
- Chain of Responsibility, Command, Mediator, and Observer, address how you can decouple senders and receivers, but with different tradeoffs.:
  - Chain of Responsibility passes a sender request along a chain of potential receivers.
- Chain of Responsibility can use Command to represent requests as objects.

## Bridge Pattern
- Purpose:
  - Defines an abstract object structure independently of the implementation object structure in order to limit coupling.
- Use When:
  - Abstractions and implementations should not be bound at compile time.
  - Abstractions and implementations should be independently extensible.
  - Implementation details should be hidden from the client.

### Problem Analysis
- Problem: the class explosion, because:
  - the coupling of the abstraction and the implementation is tight
  - each type of shape must know what type of drawing program it is using.
- Solution:
  - Need to separate the variations in abstraction from the variations in implementation so that the number of classes only grows linearly

### Introducing Bridge Pattern
- Intent of the Bridge pattern:
  - decouples an abstraction from its implementation so that the two can vary independently

### Structure of Bridge Pattern
- Abstraction (and RefinedAbstraction) is a high-level control layer for some entity
- This layer isn't supposed to do any real work on its own.
- It should delegate the work to the implementation layer (also called platform).

### Participants & Collaborations
- Abstraction:
  - defines the abstraction's interface
  - maintains a reference to the Implementor
  - forwards requests to the Implementator (collaboration)
- RefinedAbstraction:
  - extends absraction interface
- Implementator:
  - defines interface for implementations
- ConcreteImplementor:
  - implemnts Implementor interface

### Comparision with Adapter
- Similarities:
  - Both used to hide the details of the underlying implementation.
- Difference:
  - The adapter pattern is geared towards making unrelated components work together:
    - Applied to systems after they're designed (reengineering, interface engineering).
  - The bridge pattern is used up-front in a design to let abstractions and implementations vary independently.:
    - Designing "extensible system"
  - Structural difference:
    - Bridge can abstract a complex entity from its implementation
    - Adapter only abstracts a single interface

### Summary
- Bridge pattern:
  - lets you split a large class or a set of closely related classes into two separate hierarchies - abstraction and implementation - which can be developed independently of each other.

## Prototype Pattern
- Purpose:
  - Create objects based upon a template of an existing objects through cloning.
- Use When:
  - Composition, creation, and representation of objects should be decoupled from a system.
  - Classes to be created are specified at runtime.
  - Objects or object structures are required that are identical or closely resemble other existing objects or object structures.
  - The initial creation of each object is an expensive operation.
  - When to avoid building a class hierarchy of factories that parallels the class hierarchy of products.

### Prototype - participants
- Prototype:
  - defines the interface (an operation) of cloning itself.
- ConcreteProduct1 and ConcreteProduct2:
  - Concrete objects that can clone themselves.
- Client:
  - Obtain more objects by asking them to clone themselves.

### What's so special about the pattern?
- Advantages of creational patterns:
  - Hides concrete product classes from clients
  - Decouples the clients from the creational process
- Unique feature of Prototype:
  - Prototypes can be supplied and changed at runtime
  - Thus, it provides great flexibility in configuring and changing a program at runtime:
    - Adding and removing products at run-time
    - Reduced subclassing
    - Configuring an application with classes dynamically:
      - Loading the classes dynamically

### Cloning in JAVA
- Java provides support from cloning with `Cloneable` interface and a protected method clone method in the Object class.
- Any class using the built-in cloning mechanism is supposed to:
  - Implement the Cloneable interface
  - Define a concrete public or protected `clone()` operation
  - In the `clone()` operation, obtain a new object by calling `super.clone()`
- Default `clone()` operation makes a shallow copy!

### Review
- Be aware of the shallow cloning VS deep cloning
- Prototypes are useful when object initialization is expensive, and you anticipate few variations on the initialization parameters. In this context, Prototype can avoid expensive "creation from scratch", and support cheap cloning of a pre-initialized prototype.
- Abstract Factory and Prototype can be used together:
  - Abstract Factory can store set of prototypes which are cloned to return product objects
- Very useful with Composite and Decorator patterns

## Visitor Pattern
- Purpose:
  - Allowing one or more operations to be applied to a set of objects at runtime
  - Decoupling the operations from the object structure (= the set of objects)
- Use when:
  - An object structure must have many unrelated operations performed upon it
  - The object structure can't change but operations on it can
  - Operations must be performed on the ocncrete classes of an object structure
  - Operations should be albe to operate on multiple object structures that implement the same interface sets

### Motivations and Benefits
- Motivations:
  - An object structure contains many classes of objects
  - Many distinct and unrelated operations on these objects -> We want to avoid "polluting" their classes
  - Classes defining the object structure rarely change, but operations change frequently
- Benefits:
  - Makes adding new operations easy
  - Gathers related operations and separates unrelated operations
  - Visitors can visit objects that don't have a common parent class

### Participants
- Visitor:
  - declares a visit operation for each class of ConcreteElement in the ojbect structure
- ConcreteVisitor:
  - implements each operation declared by Visitor
- Element:
  - defines an Accept operation that takes a visitor as an argument
- ConcreteElement:
  - implements an Accept operation that takes a visitor as an argument
- ObjectStructure:
  - can enumerate its elements
  - may provide a high-level interface to allow the visitor to visit its elements
  - may be a composite or a collection like a set or list

### Collaborations
- A client must create ConcreteVisitor object and then traverse the object structure, visiting each element with the visitor
- When the element is visited, it calls the Visitor operation that corresponds to its class.
- The element supplies itself as an argument to this operation to let the visitor access its state, if necessary

### Method Overloading
- Method overloading, however, is done at compile time:
  - useing "name mangling" where the internal name of the method has the argument's type encoded in it
  - Different from method overriding (run-time polymorphism)

### Technical Details
- Double Dispatch:
  - special form of multiple dispatch
  - a mechanism that dispatches a method call to different concrete methods depending on the runtime types of two objects involved in the call
- Single Dispatch:
  - In most object-oriented systems, the concrete method that is called from a method call in the code depends on the dynamic type of a single object and therefore they are known as single dispatch calls or simply virtual function(method) calls

### How Double-dispatch is implemented in Visitor Pattern
- Consequently, the implementation of the visit method is chosen based on both:
  - The dynamic type of the element
  - The dynamic type of the visitor
- This effectively implemnts double dispatch:
  - Common Lisp language's object system supports multiple dispatch (not just single dispatch), and implementing the visitor pattern in Common Lisp is trivial

### Benefits
- Visitor makes adding new operations easy:
  - You can define a new operation simply by adding a new visitor
  - In contrast, if you spread funcitonality over many classes, then you must change each class to define a new operation
- A visitor gathers related operations and separates unrelated ones:
  - Related behavior is not spread over the classes defining the object strcture; it's localized in a visitor
  - Unrelated sets of behavior are partitioned in their own visitor classes

### Liabilities
- Adding new ConcreteElement classes is hard:
  - The Visitor pattern makes it hard to add new subclasses of Element
  - Each new COncreteElement gives rise to a new abstract operation on Visitor and a corresponding implementation in every ConcreteVisitor class
- Breaking encapsulation:
  - Visitor's approach assumes that the ConcreteElement interface is powerful enough to let visitors do their job
  - The pattern often ofrces you to provide public operations that access an element's internal state, which may compromise its encapsulation.

### Implementation of Traversal
- Who is responsible for traversing the object structure?:
  - A visitor must visit each elemnt of the object structure.
  - We can put responsibility for traversal in any of three places:
    - In the object structure
    - In the visitor
    - In a seperate Iterator object
  - Having the traversal code in the visitor is the least preferred option, as it forces you to repeat the code in every ConcreteVisitor for each ConcreteElement

### Summary
- The Visitor Design Pattern:
  - (+) makes adding new operations easy
  - (+) gathers related operations and separates unrelated ones
  - (-) adding new COncreteElement classes is hard
  - (-) Breaks encapsulation
- Implementation Issues:
  - Who is responsible for traversing the object structure?
