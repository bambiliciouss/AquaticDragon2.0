const mongoose = require("mongoose");

const typeofgallonSchema = new mongoose.Schema({
  typeofGallon: {
    type: String,
    required: [true],
  },
  price: {
    type: Number,
    default: 30,
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

module.exports = mongoose.model("TypeOfGallon", typeofgallonSchema);
