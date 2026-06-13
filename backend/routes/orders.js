const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');


router.post('/', protect, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No hay artículos en el pedido' });
    return;
  }
  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
