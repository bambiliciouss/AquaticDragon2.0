import axios from "axios";
import {
  CREATE_STORESTAFF_REQUEST,
  CREATE_STORESTAFF_SUCCESS,
  CREATE_STORESTAFF_RESET,
  CREATE_STORESTAFF_FAIL,
  CLEAR_ERRORS,
  ALL_STORESTAFF_REQUEST,
  ALL_STORESTAFF_SUCCESS,
  ALL_STORESTAFF_FAIL,
  SINGLE_STORESTAFF_REQUEST,
  SINGLE_STORESTAFF_SUCCESS,
  SINGLE_STORESTAFF_RESET,
  SINGLE_STORESTAFF_FAIL,
  DELETE_STORESTAFF_REQUEST,
  DELETE_STORESTAFF_SUCCESS,
  DELETE_STORESTAFF_RESET,
  DELETE_STORESTAFF_FAIL,
} from "../constants/storestaffConstants";

export const createStoreStaff = (storestaff, id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_STORESTAFF_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/assigned/staff/${id}`,
      storestaff,
      config
    );
    dispatch({
      type: CREATE_STORESTAFF_SUCCESS,
      payload: data.storestaff,
    });
  } catch (error) {
    dispatch({
      type: CREATE_STORESTAFF_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allStoreStaff = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_STORESTAFF_REQUEST });
    const { data } = await axios.get(`/api/v1/assigned/staff/details/${id}`);
    dispatch({
      type: ALL_STORESTAFF_SUCCESS,
      payload: data.storeStaff,
    });
    console.log("success", data.storeStaff);
  } catch (error) {
    dispatch({
      type: ALL_STORESTAFF_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const singleStoreStaff = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_STORESTAFF_REQUEST });
    const { data } = await axios.get(`/api/v1/assigned/staff/${id}`);
    dispatch({
      type: SINGLE_STORESTAFF_SUCCESS,
      payload: data.storeStaffdetails,
    });
    console.log("assigned store", data.storeStaffdetails);
  } catch (error) {
    dispatch({
      type: SINGLE_STORESTAFF_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const deleteStoreStaff = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STORESTAFF_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/assigned/staff/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_STORESTAFF_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_STORESTAFF_FAIL,
      payload: error.response.data.message,
    });
  }
};
