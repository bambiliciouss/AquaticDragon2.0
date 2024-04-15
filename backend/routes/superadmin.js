const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  AllUsers,
  AllPendingAdmin,
  AllAdmin,
  AdminAllStoreBranch,
  AdminApproval,
} = require("../controllers/superAdminController");

router.route("/superadmin/allusers").get(isAuthenticatedUser, AllUsers);

router
  .route("/superadmin/all/pendingadmin")
  .get(isAuthenticatedUser, AllPendingAdmin);

router.route("/superadmin/all/admin").get(isAuthenticatedUser, AllAdmin);
router
  .route("/superadmin/admin/allstore/:id")
  .get(isAuthenticatedUser, AdminAllStoreBranch);

router.put(
  "/superadmin/approved/admin/:id",
  isAuthenticatedUser,
  AdminApproval
);
module.exports = router;
