import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../actions/productActions';
import '../Screens.css';
import { Link } from 'react-router-dom';

const ComplaintListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/signin');
    }

    if (userInfo) {
      dispatch(listProducts('', pageNumber));
    }
  }, [dispatch, history, userInfo, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="productListScreen">
      <Row className="align-items-center">
        <Col>
          <h1>Complaints</h1>
        </Col>
        <Col className="text-right"></Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="thead">
              <tr>
                <th>ID</th>
                <th>PRODUCT</th>
                <th>USER</th>
                <th>COMPLAINT</th>
                <th>DATE</th>
                <th>HANDLED?</th>
              </tr>
            </thead>
            {products.map((product) => (
              <tbody>
                {product.complaints.map((complaint) => (
                  <tr className="trow">
                    <td>{complaint._id}</td>
                    <td>{product.name}</td>
                    <td>{complaint.name}</td>
                    <td>{complaint.complain}</td>
                    <td>{complaint.createdAt.substring(0, 10)}</td>
                    <td>
                      {complaint.isHandled ? (
                        <i
                          className="fa fa-check"
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <>
                          <i
                            className="fa fa-times"
                            style={{ color: 'red' }}
                          ></i>
                          <LinkContainer
                            to={`/admin/complaints/${complaint._id}/product/${product._id}`}
                          >
                            <Button variant="info" className="btn-sm">
                              <i className="fa fa-info"></i>
                            </Button>
                          </LinkContainer>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ComplaintListScreen;
