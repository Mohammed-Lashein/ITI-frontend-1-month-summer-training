# ES6 Assignments part 1

### `createUserProfile` naive implementation
Given this code snippet: 
```js
function createUserProfile(user) {
  const {name = 'Anonymous', preferences: {theme = 'Light'}} = user
  return `Hello ${name}! Your theme is ${theme}.`
}
// Example Usage:
const user1 = { name: 'Ahmed', preferences: { theme: 'dark' } }
const user2 = { name: 'Salma' }
const user3 = {}
console.log(createUserProfile(user1)) 
console.log(createUserProfile(user2))  // Error
console.log(createUserProfile(user3)) 
```
Since `user2` (and also `user3`, but the script execution stopped before reaching it) doesn't have a `preferences` property, we can't destructure `theme` and provide it a default value.  Trying to do so is simply trying to destructure `theme` from `undefined`, which throws the error: 
> Uncaught TypeError: Cannot read properties of undefined (reading 'theme')

What should we do then?  
Provide a default value first for `preferences` then destructure `theme`: 
```js
  const {name = 'Anonymous', preferences = {}} = user
  const {theme = 'light'} = preferences
```