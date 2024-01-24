const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  branchNo: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
    required: true,
  },

  streetName: {
    type: String,
    required: true,
  },
  purokNum: {
    type: String,
    required: true,
  },
  barangay: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  deliverFee: {
    type: String,
    required: true,
  },

  storeImage: {
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("StoreBranch", storeSchema);
