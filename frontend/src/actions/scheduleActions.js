import axios from 'axios';
import {
  ALL_SCHEDULES_LIST_FAIL,
  ALL_SCHEDULES_LIST_REQUEST,
  ALL_SCHEDULES_LIST_SUCCESS,
  PICK_A_SCHEDULE_FAIL,
  PICK_A_SCHEDULE_REQUEST,
  PICK_A_SCHEDULE_SUCCESS,
} from '../types/scheduleTypes';

//get all schedules
export const listSchedules = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_SCHEDULES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/schedules`, config);

    dispatch({
      type: ALL_SCHEDULES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SCHEDULES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//pick a schedule by employee
export const schedulePick = (employeeId, orderId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PICK_A_SCHEDULE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/schedules/pick`,
      { employeeId, orderId },
      config
    );

    dispatch({
      type: PICK_A_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PICK_A_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
