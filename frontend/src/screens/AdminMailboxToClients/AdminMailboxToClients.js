import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, mailToClient } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'
import '../Screens.css'

const AdminMailboxToClients = ({ match }) => {
  const userId = match.params.id

  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetails(userId))
    }
  }, [userId])

  const email = user.email

  const submitHandler = (e) => {
    e.preventDefault()
    if (user.email) {
      dispatch(mailToClient({ email, subject, body }))
    }
  }
  return (
    <FormContainer className='ResetPasswordScreen'>
      <div>
        <h1>thisal</h1>
      </div>
      <h4>Clients Email : {user.email}</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='subject'>
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the subject to the mail'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='body'>
          <Form.Label>Email Body</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the email body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Send Mail
        </Button>
      </Form>
    </FormContainer>
  )
}

export default AdminMailboxToClients
