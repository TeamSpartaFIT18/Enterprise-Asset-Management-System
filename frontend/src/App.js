import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import OneProductScreen from './screens/OneProductScreen/OneProductScreen'
import CartScreen from './screens/CartScreen/CartScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'

const App = () => {
  return (
    <Router>
      <NavBar />
      <main className='py-3'>
        <Container>
          <Route path='/products' component={ProductScreen} />
          <Route path='/signin' component={LoginScreen} />
          <Route path='/product/:id' component={OneProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
