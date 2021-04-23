import {
  ALL_SCHEDULES_LIST_FAIL,
  ALL_SCHEDULES_LIST_REQUEST,
  ALL_SCHEDULES_LIST_SUCCESS,
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
