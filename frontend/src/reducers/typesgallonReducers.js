import {
  CREATE_TYPESGALLON_REQUEST,
  CREATE_TYPESGALLON_SUCCESS,
  CREATE_TYPESGALLON_FAIL,
  CREATE_TYPESGALLON_RESET,
  ALL_TYPESGALLON_REQUEST,
  ALL_TYPESGALLON_SUCCESS,
  ALL_TYPESGALLON_FAIL,
  DELETE_TYPESGALLON_REQUEST,
  DELETE_TYPESGALLON_SUCCESS,
  DELETE_TYPESGALLON_RESET,
  DELETE_TYPESGALLON_FAIL,
  SINGLE_TYPESGALLON_REQUEST,
  SINGLE_TYPESGALLON_SUCCESS,
  SINGLE_TYPESGALLON_FAIL,
  SINGLE_TYPESGALLON_RESET,
  UPDATE_TYPESGALLON_REQUEST,
  UPDATE_TYPESGALLON_SUCCESS,
  UPDATE_TYPESGALLON_FAIL,
  UPDATE_TYPESGALLON_RESET,
  CLEAR_ERRORS,
} from "../constants/typesgallonConstants";

export const newTypesGallonReducer = (
  state = { typeofGallon: {}, typesGalloncreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_TYPESGALLON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_TYPESGALLON_SUCCESS:
      return {
        ...state,
        loading: false,
        typesGalloncreated: true,
        typeofGallon: action.payload,
      };

    case CREATE_TYPESGALLON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_TYPESGALLON_RESET:
      return {
        ...state,
        typesGalloncreated: false,
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

export const allTypesGallonReducer = (state = { typeofGallon: [] }, action) => {
  switch (action.type) {
    case ALL_TYPESGALLON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_TYPESGALLON_SUCCESS:
      return {
        ...state,
        loading: false,
        typeofGallon: action.payload,
      };

    case ALL_TYPESGALLON_FAIL:
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

export const typesGallonReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TYPESGALLON_REQUEST:
    case DELETE_TYPESGALLON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_TYPESGALLON_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_TYPESGALLON_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_TYPESGALLON_FAIL:
    case DELETE_TYPESGALLON_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_TYPESGALLON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_TYPESGALLON_RESET:
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

export const singleTypeOfGallonReducer = (
  state = { typeofgallondetails: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_TYPESGALLON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_TYPESGALLON_SUCCESS:
      return {
        ...state,
        loading: false,
        typeofgallondetails: action.payload,
      };
    case SINGLE_TYPESGALLON_RESET:
      return {
        ...state,
        typeofgallondetails: false,
      };

    case SINGLE_TYPESGALLON_FAIL:
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
