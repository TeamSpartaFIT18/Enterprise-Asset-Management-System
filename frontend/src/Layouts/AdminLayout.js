import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import AdminRoute from '../components/Routing/AdminRoute';
import AdminSideNav from '../components/AdminSideNav/AdminSideNav';
import ProductListScreen from '../screens/ProductListScreen/ProductListScreen';
import AdminDashboard from '../screens/AdminDashboard/AdminDashboard';
import OrderListScreen from '../screens/OrderListScreen/OrderListScreen';
import UserEditScreen from '../screens/UserEditScreen/UserEditScreen';
import ProductEditScreen from '../screens/ProductEditScreen/ProductEditScreen';
import UserListScreen from '../screens/UserListScreen/UserListScreen';
import AdminListScreen from '../screens/AdminListScreen/AdminListScreen';
import EmployeeListScreen from '../screens/EmployeeListScreen/EmployeeListScreen';
import ClientListScreen from '../screens/ClientListScreen/ClientListScreen';
import NotPaidOrderListScreen from '../screens/NotPaidOrderListScreen/NotPaidOrderListScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';
import NotDeliveredOrderScreen from '../screens/NotDeliveredOrderScreen/NotDeliveredOrderScreen';
import AdminMailboxToClients from '../screens/AdminMailboxToClients/AdminMailboxToClients';
import AddAdminScreen from '../screens/AddAdminScreen/AddAdminScreen';
import AddEmployeeScreen from '../screens/AddEmployeeScreen/AddEmployeeScreen';
import UpdateCredentialsScreen from '../screens/UpdateCredentialsScreen/UpdateCredentialsScreen';
import ComplaintListScreen from '../screens/ComplaintListScreen/ComplaintListScreen';
import ComplaintHandlingScreen from '../screens/ComplaintHandlingScreen/ComplaintHandlingScreen';
import NotHandledComplaintsScreen from '../screens/NotHandledComplaintsScreen/NotHandledComplaintsScreen';
import ScheduleOngoingListAdminScreen from '../screens/ScheduleOngoingListAdminScreen/ScheduleOngoingListAdminScreen';
import ScheduleOngoingDetailsScreen from '../screens/ScheduleOngoingDetailsScreen/ScheduleOngoingDetailsScreen';
import AdminMailToEmployeeScreen from '../screens/AdminMailToEmployeeScreen/AdminMailToEmployeeScreen';

const AdminLayout = () => {
  const { url, path } = useRouteMatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Row>
      <Col md={2}>
        <AdminSideNav />
      </Col>
      <Col md={10}>
        <Switch>
          <AdminRoute
            exact
            path={`${url}/dashboard`}
            component={AdminDashboard}
          />
          <AdminRoute
            exact
            path={`${url}/updateprofile`}
            component={UpdateCredentialsScreen}
          />
          {userInfo && userInfo.isAdmin ? (
            <Route
              exact
              path={`${url}/productslist`}
              component={ProductListScreen}
            />
          ) : (
            (window.location = '/signin')
          )}
          {userInfo && userInfo.isAdmin ? (
            <Route
              path={`${url}/productslist/:pageNumber`}
              component={ProductListScreen}
              exact
            />
          ) : (
            (window.location = '/signin')
          )}
          {userInfo && userInfo.isAdmin ? (
            <Route
              exact
              path={`${url}/complaints`}
              component={ComplaintListScreen}
            />
          ) : (
            (window.location = '/signin')
          )}
          {userInfo && userInfo.isAdmin ? (
            <Route
              exact
              path={`${url}/schedules/ongoing`}
              component={ScheduleOngoingListAdminScreen}
            />
          ) : (
            (window.location = '/signin')
          )}
          {userInfo && userInfo.isAdmin ? (
            <Route
              exact
              path={`${url}/schedules/ongoing/:scheduleId/:employeeId`}
              component={ScheduleOngoingDetailsScreen}
            />
          ) : (
            (window.location = '/signin')
          )}
          {userInfo && userInfo.isAdmin ? (
            <Route
              exact
              path={`${url}/schedules/ongoing/:scheduleId/:employeeId/mail`}
              component={AdminMailToEmployeeScreen}
            />
          ) : (
            (window.location = '/signin')
          )}
          {userInfo && userInfo.isAdmin ? (
            <Route
              exact
              path={`${url}/complaints/nothandled`}
              component={NotHandledComplaintsScreen}
            />
          ) : (
            (window.location = '/signin')
          )}
          {userInfo && userInfo.isAdmin ? (
            <Route
              exact
              path={`${url}/complaints/:complaintId/product/:productId`}
              component={ComplaintHandlingScreen}
            />
          ) : (
            (window.location = '/signin')
          )}
          <AdminRoute path={`${url}/orderslist`} component={OrderListScreen} />
          <AdminRoute
            path={`${url}/orders/notpaidorders`}
            component={NotPaidOrderListScreen}
          />
          <AdminRoute
            path={`${url}/orders/notDeliveredorders`}
            component={NotDeliveredOrderScreen}
          />
          {userInfo && userInfo.isAdmin ? (
            <Route
              path={`${url}/product/:id/edit`}
              component={ProductEditScreen}
            />
          ) : (
            (window.location = '/signin')
          )}
          <AdminRoute path={`${url}/userslist`} component={UserListScreen} />
          <AdminRoute path={`${url}/adminslist`} component={AdminListScreen} />
          <AdminRoute path={`${url}/addadmin`} component={AddAdminScreen} />
          <AdminRoute
            path={`${url}/addemployee`}
            component={AddEmployeeScreen}
          />
          <AdminRoute
            path={`${url}/employeelist`}
            component={EmployeeListScreen}
          />
          <AdminRoute path={`${url}/clientlist`} component={ClientListScreen} />
          {userInfo && userInfo.isAdmin ? (
            <Route path={`${url}/mail/:id`} component={AdminMailboxToClients} />
          ) : (
            (window.location = '/signin')
          )}
          {userInfo && userInfo.isAdmin ? (
            <Route path={`${url}/user/:id/edit`} component={UserEditScreen} />
          ) : (
            (window.location = '/signin')
          )}
          {userInfo && userInfo.isAdmin ? (
            <Route path="/order/:id" component={OrderScreen} />
          ) : (
            (window.location = '/signin')
          )}
        </Switch>
      </Col>
    </Row>
  );
};

export default AdminLayout;
