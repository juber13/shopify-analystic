// models/ShopifyCustomers.js
const mongoose = require("mongoose");

const ShopifyCustomerSchema = new mongoose.Schema({
  // Define schema according to your data structure
  created_at: { type: Date, required: true },
  default_address: {
    city: { type: String },
  },
  // Other fields...
});

module.exports = mongoose.model("ShopifyCustomer", ShopifyCustomerSchema);
