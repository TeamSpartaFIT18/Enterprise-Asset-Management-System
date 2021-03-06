import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  ALL_PRODUCT_LIST_REQUEST,
  ALL_PRODUCT_LIST_SUCCESS,
  ALL_PRODUCT_LIST_FAIL,
  PRODUCT_CREATE_COMPLAINT_REQUEST,
  PRODUCT_CREATE_COMPLAINT_SUCCESS,
  PRODUCT_CREATE_COMPLAINT_FAIL,
  PRODUCT_UPDATE_COMPLAINT_REQUEST,
  PRODUCT_UPDATE_COMPLAINT_SUCCESS,
  PRODUCT_UPDATE_COMPLAINT_FAIL,
  PRODUCT_EMP_UPDATE_COMPLAINT_REQUEST,
  PRODUCT_EMP_UPDATE_COMPLAINT_SUCCESS,
  PRODUCT_EMP_UPDATE_COMPLAINT_FAIL,
} from '../types/productTypes';

//GET products list
export const listProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET all products list
export const listAllProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products/all`, config);

    dispatch({
      type: ALL_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET product details
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//create product
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//create review
export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//create complaint
export const createProductComplaint = (productId, complain) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_COMPLAINT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/complaints`, complain, config);

    dispatch({
      type: PRODUCT_CREATE_COMPLAINT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_COMPLAINT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update complaint
export const updateProductComplaint = (
  productId,
  complaintId,
  employee,
  empEmail
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_COMPLAINT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(
      `/api/products/${productId}/complaints`,
      { complaintId, employee, empEmail },
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_COMPLAINT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_COMPLAINT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update complaint by employee
export const updateProductComplaintEmp = (
  productId,
  complaintId,
  jobDescription
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_EMP_UPDATE_COMPLAINT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(
      `/api/products/${productId}/complaints/emp`,
      { complaintId, jobDescription },
      config
    );

    dispatch({
      type: PRODUCT_EMP_UPDATE_COMPLAINT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_EMP_UPDATE_COMPLAINT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET top products list
export const listTopProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
