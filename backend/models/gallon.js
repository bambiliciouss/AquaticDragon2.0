// const mongoose = require("mongoose");
// const validator = require("validator");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

// const gallonSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },

//   type: {
//     type: String,
//     required: [true, "Please select gallon type"],
//     enum: {
//       values: ["Slim 5 Gallons", "Round 5 Gallons"],
//       message: "Please select correct type of gallon",
//     },
//   },

//   gallonImage: {
//     public_id: {
//       type: String,

//       required: true,
//     },

//     url: {
//       type: String,

//       required: true,
//     },
//   },

//   // gallonAge: {
//   //   type: Number,
//   //   // required: true,
//   //   default: 1,
//   // },

//   createdAt: {
//     type: Date,

//     default: Date.now,
//   },
// });

// // Define a virtual property to calculate the age based on createdAt and current date
// gallonSchema.virtual("gallonAge").get(function () {
//   const currentDate = new Date();
//   const createdAtDate = this.createdAt;
//   const ageInMilliseconds = currentDate - createdAtDate;
//   // Convert age from milliseconds to days (assuming 24 hours per day)
//   const ageInDays = ageInMilliseconds / (1000 * 60 * 60 * 24);
//   // Round the age to the nearest whole number
//   return Math.round(ageInDays);
// });

// // Make sure to call `toObject` to include virtuals when converting to JSON
// gallonSchema.set("toObject", { virtuals: true });
// gallonSchema.set("toJSON", { virtuals: true });

// module.exports = mongoose.model("Gallon", gallonSchema);

const mongoose = require("mongoose");

const gallonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  type: {
    type: String,
    required: [true, "Please select gallon type"],
    enum: {
      values: ["Slim 5 Gallons", "Round 5 Gallons"],
      message: "Please select the correct type of gallon",
    },
  },

  gallonImage: {
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

  gallonAge: {
    type: Number,
    default: 1,
  },
});

// // Define a pre-save hook to update the gallonAge before saving
// gallonSchema.pre("save", function (next) {
//   const currentDate = new Date();
//   const createdAtDate = this.createdAt;
//   const ageInMilliseconds = currentDate - createdAtDate;
//   // Convert age from milliseconds to days (assuming 24 hours per day)
//   const ageInDays = ageInMilliseconds / (1000 * 60 * 60 * 24);
//   // Round the age to the nearest whole number
//   this.gallonAge = Math.round(ageInDays);

//   next();
// });

// // Make sure to call `toObject` to include virtuals when converting to JSON
// gallonSchema.set("toObject", { virtuals: true });
// gallonSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Gallon", gallonSchema);
