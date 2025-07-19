const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const asyncWrap = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

// Home Route
app.get("/", (req, res) => {
  res.send("helo developer!");
});

// Index Route
app.get(
  "/listings",
  asyncWrap(async (req, res) => {
    const data = await Listing.find({});
    res.render("./listings/index.ejs", { data });
  })
);

// Create Route
app.post(
  "/listings",
  asyncWrap(async (req, res) => {
    let listing = req.body.listing;
    console.log(listing);
    const newListing = new Listing(listing);
    await newListing.save();
    console.log("Success: this data is saved!");
    res.redirect("/listings");
  })
);

// New Route
app.get(
  "/listings/new",
  asyncWrap(async (req, res) => {
    res.render("./listings/new.ejs");
  })
);

// Edit Route
app.get(
  "/listings/:id/edit",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    const listingData = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listingData });
  })
);

// Show Route
app.get(
  "/listings/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    const listingData = await Listing.findById(id);
    res.render("./listings/show.ejs", { listingData });
  })
);

// Upddate Route
app.put(
  "/listings/:id",
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
app.delete(
  "/listings/:id",
  asyncWrap(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("Delected successfully!");
    res.redirect("/listings");
  })
);

app.use((req, res, next) => {
  next(new ExpressError(404, `Page not found: ${req.originalUrl}`));
});

// Error Handling
app.use((err, req, res, next) => {
  res.render("error.ejs", {err});
});

app.listen(8080, () => {
  console.log("server is listening on the port 8080");
});
