# Library project

This project is really fantastic!
I like the solution by [the amazing engineer michalosman](https://github.com/michalosman/library) which has nice naming conventions and the code is well structured so that beginners can follow along.

I was learning design patterns like factory and data mapper, so I tried to implement these.
I would say that I was bragging with adding real world structure to a small application that won't need this separation of concerns at all, but consider it as an introduction to design patterns in a non-advanced way.

## Project notes

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
  let book = BooksFactory.create(null, ...data) 
```
I got an error in the console saying: 
> Uncaught TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function

I thought the problem was with `BooksFactory.create()` method. But aren't methods functions?  
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