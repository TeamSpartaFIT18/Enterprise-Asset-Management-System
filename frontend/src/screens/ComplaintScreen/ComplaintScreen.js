import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../../components/Rating/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import '../Screens.css'
import {
  listProductDetails,
  createProductComplaint,
} from '../../actions/productActions'
import { PRODUCT_CREATE_COMPLAINT_RESET } from '../../types/productTypes'

const ComplaintScreen = ({ match }) => {
  const productId = match.params.id

  const [complain, setComplain] = useState(' ')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productComplaintCreate = useSelector(
    (state) => state.productComplaintCreate
  )
  const {
    success: successProductComplaint,
    error: errorProductComplaint,
  } = productComplaintCreate

  useEffect(() => {
    if (productId) {
      dispatch(listProductDetails(productId))
    }
    if (successProductComplaint) {
      alert('Complaint Submitted!')
      setComplain('')
      dispatch({ type: PRODUCT_CREATE_COMPLAINT_RESET })
      window.location = '/profile'
    }
  }, [dispatch, match, productId, successProductComplaint])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!complain || complain === ' ') {
      setMessage('You need to write a complain before submit')
    } else {
      dispatch(createProductComplaint(match.params.id, { complain }))
    }
  }

  const metaTag = `EAMS | Add Complaint  | ${product._id}`

  return (
    <div className="oneProductScreen">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          <Meta title={metaTag} />
          <Card className="complaintCreateCard">
            <Row>
              <Col md={3}>
                <Image
                  className="complaintCreateImage"
                  src={product.image}
                  alt={product.name}
                  fluid
                />
              </Col>
              <Col md={3}>
                <ListGroup
                  className="complaintCreateProductDet"
                  variant="flush"
                >
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
                <div className="complaintCreateCol">
                  {message && <Message variant="danger">{message}</Message>}
                  <h2>Add a complain</h2>
                  {errorProductComplaint && (
                    <Message variant="danger">{errorProductComplaint}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="complain">
                        <Form.Label>
                          <strong>Complaint:</strong>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          row="5"
                          value={complain}
                          onChange={(e) => setComplain(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit complain
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
  )
}

export default ComplaintScreen
