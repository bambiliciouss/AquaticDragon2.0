import {
    CREATE_BUSINESSPERMIT_REQUEST,
    CREATE_BUSINESSPERMIT_SUCCESS,
    CREATE_BUSINESSPERMIT_RESET,
    CREATE_BUSINESSPERMIT_FAIL,
    CLEAR_ERRORS,
    ALL_BUSINESSPERMIT_REQUEST,
    ALL_BUSINESSPERMIT_SUCCESS,
    ALL_BUSINESSPERMIT_FAIL,
    ALL_BUSINESSPERMIT_RESET,
    SINGLE_BUSINESSPERMIT_REQUEST,
    SINGLE_BUSINESSPERMIT_SUCCESS,
    SINGLE_BUSINESSPERMIT_RESET,
    SINGLE_BUSINESSPERMIT_FAIL,
    UPDATE_BUSINESSPERMIT_REQUEST,
    UPDATE_BUSINESSPERMIT_SUCCESS,
    UPDATE_BUSINESSPERMIT_FAIL,
    UPDATE_BUSINESSPERMIT_RESET,
    DELETE_BUSINESSPERMIT_REQUEST,
    DELETE_BUSINESSPERMIT_SUCCESS,
    DELETE_BUSINESSPERMIT_FAIL,
    DELETE_BUSINESSPERMIT_RESET,
  } from "../constants/businesspermitConstant";
  
  export const newBusinessPermitReducer = (
    state = { businesspermit: {}, businesspermitcreated: false },
    action
  ) => {
    switch (action.type) {
      case CREATE_BUSINESSPERMIT_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_BUSINESSPERMIT_SUCCESS:
        return {
          ...state,
          loading: false,
          businesspermitcreated: true,
          businesspermit: action.payload,
        };
  
      case CREATE_BUSINESSPERMIT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CREATE_BUSINESSPERMIT_RESET:
        return {
          ...state,
          businesspermitcreated: false,
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
  
  export const allBusinessPermitReducer = (
    state = { businesspermit: [] },
    action
  ) => {
    switch (action.type) {
      case ALL_BUSINESSPERMIT_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ALL_BUSINESSPERMIT_SUCCESS:
        return {
          ...state,
          loading: false,
          businesspermit: action.payload,
        };
      case ALL_BUSINESSPERMIT_RESET:
        return {
          ...state,
          businesspermit: false,
        };
  
      case ALL_BUSINESSPERMIT_FAIL:
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
  
  export const singleBusinessPermitReducer = (
    state = { businesspermitdetails: [] },
    action
  ) => {
    switch (action.type) {
      case SINGLE_BUSINESSPERMIT_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case SINGLE_BUSINESSPERMIT_SUCCESS:
        return {
          ...state,
          loading: false,
          businesspermitdetails: action.payload,
        };
      case SINGLE_BUSINESSPERMIT_RESET:
        return {
          ...state,
          businesspermitdetails: false,
        };
  
      case SINGLE_BUSINESSPERMIT_FAIL:
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
  
  export const businessPermitReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_BUSINESSPERMIT_REQUEST:
      case DELETE_BUSINESSPERMIT_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_BUSINESSPERMIT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case UPDATE_BUSINESSPERMIT_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case UPDATE_BUSINESSPERMIT_FAIL:
      case DELETE_BUSINESSPERMIT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case DELETE_BUSINESSPERMIT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_BUSINESSPERMIT_RESET:
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
  
  