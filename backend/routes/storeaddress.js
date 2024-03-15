const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  createStoreBarangay,
  getAllStoreBarangay,
  updateStoreBarangay,
  getStoreBarangayDetails,
  deleteStoreBarangay
} = require("../controllers/storebarangayController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/create/barangay/:id", isAuthenticatedUser, createStoreBarangay);

router.get("/store/barangay/:id", isAuthenticatedUser, getAllStoreBarangay);

router.put("/store/barangay/:id", isAuthenticatedUser, updateStoreBarangay);

router.get("/store/barangay/details/:id", isAuthenticatedUser, getStoreBarangayDetails);

router.delete(
  "/store/barangay/delete/:id",
  isAuthenticatedUser,
  deleteStoreBarangay
);

module.exports = router;
