import { Stack, TextField } from '@mui/material'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import { useAuthContext } from '../hooks/useAuthContext'

function Login() {
	const navigate = useNavigate()
	const { setIsLoggedIn, isLoggedIn } = useAuthContext()
	function handleUserLogin() {
		// check input fields
		// send form input to the client

		// if user entered correct credentials
		// store the login token + login the user
		setIsLoggedIn(true)
		navigate('/cart')
		// redirect to cart
	}
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				// alignItems: 'center',
				paddingTop: '5rem',
			}}
		>
			<Stack
				direction='column'
				minWidth={800}
				alignItems='center'
				gap={2}
			>
				<Typography
					sx={{ textAlign: 'center', paddingBottom: '2rem' }}
					variant='h4'
				>
					Login
				</Typography>
				<TextField
					id='email'
					label='Email'
					variant='outlined'
					sx={{ width: '400px' }}
				/>
				<TextField
					id='password'
					label='password'
					variant='outlined'
					sx={{ width: '400px' }}
					type='password'
				/>
				<Button
					variant='contained'
					sx={{ width: '200px', marginTop: '1rem' }}
					onClick={(e) => handleUserLogin(e)}
				>
					Login
				</Button>
			</Stack>
		</div>
	)
}
export default Login
