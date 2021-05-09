import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import '../Screens.css'
import * as IoIcons from 'react-icons/io'
import { getOrderDetails } from '../../actions/orderActions'
import { getUserDetails } from '../../actions/userActions'
import { getEmpProfileAdmin } from '../../actions/profileActions'
import { LinkContainer } from 'react-router-bootstrap'

const ScheduleOngoingDetailsScreen = ({ match }) => {
  const orderId = match.params.scheduleId
  const employeeId = match.params.employeeId

  const [message] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const userDetails = useSelector((state) => state.userDetails)
  const { error: errorUser, user } = userDetails

  const employeeProfileAdmin = useSelector(
    (state) => state.employeeProfileAdmin
  )
  const { profile } = employeeProfileAdmin

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(getOrderDetails(orderId))
      dispatch(getUserDetails(employeeId))
      dispatch(getEmpProfileAdmin(employeeId))
    }
  }, [dispatch, employeeId, orderId, userInfo.isAdmin, match])

  return (
    <div className="oneProductScreen">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          <Meta title="EAMS | Schedule" />
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
                  {errorUser && <Message variant="danger">{errorUser}</Message>}
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
                  <div className="detailsTopic">
                    <strong>Picked employee details</strong>
                  </div>
                  <div>
                    <strong>Name: </strong>
                    {user.name}
                  </div>
                  <div>
                    <strong>Email: </strong>
                    {user.email} &nbsp;
                    <LinkContainer to={`${user._id}/mail`}>
                      <Button variant="info" className="btn-sm">
                        <i>
                          <IoIcons.IoIosMail size={20} />
                          <IoIcons.IoMdArrowRoundForward size={20} />
                        </i>
                      </Button>
                    </LinkContainer>
                  </div>
                  <div>
                    <strong>Contact number: </strong>
                    {profile.contact && profile.contact}
                  </div>
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

export default ScheduleOngoingDetailsScreen
