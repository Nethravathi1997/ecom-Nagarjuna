import React, { useEffect, useState } from "react";
import "./addProduct.css"; // Import separate CSS file

function AddProduct() {
  const [product, setProduct] = useState({ name: "", price: "", category: "" });
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]); // For displaying added products
  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "", category: "" });

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Add new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const data = await res.json();
      setMessage(`Product "${data.name}" added successfully!`);
      setProduct({ name: "", price: "", category: "" });
      fetchProducts(); // refresh list
    } catch (err) {
      setMessage("Error adding product.");
      console.error(err);
    }
  };

  // Edit product
  const handleEditClick = (p) => {
    setEditingProduct(p._id);
    setEditData({ name: p.name, price: p.price, category: p.category });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/products/${editingProduct}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("Failed to update product");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      {message && <p className="message">{message}</p>}

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-add">Add Product</button>
      </form>

      <h3>Product List</h3>
      <ul className="product-list">
        {products.map((p) => (
          <li key={p._id}>
            {editingProduct === p._id ? (
              <form className="edit-form" onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  required
                />
                <button type="submit" className="btn-save">Save</button>
                <button type="button" className="btn-cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <div className="product-info">
                  <strong>{p.name}</strong> - ₹{p.price} ({p.category})
                </div>
                <button className="btn-edit" onClick={() => handleEditClick(p)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddProduct;
