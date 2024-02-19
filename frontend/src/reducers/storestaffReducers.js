import {
  CREATE_STORESTAFF_REQUEST,
  CREATE_STORESTAFF_SUCCESS,
  CREATE_STORESTAFF_RESET,
  CREATE_STORESTAFF_FAIL,
  CLEAR_ERRORS,
  ALL_STORESTAFF_REQUEST,
  ALL_STORESTAFF_SUCCESS,
  ALL_STORESTAFF_FAIL,
  ALL_STORESTAFF_RESET,
  SINGLE_STORESTAFF_REQUEST,
  SINGLE_STORESTAFF_SUCCESS,
  SINGLE_STORESTAFF_FAIL,
  SINGLE_STORESTAFF_RESET,
  DELETE_STORESTAFF_REQUEST,
  DELETE_STORESTAFF_SUCCESS,
  DELETE_STORESTAFF_RESET,
  DELETE_STORESTAFF_FAIL,
} from "../constants/storestaffConstants";

export const newStorestaffReducer = (
  state = { storestaff: {}, storestaffcreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_STORESTAFF_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_STORESTAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        storestaffcreated: true,
        storestaff: action.payload,
      };

    case CREATE_STORESTAFF_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_STORESTAFF_RESET:
      return {
        ...state,
        storestaffcreated: false,
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

export const allStoreStaffReducer = (state = { storeStaff: [] }, action) => {
  switch (action.type) {
    case ALL_STORESTAFF_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_STORESTAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        storeStaff: action.payload,
      };
    case ALL_STORESTAFF_RESET:
      return {
        ...state,
        storeStaff: false,
      };

    case ALL_STORESTAFF_FAIL:
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

export const singleStoreStaffReducer = (
  state = { storeStaffdetails: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_STORESTAFF_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_STORESTAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        storeStaffdetails: action.payload,
      };
    case SINGLE_STORESTAFF_RESET:
      return {
        ...state,
        storeStaffdetails: false,
      };

    case SINGLE_STORESTAFF_FAIL:
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

export const StoreStaffReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_STORESTAFF_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_STORESTAFF_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_STORESTAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeletedStoreStaff: action.payload,
      };
    case DELETE_STORESTAFF_RESET:
      return {
        ...state,
        isDeletedStoreStaff: false,
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
