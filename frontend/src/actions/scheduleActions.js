import axios from 'axios';
import {
  ALL_SCHEDULES_LIST_FAIL,
  ALL_SCHEDULES_LIST_REQUEST,
  ALL_SCHEDULES_LIST_SUCCESS,
  PICK_A_SCHEDULE_FAIL,
  PICK_A_SCHEDULE_REQUEST,
  PICK_A_SCHEDULE_SUCCESS,
  SCHEDULES_LIST_MY_FAIL,
  SCHEDULES_LIST_MY_REQUEST,
  SCHEDULES_LIST_MY_SUCCESS,
  UNPICK_A_SCHEDULE_FAIL,
  UNPICK_A_SCHEDULE_REQUEST,
  UNPICK_A_SCHEDULE_SUCCESS,
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

//list employees schedules
export const listMySchedules = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCHEDULES_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const id = userInfo._id;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/schedules/ongoing/all/${id}`,
      config
    );

    dispatch({
      type: SCHEDULES_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULES_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//unpick a schedule by employee
export const scheduleUnpick = (orderId) => async (dispatch, getState) => {
  try {
    console.log(orderId);
    dispatch({
      type: UNPICK_A_SCHEDULE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `/api/schedules/unpick`,
      { orderId },
      config
    );

    dispatch({
      type: UNPICK_A_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNPICK_A_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
