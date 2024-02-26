const express = require("express");
const router = express.Router();

const {
  addOtherGallonInventory,
  getAllOtherGallonStoreInventory,
  getOtherGallonInventoryDetails,
  updateOtherGallonStoreInventory,
  deleteOtherGallonStoreInventory,
} = require("../controllers/othergalloninventoryController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post(
  "/create/othergallon/inventory/:id",
  isAuthenticatedUser,
  addOtherGallonInventory
);
router.get(
  "/all/store/othergallon/inventory/:id",
  isAuthenticatedUser,
  getAllOtherGallonStoreInventory
);

router.get(
  "/details/othergallon/inventory/:id",
  isAuthenticatedUser,
  getOtherGallonInventoryDetails
);

router.put(
  "/update/othergallon/inventory/:id",
  isAuthenticatedUser,
  updateOtherGallonStoreInventory
);

router
  .route("/delete/othergallon/inventory/:id")
  .delete(isAuthenticatedUser, deleteOtherGallonStoreInventory);
module.exports = router;
