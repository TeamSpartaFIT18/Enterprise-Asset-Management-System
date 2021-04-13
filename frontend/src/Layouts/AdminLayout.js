import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import AdminSideNav from "../components/AdminSideNav/AdminSideNav";
import ProductListScreen from "../screens/ProductListScreen/ProductListScreen";
import AdminDashboard from "../screens/AdminDashboard/AdminDashboard";
import OrderListScreen from "../screens/OrderListScreen/OrderListScreen";
import UserEditScreen from "../screens/UserEditScreen/UserEditScreen";
import ProductEditScreen from "../screens/ProductEditScreen/ProductEditScreen";
import UserListScreen from "../screens/UserListScreen/UserListScreen";
import AdminListScreen from "../screens/AdminListScreen/AdminListScreen";
import EmployeeListScreen from "../screens/EmployeeListScreen/EmployeeListScreen";
import ClientListScreen from "../screens/ClientListScreen/ClientListScreen";
import NotPaidOrderListScreen from "../screens/NotPaidOrderListScreen/NotPaidOrderListScreen";
import OrderScreen from "../screens/OrderScreen/OrderScreen";
import NotDeliveredOrderScreen from "../screens/NotDeliveredOrderScreen/NotDeliveredOrderScreen";
import AdminMailboxToClients from "../screens/AdminMailboxToClients/AdminMailboxToClients";

const AdminLayout = () => {
  const history = useHistory();
  return (
    <Router history={history}>
      <Row>
        <Col md={2}>
          <AdminSideNav />
        </Col>
        <Col md={10}>
          <Switch>
            <Route exact path="/admin/dashboard" component={AdminDashboard} />
            <Route
              exact
              path="/admin/productslist"
              component={ProductListScreen}
            />
            <Route
              path="/admin/productslist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route path="/admin/orderslist" component={OrderListScreen} />
            <Route
              path="/admin/orders/notpaidorders"
              component={NotPaidOrderListScreen}
            />
            <Route
              path="/admin/orders/notDeliveredorders"
              component={NotDeliveredOrderScreen}
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/admin/product/" component={ProductEditScreen} />
            <Route path="/admin/userslist" component={UserListScreen} />
            <Route path="/admin/adminslist" component={AdminListScreen} />
            <Route path="/admin/employeelist" component={EmployeeListScreen} />
            <Route path="/admin/clientlist" component={ClientListScreen} />
            <Route path="/admin/mail/:id" component={AdminMailboxToClients} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/order/:id" component={OrderScreen} />
          </Switch>
        </Col>
      </Row>
    </Router>
  );
};

export default AdminLayout;
