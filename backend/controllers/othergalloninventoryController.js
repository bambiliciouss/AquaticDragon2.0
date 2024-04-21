const OtherGallon = require("../models/othergalloninventory");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.addOtherGallonInventory = async (req, res) => {
  try {
    const { othertypeGallon, price, quantity } = req.body;
    const otherGallon = await OtherGallon.create({
      user: req.user.id,
      storebranch: req.params.id,
      othertypeGallon,
      price,
      quantity,
    });
    res
      .status(201)
      .json({ message: "Inventory added successfully", data: otherGallon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllOtherGallonStoreInventory = async (req, res) => {
  try {
    const storeId = req.params.id;
    const otherGallonInventory = await OtherGallon.find({
      storebranch: storeId,
      deleted: false,
    });

    res.status(200).json({
      success: true,
      otherGallonInventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getOtherGallonInventoryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const otherGallon = await OtherGallon.findById(id);

    if (!otherGallon) {
      return res.status(404).json({ message: "OtherGallon not found" });
    }
    res.status(200).json({
      success: true,
      otherGallon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateOtherGallonStoreInventory = async (req, res, next) => {
  try {
    const newData = {
      othertypeGallon: req.body.othertypeGallon,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    const otherGallon = await OtherGallon.findByIdAndUpdate(
      req.params.id,
      newData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!otherGallon) {
      return res
        .status(404)
        .json({ success: false, message: "OtherGallon not found" });
    }

    res.status(200).json({
      success: true,
      otherGallon,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteOtherGallonStoreInventory = async (req, res, next) => {
  try {
    const otherGallon = await OtherGallon.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!otherGallon) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res
      .status(200)
      .json({ success: true, otherGallon, message: "Record soft deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


exports.getTotalSalesWalkin = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const totalSalesByBranch = await OtherGallon.aggregate([
      {
        $match: {
          deleted: false,
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $group: {
          _id: '$storebranch',
          totalSales: { $sum: { $multiply: ['$price', '$quantity'] } },
        },
      },
      {
        $lookup: {
          from: 'storebranches', // replace with the actual name of your store branches collection
          localField: '_id',
          foreignField: '_id',
          as: 'storebranch',
        },
      },
      {
        $unwind: '$storebranch',
      },
      {
        $project: {
          _id: 1,
          totalSales: 1,
          branch: '$storebranch.branch',
        },
      },
    ]);
    
    res.status(200).json({
      success:true,
      totalSalesByBranch: totalSalesByBranch});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
