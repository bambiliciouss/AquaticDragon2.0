const MachineCleaning = require("../models/machinecleaning");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.createMachineCleaningRecord = async (req, res, next) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        req.body.cleaningImage,
        {
          folder: "machinecleaning",
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
    const {  notes } = req.body;

    const machinecleaning = await MachineCleaning.create({
      user: req.user.id,
      storebranch: storeId,
      cleaningImage: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      notes,
    });

    res.status(201).json({
      success: true,
      machinecleaning,
      //message: "New Gallon is registered to your account ",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
