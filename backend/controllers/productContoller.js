import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// Fetch all products , public
// GET -> /api/products/
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
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
    name: 'sample',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'brand',
    category: 'category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample',
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

export {
  getProducts,
  getOneProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
