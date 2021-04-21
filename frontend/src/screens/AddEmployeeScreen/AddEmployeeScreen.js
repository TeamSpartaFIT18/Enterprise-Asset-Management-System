import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import FormContainer from '../../components/FormContainer';
import { addEmployee } from '../../actions/userActions';
import '../Screens.css';
const AddEmployeeScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const password = 'employeeEams';
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (userInfo && userInfo.isAdmin) {
      if (name === '' || email === '' || password === '') {
        setMessage('All fields are required');
      } else {
        dispatch(addEmployee(name, email, password));
        window.location = '/admin/employeelist';
      }
    }
  };

  return (
    <FormContainer className="registerScreen">
      <Meta title="EAMS | Register" />
      <h1 className="registerScreen">Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign Up
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AddEmployeeScreen;
