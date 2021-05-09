import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { listCompletedSchedules } from '../../actions/scheduleActions'
import '../Screens.css'

const SchedulesCompletedListAdminScreen = ({ history }) => {
  const dispatch = useDispatch()

  const allCompletedScheduleList = useSelector(
    (state) => state.allCompletedScheduleList
  )
  const { loading, error, schedules } = allCompletedScheduleList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCompletedSchedules())
    } else {
      history.push('/signin')
    }
  }, [dispatch, history, userInfo])

  return (
    <div className="orderListScreen">
      <Meta title="EAMS | Schedules | Completed" />
      <h1>Completed scheules</h1>
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
              <th>COMPLETED?</th>
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
  )
}

export default SchedulesCompletedListAdminScreen
