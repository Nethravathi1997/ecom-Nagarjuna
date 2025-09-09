const express = require("express");
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateQuantity } = require("../controllers/cartController");

router.get("/", getCart); // Get all cart items
router.post("/", addToCart); // Add item to cart
router.delete("/:id", removeFromCart); // Remove item from cart
router.put("/:id", updateQuantity); // Update quantity

module.exports = router;
