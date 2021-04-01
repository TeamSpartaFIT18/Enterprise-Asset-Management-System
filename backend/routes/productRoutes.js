import express from 'express'
const router = express.Router()
import {
  getProducts,
  getOneProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controllers/productContoller.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getOneProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
