const Order = require("../models/order");
const StoreBranch = require("../models/storeBranch");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.newOrder = async (req, res, next) => {
  // console.log("order",req.body);
  const {
    orderItems,
    containerStatus,
    orderclaimingOption,
    selectedStore,
    deliveryAddress,
    paymentInfo,
    totalPrice,
    notes,
  } = req.body;

  const order = await Order.create({
    customer: req.user._id,
    orderItems,
    containerStatus,
    orderclaimingOption,
    selectedStore,
    deliveryAddress,
    paymentInfo,
    totalPrice,
    notes,
    deliveredAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    order,
    message: "Order Success",
  });

  console.log(order);
};

exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ customer: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
};

exports.addOrderStatus = async (req, res, next) => {
  try {
    const { orderLevel, datedAt } = req.body;

    const newOrderStatus = {
      orderLevel,
      datedAt: Date.now(),
      staff: req.user._id,
    };

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.orderStatus.push(newOrderStatus);

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.allOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("customer", "fname lname");
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.allOrdersAdmin = async (req, res, next) => {
  try {
    const storeBranch = await StoreBranch.find({
      deleted: false,
      user: req.user.id,
    });

    if (!storeBranch) {
      return res
        .status(404)
        .json({ success: false, message: "Store branch not found" });
    }

    const storeBranchIDs = storeBranch.map(branch => branch._id);


    // // Get all the orders from the admin's branches only
    const orders = await Order.find({
      "selectedStore.store": storeBranchIDs,
    }).populate("customer", "fname lname", );

    const orderCount = orders.length;

    res.status(200).json({
      success: true,
      orderCount: orderCount,
      orders: orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "fname lname email")
      .populate({
        path: "orderStatus.staff",
        model: "User",
        select: "fname lname",
      })
      .exec();
    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 401));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
