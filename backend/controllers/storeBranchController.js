const StoreBranch = require("../models/storeBranch");
const StoreBarangay = require("../models/storebarangay");
const User = require("../models/user");
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

    const { address, deliverFee, branch } = req.body;
    //console.log(req.body);

    const storeBranch = await StoreBranch.create({
      branch,
      address,
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
    const storeBranch = await StoreBranch.find({ deleted: false });
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

exports.AdminAllStoreBranch = async (req, res, next) => {
  try {
    const storeBranch = await StoreBranch.find({
      deleted: false,
      user: req.user.id,
    });
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

exports.deleteStoreBranch = async (req, res, next) => {
  const { id } = req.params;

  try {
    const store = await StoreBranch.findByIdAndUpdate(
      id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found" });
    }

    res.status(200).json({ success: true, message: "Store soft deleted" });
  } catch (error) {
    // Handle error, log, or send an appropriate response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.GetStoreDetails = async (req, res, next) => {
  try {
    const storeBranch = await StoreBranch.findById(req.params.id);
    if (!storeBranch) {
      return next(
        new ErrorHandler(`Store does not found with id: ${req.params.id}`)
      );
    }
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

exports.updateStoreBranch = async (req, res, next) => {
  const newStoreData = {
    address: req.body.address,
    deliverFee: req.body.deliverFee,
    branch: req.body.branch,
  };

  try {
    if (req.body.storeImage && req.body.storeImage !== "") {
      const storeBranch = await StoreBranch.findById(req.params.id);
      const image_id = storeBranch.storeImage.public_id;
      const res = await cloudinary.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.storeImage,
        {
          folder: "storeImage",
          width: 150,
          crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newStoreData.storeImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    const storeBranch = await StoreBranch.findByIdAndUpdate(
      req.params.id,
      newStoreData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      storeBranch,
      message: "pasok bhie",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.AllStoreBranchUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const defaultAddress = user.addresses.find((address) => address.isDefault);

    if (!defaultAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Default address not found" });
    }

    // Extract the barangay value from the default address
    const defaultAddressBarangay = defaultAddress.barangay;

    const storeBarangay = await StoreBarangay.find({
      deleted: false,
      barangay: defaultAddressBarangay,
    }).populate("storebranch", "branch address storeImage deliverFee");

    // const storeBranches = await StoreBranch.find({ deleted: false });
    res.status(200).json({
      success: true,
      storeBarangay,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
