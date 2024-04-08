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

export const adminSalesWalkinReducer = (state = { sales: [] }, action) => {
    switch(action.type){
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
}

export const adminOrderTransactionsReducer = (state = { transactions: [] }, action) => {
    switch(action.type){
        case ALL_ORDER_TRANSACTIONS_REQUEST:
            return {
                loading: true,
                transactions: [],
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
}

export const adminOrderGallonTypeReducer = (state = { gallons: [] }, action) => {
    switch(action.type){
        case ALL_ORDER_GALLON_TYPE_REQUEST:
            return {
                loading: true,
                gallons: [],
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
}