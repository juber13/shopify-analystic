// routes/index.js
const express = require("express");
const router = express.Router();
const {
  getTotalSales,
  getSalesGrowth,
  getAllCustomers,
  getRepeatCustomers,
  getGeographicalDistribution,
  getCustomerLifetimeValue,
} = require("../controllers/analyticsController");

// Define your API endpoints
// router.get("/total-sales", getTotalSales);
// router.get("/sales-growth", getSalesGrowth);
// router.get("/repeat-customers", getRepeatCustomers);
// router.get("/geographical-distribution", getGeographicalDistribution);
// router.get("/customer-lifetime-value", getCustomerLifetimeValue);
router.get("/new-customers", getAllCustomers);

module.exports = router;
