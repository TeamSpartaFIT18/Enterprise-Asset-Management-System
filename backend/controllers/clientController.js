import asyncHandler from 'express-async-handler'
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

// Sent Mail to client , admin
// send the mail
const mailToClient = asyncHandler(async (req, res) => {
  const { email, subject, body } = req.body

  const user = await User.findOne({ email })

  if (user) {
    res.json({ msg: 'Verification email sent' })
    transporter.sendMail({
      to: user.email,
      from: 'eams.sparta@gmail.com',
      subject: subject,
      html: body,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Sent Mail to client to reminding, admin
// send the mail
const mailToRemind = asyncHandler(async (req, res) => {
  const { clientId } = req.body

  const user = await User.findById(clientId)

  console.log(user)
  if (user) {
    res.json({ msg: 'Verification email sent' })
    transporter.sendMail({
      to: user.email,
      from: 'eams.sparta@gmail.com',
      subject: 'Reminding the payment of order',
      html: `
      <p>You placed a order from EAMS website and its payment is not completed yet.</p>
      <p>We are really appreciate that if you can complete the payment for regarding order.</p>
      <p>You can see it from your profile page.</p>
      <br></br>
      <p>Thank you!</p>
      <p>Best regards</p>
      <p><strong>EAMS</strong></p>
      `,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { mailToClient, mailToRemind }
