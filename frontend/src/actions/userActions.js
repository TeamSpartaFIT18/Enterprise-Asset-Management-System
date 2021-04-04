import axios from 'axios'
import { ORDER_LIST_MY_RESET } from '../types/orderTypes'
import {
	ADMIN_LIST_FAIL,
	ADMIN_LIST_REQUEST,
	ADMIN_LIST_RESET,
	ADMIN_LIST_SUCCESS,
	EMPLOYEE_LIST_FAIL,
	EMPLOYEE_LIST_REQUEST,
	EMPLOYEE_LIST_RESET,
	EMPLOYEE_LIST_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
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
	USER_UPDATE_SUCCESS,
} from '../types/userTypes'

//login
export const login = (email, password) => async dispatch => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		)

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//logout
export const logout = () => dispatch => {
	localStorage.removeItem('userInfo')
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_DETAILS_RESET })
	dispatch({ type: ORDER_LIST_MY_RESET })
	dispatch({ type: USER_LIST_RESET })
	dispatch({ type: ADMIN_LIST_RESET })
	dispatch({ type: EMPLOYEE_LIST_RESET })
}

//register
export const register = (name, email, password) => async dispatch => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'/api/users',
			{ name, email, password },
			config
		)

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//get user details
export const getUserDetails = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/users/${id}`, config)

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//update user profile details
export const updateUserProfile = user => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
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

		const { data } = await axios.put(`/api/users/profile`, user, config)

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//get all users
export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/users`, config)

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//delete a user
export const deleteUser = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.delete(`/api/users/${id}`, config)

		dispatch({
			type: USER_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//update a user by admin
export const updateUser = user => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/users/${user._id}`, user, config)

		dispatch({
			type: USER_UPDATE_SUCCESS,
		})
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//get all admins
export const listAdmins = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADMIN_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/users/admins`, config)

		dispatch({
			type: ADMIN_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ADMIN_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//get all employees
export const listEmployees = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/users/employees`, config)

		dispatch({
			type: EMPLOYEE_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: EMPLOYEE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//Forgotpassword
export const passwordForgot = email => async dispatch => {
	try {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'/api/users/forgot-password',
			{ email },
			config
		)

		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//get user details rp
export const rpGetUserDetails = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: RP_USER_DETAILS_REQUEST,
		})

		const { data } = await axios.put(`/api/users/reset-password/${id}`)

		dispatch({
			type: RP_USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RP_USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

//resetpassword submit
export const passwordReset = ({ user, password }) => async dispatch => {
	try {
		dispatch({
			type: RP_SUBMIT_REQUEST,
		})

		const { data } = await axios.put(`/api/users/reset-password/${user._id}`, {
			password,
		})

		dispatch({
			type: RP_SUBMIT_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RP_SUBMIT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
