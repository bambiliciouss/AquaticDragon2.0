import axios from "axios";
import {
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAIL,
  CREATE_ADDRESS_RESET,
  CLEAR_ERRORS,
  ALL_ADDRESS_REQUEST,
  ALL_ADDRESS_SUCCESS,
  ALL_ADDRESS_FAIL,
  ALL_ADDRESS_RESET,
  SINGLE_ADDRESS_REQUEST,
  SINGLE_ADDRESS_SUCCESS,
  SINGLE_ADDRESS_FAIL,
  SINGLE_ADDRESS_RESET,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_RESET,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_RESET,
  SET_ADDRESS_REQUEST,
  SET_ADDRESS_SUCCESS,
  SET_ADDRESS_FAIL,
  SET_ADDRESS_RESET,
} from "../constants/addressConstants";

export const createAddress = (formdata, id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ADDRESS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/v1/me/address`, formdata, config);
    dispatch({
      type: CREATE_ADDRESS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allAddress = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADDRESS_REQUEST });
    const { data } = await axios.get(`/api/v1/me/addresses`);
    dispatch({
      type: ALL_ADDRESS_SUCCESS,
      payload: data.addresses,
    });
    console.log(data.addresses);
  } catch (error) {
    dispatch({
      type: ALL_ADDRESS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const singleAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_ADDRESS_REQUEST });
    const { data } = await axios.get(`/api/v1/me/address/details/${id}`);
    dispatch({
      type: SINGLE_ADDRESS_SUCCESS,
      payload: data.address,
    });
    //console.log(data.barangayHealth);
  } catch (error) {
    dispatch({
      type: SINGLE_ADDRESS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};

export const updateAddress = (id, storeData) => async (dispatch) => {
  console.log("FormData content:", [...storeData.entries()]);
  try {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/me/update/address/${id}`,
      storeData,
      config
    );
    dispatch({
      type: UPDATE_ADDRESS_SUCCESS,
      payload: data.success,
    });
    console.log("data", data);
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// export const updateAddress = (id, storeData) => async (dispatch) => {
//   console.log(id);
//   console.log([...storeData.entries()]);
//   try {
//     dispatch({ type: UPDATE_ADDRESS_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     // Convert FormData to JSON object
//     const formDataObject = {};
//     storeData.forEach((value, key) => {
//       formDataObject[key] = value;
//     });

//     // Use JSON.stringify to convert the JSON object to a string
//     const formDataString = JSON.stringify(formDataObject);

//     const { data } = await axios.put(
//       `/api/v1/me/update/address/${id}`,
//       formDataString,
//       config
//     );

//     dispatch({
//       type: UPDATE_ADDRESS_SUCCESS,
//       payload: data.success,
//     });
//     console.log("data", data);
//   } catch (error) {
//     dispatch({
//       type: UPDATE_ADDRESS_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const deleteAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    const { data } = await axios.delete(`/api/v1/me/address/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_ADDRESS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const setDefaultAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_ADDRESS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/me/setdefault/address/${id}`,
      config
    );
    dispatch({
      type: SET_ADDRESS_SUCCESS,
      payload: data.success,
    });
    console.log("data", data);
  } catch (error) {
    dispatch({
      type: SET_ADDRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const AdminallAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADDRESS_REQUEST });
    const { data } = await axios.get(`/api/v1/me/addresses/${id}`);
    dispatch({
      type: ALL_ADDRESS_SUCCESS,
      payload: data.addresses,
    });
    console.log(data.addresses);
  } catch (error) {
    dispatch({
      type: ALL_ADDRESS_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error occurred",
    });
  }
};
