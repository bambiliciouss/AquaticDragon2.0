import axios from "axios";

import {
  CREATE_WALKINPOS_REQUEST,
  CREATE_WALKINPOS_SUCCESS,
  CREATE_WALKINPOS_FAIL,
  ALL_WALKINPOS_REQUEST,
  ALL_WALKINPOS_SUCCESS,
  ALL_WALKINPOS_FAIL,
  DELETE_WALKINPOS_REQUEST,
  DELETE_WALKINPOS_SUCCESS,
  DELETE_WALKINPOS_RESET,
  DELETE_WALKINPOS_FAIL,
  SINGLE_WALKINPOS_REQUEST,
  SINGLE_WALKINPOS_SUCCESS,
  SINGLE_WALKINPOS_FAIL,
  SINGLE_WALKINPOS_RESET,
  CLEAR_ERRORS,
  UPDATE_WALKINPOS_REQUEST,
  UPDATE_WALKINPOS_SUCCESS,
  UPDATE_WALKINPOS_RESET,
  UPDATE_WALKINPOS_FAIL,
} from "../constants/walkinPOSConstants";

export const createWalkinpos = (walkinpos, id) => async (dispatch) => {
  console.log("ID MO BEH ", id);
  console.log("FormData content:", [...walkinpos.entries()]);
  try {
    dispatch({ type: CREATE_WALKINPOS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      ` /api/v1/create/othergallon/inventory/${id}`,
      walkinpos,
      config
    );
    dispatch({
      type: CREATE_WALKINPOS_SUCCESS,
      payload: data.otherGallon,
    });
  } catch (error) {
    dispatch({
      type: CREATE_WALKINPOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const allWalkinpos = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_WALKINPOS_REQUEST });
    const { data } = await axios.get(
      `/api/v1/all/store/othergallon/inventory/${id}`
    );
    dispatch({
      type: ALL_WALKINPOS_SUCCESS,
      payload: data.otherGallonInventory,
    });
    //  console.log("data", data);
  } catch (error) {
    dispatch({
      type: ALL_WALKINPOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteWalkinpos = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WALKINPOS_REQUEST });
    const { data } = await axios.delete(
      `/api/v1/delete/othergallon/inventory/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_WALKINPOS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_WALKINPOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getWalkinposDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_WALKINPOS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      `/api/v1/details/othergallon/inventory/${id}`,
      config
    );

    dispatch({
      type: SINGLE_WALKINPOS_SUCCESS,
      payload: data.otherGallon,
    });
    console.log("WALKINPOS DETAILS", data.otherGallon);
  } catch (error) {
    dispatch({
      type: SINGLE_WALKINPOS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateWalkinpos = (id, walkinposData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_WALKINPOS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/update/othergallon/inventory/${id}`,
      walkinposData,
      config
    );
    dispatch({
      type: UPDATE_WALKINPOS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_WALKINPOS_FAIL,
      payload: error.response.data.message,
    });
  }
};
