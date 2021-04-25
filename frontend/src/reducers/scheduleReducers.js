import {
  ALL_SCHEDULES_LIST_FAIL,
  ALL_SCHEDULES_LIST_REQUEST,
  ALL_SCHEDULES_LIST_SUCCESS,
  PICK_A_SCHEDULE_FAIL,
  PICK_A_SCHEDULE_REQUEST,
  PICK_A_SCHEDULE_SUCCESS,
  PICK_A_SCHEDULE_RESET,
  SCHEDULES_LIST_MY_REQUEST,
  SCHEDULES_LIST_MY_SUCCESS,
  SCHEDULES_LIST_MY_FAIL,
  SCHEDULES_LIST_MY_RESET,
  UNPICK_A_SCHEDULE_REQUEST,
  UNPICK_A_SCHEDULE_SUCCESS,
  UNPICK_A_SCHEDULE_FAIL,
  UNPICK_A_SCHEDULE_RESET,
  COMPLETE_SCHEDULE_REQUEST,
  COMPLETE_SCHEDULE_SUCCESS,
  COMPLETE_SCHEDULE_FAIL,
  COMPLETE_SCHEDULE_RESET,
  ALL_COMPLETED_SCHEDULES_BY_EMP_REQUEST,
  ALL_COMPLETED_SCHEDULES_BY_EMP_SUCCESS,
  ALL_COMPLETED_SCHEDULES_BY_EMP_FAIL,
  ALL_ONGOING_SCHEDULES_FAIL,
  ALL_ONGOING_SCHEDULES_SUCCESS,
  ALL_ONGOING_SCHEDULES_REQUEST,
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

//get all schedules picked by employee
export const schedulesListMyReducer = (state = { schedules: [] }, action) => {
  switch (action.type) {
    case SCHEDULES_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case SCHEDULES_LIST_MY_SUCCESS:
      return {
        loading: false,
        schedules: action.payload,
      };
    case SCHEDULES_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SCHEDULES_LIST_MY_RESET:
      return { schedules: [] };

    default:
      return state;
  }
};

//unpick a schedule by employee
export const unpickScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case UNPICK_A_SCHEDULE_REQUEST:
      return {
        loading: true,
      };
    case UNPICK_A_SCHEDULE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UNPICK_A_SCHEDULE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UNPICK_A_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

//complete a schedule by employee
export const completeScheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPLETE_SCHEDULE_REQUEST:
      return { loading: true };
    case COMPLETE_SCHEDULE_SUCCESS:
      return { loading: false, success: true };
    case COMPLETE_SCHEDULE_FAIL:
      return { loading: false, error: action.payload };
    case COMPLETE_SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

//all completed schedule list by employee
export const allCompletedScheduleListByEmpReducer = (
  state = { schedules: [] },
  action
) => {
  switch (action.type) {
    case ALL_COMPLETED_SCHEDULES_BY_EMP_REQUEST:
      return { loading: true, schedules: [] };
    case ALL_COMPLETED_SCHEDULES_BY_EMP_SUCCESS:
      return {
        loading: false,
        schedules: action.payload,
      };
    case ALL_COMPLETED_SCHEDULES_BY_EMP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//all ongoing schedule list
export const ongoingScheduleListReducer = (
  state = { schedules: [] },
  action
) => {
  switch (action.type) {
    case ALL_ONGOING_SCHEDULES_REQUEST:
      return { loading: true, schedules: [] };
    case ALL_ONGOING_SCHEDULES_SUCCESS:
      return {
        loading: false,
        schedules: action.payload,
      };
    case ALL_ONGOING_SCHEDULES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
