const PhyChemTest = require("../models/phychemtest");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.createPhyChemTest = async (req, res, next) => {
  try {
    const { dateTested } = req.body;
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        req.body.certImage,
        {
          folder: "phychemtests",
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

    const storeId = req.params.id;
    const phyChemTest = await PhyChemTest.create({
      user: req.user.id,
      storebranch: storeId,
      certImage: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      dateTested,
    });

    res.status(201).json({
      success: true,
      phyChemTest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAllPhyChemTests = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    if (!storeId) {
      return next(new ErrorHandler(`No record found: ${storeId}`));
    }

    const allPhyChemTests = await PhyChemTest.find({
      storebranch: storeId,
      deleted: false,
    });

    res.status(200).json({
      success: true,
      allPhyChemTests,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updatePhyChemTest = async (req, res, next) => {
  const newStoreData = { dateTested: req.body.dateTested };

  try {
    if (req.body.certImage && req.body.certImage !== "") {
      const cert = await PhyChemTest.findById(req.params.id);
      const image_id = cert.certImage.public_id;
      const res = await cloudinary.uploader.destroy(image_id);
      const result = await cloudinary.v2.uploader.upload(
        req.body.certImage,
        {
          folder: "certImage",
          // width: 150,
          // crop: "scale",
        },
        (err, res) => {
          console.log(err, res);
        }
      );
      newStoreData.certImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    const updatedPhyChem = await PhyChemTest.findByIdAndUpdate(
      req.params.id,
      newStoreData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      updatedPhyChem,
      message: "Business permit updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSinglePhyChemTestDetails = async (req, res, next) => {
  try {
    const phyChemTest = await PhyChemTest.findById(req.params.id);

    if (!phyChemTest) {
      return next(
        new ErrorHandler(`PhyChemTest not found with ID: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      phyChemTest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteSinglePhyChemTest = async (req, res, next) => {
  try {
    const phyChemTest = await PhyChemTest.findByIdAndUpdate(
      req.params.id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!phyChemTest) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res
      .status(200)
      .json({ success: true, phyChemTest, message: "Record soft deleted" });
  } catch (error) {
    // Handle error, log, or send an appropriate response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
