const mongoose = require("mongoose");

const storeBarangayHealthSchema = new mongoose.Schema({
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

  dateVisited: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  certPotability: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("BarangayHealth", storeBarangayHealthSchema);
