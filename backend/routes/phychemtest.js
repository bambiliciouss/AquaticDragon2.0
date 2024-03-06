const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  createPhyChemTest,
  getAllPhyChemTests,
  updatePhyChemTest,
  getSinglePhyChemTestDetails,
  deleteSinglePhyChemTest,
} = require("../controllers/phychemtestController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/create/PhyChemTest/record/:id",
  isAuthenticatedUser,
  createPhyChemTest,
  upload.single("certImage")
);

router.get(
  "/store/PhyChemTest/record/:id",
  isAuthenticatedUser,
  getAllPhyChemTests
);

router.put(
  "/store/PhyChemTest/record/:id",
  upload.single("certImage"),
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updatePhyChemTest
);

router.get(
  "/PhyChemTest/record/:id",
  isAuthenticatedUser,
  getSinglePhyChemTestDetails
);

router.delete(
  "/PhyChemTest/record/:id",
  isAuthenticatedUser,
  deleteSinglePhyChemTest
);

module.exports = router;
