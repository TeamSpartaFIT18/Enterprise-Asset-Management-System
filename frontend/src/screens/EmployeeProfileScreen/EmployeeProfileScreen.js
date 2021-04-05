import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listUsers, deleteUser } from '../../actions/userActions'
import { getCurrentProfile } from '../../actions/profileActions'
import '../Screens.css'

const EmployeeProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const employeeProfile = useSelector((state) => state.employeeProfile)
  const { profile, loading, error } = employeeProfile

  useEffect(() => {
    if (userInfo) {
      dispatch(getCurrentProfile())
    } else {
      history.push('/signin')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <div className='empProfileScreen'>
        {loading ? (
          <Loader />
        ) : profile ? (
          <>
            <div className='dash-buttons'>
              <Link to='/edit-profile' className='btn byn-light'>
                <i className='fas fa-user-circle text-primary'></i>Edit profile
              </Link>
            </div>
          </>
        ) : (
          <>
            <p>You haven't yet setup a profile, Please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </>
        )}
      </div>
    </>
  )
}

export default EmployeeProfileScreen
