import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { rpGetUserDetails, passwordReset } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'
import '../Screens.css'

const ResetPasswordScreen = ({ match }) => {
  const userId = match.params.id

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const rpUserDetails = useSelector((state) => state.rpUserDetails)
  const { loading, error, user } = rpUserDetails

  useEffect(() => {
    if (userId) {
      dispatch(rpGetUserDetails(userId))
    }
  }, [userId])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.log('pa dnt match')
    } else {
      dispatch(passwordReset({ user, password }))
      window.location = '/signin'
    }
  }

  console.log(userId)
  return (
    <FormContainer className='ResetPasswordScreen'>
      <div>
        <h1>' '</h1>
      </div>
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
  )
}

export default ResetPasswordScreen
