import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getNotPaidOrders,
  getNotDeliveredOrders,
} from '../controllers/orderController.js'
import { protect, admin, employee } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/emp').get(protect, employee, getOrders)
router.route('/notpaidorders').get(protect, admin, getNotPaidOrders)
router.route('/notdeliveredorders').get(protect, admin, getNotDeliveredOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
