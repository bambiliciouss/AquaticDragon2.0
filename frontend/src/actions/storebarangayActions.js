import axios from "axios";
import {
  CREATE_STOREBARANGAY_REQUEST,
  CREATE_STOREBARANGAY_SUCCESS,
  CREATE_STOREBARANGAY_RESET,
  CREATE_STOREBARANGAY_FAIL,
  CLEAR_ERRORS,
  ALL_STOREBARANGAY_REQUEST,
  ALL_STOREBARANGAY_SUCCESS,
  ALL_STOREBARANGAY_FAIL,
  ALL_STOREBARANGAY_RESET,
  SINGLE_STOREBARANGAY_REQUEST,
  SINGLE_STOREBARANGAY_SUCCESS,
  SINGLE_STOREBARANGAY_RESET,
  SINGLE_STOREBARANGAY_FAIL,
  UPDATE_STOREBARANGAY_REQUEST,
  UPDATE_STOREBARANGAY_SUCCESS,
  UPDATE_STOREBARANGAY_FAIL,
  UPDATE_STOREBARANGAY_RESET,
  DELETE_STOREBARANGAY_REQUEST,
  DELETE_STOREBARANGAY_SUCCESS,
  DELETE_STOREBARANGAY_FAIL,
  DELETE_STOREBARANGAY_RESET,
} from "./../constants/storebarangayConstant";

export const createStorebarangay = (formdata, id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_STOREBARANGAY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/create/barangay/${id}`,
      formdata,
      config
    );
    dispatch({
      type: CREATE_STOREBARANGAY_SUCCESS,
      payload: data.storebarangay,
    });
  } catch (error) {
    dispatch({
      type: CREATE_STOREBARANGAY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allStorebarangayList = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_STOREBARANGAY_REQUEST });
    const { data } = await axios.get(`/api/v1/store/barangay/${id}`);
    dispatch({
      type: ALL_STOREBARANGAY_SUCCESS,
      payload: data.storeBarangay,
    });
    console.log(data.storeBarangay);
  } catch (error) {
    dispatch({
      type: ALL_STOREBARANGAY_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const singleStorebarangay = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_STOREBARANGAY_REQUEST });
    const { data } = await axios.get(`/api/v1/store/barangay/details/${id}`);
    dispatch({
      type: SINGLE_STOREBARANGAY_SUCCESS,
      payload: data.storeBarangay,
    });
    //console.log(data.barangayHealth);
  } catch (error) {
    dispatch({
      type: SINGLE_STOREBARANGAY_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const updateStorebarangay = (id, storeData) => async (dispatch) => {
  console.log("FormData content:", [...storeData.entries()]);
  try {
    dispatch({ type: UPDATE_STOREBARANGAY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/store/barangay/${id}`,
      storeData,
      config
    );
    dispatch({
      type: UPDATE_STOREBARANGAY_SUCCESS,
      payload: data.success,
    });
    console.log("data", data);
  } catch (error) {
    dispatch({
      type: UPDATE_STOREBARANGAY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteStorebarangay = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STOREBARANGAY_REQUEST });
    const { data } = await axios.delete(`/api/v1/store/barangay/delete/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_STOREBARANGAY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_STOREBARANGAY_FAIL,
      payload: error.response.data.message,
    });
  }
};
