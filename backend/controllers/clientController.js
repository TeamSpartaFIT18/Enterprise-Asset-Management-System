import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
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
