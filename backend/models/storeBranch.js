const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  branch: {
    type: String,
    unique: [true, "Store Name is already taken"],
  },
  address: {
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

    latitude: {
      type: Number,
      // required: true,
      default: 0,
    },

    longitude: {
      type: Number,
      // required: true,
      default: 0,
    },
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
  deleted: {
    type: Boolean,
    default: false,
  },
});

// storeSchema.pre("save", async function (next) {
//   if (!this.isNew) {
//     return next();
//   }

//   try {
//     const lastBranch = await this.constructor.findOne(
//       {},
//       { branchNo: 1 },
//       { sort: { branchNo: -1 } }
//     );
//     this.branchNo = (lastBranch && lastBranch.branchNo + 1) || 1;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model("StoreBranch", storeSchema);
