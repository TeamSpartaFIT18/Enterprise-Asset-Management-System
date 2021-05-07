import express from 'express'
const router = express.Router()
import { mailToClient, mailToRemind } from '../controllers/clientController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/mailtoclient').post(protect, admin, mailToClient)
router.route('/mailtoremind').post(protect, admin, mailToRemind)
export default router
