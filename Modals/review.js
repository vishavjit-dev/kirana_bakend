const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: { type: String  },
  name: { type: String }, // Name of the reviewer
  email: { type: String, }, // Email of the reviewer
  rating: { type: Number,  min: 1, max: 5 },
  comment: { type: String, },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);

