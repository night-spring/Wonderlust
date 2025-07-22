const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const ExpressError = require("./utils/ExpressError.js");
const sessionDetails = require("./utils/Session.js");

const listings = require("./routes/listings.js");
const listingsId = require("./routes/listingsId.js");
const reviews = require("./routes/reviews.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

app.use(session(sessionDetails));

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

// Home Route
app.get("/", (req, res) => {
  res.send("helo developer!");
});

// Routes
app.use("/listings", listings);
app.use("/listings/:id", listingsId);
app.use("/listings/:id/reviews", reviews);

// 404 Error
app.use((req, res, next) => {
  next(new ExpressError(404, `Page not found: ${req.originalUrl}`));
});

// Error Handling
app.use((err, req, res, next) => {
  res.render("error.ejs", { err });
});

// Server start
app.listen(8080, () => {
  console.log("server is listening on the port 8080");
});
