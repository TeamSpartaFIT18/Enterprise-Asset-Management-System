import {
  EMPLOYEE_PROFILE_FAIL,
  EMPLOYEE_PROFILE_REQUEST,
  EMPLOYEE_PROFILE_SUCCESS,
  EMPLOYEE_PROFILE_RESET,
  EMPLOYEE_PROFILE_CREATE_REQUEST,
  EMPLOYEE_PROFILE_CREATE_SUCCESS,
  EMPLOYEE_PROFILE_CREATE_FAIL,
  EMPLOYEE_PROFILE_EDIT_REQUEST,
  EMPLOYEE_PROFILE_EDIT_SUCCESS,
  EMPLOYEE_PROFILE_EDIT_FAIL,
  EMPLOYEE_ADD_EX_REQUEST,
  EMPLOYEE_ADD_EX_SUCCESS,
  EMPLOYEE_ADD_EX_FAIL,
  EMPLOYEE_PROFILE_ADMIN_SUCCESS,
  EMPLOYEE_PROFILE_ADMIN_FAIL,
  EMPLOYEE_PROFILE_ADMIN_REQUEST,
} from '../types/profileTypes'

//employee profile details
export const employeeProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_PROFILE_REQUEST:
      return { ...state, loading: true }
    case EMPLOYEE_PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
        experiences: action.payload.experience,
        skills: action.payload.skills,
      }
    case EMPLOYEE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case EMPLOYEE_PROFILE_RESET:
      return { profile: [] }
    default:
      return state
  }
}

//employee profile create
export const createEmployeeProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_PROFILE_CREATE_REQUEST:
      return { loading: true }
    case EMPLOYEE_PROFILE_CREATE_SUCCESS:
      return { loading: false, success: true, employeeProfile: action.payload }
    case EMPLOYEE_PROFILE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//employee profile edit
export const editEmployeeProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_PROFILE_EDIT_REQUEST:
      return { loading: true }
    case EMPLOYEE_PROFILE_EDIT_SUCCESS:
      return { loading: false, success: true, employeeProfile: action.payload }
    case EMPLOYEE_PROFILE_EDIT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Employee add experience
export const empAddExperienceReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_ADD_EX_REQUEST:
      return { loading: true }
    case EMPLOYEE_ADD_EX_SUCCESS:
      return { loading: false, experience: action.payload }
    case EMPLOYEE_ADD_EX_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//employee profile details by admin
export const employeeProfileAdminReducer = (
  state = { profile: {} },
  action
) => {
  switch (action.type) {
    case EMPLOYEE_PROFILE_ADMIN_REQUEST:
      return { ...state, loading: true }
    case EMPLOYEE_PROFILE_ADMIN_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
        experiences: action.payload.experience,
        skills: action.payload.skills,
      }
    case EMPLOYEE_PROFILE_ADMIN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
