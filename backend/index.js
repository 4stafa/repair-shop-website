const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("API is running"));

// Port config
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
