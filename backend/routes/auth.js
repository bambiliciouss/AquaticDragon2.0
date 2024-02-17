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
  registerEmployee,
  registerRider,
  updateProfileRider,
  updateProfileEmployee,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
router.post("/register", upload.single("avatar"), registerUser);
// router.post("/register/employee", upload.single("medcert"), registerEmployee);
router.post(
  "/register/employee",
  upload.fields([
    { name: "medcert", maxCount: 1 },
    { name: "barangayclearance", maxCount: 1 },
  ]),
  registerEmployee
);

router.post(
  "/register/rider",
  upload.fields([
    { name: "medcert", maxCount: 1 },
    { name: "barangayclearance", maxCount: 1 },
    { name: "driverslicense", maxCount: 1 },
  ]),
  registerRider
);
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


router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  DeleteUser
);

router.put(
  "/rider/update/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "medcert", maxCount: 1 },
    { name: "barangayclearance", maxCount: 1 },
    { name: "driverslicense", maxCount: 1 },
  ]),
  isAuthenticatedUser,
  updateProfileRider
);

router.put(
  "/employee/update/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "medcert", maxCount: 1 },
    { name: "barangayclearance", maxCount: 1 },
  ]),
  isAuthenticatedUser,
  updateProfileRider
);

router.put(
  "/admin/user/:id", upload.single("avatar"),
  isAuthenticatedUser,
  authorizeRoles("admin"),
  UpdateUser
);

module.exports = router;
