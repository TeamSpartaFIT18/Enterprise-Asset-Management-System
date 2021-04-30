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
      from: 'teamsparta.eams@gmail.com',
      subject: subject,
      html: body,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { mailToClient }
