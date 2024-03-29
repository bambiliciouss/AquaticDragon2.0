const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProductStock,
  SingleProductStock,
  AllProductStockinStore,
  ProductStocklogs,
  DeleteProductStocklogs,
  updateProduct,
  deleteProduct,

} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../utils/multer");

router.post(
  "/admin/create/product/:id",
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
  .route("/admin/all/product/:id")
  .get(isAuthenticatedUser, SingleProductStock);

router
  .route("/admin/all/product/store/:id")
  .get(isAuthenticatedUser, AllProductStockinStore);



router
  .route("/admin/product/stocklogs/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), ProductStocklogs);

router
  .route("/admin/product/:productId/stocklogs/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), DeleteProductStocklogs);

router.put(
  "/admin/update/product/price/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);

router
  .route("/admin/product/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
