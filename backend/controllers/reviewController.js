const Review = require("../models/review");
const mongoose = require("mongoose");
exports.createReview = async (req, res) => {
  const { comment, rating, order, user, branchName, branchID } = req.body;
  try {
    const review = await Review.create({
      comment,
      rating,
      order,
      storebranch: {
        branchID,
        branchName,
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
      deleted: false,
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
    const review = await Review.findByIdAndUpdate(
      req.params.comment,
      { $set: { deleted: true } },
      { new: true }
    );
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
    console.log("body of update: ", req.body);
    console.log("comment ID to be updated: ", req.params.comment);
    const { comment, rating, order, user } = req.body;
    const review = await Review.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params.comment),
      {
        comment,
        rating,
        order,
        userID: user,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.getAllUserReviewsByBranch = async (req, res) => {
  try {
    // Get the month and year from the request query parameters
    const month = req.query.month; // 1-12
    const year = req.query.year; // e.g., 2024

    // If month and year are provided, set startDate and endDate to cover the start and end of the specified month
    if (month && year) {
      startDate = new Date(year, month - 1); // months are 0-indexed in JavaScript
      endDate = new Date(year, month % 12, 1); // if month is December, set endDate to January of the next year
    } else {
      // If no month and year are provided, set startDate and endDate to cover all possible dates
      const firstOrder = await Order.find({
        "selectedStore.store": new mongoose.Types.ObjectId(branch),
      })
        .sort({ createdAt: 1 })
        .limit(1);

      startDate = firstOrder.length > 0 ? firstOrder[0].createdAt : new Date(0); // default to Unix epoch time if no filter is provided
      endDate = new Date(); // default to now if no filter is provided
    }

    const reviews = await Review.aggregate([
      {
        $match: {
          "storebranch.branchID": new mongoose.Types.ObjectId(req.params.id),
          deleted: false,
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            userID: "$userID",
            comment: "$comment",
            rating: "$rating",
            branchName: "$storebranch.branchName",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          
          count: 1,
          month: {
            $let: {
              vars: {
                months: [
                  "",
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
                ],
              },
              in: { $arrayElemAt: ["$$months", "$_id.month"] },
            },
          },
        },
      },
      { $sort: { count: -1, name: 1 } },
    ]);
    // const reviews = await Review.find({
    //   "storebranch.branchID": new mongoose.Types.ObjectId(req.params.id),
    //   deleted: false
    // }).sort({createdAt: -1}).exec();
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
