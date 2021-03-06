import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { listAdmins, deleteUser } from '../../actions/userActions'
import '../Screens.css'
const AdminListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const adminList = useSelector((state) => state.adminList)
  const { loading, error, users } = adminList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAdmins())
    } else {
      history.push('/signin')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <div className="userListScreen">
      <Meta title="EAMS | Admins list" />
      <Row>
        <Col>
          <h1>Admin users</h1>
        </Col>
        <Col className="text-right">
          <Link to="/admin/addadmin" className="btn btn-light">
            <Button className="my-3">
              <i className="fas fa-plus"></i> Add a admin
            </Button>
          </Link>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="thead">
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="trow" key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className="isWho">
                  {user.isAdmin ? (
                    <i className="fa fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fa fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className="editOrDelete">
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="info" className="btn-sm">
                      <i className="fa fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fa fa-trash"></i>
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

export default AdminListScreen
