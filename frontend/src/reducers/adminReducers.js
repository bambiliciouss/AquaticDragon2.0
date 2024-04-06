import {
    ALL_STORE_SALES_REQUEST,
    ALL_STORE_SALES_SUCCESS,
    ALL_STORE_SALES_FAIL,
    CLEAR_ERRORS,
} from '../constants/adminConstants';

export const allStoreSalesReducer = (state = { sales: [] }, action) => {
    switch(action.type){
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
}