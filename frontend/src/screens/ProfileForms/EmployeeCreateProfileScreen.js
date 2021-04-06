import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import FormContainer from '../../components/FormContainer'
import { employeeCreateProfile } from '../../actions/profileActions'
import '../Screens.css'

const EmployeeCreateProfileScreen = ({ location, history }) => {
  const [status, setStatus] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [bio, setBio] = useState('')
  const [experience, setExperience] = useState([])

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const createEmployeeProfile = useSelector(
    (state) => state.createEmployeeProfile
  )
  const { loading, error } = createEmployeeProfile

  const submitHandler = (e) => {
    e.preventDefault()
    if (userInfo) {
      dispatch(employeeCreateProfile(status, contact, address, bio, experience))
    }
  }

  return (
    <FormContainer className='registerScreen'>
      <Meta title='EAMS | Register' />
      <h1 className='registerScreen'>Sign Up</h1>
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

        <Form.Group controlId='experience'>
          <Form.Label>Enter Experience</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter experience'
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Save Profile Info
        </Button>
      </Form>
    </FormContainer>
  )
}

export default EmployeeCreateProfileScreen
