import React, { useEffect, useState } from 'react'
import { Form, Button, Card, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Meta from '../../components/Meta'
import { addAdmin } from '../../actions/userActions'
import '../Screens.css'
import userAddImage from '../Images/adduser.jpg'

const AddAdminScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const password = 'adminEams'
  const [message, setMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const addAdminByAdmin = useSelector((state) => state.addAdminByAdmin)
  const { error, success } = addAdminByAdmin

  useEffect(() => {
    if (success) {
      setSuccessMessage('Successfully Added!')
      setTimeout(function () {
        window.location = '/admin/adminslist'
      }, 3000)
    }
  }, [dispatch, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (userInfo && userInfo.isAdmin) {
      if (name === '' || email === '' || password === '') {
        setMessage('All fields are required')
      } else {
        dispatch(addAdmin(name, email, password))
      }
    }
  }

  return (
    <div className="registerScreen">
      <Meta title="EAMS | Add Admin" />
      <Card className="userAddCard">
        <Row>
          <Col md={6}>
            <Image className="userAddImage ml-2" src={userAddImage} />
          </Col>
          <Col md={6}>
            <h1>Add Admin</h1>
            {message && <Message variant="danger">{message}</Message>}
            {successMessage && (
              <Message variant="success">{successMessage}</Message>
            )}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label className="formFieldDet">Name:</Form.Label>
                <Form.Control
                  className="userAddInput"
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="formFieldDet">Email Address:</Form.Label>
                <Form.Control
                  className="userAddInput"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Add as Admin
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default AddAdminScreen
