import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'
import '../Screens.css'

const EmployeeDashboard = ({ history, match }) => {
  const pageNumber = 1

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    }

    if (userInfo) {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, history, userInfo, pageNumber])

  //not completed job count
  var notCompletedComplaintCount = 0

  for (var i = 0; i < products.length; i++) {
    if (products[i].complaints.length != 0) {
      for (var j = 0; j < products[i].complaints.length; j++) {
        if (
          products[i].complaints[j].isJobDone == false &&
          products[i].complaints[j].employee == userInfo.name
        ) {
          notCompletedComplaintCount++
        }
      }
    }
  }

  console.log(notCompletedComplaintCount)

  return (
    <div className="empDashboard">
      <h1>Employee Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {userInfo.name}
      </p>
    </div>
  )
}

export default EmployeeDashboard
