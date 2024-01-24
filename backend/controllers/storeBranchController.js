const StoreBranch = require("../models/storeBranch");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.registerStoreBranch = async (req, res, next) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        req.body.storeImage,
        {
          folder: "store",
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

    const {
      branchNo,
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      deliverFee,
    } = req.body;
    console.log(req.body);

    const storeBranch = await StoreBranch.create({
      branchNo,
      houseNo,
      streetName,
      purokNum,
      barangay,
      city,
      deliverFee,
      user: req.user.id,
      storeImage: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      storeBranch,
      //message: "New Gallon is registered to your account ",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


exports.AllStoreBranch = async (req, res, next) => {
  try {
    const storeBranch = await StoreBranch.find();
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

exports.deleteStoreBranch  = async (req, res, next) => {
  const { id } = req.params;
  const gallon = await StoreBranch.findOneAndDelete({ _id: id });

  if (!gallon)
    return res
      .status(404)
      .json({ success: false, message: "StoreBranch not found" });

  res.status(200).json({ success: true, message: "StoreBranch deleted" });
};