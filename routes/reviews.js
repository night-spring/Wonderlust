const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const asyncWrap = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

// Create Review Route
router.post(
  "/",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found!");
    }

    // Validate review data
    if (
      !req.body.review ||
      !req.body.review.rating ||
      !req.body.review.comment
    ) {
      throw new ExpressError(400, "Rating and comment are required!");
    }

    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("Review added successfully!");
    res.redirect(`/listings/${id}`);
  })
);

// Delete Review Route
router.delete(
  "/:reviewId",
  asyncWrap(async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document
    await Review.findByIdAndDelete(reviewId);

    console.log("Review deleted successfully!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;