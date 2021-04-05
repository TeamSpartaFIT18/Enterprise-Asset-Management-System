import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import FormContainer from '../../components/FormContainer'
import {
  getCurrentProfile,
  employeeEditProfile,
} from '../../actions/profileActions'
import '../Screens.css'
const EmployeeEditProfileScreen = ({ location, history }) => {
  const [status, setStatus] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [bio, setBio] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const employeeProfile = useSelector((state) => state.employeeProfile)
  const { loading, error, profile } = employeeProfile

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (!error) {
      setStatus(profile.status)
      setContact(profile.contact)
      setAddress(profile.address)
      setBio(profile.bio)
    }
  }, [dispatch, history, profile])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(employeeEditProfile(status, contact, address, bio))
  }

  return (
    <FormContainer className='registerScreen'>
      <Meta title='EAMS | Register' />
      <h1 className='registerScreen'>Edit Profile</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='status'>
          <Form.Label>Status</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='contact'>
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter Contact number'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='bio'>
          <Form.Label>Enter Bio</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Save Profile Info
        </Button>
      </Form>
    </FormContainer>
  )
}

export default EmployeeEditProfileScreen
