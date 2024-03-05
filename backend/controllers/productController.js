const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.createProduct = async (req, res, next) => {
  try {
    const { typesgallon, quantity, price } = req.body;

    const existingProduct = await Product.findOne({
      storebranch: req.params.id,
      typesgallon,
      deleted: false,
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message:
          "Product already exists.",
      });
    }

    const stocks = { quantity };

    const product = await Product.create({
      storebranch: req.params.id,
      typesgallon,
      stocks: [stocks],
      user: req.user.id,
      price,
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

exports.ProductStocklogs = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const stockLogs = product.stocks.filter((stock) => !stock.deleted);

    res.status(200).json({
      success: true,
      stockLogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.DeleteProductStocklogs = async (req, res, next) => {
  try {
    // Find the product by productId and ensure it belongs to the logged-in user
    const product = await Product.findOne({
      _id: req.params.productId,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the specific log in stocks array by stockId
    const stock = product.stocks.id(req.params.id);

    if (!stock) {
      return res.status(404).json({ message: "Stock log not found" });
    }

    // Mark the log as deleted
    stock.deleted = true;

    // Save the changes
    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Stock log marked as deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProductStock = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.stocks.push({
      quantity,
      datedAt: new Date(),
    });

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.AllProductStockinStore = async (req, res, next) => {
  try {
    const product = await Product.find({
      storebranch: req.params.id,
      deleted: false,
    }).populate("typesgallon", "typeofGallon");
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

exports.SingleProductStock = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate([
      { path: "typesgallon", select: "typeofGallon" },
      { path: "storebranch", select: "branch" },
    ]);

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

exports.updateProduct = async (req, res, next) => {
  const newStoreData = {
    price: req.body.price,
  };

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      newStoreData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      product,
      message: "pasok bhie",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product soft deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
