import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import { rpGetUserDetails, passwordReset } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'
import '../Screens.css'

const ResetPasswordScreen = ({ match }) => {
  const userId = match.params.id

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const rpUserDetails = useSelector((state) => state.rpUserDetails)
  const { user } = rpUserDetails

  useEffect(() => {
    if (userId) {
      dispatch(rpGetUserDetails(userId))
    }
  }, [userId])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(passwordReset({ user, password }))
      window.location = '/signin'
    }
  }
  return (
    <div className='ResetPasswordScreen'>
      <FormContainer>
        <div></div>
        {message && <Message variant='danger'>{message}</Message>}
        <h4>Your Name : {user.name}</h4>
        <h4>Entered Email : {user.email}</h4>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ResetPasswordScreen
