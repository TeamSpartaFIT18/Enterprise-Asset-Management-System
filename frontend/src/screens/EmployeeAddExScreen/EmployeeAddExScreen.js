import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import FormContainer from '../../components/FormContainer'
import { empExperienceAdd } from '../../actions/profileActions'
import '../Screens.css'

const EmployeeAddExScreen = ({ location, history }) => {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [companyLocation, setCompanyLocation] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      console.log('qqqq')
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!userInfo) {
      console.log('Password do not match')
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
      window.location = '/employee/dashboard'
    }
  }

  return (
    <FormContainer className='empAddExperience'>
      <Meta title='EAMS | Register' />
      <h1 className='empAddExScreen'>Add Experience</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='company'>
          <Form.Label>Company</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter company'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='companyLocation'>
          <Form.Label>Company Location</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter company location'
            value={companyLocation}
            onChange={(e) => setCompanyLocation(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='fromDate'>
          <Form.Label>Started Date</Form.Label>
          <Form.Control
            type='date'
            placeholder='Started Date'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='toDate'>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type='date'
            placeholder='End Date'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default EmployeeAddExScreen
