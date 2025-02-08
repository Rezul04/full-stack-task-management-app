"use client"

import { useState, useEffect } from "react"
import { useCart } from "../contexts/CartContext"
import axios from "axios"
import "./Menu.css"

const Menu = () => {
  const [menuItems, setMenuItems] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/menu")
      setMenuItems(response.data)
    } catch (error) {
      console.error("Error fetching menu items:", error)
    }
  }

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      {menuItems.length === 0 ? (
        <p className="empty-menu">No items available.</p>
      ) : (
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item._id} className="menu-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <button onClick={() => addToCart(item)} className="add-button">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Menu
