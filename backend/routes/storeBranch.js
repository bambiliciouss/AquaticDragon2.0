const express = require("express");
const router = express.Router();

const {
  registerStoreBranch,
  AllStoreBranch,
  deleteStoreBranch,
  GetStoreDetails,
  updateStoreBranch,
} = require("../controllers/storeBranchController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../utils/multer");

router.post(
  "/register/storebranch",
  upload.single("storeImage"),
  isAuthenticatedUser,
  registerStoreBranch
);

router.route("/admin/storebranch").get(isAuthenticatedUser, AllStoreBranch);

router
  .route("/delete/storebranch/:id")
  .delete(isAuthenticatedUser, deleteStoreBranch);

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
module.exports = router;
