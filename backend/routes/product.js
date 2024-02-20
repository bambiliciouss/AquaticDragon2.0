const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProductStock,
  AllProductStock,
  AllProductStockinStore,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../utils/multer");

router.post(
  "/admin/create/product",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);

router.put(
  "/admin/update/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProductStock
);

router
  .route("/admin/all/product/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), AllProductStock);

router
  .route("/admin/all/product/store/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), AllProductStockinStore);

module.exports = router;
