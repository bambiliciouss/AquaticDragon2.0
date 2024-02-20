const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  createBarangayHealthRecord,
  getAllStoreBarangayHealthRecord,
  updateBarangayHealthRecord,
  getSingleStoreBarangayHealthRecord,
  deleteStoreBarangayHealthRecord,
} = require("../controllers/barangayhealthController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/create/barangayhealth/record/:id",
  isAuthenticatedUser,
  createBarangayHealthRecord,
  upload.single("cleaningImage")
);

router.get(
  "/store/barangayhealth/record/:id",
  isAuthenticatedUser,
  getAllStoreBarangayHealthRecord
);

router.put(
  "/store/barangayhealth/record/:id",
  isAuthenticatedUser,
  upload.single("cleaningImage"),
  updateBarangayHealthRecord
);

router.get(
  "/barangayhealth/record/:id",
  isAuthenticatedUser,
  getSingleStoreBarangayHealthRecord
);

router.delete(
  "/barangayhealth/record/:id",
  isAuthenticatedUser,
  deleteStoreBarangayHealthRecord
);

module.exports = router;
