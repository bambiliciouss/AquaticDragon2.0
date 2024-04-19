const StoreBranch = require("../models/storeBranch");
const StoreBarangay = require("../models/storebarangay");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const Order = require("../models/order");
const OtherGallon = require("../models/othergalloninventory");
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
    const defaultAddress = user.addresses.find(
      (address) => !address.isDeleted && address.isDefault
    );
    // console.log("Default Address:", defaultAddress);
    if (!defaultAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Please set up your address first." });
    }
    // Extract the barangay value from the default address
    const defaultAddressBarangay = defaultAddress.barangay;
    if (!defaultAddressBarangay) {
      return res.status(404).json({
        success: false,
        message: "Default address barangay not found",
      });
    }

    const storeBarangay = await StoreBarangay.find({
      deleted: false,
      barangay: defaultAddressBarangay,
    }).populate("storebranch", "branch address storeImage deliverFee");

    // if (storeBarangay.length === 0) {
    //   return res
    //     .status(404)
    //     .json({
    //       success: false,
    //       message: "No store available store in your area",
    //     });
    // }

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

exports.getAdminBranches = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const branches = await StoreBranch.find({ user: userID, deleted: false });
    if (!branches) {
      return res
        .status(404)
        .json({ success: false, message: "Branches not found" });
    }
    res.status(200).json({
      success: true,
      branches: branches,
    });
  } catch (error) {}
};

exports.getSalesOrderByBranch = async (req, res) => {
  try {
    const branches = await StoreBranch.find({ user: req.params.id });
    const branchIds = branches.map((branch) => branch._id);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const salesByBranch = await Order.aggregate([
      {
        $match: {
          "selectedStore.store": { $in: branchIds },
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $group: {
          _id: "$selectedStore.store",
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $lookup: {
          from: "storebranches", // replace with the actual name of your store branches collection
          localField: "_id",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $unwind: "$store",
      },
      {
        $project: {
          _id: 1,
          branch: "$store.branch",
          totalSales: 1,
        },
      },
    ]);

    res.status(200).json(salesByBranch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getSalesOrderByBranchEmployee = async (req, res) => {
  try {
    const branch = await User.findById(req.params.id).select("storebranch");

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const salesByBranch = await Order.aggregate([
      {
        $match: {
          "selectedStore.store": new mongoose.Types.ObjectId(
            branch.storebranch
          ),
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $group: {
          _id: "$selectedStore.store",
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $lookup: {
          from: "storebranches", // replace with the actual name of your store branches collection
          localField: "_id",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $unwind: "$store",
      },
      {
        $project: {
          _id: 1,
          branch: "$store.branch",
          totalSales: 1,
        },
      },
    ]);

    res.status(200).json(salesByBranch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getSalesByBranch = async (req, res) => {
  try {
    const branches = await StoreBranch.find({ user: req.params.id });
    const branchIds = branches.map((branch) => branch._id);
    const { filter } = req.query; // 'daily', 'weekly', 'monthly'
    // Query the database for the earliest order
    const firstOrder = await Order.find({
      "selectedStore.store": { $in: branchIds },
    })
      .sort({ createdAt: 1 })
      .limit(1);

    let startDate =
      firstOrder.length > 0 ? firstOrder[0].createdAt : new Date();
    let endDate = new Date();

    let groupBy;
    if (filter === "today") {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // set the time to the start of today

      endDate = new Date();
      endDate.setDate(endDate.getDate() + 1); // set the date to tomorrow
      endDate.setHours(0, 0, 0, 0); // set the time to the start of tomorrow

      groupBy = {
        $dateToString: { format: "%Y-%m-%d %H:00", date: "$createdAt" },
      };
    } else if (filter === "week") {
      const today = new Date();

      startDate = new Date();
      startDate.setDate(today.getDate() - 6); // go back 6 days from today
      startDate.setHours(0, 0, 0, 0); // set the time to the start of the day

      endDate = new Date();
      endDate.setHours(23, 59, 59, 999); // set the time to the end of the day

      groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    } else if (filter === "month") {
      groupBy = { $dateToString: { format: "%m", date: "$createdAt" } };
    } else if (filter === "year") {
      groupBy = { $year: "$createdAt" };
    }
    const salesByBranch = await Order.aggregate([
      {
        $match: {
          "selectedStore.store": { $in: branchIds },
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { store: "$selectedStore.store", date: groupBy },
          totalSales: { $sum: "$totalPrice" },
        },
      },

      {
        $lookup: {
          from: "storebranches", // replace with the actual name of your store branches collection
          localField: "_id.store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $unwind: "$store",
      },
      {
        $lookup: {
          from: "othergallons", // replace with the actual name of your OtherGallon collection
          localField: "_id",
          foreignField: "storebranch",
          as: "otherGallons",
        },
      },
      {
        $addFields: {
          totalWalkInSales: {
            $sum: {
              $map: {
                input: "$otherGallons",
                as: "gallon",
                in: {
                  $multiply: ["$$gallon.price", "$$gallon.quantity"],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          totalSales: { $add: ["$totalSales", "$totalWalkInSales"] },
        },
      },
      {
        $project: {
          _id: 1,
          branch: "$store.branch",
          totalSales: 1,
        },
      },
      {
        $group: {
          _id: "$_id.date",
          branches: {
            $push: {
              store: "$_id.store",
              branch: "$branch",
              totalSales: "$totalSales",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    if (filter === "month") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      salesByBranch.forEach((transaction) => {
        transaction._id = monthNames[parseInt(transaction._id) - 1];
      });
    }
    const walkinSalesByBranch = await OtherGallon.aggregate([
      {
        $match: {
          deleted: false,
          createdAt: { $gte: startDate, $lt: endDate },
          storebranch: {$in: branchIds},
        },
      },
      {
        $group: {
          _id: { storebranch: "$storebranch", date: groupBy },
          totalSales: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
      {
        $lookup: {
          from: "storebranches", // replace with the actual name of your store branches collection
          localField: "_id.storebranch",
          foreignField: "_id",
          as: "storebranch",
        },
      },
      {
        $unwind: "$storebranch",
      },
      {
        $project: {
          _id: 1,
          totalSales: 1,
          branch: "$storebranch.branch",
        },
      },
      {
        $group: {
          _id: "$_id.date",
          branches: {
            $push: {
              store: "$_id.storebranch",
              branch: "$branch",
              totalSales: "$totalSales",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    // Merge the two arrays
    const mergedSales = [...salesByBranch, ...walkinSalesByBranch];

    // Group the merged array by date and time
    const totalSales = mergedSales.reduce((acc, item) => {
      // Find an existing group for the current date and time
      const existingGroup = acc.find((group) => group._id === item._id);

      if (existingGroup) {
        // If a group exists, merge the branches
        item.branches.forEach((branch) => {
          const existingBranch = existingGroup.branches.find(
            (b) => b.store === branch.store
          );

          if (existingBranch) {
            // If the branch exists, sum the total sales
            existingBranch.totalSales += branch.totalSales;
          } else {
            // If the branch doesn't exist, add it
            existingGroup.branches.push(branch);
          }

          // Update the group's total sales
          existingGroup.totalSales =
            (existingGroup.totalSales || 0) + branch.totalSales;
        });
      } else {
        // If a group doesn't exist, add a new group
        item.totalSales = item.branches.reduce(
          (total, branch) => total + branch.totalSales,
          0
        );
        acc.push(item);
      }

      return acc;
    }, []);

    // Sort the groups by date and time
    totalSales.sort((a, b) => new Date(a._id) - new Date(b._id));
    res.status(200).json({
      totalSales,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSalesOfCurrentBranch = async (req, res) => {
  try {
    //Id of selected branch
    const branch = req.params.id;

    // Filter value (today, past7days, monthly, yearly)
    const filter = req.query.filter;
    let dateFilter = {};
    let groupBy = {};
    let startDate = new Date();
    let endDate = new Date();
    // Create date filter based on filter value
    const today = new Date();
    if (filter === "today") {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // set the time to the start of today

      endDate = new Date();
      endDate.setDate(endDate.getDate() + 1); // set the date to tomorrow
      endDate.setHours(0, 0, 0, 0); // set the time to the start of tomorrow
      dateFilter = { $gte: startDate, $lt: endDate };
    } else if (filter === "week") {
      const today = new Date();

      startDate = new Date();
      startDate.setDate(today.getDate() - 6); // go back 6 days from today
      startDate.setHours(0, 0, 0, 0); // set the time to the start of the day

      endDate = new Date();
      endDate.setHours(23, 59, 59, 999); // set the time to the end of the day

      dateFilter = { $gte: startDate, $lt: endDate };
    } else if (filter === "month") {
      dateFilter = {
        $gte: new Date(today.setMonth(0)),
        $lte: new Date(today.setMonth(11)),
      };
    } else if (filter === "year") {
      dateFilter = {
        $gte: new Date(today.setFullYear(today.getFullYear() - 5)),
      };
    }
    //Group by date based on filter value
    if (filter === "today") {
      groupBy = {
        $dateToString: { format: "%Y-%m-%d %H:00", date: "$createdAt" },
      };
    } else if (filter === "week") {
      groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    } else if (filter === "month") {
      groupBy = { $dateToString: { format: "%m", date: "$createdAt" } };
    } else if (filter === "year") {
      groupBy = { $year: "$createdAt" };
    }
    const salesByBranch = await Order.aggregate([
      {
        $match: {
          "selectedStore.store": new mongoose.Types.ObjectId(branch),
          createdAt: dateFilter,
        },
      },
      {
        $group: {
          _id: {
            store: "$selectedStore.store",
            date: groupBy,
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $lookup: {
          from: "storebranches", // replace with the actual name of your store branches collection
          localField: "_id.store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $unwind: "$store",
      },
      {
        $lookup: {
          from: "othergallons", // replace with the actual name of your OtherGallon collection
          localField: "_id",
          foreignField: "storebranch",
          as: "otherGallons",
        },
      },
      {
        $addFields: {
          totalWalkInSales: {
            $sum: {
              $map: {
                input: "$otherGallons",
                as: "gallon",
                in: {
                  $multiply: ["$$gallon.price", "$$gallon.quantity"],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          totalSales: { $add: ["$totalSales", "$totalWalkInSales"] },
        },
      },
      {
        $project: {
          _id: 1,
          branch: "$store.branch",
          totalSales: 1,
        },
      },
      {
        $sort: { "_id.date": 1 },
      },
    ]);
    if (filter === "month") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      salesByBranch.forEach((order) => {
        order._id.date = monthNames[parseInt(order._id.date) - 1];
      });
    }
    res.status(200).json({
      salesByBranch,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeeBranches = async (req, res) => {
  try {
    const userID = req.params.id;
    const branches = await User.findById(userID).select("storebranch");
    if (!branches) {
      return res
        .status(404)
        .json({ success: false, message: "Branches not found" });
    }
    res.status(200).json({
      success: true,
      branches: branches,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTotalSalesCurrentBranch = async (req, res) => {
  try {
    // const branches = await StoreBranch.find({ user: req.params.id });
    // const branchIds = branches.map((branch) => branch._id);
    const branchID = req.params.id;
    // Filter value (today, past7days, monthly, yearly)
    const filter = req.query.filter;
    let dateFilter = {};
    let groupBy = {};
    let startDate = new Date();
    let endDate = new Date();
    // Create date filter based on filter value
    const today = new Date();
    if (filter === "today") {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // set the time to the start of today

      endDate = new Date();
      endDate.setDate(endDate.getDate() + 1); // set the date to tomorrow
      endDate.setHours(0, 0, 0, 0); // set the time to the start of tomorrow
      dateFilter = { $gte: startDate, $lt: endDate };
    } else if (filter === "week") {
      const today = new Date();

      startDate = new Date();
      startDate.setDate(today.getDate() - 6); // go back 6 days from today
      startDate.setHours(0, 0, 0, 0); // set the time to the start of the day

      endDate = new Date();
      endDate.setHours(23, 59, 59, 999); // set the time to the end of the day

      dateFilter = { $gte: startDate, $lt: endDate };
    } else if (filter === "month") {
      dateFilter = {
        $gte: new Date(today.setMonth(0)),
        $lte: new Date(today.setMonth(11)),
      };
    } else if (filter === "year") {
      dateFilter = {
        $gte: new Date(today.setFullYear(today.getFullYear() - 5)),
      };
    }
    //Group by date based on filter value
    if (filter === "today") {
      groupBy = {
        $dateToString: {
          format: "%Y-%m-%d %H:00",
          date: "$createdAt",
          
        },
      };
    } else if (filter === "week") {
      groupBy = {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt",
          
        },
      };
    } else if (filter === "month") {
      groupBy = {
        $dateToString: {
          format: "%m",
          date: "$createdAt",
          
        },
      };
    } else if (filter === "year") {
      groupBy = { $year: "$createdAt" };
    }
    const salesByBranch = await Order.aggregate([
      {
        $match: {
          "selectedStore.store": new mongoose.Types.ObjectId(branchID),
          createdAt: dateFilter,
        },
      },
      {
        $group: {
          _id: { store: "$selectedStore.store", date: groupBy },
          totalSales: { $sum: "$totalPrice" },
        },
      },

      {
        $lookup: {
          from: "storebranches", // replace with the actual name of your store branches collection
          localField: "_id.store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $unwind: "$store",
      },
      {
        $lookup: {
          from: "othergallons", // replace with the actual name of your OtherGallon collection
          localField: "_id",
          foreignField: "storebranch",
          as: "otherGallons",
        },
      },
      {
        $addFields: {
          totalWalkInSales: {
            $sum: {
              $map: {
                input: "$otherGallons",
                as: "gallon",
                in: {
                  $multiply: ["$$gallon.price", "$$gallon.quantity"],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          totalSales: { $add: ["$totalSales", "$totalWalkInSales"] },
        },
      },
      {
        $project: {
          _id: 1,
          branch: "$store.branch",
          totalSales: 1,
        },
      },
      {
        $group: {
          _id: "$_id.date",
          branches: {
            $push: {
              store: "$_id.store",
              branch: "$branch",
              totalSales: "$totalSales",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    if (filter === "month") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      salesByBranch.forEach((transaction) => {
        transaction._id = monthNames[parseInt(transaction._id) - 1];
      });
    }
    const walkinSalesByBranch = await OtherGallon.aggregate([
      {
        $match: {
          deleted: false,
          createdAt: dateFilter,
          storebranch: new mongoose.Types.ObjectId(branchID),
        },
      },
      {
        $group: {
          _id: { storebranch: "$storebranch", date: groupBy },
          totalSales: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
      {
        $lookup: {
          from: "storebranches", // replace with the actual name of your store branches collection
          localField: "_id.storebranch",
          foreignField: "_id",
          as: "storebranch",
        },
      },
      {
        $unwind: "$storebranch",
      },
      {
        $project: {
          _id: 1,
          totalSales: 1,
          branch: "$storebranch.branch",
        },
      },
      {
        $group: {
          _id: "$_id.date",
          branches: {
            $push: {
              store: "$_id.storebranch",
              branch: "$branch",
              totalSales: "$totalSales",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    // Merge the two arrays
    const mergedSales = [...salesByBranch, ...walkinSalesByBranch];

    // Group the merged array by date and time
    const totalSales = mergedSales.reduce((acc, item) => {
      // Find an existing group for the current date and time
      const existingGroup = acc.find((group) => group._id === item._id);

      if (existingGroup) {
        // If a group exists, merge the branches
        item.branches.forEach((branch) => {
          const existingBranch = existingGroup.branches.find(
            (b) => b.store === branch.store
          );

          if (existingBranch) {
            // If the branch exists, sum the total sales
            existingBranch.totalSales += branch.totalSales;
          } else {
            // If the branch doesn't exist, add it
            existingGroup.branches.push(branch);
          }

          // Update the group's total sales
          existingGroup.totalSales =
            (existingGroup.totalSales || 0) + branch.totalSales;
        });
      } else {
        // If a group doesn't exist, add a new group
        item.totalSales = item.branches.reduce(
          (total, branch) => total + branch.totalSales,
          0
        );
        acc.push(item);
      }

      return acc;
    }, []);

    // Sort the groups by date and time
    totalSales.sort((a, b) => new Date(a._id) - new Date(b._id));

    // Output the result
    const result = {
      totalSales,
      startDate: "4/19/2024",
      endDate: "4/20/2024",
    };
    res.status(200).json({
      totalSales,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
