const TypeOfGallon = require("../models/typeofgallon");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.registerTypeofGallon = async (req, res, next) => {
  try {
    const { typeofGallon, price } = req.body;

    const typeofg = await TypeOfGallon.create({
      typeofGallon,
      price,
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
      const typeofg = await TypeOfGallon.find();
      res.status(200).json({
        success: true,
        typeofg,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  };
