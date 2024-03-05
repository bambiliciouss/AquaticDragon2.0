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

export const newProductReducer = (
  state = { product: {}, productCreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        productCreated: true,
        product: action.payload,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_PRODUCT_RESET:
      return {
        ...state,
        productCreated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allProductsStockLogsReducer = (
  state = { productstocklog: [] },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCTSTOCKLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_PRODUCTSTOCKLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        productstocklog: action.payload,
      };

    case ALL_PRODUCTSTOCKLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const ProductsStockLogsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTSTOCKLOG_REQUEST:
    case DELETE_PRODUCTSTOCKLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PRODUCTSTOCKLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PRODUCTSTOCKLOG_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_PRODUCTSTOCKLOG_FAIL:
    case DELETE_PRODUCTSTOCKLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_PRODUCTSTOCKLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PRODUCTSTOCKLOG_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const singleProductsReducer = (
  state = { productdetails: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        productdetails: action.payload,
      };
    case SINGLE_PRODUCT_RESET:
      return {
        ...state,
        productdetails: false,
      };

    case SINGLE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const ProductDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdatedProduct: action.payload,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdatedProduct: false,
      };

    case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeletedProduct: action.payload,
      };

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeletedProduct: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
