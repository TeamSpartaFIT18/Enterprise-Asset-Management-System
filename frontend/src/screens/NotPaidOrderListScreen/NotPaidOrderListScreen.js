import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { listNotPaidOrders } from '../../actions/orderActions'
import * as IoIcons from 'react-icons/io'
import '../Screens.css'
import { mailToRemind } from '../../actions/userActions'

const NotPaidOrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const notPaidOrderList = useSelector((state) => state.notPaidOrderList)
  const { loading, error, orders } = notPaidOrderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listNotPaidOrders())
    } else {
      history.push('/signin')
    }
  }, [dispatch, history, userInfo])

  const emailHandler = (clientId) => {
    if (window.confirm('Do you want to send payment remind email?')) {
      dispatch(mailToRemind(clientId))
    }
  }

  return (
    <div className="NotPaidOrderListScreen">
      <Meta title="EAMS | Orders | Not paid" />
      <h1>Payment pending orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="thead">
            <tr>
              <th>ID</th>
              <th>CLIENT</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="trow" key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>Rs. {order.totalPrice}</td>
                <td className="notPaid">
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fa fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className="notDelivered">
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fa fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className="details">
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="info" className="btn-sm">
                      <i className="fa fa-info"></i>
                    </Button>
                  </LinkContainer>{' '}
                  <Button
                    variant="success"
                    className="btn-sm"
                    onClick={() => emailHandler(order.user._id)}
                  >
                    <IoIcons.IoIosMail size={20} />
                    <IoIcons.IoMdArrowRoundForward size={20} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default NotPaidOrderListScreen
