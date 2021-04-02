import React from 'react'
import { Component } from 'react'
import { Redirect, Route } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

const EmployeeRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isEmployee ? (
          <Component {...[props]} />
        ) : (
          <Redirect to='/signin' />
        )
      }
    />
  )
}

export default EmployeeRoute
