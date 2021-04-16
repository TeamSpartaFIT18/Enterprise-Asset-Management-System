import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import { getCurrentProfile } from "../../actions/profileActions";
import "../Screens.css";

const EmployeeProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const employeeProfile = useSelector((state) => state.employeeProfile);
  const { profile, loading, experiences } = employeeProfile;

  useEffect(() => {
    if (userInfo) {
      dispatch(getCurrentProfile());
    } else {
      history.push("/signin");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <div className="empProfileScreen">
        {loading ? (
          <Loader />
        ) : profile ? (
          <>
            <div className="dash-buttons">
              <Link to="/employee/editprofile" className="btn byn-light">
                <i className="fas fa-user-circle text-primary"></i>Edit profile
              </Link>
            </div>
          </>
        ) : (
          <>
            <p>You haven't yet setup a profile, Please add some info</p>
            <Link to="/employee/createprofile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </>
        )}
      </div>
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
  );
};

export default EmployeeProfileScreen;
