import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()

import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const product = await Product.find({})

		res.json(product)
	})
)

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id)

		if (product) {
			res.json(product)
		} else {
			res.status(404)
			throw new Error('Product not found')
		}
	})
)

router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id)
	  
		if (product) {
		  await product.remove()
		  res.json({ message: 'Product removed' })
		} else {
		  res.status(404)
		  throw new Error('Product not found')
		}
	  })
)

router.post(
	'/',
	asyncHandler(async (req, res) => {
		const product = new Product({
		  name: 'Sample name',
		  price: 0,
		  user: req.user._id,
		  image: '/images/sample.jpg',
		  brand: 'Sample brand',
		  category: 'Sample category',
		  countInStock: 0,
		  numReviews: 0,
		  description: 'Sample description',
		})

		const createdProduct = await product.save()
		res.status(201).json(createdProduct)
	})	
)

router.put(
	'/:id',
	asyncHandler(async (req, res) => {
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
		  product.description = description
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
	  
)

router.post(
	'/:id/reviews',
	asyncHandler(async (req, res) => {
		const { rating, comment } = req.body
	  
		const product = await Product.findById(req.params.id)
	  
		if (product) {
		  const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
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
)

router.get(
	'/top',
	asyncHandler(async (req, res) => {
		const products = await Product.find({}).sort({ rating: -1 }).limit(3)
	  
		res.json(products)
	  })
)

export default router
