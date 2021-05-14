import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../types/userTypes'
import '../Screens.css'
import updateCredImage from '../Images/updateCred.jpg'

const UpdateCredentialsScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    } else if (success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <div className="updateCredentialsScreen">
      <Meta title="EAMS | Update" />
      <Card className="updateCredCard">
        <Row>
          <Col md={6}>
            <Image className="updateCredImage ml-2" src={updateCredImage} />
          </Col>
          <Col>
            <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label className="formFieldDet">Name</Form.Label>
                  <Form.Control
                    className="updateCredInput"
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label className="formFieldDet">
                    Email Address
                  </Form.Label>
                  <Form.Control
                    className="updateCredInput"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label className="formFieldDet">Password</Form.Label>
                  <Form.Control
                    className="updateCredInput"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label className="formFieldDet">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    className="updateCredInput"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default UpdateCredentialsScreen
