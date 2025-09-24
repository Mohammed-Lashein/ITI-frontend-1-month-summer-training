import { useCartContext } from '../hooks/useCartContext'
import { useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import CartItem from '../components/CartItem'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

function Cart() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		fetch('/db.json')
			.then((res) => res.json())
			.then((res) => setProducts(res))
	}, [])
	const { cartItems, hasPlacedOrder, setHasPlacedOrder, setCartItems } = useCartContext()

	function getCartTotal() {
		if (products.length > 0) {
			const total = cartItems.reduce((total, cartItem) => {
				const item = products.find((p) => p.id === cartItem.id)
				return total + (item.price || 0) * cartItem.quantity
			}, 0)
			return total.toFixed(2)
		}
		return 0
	}
	const cartTotal = getCartTotal()

	if (cartItems.length === 0 && !hasPlacedOrder) {
		return (
			<Typography
				variant='h3'
				sx={{ paddingTop: '3rem' }}
			>
				Your cart is empty. Happy Shopping!
			</Typography>
		)
	}
	function placeOrder() {
		setHasPlacedOrder(true)
		setCartItems([])
		// send order data to the backend with a data structure conforming to the API documentation
	}
	if (hasPlacedOrder) {
		return (
			<Typography
				variant='h3'
				sx={{ paddingTop: '3rem' }}
			>
				Thanks for shopping with us !
			</Typography>
		)
	}

  useEffect(() => {

  }, [hasPlacedOrder])

	return (
		<div style={{ padding: '2rem' }}>
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650, padding: '2rem' }}
					aria-label='simple table'
				>
					<TableHead>
						<TableRow>
							<TableCell>Product Image</TableCell>
							<TableCell align='center'>Title</TableCell>
							<TableCell align='center'>Price</TableCell>
							<TableCell align='center'>Quantity</TableCell>
							<TableCell align='center'>Total price</TableCell>
							{/* The empty cell is for the remove from cart button */}
							<TableCell align='center'></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cartItems.map((item) => (
							<CartItem
								item={item}
								key={item.id}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography component='span'>Cart Total: ${cartTotal}</Typography>
				<Button
					onClick={() => placeOrder()}
					variant='contained'
				>
					Place order
				</Button>
			</Box>
			<Box></Box>
		</div>
	)
}
export default Cart
