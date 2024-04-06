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