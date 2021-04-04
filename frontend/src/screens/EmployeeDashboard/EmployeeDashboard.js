import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeDashboard = () => {
  return (
    <div>
      <h1>Employee</h1>
      <Link to='/employee/profile' className='btn btn-light my-3'>
        Go Back
      </Link>
    </div>
  )
}

export default EmployeeDashboard
