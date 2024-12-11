const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth/auth-routes");
const productRoute = require("./routes/admin/product-routes");
const shopRoute = require("./routes/shop/product-routes");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  credentials: true, // Allow cookies to be sent in requests
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with the above options
app.use(express.json());
app.use(cookieParser());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", productRoute);
app.use("/api/shop/products", shopRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    success: false,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.clear();
  console.log(`Server running on port ${PORT}`);
});
