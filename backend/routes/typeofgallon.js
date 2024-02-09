const express = require("express");
const router = express.Router();

const {
  registerTypeofGallon,
  updateTypeofGallon,
  AllTypesGallons,
} = require("../controllers/typesofGallonController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/register/typeofgallon",
  isAuthenticatedUser,
  registerTypeofGallon
);

router.put("/update/typeofgallon/:id", isAuthenticatedUser, updateTypeofGallon);
router.get("/typeofgallon", isAuthenticatedUser, AllTypesGallons);

module.exports = router;
