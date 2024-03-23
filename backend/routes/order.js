const express = require("express");
const router = express.Router();

const {
  newOrder,
  myOrders,
  addOrderStatus,
  allOrders,
  getSingleOrder,
  allOrdersAdmin
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/order/:id").put(isAuthenticatedUser, addOrderStatus);
router
  .route("/admin/orders/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

  router
  .route("/all/admin/orders/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrdersAdmin);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

module.exports = router;
