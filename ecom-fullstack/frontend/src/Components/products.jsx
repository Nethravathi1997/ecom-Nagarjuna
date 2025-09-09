import React, { useEffect, useState } from "react";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");

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

  // Add to cart via backend
  const addToCart = async (product) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      alert(`${product.name} added to cart`);
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    }
  };

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  // Filter, search, sort
  let displayedProducts = products
    .filter((p) =>
      search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((p) =>
      selectedCategory ? p.category === selectedCategory : true
    );

  if (sort === "low-high") displayedProducts.sort((a, b) => a.price - b.price);
  else if (sort === "high-low") displayedProducts.sort((a, b) => b.price - a.price);

  return (
    <div className="products-container">
      <h2>Products</h2>

      <div className="products-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            <li
              className={!selectedCategory ? "active" : ""}
              onClick={() => setSelectedCategory("")}
            >
              All
            </li>
            {categories.map((cat, idx) => (
              <li
                key={idx}
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="products-main">
          <div className="filters">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name"
              className="input-field"
            />
            <select
              onChange={(e) => setSort(e.target.value)}
              value={sort}
              className="input-field"
            >
              <option value="">Sort by Price</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          <ul className="product-list">
            {displayedProducts.map((p) => (
              <li key={p._id} className="product-card">
                <div>
                  <strong>{p.name}</strong>
                  <p>₹{p.price}</p>
                  <p>Category: {p.category}</p>
                </div>
                <button className="btn-add" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Products;
