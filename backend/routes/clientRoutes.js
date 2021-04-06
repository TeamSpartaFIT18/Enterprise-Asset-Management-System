import express from 'express'
const router = express.Router()
import { mailToClient } from '../controllers/clientController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/mailtoclient').post(protect, admin, mailToClient)
export default router
