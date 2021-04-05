import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import '../Screens.css'

const AdminDashboard = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div className='adminDashboard'>
      <h1>Admin Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {userInfo.name}
      </p>
    </div>
  )
}

export default AdminDashboard
