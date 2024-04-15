const express = require("express");
const router = express.Router();

const {
  registerGallon,
  updateGallon,
  myGallons,
  deleteMyGallon,
  AllGallons,
  getMyGallon,
} = require("../controllers/gallonController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../utils/multer");

router.post(
  "/register/gallon",
  upload.single("gallonImage"),
  isAuthenticatedUser,
  registerGallon
);

router.put(
  "/update/gallon/:id",
  isAuthenticatedUser,
  authorizeRoles("user"),
  upload.single("gallonImage"),
  updateGallon
);

router.route("/my-gallons").get(isAuthenticatedUser, myGallons);
router
  .route("/admin/gallons")
  .get(isAuthenticatedUser,  authorizeRoles("admin", "employee", "rider"), AllGallons);
router
  .route("/delete/my-gallon/:id")
  .delete(isAuthenticatedUser, deleteMyGallon);
router.route("/gallon/:id").get(getMyGallon);
module.exports = router;
