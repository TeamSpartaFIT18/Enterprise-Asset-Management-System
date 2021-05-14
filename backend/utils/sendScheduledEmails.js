import cron from 'node-cron'

import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'

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

const sendScheduledEmails = async () => {
  let orders = await Order.find({
    scheduledEmailsSent: false,
    isDelivered: true,
  })

  let employees = await User.find({ isEmployee: true })

  if (orders.length != 0) {
    orders.map((item) => {
      let date = item.deliveredAt.getDate()
      let month = item.deliveredAt.getMonth()
      let scheduledMonth = month + 7

      if (scheduledMonth > 12) {
        scheduledMonth = scheduledMonth - 12
      }

      var task = cron.schedule(
        `0 6 ${date} ${scheduledMonth} *`,
        async () => {
          employees.map((emp) => {
            // send email
            transporter.sendMail({
              to: emp.email,
              from: 'eams.sparta@gmail.com',
              subject: 'Service Schedule Available',
              html: `<h2>New service schedule available for pick</h2>
            <h3>Please visit EAMS web app and check service schedules for more details.</h3>
            `,
            })
          })
          item.scheduledEmailsSent = true
          await item.save() // Update product
        },
        {
          scheduled: true,
        }
      )

      task.start()
    })
  }
}

export default sendScheduledEmails
