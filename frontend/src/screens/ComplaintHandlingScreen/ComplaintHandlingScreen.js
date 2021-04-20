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
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import Rating from '../../components/Rating/Rating';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Meta from '../../components/Meta';
import '../Screens.css';
import {
  listProductDetails,
  updateProductComplaint,
} from '../../actions/productActions';
import { PRODUCT_UPDATE_COMPLAINT_RESET } from '../../types/productTypes';
import { listEmployees } from '../../actions/userActions';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const ComplaintHandlingScreen = ({ match }) => {
  const complaintId = match.params.complaintId;
  const productId = match.params.productId;

  const [employee, setEmployee] = useState(' ');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const employeeList = useSelector((state) => state.employeeList);
  const {
    loading: loadingEmployee,
    error: errorEmployee,
    users,
  } = employeeList;

  const productComplaintUpdate = useSelector(
    (state) => state.productComplaintUpdate
  );
  const {
    success: successProductComplaint,
    error: errorProductComplaint,
  } = productComplaintUpdate;

  useEffect(() => {
    if (productId) {
      dispatch(listProductDetails(productId));
      dispatch(listEmployees());
    }
    if (successProductComplaint) {
      alert('Employee assigned!');
      setEmployee('');
      dispatch({ type: PRODUCT_UPDATE_COMPLAINT_RESET });
      window.location = '/admin/complaints';
    }
  }, [dispatch, match, successProductComplaint]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!employee || employee == ' ') {
      setMessage('You need to select employee to submit');
    } else {
      dispatch(updateProductComplaint(productId, complaintId, employee));
    }
  };

  return (
    <div className="oneProductScreen">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Card className="complaintHandlingCard">
            <Row>
              <Col md={3}>
                <Image
                  className="complaintHandlingImage"
                  src={product.image}
                  alt={product.name}
                  fluid
                />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: Rs. {product.price}</ListGroup.Item>
                  <ListGroup.Item>{product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <div className="complaintCol">
                  {message && <Message variant="danger">{message}</Message>}
                  <h2>Complaint!</h2>
                  {errorProductComplaint && (
                    <Message variant="danger">{errorProductComplaint}</Message>
                  )}
                  {
                    <div>
                      <h4>This Item has a complain</h4>

                      <div>
                        {product.complaints &&
                          product.complaints.map((complaint) => (
                            <div>
                              <p className="complaintDet">
                                {complaintId == complaint._id
                                  ? 'Complaint ID : ' + complaint._id
                                  : ''}
                              </p>
                              <p className="complaintDet">
                                {complaintId == complaint._id
                                  ? 'User : ' + complaint.name
                                  : ''}
                              </p>
                              <p className="complaintDet">
                                {complaintId == complaint._id
                                  ? 'Complaint date : ' +
                                    complaint.createdAt.substring(0, 10)
                                  : ''}
                              </p>
                              <p className="complaintDet">
                                {complaintId == complaint._id
                                  ? 'Complaint : ' + complaint.complain
                                  : ''}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  }
                  <hr></hr>
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="employee">
                        <Form.Label>
                          <strong>
                            Select a employee from employees list:
                          </strong>
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

export default ComplaintHandlingScreen;
