import axios from "axios";

import {
  CREATE_GALLON_REQUEST,
  CREATE_GALLON_SUCCESS,
  CREATE_GALLON_FAIL,
  CLEAR_ERRORS,
  MY_GALLON_REQUEST,
  MY_GALLON_SUCCESS,
  MY_GALLON_FAIL,
  ALL_GALLONS_REQUEST,
  ALL_GALLONS_SUCCESS,
  ALL_GALLONS_FAIL,
  DELETE_GALLON_REQUEST,
  DELETE_GALLON_SUCCESS,
  DELETE_GALLON_RESET,
  DELETE_GALLON_FAIL,
} from "../constants/gallonConstants";

export const createGallon = (gallon) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_GALLON_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/register/gallon",
      gallon,
      config
    );
    dispatch({
      type: CREATE_GALLON_SUCCESS,
      payload: data.gallon,
    });
  } catch (error) {
    dispatch({
      type: CREATE_GALLON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const myGallons = () => async (dispatch) => {
  try {
    dispatch({ type: MY_GALLON_REQUEST });
    const { data } = await axios.get(`/api/v1/my-gallons`);
    dispatch({
      type: MY_GALLON_SUCCESS,
      payload: data.gallon,
    });
  } catch (error) {
    dispatch({
      type: MY_GALLON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allGallons = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_GALLONS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/gallons`);
    dispatch({
      type: ALL_GALLONS_SUCCESS,
      payload: data.gallons,
    });
  } catch (error) {
    dispatch({
      type: ALL_GALLONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteGallon = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_GALLON_REQUEST });
    const { data } = await axios.delete(`/api/v1/delete/my-gallon/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_GALLON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_GALLON_RESET,
      payload: error.response.data.message,
    });
  }
};
