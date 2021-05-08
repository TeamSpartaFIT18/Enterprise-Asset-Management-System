import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { login } from '../../actions/userActions'
import '../Screens.css'
import loginImage from '../Images/login.jpg'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const redirectAdmin = location.search
    ? location.search.split('=')[1]
    : '/admin/dashboard'
  const redirectEmployee = location.search
    ? location.search.split('=')[1]
    : '/employee/dashboard'

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      history.push(redirectAdmin)
    } else if (userInfo && userInfo.isClient) {
      history.push(redirect)
    } else if (userInfo && userInfo.isEmployee) {
      history.push(redirectEmployee)
    }
  }, [history, userInfo, redirect, redirectAdmin, redirectEmployee])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className="loginScreen">
      <Meta title="EAMS | Login" />
      <Card className="loginCard">
        <Row>
          <Col md={6}>
            <Image className="loginImage" src={loginImage} />
          </Col>

          <Col>
            <div>
              <h1>Sign In</h1>
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                  <Form.Label className="loginLable">Email Address:</Form.Label>
                  <Form.Control
                    className="loginInput"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label className="loginLable">Password:</Form.Label>
                  <Form.Control
                    className="loginInput"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button
                  className=" loginButton"
                  type="submit"
                  variant="primary"
                >
                  Sign In
                </Button>
              </Form>

              <Row className="py-3">
                <Col>
                  New Customer?{' '}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                  >
                    Register
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link to="/forgotpassword">Forgotten password?</Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default LoginScreen
