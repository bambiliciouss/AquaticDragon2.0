import axios from "axios";

import {
  CREATE_TYPESGALLON_REQUEST,
  CREATE_TYPESGALLON_SUCCESS,
  CREATE_TYPESGALLON_FAIL,
  ALL_TYPESGALLON_REQUEST,
  ALL_TYPESGALLON_SUCCESS,
  ALL_TYPESGALLON_FAIL,
  DELETE_TYPESGALLON_REQUEST,
  DELETE_TYPESGALLON_SUCCESS,
  DELETE_TYPESGALLON_FAIL,
  SINGLE_TYPESGALLON_REQUEST,
  SINGLE_TYPESGALLON_SUCCESS,
  SINGLE_TYPESGALLON_FAIL,
  SINGLE_TYPESGALLON_RESET,
  UPDATE_TYPESGALLON_REQUEST,
  UPDATE_TYPESGALLON_SUCCESS,
  UPDATE_TYPESGALLON_FAIL,
  UPDATE_TYPESGALLON_RESET,
  CLEAR_ERRORS,
} from "../constants/typesgallonConstants";
import { UPDATE_ADDRESS_FAIL } from "constants/addressConstants";

export const createTypesGallon = (typeofgallon) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TYPESGALLON_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/register/typeofgallon",
      typeofgallon,
      config
    );
    dispatch({
      type: CREATE_TYPESGALLON_SUCCESS,
      payload: data.typeofgallon,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TYPESGALLON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const allTypesGallon = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_TYPESGALLON_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/typeofgallon`);
    dispatch({
      type: ALL_TYPESGALLON_SUCCESS,
      payload: data.typeGallon,
    });
    console.log("success", data.typeGallon);
  } catch (error) {
    dispatch({
      type: ALL_TYPESGALLON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteTypesGallon = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TYPESGALLON_REQUEST });
    const { data } = await axios.delete(
      `/api/v1/admin/delete/typeofgallon/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_TYPESGALLON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TYPESGALLON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const singleTypesGallon = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_TYPESGALLON_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/typeofgallon/${id}`);
    dispatch({
      type: SINGLE_TYPESGALLON_SUCCESS,
      payload: data.gallonType,
    });
    //console.log(data.barangayHealth);
  } catch (error) {
    dispatch({
      type: SINGLE_TYPESGALLON_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const updateTypesGallon = (id, storeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TYPESGALLON_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `/api/v1/update/typeofgallon/${id}`,
      storeData,
      config
    );
    dispatch({
      type: UPDATE_TYPESGALLON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};
