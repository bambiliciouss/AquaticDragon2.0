import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_FAIL,
} from "../constants/orderConstants";
import socket from '../socket'
export const createOrder = (order) => async (dispatch, getState) => {
  console.log("actions order", order);
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/v1/order/new`, order);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
    socket.emit("newOrder", {message: `New Order Placed`, branch: data.order.selectedStore.store, title: `${data.order.selectedStore.branchNo}`, order: data.order});
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
    console.log(error)
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const { data } = await axios.get("/api/v1/orders/me");
    dispatch({
      type: MY_ORDERS_SUCCESS,

      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/orders`);
    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allOrdersAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get(`/api/v1/all/admin/orders/`);
    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(`/api/v1/order/${id}`, orderData, config);
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateOrderwithRider = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `/api/v1/order/assign/rider/${id}`,
      orderData,
      config
    );
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const allOrdersEmployee = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get(`/api/v1/all/employee/orders/`);
    console.log(data)
   
    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allOrdersRider = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get(`/api/v1/all/rider/orders/`);
    console.log(data)
   
    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};