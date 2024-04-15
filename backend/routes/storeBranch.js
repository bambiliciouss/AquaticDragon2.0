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
  getSalesOrderByBranch,
  getSalesOfCurrentBranch,
  getEmployeeBranches,
  getSalesOrderByBranchEmployee
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

router.get("/available/store", isAuthenticatedUser, AllStoreBranchUser);

router.get(
  "/admin/store/:id",
  isAuthenticatedUser,
  authorizeRoles("admin", "employee", "rider"),
  GetStoreDetails
);

router.put(
  "/admin/store/update/:id",
  upload.single("storeImage"),
  isAuthenticatedUser,
  updateStoreBranch
);
router.get('/employee/branch/:id', isAuthenticatedUser, authorizeRoles("employee", "rider"), getEmployeeBranches);
router.get('/admin/all/store/branches/:id', isAuthenticatedUser,  authorizeRoles("admin", "employee", "rider"), getAdminBranches);
router.get('/admin/all/store/sales/:id', isAuthenticatedUser,  authorizeRoles("admin", "employee", "rider"),getSalesByBranch);
router.get('/admin/store/sales/:id', isAuthenticatedUser,  authorizeRoles("admin", "employee", "rider"),getSalesOfCurrentBranch);
router.get('/admin/all/sales/order/:id', isAuthenticatedUser,  authorizeRoles("admin", "employee", "rider"),getSalesOrderByBranch)
router.get('/employee/all/sales/order/:id', isAuthenticatedUser,  authorizeRoles("employee", "rider"), getSalesOrderByBranchEmployee)
module.exports = router;
