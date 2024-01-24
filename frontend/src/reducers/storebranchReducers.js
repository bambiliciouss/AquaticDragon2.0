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
} from "../constants/storebranchConstants";

export const newStoreBranchReducer = (
  state = { storeBranch: {}, storeBranchcreated: false },
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
        storeBranchcreated: true,
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
        storeBranchcreated: false,
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
    case DELETE_STOREBRANCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

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