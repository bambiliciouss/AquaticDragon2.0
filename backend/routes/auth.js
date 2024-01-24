const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
  registerUser,
  verifyEmail,
  LoginUser,
  getProfile,
  logout,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  AllUsers,
  GetUserDetails,
  UpdateUser,
  DeleteUser,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
router.post("/register", upload.single("avatar"), registerUser);
router.get("/:id/verify/:token", verifyEmail);
router.post("/login", LoginUser);
router.get("/me", isAuthenticatedUser, getProfile);
router.get("/logout", logout);
router.put(
  "/me/update",
  upload.single("avatar"),
  isAuthenticatedUser,
  updateProfile
);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

//ADMIN
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  AllUsers
);

router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  GetUserDetails
);

router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  UpdateUser
);

router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  DeleteUser
);

module.exports = router;
