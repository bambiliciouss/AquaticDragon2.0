const Order = require("../models/order");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.newOrder = async (req, res, next) => {
  const {
    orderItems,
    containerStatus,
    orderclaimingOption,
    storeBranch,
    pickupAddress,
    deliveryAddress,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    containerStatus,
    orderclaimingOption,
    storeBranch,
    pickupAddress,
    deliveryAddress,
    paymentInfo,
    deliveredAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    order,
    message: "Order Success",
  });
};
