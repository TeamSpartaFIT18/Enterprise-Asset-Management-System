import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../../components/Rating/Rating';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import '../Screens.css';
import { scheduleComplete } from '../../actions/scheduleActions';
import { COMPLETE_SCHEDULE_RESET } from '../../types/scheduleTypes';
import { getOrderDetails } from '../../actions/orderActions';

const ScheduleCompleteScreen = ({ match }) => {
  const orderId = match.params.id;

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const completeSchedule = useSelector((state) => state.completeSchedule);
  const {
    success: successCompleteSchedule,
    error: errorCompleteSchedule,
  } = completeSchedule;

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
    if (successCompleteSchedule) {
      alert('Job Done!');
      dispatch({ type: COMPLETE_SCHEDULE_RESET });
      window.location = '/employee/schedules/myschedules';
    }
  }, [dispatch, match, successCompleteSchedule]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(scheduleComplete(orderId));
  };

  return (
    <div className="oneProductScreen">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          <Meta title="order" />
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
                  {errorCompleteSchedule && (
                    <Message variant="danger">{errorCompleteSchedule}</Message>
                  )}
                  {
                    <div>
                      <h4>Schedule {orderId}</h4>
                    </div>
                  }
                  <hr></hr>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}{' '}
                    (Postal Code: {order.shippingAddress.postalCode})
                  </p>
                  <hr></hr>
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="jobDone">
                        <Form.Label>
                          <strong>
                            If you completed the service, mark as completed
                          </strong>
                        </Form.Label>
                        <br />
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Mark as completed
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/signin">login</Link> to review
                    </Message>
                  )}
                </div>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </div>
  );
};

export default ScheduleCompleteScreen;
