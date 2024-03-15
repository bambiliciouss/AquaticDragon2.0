import axios from "axios";
import {
  CREATE_BUSINESSPERMIT_REQUEST,
  CREATE_BUSINESSPERMIT_SUCCESS,
  CREATE_BUSINESSPERMIT_RESET,
  CREATE_BUSINESSPERMIT_FAIL,
  CLEAR_ERRORS,
  ALL_BUSINESSPERMIT_REQUEST,
  ALL_BUSINESSPERMIT_SUCCESS,
  ALL_BUSINESSPERMIT_FAIL,
  ALL_BUSINESSPERMIT_RESET,
  SINGLE_BUSINESSPERMIT_REQUEST,
  SINGLE_BUSINESSPERMIT_SUCCESS,
  SINGLE_BUSINESSPERMIT_RESET,
  SINGLE_BUSINESSPERMIT_FAIL,
  UPDATE_BUSINESSPERMIT_REQUEST,
  UPDATE_BUSINESSPERMIT_SUCCESS,
  UPDATE_BUSINESSPERMIT_FAIL,
  UPDATE_BUSINESSPERMIT_RESET,
  DELETE_BUSINESSPERMIT_REQUEST,
  DELETE_BUSINESSPERMIT_SUCCESS,
  DELETE_BUSINESSPERMIT_FAIL,
  DELETE_BUSINESSPERMIT_RESET,
} from "../constants/businesspermitConstant";

export const createBusinessPermit =
  (businesspermit, id) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BUSINESSPERMIT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/create/businesspermit/record//${id}`,
        businesspermit,
        config
      );
      dispatch({
        type: CREATE_BUSINESSPERMIT_SUCCESS,
        payload: data.businessPermit,
      });
      console.log("success cleaning saved dude", data.businessPermit);
    } catch (error) {
      dispatch({
        type: CREATE_BUSINESSPERMIT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const allBusinessPermit = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_BUSINESSPERMIT_REQUEST });
    const { data } = await axios.get(
      `/api/v1/store/businesspermit/record/${id}`
    );
    dispatch({
      type: ALL_BUSINESSPERMIT_SUCCESS,
      payload: data.businessPermits,
    });
    console.log("success", data.businessPermits);
  } catch (error) {
    dispatch({
      type: ALL_BUSINESSPERMIT_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const singleBusinessPermitRecord = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_BUSINESSPERMIT_REQUEST });
    const { data } = await axios.get(`/api/v1/businesspermit/record/${id}`);
    dispatch({
      type: SINGLE_BUSINESSPERMIT_SUCCESS,
      payload: data.businessPermit,
    });
    console.log("daya result", data.businessPermit);
  } catch (error) {
    dispatch({
      type: SINGLE_BUSINESSPERMIT_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};


export const updateBusinessPermit = (id, storeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BUSINESSPERMIT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `/api/v1/store/businesspermit/record/${id}`,
      storeData,
      config
    );
    dispatch({
      type: UPDATE_BUSINESSPERMIT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BUSINESSPERMIT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteBusinessPermit = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BUSINESSPERMIT_REQUEST });
    const { data } = await axios.delete(
      `/api/v1/businesspermit/record/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_BUSINESSPERMIT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BUSINESSPERMIT_FAIL,
      payload: error.response.data.message,
    });
  }
};
