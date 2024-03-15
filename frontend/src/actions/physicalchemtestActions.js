import axios from "axios";
import {
  CREATE_PHYSICALCHEMTEST_REQUEST,
  CREATE_PHYSICALCHEMTEST_SUCCESS,
  CREATE_PHYSICALCHEMTEST_RESET,
  CREATE_PHYSICALCHEMTEST_FAIL,
  CLEAR_ERRORS,
  ALL_PHYSICALCHEMTEST_REQUEST,
  ALL_PHYSICALCHEMTEST_SUCCESS,
  ALL_PHYSICALCHEMTEST_FAIL,
  ALL_PHYSICALCHEMTEST_RESET,
  SINGLE_PHYSICALCHEMTEST_REQUEST,
  SINGLE_PHYSICALCHEMTEST_SUCCESS,
  SINGLE_PHYSICALCHEMTEST_RESET,
  SINGLE_PHYSICALCHEMTEST_FAIL,
  UPDATE_PHYSICALCHEMTEST_REQUEST,
  UPDATE_PHYSICALCHEMTEST_SUCCESS,
  UPDATE_PHYSICALCHEMTEST_FAIL,
  UPDATE_PHYSICALCHEMTEST_RESET,
  DELETE_PHYSICALCHEMTEST_REQUEST,
  DELETE_PHYSICALCHEMTEST_SUCCESS,
  DELETE_PHYSICALCHEMTEST_FAIL,
  DELETE_PHYSICALCHEMTEST_RESET,
} from "../constants/physicalchemtestConstants";

export const createPhysicalChemTest = (physicalchemtest, id) => async (dispatch) => {
    console.log("FormData content:", [...physicalchemtest.entries()], id);
    try {
      dispatch({ type: CREATE_PHYSICALCHEMTEST_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/create/PhyChemTest/record/${id}`,
        physicalchemtest,
        config
      );
      dispatch({
        type: CREATE_PHYSICALCHEMTEST_SUCCESS,
        payload: data.phyChemTest,
      });
      console.log("success cleaning saved dude", data.phyChemTest);
    } catch (error) {
      dispatch({
        type: CREATE_PHYSICALCHEMTEST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const allPhysicalChemTest = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PHYSICALCHEMTEST_REQUEST });
    const { data } = await axios.get(
      `/api/v1/store/PhyChemTest/record/${id}`
    );
    dispatch({
      type: ALL_PHYSICALCHEMTEST_SUCCESS,
      payload: data.allPhyChemTests,
    });
    console.log("success", data.storeStorePhysicalChemTest);
  } catch (error) {
    dispatch({
      type: ALL_PHYSICALCHEMTEST_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const singlePhysicalChemTestRecord = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PHYSICALCHEMTEST_REQUEST });
    const { data } = await axios.get(`/api/v1/physicalchemtest/record/${id}`);
    dispatch({
      type: SINGLE_PHYSICALCHEMTEST_SUCCESS,
      payload: data.storePhysicalChemTest,
    });
    console.log("daya result", data.storeStorePhysicalChemTest);
  } catch (error) {
    dispatch({
      type: SINGLE_PHYSICALCHEMTEST_FAIL,
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


export const updatePhysicalChemTest = (id, storeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PHYSICALCHEMTEST_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `/api/v1/store/physicalchemtest/record/${id}`,
      storeData,
      config
    );
    dispatch({
      type: UPDATE_PHYSICALCHEMTEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PHYSICALCHEMTEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletePhysicalChemTest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PHYSICALCHEMTEST_REQUEST });
    const { data } = await axios.delete(
      `/api/v1/PhyChemTest/record/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_PHYSICALCHEMTEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PHYSICALCHEMTEST_FAIL,
      payload: error.response.data.message,
    });
  }
};
