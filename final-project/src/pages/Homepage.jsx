import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router'



function Homepage() {
	const [products, setProducts] = useState([])
	useEffect(() => {
    /* using ./ instead of / threw an error. Use / directly instead */
		fetch('/db.json')
			.then((res) => res.json())
			.then((res) => setProducts(res))
	}, [])
	return (
		<Grid
			container
			spacing={4}
			sx={{ margin: 'auto', maxWidth: '900px', paddingTop: '2rem' }}
			justifyContent='center'
		>
			{products.map((product) => (
				<Grid key={product.id}>
					<Link
						to={`/product/${product.id}`}
						style={{ 
              // to remove the default underline given to any anchor tag
              textDecoration: 'none' 
            }}
					>
						<ProductCard product={product} />
					</Link>
				</Grid>
			))}
		</Grid>
	)
}
export default Homepage
