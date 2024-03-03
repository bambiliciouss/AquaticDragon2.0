import {
  CREATE_WALKINPOS_REQUEST,
  CREATE_WALKINPOS_SUCCESS,
  CREATE_WALKINPOS_FAIL,
  CREATE_WALKINPOS_RESET,
  CLEAR_ERRORS,
  ALL_WALKINPOS_REQUEST,
  ALL_WALKINPOS_SUCCESS,
  ALL_WALKINPOS_FAIL,
  ALL_WALKINPOS_RESET,
  SINGLE_WALKINPOS_REQUEST,
  SINGLE_WALKINPOS_SUCCESS,
  SINGLE_WALKINPOS_FAIL,
  SINGLE_WALKINPOS_RESET,
  UPDATE_WALKINPOS_REQUEST,
  UPDATE_WALKINPOS_SUCCESS,
  UPDATE_WALKINPOS_FAIL,
  UPDATE_WALKINPOS_RESET,
  DELETE_WALKINPOS_REQUEST,
  DELETE_WALKINPOS_SUCCESS,
  DELETE_WALKINPOS_FAIL,
  DELETE_WALKINPOS_RESET,
} from "../constants/walkinPOSConstants";

export const newWalkinPosReducer = (
  state = { walkinpos: {}, walkinposcreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_WALKINPOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_WALKINPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        walkinposcreated: true,
        walkinpos: action.payload,
      };

    case CREATE_WALKINPOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_WALKINPOS_RESET:
      return {
        ...state,
        walkinposcreated: false,
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

export const allWalkinPosReducer = (state = { walkinpos: [] }, action) => {
  switch (action.type) {
    case ALL_WALKINPOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_WALKINPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        walkinpos: action.payload,
      };
    case ALL_WALKINPOS_RESET:
      return {
        ...state,
        walkinpos: false,
      };

    case ALL_WALKINPOS_FAIL:
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

export const singleWalkinPosReducer = (
  state = { walkinposdetails: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_WALKINPOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_WALKINPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        walkinposdetails: action.payload,
      };
    case SINGLE_WALKINPOS_RESET:
      return {
        ...state,
        walkinposdetails: false,
      };

    case SINGLE_WALKINPOS_FAIL:
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

export const walkinPosReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_WALKINPOS_REQUEST:
    case DELETE_WALKINPOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_WALKINPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_WALKINPOS_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_WALKINPOS_FAIL:
    case DELETE_WALKINPOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_WALKINPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_WALKINPOS_RESET:
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
