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