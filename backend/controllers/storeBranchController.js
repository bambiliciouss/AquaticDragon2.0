const StoreBranch = require("../models/storeBranch");
const StoreBarangay = require("../models/storebarangay");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const Order = require("../models/order");
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
    const userID = req.params.id
    const branches = await StoreBranch.find({ user: userID, deleted: false })
    if (!branches) {
      return res.status(404).json({ success: false, message: "Branches not found" })
    }
    res.status(200).json({
      success: true,
      branches: branches
    })


  } catch (error) {

  }
}


exports.getSalesOrderByBranch = async (req, res) => {
  try {
    const branches = await StoreBranch.find({ user: req.params.id });
    const branchIds = branches.map((branch) => branch._id);

    const salesByBranch = await Order.aggregate([
      {
        $match: {
          'selectedStore.store': { $in: branchIds },
        },
      },
      {
        $group: {
          _id: '$selectedStore.store',
          totalSales: { $sum: '$totalPrice' },
        },
      },
      {
        $lookup: {
          from: 'storebranches', // replace with the actual name of your store branches collection
          localField: '_id',
          foreignField: '_id',
          as: 'store',
        },
      },
      {
        $unwind: '$store',
      },
      {
        $project: {
          _id: 1,
          branch: '$store.branch',
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
    
    const branch = await User.findById(req.params.id).select('storebranch');
    

    const salesByBranch = await Order.aggregate([
      {
        $match: {
          'selectedStore.store': new mongoose.Types.ObjectId(branch.storebranch),
        },
      },
      {
        $group: {
          _id: '$selectedStore.store',
          totalSales: { $sum: '$totalPrice' },
        },
      },
      {
        $lookup: {
          from: 'storebranches', // replace with the actual name of your store branches collection
          localField: '_id',
          foreignField: '_id',
          as: 'store',
        },
      },
      {
        $unwind: '$store',
      },
      {
        $project: {
          _id: 1,
          branch: '$store.branch',
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

    const salesByBranch = await Order.aggregate([
      {
        $match: {
          'selectedStore.store': { $in: branchIds },
        },
      },
      {
        $group: {
          _id: '$selectedStore.store',
          totalSales: { $sum: '$totalPrice' },
        },
      },
      {
        $lookup: {
          from: 'storebranches', // replace with the actual name of your store branches collection
          localField: '_id',
          foreignField: '_id',
          as: 'store',
        },
      },
      {
        $unwind: '$store',
      },
      {
        $lookup: {
          from: 'othergallons', // replace with the actual name of your OtherGallon collection
          localField: '_id',
          foreignField: 'storebranch',
          as: 'otherGallons',
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
              }
            }
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
          branch: '$store.branch',
          totalSales: 1,
        },
      },
    ]);

    res.status(200).json(salesByBranch);
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
    if (filter === 'today') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // set the time to the start of today

      endDate = new Date();
      endDate.setDate(endDate.getDate() + 1); // set the date to tomorrow
      endDate.setHours(0, 0, 0, 0); // set the time to the start of tomorrow
      dateFilter = { $gte: startDate, $lt: endDate };
    } else if (filter === 'week') {
      const today = new Date();

      startDate = new Date();
      startDate.setDate(today.getDate() - 6); // go back 6 days from today
      startDate.setHours(0, 0, 0, 0); // set the time to the start of the day

      endDate = new Date();
      endDate.setHours(23, 59, 59, 999); // set the time to the end of the day

      dateFilter = { $gte: startDate, $lt: endDate };
    } else if (filter === 'month') {
      dateFilter = { $gte: new Date(today.setMonth(0)), $lte: new Date(today.setMonth(11)) };
    } else if (filter === 'year') {
      dateFilter = { $gte: new Date(today.setFullYear(today.getFullYear() - 5)) };
    }
    //Group by date based on filter value
    if (filter === 'today') {
      groupBy = { $dateToString: { format: "%Y-%m-%d %H:00", date: "$createdAt" } };
    } else if (filter === 'week') {
      groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    } else if (filter === 'month') {
      groupBy = { $dateToString: { format: "%m", date: "$createdAt" } };
    } else if (filter === 'year') {
      groupBy = { $year: "$createdAt" };
    }
    const salesByBranch = await Order.aggregate([
      {
        $match: {
          'selectedStore.store': new mongoose.Types.ObjectId(branch),
          createdAt: dateFilter,
        },
      },
      {
        $group: {
          _id: {
            'store': '$selectedStore.store',
            'date': groupBy
          },
          totalSales: { $sum: '$totalPrice' },
        },
      },
      {
        $lookup: {
          from: 'storebranches', // replace with the actual name of your store branches collection
          localField: '_id.store',
          foreignField: '_id',
          as: 'store',
        },
      },
      {
        $unwind: '$store',
      },
      {
        $lookup: {
          from: 'othergallons', // replace with the actual name of your OtherGallon collection
          localField: '_id',
          foreignField: 'storebranch',
          as: 'otherGallons',
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
              }
            }
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
          branch: '$store.branch',
          totalSales: 1,
        },
      },
      {
        $sort: { '_id.date': 1 }
      }
    ]);
    if (filter === 'month') {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      salesByBranch.forEach(order => {
        order._id.date = monthNames[parseInt(order._id.date) - 1];

      });
    }
    res.status(200).json({
      salesByBranch,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeeBranches = async (req, res) => {
  try {
    const userID = req.params.id
    const branches = await User.findById(userID).select('storebranch')
    if (!branches) {
      return res.status(404).json({ success: false, message: "Branches not found" })
    }
    res.status(200).json({
      success: true,
      branches: branches
    })


  } catch (error) {
    console.log(error)
  }
}