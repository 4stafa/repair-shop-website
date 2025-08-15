const mongoose = require("mongoose");

const repairOrderSchema = new mongoose.Schema({
  title:        { type: String, required: true },         // e.g., "iPhone 12 screen"
  customerName: { type: String, required: true },
  device:       { type: String, required: true },         // "iPhone 12", "Dell XPS", etc.
  issue:        { type: String, required: true },         // description of problem
  status:       { type: String, enum: ["new", "in_progress", "ready", "delivered", "canceled"], default: "new" },
  price:        { type: Number, default: 0 },
  photos:       [{ type: String }],                       // Cloudinary URLs (later)
  notes:        { type: String },
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("RepairOrder", repairOrderSchema);
