import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { listMySchedules, scheduleUnpick } from '../../actions/scheduleActions'
import '../Screens.css'

const ScheduleEmployeeScreen = ({ history }) => {
  const [orderId, setOrderId] = useState(' ')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const schedulesListMy = useSelector((state) => state.schedulesListMy)
  const { loading, error, schedules } = schedulesListMy

  useEffect(() => {
    if (!userInfo && userInfo.isEmployee) {
      history.push('/signin')
    } else {
      dispatch(listMySchedules())
    }
  }, [dispatch, history, userInfo])

  //console.log(orderId);

  function unpickScheduleHandler() {
    dispatch(scheduleUnpick(orderId))

    alert('Unpicked the schedule!')
    window.location = '/employee/schedules/myschedules'
  }

  return (
    <div>
      <Meta title="EAMS | Picked Schedules" />
      <Row className="profileScreen">
        <Col>
          <h2>My Schedules</h2>
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
                      {orderId && orderId === ' ' ? (
                        <Button
                          variant="info"
                          className="btn-sm"
                          onClick={() => {
                            setOrderId(schedule._id)
                          }}
                        >
                          Unpick
                        </Button>
                      ) : (
                        <div>
                          {orderId === schedule._id && (
                            <Button
                              variant="danger"
                              className="btn-sm"
                              onClick={() => {
                                setOrderId(schedule._id)
                                unpickScheduleHandler()
                              }}
                            >
                              Sure?
                            </Button>
                          )}
                        </div>
                      )}
                    </td>
                    <td>
                      <LinkContainer
                        to={`/employee/schedules/myschedules/${schedule._id}`}
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
        </Col>
      </Row>
    </div>
  )
}

export default ScheduleEmployeeScreen
