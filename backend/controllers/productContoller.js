import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

import mongoose from 'mongoose'
import cron from 'node-cron'

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key:
				'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',
		},
	})
)

// Fetch all products , public
// GET -> /api/products/
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10
	const page = Number(req.query.pageNumber) || 1

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {}

	const count = await Product.countDocuments({ ...keyword })
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// Get all products count , admin only
// GET -> /api/products/all
const getAllProducts = asyncHandler(async (req, res) => {
	const allProducts = await Product.find({}).populate('user', 'id name')
	res.json(allProducts)
})

// Fetch one product , public
// GET -> /api/products/:id
const getOneProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// delete product , admin only
// DELETE -> /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()
		res.json({ message: 'Product removed' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// create product , admin only
// POST -> /api/products/
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: ' ',
		price: ' ',
		user: req.user._id,
		image: ' ',
		brand: ' ',
		category: ' ',
		countInStock: 0,
		numReviews: 0,
		description: ' ',
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})

// update product , admin only
// PUT -> /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.desdescription = description
		product.image = image
		product.brand = brand
		product.category = category
		product.countInStock = countInStock

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// create review , pvt
// POST -> /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		const alreadyReviewed = product.reviews.find(
			r => r.user.toString() === req.user._id.toString()
		)

		if (alreadyReviewed) {
			res.status(400)
			throw new Error('Product already reviewed')
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}

		product.reviews.push(review)

		product.numReviews = product.reviews.length

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length

		await product.save()
		res.status(201).json({ message: 'Review added' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// create complaint , pvt
// POST -> /api/products/:id/complaints
const createProductComplaint = asyncHandler(async (req, res) => {
	const { complain, isHandled } = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		const complaint = {
			name: req.user.name,
			email: req.user.email,
			address: req.user.address,
			contact: req.user.contact,
			complain,
			isHandled,
			user: req.user._id,
		}

		product.complaints.push(complaint)

		await product.save()
		res.status(201).json({ message: 'Complaint added' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// update complaint to handled and assign employee , admin only
// PUT -> /api/products/:id/complaints
const updateComplaint = asyncHandler(async (req, res) => {
	const { employee, complaintId } = req.body
	const product = await Product.findById(req.params.id)

	const complaints = product.complaints

	var name = req.body.employee
	var isHandled = true
	var email
	for (var i = 0; i < complaints.length; i++) {
		if (complaints[i]._id == req.body.complaintId) {
			if (product) {
				;(complaints[i].employee = name),
					(complaints[i].isHandled = isHandled),
					(email = complaints[i].email)

				if (email) {
					transporter.sendMail({
						to: email,
						from: 'teamsparta.eams@gmail.com',
						subject: 'Complaint reviewed',
						html: `<h2>Complaint ${req.body.complaintId} about ${product.name}</h2>
      <p>We reviewed your complaint about ${product.name} and we assigned ${req.body.employee} to fix that issue.</p>
      <p><strong>We are extremely sorry for the inconvenience!</strong></p>
      <br></br>
      <p>Thank you!</p>
      <p>Best regards</p>
      <p><strong>EAMS</strong></p>
      `,
					})
				}

				if (req.body.empEmail) {
					transporter.sendMail({
						to: req.body.empEmail,
						from: 'teamsparta.eams@gmail.com',
						subject: 'Assigned to a new job',
						html: `<h2>Regarding complaint ${req.body.complaintId} about ${product.name}</h2>
      <p>We recently recieved a complaint about ${product.name} and we assigned you (${req.body.employee}) to fix that issue.</p>
      <p>You can see this job in detail from your dashboard of EAMS web page</p>
      <p>Please make sure to complete this job ASAP and update system with details when it is done</p>
      <br></br>
      <p>Thank you!</p>
      <p>Best regards</p>
      <p><strong>EAMS</strong></p>
      `,
					})
				}

				const updated = await product.save()
				res.json(updated)
			} else {
				res.status(404)
				throw new Error('Order not found')
			}

			break
		}
	}
})

// update complaint to handled and assign employee , admin only
// PUT -> /api/products/:id/complaints
const updateComplaintByEmp = asyncHandler(async (req, res) => {
	const { jobDescription, complaintId } = req.body
	const product = await Product.findById(req.params.id)

	const complaints = product.complaints

	console.log(req.body.jobDescription, product, req.body.complaintId)

	var desc = req.body.jobDescription
	var isJobDone = true
	for (var i = 0; i < complaints.length; i++) {
		if (complaints[i]._id == req.body.complaintId) {
			if (product) {
				;(complaints[i].jobDescription = desc),
					(complaints[i].isJobDone = isJobDone)

				const updated = await product.save()
				res.json(updated)
			} else {
				res.status(404)
				throw new Error('Order not found')
			}

			break
		}
	}
})

// get top rated products , public
// GET -> /api/products/top
const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3)

	res.json(products)
})

export {
	getProducts,
	getAllProducts,
	getOneProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	createProductComplaint,
	updateComplaint,
	updateComplaintByEmp,
	getTopProducts,
}
