import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import EmployeeSideNav from '../components/EmployeeSideNav/EmployeeSideNav'
import EmployeeDashboard from '../screens/EmployeeDashboard/EmployeeDashboard'

const AdminLayout = () => {
  const history = useHistory()
  return (
    <Router history={history}>
      <Row>
        <Col md={2}>
          <EmployeeSideNav />
        </Col>
        <Col md={10}>
          <Switch>
            <Route
              exact
              path='/employee/dashboard'
              component={EmployeeDashboard}
            />
          </Switch>
        </Col>
      </Row>
    </Router>
  )
}

export default AdminLayout
