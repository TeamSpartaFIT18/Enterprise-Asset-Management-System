import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  NOT_PAID_ORDER_LIST_REQUEST,
  NOT_PAID_ORDER_LIST_SUCCESS,
  NOT_PAID_ORDER_LIST_FAIL,
  NOT_DELIVERED_ORDER_LIST_REQUEST,
  NOT_DELIVERED_ORDER_LIST_SUCCESS,
  NOT_DELIVERED_ORDER_LIST_FAIL,
  ORDER_LIST_EMP_REQUEST,
  ORDER_LIST_EMP_SUCCESS,
  ORDER_LIST_EMP_FAIL,
} from '../types/orderTypes'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }

    default:
      return state
  }
}

//orderList reducer
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

//notpaid order list
export const notPaidOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case NOT_PAID_ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case NOT_PAID_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case NOT_PAID_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

//not delivered order list
export const notDeliveredOrderListReducer = (
  state = { orders: [] },
  action
) => {
  switch (action.type) {
    case NOT_DELIVERED_ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case NOT_DELIVERED_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case NOT_DELIVERED_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

//orderList emp reducer
export const orderListEmpReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_EMP_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_EMP_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_EMP_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
