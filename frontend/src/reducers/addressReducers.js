import {
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAIL,
  CREATE_ADDRESS_RESET,
  CLEAR_ERRORS,
  ALL_ADDRESS_REQUEST,
  ALL_ADDRESS_SUCCESS,
  ALL_ADDRESS_FAIL,
  ALL_ADDRESS_RESET,
  SINGLE_ADDRESS_REQUEST,
  SINGLE_ADDRESS_SUCCESS,
  SINGLE_ADDRESS_FAIL,
  SINGLE_ADDRESS_RESET,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
  UPDATE_ADDRESS_RESET,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_RESET,
  SET_ADDRESS_REQUEST,
  SET_ADDRESS_SUCCESS,
  SET_ADDRESS_FAIL,
  SET_ADDRESS_RESET,
} from "../constants/addressConstants";

export const newAddressReducer = (
  state = { address: {}, addresscreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresscreated: true,
        address: action.payload,
      };

    case CREATE_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_ADDRESS_RESET:
      return {
        ...state,
        addresscreated: false,
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

export const allAddressReducer = (state = { useraddress: [] }, action) => {
  switch (action.type) {
    case ALL_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        useraddress: action.payload,
      };
    case ALL_ADDRESS_RESET:
      return {
        ...state,
        useraddress: false,
      };

    case ALL_ADDRESS_FAIL:
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

export const singleAddressReducer = (
  state = { addressdetails: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addressdetails: action.payload,
      };
    case SINGLE_ADDRESS_RESET:
      return {
        ...state,
        addressdetails: false,
      };

    case SINGLE_ADDRESS_FAIL:
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

export const addressReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS_REQUEST:
    case DELETE_ADDRESS_REQUEST:
    case SET_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

      case SET_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          isDefault: action.payload,
        };
  

    case UPDATE_ADDRESS_RESET:
      return {
        ...state,
        isUpdated: false,
      };

      case SET_ADDRESS_RESET:
        return {
          ...state,
          isDefault: false,
        };

    case UPDATE_ADDRESS_FAIL:
    case DELETE_ADDRESS_FAIL:
      case SET_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_ADDRESS_RESET:
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
