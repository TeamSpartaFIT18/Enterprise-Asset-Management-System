import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import AdminSideNav from '../components/AdminSideNav/AdminSideNav'
import ProductListScreen from '../screens/ProductListScreen/ProductListScreen'
import AdminDashboard from '../screens/AdminDashboard/AdminDashboard'
import AdminRoute from '../components/Routing/AdminRoute'
import OrderListScreen from '../screens/OrderListScreen/OrderListScreen'
import UserEditScreen from '../screens/UserEditScreen/UserEditScreen'
import ProductEditScreen from '../screens/ProductEditScreen/ProductEditScreen'
import UserListScreen from '../screens/UserListScreen/UserListScreen'

const AdminLayout = () => {
  return (
    <Router>
      <Row>
        <Col md={2}>
          <AdminSideNav />
        </Col>
        <Col md={10}>
          <Switch>
            <Route exact path='/dashboard-admin' component={AdminDashboard} />
            <Route
              path='/admin/productslist'
              exact
              component={ProductListScreen}
            />
            <Route
              path='/admin/productslist/:pageNumber'
              component={ProductListScreen}
              exact
            />
            <Route path='/admin/orderslist' component={OrderListScreen} />
            <Route
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
            <Route path='/admin/userslist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          </Switch>
        </Col>
      </Row>
    </Router>
  )
}

export default AdminLayout
