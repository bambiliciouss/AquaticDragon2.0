import {
  ALL_SUPERADMIN_USERS_REQUEST,
  ALL_SUPERADMIN_USERS_SUCCESS,
  ALL_SUPERADMIN_USERS_FAIL,
  ALL_SUPERADMIN_USERS_RESET,
  ALL_SUPERADMIN_PENDINGADMIN_REQUEST,
  ALL_SUPERADMIN_PENDINGADMIN_SUCCESS,
  ALL_SUPERADMIN_PENDINGADMIN_FAIL,
  ALL_SUPERADMIN_PENDINGADMIN_RESET,
  ALL_SUPERADMIN_ADMIN_REQUEST,
  ALL_SUPERADMIN_ADMIN_SUCCESS,
  ALL_SUPERADMIN_ADMIN_FAIL,
  ALL_SUPERADMIN_ADMIN_RESET,
  ALL_SUPERADMIN_ADMINSTOREBRANCH_REQUEST,
  ALL_SUPERADMIN_ADMINSTOREBRANCH_SUCCESS,
  ALL_SUPERADMIN_ADMINSTOREBRANCH_FAIL,
  ALL_SUPERADMIN_ADMINSTOREBRANCH_RESET,
  ALL_SUPERADMIN_ADMINAPPROVAL_REQUEST,
  ALL_SUPERADMIN_ADMINAPPROVAL_SUCCESS,
  ALL_SUPERADMIN_ADMINAPPROVAL_FAIL,
  ALL_SUPERADMIN_ADMINAPPROVAL_RESET,
  CLEAR_ERRORS,
} from "../constants/superadminConstants";

export const allUsersSAReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_SUPERADMIN_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_SUPERADMIN_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_SUPERADMIN_USERS_FAIL:
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

export const allPendingAdminSAReducer = (state = { pusers: [] }, action) => {
  switch (action.type) {
    case ALL_SUPERADMIN_PENDINGADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_SUPERADMIN_PENDINGADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        pusers: action.payload,
      };

    case ALL_SUPERADMIN_PENDINGADMIN_FAIL:
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

export const adminApprovalReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_SUPERADMIN_ADMINAPPROVAL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_SUPERADMIN_ADMINAPPROVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case ALL_SUPERADMIN_ADMINAPPROVAL_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case ALL_SUPERADMIN_ADMINAPPROVAL_FAIL:
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

export const allAdminSAReducer = (state = { ausers: [] }, action) => {
  switch (action.type) {
    case ALL_SUPERADMIN_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_SUPERADMIN_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        ausers: action.payload,
      };

    case ALL_SUPERADMIN_ADMIN_FAIL:
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
