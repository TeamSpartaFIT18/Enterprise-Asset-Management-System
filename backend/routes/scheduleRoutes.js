import express from 'express';
const router = express.Router();

import {
  getSchedules,
  pickSchedule,
  unPickASchedule,
  getAllSchedules,
  completeSchedule,
  getAllCompletedSchedules,
  getAllOngoingSchedules,
  getAllCompletedSchedulesByEmployee,
  getAllOngoingSchedulesByEmployee,
} from '../controllers/scheduleController.js';

router.route('/').get(getSchedules);
router.route('/all').get(getAllSchedules);
router.route('/pick').post(pickSchedule);
router.route('/unpick').patch(unPickASchedule);
router.route('/complete').post(completeSchedule);
router.route('/completed/all').get(getAllCompletedSchedules);
router.route('/completed/all/:id').get(getAllCompletedSchedulesByEmployee);
router.route('/ongoing/all').get(getAllOngoingSchedules);
router.route('/ongoing/all/:id').get(getAllOngoingSchedulesByEmployee);

export default router;
