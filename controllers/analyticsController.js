// controllers/analyticsController.js
const ShopifyCustomers = require("../models/ShopifyCustomers");
const ShopifyOrders = require("../models/ShopifyOrders");
const ShopifyProducts = require('../models/shopifyProducts')

// function to get total sales over time
const getTotalSales = async (req, res) => {
  try {
    const salesData = await ShopifyOrders.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
          totalSales: { $sum: "$total_price_set" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get new customers added over time
const getAllCustomers = async (req, res) => {
  try {
    const customers = await ShopifyCustomers.find({});
    console.log("Customers:", customers);

    // Check the collection directly
    const db = ShopifyCustomers.db;
    const collection = db.collection("shopifycustomers"); // Use the actual collection name
    const count = await collection.countDocuments();
    console.log("Document count:", count);

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Function to get sales growth rate over time
const getSalesGrowth = async (req, res) => {
    try {
        // Aggregate total sales by month
        const salesData = await ShopifyOrders.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } }, // Group by year and month
                    totalSales: { $sum: "$total_price_set" }
                }
            },
            { $sort: { _id: 1 } } // Sort by date
        ]);

        // Calculate growth rate
        const growthRates = salesData.map((data, index) => {
            if (index === 0) {
                return { month: data._id, growthRate: null }; // No growth rate for the first month
            }
            const previousSales = salesData[index - 1].totalSales;
            const currentSales = data.totalSales;
            const growthRate = ((currentSales - previousSales) / previousSales) * 100; // Calculate growth rate as a percentage
            return { month: data._id, growthRate: growthRate.toFixed(2) }; // Format to 2 decimal places
        });

        res.json(growthRates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Function to get number of repeat customers
const getRepeatCustomers = async (req, res) => {
    try {
        const repeatCustomersData = await ShopifyCustomers.aggregate([
          {
            $group: {
              _id: "$customer_id", // Assuming customer_id is a field in the orders collection
              totalPurchases: { $sum: 1 },
            },
          },
          {
            $match: { totalPurchases: { $gt: 1 } }, // Filter for repeat customers
          },
          {
            $group: {
              _id: null,
              repeatCustomerCount: { $sum: 1 },
            },
          },
        ]);

        res.json(repeatCustomersData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get geographical distribution of customers
const getGeographicalDistribution = async (req, res) => {
    try {
        const geoData = await ShopifyCustomers.aggregate([
          {
            $group: {
              _id: "$default_address.city", // Group by city
              customerCount: { $sum: 1 },
            },
          },
          { $sort: { customerCount: -1 } }, // Sort by customer count
        ]);

        res.json(geoData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get customer lifetime value by cohorts
const getCustomerLifetimeValue = async (req, res) => {
    try {
        // Step 1: Get first purchase date for each customer
        const firstPurchase = await ShopifyCustomers.aggregate([
          {
            $group: {
              _id: "$customer_id", // Assuming customer_id is a field in the orders collection
              firstPurchaseDate: { $min: "$created_at" },
              totalSpent: { $sum: "$total_price_set" },
            },
          },
        ]);

        // Step 2: Group by cohort (month of first purchase)
        const cohortData = await ShopifyCustomers.aggregate([
          {
            $lookup: {
              from: "shopifyCustomers", // Join with customers collection
              localField: "customer_id",
              foreignField: "_id",
              as: "customerInfo",
            },
          },
          {
            $unwind: "$customerInfo",
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m",
                  date: "$customerInfo.created_at",
                },
              },
              totalLifetimeValue: { $sum: "$total_price_set" },
            },
          },
          { $sort: { _id: 1 } },
        ]);

        res.json(cohortData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
  //   getTotalSales,
  //   getSalesGrowth,
  //   getNewCustomers,
  //   getRepeatCustomers,
  //   getGeographicalDistribution,
  //   getCustomerLifetimeValue,
  // Export other functions...
  getAllCustomers,
};

