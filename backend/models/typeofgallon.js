const mongoose = require("mongoose");

const typeofgallonSchema = new mongoose.Schema({
  typeofGallon: {
    type: String,
    required: [true],
  },

  gallonImage: {
    public_id: {
      type: String,
      required: true,
      default: "avatars/yvsg7qgvfalme36gwxws_qlbbz4",
    },

    url: {
      type: String,
      //required: true,
      default:
        "https://res.cloudinary.com/dde5uztoz/image/upload/v1705125816/yvsg7qgvfalme36gwxws_zbi90z.jpg",
    },
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
