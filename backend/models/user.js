const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Please enter your first name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  lname: {
    type: String,
    required: [true, "Please enter your last name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },

  phone: {
    type: String,
    required: [false, "Please enter your phone number"],
    maxLength: [11, "Your phone number cannot exceed 11 characters"],
  },

  houseNo: {
    type: String,
    // required: [false, "Please enter your house no"],
    maxLength: [100, "Your address cannot exceed 30 characters"],
    default: "",
  },

  streetName: {
    type: String,
    // required: [false, "Please enter your streetname"],
    maxLength: [100, "Your address cannot exceed 30 characters"],
    default: "",
  },

  purokNum: {
    type: String,
    // required: [false, "Please enter your purok num"],
    maxLength: [100, "Your address cannot exceed 30 characters"],
    default: "",
  },

  barangay: {
    type: String,
    // required: [false, "Please enter your barangay"],
    maxLength: [100, "Your address cannot exceed 30 characters"],
    default: "",
  },

  city: {
    type: String,
    // required: [false, "Please enter your city"],
    maxLength: [100, "Your address cannot exceed 30 characters"],
    default: "",
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },

  avatar: {
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

  role: {
    type: String,
    default: "user",
  },

  verified: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,

    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//hashing of password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//generates the token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//password checking for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//for reset password
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
