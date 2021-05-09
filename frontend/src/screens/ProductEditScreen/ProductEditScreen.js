import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Meta from '../../components/Meta'
import Loader from '../../components/Loader'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../types/productTypes'
import '../Screens.css'
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [supplierAddress, setSupplierAddress] = useState('')
  const [supplierContact, setSupplierContact] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productslist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        setSupplierName(product.supplierName)
        setSupplierAddress(product.supplierAddress)
        setSupplierContact(product.supplierContact)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (
      name === '' ||
      price === 0 ||
      image === '' ||
      brand === '' ||
      category === '' ||
      description === '' ||
      countInStock === 0 ||
      supplierName === '' ||
      supplierAddress === '' ||
      supplierContact === ''
    ) {
      setMessage('All fields required')
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          brand,
          category,
          description,
          countInStock,
          supplierName,
          supplierAddress,
          supplierContact,
        })
      )
    }
  }

  return (
    <div className="productEditScreen">
      <Meta title="EAMS | Product" />
      <Card className="editOrCreateFormCard">
        <Row>
          {product && product.price === 0 ? (
            <p className="cardTopic">
              <strong>Create product</strong>
            </p>
          ) : (
            <p className="cardTopic">
              <strong>Edit products</strong>
            </p>
          )}
        </Row>
        <Row className="ml-5">
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {message && <Message variant="danger">{message}</Message>}
        </Row>
        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row className="editCreateProdForm">
              <Form onSubmit={submitHandler}>
                <Row>
                  <Col>
                    <p className="formColTopic">
                      <strong>Product Details</strong>
                    </p>
                    <Form.Group controlId="name">
                      <Form.Label className="formFieldDet">
                        Product name:
                      </Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                  <Col>
                    <p className="formColTopic">
                      <strong>Supplier Details</strong>
                    </p>
                    <Form.Group controlId="supplierName">
                      <Form.Label className="formFieldDet">
                        Supplier Name:
                      </Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="text"
                        placeholder="Enter Supplier name"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="brand">
                      <Form.Label className="formFieldDet">Brand:</Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="text"
                        placeholder="Enter brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Form.Group controlId="supplierAddress">
                      <Form.Label className="formFieldDet">
                        Supplier Address:
                      </Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="text"
                        placeholder="Enter Supplier address"
                        value={supplierAddress}
                        onChange={(e) => setSupplierAddress(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="category">
                      <Form.Label className="formFieldDet">
                        Category:
                      </Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Form.Group controlId="supplierAddress">
                      <Form.Label className="formFieldDet">
                        Supplier Contact Number:
                      </Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="text"
                        placeholder="Enter Supplier contact number"
                        value={supplierContact}
                        onChange={(e) => setSupplierContact(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {' '}
                    <Form.Group controlId="description">
                      <Form.Label className="formFieldDet">
                        Description:
                      </Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {' '}
                    <Form.Group controlId="image">
                      <Form.Label className="formFieldDet">Image:</Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="text"
                        placeholder="Enter image url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      ></Form.Control>
                      <Form.File
                        className="halfinput"
                        id="image-file"
                        label="Choose File"
                        custom
                        onChange={uploadFileHandler}
                      ></Form.File>
                      {uploading && <Loader />}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="price">
                      <Form.Label className="formFieldDet">Price:</Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="text"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="countInStock">
                      <Form.Label className="formFieldDet">
                        Count In Stock:
                      </Form.Label>
                      <Form.Control
                        className="halfinput"
                        type="number"
                        placeholder="Enter countInStock"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                  <Col>
                    {' '}
                    <Button
                      className="updateOrCreateButton"
                      type="submit"
                      variant="info"
                    >
                      {product && product.price === 0 ? (
                        <strong>Create</strong>
                      ) : (
                        <strong>Update</strong>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          )}
        </Row>
      </Card>
    </div>
  )
}

export default ProductEditScreen
