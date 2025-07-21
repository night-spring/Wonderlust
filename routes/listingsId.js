const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const asyncWrap = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

// Edit Route
router.get(
  "/edit",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    const listingData = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listingData });
  })
);

// Show Route
router.get(
  "/",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    const listingData = await Listing.findById(id).populate("reviews");
    if (!listingData) {
      throw new ExpressError(404, "Listing not found!");
    }
    res.render("./listings/show.ejs", { listingData });
  })
);

// Upddate Route
router.put(
  "/",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let newListing = req.body.listing;
    console.log(newListing);
    await Listing.findByIdAndUpdate(id, newListing);
    console.log("Update successfull!");
    res.redirect(`/listings/${id}`);
  })
);

// Delete Route
router.delete(
  "/",
  asyncWrap(async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found!");
    }
    console.log("Listing deleted successfully!");
    res.redirect("/listings");
  })
);

module.exports = router;