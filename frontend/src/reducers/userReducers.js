import {
  ADD_ADMIN_BY_ADMIN_FAIL,
  ADD_ADMIN_BY_ADMIN_REQUEST,
  ADD_ADMIN_BY_ADMIN_SUCCESS,
  ADD_EMPLOYEE_BY_ADMIN_FAIL,
  ADD_EMPLOYEE_BY_ADMIN_REQUEST,
  ADD_EMPLOYEE_BY_ADMIN_SUCCESS,
  ADMIN_LIST_FAIL,
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_RESET,
  ADMIN_LIST_SUCCESS,
  CLIENT_LIST_FAIL,
  CLIENT_LIST_REQUEST,
  CLIENT_LIST_RESET,
  CLIENT_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_RESET,
  EMPLOYEE_LIST_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  MAIL_TO_CLIENT_FAIL,
  MAIL_TO_CLIENT_REQUEST,
  MAIL_TO_CLIENT_SUCCESS,
  RP_SUBMIT_FAIL,
  RP_SUBMIT_REQUEST,
  RP_SUBMIT_SUCCESS,
  RP_USER_DETAILS_FAIL,
  RP_USER_DETAILS_REQUEST,
  RP_USER_DETAILS_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from '../types/userTypes';

//User Login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

//User Register
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//user profile details
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: [] };
    default:
      return state;
  }
};

//user profile details update
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//user list
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

//user delete
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//user update by admin
export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

//admin list
export const adminListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_REQUEST:
      return { loading: true };
    case ADMIN_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

//employee list
export const employeeListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return { loading: true };
    case EMPLOYEE_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case EMPLOYEE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

//client list
export const clientListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case CLIENT_LIST_REQUEST:
      return { loading: true };
    case CLIENT_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case CLIENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CLIENT_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

//forgot password
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload };
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//user profile details when rp
export const rpUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case RP_USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case RP_USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case RP_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//user reset password
export const rpSubmitReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case RP_SUBMIT_REQUEST:
      return { ...state, loading: true };
    case RP_SUBMIT_SUCCESS:
      return { loading: false, user: action.payload };
    case RP_SUBMIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//send mail to client
export const sendMailToClientReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case MAIL_TO_CLIENT_REQUEST:
      return { ...state, loading: true };
    case MAIL_TO_CLIENT_SUCCESS:
      return { loading: false, message: action.payload };
    case MAIL_TO_CLIENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Add admin by admin
export const addAdminByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ADMIN_BY_ADMIN_REQUEST:
      return { loading: true };
    case ADD_ADMIN_BY_ADMIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ADD_ADMIN_BY_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Add employee by admin
export const addEmployeeByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_BY_ADMIN_REQUEST:
      return { loading: true };
    case ADD_EMPLOYEE_BY_ADMIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ADD_EMPLOYEE_BY_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
