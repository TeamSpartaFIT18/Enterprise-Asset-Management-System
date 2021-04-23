import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  listNotDeliveredOrders,
  listNotPaidOrders,
  listOrders,
} from '../../actions/orderActions';
import { listAllProducts } from '../../actions/productActions';
import {
  listUsers,
  listAdmins,
  listEmployees,
  listClients,
} from '../../actions/userActions';
import Loader from '../../components/Loader';
import '../Screens.css';
import './AdminDashboard.css';

const AdminDashboard = (history) => {
  const dispatch = useDispatch();

  var complaintCount = 0;

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

  //employees count
  const employeeList = useSelector((state) => state.employeeList);
  const {
    loading: loadingEmployees,
    error: errorEmployees,
    users: employeeUsers,
  } = employeeList;

  //clients count
  const clientList = useSelector((state) => state.clientList);
  const {
    loading: loadingClients,
    error: errorClients,
    users: clientUsers,
  } = clientList;

  //orders Count
  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;

  //not paid orders
  const notPaidOrderList = useSelector((state) => state.notPaidOrderList);
  const {
    loading: loadingNotPaid,
    error: errorNotPaid,
    orders: notPaidOrders,
  } = notPaidOrderList;

  //not delivered orders
  const notDeliveredOrderList = useSelector(
    (state) => state.notDeliveredOrderList
  );
  const {
    loading: notDelOrdersLoading,
    error: notDelOrdersError,
    orders: notDelOrders,
  } = notDeliveredOrderList;

  //for getting not handled complaints count
  for (var i = 0; i < products.length; i++) {
    if (products[i].complaints.length != 0) {
      for (var j = 0; j < products[i].complaints.length; j++) {
        if (products[i].complaints[j].isHandled == false) complaintCount++;
      }
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listNotDeliveredOrders());
      dispatch(listAllProducts());
      dispatch(listUsers());
      dispatch(listAdmins());
      dispatch(listEmployees());
      dispatch(listClients());
      dispatch(listOrders());
      dispatch(listNotPaidOrders());
    } else {
      history.push('/signin');
    }
  }, [dispatch, userInfo]);

  return (
    <div className="adminDashboard">
      <Row>
        <h1 className="adminDashboardHeader">Admin Dashboard</h1>

        <p className="lead ml-auto mt-4">
          <i className="fas fa-user" /> Welcome {userInfo.name}
        </p>
      </Row>

      <hr className="topLine"></hr>

      <Row>
        <Col md={6}>
          <h2 className="topic">Inventory</h2>
          <Card bg="success">
            <Card.Title className="cardTitle ml-2 mt-2">
              Inventory Items
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-desktop"></i>
                </Col>
                <LinkContainer to="/admin/productslist">
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
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>

        <Col md={6}>
          <h2 className="topic">Complaints</h2>
          <Card bg="danger">
            <Card.Title className="cardTitle ml-2 mt-2">
              New complaints
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-exclamation-triangle"></i>
                </Col>
                <LinkContainer to="/admin/complaints/nothandled">
                  <Col className="colCount">
                    <p>{complaintCount}</p>
                  </Col>
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>
      </Row>

      {/* USERS */}

      <h2 className="topic mt-4">Users</h2>
      <Row className="mt-2">
        <Col md={3}>
          <Card className="usersCard">
            <Card.Title className="cardTitle ml-2 mt-2">
              Number of Users
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-users"></i>
                </Col>
                <LinkContainer to="/admin/userslist">
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
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="adminCard">
            <Card.Title className="cardTitle ml-2 mt-2">
              Number of Admins
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-user"></i>
                </Col>
                <LinkContainer to="/admin/adminslist">
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
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="employeesCard">
            <Card.Title className="cardTitle ml-2 mt-2">
              No. of Employees
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-user"></i>
                </Col>
                <LinkContainer to="/admin/employeelist">
                  <Col className="colCount">
                    {employeeUsers && employeeUsers.length ? (
                      loadingEmployees ? (
                        <Loader />
                      ) : (
                        <p>{employeeUsers.length}</p>
                      )
                    ) : (
                      <p>No Employees</p>
                    )}
                  </Col>
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="clientsCard">
            <Card.Title className="cardTitle ml-2 mt-2">
              Number of Clients
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-user"></i>
                </Col>
                <LinkContainer to="/admin/clientlist">
                  <Col className="colCount">
                    {clientUsers && clientUsers.length ? (
                      loadingClients ? (
                        <Loader />
                      ) : (
                        <p>{clientUsers.length}</p>
                      )
                    ) : (
                      <p>No Clients</p>
                    )}
                  </Col>
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>
      </Row>

      {/* ORDERS */}

      <h2 className="topic mt-4">Orders</h2>
      <Row className="mt-2">
        <Col md={3}>
          <Card className="ordCard">
            <Card.Title className="cardTitle ml-2 mt-2">
              Number of orders
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-shopping-cart"></i>
                </Col>
                <LinkContainer to="/admin/orderslist">
                  <Col className="colCount">
                    {orders && orders.length ? (
                      loadingOrders ? (
                        <Loader />
                      ) : (
                        <p>{orders.length}</p>
                      )
                    ) : (
                      <p>No orders</p>
                    )}
                  </Col>
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="notPaidOrdCard">
            <Card.Title className="cardTitle ml-2 mt-2">
              Not paid orders
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-credit-card"></i>
                </Col>
                <LinkContainer to="/admin/orders/notpaidorders">
                  <Col className="colCount">
                    {notPaidOrders && notPaidOrders.length ? (
                      loadingNotPaid ? (
                        <Loader />
                      ) : (
                        <p>{notPaidOrders.length}</p>
                      )
                    ) : (
                      <p>No orders</p>
                    )}
                  </Col>
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="notDelOrdCard">
            <Card.Title className="cardTitle ml-2 mt-2">
              Not delivered orders
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-truck"></i>
                </Col>
                <LinkContainer to="/admin/orders/notDeliveredorders">
                  <Col className="colCount">
                    {notDelOrders && notDelOrders.length ? (
                      notDelOrdersLoading ? (
                        <Loader />
                      ) : (
                        <p>{notDelOrders.length}</p>
                      )
                    ) : (
                      <p>No orders</p>
                    )}
                  </Col>
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
