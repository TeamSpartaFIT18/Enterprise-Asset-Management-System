import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { completedSchedulesByEmp } from '../../actions/scheduleActions';
import '../Screens.css';

const SchedulesCompletedByEmpScreen = ({ history }) => {
  const [orderId, setOrderId] = useState(' ');

  const dispatch = useDispatch();

  const allCompletedScheduleListByEmp = useSelector(
    (state) => state.allCompletedScheduleListByEmp
  );
  const { loading, error, schedules } = allCompletedScheduleListByEmp;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isEmployee) {
      dispatch(completedSchedulesByEmp());
    } else {
      history.push('/signin');
    }
  }, [dispatch, history, userInfo]);

  const employeeId = userInfo._id;
  return (
    <div className="orderListScreen">
      <h1>Orders</h1>
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
              <th>PICK</th>
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
                <td>{schedule.isScheduleCompleted && 'Completed'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default SchedulesCompletedByEmpScreen;
