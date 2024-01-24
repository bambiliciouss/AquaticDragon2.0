import {
  CREATE_GALLON_REQUEST,
  CREATE_GALLON_SUCCESS,
  CREATE_GALLON_FAIL,
  CREATE_GALLON_RESET,
  CLEAR_ERRORS,
  MY_GALLON_REQUEST,
  MY_GALLON_SUCCESS,
  MY_GALLON_FAIL,
  ALL_GALLONS_REQUEST,
  ALL_GALLONS_SUCCESS,
  ALL_GALLONS_FAIL,
  DELETE_GALLON_REQUEST,
  DELETE_GALLON_SUCCESS,
  DELETE_GALLON_RESET,
  DELETE_GALLON_FAIL,
} from "../constants/gallonConstants";

export const newGallonReducer = (
  state = { gallon: {}, galloncreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_GALLON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_GALLON_SUCCESS:
      return {
        ...state,
        loading: false,
        galloncreated: true,
        gallon: action.payload,
      };

    case CREATE_GALLON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_GALLON_RESET:
      return {
        ...state,
        galloncreated: false,
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

export const myGallonReducer = (state = { gallon: [] }, action) => {
  switch (action.type) {
    case MY_GALLON_REQUEST:
      return {
        loading: true,
      };

    case MY_GALLON_SUCCESS:
      return {
        loading: false,
        gallon: action.payload,
      };

    case MY_GALLON_FAIL:
      return {
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

export const allGallonsReducer = (state = { gallons: [] }, action) => {
  switch (action.type) {
    case ALL_GALLONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_GALLONS_SUCCESS:
      return {
        ...state,
        loading: false,
        gallons: action.payload,
      };

    case ALL_GALLONS_FAIL:
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

export const gallonReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_GALLON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_GALLON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_GALLON_SUCCESS:
      return {
        ...state,

        loading: false,

        isDeleted: action.payload,
      };
    case DELETE_GALLON_RESET:
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
