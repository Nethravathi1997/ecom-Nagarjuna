import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart");
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove item from cart
  const handleRemove = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
      fetchCart(); // refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  // Update quantity
  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      fetchCart(); // refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div className="item-info">
                  <strong>{item.product.name}</strong>
                  <p>₹{item.product.price}</p>
                  <p>{item.product.category}</p>
                </div>
                <div className="item-actions">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item._id, Number(e.target.value))
                    }
                  />
                  <button onClick={() => handleRemove(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="btn-checkout" onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
