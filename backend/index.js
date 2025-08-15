// backend/index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ---------- Global middleware (order matters) ---------- */
app.use(cors({ origin: "http://localhost:5173" })); // adjust for prod
app.use(express.json());

/* ------------------------- Routes ---------------------- */
app.get("/", (_req, res) => res.send("API is running"));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

try {
  const userRoutes = require("./routes/user");
  app.use("/api/users", userRoutes);
} catch (_) {
  // optional
}

const orderRoutes = require("./routes/orders");   // <-- require
app.use("/api/orders", orderRoutes);              // <-- mount

/* ----------------- Start server & DB connect ----------- */
const PORT = process.env.PORT || 5000;

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
