import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, mailToClient } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'
import '../Screens.css'
import Meta from '../../components/Meta'
import mail from '../Images/mail.jpg'
import Message from '../../components/Message'

const AdminMailboxToClients = ({ match }) => {
  const userId = match.params.id

  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetails(userId))
    }
  }, [userId, dispatch])

  const email = user.email

  const submitHandler = (e) => {
    e.preventDefault()
    if (!user.email || !subject || !body) {
      setMessage('All fields are required!')
    } else {
      dispatch(mailToClient({ email, subject, body }))
      window.location = '/admin/clientlist'
    }
  }
  return (
    <div className="container">
      <Meta title="EAMS | Mailbox-Clients" />
      <div className="adminMailboxToClients">
        <Row className="mainRow no-gutters">
          <Col md={2}>
            <Image className="mailImage mt-4 ml-2" src={mail} />
          </Col>
          <Col md={10}>
            <FormContainer>
              <h3 class="font-weight-bold mt-4 py-3">
                Send mail to {user.name}
              </h3>
              {message && <Message variant="danger">{message}</Message>}
              <Row className="dataRow mb-1">
                <Col md={3}>
                  <strong>To: </strong>
                </Col>
                <Col md={9}>{user.email}</Col>
              </Row>

              <Form onSubmit={submitHandler}>
                <Row className="dataRow">
                  <Col md={3}>
                    <strong>Subject: </strong>
                  </Col>
                  <Col md={9}>
                    <Form.Group controlId="subject">
                      <Form.Control
                        className="dataBody"
                        as="textarea"
                        rows={2}
                        type="text"
                        placeholder="Enter the subject to the mail"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="dataRow">
                  <Col md={3}>
                    <strong>Body: </strong>
                  </Col>
                  <Col md={9}>
                    <Form.Group controlId="body">
                      <Form.Control
                        className="dataBody"
                        as="textarea"
                        rows={4}
                        type="text"
                        placeholder="Enter the email body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="buttonRow">
                  <Col md={9}></Col>

                  <Col md={3}>
                    <Button
                      className="btnSendMail"
                      type="submit"
                      variant="primary"
                    >
                      Send Mail
                    </Button>
                  </Col>
                </Row>
              </Form>
            </FormContainer>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AdminMailboxToClients
