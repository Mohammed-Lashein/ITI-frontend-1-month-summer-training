import { createContext, useState } from 'react'

export const CartContext = createContext({})

export function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem('cart')) || [])
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false)

	const cartQuantity = cartItems.reduce((quantity, item) => item?.quantity + quantity, 0)

	function getItemQuantity(id) {
		// if we don't use the optional chaining operator, since we are not in TS, nothing will happen
		return cartItems.find((item) => item.id === id).quantity || 0
	}
	function increaseCartQuantity(id) {
		const itemExistsInCart = cartItems.find((item) => item.id === id)

		if (itemExistsInCart) {
			const updatedItems = cartItems.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 }
				}
				return item
			})
			setCartItems(updatedItems)
		}

		if (!itemExistsInCart) {
			setCartItems((prev) => [...prev, { id, quantity: 1 }])
		}
	}
	function decreaseCartQuantity(id) {
		const itemIsOfQuantityOne = cartItems.find((item) => item.id === id)?.quantity === 1

		if (itemIsOfQuantityOne) {
			const updatedCartItems = cartItems.filter((item) => item.id !== id)
			setCartItems(updatedCartItems)
		}

		if (!itemIsOfQuantityOne) {
			const updatedCartItems = cartItems.map((item) => {
				if (item.id === id) {
					return {
						...item,
						quantity: item.quantity - 1,
					}
				}
				return item
			})
			setCartItems(updatedCartItems)
		}
	}
	function removeFromCart(id) {
		setCartItems((currItems) => {
			return currItems.filter((item) => item.id !== id)
		})
	}
	return (
		<CartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				cartItems,
        setCartItems,
				cartQuantity,
        hasPlacedOrder,
        setHasPlacedOrder
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
