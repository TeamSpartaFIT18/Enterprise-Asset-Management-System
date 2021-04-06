import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import FormContainer from '../../components/FormContainer'
import { passwordForgot } from '../../actions/userActions'
import '../Screens.css'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const forgotPassword = useSelector((state) => state.forgotPassword)
  const { loading, error } = forgotPassword

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(passwordForgot(email))
    window.alert('Check your mail')
  }

  return (
    <div className='loginScreen'>
      <Meta title='EAMS | Login' />
      <FormContainer>
        <h1>Forgot Password</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Send verify email
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ForgotPasswordScreen
