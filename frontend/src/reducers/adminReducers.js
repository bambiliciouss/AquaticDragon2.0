import {
  ALL_STORE_SALES_REQUEST,
  ALL_STORE_SALES_SUCCESS,
  ALL_STORE_SALES_FAIL,
  SINGLE_STORE_BRANCH_REQUEST,
  SINGLE_STORE_BRANCH_SUCCESS,
  SINGLE_STORE_BRANCH_FAIL,
  ALL_STAFF_REQUEST,
  ALL_STAFF_SUCCESS,
  ALL_STAFF_FAIL,
  ALL_CUSTOMER_REQUEST,
  ALL_CUSTOMER_SUCCESS,
  ALL_CUSTOMER_FAIL,
  SALES_WALKIN_REQUEST,
  SALES_WALKIN_SUCCESS,
  SALES_WALKIN_FAIL,
  ALL_ORDER_TRANSACTIONS_REQUEST,
  ALL_ORDER_TRANSACTIONS_SUCCESS,
  ALL_ORDER_TRANSACTIONS_FAIL,
  ALL_ORDER_GALLON_TYPE_REQUEST,
  ALL_ORDER_GALLON_TYPE_SUCCESS,
  ALL_ORDER_GALLON_TYPE_FAIL,
  SALES_ORDER_REQUEST,
  SALES_ORDER_SUCCESS,
  SALES_ORDER_FAIL,
  ALL_ORDER_BARANGAY_REQUEST,
  ALL_ORDER_BARANGAY_SUCCESS,
  ALL_ORDER_BARANGAY_FAIL,
  STAFF_PERFORMANCE_REQUEST,
  STAFF_PERFORMANCE_SUCCESS,
  STAFF_PERFORMANCE_FAIL,
  CURRENT_STORE_SALES_REQUEST,
  CURRENT_STORE_SALES_SUCCESS,
  CURRENT_STORE_SALES_FAIL,
  EMPLOYEE_BRANCH_REQUEST,
  EMPLOYEE_BRANCH_SUCCESS,
  EMPLOYEE_BRANCH_FAIL,
  EMPLOYEE_ORDER_SALES_REQUEST,
  EMPLOYEE_ORDER_SALES_SUCCESS,
  EMPLOYEE_ORDER_SALES_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAIL,
  UPDATE_REVIEW_RESET,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  GET_SINGLE_REVIEW_REQUEST,
  GET_SINGLE_REVIEW_SUCCESS,
  GET_SINGLE_REVIEW_FAIL,
  GET_ADMIN_REVIEW_REQUEST,
  GET_ADMIN_REVIEW_SUCCESS,
  GET_ADMIN_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/adminConstants";

export const adminReviewReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case GET_ADMIN_REVIEW_REQUEST:
        return {
            loading: true,
            reviews: [],
        };
        case GET_ADMIN_REVIEW_SUCCESS:
        return {
            loading: false,
            reviews: action.payload,
        };
        case GET_ADMIN_REVIEW_FAIL:
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
    
}

export const reviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
    case UPDATE_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
    case GET_REVIEW_REQUEST:
      return {
        loading: true,
        reviews: [],
      };
    case GET_SINGLE_REVIEW_REQUEST:
      return {
        loading: true,
        singleReviews: {},
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case GET_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case GET_SINGLE_REVIEW_SUCCESS:
      return {
        loading: false,
        singleReviews: action.payload,
      };
    case CREATE_REVIEW_FAIL:
    case UPDATE_REVIEW_FAIL:
    case DELETE_REVIEW_FAIL:
    case GET_REVIEW_FAIL:
    case GET_SINGLE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_REVIEW_RESET:
      return {
        loading: false,
        isUpdated: false,
      };
    case DELETE_REVIEW_RESET:
      return {
        loading: false,
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

export const allStoreSalesReducer = (state = { sales: [] }, action) => {
  switch (action.type) {
    case ALL_STORE_SALES_REQUEST:
      return {
        loading: true,
        sales: [],
      };
    case ALL_STORE_SALES_SUCCESS:
      return {
        loading: false,
        sales: action.payload,
      };
    case ALL_STORE_SALES_FAIL:
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

export const adminSingleStoreReducer = (state = { branch: null }, action) => {
  switch (action.type) {
    case SINGLE_STORE_BRANCH_REQUEST:
      return {
        loading: true,
        branch: null,
      };
    case SINGLE_STORE_BRANCH_SUCCESS:
      return {
        loading: false,
        branch: action.payload,
      };
    case SINGLE_STORE_BRANCH_FAIL:
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

export const adminStaffReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_STAFF_REQUEST:
      return {
        loading: true,
        users: [],
      };
    case ALL_STAFF_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case ALL_STAFF_FAIL:
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

export const adminUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_CUSTOMER_REQUEST:
      return {
        loading: true,
        users: [],
      };
    case ALL_CUSTOMER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case ALL_CUSTOMER_FAIL:
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

export const adminSalesWalkinReducer = (state = { sales: [] }, action) => {
  switch (action.type) {
    case SALES_WALKIN_REQUEST:
      return {
        loading: true,
        sales: [],
      };
    case SALES_WALKIN_SUCCESS:
      return {
        loading: false,
        sales: action.payload,
      };
    case SALES_WALKIN_FAIL:
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

export const adminSalesOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case SALES_ORDER_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case SALES_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case SALES_ORDER_FAIL:
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

export const adminSalesBarangayReducer = (state = { orders: {} }, action) => {
  switch (action.type) {
    case ALL_ORDER_BARANGAY_REQUEST:
      return {
        loading: true,
        orders: {},
      };
    case ALL_ORDER_BARANGAY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ALL_ORDER_BARANGAY_FAIL:
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

export const adminOrderTransactionsReducer = (
  state = { transactions: {} },
  action
) => {
  switch (action.type) {
    case ALL_ORDER_TRANSACTIONS_REQUEST:
      return {
        loading: true,
        transactions: {},
      };
    case ALL_ORDER_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        transactions: action.payload,
      };
    case ALL_ORDER_TRANSACTIONS_FAIL:
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

export const adminOrderGallonTypeReducer = (
  state = { gallons: {} },
  action
) => {
  switch (action.type) {
    case ALL_ORDER_GALLON_TYPE_REQUEST:
      return {
        loading: true,
        gallons: {},
      };
    case ALL_ORDER_GALLON_TYPE_SUCCESS:
      return {
        loading: false,
        gallons: action.payload,
      };
    case ALL_ORDER_GALLON_TYPE_FAIL:
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

export const adminStaffPerformanceReducer = (
  state = { performance: [] },
  action
) => {
  switch (action.type) {
    case STAFF_PERFORMANCE_REQUEST:
      return {
        loading: true,
        performance: [],
      };
    case STAFF_PERFORMANCE_SUCCESS:
      return {
        loading: false,
        performance: action.payload,
      };
    case STAFF_PERFORMANCE_FAIL:
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

export const adminCurrentBranchSalesReducer = (
  state = { sales: {} },
  action
) => {
  switch (action.type) {
    case CURRENT_STORE_SALES_REQUEST:
      return {
        loading: true,
        sales: {},
      };
    case CURRENT_STORE_SALES_SUCCESS:
      return {
        loading: false,
        sales: action.payload,
      };
    case CURRENT_STORE_SALES_FAIL:
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

export const employeeBranchReducer = (state = { branches: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_BRANCH_REQUEST:
      return {
        loading: true,
        branches: {},
      };
    case EMPLOYEE_BRANCH_SUCCESS:
      return {
        loading: false,
        branches: action.payload,
      };
    case EMPLOYEE_BRANCH_FAIL:
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

export const employeeOrderSalesReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case EMPLOYEE_ORDER_SALES_REQUEST:
      return {
        loading: true,
        orders: [],
      };
    case EMPLOYEE_ORDER_SALES_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case EMPLOYEE_ORDER_SALES_FAIL:
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
