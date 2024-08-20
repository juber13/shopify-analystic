
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const dotenv  = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();


// const ShopifyOrders =  require("./models/ShopifyOrders");

// async function run() {
//   try {
    // Connect to the MongoDB server
    // await client.connect();/

    // Insert multiple documents
//     const result = await ShopifyOrders.insertMany([
//       { created_at: new Date(), total_price_set: 15 },
//       { created_at: new Date(), total_price_set: 20 },
//       { created_at: new Date(), total_price_set: 25 },
//       { created_at: new Date(), total_price_set: 30 },
//       { created_at: new Date(), total_price_set: 35 },
//       { created_at: new Date(), total_price_set: 40 },
//       { created_at: new Date(), total_price_set: 45 },
//       { created_at: new Date(), total_price_set: 50 },
//       { created_at: new Date(), total_price_set: 55 },
//       { created_at: new Date(), total_price_set: 60 },
//     ]);

//     console.log(`${result.insertedCount} documents were inserted`);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     // Close the connection
//     // await client.close();
//   }
// }

// run().catch(console.dir);

// Define routes (to be implemented in the next step)
app.use("/api", require("./routes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


