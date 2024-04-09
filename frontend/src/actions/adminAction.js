import { SINGLE_ADDRESS_SUCCESS } from "constants/addressConstants";
import {
    ALL_STORE_SALES_REQUEST,
    ALL_STORE_SALES_SUCCESS,
    ALL_STORE_SALES_FAIL,
    
    SINGLE_STORE_BRANCH_SUCCESS,    
    
    ALL_STAFF_REQUEST,
    ALL_STAFF_SUCCESS,
    ALL_STAFF_FAIL,

    ALL_CUSTOMER_REQUEST,
    ALL_CUSTOMER_SUCCESS,
    ALL_CUSTOMER_FAIL,

    SALES_WALKIN_REQUEST,
    SALES_WALKIN_SUCCESS, 
    SALES_WALKIN_FAIL,

    SALES_ORDER_REQUEST,
    SALES_ORDER_SUCCESS,
    SALES_ORDER_FAIL,
    
    ALL_ORDER_TRANSACTIONS_REQUEST,
    ALL_ORDER_TRANSACTIONS_SUCCESS,
    ALL_ORDER_TRANSACTIONS_FAIL,

    ALL_ORDER_GALLON_TYPE_REQUEST,
    ALL_ORDER_GALLON_TYPE_SUCCESS,
    ALL_ORDER_GALLON_TYPE_FAIL,

    CLEAR_ERRORS,
} from "../constants/adminConstants";
import axios from 'axios'
export const allStoreSalesAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_STORE_SALES_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/all/store/sales/${id}`);
        dispatch({
            type: ALL_STORE_SALES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_STORE_SALES_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
};

export const getSalesOrderByBranch = (id) => async (dispatch) => {
    try {
        dispatch({ type: SALES_ORDER_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/all/sales/order/${id}`);
        dispatch({
            type: SALES_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SALES_ORDER_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const setBranchID = (id) => async (dispatch) => {
    dispatch({
        type: SINGLE_STORE_BRANCH_SUCCESS,
        payload: id,
    });
};
export const getSingleBranchUsers = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CUSTOMER_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/store/customer/${id}`);
        dispatch({
          type: ALL_CUSTOMER_SUCCESS,
          payload: data.usersWithTransactions,
        });
      } catch (error) {
        dispatch({
          type: ALL_CUSTOMER_FAIL,
          payload: error.response.data.message,
        });
      }
}
export const getAllStaff = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_STAFF_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/store/staff/${id}`);
        dispatch({
          type: ALL_STAFF_SUCCESS,
          payload: data.users,
        });
      } catch (error) {
        dispatch({
          type: ALL_STAFF_FAIL,
          payload: error.response.data.message,
        });
      }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

export const getSalesWalkin = () => async (dispatch)=>{
    try {
        dispatch({ type: SALES_WALKIN_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/sales/othergallon/inventory`);
        
        dispatch({
            type: SALES_WALKIN_SUCCESS,
            payload: data.totalSalesByBranch,
        });
    } catch (error) {
        dispatch({
            type: SALES_WALKIN_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const getOrderTransactions = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDER_TRANSACTIONS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/all/orders/${id}`);
        dispatch({
            type: ALL_ORDER_TRANSACTIONS_SUCCESS,
            payload: data.transactions,
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDER_TRANSACTIONS_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const getOrderByGallonType = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDER_GALLON_TYPE_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/orders/byGallon/${id}`);
        dispatch({
            type: ALL_ORDER_GALLON_TYPE_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDER_GALLON_TYPE_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}