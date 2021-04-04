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
import EmployeeProfileScreen from '../screens/EmployeeProfileScreen/EmployeeProfileScreen'

const AdminLayout = () => {
  const history = useHistory()
  return (
    <Router history={history}>
      <Row>
        <Col md={4}>
          <EmployeeSideNav />
        </Col>
        <Col md={8}>
          <Switch>
            <Route
              exact
              path='/employee/dashboard'
              component={EmployeeDashboard}
            />
            <Route
              exact
              path='/employee/profile'
              component={EmployeeProfileScreen}
            />
          </Switch>
        </Col>
      </Row>
    </Router>
  )
}

export default AdminLayout
