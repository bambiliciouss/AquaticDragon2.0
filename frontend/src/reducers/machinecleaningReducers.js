import {
  CREATE_MACHINECLEANING_REQUEST,
  CREATE_MACHINECLEANING_SUCCESS,
  CREATE_MACHINECLEANING_RESET,
  CREATE_MACHINECLEANING_FAIL,
  CLEAR_ERRORS,
  ALL_MACHINECLEANING_REQUEST,
  ALL_MACHINECLEANING_SUCCESS,
  ALL_MACHINECLEANING_FAIL,
  ALL_MACHINECLEANING_RESET,
  SINGLE_MACHINECLEANING_REQUEST,
  SINGLE_MACHINECLEANING_SUCCESS,
  SINGLE_MACHINECLEANING_RESET,
  SINGLE_MACHINECLEANING_FAIL,
  UPDATE_MACHINECLEANING_REQUEST,
  UPDATE_MACHINECLEANING_SUCCESS,
  UPDATE_MACHINECLEANING_FAIL,
  UPDATE_MACHINECLEANING_RESET,
  DELETE_MACHINECLEANING_REQUEST,
  DELETE_MACHINECLEANING_SUCCESS,
  DELETE_MACHINECLEANING_FAIL,
  DELETE_MACHINECLEANING_RESET,
} from "../constants/machinecleaningConstants";

export const newMachineCleaningReducer = (
  state = { machinecleaning: {}, machinecleaningcreated: false },
  action
) => {
  switch (action.type) {
    case CREATE_MACHINECLEANING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_MACHINECLEANING_SUCCESS:
      return {
        ...state,
        loading: false,
        machinecleaningcreated: true,
        machinecleaning: action.payload,
      };

    case CREATE_MACHINECLEANING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_MACHINECLEANING_RESET:
      return {
        ...state,
        machinecleaningcreated: false,
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

export const allMachineCleaningReducer = (
  state = { machinecleaning: [] },
  action
) => {
  switch (action.type) {
    case ALL_MACHINECLEANING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_MACHINECLEANING_SUCCESS:
      return {
        ...state,
        loading: false,
        machinecleaning: action.payload,
      };
    case ALL_MACHINECLEANING_RESET:
      return {
        ...state,
        machinecleaning: false,
      };

    case ALL_MACHINECLEANING_FAIL:
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

export const singleMachineCleaningReducer = (
  state = { machinecleaningdetails: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_MACHINECLEANING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_MACHINECLEANING_SUCCESS:
      return {
        ...state,
        loading: false,
        machinecleaningdetails: action.payload,
      };
    case SINGLE_MACHINECLEANING_RESET:
      return {
        ...state,
        machinecleaningdetails: [],
      };

    case SINGLE_MACHINECLEANING_FAIL:
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

export const machineCleaningReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MACHINECLEANING_REQUEST:
    case DELETE_MACHINECLEANING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_MACHINECLEANING_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_MACHINECLEANING_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_MACHINECLEANING_FAIL:
    case DELETE_MACHINECLEANING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_MACHINECLEANING_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_MACHINECLEANING_RESET:
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

// export const machineCleaningReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_MACHINECLEANING_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };

//     case UPDATE_MACHINECLEANING_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };

//     case UPDATE_MACHINECLEANING_RESET:
//       return {
//         ...state,
//         isUpdated: false,
//       };

//     case UPDATE_MACHINECLEANING_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
