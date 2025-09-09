const Product = require("../models/products"); // Make sure filename matches

// @desc Get all products
exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find();

    // Filter
    if (req.query.category) {
      products = products.filter(
        (p) => p.category.toLowerCase() === req.query.category.toLowerCase()
      );
    }

    // Sort
    if (req.query.sort === "low-high") {
      products.sort((a, b) => a.price - b.price);
    } else if (req.query.sort === "high-low") {
      products.sort((a, b) => b.price - a.price);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const newProduct = new Product({ name, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, category },
      { new: true } // return updated doc
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
