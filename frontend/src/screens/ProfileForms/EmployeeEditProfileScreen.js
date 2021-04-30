import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import FormContainer from '../../components/FormContainer'
import { employeeEditProfile } from '../../actions/profileActions'
import '../Screens.css'
const EmployeeEditProfileScreen = ({ location, history }) => {
  const [status, setStatus] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const dispatch = useDispatch()

  const employeeProfile = useSelector((state) => state.employeeProfile)
  const { loading, error, profile } = employeeProfile

  const editEmployeeProfile = useSelector((state) => state.editEmployeeProfile)
  const { success } = editEmployeeProfile

  useEffect(() => {
    if (!error) {
      setStatus(profile.status)
      setContact(profile.contact)
      setAddress(profile.address)
      setBio(profile.bio)
      setSkills(profile.skills)
    }
  }, [error, dispatch, history, profile])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!status || !contact || !address || !bio || !skills) {
      setErrorMessage('All fields required!')
    } else {
      dispatch(employeeEditProfile(status, contact, address, bio, skills))
      setTimeout(function () {
        setMessage('Succussfully saved!')
      }, 500)
      if (success) {
        setMessage('Succussfully saved!')
        setTimeout(function () {
          window.location.href = '/employee/profile'
        }, 3000)
      } else setErrorMessage('Something went wrong!')
    }
  }

  return (
    <FormContainer className="registerScreen">
      <Meta title="EAMS | Register" />
      <h1 className="registerScreen">Edit Profile</h1>
      {error && <Message variant="danger">{error}</Message>}
      {errorMessage && <Message variant="danger">{errorMessage}</Message>}
      {message && <Message variant="success">{message}</Message>}
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

export default EmployeeEditProfileScreen
