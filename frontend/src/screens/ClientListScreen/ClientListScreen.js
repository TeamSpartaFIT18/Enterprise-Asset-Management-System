import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listClients, deleteUser } from '../../actions/userActions';
import * as IoIcons from 'react-icons/io';
import '../Screens.css';
const AdminMailBoxScreen = ({ history }) => {
  const dispatch = useDispatch();

  const clientList = useSelector((state) => state.clientList);
  const { loading, error, users } = clientList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listClients());
    } else {
      history.push('/signin');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="userListScreen">
      <Link to="/admin/userslist" className="btn btn-light my-3">
        <button className="btnback">Back to users list</button>
      </Link>
      <h1>Clients</h1>
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
              <th>CLIENT?</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="trow" key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                  <LinkContainer to={`mail/${user._id}`}>
                    <i className="mailIcon">
                      <IoIcons.IoIosMail size={20} />
                    </i>
                  </LinkContainer>
                </td>
                <td className="isWho">
                  {user.isClient ? (
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
  );
};

export default AdminMailBoxScreen;
