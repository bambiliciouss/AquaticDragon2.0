const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Order = require("../models/order");
const StoreBranch = require("../models/storeBranch");

exports.AllUsers = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const users = await User.find({
      deleted: false,
      role: "user",
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

exports.AllPendingAdmin = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const users = await User.find({
      deleted: false,
      role: "PendingAdmin",
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

exports.AllAdmin = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const users = await User.find({
      deleted: false,
      role: "admin",
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

exports.AdminAllStoreBranch = async (req, res, next) => {
  try {
    const storeBranch = await StoreBranch.find({
      deleted: false,
      user: req.params.id,
    });

    res.status(200).json({
      success: true,
      storeBranch,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.AdminApproval = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.role = "admin";
    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: "User role changed to admin successfully",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
