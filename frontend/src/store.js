import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

import {
  newGallonReducer,
  myGallonReducer,
  allGallonsReducer,
  gallonReducer,
} from "./reducers/gallonReducers";

import {
  newStoreBranchReducer,
  allStoreBranchReducer,
  storeBranchReducer,
  storeDetailsReducer,
} from "./reducers/storebranchReducers";

import {
  newOrderReducer,
  myOrdersReducer,
  allOrdersReducer,
  orderDetailsReducer,
  orderReducer,
} from "reducers/orderReducers";
import { cartReducer } from "reducers/cartReducers";

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  newGallon: newGallonReducer,
  myGallon: myGallonReducer,
  allUsers: allUsersReducer,
  allGallons: allGallonsReducer,
  newStoreBranch: newStoreBranchReducer,
  allStoreBranch: allStoreBranchReducer,
  gallon: gallonReducer,
  storeBranch: storeBranchReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  userDetails: userDetailsReducer,
  storeDetails: storeDetailsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
