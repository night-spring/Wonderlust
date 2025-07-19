const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://www.hostyapp.com/wp-content/uploads/2020/11/Not-so-Important-Airbnb-Amenities.jpeg",
      set: (v) =>
        v === ""
          ? "https://www.hostyapp.com/wp-content/uploads/2020/11/Not-so-Important-Airbnb-Amenities.jpeg"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
