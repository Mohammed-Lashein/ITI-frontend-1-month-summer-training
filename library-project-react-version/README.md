# Library project -- react version

This is an implementation of the library project but using react.
It is a nice shift from vanilla js mindset to dividing the UI into components mindset.

I like that now we have one project idea, but with 2 different implementations.

## Table of contents
- [Closing the modal note](#closing-the-modal-note)
- [imports without a file extension](#imports-wonders)
- [Explaining a sentence from vite docs](#explaining-a-sentence-from-vite-docs)
- [Explanation for or to?](#explanation-for-or-to)
- [Regarding `FormValidator` class](#regarding-formvalidator-class)
- [Claude's complement](#claudes-complement)
- [Tedious state updates](#tedious-state-updates)
- [Should we use `BookFactory` or are we abstracting early?](#should-we-use-bookfactory-or-are-we-abstracting-early)
- [React custom hooks important note](#react-custom-hooks-important-note)

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
_____
### Explanation for or to?
- Explanation to someone
- Explanation for something
____
### Regarding `FormValidator` class
I want to re-implement the `FormValidator` class in the vanilla js project here. But since time is not on my side, and since the implementation of that class is tightly coupled to the form in the vanilla js version of the project, I will not be making any validation here.

Maybe later, I will use the [validatorjs library](https://github.com/mikeerickson/validatorjs) to train on using it. But for now, I will depend on manual checks to avoid creating empty book entries
_____
### Claude's complement
When I told claude that I was skeptic about scattering data source logic in multiple `useEffect`s in the components. He agreed that centralizing data logic is important, and he made a [nice complement](./src/design/claude-encouragement.png) that emphasized the importance for any developer to learn design patterns.
____
### Tedious state updates
Now we will use the `DataMapper` to abstract all of the data logic, but now we will need to synchronize the state with the data source updates.  

In the vanilla js project, we just update the data source and re-render the books: 
```js
// In Book class
  toggleReadStatus() {
    // get the book with the target id
    const books = BookMapper.getBooks()
    // get the books from data source + toggle the book read status
    const updatedBooks = books.map((book) => {
      if(book.id === this.id) {
        book.isRead = !book.isRead
      }
      return book
    })
    // update data source
    BookMapper.updateBooks(updatedBooks)
    // re-render books
    BookFactory.renderBooks()
  }
```
But now we need to synchronize the state with the data source updates. Isn't this frustrating?  
Claude agreed that this is frustrating, and suggested some solutions: 
1. Use React Query (which handles both data source and state updates automatically)
I personally haven't tried react query before ( I know I should have tried it earlier), so I won't consider this an option.
1. abstract that logic in a hook (Recommended)
```js
  export function useBooks() {
    const [books, setBooks] = useState([])
    const addBook = (bookData) => {
      const book = BookFactory.createFromFormData(bookData)
      BookMapper.addBook(book) // update data source
      setBooks(prev => [...prev, book]) // update react state
    }

    return {books, addBook}
  }
```
3. Use state management library like Redux (No need for it in this simple application)
____
### Should we use `BookFactory` or are we abstracting early?  
In the `AddBookForm`, we manually constructed the `book` object, not a `Book` instance,  that got passed to `updateDataSource()`, but this tightly couples `AddBookForm` to the business logic. It shouldn't be the responsibility of `AddBookForm` to know how to construct a book, especially id generation part.

Should I call `BookFactory` in the component and then pass the book instance to `addBook()` coming from `useBooks()` hook?  
After asking claude, he suggested calling `BookFactory` in `addBook()` function in `useBooks()` hook.This approach allows the `AddBookForm` component to pass raw form data to the `addBook()` function without exposing book construction logic to the componentt (thus creating better interfaces, not the OOP `interface`, but I mean each function's defined entry points for client code interaction)
____
### React custom hooks important note
I didn't want to clutter the git history of the project with bad code, so I experimented with some code that I will provide here as a reference.
```jsx
// AddBookForm.jsx
import { useRef} from 'react'
import { useBooks } from '../hooks/useBooks'

function AddBookForm({setIsModalOpen, addBook}) {
	const {addBook} = useBooks()

	const bookTitleRef = useRef(null)
	const bookAuthorRef = useRef(null)
	const bookPagesNumberRef = useRef(null)
	const isBookReadRef = useRef(null)
	
	function handleSubmission(e) {
		e.preventDefault()

		const aFieldIsEmpty = bookTitleRef.current.value === '' || bookAuthorRef.current.value === '' || bookPagesNumberRef.current.value === 0
		if (aFieldIsEmpty) {
			console.log('All fields are required') // the bookPagesNumber should be greater than zero, but let's
			// keep that for a later better validation approach
			return
		}

		console.log('end of fn reached!')

		const formElementsValues = {
			title: bookTitleRef.current.value,
			author: bookAuthorRef.current.value,
			pagesNumber: bookPagesNumberRef.current.value,
			isRead: isBookReadRef.current.checked,
		}
    // Notice we are calling addBook here
		addBook(formElementsValues)
		setIsModalOpen(false)
	}
}
export default AddBookForm
```
```jsx
import Book from './Book'
import { useBooks } from '../hooks/useBooks'

function Books() {
  const {books} = useBooks() // 2nd call to our custom hook!
	return <section className='books-container'>
    {books.map((book) => <Book book={book} key={book.id}/>)}
  </section>
}
export default Books
```
Notice that we called `useBooks` hook in 2 places, so each one will have a separate copy of the state. That's why when we updated the data source (`sessionStorage` in my code), the `Books` component didn't reflect that update in the state, because it was accessing another copy of the state returned from the 2nd call to `useBooks()`.  

The solution?  
We need to lift the state up.  
The next paragraph from the docs summarizes that.  

Long story short, that quote from [react docs](https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-let-you-share-stateful-logic-not-state-itself) is the key: 
> Custom Hooks let you share stateful logic but not state itself. Each call to a Hook is **completely independent** from every other call to the same Hook. This is why the two sandboxes above are completely equivalent. If you’d like, scroll back up and compare them. The behavior before and after extracting a custom Hook is identical.
> When you need to share the state itself between multiple components, [lift it up and pass it down](https://react.dev/learn/sharing-state-between-components) instead.

All of the headache I had was due to thinking that custom hooks allow me to share the state ❌  
I wanted the `books` state to be shared between hook calls in both the `Books` component and the `AddBookForm` component.

The problem is that my assumption about the behavior of the custom hooks caused my app to behave in a very odd way (The data source was updated, but the `books` state had a different value in each component)