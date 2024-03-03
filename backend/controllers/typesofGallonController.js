const TypeOfGallon = require("../models/typeofgallon");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.registerTypeofGallon = async (req, res, next) => {
  try {
    const { typeofGallon, price } = req.body;

    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        req.body.gallonImage,
        {
          folder: "gallon",
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

    const typeofg = await TypeOfGallon.create({
      typeofGallon,
      price,
      gallonImage: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      typeofg,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateTypeofGallon = async (req, res, next) => {
  const newData = {
    typeofGallon: req.body.typeofGallon,
    price: req.body.price,
  };
  if (req.body.gallonImage && req.body.gallonImage !== "") {
    const gallon = await TypeOfGallon.findById(req.params.id);
    const image_id = gallon.gallonImage.public_id;
    const res = await cloudinary.uploader.destroy(image_id);
    const result = await cloudinary.v2.uploader.upload(
      req.body.gallonImage,
      {
        folder: "gallon",
        width: 150,
        crop: "scale",
      },
      (err) => {
        console.log(err);
      }
    );
    newData.gallonImage = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const typeofg = await TypeOfGallon.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
};

exports.AllTypesGallons = async (req, res, next) => {
  try {
    const typeGallon = await TypeOfGallon.find({ deleted: false });
    res.status(200).json({
      success: true,
      typeGallon,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteGallonType = async (req, res, next) => {
  const { id } = req.params;
  const gallonType = await TypeOfGallon.findOneAndDelete({ _id: id });

  if (!gallonType)
    return res
      .status(404)
      .json({ success: false, message: "StoreBranch not found" });

  res.status(200).json({ success: true, message: "StoreBranch deleted" });
};

exports.getSingleGallonType = async (req, res, next) => {
  try {
    const gallonType = await TypeOfGallon.findById(req.params.id);
    res.status(200).json({
      success: true,
      gallonType,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
