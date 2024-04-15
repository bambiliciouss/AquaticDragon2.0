import axios from "axios";
import {
  ALL_SUPERADMIN_USERS_REQUEST,
  ALL_SUPERADMIN_USERS_SUCCESS,
  ALL_SUPERADMIN_USERS_FAIL,
  ALL_SUPERADMIN_USERS_RESET,
  ALL_SUPERADMIN_PENDINGADMIN_REQUEST,
  ALL_SUPERADMIN_PENDINGADMIN_SUCCESS,
  ALL_SUPERADMIN_PENDINGADMIN_FAIL,
  ALL_SUPERADMIN_PENDINGADMIN_RESET,
  ALL_SUPERADMIN_ADMIN_REQUEST,
  ALL_SUPERADMIN_ADMIN_SUCCESS,
  ALL_SUPERADMIN_ADMIN_FAIL,
  ALL_SUPERADMIN_ADMIN_RESET,
  ALL_SUPERADMIN_ADMINSTOREBRANCH_REQUEST,
  ALL_SUPERADMIN_ADMINSTOREBRANCH_SUCCESS,
  ALL_SUPERADMIN_ADMINSTOREBRANCH_FAIL,
  ALL_SUPERADMIN_ADMINSTOREBRANCH_RESET,
  ALL_SUPERADMIN_ADMINAPPROVAL_REQUEST,
  ALL_SUPERADMIN_ADMINAPPROVAL_SUCCESS,
  ALL_SUPERADMIN_ADMINAPPROVAL_FAIL,
  ALL_SUPERADMIN_ADMINAPPROVAL_RESET,
  CLEAR_ERRORS,
} from "../constants/superadminConstants";

export const allUsersSA = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SUPERADMIN_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/superadmin/allusers`);
    console.log(data);
    dispatch({
      type: ALL_SUPERADMIN_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_SUPERADMIN_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allPendingSA = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SUPERADMIN_PENDINGADMIN_REQUEST });
    const { data } = await axios.get(`/api/v1/superadmin/all/pendingadmin`);
    console.log(data);
    dispatch({
      type: ALL_SUPERADMIN_PENDINGADMIN_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_SUPERADMIN_PENDINGADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const adminApproval = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_SUPERADMIN_ADMINAPPROVAL_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/superadmin/approved/admin/${id}`,
      config
    );
    dispatch({
      type: ALL_SUPERADMIN_ADMINAPPROVAL_SUCCESS,
      payload: data.success,
    });
    console.log("data", data);
  } catch (error) {
    dispatch({
      type: ALL_SUPERADMIN_ADMINAPPROVAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allAdminSA = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SUPERADMIN_ADMIN_REQUEST });
    const { data } = await axios.get(`/api/v1/superadmin/all/admin`);
    console.log(data);
    dispatch({
      type: ALL_SUPERADMIN_ADMIN_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_SUPERADMIN_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
