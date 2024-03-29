const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const sendEmailReset = require("../utils/sendEmailReset");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Order = require("../models/order");
const StoreBranch = require("../models/storeBranch");
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
      email,
      password,
      role,
      terms,
    });

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
      expiresAt: new Date(Date.now() + 60 * 1000),
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

exports.registerAdmin = async (req, res, next) => {
  try {
    const validIDResult = await cloudinary.v2.uploader.upload(
      req.body.validID,
      {
        folder: "validID",
        width: 150,
        crop: "scale",
      }
    );

    const mayorsPermitResult = await cloudinary.v2.uploader.upload(
      req.body.mayorsPermit,
      {
        folder: "mayorsPermit",
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
    } = req.body;

    const address = {
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      isDefault: true,
    };

    const user = await User.create({
      fname,
      lname,
      phone,
      addresses: [address],
      email,
      password,
      validID: {
        public_id: validIDResult.public_id,
        url: validIDResult.secure_url,
      },
      mayorsPermit: {
        public_id: mayorsPermitResult.public_id,
        url: mayorsPermitResult.secure_url,
      },
      role: "PendingAdmin",
    });

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
      expiresAt: new Date(Date.now() + 60 * 1000),
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

    // if (!user.verified) {
    //   let token = await Token.findOne({ userId: user._id });

    //   if (!token) {
    //     token = await new Token({
    //       userId: user._id,
    //       token: crypto.randomBytes(32).toString("hex"),
    //       expiresAt: new Date(Date.now() + 60 * 1000),
    //     }).save();

    //     const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
    //     await sendEmail(user.email, "Aquatic Dragon", url, user);

    //     res.status(400).json({
    //       message:
    //         "Your email account is not verified, verification link is sent to your account please verify first",
    //     });
    //   } else {
    //     res.status(400).json({
    //       message: "Please  check your email to verify your account.",
    //     });
    //   }
    // } else {
    //   sendToken(user, 200, res);
    // }

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });

      if (!token || token.expiresAt < new Date()) {
        // If token does not exist or is expired, generate a new one
        try {
          // Try to find and update the existing token
          token = await Token.findOneAndUpdate(
            { userId: user._id },
            {
              token: crypto.randomBytes(32).toString("hex"),
              expiresAt: new Date(Date.now() + 60 * 1000),
            },
            { new: true, upsert: true }
          );

          const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
          await sendEmail(user.email, "Aquatic Dragon", url, user);

          res.status(400).json({
            message:
              "Your email account is not verified. Token has expired, a new verification link is sent to your account, please verify first",
          });
        } catch (error) {
          return next(new ErrorHandler(error.message));
        }
      } else {
        res.status(400).json({
          message: "Please check your email to verify your account.",
        });
      }
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    next(new ErrorHandler(error.message));
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
  console.log(req.body);
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
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateAdminProfile = async (req, res, next) => {
  const newUserData = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
  };
  const newAddressData = {
    houseNo: req.body.houseNo,
    streetName: req.body.streetName,
    purokNum: req.body.purokNum,
    barangay: req.body.barangay,
    city: req.body.city,
    isDefault: true,
  };

  try {
    const user = await User.findById(req.user.id);
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
      const image_id = user.avatar.public_id;
      const destroyRes = await cloudinary.uploader.destroy(image_id);
      const uploadRes = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      newUserData.avatar = {
        public_id: uploadRes.public_id,
        url: uploadRes.secure_url,
      };

      // user.avatar = newUserData.avatar;
    }

    // Update user data (fname, lname, and phone)
    user.fname = newUserData.fname;
    user.lname = newUserData.lname;
    user.phone = newUserData.phone;
    if (req.body.avatar !== "") {
      user.avatar = newUserData.avatar;
    }

    // Update address if the user has addresses
    if (user.addresses && user.addresses.length > 0) {
      user.addresses[0] = { ...user.addresses[0], ...newAddressData };
    }

    await user.save();

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
    res.status(500).json({ success: false, error });
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
      storebranch,
    } = req.body;

    const address = {
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      isDefault: true,
    };

    const user = await User.create({
      fname,
      lname,
      phone,
      addresses: [address],
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
      storebranch,
      verified: true,
    });

    // const token = await new Token({
    //   userId: user._id,
    //   token: crypto.randomBytes(32).toString("hex"),
    //   expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    // }).save();

    // const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
    // await sendEmail(user.email, "Aquatic Dragon", url, user);

    // res.status(201).json({
    //   message: "An Email sent to your employee account please verify",
    // });
    //sendToken(user, 200, res);
    res.status(201).json({
      success: true,
      user,
    });
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
      storebranch,
    } = req.body;

    const address = {
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      isDefault: true,
    };

    const user = await User.create({
      fname,
      lname,
      phone,
      addresses: [address],
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
      storebranch,
    });

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
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
    storebranch: req.body.storebranch,
  };

  const newAddressData = {
    houseNo: req.body.houseNo,
    streetName: req.body.streetName,
    purokNum: req.body.purokNum,
    barangay: req.body.barangay,
    city: req.body.city,
    isDefault: true,
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
    if (req.body.medcert && req.body.medcert !== "") {
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
    }

    if (req.body.barangayclearance && req.body.barangayclearance !== "") {
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
    if (req.body.driverslicense && req.body.driverslicense !== "") {
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

    const user = await User.findById(req.params.id);

    user.fname = newUserData.fname;
    user.lname = newUserData.lname;
    user.phone = newUserData.phone;
    user.storebranch = newUserData.storebranch;
    if (req.body.avatar !== "") {
      user.avatar = newUserData.avatar;
    }
    if (req.body.medcert && req.body.medcert !== "")
      user.medcert = newUserData.medcert;
    if (req.body.barangayclearance && req.body.barangayclearance !== "") {
      user.barangayclearance = newUserData.barangayclearance;
    }
    if (req.body.driverslicense && req.body.driverslicense !== "") {
      user.driverslicense = newUserData.driverslicense;
    }

    if (user.addresses && user.addresses.length > 0) {
      user.addresses[0] = { ...user.addresses[0], ...newAddressData };
      await user.save();
    }
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
  console.log("storebranch ID", req.body.storebranch);
  const newUserData = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    storebranch: req.body.storebranch,
  };

  const newAddressData = {
    houseNo: req.body.houseNo,
    streetName: req.body.streetName,
    purokNum: req.body.purokNum,
    barangay: req.body.barangay,
    city: req.body.city,
    isDefault: true,
  };

  try {
    const user = await User.findById(req.params.id);
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

    if (req.body.medcert && req.body.medcert !== "") {
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
    }

    if (req.body.barangayclearance && req.body.barangayclearance !== "") {
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

    user.fname = newUserData.fname;
    user.lname = newUserData.lname;
    user.phone = newUserData.phone;
    user.storebranch = newUserData.storebranch;
    if (req.body.avatar !== "") {
      user.avatar = newUserData.avatar;
    }
    if (req.body.medcert && req.body.medcert !== "")
      user.medcert = newUserData.medcert;
    if (req.body.barangayclearance && req.body.barangayclearance !== "") {
      user.barangayclearance = newUserData.barangayclearance;
    }

    if (user.addresses && user.addresses.length > 0) {
      user.addresses[0] = { ...user.addresses[0], ...newAddressData };
      await user.save();
    }
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

exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const {
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      latitude,
      longitude,
    } = req.body;

    const newAddress = {
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      latitude,
      longitude,
      isDefault: true,
    };

    if (newAddress.isDefault) {
      user.addresses.forEach((address) => {
        address.isDefault = false;
      });
    }
    user.addresses.push(newAddress);
    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "Address added successfully", user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.editAddress = async (req, res) => {
  console.log("data result ", req.body);
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const user = await User.findOne({
      "addresses._id": addressId,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    const {
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      isDefault,
      latitude,
      longitude,
    } = req.body;

    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address ID" });
    }

    const updatedAddress = {
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      latitude,
      longitude,
      isDefault: true,
    };

    if (updatedAddress.isDefault) {
      user.addresses.forEach((address, index) => {
        if (index !== addressIndex) {
          address.isDefault = false;
        }
      });
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex]._doc,
      ...updatedAddress,
    };
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Address updated successfully", user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const user = await User.findOne({
      _id: userId,
      "addresses._id": addressId,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address ID" });
    }

    const address = user.addresses[addressIndex];

    // Check if the address is already marked as deleted
    if (address.isDeleted) {
      return res
        .status(400)
        .json({ success: false, message: "Address is already deleted" });
    }

    // Mark the address as deleted
    user.addresses[addressIndex].isDeleted = true;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Address marked as deleted", user });
  } catch (error) {
    console.error(error);

    // Handle specific database-related errors
    if (error.name === "MongoError" && error.code === 11000) {
      return res
        .status(500)
        .json({ success: false, message: "Duplicate key error" });
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const activeAddresses = user.addresses.filter(
      (address) => !address.isDeleted
    );

    return res.status(200).json({ success: true, addresses: activeAddresses });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getAddressDetails = async (req, res) => {
  try {
    // Get the user ID from the authenticated user (you should have user authentication middleware)
    const userId = req.user.id;
    const addressId = req.params.id; // Assuming the address ID is passed as a parameter

    // Fetch the user based on the user ID and the specified address ID
    const user = await User.findOne({
      _id: userId,
      "addresses._id": addressId,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User or address not found" });
    }

    // Find the specific address within the user's addresses array
    const address = user.addresses.find(
      (addr) => addr._id.toString() === addressId
    );

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Respond with the address details
    return res.status(200).json({ success: true, address });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.setDefaultAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.user.id;

    // Find the user by userId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Loop through user's addresses to set isDefault
    user.addresses.forEach((address) => {
      if (address._id.toString() === addressId) {
        address.isDefault = true;
      } else {
        address.isDefault = false;
      }
    });

    // Save the updated user
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Default address set successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.admingetAllAddresses = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const activeAddresses = user.addresses.filter(
      (address) => !address.isDeleted
    );

    return res.status(200).json({ success: true, addresses: activeAddresses });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
// exports.AllStoreUsers = async (req, res, next) => {
//   try {
//     // Fetch all orders
//     const orders = await Order.find().populate('customer', 'lname fname');

//     // Extract unique user IDs from orders
//     const usersWithTransactions = [
//       ...new Set(orders.map((order) => order.customer)),
//     ];

//     res.status(200).json({
//       success: true,
//       usersWithTransactions,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };

exports.AllStoreUsers = async (req, res, next) => {
  try {
    // Fetch all orders
    const storeBranch = await StoreBranch.find({
      deleted: false,
      user: req.user.id,
    });

    if (!storeBranch) {
      return res
        .status(404)
        .json({ success: false, message: "Store branch not found" });
    }

    const storeBranchIDs = storeBranch.map((branch) => branch._id);

    // // Get all the orders from the admin's branches only
    const orders = await Order.find({
      "selectedStore.store": storeBranchIDs,
    })
      .populate("customer", "fname lname avatar addresses")
      .populate("selectedStore.store");

    // Extract unique user IDs from orders
    const usersWithTransactions = [
      ...new Set(orders.map((order) => order.customer)),
    ];

    const counter = usersWithTransactions.length;

    res.status(200).json({
      success: true,
      counter,
      usersWithTransactions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.AllStoreEmployee = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const users = await User.find({
      deleted: false,
      role: "employee",
      storebranch: req.params.id,
    });
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

exports.AllStoreRider = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const users = await User.find({
      deleted: false,
      role: "rider",
      storebranch: req.params.id,
    });
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

exports.GetStaffDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "storebranch",
      "branch _id"
    );
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
