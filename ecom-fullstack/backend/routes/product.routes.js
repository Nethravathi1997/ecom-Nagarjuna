const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);       // GET all products
router.post("/", addProduct);       // POST new product
router.put("/:id", updateProduct);  // PUT update product by ID
router.delete("/:id", deleteProduct); // DELETE product by ID

module.exports = router;
