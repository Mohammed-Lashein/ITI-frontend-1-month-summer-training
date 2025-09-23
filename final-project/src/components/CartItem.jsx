import { useEffect, useState } from 'react'
import { useCartContext } from '../hooks/useCartContext'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Stack from '@mui/material/Stack'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'

function CartItem({ item: { quantity, id } }) {
	const [cartItem, setCartItem] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useCartContext()

	useEffect(() => {
		fetch('/db.json')
			.then((res) => res.json())
			.then((res) => {
				const item = res.find((item) => item.id === id)
				setCartItem(item)
				setIsLoading(false)
			})
	}, [])

	const { title, price, image } = cartItem
	return (
		!isLoading && (
      // The TableRow style is from MUI example in the docs
			<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				<TableCell
					component='th'
					scope='row'
				>
					<img
						src={image}
						alt=''
						width={100}
						height={100}
					/>
				</TableCell>
				<TableCell align='center'>{title}</TableCell>
				<TableCell align='center'>${price}</TableCell>
				<TableCell align='center'>
					<Stack direction='column'>
						<Button onClick={() => increaseCartQuantity(id)}>
							<KeyboardArrowUpIcon />
						</Button>
						{quantity}
						<Button onClick={() => decreaseCartQuantity(id)}>
							<KeyboardArrowDownIcon />
						</Button>
					</Stack>
				</TableCell>
				{/* It is important to use the toFixed() method to prevent float issues */}
				<TableCell align='center'>${(quantity * price).toFixed(2)}</TableCell>
				<TableCell align='center'>
					<Button onClick={() => removeFromCart(id)}>
						<DeleteIcon />
					</Button>
				</TableCell>
			</TableRow>
		)
	)
}
export default CartItem
