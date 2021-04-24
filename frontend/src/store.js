import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  allProductListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productComplaintCreateReducer,
  productComplaintUpdateReducer,
  productComplaintEmpUpdateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  adminListReducer,
  employeeListReducer,
  forgotPasswordReducer,
  rpUserDetailsReducer,
  rpSubmitReducer,
  clientListReducer,
  sendMailToClientReducer,
  addAdminByAdminReducer,
  addEmployeeByAdminReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
  notPaidOrderListReducer,
  notDeliveredOrderListReducer,
} from './reducers/orderReducers';
import {
  createEmployeeProfileReducer,
  editEmployeeProfileReducer,
  empAddExperienceReducer,
  employeeProfileReducer,
} from './reducers/profileReducers';
import {
  allScheduleListReducer,
  pickScheduleReducer,
} from './reducers/scheduleReducers';

const reducer = combineReducers({
  productList: productListReducer,
  allProductList: allProductListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productComplaintCreate: productComplaintCreateReducer,
  productComplaintUpdate: productComplaintUpdateReducer,
  productComplaintEmpUpdate: productComplaintEmpUpdateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  forgotPassword: forgotPasswordReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  rpUserDetails: rpUserDetailsReducer,
  rpSubmit: rpSubmitReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  adminList: adminListReducer,
  employeeList: employeeListReducer,
  clientList: clientListReducer,
  sendMailToClient: sendMailToClientReducer,
  addAdminByAdmin: addAdminByAdminReducer,
  addEmployeeByAdmin: addEmployeeByAdminReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  notPaidOrderList: notPaidOrderListReducer,
  notDeliveredOrderList: notDeliveredOrderListReducer,

  employeeProfile: employeeProfileReducer,
  createEmployeeProfile: createEmployeeProfileReducer,
  editEmployeeProfile: editEmployeeProfileReducer,
  empAddExperience: empAddExperienceReducer,

  allScheduleList: allScheduleListReducer,
  pickSchedule: pickScheduleReducer,
});

//get Cart items from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

//get user info from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

//get shippingAddress localStorage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
