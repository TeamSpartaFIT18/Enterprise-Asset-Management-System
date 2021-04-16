import axios from "axios";
import {
  EMPLOYEE_ADD_EX_FAIL,
  EMPLOYEE_ADD_EX_REQUEST,
  EMPLOYEE_ADD_EX_SUCCESS,
  EMPLOYEE_PROFILE_CREATE_FAIL,
  EMPLOYEE_PROFILE_CREATE_REQUEST,
  EMPLOYEE_PROFILE_CREATE_SUCCESS,
  EMPLOYEE_PROFILE_EDIT_FAIL,
  EMPLOYEE_PROFILE_EDIT_REQUEST,
  EMPLOYEE_PROFILE_EDIT_SUCCESS,
  EMPLOYEE_PROFILE_FAIL,
  EMPLOYEE_PROFILE_REQUEST,
  EMPLOYEE_PROFILE_SUCCESS,
} from "../types/profileTypes";

//get employee profile
export const getCurrentProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/emp-profiles/me", config);

    dispatch({
      type: EMPLOYEE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//create profile employee
export const employeeCreateProfile = (
  status,
  contact,
  address,
  bio,
  experience
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_PROFILE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/emp-profiles",
      { status, contact, address, bio, experience },
      config
    );

    dispatch({
      type: EMPLOYEE_PROFILE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_PROFILE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//employee edit profile
export const employeeEditProfile = (status, contact, address, bio) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: EMPLOYEE_PROFILE_EDIT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/emp-profiles",
      { status, contact, address, bio },
      config
    );

    dispatch({
      type: EMPLOYEE_PROFILE_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_PROFILE_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//employee add experience
export const empExperienceAdd = (
  title,
  company,
  jobLocation,
  fromDate,
  toDate,
  description
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_ADD_EX_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/emp-profiles/experience",
      { title, company, jobLocation, fromDate, toDate, description },
      config
    );

    dispatch({
      type: EMPLOYEE_ADD_EX_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_ADD_EX_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
