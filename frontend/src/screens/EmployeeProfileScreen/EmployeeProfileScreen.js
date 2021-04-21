import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import { getCurrentProfile } from '../../actions/profileActions';
import '../Screens.css';

const EmployeeProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const employeeProfile = useSelector((state) => state.employeeProfile);
  const { profile, loading, experiences, skills } = employeeProfile;

  useEffect(() => {
    if (userInfo) {
      dispatch(getCurrentProfile());
    } else {
      history.push('/signin');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <div className="empProfileScreen">
        {loading ? (
          <Loader />
        ) : profile ? (
          <>
            <Row className="align-items-center">
              <Col>
                <h1>Profile</h1>
              </Col>
              <Col className="text-right">
                <Link to="/employee/editprofile" className="btn btn-light">
                  <Button>
                    <i className="userIcon fas fa-user-circle"></i> Edit profile
                  </Button>
                </Link>
              </Col>
            </Row>
            <Card className="infoCard">
              <Card.Body>
                <Row>
                  <Col md={3} className="text-center">
                    <div className="vl">
                      <p className="cardName">{userInfo.name}</p>
                      <strong>{profile ? profile.status : 'null'}</strong>
                    </div>
                  </Col>

                  <Col md={2}>
                    <p className="profDet">
                      <strong>Skills:</strong>
                    </p>
                    <p className="profDet">
                      <strong>Address:</strong>
                    </p>
                    <p className="profDet">
                      <strong>Contact:</strong>
                    </p>
                    <p className="profDet">
                      <strong>Bio:</strong>
                    </p>
                    <p className="profDet">
                      <strong>Working:</strong>
                    </p>
                  </Col>
                  <Col md={7}>
                    <p className="profDet">
                      <strong>
                        {skills &&
                          skills.map((skill) => (
                            <strong>
                              {' '}
                              <i className="skillsBullet fas fa-circle"></i>{' '}
                              {skill} &nbsp;&nbsp;{' '}
                            </strong>
                          ))}{' '}
                      </strong>
                    </p>
                    <p className="profDet">
                      {profile ? profile.address : 'null'}
                    </p>
                    <p className="profDet">
                      {profile ? profile.contact : 'null'}
                    </p>
                    <p className="profDet">{profile ? profile.bio : 'null'}</p>
                    <p className="profDet">
                      Since &nbsp;
                      {profile.createdAt
                        ? profile.createdAt.slice(0, 10)
                        : 'null'}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <h3 className="mt-1">Experiences</h3>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Description</th>
                  <th>Title</th>
                  <th>From</th>
                  <th>to</th>
                </tr>
              </thead>
              <tbody>
                {experiences &&
                  experiences.map((experience) => (
                    <tr key={experience._id}>
                      <td>{experience.company}</td>
                      <td>{experience.description}</td>
                      <td>{experience.title}</td>
                      <td>{experience.fromDate.substring(0, 10)}</td>
                      <td>{experience.toDate.substring(0, 10)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <p>You haven't yet setup a profile, Please add some info</p>
            <Link to="/employee/createprofile" className="btn btn-light">
              <Button>
                <i className="userIcon fas fa-user-circle"></i> Create profile
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeProfileScreen;
