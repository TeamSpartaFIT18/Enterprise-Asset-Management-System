import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import FormContainer from '../../components/FormContainer'
import {
  empExperienceAdd,
  getCurrentProfile,
} from '../../actions/profileActions'
import '../Screens.css'

const EmployeeAddExScreen = ({ location, history }) => {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [companyLocation, setCompanyLocation] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const employeeProfile = useSelector((state) => state.employeeProfile)
  const {
    profile,
    loading: profileLoading,
    experiences,
    skills,
  } = employeeProfile

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      dispatch(getCurrentProfile())
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!profile) {
      setErrorMessage('You have to create profile before add a experience')
    } else if (
      !title ||
      !company ||
      !companyLocation ||
      !fromDate ||
      !toDate ||
      !description
    ) {
      setErrorMessage('All fields required')
    } else {
      dispatch(
        empExperienceAdd(
          title,
          company,
          companyLocation,
          fromDate,
          toDate,
          description
        )
      )
      setMessage('Successfully saved!')
      setTimeout(function () {
        window.location.href = '/employee/profile'
      }, 3000)
    }
  }

  return (
    <div className="empAddExperience">
      <FormContainer>
        <Meta title="EAMS | Register" />
        <h1 className="empAddExScreen">Add Experience</h1>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="success">{message}</Message>}
        {errorMessage && <Message variant="danger">{errorMessage}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="companyLocation">
            <Form.Label>Company Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company location"
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="fromDate">
            <Form.Label>Started Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Started Date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="toDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="End Date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default EmployeeAddExScreen
