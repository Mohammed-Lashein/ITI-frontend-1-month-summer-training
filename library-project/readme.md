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