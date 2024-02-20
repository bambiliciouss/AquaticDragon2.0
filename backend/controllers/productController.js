const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.createProduct = async (req, res, next) => {
  try {
    const { storebranch, typesgallon, stock } = req.body;

    const product = await Product.create({
      storebranch,
      typesgallon,
      stock,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateProductStock = async (req, res, next) => {
  try {
    const newData = {
      stock: req.body.stock,
    };

    const product = await Product.findByIdAndUpdate(req.params.id, newData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.AllProductStock = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.AllProductStockinStore = async (req, res, next) => {
  try {
    const product = await Product.find({ storebranch: req.params.id });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

