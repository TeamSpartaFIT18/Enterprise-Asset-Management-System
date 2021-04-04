import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listUsers, deleteUser } from '../../actions/userActions'
import { getCurrentProfile } from '../../actions/profileActions'

const EmployeeProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const employeeProfile = useSelector((state) => state.employeeProfile)
  const { user } = employeeProfile

  useEffect(() => {
    if (userInfo) {
      dispatch(getCurrentProfile())
    } else {
      history.push('/signin')
    }
  }, [dispatch, history, userInfo])

  console.log(user)
  return (
    <>
      <div>
        <h1>Employee Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {userInfo.name}
        </p>
        {user !== null ? (
          <>
            <div className='dash-buttons'>
              <Link to='/edit' className='btn byn-light'>
                <i className='fas fa-user-circle text-primary'></i>Edit profile
              </Link>
            </div>
          </>
        ) : (
          <>thisal</>
        )}
      </div>
    </>
  )
}

export default EmployeeProfileScreen
