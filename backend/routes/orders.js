const express = require("express");
const RepairOrder = require("../models/RepairOrder");
const auth = require("../middleware/auth");
const router = express.Router();

// CREATE
router.post("/", auth, async (req, res) => {
  try {
    const { title, customerName, device, issue, price, notes } = req.body;
    if (!title || !customerName || !device || !issue) {
      return res.status(400).json({ message: "title, customerName, device, issue are required" });
    }

    const order = await RepairOrder.create({
      title, customerName, device, issue, price, notes,
      createdBy: req.userId   // <-- consistent
    });

    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({ message: "Failed to create", error: e.message });
  }
});

// LIST
router.get("/", auth, async (req, res) => {
  const orders = await RepairOrder.find({ createdBy: req.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

// GET by id
router.get("/:id", auth, async (req, res) => {
  const order = await RepairOrder.findOne({ _id: req.params.id, createdBy: req.userId });
  if (!order) return res.status(404).json({ message: "Not found" });
  res.json(order);
});

// UPDATE
router.patch("/:id", auth, async (req, res) => {
  const allowed = ["title","customerName","device","issue","status","price","notes","photos"];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));

  const order = await RepairOrder.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.userId },
    { $set: updates },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: "Not found or no permission" });
  res.json(order);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  const deleted = await RepairOrder.findOneAndDelete({ _id: req.params.id, createdBy: req.userId });
  if (!deleted) return res.status(404).json({ message: "Not found or no permission" });
  res.json({ message: "Deleted" });
});

module.exports = router;
