const BarangayHealth = require("../models/barangayhealth");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.createBarangayHealthRecord = async (req, res, next) => {
  try {
    const { dateVisited } = req.body;
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        req.body.certPotability,
        {
          folder: "certPotability",
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
    const storeId = req.params.id;
    const barangayHealth = await BarangayHealth.create({
      user: req.user.id,
      storebranch: storeId,
      certPotability: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      dateVisited,
    });

    res.status(201).json({
      success: true,
      barangayHealth,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAllStoreBarangayHealthRecord = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    if (!storeId) {
      return next(new ErrorHandler(`No record found: ${storeId}`));
    }
    const barangayhealth = await BarangayHealth.find({
      storebranch: storeId,
      deleted: false,
    });
    res.status(200).json({
      success: true,
      barangayhealth,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateBarangayHealthRecord = async (req, res, next) => {
  const newStoreData = { dateVisited: req.body.dateVisited };

  try {
    if (req.body.certPotability && req.body.certPotability !== "") {
      const barangayhealth = await BarangayHealth.findById(req.params.id);
      const image_id = barangayhealth.certPotability.public_id;
      const res = await cloudinary.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.certPotability,
        {
          folder: "certPotability",
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newStoreData.certPotability = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    const barangayhealth = await BarangayHealth.findByIdAndUpdate(
      req.params.id,
      newStoreData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      barangayhealth,
      message: "pasok bhie",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleStoreBarangayHealthRecord = async (req, res, next) => {
  try {
    const barangayHealth = await BarangayHealth.findById(req.params.id);
    res.status(200).json({
      success: true,
      barangayHealth,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteStoreBarangayHealthRecord = async (req, res, next) => {
  try {
    const barangayHealth = await BarangayHealth.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!barangayHealth) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res
      .status(200)
      .json({ success: true, barangayHealth, message: "Record soft deleted" });
  } catch (error) {
    // Handle error, log, or send an appropriate response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
