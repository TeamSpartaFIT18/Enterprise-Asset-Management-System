import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import OneProductScreen from './screens/OneProductScreen/OneProductScreen';
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen';
import OrderScreen from './screens/OrderScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

const App = () => {
  return (
    <Router>
      <NavBar />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/products' component={ProductScreen} exact />
          <Route path='/product/:id' component={OneProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/shipping' component={ShippingScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
