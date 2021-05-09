import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { register } from '../../actions/userActions'
import '../Screens.css'
import registerImage from '../Images/register.jpg'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else if (!address || address === '' || !contact || contact === '') {
      setMessage('Address and contact number is required')
    } else {
      dispatch(register(name, email, address, contact, password))
    }
  }

  return (
    <div className="registerScreen">
      <Meta title="EAMS | Register" />
      <Card className="registerCard">
        <Row>
          <Col>
            <Image className="registerImage" src={registerImage} />
          </Col>
          <Col className="ml-4">
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label className="registerLable">Name:</Form.Label>
                <Form.Control
                  className="registerInput"
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="registerLable">
                  Email Address:
                </Form.Label>
                <Form.Control
                  className="registerInput"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label className="registerLable">Address:</Form.Label>
                <Form.Control
                  className="registerInput"
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="contact">
                <Form.Label className="registerLable">
                  Contact number:
                </Form.Label>
                <Form.Control
                  className="registerInput"
                  type="text"
                  placeholder="Enter Contact number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="registerLable">Password:</Form.Label>
                <Form.Control
                  className="registerInput"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label className="registerLable">
                  Confirm Password:
                </Form.Label>
                <Form.Control
                  className="registerInput"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                className="registerButton"
                type="submit"
                variant="primary"
              >
                Sign Up
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                Have an account?{' '}
                <Link
                  to={redirect ? `/signin?redirect=${redirect}` : '/signin'}
                >
                  Login
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default RegisterScreen
