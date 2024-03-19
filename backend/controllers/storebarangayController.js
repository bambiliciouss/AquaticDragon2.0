const StoreBarangay = require("../models/storebarangay");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.createStoreBarangay = async (req, res, next) => {
  try {
    const { barangay } = req.body;
    if (!barangay) {
      return res.status(400).json({ message: "Please provide barangay" });
    }

    // Check if the combination already exists
    const existingRecord = await StoreBarangay.findOne({
      storebranch: req.params.id,
      barangay,
      deleted: false,
    });

    if (existingRecord) {
      return res.status(400).json({ message: "Duplicate record" });
    }

    const storebarangay = await StoreBarangay.create({
      user: req.user.id,
      storebranch: req.params.id,
      barangay,
    });

    res.status(201).json({
      success: true,
      storebarangay,
    });
  } catch (error) {
    console.error("Error creating store barangay:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllStoreBarangay = async (req, res, next) => {
  try {
    const storeId = req.params.id;

    // Check if storeId is provided
    if (!storeId) {
      return next(new ErrorHandler(`No record found: ${storeId}`));
    }

    // Find all barangay health records for the given storeId
    const storeBarangay = await StoreBarangay.find({
      storebranch: storeId,
      deleted: false,
    });

    // Respond with the found barangay health records
    res.status(200).json({
      success: true,
      storeBarangay,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching store barangay health records:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateStoreBarangay = async (req, res, next) => {
  console.log(req.body);
  try {
    const newData = {
      user: req.user.id,
      storebranch: req.body.storebranch,
      barangay: req.body.barangay,
    };

    const storeBranch = await StoreBarangay.findById(req.params.id).populate(
      "storebranch",
      "_id"
    );
    // console.log("STOREBRANCH", storeBranch.storebranch);

    const existingRecord = await StoreBarangay.findOne({
      storebranch: storeBranch.storebranch,
      barangay: req.body.barangay,
      deleted: false,
    });

    if (existingRecord) {
      return res.status(400).json({ message: "Duplicate record" });
    }

    const updatedStoreBarangay = await StoreBarangay.findByIdAndUpdate(
      req.params.id,
      newData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStoreBarangay) {
      return res
        .status(404)
        .json({ success: false, message: "StoreBarangay not found" });
    }

    res.status(200).json({
      success: true,
      updatedStoreBarangay,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error updating store barangay:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getStoreBarangayDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const storeBarangay = await StoreBarangay.findById(id);

    if (!storeBarangay) {
      return res.status(404).json({ message: "StoreBarangay not found" });
    }
    res.status(200).json({
      success: true,
      storeBarangay,
    });
  } catch (error) {
    console.error("Error fetching store barangay details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteStoreBarangay = async (req, res, next) => {
  try {
    const deletedStoreBarangay = await StoreBarangay.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!deletedStoreBarangay) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res.status(200).json({
      success: true,
      storeBarangay: deletedStoreBarangay,
      message: "Record soft deleted",
    });
  } catch (error) {
    console.error("Error deleting store barangay:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
