import React from "react";
import "./checkout.css";

function Checkout() {
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Enter your details to complete the order.</p>
      <form className="checkout-form">
        <input type="text" placeholder="Full Name" required />
        <input type="text" placeholder="Address" required />
        <input type="number" placeholder="Phone Number" required />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
