import { BrowserRouter, Routes, Route } from 'react-router'
import Homepage from './pages/Homepage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Login from './components/Login';
import Register from './components/Register'

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={<Homepage />}
					/>
					<Route
						path='/product/:id'
						element={<ProductDetailsPage />}
					/>
					<Route
						path='/cart'
						element={<Cart />}
					/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
