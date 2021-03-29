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

export { getProducts, getOneProductById }
