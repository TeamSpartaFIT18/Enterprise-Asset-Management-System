import express from 'express';
const router = express.Router();
import {
  getProducts,
  getOneProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getAllProducts,
  createProductComplaint,
  updateComplaint,
  updateComplaintByEmp
} from '../controllers/productContoller.js';
import { protect, admin, employee } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/all').get(protect, admin, getAllProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router
  .route('/:id/complaints')
  .post(protect, createProductComplaint)
  .put(protect, admin, updateComplaint);
router
  .route('/:id/complaints/emp')
  .put(protect, employee, updateComplaintByEmp);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getOneProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
