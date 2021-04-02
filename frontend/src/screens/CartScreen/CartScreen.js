import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../../components/Message'
import Meta from '../../components/Meta'
import { addToCart, removeFromCart } from '../../actions/cartActions'
import './CartScreen.css'

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id

	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const dispatch = useDispatch()

	const cart = useSelector(state => state.cart)
	const { cartItems } = cart

	console.log(cartItems)

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = id => {
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = id => {
		history.push('/signin?redirect=shipping')
	}

	return (
		<Row className='cartScreen'>
			<Meta title='EAMS | Cart' />
			<Col md={8}>
				<h1>Cart</h1>
				{cartItems.length === 0 ? (
					<Message>Your have no items in cart. </Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map(item => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										></Image>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>Rs. {item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={e =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map(x => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush' className='totalQtyPrice'>
						<h2>
							Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
							items
						</h2>
						Rs.{' '}
						{cartItems
							.reduce((acc, item) => acc + item.qty * item.price, 0)
							.toFixed(2)}
					</ListGroup>
					<ListGroup>
						<Button
							type='button'
							className='toCheckoutbtn'
							disabled={cartItems.length === 0}
							onClick={checkoutHandler}
						>
							Checkout
						</Button>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen
