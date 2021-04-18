import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import EmployeeSideNav from '../components/EmployeeSideNav/EmployeeSideNav';
import EmployeeDashboard from '../screens/EmployeeDashboard/EmployeeDashboard';
import EmployeeProfileScreen from '../screens/EmployeeProfileScreen/EmployeeProfileScreen';
import EmployeeCreateProfileScreen from '../screens/ProfileForms/EmployeeCreateProfileScreen';
import EmployeeEditProfileScreen from '../screens/ProfileForms/EmployeeEditProfileScreen';
import EmployeeAddExScreen from '../screens/EmployeeAddExScreen/EmployeeAddExScreen';
import EmployeeRoute from '../components/Routing/EmployeeRoute';
import UpdateCredentialsScreen from '../screens/UpdateCredentialsScreen/UpdateCredentialsScreen';

const AdminLayout = () => {
  const { url, path } = useRouteMatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Row>
      <Col md={2}>
        <EmployeeSideNav />
      </Col>
      <Col md={10}>
        <Switch>
          <EmployeeRoute
            exact
            path={`${url}/dashboard`}
            component={EmployeeDashboard}
          />
          <EmployeeRoute
            exact
            path={`${url}/profile`}
            component={EmployeeProfileScreen}
          />
          <EmployeeRoute
            exact
            path={`${url}/updateprofile`}
            component={UpdateCredentialsScreen}
          />
          <EmployeeRoute
            exact
            path={`${url}/createprofile`}
            component={EmployeeCreateProfileScreen}
          />
          {userInfo && userInfo.isEmployee && (
            <Route
              exact
              path={`${url}/editprofile`}
              component={EmployeeEditProfileScreen}
            />
          )}
          {userInfo && userInfo.isEmployee && (
            <Route
              exact
              path={`${url}/addexperience`}
              component={EmployeeAddExScreen}
            />
          )}
        </Switch>
      </Col>
    </Row>
  );
};

export default AdminLayout;
