const express = require("express");
const router = express.Router();

const {
  registerStoreBranch,
  AllStoreBranch,
  deleteStoreBranch,
  GetStoreDetails,
  updateStoreBranch,
  AdminAllStoreBranch,
  AllStoreBranchUser,
  getAdminBranches,
  getSalesByBranch,
  getSalesOrderByBranch
} = require("../controllers/storeBranchController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../utils/multer");

router.post(
  "/register/storebranch",
  upload.single("storeImage"),
  isAuthenticatedUser,
  registerStoreBranch
);

router.route("/admin/storebranch").get(AllStoreBranch);

router
  .route("/delete/storebranch/:id")
  .delete(isAuthenticatedUser, deleteStoreBranch);

router.get(
  "/admin/all/store",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AdminAllStoreBranch
);


router.get(
  "/available/store",
  isAuthenticatedUser,
  AllStoreBranchUser
);

router.get(
  "/admin/store/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  GetStoreDetails
);

router.put(
  "/admin/store/update/:id",
  upload.single("storeImage"),
  isAuthenticatedUser,
  updateStoreBranch
);

router.get('/admin/all/store/branches/:id', getAdminBranches);
router.get('/admin/all/store/sales/:id', getSalesByBranch);
router.get('/admin/all/sales/order/:id', getSalesOrderByBranch)
module.exports = router;
