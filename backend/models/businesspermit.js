const mongoose = require("mongoose");

const businessPermitSchema = new mongoose.Schema({
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

  permitImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  dateIssued: {
    type: Date,
    default: Date.now,
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

module.exports = mongoose.model("BusinessPermit", businessPermitSchema);
