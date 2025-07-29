// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js");

// const listingSchema = new Schema({
//     title : {
//         type: String,
//         required : true,
//     },

//     description : String,
//     // image: {
//     //     filename: String,
//     //     url: {
//     //         type: String,
//     //         default: "https://unsplash.com/photos/a-waterfall-in-the-middle-of-a-lush-green-forest-J6Fdqeb0Vcs",
//     //     set: (v) => v === "" ? "https://unsplash.com/photos/brown-wooden-lounge-chairs-near-pool-surrounded-by-palm-trees-vmIWr0NnpCQ" : v,
//     //     }
//     // },

//     image: {
//         type: String,
//         default: "https://unsplash.com/photos/a-waterfall-in-the-middle-of-a-lush-green-forest-J6Fdqeb0Vcs",
//         set: (v)  => v === "" ?  "https://unsplash.com/photos/brown-wooden-lounge-chairs-near-pool-surrounded-by-palm-trees-vmIWr0NnpCQ" : v,
//     },

//     price : Number,
//     location: String,
//     country: String,

// //       location: {
// //   type: String,
// //   required: [true, "Location is required"]
// // },

// //     price: {
// //         type: Number,
// //         required: [true, "Price is required"],
// //         min: [0, "Price must be positive"]
// //     },

//     // country : {
//     //     type: String,
//     //     trim: true,
//     // },

//     reviews: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Review",
//         },
//     ],
// });

// // middleware (for delete review with post)
// listingSchema.post("findOneAndDelete", async (listing) => {
//     if (listing) {
//         await Review.deleteMany({_id: { $in: listing.reviews}});
//     }
// })

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      require: true,
      default:  [77.2090, 28.6139],
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;
