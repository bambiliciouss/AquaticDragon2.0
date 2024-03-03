const express = require("express");
const router = express.Router();

const {
  registerTypeofGallon,
  updateTypeofGallon,
  AllTypesGallons,
  deleteGallonType,
  getSingleGallonType,
} = require("../controllers/typesofGallonController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const upload = require("../utils/multer")

router.post(
  "/register/typeofgallon",
  upload.single("gallonImage"),
  isAuthenticatedUser,
  registerTypeofGallon
);

router.put("/update/typeofgallon/:id",   upload.single("gallonImage"),isAuthenticatedUser, updateTypeofGallon);
router.get("/admin/typeofgallon", isAuthenticatedUser, AllTypesGallons);
router.get("/admin/typeofgallon/:id", isAuthenticatedUser, getSingleGallonType);
router
  .route("/admin/delete/typeofgallon/:id")
  .delete(isAuthenticatedUser, deleteGallonType);
module.exports = router;
