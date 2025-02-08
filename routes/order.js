const express = require("express")
const Order = require("../models/Order.js")
const { authenticateToken } = require("../middleware/auth.js") 

const router = express.Router()


router.post("/",  async (req, res) => {
  try {
    const { items, totalAmount } = req.body

    if (!items || !totalAmount) {
      return res.status(400).json({ error: "Items and total amount are required" })
    }

    const order = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
      status: "Pending", 
    })

    await order.save()
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})


router.get("/",authenticateToken,  async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate("items.menuItem")

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" })
    }

    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
