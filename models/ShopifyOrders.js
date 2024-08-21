// models/ShopifyOrders.js
const mongoose = require("mongoose");

const ShopifyOrderSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // Add the id field
  email: { type: String, required: true },
  closed_at: { type: Date, default: null },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  number: { type: Number, required: true },
  note: { type: String, default: null },
  token: { type: String, default: "" },
  gateway: { type: String, required: true },
  test: { type: Boolean, required: true },
  total_price: { type: String, required: true },
  subtotal_price: { type: String, required: true },
  total_weight: { type: Number, required: true },
  total_tax: { type: String, required: true },
  taxes_included: { type: Boolean, required: true },
  currency: { type: String, required: true },
  financial_status: { type: String, required: true },
  confirmed: { type: Boolean, required: true },
  total_discounts: { type: String, required: true },
  buyer_accepts_marketing: { type: Boolean, required: true },
  name: { type: String, required: true },
  referring_site: { type: String, default: null },
  landing_site: { type: String, default: null },
  cancelled_at: { type: Date, default: null },
});

// Pre-save middleware to copy _id to id
ShopifyOrderSchema.pre("save", function (next) {
  this.id = this._id.toString(); // Copy _id to id
  next();
});

module.exports = mongoose.model("ShopifyOrder", ShopifyOrderSchema);
