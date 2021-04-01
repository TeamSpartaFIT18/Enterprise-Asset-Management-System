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
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen/OrderScreen'
import UserListScreen from './screens/UserListScreen/UserListScreen'
import UserEditScreen from './screens/UserEditScreen/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen/OrderListScreen'

const App = () => {
  return (
    <Router>
      <NavBar />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route
            path='/admin/productslist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productslist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/orderslist' component={OrderListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/userslist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/products' component={ProductScreen} exact />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/signin' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={OneProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route
            path='/products/page/:pageNumber'
            component={ProductScreen}
            exact
          />
          <Route
            path='/products/search/:keyword'
            component={ProductScreen}
            exact
          />
          <Route
            path='/products/search/:keyword/page/:pageNumber'
            component={ProductScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
