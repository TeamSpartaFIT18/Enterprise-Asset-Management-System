import express from 'express';
const router = express.Router();

import { getSchedules, getAllSchedules, pickSchedule } from '../controllers/scheduleController.js';

router.route('/').get(getSchedules).post(pickSchedule);
router.route('/all').get(getAllSchedules);

export default router;