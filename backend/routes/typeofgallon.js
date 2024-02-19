const express = require("express");
const router = express.Router();

const {
  registerTypeofGallon,
  updateTypeofGallon,
  AllTypesGallons,
  deleteGallonType,
} = require("../controllers/typesofGallonController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/register/typeofgallon",
  isAuthenticatedUser,
  registerTypeofGallon
);

router.put("/update/typeofgallon/:id", isAuthenticatedUser, updateTypeofGallon);
router.get("/admin/typeofgallon", isAuthenticatedUser, AllTypesGallons);
router
  .route("/admin/delete/typeofgallon/:id")
  .delete(isAuthenticatedUser, deleteGallonType);
module.exports = router;
