import axios from "axios";
import {
  CREATE_MACHINECLEANING_REQUEST,
  CREATE_MACHINECLEANING_SUCCESS,
  CREATE_MACHINECLEANING_RESET,
  CREATE_MACHINECLEANING_FAIL,
  CLEAR_ERRORS,
  ALL_MACHINECLEANING_REQUEST,
  ALL_MACHINECLEANING_SUCCESS,
  ALL_MACHINECLEANING_FAIL,
  ALL_MACHINECLEANING_RESET,
  SINGLE_MACHINECLEANING_REQUEST,
  SINGLE_MACHINECLEANING_SUCCESS,
  SINGLE_MACHINECLEANING_RESET,
  SINGLE_MACHINECLEANING_FAIL,
  UPDATE_MACHINECLEANING_REQUEST,
  UPDATE_MACHINECLEANING_SUCCESS,
  UPDATE_MACHINECLEANING_FAIL,
  UPDATE_MACHINECLEANING_RESET,
  DELETE_MACHINECLEANING_REQUEST,
  DELETE_MACHINECLEANING_SUCCESS,
  DELETE_MACHINECLEANING_FAIL,
  DELETE_MACHINECLEANING_RESET,
} from "../constants/machinecleaningConstants";

export const createMachineCleaning =
  (machinecleaning, id) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_MACHINECLEANING_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/create/machinecleaning/record/${id}`,
        machinecleaning,
        config
      );
      dispatch({
        type: CREATE_MACHINECLEANING_SUCCESS,
        payload: data.machinecleaning,
      });
      console.log("success cleaning saved dude", data.machinecleaning);
    } catch (error) {
      dispatch({
        type: CREATE_MACHINECLEANING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const allMachineCleaning = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_MACHINECLEANING_REQUEST });
    const { data } = await axios.get(
      `/api/v1/store/machinecleaning/record/${id}`
    );
    dispatch({
      type: ALL_MACHINECLEANING_SUCCESS,
      payload: data.storeStoreMachineCleaning,
    });
    console.log("success", data.storeStoreMachineCleaning);
  } catch (error) {
    dispatch({
      type: ALL_MACHINECLEANING_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const singleMachineCleaningRecord = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_MACHINECLEANING_REQUEST });
    const { data } = await axios.get(`/api/v1/machinecleaning/record/${id}`);
    dispatch({
      type: SINGLE_MACHINECLEANING_SUCCESS,
      payload: data.storeStoreMachineCleaning,
    });
    console.log("daya result", data.storeStoreMachineCleaning);
  } catch (error) {
    dispatch({
      type: SINGLE_MACHINECLEANING_FAIL,
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

// export const updateMachineCleaning = (id, userdata) => async (dispatch) => {
//   console.log("actions update", userdata);
//   try {
//     dispatch({ type: UPDATE_MACHINECLEANING_REQUEST });
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//     };

//     const { data } = await axios.put(
//       `/api/v1/store/machinecleaning/record/${id}`,
//       userdata,
//       config
//     );

//     dispatch({
//       type: UPDATE_MACHINECLEANING_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_MACHINECLEANING_FAIL,
//       payload: error.response.data.message,
//     });
//     //console.log(error);
//   }
// };

export const updateMachineCleaning = (id, storeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MACHINECLEANING_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `/api/v1/store/machinecleaning/record/${id}`,
      storeData,
      config
    );
    dispatch({
      type: UPDATE_MACHINECLEANING_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MACHINECLEANING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteMachineCleaning = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MACHINECLEANING_REQUEST });
    const { data } = await axios.delete(
      `/api/v1/machinecleaning/record/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_MACHINECLEANING_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MACHINECLEANING_FAIL,
      payload: error.response.data.message,
    });
  }
};
