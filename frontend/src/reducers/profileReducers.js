import {
  EMPLOYEE_PROFILE_FAIL,
  EMPLOYEE_PROFILE_REQUEST,
  EMPLOYEE_PROFILE_SUCCESS,
  EMPLOYEE_PROFILE_RESET,
} from '../types/profileTypes'

//employee profile details
export const employeeProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_PROFILE_REQUEST:
      return { ...state, loading: true }
    case EMPLOYEE_PROFILE_SUCCESS:
      return { loading: false, user: action.payload }
    case EMPLOYEE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case EMPLOYEE_PROFILE_RESET:
      return { user: [] }
    default:
      return state
  }
}
