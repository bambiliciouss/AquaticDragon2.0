const mongoose = require("mongoose");

const otherGallonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  storebranch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "StoreBranch",
  },

  othertypeGallon: {
    type: String,
    //default: 30,
  },

  price: {
    type: Number,
    default: 0,
  },

  quantity: {
    type: Number,
    default: 1,
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

module.exports = mongoose.model("OtherGallon", otherGallonSchema);
