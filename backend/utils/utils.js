const StoreBranch = require("../models/storeBranch");
const TypeOfGallon = require("../models/typeofgallon");
const User = require("../models/user");
const Order = require("../models/order");
const BusinessPermit = require("../models/businesspermit");
const BarangayHealth = require("../models/barangayhealth");
const PhyChemTest = require("../models/phychemtest");
const mongoose = require("mongoose");
const {
  storeRenewalNotification,
} = require("../controllers/notificationController");
exports.notifyAdmin = async (io) => {
  let today = new Date(); //production
  // Get all admin ids
  const userIds = await User.find({ role: "admin" }).select("_id");
  console.log("userIds", userIds);
  const branches = await StoreBranch.find({ user: { $in: userIds } }).select(
    "_id branch"
  );
  console.log("branches", branches);
  const branchIds = branches.map((branch) => branch._id);
  const businessPermits = await BusinessPermit.aggregate([
    {
      $match: {
        storebranch: { $in: branchIds },
      },
    },
    {
      $sort: { dateIssued: -1 },
    },
    {
      $group: {
        _id: "$storebranch",
        businessPermitId: { $first: "$_id" },
        user: { $first: "$user" },
        permitImage: { $first: "$permitImage" },
        dateIssued: { $first: "$dateIssued" },
        expiryDate: { $first: "$expiryDate" },
        createdAt: { $first: "$createdAt" },
        deleted: { $first: "$deleted" },
      },
    },
  ]);
  const potability = await BarangayHealth.aggregate([
    {
      $match: {
        storebranch: { $in: branchIds },
      },
    },
    {
      $sort: { dateIssued: -1 },
    },
    {
      $group: {
        _id: "$storebranch",
        potabilityID: { $first: "$_id" },
        user: { $first: "$user" },
        certPotability: { $first: "$certPotability" },
        dateVisited: { $first: "$dateVisited" },
        expiryDate: { $first: "$expiryDate" },
        createdAt: { $first: "$createdAt" },
        deleted: { $first: "$deleted" },
      },
    },
  ]);
  const phychem = await PhyChemTest.aggregate([
    {
      $match: {
        storebranch: { $in: branchIds },
      },
    },
    {
      $sort: { dateIssued: -1 },
    },
    {
      $group: {
        _id: "$storebranch",
        phychemID: { $first: "$_id" },
        user: { $first: "$user" },
        certImage: { $first: "$certImage" },
        dateTested: { $first: "$dateTested" },
        expiryDate: { $first: "$expiryDate" },
        createdAt: { $first: "$createdAt" },
        deleted: { $first: "$deleted" },
      },
    },
  ]);
  console.log("phychem", phychem);
  phychem.forEach(async (cert) => {
    let title = "";
    const branchName = branches.find(
      (branch) => branch._id.toString() === cert._id.toString()
    );
    if (branchName) {
      title = branchName.branch;
    }
    const message =
      "Your Physical and Chemical Testing Certificate is about to expire in 1 week.";

    // Calculate the date 1 week before the expiry date
    const oneWeekBeforeExpiry = new Date(cert.expiryDate);
    oneWeekBeforeExpiry.setDate(oneWeekBeforeExpiry.getDate() - 7);
    // today = oneWeekBeforeExpiry;
    // Check if today's date is equal to one week before the expiry date
    if (
      today.toISOString().slice(0, 10) ===
      oneWeekBeforeExpiry.toISOString().slice(0, 10)
    ) {
      await storeRenewalNotification(
        message,
        title,
        cert.phychemID,
        "PhyChemID",
        cert.user
      );
      io.emit("triggerRenewalNotification");
    } else {
      console.log("Today's date is not 1 week before the expiry date");
    }
  });
  console.log("potability", potability);
  potability.forEach(async (cert) => {
    let title = "";
    const branchName = branches.find(
      (branch) => branch._id.toString() === cert._id.toString()
    );
    if (branchName) {
      title = branchName.branch;
    }
    const message =
      "Your Potability Testing Certificate is about to expire in 1 week.";

    // Calculate the date 1 week before the expiry date
    const oneWeekBeforeExpiry = new Date(cert.expiryDate);
    oneWeekBeforeExpiry.setDate(oneWeekBeforeExpiry.getDate() - 7);
    // today = oneWeekBeforeExpiry;
    // Check if today's date is equal to one week before the expiry date
    if (
      today.toISOString().slice(0, 10) ===
      oneWeekBeforeExpiry.toISOString().slice(0, 10)
    ) {
      await storeRenewalNotification(
        message,
        title,
        cert.potabilityID,
        "PotabilityID",
        cert.user
      );
      io.emit("triggerRenewalNotification");
    } else {
      console.log("Today's date is not 1 week before the expiry date");
    }
  });
  console.log("business permits", businessPermits);
  // Assuming today's date is

  businessPermits.forEach(async (businessPermit) => {
    let title = "";
    const branchName = branches.find(
      (branch) => branch._id.toString() === businessPermit._id.toString()
    );
    if (branchName) {
      title = branchName.branch;
    }
    const message = "Your business permit is about to expire in 1 week.";

    // Calculate the date 1 week before the expiry date
    const oneWeekBeforeExpiry = new Date(businessPermit.expiryDate);
    oneWeekBeforeExpiry.setDate(oneWeekBeforeExpiry.getDate() - 7);
    // today = oneWeekBeforeExpiry;
    // Check if today's date is equal to one week before the expiry date
    if (
      today.toISOString().slice(0, 10) ===
      oneWeekBeforeExpiry.toISOString().slice(0, 10)
    ) {
      await storeRenewalNotification(
        message,
        title,
        businessPermit.businessPermitId,
        "businessPermitID",
        businessPermit.user
      );
      io.emit("triggerRenewalNotification");
    } else {
      console.log("Today's date is not 1 week before the expiry date");
    }
  });
};

exports.getUserIdAndBranchFromOrder = async (orderId) => {
  const order = await Order.findById(orderId).select(
    "customer selectedStore.branchNo"
  );
  return order;
};

exports.getAdminIdFromBranch = async (branch) => {
  const adminId = await StoreBranch.findById(branch).select("user");
  return adminId.user;
};
exports.getEmployeeIdFromBranch = async (branch) => {
  const employees = await User.find({
    storebranch: branch,
    role: "employee",
  }).select("_id");
  return employees;
};
exports.getRiderBranchFromId = async (id) => {
  const riders = await User.findById(id).select("storebranch");
  const branch = await StoreBranch.findById(riders.storebranch).select(
    "branch"
  );
  return branch.branch;
};
exports.getProductTypeName = async (productType) => {
  const name = await TypeOfGallon.findById(productType).select("typeofGallon");
  return name.typeofGallon;
};
// exports.notifyAdmin = async (io, adminId, adminSockets, message, title, orderItems, orderProducts)=>{
//     const socketId = adminSockets[adminId];

//     if (orderProducts && orderProducts.length > 0){
//         orderProducts = await Promise.all(orderProducts.map(async (product) => {
//             const name = await this.getProductTypeName(product.type);
//             return { ...product, type: name }
//         }))
//     }
//    console.log("orderProducts", orderProducts);
//     if (socketId){
//         io.to(socketId).emit("newOrder", {title: title,message: message, orderItems: orderItems, orderProducts: orderProducts});
//     }

// }
