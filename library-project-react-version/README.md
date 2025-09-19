# Library project -- react version

This is an implementation of the library project but using react.
It is a nice shift from vanilla js mindset to dividing the UI into components mindset.

I like that now we have one project idea, but with 2 different implementations.

## Table of contents
- [Closing the modal note](#closing-the-modal-note)

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
