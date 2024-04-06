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

export const adminSingleStoreReducer = (state = { branch: null }, action) => {
    switch(action.type){
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
}

export const adminStaffReducer = (state = { users: [] }, action) => { 
    switch(action.type){
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
}

export const adminUsersReducer = (state = { users: [] }, action) => {
    switch(action.type){
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
}