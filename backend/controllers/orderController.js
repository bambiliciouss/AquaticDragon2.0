const Order = require("../models/order");
const User = require("../models/user");
const StoreBranch = require("../models/storeBranch");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const Product = require("../models/product");
const StoreBarangay = require("../models/storebarangay");
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
  // if (orderProducts && orderProducts.length > 0) {
  //   for (const orderProduct of orderProducts) {
  //     const { productId, quantity } = orderProduct;

  //     const product = await Product.findById(productId);
  //     if (!product) {
  //       return res.status(404).json({ error: "Product not found" });
  //     }

  //     // Update the stock of the product
  //     product.stocks.push({
  //       quantity: -quantity, // subtracting quantity from stock
  //       datedAt: new Date(),
  //     });

  //     await product.save();
  //   }
  // }

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

exports.getOrderTransactions = async (req, res, next) => {
  try {
    const branch = req.params.id;
    const { filter } = req.query; // 'daily', 'weekly', 'monthly'
    // Query the database for the earliest order
    const firstOrder = await Order
      .find({ 'selectedStore.store': new mongoose.Types.ObjectId(branch) })
      .sort({ createdAt: 1 })
      .limit(1);

    let startDate = firstOrder.length > 0 ? firstOrder[0].createdAt : new Date();
    let endDate = new Date();

    let groupBy;
    if (filter === 'daily') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // set the time to the start of today

      endDate = new Date();
      endDate.setDate(endDate.getDate() + 1); // set the date to tomorrow
      endDate.setHours(0, 0, 0, 0); // set the time to the start of tomorrow

      groupBy = { $dateToString: { format: "%Y-%m-%d %H:00", date: "$createdAt" } };
    } else if (filter === 'weekly') {
      const today = new Date();

      startDate = new Date();
      startDate.setDate(today.getDate() - 6); // go back 6 days from today
      startDate.setHours(0, 0, 0, 0); // set the time to the start of the day

      endDate = new Date();
      endDate.setHours(23, 59, 59, 999); // set the time to the end of the day

      groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    } else if (filter === 'monthly') {
      groupBy = { $dateToString: { format: "%m", date: "$createdAt" } };
    } else if (filter === 'yearly') {
      groupBy = { $year: "$createdAt" };
    }

    const transactions = await Order.aggregate([
      {
        $match: {
          'selectedStore.store': new mongoose.Types.ObjectId(branch),
          createdAt: { $gte: startDate, $lt: endDate },
          $or: [
            { containerStatus: { $regex: "Walk In", $options: "i" }, orderclaimingOption: { $regex: "Walk In", $options: "i" } },
            { containerStatus: { $regex: "Walk In", $options: "i" }, orderclaimingOption: { $regex: "Deliver", $options: "i" } },
            { containerStatus: { $regex: "Pick Up", $options: "i" }, orderclaimingOption: { $regex: "Walk In", $options: "i" } },
            { containerStatus: { $regex: "Pick Up", $options: "i" }, orderclaimingOption: { $regex: "Deliver", $options: "i" } }
          ]
        }
      },
      {
        $group: {
          _id: {
            date: groupBy,
            status: { $concat: ["$containerStatus", " - ", "$orderclaimingOption"] }
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          orders: {
            $push: {
              status: "$_id.status",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          orders: 1,
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    if (filter === 'monthly') {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      transactions.forEach(transaction => {
        transaction._id = monthNames[parseInt(transaction._id) - 1];
      });
    }
    res.status(200).json({
      success: true,
      transactions,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString()
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


exports.getOrdersByGallonType = async (req, res, next) => {
  try {
    const branchID = req.params.id;
    const { filter } = req.query;

    // Query the database for the earliest order
    const firstOrder = await Order
      .find({ 'selectedStore.store': new mongoose.Types.ObjectId(branchID) })
      .sort({ createdAt: 1 })
      .limit(1);

    let startDate = firstOrder.length > 0 ? firstOrder[0].createdAt : new Date();
    let endDate = new Date();

    let groupBy;
    if (filter === 'daily') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // set the time to the start of today

      endDate = new Date();
      endDate.setDate(endDate.getDate() + 1); // set the date to tomorrow
      endDate.setHours(0, 0, 0, 0); // set the time to the start of tomorrow

      groupBy = { $dateToString: { format: "%Y-%m-%d %H:00", date: "$createdAt" } };
    } else if (filter === 'weekly') {
      const today = new Date();

      startDate = new Date();
      startDate.setDate(today.getDate() - 6); // go back 6 days from today
      startDate.setHours(0, 0, 0, 0); // set the time to the start of the day

      endDate = new Date();
      endDate.setHours(23, 59, 59, 999); // set the time to the end of the day

      groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    } else if (filter === 'monthly') {
      groupBy = { $dateToString: { format: "%m", date: "$createdAt" } };
    } else if (filter === 'yearly') {
      groupBy = { $year: "$createdAt" };
    }
    const orders = await Order.aggregate([
      {
        $match: {
          'selectedStore.store': new mongoose.Types.ObjectId(branchID),
          createdAt: { $gte: startDate, $lt: endDate }
        }

      },
      {
        $facet: {
          "Refill": [
            { $match: { "orderItems": { $exists: true, $ne: [] } } },
            { $unwind: "$orderItems" },
            {
              $group: {
                _id: {
                  date: groupBy,
                  gallon: "$orderItems.gallon",
                  typeName: "$orderItems.type"
                },
                count: { $sum: "$orderItems.quantity" }
              }
            },
            {
              $group: {
                _id: "$_id.date",
                orders: {
                  $push: {
                    gallon: "$_id.gallon",
                    typeName: "$_id.typeName",
                    count: "$count"
                  }
                }
              }
            },
            {
              $project: {
                _id: { $toString: "$_id" },
                orders: 1,
              }
            },
            {
              $sort: {
                "_id": 1
              }
            }
          ],
          "New Container": [
            { $match: { "orderProducts": { $exists: true, $ne: [] } } },
            { $unwind: "$orderProducts" },
            {
              $group: {
                _id: {
                  date: groupBy,
                  gallon: "$orderProducts.product",
                  typeName: "$orderProducts.type"
                },

                count: { $sum: "$orderProducts.quantity" }
              }
            },
            {
              $lookup: {
                from: "typeofgallons",
                localField: "_id.typeName",
                foreignField: "_id",
                as: "type"
              }
            },
            {
              $unwind: "$type"
            },
            {
              $group: {
                _id: "$_id.date",
                orders: {
                  $push: {
                    gallon: "$_id.gallon",
                    typeName: "$type.typeofGallon",
                    count: "$count"
                  }
                }
              }
            },
            {
              $project: {
                _id: { $toString: "$_id" },
                orders: 1,
                count: 1
              }
            },
            {
              $sort: {
                "_id": 1
              }
            }

          ]
        }
      }
    ]);
    if (filter === 'monthly') {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      orders.forEach(order => {
        order.Refill.forEach(refill => {
          refill._id = monthNames[parseInt(refill._id) - 1];
        })
        order["New Container"].forEach(newContainer => {
          newContainer._id = monthNames[parseInt(newContainer._id) - 1];

        })
      });
    }
    res.json({
      orders,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getOrderByBarangay = async (req, res, next) => {
  try {
    const branch = req.params.id;

    const storeBarangay = await StoreBarangay.find({
      storebranch: branch,
      deleted: false,
    });

    let barangayCondition;

    if (Array.isArray(storeBarangay)) {
      barangayCondition = { $exists: true, $in: storeBarangay.map(barangay => barangay.barangay) };
    } else {
      barangayCondition = { $exists: true, $eq: storeBarangay.barangay };
    }
    const result = await Order.aggregate([
      {
        $match: {
          'selectedStore.store': new mongoose.Types.ObjectId(branch),
          'deliveryAddress.barangay': barangayCondition
        }
      },
      {
        $facet: {
          orders: [
            {
              $group: {
                _id: "$deliveryAddress.barangay",
                count: { $sum: 1 }
              }
            }
          ],
          totalOrders: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            }
          ]
        }
      }
    ]);
    const totalOrders = result[0].totalOrders.length > 0 ? result[0].totalOrders[0].count : 0;
    res.status(200).json({
      success: true,
      orders: result[0].orders,
      totalOrders: totalOrders
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


exports.getAcceptedAndDeliveredOrders = async (req, res, next) => {
  try {
    const branch = req.params.id;
    // Get the month and year from the request query parameters
    const month = req.query.month; // 1-12
    const year = req.query.year; // e.g., 2024

    // If month and year are provided, set startDate and endDate to cover the start and end of the specified month
    if (month && year) {
      startDate = new Date(year, month - 1); // months are 0-indexed in JavaScript
      endDate = new Date(year, month % 12, 1); // if month is December, set endDate to January of the next year
    } else {
      // If no month and year are provided, set startDate and endDate to cover all possible dates
      const firstOrder = await Order
        .find({ 'selectedStore.store': new mongoose.Types.ObjectId(branch) })
        .sort({ createdAt: 1 })
        .limit(1);

      startDate = firstOrder.length > 0 ? firstOrder[0].createdAt : new Date(0); // default to Unix epoch time if no filter is provided
      endDate = new Date(); // default to now if no filter is provided
    }

    const employees = await Order.aggregate([
      { $unwind: "$orderStatus" },
      { $match: { "orderStatus.orderLevel": "Order Accepted", "selectedStore.store": new mongoose.Types.ObjectId(branch), createdAt: { $gte: startDate, $lt: endDate }, } },
      { $lookup: { from: "users", localField: "orderStatus.staff", foreignField: "_id", as: "staff" } },
      { $unwind: "$staff" },
      { $group: { _id: { month: { $month: "$createdAt" }, name: { $concat: ["$staff.fname", " ", "$staff.lname"] } }, count: { $sum: 1 } } },
      { $project: { _id: 0, name: "$_id.name", count: 1, month: { $let: { vars: { months: ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, in: { $arrayElemAt: ["$$months", "$_id.month"] } } } } },
      { $sort: { count: -1, "name": 1 } },
      { $limit: 10 }
    ]);
    
    let groupBy;
    // Get counts for riders who delivered orders
    const riders = await Order.aggregate([
      { $unwind: "$orderStatus" },
      { $match: { "orderStatus.orderLevel": "Delivered", "selectedStore.store": new mongoose.Types.ObjectId(branch), createdAt: { $gte: startDate, $lt: endDate }, } },
      { $lookup: { from: "users", localField: "orderStatus.staff", foreignField: "_id", as: "staff" } },
      { $unwind: "$staff" },
      { $group: { _id: { month: { $month: "$createdAt" }, name: { $concat: ["$staff.fname", " ", "$staff.lname"] } }, count: { $sum: 1 } } },
      { $project: { _id: 0, name: "$_id.name", count: 1, month: { $let: { vars: { months: ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, in: { $arrayElemAt: ["$$months", "$_id.month"] } } } } },
      { $sort: { count: -1, "name": 1 } },
      { $limit: 10 }
    ]);
    // if (filter === 'monthly') {
    //   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //   riders.forEach(transaction => {
    //     transaction._id = monthNames[parseInt(transaction._id) - 1];
    //   });
    // }
    res.status(200).json({
      success: true,
      employees: employees,
      riders: riders
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}