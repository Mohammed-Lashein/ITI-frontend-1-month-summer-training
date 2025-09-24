import { Grid, Paper, Stack, TextField } from '@mui/material'
import Box from '@mui/joy/Box'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import  Button  from '@mui/material/Button';
import { useNavigate } from 'react-router'

function Login() {
  const navigate = useNavigate()
  function handleUserLogin() {
    // check input fields
    // send form input to the client

    // if user entered correct credentials
    // store the login token
    
    // redirect to cart
    navigate('/cart')
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
        <Button variant='contained' sx={{width: '200px', marginTop: '1rem'}} onClick={(e) => handleUserLogin(e)}>Login</Button>
			</Stack>
		</div>
	)
}
export default Login
