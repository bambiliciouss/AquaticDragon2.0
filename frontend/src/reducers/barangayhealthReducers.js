import {
  CREATE_BARANGAYHEALTH_REQUEST,
  CREATE_BARANGAYHEALTH_SUCCESS,
  CREATE_BARANGAYHEALTH_FAIL,
  CREATE_BARANGAYHEALTH_RESET,
  CLEAR_ERRORS,
} from "../constants/barangayHealthConstants";

export const newBarangayHealthReducer = (
  state = { barangayhealth: {}, barangayhealthcreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_BARANGAYHEALTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BARANGAYHEALTH_SUCCESS:
      return {
        ...state,
        loading: false,
        barangayhealthcreated: true,
        barangayhealth: action.payload,
      };

    case CREATE_BARANGAYHEALTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_BARANGAYHEALTH_RESET:
      return {
        ...state,
        barangayhealthcreated: false,
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
