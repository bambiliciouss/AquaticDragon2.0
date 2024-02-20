const StoreStaff = require("../models/storestaff");
const StoreBranch = require("../models/storeBranch");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

// exports.assignStore = async (req, res, next) => {
//   try {
//     const { storebranch } = req.body;
//     const userId = req.params.id;
//     const staff = await StoreStaff.create({
//       user: userId,
//       storebranch,
//     });

//     res.status(201).json({
//       success: true,
//       staff,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.assignStore = async (req, res, next) => {
  try {
    const { storebranch } = req.body;
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Check if the store branch exists
    const storeBranch = await StoreBranch.findById(storebranch);
    if (!storeBranch) {
      return res
        .status(404)
        .json({ success: false, error: "Store branch not found" });
    }

    // Update or insert the store assignment
    const result = await StoreStaff.findOneAndUpdate(
      { user: userId },
      { user: userId, storebranch: storebranch },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      staff: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.GetStoreStaffDetails = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    const storeStaff = await StoreStaff.find({ storebranch: storeId }).populate(
      "user",
      "fname lname email role"
    );

    // if (!storeStaff || storeStaff.length === 0) {
    if (!storeStaff) {
      return next(
        new ErrorHandler(`No store staff found for store ID: ${storeId}`)
      );
    }

    res.status(200).json({
      success: true,
      storeStaff,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.GetSingleStoreStaffDetails = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const storeStaffdetails = await StoreStaff.find({ user: userId }).populate(
      "storebranch",
      "_id"
    );

    // if (!storeStaff || storeStaff.length === 0) {
    if (!storeStaffdetails) {
      return next(
        new ErrorHandler(`No user staff found for store ID: ${storeId}`)
      );
    }

    res.status(200).json({
      success: true,
      storeStaffdetails,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteStoreStaff = async (req, res, next) => {
  const { id } = req.params;

  const storeStaff = await StoreStaff.findOneAndDelete({ _id: id });

  if (!storeStaff)
    return res
      .status(404)
      .json({ success: false, message: "Store Staff not found" });
  //return next(new ErrorHandler("Store Staff not found", 404));

  res.status(200).json({ success: true, message: "Store Staff  deleted" });
};
