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
import EmployeeCreateProfileScreen from '../screens/ProfileForms/EmployeeCreateProfileScreen'
import EmployeeEditProfileScreen from '../screens/ProfileForms/EmployeeEditProfileScreen'
import EmployeeAddExScreen from '../screens/EmployeeAddExScreen/EmployeeAddExScreen'

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
            <Route
              exact
              path='/create-profile'
              component={EmployeeCreateProfileScreen}
            />
            <Route
              exact
              path='/edit-profile'
              component={EmployeeEditProfileScreen}
            />
            <Route
              exact
              path='/employee/addexperience'
              component={EmployeeAddExScreen}
            />
          </Switch>
        </Col>
      </Row>
    </Router>
  )
}

export default AdminLayout
