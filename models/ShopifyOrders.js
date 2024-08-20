// models/ShopifyOrders.js
const mongoose = require("mongoose");

const ShopifyOrderSchema = new mongoose.Schema({
  created_at: { type: Date, required: true },
  total_price_set: { type: Number, required: true },
  // Other fields...
});

module.exports = mongoose.model("ShopifyOrder", ShopifyOrderSchema);
