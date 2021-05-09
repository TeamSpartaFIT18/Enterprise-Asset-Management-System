import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { emplistOrders } from '../../actions/orderActions'
import { listProducts } from '../../actions/productActions'
import Meta from '../../components/Meta'
import '../Screens.css'

const EmployeeDashboard = ({ history, match }) => {
  const pageNumber = 1

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const orderListEmp = useSelector((state) => state.orderListEmp)
  const { orders } = orderListEmp

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    }

    if (userInfo) {
      dispatch(listProducts('', pageNumber))
      dispatch(emplistOrders())
    }
  }, [dispatch, history, userInfo, pageNumber])

  //not completed job count
  var notCompletedComplaintCount = 0

  for (var i = 0; i < products.length; i++) {
    if (products[i].complaints.length !== 0) {
      for (var j = 0; j < products[i].complaints.length; j++) {
        if (
          products[i].complaints[j].isJobDone === false &&
          products[i].complaints[j].employee === userInfo.name
        ) {
          notCompletedComplaintCount++
        }
      }
    }
  }
  var availableSchedulesCount = 0
  if (orders) {
    for (var k = 0; k < orders.length; k++) {
      if (orders[k].isDelivered && orders[k].isSchedulePicked === false) {
        availableSchedulesCount++
      }
    }
  }

  var pickedScheduleCount = 0
  if (orders) {
    for (var l = 0; l < orders.length; l++) {
      if (orders[l].schedulePickedBy === userInfo._id) {
        pickedScheduleCount++
      }
    }
  }

  const metaTag = `EAMS  | ${userInfo.name} | Dashboard `

  return (
    <div className="empDashboard">
      <Meta title={metaTag} />
      <h1>Employee Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {userInfo.name}
      </p>

      <Row>
        <Col md={6}>
          <Card bg="success">
            <Card.Title className="cardTitle ml-2 mt-2">
              Assigned Jobs
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-desktop"></i>
                </Col>
                <LinkContainer to="/employee/jobs/complaints">
                  <Col className="colCount">
                    <p>{notCompletedComplaintCount}</p>
                  </Col>
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col md={6}>
          <Card bg="info">
            <Card.Title className="cardTitle ml-2 mt-2">
              Available Schedules
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-desktop"></i>
                </Col>
                <LinkContainer to="/employee/schedules">
                  <Col className="colCount">
                    <p>{availableSchedulesCount}</p>
                  </Col>
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col md={6}>
          <Card bg="danger">
            <Card.Title className="cardTitle ml-2 mt-2">
              Picked Schedules
            </Card.Title>
            <Card.Text>
              <Row>
                <Col className="colDesc">
                  <i className="dashboardIcons fas fa-desktop"></i>
                </Col>
                <LinkContainer to="/employee/schedules/myschedules">
                  <Col className="colCount">
                    <p>{pickedScheduleCount}</p>
                  </Col>
                </LinkContainer>
              </Row>
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default EmployeeDashboard
