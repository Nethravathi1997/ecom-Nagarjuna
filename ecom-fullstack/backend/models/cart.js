const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  user: {
    type: String,
    default: "guest", // Later replace with userId if authentication is added
  },
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
