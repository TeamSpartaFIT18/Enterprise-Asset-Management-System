import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginScreen from '../../screens/LoginScreen/LoginScreen'
import AdminDashboard from '../../screens/AdminDashboard/AdminDashboard'

const EmployeeRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
      {userInfo.isEmployee ? (
        <Route exact path='/admin/dashboard' component={AdminDashboard} />
      ) : (
        <Route path='/signin' component={LoginScreen} />
      )}
    </Router>
  )
}

export default EmployeeRoute
