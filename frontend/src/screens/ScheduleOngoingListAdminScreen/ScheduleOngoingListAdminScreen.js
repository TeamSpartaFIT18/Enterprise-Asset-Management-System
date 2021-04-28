import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listOngoingSchedules } from '../../actions/scheduleActions';
import '../Screens.css';

const ScheduleOngoingListAdminScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ongoingScheduleList = useSelector((state) => state.ongoingScheduleList);
  const { loading, error, schedules } = ongoingScheduleList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOngoingSchedules());
    } else {
      history.push('/signin');
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className="orderListScreen">
      <h1>Ongoing Schedules</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="thead">
            <tr>
              <th>SCHEDULE ID</th>
              <th>DATE</th>
              <th>ADDRESS</th>
              <th>ITEMS</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr className="trow" key={schedule._id}>
                <td>{schedule._id}</td>
                <td>{schedule.deliveredAt.substring(0, 10)}</td>
                <td>
                  <p>
                    {schedule.shippingAddress.address},{' '}
                    {schedule.shippingAddress.city} <br /> PostalCode :{' '}
                    {schedule.shippingAddress.postalCode}
                  </p>
                </td>
                <td>
                  {schedule.orderItems.map((item) => (
                    <li key={item._id}>{item.name}</li>
                  ))}
                </td>
                <td>
                  <LinkContainer
                    to={`/admin/schedules/ongoing/${schedule._id}/${schedule.schedulePickedBy}`}
                  >
                    <Button variant="info" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ScheduleOngoingListAdminScreen;
