const express = require("express");
const router = express.Router();

const {
  registerStoreBranch,
  AllStoreBranch,
  deleteStoreBranch,
} = require("../controllers/storeBranchController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../utils/multer");

router.post(
  "/register/storebranch",
  upload.single("storeImage"),
  isAuthenticatedUser,
  registerStoreBranch
);

router
  .route("/admin/storebranch")
  .get(isAuthenticatedUser, AllStoreBranch);

router
  .route("/delete/storebranch/:id")
  .delete(isAuthenticatedUser, deleteStoreBranch);

module.exports = router;
