import { BrowserRouter, Routes, Route } from 'react-router'
import Homepage from './pages/Homepage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Cart from './pages/Cart'

function App() {
  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
