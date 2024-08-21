// models/Customer.js
const mongoose = require("mongoose");

const shopifyCustomerSchema = new mongoose.Schema({
  addresses: { type: String, default: [] }, // Array of addresses
  admin_graphql_api_id: { type: String, required: true },
  created_at: { type: Date, required: true },
  currency: { type: String, default: "" },
  default_address: { type: String, default: null }, // Assuming default_address is an address object
  email: { type: String, required: true },
  email_marketing_consent: { type: String, default: null },
  first_name: { type: String, required: true },
  id: { type: String, required: true, unique: true }, // Unique identifier
  last_name: { type: String, required: true },
  last_order_id: { type: String, default: null },
  last_order_name: { type: String, default: null },
  multipass_identifier: { type: String, default: null },
  note: { type: String, default: null },
  orders_count: { type: Number, default: 0 },
  phone: { type: String, default: null },
  sms_marketing_consent: { type: String, default: null },
  state: { type: String, required: true },
  tags: { type: String, default: "" },
  tax_exempt: { type: Boolean, default: false },
  tax_exemptions: { type: [String], default: [] }, // Array for tax exemptions
  total_spent: { type: String, default: "0.00" },
  updated_at: { type: Date, required: true },
  verified_email: { type: Boolean, default: true },
});

module.exports = mongoose.model("shopifyCustomers", shopifyCustomerSchema);