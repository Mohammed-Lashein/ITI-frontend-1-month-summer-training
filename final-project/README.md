# Final Project -- A very Basic Ecommerce website

[Live Demo](https://iti-final-project-frontend.netlify.app/)

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
- [Where can I find the theme object?](#where-can-i-find-the-theme-object)
- [The sx prop](#the-sx-prop)
- [What converted the `id` from a number to a string?](#what-converted-the-id-from-a-number-to-a-string)
- [Regarding the mock data](#regarding-the-mock-data)
- [Future features to be added to the project](#future-features-to-be-added-to-the-project)

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
### Where can I find the theme object?
Given this component: 
```jsx
<Typography variant="body2" sx={{ color: 'text.secondary' }}>
  {description}
</Typography>
```
Although that I haven't configured a theme, this component uses a color and it is rendering correctly. Where is it getting the configuration from?  
Claude pointed out that MUI by default provides a default theme which the components use.  

After inspecting that theme by loggin `useTheme()`, I didn't find `'text.secondary'`.  
=> Claude mentioned that it exists in `theme.palette.text.secondary`, but MUI can read it with using the shortcut `'text.secondary'`.  

I asked further, how can MUI make this mapping?  
Claude explained: In the `sx` prop, MUI automatically resolves these paths to `theme.palette.*`.  

Since time isn't on my side, I have no time to dig further about the details of this mapping. Let's defer it for later

I found a note in [the docs](https://mui.com/system/getting-started/the-sx-prop/#palette)
_____
### The sx prop
Given these styles
```jsx
<CardMedia
	component='img'
	height='140'
	image={image}
	alt='green iguana'
	sx={{
		objectFit: 'contain',
		'&:hover': {
			transform: 'scale(0.8)',
		},
	}}
/>
```
This syntax is from emotion (The one with `&:hover` is the one that caught my eyes the most)
When you use sx in MUI, you're essentially writing Emotion styles
____
### What converted the `id` from a number to a string?
I spent an hour trying to figure out why in the `CartItem` component on trying to get the certain cart item by filtering the `products` array, I was always getting `undefined`.  

After further insepction, I found that the `products` array had the `id` as a `number`, whereas it was stored in the `cartItems` array as a `string`.  
When did that conversion happen?  
We passed the `id` to the cart in the `ProductDetailsPage`, which fetched the `id` as a string from the `useParams`!  

If I had made the call to the API directly, then I wouldn't have encountered this issue. But since I am in the prototyping phase, I have used mock data instead.
```jsx
function ProductDetailsPage() {
	const [product, setProduct] = useState({})
const {increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useCartContext()
const { id } = useParams() // returns the id as a string
}
```
_____
### Regarding the mock data
I got the mock data from [fakestoreapi](https://fakestoreapi.com/). It is a great api for prototyping. But I will be keeping the `db.json` file instead of calling the api to avoid the troubles of api integration for now. 
____
### Future features to be added to the project: 

1. Loading indicator till the products get fetched
2. Using Redux to have a one way data flow architecture
3. Try making the components yourself instead of depending on MUI
4. Auth Functionality
5. Admin page that shows the orders
6. User Orders page to show each user's orders
