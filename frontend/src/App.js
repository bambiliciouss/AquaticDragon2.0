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

// import AdminRegistration from "components/admin/AdminRegistration";
import RegisterGallon from "components/gallon/RegisterGallon";
import MyGallon from "components/gallon/MyGallon";

import Dashboard from "components/admin/Dashboard";
import UserList from "components/admin/UserList";
import RiderList from "components/admin/RiderList";
import EmployeeList from "components/admin/EmployeeList";
import GallonList from "components/admin/GallonList";
import StoreBranchList from "components/admin/StoreBranchList";

import UpdateRider from "components/admin/UpdateRider";
import UpdateEmployee from "components/admin/UpdateEmployee";
import UpdateUser from "components/admin/UpdateUser";
import UpdateStoreBranch from "components/admin/UpdateStoreBranch";
// import EmployeeRegistration from "components/employee/EmployeeRegistration";
// import RiderRegistration from "components/rider/RiderRegistration";
// import StoreBranchRegistration from "components/StoreBranch/StoreBranchRegistration";

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
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
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
      </Routes>
    </>
  );
}

export default App;
