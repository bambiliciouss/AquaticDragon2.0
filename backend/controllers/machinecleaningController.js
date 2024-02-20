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
    const { notes } = req.body;

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

exports.getStoreMachineCleaningDetails = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    if (!storeId) {
      return next(
        new ErrorHandler(`No record found: ${storeId}`)
      );
    }
    const storeStoreMachineCleaning = await MachineCleaning.find({
      storebranch: storeId,
    });

    // if (!storeStaff || storeStaff.length === 0) {

    res.status(200).json({
      success: true,
      storeStoreMachineCleaning,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateStoreMachineCleaning = async (req, res, next) => {
  const newStoreData = {
    notes: req.body.notes,
  };

  try {
    if (req.body.cleaningImage && req.body.cleaningImage !== "") {
      const machineCleaning = await MachineCleaning.findById(req.params.id);
      const image_id = machineCleaning.cleaningImage.public_id;
      const res = await cloudinary.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.cleaningImage,
        {
          folder: "machinecleaning",
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newStoreData.cleaningImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    const machineCleaning = await MachineCleaning.findByIdAndUpdate(
      req.params.id,
      newStoreData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      machineCleaning,
      message: "pasok bhie",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleStoreMachineCleaningDetails = async (req, res, next) => {
  try {
    const storeStoreMachineCleaning = await MachineCleaning.findById(
      req.params.id
    );

    // if (!storeStaff || storeStaff.length === 0) {

    res.status(200).json({
      success: true,
      storeStoreMachineCleaning,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteSingleStoreMachineCleaning = async (req, res, next) => {
  try {
    const machineCleaning = await MachineCleaning.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!machineCleaning) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res
      .status(200)
      .json({ success: true, machineCleaning, message: "Record soft deleted" });
  } catch (error) {
    // Handle error, log, or send an appropriate response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
