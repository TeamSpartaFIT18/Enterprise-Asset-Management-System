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
  const [skills, setSkills] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const dispatch = useDispatch()

  const createEmployeeProfile = useSelector(
    (state) => state.createEmployeeProfile
  )
  const { loading, error, success } = createEmployeeProfile

  const submitHandler = (e) => {
    e.preventDefault()
    if (!status || !contact || !address || !bio || !skills) {
      setErrorMessage('All fields required!')
    } else {
      dispatch(employeeCreateProfile(status, contact, address, bio, skills))
      if (success) {
        setMessage('Succussfully created!')
        setTimeout(function () {
          window.location.href = '/employee/profile'
        }, 3000)
      } else setErrorMessage('Something went wrong!')
    }
  }

  return (
    <FormContainer className="registerScreen">
      <Meta title="EAMS | Create Profile" />
      <h1 className="registerScreen">Create profile</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="success">{message}</Message>}
      {errorMessage && <Message variant="danger">{errorMessage}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="contact">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Contact number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="bio">
          <Form.Label>Enter Bio</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="skills">
          <Form.Label>
            Enter Skills (You can separate skills using , between two)
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Save Profile Info
        </Button>
      </Form>
    </FormContainer>
  )
}

export default EmployeeCreateProfileScreen
