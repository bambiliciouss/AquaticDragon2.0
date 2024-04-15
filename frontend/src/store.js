import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  allStaffReducer,
} from "./reducers/userReducers";

import {
  newGallonReducer,
  myGallonReducer,
  allGallonsReducer,
  gallonReducer,
} from "./reducers/gallonReducers";

import {
  newStoreBranchReducer,
  allStoreBranchReducer,
  storeBranchReducer,
  storeDetailsReducer,
} from "./reducers/storebranchReducers";

import {
  newOrderReducer,
  myOrdersReducer,
  allOrdersReducer,
  orderDetailsReducer,
  orderReducer,
  allOrdersStaffReducer
} from "reducers/orderReducers";

import { cartReducer, cartProductReducer } from "reducers/cartReducers";

import {
  newStorestaffReducer,
  allStoreStaffReducer,
  singleStoreStaffReducer,
  StoreStaffReducer,
} from "reducers/storestaffReducers";

import {
  newTypesGallonReducer,
  allTypesGallonReducer,
  typesGallonReducer,
  singleTypeOfGallonReducer,
} from "./reducers/typesgallonReducers";

import {
  newMachineCleaningReducer,
  allMachineCleaningReducer,
  singleMachineCleaningReducer,
  machineCleaningReducer,
} from "reducers/machinecleaningReducers";

import {
  newBarangayHealthReducer,
  allBarangayHealthReducer,
  singleBarangayHealthReducer,
  barangayHealthReducer,
} from "reducers/barangayhealthReducers";

import {
  newAddressReducer,
  allAddressReducer,
  singleAddressReducer,
  addressReducer,
} from "reducers/addressReducers";

import {
  newWalkinPosReducer,
  allWalkinPosReducer,
  singleWalkinPosReducer,
  walkinPosReducer,
} from "reducers/walkinPOSReducer";

import {
  newProductReducer,
  allProductsReducer,
  allProductsStockLogsReducer,
  ProductsStockLogsReducer,
  singleProductsReducer,
  ProductDetailsReducer,
} from "reducers/productReducers";

import {
  newPhysicalChemTestReducer,
  allPhysicalChemTestReducer,
  singlePhysicalChemTestReducer,
  physicalchemTestReducer,
} from "reducers/physicalchemtestReducers";

import {
  newBusinessPermitReducer,
  allBusinessPermitReducer,
  singleBusinessPermitReducer,
  businessPermitReducer,
} from "reducers/businesspermitReducers";

import {
  newStorebarangayReducer,
  allStorebarangayReducer,
  singleStorebarangayReducer,
  storebarangayReducer,
} from "reducers/storebarangayReducers";

import {
  allStoreSalesReducer,
  adminSingleStoreReducer,
  adminSalesWalkinReducer,
  adminStaffReducer,
  adminUsersReducer,
  adminOrderTransactionsReducer,
  adminOrderGallonTypeReducer,
  adminSalesOrderReducer,
  adminSalesBarangayReducer,
  adminStaffPerformanceReducer,
} from "reducers/adminReducers";



import {
  allUsersSAReducer,
  allPendingAdminSAReducer,
  adminApprovalReducer,
  allAdminSAReducer,
} from "reducers/superadminReducers";

const reducers = combineReducers({
  adminStoreSales: allStoreSalesReducer,
  adminStoreBranch: adminSingleStoreReducer,
  adminStoreStaff: adminStaffReducer,
  adminStoreCustomer: adminUsersReducer,
  adminSalesWalkin: adminSalesWalkinReducer,
  adminSalesOrder: adminSalesOrderReducer,
  adminOrderTransaction: adminOrderTransactionsReducer,
  adminOrderGallonType: adminOrderGallonTypeReducer,
  adminSalesBarangay: adminSalesBarangayReducer,
  adminStaffPerformance: adminStaffPerformanceReducer,

  
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  newGallon: newGallonReducer,
  myGallon: myGallonReducer,
  allUsers: allUsersReducer,
  allStaff: allStaffReducer,
  allGallons: allGallonsReducer,
  newStoreBranch: newStoreBranchReducer,
  allStoreBranch: allStoreBranchReducer,
  gallon: gallonReducer,
  storeBranch: storeBranchReducer,

  cart: cartReducer,
  cartProduct: cartProductReducer,

  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  allOrdersStaff:allOrdersStaffReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  userDetails: userDetailsReducer,
  storeDetails: storeDetailsReducer,

  newStorestaff: newStorestaffReducer,
  allStoreStaff: allStoreStaffReducer,
  singleStoreStaff: singleStoreStaffReducer,
  storeStaff: StoreStaffReducer,

  newTypesGallon: newTypesGallonReducer,
  allTypesGallon: allTypesGallonReducer,
  typesGallon: typesGallonReducer,
  singleTypeOfGallon: singleTypeOfGallonReducer,

  newMachineCleaning: newMachineCleaningReducer,
  allMachineCleaning: allMachineCleaningReducer,
  singleMachineCleaning: singleMachineCleaningReducer,
  machinerecord: machineCleaningReducer,

  newBarangayHealth: newBarangayHealthReducer,
  allBarangayHealth: allBarangayHealthReducer,
  singleBarangayHealth: singleBarangayHealthReducer,
  barangayHealthrecord: barangayHealthReducer,

  newAddress: newAddressReducer,
  allAddress: allAddressReducer,
  singleAddress: singleAddressReducer,
  addressrecord: addressReducer,

  newWalkinPos: newWalkinPosReducer,
  allWalkinPos: allWalkinPosReducer,
  singleWalkinPos: singleWalkinPosReducer,
  walkinPos: walkinPosReducer,

  newProduct: newProductReducer,
  allProducts: allProductsReducer,
  allProductsStockLogs: allProductsStockLogsReducer,
  productsStockLogs: ProductsStockLogsReducer,
  singleProduct: singleProductsReducer,
  productDetails: ProductDetailsReducer,

  newPhysicalChemTest: newPhysicalChemTestReducer,
  allPhysicalChemTest: allPhysicalChemTestReducer,
  singlePhysicalChemTest: singlePhysicalChemTestReducer,
  physicalchemtestrecord: physicalchemTestReducer,

  newBusinessPermit: newBusinessPermitReducer,
  allBusinessPermit: allBusinessPermitReducer,
  singleBusinessPermit: singleBusinessPermitReducer,
  businesspermitrecord: businessPermitReducer,

  newStorebarangay: newStorebarangayReducer,
  allStorebarangay: allStorebarangayReducer,
  singleStorebarangay: singleStorebarangayReducer,
  storebarangay: storebarangayReducer,

  allUsersSA: allUsersSAReducer,
  allPendingAdminSA: allPendingAdminSAReducer,
  adminApproval: adminApprovalReducer,
  allAdminSA: allAdminSAReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  cartProduct: {
    cartProductItems: localStorage.getItem("cartProductItems")
      ? JSON.parse(localStorage.getItem("cartProductItems"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
