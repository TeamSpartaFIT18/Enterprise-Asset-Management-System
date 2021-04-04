import axios from 'axios'
import {
  EMPLOYEE_PROFILE_FAIL,
  EMPLOYEE_PROFILE_REQUEST,
  EMPLOYEE_PROFILE_SUCCESS,
} from '../types/profileTypes'

export const getCurrentProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/emp-profiles/me', config)

    dispatch({
      type: EMPLOYEE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: EMPLOYEE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
