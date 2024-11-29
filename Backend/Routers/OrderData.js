const express = require("express");
const router = express.Router();
let Order = require("../models/Orders");

router.post("/createorder", async (req, res) => {
  const { email, order_data, order_date } = req.body;

  // Validate input structure
  if (!email || !Array.isArray(order_data) || !order_date) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Prepend order date to order_data
  order_data.unshift({ Order_date: order_date });

  try {
  // Check if the order already exists for the email
    const eId = await Order.findOne({ email });

    if (!eId) {
      // Create new order if not found
      await Order.create({
        email,
        order_data: [order_data],
      });
      return res.status(201).json({ success: true });
    } else {
      // Update existing order with new data
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data } }
      );
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/myorders", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
