import axios from "axios";

import {
  CREATE_STOREBRANCH_REQUEST,
  CREATE_STOREBRANCH_SUCCESS,
  CREATE_STOREBRANCH_FAIL,
  ALL_STOREBRANCH_REQUEST,
  ALL_STOREBRANCH_SUCCESS,
  ALL_STOREBRANCH_FAIL,
  DELETE_STOREBRANCH_REQUEST,
  DELETE_STOREBRANCH_SUCCESS,
  DELETE_STOREBRANCH_RESET,
  DELETE_STOREBRANCH_FAIL,
  STOREBRANCH_DETAILS_REQUEST,
  STOREBRANCH_DETAILS_SUCCESS,
  STOREBRANCH_DETAILS_FAIL,
  CLEAR_ERRORS,
  UPDATE_STOREBRANCH_REQUEST,
  UPDATE_STOREBRANCH_SUCCESS,
  UPDATE_STOREBRANCH_RESET,
  UPDATE_STOREBRANCH_FAIL,
} from "../constants/storebranchConstants";

export const createStoreBranch = (storeBranch) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_STOREBRANCH_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/register/storebranch",
      storeBranch,
      config
    );
    dispatch({
      type: CREATE_STOREBRANCH_SUCCESS,
      payload: data.storeBranch,
    });
  } catch (error) {
    dispatch({
      type: CREATE_STOREBRANCH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const allStoreBranch = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_STOREBRANCH_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/storebranch`);
    dispatch({
      type: ALL_STOREBRANCH_SUCCESS,
      payload: data.storeBranch,
    });
  } catch (error) {
    dispatch({
      type: ALL_STOREBRANCH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allStoreBranchUser = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_STOREBRANCH_REQUEST });
    const { data } = await axios.get(`/api/v1/available/store`);
    dispatch({
      type: ALL_STOREBRANCH_SUCCESS,
      payload: data.storeBarangay,
    });
  } catch (error) {
    dispatch({
      type: ALL_STOREBRANCH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allAdminStoreBranch = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_STOREBRANCH_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/all/store`);
    dispatch({
      type: ALL_STOREBRANCH_SUCCESS,
      payload: data.storeBranch,
    });
  } catch (error) {
    dispatch({
      type: ALL_STOREBRANCH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allAdminBranches = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_STOREBRANCH_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/all/store/branches/${id}`);
    dispatch({
      type: ALL_STOREBRANCH_SUCCESS,
      payload: data.branches,
    });
  } catch (error) {
    dispatch({
      type: ALL_STOREBRANCH_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const deleteStoreBranch = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_STOREBRANCH_REQUEST });
    const { data } = await axios.delete(`/api/v1/delete/storebranch/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_STOREBRANCH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_STOREBRANCH_RESET,
      payload: error.response.data.message,
    });
  }
};

export const getStoreDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STOREBRANCH_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`/api/v1/admin/store/${id}`, config);

    // Log user details
    console.log("STOREDETAILS", data.storeBranch);

    dispatch({
      type: STOREBRANCH_DETAILS_SUCCESS,
      payload: data.storeBranch,
    });
  } catch (error) {
    dispatch({
      type: STOREBRANCH_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateStoreBranch = (id, storeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STOREBRANCH_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/admin/store/update/${id}`,
      storeData,
      config
    );
    dispatch({
      type: UPDATE_STOREBRANCH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STOREBRANCH_FAIL,
      payload: error.response.data.message,
    });
  }
};
