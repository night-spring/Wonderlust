const mongoose = require("mongoose");
const Data = require("./data.js");
const Listing = require("../models/listing.js");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

const initDB = async () => {
  try {
    await Listing.insertMany(Data.data);
    console.log("Sucess: data saved successfully");
  } catch (err) {
    console.log(err);
  }
};

initDB();
