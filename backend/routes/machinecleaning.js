const express = require("express");
const router = express.Router();

const {
  createMachineCleaningRecord,
} = require("../controllers/machinecleaningController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/create/machinecleaning/record/:id",
  isAuthenticatedUser,
  createMachineCleaningRecord
);

module.exports = router;
