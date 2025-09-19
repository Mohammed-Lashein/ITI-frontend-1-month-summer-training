# Library project -- react version

This is an implementation of the library project but using react.
It is a nice shift from vanilla js mindset to dividing the UI into components mindset.

I like that now we have one project idea, but with 2 different implementations.

## Table of contents
- [Closing the modal note](#closing-the-modal-note)
- [imports without a file extension](#imports-wonders)
- [Explaining a sentence from vite docs](#explaining-a-sentence-from-vite-docs)

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
____
### Explaining a sentence from vite docs
If you followed the above link to vite docs, you will find a bit unclear sentence: 
> Note it is **NOT** recommended to omit extensions for custom import types (e.g. `.vue`) since it can interfere with IDE and type support.

If `.vue` were a custom extension, what are non-custom extensions then?  
After asking claude, he told me that extensions like `.js`, `.ts`, `.jsx` and `.tsx` are known to the js tools that are used in the IDEs, but extensions like `.vue` or even `.svelte` each is specific to its own framework. That's why the latter extensions need compilers specific to their frameworks to turn the code into understandable js by the IDE.

I even inspected a piece of code from my notes on learning from **vue masterclass 2024** (which I studied in their free weekend): 
```vue
<script setup>
import { reactive, ref, watch, provide, onMounted } from 'vue'
import BigYellowUsername from './BigYellowUsername.vue'
import YummyMeal from './YummyMeal.vue'
</script>
```

I don't have syntax highlighting in the IDE without the vue extension enabled because `.vue` is a custom extension specific to a framework.

Notice that also in the imports, I am specifying the file extension `.vue`
