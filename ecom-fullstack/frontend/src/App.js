import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/home";
import AddProduct from "./Components/addProduct";
import Products from "./Components/products";
import Cart from "./Components/cart";
import Checkout from "./Components/checkout";
import './App.css'

function App() {
  return (
    <Router>
      <header className="app-header">
        <h1 className="app-title">E-Commerce App</h1>
        <nav className="app-nav">
          <Link to="/">Home</Link>
          <Link to="/add-product">Add Product</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
