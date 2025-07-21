const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const asyncWrap = require("../utils/wrapAsync.js");

// Index Route
router.get("/", asyncWrap(async (req, res) => {
    const data = await Listing.find({});
    res.render("./listings/index.ejs", { data });
  })
);

// Create Route
router.post("/", asyncWrap(async (req, res) => {
    let listing = req.body.listing;
    console.log(listing);
    const newListing = new Listing(listing);
    await newListing.save();
    console.log("Success: this data is saved!");
    res.redirect("/listings");
  })
);

// New Route
router.get("/new", asyncWrap(async (req, res) => {
    res.render("./listings/new.ejs");
  })
);


module.exports = router;