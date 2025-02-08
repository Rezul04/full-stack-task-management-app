const express = require('express');
const MenuItem = require('../models/MenuItem.js');
const { authenticateToken } = require('../middleware/auth.js');


const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find()
    res.json(menuItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  console.log("Received POST request:", req.body);  // Add this line

  try {
    const { name, category, price } = req.body;
    if (!name || !category || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const menuItem = new MenuItem({ name, category, price });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const { name, category, price } = req.body

    if (!name || !category || !price) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, { name, category, price }, { new: true })

    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" })
    }

    res.json(menuItem)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id)

    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" })
    }

    res.json({ message: "Menu item deleted successfully" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports=router;