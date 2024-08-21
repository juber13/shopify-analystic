// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  admin_graphql_api_id: { type: String, required: true },
  body_html: { type: String, default: null },
  created_at: { type: Date, required: true },
  handle: { type: String, required: true },
  id: { type: String, required: true, unique: true }, // Assuming this is a unique identifier
  image: { type: String, default: null },
  images: { type: [String], default: [] }, // Array of image URLs
  options: { type: [String], default: [] }, // Assuming options are strings, adjust as needed
  product_type: { type: String, required: true },
  published_at: { type: Date, default: null },
  published_scope: { type: String, required: true },
  status: { type: String, required: true },
  tags: { type: String, default: "" },
  template_suffix: { type: String, default: null },
  title: { type: String, required: true },
  updated_at: { type: Date, required: true },
  variants: { type: [Object], default: [] }, // Assuming variants are objects, adjust as needed
  vendor: { type: String, required: true },
});

module.exports = mongoose.model("ShopifyProduct", ProductSchema);
