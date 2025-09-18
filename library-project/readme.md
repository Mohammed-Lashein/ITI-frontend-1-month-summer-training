# Library project

This project is really fantastic!
I like the solution by [the amazing engineer michalosman](https://github.com/michalosman/library) which has nice naming conventions and the code is well structured so that beginners can follow along.

I was learning design patterns like factory and data mapper, so I tried to implement these.
I would say that I was bragging with adding real world structure to a small application that won't need this separation of concerns at all, but consider it as an introduction to design patterns in a non-advanced way.

## Table of contents: 
  - [Note 1 : ESM private scope](#note-1--esm-private-scope)
  - [`generateBookId` function](#generatebookid-function)
  - [`BookFactory` and `BookMapper` circular dependencies](#bookfactory-and-bookmapper-circular-dependencies)
  - [Using spread syntax in a method call](#using-spread-syntax-in-a-method-call)
  - [Functions hoisting, deep dive](#functions-hoisting-deep-dive)
  - [Switching back from react to vanilla js mindset](#switching-back-from-react-to-vanilla-js-mindset)
  - [switching back from ... to ... grammatical sidenote](#grammatical-note-regarding-switching-back)
  - [the return of `this` quirks](#the-return-of-this-quirks)
  - [Sticky footer note](#create-a-sticky-footer)
  - [Static variable syntax in js](#static-variable-syntax-in-js)
  - [flex stuff](#flex-stuff)
  - [Selectors specificity revisited](#selectors-specificity-revisited)
  - [HSL explained](#hsl-explained)
  - [JavaScript classes quirks](#javascript-classes-quirks)
  - [Classes design notes](#classes-design-notes)
  - [Export a class or utils?](#export-a-class-or-utils)
  - [Why use a DataMapper?](#why-would-we-use-datamapper-when-we-can-stringify-directly-the-object-instance-since-it-is-also-a-js-object)

### Note 1 : ESM private scope
In `modal.js` I declared a `form` constant to attach an event listener to it.
I also needed to re-declare the `form` constant in `form.js` in order to run form submission logic.

I thought that on importing both files in `main.js`, I would get an error since I will be redeclaring the same constant. But I got no errors at all!

After asking claude, he told me that each ESM has its own private scope.
Even if we import the whole module within another module, no conflicts will take place.

Note that this differs from: 
```js
<script src="./form.js"></script>
<script src="./modal.js"></script>
```
The above `script` tags are not declared as modules, so if we declared a constant in `form.js`, we would not be able to re-declare it in `modal.js` since the contents of both scripts are sent to the browser as one script.

You can read more about this in an article in [the odin project](https://www.theodinproject.com/lessons/javascript-es6-modules).

### `generateBookId` function
This function has 2 ways of implementation: 
```js
/* 
  the generateBookId() function could have been written as a closure, instead of depending on the quirky
  behavior that functions in js are first class objects, meaning that they can be treated like any other 
  object in the language -- thanks gemini for that last sentence :) 
*/
function generateBookId() {
  if(typeof generateBookId.count === 'undefined') {
    generateBookId.count = 0
  }
  return generateBookId.count++
}
```
AND
```js
function generateBookId() {
  let count = 0;
  return function() {
    return count++;
  } 
}
const bookIdGenerator = generateBookId()
```
I prefer using closures, since I recently read about them while studying from [mastering js functional programming book](https://github.com/Mohammed-Lashein/mastering-js-functional-programming-book-code/tree/main/chapter2)
_____
### `BookFactory` and `BookMapper` circular dependencies
If you focus in the code of these 2 classes, you will find that they depend on each other (causing a circular dependency).

What is the solution then ? 🤔  
As claude suggested, I can move the rendering of the books to another class, thus removing the responsibility of books rendering from the factory and mapper.
In a nutshell, the new class, maybe named `BooksRenderer` is responsible for importing both `BookFactory` and `BookMapper` in order for us to avoid the circular dependency problem. 

Let's continue the talk about the circular dependency:  
I searched about that issue online, and I found [this stackoverflow question](https://stackoverflow.com/a/4007487/16385537) that addressed the problem. After looking into the code, it seems that this code **intentionally** has circular dependency, so why can't I have it then?
```java
public class Team {

    private List<Player> players;

    public void removePlayer(Player player) {
        removePlayerFromTeam(player);
        player.removeFromTeam();
    }
    public void removePlayerFromTeam(Player player) {
        players.remove(player);
        //domain stuff
    }
}

public class Player {
    private Team team;

    public void removeFromTeam() {
         team = null;
        //domain stuff
    }
    public void leaveTeam() {
        team.removePlayerFromTeam(this);
        removeFromTeam();
    }

}
```

After asking claude, he pointed out that yes in the `Team` and `Player` classes situation, they have a circular dependency but it corresponds to their **bidirectional domain relationship**: 
1. A Team has Players
2. A Player belongs to a Team
3. Both need to know about each other in order for the relationship to work correctly

But in my code, there is no need to call the `BookFactory` within `BookMapper.getBooks()`.
Claude suggested using `BookMapper.fromStorage()` instead, since it does the same functionality as `BookFactory.create()` but instead is a method of `BookMapper`.
______
### Using spread syntax in a method call
In this code snippet: 
```js
  let book = BookFactory.create(null, ...data) 
```
I got an error in the console saying: 
> Uncaught TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function

I thought the problem was with `BookFactory.create()` method. But aren't methods functions?  
Yes for sure. And after asking claude, he explained the error (I paraphrase it): 
> It is not that a method is not a function. The problem lies in that we are spreading an object in the place of function arguments.

But hey, we do so in react all of the time. What's the problem now?  
You can spread `props` in jsx, but you can't do so in vanilla js specially in function arguments.

This is really weird. How are we able to do so in jsx but not in vanilla js?  
This is how transpilers work. You provide them with any syntax you want and they transform it to the corresponding code that can work.  

I found this [nice comment on stackoverflow](https://stackoverflow.com/questions/74935127/spreading-props-in-react-as-attributes#comment132238814_74935127) that explains this issue. 

As a finale, I would like to quote from [mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax): 
> The **spread** (...) syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected. In an *object literal*, the spread syntax enumerates the properties of an object and adds the key-value pairs to the object being created.

Notice how they explicitly mention that the behavior of spread operator works in **object literals**, not on passing an object as an argument to a function.
_____
### Functions hoisting, deep dive
In this code snippet: 
```js
function getBookFormData() {
  // I used them initially but thought about moving this mission to a dedicated function for better  reusablility
  const bookTitle = document.querySelector("input[name='book_title']")
  const bookAuthor = document.querySelector("input[name='book_author']")
  const bookNumberOfPages = document.querySelector("input[name='book_pages_number']")
  const isReadCheckbox = document.querySelector("input[name='is_read']")

  const {bookTitleElement, bookAuthorElement, bookNumberOfPagesElement, isReadCheckboxElement} = getBookFormElements()

  return {
    title: bookTitleElement.value,
    author: bookAuthorElement.value,
    pagesNumber: bookNumberOfPagesElement.value,
    isRead: isReadCheckboxElement.checked
  }
}

function getBookFormElements() {
  const bookTitle = document.querySelector("input[name='book_title']")
  const bookAuthor = document.querySelector("input[name='book_author']")
  const bookNumberOfPages = document.querySelector("input[name='book_pages_number']")
  const isReadCheckbox = document.querySelector("input[name='is_read']")

  return {
    bookTitleElement: bookTitle,
    bookAuthorElement: bookAuthor,
    bookNumberOfPagesElement: bookNumberOfPages,
    isReadCheckboxElement: isReadCheckbox,
  }
}
```
How does calling `getBookFormElements` within `getBookFormData` doesn't throw any errors?  
I know that hoisting exists, but even with hoisting, `getBookFormData` would be declared above `getBookFormElements` so technically I shouldn't be able to call `getBookFormElements`.   

=> I read about hoisting in [mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_hoisting), but the example present there is not clear enough to address my question.  

I asked claude, and he told me that **all** function declarations are hoisted to the top of the file before the execution starts. So when I call `getBookFormData`, `getBookFormElements` is already in memory and ready to be called.

Does php have the same principle of function hoisting? I searched their docs but didn't find any mention of that keyword.  
=> After reading [in the docs](https://www.php.net/manual/en/functions.user-defined.php) I found that they document the behavior but don't use the keyword *hoisting*.  
I asked claude about so, he told me that php has different behavior from js where php: 
1. **parses the entire file first** before executing any code
2. **Registers all function definitions** during this initial parse
3. **then executes** the code line by line

Claude summarized: 
> PHP doesn't "move" these functions to the top like JavaScript would. Instead, it knows about all functions before execution begins.
____
### Switching back from react to vanilla js mindset
In this code snippet: 
```js
// book/Book.js
class Book {
  // somewhere in the class...
    render() {
    const article = document.createElement('article')
    article.className = 'book'
    const bookTitle = document.createElement('p')
    bookTitle.className = 'book__title'
    const bookDescription = document.createElement('p')
    bookDescription.className = 'book__description'
    const bookPagesCount = document.createElement('p')
    bookPagesCount.className = 'book__pages-count'

    const readStatusBtn = document.createElement('button')

    // notice the onclick handler on the remove button
    return `
          <article class="book">
            <p class="book__title">"${this.title}"</p>
            <p class="book__description">${this.author}</p>
            <p class="book__pages-count">${this.pagesNumber} pages</p>
            <button class="btn ${this.isRead ? 'btn-light-green' : 'btn-light-red'} read">${this.isRead ? 'Read' : 'Not read'}</p>
            <button class="btn" onclick="hello()">Remove</button>
        </article>

    `
  }
}
// not reachable code
function hello() {
  console.log('hi rm btn')
}
```
I didn't want to use the old school `onclick` on the button element, but since we are used to that in react, I gave it a try.  
However, it didn't work! WHY?  
=> Since we are using ESM, and we are not importing `Book.js` in `main.js`, then the `hello()` function is not reachable.  

How to make that function reachable? 🤔  
I tried adding it in `main.js`, but that also didn't work. Why?  
=> After asking claude, he told me that functions declared in an ESM are accessible **within** that module. They are not added to the global scope (so you can't find them as a property of the `window` object).

Finally, I tried adding a `<script>` tag below the script of `main.js` and I created the function. Now it is finally reachable by the code 🙌.  
After asking claude, he told me that this behavior is expected. Since the 2nd script is not a module, functions declared in it are available to the global scope.

And to quote from claude's answer: 
> Inline event handlers like `onclick="hello()"` execute in the global scope, so they can access globally declared functions.
____
### Grammatical note regarding "switching back..."
Which is grammatically correct: 
> switching **from** react **back to** vanilla js
OR
> Switching **back from** react **to** vanilla js mindset

After asking claude, he told me that the latter is more natural, while the first form is a bit awkward.
That's why I chose the latter as the title of the previous note
____
### The return of `this` quirks
I was working on implementing the remove book functionality: 
```js
// Book.js
class Book {
  // ....
  render() {
    // deep in this method
    removeBookButton.onclick = this.remove
  }
  remove() {
    console.log(this.id) // nothing
    console.log(this) // DOM button element!

    // to write book removal logic
  }
}
```
At first, I tried clicking on the button to see the id, but I got an empty string in the console.  
Why did that happen? 🤔  
Because inadvertently, we were trying to access the `id` of the `button` element, which wasn't set, that's why we were getting an empty string.

That leads us to another question: Why did `this` in `Book.remove()` refer to the `button`, not the `Book` instance?  
Before working on this project, I was studying in the 1st 2 chapters from ydkjs series 2nd book this and object prototypes. You can find [the explanation in great detail](https://github.com/Mohammed-Lashein/mastering-js-functional-programming-book-code/blob/main/chapter3/ydkjs/readme.md) about the quirky behavior that happened here.  

But in a nutshell, here is the reason of what happened: 
> `this` gets its value from where it is *called*, not where it is defined

Let's discuss the code snippet in some detail: 
```js
  removeBookButton.onclick = this.remove
```
We are setting the handler responsible for the `click` event to be the `Book.remove()` method. But since that method uses `this` internally, what we have done here is just setting a *reference* to that method.

When the method is invoked: 
```js
remove() {
    console.log(this.id) // nothing
    console.log(this) // DOM button element!
  }
```
Claude mentioned that the browser sets `this` to the element that triggered the event (in our case, it is the `button` element), that's why we got an empty string in the console. We were trying to access the `id` of the `button`, which we haven't assigned a value to.

What is the solution then? 🤔  
We need a way to **bind** (pun intended) the value of `this` to our `Book` instance.
```js
// Book.js
class Book {
  // ....
  render() {
    // that's it!
    removeBookButton.onclick = this.remove.bind(this)
  }
  remove() {
    console.log(this.id) // correct book instance id
    console.log(this) // Book instance !
    // to write book removal logic
  }
}
```
Now on calling `Book.remove()` in response to the `click` event, it will refer to the `Book` instance not the `button` element.
_____
### Create a sticky footer
In my first attempt to create the footer, it was directly beneath the `div.books-container`, and when more content was added it was pushed with it.  

This isn't the kind of a good design. I inspected the source code from github and found the styles that the developer michalosman added.  

I wanted to learn more about these, so I searched online about how to create a sticky footer.
I found [this question on stackoverflow](https://stackoverflow.com/questions/29069498/how-to-make-a-sticky-footer-using-css) which has exactly the same code used in this project.
_____
These are some notes from the older version of the project. 

### Static variable syntax in js
So in the `generateBookId` function, I needed the function to hold a static variable instead of polluting the global scope with a variable to increment.

I forgot that js doesn't support the `static` keyword on functions, so I searched stackoverflow and asked some LLMs to get some insights.

Here are the approaches that I found.

1. Create a class and expose the id generation utility from it
```js
class IDsGenerator {
  static bookId = 0;
  public generateBookId() {
    return bookId++
  }
}
console.log(IDsGenerator.generateBookId()); // 0
console.log(IDsGenerator.generateBookId()); // 1
console.log(IDsGenerator.generateBookId()); // 2
```
2. Ignore the syntactic sugar and use the plain old function syntax instead
```js
function generateBookId() {
  if(typeof generateBookId.count === 'undefined') {
    generateBookId.count = 0
  }
  return generateBookId.count++
}

console.log(generateBookId()); // 0
console.log(generateBookId()); // 1
console.log(generateBookId()); // 2
```
3. Use closures
```js
function idGenerator() {
  let id = 0;
  return () => {
    return id++
  }
}
let generateId = idGenerator();
console.log(generateId());
console.log(generateId());
console.log(generateId());
```
### Flex stuff
What is the difference between `justify-content` 2 values `space-around` and `space-evenly`?  

Quoting from mdn docs, which you will understand but there is a coming clearer explanation: 
> `space-around`: The items are evenly distributed within the alignment container along the main axis. The spacing between each pair of adjacent items is the same. The empty space before the first and after the last item equals half of the space between each pair of adjacent items. If there is only one item, it will be centered.
> `space-evenly`: The items are evenly distributed within the alignment container along the main axis. The spacing between each pair of adjacent items, the main-start edge and the first item, and the main-end edge and the last item, are all exactly the same.

The easier explanation from [a video for elzero web school (arabic): ](https://www.youtube.com/watch?v=_ScoBsCdJ7U&ab_channel=ElzeroWebSchool)
> `space-around` adds the space *around* the elements, while `space-evenly` distributes the space *evenly* or *equally* among the elements (an equal space before and after each element)
____
### Selectors specificity revisited
```css
section.books-container, /* specificity (0, 1, 1)*/
.books-container { /* specificity (0, 1, 0)*/
  
}
```
What is the difference between both selectors' specificities? What does each number indicate?  
The numbers follow this order and each column is compared left-to-right to determine the higher specificity weight: **ID-CLASS-TYPE**
____
### HSL explained
- Hue: represents the color itself red, green or blue
  - 0 or 360 means red
  - 120 is green
  - 240 is blue
- Saturation: Purity of the color.
  - 100% means a vivid color
  - 0% means a shade of gray
- Lighness: determines how light or dark the color is
  - 100% lightness results in white
  - 0% lightness results in black
____
### JavaScript classes quirks
What is the difference between these 2 syntaxes in js classes?
```js
class MyClass {
  prop1;
  prop2
  constructor(p1, p2) {
    this.prop1 = p1;
    this.props2 = p2;
  }
}
class MyOtherClass {
  constructor(p1, p2) {
    this.prop1 = p1;
    this.prop2 = p2;
  }
}
```
=> Practically, it doesn't matter which you choose.   
The first syntax allows you to provide a default value for the prop if it wasn't initialized in the constructor, whereas the second syntax the property can't have a default value. It gets its value from the constructor.

Regarding the default values, consider this snippet: 
```js
class Pudding {
  // providing a default value for the property doesn't work in js the way you expect 
  p1 = 1
  constructor(p1, p2) {
    this.p1 = p1
  }
}
const p = new Pudding()
console.log(p.p1) // undefined
```
Why didn't `p.p1` get its default value that I declared in the class body? 🤔
Claude mentioned that when we pass nothing as a value for `p1`, `this.p1` will have a value of `undefined`. To overcome this, we may use either OR operator or nullish coalescing operator: 
```js
class Pudding {
  p1 = 1
  constructor(p = 2, p2) {
    this.p1 = p
  }
}
const p = new Pudding()
console.log(p.p1) // 2
```

In other languages like php, you need to declare the properties in the class body before the constructor (PHP 8+): 
```php
class MyClass {
  public string $prop1;
  public string $prop2;

  public function __construct(string $p1, string $p2) {
    $this->prop1 = $p1;
    $this->prop2 = $p2;
  }
}
```
Or you can use the quirky **constructor property promotion**: 
```php
class MyClass {
  public function __construct(
    public string $prop1,
    public string $prop2
  ) {}
}
```
which I don't like. I prefer to stick to the class declaration present in Java.
____
### Classes design notes
The v1 of the design was working, but it had some problems:
1. The `Book` class was responsible for 2 things: 
   1. Creating new books
   2. Reconstructing stored books
So I will create a `BookFactory` that is responsible for objects instantiation.
____
### Export a class or utils?
I wonder if in modern js I should encapsulate the logic I use in a class then export that class, or should I export different utilities then import any of them in the module I will want to use.

After asking chat, he told me that I should export a class when the utils I use need to have a shared state. But if my utils are stateless, I can just export them without the need of having a wrapper class.

He also gave me some examples that are worth documenting here.

Exporting a class that encapsulates shared logic:
```js
// math.js
export class Calculator {
  constructor() {
    this.memory = 0;
  }
  add(x, y) { return x + y; }
  store(value) { this.memory = value; }
  recall() { return this.memory; }
}
```
Exporting stateless utilities:
```js
// math.js
export function add(x, y) { return x + y; }
export function subtract(x, y) { return x - y; }
```
_____
### Why would we use `DataMapper` when we can stringify directly the object instance since it is also a js object?
You may not notice the benefit of doing so here, but the DataMapper pattern is responsible for insulating  client code from the details of data preparation to be stored in the database and vice versa.