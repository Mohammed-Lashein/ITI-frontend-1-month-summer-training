# Final Project -- A very Basic Ecommerce website

I like ecommerce projects because they have a lot of details and require good structure. But since time wasn't on my side, there were no time to build a complex structure.  

Also, I am a fan of small commits, but I will create some non-small commits for this project for the aforementioned reason.  
I created a prototype for the project since some days ago, and I am going to copy paste the code here.  
Why didn't I write the code here in the first place?  
-> There is a good piece of advice from Code Complete book regarding this topic, but since I don't have time(again?) to go search for it, I will paraphrase it myself from what I remember:  
> When you want to try some functionality or new code, make sure you try it in a non-production environment. If you try the code in a production environment or you convince yourself that this code will be shipped later, you won't experiment with it sufficiently since you don't want to break things.

What if you need to see a good project structure?  
You can check out the [vanilla js version of the library project](../library-project/). It has some very nice structure and implementation of **Domain Model** (partially), **Factory** and **Data Mapper** Design patterns.
____
## Project Notes

## Table of contents
- [The error encountered while trying to fetch data from a local file](#the-error-encountered-while-trying-to-fetch-data-from-a-local-file)

### The error encountered while trying to fetch data from a local file
Given this code snippet: 
```js
fetch("../db.json")
.then((res) => res.json())
.then((res) => {console.log(res)})
```
I got an error in the console: 
> Uncaught (in promise) SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON

I am accustomed to this error when I was making APIs in php and reading their values on the frontend. The browser is returning an html page instead of the expected json.

After asking claude, he told me that this may be due to vite not being able to serve the static file `db.json`.  
And his assumption was true!  
The file was located in the `src` directory. If you try to write in the url `localhost:5173/src/App.jsx` you will get an empty page.  
If we try accessing `localhost:5173/db.json` we will also get an empty page by vite.

That's why we got an error on trying to parse the returned page as a json.  
The solution?  
Place `db.json` in `public` folder, thus it is served as a static file and we can read its contents using `fetch`
_____
