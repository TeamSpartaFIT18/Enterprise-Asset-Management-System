import {
  ALL_SCHEDULES_LIST_FAIL,
  ALL_SCHEDULES_LIST_REQUEST,
  ALL_SCHEDULES_LIST_SUCCESS,
  PICK_A_SCHEDULE_FAIL,
  PICK_A_SCHEDULE_REQUEST,
  PICK_A_SCHEDULE_SUCCESS,
  PICK_A_SCHEDULE_RESET,
} from '../types/scheduleTypes';

//all schedule list
export const allScheduleListReducer = (state = { schedules: [] }, action) => {
  switch (action.type) {
    case ALL_SCHEDULES_LIST_REQUEST:
      return { loading: true, schedules: [] };
    case ALL_SCHEDULES_LIST_SUCCESS:
      return {
        loading: false,
        schedules: action.payload,
      };
    case ALL_SCHEDULES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//pick a schedule by employee
export const pickScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case PICK_A_SCHEDULE_REQUEST:
      return {
        loading: true,
      };
    case PICK_A_SCHEDULE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PICK_A_SCHEDULE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PICK_A_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};
