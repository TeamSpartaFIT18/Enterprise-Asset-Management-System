import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../../components/Rating/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import '../Screens.css'
import { PRODUCT_UPDATE_COMPLAINT_RESET } from '../../types/productTypes'
import { listEmployees } from '../../actions/userActions'
import { getOrderDetails } from '../../actions/orderActions'
import { scheduleAssign } from '../../actions/scheduleActions'
import { SCHEDULE_EMP_ASSIGN_RESET } from '../../types/scheduleTypes'
import { LinkContainer } from 'react-router-bootstrap'

const ScheduleHandlingScreen = ({ match }) => {
  const orderId = match.params.scheduleId

  const [employee, setEmployee] = useState(' ')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const assignEmpToSchedule = useSelector((state) => state.assignEmpToSchedule)
  const {
    loading: assignLoading,
    success: assignSuccess,
    error: assignError,
  } = assignEmpToSchedule

  const employeeList = useSelector((state) => state.employeeList)
  const { loading: loadingEmployee, error: errorEmployee, users } = employeeList

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId))
      dispatch(listEmployees())
    }
    if (assignSuccess) {
      alert('Employee assigned!')
      setEmployee('')
      dispatch({ type: SCHEDULE_EMP_ASSIGN_RESET })
      window.location = '/admin/schedules/ongoing'
    }
  }, [dispatch, match, assignSuccess])

  var empEmail
  var employeeId

  const submitHandler = (e) => {
    e.preventDefault()
    if (!employee || employee == ' ') {
      setMessage('You need to select employee to submit')
    } else {
      for (var i = 0; i < users.length; i++) {
        if (users[i].name == employee) {
          empEmail = users[i].email
          employeeId = users[i]._id
        }
      }
      dispatch(scheduleAssign(employeeId, orderId, empEmail))
    }
  }

  return (
    <div className="oneProductScreen">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          <Meta title={order._id} />
          <Card className="complaintHandlingCard">
            <Row>
              <Col md={4}>
                <ListGroup.Item className="ordItemsSchedComplete">
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={3}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </Col>
              <Col md={8}>
                <div className="complaintCol">
                  {message && <Message variant="danger">{message}</Message>}
                  {errorEmployee && (
                    <Message variant="danger">{errorEmployee}</Message>
                  )}
                  {
                    <div>
                      <h4>Schedule {orderId}</h4>
                    </div>
                  }
                  <hr></hr>
                  <div className="detailsTopic">
                    <strong>Order details</strong>
                  </div>
                  <div>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}{' '}
                    (Postal Code: {order.shippingAddress.postalCode})
                  </div>
                  <div>
                    <strong>Date: </strong>
                    {order.deliveredAt.substring(0, 10)}
                  </div>
                  <hr></hr>
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="employee">
                      <Form.Label>
                        <strong>Select a employee from employees list:</strong>
                      </Form.Label>
                      <br />
                      <select
                        className="selectEmployee"
                        type="select"
                        name="select"
                        id="select"
                        onChange={(e) => setEmployee(e.target.value)}
                      >
                        <option value="0">Select a employee</option>
                        {users &&
                          users.map((user) => (
                            <option value={user.name}>{user.name}</option>
                          ))}
                      </select>
                    </Form.Group>
                    <p>
                      {employee && employee != ' '
                        ? 'You selected ' +
                          employee +
                          ' to assign to this complaint!'
                        : 'Currently no employee assigned!'}
                    </p>
                    <Button type="submit" variant="primary">
                      Assign employee to the complaint!
                    </Button>
                  </Form>
                  <hr></hr>
                  <Row>
                    <Col></Col>
                    <Col>
                      <LinkContainer to={`/admin/schedules/ongoing`}>
                        <Button
                          variant="dark"
                          className="backbtn mr-auto btn-sm"
                        >
                          Back to ongoing schedules
                        </Button>
                      </LinkContainer>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </div>
  )
}

export default ScheduleHandlingScreen
