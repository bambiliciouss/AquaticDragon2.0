import axios from "axios";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_RESET,
  ALL_PRODUCTSTOCKLOG_REQUEST,
  ALL_PRODUCTSTOCKLOG_SUCCESS,
  ALL_PRODUCTSTOCKLOG_FAIL,
  UPDATE_PRODUCTSTOCKLOG_REQUEST,
  UPDATE_PRODUCTSTOCKLOG_SUCCESS,
  UPDATE_PRODUCTSTOCKLOG_FAIL,
  UPDATE_PRODUCTSTOCKLOG_RESET,
  DELETE_PRODUCTSTOCKLOG_REQUEST,
  DELETE_PRODUCTSTOCKLOG_SUCCESS,
  DELETE_PRODUCTSTOCKLOG_FAIL,
  DELETE_PRODUCTSTOCKLOG_RESET,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_RESET,
  SINGLE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
} from "./../constants/productConstants";

export const createProduct = (productData, id) => async (dispatch) => {
  console.log("ID MO BEH ", id);
  console.log("FormData content:", [...productData.entries()]);
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/admin/create/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allProductList = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/all/product/store/${id}`);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data.product,
    });
    console.log("success", data.product);
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allProductStockLogs = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTSTOCKLOG_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/product/stocklogs/${id}`);
    dispatch({
      type: ALL_PRODUCTSTOCKLOG_SUCCESS,
      payload: data.stockLogs,
    });
    console.log("success", data.stockLogs);
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTSTOCKLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const updateProductStockLog = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCTSTOCKLOG_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/admin/update/product/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCTSTOCKLOG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCTSTOCKLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProductStockLog =
  (productid, stockid) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCTSTOCKLOG_REQUEST });
      const { data } = await axios.delete(
        `/api/v1/admin/product/${productid}/stocklogs/delete/${stockid}`,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: DELETE_PRODUCTSTOCKLOG_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCTSTOCKLOG_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`/api/v1/admin/all/product/${id}`, config);

    dispatch({
      type: SINGLE_PRODUCT_SUCCESS,
      payload: data.product,
    });
    console.log("PRODUCT DETAILS", data.product);
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProductDetails = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `/api/v1/admin/update/product/price/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCTSTOCKLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(
      `/api/v1/admin/product/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
