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
      case DELETE_TYPESGALLON_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
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
  