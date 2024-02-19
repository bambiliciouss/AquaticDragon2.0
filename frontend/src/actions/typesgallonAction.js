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
  DELETE_TYPESGALLON_RESET,
  // DELETE_TYPESGALLON_FAIL,
  CLEAR_ERRORS,
} from "../constants/typesgallonConstants";

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
      type: DELETE_TYPESGALLON_RESET,
      payload: error.response.data.message,
    });
  }
};
