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
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  ALL_PRODUCT_LIST_REQUEST,
  ALL_PRODUCT_LIST_SUCCESS,
  ALL_PRODUCT_LIST_FAIL,
  PRODUCT_CREATE_COMPLAINT_REQUEST,
  PRODUCT_CREATE_COMPLAINT_SUCCESS,
  PRODUCT_CREATE_COMPLAINT_FAIL,
  PRODUCT_CREATE_COMPLAINT_RESET,
  PRODUCT_UPDATE_COMPLAINT_REQUEST,
  PRODUCT_UPDATE_COMPLAINT_SUCCESS,
  PRODUCT_UPDATE_COMPLAINT_FAIL,
  PRODUCT_UPDATE_COMPLAINT_RESET,
  PRODUCT_EMP_UPDATE_COMPLAINT_REQUEST,
  PRODUCT_EMP_UPDATE_COMPLAINT_SUCCESS,
  PRODUCT_EMP_UPDATE_COMPLAINT_FAIL,
  PRODUCT_EMP_UPDATE_COMPLAINT_RESET,
} from '../types/productTypes';

//product list
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//all product list
export const allProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case ALL_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//product details
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//product delete
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//product create
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//product update
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

//create review
export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

//create complaint
export const productComplaintCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_COMPLAINT_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_COMPLAINT_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_COMPLAINT_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_COMPLAINT_RESET:
      return {};
    default:
      return state;
  }
};

//update complaint
export const productComplaintUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_COMPLAINT_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_COMPLAINT_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_COMPLAINT_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_COMPLAINT_RESET:
      return {};
    default:
      return state;
  }
};

//update complaint by employee
export const productComplaintEmpUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_EMP_UPDATE_COMPLAINT_REQUEST:
      return { loading: true };
    case PRODUCT_EMP_UPDATE_COMPLAINT_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_EMP_UPDATE_COMPLAINT_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_EMP_UPDATE_COMPLAINT_RESET:
      return {};
    default:
      return state;
  }
};

//get top products
export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
