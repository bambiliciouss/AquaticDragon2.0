import {
    ALL_STORE_SALES_REQUEST,
    ALL_STORE_SALES_SUCCESS,
    ALL_STORE_SALES_FAIL,
    CLEAR_ERRORS,
} from "../constants/adminConstants";
import axios from 'axios'
export const allStoreSalesAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_STORE_SALES_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/all/store/sales/${id}`);
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

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};