const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const sendEmailReset = require("../utils/sendEmailReset");
const crypto = require("crypto");

exports.registerUser = async (req, res, next) => {
  try {
    // const result = await cloudinary.v2.uploader.upload(
    //   req.body.avatar,
    //   {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   },
    //   (err, res) => {
    //     console.log(err, res);
    //   }
    // );

    //return console.log(result);

    const {
      fname,
      lname,
      phone,
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      email,
      password,
      role,
      terms,
    } = req.body;

    const user = await User.create({
      fname,
      lname,
      phone,
      // houseNo,
      // streetName,
      // purokNum,
      // barangay,
      // city,
      email,
      password,
      // avatar: {
      //   public_id: result.public_id,
      //   url: result.secure_url,
      // },
      role,
      terms,
    });

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
      // expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)), // Set expiration to 24 hours from now
    }).save();

    // const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
    // await sendEmail(user.email, `Hello Mr.Broccoli, ${user.fname}`, url);
    const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Aquatic Dragon", url, user);

    res
      .status(201)
      .json({ message: "An Email sent to your account please verify" });
    //sendToken(user, 200, res);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
      const errorMessage = `Phone number '${newUserData.phone}' is already taken.`;
      return res.status(400).json({ success: false, message: errorMessage });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(400).send({ message: "Invalid Link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid Link" });
    //await User.updateOne({ _id: req.params.id, verified: true });

    await User.updateOne({ _id: req.params.id }, { $set: { verified: true } });
    await token.deleteOne();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: true,
    });
  }
};

exports.LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Email or password is incorrect", 401));
    }
    if (user.deleted) {
      return next(new ErrorHandler("Account has been deleted", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Email or password is incorrect", 401));
      //return res.status(400).send({ message: "Invalid Password" });
    }

    if (!user.verified) {
      //return next(new ErrorHandler("Account is not verified", 401));
      let token = await Token.findOne({ email });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Aquatic Dragon", url, user);
      }

      res.status(400).json({
        message:
          "Your email account is not verified, verification link is sent to your account please verify first",
      });
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    // res
    //   .status(500)
    //   .json({ message: "Verify your Email Account", error: error.message });
    next(new ErrorHandler("Verify your Email Account", 500, error.message));
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateProfile = async (req, res, next) => {
  const newUserData = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    houseNo: req.body.houseNo,
    streetName: req.body.streetName,
    purokNum: req.body.purokNum,
    barangay: req.body.barangay,
    city: req.body.city,
  };

  try {
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
      const image_id = user.avatar.public_id;
      const res = await cloudinary.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.avatar,
        {
          folder: "avatars",
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
      const errorMessage = `Phone number '${newUserData.phone}' is already taken.`;
      return res.status(400).json({ success: false, message: errorMessage });
    }

    // Handle other errors
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isMatched = await user.comparePassword(req.body.oldPassword);

    if (!isMatched) {
      return next(new ErrorHandler("Old password is incorrect"));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler("User not found with this email", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const url = `${process.env.BASE_URL}/password/reset/${resetToken}`;
    await sendEmailReset(user.email, "Aquatic Dragon", url, user);

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHandler(
          "Password reset token is invalid or has been expired",
          400
        )
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
    //sendToken(user, 200, res);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.AllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ deleted: false });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.GetUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User does not found with id: ${req.params.id}`)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.DeleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User soft deleted" });
  } catch (error) {
    // Handle error, log, or send an appropriate response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.registerEmployee = async (req, res, next) => {
  try {
    const medcertResult = await cloudinary.v2.uploader.upload(
      req.body.medcert,
      {
        folder: "medcert",
        width: 150,
        crop: "scale",
      }
    );

    const barangayClearanceResult = await cloudinary.v2.uploader.upload(
      req.body.barangayclearance,
      {
        folder: "barangayclearance",
        width: 150,
        crop: "scale",
      }
    );

    const {
      fname,
      lname,
      phone,
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      email,
      password,
      role,
    } = req.body;

    const user = await User.create({
      fname,
      lname,
      phone,
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      email,
      password,
      medcert: {
        public_id: medcertResult.public_id,
        url: medcertResult.secure_url,
      },
      barangayclearance: {
        public_id: barangayClearanceResult.public_id,
        url: barangayClearanceResult.secure_url,
      },
      role,
    });

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
      // expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)), // Set expiration to 24 hours from now
    }).save();

    const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Aquatic Dragon", url, user);

    res.status(201).json({
      message: "An Email sent to your employee account please verify",
    });
    //sendToken(user, 200, res);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
      const errorMessage = `Phone number '${newUserData.phone}' is already taken.`;
      return res.status(400).json({ success: false, message: errorMessage });
    }
    res.status(500).json({ success: false, message: "werwereere " });
  }
};

exports.registerRider = async (req, res, next) => {
  try {
    const medcertResult = await cloudinary.v2.uploader.upload(
      req.body.medcert,
      {
        folder: "medcert",
        width: 150,
        crop: "scale",
      }
    );

    const barangayClearanceResult = await cloudinary.v2.uploader.upload(
      req.body.barangayclearance,
      {
        folder: "barangayclearance",
        width: 150,
        crop: "scale",
      }
    );

    const driverLicenseResult = await cloudinary.v2.uploader.upload(
      req.body.driverslicense,
      {
        folder: "driverslicense",
        width: 150,
        crop: "scale",
      }
    );

    const {
      fname,
      lname,
      phone,
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      email,
      password,
      role,
    } = req.body;

    const user = await User.create({
      fname,
      lname,
      phone,
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      email,
      password,
      medcert: {
        public_id: medcertResult.public_id,
        url: medcertResult.secure_url,
      },
      barangayclearance: {
        public_id: barangayClearanceResult.public_id,
        url: barangayClearanceResult.secure_url,
      },
      driverslicense: {
        public_id: driverLicenseResult.public_id,
        url: driverLicenseResult.secure_url,
      },
      role,
    });

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Aquatic Dragon", url, user);

    res.status(201).json({
      message: "An Email sent to your rider account, please verify",
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
      const errorMessage = `Phone number '${newUserData.phone}' is already taken.`;
      return res.status(400).json({ success: false, message: errorMessage });
    }
    res
      .status(500)
      .json({ success: false, message: "Error occurred during registration." });
  }
};

exports.updateProfileRider = async (req, res, next) => {
  const newUserData = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    houseNo: req.body.houseNo,
    streetName: req.body.streetName,
    purokNum: req.body.purokNum,
    barangay: req.body.barangay,
    city: req.body.city,
  };

  try {
    if (req.body.avatar && req.body.avatar !== "") {
      const user = await User.findById(req.params.id);
      const image_id = user.avatar.public_id;
      const res = await cloudinary.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.avatar,
        {
          folder: "avatars",
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (req.body.medcert && req.body.medcert !== "") {
      const user = await User.findById(req.params.id);
      const medcert_id = user.medcert.public_id;
      const res = await cloudinary.uploader.destroy(medcert_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.medcert,
        {
          folder: "medcerts", // Change the folder name if needed
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newUserData.medcert = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (
      req.body.barangayclearance &&
      req.body.barangayclearance !== ""
    ) {
      const user = await User.findById(req.params.id);
      const barangayclearance_id = user.barangayclearance.public_id;
      const res = await cloudinary.uploader.destroy(barangayclearance_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.barangayclearance,
        {
          folder: "barangayclearances", // Change the folder name if needed
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newUserData.barangayclearance = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (req.body.driverslicense && req.body.driverslicense !== "") {
      const user = await User.findById(req.params.id);
      const driverslicense_id = user.driverslicense.public_id;
      const res = await cloudinary.uploader.destroy(driverslicense_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.driverslicense,
        {
          folder: "driverslicenses", // Change the folder name if needed
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newUserData.driverslicense = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
      const errorMessage = `Phone number '${newUserData.phone}' is already taken.`;
      return res.status(400).json({ success: false, message: errorMessage });
    }

    // Handle other errors
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfileEmployee = async (req, res, next) => {
  const newUserData = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    houseNo: req.body.houseNo,
    streetName: req.body.streetName,
    purokNum: req.body.purokNum,
    barangay: req.body.barangay,
    city: req.body.city,
  };

  try {
    if (req.body.avatar && req.body.avatar !== "") {
      const user = await User.findById(req.params.id);
      const image_id = user.avatar.public_id;
      const res = await cloudinary.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.avatar,
        {
          folder: "avatars",
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (req.body.medcert && req.body.medcert !== "") {
      const user = await User.findById(req.params.id);
      const medcert_id = user.medcert.public_id;
      const res = await cloudinary.uploader.destroy(medcert_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.medcert,
        {
          folder: "medcerts", // Change the folder name if needed
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newUserData.medcert = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else if (
      req.body.barangayclearance &&
      req.body.barangayclearance !== ""
    ) {
      const user = await User.findById(req.params.id);
      const barangayclearance_id = user.barangayclearance.public_id;
      const res = await cloudinary.uploader.destroy(barangayclearance_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.barangayclearance,
        {
          folder: "barangayclearances", // Change the folder name if needed
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newUserData.barangayclearance = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
      const errorMessage = `Phone number '${newUserData.phone}' is already taken.`;
      return res.status(400).json({ success: false, message: errorMessage });
    }

    // Handle other errors
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.UpdateUser = async (req, res, next) => {
  console.log("DATA TO BHIE", req.body.avatar);

  const newUserData = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    houseNo: req.body.houseNo,
    streetName: req.body.streetName,
    purokNum: req.body.purokNum,
    barangay: req.body.barangay,
    city: req.body.city,
  };
  try {
    if (req.body.avatar && req.body.avatar !== "") {
      const user = await User.findById(req.params.id);
      const image_id = user.avatar.public_id;
      const res = await cloudinary.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.avatar,
        {
          folder: "avatars",
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
      const errorMessage = `Phone number '${newUserData.phone}' is already taken.`;
      return res.status(400).json({ success: false, message: errorMessage });
    }

    // Handle other errors
    res.status(500).json({ success: false, message: error.message });
  }
};
