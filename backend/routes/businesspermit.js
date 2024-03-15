const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  createBusinessPermit,
  getAllStoreBusinessPermits,
  updateBusinessPermit,
  getSingleStoreBusinessPermit,
  deleteStoreBusinessPermit
} = require("../controllers/businesspermitController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/create/businesspermit/record/:id",
  isAuthenticatedUser,
  createBusinessPermit,
  upload.single("permitImage")
);

router.get(
  "/store/businesspermit/record/:id",
  isAuthenticatedUser,
  getAllStoreBusinessPermits
);

router.put(
  "/store/businesspermit/record/:id",
  isAuthenticatedUser,
  upload.single("permitImage"),
  updateBusinessPermit
);

router.get(
  "/businesspermit/record/:id",
  isAuthenticatedUser,
  getSingleStoreBusinessPermit
);

router.delete(
  "/businesspermit/record/:id",
  isAuthenticatedUser,
  deleteStoreBusinessPermit
);

module.exports = router;
