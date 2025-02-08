"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import "./Order.css"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log("Fetched Orders:", response.data) // Debugging

      setOrders(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="orders-container">
      <h2>Your Order History</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              <p className="order-id">Order ID: {order._id}</p>
              <p className="order-date">Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="order-total">Total: ${order.totalAmount.toFixed(2)}</p>
              <p className="order-status">Status: <strong>{order.status || "Pending"}</strong></p>
              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.menuItem?.name || "Unknown Item"} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
