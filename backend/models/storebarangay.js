const mongoose = require("mongoose");

const storeBarangaySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  storebranch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "StoreBranch",
  },

  barangay: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("StoreBarangay", storeBarangaySchema);
