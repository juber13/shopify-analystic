
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

// Define routes (to be implemented in the next step)
app.use("/api", require("./routes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


