import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useCartContext } from '../hooks/useCartContext'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'

function ProductDetailsPage() {
	const [product, setProduct] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const { increaseCartQuantity } = useCartContext()
	let { id } = useParams()
	id = Number(id) // will be removed on real calls to the api since the id gets concatenated in the api url

	useEffect(() => {
		fetch('/db.json')
			.then((res) => res.json())
			.then((res) => {
				const data = res.find((p) => p.id == id)
				setProduct(data)
				setIsLoading(false)
			})
	}, [])

	const { image, title, category, description, price } = product
	return (
		!isLoading && (
			<div>
				<Stack
					gap={4}
					direction='column'
					sx={{ paddingTop: '2rem', margin: 'auto', maxWidth: '800px' }}
				>
					<Card>
						<CardMedia
							component='img'
							height='400'
							width={600}
							image={image}
							alt={title}
							sx={{
								objectFit: 'contain',
							}}
						/>
					</Card>
					<Stack
						gap={2}
						alignContent='center'
						direction='column'
					>
						<Chip
							label={category}
							color='primary'
							sx={{ alignSelf: 'flex-start' }}
						></Chip>
						<Typography variant='h6'>{title}</Typography>
						<Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
						<Typography>
							<b>Price</b>: ${price}
						</Typography>
						<Button
							onClick={() => increaseCartQuantity(id)}
							variant='contained'
							sx={{
								// Good when using Roboto font
								// width: '150px',

								// Good after disabling Roboto font
								width: '170px',
								alignSelf: 'center',
							}}
							// native to MUI + styled better than adding the icon as a child of the button
							endIcon={<AddShoppingCartOutlinedIcon />}
						>
							Add to cart
						</Button>
					</Stack>
				</Stack>
			</div>
		)
	)
}
export default ProductDetailsPage
