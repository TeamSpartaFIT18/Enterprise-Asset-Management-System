import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product/Product'
import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import { listProducts } from '../actions/productActions'

const ProductScreen = ({match}) => {
	
		const [products, setProducts] = useState([])

		useEffect(() => {
			const fetchProducts = async () => {
				const { data } = await axios.get('/api/products')

				setProducts(data)
			}
			fetchProducts()
		}, [])
	
		
	/*const keyword = match.params.keyword

		const pageNumber = match.params.pageNumber || 1

		const dispatch = useDispatch()

		const productList = useSelector((state) => state.productList)
		const { loading, error, productss, page, pages } = productList

		useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
		}, [dispatch, keyword, pageNumber])
  
	*/
	return (
		<>
			
      	
			<Link to='/' className='btn btn-light'>
			Go Back
			</Link>
      	
			<h1>LATEST PRODUCTS</h1>

			
			  <Loader />
		
			
				<>
					<Row>
						{products.map(product => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					
				</>	
		    
	
		</>
	)
}

export default ProductScreen

/*
					<Paginate
					pages={pages}
					page={page}
					keyword={keyword ? keyword : ''}
					/>
					*/