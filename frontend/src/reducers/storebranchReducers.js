import {
  CREATE_STOREBRANCH_REQUEST,
  CREATE_STOREBRANCH_SUCCESS,
  CREATE_STOREBRANCH_FAIL,
  CREATE_STOREBRANCH_RESET,
  ALL_STOREBRANCH_REQUEST,
  ALL_STOREBRANCH_SUCCESS,
  ALL_STOREBRANCH_FAIL,
  DELETE_STOREBRANCH_REQUEST,
  DELETE_STOREBRANCH_SUCCESS,
  DELETE_STOREBRANCH_RESET,
  DELETE_STOREBRANCH_FAIL,
  CLEAR_ERRORS,
  STOREBRANCH_DETAILS_REQUEST,
  STOREBRANCH_DETAILS_SUCCESS,
  STOREBRANCH_DETAILS_FAIL,
  UPDATE_STOREBRANCH_REQUEST,
  UPDATE_STOREBRANCH_SUCCESS,
  UPDATE_STOREBRANCH_RESET,
  UPDATE_STOREBRANCH_FAIL,
} from "../constants/storebranchConstants";

export const newStoreBranchReducer = (
  state = { storeBranch: {}, storeBranchCreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_STOREBRANCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_STOREBRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        storeBranchCreated: true,
        storeBranch: action.payload,
      };

    case CREATE_STOREBRANCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_STOREBRANCH_RESET:
      return {
        ...state,
        storeBranchCreated: false,
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

export const allStoreBranchReducer = (state = { storeBranch: [] }, action) => {
  switch (action.type) {
    case ALL_STOREBRANCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_STOREBRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        storeBranch: action.payload,
      };

    case ALL_STOREBRANCH_FAIL:
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

export const storeBranchReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STOREBRANCH_REQUEST:
    case DELETE_STOREBRANCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_STOREBRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_STOREBRANCH_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_STOREBRANCH_FAIL:
    case DELETE_STOREBRANCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_STOREBRANCH_SUCCESS:
      return {
        ...state,

        loading: false,

        isDeleted: action.payload,
      };
    case DELETE_STOREBRANCH_RESET:
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

export const storeDetailsReducer = (state = { storeBranch: {} }, action) => {
  switch (action.type) {
    case STOREBRANCH_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case STOREBRANCH_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        storeBranch: action.payload,
      };

    case STOREBRANCH_DETAILS_FAIL:
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
