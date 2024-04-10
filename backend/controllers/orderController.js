const Order = require("../models/order");
const User = require("../models/user");
const StoreBranch = require("../models/storeBranch");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const Product = require("../models/product");
exports.newOrder = async (req, res, next) => {
  // console.log("order",req.body);
  const {
    orderItems,
    orderProducts,
    containerStatus,
    orderclaimingOption,
    selectedStore,
    deliveryAddress,
    paymentInfo,
    totalPrice,
    // notes,
  } = req.body;

  const order = await Order.create({
    customer: req.user._id,
    orderItems,
    orderProducts,
    containerStatus,
    orderclaimingOption,
    selectedStore,
    deliveryAddress,
    paymentInfo,
    totalPrice,
    // notes,
    deliveredAt: Date.now(),
  });

  if (orderProducts && orderProducts.length > 0) {
    for (const orderProduct of orderProducts) {
      const { product, quantity } = orderProduct;

      const productss = await Product.findById(product);
      if (!productss) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Update the stock of the product
      productss.stocks.push({
        quantity: -quantity, // subtracting quantity from stock
        datedAt: new Date(),
      });

      await productss.save();
    }
  }
  if (orderProducts && orderProducts.length > 0) {
    for (const orderProduct of orderProducts) {
      const { productId, quantity } = orderProduct;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Update the stock of the product
      product.stocks.push({
        quantity: -quantity, // subtracting quantity from stock
        datedAt: new Date(),
      });

      await product.save();
    }
  }

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

exports.addOrderStatuswithRider = async (req, res, next) => {
  try {
    const { orderLevel, staff } = req.body;

    const newOrderStatus = {
      orderLevel,
      datedAt: Date.now(),
      staff: staff,
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

    const storeBranchIDs = storeBranch.map((branch) => branch._id);

    const orders = await Order.find({
      "selectedStore.store": storeBranchIDs,
    }).populate("customer", "fname lname");

    const orderCount = orders.length;

    res.status(200).json({
      success: true,
      orderCount: orderCount,
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
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
        path: "orderProducts.type",
        model: "TypeOfGallon",
        select: "typeofGallon",
      })
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

exports.allOrdersEmployee = async (req, res, next) => {
  try {
    const employee = await User.findOne({
      _id: req.user.id,
      deleted: false,
      role: "employee",
    });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const storeBranchID = employee.storebranch;

    const orders = await Order.find({
      "selectedStore.store": storeBranchID,
    }).populate("customer", "fname lname");

    const orderCount = orders.length;

    res.status(200).json({
      success: true,
      orderCount: orderCount,
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.allOrdersRider = async (req, res, next) => {
  try {
    const rider = await User.findOne({
      _id: req.user.id,
      deleted: false,
      role: "rider",
    });

    if (!rider) {
      return res
        .status(404)
        .json({ success: false, message: "Rider not found" });
    }

    const storeBranchID = rider.storebranch;

    const orders = await Order.find({
      "selectedStore.store": storeBranchID,
      orderStatus: {
        $elemMatch: {
          staff: req.user.id,
        },
      },
    }).populate("customer", "fname lname");

    const orderCount = orders.length;

    res.status(200).json({
      success: true,
      orderCount: orderCount,
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
