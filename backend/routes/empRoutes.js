import express from "express";
const router = express.Router();
import {
  getMyProfile,
  createEmpProfile,
  getEmpProfile,
  addExperience,
} from "../controllers/empController.js";
import { protect, admin, employee } from "../middleware/authMiddleware.js";

router.route("/me").get(protect, employee, getMyProfile);
router.route("/").post(protect, employee, createEmpProfile);
router.route("/:id").get(getEmpProfile);
router.route("/experience").post(protect, employee, addExperience);

export default router;
