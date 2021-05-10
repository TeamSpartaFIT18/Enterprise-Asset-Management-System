import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SG_KEY,
    },
  })
)

// Get all available service schedules
// GET api/schedule/
const getSchedules = asyncHandler(async (req, res) => {
  try {
    let availabeSchedules = []
    const orders = await Order.find({
      isSchedulePicked: false,
      isDelivered: true,
    })
    const today = new Date()

    orders.map((item) => {
      let deliveredDate = item.createdAt
      let deliveredMonth = deliveredDate.getMonth()
      let deliveredYear = deliveredDate.getFullYear()

      // if(deliveredMonth + 6 > 11){
      //     deliveredMonth = deliveredMonth - 11;
      //     deliveredYear++;
      //     deliveredDate.setMonth(deliveredMonth + 6);
      //     deliveredDate.setFullYear(deliveredYear);
      // }else{
      //     deliveredDate.setMonth(deliveredMonth + 6);
      // }

      deliveredDate.setDate(2)

      if (deliveredDate < today) {
        availabeSchedules.push(item)
      }
    })

    res.status(200).json(availabeSchedules)
  } catch (ex) {
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
})

// Get all service schedules
// GET api/schedule/all
const getAllSchedules = asyncHandler(async (req, res) => {
  try {
    let availabeSchedules = []
    const orders = await Order.find({ isDelivered: true })
    const today = new Date()

    orders.map((item) => {
      let deliveredDate = item.createdAt
      let deliveredMonth = deliveredDate.getMonth()
      let deliveredYear = deliveredDate.getFullYear()

      if (deliveredMonth + 6 > 11) {
        deliveredMonth = deliveredMonth - 11
        deliveredYear++
        deliveredDate.setMonth(deliveredMonth + 6)
        deliveredDate.setFullYear(deliveredYear)
      } else {
        deliveredDate.setMonth(deliveredMonth + 6)
      }

      if (deliveredDate < today) {
        availabeSchedules.push(item)
      }
    })

    res.status(200).json(availabeSchedules)
  } catch (ex) {
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
})

// Pick schedule
// POST api/schedule/
const pickSchedule = asyncHandler(async (req, res) => {
  try {
    let updatedOrder
    const employeeId = req.body.employeeId
    const orderId = req.body.orderId
    const order = await Order.find({ _id: orderId })

    if (order) {
      updatedOrder = await Order.findByIdAndUpdate(
        { _id: orderId },
        {
          isSchedulePicked: true,
          schedulePickedBy: employeeId,
          isScheduleCompleted: false,
        },
        { useFindAndModify: false }
      )

      if (req.body.empEmail) {
        transporter.sendMail({
          to: req.body.empEmail,
          from: 'eams.sparta@gmail.com',
          subject: 'Assigned to a new job',
          html: `<h2>Regarding schedule ${req.body.orderId}</h2>
      <p>We assigned you (${req.body.employeeId}) to complete this schedule.</p>
      <p>You can see this job in detail from your dashboard of EAMS web page</p>
      <p>Please make sure to complete this job ASAP and update system with details when it is done</p>
      <br></br>
      <p>Thank you!</p>
      <p>Best regards</p>
      <p><strong>EAMS</strong></p>
      `,
        })
      }
    }

    res.status(200).json(updatedOrder)
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    })
  }
})

// unPick schedule
// POST api/schedule/
const unPickASchedule = asyncHandler(async (req, res) => {
  try {
    let updatedOrder
    const orderId = req.body.orderId
    const order = await Order.find({ _id: orderId })

    if (order) {
      updatedOrder = await Order.findByIdAndUpdate(
        { _id: orderId },
        {
          isSchedulePicked: false,
          schedulePickedBy: '',
          isScheduleCompleted: false,
        },
        { useFindAndModify: false }
      )
    }

    res.status(200).json(updatedOrder)
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    })
  }
})

// Completed picked schedule
// POST api/schedule/complete
const completeSchedule = asyncHandler(async (req, res) => {
  try {
    let updatedOrder
    const orderId = req.body.orderId
    const order = await Order.find({ _id: orderId })

    if (order) {
      updatedOrder = await Order.findByIdAndUpdate(
        { _id: orderId },
        { isScheduleCompleted: true },
        { useFindAndModify: false }
      )
    }

    res.status(200).json(updatedOrder)
  } catch (ex) {
    res.status(500).json({
      message: ex.message,
    })
  }
})

// Get all picked service schedules
// GET api/schedule/completed/all
const getAllCompletedSchedules = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      isSchedulePicked: true,
      isScheduleCompleted: true,
    })
    res.status(200).json(orders)
  } catch (ex) {
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
})

// Get all ongoing service schedules
// GET api/schedule/ongoing/all
const getAllOngoingSchedules = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({
      isSchedulePicked: true,
      isScheduleCompleted: false,
    })
    res.status(200).json(orders)
  } catch (ex) {
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
})

// Get user all picked service schedules
// GET api/schedule/completed/all/:id
const getAllCompletedSchedulesByEmployee = asyncHandler(async (req, res) => {
  try {
    const employeeId = req.params.id
    const orders = await Order.find({
      isScheduleCompleted: true,
      schedulePickedBy: employeeId,
    })
    res.status(200).json(orders)
  } catch (ex) {
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
})

// Get user all ongoing service schedules
// GET api/schedule/ongoing/all/:id
const getAllOngoingSchedulesByEmployee = asyncHandler(async (req, res) => {
  try {
    const employeeId = req.params.id
    const orders = await Order.find({
      isScheduleCompleted: false,
      schedulePickedBy: employeeId,
    })
    res.status(200).json(orders)
  } catch (ex) {
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
})

export {
  getSchedules,
  getAllSchedules,
  pickSchedule,
  unPickASchedule,
  completeSchedule,
  getAllCompletedSchedules,
  getAllOngoingSchedules,
  getAllCompletedSchedulesByEmployee,
  getAllOngoingSchedulesByEmployee,
}
