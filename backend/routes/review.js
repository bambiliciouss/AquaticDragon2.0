const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {createReview, getUserReviews, deleteReview, getSingleReview, updateSingleReview, getAllUserReviewsByBranch} = require("../controllers/reviewController");

router.post("/create/review", isAuthenticatedUser, createReview);
router.get("/user/reviews/:id/:order", isAuthenticatedUser, getUserReviews);
router.get("/user/review/:id", isAuthenticatedUser, getSingleReview);
router.route("/user/review/:comment").delete(isAuthenticatedUser, deleteReview).put(isAuthenticatedUser, updateSingleReview);

router.get("/admin/reviews/:id", isAuthenticatedUser, authorizeRoles("admin"), getAllUserReviewsByBranch);


module.exports = router