import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
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

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
      isClient: user.isClient,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
})

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User Exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    transporter.sendMail({
      to: user.email,
      from: 'teamsparta.eams@gmail.com',
      subject: 'Successfully Sign Up',
      html: `<h2>Welcome to Enterprise Asset Management System ${user.name}</h2>
      <h3>Your account has been successfully created.</h3>
      `,
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
      isClient: user.isClient,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Get all users , admin only
// GET -> /api/users/
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// Get all admins , admin only
// GET -> /api/users/admins
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await User.find({ isAdmin: true })
  res.json(admins)
})

// Get all employees , admin only
// GET -> /api/users/employees
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await User.find({ isEmployee: true })
  res.json(employees)
})

// Get all clients , admin only
// GET -> /api/users/clients
const getClients = asyncHandler(async (req, res) => {
  const clients = await User.find({
    isClient: true,
    isAdmin: false,
    isEmployee: false,
  })
  res.json(clients)
})

// Delete a user , admin only
// DELETE -> /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Get user by ID , admin only
// GET -> /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Update user , admin only
// PUT -> /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Forgot Password , public
// send the mail
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (user) {
    res.json({ msg: 'Verification email sent' })
    transporter.sendMail({
      to: user.email,
      from: 'teamsparta.eams@gmail.com',
      subject: 'Reset Password',
      html: `<h2>Welcome to Enterprise Asset Management System ${user.name}</h2>
      <h3>Please Click on the given link to reset your password</h3>
	  <a href="${process.env.CLIENT_URL}/resetpassword/${user._id}">Reset Link</a>
      `,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Reset password , pvt
// PUT -> /api/users/reset-password/:id
const resetForgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getAdmins,
  getEmployees,
  getClients,
  deleteUser,
  getUserById,
  updateUser,
  resetForgotPassword,
  forgotPassword,
}
