import axios from "axios";
import {
  CREATE_BARANGAYHEALTH_REQUEST,
  CREATE_BARANGAYHEALTH_SUCCESS,
  CREATE_BARANGAYHEALTH_FAIL,
  CREATE_BARANGAYHEALTH_RESET,
  CLEAR_ERRORS,
  ALL_BARANGAYHEALTH_REQUEST,
  ALL_BARANGAYHEALTH_SUCCESS,
  ALL_BARANGAYHEALTH_FAIL,
  ALL_BARANGAYHEALTH_RESET,
  SINGLE_BARANGAYHEALTH_REQUEST,
  SINGLE_BARANGAYHEALTH_SUCCESS,
  SINGLE_BARANGAYHEALTH_FAIL,
  SINGLE_BARANGAYHEALTH_RESET,
  UPDATE_BARANGAYHEALTH_REQUEST,
  UPDATE_BARANGAYHEALTH_SUCCESS,
  UPDATE_BARANGAYHEALTH_FAIL,
  UPDATE_BARANGAYHEALTH_RESET,
  DELETE_BARANGAYHEALTH_REQUEST,
  DELETE_BARANGAYHEALTH_SUCCESS,
  DELETE_BARANGAYHEALTH_FAIL,
  DELETE_BARANGAYHEALTH_RESET,
} from "../constants/barangayHealthConstants";

export const createBarangayHealth = (formdata, id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BARANGAYHEALTH_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/create/barangayhealth/record/${id}`,
      formdata,
      config
    );
    dispatch({
      type: CREATE_BARANGAYHEALTH_SUCCESS,
      payload: data.barangayHealth,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BARANGAYHEALTH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allBarangayHealth = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_BARANGAYHEALTH_REQUEST });
    const { data } = await axios.get(
      `/api/v1/store/barangayhealth/record/${id}`
    );
    dispatch({
      type: ALL_BARANGAYHEALTH_SUCCESS,
      payload: data.barangayhealth,
    });
  } catch (error) {
    dispatch({
      type: ALL_BARANGAYHEALTH_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const singleBarangayHealth = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_BARANGAYHEALTH_REQUEST });
    const { data } = await axios.get(`/api/v1/barangayhealth/record/${id}`);
    dispatch({
      type: SINGLE_BARANGAYHEALTH_SUCCESS,
      payload: data.barangayHealth,
    });
    //console.log(data.barangayHealth);
  } catch (error) {
    dispatch({
      type: SINGLE_BARANGAYHEALTH_FAIL,
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

export const updateBarangayHealth = (id, storeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BARANGAYHEALTH_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `/api/v1/store/barangayhealth/record/${id}`,
      storeData,
      config
    );
    dispatch({
      type: UPDATE_BARANGAYHEALTH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BARANGAYHEALTH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteBarangayHealth = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BARANGAYHEALTH_REQUEST });
    const { data } = await axios.delete(`/api/v1/barangayhealth/record/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_BARANGAYHEALTH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BARANGAYHEALTH_FAIL,
      payload: error.response.data.message,
    });
  }
};
