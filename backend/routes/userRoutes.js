import express from 'express'
const router = express.Router()
import {
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
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:id', resetForgotPassword)
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/admins').get(protect, admin, getAdmins)
router.route('/employees').get(protect, admin, getEmployees)
router.route('/clients').get(protect, admin, getClients)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
