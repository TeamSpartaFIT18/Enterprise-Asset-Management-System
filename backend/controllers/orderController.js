import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import dotenv from 'dotenv'

const transporter = nodemailer.createTransport(
	sendgridTransport({
	  auth: {
		api_key: process.env.SG_KEY,
	  },
	})
  )

// @desc    Create new Order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No order items')
		return
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		})

		const createOrder = await order.save()

		res.status(201).json(createOrder)
	}
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)

	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

// @desc    Update order when Delivered
// @route   GET /api/orders/:id/deliver
// @access  Private, Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {

	let employees = await User.find({ isEmployee: true });
	try{
	const order = await Order.findById(req.params.id);

	var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		let date = order.deliveredAt.getDate()
		let month = order.deliveredAt.getMonth()
		let year = order.deliveredAt.getFullYear();

		let scheduledMonth = month + 7 ;

		if (scheduledMonth > 12) {
			scheduledMonth = scheduledMonth - 12;
			year++;
		}

		let monthText = months[scheduledMonth-1];


		employees.map((emp) => {
            // send email
            transporter.sendMail({
              to: emp.email,
              from: 'eams.sparta@gmail.com',
              subject: 'Service Schedule Available',
              html: `<h2>New service schedule available for pick</h2>
              <h3>Please visit EAMS web app and check service schedules for more details.</h3>`,
            })
          })
		
		  const updatedOrder = await order.save();

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
	}catch(ex){
		console.log(ex.message);
	}
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id })
	res.json(orders)
})

// Get all orders , admin only
// GET -> /api/orders/
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name')
	res.json(orders)
})

// Get all notPaidOrders , admin only
// GET -> /api/orders/notpaidorders
const getNotPaidOrders = asyncHandler(async (req, res) => {
	const notPaidOrders = await Order.find({ isPaid: false }).populate(
		'user',
		'id name'
	)
	res.json(notPaidOrders)
})

// Get all notDeliveredOrders , admin only
// GET -> /api/orders/notdeliveredorders
const getNotDeliveredOrders = asyncHandler(async (req, res) => {
	const notDeliveredOrders = await Order.find({
		isPaid: true,
		isDelivered: false,
	}).populate('user', 'id name')
	res.json(notDeliveredOrders)
})

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
	getNotPaidOrders,
	getNotDeliveredOrders,
}
