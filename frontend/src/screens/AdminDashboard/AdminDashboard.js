import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNotDeliveredOrders } from "../../actions/orderActions";
import { listAllProducts } from "../../actions/productActions";
import { listUsers, listAdmins } from "../../actions/userActions";
import Loader from "../../components/Loader";
import "../Screens.css";
import "./AdminDashboard.css";

const AdminDashboard = (history) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //products in the inventory
  const allProductList = useSelector((state) => state.allProductList);
  const { loading, error, products } = allProductList;

  //users count
  const userList = useSelector((state) => state.userList);
  const {
    loading: loadingUsers,
    error: errorUsers,
    users: ListUsers,
  } = userList;

  //admins count
  const adminList = useSelector((state) => state.adminList);
  const {
    loading: loadingAdmins,
    error: errorAdmins,
    users: adminUsers,
  } = adminList;

  //not delivered orders
  const notDeliveredOrderList = useSelector(
    (state) => state.notDeliveredOrderList
  );
  const {
    loading: notDelOrdersLoading,
    error: notDelOrdersError,
    orders: notDelOrders,
  } = notDeliveredOrderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listNotDeliveredOrders());
      dispatch(listAllProducts());
      dispatch(listUsers());
      dispatch(listAdmins());
    } else {
      history.push("/signin");
    }
  }, [dispatch, userInfo]);

  return (
    <div className="adminDashboard">
      <h1>Admin Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {userInfo.name}
      </p>
      <hr className="topLine"></hr>
      <h2 className="topic">Inventory</h2>
      <Row>
        <Col md={6}>
          <Card bg="success">
            <Card.Title className="cardTitle ml-2 mt-2">
              Inventory Items
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">No. of Items</Col>
                <Col className="colCount">
                  {products && products.length ? (
                    loading ? (
                      <Loader />
                    ) : (
                      <p>{products.length}</p>
                    )
                  ) : (
                    <p>No products</p>
                  )}
                </Col>
              </Row>
            </Card.Text>
          </Card>
        </Col>
      </Row>

      <h2 className="topic mt-4">Users</h2>
      <Row className="mt-2">
        <Col md={3}>
          <Card bg="success">
            <Card.Title className="cardTitle ml-2 mt-2">
              Number of Users
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">Users</Col>
                <Col className="colCount">
                  {ListUsers && ListUsers.length ? (
                    loadingUsers ? (
                      <Loader />
                    ) : (
                      <p>{ListUsers.length}</p>
                    )
                  ) : (
                    <p>No users</p>
                  )}
                </Col>
              </Row>
            </Card.Text>
          </Card>
        </Col>

        <Col md={3}>
          <Card bg="success">
            <Card.Title className="cardTitle ml-2 mt-2">
              Number of Admins
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">Admins</Col>
                <Col className="colCount">
                  {adminUsers && adminUsers.length ? (
                    loadingAdmins ? (
                      <Loader />
                    ) : (
                      <p>{adminUsers.length}</p>
                    )
                  ) : (
                    <p>No Admins</p>
                  )}
                </Col>
              </Row>
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
