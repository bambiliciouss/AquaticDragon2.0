const BusinessPermit = require("../models/businesspermit");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.createBusinessPermit = async (req, res, next) => {
  try {
    const { dateIssued } = req.body;

    // Upload the permit image to cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        req.body.permitImage,
        {
          folder: "businesspermits",
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

    // Assuming you have a user id and store id available
    const storeId = req.params.id;
    const userId = req.user.id;

    // Create the business permit
    const businessPermit = await BusinessPermit.create({
      user: userId,
      storebranch: storeId,
      permitImage: {
        public_id: result.public_id,
        url: result.secure_url,
      },

      dateIssued,
    });

    // Send response
    res.status(201).json({
      success: true,
      businessPermit,
    });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAllStoreBusinessPermits = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    if (!storeId) {
      return next(new ErrorHandler(`No record found for storeId: ${storeId}`));
    }

    const businessPermits = await BusinessPermit.find({
      storebranch: storeId,
      deleted: false,
    });

    res.status(200).json({
      success: true,
      businessPermits,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateBusinessPermit = async (req, res, next) => {
  const newStoreData = { dateIssued: req.body.dateIssued };

  try {
    if (req.body.permitImage && req.body.permitImage !== "") {
      const businessPermit = await BusinessPermit.findById(req.params.id);
      const image_id = businessPermit.permitImage.public_id;
      const res = await cloudinary.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.permitImage,
        {
          folder: "businesspermits",
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newStoreData.permitImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    const updatedPermit = await BusinessPermit.findByIdAndUpdate(
      req.params.id,
      newStoreData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      updatedPermit,
      message: "Business permit updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleStoreBusinessPermit = async (req, res, next) => {
  try {
    const businessPermit = await BusinessPermit.findById(req.params.id);

    if (!businessPermit) {
      return res
        .status(404)
        .json({ success: false, message: "Business permit not found" });
    }

    res.status(200).json({
      success: true,
      businessPermit,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteStoreBusinessPermit = async (req, res, next) => {
  try {
    const businessPermit = await BusinessPermit.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!businessPermit) {
      return res
        .status(404)
        .json({ success: false, message: "Business permit not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        businessPermit,
        message: "Business permit soft deleted",
      });
  } catch (error) {
    // Handle error, log, or send an appropriate response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
