const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  storebranch: {
    branchID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StoreBranch",
        required: true,
    },
    branchName: {
        type: String,
        required: true,
    }
    
  },

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
