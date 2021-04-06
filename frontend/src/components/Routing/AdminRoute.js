import React from 'react'
import { Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux'

const AdminRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...[props]} />
        ) : (
          <Redirect to='/signin' />
        )
      }
    />
  )
}

export default AdminRoute
