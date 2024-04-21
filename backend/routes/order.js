const express = require("express");
const router = express.Router();

const {
  newOrder,
  myOrders,
  addOrderStatus,
  allOrders,
  getSingleOrder,
  allOrdersAdmin,
  addOrderStatuswithRider,
  allOrdersEmployee,
  allOrdersRider,
  getOrderTransactions,
  getOrdersByGallonType,
  getOrderByBarangay,
  getAcceptedAndDeliveredOrders,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/order/:id").put(isAuthenticatedUser, addOrderStatus);
router
  .route("/order/assign/rider/:id")
  .put(isAuthenticatedUser, addOrderStatuswithRider);

router
  .route("/admin/orders/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

router
  .route("/all/admin/orders/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrdersAdmin);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.get("/admin/all/orders/:id", isAuthenticatedUser, authorizeRoles("admin"), getOrderTransactions);
router.get("/admin/orders/byGallon/:id",isAuthenticatedUser, authorizeRoles("admin", "employee", "rider"), getOrdersByGallonType);
router.get("/admin/orders/byBarangay/:id",isAuthenticatedUser, authorizeRoles("admin", "employee", "rider"), getOrderByBarangay);
router.get("/admin/orders/staff/:id", isAuthenticatedUser, authorizeRoles("admin", "employee", "rider"), getAcceptedAndDeliveredOrders);
router
  .route("/all/employee/orders/")
  .get(isAuthenticatedUser, authorizeRoles("employee"), allOrdersEmployee);


  router
  .route("/all/rider/orders/")
  .get(isAuthenticatedUser, authorizeRoles("rider"), allOrdersRider);

module.exports = router;
