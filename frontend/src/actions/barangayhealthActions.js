import axios from "axios";
import {
    CREATE_BARANGAYHEALTH_REQUEST,
    CREATE_BARANGAYHEALTH_SUCCESS,
    CREATE_BARANGAYHEALTH_FAIL,
    CREATE_BARANGAYHEALTH_RESET,
    CLEAR_ERRORS,
  } from "../constants/barangayHealthConstants";

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