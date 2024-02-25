import {
  CREATE_BARANGAYHEALTH_REQUEST,
  CREATE_BARANGAYHEALTH_SUCCESS,
  CREATE_BARANGAYHEALTH_FAIL,
  CREATE_BARANGAYHEALTH_RESET,
  CLEAR_ERRORS,
  ALL_BARANGAYHEALTH_REQUEST,
  ALL_BARANGAYHEALTH_SUCCESS,
  ALL_BARANGAYHEALTH_FAIL,
  ALL_BARANGAYHEALTH_RESET,
  SINGLE_BARANGAYHEALTH_REQUEST,
  SINGLE_BARANGAYHEALTH_SUCCESS,
  SINGLE_BARANGAYHEALTH_FAIL,
  SINGLE_BARANGAYHEALTH_RESET,
  UPDATE_BARANGAYHEALTH_REQUEST,
  UPDATE_BARANGAYHEALTH_SUCCESS,
  UPDATE_BARANGAYHEALTH_FAIL,
  UPDATE_BARANGAYHEALTH_RESET,
  DELETE_BARANGAYHEALTH_REQUEST,
  DELETE_BARANGAYHEALTH_SUCCESS,
  DELETE_BARANGAYHEALTH_FAIL,
  DELETE_BARANGAYHEALTH_RESET,
} from "../constants/barangayHealthConstants";

export const newBarangayHealthReducer = (
  state = { barangayhealth: {}, barangayhealthcreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_BARANGAYHEALTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BARANGAYHEALTH_SUCCESS:
      return {
        ...state,
        loading: false,
        barangayhealthcreated: true,
        barangayhealth: action.payload,
      };

    case CREATE_BARANGAYHEALTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_BARANGAYHEALTH_RESET:
      return {
        ...state,
        barangayhealthcreated: false,
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

export const allBarangayHealthReducer = (
  state = { barangayhealth: [] },
  action
) => {
  switch (action.type) {
    case ALL_BARANGAYHEALTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_BARANGAYHEALTH_SUCCESS:
      return {
        ...state,
        loading: false,
        barangayhealth: action.payload,
      };
    case ALL_BARANGAYHEALTH_RESET:
      return {
        ...state,
        barangayhealth: false,
      };

    case ALL_BARANGAYHEALTH_FAIL:
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

export const singleBarangayHealthReducer = (
  state = { barangayhealthdetails: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_BARANGAYHEALTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_BARANGAYHEALTH_SUCCESS:
      return {
        ...state,
        loading: false,
        barangayhealthdetails: action.payload,
      };
    case SINGLE_BARANGAYHEALTH_RESET:
      return {
        ...state,
        barangayhealthdetails: false,
      };

    case SINGLE_BARANGAYHEALTH_FAIL:
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

export const barangayHealthReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BARANGAYHEALTH_REQUEST:
    case DELETE_BARANGAYHEALTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BARANGAYHEALTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_BARANGAYHEALTH_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_BARANGAYHEALTH_FAIL:
    case DELETE_BARANGAYHEALTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_BARANGAYHEALTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_BARANGAYHEALTH_RESET:
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
