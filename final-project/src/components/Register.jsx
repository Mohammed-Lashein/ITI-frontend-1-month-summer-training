import { Grid, Paper, Stack, TextField } from '@mui/material'
import Box from '@mui/joy/Box'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import  Button  from '@mui/material/Button';
import { useNavigate } from 'react-router'

function Register() {
  const navigate = useNavigate()
  function handleUserRegistration() {
    // check input fields
    // send form input to the client

    // create new user in the database
    // get a user identification token and store it in AuthContet
    
    // redirect to cart to complete purchase
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
          Register
        </Typography>
        <TextField
          id='first_name'
          label='First Name'
          variant='outlined'
          sx={{ width: '400px' }}
        />
        <TextField
          id='last_name'
          label='Last Name'
          variant='outlined'
          sx={{ width: '400px' }}
        />
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
        <Button variant='contained' sx={{width: '200px', marginTop: '1rem'}} onClick={(e) => handleUserRegistration(e)}>Register</Button>
      </Stack>
    </div>
  )
}
export default Register
