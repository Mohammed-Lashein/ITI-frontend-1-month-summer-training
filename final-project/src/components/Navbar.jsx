import Box from '@mui/joy/Box'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Badge from '@mui/joy/Badge'
import { Link } from 'react-router'
import { useCartContext } from '../hooks/useCartContext'

export default function Navbar() {
	const { cartQuantity } = useCartContext()
	return (
		<Box
			component='nav'
			aria-label='My site'
			sx={{ flexGrow: 1 }}
		>
			<List
				role='menubar'
				orientation='horizontal'
			>
				<ListItem role='none'>
					<Link
						to='/'
						style={{
							textDecoration: 'none',
							color: 'inherit',
						}}
					>
						<Button>
							<Typography variant='h6'>Our Shop</Typography>
						</Button>
					</Link>
				</ListItem>
				<ListItem
					role='none'
					sx={{ marginInlineStart: 'auto' }}
				>
					<Link
						to='/cart'
						style={{
							textDecoration: 'none',
							color: 'inherit',
						}}
					>
						<Button>
							<Badge badgeContent={cartQuantity}>
								<ShoppingBagOutlinedIcon />
							</Badge>
						</Button>
					</Link>
				</ListItem>
			</List>
		</Box>
	)
}
