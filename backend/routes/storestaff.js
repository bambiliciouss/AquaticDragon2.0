const express = require("express");
const router = express.Router();

const {
  assignStore,
  GetStoreStaffDetails,
  GetSingleStoreStaffDetails,
  deleteStoreStaff,
} = require("../controllers/storestaffController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../utils/multer");

router.post("/assigned/staff/:id", isAuthenticatedUser, assignStore);

router
  .route("/assigned/staff/details/:id")
  .get(isAuthenticatedUser, GetStoreStaffDetails);

router
  .route("/assigned/staff/:id")
  .get(isAuthenticatedUser, GetSingleStoreStaffDetails);

router.delete(
  "/admin/assigned/staff/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteStoreStaff
);

module.exports = router;
