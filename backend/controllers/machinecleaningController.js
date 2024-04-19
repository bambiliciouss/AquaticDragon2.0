const MachineCleaning = require("../models/machinecleaning");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.createMachineCleaningRecord = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    const { dateIssued } = req.body;
    const dateIssuedObj = new Date(dateIssued);

    // Create a new Date object for the expiry date
    const expiryDate = new Date(dateIssuedObj);

    // Add 6 months to the expiry date
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    const selectedItems = JSON.parse(req.body.selectedItems);
    const machinecleaning = await MachineCleaning.create({
      user: req.user.id,
      storebranch: storeId,
      checklist: selectedItems,
      dateIssued: new Date(dateIssued),
      expiryDate
    });

    res.status(201).json({
      success: true,
      machinecleaning,
      //message: "New Gallon is registered to your account ",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAllStoreMachineCleaningDetails = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    if (!storeId) {
      return next(new ErrorHandler(`No record found: ${storeId}`));
    }
    const storeStoreMachineCleaning = await MachineCleaning.find({
      storebranch: storeId,
      deleted: false,
    });

    // if (!storeStaff || storeStaff.length === 0) {

    res.status(200).json({
      success: true,
      storeStoreMachineCleaning,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// exports.updateStoreMachineCleaning = async (req, res, next) => {
//   const newUserData = {
//     notes: req.body.notes,
//   };
//   console.log("celeaning iimage url", req.body.cleaningImage.url);
//   try {
//     if (req.body.cleaningImage && req.body.cleaningImage !== "") {
//       const machineCleaning = await MachineCleaning.findById(req.params.id);
//       const image_id = machineCleaning.cleaningImage.public_id;

//       console.log("public_id", image_id);
//       const deleteResult = await cloudinary.uploader.destroy(image_id);

//       const uploadResult = await cloudinary.v2.uploader.upload(
//         req.body.cleaningImage,
//         {
//           folder: "machinecleaning",
//           width: 150,
//           crop: "scale",
//         },
//         (err, result) => {
//           console.log("Cloudinary Upload Result:", err, result);
//         }
//       );

//       newUserData.cleaningImage = {
//         public_id: uploadResult.public_id,
//         url: uploadResult.secure_url,
//       };
//     }
//     const machineCleaning = await MachineCleaning.findByIdAndUpdate(
//       req.params.id,
//       newUserData,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       machineCleaning,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.updateStoreMachineCleaning = async (req, res, next) => {
  const { dateIssued } = req.body;
  console.log("req.body", dateIssued);
  const newStoreData = {
    checklist: JSON.parse(req.body.selectedItems),
    dateIssued: new Date(req.body.dateIssued),
  };

  try {
    const machineCleaning = await MachineCleaning.findByIdAndUpdate(
      req.params.id,
      newStoreData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      machineCleaning,
      message: "pasok bhie",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// exports.updateStoreMachineCleaning = async (req, res, next) => {
//   const newUserData = {
//     notes: req.body.notes,
//   };
//   //console.log(req.file);
//   console.log("result to beh", req.body);
//   try {
//     if (req.body.cleaningImage !== "") {
//       const mc = await MachineCleaning.findById(req.user.id);

//       // Check if the user has an existing avatar
//       if (mc.cleaningImage && mc.cleaningImage.public_id) {
//           const image_id = mc.cleaningImage.public_id;

//           // Destroy the previous avatar
//           await cloudinary.v2.uploader.destroy(image_id);
//       }

//       // Upload the new avatar
//       const uploadResult = await cloudinary.v2.uploader.upload(
//           req.body.cleaningImage,
//           {
//               folder: "machinecleaning",
//               width: 150,
//               crop: "scale",
//           }
//       );

//       newUserData.cleaningImage = {
//           public_id: uploadResult.public_id,
//           url: uploadResult.secure_url,
//       };
//     }
//     const machineCleaning = await MachineCleaning.findByIdAndUpdate(
//       req.params.id,
//       newUserData,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       machineCleaning,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.getSingleStoreMachineCleaningDetails = async (req, res, next) => {
  try {
    const storeStoreMachineCleaning = await MachineCleaning.findById(
      req.params.id
    );

    // if (!storeStaff || storeStaff.length === 0) {

    res.status(200).json({
      success: true,
      storeStoreMachineCleaning,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteSingleStoreMachineCleaning = async (req, res, next) => {
  try {
    const machineCleaning = await MachineCleaning.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!machineCleaning) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res
      .status(200)
      .json({ success: true, machineCleaning, message: "Record soft deleted" });
  } catch (error) {
    // Handle error, log, or send an appropriate response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
