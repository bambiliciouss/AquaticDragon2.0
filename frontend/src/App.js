import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import ProtectedRoute from "./components/route/ProtectedRoute";

import Login from "components/user/Login";
import Register from "components/user/Register";
import EmailVerification from "components/user/VerifyEmail";
import ForgotPassword from "components/user/ForgotPassword";
import NewPassword from "components/user/NewPassword";
import Profile from "components/user/Profile";
import UpdateProfile from "components/user/UpdateProfile";
import UpdatePassword from "components/user/UpdatePassword";

import AdminProfile from "components/admin/AdminProfile";
import AdminUpdatePassword from "components/admin/AdminUpdatePassword";
import AdminUpdateProfile from "components/admin/AdminUpdateProfile";

import MyQRCode from "components/user/MyQRCode";
import QRCodeDetails from "components/user/QRCodeDetails";

// import AdminRegistration from "components/admin/AdminRegistration";
import RegisterGallon from "components/gallon/RegisterGallon";
import MyGallon from "components/gallon/MyGallon";

import Dashboard from "components/admin/Dashboard";
import UserList from "components/admin/UserList";
import RiderList from "components/admin/RiderList";
import EmployeeList from "components/admin/EmployeeList";
import GallonList from "components/admin/GallonList";
import StoreBranchList from "components/admin/StoreBranchList";
import TypesGallonList from "components/admin/TypesGallonList";
import MachineCleaningList from "components/admin/MachineCleaningList";
import BarangayHealthList from "components/admin/BarangayHealthList";

import MachineCleaning from "components/admin/MachineCleaning";
import BarangayHealth from "components/admin/BarangayHealth";

import UpdateRider from "components/admin/UpdateRider";
import UpdateEmployee from "components/admin/UpdateEmployee";
import UpdateUser from "components/admin/UpdateUser";
import UpdateStoreBranch from "components/admin/UpdateStoreBranch";
import UpdateMachineCleaning from "components/admin/UpdateMachineCleaning";
import UpdateBarangayHealth from "components/admin/UpdateBarangayHealth";
import UpdateTypeGallon from "components/admin/UpdateTypeGallon";
import UpdateWalkInSalesInventory from "components/admin/UpdateWalkInSalesInventory";

import WalkInPOS from "components/admin/WalkInPOS";
import WalkInSalesInventory from "components/admin/WalkInSalesInventory";

import GallonOrder from "components/cart/GallonOrder";

import Cart from "components/cart/Cart";
import ContainerStatus from "components/cart/ContainerStatus";
import OrderReceivedMethod from "components/cart/OrderReceivedMethod";
import SelectStore from "components/cart/SelectStore";
import PickupAddress from "components/cart/PickupAddress";
import DeliveryAddress from "components/cart/DeliveryAddress";
import Payment from "components/cart/Payment";
import OrderSummary from "components/cart/OrderSummary";

import MyOrdersList from "components/order/MyOrders";

import OrderList from "components/admin/OrderList";
import OrderDetails from "components/order/OrderDetails";

import store from "./store";
import { loadUser } from "./actions/userActions";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route
          path=":id/verify/:token"
          element={<EmailVerification />}
          exact="true"
        />
        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
          exact="true"
        />
        <Route
          path="/password/reset/:token"
          element={<NewPassword />}
          exact="true"
        />
        <Route path="/my-profile" element={<Profile />} exact="true" />
        <Route path="/admin-profile" element={<AdminProfile />} exact="true" />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/admin/update"
          element={
            <ProtectedRoute>
              <AdminUpdateProfile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/admin/password/update"
          element={
            <ProtectedRoute>
              <AdminUpdatePassword />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/register-gallon"
          element={
            <ProtectedRoute>
              <RegisterGallon />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/my-gallon"
          element={
            <ProtectedRoute>
              <MyGallon />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/my-qr"
          element={
            <ProtectedRoute>
              <MyQRCode />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route path="/details/:id" element={<QRCodeDetails />} exact="true" />
        {/* <Route path="/admin" element={<AdminRegistration />} exact="true" />
         */}
        {/* ADMIN */}
        <Route path="/dashboard" element={<Dashboard />} exact="true" />
        <Route path="/userlist" element={<UserList />} exact="true" />
        <Route path="/riderlist" element={<RiderList />} exact="true" />
        <Route path="/employeelist" element={<EmployeeList />} exact="true" />
        <Route path="/gallonlist" element={<GallonList />} exact="true" />
        <Route
          path="/storebranchlist"
          element={<StoreBranchList />}
          exact="true"
        />
        <Route
          path="/machinecleaning"
          element={<MachineCleaning />}
          exact="true"
        />
        <Route
          path="/barangayhealth"
          element={<BarangayHealth />}
          exact="true"
        />
        <Route
          path="/typesgallonlist"
          element={<TypesGallonList />}
          exact="true"
        />
        <Route
          path="/gallon/order"
          element={
            <ProtectedRoute>
              <GallonOrder />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route path="/cart" element={<Cart />} exact="true" />
        <Route
          path="/containerstatus"
          element={
            <ProtectedRoute>
              <ContainerStatus />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/orderclaimingmethod"
          element={
            <ProtectedRoute>
              <OrderReceivedMethod />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/storeselection"
          element={
            <ProtectedRoute>
              <SelectStore />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/pickupaddress"
          element={
            <ProtectedRoute>
              <PickupAddress />{" "}
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/deliveryaddress"
          element={
            <ProtectedRoute>
              <DeliveryAddress />{" "}
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />{" "}
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/ordersummary"
          element={
            <ProtectedRoute>
              <OrderSummary />{" "}
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/orders/me"
          element={
            <ProtectedRoute>
              <MyOrdersList />
            </ProtectedRoute>
          }
        />
        <Route path="/orderlist" element={<OrderList />} exact="true" />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rider/details/:id"
          element={
            <ProtectedRoute>
              <UpdateRider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/details/:id"
          element={
            <ProtectedRoute>
              <UpdateEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/details/:id"
          element={
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store/details/:id"
          element={
            <ProtectedRoute>
              <UpdateStoreBranch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/store/machincecleaning/:id"
          element={
            <ProtectedRoute>
              <MachineCleaningList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/store/machincecleaning/:id"
          element={
            <ProtectedRoute>
              <UpdateMachineCleaning />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store/barangaycleaning/:id"
          element={
            <ProtectedRoute>
              <BarangayHealthList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/store/barangayhealth/:id"
          element={
            <ProtectedRoute>
              <UpdateBarangayHealth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/typegallon/details/:id"
          element={
            <ProtectedRoute>
              <UpdateTypeGallon />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/POS/"
          element={
            <ProtectedRoute>
              <WalkInPOS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/POS/inventory/:id"
          element={
            <ProtectedRoute>
              <WalkInSalesInventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/POS/inventory/update/:id"
          element={
            <ProtectedRoute>
              <UpdateWalkInSalesInventory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
