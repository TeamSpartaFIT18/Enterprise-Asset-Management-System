import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Meta from '../../components/Meta'
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
  }, [dispatch, userId])

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
    <div className="ResetPasswordScreen">
      <Meta title="EAMS | Reset password" />
      <FormContainer>
        <Card className="rpCard">
          <h1>Reset password</h1>
          {message && <Message variant="danger">{message}</Message>}
          <h5>
            <strong>Your Name : {user.name}</strong>
          </h5>
          <h5>
            <strong>Entered Email : {user.email}</strong>
          </h5>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="password">
              <Form.Label className="rpLable">Password:</Form.Label>
              <Form.Control
                className="rpInput"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label className="rpLable">Confirm Password:</Form.Label>
              <Form.Control
                className="rpInput"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Reset
            </Button>
          </Form>
        </Card>
      </FormContainer>
    </div>
  )
}

export default ResetPasswordScreen
