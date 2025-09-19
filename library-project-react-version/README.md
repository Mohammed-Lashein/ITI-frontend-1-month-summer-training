# Library project -- react version

This is an implementation of the library project but using react.
It is a nice shift from vanilla js mindset to dividing the UI into components mindset.

I like that now we have one project idea, but with 2 different implementations.

## Table of contents
- [Closing the modal note](#closing-the-modal-note)
- [imports without a file extension](#imports-wonders)

### Closing the Modal note
In the `Modal` component, I wanted to add the feature of closing the `Modal` on clicking outside of it.
Here is the implementation from vanilla js world: 
```js
export const modal = document.querySelector(".modal")

function hideModal(e) {
  // prevents modal closure on interacting with add book form
  const isModalClicked = e.target === modal
  if(isModalClicked) {
    modal.classList.add('hidden')
  }
}
modal.addEventListener('click', hideModal)
```
In vanilla js, we have a reference to the `modal` element. How can we have that reference in react? 🤔  
Yes I know that `useRef` exists, but I think there should be a more elegant way without going to the boilerplate of react.  

After searching on the internet, I found [an answer on stackoverflow](https://stackoverflow.com/questions/10086427/what-is-the-exact-difference-between-currenttarget-property-and-target-property) that has an elegant solution.
____
### Imports wonders
In [react TDD book](https://github.com/Mohammed-Lashein/react-tdd-book-code), we had a custom setup where we didn't use either CRA or Vite, but instead we set up babel and webpack to have a react environment.

I remember that I didn't have to provide the `.js` extension when I imported react components, and I think that webpack allowed this feature.

In vite, is rollup responsible for that?  
Claude answered that yes in my custom setup, `webpack` allows imports with omitted file extension: 
```js
// webpack.config.js
module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  }
}
// elsewhere in either js or jsx files file
import MyComponent from './MyComponent' // no need to provide either .js or .jsx extensions
```
While in Vite, vite is responsible for file paths resolution: 
```js
// vite.config.js
export default defineConfig({
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
```
Vite even has a dedicated section [in their docs](https://vite.dev/config/shared-options.html#resolve-extensions) regarding `resolve.extensions`
