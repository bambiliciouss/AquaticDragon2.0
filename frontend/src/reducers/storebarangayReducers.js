import {
  CREATE_STOREBARANGAY_REQUEST,
  CREATE_STOREBARANGAY_SUCCESS,
  CREATE_STOREBARANGAY_RESET,
  CREATE_STOREBARANGAY_FAIL,
  CLEAR_ERRORS,
  ALL_STOREBARANGAY_REQUEST,
  ALL_STOREBARANGAY_SUCCESS,
  ALL_STOREBARANGAY_FAIL,
  ALL_STOREBARANGAY_RESET,
  SINGLE_STOREBARANGAY_REQUEST,
  SINGLE_STOREBARANGAY_SUCCESS,
  SINGLE_STOREBARANGAY_RESET,
  SINGLE_STOREBARANGAY_FAIL,
  UPDATE_STOREBARANGAY_REQUEST,
  UPDATE_STOREBARANGAY_SUCCESS,
  UPDATE_STOREBARANGAY_FAIL,
  UPDATE_STOREBARANGAY_RESET,
  DELETE_STOREBARANGAY_REQUEST,
  DELETE_STOREBARANGAY_SUCCESS,
  DELETE_STOREBARANGAY_FAIL,
  DELETE_STOREBARANGAY_RESET,
} from "./../constants/storebarangayConstant";

export const newStorebarangayReducer = (
  state = { storebarangay: {}, storebarangayCreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_STOREBARANGAY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_STOREBARANGAY_SUCCESS:
      return {
        ...state,
        loading: false,
        storebarangayCreated: true,
        storebarangay: action.payload,
      };

    case CREATE_STOREBARANGAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_STOREBARANGAY_RESET:
      return {
        ...state,
        storebarangayCreated: false,
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

export const allStorebarangayReducer = (
  state = { allStorebarangay: [] },
  action
) => {
  switch (action.type) {
    case ALL_STOREBARANGAY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_STOREBARANGAY_SUCCESS:
      return {
        ...state,
        loading: false,
        allStorebarangay: action.payload,
      };

    case ALL_STOREBARANGAY_RESET:
      return {
        ...state,
        allStorebarangay: [],
      };

    case ALL_STOREBARANGAY_FAIL:
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

export const singleStorebarangayReducer = (
  state = { storebarangayDetails: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_STOREBARANGAY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_STOREBARANGAY_SUCCESS:
      return {
        ...state,
        loading: false,
        storebarangayDetails: action.payload,
      };

    case SINGLE_STOREBARANGAY_RESET:
      return {
        ...state,
        storebarangayDetails: [],
      };

    case SINGLE_STOREBARANGAY_FAIL:
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

export const storebarangayReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STOREBARANGAY_REQUEST:
    case DELETE_STOREBARANGAY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_STOREBARANGAY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_STOREBARANGAY_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_STOREBARANGAY_FAIL:
    case DELETE_STOREBARANGAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_STOREBARANGAY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_STOREBARANGAY_RESET:
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
