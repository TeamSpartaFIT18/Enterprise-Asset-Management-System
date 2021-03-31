import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import SingleProductScreen from './screens/SingleProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

const App = () => {
	return (
		<Router>
			<NavBar />
			<main className='py-3'>
				<Container>
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/products' component={ProductScreen} exact />
					<Route path='/product/:id' component={SingleProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
