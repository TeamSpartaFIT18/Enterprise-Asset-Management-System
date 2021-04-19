import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, mailToClient } from '../../actions/userActions';
import FormContainer from '../../components/FormContainer';
import '../Screens.css';
import mail from '../Images/mail.jpg';
import Message from '../../components/Message';

const AdminMailboxToClients = ({ match }) => {
  const userId = match.params.id;

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetails(userId));
    }
  }, [userId, dispatch]);

  const email = user.email;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!user.email || !subject || !body) {
      setMessage('All fields are required!');
    } else {
      dispatch(mailToClient({ email, subject, body }));
      window.location = '/admin/clientlist';
    }
  };
  return (
    <div className="container">
      <div className="adminMailboxToClients">
        <Row className="mainRow no-gutters">
          <Col md={4}>
            <Image className="mailImage" src={mail} />
          </Col>
          <Col md={8}>
            <FormContainer>
              <h3 class="font-weight-bold mt-4 py-3">
                Send mail to {user.name}
              </h3>
              {message && <Message variant="danger">{message}</Message>}
              <Row>
                <Col md={3}>To: </Col>
                <Col md={9}>{user.email}</Col>
              </Row>

              <Form onSubmit={submitHandler}>
                <Row>
                  <Col md={3}>Subject: </Col>
                  <Col md={9}>
                    <Form.Group controlId="subject">
                      <Form.Control
                        as="textarea"
                        rows={2}
                        type="text"
                        placeholder="Enter the subject to the mail"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>Body: </Col>
                  <Col md={9}>
                    <Form.Group controlId="body">
                      <Form.Control
                        as="textarea"
                        rows={4}
                        type="text"
                        placeholder="Enter the email body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Button className="btnSendMail" type="submit" variant="primary">
                  Send Mail
                </Button>
              </Form>
            </FormContainer>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminMailboxToClients;
