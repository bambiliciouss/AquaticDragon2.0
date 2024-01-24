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
  CLEAR_ERRORS,
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

