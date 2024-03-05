const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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

  typesgallon: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "TypeOfGallon",
  },

  stocks: [
    {
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
      datedAt: {
        type: Date,
        default: Date.now,
      },
      deleted: {
        type: Boolean,
        default: false,
      },
    },
  ],

  price: {
    type: Number,
    required: true,
    default: 0,
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

module.exports = mongoose.model("Product", productSchema);
