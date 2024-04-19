const Review = require("../models/review");
const mongoose = require("mongoose");
exports.createReview = async (req, res) => {
  const { comment, rating, order, user, branchName, branchID } = req.body;
  try {
    const review = await Review.create({
      comment,
      rating,
      order,
      storebranch:{
        branchID,
        branchName
      },
      userID: user,
    });
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      userID: new mongoose.Types.ObjectId(req.params.id),
      order: new mongoose.Types.ObjectId(req.params.order),
    }).populate("userID");
    console.log("reviews", reviews);
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    console.log("comment ID to be deleted: ", req.params.comment);
    const review = await Review.findByIdAndDelete(req.params.comment);
    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getSingleReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found", success: false });
    }
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.updateSingleReview = async (req, res) => {
  try {
    console.log("body of update: ", req.body)
    console.log("comment ID to be updated: ", req.params.comment)
    const {comment, rating, order, user} = req.body
    const review = await Review.findByIdAndUpdate(new mongoose.Types.ObjectId(req.params.comment), {
        comment,
        rating,
        order,
        userID: user,
        
    }, {
      new: true,
    });
    res.status(200).json({
        success: true,
        review
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
