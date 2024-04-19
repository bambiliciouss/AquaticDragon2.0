import { SINGLE_ADDRESS_SUCCESS } from "constants/addressConstants";
import {
    ALL_STORE_SALES_REQUEST,
    ALL_STORE_SALES_SUCCESS,
    ALL_STORE_SALES_FAIL,
    
    SINGLE_STORE_BRANCH_SUCCESS,    
    
    ALL_STAFF_REQUEST,
    ALL_STAFF_SUCCESS,
    ALL_STAFF_FAIL,

    ALL_CUSTOMER_REQUEST,
    ALL_CUSTOMER_SUCCESS,
    ALL_CUSTOMER_FAIL,

    SALES_WALKIN_REQUEST,
    SALES_WALKIN_SUCCESS, 
    SALES_WALKIN_FAIL,

    SALES_ORDER_REQUEST,
    SALES_ORDER_SUCCESS,
    SALES_ORDER_FAIL,
    
    ALL_ORDER_TRANSACTIONS_REQUEST,
    ALL_ORDER_TRANSACTIONS_SUCCESS,
    ALL_ORDER_TRANSACTIONS_FAIL,

    ALL_ORDER_GALLON_TYPE_REQUEST,
    ALL_ORDER_GALLON_TYPE_SUCCESS,
    ALL_ORDER_GALLON_TYPE_FAIL,

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
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
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
import axios from 'axios'

export const getAllUserReviewsByBranch = (id, month='1', year='2024') => async (dispatch) => {
    try {
        dispatch({ type: GET_ADMIN_REVIEW_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/reviews/${id}/?month=${month}&year=${year}`);
        dispatch({
            type: GET_ADMIN_REVIEW_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: GET_ADMIN_REVIEW_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }

}

export const updateSingleReview = (id, reviewData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REVIEW_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/user/review/${id}`, reviewData, config);
        dispatch({
            type: UPDATE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_REVIEW_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }


}
export const getSingleReview = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_REVIEW_REQUEST });
        const { data } = await axios.get(`/api/v1/user/review/${id}`);
        dispatch({
            type: GET_SINGLE_REVIEW_SUCCESS,
            payload: data.review,
        });
        
    } catch (error) {
        dispatch({
            type: GET_SINGLE_REVIEW_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }

}
export const createReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`/api/v1/create/review`, reviewData, config);
        dispatch({
            type: CREATE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }

}

export const  getUserReviews = (id, order) => async (dispatch) => {
    try {
        dispatch({ type: GET_REVIEW_REQUEST });
        const { data } = await axios.get(`/api/v1/user/reviews/${id}/${order}`);
        dispatch({
            type: GET_REVIEW_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: GET_REVIEW_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}
export const deleteReview = (comment) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });
        const { data } = await axios.delete(`/api/v1/user/review/${comment}`);
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }

}
export const allStoreSalesAction = (id, filter="") => async (dispatch) => {
    try {
        dispatch({ type: ALL_STORE_SALES_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/all/store/sales/${id}/?filter=${filter}`);
        dispatch({
            type: ALL_STORE_SALES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_STORE_SALES_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
};

export const getSalesOrderByBranch = (id) => async (dispatch) => {
    try {
        dispatch({ type: SALES_ORDER_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/all/sales/order/${id}`);
        dispatch({
            type: SALES_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SALES_ORDER_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}
export const getSalesOrderByBranchEmployee = (id) => async (dispatch) => {
    try {
        dispatch({ type: EMPLOYEE_ORDER_SALES_REQUEST });
        const { data } = await axios.get(`/api/v1/employee/all/sales/order/${id}`);
        dispatch({
            type: EMPLOYEE_ORDER_SALES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EMPLOYEE_ORDER_SALES_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const getSalesOrderByBarangay = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDER_BARANGAY_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/orders/byBarangay/${id}`);
        dispatch({
            type: ALL_ORDER_BARANGAY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDER_BARANGAY_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const setBranchID = (id) => async (dispatch) => {
    dispatch({
        type: SINGLE_STORE_BRANCH_SUCCESS,
        payload: id,
    });
};
export const getSingleBranchUsers = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CUSTOMER_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/store/customer/${id}`);
        dispatch({
          type: ALL_CUSTOMER_SUCCESS,
          payload: data.usersWithTransactions,
        });
      } catch (error) {
        dispatch({
          type: ALL_CUSTOMER_FAIL,
          payload: error.response.data.message,
        });
      }
}
export const getAllStaff = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_STAFF_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/store/staff/${id}`);
        dispatch({
          type: ALL_STAFF_SUCCESS,
          payload: data.users,
        });
      } catch (error) {
        dispatch({
          type: ALL_STAFF_FAIL,
          payload: error.response.data.message,
        });
      }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

export const getSalesWalkin = () => async (dispatch)=>{
    try {
        dispatch({ type: SALES_WALKIN_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/sales/othergallon/inventory`);
        
        dispatch({
            type: SALES_WALKIN_SUCCESS,
            payload: data.totalSalesByBranch,
        });
    } catch (error) {
        dispatch({
            type: SALES_WALKIN_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const getOrderTransactions = (id,filter='') => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDER_TRANSACTIONS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/all/orders/${id}/?filter=${filter}`);
        dispatch({
            type: ALL_ORDER_TRANSACTIONS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDER_TRANSACTIONS_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const getOrderByGallonType = (id, filter='') => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDER_GALLON_TYPE_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/orders/byGallon/${id}/?filter=${filter}`);
        dispatch({
            type: ALL_ORDER_GALLON_TYPE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDER_GALLON_TYPE_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const getStaffPerformance = (id, month='1', year='2024') => async (dispatch) => {
    try {
        dispatch({ type: STAFF_PERFORMANCE_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/orders/staff/${id}/?month=${month}&year=${year}`);
        dispatch({
            type: STAFF_PERFORMANCE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: STAFF_PERFORMANCE_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const getCurrentBranchSales = (id, filter="today") => async (dispatch) => {
    try {
        dispatch({ type: CURRENT_STORE_SALES_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/all/current/sales/${id}/?filter=${filter}`);
        dispatch({
            type: CURRENT_STORE_SALES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CURRENT_STORE_SALES_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}

export const getEmployeeBranch = (id) => async (dispatch) => {
    try {
        dispatch({ type: EMPLOYEE_BRANCH_REQUEST });
        const { data } = await axios.get(`/api/v1/employee/branch/${id}`);
        dispatch({
            type: EMPLOYEE_BRANCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EMPLOYEE_BRANCH_FAIL,
            payload: error.response
                ? error.response.data.message
                : "Unknown error occurred",
        });
    }
}