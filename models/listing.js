const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

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
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Cascade delete middleware - delete all reviews when listing is deleted
listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
    console.log(
      `Deleted ${doc.reviews.length} reviews associated with listing: ${doc.title}`
    );
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
