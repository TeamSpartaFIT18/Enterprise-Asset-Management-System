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
import {
  listProductDetails,
  updateProductComplaintEmp,
} from '../../actions/productActions';
import { PRODUCT_EMP_UPDATE_COMPLAINT_RESET } from '../../types/productTypes';

const EmployeeAssignedComplaintsUpdateScreen = ({ match }) => {
  const complaintId = match.params.complaintId;
  const productId = match.params.productId;

  const [jobDescription, setJobDescription] = useState(' ');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productComplaintEmpUpdate = useSelector(
    (state) => state.productComplaintEmpUpdate
  );
  const {
    success: successProductComplaint,
    error: errorProductComplaint,
  } = productComplaintEmpUpdate;

  useEffect(() => {
    if (productId) {
      dispatch(listProductDetails(productId));
    }
    if (successProductComplaint) {
      alert('Job Done!');
      setJobDescription('');
      dispatch({ type: PRODUCT_EMP_UPDATE_COMPLAINT_RESET });
      window.location = '/employee/jobs/complaints';
    }
  }, [dispatch, match, successProductComplaint]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!jobDescription || jobDescription == ' ') {
      setMessage('You need to enter description to submit');
    } else {
      dispatch(
        updateProductComplaintEmp(productId, complaintId, jobDescription)
      );
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
                      <Form.Group controlId="jobDone">
                        <Form.Label>
                          <strong>Enter a job description:</strong>
                        </Form.Label>
                        <br />
                        <Form.Control
                          type="name"
                          placeholder="Enter name"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                        ></Form.Control>
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

export default EmployeeAssignedComplaintsUpdateScreen;
