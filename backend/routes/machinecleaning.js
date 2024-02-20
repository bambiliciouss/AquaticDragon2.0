const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  createMachineCleaningRecord,
  getStoreMachineCleaningDetails,
  updateStoreMachineCleaning,
  getSingleStoreMachineCleaningDetails,
  deleteSingleStoreMachineCleaning,
} = require("../controllers/machinecleaningController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/create/machinecleaning/record/:id",
  isAuthenticatedUser,
  createMachineCleaningRecord,
  upload.single("cleaningImage")
);

router.get(
  "/store/machinecleaning/record/:id",
  isAuthenticatedUser,
  getStoreMachineCleaningDetails
);

router.put(
  "/store/machinecleaning/record/:id",
  isAuthenticatedUser,
  upload.single("cleaningImage"),
  updateStoreMachineCleaning
);

router.get(
  "/machinecleaning/record/:id",
  isAuthenticatedUser,
  getSingleStoreMachineCleaningDetails
);

router.delete(
  "/machinecleaning/record/:id",
  isAuthenticatedUser,
  deleteSingleStoreMachineCleaning
);

module.exports = router;
