"use client"
import { useCart } from "../contexts/CartContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import "./Cart.css"

const Cart = () => {
  const { cart, removeFromCart, updateItemQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) // Track checkout status

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Your cart is empty!")

    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:5000/api/order",
        {
          items: cart.map((item) => ({ menuItem: item._id, quantity: item.quantity })),
          totalAmount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      console.log("Order placed:", response.data) // Debugging

      clearCart()
      navigate("/orders") // Redirect to order history after checkout
    } catch (error) {
      console.error("Error placing order:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateItemQuantity(item._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item._id)} className="remove-button">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p className="total-amount">Total: ${totalAmount.toFixed(2)}</p>
            <button onClick={handleCheckout} className="checkout-button" disabled={loading}>
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
