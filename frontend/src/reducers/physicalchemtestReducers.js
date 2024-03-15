import {
    CREATE_PHYSICALCHEMTEST_REQUEST,
    CREATE_PHYSICALCHEMTEST_SUCCESS,
    CREATE_PHYSICALCHEMTEST_RESET,
    CREATE_PHYSICALCHEMTEST_FAIL,
    CLEAR_ERRORS,
    ALL_PHYSICALCHEMTEST_REQUEST,
    ALL_PHYSICALCHEMTEST_SUCCESS,
    ALL_PHYSICALCHEMTEST_FAIL,
    ALL_PHYSICALCHEMTEST_RESET,
    SINGLE_PHYSICALCHEMTEST_REQUEST,
    SINGLE_PHYSICALCHEMTEST_SUCCESS,
    SINGLE_PHYSICALCHEMTEST_RESET,
    SINGLE_PHYSICALCHEMTEST_FAIL,
    UPDATE_PHYSICALCHEMTEST_REQUEST,
    UPDATE_PHYSICALCHEMTEST_SUCCESS,
    UPDATE_PHYSICALCHEMTEST_FAIL,
    UPDATE_PHYSICALCHEMTEST_RESET,
    DELETE_PHYSICALCHEMTEST_REQUEST,
    DELETE_PHYSICALCHEMTEST_SUCCESS,
    DELETE_PHYSICALCHEMTEST_FAIL,
    DELETE_PHYSICALCHEMTEST_RESET,
  } from "../constants/physicalchemtestConstants";
  
  export const newPhysicalChemTestReducer = (
    state = { physicalchemtest: {}, physicalchemtestcreated: false },
    action
  ) => {
    switch (action.type) {
      case CREATE_PHYSICALCHEMTEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_PHYSICALCHEMTEST_SUCCESS:
        return {
          ...state,
          loading: false,
          physicalchemtestcreated: true,
          physicalchemtest: action.payload,
        };
  
      case CREATE_PHYSICALCHEMTEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CREATE_PHYSICALCHEMTEST_RESET:
        return {
          ...state,
          physicalchemtestcreated: false,
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
  
  export const allPhysicalChemTestReducer = (
    state = { physicalchemtest: [] },
    action
  ) => {
    switch (action.type) {
      case ALL_PHYSICALCHEMTEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ALL_PHYSICALCHEMTEST_SUCCESS:
        return {
          ...state,
          loading: false,
          physicalchemtest: action.payload,
        };
      case ALL_PHYSICALCHEMTEST_RESET:
        return {
          ...state,
          physicalchemtest: false,
        };
  
      case ALL_PHYSICALCHEMTEST_FAIL:
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
  
  export const singlePhysicalChemTestReducer = (
    state = { physicalchemtestdetails: [] },
    action
  ) => {
    switch (action.type) {
      case SINGLE_PHYSICALCHEMTEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case SINGLE_PHYSICALCHEMTEST_SUCCESS:
        return {
          ...state,
          loading: false,
          physicalchemtestdetails: action.payload,
        };
      case SINGLE_PHYSICALCHEMTEST_RESET:
        return {
          ...state,
          physicalchemtestdetails: false,
        };
  
      case SINGLE_PHYSICALCHEMTEST_FAIL:
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
  
  export const physicalchemTestReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PHYSICALCHEMTEST_REQUEST:
      case DELETE_PHYSICALCHEMTEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_PHYSICALCHEMTEST_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case UPDATE_PHYSICALCHEMTEST_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case UPDATE_PHYSICALCHEMTEST_FAIL:
      case DELETE_PHYSICALCHEMTEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case DELETE_PHYSICALCHEMTEST_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_PHYSICALCHEMTEST_RESET:
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
  
  