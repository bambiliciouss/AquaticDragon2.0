const Gallon = require("../models/gallon");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

exports.registerGallon = async (req, res, next) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        req.body.gallonImage,
        {
          folder: "gallon",
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

    const { type, gallonAge } = req.body;

    const gallon = await Gallon.create({
      type,

      user: req.user.id,
      gallonImage: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      gallon,
      //message: "New Gallon is registered to your account ",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateGallon = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new ErrorHandler("Invalid ID", 404));

  try {
    // Assuming you have user information available in req.user
    const loggedInUserId = req.user.id;

    const gallon = await Gallon.findOne({ _id: id });

    if (!gallon) return next(new ErrorHandler("Gallon not found", 404));

    // Check if the logged-in user is the owner of the motorcycle
    if (gallon.user.toString() !== loggedInUserId) {
      return next(new ErrorHandler("Unauthorized Access", 403));
    }

    // If the user is the owner, proceed with the update
    const updateGallon = await Gallon.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({ success: true, gallon: updateGallon });
  } catch (err) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};

exports.myGallons = async (req, res, next) => {
  try {
    const gallon = await Gallon.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      gallon,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// exports.deleteMyGallon = async (req, res, next) => {
//   const { id } = req.params;
//   const gallon = await Gallon.findOneAndDelete({ _id: id });

//   if (!gallon)
//     return res
//       .status(404)
//       .json({ success: false, message: "Gallon not found" });

//   res.status(200).json({ success: true, message: "Gallon deleted" });
// };

exports.deleteMyGallon = async (req, res, next) => {
  const { id } = req.params;

  try {
    const gallon = await Gallon.findByIdAndUpdate(
      id,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!gallon) {
      return res
        .status(404)
        .json({ success: false, message: "Gallon not found" });
    }

    res.status(200).json({ success: true, message: "Gallon soft deleted" });
  } catch (error) {
    // Handle error, log, or send an appropriate response
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.AllGallons = async (req, res, next) => {
  try {
    const gallons = await Gallon.find({ deleted: false }).populate("user", "fname lname");
    res.status(200).json({
      success: true,
      gallons,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getMyGallon = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ success: false, message: "Invalid ID" });

  const gallon = await Gallon.findById(id);

  if (!gallon)
    return res.status(404).json({ success: false, message: "Not found" });

  return res.json({ success: true, gallon });
};
