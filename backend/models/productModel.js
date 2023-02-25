const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    requrired: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    requrired: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    requrired: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        requrired: true,
      },
      url: {
        type: String,
        requrired: true,
      },
    },
  ],
  category: {
    type: String,
    requrired: [true, "Please Enter product Category"],
  },
  stock: {
    type: Number,
    requrired: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        requrired: true,
      },
      rating: {
        type: Number,
        requrired: true,
      },
      comment: {
        type: String,
        requrired: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
