import express from 'express'
const router = express.Router()
import {
  getProducts,
  getOneProductById,
} from '../controllers/productContoller.js'

router.route('/').get(getProducts)
router.route('/:id').get(getOneProductById)

export default router
